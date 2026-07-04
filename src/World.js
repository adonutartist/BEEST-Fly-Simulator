import * as THREE from "three";
import { ForestGenerator } from "./ForestGenerator.js";
import { VillageGenerator } from "./VillageGenerator.js";
import { DecorationGenerator } from "./DecorationGenerator.js";
import { RegionManager } from "./RegionManager.js";
import { Player } from "./Player.js";
export class World{
    constructor(scene,player){
        this.scene = scene;
        this.player = player;
        this.regionManager=new RegionManager(this.scene,this.player);
        this.createGround();
        this.createLights();
        this.createSky();
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
}