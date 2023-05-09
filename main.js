import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OBB } from 'three/addons/math/OBB.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { AxesHelper, Vector2 } from 'three';
import { createWall, createCatapult, createButton, createPiston } from './modelCreateFunctions';
import { createBoundingBox3 } from './bboxCreateFunctions';

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

var bboxTube = new THREE.Box3(new THREE.Vector3(-48.5,-40,-5), new THREE.Vector3(-48.5,10,5))


// var cubeMesh = new THREE.Mesh(cubeGeo, phongMaterial2)
// cubeMesh.position.set(0, 10, 0)

var bigSphereMesh = new THREE.Mesh(bigSphereGeo, phongMaterialBigSpehere)
bigSphereMesh.position.set(39, 2.5, 0)

var floorPlane = new THREE.Mesh(floorPlaneGeo, planeMaterial)
floorPlane.position.set(0, -70, 0)
floorPlane.rotation.set(3*Math.PI/2, 0, 0)


var pointLightPos = [100, 100, 0];

var ambLight = new THREE.AmbientLight(0x808080)

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

scene.add(pl1)
scene.add(spl1)
scene.add(dl1)
scene.add(lightMesh)
scene.add(ambLight)

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

// catapultRotationPoint.add(bigSphereMesh)
catapultRotationPoint.attach(bigSphereMesh)
scene.add(catapultRotationPoint)

var wall1 = createWall(240, 0x5461ab) //lightBlue
wall1.position.set(40, -60, 0)
wall1.rotation.z = Math.PI/2
// wall1.rotation.z = Math.PI/180*10
   
var wall2 = createWall(150, 0x6600ff) //blue
wall2.position.set(160, 10, 0)
// wall2.rotation.z = Math.PI/180*(-10)

scene.add(wall1)
scene.add(wall2)

var bboxWall1 = createBoundingBox3(wall1)
var bboxWall2 = createBoundingBox3(wall2)


var button1 = createButton(0xf4160b)
// button1.rotation.z = Math.PI/2 
button1.position.set(-44,-58.5,0)
wall1.attach(button1)

var button2 = createButton(0xf4160b)
button2.rotation.z = Math.PI/2 
button2.position.set(158.5,-56.5,0)
wall2.attach(button2)

var bboxButton1 = createBoundingBox3(button1) 
var bboxButton2 = createBoundingBox3(button2)

var phead1 = createPiston(0x785100)
phead1.position.set(-48,-57,0)

var phead2 = createPiston(0x785100)
phead2.position.set(162,-62,0)
phead2.rotation.z = Math.PI/180 * 120

scene.add(phead1)
scene.add(phead2)

var bboxPiston1 = createBoundingBox3(phead1)
var bboxPiston2 = createBoundingBox3(phead2)

var bboxCatapult = createBoundingBox3(catapultClass)
var bboxSphere = createBoundingBox3(bigSphereMesh)



                                                            /* ALL BOUDING BOX HELPERS ENABLE FROM HERE */

// scene.add(new THREE.Box3Helper(bboxSphere))

// scene.add(new THREE.Box3Helper(bboxCatapult, 0xffff00))
// scene.add(new THREE.Box3Helper(bboxTube))

// scene.add(new THREE.Box3Helper(bboxWall1))
// scene.add(new THREE.Box3Helper(bboxWall2))

// scene.add(new THREE.Box3Helper(bboxButton1))
// scene.add(new THREE.Box3Helper(bboxButton2))

// scene.add(new THREE.Box3Helper(bboxPiston1))
// scene.add(new THREE.Box3Helper(bboxPiston2))

// scene.add(new THREE.CameraHelper(trackingCamera))


var currentCamera = camera
var currentScene = scene
var control = new TrackballControls(camera, renderer.domElement)

// var moveFlag = 1

var catapultState = "WaitForCommand"
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


var pause = false
var point = true
var directional = true
var spot = true
var ambient = true
var cam = true

var trackingCameraAngle = Math.PI/180 * 0

document.addEventListener('keydown', event => {
    if(event.key == "l" && catapultState == "WaitForCommand") {
        catapultState = "Release"
    }
    if(event.key == "p") {
        pause = !pause
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
    if(event.key == "-") {
        trackingCameraAngle -= Math.PI/180
        trackingCamera.up.set(Math.sin(trackingCameraAngle),0,Math.cos(trackingCameraAngle))
    }
    if(event.key == "=") {
        trackingCameraAngle += Math.PI/180
        trackingCamera.up.set(Math.sin(trackingCameraAngle),0,Math.cos(trackingCameraAngle))
    }
})

function animate() {
    requestAnimationFrame( animate );

    // Update bounding box locations
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
    else if(!cam) {
        var t = new THREE.Vector3().setFromMatrixPosition(bigSphereMesh.matrixWorld)
        trackingCamera.position.set(t.x, 100, 0)
        trackingCamera.lookAt(t)  
    }

	renderer.render( currentScene, currentCamera );
}
animate();


function launchCatapultAnimationLoop() {
    var currAngle = Math.round(catapultRotationPoint.rotation.z * 180/Math.PI)
    // console.log(currAngle)
    if((currAngle == 60 || currAngle == 61) && catapultState == "Release") { // reached max point for launch, launch ball
        console.log("launched")
        catapultCurrAcc = 0

        ballState = "Launched"
        scene.attach(bigSphereMesh)

        catapultState = "WaitAfterRelease"
    }
    else if(currAngle == 0 && catapultState == "ReelBack") { //reached max point preparing for launch
        // console.log("waiting for relaunch")
        catapultCurrAcc = 0
        catapultState = "WaitForCommand"
    }

    if(catapultState == "Release") { //lauching the catapult
        catapultCurrAcc = catapultForwardAcc;
    }
    else if(catapultState == "WaitAfterRelease") { //wait a bit before moving again
        catapultCurrAcc = 0
        catapultState = "WaitAfterRelease2"
        // console.log("Waiting")
        setTimeout(reloadCatapult, 1000)
    }
    else if(catapultState == "ReelBack") { //Reel back the catapult
        catapultCurrAcc = catapultBackwardAcc   
    }
    else if(catapultState == "WaitForCommand") { //waiting to launch catapult
        catapultCurrAcc = 0
    }

    catapultRotationPoint.rotation.z += catapultCurrAcc*Math.PI/180
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
    if(bboxTube.intersectsBox(bboxSphere) && ballState != "InsideTube1") { //ball goes into tube on left
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
    button1.position.x += 1.5
}

function resetButton2() {
    button2.position.x -= 0.5
}

function reloadCatapult() {
    catapultState = "ReelBack"
}