import * as THREE from 'three'
import { SScreenInfo } from './ScreenInfo'

export class Camera extends THREE.PerspectiveCamera {
  constructor() {
    const screensize = SScreenInfo
    const aspect = screensize.width / screensize.height;
    const fov = 75;
    const near = 0.1;
    const far = 100;
    super(fov, aspect, near, far);
  }

  resize() {
    const screensize = SScreenInfo
    this.aspect = screensize.width / screensize.height
    this.updateProjectionMatrix()
  }

  update() {
    this.position.set(1, -20, 50)
  }
}