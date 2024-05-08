// const { response } = require('express');

function onReady() {
  console.log('Hello from client.js');

  axios({
    method: 'GET',
    url: '/artist',
  })
    .then(function (response) {
      // Code that will run on successful response
      // from the server.
      console.log(response);
      // quotesFromServer will be an Array of quotes
      let quotesFromServer = response.data;
      let contentDiv = document.querySelector('#artistTableBody');
      contentDiv.innerHTML = '';
      for (let artist of quotesFromServer) {
        contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
      }
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });

  // TODO Add Axios request for /songs and display on DOM
  axios
    .get('/song')
    .then((response) => {
      console.log(response);
      let songsFromServer = response.data;
      let contentDiv = document.querySelector('#songTableBody');
      contentDiv.innerHTML = '';
      for (const song of songsFromServer) {
        contentDiv.innerHTML += `
                <tr>
                <td>${song.title}</td>
                <td>${song.artist}</td>
                </tr>
                `;
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong, check console for more detail.');
    });
}

onReady();

function addArtist(event) {
  event.preventDefault();

  const name = document.getElementById('artist-name').value;
  const born = document.getElementById('artist-birth').value;
  const died = document.getElementById('artist-death').value;

  axios({
    method: 'POST',
    url: '/artist',
    data: {
      name,
      born,
      died,
    },
  })
    .then((response) => {
      console.log('Processing POST /artist request');

      document.getElementById('artist-name').value = '';
      document.getElementById('artist-birth').value = '';
      document.getElementById('artist-death').value = '';

      onReady();
    })
    .catch((error) => {
      console.log(error);
      alert('Trouble POSTing data, check console for more info.');
    });
}

function addSong(event) {
  event.preventDefault();

  const title = document.getElementById('song-title').value;
  const artist = document.getElementById('song-artist').value;

  axios
    .post('/song', { title, artist })
    .then((response) => {
      console.log('Processing POST /song request');

      document.getElementById('song-title').value = '';
      document.getElementById('song-artist').value = '';

      onReady();
    })
    .catch((error) => {
      console.log(error);
      alert('Trouble adding song, check console for more info.');
    });
}
