function setMaxDigits(n) {
    maxDigits = n;
    ZERO_ARRAY = new Array(maxDigits);
    for (var t = 0; t < ZERO_ARRAY.length; t++)
        ZERO_ARRAY[t] = 0;
    bigZero = new BigInt;
    bigOne = new BigInt;
    bigOne.digits[0] = 1
}

function BigInt(n) {
    this.digits = typeof n == "boolean" && n == !0 ? null : ZERO_ARRAY.slice(0);
    this.isNeg = !1
}

function biFromDecimal(n) {
    for (var u = n.charAt(0) == "-", t = u ? 1 : 0, i, f, r; t < n.length && n.charAt(t) == "0";)
        ++t;
    if (t == n.length)
        i = new BigInt;
    else {
        for (f = n.length - t,
                 r = f % dpl10,
             r == 0 && (r = dpl10),
                 i = biFromNumber(Number(n.substr(t, r))),
                 t += r; t < n.length;)
            i = biAdd(biMultiply(i, lr10), biFromNumber(Number(n.substr(t, dpl10)))),
                t += dpl10;
        i.isNeg = u
    }
    return i
}

function biCopy(n) {
    var t = new BigInt(!0);
    return t.digits = n.digits.slice(0),
        t.isNeg = n.isNeg,
        t
}

function biFromNumber(n) {
    var t = new BigInt, i;
    for (t.isNeg = n < 0,
             n = Math.abs(n),
             i = 0; n > 0;)
        t.digits[i++] = n & maxDigitVal,
            n = Math.floor(n / biRadix);
    return t
}

function reverseStr(n) {
    for (var i = "", t = n.length - 1; t > -1; --t)
        i += n.charAt(t);
    return i
}

function biToString(n, t) {
    var r = new BigInt, i, u;
    for (r.digits[0] = t,
             i = biDivideModulo(n, r),
             u = hexatrigesimalToChar[i[1].digits[0]]; biCompare(i[0], bigZero) == 1;)
        i = biDivideModulo(i[0], r),
            digit = i[1].digits[0],
            u += hexatrigesimalToChar[i[1].digits[0]];
    return (n.isNeg ? "-" : "") + reverseStr(u)
}

function biToDecimal(n) {
    var i = new BigInt, t, r;
    for (i.digits[0] = 10,
             t = biDivideModulo(n, i),
             r = String(t[1].digits[0]); biCompare(t[0], bigZero) == 1;)
        t = biDivideModulo(t[0], i),
            r += String(t[1].digits[0]);
    return (n.isNeg ? "-" : "") + reverseStr(r)
}

function digitToHex(n) {
    var t = "";
    for (i = 0; i < 4; ++i)
        t += hexToChar[n & 15],
            n >>>= 4;
    return reverseStr(t)
}

function biToHex(n) {
    for (var i = "", r = biHighIndex(n), t = biHighIndex(n); t > -1; --t)
        i += digitToHex(n.digits[t]);
    return i
}

function charToHex(n) {
    var t = 48
        , u = t + 9
        , i = 97
        , f = i + 25
        , r = 65;
    return n >= t && n <= u ? n - t : n >= r && n <= 90 ? 10 + n - r : n >= i && n <= f ? 10 + n - i : 0
}

function hexToDigit(n) {
    for (var t = 0, r = Math.min(n.length, 4), i = 0; i < r; ++i)
        t <<= 4,
            t |= charToHex(n.charCodeAt(i));
    return t
}

function biFromHex(n) {
    for (var i = new BigInt, u = n.length, t = u, r = 0; t > 0; t -= 4,
        ++r)
        i.digits[r] = hexToDigit(n.substr(Math.max(t - 4, 0), Math.min(t, 4)));
    return i
}

function biFromString(n, t) {
    var f = n.charAt(0) == "-", e = f ? 1 : 0, i = new BigInt, r = new BigInt, u;
    for (r.digits[0] = 1,
             u = n.length - 1; u >= e; u--) {
        var o = n.charCodeAt(u)
            , s = charToHex(o)
            , h = biMultiplyDigit(r, s);
        i = biAdd(i, h);
        r = biMultiplyDigit(r, t)
    }
    return i.isNeg = f,
        i
}

function biDump(n) {
    return (n.isNeg ? "-" : "") + n.digits.join(" ")
}

