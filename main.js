import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

      // 场景
var scene = "";
      // 控制器
var controls = '';
      // 相机
var camera = "";
      // 渲染
var renderer = "";

function initScene() {
  scene = new THREE.Scene();
  // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  // this.scene.add(ambientLight);
  //var axesHelper = new THREE.AxesHelper(0);
  //scene.add(axesHelper);
}
function initCamera() {
  const aspect = window.innerWidth / innerHeight; //宽高可根据实际项目要求更改 如果是窗口高度改为innerHeight
  // this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
  camera = new THREE.PerspectiveCamera(45, aspect, 1, 4000);
  // this.camera.position.set(100, 100, 100);
  camera.position.set(1000, 1000, 2000);
  camera.name = "相机";
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1) //方向光
  directionalLight.position.set(1000, 0, -1000)
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 300;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 200;
  directionalLight.shadow.camera.bottom = -100;
  scene.add(directionalLight)
  
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1) //方向光
  directionalLight.position.set(-1000, 0, -1000)
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 300;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 200;
  directionalLight.shadow.camera.bottom = -100;
  scene.add(directionalLight)
 
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5) //方向光
  directionalLight.position.set(0, 0, 1414.21)
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 300;
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 200;
  directionalLight.shadow.camera.bottom = -100;
  scene.add(directionalLight)
}
function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  //renderer.outputEncoding = THREE.sRGBEncoding;
  // 渲染器Renderer开启阴影计算
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //container = document.getElementById("container");
  //container.appendChild(renderer.domElement);
  document.body.appendChild( renderer.domElement );

}
// 初始化控制器
function initOrbitControls() {
  let controls = new OrbitControls(camera, renderer.domElement);
  controls = controls;
}
function animate() {
  //执行渲染操作
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
function init() {
  initScene();
  initCamera();
  initRenderer();
  initOrbitControls();
}
/**加载模型 */
function loadPlant() {
  let objLoader = new OBJLoader();
  /*let mtlLoader = new MTLLoader();
  mtlLoader.load(
    '3D_model/coat/Marina.mtl', 
    function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
            '3D_model/coat/Marina.obj', 
            function (obj) {
                // console.log(obj.children[0]);
                obj.scale.set(1, 1, 1);
                // obj.children[0].receiveShadow = true;//允许接收阴影
                obj.children[0].geometry.center(); //网格模型的几何体居中
                scene.add(obj);
                object = obj;
                // console.log(that.scene, "that.scene");
            },
            function (xhr) {
                // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            function (error) {
                console.log(error, "An error happened");
            }
        )
    }
  )*/
  
  var texture = new THREE.Texture();
  var loader = new THREE.ImageLoader();
  loader.load('3D_model/coat/Marina.jpg', function(image){
      texture.image = image;
      texture.needsUpdate = true;
  })
  objLoader.load(
    '3D_model/coat/Marina.obj', 
    function (obj) {
        // console.log(obj.children[0]);
        obj.scale.set(1, 1, 1);
        // obj.children[0].receiveShadow = true;//允许接收阴影
        obj.children[0].geometry.center(); //网格模型的几何体居中
        obj.traverse(function(child){
            if(child instanceof THREE.Mesh){
                child.material.map = texture;
            }
        })
        scene.add(obj);
        // console.log(that.scene, "that.scene");
        
        
    },
    function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.log(error, "An error happened");
    }
  )

}

loadPlant()
init();
animate();
 