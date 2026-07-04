import { Region } from "./Region.js";
export class RegionManager {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.regionSize = 400;
        this.renderDistance = 1;
        this.regions = new Map();
    }
    key(x, z) {
        return `${x},${z}`;
    }
    update() {
        if (!this.player || !this.player.object) return;
        const regionX = Math.floor(
            this.player.object.position.x / this.regionSize
        );
        const regionZ = Math.floor(
            this.player.object.position.z / this.regionSize
        );
        const needed = new Set();
        for (let x = -this.renderDistance; x <= this.renderDistance; x++) {
            for (let z = -this.renderDistance; z <= this.renderDistance; z++) {
                const rx = regionX + x;
                const rz = regionZ + z;
                const key = this.key(rx, rz);
                needed.add(key);
                if (!this.regions.has(key)) {
                    const region = new Region(
                        this.scene,
                        rx,
                        rz,
                        this.regionSize
                    );
                    this.regions.set(key, region);
                }
            }
        }
        for (const [key, region] of this.regions) {
            if (!needed.has(key)) {
                region.destroy();
                this.regions.delete(key);
            }
        }
    }
}