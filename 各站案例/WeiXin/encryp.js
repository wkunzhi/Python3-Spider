function e(n, r) {
    var t = (65535 & n) + (65535 & r)
    return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t
}
function u(n, r, t, u, o, c) {
    return e(function(n, r) {
        return n << r | n >>> 32 - r
    }(e(e(r, n), e(u, c)), o), t)
}
function o(n, r, t, e, o, c, f) {
    return u(r & t | ~r & e, n, r, o, c, f)
}
function c(n, r, t, e, o, c, f) {
    return u(r & e | t & ~e, n, r, o, c, f)
}
function f(n, r, t, e, o, c, f) {
    return u(r ^ t ^ e, n, r, o, c, f)
}
function i(n, r, t, e, o, c, f) {
    return u(t ^ (r | ~e), n, r, o, c, f)
}
function a(n, r) {
    n[r >> 5] |= 128 << r % 32,
    n[14 + (r + 64 >>> 9 << 4)] = r
    var t, u, a, h, d, g = 1732584193, l = -271733879, v = -1732584194, s = 271733878
    for (t = 0; t < n.length; t += 16)
        u = g,
        a = l,
        h = v,
        d = s,
        l = i(l = i(l = i(l = i(l = f(l = f(l = f(l = f(l = c(l = c(l = c(l = c(l = o(l = o(l = o(l = o(l, v = o(v, s = o(s, g = o(g, l, v, s, n[t], 7, -680876936), l, v, n[t + 1], 12, -389564586), g, l, n[t + 2], 17, 606105819), s, g, n[t + 3], 22, -1044525330), v = o(v, s = o(s, g = o(g, l, v, s, n[t + 4], 7, -176418897), l, v, n[t + 5], 12, 1200080426), g, l, n[t + 6], 17, -1473231341), s, g, n[t + 7], 22, -45705983), v = o(v, s = o(s, g = o(g, l, v, s, n[t + 8], 7, 1770035416), l, v, n[t + 9], 12, -1958414417), g, l, n[t + 10], 17, -42063), s, g, n[t + 11], 22, -1990404162), v = o(v, s = o(s, g = o(g, l, v, s, n[t + 12], 7, 1804603682), l, v, n[t + 13], 12, -40341101), g, l, n[t + 14], 17, -1502002290), s, g, n[t + 15], 22, 1236535329), v = c(v, s = c(s, g = c(g, l, v, s, n[t + 1], 5, -165796510), l, v, n[t + 6], 9, -1069501632), g, l, n[t + 11], 14, 643717713), s, g, n[t], 20, -373897302), v = c(v, s = c(s, g = c(g, l, v, s, n[t + 5], 5, -701558691), l, v, n[t + 10], 9, 38016083), g, l, n[t + 15], 14, -660478335), s, g, n[t + 4], 20, -405537848), v = c(v, s = c(s, g = c(g, l, v, s, n[t + 9], 5, 568446438), l, v, n[t + 14], 9, -1019803690), g, l, n[t + 3], 14, -187363961), s, g, n[t + 8], 20, 1163531501), v = c(v, s = c(s, g = c(g, l, v, s, n[t + 13], 5, -1444681467), l, v, n[t + 2], 9, -51403784), g, l, n[t + 7], 14, 1735328473), s, g, n[t + 12], 20, -1926607734), v = f(v, s = f(s, g = f(g, l, v, s, n[t + 5], 4, -378558), l, v, n[t + 8], 11, -2022574463), g, l, n[t + 11], 16, 1839030562), s, g, n[t + 14], 23, -35309556), v = f(v, s = f(s, g = f(g, l, v, s, n[t + 1], 4, -1530992060), l, v, n[t + 4], 11, 1272893353), g, l, n[t + 7], 16, -155497632), s, g, n[t + 10], 23, -1094730640), v = f(v, s = f(s, g = f(g, l, v, s, n[t + 13], 4, 681279174), l, v, n[t], 11, -358537222), g, l, n[t + 3], 16, -722521979), s, g, n[t + 6], 23, 76029189), v = f(v, s = f(s, g = f(g, l, v, s, n[t + 9], 4, -640364487), l, v, n[t + 12], 11, -421815835), g, l, n[t + 15], 16, 530742520), s, g, n[t + 2], 23, -995338651), v = i(v, s = i(s, g = i(g, l, v, s, n[t], 6, -198630844), l, v, n[t + 7], 10, 1126891415), g, l, n[t + 14], 15, -1416354905), s, g, n[t + 5], 21, -57434055), v = i(v, s = i(s, g = i(g, l, v, s, n[t + 12], 6, 1700485571), l, v, n[t + 3], 10, -1894986606), g, l, n[t + 10], 15, -1051523), s, g, n[t + 1], 21, -2054922799), v = i(v, s = i(s, g = i(g, l, v, s, n[t + 8], 6, 1873313359), l, v, n[t + 15], 10, -30611744), g, l, n[t + 6], 15, -1560198380), s, g, n[t + 13], 21, 1309151649), v = i(v, s = i(s, g = i(g, l, v, s, n[t + 4], 6, -145523070), l, v, n[t + 11], 10, -1120210379), g, l, n[t + 2], 15, 718787259), s, g, n[t + 9], 21, -343485551),
        g = e(g, u),
        l = e(l, a),
        v = e(v, h),
        s = e(s, d)
    return [g, l, v, s]
}
function h(n) {
    var r, t = ""
    for (r = 0; r < 32 * n.length; r += 8)
        t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255)
    return t
}
function d(n) {
    var r, t = []
    for (t[(n.length >> 2) - 1] = void 0,
    r = 0; r < t.length; r += 1)
        t[r] = 0
    for (r = 0; r < 8 * n.length; r += 8)
        t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32
    return t
}
function g(n) {
    var r, t, e = ""
    for (t = 0; t < n.length; t += 1)
        r = n.charCodeAt(t),
        e += "0123456789abcdef".charAt(r >>> 4 & 15) + "0123456789abcdef".charAt(15 & r)
    return e
}
function l(n) {
    return unescape(encodeURIComponent(n))
}
function v(n) {
    return function(n) {
        return h(a(d(n), 8 * n.length))
    }(l(n))
}
function s(n, r) {
    return function(n, r) {
        var t, e, u = d(n), o = [], c = []
        for (o[15] = c[15] = void 0,
        u.length > 16 && (u = a(u, 8 * n.length)),
        t = 0; t < 16; t += 1)
            o[t] = 909522486 ^ u[t],
            c[t] = 1549556828 ^ u[t]
        return e = a(o.concat(d(r)), 512 + 8 * r.length),
        h(a(c.concat(e), 640))
    }(l(n), l(r))
}
function make_pwd(n, r, t) {
    return r ? t ? s(r, n) : function(n, r) {
        return g(s(n, r))
    }(r, n) : t ? v(n) : function(n) {
        return g(v(n))
    }(n)
}
