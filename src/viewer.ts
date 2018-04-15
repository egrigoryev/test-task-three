// import * as THREE from 'three';
// import { OrbitControls } from 'three-orbitcontrols-ts';`
declare let THREE: any;
import {ObjectController} from './objectController';

export class Viewer {
  public objectController: ObjectController;
  public orbit: THREE.OrbitControls;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public container: HTMLElement;
  public createButton: HTMLElement;
  public objectType: string;
  public objectSizeScale: string;
  public objectUUID: string;

  public init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = window.document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(400, 200, 0);
    this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.25;
    this.orbit.minDistance = 100;
    this.orbit.maxDistance = 2000;
    this.orbit.maxPolarAngle = Math.PI / 2;

    let directionalLight1 = new THREE.DirectionalLight(0xffffff);
    directionalLight1.position.set(1, 1, 1);
    this.scene.add(directionalLight1);

    let directionalLight2 = new THREE.DirectionalLight(0x002288);
    directionalLight2.position.set(- 1, - 1, - 1);
    this.scene.add(directionalLight2);

    let ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    window.addEventListener('resize', this.onWindowResize, false);

    /*
    *  Control panel service
    */
    this.objectController = new ObjectController('');
    this.createButton = window.document.getElementById('create-button__button');

    this.createButton.addEventListener('click', () => {
      // Receive parameters for object creating from HTML
      this.objectType = (<HTMLInputElement>window.document.getElementById('figure-type')).value;
      this.objectSizeScale = (<HTMLInputElement>window.document.getElementById('scale')).value;
      // Call a method for creating object with received parameters
      this.objectController.addObject(this.scene, this.objectType, parseInt(this.objectSizeScale));
      let objectsList = window.document.getElementById('objects-list');
      let objectInfo = window.document.createElement('li');
      let deleteButton = window.document.createElement('button');
      deleteButton.setAttribute('data-uuid', this.objectController.objectUUID);
      objectInfo.innerHTML = this.objectType;
      objectsList.appendChild(objectInfo);
      deleteButton.innerHTML = 'Delete';
      objectsList.appendChild(deleteButton);



      console.log(this.objectController.objectUUID);
    });
  }

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public animate() {
    requestAnimationFrame(() => this.animate());
    this.orbit.update();
    this.render();
  }
}