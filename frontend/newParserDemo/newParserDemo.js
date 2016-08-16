/**
 * Created by sunshitao on 2016/8/16.
 */
var url = "http://localhost:1337/getParticle/sunst88";
$.ajax({
    url:url,
    type:"GET",
    dataType:"json",
    success:function(data){
        particlesJS('newParserDemo',data);
    }
})
