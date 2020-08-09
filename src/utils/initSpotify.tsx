let player: any;

export const initSpotify = (setSongPlaying: Function, songPlaying: string) => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token =
      "BQBModbBWw5LdhO7kLciQe6n9rVLa1P43vKCI5SpECb6L4ouAMbRKGFXn0Hy-UUFjX4fRL9cVlk3eWOyd0O_5QLceA7yPumEBLF6sEEmVbwzCy6R41HNDmdzgwkdkJfgzJomXQ2xxYqWtKq61JoalNMtp9nJ1IFSNGlDjSsGKIYRdJ5PdPDf6AddsJc";
    player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb: any) => {
        cb(token);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }: any) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }: any) => {
      console.error(message);
    });

    // Playback status updates
    player.addListener("player_state_changed", (state: any) => {
      if (songPlaying !== state.track_window.current_track.name) {
        setSongPlaying(state.track_window.current_track.name);
      }
    });

    // Ready
    player.addListener("ready", ({ device_id }: any) => {
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };
};

export const getPlayer = () => {
  return player;
};
