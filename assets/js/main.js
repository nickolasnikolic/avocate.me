
window.onload=()=>{

//random placement of random number of circles
let s = Snap('#canvas');
let circles = s.group();

for(var c = 500; c > 1; c-- ){
    var cc = s.circle(c / window.innerWidth,c / window.innerHeight, c * 2 );
    cc.attr({'fill-opacity': 0.0});
    circles.add(cc);
}
var masks = s.circle(window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / 3 );
masks.attr({fill: 'white'});

circles.attr({
    stroke: '#333',
    strokeWidth: 0.01,
    mask: masks
});

function randomScatter(){
    circles
    .selectAll('circle')
    .forEach((element, index )=>{
        element
            .animate({
                cx: (Math.random() * window.innerWidth / 2), 
                cy: (Math.random() * window.innerHeight / 2)                  
            }, 2000, mina.elastic)
        element
            .attr({
                'fill-opacity': 0.0
            });
    })
}
randomScatter();

function centralAnimation(){
    circles
    .selectAll('circle')
    .animate({
        cx: (window.innerWidth / 2), 
        cy: (window.innerHeight / 2)   
    }, 500, mina.elastic);
}

setInterval(randomScatter, 5000);
setInterval(centralAnimation, 27000);

window.addEventListener('resize', () => {
    masks.attr({
        cx: window.innerWidth / 2,
        cy: window.innerHeight / 2,
    });
    randomScatter();
});

}