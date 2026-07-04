import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class Tree{
    constructor(scene,position){
        this.scene=scene;
        this.object = AssetManager.randomTree();
        if(!this.object) return;
        this.object.position.copy(position);
        this.object.rotation.y = Math.random()*Math.PI*2;
        const scale = THREE.MathUtils.randFloat(0.8,1.25);
        this.object.scale.setScalar(scale);
        scene.add(this.object);
    }
}