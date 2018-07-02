# Audiolitics

Audio content analytics for podcasts and videos.

### Step 1:

- Upload content
- Link content
- Link content on filesystem

https://cloud.google.com/storage/ (file storage)
https://github.com/przemyslawpluta/node-youtube-dl (file upload via youtube)

### Step 2:

- Organize content (categories, date, etc)
  REST API / CRUD

Landing page flow

- upload video / audio / etc
- get video metrics, dashboard

Logged in flow

- upload video to collection
- get video metrics, dashboard (per video)
- get trends and aggregated dashboard

### Step 3:

- Generate analytics for content based on speech, sentiment, length, pace, etc.

Speech to text
https://cmusphinx.github.io/wiki/tutorialoverview/ (DIY)
https://cloud.google.com/speech-to-text/
https://speech-to-text-demo.ng.bluemix.net/

Sentiment
https://medium.com/@sifium/top-five-emotional-sentiment-analysis-apis-116cd8d42055

Length / Pace

### Step 4:

- Expose API
- Single video analysis
- Video collection analysis
