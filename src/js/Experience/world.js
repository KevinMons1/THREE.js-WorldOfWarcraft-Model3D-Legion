import * as THREE from "three"
import * as dat from "dat.gui"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initSize } from "./sizes"
import { initCamera, camera } from "./camera"
import { initRenderer, composer } from "./renderer"
import { initLight } from "./light"
import { initModel, model } from "./models"
import { initBackground, materialBackground } from "./background"
import { initPoints, materialPoint } from "./points"

export const canvas = document.querySelector(".weblg1")
export let active = window.location.hash === '#debug'
export let scene = null
export let gui = null
export let clock = null
export let colors = [{
        color1: "#293829",
        color2: "#375448",
        color3: "#073800",
    },
    {
        color1: "#382929",
        color2: "#543737",
        color3: "#380700",
    }
]

export const initWorld = () => {
    // Debug
    if (active) gui = new dat.GUI()

    // Scene
    scene = new THREE.Scene()
        
    //-------------------------------------------------------------------------
    // Init world
    //-------------------------------------------------------------------------
    
    initSize()
    initCamera()
    initRenderer()
    initLight()
    initBackground()
    initPoints()
    initModel()

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableZoom = false
    controls.enableDamping = false
    
    //-------------------------------------------------------------------------
    // Update
    //-------------------------------------------------------------------------

    clock =  new THREE.Clock()

    const update = () => {    
        const elapsedTime = clock.getElapsedTime()
        
        // Control
        controls.update()

        // Material
        if (materialBackground !== null && materialPoint !== null) {
            materialBackground.uniforms.uTime.value = elapsedTime
            materialPoint.uniforms.uTime.value = elapsedTime
        }

        // Model
        if (model !== null) {
            model.position.y += (Math.sin(elapsedTime - 1) * 0.0005)
            model.position.x += (Math.cos(elapsedTime - 1) * 0.0005)
            model.position.z += (Math.sin(elapsedTime - 1) * 0.0005)
            model.rotation.x += (Math.sin(elapsedTime - 1) * 0.0005)
        }

        // Render
        composer.render()
    
        // Call upadate
        window.requestAnimationFrame(update)
    }
    update()
}

