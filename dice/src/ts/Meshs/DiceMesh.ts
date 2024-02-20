import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Position } from '../Position';
import { getRandomNum } from '../utils/getRandomNum';
import { SLoader } from '../TextureLoader';
import { v4 as uuidv4 } from 'uuid';

export class DiceMesh extends THREE.Mesh {
  private _meshUuid = uuidv4();
  get meshUuid() { return this._meshUuid; }

  private _meshName = 'dice'
  get meshName() { return this._meshName; }
  
  private _physics;
  get physics() { return this._physics; }

  constructor(width: number, height: number, depth: number, position: Position) {
    const sLoader = SLoader;
    const materials = [
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_px.png') }),
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_nx.png') }),
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_py.png') }),
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_ny.png') }),
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_pz.png') }),
      new THREE.MeshStandardMaterial({ color: 'white', map: sLoader.textureLoader.load('/textures/dice/dice_texture_nz.png') }),
    ]
    const geometry = new THREE.BoxGeometry(width, height, depth)
    super(geometry, materials);
    this.position.z = 10
    this._physics = new DiceMeshPhysics(width, height, depth, new CANNON.Vec3(position.x, position.y, position. z));
    this.receiveShadow = false
    this.castShadow = true
  }
}

class DiceMeshPhysics extends CANNON.Body {
  constructor(width: number, height: number, depth: number, position: CANNON.Vec3) {
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const material = new CANNON.Material({})
    super({ shape, material, position, mass: 1 });
  }

  roll(){
    const x = getRandomNum(-100, 100);
    const y = getRandomNum(-100, 100);
    const z = getRandomNum(20, 50);
    this.applyImpulse(new CANNON.Vec3(x, y, z));
  }
}