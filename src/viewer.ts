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
    public editButton: HTMLElement;
    public objectType: HTMLElement;
    public objectTypeValue: string;
    public objectScale: HTMLElement;
    public objectScaleValue: string;
    public raycaster: THREE.Raycaster;
    public mouse: THREE.Vector2;
    public INTERSECTED: any;
    public selectedObject: any;
    public isClicked: boolean = false;


    public init() {
        this.mouse = new THREE.Vector2();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container = window.document.getElementById('scene');
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
        this.camera.position.set(400, 200, 0);

        window.document.getElementById('scene')
            .addEventListener('mouseup', (e) => this.onSceneMouseClick(e), false);
        window.document.getElementById('scene')
            .addEventListener('mousemove', (e) => this.onSceneMouseMove(e), false);

        this.orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();

        this.orbit.enableDamping = true;
        this.orbit.dampingFactor = 0.25;
        this.orbit.minDistance = 100;
        this.orbit.maxDistance = 2000;
        this.orbit.maxPolarAngle = Math.PI / 2;

        let directionalLight1 = new THREE.DirectionalLight(0xffffff);
        directionalLight1.position.set(1, 1, 1);
        this.scene.add(directionalLight1);

        let directionalLight2 = new THREE.DirectionalLight(0x002288);
        directionalLight2.position.set(-1, -1, -1);
        this.scene.add(directionalLight2);

        let ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambientLight);

        window.addEventListener('resize', this.onWindowResize, false);

        // Control panel service
        this.objectController = new ObjectController('');
        this.createButton = window.document.getElementById('create-button__button');
        this.editButton = window.document.getElementById('edit-button__button');

        // Add listeners for buttons events
        this.createButton.addEventListener('click', () => this.createObject());
        this.editButton.addEventListener('click', () => { if(this.isClicked) this.editObject()});

    }

    private createObject() {
        // Receive object type from HTML select element
        this.objectType = window.document.getElementById('figure-type');
        this.objectTypeValue = (<HTMLInputElement>this.objectType).value;
        // Receive object scale from HTML input element
        this.objectScale = window.document.getElementById('scale');
        this.objectScaleValue = (<HTMLInputElement>this.objectScale).value;
        // Call a method for creating object with received parameters
        this.objectController.addObject(this.scene, this.objectTypeValue, parseInt(this.objectScaleValue));
        // Local variables for element of objects on scene list
        let objectsList = window.document.getElementById('objects-list');
        let objectInfo = window.document.createElement('li');
        let deleteButton = window.document.createElement('button');

        objectInfo.setAttribute('data-uuid', this.objectController.objectUUID);
        deleteButton.setAttribute('data-uuid', this.objectController.objectUUID);

        objectInfo.innerHTML = this.objectTypeValue;
        objectsList.appendChild(objectInfo);
        deleteButton.innerHTML = 'Delete';

        deleteButton.addEventListener('click', () => {
            this.scene.remove(this.scene.getObjectByProperty('uuid', deleteButton.getAttribute('data-uuid')));
            objectsList.removeChild(objectInfo);
            objectsList.removeChild(deleteButton);
            this.animate();
        });

        objectsList.appendChild(deleteButton);
    }

    private editObject() {
        this.objectType = window.document.getElementById('figure-type');
        this.objectTypeValue = (<HTMLInputElement>this.objectType).value;
        this.objectScale = window.document.getElementById('scale');
        this.objectScaleValue = (<HTMLInputElement>this.objectScale).value;

        this.objectController.editObject(
            this.scene,
            this.objectTypeValue,
            parseInt(this.objectScaleValue),
            this.selectedObject
        );

        let objectInfo = window.document.querySelector(`[data-uuid="${this.selectedObject.uuid}"]`);
        objectInfo.innerHTML = this.objectTypeValue;
        console.log(objectInfo);

    }

    private onSceneMouseMove(event: any) {
        event.preventDefault();
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        if (!this.isClicked) {
            if (intersects.length > 0) {
                if (this.INTERSECTED != intersects[0].object) {
                    if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                    this.INTERSECTED = intersects[0].object;
                    this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                    this.INTERSECTED.material.emissive.setHex(0xff0000);
                }
            } else {
                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                if (this.isClicked) this.INTERSECTED.material.emissive.setHex(0x00ff00);
                this.INTERSECTED = null;
            }
        }
        else {
            console.log(1);
        }
    }

    private onSceneMouseClick(event: any) {

        event.preventDefault();
        this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = -( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length) {
            // Set variable to first selected by raycaster object
            this.selectedObject = intersects[0].object;
            // Set object's choose fields to new values
            (<HTMLInputElement>this.objectType).value = this.selectedObject.userData.type;
            (<HTMLInputElement>this.objectScale).value = this.selectedObject.userData.scale;

            if (this.INTERSECTED === intersects[0].object) {
                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0x00ff00);
                this.isClicked = true;
            }
        } else {
            if (this.INTERSECTED) {
                this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                this.selectedObject = null;
            }
            this.isClicked = false;
            this.INTERSECTED = null;
        }
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