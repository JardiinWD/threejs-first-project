// Importing the necessary THREE.js library for 3D graphics
import * as THREE from 'three'
// Importing the style.css file
import './style.css'
// Importing Orbit Controls from ThreeJS Examples
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// ===== TEXTURES ==== //

// Creating a loading manager to handle texture loading events
const loadinManager = new THREE.LoadingManager()

// Event handler for the start of the loading process
loadinManager.onStart = () => {
    console.log("onStart method");
}

// Event handler for when all assets are loaded
loadinManager.onLoad = () => {
    console.log("onLoad method");
}

// Event handler for loading progress updates
loadinManager.onProgress = () => {
    console.log("onProgress method");
}

// Event handler for loading errors
loadinManager.onError = () => {
    console.log("onError method");
}

// Creating a texture loader with the specified loading manager
const textureLoader = new THREE.TextureLoader(loadinManager)

// Loading a color texture from the specified path
const colorTexture = textureLoader.load('/textures/minecraft.png')

// Setting repeat values for the texture on both x and y axes
colorTexture.repeat.x = 1
colorTexture.repeat.y = 1

// Specifying the wrapping behavior for the texture on both axes
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

// Setting the color space of the texture to sRGB
colorTexture.colorSpace = THREE.SRGBColorSpace

// Disabling mipmaps generation for the texture
colorTexture.generateMipmaps = false

// Setting the magnification filter for the texture
colorTexture.magFilter = THREE.NearestFilter



// ===== CANVAS ==== //

// Selecting the HTML canvas element with the class 'webgl'
const canvas = document.querySelector('canvas.webgl')
// Creating a new THREE.js scene
const scene = new THREE.Scene()


// ===== GEOMETRY ==== //

// Creating a box geometry with dimensions 1x1x1
const geometry = new THREE.BoxGeometry(1, 1, 1)
// Creating a material with the texture for the mesh
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
// Creating a mesh by combining the geometry and material
const mesh = new THREE.Mesh(geometry, material)
// Adding the mesh to the scene
scene.add(mesh)


// ===== SIZES ====  //

// Object to store the initial size of the rendering area
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
// Setting the camera's position along the 3 Axis to create a suitable viewing distance
camera.position.set(1, 1, 2)
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
// Setting the pixel ratio of the rendering output
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// ===== ANIMATION ==== //

// Creating a clock to track elapsed time
const clock = new THREE.Clock()

// Function that runs every frame
const tick = () => {
    // Getting the elapsed time since the clock started
    const elapsedTime = clock.getElapsedTime()
    // Update controls for smooth camera movements
    controls.update()
    // Rendering the scene with the camera perspective
    renderer.render(scene, camera)
    // Requesting the next animation frame to continue the animation loop
    window.requestAnimationFrame(tick)
}

// Initiating the animation loop by calling the tick function
tick()