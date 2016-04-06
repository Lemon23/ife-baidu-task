window.onload = function () {
    (function (window, undefined) {
        var traversalResult = [];
        var first = document.getElementsByClassName("one")[0];
        var timer = null;
        var head = null;
        var preOrder = $("preOrder");
        var inOrder = $("inOrder");
        var postOrder = $("postOrder");
        var BFS = $("BFS");
        var choose = $("choose");
        /*
         添加事件$
         */
        function $(id) {
            return document.getElementById(id);
        }

        $.addEvent = function (element, event, listener) {
            if (element.addEventListener) {
                element.addEventListener(event, listener, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + event, listener);
            } else {
                element["on" + event] = listener;
            }
        };

        $.delegateEvent = function (element, tag, eventName, listener) {
            $.addEvent(element, eventName, function () {
                var event = arguments[0] || window.event,
                    target = event.target || event.srcElement;
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        };
        /*
         停止当前遍历，开始新的遍历
         */
        function reset() {
            if (traversalResult.length > 0) {        //如果队列非空即正在遍历
                head.style.backgroundColor = "#fff"; //清除蓝色
                traversalResult = [];                //清空队列
                clearTimeout(timer);                 //清除定时器
            }
        }
        /*
         先序、中序、后序和层次遍历
         */
        function getPreOrderResult(node) {
            reset();
            (function preOrder(node) {
                if(node !== null) {
                    traversalResult.push(node);
                    preOrder(node.firstElementChild);
                    preOrder(node.lastElementChild);
                }
            })(node);
            show();
        }
        function getInOrderResult(node) {
            reset();
            (function inOrder(node) {
                if(node !== null) {
                    inOrder(node.firstElementChild);
                    traversalResult.push(node);
                    inOrder(node.lastElementChild);
                }
            })(node);
            show();
        }
        function getPostOrderResult(node) {
            reset();
            (function postOrder(node) {
                if(node !== null) {
                    postOrder(node.firstElementChild);
                    postOrder(node.lastElementChild);
                    traversalResult.push(node);
                }
            })(node);
            show();
        }
        function BFSResult(node) {
            reset();
            (function BFS(node) {
                var queue = [];
                var p = null;
                if(node !== null) {
                    queue.push(node);
                }
                while (queue.length > 0) {
                    p = queue.shift();
                    traversalResult.push(p);
                    if (p.firstElementChild !== null) {
                        queue.push(p.firstElementChild);
                    }
                    if (p.lastElementChild !== null) {
                        queue.push(p.lastElementChild);
                    }
                }
            })(node);
            show();
        }
        /*
         显示颜色
         */
        function show() {
            head = traversalResult.shift();             //出列
            if (head) {
                head.style.backgroundColor = "#6699FF"; //显示蓝色
                timer = setTimeout(function () {
                    head.style.backgroundColor = "#fff";//使节点的蓝色变为白色
                    show();                             //递归调用show，使要显示的节点不停出列显示，直至为空
                }, 1000);
            }
        }
        /*
         绑定事件
         */
        $.delegateEvent(choose, "button", "click", startTraversal);
        function startTraversal() {
            if (this.id === "preOrder") {
                getPreOrderResult(first);
            } else if (this.id === "inOrder") {
                getInOrderResult(first);
            } else if (this.id === "postOrder"){
                getPostOrderResult(first);
            } else {
                BFSResult(first)
            }
        }
    })(window);
};
