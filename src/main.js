import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ESCENA ACTIVA
let escenaActiva = 'logo';

// HEADER
const header = document.createElement('header');
header.id = 'mainHeader';

const logo = document.createElement('div');
logo.className = 'logo-text';
logo.textContent = 'Sing in Color';

// Crear logo2
const logo2 = document.createElement('div');
logo2.className = 'logo2-text';
logo2.textContent = 'Sing in Color';
document.body.appendChild(logo2);

// Crear Subtitulos
// subSomething
const subSomething = document.createElement('div');
subSomething.className = 'subSomething-text';
subSomething.textContent = 'Something just like this';
document.body.appendChild(subSomething);

// subViva
const subViva = document.createElement('div');
subViva.className = 'subViva-text';
subViva.textContent = 'Viva la vida';
document.body.appendChild(subViva);

// subSky
const subSky = document.createElement('div');
subSky.className = 'subSky-text';
subSky.textContent = 'A sky full of stars';
document.body.appendChild(subSky);


const historyButton = document.createElement('a');
historyButton.className = 'history-button';
historyButton.href = 'https://es.wikipedia.org/wiki/Coldplay';
historyButton.target = '_blank';
historyButton.textContent = 'Coldplay History';

// Armar el DOM
header.appendChild(logo);
header.appendChild(historyButton);
document.body.prepend(header);

// Tipografía
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Akshar:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// CANVAS Y ESCENAS
const canvas = document.querySelector('canvas.webgl');
const canvasSomething = document.querySelector('canvas.something');
const canvasViva = document.querySelector('canvas.viva');
const canvasSky = document.querySelector('canvas.sky');

const scene = new THREE.Scene();

// CARGA DE MODELO
const loader = new GLTFLoader();
loader.load('/models/logofinal/logocolplayprueba.glb', (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 0, 0);
  model.scale.set(0.12, 0.12, 0.12);
  model.rotation.z = Math.PI;
  scene.add(model);
  console.log('GLB cargado');

  model.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.emissive = new THREE.Color(0xffffff);
      child.material.emissiveIntensity = 0.02;
    }
  });
}, undefined, (error) => {
  console.error('Error al cargar GLB:', error);
});

// LUCES
scene.add(new THREE.AmbientLight(0xffffff, 2.0));
scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 2.0));

const directionalLight = new THREE.DirectionalLight(0xffffff, 5.0);
directionalLight.position.set(3, 5, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
fillLight.position.set(-2, -3, 3);
scene.add(fillLight);

// CÁMARA
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 0, 5);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 2 - 0.35;
controls.maxPolarAngle = Math.PI / 2 + 0.35;
controls.minAzimuthAngle = -0.35;
controls.maxAzimuthAngle = 0.35;
controls.update();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// PARTICULAS (estrellas)
const geometry = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < 10000; i++) {
  positions.push((Math.random() - 0.5) * 3000, (Math.random() - 0.5) * 3000, (Math.random() - 0.5) * 3000);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const particles = new THREE.Points(geometry, new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2,
  transparent: true,
  opacity: 0.8,
}));
scene.add(particles);

// ANIMACIÓN
const clock = new THREE.Clock();
let previousTime = 0;
let mixer = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  if (mixer) mixer.update(deltaTime);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

/// INSTRUCCIONES
const instructionContainer = document.createElement('div');
instructionContainer.id = 'instruction-container';
instructionContainer.textContent = "Move your mouse to reveal the magic, and press the SPACEBAR to the rhythm of the music to enjoy the experience!";
document.body.appendChild(instructionContainer);

// INFO CONTAINER (con id único)
const infoContainer = document.createElement('div');
infoContainer.id = 'info-container';  

const texts = [
  "By: Becky Ergas Romano",
  "Ig: becky_er",
  "beckyergasr4@gmail.com"
];

texts.forEach(text => {
  const p = document.createElement('p');
  p.textContent = text;
  infoContainer.appendChild(p);
});

document.body.appendChild(infoContainer);  


// ESTRELLAS CON CLICK
function createClickStars(x, y, count = 80) {
  console.log(`Creando ${count} estrellas en (${x}, ${y})`);
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star-click');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    const dx = (Math.random() - 0.5) * 1200;
    const dy = (Math.random() - 0.5) * 1000;
    star.style.setProperty('--dx', `${dx}px`);
    star.style.setProperty('--dy', `${dy}px`);
    document.body.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  }
}

function handleClickForStars(event) {
  console.log('Click detectado', event.target);
  if (event.target === canvas) {
    createClickStars(event.clientX, event.clientY);
  }
}

// MOSTRAR ESCENAS
const container = document.querySelector('.container');
const backButton = document.getElementById('backButton');

