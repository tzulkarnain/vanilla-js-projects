var FLICKR_API_KEY = 'bc3edd62c04df732f292d3ca8df08429';
var FLICKR_API_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${FLICKR_API_KEY}&text=`

var app = document.querySelector('#app');
var searchForm = document.querySelector('.search-form');
var searchInput = searchForm.querySelector('.search-input');
var getResults = searchForm.querySelector('.get-results');
var photos = app.querySelector('.photos');


//Get the photos 
function getPhotosForSearch(search) {
 var url = `${FLICKR_API_URL}${search}`;
 
  return (
    fetch(url)
    .then(response => response.json())
    .then(data => data.photos.photo)
    .then(data => {
      console.log(data)
      return data.map(photo => ({
          title: photo.title, 
          thumb: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,  
          large: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
        })
      );
    })
  )
}

//Creating a img
function createFlickrThumb(photoData) {
  var link = document.createElement('a');
  link.setAttribute('href', photoData.large);
  link.setAttribute('target', '_blank');

  var image = document.createElement('img');
  image.setAttribute('src', photoData.thumb);
  image.setAttribute('alt', photoData.title);

  link.appendChild(image);

  photos.appendChild(link);

}

function processData(data) {
 data.forEach(createFlickrThumb);
}

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var info = searchInput.value;
  console.log(info);

 getPhotosForSearch(info) 
 .then(processData)
 
});



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