require(['module/util', 'module/getMore', 'module/loginModule'], function(util, getData, login) {
    var $doc = $(document),
        $win = $(window),
        $answerBox = $('.answer-box > div'),
        $moreBtn = $answerBox.siblings('.more-btn'),
        $tmpl = $('#template'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        userid = userInfo ? userInfo.id : '',
        WXcode = decodeURIComponent(util.query('code')),
        url = 'http://www.tripsters.cn/index.php?a=getUserAnswer&c=index&m=answer',
        tmpl = $tmpl.html(),
        pageNum = 1,
        nodata,
        tmpArr;

    if (WXcode && !userid) { //微信授权
        login('http://www.tripsters.cn/index.php?a=getWXUserInfo&c=weixin&m=weixin', WXcode, function() {
            userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn'));
            userid = userInfo.id;
            renderInit();
        });
    } else {
        renderInit();
    }

    function renderInit(){
        pageNum = $moreBtn.data('pagenum') ? $moreBtn.data('pagenum') : pageNum;
        nodata = $moreBtn.data('nodata');
        if (!nodata) {
            $moreBtn.html('正在加载...');
            renderData($moreBtn, url, pageNum);
        }
    };

    function renderData(target, url, pageNum) { //渲染数据结构
        getData({ //热门列表
            url: url,
            data: {
                'user_id': userid,
                'pagesize': 25,
                'page': pageNum
            },
            cb: function(res) {
                if (res.retcode == 'OK') {
                    tmpArr = [];
                    res.result.forEach(function(v) {
                        v.qnickname = util.isNull(v.userinfo) ? '匿名用户' : util.isNull(v.userinfo.nickname) ? '匿名用户' : v.userinfo.nickname;
                        v.qtitle = v.Question_Info.title;
                        tmpArr.push(util.tmpl(tmpl, v));
                    });
                    target.siblings().append(tmpArr.join(''));
                    target.html('加载更多').show().data('pagenum', ++pageNum);
                } else {
                    target.show().html('没有更多了').data('nodata', 1);
                }
            }
        });
    }

    $moreBtn.on('click', renderInit);//加载更多

    $answerBox.on('click', '.answer_card .fr', function(e){ //提问页
        e.stopPropagation();
        location.href = '提问-选择城市-雷达推送.html';
    });
});