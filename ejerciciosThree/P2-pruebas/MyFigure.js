import * as THREE from '../libs/three.module.js'
 
class MyFigure extends THREE.Object3D {
    constructor() {
        super()
        
        var materialazul = new THREE.MeshPhongMaterial({color: 0x4BA7F1, transparent: true, opacity: 0.9 })

        this.wTapa = 2
        this.hTapa = 8

        var tapaNumerosGeom = new THREE.BoxGeometry(this.h, this.h, this.w, 2, 1)
        tapaNumerosGeom.translate(0,-this.h/2,this.w/2)

        this.tapaNumeros = new THREE.Mesh(tapaNumerosGeom, materialazul)
        // this.tapaNumeros.position.x = -15
        // this.tapaNumeros.position.y = 15
        // this.tapaNumeros.position.z = -99

        this.tapaNumeros.rotation.x = -Math.PI/2
        this.add(this.tapaNumeros)

    }
    
    update () {
        
    }
}

export { MyFigure }
