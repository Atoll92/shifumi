// ComputerCanvas.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, Circle } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';


const ComputerCanvas = ({ computerChoice }) => {

    const rock = useLoader(GLTFLoader, '/models/rock.glb');
    const paper = useLoader(GLTFLoader, '/models/paper-bag.glb');
    const scissors = useLoader(GLTFLoader, '/models/scissors.glb');

  return (
    <Canvas key={computerChoice} camera={{ position: [0.2, 0.2, 0.5] }} shadows>
      {/* Render computer's models based on computerChoice */}
      <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
      {computerChoice === 'rock' && (
        <primitive object={rock.scene} position={[-0.1, -0.2, -0.2]} castShadow />
      )}
      {computerChoice === 'paper' && (
        <primitive object={paper.scene} position={[0, 0, 0]} castShadow />
      )}
      {computerChoice === 'scissors' && (
        <primitive object={scissors.scene} position={[0, 0, 0]} castShadow />
      )}
      <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial transparent opacity={0} />
      </Circle>
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  );
};

export default ComputerCanvas;
