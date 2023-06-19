import * as THREE from '../libs/three.module.js'
 
class FiguraRara extends THREE.Object3D {
    constructor(color) {
        super()

        var shape = new THREE.Shape()
        this.createShape(shape)

        var pts = []

        pts.push(new THREE.Vector3(0, 0, 0))
        pts.push(new THREE.Vector3(30, 0, 0))
        pts.push(new THREE.Vector3(35, 40, 0))
        pts.push(new THREE.Vector3(0, 45, 30))
        pts.push(new THREE.Vector3(15, 60, 30))
        pts.push(new THREE.Vector3(15, 80, 30))
        pts.push(new THREE.Vector3(-15, 80, -30))
        pts.push(new THREE.Vector3(-10, 40, -20))

        var path = new THREE.CatmullRomCurve3 (pts)
        var optionsExtrude = {
            steps: 50,
            curveSegments: 4,
            extrudePath: path,
        }

        var extrusiongeometry = new THREE.ExtrudeGeometry(shape, optionsExtrude)
        var boxMat = new THREE.MeshPhongMaterial({color: color})
        this.figura = new THREE.Mesh (extrusiongeometry, boxMat)

        this.figura.scale.x = 0.1
        this.figura.scale.y = 0.1
        this.figura.scale.z = 0.1

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
        shape.lineTo(10, -10)
        shape.quadraticCurveTo(0, 0, -10, -10)
    }
}

export { FiguraRara }
