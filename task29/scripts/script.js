var inputName = document.getElementsByTagName('input')[0];
var p = document.getElementsByTagName('p')[0];
function countLength(str){
	var inputLength = 0;
	for(var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if(countCode >= 0 && countCode <= 128) {
			inputLength += 1;
		} else {
			inputLength += 2;
		}
	}
	return inputLength;
}
document.getElementsByTagName('button')[0].onclick = function(){
	var inputValue = inputName.value;
	if(countLength(inputValue) == 0){
		p.innerHTML = '姓名不能为空';
		p.style.color = 'red';
		inputName.style.border = '1px solid red';
	} else if(countLength(inputValue) > 3 && countLength(inputValue) < 17) {
		p.innerHTML = '格式正确';
		p.style.color = 'green';
		inputName.style.border = '1px solid green';
	} else {
		p.innerHTML = '格式不正确';
		p.style.color = 'red';
		inputName.style.border = '1px solid red';
	}
}
