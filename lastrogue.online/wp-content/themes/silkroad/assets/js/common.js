function trim(str) {
    var count = str.length;
    var len = count;
    var st = 0;

    while ((st < len) && (str.charAt(st) <= ' '))
        st++;

    while ((st < len) && (str.charAt(len - 1) <= ' '))
        len--;

    return ((st > 0) || (len < count)) ? str.substring(st, len) : str;
}

function containsChars(input, chars) {
    for (var inx = 0; inx < input.length; inx++) {
        if (chars.indexOf(input.charAt(inx)) != -1)
            return true;
    }
    return false;
}

function containsCharsOnly(input, chars) {
    for (var inx = 0; inx < input.length; inx++) {
        if (chars.indexOf(input.charAt(inx)) == -1)
            return false;
    }
    return true;
}

function isValidEmail(input) {
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    if (input.search(format) != -1) {
        return true; //??? ?? ??
    }
    return false;
}

function isNumDash(input) {
    var chars = "0123456789-";
    return containsCharsOnly(input, chars);
}

function isAlphabet(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(input, chars);
}

function isAlphabetNum(input) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return containsCharsOnly(input, chars);
}

function isNumber(input) {
    var chars = "0123456789";
    return containsCharsOnly(input, chars);
}

function isOKChar(input) {
    var chars = "<>;' ";
    return containsChars(input, chars);
}

function winPopup(url, wname, sizeW, sizeH) {
    var nLeft = 10; //screen.width / 3;
    var nTop = 10;// screen.height / 3;

    opt = ",toolbar=no,menubar=no,location=no,scrollbars=no,status=no";
    openobj = window.open(url, wname, "left=" + nLeft + ",top=" + nTop + ",width=" + sizeW + ",height=" + sizeH + opt);
    openobj.focus()
}

function winPopupScroll(url, wname, sizeW, sizeH) {
    var nLeft = 10//screen.width / 3;
    var nTop = 10//screen.height / 3;

    opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
    openobj = window.open(url, wname, "left=" + nLeft + ",top=" + nTop + ",width=" + sizeW + ",height=" + sizeH + opt);
    openobj.focus()
}

function countString(str) {
    var sum = 0;
    for (i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 200) {
            sum += 1; //??? ?????..
        }
        else {
            sum += 2; //???? ???? ???..
        }
    }
    return sum;
}

function SetWordCnt(target, source) {
    target.innerText = countString(source.value);
}

// ? ?? ??
function WinResize() {
    var Dwidth = parseInt(document.body.scrollWidth);
    var Dheight = parseInt(document.body.scrollHeight);
    var divEl = document.createElement("div");
    divEl.style.position = "absolute";
    divEl.style.left = "0px";
    divEl.style.top = "0px";
    divEl.style.width = "100%";
    divEl.style.height = "100%";

    document.body.appendChild(divEl);
    while (1) {
        try { window.resizeBy(Dwidth - divEl.offsetWidth, Dheight - divEl.offsetHeight); break; }
        catch (e) { }
    }
    //window.resizeBy(Dwidth-divEl.offsetWidth, Dheight-divEl.offsetHeight);
    document.body.removeChild(divEl);
}

function CheckLoginAlert(url, countryCode, option, optionValue) { // option, optionValue ? ??? ?? ???? ???
    var alertMsg = "";
    switch (countryCode) {
        case "us":
            alertMsg = "Please use after signing in.";
            break;
        case "tr":
            alertMsg = "L�tfen oturum a�tiktan sonra kullanin.";
            break;
        case "eg":
            alertMsg = "?????? ????????? ??? ????? ??????";
            break;
        case "es":
            alertMsg = "Util�zalo tras el inicio de sesi�n.";
            break;
        case "de":
            alertMsg = "Bitte nach dem Anmelden verwenden.";
            break;
        default:
            alertMsg = "Please use after signing in.";
            break;
    }
    if (document.getElementById("userid") != null) {
        alert(alertMsg);
        document.getElementById("userid").focus();
        return false;
    }

    if (option == "1" && $("#isAgreement").val() == "false") {
        location.href = "/Others/UseAgreement.aspx";
        return false;
    }

    if (url != "") {
        location.href = url;
        return true;
    }

    return true;
}

function ifrmLayerOpen(layerID, url, locX, locY) {
    document.getElementById(layerID).style.left = locX + "px"; 	// ???? ???? ????? ??
    document.getElementById(layerID).style.top = locY + "px"; 	// ???? ???? ????? ??

    document.getElementById("ifrmPop").src = url;

    document.getElementById(layerID).style.visibility = "visible";

    return;
}

// ??? ??( iframe ) ??
function ifrmLayerClose(layerID) {
    parent.document.getElementById(layerID).style.visibility = 'hidden'
}

// Opener ? ???? ??? Opener, ??? ??? ??
function CheckOpener(url) {
    try {
        opener.location.href = url;
        opener.focus();
    }
    catch (e) {
        var obj = window.open(url, '_blank', '')
        obj.focus();
    }
}

