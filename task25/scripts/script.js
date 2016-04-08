/*
 添加事件
 */
function addHandler(element, type, handler) {
    if(element.addEventListener) {
        addHandler = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function(element, type, handler) {
            element.attachEvent("on"+type, handler);
        };
    } else {
        addHandler = function(element, type, handler) {
            element["on"+type] = handler;
        };
    }
    return addHandler(element, type, handler);
};

function getTarget(event) {
    event = event || window.event;
    return event.target || event.srcElement;
};
/*
 取消默认事件
 */
function preventDefault(event) {
    if(event.preventDefault) {
        preventDefault = function(event) {
            event.preventDefault;
        }
    } else {
        preventDefault = function(event) {
            event.returnValue = false;
        }
    }
    return preventDefault(event);
};

function init(queue, lin) {
    var randHeight, i, input = document.querySelector("input");
    queue.innerHTML = "";
    for(var i = 0; i < 10; i++) {
        input.value = Math.floor(Math.random() * 90) + 10;
        lin.click();
    }
};

function trim(word) {
    return word.replace(/^\s+|\s+$/g,"");
};

(function() {
    var treeWalker = new TreeWalker(),
        btns = document.getElementById("button"),
        preBtn = document.getElementById("preBtn"),
        postBtn = document.getElementById("postBtn"),
        searchBtn = document.getElementById("searchBtn"),
        deleteBtn = document.getElementById("deleteBtn"),
        addBtn = document.getElementById("addBtn"),
        root = document.querySelector(".root");
    /*
     绑定按键事件
     */
    addHandler(preBtn, "click", function() {
        treeWalker.preOrder(root);
        treeWalker.animation();
    });
    addHandler(postBtn, "click", function() {
        treeWalker.postOrder(root);
        treeWalker.animation();
    });
    addHandler(searchBtn, "click", function() {
        var keyword = document.querySelector("#keyword").value;
        if(keyword == "") {
            alert("输入关键字啊！！不然我要查找什么！！大笨蛋！！！");
            return;
        }
        treeWalker.findText(root);
        treeWalker.isFinding = true;
        treeWalker.animation();
    });
    addHandler(deleteBtn, "click", function() {
        if(!treeWalker.isWalking) {
            treeWalker.deleteNode();
        }
    });
    addHandler(addBtn, "click", function() {
        if(!treeWalker.isWalking) {
            treeWalker.addNode();
        }
    });
    addHandler(root, "click", function(event) {
        var target = getTarget(event);
        treeWalker.focusNode.id = "";
        treeWalker.focusNode = target;
        treeWalker.focusNode.id = "focusNode";
    });
})();

function TreeWalker() {
    this.stack = [];
    this.queue = [];
    this.isWalking = false;
    this.isFinding = false;
    this.found = false;
    this.root = document.querySelector(".root");
    this.focusNode = this.root;
};

TreeWalker.prototype.preOrder = function(node) {
    var tempNode = node.firstElementChild || null;
    this.stack.push(node);
    while(tempNode) {
        this.preOrder(tempNode);
        tempNode = tempNode.nextElementSibling;
    }
};

TreeWalker.prototype.postOrder = function(node) {
    var tempNode = node.firstElementChild || null;
    while(tempNode) {
        this.postOrder(tempNode);
        tempNode = tempNode.nextElementSibling;
    }
    this.stack.push(node);
};

TreeWalker.prototype.findText = function(node) {
    if(!node || node.tagName != "DIV") {
        return false;
    }
    this.stack.push(node);
    this.queue.push(node);
    this.findText(node.nextElementSibling);
    node = this.queue.shift();
    this.findText(node.firstElementChild);
};

TreeWalker.prototype.animation = function() {
    var stack = this.stack,
        keyword = document.querySelector("#keyword").value,
        iter = 0,
        self = this,
        timer;

    self.stack = [];
    if(!self.isWalking) {
        self.found = false;
        self.isWalking = true;
        stack[iter].style.backgroundColor = "#D1BBFF";
        timer = setInterval(function() {
            if(iter == stack.length-1) {
                stack[iter].style.backgroundColor = "#fff";
                if(self.isFinding && !self.found) {
                    alert("找不到找不到！你搜的是什么东东～哼！找不到啦～！！");
                }
                self.isWalking = false;
                self.isFinding = false;
                clearInterval(timer);
            } else {
                ++iter;
                stack[iter-1].style.backgroundColor = "#fff";
                stack[iter].style.backgroundColor = "#D1BBFF";
            }
            if(self.isFinding) {
                if(stack[iter].innerHTML.split(/\W+/g)[0] == keyword) {
                    var findNode = stack[iter];
                    self.found = true;
                    setTimeout(function() {
                        findNode.style.backgroundColor = "#AAAAAA";
                    }, 500);
                }
            }
        }, 500);
    }
};

TreeWalker.prototype.deleteNode = function() {
    if(this.focusNode && this.focusNode != this.root) {
        this.focusNode.parentNode.removeChild(this.focusNode);
    } else if (this.root.id != "") {
        alert("根节点是不能删除滴～不然我们都不见了😱好可怕～");
    }
};

TreeWalker.prototype.addNode = function() {
    var nodeTag = trim(document.querySelector("#nodeTag").value), newNode;
    if(nodeTag == "") {
        alert("输入节点内容啊！😤不然我要做些什么！！");
    } else if (this.focusNode) {
        newNode = document.createElement("div");
        newNode.id = "new"
        newNode.innerHTML = nodeTag;
        if(this.focusNode == this.root && !this.root.id) {
            return false;
        }
        this.focusNode.appendChild(newNode);
        newNode.id = "new";
    }
};
