import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
 
class FiguraRaraDos extends THREE.Object3D {
    constructor(color) {
        super()

        var material = new THREE.MeshPhongMaterial({color: color})

        var shape = new THREE.Shape()
        this.createShape(shape)

        var options = {
            depth: 7,
            steps: 2,
            curveSegments: 6,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 2
        }

        var geometry = new THREE.ExtrudeGeometry (shape, options)
        
        var extrude = new THREE.Mesh (geometry, material)

        extrude.position.y = 3
        extrude.rotation.x = Math.PI/4
        extrude.rotation.z = Math.PI/4

        extrude.scale.x = 0.1
        extrude.scale.y = 0.1
        extrude.scale.z = 0.1

        var cilindroGeom = new THREE.CylinderGeometry (0.5,0.5,3.5,15)
        var cilindro = new THREE.Mesh (cilindroGeom, material)
        cilindro.position.y = 1.75

        var csg = new CSG()
        csg.union([extrude, cilindro])
        
        this.figura = new THREE.Mesh()
        this.figura = csg.toMesh()

        this.figura.scale.x = 2
        this.figura.scale.y = 2
        this.figura.scale.z = 2

        this.add(this.figura)
    }

    setRotationY(y){
        this.figura.rotation.y = y
    }

    setPosition(x, y, z){
        this.figura.position.x = x
        this.figura.position.y = y
        this.figura.position.z = z
    }

    createShape(shape){
        shape.moveTo(-10, -10)
        shape.lineTo(-10, 10)
        shape.quadraticCurveTo(0, 0, 10, 10)
        shape.quadraticCurveTo(20, 0, 10, -10)
        shape.quadraticCurveTo(0, 0, -10, -10)
    }
}

export { FiguraRaraDos }
