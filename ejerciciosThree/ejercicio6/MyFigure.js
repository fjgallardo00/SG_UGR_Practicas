import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { CSG } from '../libs/CSG-v2.js'
 
class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        var material = new THREE.MeshNormalMaterial()
        var materialLoader = new MTLLoader ( ) ;
        var objectLoader = new OBJLoader ( ) ;
        
        materialLoader.load('../models/bf109/Bf109.mtl', 
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load ('../models/bf109/Bf109.obj', 
                    ( object ) => {
                        this.add ( object ) ;
                    }, null, null)
                });
        

        
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja iniciales
        this.guiControls = {
            depth: 2,
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
            } 
            
            // Se crea una sección para los controles de la caja
            var folder = gui.addFolder (titleGui)
            // Estas lineas son las que añaden los componentes de la interfaz
            // Las tres cifras indican un valor mínimo, un máximo y el incremento
            // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
            
    }
    
    update () {
        //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        //this.children[0].rotation.y += 0.01;
        //this.children[0].rotation.x += 0.01;
    }
}

export { MyFigure };
