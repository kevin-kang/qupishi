define(['module/util'], function(util){
    'use strict';

    var WXcode = util.query(location.href, 'code');

    function getWXcode(){
        $.ajax({
            url: 'http://114.215.108.44/index.php?a=getWebToken&c=weixin&m=weixin',
            type: 'get',
            dataType: 'jsonp',
            data:{
                code: WXcode
            },
            success: function(res){
                WXcode = 
            }
        });
    }

    return function login(opt) {
        
    };
});