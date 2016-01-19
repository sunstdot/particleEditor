/**
 * Created by sunshitao on 2016/1/19.
 */
$("#textureValue a").bind('click',function(){
    var text = $(this).text();
    var qShowDom = $('#showTexture');
    qShowDom.html(text);
    //todo触发事件在画布中绘制选中的纹理图形
});