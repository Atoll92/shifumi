/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

const RotatingAnimatedModel = ({ model, initialPosition, animationType }) => {
    const meshRef = useRef();

    const randRotX = Math.random() * 0.01;
    const randRotY = Math.random() * 0.01;
    let velocityX = -0.05 * initialPosition[0];
    let velocityY = 0.05;
    let gravity = true;
    let dragFactor = 0.999;

    useFrame(() => {

        meshRef.current.rotation.x += randRotX;
        meshRef.current.rotation.y += randRotY;

        // Move the model
        if (gravity) {
            velocityY -= 0.002;
        }
        velocityX *= dragFactor;
        velocityY *= dragFactor;
        meshRef.current.position.x += velocityX;
        meshRef.current.position.y += velocityY;

        if (Math.abs(meshRef.current.position.x) < 0.1) {
            if (animationType === 'lose') {
                velocityX = -velocityX;
            } else if (animationType === 'win') {
                velocityX = 0;
                velocityY = 0;
                gravity = false;
            } else if (animationType === 'tie') {
                velocityX = -velocityX;
                dragFactor = 0.9;
                velocityY = 0;
                gravity = false;
            }
        }
    });

    return (
        <primitive
            object={model}
            position={initialPosition}
            ref={meshRef}
            key={`${initialPosition.join('-')}-${Date.now()}`}
            castShadow
        />
    );
};

RotatingAnimatedModel.propTypes = {
    model: PropTypes.object.isRequired,
    initialPosition: PropTypes.array.isRequired, // Assuming initialPosition is an array
    animationType: PropTypes.string.isRequired,
};

export default RotatingAnimatedModel;
