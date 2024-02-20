import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Position } from '../Position';

export class WallMesh extends THREE.Mesh {
  private _physics;
  get physics() { return this._physics; }

  constructor(width: number, height: number, depth: number, position: Position) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial();
    super(geometry, material)
    this._physics = new WallMeshPhysics(width, height, depth, new CANNON.Vec3(position.x, position.y, position.z));
  }
}

class WallMeshPhysics extends CANNON.Body {
  constructor(width: number, height: number, depth: number, position: CANNON.Vec3) {
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const material = new CANNON.Material()
    super({ shape, material, mass: 0, position })
  }
}