require(['module/util', 'module/getMore'], function(util, getData){
    var $doc = $(document),
        $win = $(window),
        $cityAreaItems = $('.city_area_items'),
        $tmpl = $('#template'),
        tmpl = $tmpl.html(),
        tmpArr = [];

    getData({
        url: 'http://114.215.108.44/index.php?a=getCity&c=index&m=country',
        data: {
            'country_code': util.query(location.href, 'country_code')
        },
        cb: function(res){
            if(res.retcode == 'OK' && res.city){
                res.city.forEach(function(v){
                    tmpArr.push(util.tmpl(tmpl, v));
                });
                $cityAreaItems.html(tmpArr.join(''));
            }
        }
    });

    $cityAreaItems.on('click', 'li', function(){
        var $target = $(this);

        $target.find('.city_area_r_input').toggleClass('active')
        $target.siblings('li').find('.city_area_r_input').removeClass('active');
    });

});