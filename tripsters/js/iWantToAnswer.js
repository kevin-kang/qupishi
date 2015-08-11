require(['module/util', 'module/getMore'], function(util, getData) {
    var $doc = $(document),
        $win = $(window),
        $jAnswerBtn = $('.j_answer'),
        $jAnswerContent = $('.j_answer_content'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        questionid = decodeURIComponent(util.query(location.href, 'question_id')),
        userid = userInfo.id,
        quserid = decodeURIComponent(util.query(location.href, 'q_user_id'));

    $jAnswerBtn.on('click', function() {
        getData({
            url: 'http://114.215.108.44/index.php?a=sendAnswer&c=index&m=answer',
            data: {
                question_id: questionid,
                user_id: userid,
                q_user_id: quserid,
                detail: $jAnswerContent.val()
            },
            cb: function(res) {
                if(res.retcode){
                    history.go(-1)
                    // location.href = refer;
                }
            }
        });
    });
});