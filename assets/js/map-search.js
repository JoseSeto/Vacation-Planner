
const apiKeyGoogleMaps = "AIzaSyBJh087JKLmbBCA_6ks7uBN7zZjkyYKVVw"

// All code is within this event listener. "DOMContentLoaded" means that the code inside will only execute when the HTMl is loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {

    // Getting elements and assigning them a const variable
    const cityInput = document.getElementById("search-city");
    const searchButton = document.getElementById("search-button");
    const mapIframe = document.getElementById("map-iframe");
  
    // This is setting the map to display USA as a center point of the map
    const defaultMapSrc = `https://www.google.com/maps/embed/v1/view?key=${apiKeyGoogleMaps}&center=39.8283,-98.5795&zoom=4`;
    mapIframe.src = defaultMapSrc;
  
    // This function is for updating the map to the specified city. `City` parameter will be the actual name of the city
    function updateMap(city) {
      const dynamicMapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKeyGoogleMaps}&q=${encodeURIComponent(city)}&zoom=11`;
      mapIframe.src = dynamicMapSrc;
    }
    
    searchButton.addEventListener("click", function (event) {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (city) {
        updateMap(city);
      }
    });
  
    // Load and display search history from local storage
    const historyList = document.querySelector(".History");
  
    // Loads The history
    function loadHistory() {
      let storedHistory = localStorage.getItem("searchHistory");
      const history = storedHistory && storedHistory !== "" ? JSON.parse(storedHistory) : [];     // re-written this line of code to be a `and` operator with a `ternnary` operator
      historyList.innerHTML = history.map(city => `<li>${city}</li>`).join("");
      for(let i=0; i<historyList.children.length; i++){
        historyList.children[i].classList.add('bg-emerald-800', 'hover:bg-emerald-900', 'mx-4','my-4','p-1', 'border-solid', 'rounded', 'border-4', 'font-semibold', 'text-xl', 'text-white', 'w-1/4')
      }  
    }
    
    function saveToHistory(city) {
      let storedHistory = localStorage.getItem("searchHistory");
      let history = storedHistory && storedHistory !== "" ? JSON.parse(storedHistory) : [];       // re-written this line of code to be a `and` operator with a `ternnary` operator
      history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
      history.unshift(city);
      if (history.length > 5) {
        history.pop();
      }
      localStorage.setItem("searchHistory", JSON.stringify(history));
      loadHistory();
    }
  
    // Update map and save city to search history when an item in the history is clicked
    historyList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const city = event.target.textContent;
        updateMap(city);
      }
    });
  
    // Save city to search history and update map when search button is clicked
    searchButton.addEventListener("click", function (event) {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (city) {
        updateMap(city);
        saveToHistory(city);
      }
    });
    function clearHistory(event){
      event.preventDefault()
      localStorage.setItem("searchHistory", "[]")
      mapIframe.src = defaultMapSrc;                                            // Added a function when user clicks the clear history, it will call the `mapIframe.src` which is the default map display (init)
    }
    const clearButtonEl = document.getElementById("clear-button");              // Added a const for the `clearButtonEl`
    clearButtonEl.addEventListener("click", clearHistory)                       // Event listener for the `clearButtonEl`

  
    // Load search history when the page is loaded
    loadHistory();
  });

  