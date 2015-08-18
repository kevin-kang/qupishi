require(['module/util', 'module/getMore'], function(util, getData) {
    var $doc = $(document),
        $win = $(window),
        $h2 = $('.top_bar h2'),
        $jAnswerBtn = $('.j_answer'),
        $jAnswerContent = $('.j_answer_content'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        questionid = decodeURIComponent(util.query('question_id')),
        userid = userInfo.id,
        quserid = decodeURIComponent(util.query('q_user_id')),
        answeruserid = decodeURIComponent(util.query('answer_user_id')),
        nickname = decodeURIComponent(util.query('nikcname')),
        questionClosely = 0;

    if (answeruserid && nickname) { //追问页头修改及提示被追问者昵称
        questionClosely = 1;
        $jAnswerContent.attr('placeholder', '追问' + nickname);
        $h2.html('我要提问');
    }

    $jAnswerBtn.on('click', function() { //提交回答或者追问
        var answerDataObj = {
            url: 'http://114.215.108.44/index.php?a=sendAnswer&c=index&m=answer', //回复
            data: {
                question_id: questionid,
                user_id: userid,
                q_user_id: quserid,
                detail: '回复' + nickname + '：' + $jAnswerContent.val()
            }
        };

        if (questionClosely) {
            $.extend(true, answerDataObj, {
                url: 'http://114.215.108.44/index.php?a=sendReAnswer&c=index&m=answer', //追问
                data: {
                    answer_user_id: answeruserid,
                }
            });
        }

        getData({
            url: answerDataObj.url,
            data: answerDataObj.data,
            cb: function(res) {
                if (res.retcode) {
                    history.go(-1);
                }
            }
        });
    });
});