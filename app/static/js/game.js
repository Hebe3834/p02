// Optimistic Dinosaurs -- Hebe Huang, Yuqing Wu, Roshani Shrestha, Justin Zou
// SoftDev
// P02 -- Run for Your Life
// 2022-03-06

var c = document.getElementById("main_game");
var ctx = c.getContext("2d");
var scoreEle = document.getElementById("usrScore");
var score = 0;
var requestID;  //init global var for use with animation frames
var radius = 1;
var levels = 200;
var rects = [];
var generate = true;
var r = true;
var jmp = false;
var up = false;
var img = [30,95];
var counter = 0;
var one = new Image(100);
one.src = 'static/sprites/tile001.png';
var two = new Image(100);
two.src = 'static/sprites/tile002.png';
var four = new Image(100);
four.src = 'static/sprites/tile004.png';

var clear = (e) => {
    console.log("clear invoked...")
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var run = () =>{
  console.log("run invoked...");
  if (counter <= 10) {
    ctx.drawImage(one, img[0], img[1], 150, 150);
  }
  else if (counter <= 20) {
    ctx.drawImage(two, img[0], img[1], 150, 150);
  }
  else {
    counter = 0;
  }
  counter++;
}

var jump = () =>{
  if(jmp && !up){ // falling down
      img[1] += 5;
      if(img[1]>95){
        img[1] = 95;
        jmp = false;
      }
    jmp_cnt = 0;
    }

    else if(up && jmp){ // jumping up
      img[1]-=8;
      if(img[1]<-10){ // -10 because of empty space in image
        img[1] = -10;
        up = false;
      }
}
}

var generate_rect = () =>{
  if(generate == true){
    console.log("generating . . .");
    var start = 300;
    var num_obs = 10;
    for (i=0;i<num_obs;i++){
      var block_len = Math.floor(Math.random() * 30 + 10);
      var block_height = Math.floor(Math.random()*50 + 20);
      var lv = 1;
      start += block_len + Math.floor(Math.random() * 250) + 250;
      rects.push([start,levels - block_height, block_len, block_height]);
    }
    generate = false;
  }

  var last_rect = 0;
  for(i=0;i<rects.length;i++){
    ctx.fillStyle = "red";
    ctx.fillRect(rects[i][0],rects[i][1],rects[i][2],rects[i][3]);
    rects[i][0]-=6;
    if(rects[i][0] > last_rect){
      last_rect = rects[i][0];
    }
  }

  console.log(rects[0][0]);
  while(true){
    if(rects[0][0] < -250){
      console.log(rects[0][0]);
      rects.shift();
    }
    else{
      break;
    }
  }

  if(last_rect < 300){
    generate = true;
  }
};

var playGame = () => {
  console.log("playGame invoked...")

  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(playGame);

  clear();

  ctx.strokeStyle = "black";
  ctx.strokeRect(0,levels, c.clientWidth, c.clientWidth);
  generate_rect();

  if(r){
    run();
  }
  else{
    ctx.drawImage(four, img[0], img[1] + 50,150,100);
  }

  jump();
  score ++;
  scoreEle.innerHTML = "SCORE: " + score;
}


playGame();
document.body.addEventListener('keydown', function(event) {
            var key = event.key;
            if(key=="ArrowDown"){
              r = false;
            }
            if(key == "ArrowUp" && jmp == false){
              up = true;
              jmp = true;
            }
        });

document.body.addEventListener('keyup', function(event) {
            var key = event.key;
            if(key=="ArrowDown"){
              r = true;
            }

        });
