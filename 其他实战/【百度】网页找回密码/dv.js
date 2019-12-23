window = document = {};
e = {};
t = {};

function n(e) {
    var t = [[48, 57], [65, 90], [97, 122], [45, 45], [126, 126]]
        , n = o(t)
        , a = o(t.slice(1));
    e && (n = r(n, e),
        a = r(a, e)),
        this.dict = n,
        this.dict2 = a
}

function r(e, t) {
    for (var n = t.split(""), r = 0; r < e.length; r++) {
        var o = r % n.length;
        o = n[o].charCodeAt(0),
            o %= e.length;
        var a = e[r];
        e[r] = e[o],
            e[o] = a
    }
    return e
}

function o(e) {
    for (var t = [], n = 0; n < e.length; n++)
        for (var r = e[n][0]; r <= e[n][1]; r++)
            t.push(String.fromCharCode(r));
    return t
}

function a(e, t) {
    var n = ""
        , r = Math.abs(parseInt(e));
    if (r)
        for (; r;)
            n += t[r % t.length],
                r = parseInt(r / t.length);
    else
        n = t[0];
    return n
}

function i() {
    if (M = !0,
        L = [],
        D = "number" == typeof F.SendInterval && F.SendInterval > 0 ? F.SendInterval : 1,
        k = F.ImgUrl,
    (1 & F.SendMethod) > 0) {
        var e = t.getElementById("dv_Input");
        if (e)
            e.value = "";
        else {
            var n = t.getElementById(F.FormId);
            n && (e = t.createElement("input"),
                e.type = "hidden",
                e.name = "dv",
                e.id = "dv_Input",
                n.insertBefore(e, n.firstChild))
        }
    }
    (8 & F.SendMethod) > 0 && F.RecordStr && (F.RecordStr = "")
}

function d(e) {
    M && (x = e.token + "@" + S(e, e.token),
    (1 & F.SendMethod) > 0 && c(x))
}

function c(n) {
    var r = t.getElementById("dv_Input");
    r && (r.value = n),
        e.LG_DV_ARG.dvjsInput = n
}

function f() {
    var t, n, r, o, a = navigator.userAgent.toLowerCase(), i = function () {
        var t, n = e || this;
        return t = "object" == typeof n.onhelp ? "IExplorer" : "object" == typeof n.chrome ? "Chrome" : "object" == typeof n.InstallTrigger ? "Firefox" : "object" == typeof n.opera ? "Opera" : "An unknown browser"
    };
    return o = (n = a.match(/maxthon[\/ ]([\d.]+)/i)) ? (t = 12,
        n[1]) : (n = a.match(/msie.*360se/i)) ? (t = 4,
        "-1") : (n = a.match(/msie.*360ee/i)) ? (t = 5,
        "-1") : (n = a.match(/se ([\d]+.[\w]*) metasr ([\d.]+)/i)) ? (t = 7,
        n[1]) : (n = a.match(/msie.*qihu theworld/i)) ? (t = 8,
        "-1") : (n = a.match(/tencenttraveler ([\d.]+)/i)) ? (t = 9,
        n[1]) : (n = a.match(/qqbrowser\/([\d.]+)/i)) ? (t = 10,
        n[1]) : (n = a.match(/msie ([\d.]+)/i)) ? (t = 1,
        n[1]) : (n = a.match(/firefox\/([\d.]+)/i)) ? (t = 3,
        n[1]) : (n = a.match(/Opera.+Version\/([\d.]+)/i)) ? (t = 6,
        n[1]) : (n = a.match(/opr\/([\d.]+)/i)) ? (t = 6,
        n[1]) : (n = a.match(/version\/([\d.]+).*safari/i)) ? (t = 11,
        n[1]) : (n = a.match(/chrome\/([\d.]+)/i)) ? (t = 2,
        n[1]) : (r = i(),
        t = r,
        "-1"),
        o = "-1" == o ? "an unknown version" : o.split(".")[0],
        [t, o]
}

