//Google Analytics call
$.getScript('/js/vendor/kc-analytics.js', function(){});

$('[data-kccomponent]').each(function () {
    var $this = $(this),
    url = $this.data('kccomponent') + '.aspx?a=true';
    $this.html('');

    $.ajax({
        type: 'GET',
        url: url
    }).done(function (data) {
        $this.append(data);
        //for datedlist popovers          
        $('.popoveritem').popover();
    });
});
/* Sidemenu initialize http://getbootstrap.com/examples/offcanvas/*/
$('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
});
//Hide links in global navigation dropdown menu
$('.hidden-link').hide();
$('a.toggle-hidden-links').click(function () {
    if ($(this).hasClass('open')) {
        $('.hidden-link').hide('fast');
        $(this).removeClass('open');
    }
    else {
        $('.hidden-link').hide('fast');
        $('a.toggle-hidden-links').removeClass('open');
        $(this).closest('ul').children('.hidden-link').show('fast');
        $(this).addClass('open');
    }
});
//Main-content fade upon hovering over main nav
//Update 7/25/2013: Added code to test for touch device.
if (!is_touch_device()) {
    $('header .navbar .dropdown-toggle').hover(
        function (e) {
            $('#main-content').stop(true).fadeTo(300, 0.3);
            $('#home-content').stop(true).fadeTo(300, 0.3);
        },
        function (e) {
            $('#main-content').stop(true).fadeTo(300, 1);
            $('#home-content').stop(true).fadeTo(300, 1);
        }
        );
    $('header .dropdown-menu').hover(
        function (e) {
            $('#main-content').stop(true).fadeTo(300, 0.3);
            $('#home-content').stop(true).fadeTo(300, 0.3);
        },
        function (e) {
            $('#main-content').stop(true).fadeTo(300, 1);
            $('#home-content').stop(true).fadeTo(300, 1);
        }
    );
}
else {
    $('.navbar  a.dropdown-toggle').click(function (event) {
        event.preventDefault();
        $('.dropdown-toggle').removeClass('disabled');
    });
}
function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window; 
}
// Force touch screens to remove the menu when touching body of page
$('#main-content').click(function () {
    $('.dropdown-toggle').removeClass('show');
});
/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
    if (c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener('click', function (a) {
            d = a.target;
            while (!f.test(d.nodeName)) d = d.parentNode
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href);
        }, !1);
    }
})(document, window.navigator, 'standalone');

/* Prevent click event on empty a href tags */
$('a[href="#"]').click(function (event) {
    event.preventDefault();
});

// Yamm menu setup
$(document).on('click', '.yamm .dropdown-menu', function(e) {
    e.stopPropagation();
});
//Sidebar nav indenting
//Only works up to four levels deep
//Also includes fix for active item
$('#sidebar .panel .list-group.collapsed').find('a.list-group-item').each(function () {
    $(this).css('padding-left', '+=10');
});
$('#sidebar .panel .list-group.collapsed > .list-group.collapsed').find('a.list-group-item').each(function () {
    $(this).css('padding-left', '+=10');
});
$('#sidebar .panel .list-group.collapsed >.list-group.collapsed > .list-group.collapsed').find('a.list-group-item').each(function () {
    $(this).css('padding-left', '+=10');
});
 $('#sidebar .panel .list-group.collapsed > .list-group.collapsed > .list-group.collapsed > .list-group.collapsed').find('a.list-group-item').each(function () {
    $(this).css('padding-left', '+=10');
});
var activeSidebarItem = $('.sidebar-offcanvas .list-group-item.active');
$(activeSidebarItem).each(function( index) {
  $(this).css('padding-left', '-=6');
});
$('#sticky-footer').scrollToFixed( {
bottom: 0, 
limit: $('#footer-nav-limit').offset().top,
fixed: function () {
    $(this).css('display', 'block');
    $(this).css('width', '100%');
},
unfixed: function () {
   $(this).css('display', 'none');
},
dontSetWidth: false
});

/****
* Set up for addthis sharing button
* Need King County PubID to gather stats http://support.addthis.com/customer/portal/articles/381265-addthis-sharing-endpoints#twitter
****/

$('a#facebook-share-button').click(function (event) {
    event.preventDefault();
    var pathname = $(location).attr('href');
    var left = ($(window).width() / 2) - (700 / 2);
    var top = ($(window).height() / 2) - (325 / 2);
    try {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/facebook/offer?url=' + pathname, 'Facebook popup', 'scrollbars=no, height=325, width=700, top=' + top + ', left=' + left);
    }
    catch (e) {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/facebook/offer?url=' + pathname, 'Facebookpopup');
    }
    return false;
});
$('a#twitter-share-button').click(function (event) {
    event.preventDefault();
    var pathname = $(location).attr('href');
    var left = ($(window).width() / 2) - (700 / 2);
    var top = ($(window).height() / 2) - (325 / 2);
    try {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/twitter/offer?url=' + pathname, 'Twitter popup', 'scrollbars=no, height=325, width=700, top=' + top + ', left=' + left);
    }
    catch (e) {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/twitter/offer?url=' + pathname, 'Twitterpopup');
    }
    return false;
});
$('a#email-share-button').click(function (event) {
    event.preventDefault();
    var pathname = $(location).attr('href');
    var left = ($(window).width() / 2) - (700 / 2);
    var top = ($(window).height() / 2) - (325 / 2);
    try {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/email/offer?url=' + pathname, 'Email popup', 'scrollbars=no,height=525,width=700,top=' + top + ',left=' + left);
    }
    catch (e) {
        window.open('!{httpPrefix}//api.addthis.com/oexchange/0.8/forward/email/offer?url=' + pathname, 'Emailpopup');
    }
    return false;
});
$('a#print-share-button').click(function (event) {
    event.preventDefault();
    var loc = encodeURI(window.location);
    window.open(loc + '?print=1', '_self');
    return false;
});
//http://getbootstrap.com/getting-started/#support-ie10-width
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
        '@-ms-viewport{width:auto!important}'
        )
    );
    document.querySelector('head').appendChild(msViewportStyle);
}
//Initialize Fitvids
$('#main-content').fitVids();

