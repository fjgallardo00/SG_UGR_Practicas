import * as THREE from '../libs/three.module.js'
 
class MyIcosahedron extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var icosahedronGeom = new THREE.IcosahedronGeometry (1,0);
        // Como material se crea uno a partir de un color
        var icosahedronMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        var icosahedron = new THREE.Mesh (icosahedronGeom, icosahedronMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (icosahedron);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        icosahedron.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja
        this.guiControls = {
            radius : 1.0,
            detail : 0.0
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radius', 1.0, 5.0, 0.1).name ('Radio : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.IcosahedronGeometry (v,this.guiControls.detail);
        });
        folder.add (this.guiControls, 'detail', 0.0, 5.0, 1.0).name ('Subdivisión : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.IcosahedronGeometry (this.guiControls.radius,v);
        });
        
    }
    
    update () {
        this.children[0].rotation.y += 0.01;
    }
}

export { MyIcosahedron };
