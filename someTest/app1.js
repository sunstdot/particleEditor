/**
 * Created by sunshitao on 2016/6/12.
 */

var jsonUrl = "http://localhost:1337/getParticle/sunst75";


    // $.ajax({
    //     url:jsonUrl,
    //     type:'GET',
    //     success:function(data){
    //         console.log(JSON.stringify(data));
    //         particlesJS("particle-js",data.value);
    //     }
    // })

particlesJS("particle-js",{
  "particles":{
    "shape":{
      "type":"circle",
      "stroke":{
        "width":0,
        "color":""
      }
    },
    "position":{
      "x":1000,
      "y":60
    },
    "property":{
      "compositeOperation":"destination-over",
      "repeat":true,
      "state":0
    },
    "life":{
      "value":15,
      "floatLife":8,
      "random":true,
      "anim":{
        "enable":true,
        "reduce_life":0.02,
        "life_min":0
      }
    },
    "number":{
      "value":20,
      "density":{
        "enable":true,
        "value_area":800
      }
    },
    "size":{
      "value":0,
      "minVal":5,
      "maxVal":8,
      "random":true,
      "anim":{
        "enable":true,
        "speed":40,
        "size_min":0
      }
    },
    "color":{
      "value":"FFB90F"
    },
    "opacity":{
      "value":0.5,
      "random":false
    },
    "move":{
      "enable":true,
      "speedX":0,
      "speedY":-15,
      "floatSpeedX":5,
      "floatSpeedY":10,
      "random":true
    }
  },
  "entity":{
    "shape":{
      "type":"text"
    },
    "position":{
      "x":1000,
      "y":100
    },
    "property":{
      "width":60,
      "height":30,
      "value":"大帝都",
      "font":"16px Microsoft Yahei",
      "color":"#FFF",
      "state":1
    }
  }
})