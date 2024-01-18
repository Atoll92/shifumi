/* eslint-disable react/no-unknown-property */

import React, { useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Text } from '@react-three/drei';
import RotatingAnimatedModel from './RotatingAnimatedModel';
import PropTypes from 'prop-types';
// import { useSpring } from 'react-spring';
// import { animated } from 'react-spring';

const GameScene = ({ userChoice, computerChoice, result }) => {
    const userModel = useGltfScene(userChoice);
    const computerModel = useGltfScene(computerChoice);
    const Canvas_height = { height: '400px' };

    // Animation config
    // const textSpring = useSpring({
    //     opacity: 1,
    //     from: { opacity: 0 },
    //     reset: true,
    // });

    return (
        <Canvas style={Canvas_height} className="z-10" camera={{ position: [0, 0, 1.2] }} shadows>
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
            <RotatingAnimatedModel
                model={userModel}
                initialPosition={[-1, -0.5, 0]}
                animationType={result}
            />
            <RotatingAnimatedModel
                model={computerModel}
                initialPosition={[1, -0.5, 0]}
                animationType={result === 'lose' ? 'win' : (result === 'win' ? 'lose' : result)}
            />
            {/* <animated.group {...textSpring}> */}
                <Text
                    position={[0, -0.8, 0]}
                    color="#075985"
                    fontSize={0.2}
                    fontWeight={900}
                    maxWidth={300}
                    lineHeight={1.5}
                    letterSpacing={0.02}
                    textAlign="center"
                >
                    {getResultMessage(result)}
                </Text>
            {/* </animated.group> */}
        </Canvas>
    );
};

GameScene.propTypes = {
    userChoice: PropTypes.string.isRequired,
    computerChoice: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
};


const useGltfScene = (model) => {
    const gltf = useLoader(GLTFLoader, `/models/${model}.glb`);
    const scene = useMemo(() => gltf.scene.clone(), [gltf]);
    return scene;
};

const getResultMessage = (result) => {
    switch (result) {
        case 'win':
            return 'You win!';
        case 'lose':
            return 'You lose!';
        default:
            return 'Tie!';
    }
};



export default GameScene;
