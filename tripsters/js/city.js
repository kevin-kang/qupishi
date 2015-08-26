require(['module/util', 'module/getMore'], function(util, getData) {
    var $doc = $(document),
        $win = $(window),
        $cityAreaItems = $('.city_area_items'),
        $topBarOk = $('.top_bar_ok'),
        $tmpl = $('#template'),
        countrycode = util.query('country_code') || 'th',
        countryNameCn = decodeURIComponent(util.query('country_name_cn')) || '泰国',
        qsdetail = sessionStorage.getItem('qsdetail'),
        userInfo = JSON.parse(localStorage.getItem('www.tripsters.cn')),
        userid = userInfo.id,
        tmpl = $tmpl.html(),
        idx = 0,
        tmpArr = [];

    getData({
        url: 'http://www.tripsters.cn/index.php?a=getCity&c=index&m=country',
        data: {
            'country_code': countrycode
        },
        cb: function(res) {
            if (res.retcode == 'OK' && res.city) {
                res.city.forEach(function(v) {
                    tmpArr.push(util.tmpl(tmpl, v));
                });
                $cityAreaItems.html(tmpArr.join(''));
            }
        }
    });

    $cityAreaItems.on('click', 'li', function() {
        var $target = $(this);
        if ($target.find('.city_area_r_input').hasClass('active')) {
            idx = idx == -1 ? 0 : --idx;
            $target.find('.city_area_r_input').toggleClass('active');
        } else if (idx < 3 && !$target.find('.city_area_r_input').hasClass('active')) {
            $target.find('.city_area_r_input').toggleClass('active');
            ++idx;
        }
    });

    $topBarOk.on('click', function() {
        var data = {
            a: 'sendQuestion',
            c: 'index',
            m: 'answer',
            user_id: userid,
            city: [],
            title: qsdetail,
            country: countryNameCn,
            platform: 'weixinplatform'
        };

        if ($cityAreaItems.find('.active').length) {
            $cityAreaItems.find('.active').each(function() {
                data.city.push($(this).parent().siblings().html());
            });
        }
        data.city = data.city.toString();

        if (util.isNull(data.city)) {
            alert('城市必选！');
            return false;
        }
        getData({
            url: 'http://www.tripsters.cn/index.php',
            dataType: 'jsonp',
            data: data,
            cb: function(res) {
                if (res.retcode == 'true') {
                    alert('提问成功');
                    location.href = '所有问题.html' + '?country_code=' + countrycode + '&country_name_cn=' + countryNameCn;
                }
            }
        });
    });

});