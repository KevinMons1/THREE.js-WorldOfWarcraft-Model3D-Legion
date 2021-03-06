import * as THREE from "three"
import gsap, { Power1 } from "gsap"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { changeLoad } from "../index"
import { colors, scene } from "./world"
import { camera } from "./camera"
import { materialBackground } from "./background"
import { pointLight1 } from "./light"
import { materialPoint } from "./points"

const counterLoading = document.querySelector(".counterLoading")
const loader = document.querySelector(".loader")
const loaderbtn = document.querySelector(".loader-btn")

const music = new Audio("music/ambiance.mp3")
music.volume = 0.025

export let model = null
export let loadingManager = new THREE.LoadingManager(
    () => {
        gsap.to(counterLoading, {
            opacity: 0,
            duration: 0.5,
            ease: Power1.easeOut
        })

        loaderbtn.style.display = "block"

        gsap.to(loaderbtn, {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
            ease: Power1.easeOut
        })
    
        loaderbtn.addEventListener("click", () => startExperience())
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal

        counterLoading.innerHTML = `Loading... ${(progressRatio * 100).toFixed(0)}%`
    }
)

const startExperience = () => {
    music.play()

    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: Power1.easeOut
    })

    gsap.to(loaderbtn, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: Power1.easeOut
    })

    setTimeout(() => {
        loader.style.display = "none"
        loaderbtn.style.display = "none"
    }, 1000);

    // --- Apparition animation ---
    
    // Rotation
    gsap.from(model.rotation, {
        y: - Math.PI * 0.5,
        duration: 1,
        ease: Power1.easeOut
    })

    // Position
    gsap.from(model.position, {
        y: - 1,
        x: - 0.5,
        duration: 1,
        ease: Power1.easeOut
    })

    changeLoad()
}

// Download model
export const initModel = () => {
    const gltfLoader = new GLTFLoader(loadingManager)

    gltfLoader.load("/models/demon/scene.gltf", (gltf) => {  
        gltf.scene.scale.set(0.5, 0.5, 0.5)
        model = gltf.scene   
        scene.add(gltf.scene)
    })
}

// Animtions on scroll
export const modelAnimationScroll = (index, direction) => {
    if (index === 0) {

        gsap.to(model.position, {
            x: 0,
            duration: 1,
            ease: Power1.easeOut
        })

        gsap.to(model.rotation, {
            y: 0,
            duration: 1,
            ease: Power1.easeOut
        })

    } else if (index === 1) {

        if (direction) {
            // Model
            gsap.to(model.position, {
                x: 1.5,
                duration: 1,
                ease: Power1.easeOut
            })

            gsap.to(model.rotation, {
                y: - Math.PI * 0.25,
                duration: 1,
                ease: Power1.easeOut
            })
            
        } else {
            // Model
            gsap.to(model.rotation, {
                y: - Math.PI * 0.25,
                duration: 1,
                ease: Power1.easeOut
            })

            gsap.to(model.position, {
                x: 1.5,
                duration: 1,
                ease: Power1.easeOut
            })
        }
        changeColor(true)

    } else if (index === 2) {

        // Camera
        gsap.to(camera.position, {
            y: 0,
            x: 0,
            duration: 1,
            ease: Power1.easeOut
        })

        // Model
        gsap.to(model.rotation, {
            y: Math.PI,
            duration: 1,
            ease: Power1.easeOut
        })

        gsap.to(model.position, {
            x: 0,
            duration: 1,
            ease: Power1.easeOut
        })

        changeColor(false)

    } else if (index === 3) {

        // Model
        gsap.to(model.rotation, {
            y: Math.PI * 0.5,
            duration: 1,
            ease: Power1.easeOut
        })

        gsap.to(model.position, {
            x: -1.5,
            duration: 1,
            ease: Power1.easeOut
        })

        changeColor(true)
    }

}

const changeColor = (green) => {
    if (green) {
        // Background
        materialBackground.uniforms.color1.value = new THREE.Color(colors[0].color1)
        materialBackground.uniforms.color2.value = new THREE.Color(colors[0].color2)
    
        // Light
        pointLight1.color = new THREE.Color(colors[0].color3)

        // Points
        materialPoint.uniforms.color.value = new THREE.Color(colors[0].color1)
    } else {
        // Background
        materialBackground.uniforms.color1.value = new THREE.Color(colors[1].color1)
        materialBackground.uniforms.color2.value = new THREE.Color(colors[1].color2)
    
        // Light
        pointLight1.color = new THREE.Color(colors[1].color3)

        // Points
        materialPoint.uniforms.color.value = new THREE.Color(colors[1].color1)
    }
}
