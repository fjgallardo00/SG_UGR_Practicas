import * as THREE from '../libs/three.module.js'
 
class MySpotLight extends THREE.Object3D {
    constructor(color, emissiveIntensity, lightIntensity) {
        super()
        
        this.createSphere(color, emissiveIntensity)
        this.createTarget()
        this.createLight(color, lightIntensity)
    }

    createSphere(color, emissiveIntensity){
        var esferaGeom = new THREE.SphereGeometry(1,20,20)
        var material = new THREE.MeshLambertMaterial({color: color, emissive: color, emissiveIntensity: emissiveIntensity})
        this.lampara = new THREE.Mesh(esferaGeom, material)
        this.add(this.lampara)
    }

    createTarget(){
        this.target = new THREE.Object3D()
        this.add(this.target)
    }

    createLight(color, lightIntensity){
        this.pointLight = new THREE.SpotLight (color, lightIntensity, 0, Math.PI/3, 1)
        this.pointLight.target = this.target
        this.add(this.pointLight)
    }

    getLightIntensity(){
        return this.pointLight.intensity
    }

    setPositionSphere(x, y, z){
        this.lampara.position.x = x
        this.lampara.position.y = y
        this.lampara.position.z = z
    }

    setPositionTarget(x, y, z){
        this.target.position.x = x
        this.target.position.y = y
        this.target.position.z = z
    }

    setPositionLight(x, y, z){
        this.pointLight.position.set(x, y, z)
    }

    setLightIntensity(valor) {
        this.pointLight.intensity = valor
    }

    setEmissiveIntensity(valor){
        this.lampara.material.emissiveIntensity = valor
    }

    setColor(color){
        this.pointLight.color = new THREE.Color(color)
        this.lampara.material.color = new THREE.Color(color)
        this.lampara.material.emissive = new THREE.Color(color)
    }
    
    update () {
        
    }
}

export { MySpotLight }
