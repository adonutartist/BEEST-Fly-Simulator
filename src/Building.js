import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class Building{
    constructor(scene, position){
        this.scene = scene;
        this.object = AssetManager.randomBuilding();
        if(!this.object) return;
        this.object.position.copy(position);
        this.object.rotation.y = Math.floor(Math.random()*4)*(Math.PI/2);
        const scale = THREE.MathUtils.randFloat(4,6);
        this.object.scale.setScalar(scale);
        scene.add(this.object);
    }
}