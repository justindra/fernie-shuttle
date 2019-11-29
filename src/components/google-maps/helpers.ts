/**
 * Get the users's current geolocation
 */
export function getCurrentGeoLocation(): Promise<google.maps.LatLngLiteral> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const coords: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          resolve(coords);
        },
        (error) => {
          console.warn('Error getting user location');
          reject(error);
        },
        {
          // Wait for a maximum of 5s
          timeout: 5000
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.warn('Error getting user location, no browser support');
      reject();
    }
  });
}

export default {
  getCurrentGeoLocation
};
