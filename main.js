import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,3,6);
const renderer = new THREE.WebGLRenderer({antialias:true});
const keys = {};
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const ambient = new THREE.AmbientLight(0xffffff,2);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffffff,3);
sun.position.set(10,20,10);
scene.add(sun);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x4caf50}));
ground.rotation.x=-Math.PI/2;
scene.add(ground);
const loader = new GLTFLoader();
let beest;
let speed = 0.05;
let turnSpeed = 0.03;
loader.load("assets/beest.glb",(gltf)=>{
    beest = gltf.scene;
    beest.scale.set(1,1,1);
    beest.position.set(0,1,0);
    scene.add(beest);
});
window.addEventListener("keydown",(e)=>{
    keys[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup",(e)=>{
    keys[e.key.toLowerCase()] = false;
});
window.addEventListener("resize",()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
function animate(){
    requestAnimationFrame(animate);
    if(beest){
        if(keys["a"]){
            beest.rotation.y += turnSpeed;
        }
        if(keys["d"]){
            beest.rotation.y -= turnSpeed;
        }
        if(keys["w"]){
            beest.translateZ(speed);
        }
        if(keys["s"]){
            beest.translateZ(-speed);
        }
        if(keys[" "]){
            beest.position.y += speed;
        }
        if(keys["shift"]){
            beest.position.y -= speed;
        }
        const offset = new THREE.Vector3(0,2,-6);
        offset.applyQuaternion(beest.quaternion);
        const desiredPosition = beest.position.clone().add(offset);
        camera.position.lerp(desiredPosition,0.08);
        camera.lookAt(beest.position);
    }
    renderer.render(scene,camera);
}
animate();