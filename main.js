import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,3,6);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
const ambient = new THREE.AmbientLight(0xffffff,2);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xffffff,3);
sun.position.set(10,20,10);
scene.add(sun);
const ground = new THREE.Mesh(new THREE.PlaneGeometry(500,500),new THREE.MeshStandardMaterial({color:0x4caf50}));
ground.rotation.x=-Math.PI/2;
scene.add(ground);
const loader = new GLTFLoader();
loader.load(
    "assets/beest.glb",
    function(gltf){
        const beest = gltf.scene;
        beest.scale.set(1,1,1);
        beest.position.y=1;
        scene.add(beest);
        console.log("BEEST LOADED");
    },
    undefined,
    function(error){
        console.error(error);
    }
);
window.addEventListener("resize",()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();