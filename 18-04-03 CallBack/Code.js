function test(cb){
    setTimeout(function(){
        cb("hi");
    }, 2000);
}
console.log("Begin");
test(console.log);
console.log("End");
