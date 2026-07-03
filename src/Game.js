import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { Input } from "./Input.js";
import { Player } from "./Player.js";
import { CameraController } from "./CameraController.js";
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
        const ambient = new THREE.AmbientLight(0xffffff,2);
        this.scene.add(ambient);
        const sun = new THREE.DirectionalLight(0xffffff,3);
        sun.position.set(40,80,30);
        this.scene.add(sun);
        const ground = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000),new THREE.MeshStandardMaterial({color:0x5BAE4A}));
        ground.rotation.x = -Math.PI/2;
        this.scene.add(ground);
        const grid = new THREE.GridHelper(5000,200,0x444444,0x444444);
        this.scene.add(grid);
        this.beest = null;
        const loader = new GLTFLoader();
        loader.load("assets/beest.glb",(gltf)=>{
            this.beest = gltf.scene;
            this.beest.position.set(0,2,0);
            this.beest.scale.set(1,1,1);
            this.scene.add(this.beest);
            this.player = new Player(this.beest);
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
    start(){
        this.renderer.setAnimationLoop(()=>{this.update();});
    }
    update(){
        const delta = this.clock.getDelta();
        if(this.player){
            this.player.update(delta,this.input);
            this.cameraController.update(delta);
        }
        this.renderer.render(this.scene,this.camera);
    }
}