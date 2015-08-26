require(['module/util', 'module/getMore', 'module/dateTime', 'module/loginModule'], function(util, getData, dateTime, login) {
    var $doc = $(document),
        $win = $(window),
        $answerWrap = $('.answer_wrap'),
        $answerBox = $('.answer-box > div'),
        $moreBtn = $answerBox.siblings('.more-btn'),
        $tmpl = $('#template'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        WXcode = decodeURIComponent(util.query('code')),
        userid = userInfo ? userInfo.id : '',
        url = 'http://www.tripsters.cn/index.php?a=getUserQuestion&c=index&m=answer',
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
                        v.save_num = util.isNull(v.save_num) ? '0' : v.save_num + '';
                        v.adetail = util.isNull(v.Answer) ? '暂无回答' : util.isNull(v.Answer.detail) ? '暂无回答' : v.Answer.detail;
                        v.datetime = dateTime(v.created);
                        v.answerlink = 'question_id=' + v.question_id + '&q_user_id=' + v.user_id;
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

    $answerWrap.on('click', '.answer_card', function() { //问答详情
        var $target = $(this),
            questionid = $target.attr('questionid'),
            quserid = $target.attr('quserid');

        localStorage.setItem('qps' + questionid, $target.clone()[0].outerHTML); //储存问题DOM 
        location.href = '问答详情.html' + '?question_id=' + questionid + '&q_user_id=' + quserid;
    });
});