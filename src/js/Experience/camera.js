import * as THREE from "three"
import { sizes } from "./sizes"
import { scene } from "./world"

export let camera = null

export const initCamera = () => {
    camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 3)
    scene.add(camera)
}
