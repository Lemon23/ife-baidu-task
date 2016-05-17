var some = $('some'); //半透明区域
var eject = $('eject'); //提示框区域
var right = $('right'); //确定按钮
var cancel = $('cancel'); //取消按钮
var deletel1 = $('deletel1'); //列表删除按钮
var deleteAll = $('deleteAll'); //全局删除按钮
var list = $('list'); //问卷列表区域
var add = $('add'); //创建新问卷按钮
var p = document.getElementsByTagName('p')[0]; //提示框文字区域

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
/*点击删除按钮显示半透明区域和登录框*/
addEvent(deletel1, "click", function(){
	p.innerHTML = "确定要删除此问卷？"
	some.style.display = "inline-block";
	eject.style.display = "inline-block";
});
addEvent(deleteAll, "click", function(){
	p.innerHTML = "确定要删除全部问卷？"
	some.style.display = "inline-block";
	eject.style.display = "inline-block";
});
/*点击创建新问卷按钮 链接到创建新问卷页面*/
addEvent(add, "click", function(){
	window.open("new.html");
});
