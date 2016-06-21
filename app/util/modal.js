/**
 * Created by sunshitao on 2016/6/15.
 */
export default function modal(data){
    var bg = document.createElement("div");
    bg.className = "modalBg";
    bg.innerHTML = '<div class="">'+
                        '<div><h2 id="modalTitle">'+data.content+'</h2></div>'+
                    '</div>';
    document.appendChild(bg);
}