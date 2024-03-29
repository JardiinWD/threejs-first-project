// Importing the necessary THREE.js library for 3D graphics
import * as THREE from 'three'
// Importing Orbit Controls from ThreeJS Examples
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Importing the style.css file
import './style.css'

// ===== CANVAS ==== //

// Selecting the HTML canvas element with the class 'webgl'
const canvas = document.querySelector('canvas.webgl')
// Creating a new THREE.js scene
const scene = new THREE.Scene()

// ===== GEOMETRY ==== //

// Creating a box geometry with dimensions 1x1x1, subdivided into 5x5x5 segments
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
// Creating a basic red material for the mesh
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// Creating a mesh by combining the geometry and material
const mesh = new THREE.Mesh(geometry, material)
// Adding the mesh to the scene
scene.add(mesh)

/* ===== SIZES ====  */

// Setting the initial size of the rendering area
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Handle resize event to update viewport dimensions
window.addEventListener('resize', () => {
    // Updating the width to match the current window width
    sizes.width = window.innerWidth
    // Updating the height to match the current window height
    sizes.height = window.innerHeight
    // Updating the camera's aspect ratio based on the new dimensions
    camera.aspect = sizes.width / sizes.height
    // Updating the camera's projection matrix with the new aspect ratio
    camera.updateProjectionMatrix()
    // Setting the size of the rendering output to match the new dimensions
    renderer.setSize(sizes.width, sizes.height)
    // Setting the pixel ratio of the rendering output for better display on high-density screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Handle double-click event for fullscreen toggle
window.addEventListener('dblclick', () => {
    // Checking if the document is not currently in fullscreen mode
    if (!document.fullscreenElement) {
        // Requesting fullscreen mode for the canvas
        canvas.requestFullscreen()
    } else {
        // Exiting fullscreen mode if already in fullscreen
        document.exitFullscreen()
    }
})

// ===== BASE CAMERA ==== //

/** Creating a perspective camera with a 45-degree field of view, 
 *  aspect ratio based on canvas size, near and far clipping planes
 * 
 * @param {number} 75 - Field of view in degrees, determining how wide the camera sees
 * @param {number} (sizes.width / sizes.height) - Aspect ratio, calculated based on canvas size
 * @param {number} 0.1 - Near clipping plane, specifying the closest visible distance
 * @param {number} 100 - Far clipping plane, specifying the farthest visible distance
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// Setting the camera's position along the z-axis to create a suitable viewing distance
camera.position.z = 3
// Adding the camera to the scene so that it can render the scene's content
scene.add(camera)

// ===== ORBIT CONTROLS ==== //

/** Creating OrbitControls to allow user interaction with the camera 
 * @param {THREE.PerspectiveCamera} camera - The camera to be controlled
 * @param {HTMLCanvasElement} canvas - The canvas element for user input
*/
const controls = new OrbitControls(camera, canvas)
// Enabling damping for smooth camera movements
controls.enableDamping = true

// ===== RENDERER ==== //

// Creating a WebGL renderer, specifying the target canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // Attaching the renderer to the selected canvas
})
// Setting the size of the rendering output
renderer.setSize(sizes.width, sizes.height)
// Setting the pixel ration of the rendering output
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ===== ANIMATION ==== //

// Creating a clock to track elapsed time
const clock = new THREE.Clock()

// Function that runs every frame

const tick = () => {
    // Getting the elapsed time since the clock started
    const elapsedTime = clock.getElapsedTime()
    // Update controls in order to have controls with damping enabled
    // it needs to be updated on every render
    controls.update()

    // Rendering the scene with the camera perspective
    renderer.render(scene, camera)

    // Requesting the next animation frame to continue the animation loop
    window.requestAnimationFrame(tick)
}

tick()