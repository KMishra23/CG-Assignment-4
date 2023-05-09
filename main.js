import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OBB } from 'three/addons/math/OBB.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { AxesHelper, Vector2 } from 'three';

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
const trackingCamera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);
// trackingCamera.position.set(0,100,0)
// trackingCamera.lookAt(0, -100, 0)
// trackingCamera.add(new THREE.AxesHelper(5))
scene.add(new THREE.CameraHelper(trackingCamera))
camera.position.z = 270;
camera.position.y = 50;
// camera.lookAt(new THREE.Vector3(0, 0, -10))

var cubeGeo = new THREE.BoxGeometry(10,10,10)
var bigSphereGeo = new THREE.SphereGeometry(2, 30, 30)
var floorPlaneGeo = new THREE.PlaneGeometry(1000,1000)
var lightSphereGeo = new THREE.SphereGeometry(1, 30, 30)
var cylGeo = new THREE.CylinderGeometry(8, 8, 50, 4, 1, true, Math.PI/4)

var lightMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 1,
    emissive: 0xffffff,
    side: THREE.BackSide    
})
var phongMaterial2 = new THREE.MeshPhongMaterial({
    color: 0xdb3c24,
    specular: 0x5e5c64,
    shininess: 1,
    side: THREE.DoubleSide

})
var phongMaterialBigSpehere = new THREE.MeshPhongMaterial({
    color: 0xed96ea,
    specular: 0x5e5c64,
    shininess: 5, 
    side: THREE.DoubleSide
})
var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x615761,
    shininess: 1
    // side: THREE.DoubleSide
})
var tubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x3bd12e,
    side: THREE.DoubleSide
})

var tubeMesh = new THREE.Mesh(cylGeo, tubeMaterial)
tubeMesh.position.set(-43, -15, 0)
scene.add(tubeMesh)


var tubeP2 = new THREE.Box3(new THREE.Vector3(-48.5,-40,-5), new THREE.Vector3(-48.5,10,5))
var p2Helper = new THREE.Box3Helper(tubeP2)
scene.add(p2Helper)

var cubeMesh = new THREE.Mesh(cubeGeo, phongMaterial2)
cubeMesh.position.set(0, 10, 0)
// cubeMesh.receiveShadow = true;
// cubeMesh.castShadow = true;

var bigSphereMesh = new THREE.Mesh(bigSphereGeo, phongMaterialBigSpehere)
bigSphereMesh.position.set(39, 2.5, 0)
// bigSphereMesh.receiveShadow = true;
// bigSphereMesh.castShadow = true;

var floorPlane = new THREE.Mesh(floorPlaneGeo, planeMaterial)
floorPlane.position.set(0, -70, 0)
floorPlane.rotation.set(3*Math.PI/2, 0, 0)
// floorPlane.receiveShadow = true;
// floorPlane.castShadow = true;


var pointLightPos = [100, 100, 0];

var ambLight = new THREE.AmbientLight(0x808080)

// var spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/4)
// spotLight.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])

var lightMesh = new THREE.Mesh(lightSphereGeo, lightMaterial)
lightMesh.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])

var pl1 = new THREE.PointLight(0xffffff, 1, 0)
pl1.position.set(pointLightPos[0], pointLightPos[1], pointLightPos[2])

var dl1 = new THREE.SpotLight(0xfcff00, 1, 0, Math.PI/3)
dl1.position.set(0, 100, 0)

var spl1 = new THREE.SpotLight(0x00d3ff, 1, 0, Math.PI/8)
spl1.position.set(0, 100, 0)
spl1.target = bigSphereMesh
spl1.position.x = bigSphereMesh.position.x

scene.add(spl1)
scene.add(dl1)
scene.add(lightMesh)
scene.add(ambLight)
// scene.add(spotLight)
scene.add(pl1)

// cubeMesh.add(bigSphereMesh)
// bigSphereMesh.parent = cubeMesh
// console.log(cubeMesh.children)

// scene.add(cubeMesh)
scene.add(bigSphereMesh)
scene.add(floorPlane)

var catapultClass = createCatapult()
catapultClass.rotation.y = Math.PI;
// scene.add(catapultClass)

var catapultRotationPoint = new THREE.Group()
catapultRotationPoint.add(catapultClass);
catapultClass.position.set(20, 0, 0);
catapultRotationPoint.rotation.z = Math.PI/180 * 0

