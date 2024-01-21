// Importing the necessary THREE.js library for 3D graphics
import * as THREE from 'three'
// Importing the style.css file
import './style.css'
// Importing the gsap library 
import gsap from 'gsap'

// ===== CANVAS ==== //

// Selecting the HTML canvas element with the class 'webgl'
const canvas = document.querySelector('canvas.webgl')
// Creating a new THREE.js scene
const scene = new THREE.Scene()

// ===== GEOMETRY ==== //

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Setting the initial size of the rendering area
const sizes = {
    width: 800,
    height: 600
}

// ===== CAMERA ==== //

// Creating a perspective camera with a 75-degree field of view
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// Adjusting the camera position along the z-axis
camera.position.z = 3
// Adding the camera to the scene
scene.add(camera)


// ===== RENDERER ==== //

// Creating a WebGL renderer, specifying the target canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas // Attaching the renderer to the selected canvas
})

// Setting the size of the rendering output
renderer.setSize(sizes.width, sizes.height)
// Rendering the scene with the camera perspective
renderer.render(scene, camera)

// ===== ANIMATION ==== //

// Creating a clock to track elapsed time
const clock = new THREE.Clock()

// Function that runs every frame
const tick = () => {
    // Getting the elapsed time since the clock started
    const elapsedTime = clock.getElapsedTime()

    // Setting the camera's y-position using sine of elapsed time
    camera.position.y = Math.sin(elapsedTime)
    // Setting the camera's x-position using cosine of elapsed time
    camera.position.x = Math.cos(elapsedTime)

    // Making the camera look at the position of the mesh in the scene
    camera.lookAt(mesh.position)

    // Rendering the scene with the camera perspective
    renderer.render(scene, camera)

    // Requesting the next animation frame to continue the animation loop
    window.requestAnimationFrame(tick)
}

// Initiating the animation loop by calling the tick function
tick()
