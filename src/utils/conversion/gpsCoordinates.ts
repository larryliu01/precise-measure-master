import { ConversionCategory } from './types';

// Helper function to parse DMS string to decimal degrees
// Handles formats like "40°26'46\"N" or "40° 26' 46\" N"
const parseDMS = (dmsStr: string): number => {
  // Remove all spaces
  const normalized = dmsStr.trim();
  
  // Extract degrees, minutes, seconds
  const degMatch = normalized.match(/(-?\d+)°/);
  const minMatch = normalized.match(/(\d+)['′]/);
  const secMatch = normalized.match(/(\d+(?:\.\d+)?)["″]/);
  
  // Extract direction (N/S/E/W)
  const dirMatch = normalized.match(/[NSEW]$/i);
  
  let degrees = degMatch ? parseFloat(degMatch[1]) : 0;
  const minutes = minMatch ? parseFloat(minMatch[1]) / 60 : 0;
  const seconds = secMatch ? parseFloat(secMatch[1]) / 3600 : 0;
  
  // Calculate decimal degrees
  let decimalDegrees = Math.abs(degrees) + minutes + seconds;
  
  // Adjust sign based on direction or original degrees sign
  if (dirMatch) {
    const dir = dirMatch[0].toUpperCase();
    if (dir === 'S' || dir === 'W') {
      decimalDegrees = -decimalDegrees;
    }
  } else if (degrees < 0) {
    decimalDegrees = -decimalDegrees;
  }
  
  return decimalDegrees;
};

// Helper function to parse DDM string to decimal degrees
// Handles formats like "40° 26.77' N" or "40°26.77'N" 
const parseDDM = (ddmStr: string): number => {
  // Remove all spaces
  const normalized = ddmStr.trim();
  
  // Extract degrees and decimal minutes
  const degMatch = normalized.match(/(-?\d+)°/);
  const minMatch = normalized.match(/(\d+(?:\.\d+)?)['′]/);
  
  // Extract direction (N/S/E/W)
  const dirMatch = normalized.match(/[NSEW]$/i);
  
  let degrees = degMatch ? parseFloat(degMatch[1]) : 0;
  const minutes = minMatch ? parseFloat(minMatch[1]) / 60 : 0;
  
  // Calculate decimal degrees
  let decimalDegrees = Math.abs(degrees) + minutes;
  
  // Adjust sign based on direction or original degrees sign
  if (dirMatch) {
    const dir = dirMatch[0].toUpperCase();
    if (dir === 'S' || dir === 'W') {
      decimalDegrees = -decimalDegrees;
    }
  } else if (degrees < 0) {
    decimalDegrees = -decimalDegrees;
  }
  
  return decimalDegrees;
};

// Helper function to format decimal degrees to DMS string
const formatToDMS = (dd: number, isLongitude: boolean = false): string => {
  const dir = dd >= 0 ? (isLongitude ? 'E' : 'N') : (isLongitude ? 'W' : 'S');
  const absDd = Math.abs(dd);
  const degrees = Math.floor(absDd);
  const minutes = Math.floor((absDd - degrees) * 60);
  const seconds = Math.round(((absDd - degrees) * 3600) % 60 * 100) / 100;
  
  return `${degrees}° ${minutes}' ${seconds}" ${dir}`;
};

// Helper function to format decimal degrees to DDM string
const formatToDDM = (dd: number, isLongitude: boolean = false): string => {
  const dir = dd >= 0 ? (isLongitude ? 'E' : 'N') : (isLongitude ? 'W' : 'S');
  const absDd = Math.abs(dd);
  const degrees = Math.floor(absDd);
  const minutes = Math.round((absDd - degrees) * 60 * 1000) / 1000;
  
  return `${degrees}° ${minutes}' ${dir}`;
};

// Type definition to extend ConversionCategory types for GPS coordinates
type GPSfromBaseFunc = (value: number, inputString?: string) => number | string;

export const gpsCoordinatesCategory: ConversionCategory = {
  name: "GPS Coordinates",
  baseUnit: "decimal_degrees",
  icon: "map-pin",
  units: {
    "decimal_degrees": {
      label: "Decimal Degrees (DD)",
      toBase: (dd: number | string) => {
        if (typeof dd === 'number') return dd;
        
        // Check if it's a comma-separated string (lat,long)
        if (typeof dd === 'string' && dd.includes(',')) {
          const parts = dd.split(',');
          if (parts.length === 2) {
            // We just return the first part (latitude) for simplicity
            return parseFloat(parts[0].trim());
          }
        }
        
        return parseFloat(String(dd));
      },
      fromBase: (dd: number) => dd
    },
    "degrees_minutes_seconds": {
      label: "Degrees Minutes Seconds (DMS)",
      toBase: (dms: number | string) => {
        if (typeof dms === 'number') return dms;
        
        // Check if it's a comma-separated string (lat,long)
        if (typeof dms === 'string' && dms.includes(',')) {
          const parts = dms.split(',');
          if (parts.length === 2) {
            // Parse DMS format from the first part (latitude)
            return parseDMS(parts[0].trim());
          }
        } else if (typeof dms === 'string' && dms.includes('°')) {
          // It's a single DMS string
          return parseDMS(dms);
        }
        
        return parseFloat(String(dms));
      },
      fromBase: (dd: number, inputString?: string) => {
        // Check if inputString contains lat,long information
        if (inputString && inputString.includes(',')) {
          const parts = inputString.split(',');
          if (parts.length === 2) {
            // Format both lat and long to DMS
            const lat = formatToDMS(dd, false);
            const long = formatToDMS(parseFloat(parts[1].trim()), true);
            return `${lat}, ${long}`;
          }
        }
        
        // Default: just format latitude
        return formatToDMS(dd);
      }
    },
    "degrees_decimal_minutes": {
      label: "Degrees Decimal Minutes (DDM)",
      toBase: (ddm: number | string) => {
        if (typeof ddm === 'number') return ddm;
        
        // Check if it's a comma-separated string (lat,long)
        if (typeof ddm === 'string' && ddm.includes(',')) {
          const parts = ddm.split(',');
          if (parts.length === 2) {
            // Parse DDM format from the first part (latitude)
            return parseDDM(parts[0].trim());
          }
        } else if (typeof ddm === 'string' && ddm.includes('°')) {
          // It's a single DDM string
          return parseDDM(ddm);
        }
        
        return parseFloat(String(ddm));
      },
      fromBase: (dd: number, inputString?: string) => {
        // Check if inputString contains lat,long information
        if (inputString && inputString.includes(',')) {
          const parts = inputString.split(',');
          if (parts.length === 2) {
            // Format both lat and long to DDM
            const lat = formatToDDM(dd, false);
            const long = formatToDDM(parseFloat(parts[1].trim()), true);
            return `${lat}, ${long}`;
          }
        }
        
        // Default: just format latitude
        return formatToDDM(dd);
      }
    },
    "bng": {
      label: "British National Grid (BNG/XY)",
      // This is a simplified conversion for BNG
      toBase: (bng: number | string) => {
        if (typeof bng === 'number') return bng;
        return parseFloat(String(bng));
      },
      fromBase: (dd: number) => dd
    },
    "utm": {
      label: "Universal Transverse Mercator (UTM)",
      // UTM conversion is quite complex and typically requires zone information
      // This is a placeholder - in a real app, use a proper UTM conversion library
      toBase: (utm: number | string) => {
        if (typeof utm === 'number') return utm;
        return parseFloat(String(utm));
      },
      fromBase: (dd: number) => dd
    },
    "mgrs": {
      label: "Military Grid Reference System (MGRS)",
      // MGRS conversion is complex - this is a placeholder
      toBase: (mgrs: number | string) => {
        if (typeof mgrs === 'number') return mgrs;
        return parseFloat(String(mgrs));
      },
      fromBase: (dd: number) => dd
    },
    "geohash": {
      label: "Geohash",
      // Geohash conversion is complex - this is a placeholder
      toBase: (geohash: number) => geohash,
      fromBase: (dd: number) => dd
    }
  }
}; 