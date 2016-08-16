/**
 * Created by sunshitao on 2016/6/14.
 */
var co = require('co');
module.exports = {

  uploadParticles:function(req,res){
    if(req.method === "POST"){
      var body = req.body;
      var data = JSON.parse(body.particle);
      var num = Math.ceil(Math.random()*100);
      var workName = body.particleName+num;

      //var entityJson = data.entity,particleJson = data.particles;

      //var entityName = 'entity_'+workName,particleName = 'particle_'+workName;
      var referer = req.headers.host;
      console.log("============="+referer);

      var create = function(db,obj){
        return new Promise(function(resolve,reject){
          db.create(obj).exec(function (err,created){
            if(err){
              reject(err);
            }
            resolve(created);
          })
        })
      };

      co(function* (){
        //var workCreated = yield create(work,{name:workName,entityName:entityName,particleName:particleName});
        var workCreated = yield create(work,{name:workName,particle:data});
        //if(particleJson){
        //  yield create(particle,{name:particleName,value:particleJson});
        //}
        //if(entityJson){
        //  yield create(entity,{name:entityName,value:entityJson});
        //}
        return workCreated;
      }).then(function(value){
          res.send({code:'A00000',url:referer+'/getParticle/'+value.name});
      },function(err){
        res.send({code:'A00001',err:err});
      });
    }
  }
}
