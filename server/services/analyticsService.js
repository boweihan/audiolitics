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
    totalWords.push({ name: key, amt: hash[key] });
  }
  totalWords.sort((a, b) => {
    return a.amt < b.amt;
  });
  return totalWords.slice(0, 5);
};

const buildSingleFileAnalytics = transcription => {
  return {
    transcription,
    mostUsedWords: mostUsedWords(transcription),
  };
};

module.exports = { buildSingleFileAnalytics };
