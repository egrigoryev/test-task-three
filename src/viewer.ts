import * as THREE from '../node_modules/three/build/three';
import 'three/examples/js/controls/OrbitControls';
// declare const THREE: Object;
// console.log(OrbitControls);
// import {
//   OrbitControls,
//   Scene,
//   WebGLRenderer,
//   Color,
//   FogExp2,
//   PerspectiveCamera,
//   DirectionalLight,
//   AmbientLight
// } from 'three-full';

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000 );
console.log(camera);
const controls = new THREE.OrbitControls(camera);
console.log(controls);
export class Viewer {
  // public camera: Object;
  // public controls: any;

  // public static renderer: WebGLRenderer;
  // private static scene: Scene;
  // private static container: HTMLElement;

  // constructor() {
  //   console.log('Hello! I\'m constructor');
  // }

  public init() {
    // this.controls = new OrbitControls();
    // this.controls.pann
    console.log('init');
    // this.scene = new Scene();
    //   this.scene.background = new Color(0xcccccc);
    //   this.scene.fog = new FogExp2(0xcccccc, 0.002);
    //
    //   this.renderer = new WebGLRenderer();
    //   this.renderer.setPixelRatio(window.devicePixelRatio);
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //
    //   this.container = window.document.getElementById('container');
    //   this.container.appendChild(this.renderer.domElement);
    //
    this.camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set(400, 200, 0);
    //
    //   this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //   this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //   this.controls.dampingFactor = 0.25;
    //   // this.controls.panningMode = HorizontalPanning; // default is ScreenSpacePanning
    //   this.controls.minDistance = 100;
    //   this.controls.maxDistance = 2000;
    //   this.controls.maxPolarAngle = Math.PI / 2;
    //
    //   let directionalLight1 = new DirectionalLight( 0xffffff );
    //   directionalLight1.position.set( 1, 1, 1 );
    //   this.scene.add(directionalLight1);
    //
    //   let directionalLight2 = new DirectionalLight( 0x002288 );
    //   directionalLight2.position.set( - 1, - 1, - 1 );
    //   this.scene.add(directionalLight2);
    //
    //   let ambientLight = new AmbientLight( 0x222222 );
    //   this.scene.add(ambientLight);
    //
    //   window.addEventListener( 'resize', this.onWindowResize, false );
    //
    //
    // }
    //
    // private static onWindowResize() {
    //     // this.camera.aspect = window.innerWidth / window.innerHeight;
    //     // this.camera.updateProjectionMatrix();
    //     this.renderer.setSize( window.innerWidth, window.innerHeight );
    // }
    //
    // public static render(){
    //   this.renderer.render(this.scene, this.camera );
    // }
    //
    // public static animate() {
    //   requestAnimationFrame(this.animate);
    //   this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    //   this.render();
    // }
    //
    //
  }
}