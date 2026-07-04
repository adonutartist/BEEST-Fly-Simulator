import * as THREE from "three";
import { Tree } from "./Tree.js";
import { Rock } from "./Rock.js";

export class ForestGenerator{
    constructor(scene){
        this.scene = scene;
        this.treeRadius = 12;
        this.clusterCount = 40;
        this.clusterRadius = 45;
        this.worldRadius = 800
        this.generate();
    }
    generate(){
        for(let i=0;i<this.clusterCount;i++){
            const center = new THREE.Vector3(THREE.MathUtils.randFloatSpread(this.worldRadius*2),0,THREE.MathUtils.randFloatSpread(this.worldRadius*2));
            this.generateCluster(center);
        }
    }
    generateCluster(center){
        const trees = THREE.MathUtils.randInt(18,45);
        for(let i=0;i<trees;i++){
            const angle = Math.random()*Math.PI*2;
            const distance = Math.sqrt(Math.random())*this.clusterRadius;
            const x = center.x+Math.cos(angle)*distance;
            const z = center.z+Math.sin(angle)*distance;
            new Tree(this.scene,new THREE.Vector3(x,0,z));
        }
        const rocks = THREE.MathUtils.randInt(2,7);
        for(let i=0;i<rocks;i++){
            const angle=Math.random()*Math.PI*2;
            const dist=Math.random()*20;
            new Rock(this.scene,new THREE.Vector3(center.x+Math.cos(angle)*dist,0,center.z+Math.sin(angle)*dist));
        }
    }
}
