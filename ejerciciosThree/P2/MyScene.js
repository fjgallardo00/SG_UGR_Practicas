
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { CSG } from '../libs/CSG-v2.js'
import { PointerLockControls } from './PointerLockControls.js'
import * as KeyCode from '../libs/keycode.esm.js'

// Clases de mi proyecto

//import { MyFigure } from './MyFigure.js'
import { Pedestal } from './pedestal.js'
import { Raycaster } from '../libs/three.module.js'
import { Mesa } from './Mesa.js'
import { Reloj } from './Reloj.js'

 
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

        this.pickableObjects = []
        this.colisionesObjects = []
        this.mouseDown = false
        this.mouse = new THREE.Vector2()
        
        this.material = new THREE.MeshNormalMaterial()
        this.materialamarillo = new THREE.MeshPhongMaterial({color: 0xc8c32b })
        
        
        // Se crea la interfaz gráfica de usuario
        this.gui = this.createGUI ();
        
        // Construimos los distinos elementos que tendremos en la escena
        
        // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
        // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
        this.createLights ();
        
        // Tendremos una cámara con un control de movimiento con el ratón
        this.createCamera ();
        
        // Un suelo 
        this.createGround ();

        this.createRoom()
        this.createDoors()
        
        // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
        
        
        // Por último creamos el modelo.
        // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
        // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
        /*
        */
        var caja = new THREE.BoxGeometry(4, 8, 4, 2, 1)
        caja.translate(0,4,0)
        this.cajaMesh = new THREE.Mesh(caja, this.material)

        this.add(this.cajaMesh)
        this.pickableObjects.push(this.cajaMesh)

        //this.cajaMesh.position.y = 10
        this.cajaMesh.position.x = -4
        this.cajaMesh.position.z = 24.3

        this.rotationPuerta = false

        this.reloj = new Reloj()
        this.reloj.setPosition(99.7, 22, 30)
        this.add(this.reloj)

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

        this.pedestal1.setPosition(0, 0, 95)
        this.pedestal2.setPosition(-20, 0, 95)
        this.pedestal3.setPosition(-40, 0, 95)

        this.add (this.pedestal1)
        this.add (this.pedestal2)
        this.add (this.pedestal3)

        this.clock = new THREE.Clock();
        this.rotacion = (Math.PI*2/12); //rotacion para cada hora
    }
    
    createCamera () {
        // Para crear una cámara le indicamos
        //   El ángulo del campo de visión vértical en grados sexagesimales
        //   La razón de aspecto ancho/alto
        //   Los planos de recorte cercano y lejano
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 2000);
        // También se indica dónde se coloca
        this.camera.position.set (-80, 17.5, 50);
        // Y hacia dónde mira
        var look = new THREE.Vector3 (0,17.5,50);
        this.camera.lookAt(look);
        this.add (this.camera);
        
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

        var texture = new THREE.TextureLoader().load('../imgs/puerta.jpg');
        //texture.wrapS = THREE.RepeatWrapping
        //texture.wrapT = THREE.RepeatWrapping
        //texture.repeat.set(2, 1)
        var materialDoor = new THREE.MeshPhongMaterial ({map: texture});

        var puertaUno = new THREE.BoxGeometry(0.3, 23, 16, 2, 1)
        puertaUno.translate(0, 11, 8)
        var puertaUnoMesh = new THREE.Mesh(puertaUno, materialDoor)
        puertaUnoMesh.position.x = -100
        puertaUnoMesh.position.z = 42
        
        
        var puertaDosGeom = new THREE.BoxGeometry(16, 25, 0.3, 2 ,1)
        puertaDosGeom.translate(8, 11, 0)
        this.puertaDos = new THREE.Mesh(puertaDosGeom, materialDoor)
        this.puertaDos.position.x = 42
        this.puertaDos.position.z = -100
        //this.puertaDos.rotation.y = Math.PI/2

        var pomoGeom = new THREE.CylinderGeometry (0.6,0.6,1.5,16)
        pomoGeom.rotateX(Math.PI/2)
        pomoGeom.translate(14, 11, 0.4)
        this.pomo = new THREE.Mesh (pomoGeom, this.materialamarillo)
        this.pomo.position.x = 42
        this.pomo.position.z = -100

        this.add(this.pomo)
        this.add(this.puertaDos)
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
        this.colisionesObjects.push(this.pared)

        
        //Marcos de la puerta
        var marcoPuertaUno = new THREE.BoxGeometry(16, 25, 16)
        var marcoPuertaDos = new THREE.BoxGeometry(16, 25, 16)
        marcoPuertaUno.translate(-100, 10, 50)
        marcoPuertaDos.translate(50, 10, -100)
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

        var csg3 = new CSG()

        csg3.union([paredIntMesh])
        csg3.subtract([paredIntRestaMesh])

        this.paredInterna = new THREE.Mesh()
        this.paredInterna = csg3.toMesh()
        this.paredInterna.position.x = -100
        this.paredInterna.position.z = -100

        this.add(this.paredInterna)
        this.colisionesObjects.push(this.paredInterna)
        

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

    createLamparas(){
        
        var materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000, transparent: true, opacity: 0.9})
        var materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 })
        var materialblanco = new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.5})
        
        var esferaRojaGeom = new THREE.SphereGeometry(1,20,20)
        //this.esferaRojaGeom.translate(10, 0, 0)
        var esferaRoja = new THREE.Mesh(esferaRojaGeom, materialblanco)
        esferaRoja.position.x = 50
        esferaRoja.position.y = 25
        esferaRoja.position.z = -99
        

        this.add(esferaRoja)

        this.pointLightPuerta1 = new THREE.PointLight (0x00FF00, 0.1, 0, 1)
        this.pointLightPuerta1.position.set(50, 25, -99)
        this.add(this.pointLightPuerta1)

        //this.esferaVerdeGeom = new THREE.SphereGeometry(1,20,20);
        //this.esferaVerdeGeom.translate(12, 0, 0);


        /*for(let i = 0; i < 12; i++){
            var esferaVerdeHora = new THREE.Mesh(this.esferaVerdeGeom, this.materialverde);
            esferaVerdeHora.rotation.y = (i*this.rotacion);
            this.add(esferaVerdeHora);
        }*/
        
        //this.reloj = new THREE.Clock();
    }

    createLights () {
        // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
        // La luz ambiental solo tiene un color y una intensidad
        // Se declara como   var   y va a ser una variable local a este método
        //    se hace así puesto que no va a ser accedida desde otros métodos
        var ambientLight = new THREE.AmbientLight(0xccddee, 0.5);
        // La añadimos a la escena
        this.add (ambientLight);

        //var target = new THREE
        
        // Se crea una luz focal que va a ser la luz principal de la escena
        // La luz focal, además tiene una posición, y un punto de mira
        // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
        // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
        this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
        this.spotLight.position.set( 50, 20, 50 );
        this.spotLight.target
        //this.add (this.spotLight);


        this.pointLight1 = new THREE.PointLight (0xffffff, this.guiControls.lightIntensity, 0, 1)
        this.pointLight1.position.set(50, 20, 50)
        this.add(this.pointLight1)


        //this.createLamparas()

        
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
    
    getCamera () {
        // En principio se devuelve la única cámara que tenemos
        // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
        return this.camera;
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

                var suelo = raycaster.intersectObject(this.ground, true)

                var selectedPointSuelo = suelo.point

                //selectedObject.material.emissive.setHex((this.reloj.getDelta() * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);

                //console.log(this.pickableObjects[0])
                //console.log(pickedObjects[0])

                //console.log(selectedPointObject.x)
                //console.log(selectedPointObject.z)
    
                selectedObject.position.x = selectedPointObject.x
                selectedObject.position.z = selectedPointObject.z
                //selectedObject.position.y = selectedPointObject.y
                
                /*
                if(selectedPointObject.y < 0+10){
                    selectedObject.position.y = 10
                }
                else if(selectedPointObject.y > 30-10){
                    selectedObject.position.y = 30-10
                }
                else{
                    selectedObject.position.y = selectedPointObject.y
                }
                */
            }
        }


    }

    onMouseDown(event){
            
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight)
        
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(this.mouse, this.camera)
        var suelo = raycaster.intersectObject(this.ground, true)
        
        //this.puntoSuelo = suelo[0].point
        
        //console.log(this.puntoSuelo)

        var pomoPuerta = raycaster.intersectObject(this.pomo, true)

        console.log(this.pomo)
        console.log(pomoPuerta)

        if(pomoPuerta.length > 0){
            this.rotationPuerta = true
        }

        this.mouseDown = true
    }

    onMouseUp(){
        this.mouseDown = false
    }
    
    testColision(donde_estoy, donde_miro){
        
        var rayo = new Raycaster(donde_estoy, donde_miro)

        var impactados = rayo.intersectObjects(this.children, true)

        if(impactados.length > 0){
            
            var distanciaMasCercano = impactados[0].distance

            console.log("DISTANCIA - "+distanciaMasCercano)

            return (distanciaMasCercano < 10)

        }
        else{
            return false
        }

    }

    update () {
        // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
        this.renderer.render (this, this.getCamera());
        this.reloj.update()

        if(this.rotationPuerta && this.puertaDos.rotation.y < Math.PI/2){
            this.puertaDos.rotation.y += this.rotacion * this.clock.getDelta() * 2
        }

        if(this.rotationPuerta && this.pomo.rotation.y < Math.PI/2){
            this.pomo.rotation.y += this.rotacion * this.clock.getDelta() * 2
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