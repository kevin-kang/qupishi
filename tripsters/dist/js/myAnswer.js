require(["module/util","module/getMore","module/loginModule"],function(e,n,t){function i(){g=c.data("pagenum")?c.data("pagenum"):g,a=c.data("nodata"),a||(c.html("正在加载..."),o(c,m,g))}function o(t,i,o){n({url:i,data:{user_id:d,pagesize:25,page:o},cb:function(n){"OK"==n.retcode?(r=[],n.result.forEach(function(n){n.qnickname=e.isNull(n.userinfo)?"匿名用户":e.isNull(n.userinfo.nickname)?"匿名用户":n.userinfo.nickname,n.qtitle=n.Question_Info.title,r.push(e.tmpl(w,n))}),t.siblings().append(r.join("")),t.html("加载更多").show().data("pagenum",++o)):t.show().html("没有更多了").data("nodata",1)}})}var a,r,s=($(document),$(window),$(".answer-box > div")),c=s.siblings(".more-btn"),l=$("#template"),u=JSON.parse(localStorage.getItem("www.tripsters.cn")),d=u?u.id:"",p=decodeURIComponent(e.query("code")),m="http://www.tripsters.cn/index.php?a=getUserAnswer&c=index&m=answer",w=l.html(),g=1;p&&!d?t("http://www.tripsters.cn/index.php?a=getWXUserInfo&c=weixin&m=weixin",p,function(){u=JSON.parse(localStorage.getItem("www.tripsters.cn")),d=u.id,i()}):i(),c.on("click",i),s.on("click",".answer_card .fr",function(e){e.stopPropagation(),location.href="提问-选择城市-雷达推送.html"})});