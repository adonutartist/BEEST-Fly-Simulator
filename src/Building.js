import * as THREE from "three";
export class Building{
    constructor(scene, position){
        this.scene = scene;
        this.health = 100;
        this.group = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(4,4,4),new THREE.MeshStandardMaterial({color:0xd8b98a}));
        base.position.y = 2;
        this.group.add(base);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6,2,4),new THREE.MeshStandardMaterial({color:0xaa3333}));
        roof.position.y = 5;
        roof.rotation.y = Math.PI/4;
        this.group.add(roof);
        this.group.position.copy(position);
        scene.add(this.group);
    }
    damage(amount){
        this.health-=amount;
    }
    destroyed(){
        return this.health<=0;
    }
}