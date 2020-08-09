let player: any;

export default (setPlayer: Function) => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token =
      "BQBa4Fru9w_PitfuNek79dVK_tAnj15Jlef1wubMq2LPoQMze_UgnE9jodc_-0iD7y7C2kOoToUE-LU5O53mA-G1NnaWbgCr38zo6S7S_0rq_8USlERIR9RSxJX12EaYyAFSogOVyS7xchdqvas6OLBDn55Rc5skZ88FXGgFjM_kBSiiwFL942vBKxs";
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

    // Ready
    player.addListener("ready", ({ device_id }: any) => {
      console.log("Ready with Device ID", device_id);
      setPlayer(false);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Connect to the player!
    player.connect();
  };
};

export const getSongPlaying = (checkSongChange: Function) => {
  player.addListener("player_state_changed", (state: any) => {
    checkSongChange(state.track_window.current_track.name);
  });
};

export const getPlayer = () => {
  return player;
};
