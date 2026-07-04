import * as THREE from "three";
export class Road{
    constructor(scene,start,end){
        const dir = new THREE.Vector3();
        dir.subVectors(end,start);
        const length = dir.length();
        const road = new THREE.Mesh(new THREE.PlaneGeometry(5,length),new THREE.MeshStandardMaterial({color:0x9b8b70}));
        road.rotation.x = -Math.PI/2;
        road.position.copy(start);
        road.position.y = 0.02;
        road.position.add(end);
        road.position.multiplyScalar(0.5);
        road.rotation.z = Math.atan2(dir.x,dir.z);
        scene.add(road);
    }
}