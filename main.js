'use strict'

// function to get the time and date
function getTimeUTC() {
    const currentTimeUTC = document.querySelector('[data-testid="currentTimeUTC"]');
    const currentTime = new Date().toString();
    currentTimeUTC.textContent = currentTime;
}

getTimeUTC();
setInterval(getTimeUTC, 1000);


function getLocation() {
    const UserLocation = document.querySelector('[data-testid="currentLocation"]');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => successCallback(position, UserLocation), errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function successCallback(position, UserLocation) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Reverse geocode to get country and city
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => response.json())
      .then(data => {
        const city = data.address.city || data.address.town || data.address.village;
        const country = data.address.country;

        UserLocation.textContent = `${city}, ${country}`;
        
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(`City: ${city}, Country: ${country}`);
      })
      .catch(error => console.error("Error fetching location data:", error));
  }
  
  function errorCallback(error) {
    console.error("Error getting location:", error.message);
  }
  
  // Call the function to get location
  getLocation();
  setInterval(getLocation, 60000); // Update location every minute