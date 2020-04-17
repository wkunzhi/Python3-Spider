function c(x, c) {
    x[c >> 5] |= 128 << c % 32,
        x[(c + 64 >>> 9 << 4) + 14] = c;
    for (var a = 1732584193, _ = -271733879, y = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
        var b = a,
            B = _,
            D = y,
            E = d;
        a = h(a, _, y, d, x[i + 0], 7, -680876936),
            d = h(d, a, _, y, x[i + 1], 12, -389564586),
            y = h(y, d, a, _, x[i + 2], 17, 606105819),
            _ = h(_, y, d, a, x[i + 3], 22, -1044525330),
            a = h(a, _, y, d, x[i + 4], 7, -176418897),
            d = h(d, a, _, y, x[i + 5], 12, 1200080426),
            y = h(y, d, a, _, x[i + 6], 17, -1473231341),
            _ = h(_, y, d, a, x[i + 7], 22, -45705983),
            a = h(a, _, y, d, x[i + 8], 7, 1770035416),
            d = h(d, a, _, y, x[i + 9], 12, -1958414417),
            y = h(y, d, a, _, x[i + 10], 17, -42063),
            _ = h(_, y, d, a, x[i + 11], 22, -1990404162),
            a = h(a, _, y, d, x[i + 12], 7, 1804603682),
            d = h(d, a, _, y, x[i + 13], 12, -40341101),
            y = h(y, d, a, _, x[i + 14], 17, -1502002290),
            _ = h(_, y, d, a, x[i + 15], 22, 1236535329),
            a = g(a, _, y, d, x[i + 1], 5, -165796510),
            d = g(d, a, _, y, x[i + 6], 9, -1069501632),
            y = g(y, d, a, _, x[i + 11], 14, 643717713),
            _ = g(_, y, d, a, x[i + 0], 20, -373897302),
            a = g(a, _, y, d, x[i + 5], 5, -701558691),
            d = g(d, a, _, y, x[i + 10], 9, 38016083),
            y = g(y, d, a, _, x[i + 15], 14, -660478335),
            _ = g(_, y, d, a, x[i + 4], 20, -405537848),
            a = g(a, _, y, d, x[i + 9], 5, 568446438),
            d = g(d, a, _, y, x[i + 14], 9, -1019803690),
            y = g(y, d, a, _, x[i + 3], 14, -187363961),
            _ = g(_, y, d, a, x[i + 8], 20, 1163531501),
            a = g(a, _, y, d, x[i + 13], 5, -1444681467),
            d = g(d, a, _, y, x[i + 2], 9, -51403784),
            y = g(y, d, a, _, x[i + 7], 14, 1735328473),
            _ = g(_, y, d, a, x[i + 12], 20, -1926607734),
            a = v(a, _, y, d, x[i + 5], 4, -378558),
            d = v(d, a, _, y, x[i + 8], 11, -2022574463),
            y = v(y, d, a, _, x[i + 11], 16, 1839030562),
            _ = v(_, y, d, a, x[i + 14], 23, -35309556),
            a = v(a, _, y, d, x[i + 1], 4, -1530992060),
            d = v(d, a, _, y, x[i + 4], 11, 1272893353),
            y = v(y, d, a, _, x[i + 7], 16, -155497632),
            _ = v(_, y, d, a, x[i + 10], 23, -1094730640),
            a = v(a, _, y, d, x[i + 13], 4, 681279174),
            d = v(d, a, _, y, x[i + 0], 11, -358537222),
            y = v(y, d, a, _, x[i + 3], 16, -722521979),
            _ = v(_, y, d, a, x[i + 6], 23, 76029189),
            a = v(a, _, y, d, x[i + 9], 4, -640364487),
            d = v(d, a, _, y, x[i + 12], 11, -421815835),
            y = v(y, d, a, _, x[i + 15], 16, 530742520),
            _ = v(_, y, d, a, x[i + 2], 23, -995338651),
            a = A(a, _, y, d, x[i + 0], 6, -198630844),
            d = A(d, a, _, y, x[i + 7], 10, 1126891415),
            y = A(y, d, a, _, x[i + 14], 15, -1416354905),
            _ = A(_, y, d, a, x[i + 5], 21, -57434055),
            a = A(a, _, y, d, x[i + 12], 6, 1700485571),
            d = A(d, a, _, y, x[i + 3], 10, -1894986606),
            y = A(y, d, a, _, x[i + 10], 15, -1051523),
            _ = A(_, y, d, a, x[i + 1], 21, -2054922799),
            a = A(a, _, y, d, x[i + 8], 6, 1873313359),
            d = A(d, a, _, y, x[i + 15], 10, -30611744),
            y = A(y, d, a, _, x[i + 6], 15, -1560198380),
            _ = A(_, y, d, a, x[i + 13], 21, 1309151649),
            a = A(a, _, y, d, x[i + 4], 6, -145523070),
            d = A(d, a, _, y, x[i + 11], 10, -1120210379),
            y = A(y, d, a, _, x[i + 2], 15, 718787259),
            _ = A(_, y, d, a, x[i + 9], 21, -343485551),
            a = C(a, b),
            _ = C(_, B),
            y = C(y, D),
            d = C(d, E)
    }
    return Array(a, _, y, d)
}

