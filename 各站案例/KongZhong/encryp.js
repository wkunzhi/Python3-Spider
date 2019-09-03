function mk_pwd (str, pwd) {
    if (pwd == null || pwd.length <= 0) {
        return null
    }
    ;var prand = "";
    for (var i = 0; i < pwd.length; i++) {
        prand += pwd.charCodeAt(i).toString()
    }
    ;var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
    var incr = Math.ceil(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    if (mult < 2) {
        return null
    }
    ;var salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while (prand.length > 10) {
        var a = prand.substring(0, 1);
        var b = prand.substring(10, prand.length);
        if (b.length > 10) {
            prand = b
        } else {
            prand = (parseInt(a) + parseInt(b)).toString()
        }
    }
    ;prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for (var i = 0; i < str.length; i++) {
        enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
        if (enc_chr < 16) {
            enc_str += "0" + enc_chr.toString(16)
        } else
            enc_str += enc_chr.toString(16);
        prand = (mult * prand + incr) % modu
    }
    ;salt = salt.toString(16);
    while (salt.length < 8)
        salt = "0" + salt;
    enc_str += salt;
    return enc_str
}