import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Reloj extends THREE.Object3D {
    constructor() {
        super()

        this.reloj = new THREE.Clock();
        this.rotacion = (Math.PI*2/12); //rotacion para cada hora

        this.rotateCarrion = 1

        this.hCarrionPalo = 10
        this.anchoCarrionPalo = 0.3

        this.largoSegundero = 0.75
        this.anchoSegundero = 0.25

        this.largoManecilla = 2.5

        this.hCaja = 2
        this.hCilindro = 1
        this.dimensionesCaja = 8
        this.dimensionesCilindro = 3.5
        
        this.createReloj()
    }

    setPosition(x, y, z){
        this.miReloj.position.x = x
        this.miReloj.position.y = y
        this.miReloj.position.z = z
    }
  
    createReloj(){

        this.miReloj = new THREE.Object3D()

        var materialnegro = new THREE.MeshPhongMaterial({color: 0x000000 })
        var materialamarillo = new THREE.MeshPhongMaterial({color: 0xc8c32b })

        var cilindroGeom = new THREE.CylinderGeometry (this.dimensionesCilindro,this.dimensionesCilindro,this.hCilindro,16)
        var materialblanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF })
        var cilindro = new THREE.Mesh (cilindroGeom, materialblanco)
        cilindro.position.y = this.hCaja+this.hCilindro/2

        this.miReloj.add(cilindro)

        var baseAbajo = new THREE.BoxGeometry(this.dimensionesCaja, this.hCaja, this.dimensionesCaja, 2, 1)
        var texture = new THREE.TextureLoader().load('../imgs/madera_marco.jpg')
        var materialmadera = new THREE.MeshPhongMaterial ({map: texture})
        var baseAbajoMesh = new THREE.Mesh(baseAbajo, materialmadera)
        baseAbajoMesh.position.y = this.hCaja/2

        this.miReloj.add(baseAbajoMesh)

        var carrillonMedallaGeom = new THREE.CylinderGeometry (1,1,this.anchoCarrionPalo*2,16)
        carrillonMedallaGeom.translate(-this.hCarrionPalo+1,0,0)
        var carrillonMedalla = new THREE.Mesh (carrillonMedallaGeom, materialamarillo)

        var carrillonPaloGeom = new THREE.CylinderGeometry (this.anchoCarrionPalo,this.anchoCarrionPalo,this.hCarrionPalo,16)
        carrillonPaloGeom.translate(0,-5,0)
        carrillonPaloGeom.rotateZ(-Math.PI/2)
        var carrillonPalo = new THREE.Mesh (carrillonPaloGeom, materialamarillo)
        
        var csg = new CSG()

        csg.union([carrillonPalo, carrillonMedalla])
        
        this.carrillon = new THREE.Mesh()
        this.carrillon = csg.toMesh()
        this.miReloj.add(this.carrillon)

        this.carrillon.position.x = -this.dimensionesCaja/2+0.15
        this.carrillon.position.y = this.hCaja/2

        var rectanguloGeomUno = new THREE.BoxGeometry(this.largoSegundero,this.anchoSegundero,this.anchoSegundero)
        rectanguloGeomUno.translate(3,this.hCaja+this.hCilindro,0)

        //Para las marcas
        for(let i = 0; i < 12; i++){
            var rectanguloMarcaUno = new THREE.Mesh(rectanguloGeomUno,materialnegro)
            rectanguloMarcaUno.rotation.y = (i*this.rotacion)
            this.miReloj.add(rectanguloMarcaUno)
        }

        var manecillaGeom = new THREE.BoxGeometry(this.anchoSegundero,this.anchoSegundero,this.largoManecilla)
        manecillaGeom.translate(0,this.hCaja+this.hCilindro,this.largoManecilla/4)

        this.manecilla = new THREE.Mesh(manecillaGeom,materialnegro)
        this.manecilla.rotation.y = Math.PI/2 //rotacion para ponerlo en hora
        this.miReloj.add(this.manecilla)

        this.add(this.miReloj)

        this.miReloj.rotation.z = Math.PI/2

    }
  
    update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

        var delta = this.reloj.getDelta()*1.5

        if(this.rotateCarrion == 1){
            this.carrillon.rotation.y += this.rotacion * delta
        }
        else if (this.rotateCarrion == -1){
            this.carrillon.rotation.y -= this.rotacion * delta
        }

        if(this.carrillon.rotation.y > Math.PI/9){
            this.rotateCarrion = -1
            this.manecilla.rotation.y -= this.rotacion/5
        }
        else if(this.carrillon.rotation.y < -Math.PI/9){
            this.rotateCarrion = 1
            this.manecilla.rotation.y -= this.rotacion/5
        }
    }
}

export { Reloj };