function u() {
    var e = f()
        , t = navigator.platform || navigator.userAgent
        ,
        n = t.match(/win/i) ? 1 : t.match(/linux/i) ? 2 : t.match(/Mac/i) ? 3 : t.match(/iPhone/i) ? 4 : t.match(/iPod/i) ? 5 : t.match(/iPad/i) ? 6 : 0;
    return [n, e].join(",")
}

function l() {
    return O
}

function v() {
    try {
        var n = e.mozInnerScreenY || e.screenTop
            , r = e.mozInnerScreenX || e.screenLeft;
        "undefined" == typeof n && (n = 0),
        "undefined" == typeof r && (r = 0);
        var o = t.body.clientWidth
            , a = t.body.clientHeight
            , i = e.screen.width
            , d = e.screen.height
            , c = e.screen.availWidth
            , f = (e.screen.availHeight,
            e.outerWidth)
            , u = e.outerHeight;
        return [n, r, o, a, i, d, c, f, u].join(",")
    } catch (l) {
    }
}

function s(n) {
    try {
        var r = ""
            , o = n || e.event
            , a = o.target || o.srcElement;
        if (a && a.id && (r = encodeURIComponent(a.id)),
            V++,
        0 != F.RCMVEvent && A >= F.RCMVEvent)
            return;
        if (!(F.RCInterval > 0 && V == F.RCInterval))
            return;
        var i, c;
        o.pageX ? (i = o.pageX,
            c = o.pageY) : (i = o.clientX + t.body.scrollLeft - t.body.clientLeft,
            c = o.clientY + t.body.scrollTop - t.body.clientTop);
        var r = ""
            , a = o.target || o.srcElement;
        a && a.id && (r = encodeURIComponent(a.id));
        var f = (new Date).getTime() - q;
        w.mouseMove += [i, c, f, r].join(",") + "|",
            A++,
            V = 0,
            d(w)
    } catch (u) {
    }
}

function h(n) {
    try {
        if (F.RCMSEvent > 0 && j >= F.RCMSEvent)
            return;
        var r = n || e.event
            , o = r.pageX
            , a = r.pageY;
        void 0 == o && (o = r.clientX + t.body.scrollLeft,
            a = r.clientY + t.body.scrollTop);
        var i = r.target || r.srcElement
            , c = 0;
        "undefined" != typeof r.which && r.which <= 3 ? c = [9, 0, 1, 2][r.which] : "undefined" != typeof r.button && r.button <= 4 && (c = [9, 0, 2, 9, 1][r.button]);
        var f = "";
        i && i.id && (f = encodeURIComponent(i.id));
        var u = "";
        if ("shape" != i.nodeName)
            for (var l = 0; l < F.EltAttrs.length; l++) {
                var v = i.getAttribute(F.EltAttrs[l]);
                v && (u = 0 == u.length ? F.EltAttrs[l] + "=" + encodeURIComponent(v) : u + "&" + F.EltAttrs[l] + "=" + encodeURIComponent(v))
            }
        {
            var s = [o, a];
            (new Date).getTime() - q
        }
        j++,
            w.mouseDown += [s[0], s[1], c, time, f, u].join(",") + "|",
            d(w)
    } catch (h) {
    }
}

function m(t) {
    try {
        if (F.RCKSEvent > 0 && G >= F.RCKSEvent)
            return;
        var n = t || e.event
            , r = n.target || n.srcElement
            , o = n.keyCode
            , a = 0;
        n.ctrlKey && 17 != o && (a += 1),
        n.altKey && 18 != o && (a += 2),
        n.shiftKey && 16 != o && (a += 4);
        var i = "null";
        r && (i = r.id ? encodeURIComponent(r.id) : r.name ? encodeURIComponent(r.name) : i);
        for (var c = 0; c < F.ExcludeTarget.length; c++)
            if (F.ExcludeTarget[c] == i)
                return;
        var f = (new Date).getTime() - q;
        G++,
            w.keyDown += [o, a, i, f].join(",") + "|",
            d(w)
    } catch (u) {
    }
}

function p() {
}

function g(e, t) {
    return !e || 0 >= t ? void 0 : e.length <= t ? e : e.substr(0, length)
}

