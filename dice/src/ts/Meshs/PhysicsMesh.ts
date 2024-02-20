import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export interface PhysicsMesh extends THREE.Mesh {
  physics: CANNON.Body
}