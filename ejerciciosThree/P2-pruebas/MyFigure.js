import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class MyFigure extends THREE.Object3D {
    constructor(tamX, tamY, pinturaCuadro) {
        super()
        
        // this.tamX = tamX
        // this.tamY = tamY
        this.tamX = 6
        this.tamY = 4

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

        // **** Pintura ****
        var materialazul = new THREE.MeshPhongMaterial({color: 0x4BA7F1, transparent: false, opacity: 0.9 })
        
        var stringPath = "../imgs/"+pinturaCuadro

        var texture = new THREE.TextureLoader().load(stringPath)

        var cuadroGeom = new THREE.BoxGeometry(this.tamX, this.tamY, 0.1, 2, 1)
        cuadroGeom.translate(0,0,0.05)
        var cuadro = new THREE.Mesh(cuadroGeom, materialazul)
        
        var csg = new CSG()
        csg.union([marco])
        csg.subtract([marcoResta])
        
        var marco = new THREE.Mesh()
        marco = csg.toMesh()
        
        this.cosa = new THREE.Object3D()

        this.cosa.add(cuadro)
        this.cosa.add(marco)

        this.cosa.position.y = 5

        this.add(this.cosa)
    }

    setPosition(x, y, z){
        this.cosa.position.x = x
        this.cosa.position.y = y
        this.cosa.position.z = z
    }
    
    update () {
        
    }
}

export { MyFigure }