function biAdd(n, t) {
    var r, u, f, i;
    if (n.isNeg != t.isNeg)
        t.isNeg = !t.isNeg,
            r = biSubtract(n, t),
            t.isNeg = !t.isNeg;
    else {
        for (r = new BigInt,
                 u = 0,
                 i = 0; i < n.digits.length; ++i)
            f = n.digits[i] + t.digits[i] + u,
                r.digits[i] = f % biRadix,
                u = Number(f >= biRadix);
        r.isNeg = n.isNeg
    }
    return r
}

function biSubtract(n, t) {
    var r, f, u, i;
    if (n.isNeg != t.isNeg)
        t.isNeg = !t.isNeg,
            r = biAdd(n, t),
            t.isNeg = !t.isNeg;
    else {
        for (r = new BigInt,
                 u = 0,
                 i = 0; i < n.digits.length; ++i)
            f = n.digits[i] - t.digits[i] + u,
                r.digits[i] = f % biRadix,
            r.digits[i] < 0 && (r.digits[i] += biRadix),
                u = 0 - Number(f < 0);
        if (u == -1) {
            for (u = 0,
                     i = 0; i < n.digits.length; ++i)
                f = 0 - r.digits[i] + u,
                    r.digits[i] = f % biRadix,
                r.digits[i] < 0 && (r.digits[i] += biRadix),
                    u = 0 - Number(f < 0);
            r.isNeg = !n.isNeg
        } else
            r.isNeg = n.isNeg
    }
    return r
}

function biHighIndex(n) {
    for (var t = n.digits.length - 1; t > 0 && n.digits[t] == 0;)
        --t;
    return t
}

function biNumBits(n) {
    for (var i = biHighIndex(n), r = n.digits[i], u = (i + 1) * bitsPerDigit, t = u; t > u - bitsPerDigit; --t) {
        if ((r & 32768) != 0)
            break;
        r <<= 1
    }
    return t
}

function biMultiply(n, t) {
    for (var i = new BigInt, u, o = biHighIndex(n), s = biHighIndex(t), e, f, r = 0; r <= s; ++r) {
        for (u = 0,
                 f = r,
                 j = 0; j <= o; ++j,
                 ++f)
            e = i.digits[f] + n.digits[j] * t.digits[r] + u,
                i.digits[f] = e & maxDigitVal,
                u = e >>> biRadixBits;
        i.digits[r + o + 1] = u
    }
    return i.isNeg = n.isNeg != t.isNeg,
        i
}

function biMultiplyDigit(n, t) {
    var u, r, f, i;
    for (result = new BigInt,
             u = biHighIndex(n),
             r = 0,
             i = 0; i <= u; ++i)
        f = result.digits[i] + n.digits[i] * t + r,
            result.digits[i] = f & maxDigitVal,
            r = f >>> biRadixBits;
    return result.digits[1 + u] = r,
        result
}

function arrayCopy(n, t, i, r, u) {
    for (var o = Math.min(t + u, n.length), f = t, e = r; f < o; ++f,
        ++e)
        i[e] = n[f]
}

function biShiftLeft(n, t) {
    var e = Math.floor(t / bitsPerDigit), i = new BigInt, u, o, r, f;
    for (arrayCopy(n.digits, 0, i.digits, e, i.digits.length - e),
             u = t % bitsPerDigit,
             o = bitsPerDigit - u,
             r = i.digits.length - 1,
             f = r - 1; r > 0; --r,
             --f)
        i.digits[r] = i.digits[r] << u & maxDigitVal | (i.digits[f] & highBitMasks[u]) >>> o;
    return i.digits[0] = i.digits[r] << u & maxDigitVal,
        i.isNeg = n.isNeg,
        i
}

function biShiftRight(n, t) {
    var e = Math.floor(t / bitsPerDigit), i = new BigInt, u, o, r, f;
    for (arrayCopy(n.digits, e, i.digits, 0, n.digits.length - e),
             u = t % bitsPerDigit,
             o = bitsPerDigit - u,
             r = 0,
             f = r + 1; r < i.digits.length - 1; ++r,
             ++f)
        i.digits[r] = i.digits[r] >>> u | (i.digits[f] & lowBitMasks[u]) << o;
    return i.digits[i.digits.length - 1] >>>= u,
        i.isNeg = n.isNeg,
        i
}

function biMultiplyByRadixPower(n, t) {
    var i = new BigInt;
    return arrayCopy(n.digits, 0, i.digits, t, i.digits.length - t),
        i
}

function biDivideByRadixPower(n, t) {
    var i = new BigInt;
    return arrayCopy(n.digits, t, i.digits, 0, i.digits.length - t),
        i
}

function biModuloByRadixPower(n, t) {
    var i = new BigInt;
    return arrayCopy(n.digits, 0, i.digits, 0, t),
        i
}

