/**
 * Created by sunshitao on 2016/5/17.
 */
function* fibo(){
    let a = 0;
    let b = 1;
    yield a;
    yield b;
    while(true){
        let next=a+b;
        a = b;
        b = next;
        yield next;
    }
}
let generator = fibo();
function test1(){
    var str = "";
    var show1Dom = document.getElementById("show1");
    for(var i=0;i<10;i++){
        str += i+"-----"+generator.next().value+"-----<br>";
        show1Dom.innerHTML = str;
    }
}
let str = "";
function* run(){
    console.log("step in child Process-");
    var b = yield "running";
    console.log(b +"------the b");
    console.log("step out child process- ");
}
var runGenerator =run();
function* start(){
    var a  = yield "start";
    console.log(a);
    var childValue = yield *runGenerator;
    console.log(childValue)
    var c = yield "end";
    console.log(c);
    return "over"
}
function test2(){
    var it = start();
    var show2Dom = document.getElementById("show2");
    str += JSON.stringify(it.next())+"------<br>";
    str += JSON.stringify(it.next(22))+"------<br>";
    str += JSON.stringify(it.next(333))+"------<br>";
    str += JSON.stringify(it.next(4444))+"------<br>";
    str += JSON.stringify(it.next(55555))+"------<br>";
    show2Dom.innerHTML = str;
}

