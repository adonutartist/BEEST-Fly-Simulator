import * as THREE from "three";
import { Building } from "./Building.js";
export class ChunkManager{
    constructor(scene){
        this.scene=scene;
        this.buildings=[];
        this.generate();
    }
    generate(){
        for(let x=-5;x<=5;x++){
            for(let z=-5;z<=5;z++){
                if(Math.random()>0.65){
                    const building = new Building(this.scene,new THREE.Vector3(x*20,0,z*20));
                    this.buildings.push(building);
                }
            }
        }
    }
}