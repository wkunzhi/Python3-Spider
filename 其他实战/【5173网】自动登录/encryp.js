var hexcase = 0, b64pad = "", chrsz = 8;

function hex_md5(b) {
    return binl2hex(core_md5(str2binl(b), b.length * chrsz))
}

function b64_md5(b) {
    return binl2b64(core_md5(str2binl(b), b.length * chrsz))
}

function str_md5(b) {
    return binl2str(core_md5(str2binl(b), b.length * chrsz))
}

function hex_hmac_md5(b, a) {
    return binl2hex(core_hmac_md5(b, a))
}

function b64_hmac_md5(b, a) {
    return binl2b64(core_hmac_md5(b, a))
}

function str_hmac_md5(b, a) {
    return binl2str(core_hmac_md5(b, a))
}

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}

function core_md5(b, a) {
    b[a >> 5] |= 128 << a % 32;
    b[(a + 64 >>> 9 << 4) + 14] = a;
    a = 1732584193;
    for (var c = -271733879, d = -1732584194, e = 271733878, f = 0; f < b.length; f += 16) {
        var g = a, h = c, i = d, j = e;
        a = md5_ff(a, c, d, e, b[f + 0], 7, -680876936);
        e = md5_ff(e, a, c, d, b[f + 1], 12, -389564586);
        d = md5_ff(d, e, a, c, b[f + 2], 17, 606105819);
        c = md5_ff(c, d, e, a, b[f + 3], 22, -1044525330);
        a = md5_ff(a, c, d, e, b[f + 4], 7, -176418897);
        e = md5_ff(e, a, c, d, b[f + 5], 12, 1200080426);
        d = md5_ff(d, e, a, c, b[f + 6], 17, -1473231341);
        c = md5_ff(c, d, e, a, b[f + 7], 22, -45705983);
        a = md5_ff(a, c, d, e, b[f + 8], 7,
            1770035416);
        e = md5_ff(e, a, c, d, b[f + 9], 12, -1958414417);
        d = md5_ff(d, e, a, c, b[f + 10], 17, -42063);
        c = md5_ff(c, d, e, a, b[f + 11], 22, -1990404162);
        a = md5_ff(a, c, d, e, b[f + 12], 7, 1804603682);
        e = md5_ff(e, a, c, d, b[f + 13], 12, -40341101);
        d = md5_ff(d, e, a, c, b[f + 14], 17, -1502002290);
        c = md5_ff(c, d, e, a, b[f + 15], 22, 1236535329);
        a = md5_gg(a, c, d, e, b[f + 1], 5, -165796510);
        e = md5_gg(e, a, c, d, b[f + 6], 9, -1069501632);
        d = md5_gg(d, e, a, c, b[f + 11], 14, 643717713);
        c = md5_gg(c, d, e, a, b[f + 0], 20, -373897302);
        a = md5_gg(a, c, d, e, b[f + 5], 5, -701558691);
        e = md5_gg(e, a, c, d, b[f +
        10], 9, 38016083);
        d = md5_gg(d, e, a, c, b[f + 15], 14, -660478335);
        c = md5_gg(c, d, e, a, b[f + 4], 20, -405537848);
        a = md5_gg(a, c, d, e, b[f + 9], 5, 568446438);
        e = md5_gg(e, a, c, d, b[f + 14], 9, -1019803690);
        d = md5_gg(d, e, a, c, b[f + 3], 14, -187363961);
        c = md5_gg(c, d, e, a, b[f + 8], 20, 1163531501);
        a = md5_gg(a, c, d, e, b[f + 13], 5, -1444681467);
        e = md5_gg(e, a, c, d, b[f + 2], 9, -51403784);
        d = md5_gg(d, e, a, c, b[f + 7], 14, 1735328473);
        c = md5_gg(c, d, e, a, b[f + 12], 20, -1926607734);
        a = md5_hh(a, c, d, e, b[f + 5], 4, -378558);
        e = md5_hh(e, a, c, d, b[f + 8], 11, -2022574463);
        d = md5_hh(d, e, a, c, b[f +
        11], 16, 1839030562);
        c = md5_hh(c, d, e, a, b[f + 14], 23, -35309556);
        a = md5_hh(a, c, d, e, b[f + 1], 4, -1530992060);
        e = md5_hh(e, a, c, d, b[f + 4], 11, 1272893353);
        d = md5_hh(d, e, a, c, b[f + 7], 16, -155497632);
        c = md5_hh(c, d, e, a, b[f + 10], 23, -1094730640);
        a = md5_hh(a, c, d, e, b[f + 13], 4, 681279174);
        e = md5_hh(e, a, c, d, b[f + 0], 11, -358537222);
        d = md5_hh(d, e, a, c, b[f + 3], 16, -722521979);
        c = md5_hh(c, d, e, a, b[f + 6], 23, 76029189);
        a = md5_hh(a, c, d, e, b[f + 9], 4, -640364487);
        e = md5_hh(e, a, c, d, b[f + 12], 11, -421815835);
        d = md5_hh(d, e, a, c, b[f + 15], 16, 530742520);
        c = md5_hh(c, d, e,
            a, b[f + 2], 23, -995338651);
        a = md5_ii(a, c, d, e, b[f + 0], 6, -198630844);
        e = md5_ii(e, a, c, d, b[f + 7], 10, 1126891415);
        d = md5_ii(d, e, a, c, b[f + 14], 15, -1416354905);
        c = md5_ii(c, d, e, a, b[f + 5], 21, -57434055);
        a = md5_ii(a, c, d, e, b[f + 12], 6, 1700485571);
        e = md5_ii(e, a, c, d, b[f + 3], 10, -1894986606);
        d = md5_ii(d, e, a, c, b[f + 10], 15, -1051523);
        c = md5_ii(c, d, e, a, b[f + 1], 21, -2054922799);
        a = md5_ii(a, c, d, e, b[f + 8], 6, 1873313359);
        e = md5_ii(e, a, c, d, b[f + 15], 10, -30611744);
        d = md5_ii(d, e, a, c, b[f + 6], 15, -1560198380);
        c = md5_ii(c, d, e, a, b[f + 13], 21, 1309151649);
        a = md5_ii(a,
            c, d, e, b[f + 4], 6, -145523070);
        e = md5_ii(e, a, c, d, b[f + 11], 10, -1120210379);
        d = md5_ii(d, e, a, c, b[f + 2], 15, 718787259);
        c = md5_ii(c, d, e, a, b[f + 9], 21, -343485551);
        a = safe_add(a, g);
        c = safe_add(c, h);
        d = safe_add(d, i);
        e = safe_add(e, j)
    }
    return Array(a, c, d, e)
}

