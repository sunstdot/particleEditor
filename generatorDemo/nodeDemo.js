/**
 * Created by sunshitao on 2016/5/17.
 */
var fs = require("fs");
var thunkify = require('thunkify');
var fileRead = thunkify(fs.readFile);

function* readTestFile(){
    var a= yield fileRead("./test1.txt","utf-8");
    console.log(a);
    var b = yield fileRead("./test2.txt","utf-8");
    console.log(b);
}
function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
var it = readTestFile();
run(readTestFile);

