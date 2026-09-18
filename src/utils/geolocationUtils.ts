/**
 * Geolocation & Reverse Geocoding Utility
 * Retrieves real device GPS position and converts to accurate geographic location name
 * without assuming any country or hardcoding default locations.
 */

export interface GeocodeResult {
  formattedLocation: string;
  city?: string;
  state?: string;
  country?: string;
  accuracyMeters?: number;
}

/**
 * Reverse geocode latitude and longitude to a human-readable location string.
 * Uses real public reverse geocoding APIs with no assumed fallback country.
 */
export async function reverseGeocodeCoordinates(
  latitude: number,
  longitude: number,
  accuracyMeters?: number
): Promise<GeocodeResult> {
  // Strategy 1: BigDataCloud Reverse Geocoding API (Fast, CORS-friendly, zero-auth)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(
      latitude
    )}&longitude=${encodeURIComponent(longitude)}&localityLanguage=en`;

    const res = await fetch(bdcUrl, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const parts: string[] = [];

      // Extract specific locality/suburb/neighbourhood
      const locality =
        data.locality ||
        data.localityInfo?.administrative?.[3]?.name ||
        data.localityInfo?.administrative?.[2]?.name;
      const city = data.city || data.localityInfo?.administrative?.[1]?.name;
      const state = data.principalSubdivision;
      const country = data.countryName;

      if (locality && locality !== city) {
        parts.push(locality);
      }
      if (city && city !== state && !parts.includes(city)) {
        parts.push(city);
      }
      if (state && state !== country && !parts.includes(state)) {
        parts.push(state);
      }
      if (country && !parts.includes(country)) {
        parts.push(country);
      }

      if (parts.length > 0) {
        return {
          formattedLocation: parts.join(', '),
          city: city || locality,
          state,
          country,
          accuracyMeters,
        };
      }
    }
  } catch (err) {
    console.warn('BigDataCloud geocode failed, falling back to OSM Nominatim', err);
  }

  // Strategy 2: OpenStreetMap Nominatim Reverse Geocoding
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}&accept-language=en`;

    const res = await fetch(osmUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const parts: string[] = [];

      const neighborhood =
        addr.suburb ||
        addr.neighbourhood ||
        addr.residential ||
        addr.hamlet ||
        addr.village;
      const city = addr.city || addr.town || addr.municipality || addr.county;
      const state = addr.state || addr.region || addr.province;
      const country = addr.country;

      if (neighborhood) parts.push(neighborhood);
      if (city && !parts.includes(city)) parts.push(city);
      if (state && !parts.includes(state)) parts.push(state);
      if (country && !parts.includes(country)) parts.push(country);

      if (parts.length > 0) {
        return {
          formattedLocation: parts.join(', '),
          city,
          state,
          country,
          accuracyMeters,
        };
      }
    }
  } catch (err) {
    console.warn('OSM Nominatim reverse geocode failed', err);
  }

  // Fallback: Coordinates without assuming any country
  return {
    formattedLocation: `GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
    accuracyMeters,
  };
}
