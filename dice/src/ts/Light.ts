import * as THREE from 'three'

export class Light extends THREE.PointLight {
  constructor() {
    super(0xffffff, 500);
    
    this.castShadow = true;
    this.shadow.mapSize.width = 2048
    this.shadow.mapSize.height = 2048
  }
}