import * as THREE from '../libs/three.module.js'

class Documento extends THREE.Object3D {
    constructor() {
        super()

        this.createDocumento()
    }

    getMesh(){
        return this.documento
    }

    setPosition(x, y, z){
        this.documento.position.x = x
        this.documento.position.y = y
        this.documento.position.z = z
    }
  
    createDocumento(){
        var documentoGeom = new THREE.BoxGeometry(3, 0.1, 4, 2, 1)
        var texture = new THREE.TextureLoader().load('../imgs/numeros/clave.png')
        var material = new THREE.MeshPhongMaterial ({map: texture})
        documentoGeom.translate(0,0.05,0)
        this.documento = new THREE.Mesh(documentoGeom, material)
        this.documento.rotation.y = -Math.PI/2
        this.add(this.documento)
    }
}

export { Documento };
