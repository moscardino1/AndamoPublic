import { auth } from './firebase-init.js';


const iconConfig = {
  Food: "red",
  Drinks: "green",
  Breakfast: "yellow",
  Museum: "blue",
  Park: "orange",
  Shop: "grey",
  Beach: "violet",
};


const createIcon = (color) => {
  return L.icon({
    iconUrl: `https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [50, 80],
    iconAnchor: [24, 82],
  });
};

const icons = {};
for (const [type, color] of Object.entries(iconConfig)) {
  icons[type] = createIcon(color);
}


window.addEventListener("DOMContentLoaded", async function () {
  // let validCities = [];
  let selectedCities = [];
  let locations = [];
  // let validCities;



  async function fetchSheetDataCity(SHEET_ID) {
    // const SHEET_ID = "18qq79HtX5uFhIRPC2jgV_j9nGfH3CcFR5Pj5-RW9k4A";
    const SHEET_NAME = "Foglio9";
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq=SELECT%20*%20WHERE%20B%20IS%20NOT%20NULL&sheet=${SHEET_NAME}`;
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1]);
    const rows = json.table.rows;
    
    const uniqueCities = new Set(
      rows
      .slice(1) // Exclude the first row
        .map(row => row.c && row.c[2] ? row.c[2].v : null)
        .filter(city => city !== null)
    );
    
    const validCities = [...uniqueCities].sort();
    return validCities;
  }
  
  // Call the fetchSheetDataCity function to get the cities from the Sheet
  // const validCities = await fetchSheetDataCity();
