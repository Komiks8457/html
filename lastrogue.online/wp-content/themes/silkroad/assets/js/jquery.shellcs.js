$ = jQuery;

$(function ($) {
    $.fn.idTabs = function () {
        //Loop Arguments matching options
        var s = {};
        for (var i = 0; i < arguments.length; ++i) {
            var a = arguments[i];
            switch (a.constructor) {
                case Object: $.extend(s, a); break;
                case Boolean: s.change = a; break;
                case Number: s.start = a; break;
                case Function: s.click = a; break;
                case String:
                    if (a.charAt(0) == '.') s.selected = a;
                    else if (a.charAt(0) == '!') s.event = a;
                    else s.start = a;
                    break;
            }
        }

        if (typeof s['return'] == "function") //backwards compatible
            s.change = s['return'];

        return this.each(function () { $.idTabs(this, s); }); //Chainable
    }

    $.idTabs = function (tabs, options) {
        //Settings
        var meta = ($.metadata) ? $(tabs).metadata() : {};
        var s = $.extend({}, $.idTabs.settings, meta, options);

        //Play nice
        if (s.selected.charAt(0) == '.') s.selected = s.selected.substr(1);
        if (s.event.charAt(0) == '!') s.event = s.event.substr(1);
        if (s.start == null) s.start = -1; //no tab selected

        //Setup Tabs
        var showId = function () {
            if ($(this).is('.' + s.selected))
                return s.change; //return if already selected
            var id = "#" + this.href.split('#')[1];
            var aList = []; //save tabs
            var idList = []; //save possible elements
            $("a", tabs).each(function () {
                if (this.href.match(/#/)) {
                    aList.push(this);
                    idList.push("#" + this.href.split('#')[1]);
                }
            });
            if (s.click && !s.click.apply(this, [id, idList, tabs, s])) return s.change;
            //Clear tabs, and hide all
            for (i in aList) $(aList[i]).removeClass(s.selected);
            for (i in idList) $(idList[i]).hide();
            //Select clicked tab and show content
            $(this).addClass(s.selected);
            $(id).show();
            return s.change; //Option for changing url
        }

        //Bind idTabs
        var list = $("a[href*='#']", tabs).unbind(s.event, showId).bind(s.event, showId);
        list.each(function () { $("#" + this.href.split('#')[1]).hide(); });

        //Select default tab
        var test = false;
        if ((test = list.filter('.' + s.selected)).length); //Select tab with selected class
        else if (typeof s.start == "number" && (test = list.eq(s.start)).length); //Select num tab
        else if (typeof s.start == "string" //Select tab linking to id
            && (test = list.filter("[href*='#" + s.start + "']")).length);
        if (test) { test.removeClass(s.selected); test.trigger(s.event); } //Select tab

        return s; //return current settings (be creative)
    }

    //Defaults 
    $.idTabs.settings = {
        start: 0,
        change: false,
        click: null,
        selected: ".selected",
        event: "!click"
    };

    //Version 
    $.idTabs.version = "2.2";

    //Auto-run 
    $(function () { $(".idTabs").idTabs(); });

});

$(function ($) {
    /*
    * Droppy 0.1.2
    * (c) 2008 Jason Frame (jason@onehackoranother.com)
    */
    $.fn.droppy = function (options) {
        options = $.extend({ speed: 150 }, options || {});
        this.each(function () {
            var root = this, zIndex = 1000;
            function getSubnav(ele) {
                if (ele.nodeName.toLowerCase() == 'li') {
                    var subnav = $('> ul', ele);
                    return subnav.length ? subnav[0] : null;
                } else {
                    return ele;
                }
            }
            function getActuator(ele) {
                if (ele.nodeName.toLowerCase() == 'ul') {
                    return $(ele).parents('li')[0];
                } else {
                    return ele;
                }
            }
            function hide() {
                var subnav = getSubnav(this);
                if (!subnav) return;
                $.data(subnav, 'cancelHide', false);
                setTimeout(function () {
                    if (!$.data(subnav, 'cancelHide')) {
                        $(subnav).slideUp(options.speed);
                    }
                }, 150);
            }
            function show() {
                var subnav = getSubnav(this);
                if (!subnav) return;
                $.data(subnav, 'cancelHide', true);
                $(subnav).css({ zIndex: zIndex++ }).slideDown(options.speed);
                if (this.nodeName.toLowerCase() == 'ul') {
                    var li = getActuator(this);
                    $(li).addClass('hover');
                    $('> a', li).addClass('hover');
                }
            }
            $('ul, li', this).hover(show, hide);
            $('li', this).hover(
                function () { $(this).addClass('hover'); $('> a', this).addClass('hover'); },
                function () { $(this).removeClass('hover'); $('> a', this).removeClass('hover'); }
            );
        });
    };
});

/*
* qtyAdj - a jQuery plugin for quantity adjustment
* @author    Insik Kong(alcyone@joymax.com)
* @date       12.2010
*/
$(function ($) {
    $.fn.qtyAdj = function () {
        return this.each(function () {
            $(this).after('<span class="ctrl"><span class="add"></span><span class="minus"></span></span>').wrap('<div class="setter"><span class="cont"></span></div>');

            var target = $(this).parents('.qty').find("input");

            $(this).parents('.qty').find('.add').click(function () {
                var currentVal = parseInt(target.val());
                if (isNaN(currentVal)) {
                    target.val("1");
                } else if (!isNaN(currentVal)) {
                    if (currentVal < 0) {
                        target.val(Math.abs(currentVal));
                    } else if (currentVal < 99) {
                        target.val(currentVal + 1);
                    }
                    ItemAmountChange();
                }
            });

            $(this).parents('.qty').find('.minus').click(function () {
                var currentVal = parseInt(target.val());
                if (!isNaN(currentVal) && currentVal > 1) {
                    target.val(currentVal - 1);
                }
                ItemAmountChange();
            });
        });
    };
});

// Mall - On css
function ItemOn() {
    $(this).parents('li').addClass("item-active");
    try { CallToolTip($(this)); } catch (e) { } // limjang add
    $("#header").css("z-index", "3");
}
// Mall - Off css
function ItemOff() {
    $(this).parents('li').removeClass("item-active");
    $("#header").css("z-index", "5");
}
// Mall - On css
function ItemCartOn() {
    $(this).parents('li').addClass("itemcart-active");
}
// Mall - Off css
function ItemCartOff() {
    $(this).parents('li').removeClass("itemcart-active");
}
// play guide main - default
function PlayGuideOn() {
    $(this).parents('li').addClass("playguide-active");
}
// play guide main - sub
function PlayGuideOff() {
    $(this).parents('li').removeClass("playguide-active");
}

/*login form */
$(function ($) {
    $('#membership .val input').filter(function (index) {
        return $(this).val().length > 0;
    }).parents('.val').prev().siblings('label').hide().end().end().end().end().focus(function () {
        $(this).parents('.val').prev().siblings('label').hide();
    }).blur(function () {
        if ($(this).val().replace(/\s|/gi, '') == '') $(this).parents('.val').siblings('label').show();
    }).find();

});

//navigation
$(function ($) {
    $('#gnav').droppy(); // GNB Drop Down Menu
    $(document).pngFix(); //png
    $('.qty input').qtyAdj(); // Quantity Adjustment
    $(".item-list .item-img a").hover(ItemOn, ItemOff); // mall - on over css, tooltip
    $(".item-list .item-btn a").hover(ItemCartOn, ItemCartOff); // mall - on over css, tooltip
    $("#play-guide-gnav li .default a").hover(PlayGuideOn); // play guide main - default
    $("#play-guide-gnav li .sub").hover(function () { }, PlayGuideOff); // play guide main - sub
});

// quick menu
$(function ($) {
    $.extend($.fn, {
        Floater: function (setting) {
            var options = $.extend($.fn.Floater.defaults, setting);
            var box = this;
            var initTop = options.initTop;
            var initBottom = options.initBottom;
            if (options.bottom) {
                bottom_pos = $(window).height() - $(box).height() - initTop;
                $(box).css('top', bottom_pos);
                initTop = bottom_pos;
            }
            if (options.default_x) {
                box.css('left', getX($(options.default_x)));
                if (box.css('display') == 'none') box.css('display', 'block');
                $(window).bind('resize', function () {
                    box.css('left', getX($(options.default_x)));
                });
            }
            var prevTop = initTop;
            $(window).bind('scroll', function (e) { adjustTop(); });
            function getX(el) {
                return el.get(0).offsetLeft + el.width();
            };
            function adjustTop() {
                var newTop = computeTop();
                if (newTop <= initTop) {
                    newTop = initTop;
                }
                if (prevTop != newTop) {
                    layerMove(newTop);
                    prevTop = newTop;
                }
            };
            function layerMove(dest) {
                if (options.alwaysTop) {
                    $(box).css({ 'top': dest });
                } else {
                    $(box).stop();
                    $(box).animate({ 'top': dest }, { 'duration': options.speed });
                    if (dest > initTop) {
                        $("#quick").css("display", "block");
                        //$("#header").css("z-index", "3");
                    } else {
                        $("#quick").css("display", "none");
                        //$("#header").css("z-index", "5");
                    }
                }
            };
            function computeTop() {
                //return $(window).scrollTop() + initTop- initBottom;
                var scrollHeight = $(window).scrollTop() + $(window).height() - initTop / 2 - initBottom;
                return scrollHeight;
            };
        }
    });
    $.fn.Floater.defaults = {
        'alwaysTop': false,
        'bottom': false,
        'default_x': false,
        'initTop': 900,
        'speed': 30
    };
});


function action(form_id, api_url) {
    $(form_id).submit(function (event) {
        $(this).find('#submit').attr('disabled', 'disabled');
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: api_url,
            cache: false,
            timeout: 5000,
            data: $(this).serialize(),
            success: function (result) {
                switch (result) {
                    case "invalid_username":
                    case "incorrect_password":
                        $.notify("Incorrect login credentials");
                        break;
                    case "existing_username":
                        $.notify("User name already taken.");
                        break;
                    case "existing_user_email":
                        $.notify("Email address already taken.");
                        break;
                    case "login_ok":
                        window.location.reload();
                        break;
                    case "signup_ok":
                        $.notify("Registration successfull!", "success");
                        setInterval(() => {
                            window.location.reload();
                        }, 5000);
                        break;
                    case "update_ok":
                        $.notify("Profile successfully updated!", "info");
                        setInterval(() => {
                            window.location.reload();
                        }, 5000);
                        break;
                    default:
                        $.notify(result);
                }
            },
            fail: function () {
                $.notify("unknown_error");
                $(this).find('#submit').removeAttr('disabled');;
            }
        });
    });
}

function jNotify(message, type) {
    if (type == undefined) {
        type = "error";
    }
    $.notify(message, type);
}

function getstatus() {
    $.ajax({
        type: "POST",
        url: "/wp-json/v1/sr/server/status",
        success: function (r) {
            var arr = r.split('|');
            $('#onlineplayers').html(arr[0] + "/" + arr[1]);
            $('#serverstatus').html(arr[2] == 2 ? '<span class="online">Online, Operating</span>' : '<span class="offline">Offline</span>');
        }
    });
}

$(document).ready(function ($) {
    //$(".ch-sub #developer").click(function() {
    $("#quick").css("display", "block");
    var options = {
        'speed': 500, // 스피드
        'initTop': 900,  // 기본 top 위치
        'initBottom': 70,  // Bottom
        'alwaysTop': false, // 항상� � � true , false 이동
        'default_x': '#content'  //� �어아웃이 가운데 � �� � 일때 � �이어가 붙는 아이디값
    }
    $('#quick').Floater(options);
    //});
    $("body").trigger("click");
});
