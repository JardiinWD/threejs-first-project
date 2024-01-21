// Importing the necessary THREE.js library for 3D graphics
import * as THREE from 'three'

// ===== CANVAS ==== //

// Selecting the HTML canvas element with the class 'webgl'
const canvas = document.querySelector('canvas.webgl')
// Creating a new THREE.js scene
const scene = new THREE.Scene()

// ===== GEOMETRY ==== //

// Creating a group to hold multiple objects
const group = new THREE.Group()
// Adjusting the y-position of the group
group.position.y = 1
// Adding the group to the scene
scene.add(group)

// Creating the first cube with red material
const cube1 = new THREE.Mesh(
    // Using a BoxGeometry with dimensions 1x1x1
    new THREE.BoxGeometry(1, 1, 1),
    // Applying a red MeshBasicMaterial
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
)
// Adding the first cube to the group
group.add(cube1)

// Creating the second cube with green material
const cube2 = new THREE.Mesh(
    // Using a BoxGeometry with dimensions 1x1x1
    new THREE.BoxGeometry(1, 1, 1),
    // Applying a green MeshBasicMaterial
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    })
)
// Adjusting the x-position of the second cube
cube2.position.x = -2
// Adding the second cube to the group
group.add(cube2)

// Creating the third cube with blue material
const cube3 = new THREE.Mesh(
    // Using a BoxGeometry with dimensions 1x1x1
    new THREE.BoxGeometry(1, 1, 1),
    // Applying a blue MeshBasicMaterial
    new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
)
// Adjusting the x-position of the third cube
cube3.position.x = 2
// Adding the third cube to the group
group.add(cube3)

// ===== AXES ==== //

// Creating axes helper for reference
const axesHelper = new THREE.AxesHelper()
// Adding the axesHelper to the scene
scene.add(axesHelper)

// ===== CAMERA ==== //

// Setting the initial size of the rendering area
const sizes = {
    width: 800,
    height: 600
}
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
