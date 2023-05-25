import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Taza extends THREE.Object3D {
    constructor() {
        super()
        
        this.createTaza()
    }

    setPosition(x, y, z){
        this.taza.position.x = x
        this.taza.position.y = y
        this.taza.position.z = z
    }

    setScale(x, y, z){
        this.taza.scale.x = x
        this.taza.scale.y = y
        this.taza.scale.z = z
    }

    createTaza(){
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

        this.taza = new THREE.Mesh()

        this.taza = csg.toMesh()
        
        this.add(this.taza)
    }
    
    update () {
        
    }
}

export { Taza }
