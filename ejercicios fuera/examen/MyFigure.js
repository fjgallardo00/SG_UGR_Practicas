import * as THREE from '../libs/three.module.js'

class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui)

        // Materiales de color
        this.material = new THREE.MeshNormalMaterial()
        this.materialazul = new THREE.MeshPhongMaterial({color: 0x0000FF })

        this.boxEscenarioGeom = new THREE.BoxGeometry(40, 1, 40)
        this.boxEscenarioGeom.translate(0,-1,0)
        this.boxEscenario = new THREE.Mesh(this.boxEscenarioGeom, this.materialazul)
        //this.add(this.boxEscenario)

        this.rotacion = (Math.PI*2/12); //rotacion para cada hora

        this.rectanguloGeomUno = new THREE.BoxGeometry(2.0,0.5,0.5)
        this.rectanguloGeomUno.translate(7,2,0)
        
        //Para las marcas
        for(let i = 0; i < 12; i++){
            var rectanguloMarcaUno = new THREE.Mesh(this.rectanguloGeomUno,this.material)
            rectanguloMarcaUno.rotation.y = (i*this.rotacion)
            this.add(rectanguloMarcaUno)
        }

        this.rectanguloGeomDos = new THREE.BoxGeometry(2.0,0.5,0.5)
        this.rectanguloGeomDos.translate(15,2,0)

        for(let i = 0; i < 12; i++){
            var rectanguloMarcaDos = new THREE.Mesh(this.rectanguloGeomDos,this.material)
            rectanguloMarcaDos.rotation.y = (i*this.rotacion)
            this.add(rectanguloMarcaDos)
        }

        this.esferaExtGeom = new THREE.SphereGeometry(1,20,20);
        this.esferaExtGeom.translate(12, 1, 0);
        this.esferaExt = new THREE.Mesh(this.esferaExtGeom, this.material);
        //this.add(this.esferaExt);

        this.esferaIntGeom = new THREE.SphereGeometry(1,20,20);
        this.esferaIntGeom.translate(4, 1, 0);
        this.esferaInt = new THREE.Mesh(this.esferaIntGeom, this.material);
        //this.add(this.esferaInt);

        this.nodoUno = new THREE.Object3D()
        this.nodoUno.add(this.esferaExt)
        this.nodoUno.add(this.esferaInt)

        this.add(this.nodoUno)

        
        var points = [];
        this.createBaseReloj(points)

        var latheObject = new THREE.Mesh (new THREE.LatheGeometry (points, 30), this.materialazul);
         

        var cunia = new THREE.Shape();
        //cunia.moveTo()
        cunia.moveTo(0.01,-3.5)
        cunia.lineTo(17,-3.5)
        cunia.lineTo(17,-1.5)
        cunia.quadraticCurveTo(17,1.5,14.5,1.5)
        cunia.quadraticCurveTo(12.5,1.5,12.5,0.5)
        cunia.quadraticCurveTo(12.5,-1.5,10,0.5)
        /*
        cunia.quadraticCurveTo(8.5,-1.5,10,-1.5)
        cunia.quadraticCurveTo(7,1.5,8.5,0.5)
        cunia.quadraticCurveTo(5.5,1.5,7,1.5)
        cunia.quadraticCurveTo(4.9,-1.5,5.5,0.5)
        cunia.quadraticCurveTo(2.2,-1.5,4,-1.5)
        cunia.quadraticCurveTo(2.5,5.5,2.5,2.5)
        */
        
        //cunia.moveTo(0.01,5.5)
        




        
        
        var lineGeom = new THREE.BufferGeometry()
        lineGeom.setFromPoints(cunia.getPoints(100))
        var visibleSpline = new THREE.Line (lineGeom, this.materialazul)
        this.add(visibleSpline)

        var latheObject = new THREE.Mesh (new THREE.LatheGeometry (cunia.getPoints(100), 20), this.materialazul);
        //this.add(latheObject)

        var cuniaGeom = new THREE.ExtrudeGeometry (cunia)
        this.cuniamesh = new THREE.Mesh(cuniaGeom, this.materialazul)
        //this.add(this.cuniamesh)

        this.reloj = new THREE.Clock();

    }
  
    createBaseReloj(points){

        
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            velocidad : 1.0,
        }
    
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui)
        
    }
  
    update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
    
        //this.nodoUno.children[0].rotation.y -= this.rotacion * this.reloj.getDelta()
        //this.nodoUno.children[1].rotation.y -= this.rotacion * this.reloj.getDelta()
        this.esferaExt.rotation.y -= this.rotacion * this.reloj.getDelta()

        this.esferaInt.rotation.y -= this.rotacion * this.reloj.getDelta()

    }
}

export { MyFigure };
