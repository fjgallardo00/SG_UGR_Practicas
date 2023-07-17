import * as THREE from '../libs/three.module.js'
 
class MySphere extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var sphereGeom = new THREE.SphereGeometry (1,1,1);
        // Como material se crea uno a partir de un color
        var sphereMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        var sphere = new THREE.Mesh (sphereGeom, sphereMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (sphere);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        sphere.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja
        this.guiControls = {
            radius : 1.0,
            widthSegments : 1.0,
            heightSegments : 1.0
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
            this.children[0].geometry = new THREE.SphereGeometry (v,this.guiControls.widthSegments,this.guiControls.heightSegments);
        });
        folder.add (this.guiControls, 'widthSegments', 1.0, 10.0, 1.0).name ('Res. Ecuador : ').listen().onChange( (w) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.SphereGeometry (this.guiControls.radius,w,this.guiControls.heightSegments);
        });
        folder.add (this.guiControls, 'heightSegments', 1.0, 10.0, 1.0).name ('Res. Meridiano : ').listen().onChange( (h) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.SphereGeometry (this.guiControls.radius,this.guiControls.widthSegments,h);
        })
        
    }
    
    update () {
        this.children[0].rotation.y += 0.01;
    }
}

export { MySphere };
