# ANDAMO Website - Travel Tourism Advisor

## Introduction

This web application is designed to display points of interest from a Google Sheet on a map and in a list view. Users can search for locations, filter by city and category, and sort the results. The application also allows users to view additional details about each location, including images, descriptions, and distances from their current location.

## Features

- **Map View:** Display points of interest on an interactive map.
- **List View:** View a list of points of interest with details.
- **Search:** Search for locations by name or address.
- **Filter:** Filter locations by city and category.
- **Sort:** Sort locations by name or distance.
- **Responsive Design:** The application is designed to work on various devices, including desktop and mobile.

## Getting Started

### Prerequisites

- **Google Sheet:** The application relies on Google Sheets as the data source. Ensure that the Google Sheet is properly configured with the required columns (name, address, city, type, description, latitude, longitude, image).

### Installation

1. **Clone the Repository:**

2. **Navigate to Project Directory:**

3. **Open `index.html` in a Browser:**
Open the `index.html` file in your preferred web browser.

4. **Enter Google Sheet ID:**
You will be prompted to enter the Google Sheet ID. This ID is used to fetch data from the Google Sheet.

5. **Explore the Web App:**
Once you've entered the Google Sheet ID, you can explore the map and list view, search for locations, and customize the display.

## Usage

- **Map View:**
- Explore the interactive map.
- Click on markers to view details about each location.
- **List View:**
- Scroll through the list of locations.
- Click on items to view details and open corresponding map markers.

## Customization

### Change Map Icon Colors

- Open `script.js`.
- Locate the `iconConfig` object.
- Modify the color values for each location type.

"""
const iconConfig = {
Food: "red",
Drinks: "green",
Breakfast: "yellow",
Museum: "blue",
Park: "orange",
Shop: "grey",
Beach: "violet",
};
"""

### Customize Styling

- Open `styles.css`.
- Modify the styles as needed for banners, search bars, and other elements.

### Update Google Sheet Data

- Update the Google Sheet with new data.
- Press the "Change Google Sheet ID" button in the web app to fetch the updated data.

## Credits

- **Leaflet:** [Leaflet](https://leafletjs.com/) is used for the interactive map.
- **Swiper:** [Swiper](https://swiperjs.com/) is used for the responsive slider.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
