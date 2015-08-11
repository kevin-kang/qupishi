require(['module/util'], function(util) {
    var $viewImgBox = $('.view-img-box'),
        $img = $viewImgBox.find('img'),
        bsrc = decodeURIComponent(util.query(location.href, 'bsrc')),
        refer = decodeURIComponent(util.query(location.href, 'refer'));

        $img.attr('src', bsrc);
        $viewImgBox.on('click', function(){
            location.href = refer;
        });
});