require(['module/util', 'module/getMore'], function(util, getData){
    var $doc = $(document),
        $win = $(window),
        $cityCardItems = $('.city_card_items'),
        $tmpl = $('#template'),
        tmpl = $tmpl.html(),
        tmpArr = [];

    getData({
        url: 'http://114.215.108.44/index.php?a=getCurrentCountry&c=index&m=country',
        cb: function(res){
            if(res.retcode == 'OK' && res.country){
                res.country.forEach(function(v){
                    tmpArr.push(util.tmpl(tmpl, v));
                });
                $cityCardItems.html(tmpArr.join(''));
            }
        }
    });

    $cityCardItems.on('click', 'li', function(){
        var countryNameCn = $(this).attr('countryNameCn'),
            countryCode = $(this).attr('countryCode');
        location.href = '所有问题.html?country_name_cn=' + countryNameCn + '&country_code=' + countryCode;
    });

});