export class buttons{
    constructor(){

        document.getElementById("start-screen").style.display = "block";
        document.getElementById("level-one").style.display = "none";
        document.getElementById("level-two").style.display = "none";
        document.getElementById("level-screen").style.display = "none";
        document.getElementById("restart").style.display = "none";
        
        document.getElementById("start").addEventListener('click', function() {
            document.getElementById("start-screen").style.display = "none";
            document.getElementById("level-screen").style.display = "block";
        })
        
        document.getElementById("back").addEventListener('click', function () {
            document.getElementById("start-screen").style.display = "block";
            document.getElementById("level-one").style.display = "none";
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("restart").style.display
         = "none";
        })
        0
        document.getElementById("first").addEventListener('click', function () {
            document.getElementById("level-one").style.display = "block";
            document.getElementById("level-two").style.display = "none";
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("restart").style.display = "block";
        
        })
        
        document.getElementById("second").addEventListener('click', function () {
            document.getElementById("level-one").style.display = "none";
            document.getElementById("level-two").style.display = "block";
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("restart").style.display = "block";
        })
        
        document.getElementById("restart").addEventListener('click', function () {
            window.location.reload()
        })
    }
}