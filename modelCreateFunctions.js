import * as THREE from 'three';

export function createWall(height, color) {
    var wallGeo = new THREE.BoxGeometry(2, height, 6)
    var wallMaterial = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 1,
        side: THREE.DoubleSide
    })

    var wall = new THREE.Mesh(wallGeo, wallMaterial)

    return wall;
}

export function createCatapult() {
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

export function createButton(color) {
    var buttonGeo = new THREE.CylinderGeometry(2,2,1)
    var buttonMaterial = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide
    })

    var button = new THREE.Mesh(buttonGeo, buttonMaterial)

    return button;
}

export function createPiston(color) {
    var pistonHeadGeo = new THREE.BoxGeometry(1,4,4)
    var pistonNeck = new THREE.BoxGeometry(6,1,1)
    var pistonMaterial = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide
    })
    var phead = new THREE.Mesh(pistonHeadGeo, pistonMaterial)
    var pneck = new THREE.Mesh(pistonNeck, pistonMaterial)
    phead.add(pneck)
    pneck.position.set(-3,0,0)

    return phead
}
