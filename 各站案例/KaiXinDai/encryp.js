 var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function pwd_encrypt(a, b) {
    return encrypt_md5_aes(a, b)
}
function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}
function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}
function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}
function calcMD5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}
function core_md5(p, k) {
    p[k >> 5] |= 128 << ((k) % 32);
    p[(((k + 64) >>> 9) << 4) + 14] = k;
    var o = 1732584193;
    var n = -271733879;
    var m = -1732584194;
    var l = 271733878;
    for (var g = 0; g < p.length; g += 16) {
        var j = o;
        var h = n;
        var f = m;
        var e = l;
        o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
        l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
        m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
        n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
        o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
        l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
        m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
        n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
        o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
        l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
        m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
        n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
        o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
        l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
        m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
        n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
        o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
        l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
        m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
        n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
        o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
        l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
        m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
        n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
        o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
        l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
        m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
        n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
        o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
        l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
        m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
        n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
        o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
        l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
        m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
        n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
        o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
        l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
        m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
        n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
        o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
        l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
        m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
        n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
        o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
        l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
        m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
        n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
        o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
        l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
        m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
        n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
        o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
        l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
        m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
        n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
        o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
        l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
        m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
        n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
        o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
        l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
        m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
        n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
        o = safe_add(o, j);
        n = safe_add(n, h);
        m = safe_add(m, f);
        l = safe_add(l, e)
    }
    return Array(o, n, m, l)
}
function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
}
function md5_ff(g, f, k, j, e, i, h) {
    return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h)
}
function md5_gg(g, f, k, j, e, i, h) {
    return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h)
}
function md5_hh(g, f, k, j, e, i, h) {
    return md5_cmn(f ^ k ^ j, g, f, e, i, h)
}
function md5_ii(g, f, k, j, e, i, h) {
    return md5_cmn(k ^ (f | (~j)), g, f, e, i, h)
}
function core_hmac_md5(c, f) {
    var e = str2binl(c);
    if (e.length > 16) {
        e = core_md5(e, c.length * chrsz)
    }
    var a = Array(16)
      , d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = core_md5(a.concat(str2binl(f)), 512 + f.length * chrsz);
    return core_md5(d.concat(g), 512 + 128)
}
function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return (b << 16) | (c & 65535)
}
function bit_rol(a, b) {
    return (a << b) | (a >>> (32 - b))
}
function str2binl(d) {
    var c = Array();
    var a = (1 << chrsz) - 1;
    for (var b = 0; b < d.length * chrsz; b += chrsz) {
        c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << (b % 32)
    }
    return c
}
function binl2hex(c) {
    var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var d = "";
    for (var a = 0; a < c.length * 4; a++) {
        d += b.charAt((c[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((a % 4) * 8)) & 15)
    }
    return d
}
function binl2b64(d) {
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var f = "";
    for (var b = 0; b < d.length * 4; b += 3) {
        var e = (((d[b >> 2] >> 8 * (b % 4)) & 255) << 16) | (((d[b + 1 >> 2] >> 8 * ((b + 1) % 4)) & 255) << 8) | ((d[b + 2 >> 2] >> 8 * ((b + 2) % 4)) & 255);
        for (var a = 0; a < 4; a++) {
            if (b * 8 + a * 6 > d.length * 32) {
                f += b64pad
            } else {
                f += c.charAt((e >> 6 * (3 - a)) & 63)
            }
        }
    }
    return f
}
var CryptoJS = CryptoJS || function(o, e) {
    var h = {}
      , g = h.lib = {}
      , z = function() {}
      , y = g.Base = {
        extend: function(b) {
            z.prototype = this;
            var d = new z;
            b && d.mixIn(b);
            d.hasOwnProperty("init") || (d.init = function() {
                d.$super.init.apply(this, arguments)
            }
            );
            d.init.prototype = d;
            d.$super = this;
            return d
        },
        create: function() {
            var b = this.extend();
            b.init.apply(b, arguments);
            return b
        },
        init: function() {},
        mixIn: function(b) {
            for (var d in b) {
                b.hasOwnProperty(d) && (this[d] = b[d])
            }
            b.hasOwnProperty("toString") && (this.toString = b.toString)
        },
        clone: function() {
            return this.init.prototype.extend(this)
        }
    }
      , a = g.WordArray = y.extend({
        init: function(b, d) {
            b = this.words = b || [];
            this.sigBytes = d != e ? d : 4 * b.length
        },
        toString: function(b) {
            return (b || m).stringify(this)
        },
        concat: function(b) {
            var p = this.words
              , n = b.words
              , l = this.sigBytes;
            b = b.sigBytes;
            this.clamp();
            if (l % 4) {
                for (var d = 0; d < b; d++) {
                    p[l + d >>> 2] |= (n[d >>> 2] >>> 24 - 8 * (d % 4) & 255) << 24 - 8 * ((l + d) % 4)
                }
            } else {
                if (65535 < n.length) {
                    for (d = 0; d < b; d += 4) {
                        p[l + d >>> 2] = n[d >>> 2]
                    }
                } else {
                    p.push.apply(p, n)
                }
            }
            this.sigBytes += b;
            return this
        },
        clamp: function() {
            var b = this.words
              , d = this.sigBytes;
            b[d >>> 2] &= 4294967295 << 32 - 8 * (d % 4);
            b.length = o.ceil(d / 4)
        },
        clone: function() {
            var b = y.clone.call(this);
            b.words = this.words.slice(0);
            return b
        },
        random: function(b) {
            for (var l = [], d = 0; d < b; d += 4) {
                l.push(4294967296 * o.random() | 0)
            }
            return new a.init(l,b)
        }
    })
      , k = h.enc = {}
      , m = k.Hex = {
        stringify: function(b) {
            var p = b.words;
            b = b.sigBytes;
            for (var n = [], l = 0; l < b; l++) {
                var d = p[l >>> 2] >>> 24 - 8 * (l % 4) & 255;
                n.push((d >>> 4).toString(16));
                n.push((d & 15).toString(16))
            }
            return n.join("")
        },
        parse: function(b) {
            for (var n = b.length, l = [], d = 0; d < n; d += 2) {
                l[d >>> 3] |= parseInt(b.substr(d, 2), 16) << 24 - 4 * (d % 8)
            }
            return new a.init(l,n / 2)
        }
    }
      , i = k.Latin1 = {
        stringify: function(b) {
            var n = b.words;
            b = b.sigBytes;
            for (var l = [], d = 0; d < b; d++) {
                l.push(String.fromCharCode(n[d >>> 2] >>> 24 - 8 * (d % 4) & 255))
            }
            return l.join("")
        },
        parse: function(b) {
            for (var n = b.length, l = [], d = 0; d < n; d++) {
                l[d >>> 2] |= (b.charCodeAt(d) & 255) << 24 - 8 * (d % 4)
            }
            return new a.init(l,n)
        }
    }
      , j = k.Utf8 = {
        stringify: function(b) {
            try {
                return decodeURIComponent(escape(i.stringify(b)))
            } catch (d) {
                throw Error("Malformed UTF-8 data")
            }
        },
        parse: function(b) {
            return i.parse(unescape(encodeURIComponent(b)))
        }
    }
      , c = g.BufferedBlockAlgorithm = y.extend({
        reset: function() {
            this._data = new a.init;
            this._nDataBytes = 0
        },
        _append: function(b) {
            "string" == typeof b && (b = j.parse(b));
            this._data.concat(b);
            this._nDataBytes += b.sigBytes
        },
        _process: function(l) {
            var t = this._data
              , s = t.words
              , p = t.sigBytes
              , n = this.blockSize
              , d = p / (4 * n)
              , d = l ? o.ceil(d) : o.max((d | 0) - this._minBufferSize, 0);
            l = d * n;
            p = o.min(4 * l, p);
            if (l) {
                for (var r = 0; r < l; r += n) {
                    this._doProcessBlock(s, r)
                }
                r = s.splice(0, l);
                t.sigBytes -= p
            }
            return new a.init(r,p)
        },
        clone: function() {
            var b = y.clone.call(this);
            b._data = this._data.clone();
            return b
        },
        _minBufferSize: 0
    });
    g.Hasher = c.extend({
        cfg: y.extend(),
        init: function(b) {
            this.cfg = this.cfg.extend(b);
            this.reset()
        },
        reset: function() {
            c.reset.call(this);
            this._doReset()
        },
        update: function(b) {
            this._append(b);
            this._process();
            return this
        },
        finalize: function(b) {
            b && this._append(b);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(b) {
            return function(d, l) {
                return (new b.init(l)).finalize(d)
            }
        },
        _createHmacHelper: function(b) {
            return function(d, l) {
                return (new f.HMAC.init(b,l)).finalize(d)
            }
        }
    });
    var f = h.algo = {};
    return h
}(Math);
(function() {
    var a = CryptoJS
      , b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(j) {
            var e = j.words
              , i = j.sigBytes
              , g = this._map;
            j.clamp();
            j = [];
            for (var h = 0; h < i; h += 3) {
                for (var c = (e[h >>> 2] >>> 24 - 8 * (h % 4) & 255) << 16 | (e[h + 1 >>> 2] >>> 24 - 8 * ((h + 1) % 4) & 255) << 8 | e[h + 2 >>> 2] >>> 24 - 8 * ((h + 2) % 4) & 255, f = 0; 4 > f && h + 0.75 * f < i; f++) {
                    j.push(g.charAt(c >>> 6 * (3 - f) & 63))
                }
            }
            if (e = g.charAt(64)) {
                for (; j.length % 4; ) {
                    j.push(e)
                }
            }
            return j.join("")
        },
        parse: function(k) {
            var f = k.length
              , i = this._map
              , h = i.charAt(64);
            h && (h = k.indexOf(h),
            -1 != h && (f = h));
            for (var h = [], j = 0, e = 0; e < f; e++) {
                if (e % 4) {
                    var g = i.indexOf(k.charAt(e - 1)) << 2 * (e % 4)
                      , c = i.indexOf(k.charAt(e)) >>> 6 - 2 * (e % 4);
                    h[j >>> 2] |= (g | c) << 24 - 8 * (j % 4);
                    j++
                }
            }
            return b.create(h, j)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}
)();
(function(k) {
    function c(d, s, l, r, q, p, o) {
        d = d + (s & l | ~s & r) + q + o;
        return (d << p | d >>> 32 - p) + s
    }
    function f(d, s, l, r, q, p, o) {
        d = d + (s & r | l & ~r) + q + o;
        return (d << p | d >>> 32 - p) + s
    }
    function e(d, s, l, r, q, p, o) {
        d = d + (s ^ l ^ r) + q + o;
        return (d << p | d >>> 32 - p) + s
    }
    function n(d, s, l, r, q, p, o) {
        d = d + (l ^ (s | ~r)) + q + o;
        return (d << p | d >>> 32 - p) + s
    }
    for (var m = CryptoJS, a = m.lib, i = a.WordArray, j = a.Hasher, a = m.algo, g = [], h = 0; 64 > h; h++) {
        g[h] = 4294967296 * k.abs(k.sin(h + 1)) | 0
    }
    a = a.MD5 = j.extend({
        _doReset: function() {
            this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(J, L) {
            for (var U = 0; 16 > U; U++) {
                var T = L + U
                  , S = J[T];
                J[T] = (S << 8 | S >>> 24) & 16711935 | (S << 24 | S >>> 8) & 4278255360
            }
            var U = this._hash.words
              , T = J[L + 0]
              , S = J[L + 1]
              , O = J[L + 2]
              , N = J[L + 3]
              , b = J[L + 4]
              , H = J[L + 5]
              , y = J[L + 6]
              , l = J[L + 7]
              , o = J[L + 8]
              , K = J[L + 9]
              , I = J[L + 10]
              , G = J[L + 11]
              , p = J[L + 12]
              , F = J[L + 13]
              , s = J[L + 14]
              , d = J[L + 15]
              , R = U[0]
              , M = U[1]
              , Q = U[2]
              , P = U[3]
              , R = c(R, M, Q, P, T, 7, g[0])
              , P = c(P, R, M, Q, S, 12, g[1])
              , Q = c(Q, P, R, M, O, 17, g[2])
              , M = c(M, Q, P, R, N, 22, g[3])
              , R = c(R, M, Q, P, b, 7, g[4])
              , P = c(P, R, M, Q, H, 12, g[5])
              , Q = c(Q, P, R, M, y, 17, g[6])
              , M = c(M, Q, P, R, l, 22, g[7])
              , R = c(R, M, Q, P, o, 7, g[8])
              , P = c(P, R, M, Q, K, 12, g[9])
              , Q = c(Q, P, R, M, I, 17, g[10])
              , M = c(M, Q, P, R, G, 22, g[11])
              , R = c(R, M, Q, P, p, 7, g[12])
              , P = c(P, R, M, Q, F, 12, g[13])
              , Q = c(Q, P, R, M, s, 17, g[14])
              , M = c(M, Q, P, R, d, 22, g[15])
              , R = f(R, M, Q, P, S, 5, g[16])
              , P = f(P, R, M, Q, y, 9, g[17])
              , Q = f(Q, P, R, M, G, 14, g[18])
              , M = f(M, Q, P, R, T, 20, g[19])
              , R = f(R, M, Q, P, H, 5, g[20])
              , P = f(P, R, M, Q, I, 9, g[21])
              , Q = f(Q, P, R, M, d, 14, g[22])
              , M = f(M, Q, P, R, b, 20, g[23])
              , R = f(R, M, Q, P, K, 5, g[24])
              , P = f(P, R, M, Q, s, 9, g[25])
              , Q = f(Q, P, R, M, N, 14, g[26])
              , M = f(M, Q, P, R, o, 20, g[27])
              , R = f(R, M, Q, P, F, 5, g[28])
              , P = f(P, R, M, Q, O, 9, g[29])
              , Q = f(Q, P, R, M, l, 14, g[30])
              , M = f(M, Q, P, R, p, 20, g[31])
              , R = e(R, M, Q, P, H, 4, g[32])
              , P = e(P, R, M, Q, o, 11, g[33])
              , Q = e(Q, P, R, M, G, 16, g[34])
              , M = e(M, Q, P, R, s, 23, g[35])
              , R = e(R, M, Q, P, S, 4, g[36])
              , P = e(P, R, M, Q, b, 11, g[37])
              , Q = e(Q, P, R, M, l, 16, g[38])
              , M = e(M, Q, P, R, I, 23, g[39])
              , R = e(R, M, Q, P, F, 4, g[40])
              , P = e(P, R, M, Q, T, 11, g[41])
              , Q = e(Q, P, R, M, N, 16, g[42])
              , M = e(M, Q, P, R, y, 23, g[43])
              , R = e(R, M, Q, P, K, 4, g[44])
              , P = e(P, R, M, Q, p, 11, g[45])
              , Q = e(Q, P, R, M, d, 16, g[46])
              , M = e(M, Q, P, R, O, 23, g[47])
              , R = n(R, M, Q, P, T, 6, g[48])
              , P = n(P, R, M, Q, l, 10, g[49])
              , Q = n(Q, P, R, M, s, 15, g[50])
              , M = n(M, Q, P, R, H, 21, g[51])
              , R = n(R, M, Q, P, p, 6, g[52])
              , P = n(P, R, M, Q, N, 10, g[53])
              , Q = n(Q, P, R, M, I, 15, g[54])
              , M = n(M, Q, P, R, S, 21, g[55])
              , R = n(R, M, Q, P, o, 6, g[56])
              , P = n(P, R, M, Q, d, 10, g[57])
              , Q = n(Q, P, R, M, y, 15, g[58])
              , M = n(M, Q, P, R, F, 21, g[59])
              , R = n(R, M, Q, P, b, 6, g[60])
              , P = n(P, R, M, Q, G, 10, g[61])
              , Q = n(Q, P, R, M, O, 15, g[62])
              , M = n(M, Q, P, R, K, 21, g[63]);
            U[0] = U[0] + R | 0;
            U[1] = U[1] + M | 0;
            U[2] = U[2] + Q | 0;
            U[3] = U[3] + P | 0
        },
        _doFinalize: function() {
            var d = this._data
              , q = d.words
              , l = 8 * this._nDataBytes
              , p = 8 * d.sigBytes;
            q[p >>> 5] |= 128 << 24 - p % 32;
            var o = k.floor(l / 4294967296);
            q[(p + 64 >>> 9 << 4) + 15] = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360;
            q[(p + 64 >>> 9 << 4) + 14] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
            d.sigBytes = 4 * (q.length + 1);
            this._process();
            d = this._hash;
            q = d.words;
            for (l = 0; 4 > l; l++) {
                p = q[l],
                q[l] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360
            }
            return d
        },
        clone: function() {
            var d = j.clone.call(this);
            d._hash = this._hash.clone();
            return d
        }
    });
    m.MD5 = j._createHelper(a);
    m.HmacMD5 = j._createHmacHelper(a)
}
)(Math);
(function() {
    var b = CryptoJS
      , e = b.lib
      , f = e.Base
      , a = e.WordArray
      , e = b.algo
      , c = e.EvpKDF = f.extend({
        cfg: f.extend({
            keySize: 4,
            hasher: e.MD5,
            iterations: 1
        }),
        init: function(g) {
            this.cfg = this.cfg.extend(g)
        },
        compute: function(k, g) {
            for (var i = this.cfg, t = i.hasher.create(), l = a.create(), o = l.words, h = i.keySize, i = i.iterations; o.length < h; ) {
                j && t.update(j);
                var j = t.update(k).finalize(g);
                t.reset();
                for (var m = 1; m < i; m++) {
                    j = t.finalize(j),
                    t.reset()
                }
                l.concat(j)
            }
            l.sigBytes = 4 * h;
            return l
        }
    });
    b.EvpKDF = function(i, g, h) {
        return c.create(h).compute(i, g)
    }
}
)();
CryptoJS.lib.Cipher || function(B) {
    var g = CryptoJS
      , j = g.lib
      , i = j.Base
      , D = j.WordArray
      , C = j.BufferedBlockAlgorithm
      , e = g.enc.Base64
      , z = g.algo.EvpKDF
      , A = j.Cipher = C.extend({
        cfg: i.extend(),
        createEncryptor: function(c, b) {
            return this.create(this._ENC_XFORM_MODE, c, b)
        },
        createDecryptor: function(c, b) {
            return this.create(this._DEC_XFORM_MODE, c, b)
        },
        init: function(l, d, c) {
            this.cfg = this.cfg.extend(c);
            this._xformMode = l;
            this._key = d;
            this.reset()
        },
        reset: function() {
            C.reset.call(this);
            this._doReset()
        },
        process: function(a) {
            this._append(a);
            return this._process()
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(c, l, n) {
                    return ("string" == typeof l ? k : o).encrypt(a, c, l, n)
                },
                decrypt: function(c, l, n) {
                    return ("string" == typeof l ? k : o).decrypt(a, c, l, n)
                }
            }
        }
    });
    j.StreamCipher = A.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var m = g.mode = {}
      , y = function(p, n, l) {
        var r = this._iv;
        r ? this._iv = B : r = this._prevBlock;
        for (var q = 0; q < l; q++) {
            p[n + q] ^= r[q]
        }
    }
      , f = (j.BlockCipherMode = i.extend({
        createEncryptor: function(c, b) {
            return this.Encryptor.create(c, b)
        },
        createDecryptor: function(c, b) {
            return this.Decryptor.create(c, b)
        },
        init: function(c, b) {
            this._cipher = c;
            this._iv = b
        }
    })).extend();
    f.Encryptor = f.extend({
        processBlock: function(n, l) {
            var d = this._cipher
              , p = d.blockSize;
            y.call(this, n, l, p);
            d.encryptBlock(n, l);
            this._prevBlock = n.slice(l, l + p)
        }
    });
    f.Decryptor = f.extend({
        processBlock: function(p, n) {
            var l = this._cipher
              , r = l.blockSize
              , q = p.slice(n, n + r);
            l.decryptBlock(p, n);
            y.call(this, p, n, r);
            this._prevBlock = q
        }
    });
    m = m.CBC = f;
    f = (g.pad = {}).Pkcs7 = {
        pad: function(r, p) {
            for (var u = 4 * p, u = u - r.sigBytes % u, s = u << 24 | u << 16 | u << 8 | u, q = [], t = 0; t < u; t += 4) {
                q.push(s)
            }
            u = D.create(q, u);
            r.concat(u)
        },
        unpad: function(b) {
            b.sigBytes -= b.words[b.sigBytes - 1 >>> 2] & 255
        }
    };
    j.BlockCipher = A.extend({
        cfg: A.cfg.extend({
            mode: m,
            padding: f
        }),
        reset: function() {
            A.reset.call(this);
            var l = this.cfg
              , d = l.iv
              , l = l.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                var n = l.createEncryptor
            } else {
                n = l.createDecryptor,
                this._minBufferSize = 1
            }
            this._mode = n.call(l, this, d && d.words)
        },
        _doProcessBlock: function(d, c) {
            this._mode.processBlock(d, c)
        },
        _doFinalize: function() {
            var d = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                d.pad(this._data, this.blockSize);
                var c = this._process(!0)
            } else {
                c = this._process(!0),
                d.unpad(c)
            }
            return c
        },
        blockSize: 4
    });
    var h = j.CipherParams = i.extend({
        init: function(b) {
            this.mixIn(b)
        },
        toString: function(b) {
            return (b || this.formatter).stringify(this)
        }
    })
      , m = (g.format = {}).OpenSSL = {
        stringify: function(d) {
            var c = d.ciphertext;
            d = d.salt;
            return (d ? D.create([1398893684, 1701076831]).concat(d).concat(c) : c).toString(e)
        },
        parse: function(l) {
            l = e.parse(l);
            var d = l.words;
            if (1398893684 == d[0] && 1701076831 == d[1]) {
                var n = D.create(d.slice(2, 4));
                d.splice(0, 4);
                l.sigBytes -= 16
            }
            return h.create({
                ciphertext: l,
                salt: n
            })
        }
    }
      , o = j.SerializableCipher = i.extend({
        cfg: i.extend({
            format: m
        }),
        encrypt: function(q, n, s, r) {
            r = this.cfg.extend(r);
            var p = q.createEncryptor(s, r);
            n = p.finalize(n);
            p = p.cfg;
            return h.create({
                ciphertext: n,
                key: s,
                iv: p.iv,
                algorithm: q,
                mode: p.mode,
                padding: p.padding,
                blockSize: q.blockSize,
                formatter: r.format
            })
        },
        decrypt: function(n, l, q, p) {
            p = this.cfg.extend(p);
            l = this._parse(l, p.format);
            return n.createDecryptor(q, p).finalize(l.ciphertext)
        },
        _parse: function(d, c) {
            return "string" == typeof d ? c.parse(d, this) : d
        }
    })
      , g = (g.kdf = {}).OpenSSL = {
        execute: function(n, l, q, p) {
            p || (p = D.random(8));
            n = z.create({
                keySize: l + q
            }).compute(n, p);
            q = D.create(n.words.slice(l), 4 * q);
            n.sigBytes = 4 * l;
            return h.create({
                key: n,
                iv: q,
                salt: p
            })
        }
    }
      , k = j.PasswordBasedCipher = o.extend({
        cfg: o.cfg.extend({
            kdf: g
        }),
        encrypt: function(a, q, p, n) {
            n = this.cfg.extend(n);
            p = n.kdf.execute(p, a.keySize, a.ivSize);
            n.iv = p.iv;
            a = o.encrypt.call(this, a, q, p.key, n);
            a.mixIn(p);
            return a
        },
        decrypt: function(a, q, p, n) {
            n = this.cfg.extend(n);
            q = this._parse(q, n.format);
            p = n.kdf.execute(p, a.keySize, a.ivSize, q.salt);
            n.iv = p.iv;
            return o.decrypt.call(this, a, q, p.key, n)
        }
    })
}();
(function() {
    for (var C = CryptoJS, K = C.lib.BlockCipher, Q = C.algo, M = [], E = [], D = [], I = [], m = [], A = [], S = [], h = [], J = [], L = [], T = [], R = 0; 256 > R; R++) {
        T[R] = 128 > R ? R << 1 : R << 1 ^ 283
    }
    for (var P = 0, O = 0, R = 0; 256 > R; R++) {
        var N = O ^ O << 1 ^ O << 2 ^ O << 3 ^ O << 4
          , N = N >>> 8 ^ N & 255 ^ 99;
        M[P] = N;
        E[N] = P;
        var f = T[P]
          , B = T[f]
          , o = T[B]
          , g = 257 * T[N] ^ 16843008 * N;
        D[P] = g << 24 | g >>> 8;
        I[P] = g << 16 | g >>> 16;
        m[P] = g << 8 | g >>> 24;
        A[P] = g;
        g = 16843009 * o ^ 65537 * B ^ 257 * f ^ 16843008 * P;
        S[N] = g << 24 | g >>> 8;
        h[N] = g << 16 | g >>> 16;
        J[N] = g << 8 | g >>> 24;
        L[N] = g;
        P ? (P = f ^ T[T[T[o ^ f]]],
        O ^= T[T[O]]) : P = O = 1
    }
    var i = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
      , Q = Q.AES = K.extend({
        _doReset: function() {
            for (var b = this._key, r = b.words, q = b.sigBytes / 4, b = 4 * ((this._nRounds = q + 6) + 1), p = this._keySchedule = [], n = 0; n < b; n++) {
                if (n < q) {
                    p[n] = r[n]
                } else {
                    var l = p[n - 1];
                    n % q ? 6 < q && 4 == n % q && (l = M[l >>> 24] << 24 | M[l >>> 16 & 255] << 16 | M[l >>> 8 & 255] << 8 | M[l & 255]) : (l = l << 8 | l >>> 24,
                    l = M[l >>> 24] << 24 | M[l >>> 16 & 255] << 16 | M[l >>> 8 & 255] << 8 | M[l & 255],
                    l ^= i[n / q | 0] << 24);
                    p[n] = p[n - q] ^ l
                }
            }
            r = this._invKeySchedule = [];
            for (q = 0; q < b; q++) {
                n = b - q,
                l = q % 4 ? p[n] : p[n - 4],
                r[q] = 4 > q || 4 >= n ? l : S[M[l >>> 24]] ^ h[M[l >>> 16 & 255]] ^ J[M[l >>> 8 & 255]] ^ L[M[l & 255]]
            }
        },
        encryptBlock: function(d, c) {
            this._doCryptBlock(d, c, this._keySchedule, D, I, m, A, M)
        },
        decryptBlock: function(b, j) {
            var e = b[j + 1];
            b[j + 1] = b[j + 3];
            b[j + 3] = e;
            this._doCryptBlock(b, j, this._invKeySchedule, S, h, J, L, E);
            e = b[j + 1];
            b[j + 1] = b[j + 3];
            b[j + 3] = e
        },
        _doCryptBlock: function(ac, ab, aa, Z, Y, U, G, X) {
            for (var F = this._nRounds, W = ac[ab] ^ aa[0], V = ac[ab + 1] ^ aa[1], H = ac[ab + 2] ^ aa[2], z = ac[ab + 3] ^ aa[3], y = 4, w = 1; w < F; w++) {
                var x = Z[W >>> 24] ^ Y[V >>> 16 & 255] ^ U[H >>> 8 & 255] ^ G[z & 255] ^ aa[y++]
                  , v = Z[V >>> 24] ^ Y[H >>> 16 & 255] ^ U[z >>> 8 & 255] ^ G[W & 255] ^ aa[y++]
                  , u = Z[H >>> 24] ^ Y[z >>> 16 & 255] ^ U[W >>> 8 & 255] ^ G[V & 255] ^ aa[y++]
                  , z = Z[z >>> 24] ^ Y[W >>> 16 & 255] ^ U[V >>> 8 & 255] ^ G[H & 255] ^ aa[y++]
                  , W = x
                  , V = v
                  , H = u
            }
            x = (X[W >>> 24] << 24 | X[V >>> 16 & 255] << 16 | X[H >>> 8 & 255] << 8 | X[z & 255]) ^ aa[y++];
            v = (X[V >>> 24] << 24 | X[H >>> 16 & 255] << 16 | X[z >>> 8 & 255] << 8 | X[W & 255]) ^ aa[y++];
            u = (X[H >>> 24] << 24 | X[z >>> 16 & 255] << 16 | X[W >>> 8 & 255] << 8 | X[V & 255]) ^ aa[y++];
            z = (X[z >>> 24] << 24 | X[W >>> 16 & 255] << 16 | X[V >>> 8 & 255] << 8 | X[H & 255]) ^ aa[y++];
            ac[ab] = x;
            ac[ab + 1] = v;
            ac[ab + 2] = u;
            ac[ab + 3] = z
        },
        keySize: 8
    });
    C.AES = K._createHelper(Q)
}
)();
CryptoJS.pad.NoPadding = {
    pad: function() {},
    unpad: function() {}
};
function encrypt_md5_aes(c, f) {
    var g = hex_md5(f);
    var d = CryptoJS.enc.Utf8.parse(c);
    var b = CryptoJS.enc.Utf8.parse(c);
    var e = CryptoJS.enc.Utf8.parse(g);
    var a = CryptoJS.AES.encrypt(e, d, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.NoPadding
    });
    return a.toString()
}
function encrypt_aes(c, f) {
    var d = CryptoJS.enc.Utf8.parse(c);
    var b = CryptoJS.enc.Utf8.parse(c);
    var e = CryptoJS.enc.Utf8.parse(f);
    var a = CryptoJS.AES.encrypt(e, d, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.NoPadding
    });
    return a.toString()
}




function test(dlmy, pwd){
	return pwd_encrypt(dlmy, pwd);
}