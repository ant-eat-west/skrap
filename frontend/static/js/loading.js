function Loading() {
    var el = document.createElement('div');
    el.className = 'app-loading';
    var style = document.createElement('style');
    style.innerText = "html,body{margin:0;padding:0;width:100%;height:100%}.app-loading{content:'';width:0;height:2px;background:#2d84fb;color:white;font-size:12px;text-align:center;position:fixed;top:0;left:0;font-family:'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;z-index:10000;transition:all .05s linear;background-image:linear-gradient(to right,#2d84fb 90%,white 100%)}";
    document.head.appendChild(style);
    document.body.appendChild(el);
    this.el = el;
}

Loading.prototype.start = function() {
    setTimeout(()=> {
        this.endNoAni();
        this.el.style.width = '0px';
        this.el.style.backgroundImage = 'linear-gradient(to right, #2D84FB 90% , white 100%)';
        this.el.style.transition = 'all .05s linear';
        this.el.style.display = 'block';
        var body = document.querySelector('body');
        this.loadingAni = setInterval(() => {
            var loadingWidth = this.el.offsetWidth;
            var bodyWidth = body.offsetWidth;
            if (loadingWidth < bodyWidth) {
                var width = loadingWidth + (bodyWidth - loadingWidth) * 0.1 ;
                this.el.style.width = width + 'px';
            }
            if (loadingWidth == bodyWidth) {
                clearInterval(this.loadingAni);
            }
        }, 100)
    }, 250)
}

Loading.prototype.endNoAni = function() {
    clearInterval(this.loadingAni);
    this.el.style.transition = 'none';
    this.el.style.display = 'none';
}

Loading.prototype.end = function() {
    clearInterval(this.loadingAni);
    this.el.style.transition = 'all 0s linear';
    this.el.style.width = '100%';
    setTimeout(() => {
       this.el.style.backgroundImage = 'linear-gradient(to right, #2D84FB 100% , white 100%)';
        setTimeout(() => {
            this.el.style.display = 'none';
        }, 50)
    }, 100)
}

Loading.prototype.destroy = function() {
    // window.removeEventListener('load', end);
}

/* var end = function () {
    appLoading.end();
} */
window.appLoading = new Loading();
appLoading.start();
// window.addEventListener('load', end);