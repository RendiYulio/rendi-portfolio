import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './style.css'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// Kamera agak mundur sedikit
camera.position.z = 8.5

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// LIGHTING
const ambient = new THREE.AmbientLight(0xffffff, 1.8)
scene.add(ambient)

const keyLight = new THREE.SpotLight(0xffffff, 300)
keyLight.position.set(-8, 10, 8)
scene.add(keyLight)

const rimLight = new THREE.PointLight(0xffffff, 50)
rimLight.position.set(5, 0, -5)
scene.add(rimLight)

let statue

const loader = new GLTFLoader()

loader.load(
  '/assets/statue.glb',

  (gltf) => {
    console.log('GLB LOADED')

    statue = gltf.scene

    // PERKECIL PATUNG
    statue.scale.set(5, 5, 5)

    // GESER LEBIH KE KIRI
    statue.position.set(-5.8, -1.1, 0)

    // ROTASI AWAL
    statue.rotation.y = 0.7

    scene.add(statue)
  },

  undefined,

  (error) => {
    console.error('GLB ERROR:', error)
  }
)

// RENDER LOOP
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

// ROTATE SAAT SCROLL (lebih pelan)
window.addEventListener('scroll', () => {
  const scroll = window.scrollY

  if (statue) {
    statue.rotation.y = 0.7 + scroll * 0.0007
  }
})

// RESIZE
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})