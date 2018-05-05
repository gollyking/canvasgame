
var THREE = require('./libs/three.min.js');

var wallTex = new THREE.TextureLoader().load( 'images/wall.jpg' );
var floorTex = new THREE.TextureLoader().load('images/floor.jpg');
var boxTex = new THREE.TextureLoader().load('images/box.jpg');

var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xccccff, map: floorTex });

var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: boxTex });
var wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: wallTex });

function Scene(canvas, mapConfig) {
    //渲染器
    var ctx = canvas.getContext('webgl');
    var renderer = new THREE.WebGLRenderer({ context: ctx});
    //设置渲染器的高度和宽度，如果加上第三个值 false，则按场景大小显示，等比例缩放  
    renderer.setSize(canvas.width, canvas.height, false);
    var barHeight = 30;
    renderer.setViewport(0, barHeight, canvas.width, canvas.height - 2 * barHeight);  
    renderer.setClearColor(new THREE.Color("rgb(255, 0, 0)"));
    renderer.antialias = true;

    var aspect = canvas.width / canvas.height;
    //设置相机（视野，显示口的宽高比，近裁剪面，远裁剪面）
    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    //var frustumSize = 26;
    //var camera = new THREE.OrthographicCamera(
    //    frustumSize * aspect / -2, 
    //    frustumSize * aspect / 2, 
    //    frustumSize / 2, 
    //    frustumSize / -2, 
    //    0.1, 
    //    1000
    //);

    var angle = 3.1415926 / 180;
    var pitch = 60 * angle;
    camera.position.y = 10;
    camera.position.z = 10 * Math.cos(pitch);
    camera.position.x = -10 * Math.cos(pitch);
    camera.setRotationFromEuler(new THREE.Euler(-pitch, -45 * angle, 0, 'YXZ'));

    var scene = new THREE.Scene();
    this.mapConfig = mapConfig;
    
    var mapping = mapConfig.mapping;
    var height = mapping.length;
    var width = mapping[0].length;
    
    scene.add(new Plane(width, height));

    var x, y, flag;
    for (var i = 0; i < height; ++i) {
        for (var j = 0; j < width; ++j) {
            x = -width*0.5+j+0.5;
            y = -height*0.5+i+0.5;
            flag = mapping[i][j];
            if (flag === 1) {
                scene.add(new Wall(x, y));
            } else if (flag === 2) {
                scene.add(new Box(x, y));
            }
        }
    }

    scene.fog= new THREE.Fog(0x000000,0.015,100)

    this.Render = function () {
          renderer.render(scene, camera);
    }
}

function Plane(width, height) {
    var geometry = new THREE.BoxGeometry(width+2, 0.01, height+2);
    var mesh = new THREE.Mesh(geometry, planeMaterial);
    mesh.position.x = 0;
    mesh.position.z = 0;
    mesh.position.y = 0;

    this.mesh = mesh;

    return mesh;
}

function Wall(x, y) {
    var mesh = new THREE.Mesh(boxGeometry, wallMaterial);
    mesh.position.x = x;
    mesh.position.z = y;
    mesh.position.y = 0.5;

    this.mesh = mesh;

    return mesh;
}

function Box(x, y) {
    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    mesh.position.x = x;
    mesh.position.z = y;
    mesh.position.y = 0.5;

    this.mesh = mesh;

    return mesh;
}

function Actor() {

}

if (typeof module !== 'undefined')
    module.exports = Scene;