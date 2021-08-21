function ajax(method, url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(request);
                }
            }
        };
        request.send();
    });
}
ajax("get", "http://qq.com:8888/friends.json").then((response) => {
    console.log(response);
});

// 封装jsonp
function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = "frankJSONPCallbackName" + Math.random();
        window[random] = (data) => {
            resolve(data);
        };
        const script = document.createElement("script"); // 创建script标签
        script.src = `${url}?callback=${random}`; // 动态引用js文件
        script.onload = () => {
            // 每执行一次就会多一个script标签，为了不让script堆积，所以每执行完一次就删除
            script.remove();
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });
}

jsonp("http://qq.com:8888/friends.js").then((data) => {
    console.log(data);
});
