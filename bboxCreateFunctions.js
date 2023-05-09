import * as THREE from 'three';

export function createBoundingBox3(object3D) {
    var bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    object3D.geometry.computeBoundingBox()
    bbox.setFromObject(object3D)

    return bbox
}