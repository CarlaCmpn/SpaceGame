import './css/style.styl'
import * as THREE from 'three';
import Planet from './js/Planet';
import Spaceship from './js/Spaceship';

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

let scene, camera, ambientLight, sunLight, planets, spaceship, gems, listener, sound, audioLoader

init()
renderer()
resize()
animate()


function init()
{
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x130f40);

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.x = 0
    camera.position.z = 3
    scene.add(camera)

    ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight)

    sunLight = new THREE.DirectionalLight(0xffffff, 0.6)
    sunLight.position.x = 1
    sunLight.position.y = 1
    sunLight.position.z = 1
    sunLight.castShadow = true
    sunLight.shadow.camera.top = 1.20
    sunLight.shadow.camera.right = 1.20
    sunLight.shadow.camera.bottom = - 1.20
    sunLight.shadow.camera.left = - 1.20
    scene.add(sunLight)

    planets = new Planet({
    })
    scene.add(planets.container)

    gems = new Planet({
    })
    scene.add(gems.container)
    
    spaceship = new Spaceship({
        renderer : renderer,
        camera : camera,
        scene : scene,
        posiPlanets : planets.planets.tableau,
        posiGems : gems.gems.tableau
    })
    scene.add(spaceship.container)      
}

function renderer()
{
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)
}
   
function resize()
{
    window.addEventListener('resize', () =>
    {
        // Save width and height
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
    })
}

function animate()
{
    window.requestAnimationFrame(animate)

    // Renderer
    renderer.render(scene, camera)
}






















