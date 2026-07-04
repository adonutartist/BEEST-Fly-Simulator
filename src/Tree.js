import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class Tree{
    constructor(scene,position){
        this.scene=scene;
        const types=["oak","pine"];
        const randomType = types[Math.floor(Math.random()*types.length)];
        this.object = AssetManager.get(randomType);
        this.object.position.copy(position);
        this.object.rotation.y = Math.random()*Math.PI*2;
        const scale = THREE.MathUtils.randFloat(0.85,1.15);
        this.object.scale.setScalar(scale);
        scene.add(this.object);
    }
}