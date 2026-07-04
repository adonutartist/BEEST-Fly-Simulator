import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class Rock{
    constructor(scene,position){
        this.object = AssetManager.randomRock();
        if(!this.object) return;
        this.object.position.copy(position);
        this.object.rotation.y=Math.random()*Math.PI*2;
        const s=THREE.MathUtils.randFloat(0.6,1.6);
        this.object.scale.setScalar(s);
        scene.add(this.object);
    }
}