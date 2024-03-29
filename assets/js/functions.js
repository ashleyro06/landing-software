/*global jQuery */
/* Contents
// ------------------------------------------------>
	1.  Loading Screen
	2.  HEADER AFFIX
	3.  HEADER One Page
	4.  Smoothly Scroll To
	5.  Background
	6.  Counter Up
	7.  MAGNIFIC POPUP
	8.  POPUP VIDEO
	9.  GALLERY CAROUSEL
	10. TESTIMONIAL CAROUSEL
	11. Ajax Mailchimp
	12. Ajax Campaignmonitor
	13. Ajax Contact Form
	14. Qnatity of Devices
*/
(function($) {
    "use strict";

    /* ------------------  Loading Screen ------------------ */

    $(window).on("load", function() {
        $(".preloader").fadeOut("slow");
        $(".preloader").remove();
    });

    /* ------------------ HEADER AFFIX ------------------ */

    var $navAffix = $(".header-onepage nav");
    $navAffix.affix({
        offset: {
            top: 50
        }
    });

    /* ------------------ HEADER One Page ------------------ */

    if ($('body').length > 0) {
        $(window).on("scroll", function() {

            $('section').each(function() {
                var sectionID = $(this).attr("id"),
                    sectionTop = $(this).offset().top - 100,
                    sectionHight = $(this).outerHeight(),
                    wScroll = $(window).scrollTop();
                if (wScroll > sectionTop - 1 && wScroll < sectionTop + sectionHight - 1) {
                    $("nav a[href='#" + sectionID + "']").parent().addClass("active");
                } else {
                    $("nav a[href='#" + sectionID + "']").parent().removeClass("active");
                }

            });
        });
    }

    /* ------------------  Smoothly Scroll To ------------------ */

    var aScroll = $('a[data-scroll="scrollTo"]'),
        aNav = $('.navbar-nav a');
    aScroll.on('click', function(event) {
        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 93
            }, 1000);
        }
    });
    aNav.on('click', function() {
        $('.navbar-toggle').click();
    });

    /* ------------------  Background ------------------ */

    var $bgSection = $(".bg-section");
    var $bgPattern = $(".bg-pattern");
    var $colBg = $(".col-bg");

    $bgSection.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    $bgPattern.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-pattern");
        $(this).remove();
    });

    $colBg.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("col-bg");
        $(this).remove();
    });

    /* ------------------  Counter Up ------------------ */

    var counter = $(".counter");
    counter.counterUp({
        delay: 10,
        time: 1000
    });
    /* ------------------  POPUP VIDEO ------------------ */

    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });   

    /* ------------------  11.Ajax Mailchimp  ------------------ */

    $('#mailchimp').ajaxChimp({
        url: "http://wplly.us5.list-manage.com/subscribe/post?u=91b69df995c1c90e1de2f6497&amp;id=aa0f2ab5fa", //Replace with your own mailchimp Campaigns URL.
        callback: chimpCallback
    });

    function chimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscribe-alert').html('<h5 class="alert alert-success">' + resp.msg + '</h5>').fadeIn(1000);
            //$('.subscribe-alert').delay(6000).fadeOut();
        } else if (resp.result === 'error') {
            $('.subscribe-alert').html('<h5 class="alert alert-danger">' + resp.msg + '</h5>').fadeIn(1000);
        }
    }

    /* ------------------  12.Ajax Campaignmonitor  ------------------ */

    $('#campaignmonitor').submit(function(e) {
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function(data) {
                if (data.Status === 400) {
                    alert("Error: " + data.Message);
                } else { // 200
                    alert("Success: " + data.Message);
                }
            });
    });

    /* ------------------  13.Ajax Contact Form  ------------------ */

    var contactForm = $("#contact-form");
    var contactResult = $('#contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function(contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/sendmail.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function(msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /* ------------------ Qnatity of Devices ------------------ */
	
	 $('.add-num').on('click', function() {
        var $qty = $("#pices");
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });
	
    $('.minus-num').on('click', function() {
        var $qty = $("#pices");
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $qty.val(currentVal - 1);
        }
        if (!isNaN(currentVal) && currentVal <= 1) {
            $qty.val(currentVal);
        }
    });

}(jQuery));