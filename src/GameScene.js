import React, { useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Stats, Circle } from '@react-three/drei';

const GameScene = ({ userChoice, computerChoice }) => {

    const userModel = useGltfScene(userChoice)
    const computerModel = useGltfScene(computerChoice)

    return (
        <Canvas camera={{ position: [0, 0, 1] }} shadows>
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
                <primitive object={userModel} position={[-0.5, 0, 0]} castShadow />
                <primitive object={computerModel} position={[0.5, 0, 0]} castShadow />
            <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
            <meshStandardMaterial transparent opacity={0} />
            </Circle>
            <axesHelper args={[5]} />
            <Stats />
        </Canvas>
    );
};

const useGltfScene = (model) => {
    const gltf = useLoader(GLTFLoader, '/models/'+model+'.glb');
    const scene = useMemo(() => gltf.scene.clone(), [gltf]); // Clone the scene to be able to use multiple instances.
    return scene;
};

export default GameScene;