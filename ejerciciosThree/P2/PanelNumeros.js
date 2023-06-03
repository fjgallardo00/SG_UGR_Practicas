import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class PanelNumeros extends THREE.Object3D {
    constructor() {
        super()
        
        this.reloj = new THREE.Clock()
        this.panelDesbloqueado = false
        this.panel = []
        this.botonesNumeros = []
        this.createPanelNumeros()
    }

    getBotonVerde(){
        return this.botonNumeroVerde
    }

    getBotonSalir(){
        return this.botonNumeroSalir
    }

    getBotonRojo(){
        return this.botonNumeroRojo
    }

    getBotonUno(){
        return this.botonNumeroUno
    }

    getBotonDos(){
        return this.botonNumeroDos
    }

    getBotonTres(){
        return this.botonNumeroTres
    }

    getBotonCuatro(){
        return this.botonNumeroCuatro
    }

    getBotonCinco(){
        return this.botonNumeroCinco
    }

    getBotonSeis(){
        return this.botonNumeroSeis
    }

    getBotonSiete(){
        return this.botonNumeroSiete
    }

    getBotonOcho(){
        return this.botonNumeroOcho
    }

    getBotonNueve(){
        return this.botonNumeroNueve
    }

    isDesbloqueado(){
        return this.panelDesbloqueado
    }

    setPanelDesblqueado(valor){
        this.panelDesbloqueado = valor
    }

    getPanel(i){
        return this.panel[i]
    }

    getPanelLength(){
        return this.panel.length
    }
    
    setPulsado(valor){
        switch (valor) {
            case 1:
                this.botonNumeroUno.position.z = -98.2
                break
            case 2:
                this.botonNumeroDos.position.z = -98.2
                break
            case 3:
                this.botonNumeroTres.position.z = -98.2
                break
            case 4:
                this.botonNumeroCuatro.position.z = -98.2
                break
            case 5:
                this.botonNumeroCinco.position.z = -98.2
                break
            case 6:
                this.botonNumeroSeis.position.z = -98.2
                break
            case 7:
                this.botonNumeroSiete.position.z = -98.2
                break
            case 8:
                this.botonNumeroOcho.position.z = -98.2
                break
            case 9:
                this.botonNumeroNueve.position.z = -98.2
                break
            case "verde":
                this.botonNumeroVerde.position.z = -98.2
                break
            case "rojo":
                this.botonNumeroRojo.position.z = -98.2
                break
            case "salir":
                this.botonNumeroSalir.position.z = -98.2
                break
            default:
                break;
        }
    }

    setNoPulsado(){
        this.botonNumeroUno.position.z = -98
        this.botonNumeroDos.position.z = -98
        this.botonNumeroTres.position.z = -98
        this.botonNumeroCuatro.position.z = -98
        this.botonNumeroCinco.position.z = -98
        this.botonNumeroSeis.position.z = -98
        this.botonNumeroSiete.position.z = -98
        this.botonNumeroOcho.position.z = -98
        this.botonNumeroNueve.position.z = -98
        this.botonNumeroVerde.position.z = -98
        this.botonNumeroRojo.position.z = -98
        this.botonNumeroSalir.position.z = -98
    }

    createPanelNumeros(){

        var materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 })
        var materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000 })
        var materialnegro = new THREE.MeshPhongMaterial({color: 0x000000 })
        var materialblanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF })
        var materialazul = new THREE.MeshPhongMaterial({color: 0x4BA7F1, transparent: true, opacity: 0.2 })

        var positionY = 13.5

        var panelNumerosGeom = new THREE.BoxGeometry(7, 6, 1, 2, 1)
        this.panelNumeros = new THREE.Mesh(panelNumerosGeom, materialnegro)
        this.panelNumeros.position.x = -15
        this.panelNumeros.position.y = 15
        this.panelNumeros.position.z = -99
        this.add(this.panelNumeros)

        this.wTapa = 2
        this.hTapa = 8

        var tapaNumerosGeom = new THREE.BoxGeometry(7, 6, this.wTapa, 2, 1)
        tapaNumerosGeom.translate(0,-6/2,this.wTapa/2)

        this.tapaNumeros = new THREE.Mesh(tapaNumerosGeom, materialazul)
        this.tapaNumeros.position.x = -15
        this.tapaNumeros.position.y = 18
        this.tapaNumeros.position.z = -98.5

        //this.tapaNumeros.rotation.x = -Math.PI/2
        this.add(this.tapaNumeros)

        var botonNumeroVerdeGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroVerde = new THREE.Mesh(botonNumeroVerdeGeom, materialverde)
        this.botonNumeroVerde.position.x = -13
        this.botonNumeroVerde.position.y = positionY 
        this.botonNumeroVerde.position.z = -98
        this.add(this.botonNumeroVerde)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/salir.png')
        var materialSalir = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroSalirGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSalir = new THREE.Mesh(botonNumeroSalirGeom, materialSalir)
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

        var texture = new THREE.TextureLoader().load('../imgs/numeros/1.png')
        var materialUno = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroUnoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroUno = new THREE.Mesh(botonNumeroUnoGeom, materialUno)
        this.botonNumeroUno.position.x = -17
        this.botonNumeroUno.position.y = positionY + 1
        this.botonNumeroUno.position.z = -98
        this.add(this.botonNumeroUno)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/2.png')
        var materialDos = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroDosGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroDos = new THREE.Mesh(botonNumeroDosGeom, materialDos)
        this.botonNumeroDos.position.x = -15
        this.botonNumeroDos.position.y = positionY + 1
        this.botonNumeroDos.position.z = -98
        this.add(this.botonNumeroDos)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/3.png')
        var materialTres = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroTresGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroTres = new THREE.Mesh(botonNumeroTresGeom, materialTres)
        this.botonNumeroTres.position.x = -13
        this.botonNumeroTres.position.y = positionY + 1
        this.botonNumeroTres.position.z = -98
        this.add(this.botonNumeroTres)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/4.png')
        var materialCuatro = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroCuatroGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroCuatro = new THREE.Mesh(botonNumeroCuatroGeom, materialCuatro)
        this.botonNumeroCuatro.position.x = -17
        this.botonNumeroCuatro.position.y = positionY + 2
        this.botonNumeroCuatro.position.z = -98
        this.add(this.botonNumeroCuatro)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/5.png')
        var materialCinco = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroCincoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroCinco = new THREE.Mesh(botonNumeroCincoGeom, materialCinco)
        this.botonNumeroCinco.position.x = -15
        this.botonNumeroCinco.position.y = positionY + 2
        this.botonNumeroCinco.position.z = -98
        this.add(this.botonNumeroCinco)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/6.png')
        var materialSeis = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroSeisGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSeis = new THREE.Mesh(botonNumeroSeisGeom, materialSeis)
        this.botonNumeroSeis.position.x = -13
        this.botonNumeroSeis.position.y = positionY + 2
        this.botonNumeroSeis.position.z = -98
        this.add(this.botonNumeroSeis)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/7.png')
        var materialSiete = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroSieteGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroSiete = new THREE.Mesh(botonNumeroSieteGeom, materialSiete)
        this.botonNumeroSiete.position.x = -17
        this.botonNumeroSiete.position.y = positionY + 3
        this.botonNumeroSiete.position.z = -98
        this.add(this.botonNumeroSiete)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/8.png')
        var materialOcho = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroOchoGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroOcho = new THREE.Mesh(botonNumeroOchoGeom, materialOcho)
        this.botonNumeroOcho.position.x = -15
        this.botonNumeroOcho.position.y = positionY + 3
        this.botonNumeroOcho.position.z = -98
        this.add(this.botonNumeroOcho)

        var texture = new THREE.TextureLoader().load('../imgs/numeros/9.png')
        var materialNueve = new THREE.MeshPhongMaterial ({map: texture})

        var botonNumeroNueveGeom = new THREE.BoxGeometry(1, 0.5, 0.25, 2, 1)
        this.botonNumeroNueve = new THREE.Mesh(botonNumeroNueveGeom, materialNueve)
        this.botonNumeroNueve.position.x = -13
        this.botonNumeroNueve.position.y = positionY + 3
        this.botonNumeroNueve.position.z = -98
        this.add(this.botonNumeroNueve)

        this.panel.push(this.panelNumeros)
        this.panel.push(this.tapaNumeros)
        this.panel.push(this.botonNumeroVerde)
        this.panel.push(this.botonNumeroRojo)
        this.panel.push(this.botonNumeroSalir)
        this.panel.push(this.botonNumeroUno)
        this.panel.push(this.botonNumeroDos)
        this.panel.push(this.botonNumeroTres)
        this.panel.push(this.botonNumeroCuatro)
        this.panel.push(this.botonNumeroCinco)
        this.panel.push(this.botonNumeroSeis)
        this.panel.push(this.botonNumeroSiete)
        this.panel.push(this.botonNumeroOcho)
        this.panel.push(this.botonNumeroNueve)

        //this.add(this.panel)
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
