import * as THREE from "three"
import { scene, colors } from "./world"
import vertexShader from "../../shaders/points/vertex.glsl"
import fragmentShader from "../../shaders/points/fragment.glsl"

export let materialPoint = null

export const initPoints = () => {
    const particuleGeometry = new THREE.BufferGeometry()
    const particulesCount = 30
    const particulesPositions = new Float32Array(particulesCount * 3)
    const particulesScales = new Float32Array(particulesCount)
    
    for (let i = 0; i < particulesCount; i++) {
        const i3 = i * 3
    
        particulesPositions[i3] = ((Math.random() - 0.5) * 7)
        particulesPositions[i3 + 1] = (Math.random() * 1.5) - 2
        particulesPositions[i3 + 2] = ((Math.random() - 0.5) * 10) - 2
    
        particulesScales[i] = Math.random()
    }
    
    particuleGeometry.setAttribute("position", new THREE.BufferAttribute(particulesPositions, 3))
    particuleGeometry.setAttribute("aScale", new THREE.BufferAttribute(particulesScales, 1))
    
    materialPoint = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
            uSize: { value: 10.0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            color: { value: new THREE.Color(colors[0].color1) }
        }
    })
    
    const particules = new THREE.Points(particuleGeometry, materialPoint)
    scene.add(particules)
}
