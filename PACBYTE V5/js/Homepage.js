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
var controls;

var body = document.body,
  html = document.documentElement;
var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

var container = document.getElementById('caixaBk');
container.setAttribute("height", height + "px");

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(),
    INTERSECTED;

  function makeScene(elem) {
    const scene = new THREE.Scene();

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight; // the canvas default
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
        if (child instanceof THREE.Mesh) {}
      });
      obj.position.set(0, -0.2, -0.8);
      sceneInfo.scene.add(obj);
    });
    return sceneInfo;
  }

  function setupScene2() {
    const sceneInfo = makeScene(document.querySelector("#joy"));

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubes = [];

    for (let i = 0; i < 6; i++) {
      const cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        color: 0x4178fa
      }));

      cube.position.setFromCylindricalCoords(0.8, i * 27 + (2 * Math.PI), i / 27);

      cube.rotation.x = Math.random() * 2 * Math.PI;
      cube.rotation.y = Math.random() * 2 * Math.PI;
      cube.rotation.z = Math.random() * 2 * Math.PI;
      cube.castShadow = true;

      cube.traverse(function (child) {
        if (child instanceof THREE.Mesh) {}
      });

      sceneInfo.scene.add(cube);

      cubes.push(cube);
    }
    return sceneInfo;
  }

  function setupScene3() {
    const sceneInfo = makeScene(document.querySelector("#pac"));
    const loader = new GLTFLoader();

    loader.load("models/Box.gltf", function (gltf) {
      var obj = gltf.scene;
      obj.rotateY(0.05);
      obj.scale.set(5, 5, 5);
      obj.position.set(-0.2, 0.2, 0);
      sceneInfo.scene.add(obj);
    });

    loader.load("models/Box.gltf", function (gltf) {
      var obj = gltf.scene;
      obj.rotateY(-0.08);
      obj.scale.set(5, 5, 5);
      obj.position.set(0.4, 0.2, 0);
      sceneInfo.scene.add(obj);
    });

    loader.load("models/Box.gltf", function (gltf) {
      var obj = gltf.scene;
      obj.rotateY(-0.1);
      obj.rotateZ(-0.01);
      obj.scale.set(5, 5, 5);
      obj.position.set(1, 0.2, 0);
      sceneInfo.scene.add(obj);
    });

    return sceneInfo;
  }

  function setupScene4() {
    const sceneInfo = makeScene(document.querySelector("#arcade"));
    const loader = new GLTFLoader();
    loader.load("models/Arcade.gltf", function (gltf) {
      var obj = gltf.scene;
      obj.scale.set(6, 6, 6);
      obj.position.set(-0.1, -0.3, 0);
      sceneInfo.scene.add(obj);
    });
    return sceneInfo;
  }

  const sceneInfo1 = setupScene1();
  const sceneInfo2 = setupScene2();
  const sceneInfo3 = setupScene3();
  const sceneInfo4 = setupScene4();

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

//  function onMouseMove(event) {
//      mouse.x = (event.clientX /window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerWidth) * 2 + 1;

//      raycaster.setFromCamera(mouse, camera);

//      var intersects = raycaster.intersectObjects(sceneInfo3.scene.children, true);

//      if (intersects.length > 0) {

//   if (INTERSECTED != intersects[0].object) {

//            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
//            INTERSECTED = intersects[0].object;
//            this.tl = new TimelineMax();
//            this.tl.to(intersects[0].object.rotation, .5, {z: Math.PI*2, ease: Expo.easeOut}, "=-10")
         
//          }
        
//        } else {
//         if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
//          INTERSECTED = null;
      
//     }
//   }

//   window.addEventListener('mousemove', onMouseMove);

    renderer.render(scene, camera);


    // //Efeito de Ambient Occlusion
    // composer = new EffectComposer( renderer );
    // saoPass = new SAOPass( scene, camera, false, true );
    // composer.addPass( saoPass );

    // saoPass.params, 'saoBias', -1;
    // saoPass.params, 'saoIntensity', 1;
    // saoPass.params, 'saoScale', 10;
    // saoPass.params, 'saoKernelRadius', 100 ;
    // saoPass.params, 'saoMinResolution', 0 ;

  }
  window.requestAnimationFrame(render);

  function render(time) {
    time *= 0.0001;

    resizeRendererToDisplaySize(renderer);

    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);

    sceneInfo2.scene.rotation.y = time * 1;

    renderSceneInfo(sceneInfo1);
    renderSceneInfo(sceneInfo2);
    renderSceneInfo(sceneInfo3);
    renderSceneInfo(sceneInfo4);

    requestAnimationFrame(render);

  }

  requestAnimationFrame(render);
}

main();