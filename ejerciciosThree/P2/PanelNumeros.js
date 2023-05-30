import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class PanelNumeros extends THREE.Object3D {
    constructor() {
        super()
        
        this.reloj = new THREE.Clock()
        this.panelDesbloqueado = false
        this.createPanelNumeros()
    }

    getBotonVerde(){
        return this.botonNumeroVerde
    }

    getBotonSalir(){
        return this.botonNumeroSalir
    }

    isDesbloqueado(){
        return this.panelDesbloqueado
    }

    setPanelDesblqueado(valor){
        this.panelDesbloqueado = valor
    }

    //rotation Math.PI*3/4

    createPanelNumeros(){

        var materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 })
        var materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000 })
        var materialnegro = new THREE.MeshPhongMaterial({color: 0x000000 })
        var materialazul = new THREE.MeshPhongMaterial({color: 0x4BA7F1, transparent: true, opacity: 0.2 })
        var material = new THREE.MeshNormalMaterial()

        var positionY = 12.5

        var panelNumerosGeom = new THREE.BoxGeometry(8, 8, 1, 2, 1)
        this.panelNumeros = new THREE.Mesh(panelNumerosGeom, materialnegro)
        this.panelNumeros.position.x = -15
        this.panelNumeros.position.y = 15
        this.panelNumeros.position.z = -99
        this.add(this.panelNumeros)

        this.wTapa = 2
        this.hTapa = 8

        var tapaNumerosGeom = new THREE.BoxGeometry(this.hTapa, this.hTapa, this.wTapa, 2, 1)
        tapaNumerosGeom.translate(0,-this.hTapa/2,this.wTapa/2)

        this.tapaNumeros = new THREE.Mesh(tapaNumerosGeom, materialazul)
        this.tapaNumeros.position.x = -15
        this.tapaNumeros.position.y = 19
        this.tapaNumeros.position.z = -98.5

        //this.tapaNumeros.rotation.x = -Math.PI/2
        this.add(this.tapaNumeros)

        var botonNumeroVerdeGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroVerde = new THREE.Mesh(botonNumeroVerdeGeom, materialverde)
        this.botonNumeroVerde.position.x = -13
        this.botonNumeroVerde.position.y = positionY 
        this.botonNumeroVerde.position.z = -98
        this.add(this.botonNumeroVerde)

        var botonNumeroSalirGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSalir = new THREE.Mesh(botonNumeroSalirGeom, material)
        this.botonNumeroSalir.position.x = -15
        this.botonNumeroSalir.position.y = positionY 
        this.botonNumeroSalir.position.z = -98
        this.add(this.botonNumeroSalir)

        var botonNumeroRojoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroRojo = new THREE.Mesh(botonNumeroRojoGeom, materialrojo)
        this.botonNumeroRojo.position.x = -17
        this.botonNumeroRojo.position.y = positionY 
        this.botonNumeroRojo.position.z = -98
        this.add(this.botonNumeroRojo)

        var botonNumeroUnoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroUno = new THREE.Mesh(botonNumeroUnoGeom, material)
        this.botonNumeroUno.position.x = -17
        this.botonNumeroUno.position.y = positionY + 1
        this.botonNumeroUno.position.z = -98
        this.add(this.botonNumeroUno)

        var botonNumeroDosGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroDos = new THREE.Mesh(botonNumeroDosGeom, material)
        this.botonNumeroDos.position.x = -15
        this.botonNumeroDos.position.y = positionY + 1
        this.botonNumeroDos.position.z = -98
        this.add(this.botonNumeroDos)

        var botonNumeroTresGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroTres = new THREE.Mesh(botonNumeroTresGeom, material)
        this.botonNumeroTres.position.x = -13
        this.botonNumeroTres.position.y = positionY + 1
        this.botonNumeroTres.position.z = -98
        this.add(this.botonNumeroTres)

        var botonNumeroCuatroGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroCuatro = new THREE.Mesh(botonNumeroCuatroGeom, material)
        this.botonNumeroCuatro.position.x = -17
        this.botonNumeroCuatro.position.y = positionY + 2
        this.botonNumeroCuatro.position.z = -98
        this.add(this.botonNumeroCuatro)

        var botonNumeroCincoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroCinco = new THREE.Mesh(botonNumeroCincoGeom, material)
        this.botonNumeroCinco.position.x = -15
        this.botonNumeroCinco.position.y = positionY + 2
        this.botonNumeroCinco.position.z = -98
        this.add(this.botonNumeroCinco)

        var botonNumeroSeisGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSeis = new THREE.Mesh(botonNumeroSeisGeom, material)
        this.botonNumeroSeis.position.x = -13
        this.botonNumeroSeis.position.y = positionY + 2
        this.botonNumeroSeis.position.z = -98
        this.add(this.botonNumeroSeis)

        var botonNumeroSieteGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSiete = new THREE.Mesh(botonNumeroSieteGeom, material)
        this.botonNumeroSiete.position.x = -17
        this.botonNumeroSiete.position.y = positionY + 3
        this.botonNumeroSiete.position.z = -98
        this.add(this.botonNumeroSiete)

        var botonNumeroOchoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroOcho = new THREE.Mesh(botonNumeroOchoGeom, material)
        this.botonNumeroOcho.position.x = -15
        this.botonNumeroOcho.position.y = positionY + 3
        this.botonNumeroOcho.position.z = -98
        this.add(this.botonNumeroOcho)

        var botonNumeroNueveGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroNueve = new THREE.Mesh(botonNumeroNueveGeom, material)
        this.botonNumeroNueve.position.x = -13
        this.botonNumeroNueve.position.y = positionY + 3
        this.botonNumeroNueve.position.z = -98
        this.add(this.botonNumeroNueve)
    }
    
    update () {
        if(this.panelDesbloqueado && this.tapaNumeros.rotation.x > -Math.PI*2/3){
            var delta = this.reloj.getDelta()*1.5
            var rotacion = (Math.PI*2/12)

            this.tapaNumeros.rotation.x -= rotacion * delta

        }
    }
}

export { PanelNumeros }
