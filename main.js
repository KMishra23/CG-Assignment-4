import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

// function createPivot(color1, color2) {

// }

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 10000);
camera.position.z = 70;

var cubeGeo = new THREE.BoxGeometry(10,10,10)
var bigSphereGeo = new THREE.SphereGeometry(5, 30, 30)
var floorPlaneGeo = new THREE.PlaneGeometry(1000,1000)
var lightSphereGeo = new THREE.SphereGeometry(1, 30, 30)

var lightMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 0xffffff,
    emissive: 0xffffff,
    side: THREE.BackSide    
})
var phongMaterial2 = new THREE.MeshPhongMaterial({
    color: 0xdb3c24,
    specular: 0x5e5c64,
    shininess: 100,
    side: THREE.DoubleSide

})
var phongMaterialBigSpehere = new THREE.MeshPhongMaterial({
    color: 0xed96ea,
    specular: 0x5e5c64,
    shininess: 5, 
    side: THREE.DoubleSide
})
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x615761,
    side: THREE.DoubleSide
})


var cubeMesh = new THREE.Mesh(cubeGeo, phongMaterial2)
cubeMesh.receiveShadow = true;
cubeMesh.castShadow = true;
cubeMesh.position.set(0, 10, 0)

var bigSphereMesh = new THREE.Mesh(bigSphereGeo, phongMaterialBigSpehere)
bigSphereMesh.position.set(0,0,0)
bigSphereMesh.receiveShadow = true;
bigSphereMesh.castShadow = true;

var floorPlane = new THREE.Mesh(floorPlaneGeo, planeMaterial)
floorPlane.position.set(0, -60, 0)
floorPlane.rotation.set(Math.PI/2, 0, 0)
floorPlane.receiveShadow = true;
// floorPlane.castShadow = true;

var pointLightPos = [100, 50, 0];

var ambLight = new THREE.AmbientLight(0x404040)

var spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/4)
spotLight.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])


var lightMesh = new THREE.Mesh(lightSphereGeo, lightMaterial)
lightMesh.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])

var pl1 = new THREE.PointLight(0xffffff, 1, 0)
pl1.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])


var pointLightShadowHelper = new THREE.CameraHelper(pl1.shadow.camera)
pointLightShadowHelper.visible = true;


scene.add(lightMesh)

scene.add(ambLight)
// scene.add(spotLight)
scene.add(pl1)

// cubeMesh.add(bigSphereMesh)
// bigSphereMesh.parent = cubeMesh
// console.log(cubeMesh.children)

scene.add(cubeMesh)
scene.add(bigSphereMesh)
scene.add(floorPlane)

var catapultClass = createCatapult()

var bboxCatapult = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
// bboxCatapult.setFromObject(catapultClass)
catapultClass.geometry.computeBoundingBox()
bboxCatapult.copy(catapultClass.geometry.boundingBox)
// console.log(bboxCatapult)

var bboxCube = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
bboxCube.setFromObject(cubeMesh)
// console.log(bboxCube)

var bboxSphere = new THREE.Sphere(new THREE.Vector3(), 5)
bigSphereMesh.geometry.computeBoundingSphere()
bboxSphere.copy(bigSphereMesh.geometry.boundingSphere)


// scene.add(bboxCatapult)
// console.log(catapultClass.children)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.BasicShadowMap;

var currentCamera = camera
var currentScene = scene
var control = new OrbitControls(currentCamera, renderer.domElement)

bigSphereMesh.position.set(30, 1, 0)
// console.log(bigSphereMesh.position)

// console.log(cubeMesh.position)
var moveFlag = 1
function animate() {
    requestAnimationFrame( animate );

    if(cubeMesh.position.x == 100) {
        moveFlag=1
    }
    else if(cubeMesh.position.x == -50){
        moveFlag=-1
    }
    cubeMesh.position.x -= 0.5*moveFlag

    bboxCube.copy(cubeMesh.geometry.boundingBox).applyMatrix4(cubeMesh.matrixWorld)

    bboxCatapult.copy(catapultClass.geometry.boundingBox).applyMatrix4(catapultClass.matrixWorld)

    bboxSphere.copy(bigSphereMesh.geometry.boundingSphere).applyMatrix4(bigSphereMesh.matrixWorld)

    // cubeMesh.rotation.y += 0.01

    // catapultClass.rotation.z -= 0.01

    // if(bboxCube.intersectsSphere(bboxSphere)) {
    //     console.log("pee")
    // }
    // if(bboxCube.intersectsBox(bboxCatapult)) {
    //     console.log('poo')
    // }

	
    control.update();
	renderer.render( currentScene, currentCamera );
}
animate();

function createCatapult() {
    var handleGeo = new THREE.BoxGeometry(40, 1, 3)
    var cupGeo = new THREE.CylinderGeometry(1, 6, 5, 4, 1, true);
    var bottomCapGeo = new THREE.CircleGeometry(1, 32);

    var catapultMaterial = new THREE.MeshPhongMaterial({
        color: 0xc68a45,
        specular: 0xe5c9a9,
        shininess: 5,
        side: THREE.DoubleSide
    })

    var handleMesh = new THREE.Mesh(handleGeo, catapultMaterial)
    var cupMesh = new THREE.Mesh(cupGeo, catapultMaterial)
    var bottomCapMesh = new THREE.Mesh(bottomCapGeo, catapultMaterial)

    handleMesh.add(cupMesh)
    cupMesh.add(bottomCapMesh)

    scene.add(handleMesh)

    handleMesh.rotation.set(0, 0, Math.PI)

    cupMesh.position.set(19, -3, 0)

    bottomCapMesh.rotation.set(Math.PI/2, 0, 0)
    bottomCapMesh.position.set(0, 2.5, 0)

    return handleMesh
}
