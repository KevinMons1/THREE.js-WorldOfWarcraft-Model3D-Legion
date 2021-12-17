import gsap, { Power1 } from "gsap"
import { ScrollTrigger, ScrollToPlugin } from "gsap/all"
import { initWorld } from "./Experience/world"
import { modelAnimationScroll } from "./Experience/models"

// Setup
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
ScrollTrigger.defaults({ scroller: "main" })

// Globale variables
export let load = false
export const changeLoad = () => load = !load // "read-only" solution, see google if you don't know

// Local variables
let sections = document.querySelectorAll(".sectionOther")

// First calls
window.onload = () => {
    let tl = gsap.timeline()

    // Go to top page
    gsap.to(window, {
        scrollTo: {
            y: 0 * window.innerHeight,
            autoKill: false
        },
        duration: 1,
        overwrite: true,
    })

    // Create 3D world
    initWorld()

    // --- Animation gsap ---

    // First section
    tl.to("h1", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: Power1.easeOut
    })
    tl.to("h2", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: Power1.easeOut
    })
    tl.to(".scroll-line", {
        opacity: 1,
        duration: 1,
        delay: - 1,
        ease: Power1.easeOut
    })

    // Other sections
    sections.forEach((element, i) => {
        gsap.to(element, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: Power1.easeOut,
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "top center",
                onUpdate: self => {
                    if (self.direction === 1) {
                        modelAnimationScroll(i + 1, true)
                    } else if (self.direction === - 1) {
                        modelAnimationScroll(i, false)
                    }
                }
            }
        })
    })
}