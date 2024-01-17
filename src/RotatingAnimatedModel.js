import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stats, Circle } from '@react-three/drei';
import * as THREE from 'three';

const RotatingAnimatedModel = ({ model, initialPosition, isLosing, onAnimationReset }) => {
    const [shouldRemove, setShouldRemove] = useState(false);
    const meshRef = useRef();

    useFrame(() => {
        // Check if the model is losing
        // if (isLosing) {
        //   // Explode effect: increase scale and move away from the center
        //   meshRef.current.position.x += (5 - meshRef.current.position.x) * 0.05;
        //   // Additional logic for the removal
        //   if (meshRef.current.position.distanceTo(new THREE.Vector3(5, 0, 0)) < 0.1) {
        //     setShouldRemove(true);
        //   }
        // } else {
        // Rotate the model slowly on both the x and y axes
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
        // Move the model towards [0, 0, 0]
        meshRef.current.position.x += (0 - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.05;
        meshRef.current.position.z += (0 - meshRef.current.position.z) * 0.05;
        // }
    });

    useEffect(() => {
        let cleanup = () => { };
        // Remove the model from the scene after the explosion effect
        if (shouldRemove) {
            // Reset animation here
            onAnimationReset();
            // Remove or handle as needed
            // For example: set a flag in the parent component to remove this model
            setShouldRemove(true);
        }
        return cleanup;
    }, [shouldRemove, onAnimationReset]);

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

export default RotatingAnimatedModel;