function E() {
    try {
        var n = t.referer;
        return !n && e.opener ? (n = e.opener.location,
        n || (n = "")) : n = "",
            [encodeURI(g(e.location.toString(), 50)), encodeURI(g(n.toString(), 50))].join(",")
    } catch (r) {
    }
}

function y() {
    X++;
    var e = ""
        , t = "";
    try {
        e = p().getos(),
            t = p().getversion()
    } catch (n) {
        if (10 == X)
            return;
        return void setTimeout(y, 200)
    }
    return e + t
}

function I() {
    w.mouseDown = "",
        w.keyDown = "",
        w.mouseMove = "",
    0 == _ && (_ = 1,
        i(),
    (2 & F.SendMethod) > 0 && setInterval(Y, F.SendTimer),
        w.version = l(),
        w.loadTime = q / 1e3,
    F.BrowserInfo && (w.browserInfo = u()),
        w.token = F.PageToken,
    F.Location && (w.location = E()),
    F.ScreenInfo && (w.screenInfo = v()),
    F.FlashInfo && (w.flashInfo = y()),
        d(w))
}

function C(e) {
    var n = new Object;
    n.mousedown = h,
        n.keydown = m,
        n.mousemove = s,
        n.load = I,
        n.beforeunload = H,
        n.unload = H;
    var r = (e.document,
            function (e, t) {
                t.attachEvent ? t.attachEvent("on" + e, n[e], !1) : t.addEventListener && t.addEventListener(e, n[e], !1)
            }
    )
        , o = function (e) {
        r(e, t)
    }
        , a = function (t) {
        r(t, e)
    };
    U.add(I),
    F.EnableMCEvent && o("mousedown"),
    F.EnableKSEvent && o("keydown"),
    F.EnableMPEvent && o("mousemove"),
    (2 & F.SendMethod) > 0 && ("undefined" != typeof e.onbeforeunload && a("beforeunload"),
    "undefined" != typeof e.onunload && a("unload"))
}

function R() {
    if ("undefined" == typeof b)
        return 1;
    if ("number" != typeof b.Flag)
        return 1;
    var e = new Object;
    if ("undefined" != typeof b.FormId && "" != b.FormId && (e.FormId = b.FormId),
    "undefined" != typeof b.RecordStr && "" != b.RecordStr && (e.RecordStr = b.RecordStr),
        e.EnableKSEvent = b.Flag >> 1 & 1,
        e.EnableMCEvent = b.Flag >> 2 & 1,
        e.EnableMPEvent = b.Flag >> 3 & 1,
        e.RecordTimeInterval = b.Flag >> 6 & 1,
        e.BrowserInfo = b.Flag >> 7 & 1,
        e.LSIDInfo = b.Flag >> 10 & 1,
        e.Location = b.Flag >> 11 & 1,
        e.Token = b.Flag >> 12 & 1,
        e.ScreenInfo = b.Flag >> 13 & 1,
        e.FlashInfo = b.Flag >> 16 & 1,
        e.DVID = b.Flag >> 17 & 1,
        "string" == typeof b.Token ? e.PageToken = b.Token : e.Token = 0,
        e.ImgUrl = "string" == typeof b.ImgUrl ? b.ImgUrl : "",
        e.EltAttrs = [],
    "undefined" != typeof b.EltAttrs)
        for (var t = 0; t < b.EltAttrs.length; t++)
            e.EltAttrs.push(b.EltAttrs[t]);
    if (e.ExcludeTarget = [],
    "undefined" != typeof b.ExcludeTarget)
        for (var t = 0; t < b.ExcludeTarget.length; t++)
            e.ExcludeTarget.push(b.ExcludeTarget[t]);
    return e.RCInterval = "undefined" != typeof b.RCInterval && b.RCInterval > 0 ? b.RCInterval : 50,
        e.RCMSEvent = "undefined" != typeof b.RCMSEvent && b.RCMSEvent > 0 ? b.RCMSEvent : 5,
        e.RCKSEvent = "undefined" != typeof b.RCKSEvent && b.RCKSEvent > 0 ? b.RCKSEvent : 5,
        e.RCMVEvent = "undefined" != typeof b.RCMVEvent && b.RCMVEvent > 0 ? b.RCMVEvent : 5,
        e.RCFCEvent = "undefined" != typeof b.RCFCEvent && b.RCFCEvent > 0 ? b.RCFCEvent : 0,
        e.SendInterval = "undefined" != typeof b.SendInterval && b.SendInterval > 0 ? b.SendInterval : 1,
        e.SendMethod = "undefined" != typeof b.SendMethod && b.SendMethod > 0 ? b.SendMethod : 0,
        e.GYInterval = "undefined" != typeof b.GYInterval && b.GYInterval > 0 ? b.GYInterval : 50,
        e.RCGPEvent = "undefined" != typeof b.RCGPEvent && b.RCGPEvent > 0 ? b.RCGPEvent : 5,
        e.RCTVEvent = "undefined" != typeof b.RCTVEvent && b.RCTVEvent > 0 ? b.RCTVEvent : 5,
        e.SendMethod |= 1,
        e.DVHost = "string" == typeof b.DVHost ? b.DVHost : "passport.baidu.com",
        e.SendTimer = "number" == typeof b.SendTimer ? b.SendTimer : 1e3,
        F = e,
        F.BrowserInfo = !0,
        F.Location = !0,
        F.ScreenInfo = !0,
        F.FlashInfo = !0,
        F.LSIDInfo = !0,
        0
}

