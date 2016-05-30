var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var particles = [];


var particle_count = 200;
for(var i=0; i<particle_count; i++){
    particles.push(new particle());
}

function loop() {
    requestAnimationFrame(loop);
    draw();
}

function particle() {
    this.loc = {x:canvas.width/2,y:canvas.height/2 + 50};
    this.speed = {x: Math.random()*5,y:-15+Math.random()*10};
    this.radius = 10+Math.random()*12;
    this.life = 15+Math.random()*8;
    this.remaining_life = this.life;
    this.color = {};
    this.color.r=255;
    this.color.g=185;
    this.color.b=15;
}

function draw() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    for(var i=0; i<particles.length; i++){
        var p = particles[i];
        ctx.beginPath();
        p.opacity = Math.round(p.remaining_life/ p.life*100)/100;

        var gradient = ctx.createRadialGradient(p.loc.x, p.loc.y, 0, p.loc.x, p.loc.y, p.radius);
        gradient.addColorStop(0, "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + "," + p.opacity + ")" );
        gradient.addColorStop(0.5, "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + "," + p.opacity + ")" );
        gradient.addColorStop(1, "rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + ", 0)" );

        ctx.fillStyle = gradient;
        ctx.arc(p.loc.x, p.loc.y, p.radius, 0, Math.PI*2, false);
        ctx.fill();

        p.remaining_life--;
        p.radius--;
        p.loc.x += p.speed.x;
        p.loc.y += p.speed.y;

        if(p.remaining_life<0 || p.radius <0){
            particles[i] = new particle();
        }
    }
}

loop();