// var tube = addTube(20, 20, 5, 0x3bd12e)
// tube.position.set(-20, 0, 0)
// scene.add(tube)

// catapultRotationPoint.add(bigSphereMesh)
catapultRotationPoint.attach(bigSphereMesh)
scene.add(catapultRotationPoint)

    var wall1 = addWall(240, 0x5461ab) //lightBlue
    wall1.position.set(40, -60, 0)
    wall1.rotation.z = Math.PI/2
    // wall1.rotation.z = Math.PI/180*10
    
    wall1.geometry.computeBoundingBox()
   
    var wall2 = addWall(150, 0x6600ff) //blue
    wall2.position.set(160, 10, 0)
    // wall2.rotation.z = Math.PI/180*(-10)
   
    wall2.geometry.computeBoundingBox()

    scene.add(wall1)
    scene.add(wall2)

    var bboxWall1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    bboxWall1.setFromObject(wall1)
    var bboxWall2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    bboxWall2.setFromObject(wall2)

    var wall1Helper = new THREE.Box3Helper(bboxWall1)
    var wall2Helper = new THREE.Box3Helper(bboxWall2)
    // scene.add(wall1Helper)
    // scene.add(wall2Helper)

var buttonGeo = new THREE.CylinderGeometry(2,2,1)
var buttonMaterial = new THREE.MeshPhongMaterial({
    color: 0xf4160b,
    side: THREE.DoubleSide
})
var button1 = new THREE.Mesh(buttonGeo, buttonMaterial)
// button1.rotation.z = Math.PI/2 
button1.position.set(-44,-58.5,0)
wall1.attach(button1)

var bboxButton1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
button1.geometry.computeBoundingBox()
bboxButton1.setFromObject(button1)
var button1Helper = new THREE.Box3Helper(bboxButton1)
// scene.add(button1Helper)

var button2 = new THREE.Mesh(buttonGeo, buttonMaterial)
button2.rotation.z = Math.PI/2 
button2.position.set(158.5,-56.5,0)
wall2.attach(button2)

var bboxButton2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
button2.geometry.computeBoundingBox()
bboxButton2.setFromObject(button2)
var button2Helper = new THREE.Box3Helper(bboxButton2)
// scene.add(button2Helper)

// var restoreButton1 = button1.position

var pistonHeadGeo = new THREE.BoxGeometry(1,4,4)
var pistonNeck = new THREE.BoxGeometry(6,1,1)
var pistonMaterial = new THREE.MeshPhongMaterial({
    color: 0x785100,
    side: THREE.DoubleSide
})
var phead1 = new THREE.Mesh(pistonHeadGeo, pistonMaterial)
var pneck1 = new THREE.Mesh(pistonNeck, pistonMaterial)
phead1.add(pneck1)
pneck1.position.set(-3,0,0)
phead1.position.set(-48,-57,0)
scene.add(phead1)

var bboxPiston1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
phead1.geometry.computeBoundingBox()
bboxPiston1.setFromObject(phead1)
var piston1Helper = new THREE.Box3Helper(bboxPiston1)
// scene.add(piston1Helper)


var phead2 = new THREE.Mesh(pistonHeadGeo, pistonMaterial)
var pneck2 = new THREE.Mesh(pistonNeck, pistonMaterial)
phead2.add(pneck2)
pneck2.position.set(-3,0,0)
phead2.position.set(162,-62,0)
phead2.rotation.z = Math.PI/180 * 120
scene.add(phead2)

var bboxPiston2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
phead2.geometry.computeBoundingBox()
bboxPiston2.copy(phead2.geometry.boundingBox).applyMatrix4(phead2.matrixWorld)
var piston2Helper = new THREE.Box3Helper(bboxPiston2)
// scene.add(piston2Helper)


var bboxCatapult = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
// bboxCatapult.setFromObject(catapultClass)
catapultClass.geometry.computeBoundingBox()
bboxCatapult.copy(catapultClass.geometry.boundingBox).applyMatrix4(catapultClass.matrixWorld)
// console.log(bboxCatapult)

// cubeMesh.rotation.z = Math.PI/4 
var bboxCube = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
bboxCube.setFromObject(cubeMesh)
// var obboxCube = new OBB().fromBox3(bboxCube)

// console.log(bboxCube)

var bboxSphere = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
bigSphereMesh.geometry.computeBoundingBox()
bboxSphere.copy(bigSphereMesh.geometry.boundingBox)
var sphereHelper = new THREE.Box3Helper(bboxSphere)
// scene.add(sphereHelper)

// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.BasicShadowMap;

var currentCamera = camera
var currentScene = scene
var control = new TrackballControls(camera, renderer.domElement)

var moveFlag = 1
var launchState = "WaitForCommand"
var catapultForwardAcc = 2
var catapultBackwardAcc = -0.5
var catapultCurrAcc = 0

var ballState = "OnCatapult"
var ballX = 0
var ballY = 0
const ballXL1 = -0.35
const ballYL1 = 0.1
const ballXL2 = -0.3
const ballYL2 = 0.74
var ballXAfterLaunch = -0.35
var ballYAfterLaunch = 0.1
var ballXAfterLaunch2 = -0.3
var ballYAfterLaunch2 = 0.74
var gravity = -0.003

var piston1State = "Inactive"
var piston2State = "Inactive"

const box = new THREE.Box3Helper(bboxCatapult, 0xffff00)
// scene.add(box)

// const box2 = new THREE.Box3Helper(bboxCube, 0xffff00)
// scene.add(box2)

var pause = false
var point = true
var directional = true
var spot = true
var ambient = true
var cam = true

document.addEventListener('keydown', event => {
    if(event.key == "l" && launchState == "WaitForCommand") {
        launchState = "Release"
    }
    if(event.key == "p") {
        pause = !pause
    }
    if(event.key == "o") {
        console.log(piston1State)
    }
    if(event.key == "1") {
        point = !point
        if(point) scene.add(pl1)
        else scene.remove(pl1)
    }
    if(event.key == "2") {
        directional = !directional
        if(directional) scene.add(dl1)
        else scene.remove(dl1)
    }
    if(event.key == "3") {
        spot = !spot
        if(spot) scene.add(spl1)
        else scene.remove(spl1)
    }
    if(event.key == "4") {
        ambient = !ambient
        if(ambient) scene.add(ambLight)
        else scene.remove(ambLight)
    }
    if(event.key == "c") {
        cam = !cam
        if(cam) {
            currentCamera = camera
        }
        else {
            currentCamera = trackingCamera
        }
    }
})

// bigSphereMesh.add(trackingCamera)
trackingCamera.position.set(0, 100, 0)

// console.log(cubeMesh.matrixWorld)

function animate() {
    requestAnimationFrame( animate );

    // if(cubeMesh.position.x == 100) {
    //     moveFlag=1
    // }
    // else if(cubeMesh.position.x == -50){
    //     moveFlag=-1
    // }
    // cubeMesh.position.x -= 0.5*moveFlag
    // cubeMesh.rotation.z += Math.PI/180
    // console.log(cubeMesh.matrixWorld)

    // bigSphereMesh.position.x += 0.5*moveFlag

    // catapultRotationPoint.rotation.z += Math.PI/180 * 1

    // Update bounding box locations
    // cubeMesh.geometry.computeBoundingBox()
    // bboxCube.copy(cubeMesh.geometry.boundingBox).applyMatrix4(cubeMesh.matrixWorld)
    // catapultClass.geometry.computeBoundingBox()

    bboxCatapult.copy(catapultClass.geometry.boundingBox).applyMatrix4(catapultClass.matrixWorld)
    bboxSphere.copy(bigSphereMesh.geometry.boundingBox).applyMatrix4(bigSphereMesh.matrixWorld)
    bboxButton1.copy(button1.geometry.boundingBox).applyMatrix4(button1.matrixWorld)
    bboxPiston1.copy(phead1.geometry.boundingBox).applyMatrix4(phead1.matrixWorld)
    bboxButton2.copy(button2.geometry.boundingBox).applyMatrix4(button2.matrixWorld)
    bboxPiston2.copy(phead2.geometry.boundingBox).applyMatrix4(phead2.matrixWorld)

    collisionChecker()

    // bboxPiston2.setFromObject(phead2)

    // if(spot) {
        // spl1.position.x = bigSphereMesh.position.x
        // var t = new THREE.Vector3().setFromMatrixPosition(bigSphereMesh.matrixWorld)
        // spl1.position.x = t.x
        // console.log(t)
    // }

    if(!pause) {
        launchCatapultAnimationLoop()
        moveBall()
        movePiston1()
        movePiston2()
    }
	if(cam) control.update();
    var t = new THREE.Vector3().setFromMatrixPosition(bigSphereMesh.matrixWorld)
    trackingCamera.position.set(t.x, 100, 0)
    trackingCamera.lookAt(t)

	renderer.render( currentScene, currentCamera );
}
animate();

