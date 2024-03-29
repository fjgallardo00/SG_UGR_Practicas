import * as THREE from '../libs/three.module.js'
 
class MyBox extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var boxGeom = new THREE.BoxGeometry (1,1,1);
        // Como material se crea uno a partir de un color
        var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        var box = new THREE.Mesh (boxGeom, boxMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (box);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        box.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja
        this.guiControls = {
        sizeX : 1.0,
        sizeY : 1.0,
        sizeZ : 1.0,
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
        folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
        folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
        
    }
    
    update () {
        this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.children[0].rotation.y += 0.01;
    }
}

export { MyBox };
