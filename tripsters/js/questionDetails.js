require(['module/util', 'module/getMore', 'module/dateTime'], function(util, getData, dateTime) {
    var $doc = $(document),
        $win = $(window),
        $qusetionBox = $('.question-box'),
        $answerBox = $('.answer-box > div'),
        $tmpl = $('#template'),
        $hdBtn = $('#hd-btn'),
        tmpl = $tmpl.html(),
        questionid = decodeURIComponent(util.query('question_id')),
        quserid = decodeURIComponent(util.query('q_user_id')),
        tmpArr;

    $hdBtn.attr({ //设置我要回答链接
        'href': '我要回答.html?question_id=' + questionid + '&q_user_id=' + quserid
    });

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
                        v.top = util.isNull(v.top) ? '0' : v.top + '';
                        v.txtpic = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic_small) ? ' ' : v.Pics.pic_small;
                        v.bigimg = util.isNull(v.Pics) ? ' ' : util.isNull(v.Pics.pic) ? ' ' : v.Pics.pic;
                        v.dis = util.isNull(v.txtpic) ? 'display:none;' : 'display:block;';
                        v.questionlink = 'question_id=' + questionid + '&q_user_id=' + v.q_user_id + '&answer_user_id=' + v.user_id + '&nickname=' + v.nickname;
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

    function renderQuestion(){ // 渲染问题
        $qusetionBox.html(sessionStorage.getItem('tripsters'));
    }

    $('.more-btn').on('click', function() { //回答列表
        var $target = $(this),
            pageNum = $target.data('pagenum') ? $target.data('pagenum') : 1,
            url = 'http://114.215.108.44/index.php?a=getAnswer&c=index&m=answer',
            nodata = $target.data('nodata');
            
        if(!$qusetionBox.html()){
            renderQuestion();
        }
        if (!nodata) {
            $target.html('正在加载...');
            renderData($target, url, pageNum);
        }
    }).trigger('click');

    $answerBox.on('click', '.answer_card .answer_a img', function(e){ //查看大图
        var $target = $(this),
            bsrc = $target.attr('bsrc');
        e.stopPropagation();
        location.href = 'viewImg.html' + '?bsrc=' + encodeURIComponent(bsrc) + '&refer=' + encodeURIComponent(location.href);
    });

});