function createCatapult() {
    var handleGeo = new THREE.BoxGeometry(40, 1, 4)
    var cupGeo = new THREE.CylinderGeometry(2, 6, 5, 32, 1, true);
    var bottomCapGeo = new THREE.CircleGeometry(2, 32);

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

    handleMesh.rotation.set(0, 0, Math.PI)

    cupMesh.position.set(19, -3, 0)

    bottomCapMesh.rotation.set(Math.PI/2, 0, 0)
    bottomCapMesh.position.set(0, 2.5, 0)

    return handleMesh
}

function addWall(height, color) {
    var wallGeo = new THREE.BoxGeometry(2, height, 6)
    var wallMaterial = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 1,
        side: THREE.DoubleSide
    })

    var wall = new THREE.Mesh(wallGeo, wallMaterial)

    return wall;
}

function addTube(l1, l2, radius, color) {
    var tubeCyl1Geo = new THREE.CylinderGeometry(radius, radius+0.1, l1, 4, 1, true, Math.PI/4)
    var tubeCyl2Geo = new THREE.CylinderGeometry(radius, radius-0.1, l2, 4, 1, true, Math.PI/4)
    var tubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide
    })

    var tube = new THREE.Group()

    var tubeSec1 = new THREE.Mesh(tubeCyl1Geo, tubeMaterial)
    var tubeSec2 = new THREE.Mesh(tubeCyl2Geo, tubeMaterial)
    tube.add(tubeSec1)
    tube.add(tubeSec2)

    tubeSec2.rotation.z = Math.PI/2
    tubeSec2.position.x += 1.5*radius 
    tubeSec2.position.y -= l1/2 - radius

    return tube;
}

function launchCatapultAnimationLoop() {
    var currAngle = Math.round(catapultRotationPoint.rotation.z * 180/Math.PI)
    // console.log(currAngle)
    if((currAngle == 60 || currAngle == 61) && launchState == "Release") { // reached max point for launch, launch ball
        console.log("launched")
        catapultCurrAcc = 0

        ballState = "Launched"
        // catapultRotationPoint.remove(bigSphereMesh)
        // bigSphereMesh.matrixWorld.decompose(bigSphereMesh.position, bigSphereMesh.quaternion, bigSphereMesh.scale)
        scene.attach(bigSphereMesh)

        launchState = "WaitAfterRelease"
    }
    else if(currAngle == 0 && launchState == "ReelBack") { //reached max point preparing for launch
        // console.log("waiting for relaunch")
        catapultCurrAcc = 0
        launchState = "WaitForCommand"
    }

    if(launchState == "Release") { //lauching the catapult
        catapultCurrAcc = catapultForwardAcc;
    }
    else if(launchState == "WaitAfterRelease") { //wait a bit before moving again
        catapultCurrAcc = 0
        launchState = "WaitAfterRelease2"
        // console.log("Waiting")
        setTimeout(reloadCatapult, 1000)
    }
    else if(launchState == "ReelBack") { //Reel back the catapult
        catapultCurrAcc = catapultBackwardAcc   
    }
    else if(launchState == "WaitForCommand") { //waiting to launch catapult
        catapultCurrAcc = 0
    }

    catapultRotationPoint.rotation.z += catapultCurrAcc*Math.PI/180
    // console.log(catapultRotationPoint.matrixWorld)
    var t = new THREE.Vector3()
    // console.log(t.setFromMatrixPosition(catapultClass.children[0].matrixWorld))
    // console.log(t.setFromMatrixPosition(catapultRotationPoint.matrixWorld))
}

function movePiston1() {
    if(piston1State == "ButtonPressed") { //reel piston back
        piston1State = "ReelBack"
        setTimeout(launchPiston1, 1000)
    }
    else if(piston1State == "ReelBack") {
        phead1.position.x -= 0.1
    }
    else if(piston1State == "Launch") {
        phead1.position.x += 1
    }
}

function launchPiston1() {
    console.log("eh")
    piston1State = "Launch"
}

function movePiston2() {
    if(piston2State == "ButtonPressed") {
        piston2State = "ReelBack"
        setTimeout(launchPiston2, 1000)
    }
    else if(piston2State == "ReelBack") {
        phead2.position.y -= 0.05
        phead2.position.x += 0.05
    }
    else if(piston2State == "Launch") {
        phead2.position.y += 0.5
        phead2.position.x -= 0.5
    }
}

