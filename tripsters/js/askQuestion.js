require(['module/util'], function(util) {
    var $doc = $(document),
        $win = $(window),
        $jSubmitAsk = $('.j_submit_ask'),
        $anOneNum = $('.an_one_num'),
        $questionDetail = $('#question-detail'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        userid = userInfo ? userInfo.id : '',
        countrycode = util.query('country_code') || 'th',
        countryNameCn = decodeURIComponent(util.query('country_name_cn')) || '泰国',
        tmpArr;

    $jSubmitAsk.on('click', function(){
    	if(util.isNull($questionDetail.val())){
    		alert('请填写问题');
            return false;
    	}
        sessionStorage.setItem('qsdetail', $questionDetail.val());
        location.href = '选择城市.html?country_code=' + countrycode + '&country_name_cn=' +countryNameCn;
    });

    $questionDetail.on('input', function(){
    	var $target = $(this),
    		detailLen = $target.val().length;

    	$anOneNum.find('span').html(detailLen > 60 ? 60 : detailLen);
    	$target.val($target.val().slice(0, 60));	
    });
});