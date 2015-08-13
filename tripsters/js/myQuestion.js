require(['module/util', 'module/getMore', 'module/dateTime'], function(util, getData, dateTime) {
    var $doc = $(document),
        $win = $(window),
        $answerWrap = $('.answer_wrap'),
        $answerBox = $('.answer-box > div'),
        $tmpl = $('#template'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        userid = userInfo.id,
        tmpl = $tmpl.html(),
        tmpArr;

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
                    target.html('没有更多了').data('nodata', 1);
                }
            }
        });
    }

    $answerBox.siblings('.more-btn').on('click', function() { //我的提问列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getUserQuestion&c=index&m=answer',
            nodata = $target.data('nodata');

        if (!nodata) {
            renderData($target, url, pageNum);
        }
    }).trigger('click');    

    $answerWrap.on('click', '.answer_card', function(){ //问答详情
        var $target = $(this),
            questionid = $target.attr('questionid'),
            quserid = $target.attr('quserid');

        localStorage.setItem('qps' + questionid, $target.clone()[0].outerHTML);//储存问题DOM 
        location.href = '问答详情.html' + '?question_id=' + questionid + '&q_user_id=' + quserid;
    });
});