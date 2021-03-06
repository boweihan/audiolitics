const gcpService = require('./gcpService');

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
  let data = totalWords.slice(0, 5);
  return data;
};

const sentiment = async text => {
  let sentiment = await gcpService.analyzeSentiment(text);
  let data = [];
  data.push({ name: 'Sentiment', value: sentiment.score });
  return data;
};

const syntax = async text => {
  let syntax = await gcpService.analyzeSyntax(text);
  return syntax;
};

const categories = async text => {
  let categories = await gcpService.classifyText(text);
  return categories.categories;
};

const entities = async text => {
  let entities = await gcpService.analyzeEntities(text);
  let data = [];
  for (let i = 0; i < entities.length; i++) {
    data.push(entities[i].name);
  }
  return data;
};

const wpm = (transcription, duration) => {
  const words = transcription.split(' ').length;
  const minutes = duration / 60;
  return `${Math.round(words / minutes)} WPM`;
};

const buildSingleFileAnalytics = async (transcription, duration) => {
  return {
    transcription,
    mostUsedWords: mostUsedWords(transcription),
    sentiment: await sentiment(transcription),
    syntax: await syntax(transcription),
    categories: await categories(transcription),
    entities: await entities(transcription),
    wpm: wpm(transcription, duration),
  };
};

module.exports = { buildSingleFileAnalytics };
