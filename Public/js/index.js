function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};

window.onload = function () {
    //setIframeHeight(document.getElementById('rightFrame'));
    var hei = $("#leftFrame").height();//获取左侧菜单栏高度
    $("#rightFrame").css("height",hei);//赋值给右侧高度  scrolling="auto"----iframe超出高度滚动
};