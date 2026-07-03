import * as THREE from "three";
export class World{
    constructor(scene){
        this.scene = scene;
        this.createGround();
        this.createLights();
        this.createSky();
        this.spawnTrees();
    }
    createGround(){
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000),new THREE.MeshStandardMaterial({color:0x4BA64F}));
        ground.rotation.x = -Math.PI/2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    createLights(){
        const ambient = new THREE.AmbientLight(0xffffff,2);
        this.scene.add(ambient);
        const sun = new THREE.DirectionalLight(0xffffff,3);
        sun.position.set(80,120,50);
        this.scene.add(sun);
    }
    createSky(){
        this.scene.background = new THREE.Color(0x87CEEB);
    }
    spawnTrees(){
        for(let i=0;i<150;i++){
            const tree = this.makeTree();
            tree.position.set((Math.random()-0.5)*1200,0,(Math.random()-0.5)*1200);
            this.scene.add(tree);
        }
    }
    makeTree(){
        const group = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.5,3),new THREE.MeshStandardMaterial({color:0x6F4E37}));
        trunk.position.y=1.5;
        group.add(trunk);
        const leaves = new THREE.Mesh(new THREE.ConeGeometry(2,5,8),new THREE.MeshStandardMaterial({color:0x2E8B57}));
        leaves.position.y=5;
        group.add(leaves);
        return group;
    }
}