import* as THREE from "three";
import { exp } from "three/src/nodes/math/MathNode.js";
export class Utils{
    static random(min, max){
        return Math.random()*(max-min)+min;
    }
    static randomInt(min, max){
        return Math.floor(Utils.random(min, max+1));
    }
    static degToRad(degrees){
        return THREE.MathUtils.degToRad(degrees);
    }
    static radToDeg(radians){
        return THREE.MathUtils.radToDeg(radians);
    }
    static lerp(a, b, t){
        return a+(b-a)*t;
    }
    static distance(a, b){
        return a.distanceTo(b);
    }
    static randomVector(radius){
        return new THREE.Vector3(Utils.random(-radius,radius),Utils.random(-radius,radius),Utils.random(-radius,radius));
    }
}