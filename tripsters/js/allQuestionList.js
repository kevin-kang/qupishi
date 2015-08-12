require(['module/util', 'module/getMore', 'module/dateTime', 'module/loginModule'], function(util, getData, dateTime, login) {
    var $doc = $(document),
        $win = $(window),
        $topBarSelect = $('.top_bar_select'),
        $topBarNav = $('.top_bar_nav'),
        $answerWrap = $('.answer_wrap'),
        $hotQuestionList = $('#hot-question-list > div'),
        $latestQuestionList = $('#latest-question-list > div'),
        $tmpl = $('#template'),
        $twBtn = $('#tw-btn'),
        tmpl = $tmpl.html(),
        countryCode = decodeURIComponent(util.query('country_code')) ? decodeURIComponent(util.query('country_code')) : 'th',
        countryNameCn = decodeURIComponent(util.query('country_name_cn')) ? decodeURIComponent(util.query('country_name_cn')) : '泰国',
        tmpArr;

        login();

    $topBarSelect.find('span').html(countryNameCn);
    $twBtn.attr({ //设置我要提问链接
        'countryCode': countryCode,
        'href': '提问-选择城市-雷达推送.html'
    });

    function renderData(target, url, pageNum) { //渲染数据结构
        getData({
            url: url,
            data: {
                'country': countryNameCn,
                'pagesize': 25,
                'page': pageNum
            },
            cb: function(res) {
                if (res.retcode == 'OK') {
                    tmpArr = [];
                    res.result.forEach(function(v) {
                        v.avatar = util.isNull(v.userinfo) ? ' ' : util.isNull(v.userinfo.avatar) ? ' ' : v.userinfo.avatar;
                        v.detail = util.isNull(v.Answer) ? '暂无回答' : util.isNull(v.Answer.detail) ? '暂无回答' : v.Answer.detail;
                        v.txtpic = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic_small) ? ' ' : v.Pics.pic_small;
                        v.bigimg = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic) ? ' ' : v.Pics.pic ;
                        v.dis = util.isNull(v.txtpic) ? 'display:none;' : 'display:block;';
                        v.datetime = dateTime(v.created);
                        v.answerlink = 'question_id=' + v.question_id + '&q_user_id=' + v.user_id;
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

    $hotQuestionList.siblings('.more-btn').on('click', function() { //热门列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getHotQuetion&c=index&m=answer',
            nodata = $target.data('nodata');

        if (!nodata) {
            renderData($target, url, pageNum);
        }
    }).trigger('click');

    $latestQuestionList.siblings('.more-btn').on('click', function() { //最新列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getCountryQuestion&c=index&m=answer',
            nodata = $target.data('nodata');

        if (!nodata) {
            renderData($target, url, pageNum);
        }
    }).trigger('click');

    util.tab($topBarNav, 'li', $answerWrap, 'article', 'active'); //切换热门最新

    $topBarSelect.on('click', function() { //重新选择国家
        location.href = '选择国家.html';
    });

    $answerWrap.on('click', '.answer_card', function(){ //问答详情
        var $target = $(this),
            questionid = $target.attr('questionid'),
            quserid = $target.attr('quserid');

        localStorage.setItem('qps' + questionid, $target.clone()[0].outerHTML);//储存问题DOM 
        location.href = '问答详情.html' + '?question_id=' + questionid + '&q_user_id=' + quserid;
    });

    $answerWrap.on('click', '.answer_card .answer_a img', function(e){ //查看大图
        var $target = $(this),
            bsrc = $target.attr('bsrc');
        e.stopPropagation();
        location.href = 'viewImg.html' + '?bsrc=' + encodeURIComponent(bsrc) + '&refer=' + encodeURIComponent(location.href);
    });

});