// Add the event listener for the 'change-gsheet-id' button



  async function fetchSheetData(SHEET_ID) {
    // const SHEET_ID = "18qq79HtX5uFhIRPC2jgV_j9nGfH3CcFR5Pj5-RW9k4A";
    const SHEET_NAME = "Foglio9";
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&tq=SELECT%20*%20WHERE%20B%20IS%20NOT%20NULL&sheet=${SHEET_NAME}`;
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1]);
    const rows = json.table.rows;

    locations = rows.map((row) => {
      const [name, address, city, type, description, latitude, longitude, image] = row.c.map((cell) => cell && cell.v);
      const icon = icons[type] || icons.Museum; // Default to Museum icon if type is not recognized
      return {
        name,
        address,
        city,
        type,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image,
        icon,
      };
    });
 
    return locations;
  }

  let validCities = [];

 
// Add the event listener for the 'change-gsheet-id' button
document.getElementById('change-gsheet-id').addEventListener('click', async function() {
  const newGSheetId = document.getElementById('new-gsheet-id').value;
  document.getElementById('gsheet-id').textContent = newGSheetId;
  validCities = await fetchSheetDataCity(newGSheetId);
  locations = await fetchSheetData(newGSheetId);
  // rest of your code to update the page with the new data
});

const SHEET_ID = document.getElementById('gsheet-id').textContent || "18qq79HtX5uFhIRPC2jgV_j9nGfH3CcFR5Pj5-RW9k4A";
validCities = await fetchSheetDataCity(SHEET_ID);
locations = await fetchSheetData(SHEET_ID);
// 
// rest of your code
  // Function to update the autocomplete list with all values
  function updateAutocompleteList() {
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    const userInput = searchInput.value;
    const matches = validCities.filter(validCities =>
      validCities.toLowerCase().startsWith(userInput.toLowerCase())
    );

    autocompleteList.innerHTML = '';

    matches.forEach((match) => {
      const option = document.createElement('div');
      option.innerHTML = match;
      option.addEventListener('click', function () {
        searchInput.value = match;
        autocompleteList.innerHTML = '';
        selectedCities = [];
        selectedCities.push(match); // Store selected city
        console.log('Selected cities:', selectedCities); // Print selected cities to console
        populateSliderAndMap();

      });
      autocompleteList.appendChild(option);
    });
    // Add event listener to the window to close autocomplete when clicked outside
    // Add event listener to the window to close autocomplete when clicked outside
window.addEventListener('click', function (event) {
  const autocompleteList = document.getElementById('autocomplete-list');
  if (!searchInput.contains(event.target) && !autocompleteList.contains(event.target)) {
    autocompleteList.innerHTML = '';
  }
});


  }
  
  // Add event listener to the input field
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('click', updateAutocompleteList);
  // Add event listener to the input field for input change
  searchInput.addEventListener('input', updateAutocompleteList);
  
  //newwwwwwwww

  // icon scrollable changes
  const scrollableItems = document.querySelectorAll('.scrollable-item');
  let selectedItems = []; // Variable to store the selected items

  scrollableItems.forEach(item => {
    const icon = item.querySelector('i');
    const text = item.querySelector('.category');
    item.classList.add('selected');


    item.addEventListener('click', function () {
      this.classList.toggle('selected');
      updateSelectedItems();
      populateSliderAndMap();

    });

    icon.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevents click event on the parent item
      item.classList.toggle('selected');
      updateSelectedItems();
      populateSliderAndMap();
    });

    text.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevents click event on the parent item
      item.classList.toggle('selected');
      updateSelectedItems();
      populateSliderAndMap();
    });

  });

  function updateSelectedItems() {
    selectedItems = []; // Clear the selected items array

    scrollableItems.forEach(item => {
      if (item.classList.contains('selected')) {
        selectedItems.push(item.querySelector('.category').textContent);
      }
    });

    console.log('Selected Items:', selectedItems);
    
  }


  // -----start---- Initialize map
  const map = L.map('map').setView([-50.0, -50.0], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);
  let userLocationMarker;


  // Add user location marker and fit map to all markers
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLatLng = [position.coords.latitude, position.coords.longitude];
      map.setView(userLatLng, 16);
      userLocationMarker = L.marker(userLatLng, {
        title: "Your location",
        icon: L.icon({
          iconUrl: "https://img.icons8.com/?size=512&id=SCY7gqvxY0DC&format=png",
          iconSize: [50, 50],
          iconAnchor: [50, 50],
        })
      }).addTo(map);
    }, () => {
      console.log("Error: The Geolocation service failed.");
    });
  } else {
    console.log("Error: Your browser doesn't support geolocation.");
  }
  
  // -----end---- Initialize map
 
 

  
  function populateSliderAndMap() {
    const sliderSection = document.getElementById('slider-section');
    const searchBox = document.getElementById('searchBox').value.toLowerCase(); // Get the value of the search box and convert it to lowercase
    document.getElementById('searchBox').addEventListener('input', populateSliderAndMap);
  
 
    // Add geolocation marker to layer group
    const geolocationGroup = L.layerGroup().addTo(map);
    if (userLocationMarker) {
      geolocationGroup.addLayer(userLocationMarker); 
    }

    // Clear the existing slider and map contents
    sliderSection.innerHTML = '';
    // Create a wrapper for the slides
    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('swiper-wrapper');
    // Create a container for the slider
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('swiper-container');

    // Append the wrapper to the container
    sliderContainer.appendChild(sliderWrapper);

    // Append the container to the slider section
    sliderSection.appendChild(sliderContainer);

    // Filter locations based on selected city and items
    // Filter locations based on selected city, items, and search filter
  const filteredLocations = locations.filter(location => {
    return (
      selectedCities.includes(location.city) &&
      (selectedItems.length === 0 || selectedItems.includes(location.type)) &&
      (location.name.toLowerCase().includes(searchBox) || location.address.toLowerCase().includes(searchBox))
    );
  });

  const sortSelect = document.getElementById('sortSelect');

  sortSelect.addEventListener('change', populateSliderAndMap);
  
  const sortValue = sortSelect.value;
  if (sortValue === 'name') {
    filteredLocations.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === 'distance' && userLocationMarker) {
    filteredLocations.sort((a, b) => {
      const distanceA = calculateDistance(
        userLocationMarker.getLatLng().lat,
        userLocationMarker.getLatLng().lng,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        userLocationMarker.getLatLng().lat,
        userLocationMarker.getLatLng().lng,
        b.latitude,
        b.longitude
      );
      return distanceA - distanceB;
    });
  }
 

    // Clear markers from map
  // Clear markers from map but not geolocation 
map.eachLayer(layer => {
  if (layer instanceof L.Marker && !geolocationGroup.hasLayer(layer)) {
    map.removeLayer(layer);
  }
});

    const markers = [];
// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto', // Automatically calculate the number of slides based on container size
  spaceBetween: 10, // Adjust the space between slides if needed
  // ... other options
  breakpoints: {
    // When window width is >= 768px
    768: {
      slidesPerView: 2,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 5,
    },
    // You can add more breakpoints and customize the number of slides
  }
});

// Calculate the distance between two coordinates in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2); // Return the distance rounded to 2 decimal places
}

// Convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
} 
// Populate the slider
filteredLocations.forEach((location, index) => {
  const marker = L.marker([location.latitude, location.longitude], { icon: location.icon }).addTo(map);
  marker.bindPopup(`<b>${location.name}</b><br>${location.address}`, {
    offset: L.point(0, -marker.options.icon.options.iconSize[1]), // Custom offset to position the popup above the marker
  });
  markers.push(marker);
  let distance;
  if (userLocationMarker) {
    distance = calculateDistance(
      userLocationMarker.getLatLng().lat, 
      userLocationMarker.getLatLng().lng, 
      location.latitude, 
      location.longitude
    );
  }
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.innerHTML = `
    <div class="slider-item">
      <div class="slider-image">
        <img src="${location.image}" alt="${location.name}">
      </div>
      <div class="slider-content">
        <h4>${location.type}</h4>
        <h3>${location.name}</h3>
        <h4>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ', ' + location.address)}" target="_blank">
            ${location.address}
          </a>
        </h4> 
        <h8>Distance: ${distance} km <br> </h8>
        <h7>${location.description}</h7>             
      </div>      
    </div>
  
  `;
  sliderWrapper.appendChild(slide);
 // Set an event listener for marker clicks
marker.on('click', () => {
  // Find the index of the clicked location
  const locationIndex = filteredLocations.findIndex(loc => loc === location);
  if (locationIndex !== -1) {
    // Update the active index of the swiper
    swiper.activeIndex = locationIndex; 
    swiper.update();
    swiper.slideTo(locationIndex);
  } 

  // Open the corresponding marker popup
  marker.openPopup();
});

  // Set an event listener for image clicks
  const sliderImage = slide.querySelector('.slider-image img');
  sliderImage.addEventListener('click', () => {
    // Open the corresponding marker popup
    marker.openPopup();
  });

  // Set an event listener for slider element clicks
  slide.addEventListener('click', () => {
    // Recenter the map to the clicked location
    // map.setView([location.latitude, location.longitude], 16);
  });
});

if (markers.length > 0) {
  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.1)); // Adjust the padding value as needed
}


  // Clear the existing list view
  const locationList = document.getElementById('locationList');
  locationList.innerHTML = '';

  // Populate the location list
  locationList.innerHTML = filteredLocations
    .map(location => `
      <li>
        <div class="li-image">
          <img src="${location.image}" alt="${location.name}">
        </div>
        <h4>${location.type}</h4>
        <h3>${location.name}</h3>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ', ' + location.address)}" target="_blank">
          ${location.address} <br>
        </a>
        ${(userLocationMarker && location.latitude && location.longitude)
          ? `<h8>Distance: ${calculateDistance(userLocationMarker.getLatLng().lat, userLocationMarker.getLatLng().lng, location.latitude, location.longitude)} km</h8>`
          : ''}
        <h7><br>${location.description}</h7>
      </li>
    `)
    .join('');
}
// end populate the ...
 
});
// end of the window initialization
 

// Get references to the buttons and views
const showListButton = document.getElementById('showListButton');
const showMapButton = document.getElementById('showMapButton');
const listView = document.getElementById('listView');
const mapView = document.getElementById('mapView');

// Add click event listeners to the buttons
showListButton.addEventListener('click', function() {
  showList();
});

showMapButton.addEventListener('click', function() {
  showMap();
});

// Function to show the list view
function showList() {
  listView.style.display = 'block'; // Show the list view
  mapView.style.display = 'none'; // Hide the map view
}

// Function to show the map view
function showMap() {
  mapView.style.display = 'block'; // Show the map view
  listView.style.display = 'none'; // Hide the list view
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // You can use the user object here.
  } else {
    // No user is signed in.
    // Redirect to the login page.
    window.location.href = 'login.html';
  }
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // Existing sign-in and sign-up operations
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('user-email').textContent = user.email;
      // Update the Google Sheet ID here
      document.getElementById('gsheet-id').textContent = '18qq79HtX5uFhIRPC2jgV_j9nGfH3CcFR5Pj5-RW9k4A';
    } else {
      // No user is signed in.
      // Redirect to the login page.
      window.location.href = 'login.html';
    }
  });
// Add an event listener to the logout button
document.getElementById('logout-button').addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = 'login.html'; // Redirect to the login page
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
});
  
