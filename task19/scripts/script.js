/*
 *	数据存储
 */
var apiData = [];
var input = document.getElementById("input");
/*
 *	读取表单,并验证
 */

function getInput(){

	var inputText = input.value;
	if(!/^\s*\d+\s*$/.test(inputText)){
		alert("输入的不是合法数字!");
		input.focus();
		return false;
	}
	inputText = inputText.replace(/(^\s*)|(\s*$)/g, ""); //删除左右两端的空格

	if(apiData.length >= 60){
		alert("超过输入限制60个!");
		return false;
	}
	if(inputText < 10 || inputText > 100){
		alert("请输入10-100之间的数!");
		input.focus();
		return false;
	}
	return inputText;
}

/*
 *	左侧入
 */
function insertLeft(){
	var inputText = getInput();
	if(inputText === false) return;
	apiData.unshift(inputText);
	//渲染图表
	renderChart();
}
/*
 *	右侧入
 */
function insertRight(){
	var inputText = getInput();
	if(inputText === false) return;
	apiData.push(inputText);
	//渲染图表
	renderChart();
}
/*
 *	左侧出
 */
function deleteLeft(){
	if(apiData.length === 0){
		alert("已无数据！")
		return false;
	};
	//删除
	alert("删除‘"+apiData.shift()+"’！");
	//渲染图表
	renderChart();
}
/*
 *	右侧出
 */
function deleteRight(){
	if(apiData.length === 0){
		alert("已无数据！")
		return false;
	};
	//删除
	alert("删除‘"+apiData.pop()+"’！");
	//渲染图表
	renderChart();
}
/*
 *	点击删除
 */
function deleteThis(index){
	//删除
	apiData.splice(index,1);
	//渲染图表
	renderChart();
}
/*
 * 对data进行从小到大的排序
 * 返回一个排序后的数组
 */
var total = 0;
function sortAqiData() {
	var i = apiData.length -1
	var t;
	sortAqiData.moveOne = function(){
	    renderChart();
		var items = apiData[i] ;
	    var index = i ;
	    for(var j = 0 ; j < i ; j++){
	      if(total === 0 && apiData[j] > items ){
	        items = apiData[j] ;
	        index = j ;
	      }else if(total === 1 && apiData[j] < items ){
	      	items = apiData[j] ;
	        index = j ;
	      }
	    }
	    document.getElementById("api-display").childNodes[index].style.backgroundColor = "red";
		document.getElementById("api-chart").childNodes[index].style.backgroundColor = "red";
	    apiData.splice(index,1);
	    apiData.push(items);
	    i--;
	    if(i < 0) {
	    	clearInterval(t);
	    	renderChart();
	    	if(total === 0){
	    		total = 1;
	    	}else if(total === 1){
	    		total = 0;
	    	}
	    }
 	 }
	t = setInterval("sortAqiData.moveOne()", 50);
}
/*
 *	渲染图表
 */
function renderChart(){
	var api_display = document.getElementById("api-display");
	var api_chart = document.getElementById("api-chart");
	  //设定宽度
	var chartwidth = function(){
	    if(apiData.length <= 10){
	      return "50px";
	    }else if(apiData.length <= 30){
	      return "15px";
	    }else if(apiData.length > 30){
	      return "9px";
	    }
	}();
	//设置颜色
	var chartColor = function(height){
	    if(height >= 0 && height < 15){
	      return "#AA0000";
	    }else if(height >= 15 && height < 25){
	      return "#FF6633";
	    }else if(height >= 25 && height < 45){
	      return "#EEEE00";
	    }else if(height >= 45 && height < 65){
	      return "#00AA55";
	    }else if(height >= 65 && height < 80){
	      return "#00BBFF";
	    }else if(height >= 80 && height <= 100){
	      return "#9966FF";
	    }else{
	      return "gray";
	    }
	};
	api_chart.style.width = "628px";
	api_chart.style.height = "300px";
	api_chart.style.lineHeight = "600px";
	api_chart.style.textAlign = "center";
	api_chart.innerHTML = "";

	api_display.style.width = "628px";
	api_display.style.margin = "10px 0px 0px 0px";
	api_display.innerHTML = "";

	for(var i = 0 ; i < apiData.length ; i++){
		api_chart.innerHTML += "<span onclick=deleteThis("+i+") style='display:inline-block;margin-left:1px;width:" 
	                            + chartwidth + ";height:" 
	                            + apiData[i]*3 + "px;background-color:"
	                            + chartColor(apiData[i]) + ";cursor:pointer;'title='删除该项：NO." + i +"，值："+apiData[i]+ "'>";
		api_display.innerHTML += "<span onclick=deleteThis("+i+") title='删除该项：NO." + i+ "，值："+ apiData[i] + "' style='display:inline-block;cursor:pointer;background-color:"
								 + chartColor(apiData[i]) +";font-size:20px; color:#fff;height:30px;padding:0 10px;line-height:30px;margin:5px 0 5px 5px;'>"
								 + apiData[i] + "</span>";
	}
}
/*
 *	绑定按键事件
 */
function initBtnEvent(){
	var insert_left = document.getElementById("insert-left");
	var insert_right = document.getElementById("insert-right");
	var delete_left = document.getElementById("delete-left");
	var delete_right = document.getElementById("delete-right");
	var sort_aqi_data = document.getElementById("sort-aqi-data");

	insert_left.onclick = function(){insertLeft();};
	insert_right.onclick = function(){insertRight();};
	delete_left.onclick = function(){deleteLeft();};
	delete_right.onclick = function(){deleteRight();};
	sort_aqi_data.onclick = function(){sortAqiData();};
}
/*
 *	初始化赋值给apiData
 */
function initData(seed,num){
	if(seed < 10 && seed >100 && num < 0 && num >60) return console.log("Error!");
	apiData = [];
	for(var i = 0 ; i < num ; i++){
		apiData[apiData.length] =  Math.ceil(Math.random() * (seed-10) + 10);
	}
}
/*
 *	初始化
 */
function init(){
	initData(80, 45);
	initBtnEvent();
	renderChart();
}

init();
