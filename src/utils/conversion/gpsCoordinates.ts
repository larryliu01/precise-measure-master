import { ConversionCategory } from './types';

export const gpsCoordinatesCategory: ConversionCategory = {
  name: "GPS Coordinates",
  baseUnit: "decimal_degrees",
  icon: "map-pin",
  units: {
    "decimal_degrees": {
      label: "Decimal Degrees (DD)",
      toBase: (dd: number) => dd,
      fromBase: (dd: number) => dd
    },
    "degrees_minutes_seconds": {
      label: "Degrees Minutes Seconds (DMS)",
      toBase: (dms: number) => {
        // This is a simplified conversion as DMS is normally a string like "37°23'30\"N"
        // For demonstration, we're treating it as a decimal where the 
        // whole number is degrees, next two digits are minutes, and next two are seconds
        const degrees = Math.floor(dms);
        const minutes = Math.floor((dms - degrees) * 100);
        const seconds = ((dms - degrees) * 10000) % 100;
        return degrees + (minutes / 60) + (seconds / 3600);
      },
      fromBase: (dd: number) => {
        const degrees = Math.floor(dd);
        const minutes = Math.floor((dd - degrees) * 60);
        const seconds = Math.round(((dd - degrees) * 3600) % 60);
        // Return as a decimal for demonstration
        return degrees + (minutes / 100) + (seconds / 10000);
      }
    },
    "degrees_decimal_minutes": {
      label: "Degrees Decimal Minutes (DDM)",
      toBase: (ddm: number) => {
        // This is a simplified conversion as DDM is normally a string like "37°23.5'N"
        // For demonstration, we're treating it as a decimal where the
        // whole number is degrees and the decimal part is minutes
        const degrees = Math.floor(ddm);
        const minutes = (ddm - degrees) * 100;
        return degrees + (minutes / 60);
      },
      fromBase: (dd: number) => {
        const degrees = Math.floor(dd);
        const minutes = (dd - degrees) * 60;
        // Return as a decimal for demonstration
        return degrees + (minutes / 100);
      }
    },
    "utm": {
      label: "Universal Transverse Mercator (UTM)",
      // UTM conversion is quite complex and typically requires zone information
      // This is a placeholder - in a real app, use a proper UTM conversion library
      toBase: (utm: number) => utm,
      fromBase: (dd: number) => dd
    },
    "mgrs": {
      label: "Military Grid Reference System (MGRS)",
      // MGRS conversion is complex - this is a placeholder
      toBase: (mgrs: number) => mgrs,
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