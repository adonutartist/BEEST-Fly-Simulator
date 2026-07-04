import * as THREE from "three";
import { Tree } from "./Tree.js";
export class ForestGenerator{
    constructor(scene){
        this.scene = scene;
        this.generate();
    }
    generate(){
        for(let i=0;i<300;i++){
            new Tree(this.scene, new THREE.Vector3(THREE.MathUtils.randFloatSpread(1000),0,THREE.MathUtils.randFloatSpread(1000)));
        }
    }
}
