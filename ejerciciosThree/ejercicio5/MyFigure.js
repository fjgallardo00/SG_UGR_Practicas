import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        var material = new THREE.MeshNormalMaterial()

        var cilExt = new THREE.CylinderGeometry(5,5,10,24,1)
        var cilInt = new THREE.CylinderGeometry(4.7,4.7,10,24,1)
        var toro = new THREE.TorusGeometry(3, 0.5, 24, 24)

        cilInt.translate(0,0.3,0)
        toro.translate(-5,0,0)

        var cilExtMesh = new THREE.Mesh(cilExt, material)
        var cilIntMesh = new THREE.Mesh(cilInt, material)
        var toroMesh = new THREE.Mesh(toro, material)
        
        var csg = new CSG();
        csg.union([cilExtMesh, toroMesh])
        csg.subtract([cilIntMesh])

        var resultadoMesh = new THREE.Mesh()

        resultadoMesh = csg.toMesh()
        
        //this.add(resultadoMesh)

        var boxDer = new THREE.BoxGeometry(5, 2.5, 1.5, 2, 1)
        var boxIzq = new THREE.BoxGeometry(5, 2.5, 1.5, 2, 1)
        var boxCen = new THREE.BoxGeometry(2.5, 2.5, 2.5, 2, 1)
        var cilUno = new THREE.CylinderGeometry(1.25,1.25,2.5,24,1)
        var cilDos = new THREE.CylinderGeometry(2.5,2.5,1.5,24,1)

        var cunia = new THREE.Shape();
        cunia.moveTo(0,2.5)
        cunia.lineTo(0,0)
        cunia.lineTo(2.5,0)
        cunia.quadraticCurveTo(2.5,2.5,0,2.5)
        var cuniaGeom = new THREE.ExtrudeGeometry (cunia)
        var cuniaGeomDos = new THREE.ExtrudeGeometry (cunia)

        boxDer.translate(1.75,0,0)
        boxIzq.translate(1.75,0,0)
        boxIzq.rotateY(-Math.PI/2)
        boxCen.translate(1.5,0,1.5)
        cuniaGeom.translate(0,0,1.5)
        cuniaGeom.rotateX(Math.PI/2)
        cuniaGeom.rotateY(Math.PI)
        cuniaGeom.translate(3.3,1.4,3.3)
        
        cuniaGeomDos.translate(0,0,1.5)
        cuniaGeomDos.rotateX(Math.PI/2)
        cuniaGeomDos.rotateY(Math.PI)
        cuniaGeomDos.translate(3.3,2.6,3.3)

        //cilUno.translate(1.75,0,1.75)
        
        //cilUno.rotateX(-Math.PI/2)

        var boxDerMesh = new THREE.Mesh(boxDer, material)
        var boxIzqMesh = new THREE.Mesh(boxIzq, material)
        var boxCenMesh = new THREE.Mesh(boxCen, material)
        var cuniaMesh = new THREE.Mesh(cuniaGeom, material)
        var cuniaMeshDos = new THREE.Mesh(cuniaGeomDos, material)


        var csg2 = new CSG();
        

        csg2.union([boxDerMesh, boxIzqMesh, boxCenMesh])

        csg2.subtract([cuniaMesh, cuniaMeshDos])
        

        var resultadoMesh2 = new THREE.Mesh()

        resultadoMesh2 = csg2.toMesh()

        this.add(resultadoMesh2)
        
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
