window.onload = function(){
  (function(){
  	//构造函数
	function GetListObj(divContainer){
		this.items = [];
		this.paint = function(){
			var str = this.items.reduce(function(s, v){
										return s + "<div>" + v + "</div>"}, "");
			divContainer.innerHTML = str;
			addDivEvent(divContainer, this);
		}
	}
	GetListObj.prototype.del = function(str){
		this.items.splice(str, 1);
		this.paint();
	}
	GetListObj.prototype.push = function(str){
		this.items.push(str);
	}
	GetListObj.prototype.unshift = function(str){
		this.items.unshift(str);
	}
	GetListObj.prototype.pop = function(){
		this.items.pop();
	}
	GetListObj.prototype.shift = function(){
		this.items.shift();
	}
	var tag = document.getElementById("tag");
	var hobby = document.getElementById("hobby");
	var list = new GetListObj(tag);
	var hobbyList = new GetListObj(hobby);
	//绑定事件
	var tagInput = document.getElementById("tagInput");
	tagInput.onkeyup = updateTag;
	var hobbyInput = document.getElementById("hobbyInput");
	var hobbyBtn = document.getElementById("hobbyBtn");
	hobbyBtn.onclick = updateHobby;
	//重新绑定div的事件
	function addDivEvent(divContainer, list){
		var btn = divContainer.getElementsByTagName("div");
		for(var i = 0; i < btn.length; i++){
			btn[i].onclick = function(i){
				return function(){
					return list.del(i);
				}
			}(i)
		}
	}
	//更新兴趣爱好
	function updateHobby(){
 		var arr = hobbyInput.value
 				  .split(/,|，|`|、| |　|\t|\r|\n/)
		   		  .filter(function(a){return a})
		   		  .forEach(function(value){
		   		  	if(hobbyList.items.indexOf(value) === -1){
		   		  		hobbyList.push(value);
		   		  		if(hobbyList.items.length > 10) hobbyList.shift();
		   		  	}
		   		  });
		hobbyInput.value = "";
		hobbyList.paint();
	}
	//在每次遇到空格，回车，逗号时，更新tag
	function updateTag(e){
		var str = this.value;
		if(/(,| |\，)$/.test(str) || e.keyCode === 13){
			var newTag = str.match(/(^[^,\， ]*)/)[0]
			if(list.items.indexOf(newTag) === -1 && newTag !== ""){
				list.push(newTag);
				if(list.items.length > 10){
					list.shift();
				}
				list.paint();
			}
			this.value = "";
		}
	}
  })();	
}
