import * as THREE from "three";
export class Physics{
    static damp(current, target, smoothing, delta){
        return THREE.MathUtils.lerp(current, target, 1-Math.exp(-smoothing*delta));
    }
    static clamp(value, min, max){
        return Math.max(min, Math.min(max, value));
    }
    static moveTowards(current, target, maxDelta){
        if(Math.abs(target-current)<=maxDelta)
            return target;
        return current+Math.sign(target-current)*maxDelta;
    }
    static applyDrag(speed, drag, delta){
        return speed*Math.exp(-drag*delta);
    }
    static gravity(velocity, delta, strength = 9.81){
        return velocity-strength*delta;
    }
}
