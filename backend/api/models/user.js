/**
 * Created by sunshitao on 2016/6/27.
 */
module.exports = {
  attributes:{
    userName:{
      type:"string",
      primaryKey:true,
      unique:true
    },
    nickName:{
      type:"string",
      defaultsTo:function(){
        return (new Date()).getTime();
      }
    },
    password:{
      type:"string"
    },
    mailBox:{
      type:"string",
      unique:true
    }
  }
}
