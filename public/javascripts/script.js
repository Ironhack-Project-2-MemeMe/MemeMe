document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);
// it renders 10 more images. We need to find logic for rendering random 10 images 
// I created meme-list.hbs
// I dont know why it shows us the comment section 
document.querySelector('.see-more').addEventListener('click', () => {
  getRandomMemes(10);
});

function getRandomMemes(numberOfMemes) {
  var request = new XMLHttpRequest();
  request.open('GET', '/meme/random/' + numberOfMemes, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const resp = this.response;
      console.log(resp);
      var el = document.querySelector('#imgList');
      el.insertAdjacentHTML('beforeend', resp);
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
}