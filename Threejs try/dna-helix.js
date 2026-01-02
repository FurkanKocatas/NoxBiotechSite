// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0015);

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;
camera.position.y = 0;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x8b5cf6, 2, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// DNA Helix parameters
const radius = 5;
const height = 40;
const turns = 4;
const pointsPerTurn = 50;
const totalPoints = turns * pointsPerTurn;

// Materials
const strand1Material = new THREE.MeshPhongMaterial({
    color: 0x8b5cf6,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.3,
    shininess: 100,
    transparent: true,
    opacity: 0.9
});

const strand2Material = new THREE.MeshPhongMaterial({
    color: 0x3b82f6,
    emissive: 0x1e3a8a,
    emissiveIntensity: 0.3,
    shininess: 100,
    transparent: true,
    opacity: 0.9
});

const basePairMaterial = new THREE.MeshPhongMaterial({
    color: 0x60a5fa,
    emissive: 0x1e40af,
    emissiveIntensity: 0.2,
    shininess: 50,
    transparent: true,
    opacity: 0.8
});

// Create DNA group
const dnaGroup = new THREE.Group();

// Create strand 1 (purple)
const strand1Geometry = new THREE.SphereGeometry(0.3, 16, 16);
const strand1Points = [];

for (let i = 0; i < totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    const sphere = new THREE.Mesh(strand1Geometry, strand1Material);
    sphere.position.set(x, y, z);
    dnaGroup.add(sphere);
    strand1Points.push(new THREE.Vector3(x, y, z));
}

// Create strand 2 (blue) - opposite side
const strand2Geometry = new THREE.SphereGeometry(0.3, 16, 16);
const strand2Points = [];

for (let i = 0; i < totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * Math.PI * 2 * turns + Math.PI;
    const y = (t - 0.5) * height;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    const sphere = new THREE.Mesh(strand2Geometry, strand2Material);
    sphere.position.set(x, y, z);
    dnaGroup.add(sphere);
    strand2Points.push(new THREE.Vector3(x, y, z));
}

// Create connecting tubes between strands
const tubeRadius = 0.15;
const tubeSegments = 8;

// Connect strand backbones
for (let i = 0; i < totalPoints - 1; i++) {
    // Strand 1 connections
    const path1 = new THREE.CatmullRomCurve3([
        strand1Points[i],
        strand1Points[i + 1]
    ]);
    const tubeGeometry1 = new THREE.TubeGeometry(path1, 1, tubeRadius, tubeSegments);
    const tube1 = new THREE.Mesh(tubeGeometry1, strand1Material);
    dnaGroup.add(tube1);
    
    // Strand 2 connections
    const path2 = new THREE.CatmullRomCurve3([
        strand2Points[i],
        strand2Points[i + 1]
    ]);
    const tubeGeometry2 = new THREE.TubeGeometry(path2, 1, tubeRadius, tubeSegments);
    const tube2 = new THREE.Mesh(tubeGeometry2, strand2Material);
    dnaGroup.add(tube2);
}

// Create base pairs (connecting bars)
const basePairInterval = 5;
for (let i = 0; i < totalPoints; i += basePairInterval) {
    const path = new THREE.CatmullRomCurve3([
        strand1Points[i],
        strand2Points[i]
    ]);
    const basePairGeometry = new THREE.TubeGeometry(path, 2, 0.12, 6);
    const basePair = new THREE.Mesh(basePairGeometry, basePairMaterial);
    dnaGroup.add(basePair);
    
    // Add small spheres at connection points
    const connector1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        basePairMaterial
    );
    connector1.position.copy(strand1Points[i]);
    dnaGroup.add(connector1);
    
    const connector2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        basePairMaterial
    );
    connector2.position.copy(strand2Points[i]);
    dnaGroup.add(connector2);
}

scene.add(dnaGroup);

// Add glow effect
const glowGeometry = new THREE.SphereGeometry(15, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.05,
    side: THREE.BackSide
});
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glowMesh);

// Animation
let rotationSpeed = 0.003;

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the DNA helix
    dnaGroup.rotation.y += rotationSpeed;
    
    // Subtle vertical oscillation
    dnaGroup.position.y = Math.sin(Date.now() * 0.0005) * 2;
    
    // Rotate glow slightly
    glowMesh.rotation.y += 0.001;
    glowMesh.rotation.x += 0.0005;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse interaction
let mouseX = 0;
let targetRotationX = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetRotationX = mouseX * 0.5;
});

function updateRotation() {
    dnaGroup.rotation.x += (targetRotationX - dnaGroup.rotation.x) * 0.05;
}

// Animation loop with mouse interaction
function animateWithMouse() {
    requestAnimationFrame(animateWithMouse);
    
    dnaGroup.rotation.y += rotationSpeed;
    dnaGroup.position.y = Math.sin(Date.now() * 0.0005) * 2;
    updateRotation();
    
    glowMesh.rotation.y += 0.001;
    glowMesh.rotation.x += 0.0005;
    
    renderer.render(scene, camera);
}

// Start animation
animateWithMouse();

console.log('DNA Helix loaded successfully!');
console.log('Move your mouse to interact with the helix');


