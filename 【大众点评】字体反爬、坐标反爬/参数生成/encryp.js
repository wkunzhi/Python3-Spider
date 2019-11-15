function make() {
    for (var t = 1 * new Date, n = 0; t === 1 * new Date && n < 200;) n++;
    return t.toString(16) + n.toString(16)
}

function test(love, you, babby) {
    var t = (you * babby).toString(16);
    return make() + "-" + Math.random().toString(16).replace(".", "") + "-" + function () {
        var t = love,
            n = void 0,
            e = void 0,
            i = [],
            r = 0;

        function o(t, n) {
            var e = void 0,
                r = 0;
            for (e = 0; e < n.length; e++) r |= i[e] << 8 * e;
            return t ^ r
        }

        for (n = 0; n < t.length; n++) e = t.charCodeAt(n), i.unshift(255 & e), 4 <= i.length && (r = o(r, i), i = []);
        return 0 < i.length && (r = o(r, i)), r.toString(16)
    }() + "-" + t + "-" + make()
}