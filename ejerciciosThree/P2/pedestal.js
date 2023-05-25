import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Pedestal extends THREE.Object3D {
    constructor() {
        super();

        var texture = new THREE.TextureLoader().load('../imgs/marmol-blanco.jpg')
        this.material = new THREE.MeshPhongMaterial ({map: texture, color: 0xa89369})

        this.hCaja = 2
        this.hCilindro = 7
        this.dimensionesCaja = 8
        this.dimensionesCilindro = 3.5
        
        this.createPedestal()
    }

    getMesh(){
        return this.pedestal
    }

    getHeight(){
        return this.hCilindro+this.hCaja*2
    }

    setPosition(x, y, z){
        this.pedestal.position.x = x
        this.pedestal.position.y = y
        this.pedestal.position.z = z
    }
  
    createPedestal(){
        var baseAbajo = new THREE.BoxGeometry(this.dimensionesCaja, this.hCaja, this.dimensionesCaja, 2, 1)
        //baseAbajo.translate(0,this.h/2,0)
        var baseAbajoMesh = new THREE.Mesh(baseAbajo, this.material)
        baseAbajoMesh.position.y = this.hCaja/2

        var cilindroGeom = new THREE.CylinderGeometry (this.dimensionesCilindro,this.dimensionesCilindro,this.hCilindro,6)
        var cilindro = new THREE.Mesh (cilindroGeom, this.material)
        cilindro.position.y = this.hCaja+this.hCilindro/2
        
        var baseArriba = new THREE.BoxGeometry(this.dimensionesCaja, this.hCaja, this.dimensionesCaja, 2, 1)
        //baseArriba.translate(0,this.h/2,0)
        var baseArribaMesh = new THREE.Mesh(baseArriba, this.material)
        baseArribaMesh.position.y = this.hCaja/2+this.hCilindro+this.hCaja

        var csg = new CSG();

        csg.union([baseAbajoMesh, cilindro, baseArribaMesh])
        
        this.pedestal = new THREE.Mesh()
        this.pedestal = csg.toMesh()
        this.add (this.pedestal)
    }
  
    update () {
		
    }
}

export { Pedestal };
