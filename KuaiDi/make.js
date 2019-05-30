const _url = 'https://www.ickd.cn/';


function make_tm() {
    return (new Date).getTime()
}


sign = function() {
    function s(t) {
        var e, i, s, a, o = -1;
        for (e = 0,
        s = t.length; e < s; e += 1) {
            for (a = 255 & (o ^ t[e]),
            i = 0; i < 8; i += 1)
                1 == (1 & a) ? a = a >>> 1 ^ n : a >>>= 1;
            o = o >>> 8 ^ a
        }
        return -1 ^ o
    }
    function o(t, e) {
        var i, s, a;
        if ("undefined" != typeof o._x1l0o && e && t || (o._x1l0o = -1,
        t)) {
            for (i = o._x1l0o,
            s = 0,
            a = t.length; s < a; s += 1)
                i = i >>> 8 ^ r[255 & (i ^ t[s])];
            return -1 ^ (o._x1l0o = i)
        }
    }
    function t(t) {
        var e, i, s, a, o, r = typeof t, n = 16, l = 0;
        if ("string" !== r && "number" !== r)
            return NaN;
        if (!(e = (t = (t + "").replace(/\s/g, "").split(".")[0]).length))
            return NaN;
        if (n || (n = 10),
        "number" != typeof n || n < 2 || 36 < n)
            return NaN;
        for (i = t.split("").reverse(),
        s = 0; s < e; s++)
            97 <= (o = (a = i[s]).charCodeAt(0)) && (a = o - 87),
            l += Math.floor(a) * Math.pow(n, s);
        return l
    }
    var e, r = [], n = t("edb" + t(15900));
    return function a() {
        var t, e, i;
        for (e = 0; e < 256; e += 1) {
            for (t = e,
            i = 0; i < 8; i += 1)
                1 & t ? t = n ^ t >>> 1 : t >>>= 1;
            r[e] = t >>> 0
        }
    }(),
    (e = function(t, e) {
        t = "string" == typeof t ? function i(t) {
            return Array.prototype.map.call(t, function(t) {
                return t.charCodeAt(0)
            })
        }(t + _url) : t;
        return ((e ? s(t) : o(t)) >>> 0).toString(16)
    }
    ).direct = s,
    e.table = o,
    e
}()