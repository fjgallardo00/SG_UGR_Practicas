import * as THREE from '../libs/three.module.js'

class MyFigure extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui)

        // Materiales de color
        this.material = new THREE.MeshNormalMaterial()
        this.materialrojo = new THREE.MeshPhongMaterial({color: 0xFF0000})
        this.materialverde = new THREE.MeshPhongMaterial({color: 0x00FF00 })

        this.rotacion = (Math.PI*2/12); //rotacion para cada hora
        
        this.esferaRojaGeom = new THREE.SphereGeometry(1,20,20);
        this.esferaRojaGeom.translate(10, 0, 0);

        this.esferaRoja = new THREE.Mesh(this.esferaRojaGeom, this.materialrojo);
        this.add(this.esferaRoja);
        
        this.esferaVerdeGeom.translate(12, 0, 0);
        this.esferaVerdeGeom = new THREE.SphereGeometry(1,20,20);

        for(let i = 0; i < 12; i++){
            var esferaVerdeHora = new THREE.Mesh(this.esferaVerdeGeom, this.materialverde);
            esferaVerdeHora.rotation.y = (i*this.rotacion);
            this.add(esferaVerdeHora);
        }
        
        this.reloj = new THREE.Clock();

    }
  
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = {
            velocidad : 1.0,
        }
    
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add(this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name ('Velocidad :').listen();
        
    }
  
    update () {
		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
    
        this.esferaRoja.rotation.y -= this.guiControls.velocidad * this.rotacion * this.reloj.getDelta()

    }
}

export { MyFigure };
