import {Object3D} from "three";
declare let THREE: any;

export class ObjectController {
    public objectUUID: string;

    constructor(objectUUID: string) {
        this.objectUUID = objectUUID;
        console.log(this.objectUUID);
    }

    public addObject(scene: THREE.Scene, objectType: string, scale: number): void {
        let geometry;
        switch(objectType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(50 * scale, 50 * scale, 50 * scale);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(10 * scale, 32, 32);
                break;
            case 'pyramid':
                geometry = new THREE.CylinderGeometry(0, 15 * scale, 15 * scale, 4, false);
                break;
        }
        const material = new THREE.MeshPhongMaterial( {color: 0x334d, specular: 0xffffff} );
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        mesh.userData = {type: objectType, scale: scale};
        scene.add(mesh);
        this.objectUUID = mesh.uuid;
    }

    public editObject(objectType: string, scale: number, mesh: THREE.Object3D): void {
        let geometry;
        switch(objectType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(50 * scale, 50 * scale, 50 * scale);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(10 * scale, 64 * scale, 64 * scale);
                break;
            case 'pyramid':
                geometry = new THREE.CylinderGeometry(0, 15 * scale, 15 * scale, 4, false);
                break;
        }
        (<THREE.Mesh>mesh).geometry = geometry;
        mesh.updateMatrix();
    }


}