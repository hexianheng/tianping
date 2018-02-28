/**
 * Created by y on 2018/1/16.
 */
var sleep = 60, interval = null;
window.onload = function ()
{
    var btn = document.getElementById ('btn');
    btn.onclick = function ()
    {
        if (!interval)
        {
            this.style.backgroundColor = 'rgb(127, 127, 127)';
            this.disabled = "disabled";
            this.style.cursor = "wait";
            this.value = "重新发送 (" + sleep-- + ")";
            interval = setInterval (function ()
            {
                if (sleep == 0)
                {
                    if (!!interval)
                    {
                        clearInterval (interval);
                        interval = null;
                        sleep = 60;
                        btn.style.cursor = "pointer";
                        btn.removeAttribute ('disabled');
                        btn.value = "获取验证码";
                        btn.style.backgroundColor = '';
                    }
                    return false;
                }
                btn.value = "重新发送 (" + sleep-- + ")";
            }, 1000);
        }
    }
}
