/**
 * Created by sunshitao on 2016/6/12.
 */

var jsonUrl = "http://localhost:1337/getParticle/57693bf611f8ba7019b7daa6";


    $.ajax({
        url:jsonUrl,
        type:'GET',
        success:function(value){
            console.log(JSON.stringify(value));
            particlesJS("particle-js",value);
        }
    })
