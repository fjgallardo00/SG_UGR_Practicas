import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Mesa extends THREE.Object3D {
    constructor() {
        super()

        this.createMesa()
    }
  
    createMesa(){
        var materialLoader = new MTLLoader ( ) ;
        var objectLoader = new OBJLoader ( ) ;
        
        materialLoader.load('../models/mesa/table.mtl', 
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load ('../models/mesa/table.obj', 
                    ( object ) => {
                        this.add ( object )
                    }, null, null)
                })
    }
}

export { Mesa };