function launchPiston2() {
    piston2State = "Launch" 
}

function moveBall() {

    if(ballState == "OnCatapult") {
        //no motion, attached to catapult
    }
    else if(ballState == "Launched") {
        //apply parabolic motion
        bigSphereMesh.position.x += ballXAfterLaunch
        bigSphereMesh.position.y += ballYAfterLaunch
        // bigSphereMesh.position.x = -40
        // bigSphereMesh.position.y -= 0.2
        ballYAfterLaunch += gravity
    }
    else if(ballState == "InsideTube1") {
        bigSphereMesh.position.y += ballYAfterLaunch
        
    }
    else if(ballState == "HitButton1") {
        bigSphereMesh.position.y += ballYAfterLaunch
        button1.position.x += ballYAfterLaunch
    }
    else if(ballState == "OnLowerPlatform") {
        
    }
    else if(ballState == "RollingOnPlatform") {
        bigSphereMesh.position.x -= ballXAfterLaunch*3
    }
    else if(ballState == "HitButton2") {
        bigSphereMesh.position.x -= ballXAfterLaunch
        button2.position.x -= ballXAfterLaunch
    }
    else if(ballState == "OnVerticalPlatform") {

    }
    else if(ballState == "GoingUp") {
        bigSphereMesh.position.x += ballXAfterLaunch2
        bigSphereMesh.position.y += ballYAfterLaunch2
        ballYAfterLaunch2 += gravity 
    }
}

function collisionChecker() {
    if(tubeP2.intersectsBox(bboxSphere) && ballState != "InsideTube1") { //ball goes into tube on left
        console.log("Hit wall of tube1")
        ballState = "InsideTube1"
        bigSphereMesh.position.x = -44
    }
    else if(bboxButton1.intersectsBox(bboxSphere) && ballState == "InsideTube1" ) { //ball falls out of tube and presses button
        console.log("Hit Button 1")
        piston1State = "ButtonPressed"
        ballState = "HitButton1"
    }
    else if(bboxWall1.intersectsBox(bboxSphere) && ballState == "HitButton1") { //ball is on button, waiting to be hit
        console.log("Hit horizontal platform")
        ballState = "OnLowerPlatform"
    }
    else if(bboxPiston1.intersectsBox(bboxSphere) && piston1State == "Launch" && ballState == "OnLowerPlatform") { //ball gets hit by piston, reset piston position
        console.log("Hit Ball with piston")
        // button1.position.set(restoreButton1)
        setTimeout(resetButton1, 2000)
        piston1State = "Inactive"
        phead1.position.x -= 5
        ballState = "RollingOnPlatform"
    }
    else if(bboxButton2.intersectsBox(bboxSphere) && ballState == "RollingOnPlatform"){ //ball moves and hits 2nd button
        console.log("Hit Button 2")
        piston2State = "ButtonPressed"
        ballState = "HitButton2"
    }
    else if(bboxWall2.intersectsBox(bboxSphere) && ballState == "HitButton2") { //ball is on button, waiting to be hit
        console.log("Hit vertical platform")
        ballState = "OnVerticalPlatform"
    }
    else if(bboxPiston2.containsPoint(new THREE.Vector3(158, -57, 0)) && ballState == "OnVerticalPlatform") { //ball gets hit by piston, launch upwards
        console.log("Hit ball upwards")
        setTimeout(resetButton2, 2000)
        ballState = "GoingUp"
        piston2State = "Inactive"
        phead2.position.y -= 5
        phead2.position.x += 5
    }
    else if(bboxCatapult.intersectsBox(bboxSphere) && ballState == "GoingUp") { //Latch ball to the catapult
        console.log("Starting loop again")

        ballXAfterLaunch = ballXL1
        ballXAfterLaunch2 = ballXL2
        ballYAfterLaunch = ballYL1
        ballYAfterLaunch2 = ballYL2

        ballState = "onCatapult"
        catapultRotationPoint.attach(bigSphereMesh)
    }
}

function resetButton1() {
    // scene.attach(button1)
    // console.log(restoreButton1.x)
    button1.position.x += 1.5
    // button1.scale.set(100,100,100)
    // wall1.attach(button1)
}

function resetButton2() {
    // console.log
    button2.position.x -= 0.5
}

function reloadCatapult() {
    // console.log("Exe")
    launchState = "ReelBack"
}