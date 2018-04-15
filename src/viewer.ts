import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

export class Viewer {
  public orbit: OrbitControls;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public container: HTMLElement;

  public init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcccccc);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = window.document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(400, 200, 0);
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

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

    let ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);

    window.addEventListener('resize', this.onWindowResize, false);

    const geometry = new THREE.SphereGeometry( 20, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const sphere = new THREE.Mesh( geometry, material );
    this.scene.add( sphere );
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