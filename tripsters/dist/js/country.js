require(["module/util","module/getMore"],function(t,n){var o=($(document),$(window),$(".city_card_items")),c=$("#template"),r=c.html(),e=[];n({url:"http://114.215.108.44/index.php?a=getCurrentCountry&c=index&m=country",cb:function(n){"OK"==n.retcode&&n.country&&(n.country.forEach(function(n){e.push(t.tmpl(r,n))}),o.html(e.join("")))}}),o.on("click","li",function(){var t=$(this).attr("countryNameCn"),n=$(this).attr("countryCode");location.href="所有问题.html?country_name_cn="+t+"&country_code="+n})});