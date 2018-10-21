const clientId = '637725621c8c4e2d85431f615d1d455a';
let accessToken;
let expiresIn;

const Spotify = {
  async getAccessToken() {

    console.log('running getAccessToken');
    if (accessToken) {
      console.log(`returning stored token of ${accessToken}`);
      return accessToken;
    } else if ( (window.location.href.indexOf('access_token') > -1) & (window.location.href.indexOf('expires_in') > -1) ) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      console.log(`token is set to ${accessToken}`);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log('do not have a token, redirecting to get one.');
      const urltoFetch = 'https://accounts.spotify.com/authorize?'
      const queryResponseType = '&response_type=token';
      const queryRedirect = 'redirect_uri=http://soggy-actor.surge.sh/';
      const scopes = 'user-read-private playlist-modify-private'
      const endpoint = `${urltoFetch}client_id=${clientId}&${queryRedirect}&scope=${scopes}${queryResponseType}`
      window.location = endpoint;
    }
  },
  search(term, accessToken) {
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    console.log(`in search, got token ${accessToken}`);
    return fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('There was an error')
        }
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return []
      } else {
        return jsonResponse.tracks.items.map(t => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          url: t.uri,
        })
      )
      }
    })
  },
  savePlaylist: (playlistName, uris, accessToken) => {
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userid = '';
    let playlistID = '';

    if (!playlistName || !uris || !uris.length) {
      return;
    } else {
      fetch(
        `https://api.spotify.com/v1/me`,
        { headers: headers},
      ).then(
        response => response.json()
      ).then(
        jsonResponse => {
          userid = jsonResponse.id
          /* create a new playlist and get back the playlist id */
          return fetch(
            `https://api.spotify.com/v1/users/${userid}/playlists`,
            { headers: {...headers, 'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({ name: playlistName }) }
          );
      }).then(
        response => response.json()
      ).then(
        jsonResponse => {
          console.log(jsonResponse);
          playlistID = jsonResponse.id;
          /* add tracks to the playlist */
          return fetch(`https://api.spotify.com/v1/users/${userid}/playlists/${playlistID}/tracks`, {
                  headers: headers,
                  method: 'POST',
                  body: JSON.stringify({uris: uris})
          })
        }
      );
    }
  }
}

export default Spotify;
