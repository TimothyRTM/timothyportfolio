$(function () {
    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });

    // image load progress (portfolio only)
    var $progress = $('#image-load-progress');
    var $bar = $progress.find('.image-load-progress__bar');
    var $images = $('.portfolio_item img');
    if ($images.length) {
        var total = $images.length;
        var loaded = 0;
        var startTime = Date.now();
        var update = function () {
            loaded = Math.min(loaded, total);
            var pct = Math.round((loaded / total) * 100);
            $bar.css('width', pct + '%');
            if (loaded >= total) {
                var elapsed = Date.now() - startTime;
                var remaining = Math.max(0, 400 - elapsed);
                setTimeout(function () {
                    $progress.addClass('is-complete');
                }, remaining);
            }
        };

        // show a visible start so it doesn't look stuck at zero
        requestAnimationFrame(function () {
            $bar.css('width', '5%');
        });

        $images.each(function () {
            var img = this;
            var done = function () {
                loaded += 1;
                update();
            };

            if (img.complete && img.naturalWidth > 0) {
                done();
                return;
            }

            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
        });

        update();
    } else {
        $progress.addClass('is-complete');
    }
});

$(window).load(function () {
    //  isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '.featured',
    });

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });
});
