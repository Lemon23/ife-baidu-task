window.onload = function () {
    (function (window, undefined) {
        var traversalResult = [];
        var first = document.getElementsByClassName("one")[0];
        var timer = null;
        var head = null;
        var search = $("search");
        var choose = $("choose");
        var text = "";
        var found = false;
        var startTime = 0,
            endTime = 0;
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
            if (traversalResult.length > 0) {       //如果队列非空即正在遍历
                startTime = 0;
                endTime = 0;
                found = false;
                text = "";
                head.style.backgroundColor = "#fff";//清除残留蓝色
                traversalResult = [];               //清空队列
                clearTimeout(timer);                //清除定时器
            }
        }
        /*
         模拟二叉树先序的深度优先搜索
         */
        function preDFS(node) {
            var temp = null;
            reset();
            (function DFS(node) {
                var p = null;
                if(node) {
                    traversalResult.push(node);
                    DFS(node.firstElementChild);
                    if (node.firstElementChild) {
                        temp = node.firstElementChild.nextElementSibling;
                        while (temp) {
                            p = temp;
                            DFS(temp);
                            temp = p.nextElementSibling;
                        }
                    }
                }
            })(node);
            render();
        }
        /*
         模拟二叉树中序的深度优先搜索
         */
        function inDFS(node) {
            var temp = null;
            reset();
            (function DFS(node) {
                var p = null;
                if(node) {
                    DFS(node.firstElementChild);
                    traversalResult.push(node);
                    if (node)
                    if (node.firstElementChild) {
                        temp = node.firstElementChild.nextElementSibling;
                        while (temp) {
                            p = temp;
                            DFS(temp);
                            temp = p.nextElementSibling;
                        }
                    }
                }
            })(node);
            render();
        }
        /*
         模拟二叉树后序的深度优先搜索
         */
        function postDFS(node) {
            var temp = null;
            reset();
            (function DFS(node) {
                var p = null;
                if(node) {
                    DFS(node.firstElementChild);
                    if (node.firstElementChild) {
                        temp = node.firstElementChild.nextElementSibling;
                        while (temp) {
                            p = temp;
                            DFS(temp);
                            temp = p.nextElementSibling;
                        }
                    }
                    traversalResult.push(node);
                }
            })(node);
            render();
        }
        /*
        广度优先搜索
         */
        function BFSResult(node) {
            reset();
            (function BFS(node) {
                var queue = [];
                var p = null;
                if(node) {
                    queue.push(node);
                }
                while (queue.length > 0) {
                    p = queue.shift();
                    traversalResult.push(p);
                    if (p.firstElementChild) {
                        queue.push(p.firstElementChild);
                        p = p.firstElementChild;
                        while (p.nextElementSibling) {
                            queue.push(p.nextElementSibling);
                            p = p.nextElementSibling;
                        }
                    }
                }
            })(node);
            render();
        }
        /*
         显示颜色
         */
        function trim(str) {
            return str.replace(/^\s+|\s+$/g, "");
        }
        function render() {
            if (search.value !== "") {
                searchShow();
            } else {
                onlyShow();
            }
        }
        function searchShow() {
            if (traversalResult.length === 0 && !found) {
                alert("没有找到诶😞～！");
            }
            head = traversalResult.shift(); //出列
            if (head) {
                text = head.firstChild.nodeValue;
                if (trim(text) === search.value) {
                    head.style.backgroundColor = "#AAAAAA";
                    found = true;
                    endTime = new Date();
                    alert("哈哈～被我找到啦！\n查询时间为：" + (endTime - startTime) / 1000 + "s");
                    return;
                } else {
                    head.style.backgroundColor = "#6699FF"; //显示蓝色
                    timer = setTimeout(function () {
                        head.style.backgroundColor = "#fff";//使节点的蓝色变为白色
                        searchShow();                       //递归调用，使要显示的节点不停出列显示，直至为空
                    }, 800);
                }
            }
        }
        function onlyShow() {
            head = traversalResult.shift();             //出列
            if (head) {
                head.style.backgroundColor = "#6699FF"; //显示蓝色
                timer = setTimeout(function () {
                    head.style.backgroundColor = "#fff";//使节点的蓝色变为白色
                    onlyShow();                         //递归调用，使要显示的节点不停出列显示，直至为空
                }, 800);
            }
        }
        /*
         绑定事件
         */
        $.delegateEvent(choose, "button", "click", startTraversal);
        function startTraversal() {
            startTime = new Date();
            if (this.id === "preDFS") {
                preDFS(first);
            } else if (this.id === "inDFS") {
                inDFS(first);
            } else if (this.id === "postDFS") {
                postDFS(first);
            } else {
                BFSResult(first);
            }
        }
        /*
         获得焦点后自动清空内容
         */
        $.addEvent(search, "focus", function () {
            this.value = "";
        });
    })(window);
};
