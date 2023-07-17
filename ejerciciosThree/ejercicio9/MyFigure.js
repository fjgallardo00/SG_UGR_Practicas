import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui)

        this.material = new THREE.MeshNormalMaterial()

        this.esferaGeom = new THREE.SphereGeometry(1,20,20)
        this.esfera = new THREE.Mesh(this.esferaGeom, this.material)
        this.add(this.esfera)

        this.elipse2D = new THREE.EllipseCurve(0,0,15,10);
        var shape = new THREE.Shape (this.elipse2D.getPoints(100));

        var extrudeSettings = {
            depth: 5,
            bevelEnabled: false
        };

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        var material = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
        this.elipse = new THREE.Mesh( geometry, material ) ;

        //this.add(this.elipse);

        this.spline = this.crearSplineElipse(this.elipse2D);

        var lineGeom = new THREE.BufferGeometry()
        lineGeom.setFromPoints(this.elipse2D.getPoints(100))
        lineGeom.translate(0,0,2.5)
        var materialDos = new THREE.LineBasicMaterial ({color: 0xFF0000, linewidth: 2})
        var visibleSpline = new THREE.Line (lineGeom, materialDos)

        this.add(visibleSpline)

        //Animaciones con TWEEN
        var origen = {t : 0}
        var fin = {t : 1}
        var that = this

        var movimiento = new TWEEN.Tween(origen)
        .to(fin, 8000)
        .repeat(Infinity)
        .onUpdate (function(){
                var t = origen.t
                var posicion = that.spline.getPointAt(t)
                that.esfera.position.copy(posicion)
                var tangente = that.spline.getTangentAt(t)
                posicion.add(tangente)
                that.esfera.lookAt(posicion)
        })
        .onComplete (function(){
                origen.t = 0
        })
        .start();
    }

    crearSplineElipse(elipse2D){
        var array3D = [];
    
        for(var i=0; i<=1; i+=0.01){
          var puntoAux = elipse2D.getPoint(i);
          var punto3D = new THREE.Vector3( puntoAux.x, puntoAux.y, 2.5);
          array3D.push(punto3D);
        }
    
        var splineElipse3D = new THREE.CatmullRomCurve3 (array3D, true);
        return splineElipse3D;
      }
  
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            
        }
    
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        
    }
  
    update () {
        TWEEN.update();
    }
}

export { MyFigure };
