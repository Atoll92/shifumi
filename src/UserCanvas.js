// UserCanvas.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Stats, Circle } from '@react-three/drei';

const UserCanvas = ({ userChoice }) => {

    const rock = useLoader(GLTFLoader, '/models/rock.glb');
    const paper = useLoader(GLTFLoader, '/models/paper-bag.glb');
    const scissors = useLoader(GLTFLoader, '/models/scissors.glb');

  const canvasRef = useRef();


// useEffect(() => {


//   const canvas = canvasRef.current.domElement;
//   canvas.addEventListener(
//         'webglcontextlost',
//         function (event) {
//           event.preventDefault();
//           setTimeout(function () {
//             renderer.forceContextRestore();
//           }, 1);
//         },
//         false
//       );
    
//    }, []);

  return (
    <Canvas ref={canvasRef} key={userChoice} camera={{ position: [0.2, 0.2, 0.5] }} shadows>
      {/* Render user's models based on userChoice */}
      <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
      {userChoice === 'rock' && (
        <primitive object={rock.scene} position={[-0.1, -0.2, -0.2]} castShadow />
      )}
      {userChoice === 'paper' && (
        <primitive object={paper.scene} position={[0, 0, 0]} castShadow />
      )}
      {userChoice === 'scissors' && (
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

export default UserCanvas;
