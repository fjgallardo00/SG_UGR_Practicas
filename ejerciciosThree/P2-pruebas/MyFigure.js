import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class MyFigure extends THREE.Object3D {
    constructor() {
        super()
        
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
        
        this.add(resultadoMesh)
    }

    setPosition(x, y, z){
        this.trofeo.position.x = x
        this.trofeo.position.y = y
        this.trofeo.position.z = z
    }
    
    update () {
        
    }
}

export { MyFigure }
