import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
export class AssetManager{
    static loader = new GLTFLoader();
    static models = {};
    static treeNames = [];
    static rockNames = [];
    static buildingNames = [];
    static async load(name, path){
        return new Promise((resolve, reject)=>{
            AssetManager.loader.load(path, (gltf)=>{AssetManager.models[name]=gltf.scene; console.log("Loaded:", name); resolve();}, undefined, reject);
        });
    }
    static registerTree(name){
        AssetManager.treeNames.push(name);
    }
    static registerRock(name){
        AssetManager.rockNames.push(name);
    }
    static registerBuilding(name){
        AssetManager.buildingNames.push(name);
    }
    static get(name){
        return AssetManager.models[name].clone(true);
    }
    static randomTree(){
        const list = AssetManager.treeNames;
        const random = list[Math.floor(Math.random()*list.length)];
        return AssetManager.get(random);
    }
    static randomRock(){
        const list = AssetManager.rockNames;
        const random = list[Math.floor(Math.random()*list.length)];
        return AssetManager.get(random);
    }
    static randomBuilding(){
        const list = AssetManager.buildingNames;
        const random = list[Math.floor(Math.random()*list.length)];
        return AssetManager.get(random);
    }
}
