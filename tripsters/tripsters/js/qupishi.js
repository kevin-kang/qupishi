/**
 * @趣皮士
 * @requires Zepto
 * @author felix 
 * @weixin 155259396
 * @date 2015.05.17
 */

 // @js目录
 // @1) 我要回答
 // @2) 我要提问
 // @3) 寻人
 // @4) 历史回退

$(function(){

    /**
     * 我来回答
     * @method  answer
     * @param
     * @return
     */
    function answer(){
        $('.j_answer').click(function(){

            var content = $('.j_answer_content').val();

            if (content.length >= 1) {
                var url = answerConfig.api + 'question_id=' + answerConfig.question_id + '&user_id=' + answerConfig.user_id + '&q_user_id=' + answerConfig.q_user_id;
                $.ajax({
                    url : url,
                    data : {detail : content},
                    type : 'POST',
                    dataType : 'jsonp',
                    timeout: 10000,
                    success : function(data){
                        if (data.ret && data.ret == 'OK') {
                            alert(data.message);
                            //answerConfig.success_href && answerConfig.success_href.length>0 && location.href = answerConfig.success_href;
                        } else {
                            alert(data.message);
                            //answerConfig.failure_href && answerConfig.failure_href.length>0 && location.href = answerConfig.failure_href;
                        }
                    },
                    error : function(xhr, type){
                       alert('请求超时，稍后再试~');
                    }
                }); 
            } else {
                alert('请输入要回答的内容~');
            }
        })
    }

    /**
     * 选择城市
     * @method  selectCity
     * @param
     * @return
     */
    function selectCity(){

        var pageCity = $('.j_page_select_city'),
            pageAsk = $('.j_page_ask'),
            selectCity =  $('.j_select_city'),
            selectedCity = $('.j_selected_city');

        // 存储所选城市
        window.cityName = [];

        // 删除一个城市
        function deleteCity(val){
            var len = cityName.length;
            for(var i=0; i<len; i++){
                if(cityName[i] == val){
                    cityName.splice(i, 1);
                    break;
                }
            }
        }

        $('.j_select_city').click(function(){
            // 切换页面
            pageAsk.hide();
            pageCity.show();
        })

        $('.j_change_city').click(function(){
            // 切换页面
            pageAsk.hide();
            pageCity.show();
        })

        // 选择城市 
        $('.city_area_r_input').click(function(){

            var _this = $(this),
                city = _this.data('city'),
                operate = _this.data('operate');

            if(!operate || operate=="add"){

                // 最多可以选择三个城市
                if(cityName.length < 3){
                    cityName.push(city);
                    _this.addClass('active');
                    _this.data('operate','delete');
                }else{
                    alert('亲，最多可以选择三个城市哦~');
                }
                
            }else{
                deleteCity(city);
                _this.removeClass('active');
                _this.data('operate','add');
            }
        })

        // 保存城市。
        $('.j_save_city').click(function(){

            var _this = $(this),
                citys = selectedCity.find('.j_citys'),
                removeCity = $('.j_remove_city');

            // 切换页面
            pageAsk.show();
            pageCity.hide();

            // 修改所选城市的状态
            if(cityName.length >0){
                selectCity.hide();
                selectedCity.show();
                var len = cityName.length,
                    html = '';
                for (var i = 0; i < len; i++) {
                      html += '<span class="j_remove_city" data-city="'+ cityName[i] +'">' + cityName[i] + '<i><img src="images/x.png" alt="" width="11" /></i></span>';           
                };
                citys.html(html);
            }else{
                selectCity.show();
                selectedCity.hide();
                citys.append();
            }
        })

        // 提高页，删除一个城市
        $(document).on('click', '.j_remove_city', function(e){
            var _this = $(this),
                city = _this.data('city');

            _this.remove();
            deleteCity(city);

            // 删除城市列表页已经选中的城市
            var citys = $('.city_area_r_input'),
                len = citys.length;

            for(var i=0; i<len; i++){
                if(citys.eq(i).data('city') == city){
                    citys.eq(i).data('operate', 'add');
                    citys.eq(i).removeClass('active');
                }
            }

            if(cityName.length == 0){
                selectCity.show();
                selectedCity.hide();
            }

        })     

    }

    /**
     * 我来提问
     * @method  answer
     * @param
     * @return
     */
    function ask(){

        var askTitle = $('.j_ask_title'),
            askDesc = $('.j_ask_desc'),
            showBtn = $('.j_ask_show'),
            hideBtn = $('.j_ask_hide');

        showBtn.click(function(){
            showBtn.hide();
            hideBtn.show();
            askDesc.show();
            askTitle.removeClass('left_line');
        })

        hideBtn.click(function(){
            showBtn.show();
            hideBtn.hide();
            askDesc.hide();
            askTitle.addClass('left_line');
        })

        // 获取URL地址中的KEY值
        function getSearchKey(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }


        $('.j_submit_ask').click(function(){

            var country = getSearchKey('country'),
                city = window.cityName.join(','),
                title = askTitle.find('textarea').val(),
                detail = askDesc.find('textarea').val();

            var url = askConfig.api + '&user_id=' + askConfig.user_id + '&country=' + country + '&city=' + city + '&title=' + title + '&detail=' + detail;
            $.ajax({
                url : url,
                data : {},
                type : 'GET',
                dataType : 'jsonp',
                timeout: 10000,
                success : function(data){
                    if (data.ret && data.ret == 'OK') {
                        $('.j_page_ask_success').show();
                        $('.j_page_ask').hide();

                        // 雷达推送数据
                        LookingTarento();
                        //answerConfig.success_href && answerConfig.success_href.length>0 && location.href = answerConfig.success_href;
                    } else {
                        alert(data.message);
                        //answerConfig.failure_href && answerConfig.failure_href.length>0 && location.href = answerConfig.failure_href;
                    }
                },
                error : function(xhr, type){
                   alert('请求超时，稍后再试~');
                }
            }); 

        })

    }

    //寻找达人
    function LookingTarento(){

        var lookingInterval = setInterval(looking,2000);

        var url = selectConfig.api + '&user_id=' + selectConfig.user_id;
        function looking(){
            $.ajax({
                    url : url,
                    data : {},
                    type : 'GET',
                    dataType : 'jsonp',
                    timeout: 10000,
                    success : function(data){
                        if (data.ret && data.ret == 'OK') {
                            $('.j_looked_num').html(data.count);
                            //answerConfig.success_href && answerConfig.success_href.length>0 && location.href = answerConfig.success_href;
                        } else {
                            //alert(data.message);
                            //answerConfig.failure_href && answerConfig.failure_href.length>0 && location.href = answerConfig.failure_href;
                        }
                    },
                    error : function(xhr, type){
                       //alert('请求超时，稍后再试~');
                    }
                }); 
        }

        $('.j_close_looking').click(function(){
            clearInterval(lookingInterval);
        })
    })


    //历史回退
    function backHistory() {
        var goBack = $('.j_backPrePage');
        if(goBack.length > 0){
            goBack.click(function(){
                window.history.length <= 1 ? window.location.href='http://sina.cn' : window.history.go(-1);
            })
        }
    }
    

    // 初始化
    setTimeout(function(){                           
        answer();                    // 我来回答
        ask();
        selectCity();
        backHistory();

    }, 300);

});