function showScene() {
  const backButton = document.getElementById('backButton');
  const nextSong1 = document.getElementById('nextSong1');
  const nextSong2 = document.getElementById('nextSong2');
  const nextSong3 = document.getElementById('nextSong3');


  if (escenaActiva === 'something') {
    canvasSomething.style.display = 'block';
    canvas.style.display = 'none';
    canvasViva.style.display = 'none';
    canvasSky.style.display = 'none';
    document.getElementById('mainHeader').style.display = 'none';
    container.style.display = 'none';
    backButton.style.display = 'block';   
    nextSong1.style.display = 'block';    
    nextSong2.style.display = 'none'; 
    nextSong3.style.display = 'none'; 
    logo2.style.display = 'block';
    subSomething.style.display = 'block';
    subSky.style.display = 'none';
    subViva.style.display = 'none';
    instructionContainer.style.display = 'block';
    infoContainer.style.display = 'none';
    window.removeEventListener('click', handleClickForStars);

  } else if (escenaActiva === 'viva') {
    canvasViva.style.display = 'block';
    canvas.style.display = 'none';
    canvasSomething.style.display = 'none';
    canvasSky.style.display = 'none';
    document.getElementById('mainHeader').style.display = 'none';
    container.style.display = 'none';
    backButton.style.display = 'block';
    nextSong1.style.display = 'none'; 
    nextSong2.style.display = 'block';
    nextSong3.style.display = 'none';
    logo2.style.display = 'block';
    subSomething.style.display = 'none';
    subSky.style.display = 'none';
    subViva.style.display = 'block';
    instructionContainer.style.display = 'block';
    infoContainer.style.display = 'none';
    window.removeEventListener('click', handleClickForStars);

  } else if (escenaActiva === 'sky') {
    canvasSky.style.display = 'block';
    canvas.style.display = 'none';
    canvasSomething.style.display = 'none';
    canvasViva.style.display = 'none';
    document.getElementById('mainHeader').style.display = 'none';
    container.style.display = 'none';
    backButton.style.display = 'block';
    nextSong1.style.display = 'none';
    nextSong2.style.display = 'none'; 
    nextSong3.style.display = 'block';
    logo2.style.display = 'block';
    subSomething.style.display = 'none';
    subSky.style.display = 'block';
    subViva.style.display = 'none';
    instructionContainer.style.display = 'block';
    infoContainer.style.display = 'none';
    window.removeEventListener('click', handleClickForStars);

  } else {
    canvas.style.display = 'block';
    canvasSomething.style.display = 'none';
    canvasViva.style.display = 'none';
    canvasSky.style.display = 'none';
    document.getElementById('mainHeader').style.display = 'flex';
    container.style.display = 'flex';
    backButton.style.display = 'none';
    nextSong1.style.display = 'none';  
    nextSong2.style.display = 'none';
    nextSong3.style.display = 'none';
    logo2.style.display = 'none';
    subSomething.style.display = 'none';
    subSky.style.display = 'none';
    subViva.style.display = 'none';
    instructionContainer.style.display = 'none';
    infoContainer.style.display = 'flex';
    window.addEventListener('click', handleClickForStars);
  }
}


// BOTONES DE ESCENA
let somethingModule, vivaModule, skyModule;

document.querySelector('.btn-something').addEventListener('click', async () => {
  escenaActiva = 'something';
  showScene();
  if (!somethingModule) {
    somethingModule = await import('./scenes/somethingScene.js');
  }
  somethingModule.playSomethingScene();
});

document.querySelector('.btn-viva').addEventListener('click', async () => {
  escenaActiva = 'viva';
  showScene();
  if (!vivaModule) {
    vivaModule = await import('./scenes/vivaScene.js');
  }
  vivaModule.playVivaScene();
});

document.querySelector('.btn-sky').addEventListener('click', async () => {
  escenaActiva = 'sky';
  showScene();
  if (!skyModule) {
    skyModule = await import('./scenes/skyScene.js');
  }
  skyModule.playSkyScene();
});

backButton.addEventListener('click', () => {
  escenaActiva = 'logo';
  showScene();
});

let currentStopFunction = null;

// BOTONES NEXT SONGS
document.getElementById('nextSong1').addEventListener('click', async () => {
  if (!vivaModule) {
    vivaModule = await import('./scenes/vivaScene.js');
  }
  if (currentStopFunction) currentStopFunction(); // detener audio anterior
  currentStopFunction = vivaModule.stopVivaAudio; // guardar función de stop
  escenaActiva = 'viva';
  showScene();
  vivaModule.playVivaScene();
});

document.getElementById('nextSong2').addEventListener('click', async () => {
  if (!skyModule) {
    skyModule = await import('./scenes/skyScene.js');
  }
  if (currentStopFunction) currentStopFunction();
  currentStopFunction = skyModule.stopSkyAudio;
  escenaActiva = 'sky';
  showScene();
  skyModule.playSkyScene();
});

document.getElementById('nextSong3').addEventListener('click', async () => {
  if (!somethingModule) {
    somethingModule = await import('./scenes/somethingScene.js');
  }
  if (currentStopFunction) currentStopFunction();
  currentStopFunction = somethingModule.stopSomethingAudio;
  escenaActiva = 'something';
  showScene();
  somethingModule.playSomethingScene();
});




// INICIALIZAR ESCENA
escenaActiva = 'logo';
showScene();

window.addEventListener('click', handleClickForStars); // Extra seguridad
