import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { Input } from "./Input.js";
import { Player } from "./Player.js";
import { CameraController } from "./CameraController.js";
import { World } from "./World.js";

import { Effects } from "./Effects.js";
import { AssetManager } from "./AssetManager.js";
export class Game{
    constructor(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000);
        this.camera.position.set(0,4,8);
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
        this.input = new Input();
        this.player = null;
        this.cameraController = null;
        this.effects = null;
        this.beest = null;
        const loader = new GLTFLoader();
        loader.load("assets/beest.glb",(gltf)=>{
            this.beest = gltf.scene;
            this.beest.position.set(0,2,0);
            this.beest.scale.set(1,1,1);
            this.scene.add(this.beest);
            this.player = new Player(this.beest);
            this.effects = new Effects(this.player);
            this.cameraController = new CameraController(this.camera,this.player);
            console.log("BEEST Loaded.");
        });
        window.addEventListener("resize",()=>{
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth,window.innerHeight);
        });
        window.addEventListener("click",()=>{
            document.body.requestPointerLock();
        });
    }
    async start(){
        await this.loadAssets();
        this.renderer.setAnimationLoop(()=>{this.update();});
    }
    update(){
        const delta = this.clock.getDelta();
        if(this.player){
            this.player.update(delta,this.input);
            if(this.world){
                this.world.regionManager.update();
            }
            this.effects.update(delta,this.input);
            this.cameraController.update(delta);
        }
        this.renderer.render(this.scene,this.camera);
    }
    async loadAssets(){
        await AssetManager.load("oak","assets/nature/Flat_Tree_Oak_large_green.glb");
        AssetManager.registerTree("oak");
        await AssetManager.load("pine","assets/nature/Flat_Tree_Pine_large.glb");
        AssetManager.registerTree("pine");
        await AssetManager.load("rock1","assets/nature/Flat_Rock_01.glb");
        AssetManager.registerRock("rock1");
        await AssetManager.load("rock2","assets/nature/Flat_Rock_02.glb");
        AssetManager.registerRock("rock2");
        await AssetManager.load("rock3","assets/nature/Flat_Rock_03.glb");
        AssetManager.registerRock("rock3");
        await AssetManager.load("rock4","assets/nature/Flat_Rock_04.glb");
        AssetManager.registerRock("rock4");
        await AssetManager.load("rock5","assets/nature/Flat_Rock_05.glb");
        AssetManager.registerRock("rock5");
        await AssetManager.load("rock6","assets/nature/Flat_Rock_06.glb");
        AssetManager.registerRock("rock6");
        await AssetManager.load("rock7","assets/nature/Flat_Rock_07.glb");
        AssetManager.registerRock("rock7");
        await AssetManager.load("rock8","assets/nature/Flat_Rock_08.glb");
        AssetManager.registerRock("rock8");
        await AssetManager.load("rock9","assets/nature/Flat_Rock_09.glb");
        AssetManager.registerRock("rock9");
        await AssetManager.load("rock10","assets/nature/Flat_Rock_10.glb");
        AssetManager.registerRock("rock10");
        await AssetManager.load("house","assets/buildings/Fantasy House.glb");
        AssetManager.registerBuilding("house");
        console.log("ALL ASSETS LOADED.")
        this.world = new World(this.scene,this.player);
    }
}