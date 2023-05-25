import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class Trofeo extends THREE.Object3D {
    constructor() {
        super();
        
        // Puntos
        var points = [];
        
        // Se añaden puntos al array mediante unas cuantas instrucciones como la siguiente definimos el contorno a revolucionar
        this.createQueen(points);

        var materialamarillo = new THREE.MeshPhongMaterial({color: 0xc8c32b })
        var materialinvisible = new THREE.MeshPhongMaterial({transparent: true, opacity: 0})
        
        var piezaGeom = new THREE.LatheGeometry (points, 10)
        piezaGeom.translate(0,2,0)
        piezaGeom.scale(2.1,2.1,2.1)
        var pieza = new THREE.Mesh (piezaGeom, materialamarillo)

        var toroGeom = new THREE.TorusGeometry(2, 0.3, 24, 24)
        toroGeom.translate(0,5,0)
        var toro = new THREE.Mesh(toroGeom, materialamarillo)

        var cajaGeom = new THREE.BoxGeometry(2, 2, 2, 2, 1)
        cajaGeom.translate(0,8.6,0)
        var caja = new THREE.Mesh(cajaGeom, materialinvisible)

        var csg = new CSG()
        csg.union([pieza, toro, caja])

        this.trofeo = new THREE.Mesh()
        this.trofeo = csg.toMesh()
        this.add(this.trofeo)
    }

    setPosition(x, y, z){
        this.trofeo.position.x = x
        this.trofeo.position.y = y
        this.trofeo.position.z = z
    }

    createQueen(points){
        points.push (new THREE.Vector3 (0.001, -2.0, 0))
        points.push (new THREE.Vector3 (1.0, -2.0, 0))
        points.push (new THREE.Vector3 (0.8, -1.7, 0))
        points.push (new THREE.Vector3 (0.5, -1.5, 0))
        points.push (new THREE.Vector3 (0.8, -1.3, 0))
        points.push (new THREE.Vector3 (0.7, -1.1, 0))
        points.push (new THREE.Vector3 (0.5, -0.9, 0))
        points.push (new THREE.Vector3 (0.4, 0.0, 0))
        points.push (new THREE.Vector3 (0.3, 0.5, 0))
        points.push (new THREE.Vector3 (0.25, 0.7, 0))
        points.push (new THREE.Vector3 (0.25, 0.8, 0))
        points.push (new THREE.Vector3 (0.25, 1.0, 0))
        points.push (new THREE.Vector3 (0.25, 1.2, 0))
        points.push (new THREE.Vector3 (0.25, 1.4, 0))
        points.push (new THREE.Vector3 (0.3, 1.5, 0))
        points.push (new THREE.Vector3 (0.4, 1.55, 0))
        points.push (new THREE.Vector3 (0.5, 1.6, 0))
        points.push (new THREE.Vector3 (0.4, 1.65, 0))
        points.push (new THREE.Vector3 (0.3, 1.7, 0))
        points.push (new THREE.Vector3 (0.35, 1.75, 0))
        points.push (new THREE.Vector3 (0.3, 1.8, 0))
        points.push (new THREE.Vector3 (0.3, 1.9, 0))
        points.push (new THREE.Vector3 (0.4, 2.0, 0))
        points.push (new THREE.Vector3 (0.55, 2.1, 0))
        points.push (new THREE.Vector3 (0.5, 2.3, 0))
        points.push (new THREE.Vector3 (0.4, 2.3, 0))
        points.push (new THREE.Vector3 (0.4, 2.35, 0))
        points.push (new THREE.Vector3 (0.35, 2.4, 0))
        points.push (new THREE.Vector3 (0.3, 2.55, 0))
        points.push (new THREE.Vector3 (0.15, 2.6, 0))
        points.push (new THREE.Vector3 (0.001, 2.6, 0))
    }
    
    update () {
        
    }
}

export { Trofeo }
