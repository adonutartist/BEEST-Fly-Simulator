import * as THREE from "three";
export class Player{
    constructor(object){
        this.object=object;
        this.speed=0;
        this.maxSpeed=100;
        this.acceleration=60;
        this.drag=8;
        this.turnSpeed=2.4;
        this.verticalSpeed=8;
        this.bank=0;
    }
    update(delta, input){
        if(input.down("w")) {
            this.speed += this.acceleration * delta;
        }
        if(input.down("s")){
            this.speed -= this.acceleration * delta;
        }
        this.speed *= (1-this.drag*delta);
        this.speed = THREE.MathUtils.clamp(this.speed,-5,this.maxSpeed);
        let turning = false;
        if(input.down("a")){
            this.object.rotation.y += this.turnSpeed * delta;
            this.bank = THREE.MathUtils.lerp(this.bank,0.45,8*delta);
            turning=true
        }
        if(input.down("d")){
            this.object.rotation.y -= this.turnSpeed * delta;
            this.bank = THREE.MathUtils.lerp(this.bank,-0.45,8*delta);
            turning=true;
        }
        if(!turning){
            this.bank = THREE.MathUtils.lerp(this.bank,0,6*delta);
        }
        this.object.rotation.z=this.bank;
        this.object.translateZ(this.speed*delta);
        if(input.down(" ")){
            this.object.position.y += this.verticalSpeed*delta;
        }
        if(input.down("shift")){
            this.object.position.y -= this.verticalSpeed*delta
        }
        this.object.position.y += Math.sin(performance.now()*0.003)*0.003;
    }
}