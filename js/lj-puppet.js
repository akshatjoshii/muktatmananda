/*
  Author: Lumberjacks
  Template: Puppet (Landing Page)
  Version: 1.0
  URL: http://themeforest.net/user/Lumberjacks/
*/

(function($) {
  "use strict";

  $(document).ready(function (){
    'use strict';

    // E-mail validation via regular expression
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };

    // Ajax mailchimp
    // Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    $('#subscribe').ajaxChimp({
      language: 'lj',
      url: 'http://the-lumberjacks.us8.list-manage.com/subscribe/post?u=1642d6ac88961ed4fdb6abb3d&id=4c8ac782a1'
    });

    // Mailchimp translation
    //
    // Defaults:
    //'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.lj = {
      'submit': 'Submitting...',
      0: '<i class="fa fa-check"></i> We will be in touch soon!',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    }

    // Contact form functions
    $(function () {
      $("#contactform").on('submit',function (event) {
          
          var input = $('.lj-contact-message');
          
          if(!input.is(':empty')) {
            input.stop(true);
          }
          event.preventDefault();
          event.stopImmediatePropagation();

          var name = $("input#contact-name");
          var email = $("input#contact-email");
          var phone = $("input#contact-phone");
          var message = $("textarea#contact-message");

          if (name.val() == "" || email.val() == "" || phone.val() == "" || message.val() == "") {
            input.stop(true).html('<i class="fa fa-warning"></i> All fields are required.');
            $("#contactform").find("input[type=text],textarea").filter(function(){
              if($(this).val() == ""){
                 event.preventDefault();
                 return true;
              }
            }).first().focus();
          }
          else if (!isValidEmailAddress( email.val() )) {
            input.stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
            email.focus();
          }
          else {
            $.ajax({
              type: "POST",
              url: "./php/send-contact.php",
              data: {contact_name:name.val(),
                     contact_email:email.val(),
                     contact_phone:phone.val(),
                     contact_message:message.val()},
              success: function () {
                input.html('<i class="fa fa-check"></i> Thank you for your message!');
                name.val('');
                email.val('');
                phone.val('');
                message.val('');
              }
            });
          }
       });
    });

    // Slick initializer function
    $(".lj-carousel").slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false
    });
    $(".lj-clients-carousel").slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false
    });

    // Scroll to next module after Header section 
    $(".lj-scroll-down a").on('click',function(e) { 
      e.preventDefault();
      $('html,body').animate({
        scrollTop: $("header").nextAll('.module').offset().top},
        1250);           
    });

    // Countdown
    // To change date, simply edit: var endDate = "January 1, 2016 00:00:00";
    $(function() {
      var endDate = "August 18, 2016 00:00:00";
      $('.lj-subscribe h3 strong').countdown({
        date: endDate,
        render: function(data) {
          $(this.el).html(parseInt(this.leadingZeros(data.years, 2)*365, 10) + parseInt(this.leadingZeros(data.days, 2), 10) + ' days');
        }
      });
    });

    // backstretch
    //$("header").backstretch("img/bg.jpg");
    $(".video").backstretch("img/video-2.jpg");

    // Simple Text Rotator
    $("#words").wordsrotator({
      autoLoop: true,             //auto rotate words
      randomize: false,               //show random entries from the words array
      stopOnHover: false,             //stop animation on hover
      changeOnClick: false,           //force animation run on click
      animationIn: "bounceIn",         //css class for entrace animation
      animationOut: "fadeOut",           //css class for exit animation
      speed: 4000,                //delay in milliseconds between two words
      words: ['World-class.', 'Super flexible.', 'Fast set up.']  //Array of words, it may contain HTML values
    });

    // JQUERY.MB.YTPLAYER
    $(function(){
      $(".yt-player").mb_YTPlayer();
    });

    // yt controls
    $('#yt-play').on('click',function(event){
      event.preventDefault();
      if ($(this).hasClass("fa-play") ) {
          $('.yt-player').playYTP();
      } else {
          $('.yt-player').pauseYTP(); 
      }
      $(this).toggleClass("fa-play fa-pause");
      return false;
    });
    $('#yt-volume').on('click',function(event){
      event.preventDefault();
      $('.yt-player').toggleVolume();
      $(this).toggleClass("fa-volume-off fa-volume-up");
      return false;
    });

    // icon animations
    function iconAnimation(iconSelector,animationType) {
      $(iconSelector).on({
        mouseenter: function () {
          $(this).addClass('animated ' + animationType);
          $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated ' + animationType);
          });
        }
      });
    };

    // initalization of icon animations
    iconAnimation('.lj-icon-box-one i','rubberBand');
    iconAnimation('.lj-icon-box-two i','shake');
    iconAnimation('.lj-icon-box-three i','bounceIn');
    iconAnimation('.lj-icon-box-four i','tada');
    iconAnimation('.lj-statistics-one i','bounce');
    iconAnimation('.lj-statistics-two i','rotateIn');
    iconAnimation('.lj-statistics-three i','tada');
    iconAnimation('.lj-statistics-four i','flash');

    // statistics counter-up function
    $('.lj-statistics-one span,.lj-statistics-two span,.lj-statistics-three span,.lj-statistics-four span').counterUp({
      delay: 5,
      time: 2000
    });

    // WOW initalization
    new WOW().init();

    // tabs
    $('.lj-tabs li').on('click',function(){
      $('.lj-tabs-content > div').hide();
      $('.lj-tabs-photo img').hide();
      $('#' + $(this).attr('data-content-id')).show();
      $('#' + $(this).attr('data-photo-id')).show();
      $('.lj-tabs li').removeClass('lj-tabs-active');
      $(this).addClass('lj-tabs-active');
    });

    // hiding other team members on hover
    $(".lj-team-person").on({
      mouseenter: function () {
        $('.lj-team-person').not($(this)).css("opacity", "0.25");
      },
      mouseleave: function () {
        $('.lj-team-person').not($(this)).css("opacity", "1");
      }
    });

    // Featherlight
    $('.lj-video-box a').featherlight({
        closeOnClick:   'anywhere',
        afterContent: function(event) {
          // fitVids
          $(".featherlight-content").fitVids();
        }
    });
    

  });

  // Preloader
  // Change delay and fadeOut speed (in miliseconds)
  $(window).load(function() {
    $(".lj-preloader").delay(100).fadeOut(500);
  });

})(jQuery);