// it renders 10 more images. We need to find logic for rendering random 10 images 
// I created meme-list.hbs
// I dont know why it shows us the comment section 
window.onscroll = function() {
  if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
         getRandomMemes(10);
    }
};

function getRandomMemes(numberOfMemes) {
  var request = new XMLHttpRequest();
  request.open('GET', '/meme/random/' + numberOfMemes, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const resp = this.response;
      var el = document.querySelector('.imgList');
      el.insertAdjacentHTML('beforeend', resp);
      waterfall('.imgList');
    } else {
      // We reached our target server, but it returned an error
      console.log('error status while loading more memes: ', this.status);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log('error while loading more memes: cant connect');
  };

  request.send();
}