var navigator = {};
var sinaSSOEncoder = sinaSSOEncoder || {};
			(function() {
				var a = 0,
					b = 8;
				this.hex_sha1 = function(a) {
					return i(c(h(a), a.length * b))
				};
				var c = function(a, b) {
						a[b >> 5] |= 128 << 24 - b % 32;
						a[(b + 64 >> 9 << 4) + 15] = b;
						var c = Array(80),
							h = 1732584193,
							i = -271733879,
							j = -1732584194,
							k = 271733878,
							l = -1009589776;
						for (var m = 0; m < a.length; m += 16) {
							var n = h,
								o = i,
								p = j,
								q = k,
								r = l;
							for (var s = 0; s < 80; s++) {
								s < 16 ? c[s] = a[m + s] : c[s] = g(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
								var t = f(f(g(h, 5), d(s, i, j, k)), f(f(l, c[s]), e(s)));
								l = k;
								k = j;
								j = g(i, 30);
								i = h;
								h = t
							}
							h = f(h, n);
							i = f(i, o);
							j = f(j, p);
							k = f(k, q);
							l = f(l, r)
						}
						return [h, i, j, k, l]
					},
					d = function(a, b, c, d) {
						return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
					},
					e = function(a) {
						return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
					},
					f = function(a, b) {
						var c = (a & 65535) + (b & 65535),
							d = (a >> 16) + (b >> 16) + (c >> 16);
						return d << 16 | c & 65535
					},
					g = function(a, b) {
						return a << b | a >>> 32 - b
					},
					h = function(a) {
						var c = [],
							d = (1 << b) - 1;
						for (var e = 0; e < a.length * b; e += b)
							c[e >> 5] |= (a.charCodeAt(e / b) & d) << 24 - e % 32;
						return c
					},
					i = function(b) {
						var c = a ? "0123456789ABCDEF" : "0123456789abcdef",
							d = "";
						for (var e = 0; e < b.length * 4; e++)
							d += c.charAt(b[e >> 2] >> (3 - e % 4) * 8 + 4 & 15) + c.charAt(b[e >> 2] >> (3 - e % 4) * 8 & 15);
						return d
					},
					j = function(a) {
						var b = "",
							c = 0;
						for (; c < a.length; c++)
							b += "%" + k(a[c]);
						return decodeURIComponent(b)
					},
					k = function(a) {
						var b = "0" + a.toString(16);
						return b.length <= 2 ? b : b.substr(1)
					};
				this.base64 = {
					encode: function(a) {
						a = "" + a;
						if (a == "")
							return "";
						var b = "",
							c, d, e = "",
							f, g, h, i = "",
							j = 0;
						do {
							c = a.charCodeAt(j++);
							d = a.charCodeAt(j++);
							e = a.charCodeAt(j++);
							f = c >> 2;
							g = (c & 3) << 4 | d >> 4;
							h = (d & 15) << 2 | e >> 6;
							i = e & 63;
							isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64);
							b = b + this._keys.charAt(f) + this._keys.charAt(g) + this._keys.charAt(h) + this._keys.charAt(i);
							c = d = e = "";
							f = g = h = i = ""
						} while (j < a.length);
						return b
					},
					decode: function(a, b, c) {
						var d = function(a, b) {
							for (var c = 0; c < a.length; c++)
								if (a[c] === b)
									return c;
							return -1
						};
						typeof a == "string" && (a = a.split(""));
						var e = [],
							f, g, h = "",
							i, j, k, l = "";
						a.length % 4 == 0;
						var m = /[^A-Za-z0-9+\/=]/,
							n = this._keys.split("");
						if (b == "urlsafe") {
							m = /[^A-Za-z0-9-_=]/;
							n = this._keys_urlsafe.split("")
						}
						if (b == "subp_v2") {
							m = /[^A-Za-z0-9_=-]/;
							n = this._subp_v2_keys.split("")
						}
						if (b == "subp_v3_3") {
							m = /[^A-Za-z0-9-_.-]/;
							n = this._subp_v3_keys_3.split("")
						}
						var o = 0;
						if (b == "binnary") {
							n = [];
							for (o = 0; o <= 64; o++)
								n[o] = o + 128
						}
						if (b != "binnary" && m.test(a.join("")))
							return c == "array" ? [] : "";
						o = 0;
						do {
							i = d(n, a[o++]);
							j = d(n, a[o++]);
							k = d(n, a[o++]);
							l = d(n, a[o++]);
							f = i << 2 | j >> 4;
							g = (j & 15) << 4 | k >> 2;
							h = (k & 3) << 6 | l;
							e.push(f);
							k != 64 && k != -1 && e.push(g);
							l != 64 && l != -1 && e.push(h);
							f = g = h = "";
							i = j = k = l = ""
						} while (o < a.length);
						if (c == "array")
							return e;
						var p = "",
							q = 0;
						for (; q < e.lenth; q++)
							p += String.fromCharCode(e[q]);
						return p
					},
					_keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					_keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
					_subp_v2_keys: "uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=",
					_subp_v3_keys_3: "5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t"
				};
				this.Cookie = {
					decode: function(a) {
						var b = [],
							c = a.substr(0, 3),
							d = a.substr(3);
						switch (c) {
							case "v01":
								for (var e = 0; e < d.length; e += 2)
									b.push(parseInt(d.substr(e, 2), 16));
								return decodeURIComponent(j(sinaSSOEncoder.base64.decode(b, "binnary", "array")));
							case "v02":
								d = d.replace(/\./g, "=");
								b = sinaSSOEncoder.base64.decode(d, "urlsafe", "array");
								return j(sinaSSOEncoder.base64.decode(b, "binnary", "array"));
							default:
								return decodeURIComponent(a)
						}
					}
				};
				this.getSUBPCookie = {
					__parse: function(a) {
						var b, c, d, e, f, g = 0,
							h, i = {},
							k = "",
							l = "";
						if (!a)
							return i;
						do {
							c = a[g];
							b = ++g;
							for (h = g; h < c + b; h++,
								g++)
								k += String.fromCharCode(a[h]);
							e = a[g];
							b = ++g;
							if (k == "status" || k == "flag")
								for (h = g; h < e + b; h++,
									g++)
									l += a[h];
							else {
								l = a.slice(b, e + b);
								try {
									l = j(l)
								} catch (m) {
									l = ""
								}
								g += e
							}
							i[k] = l;
							k = "";
							l = ""
						} while (g < a.length);
						return i
					},
					decode: function(a) {
						var b = [],
							c, d = a.substr(0, 3),
							e = decodeURIComponent(a.substr(3));
						switch (d) {
							case "002":
								b = sinaSSOEncoder.base64.decode(e, "subp_v2", "array");
								return sinaSSOEncoder.getSUBPCookie.__parse(b);
							case "003":
								c = e.substr(0, 1);
								e = e.substr(1);
								b = sinaSSOEncoder.base64.decode(e, "subp_v3_" + c, "array");
								return sinaSSOEncoder.getSUBPCookie.__parse(b);
							default:
								return decodeURIComponent(a)
						}
					}
				}
			}).call(sinaSSOEncoder);
			(function() {
				function bt(a) {
					var b = bp(a, this.n.bitLength() + 7 >> 3);
					if (b == null)
						return null;
					var c = this.doPublic(b);
					if (c == null)
						return null;
					var d = c.toString(16);
					return (d.length & 1) == 0 ? d : "0" + d
				}

				function bs(a) {
					return a.modPowInt(this.e, this.n)
				}

				function br(a, b) {
					if (a != null && b != null && a.length > 0 && b.length > 0) {
						this.n = bm(a, 16);
						this.e = parseInt(b, 16)
					} else
						alert("Invalid RSA public key")
				}

				function bq() {
					this.n = null;
					this.e = 0;
					this.d = null;
					this.p = null;
					this.q = null;
					this.dmp1 = null;
					this.dmq1 = null;
					this.coeff = null
				}

				function bp(a, b) {
					if (b < a.length + 11) {
						alert("Message too long for RSA");
						return null
					}
					var c = [],
						e = a.length - 1;
					while (e >= 0 && b > 0) {
						var f = a.charCodeAt(e--);
						if (f < 128)
							c[--b] = f;
						else if (f > 127 && f < 2048) {
							c[--b] = f & 63 | 128;
							c[--b] = f >> 6 | 192
						} else {
							c[--b] = f & 63 | 128;
							c[--b] = f >> 6 & 63 | 128;
							c[--b] = f >> 12 | 224
						}
					}
					c[--b] = 0;
					var g = new bl,
						h = [];
					while (b > 2) {
						h[0] = 0;
						while (h[0] == 0)
							g.nextBytes(h);
						c[--b] = h[0]
					}
					c[--b] = 2;
					c[--b] = 0;
					return new d(c)
				}

				function bo(a) {
					return a < 16 ? "0" + a.toString(16) : a.toString(16)
				}

				function bn(a, b) {
					var c = "",
						d = 0;
					while (d + b < a.length) {
						c += a.substring(d, d + b) + "\n";
						d += b
					}
					return c + a.substring(d, a.length)
				}

				function bm(a, b) {
					return new d(a, b)
				}

				function bl() {}

				function bk(a) {
					var b;
					for (b = 0; b < a.length; ++b)
						a[b] = bj()
				}

				function bj() {
					if (bc == null) {
						bg();
						bc = ba();
						bc.init(bd);
						for (be = 0; be < bd.length; ++be)
							bd[be] = 0;
						be = 0
					}
					return bc.next()
				}

				function bg() {
					bf((new Date).getTime())
				}

				function bf(a) {
					bd[be++] ^= a & 255;
					bd[be++] ^= a >> 8 & 255;
					bd[be++] ^= a >> 16 & 255;
					bd[be++] ^= a >> 24 & 255;
					be >= bb && (be -= bb)
				}

				function ba() {
					return new Z
				}

				function _() {
					var a;
					this.i = this.i + 1 & 255;
					this.j = this.j + this.S[this.i] & 255;
					a = this.S[this.i];
					this.S[this.i] = this.S[this.j];
					this.S[this.j] = a;
					return this.S[a + this.S[this.i] & 255]
				}

				function $(a) {
					var b, c, d;
					for (b = 0; b < 256; ++b)
						this.S[b] = b;
					c = 0;
					for (b = 0; b < 256; ++b) {
						c = c + this.S[b] + a[b % a.length] & 255;
						d = this.S[b];
						this.S[b] = this.S[c];
						this.S[c] = d
					}
					this.i = 0;
					this.j = 0
				}

				function Z() {
					this.i = 0;
					this.j = 0;
					this.S = []
				}

				function Y(a, b) {
					var c;
					a < 256 || b.isEven() ? c = new J(b) : c = new Q(b);
					return this.exp(a, c)
				}

				function X(a, b) {
					if (a > 4294967295 || a < 1)
						return d.ONE;
					var c = e(),
						f = e(),
						g = b.convert(this),
						h = y(a) - 1;
					g.copyTo(c);
					while (--h >= 0) {
						b.sqrTo(c, f);
						if ((a & 1 << h) > 0)
							b.mulTo(f, g, c);
						else {
							var i = c;
							c = f;
							f = i
						}
					}
					return b.revert(c)
				}

				function W() {
					return (this.t > 0 ? this[0] & 1 : this.s) == 0
				}

				function V(a, b, c) {
					a.multiplyTo(b, c);
					this.reduce(c)
				}

				function U(a, b) {
					a.squareTo(b);
					this.reduce(b)
				}

				function T(a) {
					while (a.t <= this.mt2)
						a[a.t++] = 0;
					for (var b = 0; b < this.m.t; ++b) {
						var c = a[b] & 32767,
							d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
						c = b + this.m.t;
						a[c] += this.m.am(0, d, a, b, 0, this.m.t);
						while (a[c] >= a.DV) {
							a[c] -= a.DV;
							a[++c]++
						}
					}
					a.clamp();
					a.drShiftTo(this.m.t, a);
					a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
				}

				function S(a) {
					var b = e();
					a.copyTo(b);
					this.reduce(b);
					return b
				}

				function R(a) {
					var b = e();
					a.abs().dlShiftTo(this.m.t, b);
					b.divRemTo(this.m, null, b);
					a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b);
					return b
				}

				function Q(a) {
					this.m = a;
					this.mp = a.invDigit();
					this.mpl = this.mp & 32767;
					this.mph = this.mp >> 15;
					this.um = (1 << a.DB - 15) - 1;
					this.mt2 = 2 * a.t
				}

				function P() {
					if (this.t < 1)
						return 0;
					var a = this[0];
					if ((a & 1) == 0)
						return 0;
					var b = a & 3;
					b = b * (2 - (a & 15) * b) & 15;
					b = b * (2 - (a & 255) * b) & 255;
					b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
					b = b * (2 - a * b % this.DV) % this.DV;
					return b > 0 ? this.DV - b : -b
				}

				function O(a, b) {
					a.squareTo(b);
					this.reduce(b)
				}

				function N(a, b, c) {
					a.multiplyTo(b, c);
					this.reduce(c)
				}

				function M(a) {
					a.divRemTo(this.m, null, a)
				}

				function L(a) {
					return a
				}

				function K(a) {
					return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
				}

				function J(a) {
					this.m = a
				}

				function I(a) {
					var b = e();
					this.abs().divRemTo(a, null, b);
					this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b);
					return b
				}

				function H(a, b, c) {
					var f = a.abs();
					if (!(f.t <= 0)) {
						var g = this.abs();
						if (g.t < f.t) {
							b != null && b.fromInt(0);
							c != null && this.copyTo(c);
							return
						}
						c == null && (c = e());
						var h = e(),
							i = this.s,
							j = a.s,
							k = this.DB - y(f[f.t - 1]);
						if (k > 0) {
							f.lShiftTo(k, h);
							g.lShiftTo(k, c)
						} else {
							f.copyTo(h);
							g.copyTo(c)
						}
						var l = h.t,
							m = h[l - 1];
						if (m == 0)
							return;
						var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0),
							o = this.FV / n,
							p = (1 << this.F1) / n,
							q = 1 << this.F2,
							r = c.t,
							s = r - l,
							t = b == null ? e() : b;
						h.dlShiftTo(s, t);
						if (c.compareTo(t) >= 0) {
							c[c.t++] = 1;
							c.subTo(t, c)
						}
						d.ONE.dlShiftTo(l, t);
						t.subTo(h, h);
						while (h.t < l)
							h[h.t++] = 0;
						while (--s >= 0) {
							var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
							if ((c[r] += h.am(0, u, c, s, 0, l)) < u) {
								h.dlShiftTo(s, t);
								c.subTo(t, c);
								while (c[r] < --u)
									c.subTo(t, c)
							}
						}
						if (b != null) {
							c.drShiftTo(l, b);
							i != j && d.ZERO.subTo(b, b)
						}
						c.t = l;
						c.clamp();
						k > 0 && c.rShiftTo(k, c);
						i < 0 && d.ZERO.subTo(c, c)
					}
				}

				function G(a) {
					var b = this.abs(),
						c = a.t = 2 * b.t;
					while (--c >= 0)
						a[c] = 0;
					for (c = 0; c < b.t - 1; ++c) {
						var d = b.am(c, b[c], a, 2 * c, 0, 1);
						if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
							a[c + b.t] -= b.DV;
							a[c + b.t + 1] = 1
						}
					}
					a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
					a.s = 0;
					a.clamp()
				}

				function F(a, b) {
					var c = this.abs(),
						e = a.abs(),
						f = c.t;
					b.t = f + e.t;
					while (--f >= 0)
						b[f] = 0;
					for (f = 0; f < e.t; ++f)
						b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
					b.s = 0;
					b.clamp();
					this.s != a.s && d.ZERO.subTo(b, b)
				}

				function E(a, b) {
					var c = 0,
						d = 0,
						e = Math.min(a.t, this.t);
					while (c < e) {
						d += this[c] - a[c];
						b[c++] = d & this.DM;
						d >>= this.DB
					}
					if (a.t < this.t) {
						d -= a.s;
						while (c < this.t) {
							d += this[c];
							b[c++] = d & this.DM;
							d >>= this.DB
						}
						d += this.s
					} else {
						d += this.s;
						while (c < a.t) {
							d -= a[c];
							b[c++] = d & this.DM;
							d >>= this.DB
						}
						d -= a.s
					}
					b.s = d < 0 ? -1 : 0;
					d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
					b.t = c;
					b.clamp()
				}

				function D(a, b) {
					b.s = this.s;
					var c = Math.floor(a / this.DB);
					if (c >= this.t)
						b.t = 0;
					else {
						var d = a % this.DB,
							e = this.DB - d,
							f = (1 << d) - 1;
						b[0] = this[c] >> d;
						for (var g = c + 1; g < this.t; ++g) {
							b[g - c - 1] |= (this[g] & f) << e;
							b[g - c] = this[g] >> d
						}
						d > 0 && (b[this.t - c - 1] |= (this.s & f) << e);
						b.t = this.t - c;
						b.clamp()
					}
				}

				function C(a, b) {
					var c = a % this.DB,
						d = this.DB - c,
						e = (1 << d) - 1,
						f = Math.floor(a / this.DB),
						g = this.s << c & this.DM,
						h;
					for (h = this.t - 1; h >= 0; --h) {
						b[h + f + 1] = this[h] >> d | g;
						g = (this[h] & e) << c
					}
					for (h = f - 1; h >= 0; --h)
						b[h] = 0;
					b[f] = g;
					b.t = this.t + f + 1;
					b.s = this.s;
					b.clamp()
				}

				function B(a, b) {
					for (var c = a; c < this.t; ++c)
						b[c - a] = this[c];
					b.t = Math.max(this.t - a, 0);
					b.s = this.s
				}

				function A(a, b) {
					var c;
					for (c = this.t - 1; c >= 0; --c)
						b[c + a] = this[c];
					for (c = a - 1; c >= 0; --c)
						b[c] = 0;
					b.t = this.t + a;
					b.s = this.s
				}

				function z() {
					return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
				}

				function y(a) {
					var b = 1,
						c;
					if ((c = a >>> 16) != 0) {
						a = c;
						b += 16
					}
					if ((c = a >> 8) != 0) {
						a = c;
						b += 8
					}
					if ((c = a >> 4) != 0) {
						a = c;
						b += 4
					}
					if ((c = a >> 2) != 0) {
						a = c;
						b += 2
					}
					if ((c = a >> 1) != 0) {
						a = c;
						b += 1
					}
					return b
				}

				function x(a) {
					var b = this.s - a.s;
					if (b != 0)
						return b;
					var c = this.t;
					b = c - a.t;
					if (b != 0)
						return b;
					while (--c >= 0)
						if ((b = this[c] - a[c]) != 0)
							return b;
					return 0
				}

				function w() {
					return this.s < 0 ? this.negate() : this
				}

				function v() {
					var a = e();
					d.ZERO.subTo(this, a);
					return a
				}

				function u(a) {
					if (this.s < 0)
						return "-" + this.negate().toString(a);
					var b;
					if (a == 16)
						b = 4;
					else if (a == 8)
						b = 3;
					else if (a == 2)
						b = 1;
					else if (a == 32)
						b = 5;
					else if (a == 4)
						b = 2;
					else
						return this.toRadix(a);
					var c = (1 << b) - 1,
						d, e = !1,
						f = "",
						g = this.t,
						h = this.DB - g * this.DB % b;
					if (g-- > 0) {
						if (h < this.DB && (d = this[g] >> h) > 0) {
							e = !0;
							f = n(d)
						}
						while (g >= 0) {
							if (h < b) {
								d = (this[g] & (1 << h) - 1) << b - h;
								d |= this[--g] >> (h += this.DB - b)
							} else {
								d = this[g] >> (h -= b) & c;
								if (h <= 0) {
									h += this.DB;
									--g
								}
							}
							d > 0 && (e = !0);
							e && (f += n(d))
						}
					}
					return e ? f : "0"
				}

				function t() {
					var a = this.s & this.DM;
					while (this.t > 0 && this[this.t - 1] == a)
						--this.t
				}

				function s(a, b) {
					var c;
					if (b == 16)
						c = 4;
					else if (b == 8)
						c = 3;
					else if (b == 256)
						c = 8;
					else if (b == 2)
						c = 1;
					else if (b == 32)
						c = 5;
					else if (b == 4)
						c = 2;
					else {
						this.fromRadix(a, b);
						return
					}
					this.t = 0;
					this.s = 0;
					var e = a.length,
						f = !1,
						g = 0;
					while (--e >= 0) {
						var h = c == 8 ? a[e] & 255 : o(a, e);
						if (h < 0) {
							a.charAt(e) == "-" && (f = !0);
							continue
						}
						f = !1;
						if (g == 0)
							this[this.t++] = h;
						else if (g + c > this.DB) {
							this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g;
							this[this.t++] = h >> this.DB - g
						} else
							this[this.t - 1] |= h << g;
						g += c;
						g >= this.DB && (g -= this.DB)
					}
					if (c == 8 && (a[0] & 128) != 0) {
						this.s = -1;
						g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)
					}
					this.clamp();
					f && d.ZERO.subTo(this, this)
				}

				function r(a) {
					var b = e();
					b.fromInt(a);
					return b
				}

				function q(a) {
					this.t = 1;
					this.s = a < 0 ? -1 : 0;
					a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
				}

				function p(a) {
					for (var b = this.t - 1; b >= 0; --b)
						a[b] = this[b];
					a.t = this.t;
					a.s = this.s
				}

				function o(a, b) {
					var c = k[a.charCodeAt(b)];
					return c == null ? -1 : c
				}

				function n(a) {
					return j.charAt(a)
				}

				function h(a, b, c, d, e, f) {
					var g = b & 16383,
						h = b >> 14;
					while (--f >= 0) {
						var i = this[a] & 16383,
							j = this[a++] >> 14,
							k = h * i + j * g;
						i = g * i + ((k & 16383) << 14) + c[d] + e;
						e = (i >> 28) + (k >> 14) + h * j;
						c[d++] = i & 268435455
					}
					return e
				}

				function g(a, b, c, d, e, f) {
					var g = b & 32767,
						h = b >> 15;
					while (--f >= 0) {
						var i = this[a] & 32767,
							j = this[a++] >> 15,
							k = h * i + j * g;
						i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
						e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
						c[d++] = i & 1073741823
					}
					return e
				}

				function f(a, b, c, d, e, f) {
					while (--f >= 0) {
						var g = b * this[a++] + c[d] + e;
						e = Math.floor(g / 67108864);
						c[d++] = g & 67108863
					}
					return e
				}

				function e() {
					return new d(null)
				}

				function d(a, b, c) {
					a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(
						a, 256) : this.fromString(a, b))
				}
				var a, b = 0xdeadbeefcafe,
					c = (b & 16777215) == 15715070;
				if (c && navigator.appName == "Microsoft Internet Explorer") {
					d.prototype.am = g;
					a = 30
				} else if (c && navigator.appName != "Netscape") {
					d.prototype.am = f;
					a = 26
				} else {
					d.prototype.am = h;
					a = 28
				}
				d.prototype.DB = a;
				d.prototype.DM = (1 << a) - 1;
				d.prototype.DV = 1 << a;
				var i = 52;
				d.prototype.FV = Math.pow(2, i);
				d.prototype.F1 = i - a;
				d.prototype.F2 = 2 * a - i;
				var j = "0123456789abcdefghijklmnopqrstuvwxyz",
					k = [],
					l, m;
				l = "0".charCodeAt(0);
				for (m = 0; m <= 9; ++m)
					k[l++] = m;
				l = "a".charCodeAt(0);
				for (m = 10; m < 36; ++m)
					k[l++] = m;
				l = "A".charCodeAt(0);
				for (m = 10; m < 36; ++m)
					k[l++] = m;
				J.prototype.convert = K;
				J.prototype.revert = L;
				J.prototype.reduce = M;
				J.prototype.mulTo = N;
				J.prototype.sqrTo = O;
				Q.prototype.convert = R;
				Q.prototype.revert = S;
				Q.prototype.reduce = T;
				Q.prototype.mulTo = V;
				Q.prototype.sqrTo = U;
				d.prototype.copyTo = p;
				d.prototype.fromInt = q;
				d.prototype.fromString = s;
				d.prototype.clamp = t;
				d.prototype.dlShiftTo = A;
				d.prototype.drShiftTo = B;
				d.prototype.lShiftTo = C;
				d.prototype.rShiftTo = D;
				d.prototype.subTo = E;
				d.prototype.multiplyTo = F;
				d.prototype.squareTo = G;
				d.prototype.divRemTo = H;
				d.prototype.invDigit = P;
				d.prototype.isEven = W;
				d.prototype.exp = X;
				d.prototype.toString = u;
				d.prototype.negate = v;
				d.prototype.abs = w;
				d.prototype.compareTo = x;
				d.prototype.bitLength = z;
				d.prototype.mod = I;
				d.prototype.modPowInt = Y;
				d.ZERO = r(0);
				d.ONE = r(1);
				Z.prototype.init = $;
				Z.prototype.next = _;
				var bb = 256,
					bc, bd, be;
				if (bd == null) {
					bd = [];
					be = 0;
					var bh;
					if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof window.crypto.random ==
						"function") {
						var bi = window.crypto.random(32);
						for (bh = 0; bh < bi.length; ++bh)
							bd[be++] = bi.charCodeAt(bh) & 255
					}
					while (be < bb) {
						bh = Math.floor(65536 * Math.random());
						bd[be++] = bh >>> 8;
						bd[be++] = bh & 255
					}
					be = 0;
					bg()
				}
				bl.prototype.nextBytes = bk;
				bq.prototype.doPublic = bs;
				bq.prototype.setPublic = br;
				bq.prototype.encrypt = bt;
				this.RSAKey = bq
			}).call(sinaSSOEncoder);
			var me = {};

			function get_up(pwd,publickey,time,nonce) {
				var f = new sinaSSOEncoder.RSAKey;
				// f.setPublic("EB2A38568661887FA180BDDB5CABD5F21C7BFD59C090CB2D245A87AC253062882729293E5506350508E7F9AA3BB77F4333231490F915F6D63C55FE2F08A49B353F444AD3993CACC02DB784ABBB8E42A9B1BBFFFB38BE18D78E87A0E41B9B8F73A928EE0CCEE1F6739884B9777E4FE9E88A1BBE495927AC4A799B3181D6442443", "10001");
				// b = f.encrypt([1574248301, "PN9UV0"].join("\t") + "\n" + '123456')
                f.setPublic(publickey, "10001");
			    b = f.encrypt([time, nonce].join("\t") + "\n" + pwd)
				return b
			}