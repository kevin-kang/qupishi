require(["module/util"],function(n){var e=($(document),$(window),$(".j_submit_ask")),t=$(".an_one_num"),o=$("#question-detail"),a=JSON.parse(localStorage.getItem("www.tripsters.cn")),c=(a.id,n.query("country_code")||"th"),i=decodeURIComponent(n.query("country_name_cn"))||"泰国";e.on("click",function(){o.val()&&(sessionStorage.setItem("qsdetail",o.val()),location.href="选择城市.html?country_code="+c+"&country_name_cn="+i)}),o.on("input",function(){var n=$(this),e=n.val().length;t.find("span").html(e>60?60:e),n.val(n.val().slice(0,60))})});