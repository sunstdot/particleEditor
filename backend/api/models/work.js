/**
 * Created by sunshitao on 2016/6/15.
 */
module.exports = {
  attributes:{
    workName:{
      type:'string',
      primaryKey:true,
      defaultsTo:function(){
        return (new Date()).getTime()+"particleWork";
      }
    },
    entityName:{
      type:'string'
    },
    particleName:{
      type:'string'
    }
  }
}
