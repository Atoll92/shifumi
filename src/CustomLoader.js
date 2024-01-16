// CustomLoader.js

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const useGltfLoader = (path) => {
  return useLoader(GLTFLoader, path);
};

export default useGltfLoader;
