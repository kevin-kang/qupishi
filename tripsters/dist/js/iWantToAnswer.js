require(["module/util","module/getMore"],function(e,n){var r=($(document),$(window),$(".top_bar h2")),t=$(".j_answer"),d=$(".j_answer_content"),o=JSON.parse(localStorage.getItem("www.tripsters.cn")),a=decodeURIComponent(e.query("question_id")),i=o.id,u=decodeURIComponent(e.query("q_user_id")),s=decodeURIComponent(e.query("answer_user_id")),c=decodeURIComponent(e.query("nikcname")),l=0;s&&c&&(l=1,d.attr("placeholder","追问"+c),r.html("我要提问")),t.on("click",function(){var e={url:"http://114.215.108.44/index.php?a=sendAnswer&c=index&m=answer",data:{question_id:a,user_id:i,q_user_id:u,detail:"回复"+c+"："+d.val()}};l&&$.extend(!0,e,{url:"http://114.215.108.44/index.php?a=sendReAnswer&c=index&m=answer",data:{answer_user_id:s}}),n({url:e.url,data:e.data,cb:function(e){e.retcode&&history.go(-1)}})})});