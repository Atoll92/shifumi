import React, { useState } from 'react';
import { Loader } from '@react-three/drei';
import { Suspense } from 'react';
import GameScene from './GameScene';
import DonutChart from '../Dataviz/DonutChart';
import Controls from './Controls';
import UserBarChart from '../Dataviz/UserBarChart';
import ComputerBarChart from '../Dataviz/ComputerBarChart';
import RestartButton from '../Services/Restart';
import MuteButton from './MuteButton';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import tie from '../Assets/sounds/tie.mp3';
import win from '../Assets/sounds/win.mp3';
import lose from '../Assets/sounds/lose.mp3';

// 

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null); // 'win', 'lose', or "tie"
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userchoiceCounts, setUserChoiceCounts] = useState({});
  const [computerchoiceCounts, setComputerChoiceCounts] = useState({});
  const [controlsKey, setControlsKey] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const sounds = {
    win: new Audio(win),
    tie: new Audio(tie),
    lose: new Audio(lose),
  };

  const handleToggleMute = () => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  };

  const handleChoice = (choice) => {
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    setComputerChoice(computerChoice);
    setUserChoice(choice);

    setUserChoiceCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[choice] = (updatedCounts[choice] || 0) + 1;
      return updatedCounts;
    });
    setComputerChoiceCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      updatedCounts[computerChoice] = (updatedCounts[computerChoice] || 0) + 1;
      return updatedCounts;
    });

    if (choice === computerChoice) { //tie
      setResult("tie");
      if(!isMuted){sounds.tie.play()}
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) { //win
      setResult('win');
      if(!isMuted){sounds.win.play()}
      setWins((prevWins) => prevWins + 1);
      }
      else { //lose
      setResult('lose');
      if(!isMuted){sounds.lose.play()}
      setLosses((prevLosses) => prevLosses + 1);
    }
    
  };

  const handleRestart = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setWins(0);
    setLosses(0);
    setUserChoiceCounts({});
    setComputerChoiceCounts({});
    setControlsKey((prevKey) => prevKey + 1);
  };

  const UiStyle = { background: 'transparent', color: 'white', padding: '20px', margin: 'auto' };

  return (
    <div className='flex lg:flex-row  pt-5 pb-5 relative z-0 flex-col bg-orange-50'>
      <div className='w-full flex pt-0 lg:w-1/5  lg:order-first  sm:pt-0 lg:pt-48'>
        <UserBarChart userChoiceCounts={userchoiceCounts} />
      </div>
      <div className="flex flex-col w-full lg:w-3/5 order-first md:order-0 lg:order-0 ">
        <div className="flex-1 flex flex-row justify-center z-10 p-4 ">
          <Suspense fallback={<Loader />}>{userChoice && computerChoice && (<>
            <GameScene userChoice={userChoice} computerChoice={computerChoice} result={result} />
          </>)}
          </Suspense>
          <Typography  className="w-full lg:w-3/5 mx-2 p-4 lg:p-0 lg:mx-0" variant="h5" component="div" style={{ fontWeight: 'bold', color: '#0088fe', margin:'20px 20px  ' , position:'absolute', textAlign:'left'}}>
              Player
            </Typography>
          <Typography  className="w-full lg:w-3/5 mx-2 p-4 lg:p-0 lg:mx-0 " variant="h5" component="div" style={{ fontWeight: 'bold', color: '#ff8042', margin:'20px 20px' , position:'absolute', textAlign:'right'}}>
              Computer
            </Typography>
        </div><>
        
            </>
        <DonutChart wins={wins} losses={losses} />
        <Controls key={controlsKey} className="m-auto" UiStyle={UiStyle} handleChoice={handleChoice} isMuted={isMuted} onToggleMute={handleToggleMute} />
        <Stack style={{ flexDirection: 'row' }} className='m-auto flex flex-row w-1/2 h-48' spacing={2}>
          <RestartButton onRestart={handleRestart} />
          <MuteButton isMuted={isMuted} onToggleMute={handleToggleMute} />
        </Stack>
      </div>
      <div className='w-full flex lg:w-1/5 pt-0 lg:pt-48'>
        <ComputerBarChart userChoiceCounts={userchoiceCounts} computerChoiceCounts={computerchoiceCounts} />
      </div>
    </div>
  );
};

export default Game;