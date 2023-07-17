import * as THREE from '../libs/three.module.js'
 
class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var torusGeom = new THREE.TorusGeometry (1,1,3,3);
        // Como material se crea uno a partir de un color
        var torusMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        var torus = new THREE.Mesh (torusGeom, torusMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (torus);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        torus.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja
        this.guiControls = {
            radius : 1.0,
            tubeRadius : 1.0,
            radialSegments : 3.0,
            tubularSegments : 3.0
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radius', 1.0, 5.0, 0.1).name ('Radio Principal : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.TorusGeometry (v,this.guiControls.tubeRadius,this.guiControls.radialSegments, this.guiControls.tubularSegments);
        });
        folder.add (this.guiControls, 'tubeRadius', 1.0, 5.0, 0.1).name ('Radio Tubo : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.TorusGeometry (this.guiControls.radius,v,this.guiControls.radialSegments, this.guiControls.tubularSegments);
        });
        folder.add (this.guiControls, 'radialSegments', 3.0, 20.0, 1.0).name ('Resolución Toro : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.TorusGeometry (this.guiControls.radius,this.guiControls.tubeRadius,v, this.guiControls.tubularSegments);
        });
        folder.add (this.guiControls, 'tubularSegments', 3.0, 20.0, 1.0).name ('Resolución Tubo : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.TorusGeometry (this.guiControls.radius,this.guiControls.tubeRadius,this.guiControls.radialSegments,v);
        })
        
    }
    
    update () {
        this.children[0].rotation.y += 0.01;
    }
}

export { MyTorus };
