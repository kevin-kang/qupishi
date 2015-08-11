require(['module/util', 'module/getMore'], function(util, getData) {
    var $doc = $(document),
        $win = $(window),
        $jAnswerBtn = $('.j_answer'),
        $jAnswerContent = $('.j_answer_content'),
        questionid = decodeURIComponent(util.query(location.href, 'question_id')) || 1142,
        userid = decodeURIComponent(util.query(location.href, 'user_id')) || 3,
        quserid = decodeURIComponent(util.query(location.href, 'q_user_id')) || 10450,
        refer = decodeURIComponent(util.query(location.href, 'q_user_id')),
        detail = $jAnswerContent.val();

    $jAnswerBtn.on('click', function() {
        getData({
            url: 'http://114.215.108.44/index.php?a=sendAnswer&c=index&m=answer',
            data: {
                question_id: questionid,
                user_id: userid,
                q_user_id: quserid,
                detail: detail
            },
            cb: function(res) {
                if(res.retcode){
                    location.href = refer;
                }
            }
        });
    });
});