
var http = require("http");
var url = require("url");
var path = require("path");

var looper = require('./looper.js');
var stopWatch = require('./stopWatch.js').stopWatch;

var sw = new stopWatch('process.nextTick Test');
 

// var _i = 0;
// function run(l,i){
// 	var timeout = 1000+(Math.random()*1000);
// 	setTimeout(
// 		function(){
// 			_i++;
// 			console.log("index:"+i+" : runing:"+l.runing+"\tcomplated:"+_i + "\ttimeout:"+timeout);
// 			l.callback(i);
// 		},
// 		timeout);
// };
// setTimeout 方法开始
// sw.start("setTimeout");
// looper.create({name:"queue1",end:100,max:10},run,function(){
// 	sw.stop();
// 	// console.log(sw.getRecord());
// }).run();

// looper.each(0,100,10,run,function(){
// 	sw.stop();
// 	console.log(sw.getRecord());
// });



var getHtml = function(l,index){
		var _url  = "http://res.img.ifeng.com/2012/0620/wm_6d5a038f3b8eff4f4da642d27bf29c19.jpg";//"http://www.baidu.com/";//
		var options =  url.parse(_url);
		options.headers = {'cookie':"_"};
		options.method = 'GET';
		var req =http.request(options, function(res) {
			var html = "";	
			res.on('data', function (data) {
				html+=data.toString();
			});
			res.on('end', function() {
				console.log("complate\t:"+index+" : runing:"+l.runing);
				l.callback(index);
			});
		}).on('error', function(e) {
		  console.log("error\t"+index+"\t:" + e.message);
		  l.callback(index);
		});
		req.end();
		console.log("req\t\t:"+index);
};
 
looper.each(0,100,10,getHtml,function(){
	sw.stop();
	console.log(sw.getRecord());
});

 