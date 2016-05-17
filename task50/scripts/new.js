var addNew = $('addNew');

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

/*点击新建问卷按钮 链接到新问卷编辑页面*/
addEvent(addNew, "click", function(){
	window.open("edit.html");
});