function biCompare(n, t) {
    if (n.isNeg != t.isNeg)
        return 1 - 2 * Number(n.isNeg);
    for (var i = n.digits.length - 1; i >= 0; --i)
        if (n.digits[i] != t.digits[i])
            return n.isNeg ? 1 - 2 * Number(n.digits[i] > t.digits[i]) : 1 - 2 * Number(n.digits[i] < t.digits[i]);
    return 0
}

function biDivideModulo(n, t) {
    var a = biNumBits(n), s = biNumBits(t), v = t.isNeg, r, i, u, e, h, o, f, y, p;
    if (a < s)
        return n.isNeg ? (r = biCopy(bigOne),
            r.isNeg = !t.isNeg,
            n.isNeg = !1,
            t.isNeg = !1,
            i = biSubtract(t, n),
            n.isNeg = !0,
            t.isNeg = v) : (r = new BigInt,
            i = biCopy(n)),
            [r, i];
    for (r = new BigInt,
             i = n,
             u = Math.ceil(s / bitsPerDigit) - 1,
             e = 0; t.digits[u] < biHalfRadix;)
        t = biShiftLeft(t, 1),
            ++e,
            ++s,
            u = Math.ceil(s / bitsPerDigit) - 1;
    for (i = biShiftLeft(i, e),
             a += e,
             h = Math.ceil(a / bitsPerDigit) - 1,
             o = biMultiplyByRadixPower(t, h - u); biCompare(i, o) != -1;)
        ++r.digits[h - u],
            i = biSubtract(i, o);
    for (f = h; f > u; --f) {
        var c = f >= i.digits.length ? 0 : i.digits[f]
            , w = f - 1 >= i.digits.length ? 0 : i.digits[f - 1]
            , b = f - 2 >= i.digits.length ? 0 : i.digits[f - 2]
            , l = u >= t.digits.length ? 0 : t.digits[u]
            , k = u - 1 >= t.digits.length ? 0 : t.digits[u - 1];
        for (r.digits[f - u - 1] = c == l ? maxDigitVal : Math.floor((c * biRadix + w) / l),
                 y = r.digits[f - u - 1] * (l * biRadix + k),
                 p = c * biRadixSquared + (w * biRadix + b); y > p;)
            --r.digits[f - u - 1],
                y = r.digits[f - u - 1] * (l * biRadix | k),
                p = c * biRadix * biRadix + (w * biRadix + b);
        o = biMultiplyByRadixPower(t, f - u - 1);
        i = biSubtract(i, biMultiplyDigit(o, r.digits[f - u - 1]));
        i.isNeg && (i = biAdd(i, o),
            --r.digits[f - u - 1])
    }
    return i = biShiftRight(i, e),
        r.isNeg = n.isNeg != v,
    n.isNeg && (r = v ? biAdd(r, bigOne) : biSubtract(r, bigOne),
        t = biShiftRight(t, e),
        i = biSubtract(t, i)),
    i.digits[0] == 0 && biHighIndex(i) == 0 && (i.isNeg = !1),
        [r, i]
}

function biDivide(n, t) {
    return biDivideModulo(n, t)[0]
}

function biModulo(n, t) {
    return biDivideModulo(n, t)[1]
}

function biMultiplyMod(n, t, i) {
    return biModulo(biMultiply(n, t), i)
}

function biPow(n, t) {
    for (var r = bigOne, i = n; ;) {
        if ((t & 1) != 0 && (r = biMultiply(r, i)),
            t >>= 1,
        t == 0)
            break;
        i = biMultiply(i, i)
    }
    return r
}

function biPowMod(n, t, i) {
    for (var f = bigOne, u = n, r = t; ;) {
        if ((r.digits[0] & 1) != 0 && (f = biMultiplyMod(f, u, i)),
            r = biShiftRight(r, 1),
        r.digits[0] == 0 && biHighIndex(r) == 0)
            break;
        u = biMultiplyMod(u, u, i)
    }
    return f
}

function BarrettMu(n) {
    this.modulus = biCopy(n);
    this.k = biHighIndex(this.modulus) + 1;
    var t = new BigInt;
    t.digits[2 * this.k] = 1;
    this.mu = biDivide(t, this.modulus);
    this.bkplus1 = new BigInt;
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod
}

