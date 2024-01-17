import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Stats, Circle } from '@react-three/drei';
import * as THREE from 'three';
import RotatingAnimatedModel from './RotatingAnimatedModel';

const GameScene = ({ userChoice, computerChoice, isUserLosing, isComputerLosing }) => {
  const userModel = useGltfScene(userChoice);
  const computerModel = useGltfScene(computerChoice);

  const handleAnimationReset = (initialPosition) => {
    // Reset animation logic goes here
    // For example, you can reset rotation, position, or any other animation state
  };

  return (
    <Canvas camera={{ position: [0, 0, 0.8] }} shadows>
      <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
      <RotatingAnimatedModel
        model={userModel}
        initialPosition={[-2, 0, 0]}
        isLosing={isUserLosing}
        onAnimationReset={handleAnimationReset}
      />
      <RotatingAnimatedModel
        model={computerModel}
        initialPosition={[2, 0, 0]}
        isLosing={isComputerLosing}
        onAnimationReset={handleAnimationReset}
      />

      <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial transparent opacity={0} />
      </Circle>
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  );
};

const useGltfScene = (model) => {
  const gltf = useLoader(GLTFLoader, `/models/${model}.glb`);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]); // Clone the scene to be able to use multiple instances.
  return scene;
};



export default GameScene;
