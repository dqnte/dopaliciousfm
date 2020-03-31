import React from 'react';
import { connect } from 'react-redux';

const SpotifyPlayer = props => {
  const mountMusicPlayer = token => {
    if (window.Spotify) {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token);
        },
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    }
  };

  const { user } = props;
  if (user && user.accessToken) {
    mountMusicPlayer(props.user.accessToken);
  }

  return <h1>Player</h1>;
};

const mapState = state => {
  return { user: state.user };
};

export default connect(mapState, null)(SpotifyPlayer);