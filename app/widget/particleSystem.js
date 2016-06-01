/**
 * 这里先按照雏形设计粒子效果，尚需要更抽象的封装，以及考虑效果的输出
 * 所有粒子都是圆形
 * Created by sunshitao on 2016/2/15.
 */
define(function (require, exports, module) {

    var vector2 = require("../vector2");

    module.exports = function () {
        //private field
        var that = this;
        var particles = new Array();
        //设置鼠标位置
        var oldMousePosition = vector2.zero, newMousePosition = vector2.zero;
        //public field
        //对属性进行初始化
        this.gravity = new vector2(0, 0);
        this.velocity = 0;
        this.effectors = new Array();
        //private methods

        //检测粒子超过范围就反方向相应速度,增加粒子碰撞
        var ChamberBox = function (x1, y1, x2, y2) {
            this.apply = function (particle) {
                if ((particle.position.x - particle.size) < x1 || (particle.position.x + particle.size > x2)) {
                    particle.velocity.x = -particle.velocity.x;
                }
                if ((particle.position.y - particle.size) < y1 || (particle.position.y + particle.size) > y2) {
                    particle.velocity.y = -particle.velocity.y;
                }
            }
        };

        function aging(dt, size) {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                //p.age += dt;
                p.age++;
                if (size) {
                    p.size -= size;
                }
                p.opacity = Math.round((p.life-p.age)/ p.life*100)/100;
                if (p.age > p.life || p.size < 0) {
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
                particles[i].acceleration = that.gravity;
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
                p.position = p.position.add(p.velocity);
                //p.position = p.position.add(p.velocity.multiply(dt));
                //p.velocity = p.velocity.add(p.acceleration.multiply(dt));
            }
        }

        this.obstacle = function (x, y) {
            that.effectors.push(new ChamberBox(0, 0, x, y));
        };
        //修改属性
        this.modifyProperty = function (key, value) {
            this[key] = value;
        };
        this.modifyChildProperty = function (key, value) {
            particles[0][key] = value;
        };

        //发射粒子
        this.emit = function (particle) {
            particles.push(particle);
        };

        this.clear = function () {
            particles = [];
        };

        //模拟粒子发射
        this.simulate = function (dt, size) {
            aging(dt, size);
            applyGravity();
            applyEfforts(dt);
            kinematics(dt);
        };
        function particleShape(type) {
            if (!type) {
                type = 'circle';
            }
            var method = {
                circle: function (ctx, p) {

                    //颜色设置部分需要提出来单独封装.至少也在私有方法中进行封装

                    if (typeof p.color === "string") {
                        let rgb = {r: 255, g: 185, b: 15};
                        var gradient = ctx.createRadialGradient(p.position.x, p.position.y, 0, p.position.x, p.position.y, p.size);
                        gradient.addColorStop(0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + p.opacity + ")");
                        gradient.addColorStop(0.5, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + p.opacity + ")");
                        gradient.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)");
                        ctx.fillStyle = gradient;
                    } else {
                        var alpha = 1 - p.age / p.life;
                        ctx.fillStyle = "rgba("
                            + Math.floor(p.color.r * 255) + ","
                            + Math.floor(p.color.g) + ","
                            + Math.floor(p.color.b) + ","
                            + alpha.toFixed(2) + ")";
                    }
                    ctx.beginPath();
                    ctx.arc(p.position.x, p.position.y, p.size, 0, 2 * Math.PI, true);
                    ctx.closePath();
                    ctx.fill();
                },
                square: function (ctx, p) {
                    var alpha = 1 - p.age / p.life;
                    if (typeof p.color === "string") {
                        ctx.fillStyle = p.color;
                    } else {
                        ctx.fillStyle = "rgba("
                            + Math.floor(p.color.r * 255) + ","
                            + Math.floor(p.color.g) + ","
                            + Math.floor(p.color.b) + ","
                            + alpha.toFixed(2) + ")";
                    }
                    ctx.fillRect(p.position.x, p.position.y, p.size.width, p.size.height);
                }
            };
            return method[type];
        }

        //对粒子进行渲染
        this.render = function (ctx) {
            for (var i in particles) {
                var p = particles[i];
                var type = p.type || "circle";
                particleShape(type)(ctx, p);
            }
        };
    };
});