// ?? ??
function SetCookie(name, value, expiredays) {
    var todayDate = new Date();
    if (expiredays == 0) {
        document.cookie = name + "=" + escape(value) + "; path=/;"
    }
    else {
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }
}

// ?? ????
function GetCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else
        begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
        end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
}

// ??? ? ??
function Close_layer(objLayer) {
    objLayer.style.display = 'none';
}

// ??? ???/??
function TogleVisibility(obj) {
    if (obj.style.visibility == "hidden")
        obj.style.visibility = "visible";
    else
        obj.style.visibility = "hidden";
}

function TogleDisplay(obj) {
    if (obj.style.display == "none")
        obj.style.display = "";
    else
        obj.style.display = "none";
}

function Self_Close() {
    if (navigator.appVersion.indexOf("MSIE") >= 0) {
        parent.window.open("", "_self").close();
    }
    else {
        opener = window;
        parent.self.close();
    }
}

//sns? ???
function sns_share_title(snsCode, msg, url) {
    var snsTitle = encodeURIComponent(msg);
    var snsUrl = url;
    if (snsUrl == "") {
        snsUrl = encodeURIComponent(document.location.href);
    }
    var snsSite;

    switch (snsCode) {

        case "facebook":
            snsSite = "https://facebook.com/sharer.php";
            snsSite += '?u=' + snsUrl;
            break;
        case "twitter":
            snsSite = "https://twitter.com/share";
            snsSite += '?text=' + snsTitle + '&url=' + snsUrl;
            //snsSite += '?text=' + snsTitle;
            break;
        case "me2day":
            snsSite = "http://me2day.net/posts/new";
            snsSite += '?new_post[body]=' + snsTitle + ' ' + snsUrl;
            break;
        case "me2dayWithLink":
            snsSite = "http://me2day.net/posts/new";
            snsSite += '?new_post[body]=' + snsTitle + snsUrl;
            break;
        case "yozm":
            snsSite = "http://yozm.daum.net/api/popup/post";
            snsSite += '?prefix=' + snsTitle + '&sourceid=54&meta=&key=&imgRoot=&crossdomain=0&callback=&link=' + snsUrl;
            break;
        case "people":
            snsSite = "https://mypeople.daum.net/mypeople/mweb/share.do";
            snsSite += '?link=' + snsUrl + '&prefix=' + snsTitle + '&source_id=none';
            break;

        default:
    }

    window.open(snsSite, 'Share' + snsCode, '');
}

function sns_share(snsCode, msg, url) {
    var snsTitle = encodeURIComponent(document.title + msg);
    var snsUrl = url;
    if (snsUrl == "") {
        snsUrl = encodeURIComponent(document.location.href);
    }
    var snsSite;

    switch (snsCode) {
        case "facebook":
            snsSite = "https://facebook.com/sharer.php";
            snsSite += '?s=100&u=' + snsUrl + '&t=' + snsTitle;
            break;
        case "twitter":
            snsSite = "https://twitter.com/share";
            snsSite += '?text=' + snsTitle + ' ' + snsUrl;
            break;
        case "me2day":
            snsSite = "http://me2day.net/posts/new";
            snsSite += '?new_post[body]=' + snsTitle + ' ' + snsUrl;
            break;
        case "yozm":
            snsSite = "http://yozm.daum.net/api/popup/post";
            snsSite += '?prefix=' + snsTitle + '&sourceid=54&meta=&key=&imgurl=&crossdomain=0&callback=&link=' + snsUrl;
            break;
        case "people":
            snsSite = "https://mypeople.daum.net/mypeople/mweb/share.do";
            snsSite += '?link=' + snsUrl + '&prefix=' + snsTitle + '&source_id=none';
            break;

        default:
    }

    window.open(snsSite, 'Share' + snsCode, '');
}

function initTabMenu(tabContainerID) {
    var tabContainer = document.getElementById(tabContainerID);
    var tabAnchor = tabContainer.getElementsByTagName("a");
    var i = 0;

    for (i = 0; i < tabAnchor.length; i++) {
        if (tabAnchor.item(i).className == "tab")
            thismenu = tabAnchor.item(i);
        else
            continue;

        thismenu.container = tabContainer;
        thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
        thismenu.targetEl.style.display = "none";
        thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
        thismenu.onclick = function tabMenuClick() {
            currentmenu = this.container.current;
            if (currentmenu == this)
                return false;

            if (currentmenu) {
                currentmenu.targetEl.style.display = "none";
                if (currentmenu.imgEl) {
                    currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
                } else {
                    currentmenu.className = currentmenu.className.replace(" on", "");
                }
            }
            this.targetEl.style.display = "";
            if (this.imgEl) {
                this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
            } else {
                this.className += " on";
            }
            this.container.current = this;

            return false;
        };

        if (!thismenu.container.first)
            thismenu.container.first = thismenu;
    }
    if (tabContainer.first)
        tabContainer.first.onclick();
}

function setPng24(obj) {
    obj.width = obj.height = 1;
    obj.className = obj.className.replace(/\bpng24\b/i, '');
    obj.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + obj.src + "',sizingMethod='image');"
    obj.src = '';
    return '';
}
