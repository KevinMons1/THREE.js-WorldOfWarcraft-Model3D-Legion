import * as THREE from "three"
import { scene, colors } from "./world"
import vertexShader from "../../shaders/background/vertex.glsl"
import fragmentShader from "../../shaders/background/fragment.glsl"

export let materialBackground = null


export const initBackground = () => {
    const geometry = new THREE.PlaneBufferGeometry(50, 50)

    materialBackground = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
            color1: { value: new THREE.Color(colors[0].color1) },
            color2: { value: new THREE.Color(colors[0].color2) }
        }
    })

    const mesh = new THREE.Mesh(geometry, materialBackground)
    mesh.position.set(0, 0, - 3)
    scene.add(mesh)
}
