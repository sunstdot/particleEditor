/**
 * Created by sunshitao on 2016/6/15.
 */
var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;
var co = require('co');
module.exports = {
  getParticle:function(req,res){
    //var objectId = new ObjectID(req.params.id);
    var name = req.params.id;
    var findOne = function(db,obj){
      return new Promise(function(resolve,reject){
         db.findOne(obj).exec(function(err,works){
           if(err) reject(err)
           resolve(works);
         })
      })
    }
    co(function* () {
      var particleObj = {};
      var works = yield findOne(work,{name:name});
      //var entityJson = yield findOne(entity,{name:works.entityName});
      //var particleJson = yield findOne(particle,{name:works.particleName});
      //if(entityJson){
      //  particleObj.entity = entityJson.value;
      //}
      //if(particle){
      //  particleObj.particles = particleJson.value;
      //}
      return works.particle;
    }).then(function (value) {
      if(typeof(value) === 'object'){
        res.send({code:'A00000',value:value});
      }
    }, function (err) {
      res.send({code:'A00001',err:err});
    });
  }
}
