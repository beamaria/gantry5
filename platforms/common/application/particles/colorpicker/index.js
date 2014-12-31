/*! colorPicker - v1.0.0 2014-10-14 */

var Colorpicker = {};

!function(a, b) {
    "use strict";
    function c(a, c, d, f, g) {
        if ("string" == typeof c) {
            var c = u.txt2color(c);
            d = c.type, n[d] = c[d], g = g !== b ? g : c.alpha
        } else if (c)for (var h in c)a[d][h] = k(c[h] / l[d][h][1], 0, 1);
        return g !== b && (a.alpha = +g), e(d, f ? a : b)
    }

    function d(a, b, c) {
        var d = m.options.grey, e = {};
        return e.RGB = {
            r: a.r,
            g: a.g,
            b: a.b
        }, e.rgb = {
            r: b.r,
            g: b.g,
            b: b.b
        }, e.alpha = c, e.equivalentGrey = Math.round(d.r * a.r + d.g * a.g + d.b * a.b), e.rgbaMixBlack = i(b, {
            r: 0,
            g: 0,
            b: 0
        }, c, 1), e.rgbaMixWhite = i(b, {
            r: 1,
            g: 1,
            b: 1
        }, c, 1), e.rgbaMixBlack.luminance = h(e.rgbaMixBlack, !0), e.rgbaMixWhite.luminance = h(e.rgbaMixWhite, !0), m.options.customBG && (e.rgbaMixCustom = i(b, m.options.customBG, c, 1), e.rgbaMixCustom.luminance = h(e.rgbaMixCustom, !0), m.options.customBG.luminance = h(m.options.customBG, !0)), e
    }

    function e(a, b) {
        var c, e, k, o = b || n, p = u, q = m.options, r = l, s = o.RND, t = "", v = "", w = {
            hsl: "hsv",
            cmyk: "cmy",
            rgb: a
        }, x = s.rgb;
        if ("alpha" !== a) {
            for (var y in r)if (!r[y][y]) {
                a !== y && "XYZ" !== y && (v = w[y] || "rgb", o[y] = p[v + "2" + y](o[v])), s[y] || (s[y] = {}), c = o[y];
                for (t in c)s[y][t] = Math.round(c[t] * ("Lab" === y ? 1 : r[y][t][1]))
            }
            "Lab" !== a && delete o._rgb, x = s.rgb, o.HEX = p.RGB2HEX(x), o.equivalentGrey = q.grey.r * o.rgb.r + q.grey.g * o.rgb.g + q.grey.b * o.rgb.b, o.webSave = e = f(x, 51), o.webSmart = k = f(x, 17), o.saveColor = x.r === e.r && x.g === e.g && x.b === e.b ? "web save" : x.r === k.r && x.g === k.g && x.b === k.b ? "web smart" : "", o.hueRGB = u.hue2RGB(o.hsv.h), b && (o.background = d(x, o.rgb, o.alpha))
        }
        var z, A, B, C, D, E, F, G = o.rgb, H = o.alpha, I = "luminance", J = o.background;
        return z = i(G, {
            r: 0,
            g: 0,
            b: 0
        }, H, 1), z[I] = h(z, !0), o.rgbaMixBlack = z, A = i(G, {
            r: 1,
            g: 1,
            b: 1
        }, H, 1), A[I] = h(A, !0), o.rgbaMixWhite = A, q.allMixDetails && (z.WCAG2Ratio = j(z[I], 0), A.WCAG2Ratio = j(A[I], 1), q.customBG && (B = i(G, q.customBG, H, 1), B[I] = h(B, !0), B.WCAG2Ratio = j(B[I], q.customBG[I]), o.rgbaMixCustom = B), C = i(G, J.rgb, H, J.alpha), C[I] = h(C, !0), o.rgbaMixBG = C, D = i(G, J.rgbaMixBlack, H, 1), D[I] = h(D, !0), D.WCAG2Ratio = j(D[I], J.rgbaMixBlack[I]), D.luminanceDelta = Math.abs(D[I] - J.rgbaMixBlack[I]), D.hueDelta = g(J.rgbaMixBlack, D, !0), o.rgbaMixBGMixBlack = D, E = i(G, J.rgbaMixWhite, H, 1), E[I] = h(E, !0), E.WCAG2Ratio = j(E[I], J.rgbaMixWhite[I]), E.luminanceDelta = Math.abs(E[I] - J.rgbaMixWhite[I]), E.hueDelta = g(J.rgbaMixWhite, E, !0), o.rgbaMixBGMixWhite = E), q.customBG && (F = i(G, J.rgbaMixCustom, H, 1), F[I] = h(F, !0), F.WCAG2Ratio = j(F[I], J.rgbaMixCustom[I]), o.rgbaMixBGMixCustom = F, F.luminanceDelta = Math.abs(F[I] - J.rgbaMixCustom[I]), F.hueDelta = g(J.rgbaMixCustom, F, !0)), o.RGBLuminance = h(x), o.HUELuminance = h(o.hueRGB), q.convertCallback && q.convertCallback(o, a), o
    }

    function f(a, b) {
        var c = {}, d = 0, e = b / 2;
        for (var f in a)d = a[f] % b, c[f] = a[f] + (d > e ? b - d : -d);
        return c
    }

    function g(a, b, c) {return (Math.max(a.r - b.r, b.r - a.r) + Math.max(a.g - b.g, b.g - a.g) + Math.max(a.b - b.b, b.b - a.b)) * (c ? 255 : 1) / 765}

    function h(a, b) {
        for (var c = b ? 1 : 255, d = [a.r / c, a.g / c, a.b / c], e = m.options.luminance, f = d.length; f--;)d[f] = d[f] <= .03928 ? d[f] / 12.92 : Math.pow((d[f] + .055) / 1.055, 2.4);
        return e.r * d[0] + e.g * d[1] + e.b * d[2]
    }

    function i(a, c, d, e) {
        var f = {}, g = d !== b ? d : 1, h = e !== b ? e : 1, i = g + h * (1 - g);
        for (var j in a)f[j] = (a[j] * g + c[j] * h * (1 - g)) / i;
        return f.a = i, f
    }

    function j(a, b) {
        var c = 1;
        return c = a >= b ? (a + .05) / (b + .05) : (b + .05) / (a + .05), Math.round(100 * c) / 100
    }

    function k(a, b, c) {return a > c ? c : b > a ? b : a}

    var l = {
        rgb: {
            r: [0, 255],
            g: [0, 255],
            b: [0, 255]
        },
        hsv: {
            h: [0, 360],
            s: [0, 100],
            v: [0, 100]
        },
        hsl: {
            h: [0, 360],
            s: [0, 100],
            l: [0, 100]
        },
        cmy: {
            c: [0, 100],
            m: [0, 100],
            y: [0, 100]
        },
        cmyk: {
            c: [0, 100],
            m: [0, 100],
            y: [0, 100],
            k: [0, 100]
        },
        Lab: {
            L: [0, 100],
            a: [-128, 127],
            b: [-128, 127]
        },
        XYZ: {
            X: [0, 100],
            Y: [0, 100],
            Z: [0, 100]
        },
        alpha: { alpha: [0, 1] },
        HEX: { HEX: [0, 16777215] }
    }, m = {}, n = {}, o = {
        X: [.4124564, .3575761, .1804375],
        Y: [.2126729, .7151522, .072175],
        Z: [.0193339, .119192, .9503041],
        R: [3.2404542, -1.5371385, -.4985314],
        G: [-.969266, 1.8760108, .041556],
        B: [.0556434, -.2040259, 1.0572252]
    }, p = {
        r: .298954,
        g: .586434,
        b: .114612
    }, q = {
        r: .2126,
        g: .7152,
        b: .0722
    }, r = a.Colors = function(a) {
        this.colors = { RND: {} }, this.options = {
            color: "rgba(204, 82, 37, 0.8)",
            XYZMatrix: o,
            grey: p,
            luminance: q,
            valueRanges: l
        }, s(this, a || {})
    }, s = function(a, d) {
        var e, f, g = a.options;
        t(a);
        for (var h in d)d[h] !== b && (g[h] = d[h]);
        e = g.XYZMatrix, d.XYZReference || (g.XYZReference = {
            X: e.X[0] + e.X[1] + e.X[2],
            Y: e.Y[0] + e.Y[1] + e.Y[2],
            Z: e.Z[0] + e.Z[1] + e.Z[2]
        }), f = g.customBG, g.customBG = "string" == typeof f ? u.txt2color(f).rgb : f, n = c(a.colors, g.color, b, !0)
    }, t = function(a) {m !== a && (m = a, n = a.colors)};
    r.prototype.setColor = function(a, d, f) {return t(this), a ? c(this.colors, a, d, b, f) : (f !== b && (this.colors.alpha = f), e(d))}, r.prototype.getColor = function(a) {
        var c = this.colors, d = 0;
        if (a) {
            for (a = a.split("."); c[a[d]];)c = c[a[d++]];
            a.length !== d && (c = b)
        }
        return c
    }, r.prototype.setCustomBackground = function(a) {return t(this), this.options.customBG = "string" == typeof a ? u.txt2color(a).rgb : a, c(this.colors, b, "rgb")}, r.prototype.saveAsBackground = function() {return t(this), c(this.colors, b, "rgb", !0)}, r.prototype.convertColor = function(a, b) {
        var c = u, d = l, e = b.split("2"), f = e[0], g = e[1], h = /(?:RG|HS|CM|LA)/, i = h.test(f), j = h.test(g), k = { LAB: "Lab" }, m = function(a, b, c) {
            var e = {}, f = "Lab" === b ? 1 : 0;
            for (var g in a)e[g] = c ? Math.round(a[g] * (f || d[b][g][1])) : a[g] / (f || d[b][g][1]);
            return e
        };
        return f = d[f] ? f : k[f] || f.toLowerCase(), g = d[g] ? g : k[g] || g.toLowerCase(), i && "RGB2HEX" !== b && (a = m(a, f)), a = f === g ? a : c[f + "2" + g] ? c[f + "2" + g](a, !0) : "HEX" === g ? c.RGB2HEX("RGB2HEX" === b ? a : m("rgb" === f ? a : c[f + "2rgb"](a, !0), "rgb", !0)) : c["rgb2" + g](c[f + "2rgb"](a, !0), !0), j && (a = m(a, g, !0)), a
    };
    var u = {
        txt2color: function(a) {
            var b = {}, c = a.replace(/(?:#|\)|%)/g, "").split("("), d = (c[1] || "").split(/,\s*/), e = c[1] ? c[0].substr(0, 3) : "rgb", f = "";
            if (b.type = e, b[e] = {}, c[1])for (var g = 3; g--;)f = e[g] || e.charAt(g), b[e][f] = +d[g] / l[e][f][1]; else b.rgb = u.HEX2rgb(c[0]);
            return b.alpha = d[3] ? +d[3] : 1, b
        },
        RGB2HEX: function(a) {return ((a.r < 16 ? "0" : "") + a.r.toString(16) + (a.g < 16 ? "0" : "") + a.g.toString(16) + (a.b < 16 ? "0" : "") + a.b.toString(16)).toUpperCase()},
        HEX2rgb: function(a) {
            return a = a.split(""), {
                r: parseInt(a[0] + a[a[3] ? 1 : 0], 16) / 255,
                g: parseInt(a[a[3] ? 2 : 1] + (a[3] || a[1]), 16) / 255,
                b: parseInt((a[4] || a[2]) + (a[5] || a[2]), 16) / 255
            }
        },
        hue2RGB: function(a) {
            var b = 6 * a, c = ~~b % 6, d = 6 === b ? 0 : b - c;
            return {
                r: Math.round(255 * [1, 1 - d, 0, 0, d, 1][c]),
                g: Math.round(255 * [d, 1, 1, 1 - d, 0, 0][c]),
                b: Math.round(255 * [0, 0, d, 1, 1, 1 - d][c])
            }
        },
        rgb2hsv: function(a) {
            var b, c, d, e = a.r, f = a.g, g = a.b, h = 0;
            return g > f && (f = g + (g = f, 0), h = -1), c = g, f > e && (e = f + (f = e, 0), h = -2 / 6 - h, c = Math.min(f, g)), b = e - c, d = e ? b / e : 0, {
                h: 1e-15 > d ? n && n.hsl && n.hsl.h || 0 : b ? Math.abs(h + (f - g) / (6 * b)) : 0,
                s: e ? b / e : n && n.hsv && n.hsv.s || 0,
                v: e
            }
        },
        hsv2rgb: function(a) {
            var b = 6 * a.h, c = a.s, d = a.v, e = ~~b, f = b - e, g = d * (1 - c), h = d * (1 - f * c), i = d * (1 - (1 - f) * c), j = e % 6;
            return {
                r: [d, h, g, g, i, d][j],
                g: [i, d, d, h, g, g][j],
                b: [g, g, i, d, d, h][j]
            }
        },
        hsv2hsl: function(a) {
            var b = (2 - a.s) * a.v, c = a.s * a.v;
            return c = a.s ? 1 > b ? b ? c / b : 0 : c / (2 - b) : 0, {
                h: a.h,
                s: a.v || c ? c : n && n.hsl && n.hsl.s || 0,
                l: b / 2
            }
        },
        rgb2hsl: function(a, b) {
            var c = u.rgb2hsv(a);
            return u.hsv2hsl(b ? c : n.hsv = c)
        },
        hsl2rgb: function(a) {
            var b = 6 * a.h, c = a.s, d = a.l, e = .5 > d ? d * (1 + c) : d + c - c * d, f = d + d - e, g = e ? (e - f) / e : 0, h = ~~b, i = b - h, j = e * g * i, k = f + j, l = e - j, m = h % 6;
            return {
                r: [e, l, f, f, k, e][m],
                g: [k, e, e, l, f, f][m],
                b: [f, f, k, e, e, l][m]
            }
        },
        rgb2cmy: function(a) {
            return {
                c: 1 - a.r,
                m: 1 - a.g,
                y: 1 - a.b
            }
        },
        cmy2cmyk: function(a) {
            var b = Math.min(Math.min(a.c, a.m), a.y), c = 1 - b || 1e-20;
            return {
                c: (a.c - b) / c,
                m: (a.m - b) / c,
                y: (a.y - b) / c,
                k: b
            }
        },
        cmyk2cmy: function(a) {
            var b = a.k;
            return {
                c: a.c * (1 - b) + b,
                m: a.m * (1 - b) + b,
                y: a.y * (1 - b) + b
            }
        },
        cmy2rgb: function(a) {
            return {
                r: 1 - a.c,
                g: 1 - a.m,
                b: 1 - a.y
            }
        },
        rgb2cmyk: function(a, b) {
            var c = u.rgb2cmy(a);
            return u.cmy2cmyk(b ? c : n.cmy = c)
        },
        cmyk2rgb: function(a, b) {
            var c = u.cmyk2cmy(a);
            return u.cmy2rgb(b ? c : n.cmy = c)
        },
        XYZ2rgb: function(a, b) {
            var c = m.options.XYZMatrix, d = a.X, e = a.Y, f = a.Z, g = d * c.R[0] + e * c.R[1] + f * c.R[2], h = d * c.G[0] + e * c.G[1] + f * c.G[2], i = d * c.B[0] + e * c.B[1] + f * c.B[2], j = 1 / 2.4;
            return c = .0031308, g = g > c ? 1.055 * Math.pow(g, j) - .055 : 12.92 * g, h = h > c ? 1.055 * Math.pow(h, j) - .055 : 12.92 * h, i = i > c ? 1.055 * Math.pow(i, j) - .055 : 12.92 * i, b || (n._rgb = {
                r: g,
                g: h,
                b: i
            }), {
                r: k(g, 0, 1),
                g: k(h, 0, 1),
                b: k(i, 0, 1)
            }
        },
        rgb2XYZ: function(a) {
            var b = m.options.XYZMatrix, c = a.r, d = a.g, e = a.b, f = .04045;
            return c = c > f ? Math.pow((c + .055) / 1.055, 2.4) : c / 12.92, d = d > f ? Math.pow((d + .055) / 1.055, 2.4) : d / 12.92, e = e > f ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, {
                X: c * b.X[0] + d * b.X[1] + e * b.X[2],
                Y: c * b.Y[0] + d * b.Y[1] + e * b.Y[2],
                Z: c * b.Z[0] + d * b.Z[1] + e * b.Z[2]
            }
        },
        XYZ2Lab: function(a) {
            var b = m.options.XYZReference, c = a.X / b.X, d = a.Y / b.Y, e = a.Z / b.Z, f = 16 / 116, g = 1 / 3, h = .008856, i = 7.787037;
            return c = c > h ? Math.pow(c, g) : i * c + f, d = d > h ? Math.pow(d, g) : i * d + f, e = e > h ? Math.pow(e, g) : i * e + f, {
                L: 116 * d - 16,
                a: 500 * (c - d),
                b: 200 * (d - e)
            }
        },
        Lab2XYZ: function(a) {
            var b = m.options.XYZReference, c = (a.L + 16) / 116, d = a.a / 500 + c, e = c - a.b / 200, f = Math.pow(d, 3), g = Math.pow(c, 3), h = Math.pow(e, 3), i = 16 / 116, j = .008856, k = 7.787037;
            return {
                X: (f > j ? f : (d - i) / k) * b.X,
                Y: (g > j ? g : (c - i) / k) * b.Y,
                Z: (h > j ? h : (e - i) / k) * b.Z
            }
        },
        rgb2Lab: function(a, b) {
            var c = u.rgb2XYZ(a);
            return u.XYZ2Lab(b ? c : n.XYZ = c)
        },
        Lab2rgb: function(a, b) {
            var c = u.Lab2XYZ(a);
            return u.XYZ2rgb(b ? c : n.XYZ = c, b)
        }
    }
}(Colorpicker), function(a) {
    "use strict";
    var b = '^§app alpha-bg-w">^§slds">^§sldl-1">$^§sldl-2">$^§sldl-3">$^§curm">$^§sldr-1">$^§sldr-2">$^§sldr-4">$^§curl">$^§curr">$$^§opacity">|^§opacity-slider">$$$^§memo">^§raster">$^§raster-bg">$|$|$|$|$|$|$|$|$^§memo-store">$^§memo-cursor">$$^§panel">^§hsv">^hsl-mode §ß">$^hsv-h-ß §ß">H$^hsv-h-~ §~">-^§nsarrow">$$^hsl-h-@ §@">H$^hsv-s-ß §ß">S$^hsv-s-~ §~">-$^hsl-s-@ §@">S$^hsv-v-ß §ß">B$^hsv-v-~ §~">-$^hsl-l-@ §@">L$$^§hsl §hide">^hsv-mode §ß">$^hsl-h-ß §ß">H$^hsl-h-~ §~">-$^hsv-h-@ §@">H$^hsl-s-ß §ß">S$^hsl-s-~ §~">-$^hsv-s-@ §@">S$^hsl-l-ß §ß">L$^hsl-l-~ §~">-$^hsv-v-@ §@">B$$^§rgb">^rgb-r-ß §ß">R$^rgb-r-~ §~">-$^rgb-r-@ §ß">&nbsp;$^rgb-g-ß §ß">G$^rgb-g-~ §~">-$^rgb-g-@ §ß">&nbsp;$^rgb-b-ß §ß">B$^rgb-b-~ §~">-$^rgb-b-@ §ß">&nbsp;$$^§cmyk">^Lab-mode §ß">$^cmyk-c-ß §@">C$^cmyk-c-~ §~">-$^Lab-L-@ §@">L$^cmyk-m-ß §@">M$^cmyk-m-~ §~">-$^Lab-a-@ §@">a$^cmyk-y-ß §@">Y$^cmyk-y-~ §~">-$^Lab-b-@ §@">b$^cmyk-k-ß §@">K$^cmyk-k-~ §~">-$^Lab-x-@ §ß">&nbsp;$$^§Lab §hide">^cmyk-mode §ß">$^Lab-L-ß §@">L$^Lab-L-~ §~">-$^cmyk-c-@ §@">C$^Lab-a-ß §@">a$^Lab-a-~ §~">-$^cmyk-m-@ §@">M$^Lab-b-ß §@">b$^Lab-b-~ §~">-$^cmyk-y-@ §@">Y$^Lab-x-ß §@">&nbsp;$^Lab-x-~ §~">-$^cmyk-k-@ §@">K$$^§alpha">^alpha-ß §ß">A$^alpha-~ §~">-$^alpha-@ §ß">W$$^§HEX">^HEX-ß §ß">#$^HEX-~ §~">-$^HEX-@ §ß">M$$^§ctrl">^§raster">$^§cont">$^§cold">$^§col1">|&nbsp;$$^§col2">|&nbsp;$$^§bres">RESET$^§bsav">SAVE$$$^§exit">$^§resize">$^§resizer">|$$$'.replace(/\^/g, '<div class="').replace(/\$/g, "</div>").replace(/~/g, "disp").replace(/ß/g, "butt").replace(/@/g, "labl").replace(/\|/g, "<div>"), c = "är^1,äg^1,äb^1,öh^1,öh?1,öh?2,ös?1,öv?1,üh^1,üh?1,üh?2,üs?1,ül?1,.no-rgb-r är?2,.no-rgb-r är?3,.no-rgb-r är?4,.no-rgb-g äg?2,.no-rgb-g äg?3,.no-rgb-g äg?4,.no-rgb-b äb?2,.no-rgb-b äb?3,.no-rgb-b äb?4{visibility:hidden}är^2,är^3,äg^2,äg^3,äb^2,äb^3{@-image:url(_patches.png)}.§slds div{@-image:url(_vertical.png)}öh^2,ös^1,öv^1,üh^2,üs^1,ül^1{@-image:url(_horizontal.png)}ös?4,öv^3,üs?4,ül^3{@:#000}üs?3,ül^4{@:#fff}är?1{@-color:#f00}äg?1{@-color:#0f0}äb?1{@-color:#00f}är^2{@|-1664px 0}är^3{@|-896px 0}är?1,äg?1,äb?1,öh^3,ös^2,öv?2Ü-2432Öär?2Ü-2944Öär?3Ü-4480Öär?4Ü-3202Öäg^2Äöh^2{@|-640px 0}äg^3{@|-384px 0}äg?2Ü-4736Öäg?3Ü-3968Öäg?4Ü-3712Öäb^2{@|-1152px 0}äb^3{@|-1408px 0}äb?2Ü-3456Öäb?3Ü-4224Öäb?4Ü-2688Ööh^2Äär^3Ääb?4Ü0}öh?4,üh?4Ü-1664Öös^1,öv^1,üs^1,ül^1Ääg^3{@|-256px 0}ös^3,öv?4,üs^3,ül?4Ü-2176Öös?2,öv^2Ü-1920Öüh^2{@|-768px 0}üh^3,üs^2,ül?2Ü-5184Öüs?2,ül^2Ü-5824Ö.S är^2{@|-128px -128Ö.S är?1Ääg?1Ääb?1Äöh^3Äös^2Äöv?2Ü-1408Ö.S är?2Ääb^3Ü-128Ö.S är?3Ü-896Ö.S är?4Ü-256Ö.S äg^2{@|-256px -128Ö.S äg?2Ü-1024Ö.S äg?3Ü-640Ö.S äg?4Ü-512Ö.S äb^2{@|-128px 0}.S äb?2Ü-384Ö.S äb?3Ü-768Ö.S öh?4Äüh?4Ü-1536Ö.S ös^1Äöv^1Äüs^1Äül^1{@|-512px 0}.S ös^3Äöv?4Äüs^3Äül?4Ü-1280Ö.S ös?2Äöv^2Ü-1152Ö.S üh^2{@|-1024px 0}.S üh^3Äüs^2Äül?2Ü-5440Ö.S üs?2Äül^2Ü-5696Ö.XXS ös^2,.XXS öv?2Ü-5120Ö.XXS ös^3,.XXS öv?4,.XXS üs^3,.XXS ül^3,.XXS ül?4Ü-5056Ö.XXS ös?2,.XXS öv^2Ü-4992Ö.XXS üs^2,.XXS ül?2Ü-5568Ö.XXS üs?2,.XXS ül^2Ü-5632Ö".replace(/Ü/g, "{@|0 ").replace(/Ö/g, "px}").replace(/Ä/g, ",.S ").replace(/\|/g, "-position:").replace(/@/g, "background").replace(/ü/g, ".hsl-").replace(/ö/g, ".hsv-").replace(/ä/g, ".rgb-").replace(/~/g, " .no-rgb-}").replace(/\?/g, " .§sldr-").replace(/\^/g, " .§sldl-"), d = '∑{@#bbb;font-family:monospace, "Courier New", Courier, mono;font-size:12¥line-ä15¥font-weight:bold;cursor:default;~412¥ä323¥?top-left-radius:7¥?top-Ü-radius:7¥?bottom-Ü-radius:7¥?bottom-left-radius:7¥ö@#444}.S{~266¥ä177px}.XS{~158¥ä173px}.XXS{ä105¥~154px}.no-alpha{ä308px}.no-alpha .§opacity,.no-alpha .§alpha{display:none}.S.no-alpha{ä162px}.XS.no-alpha{ä158px}.XXS.no-alpha{ä90px}∑,∑ div{border:none;padding:0¥float:none;margin:0¥outline:none;box-sizing:content-box}∑ div{|absolute}^s .§curm,«§disp,«§nsarrow,∑ .§exit,∑ ø-cursor,∑ .§resize{öimage:url(_icons.png)}∑ .do-drag div{cursor:url(_blank.png), auto}∑ .§opacity,ø .§raster-bg,∑ .§raster{öimage:url(_bgs.png)}∑ ^s{~287¥ä256¥top:10¥left:10¥overflow:hidden;cursor:crosshair}.S ^s{~143¥ä128¥left:9¥top:9px}.XS ^s{left:7¥top:7px}.XXS ^s{left:5¥top:5px}^s div{~256¥ä256¥left:0px}.S ^l-1,.S ^l-2,.S ^l-3,.S ^l-4{~128¥ä128px}.XXS ^s,.XXS ^s ^l-1,.XXS ^s ^l-2,.XXS ^s ^l-3,.XXS ^s ^l-4{ä64px}^s ^r-1,^s ^r-2,^s ^r-3,^s ^r-4{~31¥left:256¥cursor:default}.S ^r-1,.S ^r-2,.S ^r-3,.S ^r-4{~15¥ä128¥left:128px}^s .§curm{margin:-5¥~11¥ä11¥ö|-36px -30px}.light .§curm{ö|-7px -30px}^s .§curl,^s .§curr{~0¥ä0¥margin:-3px -4¥border:4px solid;cursor:default;left:auto;öimage:none}^s .§curl,∑ ^s .§curl-dark,.hue-dark div.§curl{Ü:27¥?@† † † #fff}.light .§curl,∑ ^s .§curl-light,.hue-light .§curl{?@† † † #000}.S ^s .§curl,.S ^s .§curr{?~3px}.S ^s .§curl-light,.S ^s .§curl{Ü:13px}^s .§curr,∑ ^s .§curr-dark{Ü:4¥?@† #fff † †}.light .§curr,∑ ^s .§curr-light{?@† #000 † †}∑ .§opacity{bottom:44¥left:10¥ä10¥~287¥ö|0 -87px}.S .§opacity{bottom:27¥left:9¥~143¥ö|0 -100px}.XS .§opacity{left:7¥bottom:25px}.XXS .§opacity{left:5¥bottom:23px}.§opacity div{~100%;ä16¥margin-top:-3¥overflow:hidden}.§opacity .§opacity-slider{margin:0 -4¥~0¥ä8¥?~4¥?style:solid;?@#eee †}∑ ø{bottom:10¥left:10¥~288¥ä31¥ö@#fff}.S ø{ä15¥~144¥left:9¥bottom:9px}.XS ø{left:7¥bottom:7px}.XXS ø{left:5¥bottom:5px}ø div{|relative;float:left;~31¥ä31¥margin-Ü:1px}.S ø div{~15¥ä15px}∑ .§raster,ø .§raster-bg,.S ø .§raster,.S ø .§raster-bg{|absolute;top:0¥Ü:0¥bottom:0¥left:0¥~100%}.S ø .§raster-bg{ö|0 -31px}∑ .§raster{opacity:0.2;ö|0 -49px}.alpha-bg-b ø{ö@#333}.alpha-bg-b .§raster{opacity:1}ø ø-cursor{|absolute;Ü:0¥ö|-26px -87px}∑ .light ø-cursor{ö|3px -87px}.S ø-cursor{ö|-34px -95px}.S .light ø-cursor{ö|-5px -95px}∑ .§panel{|absolute;top:10¥Ü:10¥bottom:10¥~94¥?~1¥?style:solid;?@#222 #555 #555 #222;overflow:hidden;ö@#333}.S .§panel{top:9¥Ü:9¥bottom:9px}.XS .§panel{display:none}.§panel div{|relative}«§hsv,«§hsl,«§rgb,«§cmyk,«§Lab,«§alpha,.no-alpha «§HEX,«§HEX{~86¥margin:-1px 0px 1px 4¥padding:1px 0px 3¥?top-~1¥?top-style:solid;?top-@#444;?bottom-~1¥?bottom-style:solid;?bottom-@#222;float:Ö«§hsv,«§hsl{padding-top:2px}.S .§hsv,.S .§hsl{padding-top:1px}«§HEX{?bottom-style:none;?top-~0¥margin-top:-4¥padding-top:0px}.no-alpha «§HEX{?bottom-style:none}«§alpha{?bottom-style:none}.S .rgb-r .§hsv,.S .rgb-g .§hsv,.S .rgb-b .§hsv,.S .rgb-r .§hsl,.S .rgb-g .§hsl,.S .rgb-b .§hsl,.S .hsv-h .§rgb,.S .hsv-s .§rgb,.S .hsv-v .§rgb,.S .hsl-h .§rgb,.S .hsl-s .§rgb,.S .hsl-l .§rgb,.S .§cmyk,.S .§Lab{display:none}«§butt,«§labl{float:left;~14¥ä14¥margin-top:2¥text-align:center;border:1px solid}«§butt{?@#555 #222 #222 #555}«§butt:active{ö@#444}«§labl{?@†}«Lab-mode,«cmyk-mode,«hsv-mode,«hsl-mode{|absolute;Ü:0¥top:1¥ä50px}«hsv-mode,«hsl-mode{top:2px}«cmyk-mode{ä68px}.hsl-h .hsl-h-labl,.hsl-s .hsl-s-labl,.hsl-l .hsl-l-labl,.hsv-h .hsv-h-labl,.hsv-s .hsv-s-labl,.hsv-v .hsv-v-labl{@#f90}«cmyk-mode,«hsv-mode,.rgb-r .rgb-r-butt,.rgb-g .rgb-g-butt,.rgb-b .rgb-b-butt,.hsv-h .hsv-h-butt,.hsv-s .hsv-s-butt,.hsv-v .hsv-v-butt,.hsl-h .hsl-h-butt,.hsl-s .hsl-s-butt,.hsl-l .hsl-l-butt,«rgb-r-labl,«rgb-g-labl,«rgb-b-labl,«alpha-butt,«HEX-butt,«Lab-x-labl{?@#222 #555 #555 #222;ö@#444}.no-rgb-r .rgb-r-labl,.no-rgb-g .rgb-g-labl,.no-rgb-b .rgb-b-labl,.mute-alpha .alpha-butt,.no-HEX .HEX-butt,.cmy-only .Lab-x-labl{?@#555 #222 #222 #555;ö@#333}.Lab-x-disp,.cmy-only .cmyk-k-disp,.cmy-only .cmyk-k-butt{visibility:hidden}«HEX-disp{öimage:none}«§disp{float:left;~48¥ä14¥margin:2px 2px 0¥cursor:text;text-align:left;text-indent:3¥?~1¥?style:solid;?@#222 #555 #555 #222}∑ .§nsarrow{|absolute;top:0¥left:-13¥~8¥ä16¥display:none;ö|-87px -23px}∑ .start-change .§nsarrow{display:block}∑ .do-change .§nsarrow{display:block;ö|-87px -36px}.do-change .§disp{cursor:default}«§hide{display:none}«§cont,«§cold{|absolute;top:-5¥left:0¥ä3¥border:1px solid #333}«§cold{z-index:1;ö@#c00}«§cont{margin-Ü:-1¥z-index:2}«contrast .§cont{z-index:1;ö@#ccc}«orange .§cold{ö@#f90}«green .§cold{ö@#4d0}«§ctrl{|absolute;bottom:0¥left:0¥~100%;ö@#fff}.alpha-bg-b .§ctrl,«§bres,«§bsav{ö@#333}«§col1,«§col2,«§bres,«§bsav{?~1¥?style:solid;?@#555 #222 #222 #555;float:left;~45¥line-ä28¥text-align:center;top:0px}.§panel div div{ä100%}.S .§ctrl div{line-ä25px}.S «§bres,.S «§bsav{line-ä26px}∑ .§exit,∑ .§resize{Ü:3¥top:3¥~15¥ä15¥ö|0 -52px}∑ .§resize{top:auto;bottom:3¥cursor:nwse-resize;ö|-15px -52px}.S .§exit{ö|1px -52px}.XS .§resize,.XS .§exit{~10¥ä10¥Ü:0¥öimage:none}.XS .§exit{top:0px}.XS .§resize{bottom:0px}∑ .§resizer,∑ .§resizer div{|absolute;border:1px solid #888;top:-1¥Ü:-1¥bottom:-1¥left:-1¥z-index:2;display:none;cursor:nwse-resize}∑ .§resizer div{border:1px dashed #333;opacity:0.3;display:block;ö@#bbb}'.replace(/Ü/g, "right").replace(/Ö/g, "left}").replace(/∑/g, ".§app").replace(/«/g, ".§panel .").replace(/¥/g, "px;").replace(/\|/g, "position:").replace(/@/g, "color:").replace(/ö/g, "background-").replace(/ä/g, "height:").replace(/ø/g, ".§memo").replace(/†/g, "transparent").replace(/\~/g, "width:").replace(/\?/g, "border-").replace(/\^/g, ".§sld"), e = "iVBORw0KGgoAAAANSUhEUgAABIAAAAABCAYAAACmC9U0AAABT0lEQVR4Xu2S3Y6CMBCFhyqIsjGBO1/B9/F5DC/pK3DHhVkUgc7Zqus2DVlGU/cnQZKTjznttNPJBABA149HyRf1iN//4mIBCg0jV4In+j9xJiuihly1V/Z9X88v//kNeDXVvyO/lK+IPR76B019+1Riab3H1zkmeqerKnL+Bzwxx6PAgZxaSQU8vB62T28pxcQeRQ2sHw6GxCOWHvP78zwHAARBABOfdYtd30rwxXOEPDF+dj2+91r6vV/id3k+/brrXmaGUkqKhX3i+ffSt16HQ/dorTGZTHrs7ev7Tl7XdZhOpzc651nfsm1bRFF0YRiGaJoGs9nsQuN/xafTCXEco65rzOdzHI9HJEmCqqqwXC6x3++RZRnKssRqtUJRFFiv19jtdthutyAi5Hl+Jo9VZg7+7f3yXuvZf5c3KaXYzByb+WIzO5ymKW82G/0BNcFhO/tOuuMAAAAASUVORK5CYII=", f = "iVBORw0KGgoAAAANSUhEUgAAAAEAABfACAYAAABn2KvYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHtJREFUeNrtnN9SqzAQxpOF1to6zuiVvoI+j6/gva/lA/kKeqUzjtX+QTi7SzSYBg49xdIzfL34+e1usoQQklCnmLwoCjImNwDQA2xRGMqNAYB+gPEH9IdCgIUA6Aem0P1fLoMQAPYNHYDoCKAv8OMHFgKgX2AjDPQDXn4t1l+gt/1fId//yWgE/hUJ+mAn8EyY5wCwXxhrbaHzn8E9iPlv79DdHxXTqciZ4KROnXRVZMF/6U2OPhcEavtAbZH1SM7wRDD7VoHZItCiyEQf4t6+MW9UOxaZybmdCGKqNrB9Eb5SfMg3wTyiagMtigTmWofiSDCOYNTSNz6sLDIoaCU9GWDd0tdhoMMsRm+r8U/EfB0GfjmLXiqzimDd0tdhoLMsI7la45+I+ToM/HIW0kfGVQTrlr7tA91kaUr//fxrKo8jUFB7VAn6AKpHJf+EKwAAAIYD/f7F7/8MVgMo7P+gBqDKr57Lf72V8x8AAMDgYIuvH4EAAAAMDQX6AACAQcI9GGMjDADA4MA/P2KlP8IEAAAYFCz6AACAgaLA8y8AAIN+CMYXoQAADA7u/UPYCAMAMDjI7z9S+SdwDFQX2C9Gh9GMEOWriz8/Pw1lWQZsi/L3R4czzP678Ve+P8f9nCv/C7hwLq99ah8NfKrU15zPB5pVcwtiJt9qGy0IfEE+jQa+Fn0VtI/fkxUPqBlEfRENeF+tqUpbGpi1iu8epwJzvV5XA4GpWC6XGz7F+/u766EgwJ+ckiTJKU3TnI6OjnI6OzvLZf6zMggt3dzckPhIoiTlSGpQ+eEsVegdz0fbCCi4fRs+Po+4yWdeDXiT+6pBSTeHple1pkz3FZ+avpyavoiPxgLN0B7yprY08PlyQTTm0+PWmkH7ynedNKraar4F/lRj1WpTtYh+ozL/cY2sAvZl0gcbZm0gSLBLvkxGoaogiy/HDXemQk2t5pUm8OAhH8/HH6e0mkJ9q9XKKQXfb07xfZnJbZrRxcVFVt6/t7e3Kc1ms5RGo1Eq5VIZuyl9fHw4k/M5xYeoKj64A7eqCt1ZeqWFVSl8NV9OTV3fmvP5qE9VmzSoEcsXpArK1UHen/hZbgL53BZSdyEXalGau/hU8TEW0u3VcoFPy3EDFrTgT+njydeZ0+l0UV7fu7u7iVzziQQmUm4iqRw4n/NxMxw4s/Mp1NSALxf4NEtQ10cjMDwSl+b+/j6hp6enVGb+jUvrn05iKobm6PboOt8vPISY5Pr6OqGXlxe3fOokoGtAbMUJZmqvYmaLQDP+sdrecOjtO/SXeH69P8Imutm5urqy9PDwYOny8tLS4+OjpfPzc0vPz8+WTk9PLb2+vlpZbCzN53NLx8fHVtYZS5PJxMoEZWWqsjKULY3HYytTi1Pex5OMldXKRVXxuLcy/20onmms3BBOxcr5qCrZtsrd45SPel8sGlOxGoGy0neynQ6VL9fsa1YtWlCrtj9G83G7PjdVush5n5q1iJWLZW6u21a1bUvbVnVzlru0pe3RdmlV1/23fZtbZv4Dx+7FBypx77kAAAAASUVORK5CYII=", g = "iVBORw0KGgo^NSUhEUgAAB4^EACAI#DdoPxz#L0UlEQVR4Xu3cQWrDQBREwR7FF8/BPR3wXktnQL+KvxfypuEhvLJXcp06d/bXd71OPt+trIw95zr33Z1bk1/fudEv79wa++7OfayZ59wrO2PBzklcGQmAZggAAOBYgAYBmpWRAGg^BGgRofAENgAAN#I0CBA6w8AG^ECABgEa/QH§AI0CNDoDwAY^QIAGAVp/AM§AjQI0OgPAAY^QoEGARn8Aw§CNAjQ+gMABg#BCgQYCmGQmABgAAEKBBgEZ/AM§AjQI0PoDAAY^QoEGARn8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCgaUYCoAE#RoEKDRHwAw^gAANArT+AIAB^BGgQoNEfAAw^gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaJqRAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^CNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGAZpmJACaBw^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQOsPABg#BAgAYBGv0BAANwCwAAGB6gYeckmpEAa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRomsMAM^IAADQK0/gCAAQ^RoEKDRHwAw^gAANO7fQHwAw^gAANArT+AIAB^BGgQoNEfAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^RIB+Ntg5iea5AD^DAIwI0CND6AwAG^EKBBgEZ/AKAB#EaBCg0R8AM^IAADQK0/gCAAQ^RoEKDRHwAM^IECDAI3+AIAB^BGgQoPUHAAw^gQIMAjf4AY§BGgRo9AcAD^CBAgwCtPwBg§EaBGiakQBo^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQKM/ABg#BAgAYBGv0BAAM^I0CBA6w8AG^ECABgGaZiQAGgAAQIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNDoDwAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGApjkMAAM^I0CBA6w8AG^ECABgEa/QEAAw^jQsIP+AIAB^BGgQoPUHAAw^gQIMAjf4AgAE#Bea/fK+3P5/3PJOvh8t1cO4nflmQAQoAEAAF9Aw/7JHfQHAAw^gQIMArT8AY§BGvwHNPoDAA0AACBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQNOMBEAD#I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNA0IwHQ^AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgEZ/AD^C#0CNPoDAAY^QoEGA1h8AM^IAADQI0DQAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGA1h8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANArT+AIAB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg9QcAD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBgACDhFgC#07t9AfAD^C#0CtP4AgAE^EaBCg0R8Aa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRommEAM^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AIAB^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAGgAAQICGCNBfRfNcABg#BgeICGnVvoDwAY^QIAGAVp/AM§AjQI0OgPADQAAIAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAE0zEgAN#gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIEDTjARAAwAACNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQNIcBY§BGgRo/QEAAw^jQIECjPwBg§EadtAfAD^C#0CtP4AgAE^EaBCgAQABGgAA+AO2TAbHupOgH^ABJRU5ErkJggg==".replace(/§/g, "AAAAAA").replace(/\^/g, "AAAA").replace(/#/g, "AAA"), h = "iVBORw0KGgoAAAANSUhEUgAAAGEAAABDCAMAAAC7vJusAAAAkFBMVEUAAAAvLy9ERERubm7///8AAAD///9EREREREREREREREQAAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8cHBwkJCQnJycoKCgpKSkqKiouLi4vLy8/Pz9AQEBCQkJDQ0NdXV1ubm58fHykpKRERERVVVUzMzPx7Ab+AAAAHXRSTlMAAAAAAAQEBQ4QGR4eIyMtLUVFVVVqapKSnJy7u9JKTggAAAFUSURBVHja7dXbUoMwEAbgSICqLYeW88F6KIogqe//dpoYZ0W4AXbv8g9TwkxmvtndZMrEwlw/F8YIRjCCEYxgBCOsFmzqGMEI28J5zzmt0Pc9rdDL0NYgMxIYC5KiKpKAzZphWtZlGm4SjlnkOV6UHeeEUx77rh/npw1dCrI9k9lnwUwF+UG9D3m4ftJJxH4SJdPtaawXcbr+tBaeFrxiur309cIv19+4ytGCU0031a5euPVigLYGqjlAqM4ShOQ+QAYQUO80AMMAAkUGGfMfR9Ul+kmvPq2QGxXKOQBAKdjUgk0t2NiCGEVP+rHT3/iCUMBT90YrPMsKsIWP3x/VolaonJEETchHCS8AYAmaUICQQwaAQnjoXgHAES7jLkEFaHO4bdq/k25HAIpgWY34FwAE5xjCffM+D2DV8B0gRsAZT7hr5gE8wdrJcU+CJqhcqQD7Cx5L7Ph4WnrKAAAAAElFTkSuQmCC", i = "iVBORw0KGgoAAAANSUhEUgAAASAAAABvCAYAAABM+h2NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABORJREFUeNrs3VtTW1UYBuCEcxAI4YydWqTWdqr1V7T/2QsvvPDCCy9qjxZbamsrhZIQUHsCEtfafpmJe8qFjpUxfZ4Zuvt2feydJvAOARZUut1u5bRerl692nV913f99/f6QxWAU6KAAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIEABASggQAEBKCBAAQEoIEABASggQAEBKCBAAQEoIGBQC+jatWvd07zxrv9+Xx8fAQEoIEABASggQAEBKCBAAQEoIEABAQoIQAEBCghAAQEKCEABAQOk2u36kS6AAgLetwJKL29toFRM1be+QrVq3rx58//KvM8BAadGAQEKCFBAAAoIGHwnfhneZ+/Nmzf/LufzrI+AAE/BAAUEoIAABQTwztgLZt68eXvBAE/BABQQoIAAFBAweOwFM2/evL1ggKdgAAoIUEAACggYPPaCmTdv3l4wwFMwAAUEKCAABQQMHnvBzJs3by8Y4CkYgAICFBCAAgIGz4lfBQNQQMDgFlCtVisaaHV1tThubW1VInciD0U+ysdnz54N5+PKysphOnRTHsvHlN9EHo/1l5FrkV9Enoz8W87b29tTOS8vLx9EnoncjlyPvBe5EbkZeT4fU96NvBDr2znv7Ows57y0tLQVeSXy08gf5mNfPhPrjyOfrVarlcXFxZ9yfv78+bl8TPlh5LU8n/KDyOuxfj/y+VjfyHl3d/dCKv28fi/yp/m4sLDwQ+SLke9GvhT5Tinfjnw5f4/F/Pz8rZybzeZn+ZjyzVK+EfnzUr4S+Xopf9/L+fxzc3M5d1qt1hf531Mu5k/IxzGf85VYL+fefHH+RqNRrO/t7RW3L+UbkS9Hvhk5/386Kd/qW8/5duRLMV/OdyJfzNebnZ0t7t92u53v/07K9yJfiLwROT9+ef7HyOux/iDyWuSHkT+K+eLtZX9//2xer9frjyOfyY9/Wn8S86v59qT1p7Ge315zLt4RU16K19+O9YXIu5HnYn435hux3opcj9yOPB3z+5E/iPXf43y1yMX778HBQS3f3pTz+28l5bHIr2N+LN3+zszMzGHkoh/S+mHMF98XlNaP8zHd/0W/pMe943NAwKlSQIACAhQQgAICFBCAAgIUEIACAhQQgAIC/n9GqtXqYbfbHa38+RtSu32llPdqdNL6aOSj+LfxyMVekLTem39Ryr/mPDQ0NBznzXtROikPRW6W8k7k3m9rzXthOsPDw73bUuylGRkZ6cR63nvTSfko8oPIr+Pnz96P/DLW816ezujoaN6DdtyX9+P8eS9QZ2xs7Hxf7qa8Xlr/JO6Ljcjrcf6cj1P+OO+N6V1/fHz8XLz+/Tjfubh+sZcorZ+N9Ycxfybyo8ircf6fc56YmFiJ1/8l8mLk7cjzkfP92U15Ns63G+u9nPcKdWq12lQ8Xu3Ixd6f9Pd8P3UmJycnUszzL2N9LM7/anNzs9V7Q2q32395w/q7ubdH6L/KrVbrpPxlKX9Vyl+X8jel/G0pf5f/aDabvXy9tH6ztH63lDdKebOUH5Xyk1LeKuWd/ry2tlap9P125Onp6Zf9eWpq6lW3b8f6zMzM6/71er3+ppSP+u/XNN/pz41Go+sjIMBTMEABASggQAEBKCBAAQEoIEABASggQAEB/CN/CDAAw78uW9AVDw4AAAAASUVORK5CYII=", j = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQI12P4//8/MwAI/wMBbrqo4gAAAABJRU5ErkJggg==";
    a.ColorPicker = {
        _html: b,
        _cssFunc: c,
        _cssMain: d,
        _horizontalPng: e,
        _verticalPng: f,
        _patchesPng: g,
        _iconsPng: h,
        _bgsPng: i,
        _blankPng: j
    }
}(Colorpicker), function(a, b) {
    "use strict";
    function c(a, c) {
        var e, j, k = "", l = "", m = [];
        for (var n in c)a.options[n] = c[n];
        _ = new Colorpicker.Colors(a.options), delete a.options, bb = _.options, bb.scale = 1, l = bb.CSSPrefix, a.color = _, S = bb.valueRanges, a.nodes = cb = g(f(a), a), q(bb.mode), d(a), u(), k = " " + bb.mode.type + "-" + bb.mode.z, cb.slds.className += k, cb.panel.className += k, bb.noHexButton && C(cb.HEX_butt, l + "butt", l + "labl"), bb.size !== b && p(b, bb.size), j = {
            alphaBG: cb.alpha_labl,
            cmyOnly: cb.HEX_labl
        };
        for (var r in j)bb[r] !== b && o({
            target: j[r],
            data: bb[r]
        });
        bb.noAlpha && (cb.colorPicker.className += " no-alpha"), e = bb.memoryColors, "string" == typeof e && (e = e.replace(/^'|'$/g, "").replace(/\s*/, "").split("','"));
        for (var r = cb.memos.length; r--;)e && "string" == typeof e[r] && (m = e[r].replace("rgba(", "").replace(")", "").split(","), e[r] = {
            r: m[0],
            g: m[1],
            b: m[2],
            a: m[3]
        }), cb.memos[r].style.cssText = "background-color: " + (e && e[r] !== b ? y(e[r]) + ";" + A(e[r].a || 1) : "rgb(0,0,0);");
        h(a), I = !0, i(b, "init"), N && (d(N), w())
    }

    function d(a) {Y = !0, M !== a && (M = a, ab = a.color.colors, bb = a.color.options, cb = a.nodes, _ = a.color, $ = {}, v(ab))}

    function e() {
        var a = ["L", "S", "XS", "XXS"];
        bb.sizes = {}, cb.testNode.style.cssText = "position:absolute;left:-1000px;top:-1000px;", document.body.appendChild(cb.testNode);
        for (var b = a.length; b--;)cb.testNode.className = bb.CSSPrefix + "app " + a[b], bb.sizes[a[b]] = [cb.testNode.offsetWidth, cb.testNode.offsetHeight];
        cb.testNode.removeNode ? cb.testNode.removeNode(!0) : document.body.removeChild(cb.testNode)
    }

    function f(a) {
        var b = document.createElement("div"), c = bb.CSSPrefix, d = "data:image/png;base64,", e = function(a, b) {
            var c = document.createElement("style");
            c.setAttribute("type", "text/css"), b && c.setAttribute("id", b), c.styleSheet || c.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(c), c.styleSheet && (document.styleSheets[document.styleSheets.length - 1].cssText = a)
        }, f = function(a) {
            O._cssFunc = O._cssFunc.replace(/§/g, c).replace("_patches.png", a ? d + O._patchesPng : bb.imagePath + "_patches.png").replace("_vertical.png", a ? d + O._verticalPng : bb.imagePath + "_vertical.png").replace("_horizontal.png", a ? d + O._horizontalPng : bb.imagePath + "_horizontal.png"), e(O._cssFunc, "colorPickerCSS"), bb.customCSS || (O._cssMain = O._cssMain.replace(/§/g, c).replace("_bgs.png", a ? d + O._bgsPng : bb.imagePath + "_bgs.png").replace("_icons.png", a ? d + O._iconsPng : bb.imagePath + "_icons.png").replace("_blank.png", Q ? bb.imagePath + "_blank.cur" : d + O._blankPng).replace(/opacity:(\d*\.*(\d+))/g, function(a, b) {return R ? "-moz-opacity: " + b + "; -khtml-opacity: " + b + "; opacity: " + b : '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' + Math.round(100 * +b) + ')";filter: alpha(opacity=' + Math.round(100 * +b) + ")"}), e(O._cssMain));
            for (var b in O)O[b] = null
        }, g = document.createElement("img");
        return P ? a.color.options.devPicker : ((N = M) && r(), b.innerHTML = M ? M.nodes.colorPicker.outerHTML : O._html.replace(/§/g, c), document.getElementById("colorPickerCSS") || (g.onload = g.onerror = function() {O._cssFunc && f(1 === this.width && 1 === this.height)}, g.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="), b = b.children[0], b.style.cssText = bb.initStyle || "", (bb.appenTo || document.body).appendChild(b))
    }

    function g(a) {
        var b, c, d = a.getElementsByTagName("*"), e = { colorPicker: a }, f = new RegExp(bb.CSSPrefix);
        e.styles = {}, e.textNodes = {}, e.memos = [], e.testNode = document.createElement("div");
        for (var g = 0, h = d.length; h > g; g++)b = d[g], (c = b.className) && f.test(c) ? (c = c.split(" ")[0].replace(bb.CSSPrefix, "").replace(/-/g, "_"), /_disp/.test(c) ? (c = c.replace("_disp", ""), e.styles[c] = b.style, e.textNodes[c] = b.firstChild, b.contentEditable = !0) : (/(?:hs|cmyk|Lab).*?(?:butt|labl)/.test(c) || (e[c] = b), /(?:cur|sld[^s]|opacity|cont|col)/.test(c) && (e.styles[c] = /(?:col\d)/.test(c) ? b.children[0].style : b.style))) : /memo/.test(b.parentNode.className) && e.memos.push(b);
        return e
    }

    function h(c, f) {
        var g = f ? G : F;
        g(cb.colorPicker, "mousedown", function(f) {
            var g = f || a.event, h = E(g), n = g.target || g.srcElement, o = n.className;
            return d(c), J = n, i(b, "resetEventListener"), U = "", n === cb.sldl_3 || n === cb.curm ? (J = cb.sldl_3, I = j, U = "changeXYValue", C(cb.slds, "do-drag")) : /sldr/.test(o) || n === cb.curl || n === cb.curr ? (J = cb.sldr_4, I = k, U = "changeZValue") : n === cb.opacity.children[0] || n === cb.opacity_slider ? (J = cb.opacity, I = l, U = "changeOpacityValue") : /-disp/.test(o) && !/HEX-/.test(o) ? (I = m, U = "changeInputValue", (3 === n.nextSibling.nodeType ? n.nextSibling.nextSibling : n.nextSibling).appendChild(cb.nsarrow), K = o.split("-disp")[0].split("-"), K = {
                type: K[0],
                z: K[1] || ""
            }, C(cb.panel, "start-change"), V = 0) : n !== cb.resize || bb.noResize ? I = b : (bb.sizes || e(), J = cb.resizer, I = p, U = "resizeApp"), I && (W = {
                pageX: h.X,
                pageY: h.Y
            }, J.style.display = "block", X = D(J), X.width = cb.opacity.offsetWidth, X.childWidth = cb.opacity_slider.offsetWidth, J.style.display = "", I(g), F(Q ? document.body : a, "mousemove", I), L = a[eb](w)), /-disp/.test(o) ? void 0 : B(g)
        }), g(cb.colorPicker, "click", function(a) {d(c), o(a)}), g(cb.colorPicker, "dblclick", o), g(cb.colorPicker, "keydown", function(a) {d(c), n(a)}), g(cb.colorPicker, "keypress", n), g(cb.colorPicker, "paste", function(a) {return a.target.firstChild.data = a.clipboardData.getData("Text"), B(a)})
    }

    function i(c, d) {
        var e = I;
        I && (a[fb](L), G(Q ? document.body : a, "mousemove", I), V && (K = { type: "alpha" }, w()), ("function" == typeof I || "number" == typeof I) && delete bb.webUnsave, V = 1, I = b, C(cb.slds, "do-drag", ""), C(cb.panel, "(?:start-change|do-change)", ""), cb.resizer.style.cssText = "", cb.memo_store.style.cssText = "background-color: " + y(ab.RND.rgb) + "; " + A(ab.alpha), cb.memo.className = cb.memo.className.replace(/\s+(?:dark|light)/, "") + (ab["rgbaMix" + T[bb.alphaBG]].luminance < .22 ? " dark" : " light"), K = b, s(), bb.actionCallback && bb.actionCallback(c, U || e.name || d || "external"))
    }

    function j(b) {
        var c = b || a.event, d = bb.scale, e = E(c), f = (e.X - X.left) * (4 === d ? 2 : d), g = (e.Y - X.top) * d, h = bb.mode;
        return ab[h.type][h.x] = z(f / 255, 0, 1), ab[h.type][h.y] = 1 - z(g / 255, 0, 1), t(), B(c)
    }

    function k(b) {
        var c = b || a.event, d = E(c), e = (d.Y - X.top) * bb.scale, f = bb.mode;
        return ab[f.type][f.z] = 1 - z(e / 255, 0, 1), t(), B(c)
    }

    function l(b) {
        var c = b || a.event, d = E(c);
        return Y = !0, ab.alpha = z(Math.round((d.X - X.left) / X.width * 100), 0, 100) / 100, t("alpha"), B(c)
    }

    function m(b) {
        var c, d = b || a.event, e = E(d), f = W.pageY - e.Y, g = bb.delayOffset, h = K.type, i = "alpha" === h;
        return V || Math.abs(f) >= g ? (V || (V = (f > 0 ? -g : g) + +J.firstChild.data * (i ? 100 : 1), W.pageY += V, f += V, V = 1, C(cb.panel, "start-change", "do-change"), window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), document.activeElement.blur(), L = a[eb](w)), "cmyk" === h && bb.cmyOnly && (h = "cmy"), i ? (Y = !0, ab.alpha = z(f / 100, 0, 1)) : (c = S[h][K.z], ab[h][K.z] = "Lab" === h ? z(f, c[0], c[1]) : z(f / c[1], 0, 1)), t(i ? "alpha" : h), B(d)) : void 0
    }

    function n(c) {
        var d, e = c || a.event, f = e.which || e.keyCode, g = String.fromCharCode(f), h = document.activeElement, j = h.className.replace(bb.CSSPrefix, "").split("-"), k = j[0], l = j[1], m = "alpha" === k, n = "HEX" === k, o = {
                k40: -1,
                k38: 1,
                k34: -10,
                k33: 10
            }["k" + f] / (m ? 100 : 1), p = {
                HEX: /[0-9a-fA-F]/,
                Lab: /[\-0-9]/,
                alpha: /[\.0-9]/
            }[k] || /[0-9]/, q = S[k][k] || S[k][l], r = h.firstChild, s = H(h), u = r.data, w = "0" !== u || n ? u.split("") : [];
        return /^(?:27|13)$/.test(f) ? h.blur() : "keydown" === e.type ? (o ? d = z(Math.round(1e6 * (+u + o)) / 1e6, q[0], q[1]) : /^(?:8|46)$/.test(f) && (s.range || (s.range++, s.start -= 8 === f ? 1 : 0), w.splice(s.start, s.range), d = w.join("") || "0"), d !== b && B(e, !0)) : "keypress" === e.type && (/^(?:37|39|8|46|9)$/.test(f) || B(e, !0), p.test(g) && (w.splice(s.start, s.range, g), d = w.join("")), s.start++), 13 === f && n ? r.data.length % 3 === 0 || "0" === r.data ? M.setColor("0" === r.data ? "000" : r.data, "rgb", ab.alpha, !0) : (B(e, !0), h.focus()) : (n && d !== b && (d = /^0+/.test(d) ? d : parseInt("" + d, 16) || 0), void(d !== b && "" !== d && +d >= q[0] && +d <= q[1] && (n && (d = d.toString(16).toUpperCase() || "0"), m ? ab[k] = +d : n || (ab[k][l] = +d / ("Lab" === k ? 1 : q[1])), t(m ? "alpha" : k), v(ab), I = !0, i(c, e.type), r.data = d, H(h, Math.min(h.firstChild.data.length, s.start < 0 ? 0 : s.start)))))
    }

    function o(c) {
        var d, e, f = c || a.event, g = f.target || f.srcElement, h = g.className, j = g.parentNode, k = bb, l = ab.RND.rgb, m = bb.mode, n = "", o = k.CSSPrefix, p = /(?:hs|rgb)/.test(j.className) && /^[HSBLRG]$/.test(g.firstChild ? g.firstChild.data : ""), q = /dblc/.test(f.type), r = "";
        if (!q || p) {
            if (-1 !== h.indexOf("-labl " + o + "labl"))C(cb[h.split("-")[0]], o + "hide", ""), C(cb[j.className.split("-")[1]], o + "hide"); else if (-1 !== h.indexOf(o + "butt"))if (p)q && 2 === bb.scale && (n = /hs/.test(m.type) ? "rgb" : /hide/.test(cb.hsl.className) ? "hsv" : "hsl", n = n + "-" + n[m.type.indexOf(m.z)]), M.setMode(n ? n : h.replace("-butt", "").split(" ")[0]), r = "modeChange"; else if (/^[rgb]/.test(h))n = h.split("-")[1], C(cb.colorPicker, "no-rgb-" + n, (k["noRGB" + n] = !k["noRGB" + n]) ? b : ""), r = "noRGB" + n; else if (g === cb.alpha_labl)d = k.customBG, e = k.alphaBG, C(cb.colorPicker, "alpha-bg-" + e, "alpha-bg-" + (e = k.alphaBG = c.data || ("w" === e ? d ? "c" : "b" : "c" === e ? "b" : "w"))), g.firstChild.data = e.toUpperCase(), cb.ctrl.style.backgroundColor = cb.memo.style.backgroundColor = "c" !== e ? "" : "rgb(" + Math.round(255 * d.r) + ", " + Math.round(255 * d.g) + ", " + Math.round(255 * d.b) + ")", cb.raster.style.cssText = cb.raster_bg.previousSibling.style.cssText = "c" !== e ? "" : A(d.luminance < .22 ? .5 : .4), r = "alphaBackground"; else if (g === cb.alpha_butt)C(cb.colorPicker, "mute-alpha", (k.muteAlpha = !k.muteAlpha) ? b : ""), r = "alphaState"; else if (g === cb.HEX_butt)C(cb.colorPicker, "no-HEX", (k.HEXState = !k.HEXState) ? b : ""), r = "HEXState"; else if (g === cb.HEX_labl) {
                var s = "web save" === ab.saveColor;
                "web smart" === ab.saveColor || s ? s ? M.setColor(k.webUnsave, "rgb") : (k.webUnsave || (k.webUnsave = x(l)), M.setColor(ab.webSave, "rgb")) : (k.webUnsave = x(l), M.setColor(ab.webSmart, "rgb")), r = "webColorState"
            } else/Lab-x-labl/.test(h) && (C(cb.colorPicker, "cmy-only", (k.cmyOnly = !k.cmyOnly) ? b : ""), r = "cmykState"); else if (g === cb.bsav)u(), r = "saveAsBackground"; else if (g === cb.bres) {
                var w = x(l), y = ab.alpha;
                M.setColor(k.color), u(), M.setColor(w, "rgb", y), r = "resetColor"
            } else if (j === cb.col1)ab.hsv.h -= ab.hsv.h > .5 ? .5 : -.5, t("hsv"), r = "shiftColor"; else if (j === cb.col2)M.setColor(g.style.backgroundColor, "rgb", ab.background.alpha), r = "setSavedColor"; else if (j === cb.memo) {
                var z = function() {cb.memos.blinker && (cb.memos.blinker.style.cssText = cb.memos.cssText)}, B = function(b) {cb.memos.blinker = b, b.style.cssText = "background-color:" + (ab.RGBLuminance > .22 ? "#333" : "#DDD"), window.setTimeout(z, 200)};
                if (g === cb.memo_cursor) {
                    z(), cb.memos.blinker = b, cb.testNode.style.cssText = cb.memo_store.style.cssText, cb.memos.cssText = cb.testNode.style.cssText;
                    for (var D = cb.memos.length - 1; D--;)if (cb.memos.cssText === cb.memos[D].style.cssText) {
                        B(cb.memos[D]);
                        break
                    }
                    if (!cb.memos.blinker) {
                        for (var D = cb.memos.length - 1; D--;)cb.memos[D + 1].style.cssText = cb.memos[D].style.cssText;
                        cb.memos[0].style.cssText = cb.memo_store.style.cssText
                    }
                    r = "toMemery"
                } else z(), M.setColor(g.style.backgroundColor, "rgb", g.style.opacity || 1), cb.memos.cssText = g.style.cssText, B(g), I = 1, r = "fromMemory"
            }
            r && (v(ab), I = I || !0, i(c, r))
        }
    }

    function p(c, d) {
        var e, f = c || a.event, g = f ? E(f) : {}, h = d !== b, i = h ? d : g.X - X.left + 8, j = h ? d : g.Y - X.top + 8, k = [" S XS XXS", " S XS", " S", ""], l = bb.sizes, m = h ? d : j < l.XXS[1] + 25 ? 0 : i < l.XS[0] + 25 ? 1 : i < l.S[0] + 25 || j < l.S[1] + 25 ? 2 : 3, n = k[m], o = !1, p = "";
        $.resizer !== n && (o = /XX/.test(n), e = bb.mode, !o || /hs/.test(e.type) && "h" !== e.z ? e.original && M.setMode(e.original) : (p = e.type + "-" + e.z, M.setMode(/hs/.test(e.type) ? e.type + "-s" : "hsv-s"), bb.mode.original = p), cb.colorPicker.className = cb.colorPicker.className.replace(/\s+(?:S|XS|XXS)/g, "") + n, bb.scale = o ? 4 : /S/.test(n) ? 2 : 1, bb.currentSize = m, $.resizer = n, Y = !0, w(), s()), cb.resizer.style.cssText = "display: block;width: " + (i > 10 ? i : 10) + "px;height: " + (j > 10 ? j : 10) + "px;"
    }

    function q(a) {
        var b = {
            rgb_r: {
                x: "b",
                y: "g"
            },
            rgb_g: {
                x: "b",
                y: "r"
            },
            rgb_b: {
                x: "r",
                y: "g"
            },
            hsv_h: {
                x: "s",
                y: "v"
            },
            hsv_s: {
                x: "h",
                y: "v"
            },
            hsv_v: {
                x: "h",
                y: "s"
            },
            hsl_h: {
                x: "s",
                y: "l"
            },
            hsl_s: {
                x: "h",
                y: "l"
            },
            hsl_l: {
                x: "h",
                y: "s"
            }
        }, c = a.replace("-", "_"), d = "\\b(?:rg|hs)\\w\\-\\w\\b";
        return C(cb.panel, d, a), C(cb.slds, d, a), a = a.split("-"), bb.mode = {
            type: a[0],
            x: b[c].x,
            y: b[c].y,
            z: a[1]
        }
    }

    function r() {
        var a = /\s+(?:hue-)*(?:dark|light)/g;
        cb.curl.className = cb.curl.className.replace(a, ""), cb.curr.className = cb.curr.className.replace(a, ""), cb.slds.className = cb.slds.className.replace(a, ""), cb.sldr_2.className = bb.CSSPrefix + "sldr-2", cb.sldr_4.className = bb.CSSPrefix + "sldr-4", cb.sldl_3.className = bb.CSSPrefix + "sldl-3";
        for (var b in cb.styles)b.indexOf("sld") || (cb.styles[b].cssText = "");
        $ = {}
    }

    function s() {cb.styles.curr.cssText = cb.styles.curl.cssText, cb.curl.className = bb.CSSPrefix + "curl" + (Z.noRGBZ ? " " + bb.CSSPrefix + "curl-" + Z.noRGBZ : ""), cb.curr.className = bb.CSSPrefix + "curr " + bb.CSSPrefix + "curr-" + ("h" === bb.mode.z ? Z.HUEContrast : Z.noRGBZ ? Z.noRGBZ : Z.RGBLuminance)}

    function t(a) {v(_.setColor(b, a || bb.mode.type)), Y = !0}

    function u(a) {return _.saveAsBackground(), cb.styles.col2.cssText = "background-color: " + y(ab.background.RGB) + ";" + A(ab.background.alpha), a && v(ab), ab}

    function v(a) {
        var c = Z, d = T[bb.alphaBG];
        c.hueDelta = Math.round(100 * a["rgbaMixBGMix" + d].hueDelta), c.luminanceDelta = Math.round(100 * a["rgbaMixBGMix" + d].luminanceDelta), c.RGBLuminance = a.RGBLuminance > .22 ? "light" : "dark", c.HUEContrast = a.HUELuminance > .22 ? "light" : "dark", c.contrast = c.luminanceDelta > c.hueDelta ? "contrast" : "", c.readabiltiy = a["rgbaMixBGMix" + d].WCAG2Ratio >= 7 ? "green" : a["rgbaMixBGMix" + d].WCAG2Ratio >= 4.5 ? "orange" : "", c.noRGBZ = bb["no" + bb.mode.type.toUpperCase() + bb.mode.z] ? "g" === bb.mode.z && a.rgb.g < .59 || "b" === bb.mode.z || "r" === bb.mode.z ? "dark" : "light" : b
    }

    function w() {
        if (I) {
            if (!Y)return L = a[eb](w);
            Y = !1
        }
        var c, d, e, f, g = bb, h = ab, i = Z, l = $, m = g.mode, n = cb, o = g.CSSPrefix, p = S, q = K, r = n.styles, s = n.textNodes, t = bb.scale, u = h[m.type][m.x], v = Math.round(255 * u / (4 === t ? 2 : t)), x = h[m.type][m.y], z = 1 - x, B = Math.round(255 * z / t), C = 1 - h[m.type][m.z], D = Math.round(255 * C / t), E = [u, x], F = 0, G = 0, H = "rgb" === m.type, M = "h" === m.z, N = "hsl" === m.type, O = N && "s" === m.z, P = I === j, Q = I === k;
        H && (E[0] >= E[1] ? G = 1 : F = 1, l.sliderSwap !== F && (n.sldr_2.className = g.CSSPrefix + "sldr-" + (3 - F), l.sliderSwap = F)), (H && !Q || M && !P || !M && !Q) && (r[M ? "sldl_2" : "sldr_2"][H ? "cssText" : "backgroundColor"] = H ? A((E[F] - E[G]) / (1 - E[G] || 0)) : y(h.hueRGB)), M || (Q || (r.sldr_4.cssText = A(H ? E[G] : O ? Math.abs(1 - 2 * z) : z)), P || (r.sldl_3.cssText = A(N && "l" === m.z ? Math.abs(1 - 2 * C) : C)), N && (f = O ? "sldr_4" : "sldl_3", d = O ? "r-" : "l-", e = O ? z > .5 ? 4 : 3 : C > .5 ? 3 : 4, l[f] !== e && (n[f].className = g.CSSPrefix + "sld" + d + e, l[f] = e))), Q || (r.curm.cssText = "left: " + v + "px; top: " + B + "px;"), P || (r.curl.top = D + "px"), q && (r.curr.top = D + "px"), (q && "alpha" === q.type || J === n.opacity) && (r.opacity_slider.left = g.opacityPositionRelative ? h.alpha * ((X.width || n.opacity.offsetWidth) - (X.childWidth || n.opacity_slider.offsetWidth)) + "px" : 100 * h.alpha + "%"), r.col1.cssText = "background-color: " + y(h.RND.rgb) + "; " + (g.muteAlpha ? "" : A(h.alpha)), r.opacity.backgroundColor = y(h.RND.rgb), r.cold.width = i.hueDelta + "%", r.cont.width = i.luminanceDelta + "%";
        for (c in s)d = c.split("_"), g.cmyOnly && (d[0] = d[0].replace("k", "")), e = d[1] ? h.RND[d[0]][d[1]] : h.RND[d[0]] || h[d[0]], l[c] !== e && (l[c] = e, s[c].data = e > 359.5 && "HEX" !== c ? 0 : e, "HEX" === c || g.noRangeBackground || (e = h[d[0]][d[1]] !== b ? h[d[0]][d[1]] : h[d[0]], "Lab" === d[0] && (e = (e - p[d[0]][d[1]][0]) / (p[d[0]][d[1]][1] - p[d[0]][d[1]][0])), r[c].backgroundPosition = Math.round(100 * (1 - e)) + "% 0%"));
        d = h._rgb ? [h._rgb.r !== h.rgb.r, h._rgb.g !== h.rgb.g, h._rgb.b !== h.rgb.b] : [], d.join("") !== l.outOfGammut && (n.rgb_r_labl.firstChild.data = d[0] ? "!" : " ", n.rgb_g_labl.firstChild.data = d[1] ? "!" : " ", n.rgb_b_labl.firstChild.data = d[2] ? "!" : " ", l.outOfGammut = d.join("")), i.noRGBZ && l.noRGBZ !== i.noRGBZ && (n.curl.className = o + "curl " + o + "curl-" + i.noRGBZ, Q || (n.curr.className = o + "curr " + o + "curr-" + i.noRGBZ), l.noRGBZ = i.noRGBZ), l.HUEContrast !== i.HUEContrast && "h" === m.z ? (n.slds.className = n.slds.className.replace(/\s+hue-(?:dark|light)/, "") + " hue-" + i.HUEContrast, Q || (n.curr.className = o + "curr " + o + "curr-" + i.HUEContrast), l.HUEContrast = i.HUEContrast) : l.RGBLuminance !== i.RGBLuminance && (n.colorPicker.className = n.colorPicker.className.replace(/\s+(?:dark|light)/, "") + " " + i.RGBLuminance, Q || "h" === m.z || i.noRGBZ || (n.curr.className = o + "curr " + o + "curr-" + i.RGBLuminance), l.RGBLuminance = i.RGBLuminance), (l.contrast !== i.contrast || l.readabiltiy !== i.readabiltiy) && (n.ctrl.className = n.ctrl.className.replace(" contrast", "").replace(/\s*(?:orange|green)/, "") + (i.contrast ? " " + i.contrast : "") + (i.readabiltiy ? " " + i.readabiltiy : ""), l.contrast = i.contrast, l.readabiltiy = i.readabiltiy), l.saveColor !== h.saveColor && (n.HEX_labl.firstChild.data = h.saveColor ? "web save" === h.saveColor ? "W" : "M" : "!", l.saveColor = h.saveColor), g.renderCallback && g.renderCallback(h, m), I && (L = a[eb](w))
    }

    function x(a) {
        var b = {};
        for (var c in a)b[c] = a[c];
        return b
    }

    function y(a, b) {
        for (var c = "", d = (b || "rgb").split(""), e = d.length; e--;)c = ", " + a[d[e]] + c;
        return (b || "rgb") + "(" + c.substr(2) + ")"
    }

    function z(a, b, c) {return a > c ? c : b > a ? b : a}

    function A(a) {return a === b && (a = 1), R ? "opacity: " + Math.round(1e10 * a) / 1e10 + ";" : "filter: alpha(opacity=" + Math.round(100 * a) + ");"}

    function B(b, c) {return b.preventDefault ? b.preventDefault() : b.returnValue = !1, c || (window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()), !1}

    function C(a, c, d) {return a ? a.className = d !== b ? a.className.replace(new RegExp("\\s+?" + c, "g"), d ? " " + d : "") : a.className + " " + c : !1}

    function D(b) {
        var c = b.getBoundingClientRect ? b.getBoundingClientRect() : {
            top: 0,
            left: 0
        }, d = b && b.ownerDocument, e = d.body, f = d.defaultView || d.parentWindow || a, g = d.documentElement || e.parentNode, h = g.clientTop || e.clientTop || 0, i = g.clientLeft || e.clientLeft || 0;
        return {
            left: c.left + (f.pageXOffset || g.scrollLeft) - i,
            top: c.top + (f.pageYOffset || g.scrollTop) - h
        }
    }

    function E(a) {
        return {
            X: a.pageX || a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            Y: a.pageY || a.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
    }

    function F(a, b, c) {
        F.cache = F.cache || {
            _get: function(a, b, c, d) {for (var e = F.cache[b] || [], f = e.length; f--;)if (a === e[f].obj && "" + c == "" + e[f].func)return c = e[f].func, d || (e[f] = e[f].obj = e[f].func = null, e.splice(f, 1)), c},
            _set: function(a, b, c) {
                var d = F.cache[b] = F.cache[b] || [];
                return F.cache._get(a, b, c, !0) ? !0 : void d.push({
                    func: c,
                    obj: a
                })
            }
        }, !c.name && F.cache._set(a, b, c) || "function" != typeof c || (window.addEventListener ? window.addEventListener(b, c, !1) : window.attachEvent("on" + b, c))
    }

    function G(a, b, c) {"function" == typeof c && (c.name || (c = F.cache._get(a, b, c) || c), window.removeEventListener ? window.removeEventListener(b, c, !1) : window.detachEvent("on" + b, c))}

    function H(c, d) {
        var e = {};
        if (d === b) {
            if (window.getSelection) {
                c.focus();
                var f = window.getSelection().getRangeAt(0), g = f.cloneRange();
                g.selectNodeContents(c), g.setEnd(f.endContainer, f.endOffset), e = {
                    end: g.toString().length,
                    range: f.toString().length
                }
            } else {
                c.focus();
                var f = document.selection.createRange(), g = document.body.createTextRange();
                g.moveToElementText(c), g.setEndPoint("EndToEnd", f), e = {
                    end: g.text.length,
                    range: f.text.length
                }
            }
            return e.start = e.end - e.range, e
        }
        if (-1 == d && (d = c.text().length), window.getSelection)c.focus(), window.getSelection().collapse(c.firstChild, d); else {
            var h = document.body.createTextRange();
            h.moveToElementText(c), h.moveStart("character", d), h.collapse(!0), h.select()
        }
        return d
    }

    var I, J, K, L, M, N, O = a.ColorPicker, P = !O, Q = document.createStyleSheet !== b && document.getElementById || !!a.MSInputMethodContext, R = true, S = {}, T = {
        w: "White",
        b: "Black",
        c: "Custom"
    }, U = "", V = 1, W = {}, X = {}, Y = !0, Z = {}, $ = {}, _ = {}, ab = {}, bb = {}, cb = {}, db = "AnimationFrame", eb = "request" + db, fb = "cancel" + db, gb = ["ms", "moz", "webkit", "o"], hb = function(a) {
        this.options = {
            color: "rgba(204, 82, 37, 0.8)",
            mode: "rgb-b",
            fps: 60,
            delayOffset: 8,
            CSSPrefix: "cp-",
            allMixDetails: !0,
            alphaBG: "w",
            imagePath: ""
        }, c(this, a || {})
    };
    a.ColorPicker = hb, hb.addEvent = F, hb.removeEvent = G, hb.getOrigin = D, hb.limitValue = z, hb.changeClass = C, hb.prototype.setColor = function(a, b, c, e) {d(this), K = !0, v(_.setColor.apply(_, arguments)), e && this.startRender(!0)}, hb.prototype.saveAsBackground = function() {return d(this), u(!0)}, hb.prototype.setCustomBackground = function(a) {return d(this), _.setCustomBackground(a)}, hb.prototype.startRender = function(b) {d(this), b ? (I = !1, w(), this.stopRender()) : (I = 1, L = a[eb](w))}, hb.prototype.stopRender = function() {d(this), a[fb](L), K && (I = 1, i(b, "external"))}, hb.prototype.setMode = function(a) {d(this), q(a), r(), w()}, hb.prototype.destroyAll = function() {
        var a = this.nodes.colorPicker, b = function(a) {for (var c in a)(a[c] && "[object Object]" === a[c].toString() || a[c]instanceof Array) && b(a[c]), a[c] = null, delete a[c]};
        this.stopRender(), h(this, !0), b(this), a.parentNode.removeChild(a), a = null
    }, F(Q ? document.body : a, "mouseup", i);
    for (var ib = gb.length; ib-- && !a[eb];)a[eb] = a[gb[ib] + "Request" + db], a[fb] = a[gb[ib] + "Cancel" + db] || a[gb[ib] + "CancelRequest" + db];
    a[eb] = a[eb] || function(b) {return window.setTimeout(b, 1e3 / bb.fps)}, a[fb] = a[fb] || function(b) {return window.clearTimeout(b), L = null}
}(Colorpicker);
//# sourceMappingURL=colorPicker.js.map

Colorpicker.jsColorPicker = function(selectors, config) {
    var renderCallback = function(colors, mode) {
            var options = this,
                input = options.input,
                patch = options.patch,
                RGB = colors.RND.rgb,
                HSL = colors.RND.hsl,
                AHEX = options.isIE8 ? (colors.alpha < 0.16 ? '0' : '') +
                (Math.round(colors.alpha * 100)).toString(16).toUpperCase() + colors.HEX : '',
                RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b,
                RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')',
                isAlpha = colors.alpha !== 1 && !options.isIE8,
                colorMode = input.getAttribute('data-colorMode');

            patch.style.cssText =
                'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
                'background-color:' + RGBAText + ';' +
                'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
                'startColorstr=#' + AHEX + ',' + 'endColorstr=#' + AHEX + ')' : '');

            input.value = (colorMode === 'HEX' && !isAlpha ? '#' + (options.isIE8 ? AHEX : colors.HEX) :
                colorMode === 'rgb' || (colorMode === 'HEX' && isAlpha) ?
                    (!isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) :
                    ('hsl' + (isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
                    (isAlpha ? ', ' + colors.alpha : '') + ')')
            );

            if (options.displayCallback) {
                options.displayCallback(colors, mode, options);
            }
        },
        actionCallback = function(event, action) {
            var options = this,
                colorPicker = colorPickers.current;

            if (action === 'toMemery') {
                var memos = colorPicker.nodes.memos,
                    backgroundColor = '',
                    opacity = 0,
                    cookieTXT = [];

                for (var n = 0, m = memos.length; n < m; n++) {
                    backgroundColor = memos[n].style.backgroundColor;
                    opacity = memos[n].style.opacity;
                    opacity = Math.round((opacity === '' ? 1 : opacity) * 100) / 100;
                    cookieTXT.push(backgroundColor.
                            replace(/, /g, ',').
                            replace('rgb(', 'rgba(').
                            replace(')', ',' + opacity + ')')
                    );
                }
                cookieTXT = '\'' + cookieTXT.join('\',\'') + '\'';
                Colorpicker.ColorPicker.docCookies('colorPickerMemos' + (options.noAlpha ? 'NoAlpha' : ''), cookieTXT);
            } else if (action === 'resizeApp') {
                Colorpicker.ColorPicker.docCookies('colorPickerSize', colorPicker.color.options.currentSize);
            } else if (action === 'modeChange') {
                var mode = colorPicker.color.options.mode;

                Colorpicker.ColorPicker.docCookies('colorPickerMode', mode.type + '-' + mode.z);
            }
        },
        createInstance = function(elm, config) {
            var initConfig = {
                klass: Colorpicker.ColorPicker,
                input: elm,
                patch: elm,
                isIE8: !!document.all && !document.addEventListener, // Opera???
                // *** animationSpeed: 200,
                // *** draggable: true,
                margin: {
                    left: -1,
                    top: 2
                },
                customBG: '#FFFFFF',
                // displayCallback: displayCallback,
                /* --- regular colorPicker options from this point --- */
                color: elm.value,
                initStyle: 'display: none',
                mode: Colorpicker.ColorPicker.docCookies('colorPickerMode') || 'hsv-h',
                // memoryColors: (function(colors, config) {
                // 	return config.noAlpha ?
                // 		colors.replace(/\,\d*\.*\d*\)/g, ',1)') : colors;
                // })($.docCookies('colorPickerMemos'), config || {}),
                memoryColors: Colorpicker.ColorPicker.docCookies('colorPickerMemos' +
                ((config || {}).noAlpha ? 'NoAlpha' : '')),
                size: Colorpicker.ColorPicker.docCookies('colorPickerSize') || 1,
                renderCallback: renderCallback,
                actionCallback: actionCallback
            };

            for (var n in config) {
                initConfig[n] = config[n];
            }
            return new initConfig.klass(initConfig);
        },
        doEventListeners = function(elm, multiple, off) {
            var onOff = off ? 'removeEventListener' : 'addEventListener',
                focusListener = function(e) {
                    var input = this,
                        bounding = this.getBoundingClientRect(),
                        position = {
                            left: bounding.left,
                            top: bounding.top
                        },
                        index = multiple ? Array.prototype.indexOf.call(elms, this) : 0,
                        colorPicker = colorPickers[index] ||
                            (colorPickers[index] = createInstance(this, config)),
                        options = colorPicker.color.options,
                        colorPickerUI = colorPicker.nodes.colorPicker;

                    options.color = elm.value; // brings color to default on reset
                    colorPickerUI.style.cssText =
                        'position: absolute;' +
                        'left:' + (window.scrollX + position.left + options.margin.left) + 'px;' +
                        'top:' + (window.scrollY + position.top + bounding.height + options.margin.top) + 'px;';

                    if (!multiple) {
                        options.input = elm;
                        options.patch = elm; // check again???
                        colorPicker.setColor(elm.value, undefined, undefined, true);
                        colorPicker.saveAsBackground();
                    }
                    colorPickers.current = colorPickers[index];
                    (options.appenTo || document.body).appendChild(colorPickerUI);
                    setTimeout(function() { // compensating late style on onload in colorPicker
                        colorPickerUI.style.display = 'block';
                    }, 0);
                },
                mousDownListener = function(e) {
                    var colorPicker = colorPickers.current,
                        colorPickerUI = (colorPicker ? colorPicker.nodes.colorPicker : undefined),
                        animationSpeed = colorPicker ? colorPicker.color.options.animationSpeed : 0,
                        isColorPicker = function(elm) {
                            while (elm) {
                                if ((elm.className || '').indexOf('cp-app') !== -1) return elm;
                                elm = elm.parentNode;
                            }
                            return false;
                        }(e.target),
                        inputIndex = Array.prototype.indexOf.call(elms, e.target);

                    if (isColorPicker && Array.prototype.indexOf.call(colorPickers, isColorPicker)) {
                        if (e.target === colorPicker.nodes.exit) {
                            colorPickerUI.style.display = 'none';
                            document.activeElement.blur();
                        } else {
                            // ...
                        }
                    } else if (inputIndex !== -1) {
                        // ...
                    } else if (colorPickerUI) {
                        colorPickerUI.style.display = 'none';
                    }
                };

            elm[onOff]('focus', focusListener);

            if (!colorPickers.evt || off) {
                colorPickers.evt = true; // prevent new eventListener for window

                window[onOff]('mousedown', mousDownListener);
            }
        },
        // this is a way to prevent data binding on HTMLElements
        colorPickers = Colorpicker.jsColorPicker.colorPickers || [],
        elms = document.querySelectorAll(selectors),
        testColors = new Colorpicker.Colors({
            customBG: config.customBG,
            allMixDetails: true
        });

    Colorpicker.jsColorPicker.colorPickers = colorPickers;

    for (var n = 0, m = elms.length; n < m; n++) {
        var elm = elms[n];

        if (config === 'destroy') {
            doEventListeners(elm, (config && config.multipleInstances), true);
            if (colorPickers[n]) {
                colorPickers[n].destroyAll();
            }
        } else {
            var value = elm.value.split('(');

            testColors.setColor(elm.value);
            if (config && config.init) {
                config.init(elm, testColors.colors);
            }
            elm.setAttribute('data-colorMode', value[1] ? value[0].substr(0, 3) : 'HEX');
            doEventListeners(elm, (config && config.multipleInstances), false);
            if (config && config.readOnly) {
                elm.readOnly = true;
            }
        }
    }
    ;

    return this;
};

Colorpicker.ColorPicker.docCookies = function(key, val, options) {
    var encode = encodeURIComponent, decode = decodeURIComponent,
        cookies, n, tmp, cache = {},
        days;

    if (val === undefined) { // all about reading cookies
        cookies = document.cookie.split(/;\s*/) || [];
        for (n = cookies.length; n--;) {
            tmp = cookies[n].split('=');
            if (tmp[0]) cache[decode(tmp.shift())] = decode(tmp.join('=')); // there might be '='s in the value...
        }

        if (!key) return cache; // return Json for easy access to all cookies
        else return cache[key]; // easy access to cookies from here
    } else { // write/delete cookie
        options = options || {};

        if (val === '' || options.expires < 0) { // prepare deleteing the cookie
            options.expires = -1;
            // options.path = options.domain = options.secure = undefined; // to make shure the cookie gets deleted...
        }

        if (options.expires !== undefined) { // prepare date if any
            days = new Date();
            days.setDate(days.getDate() + options.expires);
        }

        document.cookie = encode(key) + '=' + encode(val) +
        (days ? '; expires=' + days.toUTCString() : '') +
        (options.path ? '; path=' + options.path : '') +
        (options.domain ? '; domain=' + options.domain : '') +
        (options.secure ? '; secure' : '');
    }
};


var ready = require('elements/domready'),
    colors;

ready(function() {
    colors = Colorpicker.jsColorPicker('.colorpicker input', {
        customBG: '#222',
        readOnly: true,
        // patch: false,
        init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
            elm.style.backgroundColor = elm.value;
            elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
            elm.nextElementSibling.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#666' : '#ddd';
        },
        displayCallback: function(colors, mode, options) {
            options.input.nextElementSibling.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#666' : '#ddd';
        }
    });
});

module.exports = colors;