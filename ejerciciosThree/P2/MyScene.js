
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { PointerLockControls } from './PointerLockControls.js'
import * as KeyCode from '../libs/keycode.esm.js'

// Clases de mi proyecto

import { Pedestal } from './pedestal.js'
import { Raycaster } from '../libs/three.module.js'
import { Mesa } from './Mesa.js'
import { Reloj } from './Reloj.js'
import { Trofeo } from './Trofeo.js'
import { Documento } from './documento.js'
import { Taza } from './Taza.js'
import { MySpotLight } from './MySpotLight.js'
import { PanelNumeros } from './PanelNumeros.js'

 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
    constructor (myCanvas) { 
        super();
        
        // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
        this.renderer = this.createRenderer(myCanvas);
        
        // Se crea la interfaz gráfica de usuario
        this.gui = this.createGUI ();
        
        // Construimos los distinos elementos que tendremos en la escena
        
        // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
        // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
        
        // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
        this.axis = new THREE.AxesHelper (5)
        this.add (this.axis)

        this.pickableObjects = []
        this.colisionesObjects = []
        this.mouseDown = false
        this.mouse = new THREE.Vector2()
        
        this.material = new THREE.MeshNormalMaterial()
        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xc8c32b })
        this.materialnegro = new THREE.MeshPhongMaterial({color: 0x000000 })

        this.clock = new THREE.Clock();
        this.rotacion = (Math.PI*2/12); //rotacion para cada hora
        this.segundos = 0
        this.puertaDesbloqueadaExterna = false
        this.puertaDesbloqueadaInterna = false
        this.rotationPuertaExterna = false
        this.colorLamparaPuerta = "rojo"
        this.camaraActual = "personal"

        this.panelResuelto = false

        this.luzPuzleOn1 = false
        this.luzPuzleOn2 = false
        this.luzPuzleOn3 = false
        this.puzleCompleto = false
        
        this.createLights ();
        
        // Tendremos una cámara con un control de movimiento con el ratón
        this.createCamera ();
        
        // Un suelo 
        this.createGround ();

        this.createRoom()
        this.createDoors()
        this.createObjects()
    }

    createObjects(){
        this.reloj = new Reloj()
        this.reloj.setPosition(99.7, 22, 30)
        this.add(this.reloj)
        
        this.trofeo = new Trofeo()
        this.add(this.trofeo)
        this.pickableObjects.push(this.trofeo)
        this.trofeo.setPosition(-90,0,90)

        this.taza = new Taza()
        this.taza.setPosition(85,11.5,85)
        this.taza.setScale(0.2,0.2,0.2)
        this.add(this.taza)

        this.mesa = new Mesa()
        
        this.mesa.scale.x = 0.15
        this.mesa.scale.y = 0.1
        this.mesa.scale.z = 0.15
        
        this.mesa.position.x = 87
        this.mesa.position.z = 80
        this.mesa.position.y = 5
        this.add(this.mesa)

        //Pedestales
        this.pedestal1 = new Pedestal()
        this.pedestal2 = new Pedestal()
        this.pedestal3 = new Pedestal()

        this.pedestal4 = new Pedestal()
        this.pedestal5 = new Pedestal()

        this.pedestal1.setPosition(0, 0, 95)
        this.pedestal2.setPosition(-20, 0, 95)
        this.pedestal3.setPosition(-40, 0, 95)

        this.pedestal4.setPosition(-95, 0, -60)
        this.pedestal5.setPosition(-95, 0, -40)

        this.add (this.pedestal1)
        this.add (this.pedestal2)
        this.add (this.pedestal3)
        this.add (this.pedestal4)
        this.add (this.pedestal5)

        this.colisionesObjects.push(this.pedestal2)

        this.documento = new Documento()
        this.documento.setPosition(80,10.25,80)
        this.add(this.documento)

        this.panelNumeros = new PanelNumeros()
        this.add(this.panelNumeros)

        this.createBotonesPuzle()

        //Caja de pruebas
        // var caja = new THREE.BoxGeometry(4, 8, 4, 2, 1)
        // caja.translate(0,4,0)
        // this.cajaMesh = new THREE.Mesh(caja, this.material)
        // this.cajaMesh.position.x = -4
        // this.cajaMesh.position.z = 24.3

        //this.add(this.cajaMesh)
        //this.pickableObjects.push(this.cajaMesh)
    }
    
    createCamera () {
        // Para crear una cámara le indicamos
        //   El ángulo del campo de visión vértical en grados sexagesimales
        //   La razón de aspecto ancho/alto
        //   Los planos de recorte cercano y lejano
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 5, 500)
        this.cameraPuerta = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 5, 500)
        this.cameraPanel = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 5, 500)

        
        // También se indica dónde se coloca
        this.camera.position.set (-80, 17.5, 50)
        this.cameraPuerta.position.set(20, 25, -20)
        this.cameraPanel.position.set(-15, 15, -80)

        // Y hacia dónde mira
        var look = new THREE.Vector3 (0,17.5,50)
        var lookPuerta = new THREE.Vector3 (50,17.5,-81)
        var lookPanel = new THREE.Vector3(-15,15,-100)

        this.camera.lookAt(look)
        this.cameraPuerta.lookAt(lookPuerta)
        this.cameraPanel.lookAt(lookPanel)

        this.add (this.camera)
        this.add(this.cameraPuerta)
        this.add(this.cameraPanel)
        
        this.cameraControl = new PointerLockControls (this.camera, this.renderer.domElement)

    }
  
    createGround () {
        // El suelo es un Mesh, necesita una geometría y un material.
        
        // La geometría es una caja con muy poca altura
        var geometryGround = new THREE.BoxGeometry (200,0.2,200);
        
        // El material se hará con una textura de madera
        var texture = new THREE.TextureLoader().load('../imgs/suelo-madera.jpg');
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)
        
        var materialGround = new THREE.MeshPhongMaterial ({map: texture});
        
        // Ya se puede construir el Mesh
        this.ground = new THREE.Mesh (geometryGround, materialGround);
        //var ground = new THREE.Mesh();
        
        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        this.ground.position.y = -0.1;
        
        // Que no se nos olvide añadirlo a la escena, que en este caso es  this
        this.add (this.ground);
    }

    createDoors(){

        var texture = new THREE.TextureLoader().load('../imgs/puerta.jpg')
        var materialDoor = new THREE.MeshPhongMaterial ({map: texture})

        var textureViejo = new THREE.TextureLoader().load('../imgs/wood-texture.jpg')
        var materialDoorViejo = new THREE.MeshPhongMaterial ({map: textureViejo})

        // Puerta que no abre
        var puertaUno = new THREE.BoxGeometry(0.3, 23, 16, 2, 1)
        puertaUno.translate(0, 11, 8)
        var puertaUnoMesh = new THREE.Mesh(puertaUno, materialDoor)
        puertaUnoMesh.position.x = -100
        puertaUnoMesh.position.z = 42
        
        // Puerta que sí abre con su pomo
        var puertaDosGeom = new THREE.BoxGeometry(16, 25, 0.3, 2 ,1)
        puertaDosGeom.translate(8, 11, 0)
        this.puertaDos = new THREE.Mesh(puertaDosGeom, materialDoor)
        this.puertaDos.position.x = 42
        this.puertaDos.position.z = -100

        var pomoGeom = new THREE.CylinderGeometry (0.6,0.6,1.5,16)
        pomoGeom.rotateX(Math.PI/2)
        pomoGeom.translate(14, 11, 0.4)
        this.pomo = new THREE.Mesh (pomoGeom, this.materialamarillo)
        this.pomo.position.x = 42
        this.pomo.position.z = -100

        var puertaTresGeom = new THREE.BoxGeometry(16, 25, 0.3, 2 ,1)
        puertaTresGeom.translate(8, 11, 0)
        this.puertaTres = new THREE.Mesh(puertaTresGeom, materialDoorViejo)
        this.puertaTres.position.x = -61

        var pomoViejoGeom = new THREE.CylinderGeometry (0.6,0.6,1.5,16)
        pomoViejoGeom.rotateX(Math.PI/2)
        pomoViejoGeom.translate(14, 11, 0.4)
        this.pomoViejo = new THREE.Mesh (pomoViejoGeom, this.materialamarillo)
        this.pomoViejo.position.x = -61

        this.add(this.pomo)
        this.add(this.puertaDos)
        this.add(this.pomoViejo)
        this.add(this.puertaTres)
        this.add(puertaUnoMesh)
    }

    createRoom(){

        // **** Pared exterior ****
        var texture1 = new THREE.TextureLoader().load('../imgs/pared-cemento.avif');
        texture1.wrapS = THREE.RepeatWrapping
        texture1.wrapT = THREE.RepeatWrapping
        texture1.repeat.set(2, 1)
        var materialWall1 = new THREE.MeshPhongMaterial ({map: texture1});

        var paredExt = new THREE.BoxGeometry(200, 30, 200, 2, 1)
        var paredExtResta = new THREE.BoxGeometry(199.5, 30, 199.5, 2, 1)
        var paredExtMesh = new THREE.Mesh(paredExt, materialWall1)
        var paredExtRestaMesh = new THREE.Mesh(paredExtResta)

        paredExtMesh.position.y = 15
        paredExtRestaMesh.position.y = 15

        var csg1 = new CSG();

        csg1.union([paredExtMesh])
        csg1.subtract([paredExtRestaMesh])
        
        this.pared = new THREE.Mesh()
        this.pared = csg1.toMesh()

        
        //Marcos exteriores de la puerta
        var marcoPuertaUno = new THREE.BoxGeometry(16, 25, 16)
        var marcoPuertaDos = new THREE.BoxGeometry(16, 25, 16)
        marcoPuertaUno.translate(-100, 10, 50)
        marcoPuertaDos.translate(50, 11, -100)
        var marcoPuertaUnoMesh = new THREE.Mesh(marcoPuertaUno)
        var marcoPuertaDosMesh = new THREE.Mesh(marcoPuertaDos)

        var csg2 = new CSG()

        csg2.union([this.pared])
        csg2.subtract([marcoPuertaUnoMesh, marcoPuertaDosMesh])
        
        var resultadoMesh = new THREE.Mesh()
        resultadoMesh = csg2.toMesh()
        
        this.add(resultadoMesh)


        // **** Pared interior ****
        var texture2 = new THREE.TextureLoader().load('../imgs/pared-cemento.avif');
        texture2.wrapS = THREE.RepeatWrapping
        texture2.wrapT = THREE.RepeatWrapping
        texture2.repeat.set(1, 1)
        var materialWall2 = new THREE.MeshPhongMaterial ({map: texture2});

        var paredInt = new THREE.BoxGeometry(100, 30, 100, 2, 1)
        var paredIntResta = new THREE.BoxGeometry(99.5, 30, 99.5, 2, 1)
        var paredIntMesh = new THREE.Mesh(paredInt, materialWall2)
        var paredIntRestaMesh = new THREE.Mesh(paredIntResta)

        paredInt.translate(50,15,50)
        paredIntResta.translate(49.75,15,49.75)

        var marcoPuertaTres = new THREE.BoxGeometry(16, 25, 16)
        marcoPuertaTres.translate(47, 11, 95)
        var marcoPuertaTresMesh = new THREE.Mesh(marcoPuertaTres, this.material)

        var csg3 = new CSG()

        csg3.union([paredIntMesh])
        csg3.subtract([paredIntRestaMesh, marcoPuertaTresMesh])

        this.paredInterna = new THREE.Mesh()
        this.paredInterna = csg3.toMesh()
        this.paredInterna.position.x = -100
        this.paredInterna.position.z = -100

        this.add(this.paredInterna)
        

        // Techo
        var geometryTecho = new THREE.BoxGeometry (200,0.2,200);
        var texture = new THREE.TextureLoader().load('../imgs/pared-cemento.avif');
        var materialTecho = new THREE.MeshPhongMaterial ({map: texture});
        var techo = new THREE.Mesh (geometryTecho, materialTecho);
        
        techo.position.y = 30.1;
        
        this.add (techo);
    }
  
    createGUI () {
        // Se crea la interfaz gráfica de usuario
        var gui = new GUI();
        
        // La escena le va a añadir sus propios controles. 
        // Se definen mediante una   new function()
        // En este caso la intensidad de la luz y si se muestran o no los ejes
        this.guiControls = {
        // En el contexto de una función   this   alude a la función
        lightIntensity : 0.5,
        axisOnOff : true
        }

        // Se crea una sección para los controles de esta clase
        var folder = gui.addFolder ('Luz y Ejes');
        
        // Se le añade un control para la intensidad de la luz
        folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1)
        .name('Intensidad de la Luz : ')
        .onChange ( (value) => this.setLightIntensity (value) );
        
        // Y otro para mostrar u ocultar los ejes
        folder.add (this.guiControls, 'axisOnOff')
        .name ('Mostrar ejes : ')
        .onChange ( (value) => this.setAxisVisible (value) );
        
        return gui;
    }

    createBotonesPuzle(){
        var boton1Geom = new THREE.CylinderGeometry (1,1,0.6,16)
        boton1Geom.translate(0,0.3,0)
        this.boton1 = new THREE.Mesh (boton1Geom, this.material)
        this.boton1.rotation.z = Math.PI/2
        this.boton1.position.x = 99.7
        this.boton1.position.y = 15
        this.boton1.position.z = -80
        this.add(this.boton1)

        var boton2Geom = new THREE.CylinderGeometry (1,1,0.6,16)
        boton2Geom.translate(0,0.3,0)
        this.boton2 = new THREE.Mesh (boton2Geom, this.material)
        this.boton2.rotation.z = Math.PI/2
        this.boton2.position.x = 99.7
        this.boton2.position.y = 15
        this.boton2.position.z = -70
        this.add(this.boton2)

        var boton3Geom = new THREE.CylinderGeometry (1,1,0.6,16)
        boton3Geom.translate(0,0.3,0)
        this.boton3 = new THREE.Mesh (boton3Geom, this.material)
        this.boton3.rotation.z = Math.PI/2
        this.boton3.position.x = 99.7
        this.boton3.position.y = 15
        this.boton3.position.z = -60
        this.add(this.boton3)
    }

    switchLights(boton){
        switch (boton) {
            case 1:
                if(this.lamparaPuzle3.getLightIntensity() == 0){
                    this.lamparaPuzle3.setLightIntensity(0.8)
                    this.lamparaPuzle3.setEmissiveIntensity(0.8)
                    this.luzPuzleOn3 = true
                }
                else{
                    this.lamparaPuzle3.setLightIntensity(0)
                    this.lamparaPuzle3.setEmissiveIntensity(0)
                    this.luzPuzleOn3 = false
                }
                break
            case 2:
                if(this.lamparaPuzle1.getLightIntensity() == 0){
                    this.lamparaPuzle1.setLightIntensity(0.8)
                    this.lamparaPuzle1.setEmissiveIntensity(0.8)
                    this.luzPuzleOn1 = true
                }
                else{
                    this.lamparaPuzle1.setLightIntensity(0)
                    this.lamparaPuzle1.setEmissiveIntensity(0)
                    this.luzPuzleOn1 = false
                }
                
                if(this.lamparaPuzle3.getLightIntensity() == 0){
                    this.lamparaPuzle3.setLightIntensity(0.8)
                    this.lamparaPuzle3.setEmissiveIntensity(0.8)
                    this.luzPuzleOn3 = true
                }
                else{
                    this.lamparaPuzle3.setLightIntensity(0)
                    this.lamparaPuzle3.setEmissiveIntensity(0)
                    this.luzPuzleOn3 = false
                }
                break
            case 3:
                if(this.lamparaPuzle2.getLightIntensity() == 0){
                    this.lamparaPuzle2.setLightIntensity(0.8)
                    this.lamparaPuzle2.setEmissiveIntensity(0.8)
                    this.luzPuzleOn2 = true
                }
                else{
                    this.lamparaPuzle2.setLightIntensity(0)
                    this.lamparaPuzle2.setEmissiveIntensity(0)
                    this.luzPuzleOn2 = false
                }
                
                if(this.lamparaPuzle1.getLightIntensity() == 0){
                    this.lamparaPuzle1.setLightIntensity(0.8)
                    this.lamparaPuzle1.setEmissiveIntensity(0.8)
                    this.luzPuzleOn1 = true
                }
                else{
                    this.lamparaPuzle1.setLightIntensity(0)
                    this.lamparaPuzle1.setEmissiveIntensity(0)
                    this.luzPuzleOn1 = false
                }
                break
            default:
                break
        }
    }

    createLights () {
        // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
        // La luz ambiental solo tiene un color y una intensidad
        // Se declara como   var   y va a ser una variable local a este método
        //    se hace así puesto que no va a ser accedida desde otros métodos
        var ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
        // La añadimos a la escena
        this.add (ambientLight);

        var materialblanco = new THREE.MeshLambertMaterial({color:0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.6})

        // **** Lámpara del techo ****
        var esferaGeom = new THREE.SphereGeometry(1,20,20)
        var lamparaSala = new THREE.Mesh(esferaGeom, materialblanco)
        lamparaSala.position.x = 50
        lamparaSala.position.y = 29.2
        lamparaSala.position.z = 50
        this.add(lamparaSala)

        this.lamparaSalaLuz = new THREE.PointLight (0xffffff, this.guiControls.lightIntensity, 0, 1)
        this.lamparaSalaLuz.position.set(50, 29.2, 50)
        this.add(this.lamparaSalaLuz)

        // **** Lámparas del puzle ****
        this.lamparaPuzle1 = new MySpotLight(0xDDA727, 0, 0)
        this.lamparaPuzle1.setPositionTarget(99, 30, -80)
        this.lamparaPuzle1.setPositionSphere(99, 20.5, -80)
        this.lamparaPuzle1.setPositionLight(99, 20, -80)
        this.add(this.lamparaPuzle1)

        this.lamparaPuzle2 = new MySpotLight(0xDDA727, 0, 0)
        this.lamparaPuzle2.setPositionTarget(99, 30, -70)
        this.lamparaPuzle2.setPositionSphere(99, 20.5, -70)
        this.lamparaPuzle2.setPositionLight(99, 20, -70)
        this.add(this.lamparaPuzle2)

        this.lamparaPuzle3 = new MySpotLight(0xDDA727, 0, 0)
        this.lamparaPuzle3.setPositionTarget(99, 30, -60)
        this.lamparaPuzle3.setPositionSphere(99, 20.5, -60)
        this.lamparaPuzle3.setPositionLight(99, 20, -60)
        this.add(this.lamparaPuzle3)

        // **** Lámpara de la puerta ****
        this.lamparaPuerta = new MySpotLight(0xFF0000, 0.5, 0.8)
        this.lamparaPuerta.setPositionTarget(50, 30, -99)
        this.lamparaPuerta.setPositionSphere(50, 25.5, -99)
        this.lamparaPuerta.setPositionLight(50, 25, -99)
        this.add(this.lamparaPuerta)
    }
    
    setLightIntensity (valor) {
        this.spotLight.intensity = valor
        this.pointLight1.intensity = valor
    }
    
    setAxisVisible (valor) {
        this.axis.visible = valor;
    }
  
    createRenderer (myCanvas) {
        // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
        
        // Se instancia un Renderer   WebGL
        var renderer = new THREE.WebGLRenderer();
        
        // Se establece un color de fondo en las imágenes que genera el render
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
        
        // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // La visualización se muestra en el lienzo recibido
        $(myCanvas).append(renderer.domElement);
        
        return renderer;  
    }
    
    getCamera(camara) {
        // En principio se devuelve la única cámara que tenemos
        // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
        switch (camara) {
            case "personal":
                return this.camera
            case "puertaSalida":
                return this.cameraPuerta
            case "panel":
                return this.cameraPanel
            default:
                break
        }
    }
    
    setCameraAspect (ratio) {
        // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
        // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
        this.camera.aspect = ratio;
        // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
        this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {
        // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
        // Hay que actualizar el ratio de aspecto de la cámara
        this.setCameraAspect (window.innerWidth / window.innerHeight);
        
        // Y también el tamaño del renderizador
        this.renderer.setSize (window.innerWidth, window.innerHeight);
    }

    onKeyDown(event){
        var x = event.which || event.key

        switch (x) {
            case KeyCode.KEY_CONTROL:
                this.cameraControl.unlock()
                break;
            case KeyCode.KEY_UP:
                this.avanzar = true
                this.avanzar_recto = true
                break;
            case KeyCode.KEY_RIGHT:
                this.avanzar = true
                this.avanzar_derecha = true
                break;
            case KeyCode.KEY_LEFT:
                this.avanzar = true
                this.avanzar_izquierda = true
                break;
            case KeyCode.KEY_DOWN:
                this.avanzar = true
                this.avanzar_atras = true
                break;
            default:
                break;
        }

        switch (String.fromCharCode (x)) {
            case "W":
                this.avanzar = true
                this.avanzar_recto = true
                break;
            case "D":
                this.avanzar = true
                this.avanzar_derecha = true
                break;
            case "A":
                this.avanzar = true
                this.avanzar_izquierda = true
                break;
            case "S":
                this.avanzar = true
                this.avanzar_atras = true
                break;
            case "C":
                switch (this.camaraActual) {
                    case "personal":
                        this.camaraActual = "panel"
                        break
                    case "panel":
                        this.camaraActual = "personal"
                        break
                    default:
                        break
                }
                break;
            default:
                break;
        }
    }

    onKeyUp(event){
        var x = event.which || event.key

        switch (x) {
            case KeyCode.KEY_CONTROL:
                this.cameraControl.lock()
                break;
            case KeyCode.KEY_UP:
                this.avanzar = false
                this.avanzar_recto = false
                break;
            case KeyCode.KEY_RIGHT:
                this.avanzar = false
                this.avanzar_derecha = false
                break;
            case KeyCode.KEY_LEFT:
                this.avanzar = false
                this.avanzar_izquierda = false
                break;
            case KeyCode.KEY_DOWN:
                this.avanzar = false
                this.avanzar_atras = false
                break;
            default:
                break;
        }

        switch (String.fromCharCode (x)) {
            case "W":
                this.avanzar = false
                this.avanzar_recto = false
                break;
            case "D":
                this.avanzar = false
                this.avanzar_derecha = false
                break;
            case "A":
                this.avanzar = false
                this.avanzar_izquierda = false
                break;
            case "S":
                this.avanzar = false
                this.avanzar_atras = false
                break;
            default:
                break;
        }
    }

    onMouseMove(event){

        if(this.mouseDown){

            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight)
            
            var raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(this.mouse, this.camera)
    
            var pickedObjects = raycaster.intersectObjects(this.pickableObjects, true)

            //console.log(this.pickableObjects[0].getHeight())
    
            if(pickedObjects.length > 0){
                // Referencia del Mesh clicado
                var selectedObject = pickedObjects[0].object

                // Coordenada del mundo donde se ha hecho click del Mesh
                var selectedPointObject = pickedObjects[0].point

                var posicionPedestal = new THREE.Vector3()
                this.colisionesObjects[0].getWorldPosition(posicionPedestal)

                var difX = Math.abs(selectedPointObject.x-posicionPedestal.x)
                var difZ = Math.abs(selectedPointObject.z-posicionPedestal.z)
                
                if(difX < 6 && difZ < 6){
                    this.puertaDesbloqueadaInterna = true
                    selectedObject.position.x = posicionPedestal.x
                    selectedObject.position.y = this.colisionesObjects[0].getHeight()
                    selectedObject.position.z = posicionPedestal.z
                }
                else{
                    selectedObject.position.x = selectedPointObject.x
                    selectedObject.position.y = 0
                    selectedObject.position.z = selectedPointObject.z
                }
            }
        }


    }

    onMouseDown(event){
            
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight)
        
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(this.mouse, this.camera)

        var pomoPuerta = raycaster.intersectObject(this.pomo, true)

        if(pomoPuerta.length > 0 && this.colorLamparaPuerta == "verde"){
            this.rotationPuertaExterna = true
        }

        var documentoNumeros = raycaster.intersectObject(this.documento, true)

        if(documentoNumeros.length > 0){
            window.alert("- Hay escrito un número:\n\n347")
        }

        var botonPuzle1 = raycaster.intersectObject(this.boton1, true)
        var botonPuzle2 = raycaster.intersectObject(this.boton2, true)
        var botonPuzle3 = raycaster.intersectObject(this.boton3, true)

        if(botonPuzle1.length > 0){
            this.switchLights(1)
            this.boton1.position.x = 99.9
        }

        if(botonPuzle2.length > 0){
            this.switchLights(2)
            this.boton2.position.x = 99.9
        }

        if(botonPuzle3.length > 0){
            this.switchLights(3)
            this.boton3.position.x = 99.9
        }

        var raycasterPanel = new THREE.Raycaster()
        raycasterPanel.setFromCamera(this.mouse, this.cameraPanel)

        var teclaOK = raycasterPanel.intersectObject(this.panelNumeros.getBotonVerde(), true)

        if(teclaOK.length > 0 && this.camaraActual == "panel" && this.panelNumeros.isDesbloqueado()){
            this.panelResuelto = true
        }

        var teclaSalir = raycasterPanel.intersectObject(this.panelNumeros.getBotonSalir(), true)

        if(teclaSalir.length > 0 && this.camaraActual == "panel" && this.panelNumeros.isDesbloqueado()){
            this.camaraActual = "personal"
        }

        this.mouseDown = true
    }

    onMouseUp(){
        this.mouseDown = false
        this.boton1.position.x = 99.7
        this.boton2.position.x = 99.7
        this.boton3.position.x = 99.7
    }
    
    testColision(donde_estoy, donde_miro){
        
        var rayo = new Raycaster(donde_estoy, donde_miro)

        var impactados = rayo.intersectObjects(this.children, true)

        if(impactados.length > 0){
            
            var distanciaMasCercano = impactados[0].distance

            //console.log("DISTANCIA - "+distanciaMasCercano)

            return (distanciaMasCercano < 10)

        }
        else{
            return false
        }

    }

    update () {
        // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
        
        this.reloj.update()
        this.panelNumeros.update()

        var delta = this.clock.getDelta()

        if(this.panelResuelto){
            
            if(this.segundos < 400){
                this.segundos += 1
                this.renderer.render (this, this.getCamera("puertaSalida"))
                if(this.segundos > 200){
                    this.colorLamparaPuerta = "verde"
                    this.lamparaPuerta.setColor(0x00FF00)
                    this.puertaDesbloqueadaExterna = true
                }
            }
            else{
                this.renderer.render (this, this.getCamera(this.camaraActual))
            }
        }
        else{
            this.renderer.render (this, this.getCamera(this.camaraActual))
        }

        if(this.puertaDesbloqueadaExterna && this.rotationPuertaExterna && this.puertaDos.rotation.y < Math.PI/2){
            this.puertaDos.rotation.y += this.rotacion * delta * 2
            this.pomo.rotation.y += this.rotacion * delta * 2
        }

        if(this.puertaDesbloqueadaInterna && this.puertaTres.rotation.y < Math.PI/2){
            this.puertaTres.rotation.y += this.rotacion * delta * 2
            this.pomoViejo.rotation.y += this.rotacion * delta * 2
        }
        
        if(this.luzPuzleOn1 && this.luzPuzleOn2 && this.luzPuzleOn3){
            this.puzleCompleto = true
        }

        if(this.puzleCompleto){
            this.panelNumeros.setPanelDesblqueado(true)
        }

        if(this.avanzar){

            var donde_estoy = new THREE.Vector3()
            this.camera.getWorldPosition(donde_estoy)

            var donde_miro = new THREE.Vector3()
            this.cameraControl.getDirection(donde_miro)

            donde_miro.y = 0
            donde_miro.normalize()
            
            if(!this.testColision(donde_estoy,donde_miro)){
                if(this.avanzar_recto){
                    this.cameraControl.moveForward(0.5)
                }
                else if(this.avanzar_derecha){
                    this.cameraControl.moveRight(0.5)
                }
                else if(this.avanzar_izquierda){
                    this.cameraControl.moveRight(-0.5)
                }
                else if(this.avanzar_atras){
                    this.cameraControl.moveForward(-0.5)
                }
            }   
        }
        
        // Se actualiza la posición de la cámara según su controlador
        //this.cameraControl.update();
        
        // Se actualiza el resto del modelo
        //this.model.update();
        
        // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
        // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
        // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
        requestAnimationFrame(() => this.update())
    }
    }


/// La función   main
$(function () {
  
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");

    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    window.addEventListener("keydown", (event) => scene.onKeyDown(event))
    window.addEventListener("keyup", (event) => scene.onKeyUp(event))
    window.addEventListener("mousedown", (event) => scene.onMouseDown(event))
    window.addEventListener("mouseup", () => scene.onMouseUp())
    window.addEventListener("mousemove", (event) => scene.onMouseMove(event))
        
    // Que no se nos olvide, la primera visualización.
    scene.update();
});
