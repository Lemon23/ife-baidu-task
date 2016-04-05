(function(){
  var list=[];
  var input=document.getElementById("input");
  document.getElementById("left-in").addEventListener("click",function(){
    if(regNumber(input.value)) {
      list.unshift(input.value);
    }
    outPut();
  });
  document.getElementById("right-in").addEventListener("click",function(){
    if(regNumber(input.value)) {
      list.push(input.value);
    }
    outPut();
  });
  document.getElementById("left-out").addEventListener("click",function(){
    var temp=list.shift();
    alert(temp);
    outPut();
  });
  document.getElementById("right-out").addEventListener("click",function(){
    var temp=list.pop();
    alert(temp);
    outPut();
  });
  document.getElementById("text").addEventListener("click",function(event){
    var index=event.target.getAttribute("id");
    if(index.toLowerCase()!="text"){
      list.splice(index, 1);
    }
    outPut();
  });
/*
 * 检测是否为数字
 */
function regNumber(value){
  var reg=/^[0-9]+$/;
  return reg.test(value);
}
/*
 * 输出数组
 */
function outPut(){
  var str="";
  list.forEach(function(m, n){
    str+="<span class='number' id='"+n+"'>"+m+"</span>";
  })
  document.getElementById("text").innerHTML=str;
  }
})()
