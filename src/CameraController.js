import * as THREE from "three";
export class CameraController {
    constructor(camera,player){
        this.camera = camera;
        this.player=player;
        this.distance = 8;
        this.height=3;
        this.yaw=0;
        this.pitch=0.25;
        this.mouseSensitivity = 0.003;
        this.targetPosition = new THREE.Vector3();
        window.addEventListener("mousemove",(e)=>{
            if(document.pointerLockElement){
                this.yaw-=e.movementX*this.mouseSensitivity;
                this.pitch-=e.movementY*this.mouseSensitivity;
                this.pitch=THREE.MathUtils.clamp(this.pitch,-0.5,1.2);
            }
        });
        window.addEventListener("wheel",(e)=>{
            this.distance+=e.deltaY*0.01;
            this.distance=THREE.MathUtils.clamp(this.distance,4,20);
        });
    }
    update(delta){
        if(!this.player.object) return;
        const target = this.player.object.position;
        const offset = new THREE.Vector3();
        offset.x=Math.sin(this.yaw)*Math.cos(this.pitch);
        offset.y=Math.sin(this.pitch);
        offset.z=Math.cos(this.yaw)*Math.cos(this.pitch);
        offset.normalize();
        offset.multiplyScalar(this.distance);
        offset.y += this.height;
        this.targetPosition.copy(target);
        this.targetPosition.add(offset);
        this.camera.position.lerp(this.targetPosition,6*delta);
        this.camera.lookAt(target);
    }
}