function randomIndex(length) {
  return Math.floor(Math.random()*length);
}

function selectRandomPics(memes, amount) {
  const result = [];
  const alreadyChosen = [];
  do {
    const index = randomIndex(memes.length);
    if(!alreadyChosen.includes(index)) {
      result.push(memes[index]);
      alreadyChosen.push(index);
    }
  } while(result.length < amount && result.length < memes.length);
  return result;
}

module.exports = {
  selectRandomPics
};