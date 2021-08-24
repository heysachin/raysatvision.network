jQuery(document).ready(function ($) {
    'use-strict';

    var $window = $(window);

    /**
     * Count To
     * @constructor
     */
    function OScountTo() {
        $('.counter-group').each(function (index) {
            var $this = $(this);
            var waypoint = $this.waypoint({
                handler: function (direction) {
                    $this.find('.timer:not(.counted)').countTo().addClass('counted');
                    this.destroy();
                },
                offset: "90%"
            });
        });
    }

    OScountTo();

    /**
     * Browser Detection
     * @constructor
     */
    function OsBrowserDetect() {
        var browser = '';
        var nAgt = navigator.userAgent;

        if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
            browser = "opera";
        }
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browser = "ie";
        }
        else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
            browser = "edge";
        }
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browser = "chrome";
        }
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browser = "safari";
        } 
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browser = "firefox";
        }
        $('html').addClass(browser);
    }

    OsBrowserDetect();

    /**
     * OS Detection
     * @constructor
     */
    function OsOSDetect(){
        $('html').addClass(window.navigator.platform);
    }

    OsOSDetect();

    /**
     * Parallax background
     * @constructor
     */
    function OsParallax() {
        var ParallaxBreakPoint = 768;

        if ($('[data-stellar-background-ratio]').length > 0) {
            $(window).on('resize load', function () {
                if (window.innerWidth < ParallaxBreakPoint) {
                    $('html').removeClass('parallax-on')
                    $.stellar('destroy');
                }
                else {
                    $('html').addClass('parallax-on');
                    $.stellar({
                        scrollProperty: 'scroll',
                        horizontalScrolling: false,
                        verticalScrolling: (Modernizr.csstransitions),
                        responsive: true,
                        parallaxBackgrounds: true
                    });
                }
            });
        }
    }

    OsParallax();

    /**
     * Shuffle text
     * @constructor
     */
    function OsShuffleText() {
        $(".chaffle").each(function () {
            $(this).chaffle({
                speed: 20,
                time: 60
            });
        });
    }

    OsShuffleText();

    /**
     * OsSlider use for many purpose
     * @constructor
     */
    function OsSlider() {
        $(".slider").each(function () {

            var option = {
                autoplay: !($(this).hasClass('no-autoplay')),
                fade: !$(this).hasClass('slide'),
                speed: $(this).data('animation-speed') || 400,
                dots: $(this).hasClass('control-nav'),
                arrows: ($(this).hasClass('direction-nav') ? true : false),
                autoplaySpeed: $(this).data('autoplay-speed') || 5000,
                adaptiveHeight: ($(this).hasClass('auto-height') ? true : false),
                swipeToSlide: ($(this).hasClass('swipe-to-slide') ? true : false),
                infinite: ($(this).hasClass('no-loop') ? false : true)
            };

            if ($(this).data('item-width')) {
                var CarouselBaseWidth = parseInt($(this).data('item-width'), 10);
                option.respondTo = 'slider';
                if ($(this).hasClass('slide-all')) {
                    option.responsive = OsCarouselResponsiveCalculator(CarouselBaseWidth, true);
                }

                else {
                    option.responsive = OsCarouselResponsiveCalculator(CarouselBaseWidth);
                }
            }

            if ($(this).hasClass("caption-slider")) {
                //on start
                $(this).on('init', function (event, slick) {
                    OsSliderCaptionInit($(this));
                    OsSliderCaptionShow($(this));
                });

                //on before slide
                $(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    OsSliderCaptionHide($(this));
                });
                //on after slide done
                $(this).on('afterChange', function (event, slick, currentSlide) {
                    OsSliderCaptionShow($(this));
                });
            }

            $(this).slick(option);

            //Caption slider support function
            function OsSliderCaptionInit(container) {
                var $sliderElement = container.find('.caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var animationDuration = "1000ms";

                    if ($(this).data("animation-duration")) {
                        animationDuration = $(this).data("animation-duration") + "ms";
                    }

                    $(this).css("animation-duration", animationDuration);
                    $captionAnimation.addClass('caption-hide');
                });
            }

            function OsSliderCaptionShow(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function (index) {
                    var $captionAnimation = $(this);
                    var delayTime = $(this).data("caption-delay") || (index * 350 + 400);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    setTimeout(function () {
                        $captionAnimation.removeClass('caption-hide').addClass(captionAnimationData);
                    }, delayTime);
                });
            }

            function OsSliderCaptionHide(container) {
                var $sliderElement = container.find('.slick-active .caption');
                $sliderElement.each(function () {
                    var $captionAnimation = $(this);
                    var captionAnimationData = $captionAnimation.data('caption-animation') || "fadeInUp";
                    $captionAnimation.removeClass(captionAnimationData).addClass('caption-hide');
                });
            }
        });

        /**
         * Calculator for support OsSlider
         * @param CarouselBaseWidth
         * @returns {Array}
         * @constructor
         */
        function OsCarouselResponsiveCalculator(CarouselBaseWidth, slideAll) {

            var CarouselMaxWidth = 1920;
            var CarouselNumberBreakppoint = Math.floor(CarouselMaxWidth / CarouselBaseWidth);
            var CarouselBreakpoint = [];
            for (var i = 1; i < CarouselNumberBreakppoint + 1; i++) {
                CarouselBreakpoint.push({
                    breakpoint: CarouselBaseWidth * i,
                    settings: {
                        slidesToShow: i,
                        slidesToScroll: ((slideAll === true) ? i : 1)
                    }
                });
            }
            CarouselBreakpoint.push({
                breakpoint: 9999,
                settings: {
                    slidesToShow: CarouselNumberBreakppoint + 1,
                    slidesToScroll: ((slideAll === true) ? i : 1)
                }
            });
            return CarouselBreakpoint;
        }
    }

    OsSlider();


    /**
     * Product thumbnail slider
     * @constructor
     */

    function OsProductThumbnailSlider() {
        $(".product-thumbnail-slider").each(function () {
            var $this = $(this),
                $slider01 = $this.find(".syn-slider-1"),
                $slider02 = $this.find(".syn-slider-2");

            $slider01.slick({
                infinite: false,
                fade: ($slider01.hasClass('animation-fade') ? true : false),
                speed: 400,
                adaptiveHeight: ($slider01.hasClass('height-auto') ? true : false),
                arrows: ($slider01.hasClass('dir-nav') ? true : false),
                dots: $slider01.hasClass('control-nav') ? true : false
            });

            $slider01.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                syncPosition(nextSlide);
            });

            var visibleItems = [];
            var option = 0;

            $slider02.on("init", function (event, slick) {
                $(this).find(".slick-slide").eq(0).addClass("synced");
                var WW = window.innerWidth;
                if (WW >= 1020) {
                    option = 4;
                }

                if (WW < 1020) {
                    option = 3;
                }

                for (var i = 0; i < option; i++) {
                    visibleItems.push(i);
                }
            });

            $window.on('resize load', function (event) {
                var WW = window.innerWidth;
                if (WW >= 1020) {
                    option = 4;
                }

                if (WW < 1020) {
                    option = 3;
                }
                return option;
            });

            $slider02.on('afterChange', function (event, slick, currentSlide) {
                visibleItems.length = 0;
                for (var i = currentSlide; i < currentSlide + option; i++) {
                    visibleItems.push(i);
                }
            });

            $slider02.slick({
                swipeToSlide: true,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: 400,
                arrows: ($slider02.hasClass('direction-nav') ? true : false),
                centerPadding: '0px',
                vertical: ($slider02.hasClass('v-mode') ? true : false),
                verticalSwiping: ($slider02.hasClass('v-mode') ? true : false),
                responsive: [

                    {
                        breakpoint: 1230,
                        settings: {
                            slidesToShow: 4,
                            vertical: false,
                            verticalSwiping: false
                        }
                    },

                    {
                        breakpoint: 1020,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            verticalSwiping: false
                        }
                    }
                ]
            });

            function syncPosition(value) {
                var current = value;
                $slider02
                    .find(".slick-slide")
                    .removeClass("synced")
                    .eq(current)
                    .addClass("synced");
                center(current);
            }

            $slider02.on("click", ".slick-slide", function (e) {
                e.preventDefault();
                var number = $(this).data("slick-index");
                $slider01.slick("slickGoTo", number);
            });

            function center(number) {
                var num = number;
                var found = false;
                var lastSlideIndex = $slider02.find('.slick-slide:last').index();
                for (var i in visibleItems) {
                    if (num === visibleItems[i]) {
                        var found = true;
                    }
                }

                if (found === false) {
                    if (num > visibleItems[visibleItems.length - 1]) {
                        if (num == lastSlideIndex) {
                            $slider02.slick("slickGoTo", num - visibleItems.length + 1);
                        }

                        else {
                            $slider02.slick("slickGoTo", num - visibleItems.length + 2);
                        }
                    }
                    else {
                        if (num - 1 === -1) {
                            $slider02.slick("slickGoTo", 0);
                        }
                        else {
                            $slider02.slick("slickGoTo", num - 1);
                        }
                    }

                } else if (num === visibleItems[visibleItems.length - 1]) {
                    $slider02.slick("slickGoTo", visibleItems[1]);
                } else if (num === visibleItems[0]) {
                    $slider02.slick("slickGoTo", num - 1);
                }
            }
        });
    }

    OsProductThumbnailSlider();

    /**
     * Isotope
     * @constructor
     */
    function OsIsotop() {

        $('.isotope-container').each(function () {
            var $this = $(this);
            var option = {
                layoutMode: 'masonry',
                itemSelector: '.grid-item',
                transitionDuration: '0.3s'
            };

            if ($this.find('.grid-sizer').length > 0) {
                option.masonry = {};
                option.masonry.columnWidth = '.grid-sizer';
            }

            var $grid = $this.find('.isotope-grid').isotope(option);


            // Build layout when image is loaded
            $grid.imagesLoaded().progress(function () {
                $grid.isotope('layout');
            });

            // Isotope filter
            var $Filter = $this.find('.portfolio-filter');

            $Filter.find('.filter-button').on('click', function (event) {
                event.preventDefault();
                $grid.isotope({filter: $(this).attr('data-filter')});
                $(this).siblings().removeClass('is-checked');
                $(this).addClass('is-checked');
            });

            //Fix parallax background
            $grid.on('layoutComplete', function () {
                $(window).trigger('resize.px.parallax');
            });

        });
    }

    OsIsotop();

    /**
     * Masonry with responsive with based on base width
     * @constructor
     */
    function OsMasonryFlex() {
        $('.masonry-container').each(function () {
                var minwidth = parseInt($(this).data('masonry-grid-width'), 10) || 370;
                var $container = $(this);
                var oldWidth = $container.innerWidth();
                var oldRatio = oldWidth / minwidth;
                var $masonryOpt = {itemSelector: '.masonry-item'};
                var $masonry = $container.masonry($masonryOpt);

                function ResizeItem(containerWidth) {
                    var Ratio = Math.floor(containerWidth / minwidth);
                    if (Ratio === 0) {
                        Ratio = 1;
                    }
                    else if (Ratio != oldRatio) {
                        var itemWidth = 1 / Ratio;
                        $container.children('.masonry-item').css({width: itemWidth * 100 + '%'});
                    }
                }

                ResizeItem(oldWidth);

                // On ImagesLoaded
                $masonry.imagesLoaded().progress(function () {
                    $masonry.masonry('layout');
                });

                // Window on resize
                $(window).on('resize', function () {
                    var newWidth = $container.innerWidth();
                    if (newWidth != oldWidth) {
                        ResizeItem(newWidth);
                        oldWidth = newWidth;
                    }
                });

                //Fix parallax background
                $masonry.on('layoutComplete', function () {
                    $(window).trigger('resize.px.parallax');
                });
            }
        )
        ;

    }

    OsMasonryFlex();

    /**
     * Portfolio Images Galley with magnific popup
     * @constructor
     */
    function OsPortfolioZoomedGallery() {

        $('.group-portfolio , .magnific-gallery').each(function () {
            $(this).magnificPopup({
                delegate: '.zoom-button', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
                zoom: {
                    enabled: $(this).hasClass("no-zoom-effect") ? false : true,
                    duration: 300,
                    easing: 'ease-in-out',
                    opener: function (openerElement) {
                        if (openerElement.hasClass('img-wrapper')) {
                            return openerElement.find('img');
                        }
                        else {
                            return openerElement.parents('.overlay');
                        }

                    }
                }
            });
        });
    }

    OsPortfolioZoomedGallery();


    /**
     * Progress bar
     * @constructor
     */
    function OsProgressbar() {
        $('.group-progressbar').each(function () {
            var $this = $(this);
            var waypoint = $this.waypoint({
                handler: function (direction) {
                    $this.find('.progressbar').progressbar({display_text: 'center'});
                    this.destroy();
                },
                offset: "80%"
            });
        })
    }

    OsProgressbar();

    /**
     * Piechart and doughnut chart
     * @constructor
     */
    function OsPiechart() {
        $('.piechart').each(function () {
            var option = {segmentShowStroke: false, responsive: true};
            var data = [];

            $(this).children('.pie-legend').children('li').each(function () {
                var temp = {};
                var $this = $(this);

                temp.value = $this.data('value');
                temp.color = $this.children('.__color').css('background-color');
                temp.label = $this.children('.__legend').html();

                data.push(temp);
            });

            if ($(this).hasClass('doughnut')) {
                option.percentageInnerCutout = 55;
            }
            var ctx = $(this).children('.chart').children('canvas').get(0).getContext("2d");

            var PieChart = new Chart(ctx).Pie(data, option);

        });
    }

    OsPiechart();

    /**
     * Piechart
     * @constructor
     */
    function OsEasyPiechart() {
        $('.easy-piechart').each(function () {
            var $this = $(this);
            var value = Number($this.data("value")) / 100;

            var option = {
                strokeWidth: 5,
                trailWidth: 5,
                duration: 1500,
                easing: 'bounce',
                text: {
                    value: '0%'
                },
                step: function (state, bar) {
                    bar.setText((bar.value() * 100).toFixed(0) + "%");
                }
            }

            var circle = new ProgressBar.Circle($(this)[0], option);

            $this.waypoint({
                handler: function (direction) {
                    circle.animate(value);
                    this.destroy();
                },
                offset: "68%"
            });

        });

    }

    OsEasyPiechart();


    /**
     * Coverbox
     * @param $selector
     * @constructor
     */

    function OsCoverBox($selector) {
        $children = $selector.children('.cover-box');
        var oldCol = 0;
        // reinit cover box if number col change , change to normal style if data-* in current window screen was not set
        $(window).on('resize load', function () {
            var numCol = returnNumcol($selector);

            if (numCol === 0) {
                $children.removeClass('active').addClass('normal-style').css({
                    'width': '100%',
                    'margin-right': '0%'
                });
                oldCol = numCol;
            }
            else if (!(numCol === oldCol)) {
                //Active all child if has only one col
                if (numCol === 1) {
                    $children.initBox(numCol);
                    $children.activeBox(numCol);
                }
                else {
                    $children.initBox(numCol);
                    $children.filter(function (index) {
                        // Return caro layout
                        return (index % numCol === 0 && (index / numCol) % 2 === 0) || (index - 1) % numCol === 0 && (((index - 1) / numCol) % 2 === 1);
                    }).activeBox(numCol);

                }
                oldCol = numCol;
            }
        });
        //switch class active in row of coverbox
        $children.on('mouseover', function () {
            var numCol = returnNumcol($selector);
            if (numCol > 0 && !($(this).hasClass('active'))) {
                var From = parseInt($(this).index() / numCol, 10) * numCol;
                $children.slice(From, From + numCol).deactiveBox();
                $(this).activeBox(numCol);
            }
        });

        function returnNumcol($elem) {
            var WW = window.innerWidth;
            var numCol = 0;
            if (WW >= 480) {
                numCol = $elem.data('xs') || numCol;
            }
            if (WW >= 768) {
                numCol = $elem.data('sm') || numCol;
            }
            if (WW >= 1020) {
                numCol = $elem.data('md') || numCol;
            }
            if (WW >= 1230) {
                numCol = $elem.data('lg') || numCol;
            }
            if (WW >= 1400) {
                numCol = $elem.data('xlg') || numCol;
            }
            return numCol;
        }

        $.fn.initBox = function (numCol) {
            $(this).removeClass('active normal-style');
            $(this).css({
                'width': 100 / (numCol + 1) + '%',
                'margin-right': '0%'
            });
        };
        $.fn.activeBox = function (numCol) {
            $(this).addClass('active');
            $(this).css('margin-right', 100 / (numCol + 1) + '%');
        };
        $.fn.deactiveBox = function () {
            $(this).removeClass('active');
            $(this).css('margin-right', '0');
        }
    }

    /**
     * Active Coverbox
     * @constructor
     */
    function OsCoverBoxActive() {
        $(".cover-box-container").each(function () {
            OsCoverBox($(this));
        });
    }

    OsCoverBoxActive();

    function OsGoogleMap() {
        // When the window has finished loading create our google map below
        var marker_image = "assets/images/logo/map-marker.png";

        if ($('#map').length > 0) {
            if($('#map').attr('data-marker-image') != undefined){
                marker_image = $('#map').attr('data-marker-image')
            }
            google.maps.event.addDomListener(window, 'load', init);
        }

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 11,
                scrollwheel: false,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(40.6700, -73.9400), 

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#d3d3d3"}]
                }, {
                    "featureType": "transit",
                    "stylers": [{"color": "#808080"}, {"visibility": "off"}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#b3b3b3"}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"weight": 1.8}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#d7d7d7"}]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{"visibility": "on"}, {"color": "#ebebeb"}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{"color": "#a7a7a7"}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}]
                }, {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{"visibility": "on"}, {"color": "#efefef"}]
                }, {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#696969"}]
                }, {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{"visibility": "on"}, {"color": "#737373"}]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                }, {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{"visibility": "off"}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#d6d6d6"}]
                }, {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                }, {}, {"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#dadada"}]}]
            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');
            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.6000, -73.9400),
                map: map,
                title: 'AABID',
                icon: marker_image
            });

            var marker2 = new google.maps.Marker({
                position: new google.maps.LatLng(40.6800, -73.8000),
                map: map,
                title: 'AABID',
                icon: marker_image
            });

            var marker3 = new google.maps.Marker({
                position: new google.maps.LatLng(40.7300, -74.1280),
                map: map,
                title: 'AABID',
                icon: marker_image
            });

        }
    }

    OsGoogleMap();

    /**
     * Add info for main nav
     * @constructor
     */
    function OsNavAdditionInfo() {
        $('.aa-menu a[href="#"]').on('click', function (event) {
            event.preventDefault();
        });
        $('.aa-menu li').has('ul').addClass('li-node').parent().addClass('ul-node');
        $('.aa-menu .mega-menu:not(.menu-fullwidth)').parent().css('position', 'relative')
    }

    OsNavAdditionInfo();

    function OsBackToTop(){
        if($('#back-to-top-btn').length > 0){
            $('#back-to-top-btn').on('click', function(){
                $('html,body').animate({
                        scrollTop: 0
                    },
                    400
                );
            });

            $(window).on('scroll', function(){
                if($(this).scrollTop()>= $('#page-body').position().top){
                    $('#back-to-top-btn').addClass('show-this');
                }
                else {
                    $('#back-to-top-btn').removeClass('show-this');
                }
            })
        }
    }
    OsBackToTop();
    /**
     * Action with nav fixed
     * @constructor
     */
    function OsNavFixed() {
        if ($('.nav-fixed').length > 0) {
            var $body = $('body');
            var $appear_target = $('#page-body');

            $(window).on('scroll , load', function () {
                var windowToTop = $(this).scrollTop();

                if (windowToTop > 1 && !$body.hasClass('$body')) {
                    $body.addClass('nav-fixed-transformed');
                }
                else {
                    $body.removeClass('nav-fixed-transformed');
                }

                if (windowToTop >= $appear_target.position().top) {
                    $body.addClass('nav-fixed-appeared');
                }
                else {
                    $body.removeClass('nav-fixed-appeared');
                }

            });
        }
    }

    OsNavFixed();

    /**
     * Smooth scroll when click a link to internal object
     * @constructor
     */
    function OsEasingClick() {
        $('.easing-link-group a[href^="#"] , a.easing-link[href^="#"]').not('[href="#"]').on('click', function (event) {
            event.preventDefault();

            var $this = $(this);
            var elementPostion = $($this.attr('href')).offset().top;

            $('html,body').animate({
                    scrollTop: elementPostion
                },
                400, function () {
                    $('body').removeClass('mobile-nav-open');
                }
            );
        });
    }

    OsEasingClick();

    /**
     * Sticky nav
     * @constructor
     */
    function OsStickyNav() {
        $('.nav-sticky').each(function () {
            var sticky = new Waypoint.Sticky({
                element: $(this)[0]
            });
        });
    }

    OsStickyNav();

    /**
     * Selectmenu with Jquery UI
     * @constructor
     */
    function OsSelectMenu() {
        $('.select-menu').each(function () {
            $(this).selectmenu();
        })
    }

    OsSelectMenu();

    /**
     * Mobile Menu
     * @constructor
     */
    function OsMobileMenu() {

        // === Moblie Menu Layout ===
        var $Menu = $('.mobile-menu');
        var $ActiveLink = $Menu.find('li').has('ul').children('a');
        var $MenuChildUl = $Menu.find('li ul');

        // Prevent default action of link href="#"

        // Active menu when click link on li
        $ActiveLink.on('click', function () {
            $(this).closest('li').addClass('active');
            $(this).closest('ul').addClass('active');
        });

        // Add back button and select it
        $MenuChildUl.prepend('<li class="__back">' +
            '<a href="#">BACK</a>' +
            '</li>');

        // Add event to back button
        $MenuChildUl.find('.__back a').on('click', function (event) {
            event.preventDefault();
            $(this).closest('li.active').removeClass('active');
            $(this).closest('ul.active').removeClass('active');
        });

        // Close Menu
        function CloseMenu() {
            $('body').removeClass('mobile-nav-open');
            //Reset to init
            setTimeout(function () {
                $Menu.find('li.active').removeClass('active');
            }, 300);

        }

        // === Moblie Menu Action ===
        $('.mobile-nav-toggle').on('click', function (event) {
            event.preventDefault();
            if ($('body').hasClass('mobile-nav-open')) {
                CloseMenu();
            }
            else {
                $('body').addClass('mobile-nav-open');
            }
        })

        $(window).on('resize', function () {
            if (window.innerWidth >= 992) {
                $('body').removeClass('mobile-nav-open');
            }
        })
    }

    OsMobileMenu();

    /**
     * Offcanvas nav
     * @constructor
     */
    function OsOffcanvas() {
        $('.offcanvas-nav-toggle').on('click', function (event) {
            event.preventDefault();
            $('body').toggleClass('offcanvas-nav-open');
        });

        $(window).on('resize', function () {
            if (window.innerWidth < 1230) {
                $('body').removeClass('offcanvas-nav-open');
            }
        })
    }

    OsOffcanvas();

    /**
     * Shop side bar offcanvas
     * @constructor
     */
    function OsShopSidebarOffcanvas() {
        $(".shop-sidebar-toggle").each(function () {
            $(this).on('click', function (event) {
                event.preventDefault();
                $('body').toggleClass('shop-sidebar-open');
            });

            $(window).on('resize', function () {
                if (window.innerWidth < 1230) {
                    $('body').removeClass('shop-sidebar-open');
                }
            });
        });
    }

    OsShopSidebarOffcanvas();

    /**
     * Nav Popup
     * @constructor
     */
    function OsNavPopup() {
        $(".nav-menu-popup").hide();
        $(".nav-menu-popup-trigger").each(function () {
            $(this).on('click', function () {
                event.preventDefault(event);
                $('body').toggleClass('nav-menu-popup-open');
                $(".nav-menu-popup").fadeToggle();
            });
        });
    }

    OsNavPopup();

    /**
     * Accordion
     * @constructor
     */
    function OsAccordion() {
        $(".accordion").each(function () {
            var $accordion = $(this);
            $accordion.accordion({
                active: $accordion.data("ui-active") || 0,
                animate: $accordion.data("ui-animate") || 300,
                collapsible: true,
                header: ".accordion-header",
                heightStyle: $accordion.data("ui-height-style") || "auto",
                icons: false
            });

            $(window).on("resize load", function () {
                $accordion.accordion("refresh");
            });
        });
    }

    OsAccordion();

    /**
     * Expendable Section
     * @constructor
     */
    function OsExpendableSection() {
        $(".expendable-section").each(function () {
            var $container = $(this),
                $header = $(this).children(".expendable-section-header");
            if (!($header.hasClass("header-active"))) {
                $header.next(".expendable-section-body").hide();
            }

            $header.on("click", function (event) {
                event.preventDefault();
                var $content = $(this).next(".expendable-section-body");

                if ($(this).hasClass("header-active") && $content.is(":visible")) {
                    $(this).removeClass("header-active");
                    $content.slideUp(400);
                }

                else {
                    $(this).addClass("header-active");
                    $content.slideDown(400);
                }
            });

        });
    }

    OsExpendableSection();

    /**
     * Toggle block
     * @constructor
     */
    function OsToggleBlock() {
        $(".toggle-block-container").each(function () {
            var $container = $(this);
            var $target = $container.find(".toggle-block-target");
            $target.hide();

            $container.find(".toggle-block-trigger").on("click", function (event) {
                event.preventDefault();
                $target.slideToggle(300);
            });
        });
    }

    OsToggleBlock();

    /**
     * Price Filter
     * @constructor
     */
    function OsPriceFilter() {
        $(".price-filter").each(function () {

            String.prototype.toDec = function () {
                return parseInt(this, 10);
            };

            var $sliderRange = $(this).find('.price-slider-range'),
                $valueFrom = $(this).find('span.from'),
                $valueTo = $(this).find('span.to'),
                minprice = $(this).data('min') || 0,
                maxprice = $(this).data('max') || 400,
                from = $(this).data('from') || 1,
                to = $(this).data('to') || 200;

            $sliderRange.slider({
                range: true,
                min: minprice,
                max: maxprice,
                values: [from, to],
                slide: function (event, ui) {
                    $valueFrom.text(ui.values[0]);
                    $valueTo.text(ui.values[1]);
                }
            });

            $valueFrom.text($sliderRange.slider("values", 0));
            $valueTo.text($sliderRange.slider("values", 1));
        });
    }

    OsPriceFilter();


    /**
     * Count Down
     * @constructor
     */
    function OsCountDown() {
        $('.countdown-clock').each(function () {
            var FinalTime = $(this).data('final-time');
            $(this).countdown(FinalTime, function (event) {
                $(this).html(event.strftime('' +
                    '<div><span>%m</span>Months</div>' +
                    '<div><span>%d</span>Days </div>' +
                    '<div><span>%H</span>Hours</div>' +
                    '<div><span>%M</span>Minutes</div>' +
                    '<div><span>%S</span>Seconds</div>'
                ));
            });
        });
    }

    OsCountDown();


    function OsModal() {
        if ($.modal) {
            $.modal.defaults = {
                overlay: "#000",  // Overlay color
                opacity: 0.7,     // Overlay opacity
                zIndex: 1140,    // Overlay z-index.
                escapeClose: true,    // Allows the user to close the modal by pressing `ESC`
                clickClose: true,    // Allows the user to close the modal by clicking the overlay
                closeText: 'Close', // Text content for the close <a> tag.
                closeClass: '',      // Add additional class(es) to the close <a> tag.
                showClose: true,    // Shows a (X) icon/link in the top-right corner
                modalClass: "modal", // CSS class added to the element being displayed in the modal.
                spinnerHtml: '<i class="fa fa-refresh fa-spin"></i>',// HTML appended to the default spinner during AJAX requests.
                showSpinner: true,    // Enable/disable the default spinner during AJAX requests.
                fadeDuration: 300,     // Number of milliseconds the fade transition takes (null means no transition)
                fadeDelay: 0      // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
            };

            function page_disable_scrolling(event, modal) {
                var ScrollBarWidth = window.innerWidth - $(window).width();
                $('html').css({overflow: 'hidden', 'padding-right': ScrollBarWidth + 'px'});

                if ($('.product-thumbnail-slider').length > 0) {
                    $('.product-thumbnail-slider .syn-slider-1').slick('setDimensions');
                    $('.product-thumbnail-slider .syn-slider-2').slick('setDimensions');
                }

                if ($('.modal').length > 0) {
                    $('.modal').on( 'mousewheel', function ( e ) {
                        var event = e.originalEvent,
                            d = event.wheelDelta || -event.detail;

                        this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
                        e.preventDefault();
                    });
                }

                if ($('.jquery-modal.blocker').length > 0) {
                    $('.jquery-modal.blocker').on( 'mousewheel', function ( e ) {
                        e.preventDefault();
                    });
                }
            }

            function page_enable_scrolling(event, modal) {
                $('html').css({overflow: '', 'padding-right': ''});
            }

            $(document).on($.modal.OPEN, page_disable_scrolling);
            $(document).on($.modal.CLOSE, page_enable_scrolling);

            $(window).on('resize', function () {
                $.modal.resize();
            });
        }


        //- Call modal with link
        $('a[data-modal-open]').on('click', function (event) {
            event.preventDefault();
            $(this).modal();
        });
        $('a[data-modal-close]').on('click', function () {
            $.modal.close();
            return false;
        })

    }

    OsModal();

    /**
     * Rating star
     * @constructor
     */
    function OsRatingStar() {
        $('.star-ratings').each(function () {
            var point = parseInt($(this).attr('data-rating'), 10);
            if (point === 5) {
                $(this).children("span").addClass('rated');
            } else {
                $(this).children().eq(point).prevAll().addClass('rated');
            }
        });
    }

    OsRatingStar();

    /**
     * Tabs
     * @constructor
     */
    function OsTabs() {
        $('.tabs').each(function () {
            var $this = $(this);
            if (!($(this).data("ui-disable") == null)) {
                var data_disable = $(this).data("ui-disable").split(",").map(function (e) {
                    return parseInt(e, 10);
                });
            }
            $this.tabs({
                active: $this.data("active") || 0,
                hide: {effect: "fadeOut", duration: 100},
                show: {effect: "fadeIn", duration: 100},
                disabled: data_disable
            });
        });
    }

    OsTabs();

    /**
     * Quantity Input
     * @constructor
     */
    function OsQuantityInput() {
        $('.quantity-input').each(function () {
            $(this).find("button").on('click', function (event) {
                event.preventDefault();

                var $button = $(this);
                var oldValue = $button.parents('.quantity-input').find("input.number").val();

                if ($button.hasClass("add")) {
                    var newVal = parseFloat(oldValue) + 1;
                }

                if ($button.hasClass("subract")) {
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }

                $button.parents('.quantity-input').find("input.number").val(newVal);
            });
        });
    }

    OsQuantityInput();

    /**
     * Select Menu
     * @constructor
     */
    function OsSelectMenu() {
        $('.select-menu').each(function () {
            var $seclectMenu = $(this);
            var menuClass = $seclectMenu.parent(".select-wrapper").data("menu-class");
            $seclectMenu.selectmenu({
                icons: {button: $(this).data("ui-icon") || "icon-down-open-big"}
            });

            if (!(menuClass === undefined)) {
                $seclectMenu.selectmenu("menuWidget").addClass(menuClass);
            }


            $(window).on("resize load", function () {
                $seclectMenu.selectmenu("refresh");
            });
        });
    }

    OsSelectMenu();

    /**
     * Use wow to put animation when scrolling
     * @constructor
     */
    function OsAnimation() {
        wow = new WOW(
            {
                boxClass: 'wow',      // default
                animateClass: 'animated', // default
                offset: 0,          // default
                mobile: true,       // default
                live: true        // default
            }
        );
        wow.init();
    }

    OsAnimation();

    /**
     * Submit contact form with ajax
     * @constructor
     */
    function OsContactSubmit() {
        $('#contact_form').on('submit', function (event) {
            event.preventDefault();

            var $submit_button = $(this).find('button[type="submit"]');
            var backup_button = $submit_button.html();
            var data = $(this).serialize();

            $submit_button.html('PROCESSING').attr('disabled', 'disabled');

            $.ajax({
                type: "POST",
                url: 'phpscript/contact.php',
                data: data,

                // Notify result
                success : function (result) {
                    if(result == ""){
                        $submit_button.html('SUCCESSFUL <i class="fa fa-check"></i>');
                        setTimeout(function(){
                            $submit_button.removeAttr('disabled').html(backup_button);
                        },2000)
                    }
                    else{
                        alert(result);
                        $submit_button.removeAttr('disabled').html(backup_button);
                    }
                }
            });
        })
    }

    OsContactSubmit();

    /**
     * Add particle background effect
     * @constructor
     */
    function OsParticleEffect(){
        if($('#particles-js').length > 0){
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    OsParticleEffect();

});
