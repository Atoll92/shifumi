import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import winSound from '../Assets/sounds/win.mp3';
import tieSound from '../Assets/sounds/tie.mp3';
import loseSound from '../Assets/sounds/lose.mp3';

const GameResultSound = ({ result, isMuted }) => {
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const playSound = () => {
      let soundPath;

      switch (result) {
        case 'win':
          soundPath = winSound;
          break;
        case 'tie':
          soundPath = tieSound;
          break;
        case 'lose':
          soundPath = loseSound;
          break;
        default:
          return;
      }

      console.log("Sound Path:", soundPath);

      // Additional logging for debugging
      console.log("ismuted from grs:" + isMuted);

      const audio = audioRef.current;
      audio.src = soundPath;

      if (!isMuted) {
        // Ensure that the new source is loaded before playing
        audio.currentTime = 0; // Reset playback position to the beginning
        audio.load();
        audio.play();
      }
    };

    playSound();
  }, [result, isMuted]);

  return <audio ref={audioRef} />;
};

GameResultSound.propTypes = {
  result: PropTypes.oneOf(['win', 'tie', 'lose']),
  isMuted: PropTypes.bool.isRequired,
};

export default GameResultSound;
