import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Cuadro extends THREE.Object3D {
    constructor(tamX, tamY, pinturaCuadro) {
        super()
        
        this.tamX = tamX
        this.tamY = tamY

        // **** Marco del cuadro genérico ****
        var texture = new THREE.TextureLoader().load('../imgs/madera_marco.jpg')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(2, 2)
        var materialMarco = new THREE.MeshPhongMaterial ({map: texture})

        var marcoGeom = new THREE.BoxGeometry(this.tamX+1,this.tamY+1,0.3,2,1)
        marcoGeom.translate(0,0,0.15)
        var marco = new THREE.Mesh(marcoGeom, materialMarco)

        var marcoRestaGeom = new THREE.BoxGeometry(this.tamX,this.tamY,1,2,1)
        var marcoResta = new THREE.Mesh(marcoRestaGeom)

        var csg = new CSG()
        csg.union([marco])
        csg.subtract([marcoResta])
        
        var marco = new THREE.Mesh()
        marco = csg.toMesh()

        // **** Pintura ****
        var stringPath = "../imgs/"+pinturaCuadro
        var textureCuadro = new THREE.TextureLoader().load(stringPath)
        var materialCuadro = new THREE.MeshPhongMaterial ({map: textureCuadro})

        var cuadroGeom = new THREE.BoxGeometry(this.tamX, this.tamY, 0.1, 2, 1)
        cuadroGeom.translate(0,0,0.05)
        var cuadro = new THREE.Mesh(cuadroGeom, materialCuadro)
        
        // **** Cuadro completo ****
        this.cosa = new THREE.Object3D()
        this.cosa.add(cuadro)
        this.cosa.add(marco)

        this.add(this.cosa)
    }

    setPosition(x, y, z){
        this.cosa.position.x = x
        this.cosa.position.y = y
        this.cosa.position.z = z
    }

    setRotationY(y){
        this.cosa.rotation.y = y
    }
    
    update () {
        
    }
}

export { Cuadro }
