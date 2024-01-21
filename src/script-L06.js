// Importing the necessary THREE.js library for 3D graphics
import * as THREE from 'three'
// Importing the style.css file
import './style.css'
// Importing Orbit Controls from ThreeJS Examples
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

// Setting the initial size of the rendering area
const sizes = {
    width: 800,
    height: 600
}

// ===== CURSOR ==== //

// Creating a cursor object to store x and y coordinates
const cursor = {
    x: 0, // Initial x-coordinate
    y: 0  // Initial y-coordinate
}

// Adding a mousemove event listener to the window
window.addEventListener('mousemove', (event) => {
    // Updating the x-coordinate of the cursor based on mouse position and canvas width
    cursor.x = event.clientX / sizes.width - 0.5
    // Updating the y-coordinate of the cursor based on mouse position and canvas height
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// ===== PERSPECTIVE CAMERA ==== //

/** Creating a perspective camera with a 45-degree field of view, 
 *  aspect ratio based on canvas size, near and far clipping planes
 * 
 * @param {number} 45 - Field of view in degrees, determining how wide the camera sees
 * @param {number} (sizes.width / sizes.height) - Aspect ratio, calculated based on canvas size
 * @param {number} 1 - Near clipping plane, specifying the closest visible distance
 * @param {number} 1000 - Far clipping plane, specifying the farthest visible distance
 */
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)


// ===== ORTHOGRAPHIC CAMERA ==== //

// Calculate aspect ratio based on canvas size
// const aspectRatio = sizes.width / sizes.height

/**Creating an orthographic camera with specified parameters
 * 
 * @param {number} {(-1 * aspectRatio)} left - Left clipping plane, determining the leftmost extent of the camera's view
 * @param {number} {(1 * aspectRatio)} right - Right clipping plane, determining the rightmost extent of the camera's view
 * @param {number} 1 top - Top clipping plane, determining the topmost extent of the camera's view
 * @param {number} -1 bottom - Bottom clipping plane, determining the bottommost extent of the camera's view
 * @param {number} 0.1 near - Near clipping plane, specifying the closest visible distance
 * @param {number} 100 far - Far clipping plane, specifying the farthest visible distance
*/

/* const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
) */

// Setting the initial position of the orthographic camera
camera.position.set(0, 0, 3)
// Making the camera look at the mesh in the scene
camera.lookAt(mesh.position)
// Adding the camera to the scene
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
// Rendering the scene with the camera perspective
renderer.render(scene, camera)

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



    /* ===== DEPRECATED ======    
        // Uncomment the following line to enable rotation animation
        // mesh.rotation.y = elapsedTime
         // Update camera on X position with Math.sin
        camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
        // Update camera on Z position with Math.cos
        camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
        // Update camera on Y position
        camera.position.y = cursor.y * 3
        // Fixed camera on moving object
        camera.lookAt(mesh.position) 
    */

    // Rendering the scene with the camera perspective
    renderer.render(scene, camera)

    // Requesting the next animation frame to continue the animation loop
    window.requestAnimationFrame(tick)
}

// Initiating the animation loop by calling the tick function
tick()
