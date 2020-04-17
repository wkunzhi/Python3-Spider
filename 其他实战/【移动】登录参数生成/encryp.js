function sha1(a) {
    function b(a, b) {
        var c = (a & 65535) + (b & 65535);
        return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
    }

    for (var c = [], d = 0; d < 8 * a.length; d += 8)
        c[d >> 5] |= (a.charCodeAt(d / 8) & 255) << 24 - d % 32;
    a = 8 * a.length;
    c[a >> 5] |= 128 << 24 - a % 32;
    c[(a + 64 >> 9 << 4) + 15] = a;
    a = Array(80);
    for (var d = 1732584193, e = -271733879, f = -1732584194, g = 271733878, k = -1009589776, h = 0; h < c.length; h +=
        16) {
        for (var l = d, m = e, n = f, p = g, q = k, j = 0; 80 > j; j++) {
            a[j] = 16 > j ? c[h + j] : (a[j - 3] ^ a[j - 8] ^ a[j - 14] ^ a[j - 16]) << 1 | (a[j - 3] ^ a[j - 8] ^ a[j - 14] ^
                a[j - 16]) >>> 31;
            var r = b(b(d << 5 | d >>> 27, 20 > j ? e & f | ~e & g : 40 > j ? e ^ f ^ g : 60 > j ? e & f | e & g | f & g : e ^
                f ^ g), b(b(k, a[j]), 20 > j ? 1518500249 : 40 > j ? 1859775393 : 60 > j ? -1894007588 : -899497514)),
                k = g,
                g = f,
                f = e << 30 | e >>> 2,
                e = d,
                d = r
        }
        d = b(d, l);
        e = b(e, m);
        f = b(f, n);
        g = b(g, p);
        k = b(k, q)
    }
    c = [d, e, f, g, k];
    a = "";
    for (d = 0; d < 4 * c.length; d++)
        a += "0123456789abcdef".charAt(c[d >> 2] >> 8 * (3 - d % 4) + 4 & 15) + "0123456789abcdef".charAt(c[d >> 2] >> 8 *
            (3 - d % 4) & 15);
    return a
}


function a(a, c) {
    var d = (a & 65535) + (c & 65535);
    return (a >> 16) + (c >> 16) + (d >> 16) << 16 | d & 65535
}

calcDigest = function (b) {
    for (var c = (b.length + 8 >> 6) + 1, d = Array(16 * c), e = 0; e < 16 * c; e++)
        d[e] = 0;
    for (e = 0; e < b.length; e++)
        d[e >> 2] |= b.charCodeAt(e) << 24 - 8 * (e & 3);
    d[e >> 2] |= 128 << 24 - 8 * (e & 3);
    d[16 * c - 1] = 8 * b.length;
    b = Array(80);
    for (var c = 1732584193, e = -271733879, f = -1732584194, g = 271733878, k = -1009589776, h = 0; h < d.length; h +=
        16) {
        for (var l = c, m = e, n = f, p = g, q = k, j = 0; 80 > j; j++) {
            b[j] = 16 > j ? d[h + j] : (b[j - 3] ^ b[j - 8] ^ b[j - 14] ^ b[j - 16]) << 1 | (b[j - 3] ^ b[j - 8] ^ b[j - 14] ^
                b[j - 16]) >>> 31;
            var r = a(a(c << 5 | c >>> 27, 20 > j ? e & f | ~e & g : 40 > j ? e ^ f ^ g : 60 > j ? e & f | e & g | f & g : e ^
                f ^ g), a(a(k, b[j]), 20 > j ? 1518500249 : 40 > j ? 1859775393 : 60 > j ? -1894007588 : -899497514)),
                k = g,
                g = f,
                f = e << 30 | e >>> 2,
                e = c,
                c = r
        }
        c = a(c, l);
        e = a(e, m);
        f = a(f, n);
        g = a(g, p);
        k = a(k, q)
    }
    d = [c, e, f, g, k];
    b = "";
    for (c = 0; c < 4 * d.length; c++)
        b += "0123456789abcdef".charAt(d[c >> 2] >> 8 * (3 - c % 4) + 4 & 15) + "0123456789abcdef".charAt(d[c >> 2] >> 8 *
            (3 - c % 4) & 15);
    return b
}


function customerGetCGUID() {
    function a(a, b) {
        var e = (b || 2) - (1 + Math.floor(Math.log(a | 1) / Math.LN10 + 1E-15));
        return Array(e + 1).join("0") + a
    }

    var b = new Date;
    return "" + a(b.getHours()) + a(b.getMinutes()) + a(b.getSeconds()) + a(b.getMilliseconds(), 3) + a(Math.ceil(9999 *
        Math.random()), 4)
}