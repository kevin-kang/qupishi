require(['module/util', 'module/getMore'], function(util, getData) {
    var $doc = $(document),
        $win = $(window),
        $answerBox = $('.answer-box > div'),
        $tmpl = $('#template'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        userid = userInfo.id,
        tmpl = $tmpl.html(),
        WXcode = decodeURIComponent(util.query('code')),
        tmpArr;

    if(WXcode){//微信授权
        login('http://114.215.108.44/index.php?a=getWXUserInfo&c=weixin&m=weixin', WXcode);
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn'));
        userid = userInfo.id;
    }

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
                    target.html('没有更多了').data('nodata', 1);
                }
            }
        });
    }

    $answerBox.siblings('.more-btn').on('click', function() { //我的回答列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getUserAnswer&c=index&m=answer',
            nodata = $target.data('nodata');

        if (!nodata) {
            $target.html('正在加载...');
            renderData($target, url, pageNum);
        }
    }).trigger('click');

    $answerBox.on('click', '.answer_card .fr', function(e){ //提问页
        e.stopPropagation();
        location.href = '提问-选择城市-雷达推送.html';
    });
});