function S(e, t) {
    var r = new n(t)
        , o = {
        flashInfo: 0,
        mouseDown: 1,
        keyDown: 2,
        mouseMove: 3,
        version: 4,
        loadTime: 5,
        browserInfo: 6,
        token: 7,
        location: 8,
        screenInfo: 9
    }
        , a = [r.iary([2])];
    for (var i in e) {
        var d = e[i];
        if (void 0 !== d && void 0 !== o[i]) {
            var c;
            "number" == typeof d ? (c = d >= 0 ? 1 : 2,
                d = r.int(d)) : "boolean" == typeof d ? (c = 3,
                d = r.int(d ? 1 : 0)) : "object" == typeof d && d instanceof Array ? (c = 4,
                d = r.bary(d)) : (c = 0,
                d = r.str(d + "")),
            d && a.push(r.iary([o[i], c, d.length]) + d)
        }
    }
    return a.join("")
}

"undefined" == typeof e.LG_DV_ARG && (e.LG_DV_ARG = {
    tpl: "pp"
});
var b = e.LG_DV_ARG
    , w = {};
b.SendMethod = 9,
    b.ExcludeTarget = ["password"],
    b.Token = "tk" + Math.random() + (new Date).getTime(),
    b.RCMSEvent = 5,
    b.RCKSEvent = 5,
    b.RCMVEvent = 5,
    b.RCTVEvent = 5,
    b.RCFCEvent = 5,
    b.ImgUrl = "//baidu.com/error.jsonp?n=",
    b.Flag = parseInt("111111111111111111111111", 2);
