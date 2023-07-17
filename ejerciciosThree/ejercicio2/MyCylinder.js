import * as THREE from '../libs/three.module.js'
 
class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        // Un Mesh se compone de geometría y material
        var cylinderGeom = new THREE.CylinderGeometry (1,1,1,3);
        // Como material se crea uno a partir de un color
        var cylinderMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        
        // Ya podemos construir el Mesh
        var cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (cylinder);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
        cylinder.position.y = 0.5;
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja
        this.guiControls = {
            radiusTop : 1.0,
            radiusBottom : 1.0,
            height : 1.0,
            radialSegment : 3.0,
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radiusTop', 1.0, 5.0, 0.1).name ('Radio Superior : ').listen().onChange( (radSup) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.CylinderGeometry (radSup,this.guiControls.radiusBottom,1,this.guiControls.radialSegment);
        });
        folder.add (this.guiControls, 'radiusBottom', 1.0, 5.0, 0.1).name ('Radio Inferior : ').listen().onChange( (radInf) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.CylinderGeometry (this.guiControls.radiusTop,radInf,1,this.guiControls.radialSegment);
        });
        folder.add (this.guiControls, 'height', 1.0, 5.0, 0.1).name ('Altura : ').listen();
        folder.add (this.guiControls, 'radialSegment', 3.0, 15.0, 1.0).name ('Resolución : ').listen().onChange( (v) => {
            
            
            // se accede a children porque this no conoce la variable "cone" por ser una variable local del constructor,
            // por lo que tenemos que acceder al hijo de this, que en este caso es el cono como tal
            
            this.children[0].geometry.dispose();
            this.children[0].geometry = new THREE.CylinderGeometry (this.guiControls.radiusTop,this.guiControls.radiusBottom,1,v);
        })
        
    }
    
    update () {
        this.children[0].rotation.y += 0.01;
        this.scale.set (this.guiControls.radiusTop, this.guiControls.height, this.guiControls.radiusTop);
    }
}

export { MyCylinder };
