function gif_init() {
    //显示加载动画
    document.body.classList.add("noscroll");
    document.getElementById("loading").style.display = "flex";
    // loader.css("display", "flex");
    //调用ajax发送请求
    // esdpec.framework.core.getJsonResult('common/getalarmtree', function (res) {
    //     //请求成功后再次隐藏加载动画
    //     $(".gif").css("display", "none");
    // })
    setTimeout(function () {
        document.getElementById("loading").style.display = "none";
        document.body.classList.remove("noscroll");
    }, 1000);
}