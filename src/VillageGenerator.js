import * as THREE from "three";
import { Building } from "./Building.js";
import { Road } from "./Road.js";
export class VillageGenerator{
    constructor(scene,center,size){
        this.scene=scene;
        this.center=center;
        this.size=size;
        this.generate();
    }
    generate(){
        const villageCenter = new THREE.Vector3(this.center.x + THREE.MathUtils.randFloatSpread(this.size*0.4),0,this.center.z + THREE.MathUtils.randFloatSpread(this.size*0.4));
        this.createVillage(villageCenter);
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
            new Road(this.scene, positions[0],positions[i]);
        }
    }
}