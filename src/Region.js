import * as THREE from "three";
import { ForestGenerator } from "./ForestGenerator.js";
import { VillageGenerator } from "./VillageGenerator.js";
import { DecorationGenerator } from "./DecorationGenerator.js";
export class Region{
    constructor(scene,x,z,size){
        this.scene=scene;
        this.x=x;
        this.z=z;
        this.size=size;
        this.group=new THREE.Group();
        scene.add(this.group);
        this.generate();
    }
    generate(){
        const center=new THREE.Vector3(this.x*this.size,0,this.z*this.size);
        const biome=Math.random();
        if(biome<0.65){
            new ForestGenerator(this.group,center,this.size);
        }
        else{
            new VillageGenerator(this.group,center,this.size);
        }
        new DecorationGenerator(this.group,center,this.size);
    }
    destroy(){
        this.scene.remove(this.group);
    }
}