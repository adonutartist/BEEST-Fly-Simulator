import * as THREE from "three";
import { AssetManager } from "./AssetManager.js";
export class DecorationGenerator{
    constructor(scene){
        this.scene = scene;
        this.generate();
    }
    generate(){
        this.spawnRocks(150);
    }
    spawnRocks(count){
        for(let i=0;i<count;i++){
            const rock = AssetManager.randomRock();
            if(!rock) continue;
            rock.position.set(THREE.MathUtils.randFloatSpread(1600),0,THREE.MathUtils.randFloatSpread(1600));
            rock.rotation.y = Math.random()*Math.PI*2;
            const scale = THREE.MathUtils.randFloat(0.5,1.8);
            rock.scale.setScalar(scale);
            this.scene.add(rock);
        }
    }
}