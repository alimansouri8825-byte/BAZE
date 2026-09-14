import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    70,
    innerWidth / innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.getElementById("game").appendChild(renderer.domElement);

// نور
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(10, 20, 10);
sun.castShadow = true;
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// زمین
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({
        color: 0x397d32
    })
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// جاده
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 300),
    new THREE.MeshStandardMaterial({
        color: 0x333333
    })
);

road.rotation.x = -Math.PI / 2;
road.position.y = 0.01;
scene.add(road);

// ماشین
const car = new THREE.Group();

// بدنه
const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.7, 4),
    new THREE.MeshStandardMaterial({
        color: 0xe00000
    })
);

body.position.y = 0.65;
body.castShadow = true;
car.add(body);

// سقف
const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.6, 1.8),
    new THREE.MeshStandardMaterial({
        color: 0x990000
    })
);

roof.position.set(0, 1.2, 0);
car.add(roof);

scene.add(car);

// موقعیت ماشین
car.position.set(0, 0, 0);

// دوربین
camera.position.set(0, 5, 8);
camera.lookAt(car.position);

// کنترل
let left = false;
let right = false;

document.getElementById("left").ontouchstart =
() => left = true;

document.getElementById("left").ontouchend =
() => left = false;

document.getElementById("right").ontouchstart =
() => right = true;

document.getElementById("right").ontouchend =
() => right = false;

// حرکت
function animate() {

    requestAnimationFrame(animate);

    if (left) car.position.x -= 0.08;
    if (right) car.position.x += 0.08;

    car.position.x = Math.max(
        -5,
        Math.min(5, car.position.x)
    );

    camera.position.x =
        car.position.x;

    camera.lookAt(
        car.position.x,
        0,
        0
    );

    renderer.render(scene, camera);
}

animate();

// اندازه صفحه
addEventListener("resize", () => {

    camera.aspect =
        innerWidth / innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        innerWidth,
        innerHeight
    );
});
