import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import { PhysicsMesh } from './Meshs/PhysicsMesh';

export class Physics extends CANNON.World {
  private clock = new THREE.Clock();
  constructor() {
    super();

    this.gravity = new CANNON.Vec3(0, 0, -29.82);
    this.broadphase = new CANNON.SAPBroadphase(this)
    this.allowSleep = true;
  }

  add(...physicies: Array<CANNON.Body>) {
    physicies.forEach(physics => {
      this.addBody(physics)
    })
  }

  update(...models: Array<PhysicsMesh>) {
    const deltaTime = this.clock.getDelta();
    this.step(1 / 60, deltaTime)
    models.forEach(model => {
      if(model.physics){
        model.position.copy(model.physics.position);
        model.quaternion.copy(model.physics.quaternion);
      }
    })
  }
}

export const SPhysics = new Physics()