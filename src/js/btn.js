const colors = [   
    "rgb(224, 79, 234)",  
    "rgb(73, 167, 225)",
    "rgb(222, 222, 37)",
    "rgb(222, 176, 37)",
    "rgb(248, 80, 180)",
    "rgb(0, 0, 224)",
    "rgb(46, 255, 143)",
    "rgb(255, 46, 112)"

];

let colorIndex = 0;

const button = document.getElementById("btn");

button.addEventListener("click", function(event) {
    
    button.style.backgroundColor = colors[colorIndex];
    
    colorIndex = (colorIndex + 1) % colors.length;
});