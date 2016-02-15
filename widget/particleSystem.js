/**
 * 这里先按照雏形设计粒子效果，尚需要更抽象的封装，以及考虑效果的输出
 * Created by sunshitao on 2016/2/15.
 */
define(function (require, exports, module) {
    module.exports = (function() {
        //private field
        var that = this;
        var particles = new Array();

        //public field
        //对属性进行初始化
        this.gravity = new vector2(0, 100);
        this.velocity = 0;

        this.effectors = new Array();

        //private methods

        //检测粒子超过范围就反方向相应速度,增加粒子碰撞
        function ChamberBox(x1,y1,x2,y2){
            this.apply=function(particle){
                if((particle.position.x - particle.size)< x1 || (particle.position.x + particle.size > x2)){
                    particle.velocity.x = -particle.velocity.x;
                }
                if((particle.position.y - particle.size) < y1 || (particle.position.y+particle.size) > y2){
                    particle.velocity.y = -particle.velocity.y;
                }
            }
        }

        function aging(dt) {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.age += dt;

                if (p.age > p.life) {
                    kill(i)
                } else {
                    i++;
                }
            }
        }

        //清除老化粒子
        function kill(index) {
            if (particles.length > 1) {
                particles[index] = particles[particles.length - 1];
            }
            particles.pop();
        }

        function applyGravity() {
            for (var i in particles) {
                particles[i].acceleration = this.gravity;
            }
        }

        //应用效果器
        function applyEfforts() {
            for (var j in that.effectors) {
                var apply = that.effectors[j].apply;
                for (var i in particles) {
                    apply(particles[i]);
                }
            }
        }

        //粒子运动学参数改变, 1.位置 2.速度
        function kinematics(dt) {
            for (var i in particles) {
                var p = particles[i];
                p.position = p.position.add(p.velocity.multiply(dt));
                p.velocity = p.velocity.add(p.acceleration.multiply(dt));
            }
        }


        //修改属性
        this.modifyProperty = function (key, value) {
            this[key] = value;
        };

        //发射粒子
        this.emit = function (particle) {
            particles.push(particle);
        };
        //模拟粒子发射
        this.simulate = function (dt) {
            aging(dt);
            applyGravity();
            applyEfforts(dt);
            kinematics(dt);
        };

        //对粒子进行渲染
        this.render = function (ctx) {
            for (var i in particles) {
                var p = particles[i];
                var alpha = 1 - p.age / p.life;
                //颜色设置部分需要提出来单独封装.至少也在私有方法中进行封装
                ctx.fillStyle = "rgba("
                    + Math.floor(p.color.r * 255) + ","
                    + Math.floor(p.color.g) + ","
                    + Math.floor(p.color.b) + ","
                    + alpha.toFixed(2) + ")";
                ctx.beginPath();
                ctx.arc(p.position.x, p.position.y, p.size, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
            }
        };
    }());
});


