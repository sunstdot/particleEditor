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
      "awaitTime":1000,
      "await":true,
      "state":2
    },
    "life":{
      "value":15,
      "floatLife":8,
      "random":true,
      "anim":{
        "enable":true,
        "reduce_life":0.02,
        "state":2,
        "life_min":0
      }
    },
    "number":{
      "value":100,
      "density":{
        "enable":true,
        "value_area":800
      }
    },
    "size":{
      "value":0,
      "minVal":10,
      "maxVal":16,
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
      "speed":10,
      "random":true
    }
  },
  "entity":{
    "shape":{
      "type":"circle"
    },
    "position":{
      "x":1000,
      "y":160
    },
    "property":{
      "r":40,
      "width":80,
      "height":80,
      "state":1,
      "compositeOperation":"lighter",
      "color":"#FF0000"
    }
  }
})