function a(q, c, a, x, s, t) {
    return C(y(C(C(c, q), C(x, t)), s), a)
}

function h(c, h, g, d, x, s, t) {
    return a(h & g | ~h & d, c, h, x, s, t)
}

function g(c, h, g, d, x, s, t) {
    return a(h & d | g & ~d, c, h, x, s, t)
}

function v(c, h, g, d, x, s, t) {
    return a(h ^ g ^ d, c, h, x, s, t)
}

function A(c, h, g, d, x, s, t) {
    return a(g ^ (h | ~d), c, h, x, s, t)
}

function _(a, h) {
    var g = b(a);
    g.length > 16 && (g = c(g, a.length * U));
    for (var v = Array(16), A = Array(16), i = 0; 16 > i; i++)
        v[i] = 909522486 ^ g[i],
            A[i] = 1549556828 ^ g[i];
    var _ = c(v.concat(b(h)), 512 + h.length * U);
    return c(A.concat(_), 640)
}

function C(x, c) {
    var a = (65535 & x) + (65535 & c),
        h = (x >> 16) + (c >> 16) + (a >> 16);
    return h << 16 | 65535 & a
}

function y(c, a) {
    return c << a | c >>> 32 - a
}

function b(c) {
    for (var a = Array(), h = (1 << U) - 1, i = 0; i < c.length * U; i += U)
        a[i >> 5] |= (c.charCodeAt(i / U) & h) << i % 32;
    return a
}

function B(c) {
    for (var a = "", h = (1 << U) - 1, i = 0; i < 32 * c.length; i += U)
        a += String.fromCharCode(c[i >> 5] >>> i % 32 & h);
    return a
}

function D(c) {
    for (var a = F ? "0123456789ABCDEF" : "0123456789abcdef", h = "", i = 0; i < 4 * c.length; i++)
        h += a.charAt(c[i >> 2] >> i % 4 * 8 + 4 & 15) + a.charAt(c[i >> 2] >> i % 4 * 8 & 15);
    return h
}

function E(c) {
    for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = "", i = 0; i < 4 * c.length; i +=
        3)
        for (var g = (c[i >> 2] >> 8 * (i % 4) & 255) << 16 | (c[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 255) << 8 | c[i + 2 >>
        2] >> 8 * ((i + 2) % 4) & 255, v = 0; 4 > v; v++)
            h += 8 * i + 6 * v > 32 * c.length ? S : a.charAt(g >> 6 * (3 - v) & 63);
    return h
}

var F = 0,
    S = "",
    U = 8,
    j = {
        hex_md5: function (s) {
            return D(c(b(s), s.length * U)).toUpperCase()
        },
        b64_md5: function (s) {
            return E(c(b(s), s.length * U))
        },
        str_md5: function (s) {
            return B(c(b(s), s.length * U))
        },
        hex_hmac_md5: function (c, a) {
            return D(_(c, a))
        },
        b64_hmac_md5: function (c, a) {
            return E(_(c, a))
        },
        str_hmac_md5: function (c, a) {
            return B(_(c, a))
        }
    };


function make_sigin() {
    now = (new Date).getTime();
    return [j.hex_md5("" + now).toUpperCase(), now]
}

function make_pwd(pwd) {
    return j.hex_md5(pwd)
}