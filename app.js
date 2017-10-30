(function() {
    var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
    var DARKSKY_API_KEY = '67d441a36a07f823623ebc5c1c8fac8b';
    var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  
    var GOOGLE_MAPS_API_KEY = 'AIzaSyDoW-FYdruUcQEHQjobXWSuaAndzWiWFHI';
    var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  
    function getCurrentWeather(coords) {
      var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=auto`;
  
      return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.currently)
      );
    }
  
    function getCoordinatesForCity(cityName) {
      var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
  
      return (
        fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)
      );
    }
  
    var app = document.querySelector('#app');
    var cityForm = app.querySelector('.city-form');
    var cityInput = cityForm.querySelector('.city-input');
    var getWeatherButton = cityForm.querySelector('.get-weather-button');
    var cityWeather = app.querySelector('.city-weather');
  
    cityForm.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent the form from submitting
  
      var city = cityInput.value;
  
      cityWeather.innerText = 'Loading...';

      getCoordinatesForCity(city)
      .then(getCurrentWeather)
      .then(function(weather) {
        cityWeather.innerText = 'Current temperature: ' + weather.temperature + ' ' + weather.summary;
        var key = weather.icon.toUpperCase().split('-').join('_')
        console.log(weather.icon, key)
        icons.set("weather-icon", Skycons[key]);
        icons.play();
       console.log(weather);
      })
    });
  })();


  //Header icon
  anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: function(el, i) {
      return 800 * i;
    }
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


  //auto search
function activatePlacesSearch(){
    var input = document.getElementById('search_term');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

//icons set
var icons = new Skycons({"color": "orange"});
var iconSet = {"clear-day": Skycons.CLEAR_DAY }
