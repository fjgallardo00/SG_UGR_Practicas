import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Reloj extends THREE.Object3D {
    constructor() {
        super();

        // Materiales de color
        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xc8c32b })
        this.materialblanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF })
        this.materialnegro = new THREE.MeshPhongMaterial({color: 0x000000 })
        this.materialmarron = new THREE.MeshPhongMaterial({color: 0x853f23 })

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

        var cilindroGeom = new THREE.CylinderGeometry (this.dimensionesCilindro,this.dimensionesCilindro,this.hCilindro,16)
        var cilindro = new THREE.Mesh (cilindroGeom, this.materialblanco)
        cilindro.position.y = this.hCaja+this.hCilindro/2

        this.miReloj.add(cilindro)

        var baseAbajo = new THREE.BoxGeometry(this.dimensionesCaja, this.hCaja, this.dimensionesCaja, 2, 1)
        var baseAbajoMesh = new THREE.Mesh(baseAbajo, this.materialmarron)
        baseAbajoMesh.position.y = this.hCaja/2

        this.miReloj.add(baseAbajoMesh)

        var carrillonMedallaGeom = new THREE.CylinderGeometry (1,1,this.anchoCarrionPalo*2,16)
        carrillonMedallaGeom.translate(-this.hCarrionPalo+1,0,0)
        var carrillonMedalla = new THREE.Mesh (carrillonMedallaGeom, this.materialamarillo)

        var carrillonPaloGeom = new THREE.CylinderGeometry (this.anchoCarrionPalo,this.anchoCarrionPalo,this.hCarrionPalo,16)
        carrillonPaloGeom.translate(0,-5,0)
        carrillonPaloGeom.rotateZ(-Math.PI/2)
        var carrillonPalo = new THREE.Mesh (carrillonPaloGeom, this.materialamarillo)
        
        var csg = new CSG();

        csg.union([carrillonPalo, carrillonMedalla])
        
        this.carrillon = new THREE.Mesh()
        this.carrillon = csg.toMesh()
        this.miReloj.add(this.carrillon)

        this.carrillon.position.x = -this.dimensionesCaja/2+0.15
        this.carrillon.position.y = this.hCaja/2

        //this.carrillonPalo.rotation.y = Math.PI/6
        
        // var movCarrillon = new THREE.Object3D()
        // movCarrillon.add(this.carrillonPalo)
        // this.miReloj.add(movCarrillon)
        

        var rectanguloGeomUno = new THREE.BoxGeometry(this.largoSegundero,this.anchoSegundero,this.anchoSegundero)
        rectanguloGeomUno.translate(3,this.hCaja+this.hCilindro,0)

        //Para las marcas
        for(let i = 0; i < 12; i++){
            var rectanguloMarcaUno = new THREE.Mesh(rectanguloGeomUno,this.materialnegro)
            rectanguloMarcaUno.rotation.y = (i*this.rotacion)
            this.miReloj.add(rectanguloMarcaUno)
        }

        var manecillaGeom = new THREE.BoxGeometry(this.anchoSegundero,this.anchoSegundero,this.largoManecilla)
        manecillaGeom.translate(0,this.hCaja+this.hCilindro,this.largoManecilla/4)

        this.manecilla = new THREE.Mesh(manecillaGeom,this.materialnegro)
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
    
        //this.manecilla.rotation.y -= this.rotacion * this.reloj.getDelta() / 4

        if(this.rotateCarrion == 1){
            this.carrillon.rotation.y += this.rotacion * this.reloj.getDelta()
        }
        else if (this.rotateCarrion == -1){
            this.carrillon.rotation.y -= this.rotacion * this.reloj.getDelta()
        }

        if(this.carrillon.rotation.y > Math.PI/9){
            this.rotateCarrion = -1
        }
        else if(this.carrillon.rotation.y < -Math.PI/9){
            this.rotateCarrion = 1
        }


    }
}

export { Reloj };
