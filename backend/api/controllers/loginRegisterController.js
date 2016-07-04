/**
 * Created by sunshitao on 2016/6/27.
 *
 */
var co = require('co');
var md5 = require('blueimp-md5');
module.exports = {
  register:function(req,res){
    var username = req.param('username');
    var password = req.param('password');
    var email = req.param('email');
    console.log(username+"=====");
    var realPwd = md5(password);
    var create = function(db,obj){
      return new Promise(function(resolve,reject){
        db.create(obj).exec(function(err,created){
          if(err){
            reject(err);
          }
          resolve(created);
        })
      })
    }
    co(function* (){
       yield create(user,{username:username,password:realPwd,email:email});
    }).then(function(value){
      res.send({code:'A00000',data:value});
    },function(err){
      res.send({code:'A00001',err:err});
    });
  },
  /**
   * A00000 成功  A00001用户不存在 A00002 密码错误
   * @param req
   * @param res
   */
  login:function(req,res){
    var username = req.param('username');
    var password = md5(req.param('password'));
    var query = function(db,obj){
      return new Promise(function(resolve,reject){
        db.find(obj).exec(function(err,result){
          if(err){
            reject(err);
          }
          resolve(result);
        })
      })
    }
    co(function* (){
      yield query(user,{username:username})
    }).then(function(result){
      var pwd = result.password;
      if(pwd && pwd === password){
        res.send({code:'A00000'});
      }else{
        res.send({code:'A00002'});
      }
    },function(err){
       res.send({code:'A00001',err:err});
    });
  }
};
