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
    console.log("======="+JSON.stringify(req.body));
    var body = req.body;
    var username = body.name;
    console.log('-------'+username);
    var password = body.password;
    var query = function(db,obj){
      return new Promise(function(resolve,reject){
        db.find(obj).exec(function(err,result){
          if(err){
            reject(err);
          }
          resolve(result);
        })
      })
    };
    var create=(db,obj)=>{
      return new Promise(function(resolve,reject){
        db.create(obj).exec(function(err,created){
          if(err){
            reject(err);
          }
          resolve(created);
        })
      })
    };

    var insertUser = ()=>{
      co(function* (){
        yield create(user,{username:username,password:password});
      }).then(function(value){
        console.log(value);
        res.send({code:'A00000',data:value});
      },function(err){
        res.send({code:'A00001',err:err});
      });
    };

    co(function* (){
      yield query(user,{username:username})
    }).then(function(result){
      if(result && result.password && result.password === password){
        res.send({code:'A00000'});
      }else{
        insertUser();
      }
    },function(err){
      insertUser();
    });
  }
};
