// function loadImage(url) {
//     return new Promise(resolve => {
//         const image = new Image()
//         image.addEventListener('load', ()=> {
//             resolve(image);
//         });
//         image.src = url
//     });
// 


// ctx.fillRect(0, 0, 50, 50);

// loadImage('/Sprites/ground.jpg').then(image => {ctx.drawImage(image,0,0)
// });

document.getElementById("start-screen").style.display = "block";
document.getElementById("level-one").style.display = "none";
document.getElementById("level-screen").style.display = "none";
document.getElementById("quit").style.display= "none";

document.getElementById("start").addEventListener('click', function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("level-screen").style.display = "block";
})

document.getElementById("back").addEventListener('click', function () {
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("level-one").style.display = "none";
    document.getElementById("level-screen").style.display = "none";
    document.getElementById("quit").style.display= "none";
})

document.getElementById("quit").addEventListener('click', function(){
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("level-one").style.display = "none";
    document.getElementById("level-screen").style.display = "none";
    document.getElementById("quit").style.display= "none";
})

document.getElementById("first").addEventListener('click', function () {
    document.getElementById("level-one").style.display = "block";
    document.getElementById("level-screen").style.display = "none";
    document.getElementById("quit").style.display= "block";
})

document.getElementById("second").addEventListener('click', function () {
    document.getElementById("level-two").style.display = "block";
    document.getElementById("level-screen").style.display = "none";
    document.getElementById("quit").style.display= "block";
})

