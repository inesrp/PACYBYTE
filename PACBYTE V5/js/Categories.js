//Import e colocação do modelo 3D do header

import * as THREE from "./Three/three.module.js";
import {
  GLTFLoader
} from "./Three/GLTFLoader.js";

// import {
//   EffectComposer
// } from './Three/Post-P/EffectComposer.js';
// import {
//   SAOPass
// } from './Three/Post-P/SAOPass.js';

// let composer, saoPass;

var raycaster;

var body = document.body, html = document.documentElement;
var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);


function main() {
  const canvas = document.querySelector("#c1");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(), INTERSECTED;

  function makeScene(elem) {
    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = window.innerWidth/window.innerHeight; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    return {
      scene,
      camera,
      elem
    };
  }

  function setupScene1() {
    const sceneInfo = makeScene(document.querySelector("#aba"));
    const loader = new GLTFLoader();
    loader.load("models/Aba.gltf", function (gltf) {
      var obj = gltf.scene;

      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          }
      });
      obj.position.set(0, -0.2, -0.8);
      sceneInfo.scene.add(obj);
    });
    return sceneInfo;
  }

  const sceneInfo1 = setupScene1();

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function renderSceneInfo(sceneInfo) {
    const {
      scene,
      camera,
      elem
    } = sceneInfo;


    //viewport do elemento
    const {
      left,
      right,
      top,
      bottom,
      width,
      height
    } =
    elem.getBoundingClientRect();


    const isOffscreen =
      bottom < 0 ||
      top > renderer.domElement.clientHeight ||
      right < 0 ||
      left > renderer.domElement.clientWidth;

    if (isOffscreen) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);
    renderer.setClearColor(0xffffff, 0);

    renderer.render(scene, camera);
  }

  window.requestAnimationFrame(render);

  function render(time) {
    time *= 0.0001;

    resizeRendererToDisplaySize(renderer);

    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    renderSceneInfo(sceneInfo1);

    requestAnimationFrame(render);

  }

  requestAnimationFrame(render);
}

main();


//Carrossel
var slides = document.getElementsByClassName("slideshow");
var IndexAtual = 0;

var next = document.getElementById("next");
var prev = document.getElementById("prev");

//primeiro elemento que aparece
slides[0].style.display = "block";

//andar para a frente
next.addEventListener("click", andafrente);


function andafrente() {
    IndexAtual = IndexAtual + 1;
    if (IndexAtual >= slides.length) {
        IndexAtual = 0;
    }

   // pausarvideo();

    for (let i = 0; i < slides.length; i++) {
        if (i !== IndexAtual) {
            slides[i].style.display = "none";
        } else {
            slides[IndexAtual].style.display = "block";

        }
    }
}

//andar para trás
prev.addEventListener("click", andatras);

function andatras() {
    IndexAtual = IndexAtual - 1;
    if (IndexAtual < 0) {
        IndexAtual = slides.length - 1;
    }

   // pausarvideo();

    for (let i = 0; i < slides.length; i++) {
        if (i !== IndexAtual) {
            slides[i].style.display = "none";
        } else {
            slides[IndexAtual].style.display = "block";

        }
    }
}

function pausarvideo() {
    if (IndexAtual !== 0) {
        document.getElementsByClassName("slideshow")[0].pause();
    }
}