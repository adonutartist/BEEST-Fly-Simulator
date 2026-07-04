import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
export class AssetManager{
    static loader = new GLTFLoader();
    static models = {};
    static async load(name, path){
        return new Promise((resolve, reject)=>{
            AssetManager.loader.load(path, (gltf)=>{AssetManager.models[name]=gltf.scene; console.log("Loaded:", name); resolve();}, undefined, reject);
        });
    }
    static get(name){
        if(!AssetManager.models[name]){
            console.warn(name+" wasn't loaded.");
            return null;
        }
        return AssetManager.models[name].clone(true);
    }
}
