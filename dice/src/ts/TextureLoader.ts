import * as THREE from 'three';

export class Loader {
  cubeTexutreLoader = new THREE.CubeTextureLoader();
  textureLoader = new THREE.TextureLoader();
}

export const SLoader = new Loader()