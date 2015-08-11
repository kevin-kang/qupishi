require(['module/util', 'module/getMore', 'module/dateTime'], function(util, getData, dateTime) {
    var $doc = $(document),
        $win = $(window),
        $qusetionBox = $('.question-box'),
        $answerBox = $('.answer-box > div'),
        $tmpl = $('#template'),
        $hdBtn = $('#hd-btn'),
        tmpl = $tmpl.html(),
        questionid = decodeURIComponent(util.query(location.href, 'question_id')),
        tmpArr;

    function renderData(target, url, pageNum) { //渲染数据结构
        getData({ //热门列表
            url: url,
            data: {
                'question_id': questionid,
                'pagesize': 25,
                'page': pageNum
            },
            cb: function(res) {
                if (res.retcode == 'OK') {
                    tmpArr = [];
                    res.result.forEach(function(v) {
                        v.nickname = util.isNull(v.nickname) ? '匿名用户' : v.nickname;
                        v.datetime = dateTime(v.created);
                        v.user_pic = util.isNull(v.user_pic) ? ' ' : v.user_pic;
                        v.top = util.isNull(v.top) ? '0' : v.user_pic;
                        v.txtpic = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic_small) ? v.Pics.pic_small : ' ' ;
                        v.bigimg = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic) ? v.Pics.pic : ' ';
                        v.dis = util.isNull(v.txtpic) ? 'display:none;' : 'display:block;';
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

    function renderQuestion(){
        $qusetionBox.html(localStorage.getItem('qps' + questionid));
    }

    $answerBox.siblings('a').on('click', function() { //回答列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getAnswer&c=index&m=answer',
            nodata = $target.data('nodata');
        if(!$qusetionBox.html()){
            renderQuestion();
        }
        if (!nodata) {
            renderData($target, url, pageNum);
        }
    }).trigger('click');    

    $answerBox.on('click', '.answer_card .fr', function(e){ //提问页
        e.stopPropagation();
        location.href = '提问-选择城市-雷达推送.html';
    });

    $answerBox.on('click', '.answer_card .answer_a img', function(e){ //查看大图
        var $target = $(this),
            bsrc = $target.attr('bsrc');
        e.stopPropagation();
        location.href = 'viewImg.html' + '?bsrc=' + encodeURIComponent(bsrc) + '&refer=' + encodeURIComponent(location.href);
    });

    $hdBtn.on('click', function(e){ // 提问页
        location.href = '我要回答.html';
        e.preventDefault();
    });
});