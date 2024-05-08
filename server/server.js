const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

const artistListArray = require('./public/modules/artist');

const songListArray = require('./public/modules/song');
const albumList = require('./public/modules/album');

app.use(express.static('server/public'));

app.get('/artist', (req, res) => {
  res.send(artistListArray);
});

// TODO - Add GET for songs

app.get('/song', (req, res) => {
  console.log('Processing /song request');
  res.send(songListArray);
});

app.post('/artist', (req, res) => {
  console.log('Processing /artist POST');
  let artist = req.body;
  artistListArray.push(artist);

  res.status(200).send(artist);
});

app.post('/song', (req, res) => {
  console.log('Processing /song POST');
  let song = req.body;
  songListArray.push(song);
  res.status(200).send(song);
});

app.get('/album', (req, res) => {
  res.send(albumList);
});

app.post('/album', (req, res) => {
  let album = req.body;
  albumList.push(album);
  res.status(200).send(album);
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