function BarrettMu_modulo(n) {
    var r = biDivideByRadixPower(n, this.k - 1), u = biMultiply(r, this.mu), f = biDivideByRadixPower(u, this.k + 1),
        e = biModuloByRadixPower(n, this.k + 1), o = biMultiply(f, this.modulus),
        s = biModuloByRadixPower(o, this.k + 1), t = biSubtract(e, s), i;
    for (t.isNeg && (t = biAdd(t, this.bkplus1)),
             i = biCompare(t, this.modulus) >= 0; i;)
        t = biSubtract(t, this.modulus),
            i = biCompare(t, this.modulus) >= 0;
    return t
}

function BarrettMu_multiplyMod(n, t) {
    var i = biMultiply(n, t);
    return this.modulo(i)
}

function BarrettMu_powMod(n, t) {
    var u = new BigInt, r, i;
    for (u.digits[0] = 1,
             r = n,
             i = t; ;) {
        if ((i.digits[0] & 1) != 0 && (u = this.multiplyMod(u, r)),
            i = biShiftRight(i, 1),
        i.digits[0] == 0 && biHighIndex(i) == 0)
            break;
        r = this.multiplyMod(r, r)
    }
    return u
}

function RSAKeyPair(n, t, i) {
    this.e = biFromHex(n);
    this.d = biFromHex(t);
    this.m = biFromHex(i);
    this.digitSize = 2 * biHighIndex(this.m) + 2;
    this.chunkSize = this.digitSize - 11;
    this.radix = 16;
    this.barrett = new BarrettMu(this.m)
}

function twoDigit(n) {
    return (n < 10 ? "0" : "") + String(n)
}

function encryptedString(n, t) {
    var e, o, s, h, c, i, f, u, v, l, y;
    if (n.chunkSize > n.digitSize - 11)
        return "Error";
    for (var a = [], p = t.length, r = 0; r < p;)
        a[r] = t.charCodeAt(r),
            r++;
    for (e = a.length,
             o = "",
             r = 0; r < e; r += n.chunkSize) {
        for (c = new BigInt,
                 s = 0,
                 f = r + n.chunkSize > e ? e % n.chunkSize : n.chunkSize,
                 u = [],
                 i = 0; i < f; i++)
            u[i] = a[r + f - 1 - i];
        for (u[f] = 0,
                 v = Math.max(8, n.digitSize - 3 - f),
                 i = 0; i < v; i++)
            u[f + 1 + i] = Math.floor(Math.random() * 254) + 1;
        for (u[n.digitSize - 2] = 2,
                 u[n.digitSize - 1] = 0,
                 h = 0; h < n.digitSize; ++s)
            c.digits[s] = u[h++],
                c.digits[s] += u[h++] << 8;
        l = n.barrett.powMod(c, n.e);
        y = n.radix == 16 ? biToHex(l) : biToString(l, n.radix);
        o += y + " "
    }
    return o.substring(0, o.length - 1)
}

function decryptedString(n, t) {
    for (var e = t.split(" "), i = "", r, u, o, f = 0; f < e.length; ++f)
        for (o = n.radix == 16 ? biFromHex(e[f]) : biFromString(e[f], n.radix),
                 u = n.barrett.powMod(o, n.d),
                 r = 0; r <= biHighIndex(u); ++r)
            i += String.fromCharCode(u.digits[r] & 255, u.digits[r] >> 8);
    return i.charCodeAt(i.length - 1) == 0 && (i = i.substring(0, i.length - 1)),
        i
}

var biRadixBase = 2, biRadixBits = 16, bitsPerDigit = biRadixBits, biRadix = 65536, biHalfRadix = biRadix >>> 1,
    biRadixSquared = biRadix * biRadix, maxDigitVal = biRadix - 1, maxInteger = 9999999999999998, maxDigits, ZERO_ARRAY,
    bigZero, bigOne, dpl10, lr10, hexatrigesimalToChar, hexToChar, highBitMasks, lowBitMasks;
setMaxDigits(20);
dpl10 = 15;
lr10 = biFromNumber(1e15);
hexatrigesimalToChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
hexToChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
highBitMasks = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
lowBitMasks = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
setMaxDigits(129);


function getPwd(pwd) {
    setMaxDigits(129);
    var key_to_encode = new RSAKeyPair("010001", "", "978C0A92D2173439707498F0944AA476B1B62595877DD6FA87F6E2AC6DCB3D0BF0B82857439C99B5091192BC134889DFF60C562EC54EFBA4FF2F9D55ADBCCEA4A2FBA80CB398ED501280A007C83AF30C3D1A142D6133C63012B90AB26AC60C898FB66EDC3192C3EC4FF66925A64003B72496099F4F09A9FB72A2CF9E4D770C41");
    return encryptedString(key_to_encode, pwd)
}