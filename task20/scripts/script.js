function leftIn() {
  var text = document.getElementById("text-in").value.trim();
  if(!text){ alert("请输入内容！"); }else{
    var show = document.getElementById("show");
    var list = text.split(" ");
    for(var len = list.length-1; len >= 0; len--){
      show.innerHTML = "<span data-text=" +list[len]+ ">"+list[len]+"</span>"+show.innerHTML;
    }
  }
  document.getElementById("text-in").value = "";
}

function rightIn() {
  var text = document.getElementById("text-in").value.trim();
  if(!text){ alert("请输入内容！"); }else{
    var show = document.getElementById("show");
    var list = text.split(" ");
    for(var x = 0,len = list.length; x < len; x++){
      show.innerHTML += "<span data-text=" +list[x]+ ">"+list[x]+"</span>";
    }
  }
  document.getElementById("text-in").value = "";
}

function leftOut() {
  var show = document.getElementById("show");
  var del = show.getElementsByTagName("span");
  if(del.length){
    alert(del[0].innerHTML);
    show.removeChild(del[0]);
  }
}

function rightOut() {
  var show = document.getElementById("show");
  var del = show.getElementsByTagName("span");
  if(del.length){
    alert(del[del.length-1].innerHTML);
    show.removeChild(del[del.length-1]);
  }
}

function spanOnclick(target){
  alert(target.innerHTML);
  target.parentNode.removeChild(target);
}

function find() {
  var text = document.getElementById("find-text").value.trim();
  var show = document.getElementById("show");
  var del = show.getElementsByTagName("span");
  for(var y = 0,len = del.length; y < len; y++){
    del[y].style.background = "red";
  }
  for(var y = 0,len = del.length; y < len; y++){
    if (del[y].innerHTML.indexOf(text) >= 0) {
      del[y].style.background = "#610000";
    }
  }
  document.getElementById("find-text").value = "";
}

var show = document.getElementById("show");

show.addEventListener("click", function(event){
  if(event.target.nodeName.toLowerCase() === 'span')
    spanOnclick.call(null, event.target);
},false);
