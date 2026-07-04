import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class DecorationGenerator{
    constructor(scene,center,size){
        this.scene = scene;
        this.center = center;
        this.size = size;
        this.generate();
    }
    generate(){
        this.spawnRocks(THREE.MathUtils.randInt(15,35));
    }
    spawnRocks(count){
        for(let i=0;i<count;i++){
            const rock = AssetManager.randomRock();
            if(!rock) continue;
            rock.position.set(this.center.x+THREE.MathUtils.randFloatSpread(this.size),0,this.center.z+THREE.MathUtils.randFloatSpread(this.size));
            rock.rotation.y = Math.random()*Math.PI*2;
            const scale = THREE.MathUtils.randFloat(0.5,1.8);
            rock.scale.setScalar(scale);
            this.scene.add(rock);
        }
    }
}