import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Position } from '../Position';

export interface FloorMeshOptions {
  opacity?: number
}

export class FloorMesh extends THREE.Mesh {
  private _physics;
  get physics() { return this._physics; }
  
  constructor(width: number, height: number, depth: number, position: Position, option?: FloorMeshOptions) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ transparent: true, opacity: option?.opacity ?? 1 });
    super(geometry, material);
    this._physics = new FloorMeshPhysics(width, height, depth, new CANNON.Vec3(position.x, position.y, position.z))
    this.receiveShadow = true;
  }
}

class FloorMeshPhysics extends CANNON.Body {
  constructor(width: number, height: number, depth: number, position: CANNON.Vec3) {
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const material = new CANNON.Material({ });
    super({shape, material, mass: 0, position})
  }
}