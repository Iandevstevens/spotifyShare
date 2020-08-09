import React, { useEffect, useState } from "react";
import { initSpotify, getPlayer } from "./utils/initSpotify";
import "./App.css";

function App() {
  const [songPlaying, setSongPlaying] = useState("nothing playing");
  useEffect(() => {
    initSpotify(setSongPlaying, songPlaying);
  }, []);

  const lowerVolume = () => {
    const player = getPlayer();
    player.getVolume().then((volume: number) => {
      let volume_percentage = volume;
      console.log(`The volume of the player is ${volume_percentage}%`);
      if (volume > 0.1) {
        player.setVolume(volume - 0.1).then(() => {
          console.log("Volume updated!");
        });
      }
    });
  };

  const increaseVolume = () => {
    const player = getPlayer();
    player.getVolume().then((volume: number) => {
      let volume_percentage = volume;
      console.log(`The volume of the player is ${volume_percentage}%`);
      if (volume < 0.9) {
        player.setVolume(volume + 0.1).then(() => {
          console.log("Volume updated!");
        });
      }
    });
  };

  const mute = () => {
    const player = getPlayer();
    player.setVolume(0).then(() => {
      console.log("Volume updated!");
    });
  };

  return (
    <div className="App">
      <h2>{songPlaying}</h2>
      <button onClick={lowerVolume}>Lower</button>
      <button onClick={increaseVolume}>Higher</button>
      <button onClick={mute}>Mute</button>
    </div>
  );
}

export default App;
