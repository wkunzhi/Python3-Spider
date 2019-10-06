// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// window = dom.window;
// document = window.document;
// XMLHttpRequest = window.XMLHttpRequest;

var navigator = {};
var windows = {};

passport = {},
	passport.lib = passport.lib || {},
	passport.lib.RSAExport = {},
	function(e) {
		function t(e, t, n) {
			null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(
				e, 256) : this.fromString(e, t))
		}

		function n() {
			return new t(null)
		}

		function i(e, t, n, i, s, o) {
			for (; --o >= 0;) {
				var r = t * this[e++] + n[i] + s;
				s = Math.floor(r / 67108864),
					n[i++] = 67108863 & r
			}
			return s
		}

		function s(e, t, n, i, s, o) {
			for (var r = 32767 & t, a = t >> 15; --o >= 0;) {
				var c = 32767 & this[e],
					l = this[e++] >> 15,
					d = a * c + l * r;
				c = r * c + ((32767 & d) << 15) + n[i] + (1073741823 & s),
					s = (c >>> 30) + (d >>> 15) + a * l + (s >>> 30),
					n[i++] = 1073741823 & c
			}
			return s
		}

		function o(e, t, n, i, s, o) {
			for (var r = 16383 & t, a = t >> 14; --o >= 0;) {
				var c = 16383 & this[e],
					l = this[e++] >> 14,
					d = a * c + l * r;
				c = r * c + ((16383 & d) << 14) + n[i] + s,
					s = (c >> 28) + (d >> 14) + a * l,
					n[i++] = 268435455 & c
			}
			return s
		}

		function r(e) {
			return xn.charAt(e)
		}

		function a(e, t) {
			var n = Ln[e.charCodeAt(t)];
			return null == n ? -1 : n
		}

		function c(e) {
			for (var t = this.t - 1; t >= 0; --t)
				e[t] = this[t];
			e.t = this.t,
				e.s = this.s
		}

		function l(e) {
			this.t = 1,
				this.s = 0 > e ? -1 : 0,
				e > 0 ? this[0] = e : -1 > e ? this[0] = e + DV : this.t = 0
		}

		function d(e) {
			var t = n();
			return t.fromInt(e),
				t
		}

		function u(e, n) {
			var i;
			if (16 == n)
				i = 4;
			else if (8 == n)
				i = 3;
			else if (256 == n)
				i = 8;
			else if (2 == n)
				i = 1;
			else if (32 == n)
				i = 5;
			else {
				if (4 != n)
					return void this.fromRadix(e, n);
				i = 2
			}
			this.t = 0,
				this.s = 0;
			for (var s = e.length, o = !1, r = 0; --s >= 0;) {
				var c = 8 == i ? 255 & e[s] : a(e, s);
				0 > c ? "-" == e.charAt(s) && (o = !0) : (o = !1,
					0 == r ? this[this.t++] = c : r + i > this.DB ? (this[this.t - 1] |= (c & (1 << this.DB - r) - 1) << r,
						this[this.t++] = c >> this.DB - r) : this[this.t - 1] |= c << r,
					r += i,
					r >= this.DB && (r -= this.DB))
			}
			8 == i && 0 != (128 & e[0]) && (this.s = -1,
					r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
				this.clamp(),
				o && t.ZERO.subTo(this, this)
		}

		function p() {
			for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;)
				--this.t
		}

		function g(e) {
			if (this.s < 0)
				return "-" + this.negate().toString(e);
			var t;
			if (16 == e)
				t = 4;
			else if (8 == e)
				t = 3;
			else if (2 == e)
				t = 1;
			else if (32 == e)
				t = 5;
			else {
				if (4 != e)
					return this.toRadix(e);
				t = 2
			}
			var n, i = (1 << t) - 1,
				s = !1,
				o = "",
				a = this.t,
				c = this.DB - a * this.DB % t;
			if (a-- > 0)
				for (c < this.DB && (n = this[a] >> c) > 0 && (s = !0,
						o = r(n)); a >= 0;)
					t > c ? (n = (this[a] & (1 << c) - 1) << t - c,
						n |= this[--a] >> (c += this.DB - t)) : (n = this[a] >> (c -= t) & i,
						0 >= c && (c += this.DB,
							--a)),
					n > 0 && (s = !0),
					s && (o += r(n));
			return s ? o : "0"
		}

		function h() {
			var e = n();
			return t.ZERO.subTo(this, e),
				e
		}

		function m() {
			return this.s < 0 ? this.negate() : this
		}

		function f(e) {
			var t = this.s - e.s;
			if (0 != t)
				return t;
			var n = this.t;
			if (t = n - e.t,
				0 != t)
				return this.s < 0 ? -t : t;
			for (; --n >= 0;)
				if (0 != (t = this[n] - e[n]))
					return t;
			return 0
		}

		function b(e) {
			var t, n = 1;
			return 0 != (t = e >>> 16) && (e = t,
					n += 16),
				0 != (t = e >> 8) && (e = t,
					n += 8),
				0 != (t = e >> 4) && (e = t,
					n += 4),
				0 != (t = e >> 2) && (e = t,
					n += 2),
				0 != (t = e >> 1) && (e = t,
					n += 1),
				n
		}

		function y() {
			return this.t <= 0 ? 0 : this.DB * (this.t - 1) + b(this[this.t - 1] ^ this.s & this.DM)
		}

		function _(e, t) {
			var n;
			for (n = this.t - 1; n >= 0; --n)
				t[n + e] = this[n];
			for (n = e - 1; n >= 0; --n)
				t[n] = 0;
			t.t = this.t + e,
				t.s = this.s
		}

		function E(e, t) {
			for (var n = e; n < this.t; ++n)
				t[n - e] = this[n];
			t.t = Math.max(this.t - e, 0),
				t.s = this.s
		}

		function w(e, t) {
			var n, i = e % this.DB,
				s = this.DB - i,
				o = (1 << s) - 1,
				r = Math.floor(e / this.DB),
				a = this.s << i & this.DM;
			for (n = this.t - 1; n >= 0; --n)
				t[n + r + 1] = this[n] >> s | a,
				a = (this[n] & o) << i;
			for (n = r - 1; n >= 0; --n)
				t[n] = 0;
			t[r] = a,
				t.t = this.t + r + 1,
				t.s = this.s,
				t.clamp()
		}

		function C(e, t) {
			t.s = this.s;
			var n = Math.floor(e / this.DB);
			if (n >= this.t)
				return void(t.t = 0);
			var i = e % this.DB,
				s = this.DB - i,
				o = (1 << i) - 1;
			t[0] = this[n] >> i;
			for (var r = n + 1; r < this.t; ++r)
				t[r - n - 1] |= (this[r] & o) << s,
				t[r - n] = this[r] >> i;
			i > 0 && (t[this.t - n - 1] |= (this.s & o) << s),
				t.t = this.t - n,
				t.clamp()
		}

		function S(e, t) {
			for (var n = 0, i = 0, s = Math.min(e.t, this.t); s > n;)
				i += this[n] - e[n],
				t[n++] = i & this.DM,
				i >>= this.DB;
			if (e.t < this.t) {
				for (i -= e.s; n < this.t;)
					i += this[n],
					t[n++] = i & this.DM,
					i >>= this.DB;
				i += this.s
			} else {
				for (i += this.s; n < e.t;)
					i -= e[n],
					t[n++] = i & this.DM,
					i >>= this.DB;
				i -= e.s
			}
			t.s = 0 > i ? -1 : 0,
				-1 > i ? t[n++] = this.DV + i : i > 0 && (t[n++] = i),
				t.t = n,
				t.clamp()
		}

		function I(e, n) {
			var i = this.abs(),
				s = e.abs(),
				o = i.t;
			for (n.t = o + s.t; --o >= 0;)
				n[o] = 0;
			for (o = 0; o < s.t; ++o)
				n[o + i.t] = i.am(0, s[o], n, o, 0, i.t);
			n.s = 0,
				n.clamp(),
				this.s != e.s && t.ZERO.subTo(n, n)
		}

		function T(e) {
			for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0;)
				e[n] = 0;
			for (n = 0; n < t.t - 1; ++n) {
				var i = t.am(n, t[n], e, 2 * n, 0, 1);
				(e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, i, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
					e[n + t.t + 1] = 1)
			}
			e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
				e.s = 0,
				e.clamp()
		}

		function D(e, i, s) {
			var o = e.abs();
			if (!(o.t <= 0)) {
				var r = this.abs();
				if (r.t < o.t)
					return null != i && i.fromInt(0),
						void(null != s && this.copyTo(s));
				null == s && (s = n());
				var a = n(),
					c = this.s,
					l = e.s,
					d = this.DB - b(o[o.t - 1]);
				d > 0 ? (o.lShiftTo(d, a),
					r.lShiftTo(d, s)) : (o.copyTo(a),
					r.copyTo(s));
				var u = a.t,
					p = a[u - 1];
				if (0 != p) {
					var g = p * (1 << this.F1) + (u > 1 ? a[u - 2] >> this.F2 : 0),
						h = this.FV / g,
						m = (1 << this.F1) / g,
						f = 1 << this.F2,
						v = s.t,
						y = v - u,
						_ = null == i ? n() : i;
					for (a.dlShiftTo(y, _),
						s.compareTo(_) >= 0 && (s[s.t++] = 1,
							s.subTo(_, s)),
						t.ONE.dlShiftTo(u, _),
						_.subTo(a, a); a.t < u;)
						a[a.t++] = 0;
					for (; --y >= 0;) {
						var E = s[--v] == p ? this.DM : Math.floor(s[v] * h + (s[v - 1] + f) * m);
						if ((s[v] += a.am(0, E, s, y, 0, u)) < E)
							for (a.dlShiftTo(y, _),
								s.subTo(_, s); s[v] < --E;)
								s.subTo(_, s)
					}
					null != i && (s.drShiftTo(u, i),
							c != l && t.ZERO.subTo(i, i)),
						s.t = u,
						s.clamp(),
						d > 0 && s.rShiftTo(d, s),
						0 > c && t.ZERO.subTo(s, s)
				}
			}
		}

		function R(e) {
			var i = n();
			return this.abs().divRemTo(e, null, i),
				this.s < 0 && i.compareTo(t.ZERO) > 0 && e.subTo(i, i),
				i
		}

		function k(e) {
			this.m = e
		}

		function x(e) {
			return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
		}

		function L(e) {
			return e
		}

		function P(e) {
			e.divRemTo(this.m, null, e)
		}

		function A(e, t, n) {
			e.multiplyTo(t, n),
				this.reduce(n)
		}

		function B(e, t) {
			e.squareTo(t),
				this.reduce(t)
		}

		function M() {
			if (this.t < 1)
				return 0;
			var e = this[0];
			if (0 == (1 & e))
				return 0;
			var t = 3 & e;
			return t = t * (2 - (15 & e) * t) & 15,
				t = t * (2 - (255 & e) * t) & 255,
				t = t * (2 - ((65535 & e) * t & 65535)) & 65535,
				t = t * (2 - e * t % this.DV) % this.DV,
				t > 0 ? this.DV - t : -t
		}

		function V(e) {
			this.m = e,
				this.mp = e.invDigit(),
				this.mpl = 32767 & this.mp,
				this.mph = this.mp >> 15,
				this.um = (1 << e.DB - 15) - 1,
				this.mt2 = 2 * e.t
		}

		function $(e) {
			var i = n();
			return e.abs().dlShiftTo(this.m.t, i),
				i.divRemTo(this.m, null, i),
				e.s < 0 && i.compareTo(t.ZERO) > 0 && this.m.subTo(i, i),
				i
		}

		function O(e) {
			var t = n();
			return e.copyTo(t),
				this.reduce(t),
				t
		}

		function U(e) {
			for (; e.t <= this.mt2;)
				e[e.t++] = 0;
			for (var t = 0; t < this.m.t; ++t) {
				var n = 32767 & e[t],
					i = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
				for (n = t + this.m.t,
					e[n] += this.m.am(0, i, e, t, 0, this.m.t); e[n] >= e.DV;)
					e[n] -= e.DV,
					e[++n]++
			}
			e.clamp(),
				e.drShiftTo(this.m.t, e),
				e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
		}

		function N(e, t) {
			e.squareTo(t),
				this.reduce(t)
		}

		function q(e, t, n) {
			e.multiplyTo(t, n),
				this.reduce(n)
		}

		function H() {
			return 0 == (this.t > 0 ? 1 & this[0] : this.s)
		}

		function F(e, i) {
			if (e > 4294967295 || 1 > e)
				return t.ONE;
			var s = n(),
				o = n(),
				r = i.convert(this),
				a = b(e) - 1;
			for (r.copyTo(s); --a >= 0;)
				if (i.sqrTo(s, o),
					(e & 1 << a) > 0)
					i.mulTo(o, r, s);
				else {
					var c = s;
					s = o,
						o = c
				}
			return i.revert(s)
		}

		function W(e, t) {
			var n;
			return n = 256 > e || t.isEven() ? new k(t) : new V(t),
				this.exp(e, n)
		}

		function K() {
			var e = n();
			return this.copyTo(e),
				e
		}

		function j() {
			if (this.s < 0) {
				if (1 == this.t)
					return this[0] - this.DV;
				if (0 == this.t)
					return -1
			} else {
				if (1 == this.t)
					return this[0];
				if (0 == this.t)
					return 0
			}
			return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
		}

		function J() {
			return 0 == this.t ? this.s : this[0] << 24 >> 24
		}

		function G() {
			return 0 == this.t ? this.s : this[0] << 16 >> 16
		}

		function Q(e) {
			return Math.floor(Math.LN2 * this.DB / Math.log(e))
		}

		function z() {
			return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
		}

		function Z(e) {
			if (null == e && (e = 10),
				0 == this.signum() || 2 > e || e > 36)
				return "0";
			var t = this.chunkSize(e),
				i = Math.pow(e, t),
				s = d(i),
				o = n(),
				r = n(),
				a = "";
			for (this.divRemTo(s, o, r); o.signum() > 0;)
				a = (i + r.intValue()).toString(e).substr(1) + a,
				o.divRemTo(s, o, r);
			return r.intValue().toString(e) + a
		}

		function Y(e, n) {
			this.fromInt(0),
				null == n && (n = 10);
			for (var i = this.chunkSize(n), s = Math.pow(n, i), o = !1, r = 0, c = 0, l = 0; l < e.length; ++l) {
				var d = a(e, l);
				0 > d ? "-" == e.charAt(l) && 0 == this.signum() && (o = !0) : (c = n * c + d,
					++r >= i && (this.dMultiply(s),
						this.dAddOffset(c, 0),
						r = 0,
						c = 0))
			}
			r > 0 && (this.dMultiply(Math.pow(n, r)),
					this.dAddOffset(c, 0)),
				o && t.ZERO.subTo(this, this)
		}

		function X(e, n, i) {
			if ("number" == typeof n)
				if (2 > e)
					this.fromInt(1);
				else
					for (this.fromNumber(e, i),
						this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), at, this),
						this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n);)
						this.dAddOffset(2, 0),
						this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
			else {
				var s = new Array,
					o = 7 & e;
				s.length = (e >> 3) + 1,
					n.nextBytes(s),
					o > 0 ? s[0] &= (1 << o) - 1 : s[0] = 0,
					this.fromString(s, 256)
			}
		}

		function et() {
			var e = this.t,
				t = new Array;
			t[0] = this.s;
			var n, i = this.DB - e * this.DB % 8,
				s = 0;
			if (e-- > 0)
				for (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i && (t[s++] = n | this.s << this.DB - i); e >= 0;)
					8 > i ? (n = (this[e] & (1 << i) - 1) << 8 - i,
						n |= this[--e] >> (i += this.DB - 8)) : (n = this[e] >> (i -= 8) & 255,
						0 >= i && (i += this.DB,
							--e)),
					0 != (128 & n) && (n |= -256),
					0 == s && (128 & this.s) != (128 & n) && ++s,
					(s > 0 || n != this.s) && (t[s++] = n);
			return t
		}

		function tt(e) {
			return 0 == this.compareTo(e)
		}

		function nt(e) {
			return this.compareTo(e) < 0 ? this : e
		}

		function it(e) {
			return this.compareTo(e) > 0 ? this : e
		}

		function st(e, t, n) {
			var i, s, o = Math.min(e.t, this.t);
			for (i = 0; o > i; ++i)
				n[i] = t(this[i], e[i]);
			if (e.t < this.t) {
				for (s = e.s & this.DM,
					i = o; i < this.t; ++i)
					n[i] = t(this[i], s);
				n.t = this.t
			} else {
				for (s = this.s & this.DM,
					i = o; i < e.t; ++i)
					n[i] = t(s, e[i]);
				n.t = e.t
			}
			n.s = t(this.s, e.s),
				n.clamp()
		}

		function ot(e, t) {
			return e & t
		}

		function rt(e) {
			var t = n();
			return this.bitwiseTo(e, ot, t),
				t
		}

		function at(e, t) {
			return e | t
		}

		function ct(e) {
			var t = n();
			return this.bitwiseTo(e, at, t),
				t
		}

		function lt(e, t) {
			return e ^ t
		}

		function dt(e) {
			var t = n();
			return this.bitwiseTo(e, lt, t),
				t
		}

		function ut(e, t) {
			return e & ~t
		}

		function pt(e) {
			var t = n();
			return this.bitwiseTo(e, ut, t),
				t
		}

		function gt() {
			for (var e = n(), t = 0; t < this.t; ++t)
				e[t] = this.DM & ~this[t];
			return e.t = this.t,
				e.s = ~this.s,
				e
		}

		function ht(e) {
			var t = n();
			return 0 > e ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
				t
		}

		function mt(e) {
			var t = n();
			return 0 > e ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
				t
		}

		function ft(e) {
			if (0 == e)
				return -1;
			var t = 0;
			return 0 == (65535 & e) && (e >>= 16,
					t += 16),
				0 == (255 & e) && (e >>= 8,
					t += 8),
				0 == (15 & e) && (e >>= 4,
					t += 4),
				0 == (3 & e) && (e >>= 2,
					t += 2),
				0 == (1 & e) && ++t,
				t
		}

		function vt() {
			for (var e = 0; e < this.t; ++e)
				if (0 != this[e])
					return e * this.DB + ft(this[e]);
			return this.s < 0 ? this.t * this.DB : -1
		}

		function bt(e) {
			for (var t = 0; 0 != e;)
				e &= e - 1,
				++t;
			return t
		}

		function yt() {
			for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
				e += bt(this[n] ^ t);
			return e
		}

		function _t(e) {
			var t = Math.floor(e / this.DB);
			return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
		}

		function Et(e, n) {
			var i = t.ONE.shiftLeft(e);
			return this.bitwiseTo(i, n, i),
				i
		}

		function wt(e) {
			return this.changeBit(e, at)
		}

		function Ct(e) {
			return this.changeBit(e, ut)
		}

		function St(e) {
			return this.changeBit(e, lt)
		}

		function It(e, t) {
			for (var n = 0, i = 0, s = Math.min(e.t, this.t); s > n;)
				i += this[n] + e[n],
				t[n++] = i & this.DM,
				i >>= this.DB;
			if (e.t < this.t) {
				for (i += e.s; n < this.t;)
					i += this[n],
					t[n++] = i & this.DM,
					i >>= this.DB;
				i += this.s
			} else {
				for (i += this.s; n < e.t;)
					i += e[n],
					t[n++] = i & this.DM,
					i >>= this.DB;
				i += e.s
			}
			t.s = 0 > i ? -1 : 0,
				i > 0 ? t[n++] = i : -1 > i && (t[n++] = this.DV + i),
				t.t = n,
				t.clamp()
		}

		function Tt(e) {
			var t = n();
			return this.addTo(e, t),
				t
		}

		function Dt(e) {
			var t = n();
			return this.subTo(e, t),
				t
		}

		function Rt(e) {
			var t = n();
			return this.multiplyTo(e, t),
				t
		}

		function kt() {
			var e = n();
			return this.squareTo(e),
				e
		}

		function xt(e) {
			var t = n();
			return this.divRemTo(e, t, null),
				t
		}

		function Lt(e) {
			var t = n();
			return this.divRemTo(e, null, t),
				t
		}

		function Pt(e) {
			var t = n(),
				i = n();
			return this.divRemTo(e, t, i),
				new Array(t, i)
		}

		function At(e) {
			this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
				++this.t,
				this.clamp()
		}

		function Bt(e, t) {
			if (0 != e) {
				for (; this.t <= t;)
					this[this.t++] = 0;
				for (this[t] += e; this[t] >= this.DV;)
					this[t] -= this.DV,
					++t >= this.t && (this[this.t++] = 0),
					++this[t]
			}
		}

		function Mt() {}

		function Vt(e) {
			return e
		}

		function $t(e, t, n) {
			e.multiplyTo(t, n)
		}

		function Ot(e, t) {
			e.squareTo(t)
		}

		function Ut(e) {
			return this.exp(e, new Mt)
		}

		function Nt(e, t, n) {
			var i = Math.min(this.t + e.t, t);
			for (n.s = 0,
				n.t = i; i > 0;)
				n[--i] = 0;
			var s;
			for (s = n.t - this.t; s > i; ++i)
				n[i + this.t] = this.am(0, e[i], n, i, 0, this.t);
			for (s = Math.min(e.t, t); s > i; ++i)
				this.am(0, e[i], n, i, 0, t - i);
			n.clamp()
		}

		function qt(e, t, n) {
			--t;
			var i = n.t = this.t + e.t - t;
			for (n.s = 0; --i >= 0;)
				n[i] = 0;
			for (i = Math.max(t - this.t, 0); i < e.t; ++i)
				n[this.t + i - t] = this.am(t - i, e[i], n, 0, 0, this.t + i - t);
			n.clamp(),
				n.drShiftTo(1, n)
		}

		function Ht(e) {
			this.r2 = n(),
				this.q3 = n(),
				t.ONE.dlShiftTo(2 * e.t, this.r2),
				this.mu = this.r2.divide(e),
				this.m = e
		}

		function Ft(e) {
			if (e.s < 0 || e.t > 2 * this.m.t)
				return e.mod(this.m);
			if (e.compareTo(this.m) < 0)
				return e;
			var t = n();
			return e.copyTo(t),
				this.reduce(t),
				t
		}

		function Wt(e) {
			return e
		}

		function Kt(e) {
			for (e.drShiftTo(this.m.t - 1, this.r2),
				e.t > this.m.t + 1 && (e.t = this.m.t + 1,
					e.clamp()),
				this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
				this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;)
				e.dAddOffset(1, this.m.t + 1);
			for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;)
				e.subTo(this.m, e)
		}

		function jt(e, t) {
			e.squareTo(t),
				this.reduce(t)
		}

		function Jt(e, t, n) {
			e.multiplyTo(t, n),
				this.reduce(n)
		}

		function Gt(e, t) {
			var i, s, o = e.bitLength(),
				r = d(1);
			if (0 >= o)
				return r;
			i = 18 > o ? 1 : 48 > o ? 3 : 144 > o ? 4 : 768 > o ? 5 : 6,
				s = 8 > o ? new k(t) : t.isEven() ? new Ht(t) : new V(t);
			var a = new Array,
				c = 3,
				l = i - 1,
				u = (1 << i) - 1;
			if (a[1] = s.convert(this),
				i > 1) {
				var p = n();
				for (s.sqrTo(a[1], p); u >= c;)
					a[c] = n(),
					s.mulTo(p, a[c - 2], a[c]),
					c += 2
			}
			var g, h, m = e.t - 1,
				f = !0,
				v = n();
			for (o = b(e[m]) - 1; m >= 0;) {
				for (o >= l ? g = e[m] >> o - l & u : (g = (e[m] & (1 << o + 1) - 1) << l - o,
						m > 0 && (g |= e[m - 1] >> this.DB + o - l)),
					c = i; 0 == (1 & g);)
					g >>= 1,
					--c;
				if ((o -= c) < 0 && (o += this.DB,
						--m),
					f)
					a[g].copyTo(r),
					f = !1;
				else {
					for (; c > 1;)
						s.sqrTo(r, v),
						s.sqrTo(v, r),
						c -= 2;
					c > 0 ? s.sqrTo(r, v) : (h = r,
							r = v,
							v = h),
						s.mulTo(v, a[g], r)
				}
				for (; m >= 0 && 0 == (e[m] & 1 << o);)
					s.sqrTo(r, v),
					h = r,
					r = v,
					v = h,
					--o < 0 && (o = this.DB - 1,
						--m)
			}
			return s.revert(r)
		}

		function Qt(e) {
			var t = this.s < 0 ? this.negate() : this.clone(),
				n = e.s < 0 ? e.negate() : e.clone();
			if (t.compareTo(n) < 0) {
				var i = t;
				t = n,
					n = i
			}
			var s = t.getLowestSetBit(),
				o = n.getLowestSetBit();
			if (0 > o)
				return t;
			for (o > s && (o = s),
				o > 0 && (t.rShiftTo(o, t),
					n.rShiftTo(o, n)); t.signum() > 0;)
				(s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t),
				(s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n),
				t.compareTo(n) >= 0 ? (t.subTo(n, t),
					t.rShiftTo(1, t)) : (n.subTo(t, n),
					n.rShiftTo(1, n));
			return o > 0 && n.lShiftTo(o, n),
				n
		}

		function zt(e) {
			if (0 >= e)
				return 0;
			var t = this.DV % e,
				n = this.s < 0 ? e - 1 : 0;
			if (this.t > 0)
				if (0 == t)
					n = this[0] % e;
				else
					for (var i = this.t - 1; i >= 0; --i)
						n = (t * n + this[i]) % e;
			return n
		}

		function Zt(e) {
			var n = e.isEven();
			if (this.isEven() && n || 0 == e.signum())
				return t.ZERO;
			for (var i = e.clone(), s = this.clone(), o = d(1), r = d(0), a = d(0), c = d(1); 0 != i.signum();) {
				for (; i.isEven();)
					i.rShiftTo(1, i),
					n ? (o.isEven() && r.isEven() || (o.addTo(this, o),
							r.subTo(e, r)),
						o.rShiftTo(1, o)) : r.isEven() || r.subTo(e, r),
					r.rShiftTo(1, r);
				for (; s.isEven();)
					s.rShiftTo(1, s),
					n ? (a.isEven() && c.isEven() || (a.addTo(this, a),
							c.subTo(e, c)),
						a.rShiftTo(1, a)) : c.isEven() || c.subTo(e, c),
					c.rShiftTo(1, c);
				i.compareTo(s) >= 0 ? (i.subTo(s, i),
					n && o.subTo(a, o),
					r.subTo(c, r)) : (s.subTo(i, s),
					n && a.subTo(o, a),
					c.subTo(r, c))
			}
			return 0 != s.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c),
				c.signum() < 0 ? c.add(e) : c) : c
		}

		function Yt(e) {
			var t, n = this.abs();
			if (1 == n.t && n[0] <= Pn[Pn.length - 1]) {
				for (t = 0; t < Pn.length; ++t)
					if (n[0] == Pn[t])
						return !0;
				return !1
			}
			if (n.isEven())
				return !1;
			for (t = 1; t < Pn.length;) {
				for (var i = Pn[t], s = t + 1; s < Pn.length && An > i;)
					i *= Pn[s++];
				for (i = n.modInt(i); s > t;)
					if (i % Pn[t++] == 0)
						return !1
			}
			return n.millerRabin(e)
		}

		function Xt(e) {
			var i = this.subtract(t.ONE),
				s = i.getLowestSetBit();
			if (0 >= s)
				return !1;
			var o = i.shiftRight(s);
			e = e + 1 >> 1,
				e > Pn.length && (e = Pn.length);
			for (var r = n(), a = 0; e > a; ++a) {
				r.fromInt(Pn[Math.floor(Math.random() * Pn.length)]);
				var c = r.modPow(o, this);
				if (0 != c.compareTo(t.ONE) && 0 != c.compareTo(i)) {
					for (var l = 1; l++ < s && 0 != c.compareTo(i);)
						if (c = c.modPowInt(2, this),
							0 == c.compareTo(t.ONE))
							return !1;
					if (0 != c.compareTo(i))
						return !1
				}
			}
			return !0
		}

		function en() {
			this.i = 0,
				this.j = 0,
				this.S = new Array
		}

		function tn(e) {
			var t, n, i;
			for (t = 0; 256 > t; ++t)
				this.S[t] = t;
			for (n = 0,
				t = 0; 256 > t; ++t)
				n = n + this.S[t] + e[t % e.length] & 255,
				i = this.S[t],
				this.S[t] = this.S[n],
				this.S[n] = i;
			this.i = 0,
				this.j = 0
		}

		function nn() {
			var e;
			return this.i = this.i + 1 & 255,
				this.j = this.j + this.S[this.i] & 255,
				e = this.S[this.i],
				this.S[this.i] = this.S[this.j],
				this.S[this.j] = e,
				this.S[e + this.S[this.i] & 255]
		}

		function sn() {
			return new en
		}

		function on(e) {
			Mn[Vn++] ^= 255 & e,
				Mn[Vn++] ^= e >> 8 & 255,
				Mn[Vn++] ^= e >> 16 & 255,
				Mn[Vn++] ^= e >> 24 & 255,
				Vn >= $n && (Vn -= $n)
		}

		function rn() {
			on((new Date).getTime())
		}

		function an() {
			if (null == Bn) {
				for (rn(),
					Bn = sn(),
					Bn.init(Mn),
					Vn = 0; Vn < Mn.length; ++Vn)
					Mn[Vn] = 0;
				Vn = 0
			}
			return Bn.next()
		}

		function cn(e) {
			var t;
			for (t = 0; t < e.length; ++t)
				e[t] = an()
		}

		function ln() {}

		function dn(e, n) {
			return new t(e, n)
		}

		function un(e, n) {
			if (n < e.length + 11)
				return console.error("Message too long for RSA"),
					null;
			for (var i = new Array, s = e.length - 1; s >= 0 && n > 0;) {
				var o = e.charCodeAt(s--);
				128 > o ? i[--n] = o : o > 127 && 2048 > o ? (i[--n] = 63 & o | 128,
					i[--n] = o >> 6 | 192) : (i[--n] = 63 & o | 128,
					i[--n] = o >> 6 & 63 | 128,
					i[--n] = o >> 12 | 224)
			}
			i[--n] = 0;
			for (var r = new ln, a = new Array; n > 2;) {
				for (a[0] = 0; 0 == a[0];)
					r.nextBytes(a);
				i[--n] = a[0]
			}
			return i[--n] = 2,
				i[--n] = 0,
				new t(i)
		}

		function pn() {
			this.n = null,
				this.e = 0,
				this.d = null,
				this.p = null,
				this.q = null,
				this.dmp1 = null,
				this.dmq1 = null,
				this.coeff = null
		}

		function gn(e, t) {
			null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
				this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
		}

		function hn(e) {
			return e.modPowInt(this.e, this.n)
		}

		function mn(e) {
			var t = un(e, this.n.bitLength() + 7 >> 3);
			if (null == t)
				return null;
			var n = this.doPublic(t);
			if (null == n)
				return null;
			var i = n.toString(16);
			return 0 == (1 & i.length) ? i : "0" + i
		}

		function fn(e, t) {
			for (var n = e.toByteArray(), i = 0; i < n.length && 0 == n[i];)
				++i;
			if (n.length - i != t - 1 || 2 != n[i])
				return null;
			for (++i; 0 != n[i];)
				if (++i >= n.length)
					return null;
			for (var s = ""; ++i < n.length;) {
				var o = 255 & n[i];
				128 > o ? s += String.fromCharCode(o) : o > 191 && 224 > o ? (s += String.fromCharCode((31 & o) << 6 | 63 & n[i +
						1]),
					++i) : (s += String.fromCharCode((15 & o) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2]),
					i += 2)
			}
			return s
		}

		function vn(e, t, n) {
			null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
				this.e = parseInt(t, 16),
				this.d = dn(n, 16)) : console.error("Invalid RSA private key")
		}

		function bn(e, t, n, i, s, o, r, a) {
			null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
				this.e = parseInt(t, 16),
				this.d = dn(n, 16),
				this.p = dn(i, 16),
				this.q = dn(s, 16),
				this.dmp1 = dn(o, 16),
				this.dmq1 = dn(r, 16),
				this.coeff = dn(a, 16)) : console.error("Invalid RSA private key")
		}

		function yn(e, n) {
			var i = new ln,
				s = e >> 1;
			this.e = parseInt(n, 16);
			for (var o = new t(n, 16);;) {
				for (; this.p = new t(e - s, 1, i),
					0 != this.p.subtract(t.ONE).gcd(o).compareTo(t.ONE) || !this.p.isProbablePrime(10);)
				;
				for (; this.q = new t(s, 1, i),
					0 != this.q.subtract(t.ONE).gcd(o).compareTo(t.ONE) || !this.q.isProbablePrime(10);)
				;
				if (this.p.compareTo(this.q) <= 0) {
					var r = this.p;
					this.p = this.q,
						this.q = r
				}
				var a = this.p.subtract(t.ONE),
					c = this.q.subtract(t.ONE),
					l = a.multiply(c);
				if (0 == l.gcd(o).compareTo(t.ONE)) {
					this.n = this.p.multiply(this.q),
						this.d = o.modInverse(l),
						this.dmp1 = this.d.mod(a),
						this.dmq1 = this.d.mod(c),
						this.coeff = this.q.modInverse(this.p);
					break
				}
			}
		}

		function _n(e) {
			if (null == this.p || null == this.q)
				return e.modPow(this.d, this.n);
			for (var t = e.mod(this.p).modPow(this.dmp1, this.p), n = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(n) <
				0;)
				t = t.add(this.p);
			return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
		}

		function En(e) {
			var t = dn(e, 16),
				n = this.doPrivate(t);
			return null == n ? null : fn(n, this.n.bitLength() + 7 >> 3)
		}

		function wn(e) {
			var t, n, i = "";
			for (t = 0; t + 3 <= e.length; t += 3)
				n = parseInt(e.substring(t, t + 3), 16),
				i += Nn.charAt(n >> 6) + Nn.charAt(63 & n);
			for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16),
					i += Nn.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16),
					i += Nn.charAt(n >> 2) + Nn.charAt((3 & n) << 4));
				(3 & i.length) > 0;)
				i += qn;
			return i
		}

		function Cn(e) {
			var t, n, i = "",
				s = 0;
			for (t = 0; t < e.length && e.charAt(t) != qn; ++t)
				v = Nn.indexOf(e.charAt(t)),
				0 > v || (0 == s ? (i += r(v >> 2),
					n = 3 & v,
					s = 1) : 1 == s ? (i += r(n << 2 | v >> 4),
					n = 15 & v,
					s = 2) : 2 == s ? (i += r(n),
					i += r(v >> 2),
					n = 3 & v,
					s = 3) : (i += r(n << 2 | v >> 4),
					i += r(15 & v),
					s = 0));
			return 1 == s && (i += r(n << 2)),
				i
		}
		var Sn, In = 0xdeadbeefcafe,
			Tn = 15715070 == (16777215 & In);
		Tn && "Microsoft Internet Explorer" == navigator.appName ? (t.prototype.am = s,
				Sn = 30) : Tn && "Netscape" != navigator.appName ? (t.prototype.am = i,
				Sn = 26) : (t.prototype.am = o,
				Sn = 28),
			t.prototype.DB = Sn,
			t.prototype.DM = (1 << Sn) - 1,
			t.prototype.DV = 1 << Sn;
		var Dn = 52;
		t.prototype.FV = Math.pow(2, Dn),
			t.prototype.F1 = Dn - Sn,
			t.prototype.F2 = 2 * Sn - Dn;
		var Rn, kn, xn = "0123456789abcdefghijklmnopqrstuvwxyz",
			Ln = new Array;
		for (Rn = "0".charCodeAt(0),
			kn = 0; 9 >= kn; ++kn)
			Ln[Rn++] = kn;
		for (Rn = "a".charCodeAt(0),
			kn = 10; 36 > kn; ++kn)
			Ln[Rn++] = kn;
		for (Rn = "A".charCodeAt(0),
			kn = 10; 36 > kn; ++kn)
			Ln[Rn++] = kn;
		k.prototype.convert = x,
			k.prototype.revert = L,
			k.prototype.reduce = P,
			k.prototype.mulTo = A,
			k.prototype.sqrTo = B,
			V.prototype.convert = $,
			V.prototype.revert = O,
			V.prototype.reduce = U,
			V.prototype.mulTo = q,
			V.prototype.sqrTo = N,
			t.prototype.copyTo = c,
			t.prototype.fromInt = l,
			t.prototype.fromString = u,
			t.prototype.clamp = p,
			t.prototype.dlShiftTo = _,
			t.prototype.drShiftTo = E,
			t.prototype.lShiftTo = w,
			t.prototype.rShiftTo = C,
			t.prototype.subTo = S,
			t.prototype.multiplyTo = I,
			t.prototype.squareTo = T,
			t.prototype.divRemTo = D,
			t.prototype.invDigit = M,
			t.prototype.isEven = H,
			t.prototype.exp = F,
			t.prototype.toString = g,
			t.prototype.negate = h,
			t.prototype.abs = m,
			t.prototype.compareTo = f,
			t.prototype.bitLength = y,
			t.prototype.mod = R,
			t.prototype.modPowInt = W,
			t.ZERO = d(0),
			t.ONE = d(1),
			Mt.prototype.convert = Vt,
			Mt.prototype.revert = Vt,
			Mt.prototype.mulTo = $t,
			Mt.prototype.sqrTo = Ot,
			Ht.prototype.convert = Ft,
			Ht.prototype.revert = Wt,
			Ht.prototype.reduce = Kt,
			Ht.prototype.mulTo = Jt,
			Ht.prototype.sqrTo = jt;
		var Pn = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103,
				107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
				233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
				373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
				509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653,
				659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821,
				823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977,
				983, 991, 997
			],
			An = (1 << 26) / Pn[Pn.length - 1];
		t.prototype.chunkSize = Q,
			t.prototype.toRadix = Z,
			t.prototype.fromRadix = Y,
			t.prototype.fromNumber = X,
			t.prototype.bitwiseTo = st,
			t.prototype.changeBit = Et,
			t.prototype.addTo = It,
			t.prototype.dMultiply = At,
			t.prototype.dAddOffset = Bt,
			t.prototype.multiplyLowerTo = Nt,
			t.prototype.multiplyUpperTo = qt,
			t.prototype.modInt = zt,
			t.prototype.millerRabin = Xt,
			t.prototype.clone = K,
			t.prototype.intValue = j,
			t.prototype.byteValue = J,
			t.prototype.shortValue = G,
			t.prototype.signum = z,
			t.prototype.toByteArray = et,
			t.prototype.equals = tt,
			t.prototype.min = nt,
			t.prototype.max = it,
			t.prototype.and = rt,
			t.prototype.or = ct,
			t.prototype.xor = dt,
			t.prototype.andNot = pt,
			t.prototype.not = gt,
			t.prototype.shiftLeft = ht,
			t.prototype.shiftRight = mt,
			t.prototype.getLowestSetBit = vt,
			t.prototype.bitCount = yt,
			t.prototype.testBit = _t,
			t.prototype.setBit = wt,
			t.prototype.clearBit = Ct,
			t.prototype.flipBit = St,
			t.prototype.add = Tt,
			t.prototype.subtract = Dt,
			t.prototype.multiply = Rt,
			t.prototype.divide = xt,
			t.prototype.remainder = Lt,
			t.prototype.divideAndRemainder = Pt,
			t.prototype.modPow = Gt,
			t.prototype.modInverse = Zt,
			t.prototype.pow = Ut,
			t.prototype.gcd = Qt,
			t.prototype.isProbablePrime = Yt,
			t.prototype.square = kt,
			en.prototype.init = tn,
			en.prototype.next = nn;
		var Bn, Mn, Vn, $n = 256;
		if (null == Mn) {
			Mn = new Array,
				Vn = 0;
			var On;
			if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
				var Un = window.crypto.random(32);
				for (On = 0; On < Un.length; ++On)
					Mn[Vn++] = 255 & Un.charCodeAt(On)
			}
			for (; $n > Vn;)
				On = Math.floor(65536 * Math.random()),
				Mn[Vn++] = On >>> 8,
				Mn[Vn++] = 255 & On;
			Vn = 0,
				rn()
		}
		ln.prototype.nextBytes = cn,
			pn.prototype.doPublic = hn,
			pn.prototype.setPublic = gn,
			pn.prototype.encrypt = mn,
			pn.prototype.doPrivate = _n,
			pn.prototype.setPrivate = vn,
			pn.prototype.setPrivateEx = bn,
			pn.prototype.generate = yn,
			pn.prototype.decrypt = En,
			function() {
				var e = function(e, i, s) {
					var o = new ln,
						r = e >> 1;
					this.e = parseInt(i, 16);
					var a = new t(i, 16),
						c = this,
						l = function() {
							var i = function() {
									if (c.p.compareTo(c.q) <= 0) {
										var e = c.p;
										c.p = c.q,
											c.q = e
									}
									var n = c.p.subtract(t.ONE),
										i = c.q.subtract(t.ONE),
										o = n.multiply(i);
									0 == o.gcd(a).compareTo(t.ONE) ? (c.n = c.p.multiply(c.q),
										c.d = a.modInverse(o),
										c.dmp1 = c.d.mod(n),
										c.dmq1 = c.d.mod(i),
										c.coeff = c.q.modInverse(c.p),
										setTimeout(function() {
											s()
										}, 0)) : setTimeout(l, 0)
								},
								d = function() {
									c.q = n(),
										c.q.fromNumberAsync(r, 1, o, function() {
											c.q.subtract(t.ONE).gcda(a, function(e) {
												0 == e.compareTo(t.ONE) && c.q.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(d, 0)
											})
										})
								},
								u = function() {
									c.p = n(),
										c.p.fromNumberAsync(e - r, 1, o, function() {
											c.p.subtract(t.ONE).gcda(a, function(e) {
												0 == e.compareTo(t.ONE) && c.p.isProbablePrime(10) ? setTimeout(d, 0) : setTimeout(u, 0)
											})
										})
								};
							setTimeout(u, 0)
						};
					setTimeout(l, 0)
				};
				pn.prototype.generateAsync = e;
				var i = function(e, t) {
					var n = this.s < 0 ? this.negate() : this.clone(),
						i = e.s < 0 ? e.negate() : e.clone();
					if (n.compareTo(i) < 0) {
						var s = n;
						n = i,
							i = s
					}
					var o = n.getLowestSetBit(),
						r = i.getLowestSetBit();
					if (0 > r)
						return void t(n);
					r > o && (r = o),
						r > 0 && (n.rShiftTo(r, n),
							i.rShiftTo(r, i));
					var a = function() {
						(o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
							(o = i.getLowestSetBit()) > 0 && i.rShiftTo(o, i),
							n.compareTo(i) >= 0 ? (n.subTo(i, n),
								n.rShiftTo(1, n)) : (i.subTo(n, i),
								i.rShiftTo(1, i)),
							n.signum() > 0 ? setTimeout(a, 0) : (r > 0 && i.lShiftTo(r, i),
								setTimeout(function() {
									t(i)
								}, 0))
					};
					setTimeout(a, 10)
				};
				t.prototype.gcda = i;
				var s = function(e, n, i, s) {
					if ("number" == typeof n)
						if (2 > e)
							this.fromInt(1);
						else {
							this.fromNumber(e, i),
								this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), at, this),
								this.isEven() && this.dAddOffset(1, 0);
							var o = this,
								r = function() {
									o.dAddOffset(2, 0),
										o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o),
										o.isProbablePrime(n) ? setTimeout(function() {
											s()
										}, 0) : setTimeout(r, 0)
								};
							setTimeout(r, 0)
						}
					else {
						var a = new Array,
							c = 7 & e;
						a.length = (e >> 3) + 1,
							n.nextBytes(a),
							c > 0 ? a[0] &= (1 << c) - 1 : a[0] = 0,
							this.fromString(a, 256)
					}
				};
				t.prototype.fromNumberAsync = s
			}();
		var Nn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			qn = "=",
			Hn = Hn || {};
		Hn.env = Hn.env || {};
		var Fn = Hn,
			Wn = Object.prototype,
			Kn = "[object Function]",
			jn = ["toString", "valueOf"];
		Hn.env.parseUA = function(e) {
				var t, n = function(e) {
						var t = 0;
						return parseFloat(e.replace(/\./g, function() {
							return 1 == t++ ? "" : "."
						}))
					},
					i = navigator,
					s = {
						ie: 0,
						opera: 0,
						gecko: 0,
						webkit: 0,
						chrome: 0,
						mobile: null,
						air: 0,
						ipad: 0,
						iphone: 0,
						ipod: 0,
						ios: null,
						android: 0,
						webos: 0,
						caja: i && i.cajaVersion,
						secure: !1,
						os: null
					},
					o = e || navigator && navigator.userAgent,
					r = window && window.location,
					a = r && r.href;
				return s.secure = a && 0 === a.toLowerCase().indexOf("https"),
					o && (/windows|win32/i.test(o) ? s.os = "windows" : /macintosh/i.test(o) ? s.os = "macintosh" : /rhino/i.test(o) &&
						(s.os = "rhino"),
						/KHTML/.test(o) && (s.webkit = 1),
						t = o.match(/AppleWebKit\/([^\s]*)/),
						t && t[1] && (s.webkit = n(t[1]),
							/ Mobile\//.test(o) ? (s.mobile = "Apple",
								t = o.match(/OS ([^\s]*)/),
								t && t[1] && (t = n(t[1].replace("_", "."))),
								s.ios = t,
								s.ipad = s.ipod = s.iphone = 0,
								t = o.match(/iPad|iPod|iPhone/),
								t && t[0] && (s[t[0].toLowerCase()] = s.ios)) : (t = o.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/),
								t && (s.mobile = t[0]),
								/webOS/.test(o) && (s.mobile = "WebOS",
									t = o.match(/webOS\/([^\s]*);/),
									t && t[1] && (s.webos = n(t[1]))),
								/ Android/.test(o) && (s.mobile = "Android",
									t = o.match(/Android ([^\s]*);/),
									t && t[1] && (s.android = n(t[1])))),
							t = o.match(/Chrome\/([^\s]*)/),
							t && t[1] ? s.chrome = n(t[1]) : (t = o.match(/AdobeAIR\/([^\s]*)/),
								t && (s.air = t[0]))),
						s.webkit || (t = o.match(/Opera[\s\/]([^\s]*)/),
							t && t[1] ? (s.opera = n(t[1]),
								t = o.match(/Version\/([^\s]*)/),
								t && t[1] && (s.opera = n(t[1])),
								t = o.match(/Opera Mini[^;]*/),
								t && (s.mobile = t[0])) : (t = o.match(/MSIE\s([^;]*)/),
								t && t[1] ? s.ie = n(t[1]) : (t = o.match(/Gecko\/([^\s]*)/),
									t && (s.gecko = 1,
										t = o.match(/rv:([^\s\)]*)/),
										t && t[1] && (s.gecko = n(t[1]))))))),
					s
			},
			Hn.env.ua = Hn.env.parseUA(),
			Hn.isFunction = function(e) {
				return "function" == typeof e || Wn.toString.apply(e) === Kn
			},
			Hn._IEEnumFix = Hn.env.ua.ie ? function(e, t) {
				var n, i, s;
				for (n = 0; n < jn.length; n += 1)
					i = jn[n],
					s = t[i],
					Fn.isFunction(s) && s != Wn[i] && (e[i] = s)
			} :
			function() {},
			Hn.extend = function(e, t, n) {
				if (!t || !e)
					throw new Error("extend failed, please check that all dependencies are included.");
				var i, s = function() {};
				if (s.prototype = t.prototype,
					e.prototype = new s,
					e.prototype.constructor = e,
					e.superclass = t.prototype,
					t.prototype.constructor == Wn.constructor && (t.prototype.constructor = t),
					n) {
					for (i in n)
						Fn.hasOwnProperty(n, i) && (e.prototype[i] = n[i]);
					Fn._IEEnumFix(e.prototype, n)
				}
			},
			"undefined" != typeof KJUR && KJUR || (KJUR = {}),
			"undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}),
			KJUR.asn1.ASN1Util = new function() {
				this.integerToByteHex = function(e) {
						var t = e.toString(16);
						return t.length % 2 == 1 && (t = "0" + t),
							t
					},
					this.bigIntToMinTwosComplementsHex = function(e) {
						var n = e.toString(16);
						if ("-" != n.substr(0, 1))
							n.length % 2 == 1 ? n = "0" + n : n.match(/^[0-7]/) || (n = "00" + n);
						else {
							var i = n.substr(1),
								s = i.length;
							s % 2 == 1 ? s += 1 : n.match(/^[0-7]/) || (s += 2);
							for (var o = "", r = 0; s > r; r++)
								o += "f";
							var a = new t(o, 16),
								c = a.xor(e).add(t.ONE);
							n = c.toString(16).replace(/^-/, "")
						}
						return n
					},
					this.getPEMStringFromHex = function(e, t) {
						var n = CryptoJS.enc.Hex.parse(e),
							i = CryptoJS.enc.Base64.stringify(n),
							s = i.replace(/(.{64})/g, "$1\r\n");
						return s = s.replace(/\r\n$/, ""),
							"-----BEGIN " + t + "-----\r\n" + s + "\r\n-----END " + t + "-----\r\n"
					}
			},
			KJUR.asn1.ASN1Object = function() {
				var e = "";
				this.getLengthHexFromValue = function() {
						if ("undefined" == typeof this.hV || null == this.hV)
							throw "this.hV is null or undefined.";
						if (this.hV.length % 2 == 1)
							throw "value hex must be even length: n=" + e.length + ",v=" + this.hV;
						var t = this.hV.length / 2,
							n = t.toString(16);
						if (n.length % 2 == 1 && (n = "0" + n),
							128 > t)
							return n;
						var i = n.length / 2;
						if (i > 15)
							throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
						var s = 128 + i;
						return s.toString(16) + n
					},
					this.getEncodedHex = function() {
						return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
								this.hL = this.getLengthHexFromValue(),
								this.hTLV = this.hT + this.hL + this.hV,
								this.isModified = !1),
							this.hTLV
					},
					this.getValueHex = function() {
						return this.getEncodedHex(),
							this.hV
					},
					this.getFreshValueHex = function() {
						return ""
					}
			},
			KJUR.asn1.DERAbstractString = function(e) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
					this.getString = function() {
						return this.s
					},
					this.setString = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.s = e,
							this.hV = stohex(this.s)
					},
					this.setStringHex = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.s = null,
							this.hV = e
					},
					this.getFreshValueHex = function() {
						return this.hV
					},
					"undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex &&
						this.setStringHex(e.hex))
			},
			Hn.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERAbstractTime = function() {
				KJUR.asn1.DERAbstractTime.superclass.constructor.call(this),
					this.localDateToUTC = function(e) {
						utc = e.getTime() + 6e4 * e.getTimezoneOffset();
						var t = new Date(utc);
						return t
					},
					this.formatDate = function(e, t) {
						var n = this.zeroPadding,
							i = this.localDateToUTC(e),
							s = String(i.getFullYear());
						"utc" == t && (s = s.substr(2, 2));
						var o = n(String(i.getMonth() + 1), 2),
							r = n(String(i.getDate()), 2),
							a = n(String(i.getHours()), 2),
							c = n(String(i.getMinutes()), 2),
							l = n(String(i.getSeconds()), 2);
						return s + o + r + a + c + l + "Z"
					},
					this.zeroPadding = function(e, t) {
						return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
					},
					this.getString = function() {
						return this.s
					},
					this.setString = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.s = e,
							this.hV = stohex(this.s)
					},
					this.setByDateValue = function(e, t, n, i, s, o) {
						var r = new Date(Date.UTC(e, t - 1, n, i, s, o, 0));
						this.setByDate(r)
					},
					this.getFreshValueHex = function() {
						return this.hV
					}
			},
			Hn.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERAbstractStructured = function(e) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
					this.setByASN1ObjectArray = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.asn1Array = e
					},
					this.appendASN1Object = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.asn1Array.push(e)
					},
					this.asn1Array = new Array,
					"undefined" != typeof e && "undefined" != typeof e.array && (this.asn1Array = e.array)
			},
			Hn.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERBoolean = function() {
				KJUR.asn1.DERBoolean.superclass.constructor.call(this),
					this.hT = "01",
					this.hTLV = "0101ff"
			},
			Hn.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERInteger = function(e) {
				KJUR.asn1.DERInteger.superclass.constructor.call(this),
					this.hT = "02",
					this.setByBigInteger = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
					},
					this.setByInteger = function(e) {
						var n = new t(String(e), 10);
						this.setByBigInteger(n)
					},
					this.setValueHex = function(e) {
						this.hV = e
					},
					this.getFreshValueHex = function() {
						return this.hV
					},
					"undefined" != typeof e && ("undefined" != typeof e.bigint ? this.setByBigInteger(e.bigint) : "undefined" !=
						typeof e["int"] ? this.setByInteger(e["int"]) : "undefined" != typeof e.hex && this.setValueHex(e.hex))
			},
			Hn.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERBitString = function(e) {
				KJUR.asn1.DERBitString.superclass.constructor.call(this),
					this.hT = "03",
					this.setHexValueIncludingUnusedBits = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.hV = e
					},
					this.setUnusedBitsAndHexValue = function(e, t) {
						if (0 > e || e > 7)
							throw "unused bits shall be from 0 to 7: u = " + e;
						var n = "0" + e;
						this.hTLV = null,
							this.isModified = !0,
							this.hV = n + t
					},
					this.setByBinaryString = function(e) {
						e = e.replace(/0+$/, "");
						var t = 8 - e.length % 8;
						8 == t && (t = 0);
						for (var n = 0; t >= n; n++)
							e += "0";
						for (var i = "", n = 0; n < e.length - 1; n += 8) {
							var s = e.substr(n, 8),
								o = parseInt(s, 2).toString(16);
							1 == o.length && (o = "0" + o),
								i += o
						}
						this.hTLV = null,
							this.isModified = !0,
							this.hV = "0" + t + i
					},
					this.setByBooleanArray = function(e) {
						for (var t = "", n = 0; n < e.length; n++)
							t += 1 == e[n] ? "1" : "0";
						this.setByBinaryString(t)
					},
					this.newFalseArray = function(e) {
						for (var t = new Array(e), n = 0; e > n; n++)
							t[n] = !1;
						return t
					},
					this.getFreshValueHex = function() {
						return this.hV
					},
					"undefined" != typeof e && ("undefined" != typeof e.hex ? this.setHexValueIncludingUnusedBits(e.hex) :
						"undefined" != typeof e.bin ? this.setByBinaryString(e.bin) : "undefined" != typeof e.array && this.setByBooleanArray(
							e.array))
			},
			Hn.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
			KJUR.asn1.DEROctetString = function(e) {
				KJUR.asn1.DEROctetString.superclass.constructor.call(this, e),
					this.hT = "04"
			},
			Hn.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERNull = function() {
				KJUR.asn1.DERNull.superclass.constructor.call(this),
					this.hT = "05",
					this.hTLV = "0500"
			},
			Hn.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERObjectIdentifier = function(e) {
				var n = function(e) {
						var t = e.toString(16);
						return 1 == t.length && (t = "0" + t),
							t
					},
					i = function(e) {
						var i = "",
							s = new t(e, 10),
							o = s.toString(2),
							r = 7 - o.length % 7;
						7 == r && (r = 0);
						for (var a = "", c = 0; r > c; c++)
							a += "0";
						o = a + o;
						for (var c = 0; c < o.length - 1; c += 7) {
							var l = o.substr(c, 7);
							c != o.length - 7 && (l = "1" + l),
								i += n(parseInt(l, 2))
						}
						return i
					};
				KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
					this.hT = "06",
					this.setValueHex = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.s = null,
							this.hV = e
					},
					this.setValueOidString = function(e) {
						if (!e.match(/^[0-9.]+$/))
							throw "malformed oid string: " + e;
						var t = "",
							s = e.split("."),
							o = 40 * parseInt(s[0]) + parseInt(s[1]);
						t += n(o),
							s.splice(0, 2);
						for (var r = 0; r < s.length; r++)
							t += i(s[r]);
						this.hTLV = null,
							this.isModified = !0,
							this.s = null,
							this.hV = t
					},
					this.setValueName = function(e) {
						if ("undefined" == typeof KJUR.asn1.x509.OID.name2oidList[e])
							throw "DERObjectIdentifier oidName undefined: " + e;
						var t = KJUR.asn1.x509.OID.name2oidList[e];
						this.setValueOidString(t)
					},
					this.getFreshValueHex = function() {
						return this.hV
					},
					"undefined" != typeof e && ("undefined" != typeof e.oid ? this.setValueOidString(e.oid) : "undefined" != typeof e
						.hex ? this.setValueHex(e.hex) : "undefined" != typeof e.name && this.setValueName(e.name))
			},
			Hn.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
			KJUR.asn1.DERUTF8String = function(e) {
				KJUR.asn1.DERUTF8String.superclass.constructor.call(this, e),
					this.hT = "0c"
			},
			Hn.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERNumericString = function(e) {
				KJUR.asn1.DERNumericString.superclass.constructor.call(this, e),
					this.hT = "12"
			},
			Hn.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERPrintableString = function(e) {
				KJUR.asn1.DERPrintableString.superclass.constructor.call(this, e),
					this.hT = "13"
			},
			Hn.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERTeletexString = function(e) {
				KJUR.asn1.DERTeletexString.superclass.constructor.call(this, e),
					this.hT = "14"
			},
			Hn.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERIA5String = function(e) {
				KJUR.asn1.DERIA5String.superclass.constructor.call(this, e),
					this.hT = "16"
			},
			Hn.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
			KJUR.asn1.DERUTCTime = function(e) {
				KJUR.asn1.DERUTCTime.superclass.constructor.call(this, e),
					this.hT = "17",
					this.setByDate = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.date = e,
							this.s = this.formatDate(this.date, "utc"),
							this.hV = stohex(this.s)
					},
					"undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex ?
						this.setStringHex(e.hex) : "undefined" != typeof e.date && this.setByDate(e.date))
			},
			Hn.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
			KJUR.asn1.DERGeneralizedTime = function(e) {
				KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, e),
					this.hT = "18",
					this.setByDate = function(e) {
						this.hTLV = null,
							this.isModified = !0,
							this.date = e,
							this.s = this.formatDate(this.date, "gen"),
							this.hV = stohex(this.s)
					},
					"undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex ?
						this.setStringHex(e.hex) : "undefined" != typeof e.date && this.setByDate(e.date))
			},
			Hn.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
			KJUR.asn1.DERSequence = function(e) {
				KJUR.asn1.DERSequence.superclass.constructor.call(this, e),
					this.hT = "30",
					this.getFreshValueHex = function() {
						for (var e = "", t = 0; t < this.asn1Array.length; t++) {
							var n = this.asn1Array[t];
							e += n.getEncodedHex()
						}
						return this.hV = e,
							this.hV
					}
			},
			Hn.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
			KJUR.asn1.DERSet = function(e) {
				KJUR.asn1.DERSet.superclass.constructor.call(this, e),
					this.hT = "31",
					this.getFreshValueHex = function() {
						for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
							var n = this.asn1Array[t];
							e.push(n.getEncodedHex())
						}
						return e.sort(),
							this.hV = e.join(""),
							this.hV
					}
			},
			Hn.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
			KJUR.asn1.DERTaggedObject = function(e) {
				KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
					this.hT = "a0",
					this.hV = "",
					this.isExplicit = !0,
					this.asn1Object = null,
					this.setASN1Object = function(e, t, n) {
						this.hT = t,
							this.isExplicit = e,
							this.asn1Object = n,
							this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
								this.hTLV = null,
								this.isModified = !0) : (this.hV = null,
								this.hTLV = n.getEncodedHex(),
								this.hTLV = this.hTLV.replace(/^../, t),
								this.isModified = !1)
					},
					this.getFreshValueHex = function() {
						return this.hV
					},
					"undefined" != typeof e && ("undefined" != typeof e.tag && (this.hT = e.tag),
						"undefined" != typeof e.explicit && (this.isExplicit = e.explicit),
						"undefined" != typeof e.obj && (this.asn1Object = e.obj,
							this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
			},
			Hn.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
			function(e) {
				"use strict";
				var t, n = {};
				n.decode = function(n) {
						var i;
						if (t === e) {
							var s = "0123456789ABCDEF",
								o = " \f\n\r	 \u2028\u2029";
							for (t = [],
								i = 0; 16 > i; ++i)
								t[s.charAt(i)] = i;
							for (s = s.toLowerCase(),
								i = 10; 16 > i; ++i)
								t[s.charAt(i)] = i;
							for (i = 0; i < o.length; ++i)
								t[o.charAt(i)] = -1
						}
						var r = [],
							a = 0,
							c = 0;
						for (i = 0; i < n.length; ++i) {
							var l = n.charAt(i);
							if ("=" == l)
								break;
							if (l = t[l],
								-1 != l) {
								if (l === e)
									throw "Illegal character at offset " + i;
								a |= l,
									++c >= 2 ? (r[r.length] = a,
										a = 0,
										c = 0) : a <<= 4
							}
						}
						if (c)
							throw "Hex encoding incomplete: 4 bits missing";
						return r
					},
					window.Hex = n
			}(),
			function(e) {
				"use strict";
				var t, n = {};
				n.decode = function(n) {
						var i;
						if (t === e) {
							var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
								o = "= \f\n\r	 \u2028\u2029";
							for (t = [],
								i = 0; 64 > i; ++i)
								t[s.charAt(i)] = i;
							for (i = 0; i < o.length; ++i)
								t[o.charAt(i)] = -1
						}
						var r = [],
							a = 0,
							c = 0;
						for (i = 0; i < n.length; ++i) {
							var l = n.charAt(i);
							if ("=" == l)
								break;
							if (l = t[l],
								-1 != l) {
								if (l === e)
									throw "Illegal character at offset " + i;
								a |= l,
									++c >= 4 ? (r[r.length] = a >> 16,
										r[r.length] = a >> 8 & 255,
										r[r.length] = 255 & a,
										a = 0,
										c = 0) : a <<= 6
							}
						}
						switch (c) {
							case 1:
								throw "Base64 encoding incomplete: at least 2 bits missing";
							case 2:
								r[r.length] = a >> 10;
								break;
							case 3:
								r[r.length] = a >> 16,
									r[r.length] = a >> 8 & 255
						}
						return r
					},
					n.re =
					/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
					n.unarmor = function(e) {
						var t = n.re.exec(e);
						if (t)
							if (t[1])
								e = t[1];
							else {
								if (!t[2])
									throw "RegExp out of sync";
								e = t[2]
							}
						return n.decode(e)
					},
					window.Base64 = n
			}(),
			function(e) {
				"use strict";

				function t(e, n) {
					e instanceof t ? (this.enc = e.enc,
						this.pos = e.pos) : (this.enc = e,
						this.pos = n)
				}

				function n(e, t, n, i, s) {
					this.stream = e,
						this.header = t,
						this.length = n,
						this.tag = i,
						this.sub = s
				}
				var i = 100,
					s = "…",
					o = {
						tag: function(e, t) {
							var n = document.createElement(e);
							return n.className = t,
								n
						},
						text: function(e) {
							return document.createTextNode(e)
						}
					};
				t.prototype.get = function(t) {
						if (t === e && (t = this.pos++),
							t >= this.enc.length)
							throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
						return this.enc[t]
					},
					t.prototype.hexDigits = "0123456789ABCDEF",
					t.prototype.hexByte = function(e) {
						return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
					},
					t.prototype.hexDump = function(e, t, n) {
						for (var i = "", s = e; t > s; ++s)
							if (i += this.hexByte(this.get(s)),
								n !== !0)
								switch (15 & s) {
									case 7:
										i += "  ";
										break;
									case 15:
										i += "\n";
										break;
									default:
										i += " "
								}
						return i
					},
					t.prototype.parseStringISO = function(e, t) {
						for (var n = "", i = e; t > i; ++i)
							n += String.fromCharCode(this.get(i));
						return n
					},
					t.prototype.parseStringUTF = function(e, t) {
						for (var n = "", i = e; t > i;) {
							var s = this.get(i++);
							n += String.fromCharCode(128 > s ? s : s > 191 && 224 > s ? (31 & s) << 6 | 63 & this.get(i++) : (15 & s) <<
								12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
						}
						return n
					},
					t.prototype.parseStringBMP = function(e, t) {
						for (var n = "", i = e; t > i; i += 2) {
							var s = this.get(i),
								o = this.get(i + 1);
							n += String.fromCharCode((s << 8) + o)
						}
						return n
					},
					t.prototype.reTime =
					/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
					t.prototype.parseTime = function(e, t) {
						var n = this.parseStringISO(e, t),
							i = this.reTime.exec(n);
						return i ? (n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
							i[5] && (n += ":" + i[5],
								i[6] && (n += ":" + i[6],
									i[7] && (n += "." + i[7]))),
							i[8] && (n += " UTC",
								"Z" != i[8] && (n += i[8],
									i[9] && (n += ":" + i[9]))),
							n) : "Unrecognized time: " + n
					},
					t.prototype.parseInteger = function(e, t) {
						var n = t - e;
						if (n > 4) {
							n <<= 3;
							var i = this.get(e);
							if (0 === i)
								n -= 8;
							else
								for (; 128 > i;)
									i <<= 1,
									--n;
							return "(" + n + " bit)"
						}
						for (var s = 0, o = e; t > o; ++o)
							s = s << 8 | this.get(o);
						return s
					},
					t.prototype.parseBitString = function(e, t) {
						var n = this.get(e),
							i = (t - e - 1 << 3) - n,
							s = "(" + i + " bit)";
						if (20 >= i) {
							var o = n;
							s += " ";
							for (var r = t - 1; r > e; --r) {
								for (var a = this.get(r), c = o; 8 > c; ++c)
									s += a >> c & 1 ? "1" : "0";
								o = 0
							}
						}
						return s
					},
					t.prototype.parseOctetString = function(e, t) {
						var n = t - e,
							o = "(" + n + " byte) ";
						n > i && (t = e + i);
						for (var r = e; t > r; ++r)
							o += this.hexByte(this.get(r));
						return n > i && (o += s),
							o
					},
					t.prototype.parseOID = function(e, t) {
						for (var n = "", i = 0, s = 0, o = e; t > o; ++o) {
							var r = this.get(o);
							if (i = i << 7 | 127 & r,
								s += 7,
								!(128 & r)) {
								if ("" === n) {
									var a = 80 > i ? 40 > i ? 0 : 1 : 2;
									n = a + "." + (i - 40 * a)
								} else
									n += "." + (s >= 31 ? "bigint" : i);
								i = s = 0
							}
						}
						return n
					},
					n.prototype.typeName = function() {
						if (this.tag === e)
							return "unknown";
						var t = this.tag >> 6,
							n = (this.tag >> 5 & 1,
								31 & this.tag);
						switch (t) {
							case 0:
								switch (n) {
									case 0:
										return "EOC";
									case 1:
										return "BOOLEAN";
									case 2:
										return "INTEGER";
									case 3:
										return "BIT_STRING";
									case 4:
										return "OCTET_STRING";
									case 5:
										return "NULL";
									case 6:
										return "OBJECT_IDENTIFIER";
									case 7:
										return "ObjectDescriptor";
									case 8:
										return "EXTERNAL";
									case 9:
										return "REAL";
									case 10:
										return "ENUMERATED";
									case 11:
										return "EMBEDDED_PDV";
									case 12:
										return "UTF8String";
									case 16:
										return "SEQUENCE";
									case 17:
										return "SET";
									case 18:
										return "NumericString";
									case 19:
										return "PrintableString";
									case 20:
										return "TeletexString";
									case 21:
										return "VideotexString";
									case 22:
										return "IA5String";
									case 23:
										return "UTCTime";
									case 24:
										return "GeneralizedTime";
									case 25:
										return "GraphicString";
									case 26:
										return "VisibleString";
									case 27:
										return "GeneralString";
									case 28:
										return "UniversalString";
									case 30:
										return "BMPString";
									default:
										return "Universal_" + n.toString(16)
								}
							case 1:
								return "Application_" + n.toString(16);
							case 2:
								return "[" + n + "]";
							case 3:
								return "Private_" + n.toString(16)
						}
					},
					n.prototype.reSeemsASCII = /^[ -~]+$/,
					n.prototype.content = function() {
						if (this.tag === e)
							return null;
						var t = this.tag >> 6,
							n = 31 & this.tag,
							o = this.posContent(),
							r = Math.abs(this.length);
						if (0 !== t) {
							if (null !== this.sub)
								return "(" + this.sub.length + " elem)";
							var a = this.stream.parseStringISO(o, o + Math.min(r, i));
							return this.reSeemsASCII.test(a) ? a.substring(0, 2 * i) + (a.length > 2 * i ? s : "") : this.stream.parseOctetString(
								o, o + r)
						}
						switch (n) {
							case 1:
								return 0 === this.stream.get(o) ? "false" : "true";
							case 2:
								return this.stream.parseInteger(o, o + r);
							case 3:
								return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(o, o + r);
							case 4:
								return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(o, o + r);
							case 6:
								return this.stream.parseOID(o, o + r);
							case 16:
							case 17:
								return "(" + this.sub.length + " elem)";
							case 12:
								return this.stream.parseStringUTF(o, o + r);
							case 18:
							case 19:
							case 20:
							case 21:
							case 22:
							case 26:
								return this.stream.parseStringISO(o, o + r);
							case 30:
								return this.stream.parseStringBMP(o, o + r);
							case 23:
							case 24:
								return this.stream.parseTime(o, o + r)
						}
						return null
					},
					n.prototype.toString = function() {
						return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" +
							(null === this.sub ? "null" : this.sub.length) + "]"
					},
					n.prototype.print = function(t) {
						if (t === e && (t = ""),
							document.writeln(t + this),
							null !== this.sub) {
							t += "  ";
							for (var n = 0, i = this.sub.length; i > n; ++n)
								this.sub[n].print(t)
						}
					},
					n.prototype.toPrettyString = function(t) {
						t === e && (t = "");
						var n = t + this.typeName() + " @" + this.stream.pos;
						if (this.length >= 0 && (n += "+"),
							n += this.length,
							32 & this.tag ? n += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (n +=
								" (encapsulates)"),
							n += "\n",
							null !== this.sub) {
							t += "  ";
							for (var i = 0, s = this.sub.length; s > i; ++i)
								n += this.sub[i].toPrettyString(t)
						}
						return n
					},
					n.prototype.toDOM = function() {
						var e = o.tag("div", "node");
						e.asn1 = this;
						var t = o.tag("div", "head"),
							n = this.typeName().replace(/_/g, " ");
						t.innerHTML = n;
						var i = this.content();
						if (null !== i) {
							i = String(i).replace(/</g, "&lt;");
							var s = o.tag("span", "preview");
							s.appendChild(o.text(i)),
								t.appendChild(s)
						}
						e.appendChild(t),
							this.node = e,
							this.head = t;
						var r = o.tag("div", "value");
						if (n = "Offset: " + this.stream.pos + "<br/>",
							n += "Length: " + this.header + "+",
							n += this.length >= 0 ? this.length : -this.length + " (undefined)",
							32 & this.tag ? n += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (n +=
								"<br/>(encapsulates)"),
							null !== i && (n += "<br/>Value:<br/><b>" + i + "</b>",
								"object" == typeof oids && 6 == this.tag)) {
							var a = oids[i];
							a && (a.d && (n += "<br/>" + a.d),
								a.c && (n += "<br/>" + a.c),
								a.w && (n += "<br/>(warning!)"))
						}
						r.innerHTML = n,
							e.appendChild(r);
						var c = o.tag("div", "sub");
						if (null !== this.sub)
							for (var l = 0, d = this.sub.length; d > l; ++l)
								c.appendChild(this.sub[l].toDOM());
						return e.appendChild(c),
							t.onclick = function() {
								e.className = "node collapsed" == e.className ? "node" : "node collapsed"
							},
							e
					},
					n.prototype.posStart = function() {
						return this.stream.pos
					},
					n.prototype.posContent = function() {
						return this.stream.pos + this.header
					},
					n.prototype.posEnd = function() {
						return this.stream.pos + this.header + Math.abs(this.length)
					},
					n.prototype.fakeHover = function(e) {
						this.node.className += " hover",
							e && (this.head.className += " hover")
					},
					n.prototype.fakeOut = function(e) {
						var t = / ?hover/;
						this.node.className = this.node.className.replace(t, ""),
							e && (this.head.className = this.head.className.replace(t, ""))
					},
					n.prototype.toHexDOM_sub = function(e, t, n, i, s) {
						if (!(i >= s)) {
							var r = o.tag("span", t);
							r.appendChild(o.text(n.hexDump(i, s))),
								e.appendChild(r)
						}
					},
					n.prototype.toHexDOM = function(t) {
						var n = o.tag("span", "hex");
						if (t === e && (t = n),
							this.head.hexNode = n,
							this.head.onmouseover = function() {
								this.hexNode.className = "hexCurrent"
							},
							this.head.onmouseout = function() {
								this.hexNode.className = "hex"
							},
							n.asn1 = this,
							n.onmouseover = function() {
								var e = !t.selected;
								e && (t.selected = this.asn1,
										this.className = "hexCurrent"),
									this.asn1.fakeHover(e)
							},
							n.onmouseout = function() {
								var e = t.selected == this.asn1;
								this.asn1.fakeOut(e),
									e && (t.selected = null,
										this.className = "hex")
							},
							this.toHexDOM_sub(n, "tag", this.stream, this.posStart(), this.posStart() + 1),
							this.toHexDOM_sub(n, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
							null === this.sub)
							n.appendChild(o.text(this.stream.hexDump(this.posContent(), this.posEnd())));
						else if (this.sub.length > 0) {
							var i = this.sub[0],
								s = this.sub[this.sub.length - 1];
							this.toHexDOM_sub(n, "intro", this.stream, this.posContent(), i.posStart());
							for (var r = 0, a = this.sub.length; a > r; ++r)
								n.appendChild(this.sub[r].toHexDOM(t));
							this.toHexDOM_sub(n, "outro", this.stream, s.posEnd(), this.posEnd())
						}
						return n
					},
					n.prototype.toHexString = function() {
						return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
					},
					n.decodeLength = function(e) {
						var t = e.get(),
							n = 127 & t;
						if (n == t)
							return n;
						if (n > 3)
							throw "Length over 24 bits not supported at position " + (e.pos - 1);
						if (0 === n)
							return -1;
						t = 0;
						for (var i = 0; n > i; ++i)
							t = t << 8 | e.get();
						return t
					},
					n.hasContent = function(e, i, s) {
						if (32 & e)
							return !0;
						if (3 > e || e > 4)
							return !1;
						var o = new t(s);
						3 == e && o.get();
						var r = o.get();
						if (r >> 6 & 1)
							return !1;
						try {
							var a = n.decodeLength(o);
							return o.pos - s.pos + a == i
						} catch (c) {
							return !1
						}
					},
					n.decode = function(e) {
						e instanceof t || (e = new t(e, 0));
						var i = new t(e),
							s = e.get(),
							o = n.decodeLength(e),
							r = e.pos - i.pos,
							a = null;
						if (n.hasContent(s, o, e)) {
							var c = e.pos;
							if (3 == s && e.get(),
								a = [],
								o >= 0) {
								for (var l = c + o; e.pos < l;)
									a[a.length] = n.decode(e);
								if (e.pos != l)
									throw "Content size is not correct for container starting at offset " + c
							} else
								try {
									for (;;) {
										var d = n.decode(e);
										if (0 === d.tag)
											break;
										a[a.length] = d
									}
									o = c - e.pos
								} catch (u) {
									throw "Exception while decoding undefined length content: " + u
								}
						} else
							e.pos += o;
						return new n(i, r, o, s, a)
					},
					n.test = function() {
						for (var e = [{
								value: [39],
								expected: 39
							}, {
								value: [129, 201],
								expected: 201
							}, {
								value: [131, 254, 220, 186],
								expected: 16702650
							}], i = 0, s = e.length; s > i; ++i) {
							var o = new t(e[i].value, 0),
								r = n.decodeLength(o);
							r != e[i].expected && document.write("In test[" + i + "] expected " + e[i].expected + " got " + r + "\n")
						}
					},
					window.ASN1 = n
			}(),
			ASN1.prototype.getHexStringValue = function() {
				var e = this.toHexString(),
					t = 2 * this.header,
					n = 2 * this.length;
				return e.substr(t, n)
			},
			pn.prototype.parseKey = function(e) {
				try {
					var t = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
						n = t.test(e) ? Hex.decode(e) : Base64.unarmor(e),
						i = ASN1.decode(n);
					if (9 === i.sub.length) {
						var s = i.sub[1].getHexStringValue();
						this.n = dn(s, 16);
						var o = i.sub[2].getHexStringValue();
						this.e = parseInt(o, 16);
						var r = i.sub[3].getHexStringValue();
						this.d = dn(r, 16);
						var a = i.sub[4].getHexStringValue();
						this.p = dn(a, 16);
						var c = i.sub[5].getHexStringValue();
						this.q = dn(c, 16);
						var l = i.sub[6].getHexStringValue();
						this.dmp1 = dn(l, 16);
						var d = i.sub[7].getHexStringValue();
						this.dmq1 = dn(d, 16);
						var u = i.sub[8].getHexStringValue();
						this.coeff = dn(u, 16)
					} else {
						if (2 !== i.sub.length)
							return !1;
						var p = i.sub[1],
							g = p.sub[0],
							s = g.sub[0].getHexStringValue();
						this.n = dn(s, 16);
						var o = g.sub[1].getHexStringValue();
						this.e = parseInt(o, 16)
					}
					return !0
				} catch (h) {
					return !1
				}
			},
			pn.prototype.getPrivateBaseKey = function() {
				var e = {
						array: [new KJUR.asn1.DERInteger({
							"int": 0
						}), new KJUR.asn1.DERInteger({
							bigint: this.n
						}), new KJUR.asn1.DERInteger({
							"int": this.e
						}), new KJUR.asn1.DERInteger({
							bigint: this.d
						}), new KJUR.asn1.DERInteger({
							bigint: this.p
						}), new KJUR.asn1.DERInteger({
							bigint: this.q
						}), new KJUR.asn1.DERInteger({
							bigint: this.dmp1
						}), new KJUR.asn1.DERInteger({
							bigint: this.dmq1
						}), new KJUR.asn1.DERInteger({
							bigint: this.coeff
						})]
					},
					t = new KJUR.asn1.DERSequence(e);
				return t.getEncodedHex()
			},
			pn.prototype.getPrivateBaseKeyB64 = function() {
				return wn(this.getPrivateBaseKey())
			},
			pn.prototype.getPublicBaseKey = function() {
				var e = {
						array: [new KJUR.asn1.DERObjectIdentifier({
							oid: "1.2.840.113549.1.1.1"
						}), new KJUR.asn1.DERNull]
					},
					t = new KJUR.asn1.DERSequence(e);
				e = {
					array: [new KJUR.asn1.DERInteger({
						bigint: this.n
					}), new KJUR.asn1.DERInteger({
						"int": this.e
					})]
				};
				var n = new KJUR.asn1.DERSequence(e);
				e = {
					hex: "00" + n.getEncodedHex()
				};
				var i = new KJUR.asn1.DERBitString(e);
				e = {
					array: [t, i]
				};
				var s = new KJUR.asn1.DERSequence(e);
				return s.getEncodedHex()
			},
			pn.prototype.getPublicBaseKeyB64 = function() {
				return wn(this.getPublicBaseKey())
			},
			pn.prototype.wordwrap = function(e, t) {
				if (t = t || 64,
					!e)
					return e;
				var n = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
				return e.match(RegExp(n, "g")).join("\n")
			},
			pn.prototype.getPrivateKey = function() {
				var e = "-----BEGIN RSA PRIVATE KEY-----\n";
				return e += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
					e += "-----END RSA PRIVATE KEY-----"
			},
			pn.prototype.getPublicKey = function() {
				var e = "-----BEGIN PUBLIC KEY-----\n";
				return e += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
					e += "-----END PUBLIC KEY-----"
			},
			pn.prototype.hasPublicKeyProperty = function(e) {
				return e = e || {},
					e.hasOwnProperty("n") && e.hasOwnProperty("e")
			},
			pn.prototype.hasPrivateKeyProperty = function(e) {
				return e = e || {},
					e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty(
						"q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
			},
			pn.prototype.parsePropertiesFrom = function(e) {
				this.n = e.n,
					this.e = e.e,
					e.hasOwnProperty("d") && (this.d = e.d,
						this.p = e.p,
						this.q = e.q,
						this.dmp1 = e.dmp1,
						this.dmq1 = e.dmq1,
						this.coeff = e.coeff)
			};
		var Jn = function(e) {
			pn.call(this),
				e && ("string" == typeof e ? this.parseKey(e) : (this.hasPrivateKeyProperty(e) || this.hasPublicKeyProperty(e)) &&
					this.parsePropertiesFrom(e))
		};
		Jn.prototype = new pn,
			Jn.prototype.constructor = Jn;
		var Gn = function(e) {
			e = e || {},
				this.default_key_size = parseInt(e.default_key_size) || 1024,
				this.default_public_exponent = e.default_public_exponent || "010001",
				this.log = e.log || !1,
				this.key = null
		};
		Gn.prototype.setKey = function(e) {
				this.log && this.key && console.warn("A key was already set, overriding existing."),
					this.key = new Jn(e)
			},
			Gn.prototype.setPrivateKey = function(e) {
				this.setKey(e)
			},
			Gn.prototype.setPublicKey = function(e) {
				this.setKey(e)
			},
			Gn.prototype.decrypt = function(e) {
				try {
					return this.getKey().decrypt(Cn(e))
				} catch (t) {
					return !1
				}
			},
			Gn.prototype.encrypt = function(e) {
				try {
					return wn(this.getKey().encrypt(e))
				} catch (t) {
					return !1
				}
			},
			Gn.prototype.getKey = function(e) {
				if (!this.key) {
					if (this.key = new Jn,
						e && "[object Function]" === {}.toString.call(e))
						return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
					this.key.generate(this.default_key_size, this.default_public_exponent)
				}
				return this.key
			},
			Gn.prototype.getPrivateKey = function() {
				return this.getKey().getPrivateKey()
			},
			Gn.prototype.getPrivateKeyB64 = function() {
				return this.getKey().getPrivateBaseKeyB64()
			},
			Gn.prototype.getPublicKey = function() {
				return this.getKey().getPublicKey()
			},
			Gn.prototype.getPublicKeyB64 = function() {
				return this.getKey().getPublicBaseKeyB64()
			},
			e.JSEncrypt = Gn
	}(passport.lib.RSAExport),
	passport.lib.RSA = passport.lib.RSAExport.JSEncrypt;

// url 解析方法
function urlprase(a) {
	return String(a).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(b) {
		return "%" + (256 + b.charCodeAt()).toString(16).substring(1).toUpperCase()
	})
}


function test(pwd) {
	// 从三部曲的位置定义 e.RSA
	var n = new passport.lib.RSA; // n = 实例化的 加密方法,等同于Gn
	n.setKey(
		"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDpm5sKQOivxCFkdQJtPfDtBX4U\nQweH9OmCCjg46jH\/DpuXF3RfEe5dMO99+QskfoI35xymDQyRrvX2iE7bKzxh3sOZ\nI\/vG1SnAEXid0+\/yz1BLbJ9Djaffnx8F2pAKyK2PPk8XvJyOOVZAm6yiRO7VgeOv\nkdXyYoqpokkgrbQkMQIDAQAB\n-----END PUBLIC KEY-----\n"
	);
	return urlprase(n.encrypt(pwd))
}
