import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Mesa extends THREE.Object3D {
    constructor() {
        super()

        this.mesa = new THREE.Object3D()

        this.createMesa()
    }
  
    createMesa(){
        var materialLoader = new MTLLoader ( ) ;
        var objectLoader = new OBJLoader ( ) ;

        //objeto con material
        /*
        materialLoader.load('../models/porsche911/911.mtl', 
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load ('../models/porsche911/Porsche_911_GT2.obj', 
                    ( object ) => {
                        this.add ( object ) ;
                    }, null, null)
                });

        */

        //objeto sin material
        /*
        objectLoader.load ('../models/hollowknight/hollow-knight.obj', 
        ( object ) => {
            this.add ( object ) ;
        }, null, null)
        */
        
        
        materialLoader.load('../models/mesa/table.mtl', 
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load ('../models/mesa/table.obj', 
                    ( object ) => {
                        this.add ( object )
                        this.mesa = object
                    }, null, null)
                })


        //materialLoader.load('../models/mesa/table.mtl')

        var texture = new THREE.TextureLoader().load('../models/mesa/WoodSeemles.jpg');
        var materialMesa = new THREE.MeshPhongMaterial ({map: texture});
        //this.children[0].material = materialMesa
        /*
        this.children[0].scale.x = 0.05
        this.children[0].scale.y = 0.05
        this.children[0].scale.z = 0.05
        */
    }
  
    update () {
		
    }
}

export { Mesa };
