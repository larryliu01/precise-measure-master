import { ConversionCategory, CoordinatePair, GPSConversionUnit } from './types';
import * as mgrs from 'mgrs';
import * as utm from 'utm';
import Geohash from 'latlon-geohash';

// Helper functions for parsing and formatting GPS coordinates
function parseDMS(dmsString: string): CoordinatePair {
  // Format example: 37°46'12"N, 122°25'48"W
  const parts = dmsString.split(/,\s*/);
  if (parts.length !== 2) {
    throw new Error('Invalid DMS format. Expected format: 37°46\'12"N, 122°25\'48"W');
  }
  
  const lat = parts[0];
  const lng = parts[1];
  
  function parseDMSPart(part: string): number {
    const regex = /(\d+)°(\d+)'(\d+(?:\.\d+)?)"\s*([NSEW])/;
    const match = part.match(regex);
    
    if (!match) {
      throw new Error(`Invalid DMS part: ${part}`);
    }
    
    const [_, degrees, minutes, seconds, direction] = match;
    let value = parseInt(degrees) + parseInt(minutes) / 60 + parseFloat(seconds) / 3600;
    
    if (direction === 'S' || direction === 'W') {
      value = -value;
    }
    
    return value;
  }
  
  return {
    lat: parseDMSPart(lat),
    lng: parseDMSPart(lng)
  };
}

function formatDMS(coord: CoordinatePair): string {
  function formatDMSPart(value: number, isLat: boolean): string {
    const abs = Math.abs(value);
    const degrees = Math.floor(abs);
    const minutesFloat = (abs - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(2);
    
    const direction = isLat
      ? (value >= 0 ? 'N' : 'S')
      : (value >= 0 ? 'E' : 'W');
    
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  }
  
  return `${formatDMSPart(coord.lat, true)}, ${formatDMSPart(coord.lng, false)}`;
}

function parseDDM(ddmString: string): CoordinatePair {
  // Format example: 37°46.20'N, 122°25.80'W
  const parts = ddmString.split(/,\s*/);
  if (parts.length !== 2) {
    throw new Error('Invalid DDM format. Expected format: 37°46.20\'N, 122°25.80\'W');
  }
  
  const lat = parts[0];
  const lng = parts[1];
  
  function parseDDMPart(part: string): number {
    const regex = /(\d+)°(\d+(?:\.\d+)?)'\s*([NSEW])/;
    const match = part.match(regex);
    
    if (!match) {
      throw new Error(`Invalid DDM part: ${part}`);
    }
    
    const [_, degrees, minutes, direction] = match;
    let value = parseInt(degrees) + parseFloat(minutes) / 60;
    
    if (direction === 'S' || direction === 'W') {
      value = -value;
    }
    
    return value;
  }
  
  return {
    lat: parseDDMPart(lat),
    lng: parseDDMPart(lng)
  };
}

function formatDDM(coord: CoordinatePair): string {
  function formatDDMPart(value: number, isLat: boolean): string {
    const abs = Math.abs(value);
    const degrees = Math.floor(abs);
    const minutes = ((abs - degrees) * 60).toFixed(2);
    
    const direction = isLat
      ? (value >= 0 ? 'N' : 'S')
      : (value >= 0 ? 'E' : 'W');
    
    return `${degrees}°${minutes}'${direction}`;
  }
  
  return `${formatDDMPart(coord.lat, true)}, ${formatDDMPart(coord.lng, false)}`;
}

function parseDecimalDegrees(ddString: string): CoordinatePair {
  // Format example: 37.7749, -122.4194
  const parts = ddString.split(/,\s*/);
  if (parts.length !== 2) {
    throw new Error('Invalid decimal degrees format. Expected format: 37.7749, -122.4194');
  }
  
  return {
    lat: parseFloat(parts[0]),
    lng: parseFloat(parts[1])
  };
}

function formatDecimalDegrees(coord: CoordinatePair): string {
  return `${coord.lat.toFixed(6)}, ${coord.lng.toFixed(6)}`;
}

export const gpsCoordinatesCategory: ConversionCategory = {
  name: 'GPS Coordinates',
  icon: '🌐',
  baseUnit: 'decimal_degrees',
  units: {
    decimal_degrees: {
      label: 'Decimal Degrees (DD)',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        return parseDecimalDegrees(value);
      },
      fromBase: (value: CoordinatePair): string => {
        return formatDecimalDegrees(value);
      }
    } as GPSConversionUnit,
    
    degrees_minutes_seconds: {
      label: 'Degrees Minutes Seconds (DMS)',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        return parseDMS(value);
      },
      fromBase: (value: CoordinatePair): string => {
        return formatDMS(value);
      }
    } as GPSConversionUnit,
    
    degrees_decimal_minutes: {
      label: 'Degrees Decimal Minutes (DDM)',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        return parseDDM(value);
      },
      fromBase: (value: CoordinatePair): string => {
        return formatDDM(value);
      }
    } as GPSConversionUnit,
    
    utm: {
      label: 'Universal Transverse Mercator (UTM)',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        // Format example: 10S 123456 4567890
        const parts = value.trim().split(/\s+/);
        if (parts.length !== 3) {
          throw new Error('Invalid UTM format. Expected format: 10S 123456 4567890');
        }
        
        try {
          const zone = parts[0].slice(0, -1);
          const band = parts[0].slice(-1);
          const easting = parseInt(parts[1]);
          const northing = parseInt(parts[2]);
          
          const result = utm.toLatLon(easting, northing, parseInt(zone), band);
          return {
            lat: result.latitude,
            lng: result.longitude
          };
        } catch (error) {
          throw new Error(`Failed to convert UTM: ${error.message}`);
        }
      },
      fromBase: (value: CoordinatePair): string => {
        try {
          const result = utm.fromLatLon(value.lat, value.lng);
          return `${result.zoneNum}${result.zoneLetter} ${Math.round(result.easting)} ${Math.round(result.northing)}`;
        } catch (error) {
          throw new Error(`Failed to convert to UTM: ${error.message}`);
        }
      }
    } as GPSConversionUnit,
    
    mgrs: {
      label: 'Military Grid Reference System (MGRS)',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        try {
          const latLng = mgrs.toPoint(value.trim());
          return {
            lat: latLng[1],
            lng: latLng[0]
          };
        } catch (error) {
          throw new Error(`Failed to convert MGRS: ${error.message}`);
        }
      },
      fromBase: (value: CoordinatePair): string => {
        try {
          return mgrs.forward([value.lng, value.lat], 5);
        } catch (error) {
          throw new Error(`Failed to convert to MGRS: ${error.message}`);
        }
      }
    } as GPSConversionUnit,
    
    geohash: {
      label: 'Geohash',
      toBase: (value): CoordinatePair => {
        if (typeof value === 'number') {
          throw new Error('GPS coordinates require a string input with both latitude and longitude');
        }
        try {
          const { lat, lon } = Geohash.decode(value.trim());
          return {
            lat,
            lng: lon
          };
        } catch (error) {
          throw new Error(`Failed to convert Geohash: ${error.message}`);
        }
      },
      fromBase: (value: CoordinatePair): string => {
        try {
          return Geohash.encode(value.lat, value.lng, 9);
        } catch (error) {
          throw new Error(`Failed to convert to Geohash: ${error.message}`);
        }
      }
    } as GPSConversionUnit
  }
}; 