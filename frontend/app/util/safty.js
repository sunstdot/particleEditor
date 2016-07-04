/**
 * 网站安全工程
 * Created by sunshitao on 2016/6/29.
 */
/**
 * 加盐
 * @param str
 */
const SALT = "nidaye";

export function salt(str,type){
    if(!type) type="epilogue";
    if(type==="preorder"){
        return SALT+str;
    }else if(type === "epilogue"){
        return str+SALT;
    }
}