function md5_cmn(b, a, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(a, b), safe_add(d, f)), e), c)
}

function md5_ff(b, a, c, d, e, f, g) {
    return md5_cmn(a & c | ~a & d, b, a, e, f, g)
}

function md5_gg(b, a, c, d, e, f, g) {
    return md5_cmn(a & d | c & ~d, b, a, e, f, g)
}

function md5_hh(b, a, c, d, e, f, g) {
    return md5_cmn(a ^ c ^ d, b, a, e, f, g)
}

function md5_ii(b, a, c, d, e, f, g) {
    return md5_cmn(c ^ (a | ~d), b, a, e, f, g)
}

function core_hmac_md5(b, a) {
    var c = str2binl(b);
    if (c.length > 16) c = core_md5(c, b.length * chrsz);
    var d = Array(16);
    b = Array(16);
    for (var e = 0; e < 16; e++) {
        d[e] = c[e] ^ 909522486;
        b[e] = c[e] ^ 1549556828
    }
    a = core_md5(d.concat(str2binl(a)), 512 + a.length * chrsz);
    return core_md5(b.concat(a), 640)
}

function safe_add(b, a) {
    var c = (b & 65535) + (a & 65535);
    return (b >> 16) + (a >> 16) + (c >> 16) << 16 | c & 65535
}

function bit_rol(b, a) {
    return b << a | b >>> 32 - a
}

function str2binl(b) {
    for (var a = Array(), c = (1 << chrsz) - 1, d = 0; d < b.length * chrsz; d += chrsz) a[d >> 5] |= (b.charCodeAt(d / chrsz) & c) << d % 32;
    return a
}

function binl2str(b) {
    for (var a = "", c = (1 << chrsz) - 1, d = 0; d < b.length * 32; d += chrsz) a += String.fromCharCode(b[d >> 5] >>> d % 32 & c);
    return a
}

function binl2hex(b) {
    for (var a = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < b.length * 4; d++) c += a.charAt(b[d >> 2] >> d % 4 * 8 + 4 & 15) + a.charAt(b[d >> 2] >> d % 4 * 8 & 15);
    return c
}

function binl2b64(b) {
    for (var a = "", c = 0; c < b.length * 4; c += 3) for (var d = (b[c >> 2] >> 8 * (c % 4) & 255) << 16 | (b[c + 1 >> 2] >> 8 * ((c + 1) % 4) & 255) << 8 | b[c + 2 >> 2] >> 8 * ((c + 2) % 4) & 255, e = 0; e < 4; e++) a += c * 8 + e * 6 > b.length * 32 ? b64pad : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 6 * (3 - e) & 63);
    return a
}

function make_js(pwd, a) {
    return hex_md5(hex_md5(pwd).substr(8, 16) + a)
};