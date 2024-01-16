// Game.js

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Circle } from '@react-three/drei';
import useGltfLoader from './CustomLoader'; // Adjust the import path based on your project structure

const choices = ['rock', 'paper', 'scissors'];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  // Unconditionally call the custom loader hook
  const userChoiceModel = useGltfLoader(userChoice ? `/models/${userChoice}.glb` : '');
  const computerChoiceModel = useGltfLoader(computerChoice ? `/models/${computerChoice}.glb` : '');

  const handleChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoice);
    setUserChoice(choice);

    // Determine the winner
    if (choice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('Computer wins!');
    }
  };

  return (
    <div>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />

        {/* Render models conditionally */}
        {userChoiceModel && <primitive object={userChoiceModel.scene} position={[-1.2, 0, 0]} />}
        {computerChoiceModel && <primitive object={computerChoiceModel.scene} position={[1.2, 0, 0]} />}

        <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
          <meshStandardMaterial />
        </Circle>

        <OrbitControls target={[0, 1, 0]} />
        <Stats />
      </Canvas>

      <div>
        {/* Display user and computer choices only when they are not null */}
        {userChoice && <p>Your choice: {userChoice}</p>}
        {computerChoice && <p>Computer's choice: {computerChoice}</p>}
        {result && <p>{result}</p>}
      </div>

      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
