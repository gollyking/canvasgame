//require('./libs/weapp-adapter');
var Visulization = require('./visualization');

console.log(window.innerWidth , window.innerHeight);
canvas.width *= 2;
canvas.height *= 2;

function DoLogic() {

}

function Draw() {
    this.visulization.Render();
}

function LoadMap() {
    var map1 = require('./map1.js');
    this.visulization = new Visulization(canvas, map1);
}

function Game() {
    this.DoLogic = DoLogic.bind(this);
    this.Draw = Draw.bind(this);
    this.LoadMap = LoadMap.bind(this);
}

var game = new Game();
game.LoadMap();

var mainLoop = function() {

    game.DoLogic();
    game.Draw();

    requestAnimationFrame(mainLoop, canvas);
}
mainLoop();

