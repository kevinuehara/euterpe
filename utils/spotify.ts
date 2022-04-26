import querystring from 'querystring';

const client_id = 'c747c6e13c3045f0b05db0f26c29c21b';
const client_secret = 'c3f1724b1f9e4a79b820625204025719';
const refresh_token = 'AQAjUk0LP6wb5wBg6x6frGGV_okYNJLc5sHyvz2vUI3Z39FM82Pd0z1erAhmySkQO5AJWTUFmjEtyLfbJt4ozLfNAzwzrdfiheBfBsomFKgUNEm0YAGJzO4HHANKCZerslY';

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};


const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?market=PT`;

 
export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getTrackById = async (trackId: string) => {
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=PT`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};