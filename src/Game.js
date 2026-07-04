import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { Input } from "./Input.js";
import { Player } from "./Player.js";
import { CameraController } from "./CameraController.js";
import { World } from "./World.js";
import { ChunkManager } from "./ChunkManager.js";
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
        this.world = new World(this.scene);
        this.chunkManager = new ChunkManager(this.scene);
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
            this.effects.update(delta,this.input);
            this.cameraController.update(delta);
        }
        this.renderer.render(this.scene,this.camera);
    }
    async loadAssets(){
        await AssetManager.load("oak","assets/nature/Flat_Tree_Oak_large_green.glb");
        await AssetManager.load("pine","assets/nature/Flat_Tree_Pine_large.glb");
        await AssetManager.load("rock","assets/nature/Flat_Rock_01.glb");
        await AssetManager.load("house","assets/buildings/Fantasy House.glb");
        console.log("ALL ASSETS LOADED.")
    }
}