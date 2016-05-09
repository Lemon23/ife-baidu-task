var some = $('some');
var action = $('action');
var title = $('title');
var right = $('right');
var cancel = $('cancel');
var click = $('click');

function $(id) {
	return document.getElementById(id);
}

/*添加事件绑定*/
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
	action.style.display = "none";
});
/*点击取消按钮时关闭登录框*/
addEvent(cancel, "click", function(){
	some.style.display = "none";
	action.style.display = "none";
});
/*点击clickme按钮显示半透明区域和登录框*/
addEvent(click, "click", function(){
	some.style.display = "inline-block";
	action.style.display = "inline-block";
});
