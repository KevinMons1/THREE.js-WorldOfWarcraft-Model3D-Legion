import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { camera } from "./camera"
import { sizes } from "./sizes"
import { canvas, scene, gui, active } from "./world"

export let renderer = null
export let composer = null

export const initRenderer = () => { 
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.autoClear = false    
    renderer.toneMapping = THREE.ACESFilmicToneMapping 
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const renderTarget = new THREE.WebGLRenderTarget(
        sizes.width || 1,
        sizes.height || 1,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            encoding: THREE.sRGBEncoding,
            stencilBuffer: false
        }
    )
    
    composer = new EffectComposer(renderer, renderTarget)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.setSize(sizes.width, sizes.height)
    composer.addPass(new RenderPass(scene, camera))

    // Bloom around object
    // For activate the transparant https://github.com/mrdoob/three.js/issues/14104#issuecomment-429664412
    const unrealBloomPass = new UnrealBloomPass()
    unrealBloomPass.strength = 0.8
    unrealBloomPass.radius = 1.2
    composer.addPass(unrealBloomPass)

    if (active) {
        gui.add(unrealBloomPass, "strength").min(0).max(5).step(0.1).name("unrealBloomPass strength")
        gui.add(unrealBloomPass, "radius").min(0).max(5).step(0.1).name("unrealBloomPass radius")
    }

    // Noise effect
    const filmPass = new FilmPass(0.5, 0.025, 648, false)
    composer.addPass(filmPass)
}