var some = $('some'); //半透明区域
var eject = $('eject'); //提示框区域
var right = $('right'); //确定按钮
var cancel = $('cancel'); //取消按钮
var editDate = $('editDate'); //提示框中截止日期声明区域
var caption = $('caption'); //问卷标题区域
var title = $('title'); //编辑标题区域
var plus = $('plus'); //添加问题区域
var chose = $('chose'); //添加题目选择区域
var single = $('single'); //单选按钮
var multiple = $('multiple'); //多选按钮
var text = $('text'); //文本题按钮
var question = $('question'); //问题生成区域
var daytime = $('daytime'); //问卷截止日期区域
var keep = $('keep'); //保存问卷按钮
var issue = $('issue'); //发布问卷按钮
var h1 = document.getElementsByTagName('h1')[0]; //标题区域
var i = 1;
var def = new Date();
daytime.value = def.getFullYear() + "-" + def.getMonth() + "-" + def.getDate();
/*获取ID函数*/
function $(id) {
	return document.getElementById(id);
}
/*添加事件绑定函数*/
function addEvent(element, event, listener) {
	if (element.addEventListener) {
        element.addEventListener(event, listener);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

/*点击半透明区域时关闭登录框*/
addEvent(some, "click", function(){
	some.style.display = "none";
	eject.style.display = "none";
});

/*点击取消按钮时关闭登录框*/
addEvent(cancel, "click", function(){
	some.style.display = "none";
	eject.style.display = "none";
});

/*点击发布问卷按钮 弹出提示框*/
addEvent(issue, "click", function(){
	editDate.innerHTML = "( 此问卷截止日期为 "+ daytime.value +" )";
	some.style.display = "inline-block";
	eject.style.display = "inline-block";
});

/*点击标题可编辑*/
addEvent(caption, "click", function(){
	title.style.display = "inline-block";
	h1.style.display = "none";
	title.focus();
});

/*编辑框失焦可更改标题*/
addEvent(title, "blur", function(){
	title.style.display = "none";
	h1.style.display = "inline-block";
	h1.innerHTML = title.value;
});

/*添加问题出现选项*/
addEvent(plus, "click", function(){
	chose.style.display = "inline-block";
});

/*点击单选按钮后 向问卷添加一道单选题*/
addEvent(single, "click", function(){
	newNode = document.createElement("div");
	newNode.id = "list" + i;
	newNode.innerHTML = "<h3>Q" + i + " 单选题</h3><input class='editQuestion' type='text' /><h5>点击编辑问题</h5><form action='' method='post'><p><input type='radio' name='q" + i +"' />" + " 选择一" + "</p><p><input type='radio' name='q" + i + "' />" + " 选择二" + "</p></form><input class='deleteInput' type='button' value='" + "x" + "' />";
	question.insertBefore(newNode, null);
	var count = 1;
	addEvent(newNode, "mouseover", function(){	
		deleteInput = this.lastChild;
		deleteInput.style.display = "inline-block";
		addEvent(deleteInput, "click", function(){
			this.parentNode.parentNode.removeChild(this.parentNode);
			i--;
		});
		p = this.childNodes[2];
		editQuestion = this.childNodes[1];
		addEvent(p, "click", function(){
			p.style.display = "none";
			editQuestion.style.display = "block";
			editQuestion.focus();
		});
		addEvent(editQuestion, "blur", function(){
			p.style.display = "inline-block";
			editQuestion.style.display = "none";
			p.innerHTML = editQuestion.value;
		});
	});
	addEvent(newNode, "mouseout", function(){
		deleteInput.style.display = "none";
	});
	i++;
});

/*点击多选按钮后 向问卷添加一道多选题*/
addEvent(multiple, "click", function(){
	newNode = document.createElement("div");
	newNode.id = "list" + i;
	newNode.innerHTML = "<h3>Q" + i + " 多选题</h3><input class='editQuestion' type='text' /><h5>点击编辑问题</h5><form action='' method='post'><p><input type='checkbox' name='q" + i +"'/>" + "选择一" + "</p><p><input type='checkbox' name='q" + i + "'/>" + "选择二" + "</p><p><input type='checkbox' name='q" + i +"'/>" + "选择三" + "</p><p><input type='checkbox' name='q" + i +"'/>" + "选择四" + "</p></form><input class='deleteInput' type='button' value='" + "x" + "' />";
	question.insertBefore(newNode, null);
	var count = 1;
	addEvent(newNode, "mouseover", function(){	
		deleteInput = this.lastChild;
		deleteInput.style.display = "inline-block";
		addEvent(deleteInput, "click", function(){
			this.parentNode.parentNode.removeChild(this.parentNode);
			i--;
		});
		p = this.childNodes[2];
		editQuestion = this.childNodes[1];
		addEvent(p, "click", function(){
			p.style.display = "none";
			editQuestion.style.display = "block";
			editQuestion.focus();
		});
		addEvent(editQuestion, "blur", function(){
			p.style.display = "inline-block";
			editQuestion.style.display = "none";
			p.innerHTML = editQuestion.value;
		});
	});
	addEvent(newNode, "mouseout", function(){
		deleteInput.style.display = "none";
	});
	i++;
});

/*点击文本按钮后 向问卷添加一道文本题*/
addEvent(text, "click", function(){
	newNode = document.createElement("div");
	newNode.id = "list" + i;
	newNode.innerHTML = "<h3>Q" + i + " 文本题</h3><input class='editQuestion' type='text' /><h5>点击编辑问题</h5><textarea class='area' cols=60 rows=5 name='text'></textarea><input class='deleteInput' type='button' value='" + "x" + "' />";
	newNode.style.height = "170px";
	question.insertBefore(newNode, null);
	var count = 1;
	addEvent(newNode, "mouseover", function(){	
		deleteInput = this.lastChild;
		deleteInput.style.display = "inline-block";
		addEvent(deleteInput, "click", function(){
			this.parentNode.parentNode.removeChild(this.parentNode);
			i--;
		});
		p = this.childNodes[2];
		editQuestion = this.childNodes[1];
		addEvent(p, "click", function(){
			p.style.display = "none";
			editQuestion.style.display = "block";
			editQuestion.focus();
		});
		addEvent(editQuestion, "blur", function(){
			p.style.display = "block";
			editQuestion.style.display = "none";
			p.innerHTML = editQuestion.value;
		});
	});
	addEvent(newNode, "mouseout", function(){
		deleteInput.style.display = "none";
	});
	i++;
});
