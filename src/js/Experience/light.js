import * as THREE from "three"
import { scene, gui, colors, active } from "./world"

export let pointLight1 = null
export let pointLight2 = null

export const initLight = () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 0, 5)
    scene.add(directionalLight)    

    pointLight1 = new THREE.PointLight(colors[0].color3, 1.5)
    pointLight1.position.set(-20, 20, 20)
    scene.add(pointLight1)

    pointLight2 = new THREE.PointLight("#b54504", 2)
    pointLight2.position.set(-3, -20, 1)
    scene.add(pointLight2)

    if (active) {
        gui.add(directionalLight, "intensity").min(0).max(1).step(0.01)
        gui.add(directionalLight.position, "x").min(-20).max(20).step(0.1).name("DirectionalLight x")
        gui.add(directionalLight.position, "y").min(-20).max(20).step(0.1).name("DirectionalLight y")
        gui.add(directionalLight.position, "z").min(-20).max(20).step(0.1).name("D  irectionalLight z")
        gui.add(pointLight1.position, "x").min(-20).max(20).step(0.1).name("PointLight x")
        gui.add(pointLight1.position, "y").min(-20).max(20).step(0.1).name("PointLight y")
        gui.add(pointLight1.position, "z").min(-20).max(20).step(0.1).name("PointLight z")
    }
}