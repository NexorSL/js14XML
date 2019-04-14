function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'https://jsonplaceholder.typicode.com/photos', true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile('https://jsonplaceholder.typicode.com/photos', function(text){
  var jsonParse = JSON.parse(text);
  var MAX_IMAGES = 50;
  var imagesParse = [];

  for(var i = 0;i<MAX_IMAGES; i++){
    imagesParse[i] = jsonParse[i];
  }
  loadImages(imagesParse);
});
var sec = document.getElementById('Main-sec');
var frag = document.createDocumentFragment();


function loadImages(data){
  var imgShift = data.shift();
  if(imgShift === undefined){
    return;
  }
  loadImage(imgShift.thumbnailUrl)
    .then ( function (url) {
      loadImage(imgShift.url)
        .then( function (zoomUrl) {
            var art = document.createElement('article');
            art.setAttribute('class', 'article-img');

            var link = document.createElement('a');
            link.setAttribute('href', zoomUrl);

            var img1 = document.createElement('img');
            img1.src=url;
            img1.setAttribute('class', 'parseImg');

            var p = document.createElement('p');
            p.setAttribute('class', 'parImg');
            p.innerHTML = imgShift.title;

            var rating = document.createElement('img'),
                dvd = document.createElement('img');

            var div = document.createElement('div');
            div.setAttribute('class', 'rating-dvd');
            rating.setAttribute('src', 'image/starsN.png');
            dvd.setAttribute('src', 'image/dvd-fg.png');
            div.appendChild(rating);
            div.appendChild(dvd);

            link.appendChild(img1);
            art.appendChild(link);
            art.appendChild(p);
            art.appendChild(div);
            frag.appendChild(art);
            sec.appendChild(frag);
            return loadImages(data);
        })
    })
}
function loadImage(url) {
    return new Promise(function (resolve, reject) {

        var img = new Image();

        img.src = url;

        img.onload = function () {
            return resolve(url);
        }
        img.onerror = function () {
            return reject(url);
        }

    });
}
