var window = this;
    !function(e) {
        function t(i) {
            var e = u
              , t = e.biDivideByRadixPower(i, this.k - 1)
              , s = e.biMultiply(t, this.mu)
              , n = e.biDivideByRadixPower(s, this.k + 1)
              , o = e.biModuloByRadixPower(i, this.k + 1)
              , r = e.biMultiply(n, this.modulus)
              , a = e.biModuloByRadixPower(r, this.k + 1)
              , l = e.biSubtract(o, a);
            l.isNeg && (l = e.biAdd(l, this.bkplus1));
            for (var d = e.biCompare(l, this.modulus) >= 0; d; )
                l = e.biSubtract(l, this.modulus),
                d = e.biCompare(l, this.modulus) >= 0;
            return l
        }
        function s(i, e) {
            var t = u.biMultiply(i, e);
            return this.modulo(t)
        }
        function n(i, e) {
            var t = new b;
            t.digits[0] = 1;
            for (var s = i, n = e; ; ) {
                if (0 != (1 & n.digits[0]) && (t = this.multiplyMod(t, s)),
                n = u.biShiftRight(n, 1),
                0 == n.digits[0] && 0 == u.biHighIndex(n))
                    break;
                s = this.multiplyMod(s, s)
            }
            return t
        }
        function o(i) {
            for (var e = "", t = 0; t < i; t++)
                e += Math.floor(10 * Math.random());
            return e
        }
        var r, a, l, d, u = e.RSAUtils || {}, c = 16, h = c, f = 65536, m = f >>> 1, p = f * f, g = f - 1, b = e.BigInt = function(i) {
            "boolean" == typeof i && 1 == i ? this.digits = null : this.digits = a.slice(0),
            this.isNeg = !1
        }
        ;
        u.setMaxDigits = function(i) {
            r = i,
            a = new Array(r);
            for (var e = 0; e < a.length; e++)
                a[e] = 0;
            l = new b,
            d = new b,
            d.digits[0] = 1
        }
        ,
        u.setMaxDigits(20);
        var v = 15;
        u.biFromNumber = function(i) {
            var e = new b;
            e.isNeg = i < 0,
            i = Math.abs(i);
            for (var t = 0; i > 0; )
                e.digits[t++] = i & g,
                i = Math.floor(i / f);
            return e
        }
        ;
        var w = u.biFromNumber(1e15);
        u.biFromDecimal = function(i) {
            for (var e, t = "-" == i.charAt(0), s = t ? 1 : 0; s < i.length && "0" == i.charAt(s); )
                ++s;
            if (s == i.length)
                e = new b;
            else {
                var n = i.length - s
                  , o = n % v;
                for (0 == o && (o = v),
                e = u.biFromNumber(Number(i.substr(s, o))),
                s += o; s < i.length; )
                    e = u.biAdd(u.biMultiply(e, w), u.biFromNumber(Number(i.substr(s, v)))),
                    s += v;
                e.isNeg = t
            }
            return e
        }
        ,
        u.biCopy = function(i) {
            var e = new b((!0));
            return e.digits = i.digits.slice(0),
            e.isNeg = i.isNeg,
            e
        }
        ,
        u.reverseStr = function(i) {
            for (var e = "", t = i.length - 1; t > -1; --t)
                e += i.charAt(t);
            return e
        }
        ;
        var x = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        u.biToString = function(i, e) {
            var t = new b;
            t.digits[0] = e;
            for (var s = u.biDivideModulo(i, t), n = x[s[1].digits[0]]; 1 == u.biCompare(s[0], l); )
                s = u.biDivideModulo(s[0], t),
                digit = s[1].digits[0],
                n += x[s[1].digits[0]];
            return (i.isNeg ? "-" : "") + u.reverseStr(n)
        }
        ,
        u.biToDecimal = function(i) {
            var e = new b;
            e.digits[0] = 10;
            for (var t = u.biDivideModulo(i, e), s = String(t[1].digits[0]); 1 == u.biCompare(t[0], l); )
                t = u.biDivideModulo(t[0], e),
                s += String(t[1].digits[0]);
            return (i.isNeg ? "-" : "") + u.reverseStr(s)
        }
        ;
        var y = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        u.digitToHex = function(e) {
            var t = 15
              , s = "";
            for (i = 0; i < 4; ++i)
                s += y[e & t],
                e >>>= 4;
            return u.reverseStr(s)
        }
        ,
        u.biToHex = function(i) {
            for (var e = "", t = (u.biHighIndex(i),
            u.biHighIndex(i)); t > -1; --t)
                e += u.digitToHex(i.digits[t]);
            return e
        }
        ,
        u.charToHex = function(i) {
            var e, t = 48, s = t + 9, n = 97, o = n + 25, r = 65, a = 90;
            return e = i >= t && i <= s ? i - t : i >= r && i <= a ? 10 + i - r : i >= n && i <= o ? 10 + i - n : 0
        }
        ,
        u.hexToDigit = function(i) {
            for (var e = 0, t = Math.min(i.length, 4), s = 0; s < t; ++s)
                e <<= 4,
                e |= u.charToHex(i.charCodeAt(s));
            return e
        }
        ,
        u.biFromHex = function(i) {
            for (var e = new b, t = i.length, s = t, n = 0; s > 0; s -= 4,
            ++n)
                e.digits[n] = u.hexToDigit(i.substr(Math.max(s - 4, 0), Math.min(s, 4)));
            return e
        }
        ,
        u.biFromString = function(i, e) {
            var t = "-" == i.charAt(0)
              , s = t ? 1 : 0
              , n = new b
              , o = new b;
            o.digits[0] = 1;
            for (var r = i.length - 1; r >= s; r--) {
                var a = i.charCodeAt(r)
                  , l = u.charToHex(a)
                  , d = u.biMultiplyDigit(o, l);
                n = u.biAdd(n, d),
                o = u.biMultiplyDigit(o, e)
            }
            return n.isNeg = t,
            n
        }
        ,
        u.biDump = function(i) {
            return (i.isNeg ? "-" : "") + i.digits.join(" ")
        }
        ,
        u.biAdd = function(i, e) {
            var t;
            if (i.isNeg != e.isNeg)
                e.isNeg = !e.isNeg,
                t = u.biSubtract(i, e),
                e.isNeg = !e.isNeg;
            else {
                t = new b;
                for (var s, n = 0, o = 0; o < i.digits.length; ++o)
                    s = i.digits[o] + e.digits[o] + n,
                    t.digits[o] = s % f,
                    n = Number(s >= f);
                t.isNeg = i.isNeg
            }
            return t
        }
        ,
        u.biSubtract = function(i, e) {
            var t;
            if (i.isNeg != e.isNeg)
                e.isNeg = !e.isNeg,
                t = u.biAdd(i, e),
                e.isNeg = !e.isNeg;
            else {
                t = new b;
                var s, n;
                n = 0;
                for (var o = 0; o < i.digits.length; ++o)
                    s = i.digits[o] - e.digits[o] + n,
                    t.digits[o] = s % f,
                    t.digits[o] < 0 && (t.digits[o] += f),
                    n = 0 - Number(s < 0);
                if (n == -1) {
                    n = 0;
                    for (var o = 0; o < i.digits.length; ++o)
                        s = 0 - t.digits[o] + n,
                        t.digits[o] = s % f,
                        t.digits[o] < 0 && (t.digits[o] += f),
                        n = 0 - Number(s < 0);
                    t.isNeg = !i.isNeg
                } else
                    t.isNeg = i.isNeg
            }
            return t
        }
        ,
        u.biHighIndex = function(i) {
            for (var e = i.digits.length - 1; e > 0 && 0 == i.digits[e]; )
                --e;
            return e
        }
        ,
        u.biNumBits = function(i) {
            var e, t = u.biHighIndex(i), s = i.digits[t], n = (t + 1) * h;
            for (e = n; e > n - h && 0 == (32768 & s); --e)
                s <<= 1;
            return e
        }
        ,
        u.biMultiply = function(i, e) {
            for (var t, s, n, o = new b, r = u.biHighIndex(i), a = u.biHighIndex(e), l = 0; l <= a; ++l) {
                for (t = 0,
                n = l,
                j = 0; j <= r; ++j,
                ++n)
                    s = o.digits[n] + i.digits[j] * e.digits[l] + t,
                    o.digits[n] = s & g,
                    t = s >>> c;
                o.digits[l + r + 1] = t
            }
            return o.isNeg = i.isNeg != e.isNeg,
            o
        }
        ,
        u.biMultiplyDigit = function(i, e) {
            var t, s, n;
            result = new b,
            t = u.biHighIndex(i),
            s = 0;
            for (var o = 0; o <= t; ++o)
                n = result.digits[o] + i.digits[o] * e + s,
                result.digits[o] = n & g,
                s = n >>> c;
            return result.digits[1 + t] = s,
            result
        }
        ,
        u.arrayCopy = function(i, e, t, s, n) {
            for (var o = Math.min(e + n, i.length), r = e, a = s; r < o; ++r,
            ++a)
                t[a] = i[r]
        }
        ;
        var C = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
        u.biShiftLeft = function(i, e) {
            var t = Math.floor(e / h)
              , s = new b;
            u.arrayCopy(i.digits, 0, s.digits, t, s.digits.length - t);
            for (var n = e % h, o = h - n, r = s.digits.length - 1, a = r - 1; r > 0; --r,
            --a)
                s.digits[r] = s.digits[r] << n & g | (s.digits[a] & C[n]) >>> o;
            return s.digits[0] = s.digits[r] << n & g,
            s.isNeg = i.isNeg,
            s
        }
        ;
        var S = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
        u.biShiftRight = function(i, e) {
            var t = Math.floor(e / h)
              , s = new b;
            u.arrayCopy(i.digits, t, s.digits, 0, i.digits.length - t);
            for (var n = e % h, o = h - n, r = 0, a = r + 1; r < s.digits.length - 1; ++r,
            ++a)
                s.digits[r] = s.digits[r] >>> n | (s.digits[a] & S[n]) << o;
            return s.digits[s.digits.length - 1] >>>= n,
            s.isNeg = i.isNeg,
            s
        }
        ,
        u.biMultiplyByRadixPower = function(i, e) {
            var t = new b;
            return u.arrayCopy(i.digits, 0, t.digits, e, t.digits.length - e),
            t
        }
        ,
        u.biDivideByRadixPower = function(i, e) {
            var t = new b;
            return u.arrayCopy(i.digits, e, t.digits, 0, t.digits.length - e),
            t
        }
        ,
        u.biModuloByRadixPower = function(i, e) {
            var t = new b;
            return u.arrayCopy(i.digits, 0, t.digits, 0, e),
            t
        }
        ,
        u.biCompare = function(i, e) {
            if (i.isNeg != e.isNeg)
                return 1 - 2 * Number(i.isNeg);
            for (var t = i.digits.length - 1; t >= 0; --t)
                if (i.digits[t] != e.digits[t])
                    return i.isNeg ? 1 - 2 * Number(i.digits[t] > e.digits[t]) : 1 - 2 * Number(i.digits[t] < e.digits[t]);
            return 0
        }
        ,
        u.biDivideModulo = function(i, e) {
            var t, s, n = u.biNumBits(i), o = u.biNumBits(e), r = e.isNeg;
            if (n < o)
                return i.isNeg ? (t = u.biCopy(d),
                t.isNeg = !e.isNeg,
                i.isNeg = !1,
                e.isNeg = !1,
                s = biSubtract(e, i),
                i.isNeg = !0,
                e.isNeg = r) : (t = new b,
                s = u.biCopy(i)),
                [t, s];
            t = new b,
            s = i;
            for (var a = Math.ceil(o / h) - 1, l = 0; e.digits[a] < m; )
                e = u.biShiftLeft(e, 1),
                ++l,
                ++o,
                a = Math.ceil(o / h) - 1;
            s = u.biShiftLeft(s, l),
            n += l;
            for (var c = Math.ceil(n / h) - 1, v = u.biMultiplyByRadixPower(e, c - a); u.biCompare(s, v) != -1; )
                ++t.digits[c - a],
                s = u.biSubtract(s, v);
            for (var w = c; w > a; --w) {
                var x = w >= s.digits.length ? 0 : s.digits[w]
                  , y = w - 1 >= s.digits.length ? 0 : s.digits[w - 1]
                  , C = w - 2 >= s.digits.length ? 0 : s.digits[w - 2]
                  , S = a >= e.digits.length ? 0 : e.digits[a]
                  , $ = a - 1 >= e.digits.length ? 0 : e.digits[a - 1];
                x == S ? t.digits[w - a - 1] = g : t.digits[w - a - 1] = Math.floor((x * f + y) / S);
                for (var I = t.digits[w - a - 1] * (S * f + $), k = x * p + (y * f + C); I > k; )
                    --t.digits[w - a - 1],
                    I = t.digits[w - a - 1] * (S * f | $),
                    k = x * f * f + (y * f + C);
                v = u.biMultiplyByRadixPower(e, w - a - 1),
                s = u.biSubtract(s, u.biMultiplyDigit(v, t.digits[w - a - 1])),
                s.isNeg && (s = u.biAdd(s, v),
                --t.digits[w - a - 1])
            }
            return s = u.biShiftRight(s, l),
            t.isNeg = i.isNeg != r,
            i.isNeg && (t = r ? u.biAdd(t, d) : u.biSubtract(t, d),
            e = u.biShiftRight(e, l),
            s = u.biSubtract(e, s)),
            0 == s.digits[0] && 0 == u.biHighIndex(s) && (s.isNeg = !1),
            [t, s]
        }
        ,
        u.biDivide = function(i, e) {
            return u.biDivideModulo(i, e)[0]
        }
        ,
        u.biModulo = function(i, e) {
            return u.biDivideModulo(i, e)[1]
        }
        ,
        u.biMultiplyMod = function(i, e, t) {
            return u.biModulo(u.biMultiply(i, e), t)
        }
        ,
        u.biPow = function(i, e) {
            for (var t = d, s = i; ; ) {
                if (0 != (1 & e) && (t = u.biMultiply(t, s)),
                e >>= 1,
                0 == e)
                    break;
                s = u.biMultiply(s, s)
            }
            return t
        }
        ,
        u.biPowMod = function(i, e, t) {
            for (var s = d, n = i, o = e; ; ) {
                if (0 != (1 & o.digits[0]) && (s = u.biMultiplyMod(s, n, t)),
                o = u.biShiftRight(o, 1),
                0 == o.digits[0] && 0 == u.biHighIndex(o))
                    break;
                n = u.biMultiplyMod(n, n, t)
            }
            return s
        }
        ,
        e.BarrettMu = function(i) {
            this.modulus = u.biCopy(i),
            this.k = u.biHighIndex(this.modulus) + 1;
            var e = new b;
            e.digits[2 * this.k] = 1,
            this.mu = u.biDivide(e, this.modulus),
            this.bkplus1 = new b,
            this.bkplus1.digits[this.k + 1] = 1,
            this.modulo = t,
            this.multiplyMod = s,
            this.powMod = n
        }
        ;
        var $ = function(i, t, s, n) {
            var o = u;
            this.e = o.biFromHex(i),
            this.d = o.biFromHex(t),
            this.m = o.biFromHex(s),
            this.chunkSize = 2 * o.biHighIndex(this.m),
            this.radix = 16,
            this.barrett = new e.BarrettMu(this.m),
            this.rndLen = n
        };
        u.getKeyPair = function(i, e, t, s) {
            return new $(i,e,t,s)
        }
        ,
        "undefined" == typeof e.twoDigit && (e.twoDigit = function(i) {
            return (i < 10 ? "0" : "") + String(i)
        }
        );
        var I = "00d3e5839928d17df7ad0ae809c772cd07615cc6531e49aaa2331ba80d1308d25a67f055d2e5c2e90871e779e6ac8629de1d9203333e3b3aabdb1c90dea66c23db6d6941ec89bb99a1f8e44e0a4207341a58f5e43e49f9b69bff1f3115dda47a27e67c6d4b81895a39065ca1ae278d0dfca752aac9c8ac9d0b25cdea70e17e39db"
          , k = "010001"
          , _ = "7";
        u.pwdEncode = function(i) {
            var e = u.getKeyPair(k, "", I, _);
            return u.encryptedString(e, i)
        }
        ,
        u.encryptedString = function(i, e) {
            for (var t = o(i.rndLen) + e, s = [], n = t.length, r = 0; r < n; )
                s[r] = t.charCodeAt(r),
                r++;
            for (; s.length % i.chunkSize != 0; )
                s[r++] = 0;
            var a, l, d, c = s.length, h = "";
            for (r = 0; r < c; r += i.chunkSize) {
                for (d = new b,
                a = 0,
                l = r; l < r + i.chunkSize; ++a)
                    d.digits[a] = s[l++],
                    d.digits[a] += s[l++] << 8;
                var f = i.barrett.powMod(d, i.e)
                  , m = 16 == i.radix ? u.biToHex(f) : u.biToString(f, i.radix);
                h += m + " "
            }
            return h.substring(0, h.length - 1)
        }
        ,
        u.decryptedString = function(i, e) {
            var t, s, n, o = e.split(" "), r = "";
            for (t = 0; t < o.length; ++t) {
                var a;
                for (a = 16 == i.radix ? u.biFromHex(o[t]) : u.biFromString(o[t], i.radix),
                n = i.barrett.powMod(a, i.d),
                s = 0; s <= u.biHighIndex(n); ++s)
                    r += String.fromCharCode(255 & n.digits[s], n.digits[s] >> 8)
            }
            return 0 == r.charCodeAt(r.length - 1) && (r = r.substring(0, r.length - 1)),
            r
        }
        ,
        u.setMaxDigits(130),
        e.RSAUtils = u
    }(window)



function get_pwd(pwd){
	return RSAUtils.pwdEncode(pwd)
}