import * as THREE from "three";
import { Building } from "./Building.js";
import { Road } from "./Road.js";
export class VillageGenerator{
    constructor(scene){
        this.scene=scene;
        this.generate();
    }
    generate(){
        for(let i=0;i<6;i++){
            this.createVillage(new THREE.Vector3(THREE.MathUtils.randFloatSpread(1200),0,THREE.MathUtils.randFloatSpread(1200)));
        }
    }
    createVillage(center){
        const houses = THREE.MathUtils.randInt(6,12);
        const positions=[];
        for(let i=0;i<houses;i++){
            const angle=Math.random()*Math.PI*2;
            const dist=THREE.MathUtils.randFloat(12,40);
            const pos=new THREE.Vector3(center.x+Math.cos(angle)*dist,0,center.z+Math.sin(angle)*dist);
            positions.push(pos);
            new Building(this.scene,pos);
        }
        for(let i=1;i<positions.length;i++){
            new Road(this.scene, positions[0],positions[1]);
        }
    }
}