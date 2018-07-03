const buildWordHash = text => {
  let freq = {};
  let arr = text.split(' ');
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    if (freq[word]) {
      freq[word]++;
    } else {
      freq[word] = 1;
    }
  }
  return freq;
};

const mostUsedWords = text => {
  let hash = buildWordHash(text);
  let totalWords = [];
  for (let key of Object.keys(hash)) {
    totalWords.push({ word: key, count: hash[key] });
  }
  totalWords.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count < b.count) {
      return 1;
    }
    return 0;
  });
  let returnVal = totalWords.slice(0, 5);
  console.log(totalWords);
  return returnVal;
};

const buildSingleFileAnalytics = transcription => {
  return {
    transcription,
    mostUsedWords: mostUsedWords(transcription),
  };
};

module.exports = { buildSingleFileAnalytics };
