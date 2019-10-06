t = {}
"use strict";
var s = "";
var a = 1;
t.generateKey = "";
t.password = "";
t.getUUID = function () {
    var e = "0123456789abcdef".split("");
    var t = [],
        s = Math.random,
        a;
    t[8] = t[13] = t[18] = t[23] = "-";
    t[14] = "4";
    for (var i = 0; i < 36; i++) {
        if (!t[i]) {
            a = 0 | s() * 16;
            t[i] = e[i == 19 ? a & 3 | 8 : a & 15]
        }
    }
    return t.join("")
};
t.getRandomStringFromUUID = function (e) {
    var s = t.getUUID();
    while (s.length < e) {
        s = s + "--" + t.getUUID()
    }
    return s.substring(0, e)
};
t.getRandomString = function (e) {
    var t = "";
    var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/-_=";
    for (var a = 0; a < e; a++) {
        t += s.charAt(Math.floor(Math.random() * s.length))
    }
    return t
};
t.readFromFile = function (e) {
    var t = "";
    var s = new ActiveXObject("Scripting.FileSystemObject");
    var i = s.OpenTextFile(e, a, true);
    while (!i.AtEndOfStream) {
        var n = i.ReadLine();
        if (t == "") {
            t = n
        } else {
            t += "\n" + n
        }
    }
    i.Close();
    return t
};
t.saveToFile = function (e, t) {
    var s = new ActiveXObject("Scripting.FileSystemObject");
    var a = s.CreateTextFile(e, true, true);
    var i = t.split("\n");
    for (var n = 0; n < i.length; n++) {
        a.WriteLine(i[n])
    }
    a.Close();
    alert(e + " saved!")
};
t.do_generate = function () {
    var e = t.getRandomString(24);
    t.generateKey = encodeURI(encodeURI(e));
    return t.generateKey
};
t.stringToHex = function (e) {
    var t, s, a = [];
    for (var i = 0; i < e.length; i++) {
        t = e.charCodeAt(i);
        s = [];
        do {
            s.push(t);
            t = t >> 8
        } while (t);
        a = a.concat(s.reverse())
    }
    var n = "";
    for (var i = 0; i < a.length; i++) {
        n += a[i].toString(16)
    }
    return n
};
t.do_load_key = function () {
    var e = showModalDialog("selectFile.htm", "Select " + document.cpccrypto.algorithm.value + " Key",
        "width:400px;height:400px;resizeable:yes;");
    var s = t.readFromFile(e);
    document.cpccrypto.cipherkey.value = s
};
t.do_save_key = function () {
    if (s == "") {
        alert("Currently no " + document.cpccrypto.algorithm.value + " Key to save!\n" + "Please generate first!");
        return
    }
    var e = showModalDialog("selectFolder.htm", "Select " + document.cpccrypto.algorithm.value + " Key Save Folder",
        "width:400px;height:400px;resizeable:yes;");
    var a = e + document.cpccrypto.algorithm.value + ".key";
    t.saveToFile(a, symetricKey)
};
t.do_load_plain = function () {
    var e = showModalDialog("selectFile.htm", "", "width:400px;height:400px;resizeable:yes;");
    var s = t.readFromFile(e);
    document.cpccrypto.plaintext.value = s
};
t.suffix_8Blank = function (e) {
    for (var t = 0; t < 8; t++) {
        e += " "
    }
    return e
};
t.checkCipherKey = function () {
    return true
};
t.do_encrypt = function () {
    if (t.checkCipherKey() == false) {
        return
    }
    return t.stringToHexForDES(t.des(t.generateKey, t.suffix_8Blank(t.password), 1, 0))
};
t.do_load_cipher = function () {
    var e = showModalDialog("selectFile.htm", "", "width:400px;height:400px;resizeable:yes;");
    var s = t.readFromFile(e);
    document.cpccrypto.ciphertext.value = s
};
t.fix_des_result = function (e) {
    var t;
    for (t = e.length - 1; t >= 0; t--) {
        if (e.charCodeAt(t) > 16 && e.charCodeAt(t) != 32) {
            break
        }
    }
    return e.substring(0, t + 1)
};
t.do_decrypt = function () {
    if (t.checkCipherKey() == false) {
        return
    }
    return t.fix_des_result(t.des(t.generateKey, t.hexToStringForDES(t.encodeKey), 0, 0))
};
t.des = function (e, s, a, i, n, r) {
    var o = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024,
        16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540,
        16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216,
        1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220,
        1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756);
    var l = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -
            2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -
            2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072,
        32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880,
        32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848,
        -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344);
    var p = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736,
        131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592,
        134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072,
        134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072,
        134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808,
        131584);
    var d = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0,
        8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928,
        8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321,
        8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608,
        8192, 8396928);
    var u = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288,
        33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0,
        1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432,
        1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688,
        1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256,
        1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976,
        1073742080);
    var c = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704,
        4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16,
        541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232,
        4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616,
        4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312,
        0, 541081600, 536870912, 4194320, 536887312);
    var h = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0,
        67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064,
        2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914,
        67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050,
        67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048,
        2097154);
    var f = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600,
        268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664,
        268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64,
        268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0,
        268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208,
        268435456, 268701696);
    var m = t.des_createKeys(e);
    var v = 0,
        g, y, b, w, _, x, T, L, C;
    var S, I, P, k;
    var A, M;
    var D = s.length;
    var R = 0;
    var N = m.length == 32 ? 3 : 9;
    if (N == 3) {
        C = a ? new Array(0, 32, 2) : new Array(30, -2, -2)
    } else {
        C = a ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2)
    }
    if (r == 2)
        s += "        ";
    else if (r == 1) {
        b = 8 - D % 8;
        s += String.fromCharCode(b, b, b, b, b, b, b, b);
        if (b == 8)
            D += 8
    } else if (!r)
        s += "\x00\x00\x00\x00\x00\x00\x00\x00";
    var E = "";
    var z = "";
    if (i == 1) {
        S = n.charCodeAt(v++) << 24 | n.charCodeAt(v++) << 16 | n.charCodeAt(v++) << 8 | n.charCodeAt(v++);
        P = n.charCodeAt(v++) << 24 | n.charCodeAt(v++) << 16 | n.charCodeAt(v++) << 8 | n.charCodeAt(v++);
        v = 0
    }
    while (v < D) {
        T = s.charCodeAt(v++) << 24 | s.charCodeAt(v++) << 16 | s.charCodeAt(v++) << 8 | s.charCodeAt(v++);
        L = s.charCodeAt(v++) << 24 | s.charCodeAt(v++) << 16 | s.charCodeAt(v++) << 8 | s.charCodeAt(v++);
        if (i == 1) {
            if (a) {
                T ^= S;
                L ^= P
            } else {
                I = S;
                k = P;
                S = T;
                P = L
            }
        }
        b = (T >>> 4 ^ L) & 252645135;
        L ^= b;
        T ^= b << 4;
        b = (T >>> 16 ^ L) & 65535;
        L ^= b;
        T ^= b << 16;
        b = (L >>> 2 ^ T) & 858993459;
        T ^= b;
        L ^= b << 2;
        b = (L >>> 8 ^ T) & 16711935;
        T ^= b;
        L ^= b << 8;
        b = (T >>> 1 ^ L) & 1431655765;
        L ^= b;
        T ^= b << 1;
        T = T << 1 | T >>> 31;
        L = L << 1 | L >>> 31;
        for (y = 0; y < N; y += 3) {
            A = C[y + 1];
            M = C[y + 2];
            for (g = C[y]; g != A; g += M) {
                _ = L ^ m[g];
                x = (L >>> 4 | L << 28) ^ m[g + 1];
                b = T;
                T = L;
                L = b ^ (l[_ >>> 24 & 63] | d[_ >>> 16 & 63] | c[_ >>> 8 & 63] | f[_ & 63] | o[x >>> 24 & 63] | p[x >>> 16 & 63] |
                    u[x >>> 8 & 63] | h[x & 63])
            }
            b = T;
            T = L;
            L = b
        }
        T = T >>> 1 | T << 31;
        L = L >>> 1 | L << 31;
        b = (T >>> 1 ^ L) & 1431655765;
        L ^= b;
        T ^= b << 1;
        b = (L >>> 8 ^ T) & 16711935;
        T ^= b;
        L ^= b << 8;
        b = (L >>> 2 ^ T) & 858993459;

        T ^= b;
        L ^= b << 2;
        b = (T >>> 16 ^ L) & 65535;
        L ^= b;
        T ^= b << 16;
        b = (T >>> 4 ^ L) & 252645135;
        L ^= b;
        T ^= b << 4;
        if (i == 1) {
            if (a) {
                S = T;
                P = L
            } else {
                T ^= I;
                L ^= k
            }
        }
        z += String.fromCharCode(T >>> 24, T >>> 16 & 255, T >>> 8 & 255, T & 255, L >>> 24, L >>> 16 & 255, L >>> 8 &
            255, L & 255);
        R += 8;
        if (R == 512) {
            E += z;
            z = "";
            R = 0
        }
    }
    return E + z
};
t.des_createKeys = function (e) {
    var t = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428,
        66048, 66052, 536936960, 536936964),
        s = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833,
            67109120, 67109121, 68157696, 68157697),
        a = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224,
            16779264, 16779272),
        i = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800,
            136445952, 139264, 2236416, 134356992, 136454144),
        n = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112,
            266256),
        r = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456,
            33554464, 33555488),
        o = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744,
            2, 268435458, 524290, 268959746),
        l = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656,
            537001984, 537067520, 537004032, 537069568),
        p = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434,
            33816578, 33554434, 33816578),
        d = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024,
            268436480, 1032, 268436488),
        u = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768,
            1056800),
        c = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376,
            83886592, 69206016, 85983232, 69206528, 85983744),
        h = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840,
            524304, 528400, 134742032, 134746128),
        f = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
    var m = e.length > 8 ? 3 : 1;
    var v = new Array(32 * m);
    var g = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
    var y, b, w = 0,
        _ = 0,
        x;
    for (var T = 0; T < m; T++) {
        var L = e.charCodeAt(w++) << 24 | e.charCodeAt(w++) << 16 | e.charCodeAt(w++) << 8 | e.charCodeAt(w++);
        var C = e.charCodeAt(w++) << 24 | e.charCodeAt(w++) << 16 | e.charCodeAt(w++) << 8 | e.charCodeAt(w++);
        x = (L >>> 4 ^ C) & 252645135;
        C ^= x;
        L ^= x << 4;
        x = (C >>> -16 ^ L) & 65535;
        L ^= x;
        C ^= x << -16;
        x = (L >>> 2 ^ C) & 858993459;
        C ^= x;
        L ^= x << 2;
        x = (C >>> -16 ^ L) & 65535;
        L ^= x;
        C ^= x << -16;
        x = (L >>> 1 ^ C) & 1431655765;
        C ^= x;
        L ^= x << 1;
        x = (C >>> 8 ^ L) & 16711935;
        L ^= x;
        C ^= x << 8;
        x = (L >>> 1 ^ C) & 1431655765;
        C ^= x;
        L ^= x << 1;
        x = L << 8 | C >>> 20 & 240;
        L = C << 24 | C << 8 & 16711680 | C >>> 8 & 65280 | C >>> 24 & 240;
        C = x;
        for (var S = 0; S < g.length; S++) {
            if (g[S]) {
                L = L << 2 | L >>> 26;
                C = C << 2 | C >>> 26
            } else {
                L = L << 1 | L >>> 27;
                C = C << 1 | C >>> 27
            }
            L &= -15;
            C &= -15;
            y = t[L >>> 28] | s[L >>> 24 & 15] | a[L >>> 20 & 15] | i[L >>> 16 & 15] | n[L >>> 12 & 15] | r[L >>> 8 & 15] |
                o[L >>> 4 & 15];
            b = l[C >>> 28] | p[C >>> 24 & 15] | d[C >>> 20 & 15] | u[C >>> 16 & 15] | c[C >>> 12 & 15] | h[C >>> 8 & 15] |
                f[C >>> 4 & 15];
            x = (b >>> 16 ^ y) & 65535;
            v[_++] = y ^ x;
            v[_++] = b ^ x << 16
        }
    }
    return v
};
t.stringToHexForDES = function (e) {
    var t = "0x";
    var s = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    for (var a = 0; a < e.length; a++) {
        t += s[e.charCodeAt(a) >> 4] + s[e.charCodeAt(a) & 15]
    }
    return t
};
t.hexToStringForDES = function (e) {
    var t = "";
    for (var s = e.substr(0, 2) == "0x" ? 2 : 0; s < e.length; s += 2) {
        t += String.fromCharCode(parseInt(e.substr(s, 2), 16))
    }
    return t
};
t.encodeDES = function (e) {
    if (t.generateKey != "") {
        t.password = e;
        t.encodeKey = t.do_encrypt()
    }
    return t.encodeKey
};
t.decodeDES = function () {
    if (t.generateKey != "" && t.password != "")
        var e = t.do_decrypt();
    return e
}


function make(pwd) {
    randKey = t.do_generate();
    password = t.encodeDES(pwd);
    return randKey + '||' + password
}