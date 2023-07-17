import * as THREE from '../libs/three.module.js'
 
class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        
        var shape = new THREE.Shape();
        this.createShape(shape);

        var options = {
            depth: 2,
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
        }

        var pts = []

        pts.push(new THREE.Vector3(0, 0, 0))
        pts.push(new THREE.Vector3(30, 0, 0))
        pts.push(new THREE.Vector3(35, 40, 0))
        pts.push(new THREE.Vector3(0, 45, 30))
        pts.push(new THREE.Vector3(15, 60, 30))

        var path = new THREE.CatmullRomCurve3 (pts);
        var optionsExtrude = {
            steps: 50,
            curveSegments: 4,
            extrudePath: path,
        }

        var extrusiongeometry = new THREE.ExtrudeGeometry(shape, optionsExtrude)

        //var geometry = new THREE.ExtrudeGeometry (shape, options);

        var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});
        var figura = new THREE.Mesh (extrusiongeometry, boxMat);

        this.add(figura);
        
    }

    createShape(shape){
        shape.moveTo(-10, -15);
        shape.lineTo(-10, 15);
        shape.bezierCurveTo(-5, 0, 5, 0, 10, 15);
        shape.splineThru( [ new THREE.Vector2(12, 5), new THREE.Vector2(8, -5), new THREE.Vector2(10, -15) ] );
        shape.quadraticCurveTo(0, -10, -10, -15);

        var hole = new THREE.Shape();
        hole.absellipse(-4, -1, 2, 3, 0, Math.PI * 2);
        shape.holes.push(hole);

        hole = new THREE.Shape();
        hole.absellipse(4, -1, 2, 3, 0, Math.PI * 2);
        shape.holes.push(hole);

        hole = new THREE.Shape();
        hole.absarc(0, -5, Math.PI*2, Math.PI)
        shape.holes.push(hole);
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño de la caja iniciales
        this.guiControls = {
            depth: 2,
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
            } 
            
            // Se crea una sección para los controles de la caja
            var folder = gui.addFolder (titleGui);
            // Estas lineas son las que añaden los componentes de la interfaz
            // Las tres cifras indican un valor mínimo, un máximo y el incremento
            // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
            
    }
    
    update () {
        //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
        this.children[0].rotation.y += 0.01;
        //this.children[0].rotation.x += 0.01;
    }
}

export { MyFigure };
