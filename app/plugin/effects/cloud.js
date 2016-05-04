/**
 * Created by sunshitao on 2016/3/1.
 */
(function(){
    var _ = {};

    // 主页模块
    _.home = {};
    _.home.enter = {};
    _.home.out = {};
    _.home.enter.left = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#home .title').velocity('transition.slideDownBigIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .a-1').velocity('transition.flipXIn', { delay:300, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .stitle').velocity('transition.expandIn', { delay:600, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home li').velocity('transition.swoopIn', { stagger: 300, complete: function(){
                $('#home .line').velocity('transition.fadeIn', function(){
                    $('#home .block .item').velocity('transition.perspectiveLeftIn', { stagger: 100, complete: resolve });
                });
            }, delay: 1000 });
        }));

        return promise;
    };
    _.home.enter.right = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#home .title').velocity('transition.slideDownBigIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .a-1').velocity('transition.flipXIn', { delay:300, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .stitle').velocity('transition.expandIn', { delay:600, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home li').velocity('transition.swoopIn', { stagger: 300, complete: function(){
                $('#home .line').velocity('transition.fadeIn', function(){
                    $('#home .block .item').velocity('transition.perspectiveRightIn', { stagger: 100, complete: resolve });
                });
            }, delay: 1000 });
        }));

        return promise;
    };
    _.home.out.left = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#home .block .item').velocity('transition.perspectiveLeftOut', { stagger: 300, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .line').velocity('transition.fadeOut', { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home li').velocity('transition.swoopOut', { stagger: 300, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .stitle').velocity('transition.expandOut', { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .a-1').velocity('transition.flipXOut', { complete: resolve, dispaly: 'none' });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .title').velocity('transition.slideUpBigOut', { complete: resolve });
        }));

        return promise;
    };
    _.home.out.right = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#home .block .item').velocity('transition.perspectiveRightOut', { stagger: 300, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .line').velocity('transition.fadeOut', { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home li').velocity('transition.swoopOut', { stagger: 300, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .stitle').velocity('transition.expandOut', { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .a-1').velocity('transition.flipXOut', { complete: resolve, dispaly: 'none' });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#home .title').velocity('transition.slideUpBigOut', { complete: resolve });
        }));

        return promise;
    };


    // oauth 模块
    _.oauth = {};
    _.oauth.enter = {};
    _.oauth.out = {};
    _.oauth.enter.left = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b1').velocity({ rotateY: '-90deg', opacity: 1 }, 0);
            $('#oauth .b1').velocity({ rotateY: '0deg', opacity: 1 }, { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b2 li').velocity('transition.perspectiveLeftIn', { stagger: 100, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b4').velocity('transition.swoopIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .balls').velocity('transition.fadeIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b3').hide();
            $('#oauth .b3').velocity('transition.slideUpIn', {delay: 1000, complete: resolve});
        }));

        return promise;
    };
    _.oauth.enter.right = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b1').velocity({ rotateY: '90deg', opacity: 1 }, 0);
            $('#oauth .b1').velocity({ rotateY: '0deg', opacity: 1 }, { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b2 li').velocity('transition.perspectiveRightIn', { stagger: 100, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b4').velocity('transition.swoopIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .balls').velocity('transition.fadeIn', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b3').hide();
            $('#oauth .b3').velocity('transition.slideUpIn', {delay: 1000, complete: resolve});
        }));

        return promise;
    };
    _.oauth.out.left = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b1').velocity({ rotateY: '-90deg', opacity: 0 }, { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b2 li').velocity('transition.perspectiveLeftOut', { stagger: 100, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b4').velocity('transition.swoopOut', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .balls').velocity('transition.fadeOut', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b3').velocity('transition.slideUpOut', resolve);
        }));

        return promise;
    };
    _.oauth.out.right = function(){
        var promise = [];

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b1').velocity({ rotateY: '90deg', opacity: 0 }, { complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b2 li').velocity('transition.perspectiveRightOut', { stagger: 100, backwards: true, complete: resolve });
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b4').velocity('transition.swoopOut', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .balls').velocity('transition.fadeOut', resolve);
        }));

        promise.push(new Promise(function( resolve, reject ){
            $('#oauth .b3').velocity('transition.slideUpOut', resolve);
        }));

        return promise;
    };

    _.queens = ['home', 'oauth'];
    _.active = 0;
    _.status = true; // 是否正在动画
    _.time = 0;
    _.section = function(){
        $('body').mousewheel(function(event){
            // up: 1, down: -1 [event.deltaY]
            if ( !_.status && new Date().getTime() - _.time > 3000 ){
                _.status = true;
                _.time = new Date().getTime();
                var cur = _.active;
                if ( event.deltaY > 0 ){
                    _.active--;
                    if ( _.active < 0 ){ _.active = _.queens.length - 1; };
                    console.log('up:', 'out{' + _.queens[cur] + '}', 'in{' + _.queens[_.active] + '}', 'active{' + _.active + '}');
                    $('#' + _.queens[_.active]).addClass('active');
                    Promise.all(
                        _[_.queens[cur]].out.right()
                            .concat( _[_.queens[_.active]].enter.left() )
                    ).then(function(){
                            $('#' + _.queens[cur]).removeClass('active');
                            _.status = false;
                        });
                }
                else if ( event.deltaY < 0 ){
                    _.active++;
                    if ( _.active >= _.queens.length ){ _.active = 0; };
                    console.log('down:', 'out{' + _.queens[cur] + '}', 'in{' + _.queens[_.active] + '}', 'active{' + _.active + '}');
                    $('#' + _.queens[_.active]).addClass('active');
                    Promise.all(
                        _[_.queens[cur]].out.left()
                            .concat( _[_.queens[_.active]].enter.right() )
                    ).then(function(){
                            $('#' + _.queens[cur]).removeClass('active');
                            _.status = false;
                        });
                }
            }
        });
    };

    window.resetCloud = function(){
        _.section();
        Promise.all(_.home.enter.left()).then(function(){
            _.status = false;
        });
    }
})();