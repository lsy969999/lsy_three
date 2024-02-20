import * as THREE from 'three';
import { SScreenInfo } from './ScreenInfo';

class Renderer extends THREE.WebGLRenderer{
  constructor() {
    const sScreenInfo = SScreenInfo;
    super({ alpha: true, antialias: true, canvas: sScreenInfo.domEl });
    this.setClearColor(0x000000)
    this.setSize(sScreenInfo.width, sScreenInfo.height);
    this.setPixelRatio(sScreenInfo.dpr)

    this.shadowMap.enabled = true
  }

  resize() {
    const sScreenInfo = SScreenInfo;
    this.setSize(sScreenInfo.width, sScreenInfo.height);
    this.setPixelRatio(sScreenInfo.dpr)
  }
}

export const SRenderer = new Renderer();