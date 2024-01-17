import React, { useState, useEffect } from 'react';
import { Loader } from '@react-three/drei';
import { Button, Grid, Card, CircularProgress } from '@mui/material';
import Notification from '../Services/ResultNotification';
// import DonutChart from '../UI/DonutChart';
import BarChart from '../UI/BarChart';
import { Suspense } from 'react';
import GameScene from './GameScene';
import DonutChart from '../UI/DonutChart';
import rockSvg from '../Assets/svgs/rock.svg';
import paperSvg from '../Assets/svgs/paper.svg';
import scissorsSvg from '../Assets/svgs/scissors.svg';


const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isUserLosing, setIsUserLosing] = useState(false);
  const [isComputerLosing, setIsComputerLosing] = useState(false);
  const [userchoiceCounts, setUserChoiceCounts] = useState({});
  const [computerchoiceCounts, setComputerChoiceCounts] = useState({});




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

    if (choice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
      setWins((prevWins) => prevWins + 1);

    } else {
      setResult('Computer wins!');
      setLosses((prevLosses) => prevLosses + 1);
    }
  };
  useEffect(() => {
    // Check the result and set losing states accordingly
    if (result === 'You win!') {
      setIsComputerLosing(true);
    } else if (result === 'Computer wins!') {
      setIsUserLosing(true);
    } else {
      setIsUserLosing(false);
      setIsComputerLosing(false);
    }
  }, [result]);


  useEffect(() => {
    console.log('User Choice Counts:', userchoiceCounts);
    console.log('Computer Choice Counts:', computerchoiceCounts);

  }, [userchoiceCounts, computerchoiceCounts]);



  const canvasStyle = { background: '#282c34' };
  const UiStyle = { background: '#1B1B33', color: 'white', padding: '20px' };

  return (
    <div className='flex lg:flex-row  flex-col'>
      <div style={canvasStyle} class="flex flex-col w-full lg:w-4/5">

        <div className="flex-1 flex flex-row justify-center bg-slate-400 h-500  p-4">

          <Suspense fallback={<Loader />}>{userChoice && computerChoice && (<>
            <GameScene userChoice={userChoice} computerChoice={computerChoice} isUserLosing={isUserLosing} isComputerLosing={isComputerLosing} />
            <Notification result={result} />
          </>)}
          </Suspense>


        </div>

        <Card style={UiStyle}>
          <Grid item xs={12} spacing={2}>
            {[
              { choice: 'rock', svg: rockSvg },
              { choice: 'paper', svg: paperSvg },
              { choice: 'scissors', svg: scissorsSvg },
            ].map(({ choice, svg }) => (
              <Button key={choice} variant="outlined" onClick={() => handleChoice(choice)}>
                <img src={svg} alt={choice} width="24" height="24" />
                {choice}
              </Button>
            ))}
          </Grid>
        </Card>

        {/* <Card style={UiStyle}>

          <Grid item xs={12} spacing={2}>
            {['rock', 'paper', 'scissors'].map((choice) => (
              <Button key={choice} variant="outlined" onClick={() => handleChoice(choice)}>
                {choice}
              </Button>
            ))}
          </Grid>

        </Card> */}

      </div>

      <div className='w-full flex lg:w-1/5 pt-6 lg:flex-col flex-row'>
        <DonutChart wins={wins} losses={losses} />
        <BarChart userChoiceCounts={userchoiceCounts} computerChoiceCounts={computerchoiceCounts} />
      </div>
    </div>
  );
};

export default Game;