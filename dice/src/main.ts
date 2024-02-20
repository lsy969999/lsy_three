

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { SAnimate } from "./ts/Animate";
import { Camera } from './ts/Camera';
import { SRenderer } from './ts/Renderer';
import { DiceMesh } from './ts/Meshs/DiceMesh';
import { SWindowEvents } from './ts/WindowEvents';
import { SScreenInfo } from './ts/ScreenInfo';
import { FloorMesh } from './ts/Meshs/FloorMesh';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { SPhysics } from './ts/Physics';
import { Light } from './ts/Light';
import { getRandomNum } from './ts/utils/getRandomNum';

const scene = new THREE.Scene();

const sScreenInfo = SScreenInfo
const sRenderer = SRenderer;
const camera = new Camera()
camera.update()
scene.add(camera)
const light = new Light()
light.position.set(0, -5, 23)
scene.add(light);

const floor = new FloorMesh(50, 50, 1, {x: 0, y: 0, z: 0})
const top = new FloorMesh(50, 1, 20, {x: 0, y: 25, z: 10})
const left = new FloorMesh(1, 50, 20, {x: -25, y: 0, z: 10})
const right = new FloorMesh(1, 50, 20, {x: 25, y: 0, z: 10})
const bottom = new FloorMesh(50, 1, 20, {x: 0, y: -25, z: 10})
const ceil = new FloorMesh(50, 50, 1, {x: 0, y: 0, z: 20}, { opacity: 0 })

const dice = new DiceMesh(5, 5, 5, {x: 0, y: 0, z: 10})
// const dice2 = new DiceMesh(5, 5, 5, {x: 0, y: 0, z: 10})
// dice.physics.quaternion.setFromEuler(0, 1, 0)

const dices = [
  dice
]
const meshs = [
  ...dices, floor, top, left, right, bottom, ceil
]

scene.add(...meshs)

const sPhysics = SPhysics

sPhysics.add(...meshs.map(m=>m.physics));

const sAnimate = SAnimate
sAnimate.addAnimate('render', () => {
  sRenderer.render(scene, camera)
  sPhysics.update(...meshs)
})

const controls = new OrbitControls(camera, sScreenInfo.domEl)

const sWindowEvents = SWindowEvents;
sWindowEvents.addResizeEvent('resize', () => {
  sScreenInfo.resize()
  sRenderer.resize()
  camera.resize()
})

///
//


const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// window['direc'] = () => {
//   dices.forEach(dice => {
//     console.log(dice.physics.quaternion)
//     // console.log(dice.rotation)
//     // dice.physics.quaternion.setFromEuler(0, 1, 0)
//   })
// }

const rollDiceBtn = document.querySelector('#roll-dice-btn')!
rollDiceBtn.addEventListener('click', () => {
  dices.forEach(dice => {
    dice.physics.roll()
  })
})
const addDiceBtn = document.querySelector('#add-dice-btn')!
addDiceBtn.addEventListener('click', () => {
  addDice();
})

const addDice = () => {
  const x = getRandomNum(-5, 5)
  const y = getRandomNum(-5, 5)
  const z = 10
  const dice = new DiceMesh(5, 5, 5, {x, y, z})
  dices.push(dice)
  meshs.push(dice)
  scene.add(dice)
  sPhysics.add(dice.physics);
}

const minusDiceBtn = document.querySelector('#minus-dice-btn')!
minusDiceBtn.addEventListener('click', () => {
  removeDice(false)
})

const removeDice = (allRemoveFlag: boolean) => {
  for(let i = meshs.length - 1; i >= 0; i --) {
    if (meshs[i] instanceof DiceMesh) {
      const dice = meshs[i] as DiceMesh
      removeDiceThree(dice)
      scene.remove(dice)
      meshs.splice(i, 1)
      for (let j = 0; j < dices.length; j++) {
        if (dice.uuid === dices[j].uuid) {
          dices.splice(j, 1)
        }
      }
      if(!allRemoveFlag) {
        break;
      }
    }
  }
}

const removeDiceThree = (dice: DiceMesh) => {
  dice.geometry.dispose();
  (dice.material as THREE.Material[]).forEach(m => {
    m.dispose()
  })
  sPhysics.removeBody(dice.physics)
  scene.remove(dice)
}

const resetDiceBtn = document.querySelector('#reset-dice-btn')!
resetDiceBtn.addEventListener('click', () => {
  removeDice(true)
  addDice();
})
