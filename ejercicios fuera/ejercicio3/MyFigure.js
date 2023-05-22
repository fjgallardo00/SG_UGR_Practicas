import * as THREE from '../libs/three.module.js'
 
class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Puntos
        var points = [];
        // Se añaden puntos al array mediante unas cuantas instrucciones como la siguiente definimos el contorno a revolucionar
        
        this.createQueen(points);
        
        // Para crear una línea visible, como en el vídeo
        /*
        var lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints (points);
        var line = new THREE.Line (lineGeometry);
        */

        // Un Mesh se compone de geometría y material
        // Como material se crea uno a partir de un color
        var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        
        var latheObject = new THREE.Mesh (new THREE.LatheGeometry (points, 3), boxMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (latheObject);
    }

    createQueen(points){
        points.push (new THREE.Vector3 (0, -2.0, 0));
        points.push (new THREE.Vector3 (1.0, -2.0, 0));
        points.push (new THREE.Vector3 (0.8, -1.7, 0));
        points.push (new THREE.Vector3 (0.5, -1.5, 0));
        points.push (new THREE.Vector3 (0.8, -1.3, 0));
        points.push (new THREE.Vector3 (0.7, -1.1, 0));
        points.push (new THREE.Vector3 (0.5, -0.9, 0));
        points.push (new THREE.Vector3 (0.4, 0.0, 0));
        points.push (new THREE.Vector3 (0.3, 0.5, 0));
        points.push (new THREE.Vector3 (0.25, 0.7, 0));
        points.push (new THREE.Vector3 (0.25, 0.8, 0));
        points.push (new THREE.Vector3 (0.25, 1.0, 0));
        points.push (new THREE.Vector3 (0.25, 1.2, 0));
        points.push (new THREE.Vector3 (0.25, 1.4, 0));
        points.push (new THREE.Vector3 (0.3, 1.5, 0));
        points.push (new THREE.Vector3 (0.4, 1.55, 0));
        points.push (new THREE.Vector3 (0.5, 1.6, 0));
        points.push (new THREE.Vector3 (0.4, 1.65, 0));
        points.push (new THREE.Vector3 (0.3, 1.7, 0));
        points.push (new THREE.Vector3 (0.35, 1.75, 0));
        points.push (new THREE.Vector3 (0.3, 1.8, 0));
        points.push (new THREE.Vector3 (0.3, 1.9, 0));
        points.push (new THREE.Vector3 (0.4, 2.0, 0));
        points.push (new THREE.Vector3 (0.55, 2.1, 0));
        points.push (new THREE.Vector3 (0.5, 2.3, 0));
        points.push (new THREE.Vector3 (0.4, 2.3, 0));
        points.push (new THREE.Vector3 (0.4, 2.35, 0));
        points.push (new THREE.Vector3 (0.35, 2.4, 0));
        points.push (new THREE.Vector3 (0.3, 2.5, 0));
        points.push (new THREE.Vector3 (0.15, 2.55, 0));
        points.push (new THREE.Vector3 (0, 2.55, 0));
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja iniciales
        this.guiControls = {
        segments : 3.0,
        angle : 10.0
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'segments', 3.0, 15.0, 1.0).name ('Resolución : ').listen().onChange( (v) => {
            
            var points = [];
            
            this.createQueen(points);

            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.LatheGeometry (points, v, 0, (Math.PI*2)*(this.guiControls.angle/10));
        });
        folder.add (this.guiControls, 'angle', 1.0, 10.0, 1.0).name ('Ángulo : ').listen().onChange( (v) => {
            
            var points = [];
            
            this.createQueen(points);

            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.LatheGeometry (points, this.guiControls.segments, 0, (Math.PI*2)*(v/10));
        });
        
    }
    
    update () {
        //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.children[0].rotation.y += 0.01;
        this.children[0].rotation.x += 0.01;
    }
}

export { MyFigure };
