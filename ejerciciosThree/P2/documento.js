import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Documento extends THREE.Object3D {
    constructor() {
        super();

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
        var documentoGeom = new THREE.BoxGeometry(4, 0.25, 3, 2, 1)
        var material = new THREE.MeshPhongMaterial ({color: 0xFFFFFF})
        documentoGeom.translate(0,0.175,0)
        this.documento = new THREE.Mesh(documentoGeom, material)
        this.add(this.documento)
    }
  
    update () {

    }
}

export { Documento };