var T, M, i, D, F, k, c, d, u, f, v, l, A, V, s, j, h, L, G, m, p, E, y, _, I, U, C, R, K, P, B, l, Y, H, O = 26, X = 0;
if (n.prototype = {
    "int": function (e) {
        return a(e, this.dict)
    },
    iary: function (e) {
        for (var t = "", n = 0; n < e.length; n++) {
            var r = a(e[n], this.dict2);
            t += r.length > 1 ? r.length - 2 + r : r
        }
        return t
    },
    bary: function (e) {
        for (var t = 0, n = {}, r = 0; r < e.length; r++)
            e[r] > t && (t = e[r],
                n[e[r]] = !0);
        var o = parseInt(t / 6);
        o += t % 6 ? 1 : 0;
        for (var a = "", r = 0; o > r; r++) {
            for (var i = 6 * r, d = 0, c = 0; 6 > c; c++)
                n[i] && (d += Math.pow(2, c)),
                    i++;
            a += this.dict[d]
        }
        return a
    },
    str: function (e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r >= 1 && 127 >= r ? t.push(r) : r > 2047 ? (t.push(224 | r >> 12 & 15),
                t.push(128 | r >> 6 & 63),
                t.push(128 | r >> 0 & 63)) : (t.push(192 | r >> 6 & 31),
                t.push(128 | r >> 0 & 63))
        }
        for (var o = "", n = 0, a = t.length; a > n;) {
            var i = t[n++];
            if (n >= a) {
                o += this.dict[i >> 2],
                    o += this.dict[(3 & i) << 4],
                    o += "__";
                break
            }
            var d = t[n++];
            if (n >= a) {
                o += this.dict[i >> 2],
                    o += this.dict[(3 & i) << 4 | (240 & d) >> 4],
                    o += this.dict[(15 & d) << 2],
                    o += "_";
                break
            }
            var c = t[n++];
            o += this.dict[i >> 2],
                o += this.dict[(3 & i) << 4 | (240 & d) >> 4],
                o += this.dict[(15 & d) << 2 | (192 & c) >> 6],
                o += this.dict[63 & c]
        }
        return o
    }
},
    !e.ncdvjs) {
    T = new RegExp("^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})Z$");
    var q = (new Date).getTime();
    A = 0,
        V = 0,
        j = 0,
        G = 0,
        _ = 0,
        U = function () {
            var n = []
                , r = !1
                , o = null
                , a = function (e, t) {
                try {
                    e.apply(this, t || [])
                } catch (n) {
                }
            }
                , i = function () {
                r = !0;
                for (var e = 0; e < n.length; e++)
                    a(n[e].fn, n[e].args || []);
                n = []
            };
            return this.setOnError = function (e) {
                return o = e,
                    this
            }
                ,
                this.add = function (e, t) {
                    return r ? a(e, t) : n[n.length] = {
                        fn: e,
                        args: t
                    },
                        this
                }
                ,
                e.addEventListener ? t.addEventListener("DOMContentLoaded", function () {
                    i()
                }, !1) : !function () {

                }(),
                this
        }(),
        K = function () {
            q = (new Date).getTime(),
                A = 0,
                V = 0,
                j = 0,
                G = 0,
                focus_count = 0,
                _ = 0,
                R(),
                I()
        }
        ,
        P = function () {
            function n() {
                if (e.passportDm) {
                    var t = {
                        page: "nc",
                        source: "nc",
                        tpl: b.tpl
                    };
                    e.passportDm.init(t)
                }
            }

            var r = t.getElementsByTagName("HEAD").item(0)
                , o = t.createElement("script");
            o.type = "text/javascript",
                o.src = "//" + F.DVHost + "/static/passpc-base/js/dv/dm.min.js",
                r.appendChild(o),
                o.readyState ? o.onreadystatechange = function () {
                        ("loaded" == o.readyState || "complete" == o.readyState) && (o.onreadystatechange = null,
                            n())
                    }
                    : o.onload = function () {
                        n()
                    }
        }
        ,
        B = function () {
            e.ncdvjs = 1,
            0 == R() && (C(e),
                b.attachEvents = C,
                b.reload = K)
        }
        ,
        B();
    var W = function () {
        //  return t.getElementById("dv_Input")
    }
        , z = function () {

    };
    z()
}


function MakeDv(NowTime, toK) {
    //顺序不能乱
    e = {
        flashInfo: undefined,
        mouseDown: "593,252,0,[object HTMLInputElement],,|",    //模拟鼠标按下的点
        keyDown: "",
        mouseMove: "495,262,1721,content|720,279,3354,|692,259,13737,veritycode|",   //模拟鼠标移动的点
        version: 26,  //固定
        loadTime: NowTime,     //13位时间戳后3位加个点。
        browserInfo: "1,2,78",//浏览器版本
        token: toK,////后面13位时间戳和前面的要对应  前面的0.29后面的随机生成
        location: "https://passport.baidu.com/?getpassindex,undefined",
        screenInfo: "0,0,1903,651,1920,1080,1920,1920,1040"  //模拟窗口大小等信息
    };
    return e.token + "@" + S(e, e.token);
}

// 调用方法：test1()