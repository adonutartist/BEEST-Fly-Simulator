export class Effects{
    constructor(player){
        this.player = player;
    }
    update(delta){
        const t=performance.now()*0.004;
        this.player.object.position.y+=Math.sin(t)*0.002;
    }
}