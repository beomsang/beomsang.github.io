var Ext = Ext || {};
Ext._startTime = new Date().getTime();
(function() {
    var h = this,
        a = Object.prototype,
        j = a.toString,
        b = true,
        g = {
            toString: 1
        },
        e = function() {},
        d = function() {
            var i = d.caller.caller;
            return i.$owner.prototype[i.$name].apply(this, arguments)
        },
        c;
    Ext.global = h;
    for (c in g) {
        b = null
    }
    if (b) {
        b = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"]
    }
    Ext.enumerables = b;
    Ext.apply = function(o, n, q) {
        if (q) {
            Ext.apply(o, q)
        }
        if (o && n && typeof n === "object") {
            var p, m, l;
            for (p in n) {
                o[p] = n[p]
            }
            if (b) {
                for (m = b.length; m--;) {
                    l = b[m];
                    if (n.hasOwnProperty(l)) {
                        o[l] = n[l]
                    }
                }
            }
        }
        return o
    };
    Ext.buildSettings = Ext.apply({
        baseCSSPrefix: "x-",
        scopeResetCSS: false
    }, Ext.buildSettings || {});
    Ext.apply(Ext, {
        name: Ext.sandboxName || "Ext",
        emptyFn: e,
        identityFn: function(i) {
            return i
        },
        emptyString: new String(),
        baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,
        applyIf: function(k, i) {
            var l;
            if (k) {
                for (l in i) {
                    if (k[l] === undefined) {
                        k[l] = i[l]
                    }
                }
            }
            return k
        },
        iterate: function(i, l, k) {
            if (Ext.isEmpty(i)) {
                return
            }
            if (k === undefined) {
                k = i
            }
            if (Ext.isIterable(i)) {
                Ext.Array.each.call(Ext.Array, i, l, k)
            } else {
                Ext.Object.each.call(Ext.Object, i, l, k)
            }
        }
    });
    Ext.apply(Ext, {
        extend: (function() {
            var i = a.constructor,
                k = function(n) {
                    for (var l in n) {
                        if (!n.hasOwnProperty(l)) {
                            continue
                        }
                        this[l] = n[l]
                    }
                };
            return function(l, q, o) {
                if (Ext.isObject(q)) {
                    o = q;
                    q = l;
                    l = o.constructor !== i ? o.constructor : function() {
                        q.apply(this, arguments)
                    }
                }
                var n = function() {},
                    m, p = q.prototype;
                n.prototype = p;
                m = l.prototype = new n();
                m.constructor = l;
                l.superclass = p;
                if (p.constructor === i) {
                    p.constructor = q
                }
                l.override = function(r) {
                    Ext.override(l, r)
                };
                m.override = k;
                m.proto = m;
                l.override(o);
                l.extend = function(r) {
                    return Ext.extend(l, r)
                };
                return l
            }
        }()),
        override: function(m, n) {
            if (m.$isClass) {
                m.override(n)
            } else {
                if (typeof m == "function") {
                    Ext.apply(m.prototype, n)
                } else {
                    var i = m.self,
                        k, l;
                    if (i && i.$isClass) {
                        for (k in n) {
                            if (n.hasOwnProperty(k)) {
                                l = n[k];
                                if (typeof l == "function") {
                                    l.$name = k;
                                    l.$owner = i;
                                    l.$previous = m.hasOwnProperty(k) ? m[k] : d
                                }
                                m[k] = l
                            }
                        }
                    } else {
                        Ext.apply(m, n)
                    }
                }
            }
            return m
        }
    });
    Ext.apply(Ext, {
        valueFrom: function(l, i, k) {
            return Ext.isEmpty(l, k) ? i : l
        },
        typeOf: function(k) {
            var i, l;
            if (k === null) {
                return "null"
            }
            i = typeof k;
            if (i === "undefined" || i === "string" || i === "number" || i === "boolean") {
                return i
            }
            l = j.call(k);
            switch (l) {
                case "[object Array]":
                    return "array";
                case "[object Date]":
                    return "date";
                case "[object Boolean]":
                    return "boolean";
                case "[object Number]":
                    return "number";
                case "[object RegExp]":
                    return "regexp"
            }
            if (i === "function") {
                return "function"
            }
            if (i === "object") {
                if (k.nodeType !== undefined) {
                    if (k.nodeType === 3) {
                        return (/\S/).test(k.nodeValue) ? "textnode" : "whitespace"
                    } else {
                        return "element"
                    }
                }
                return "object"
            }
        },
        isEmpty: function(i, k) {
            return (i === null) || (i === undefined) || (!k ? i === "" : false) || (Ext.isArray(i) && i.length === 0)
        },
        isArray: ("isArray" in Array) ? Array.isArray : function(i) {
            return j.call(i) === "[object Array]"
        },
        isDate: function(i) {
            return j.call(i) === "[object Date]"
        },
        isObject: (j.call(null) === "[object Object]") ? function(i) {
            return i !== null && i !== undefined && j.call(i) === "[object Object]" && i.ownerDocument === undefined
        } : function(i) {
            return j.call(i) === "[object Object]"
        },
        isSimpleObject: function(i) {
            return i instanceof Object && i.constructor === Object
        },
        isPrimitive: function(k) {
            var i = typeof k;
            return i === "string" || i === "number" || i === "boolean"
        },
        isFunction: (typeof document !== "undefined" && typeof document.getElementsByTagName("body") === "function") ? function(i) {
            return j.call(i) === "[object Function]"
        } : function(i) {
            return typeof i === "function"
        },
        isNumber: function(i) {
            return typeof i === "number" && isFinite(i)
        },
        isNumeric: function(i) {
            return !isNaN(parseFloat(i)) && isFinite(i)
        },
        isString: function(i) {
            return typeof i === "string"
        },
        isBoolean: function(i) {
            return typeof i === "boolean"
        },
        isElement: function(i) {
            return i ? i.nodeType === 1 : false
        },
        isTextNode: function(i) {
            return i ? i.nodeName === "#text" : false
        },
        isDefined: function(i) {
            return typeof i !== "undefined"
        },
        isIterable: function(k) {
            var i = typeof k,
                l = false;
            if (k && i != "string") {
                if (i == "function") {
                    if (Ext.isSafari) {
                        l = k instanceof NodeList || k instanceof HTMLCollection
                    }
                } else {
                    l = true
                }
            }
            return l ? k.length !== undefined : false
        }
    });
    Ext.apply(Ext, {
        clone: function(q) {
            var p, o, m, l, r, n;
            if (q === null || q === undefined) {
                return q
            }
            if (q.nodeType && q.cloneNode) {
                return q.cloneNode(true)
            }
            p = j.call(q);
            if (p === "[object Date]") {
                return new Date(q.getTime())
            }
            if (p === "[object Array]") {
                o = q.length;
                r = [];
                while (o--) {
                    r[o] = Ext.clone(q[o])
                }
            } else {
                if (p === "[object Object]" && q.constructor === Object) {
                    r = {};
                    for (n in q) {
                        r[n] = Ext.clone(q[n])
                    }
                    if (b) {
                        for (m = b.length; m--;) {
                            l = b[m];
                            r[l] = q[l]
                        }
                    }
                }
            }
            return r || q
        },
        getUniqueGlobalNamespace: function() {
            var l = this.uniqueGlobalNamespace,
                k;
            if (l === undefined) {
                k = 0;
                do {
                    l = "ExtBox" + (++k)
                } while (Ext.global[l] !== undefined);
                Ext.global[l] = Ext;
                this.uniqueGlobalNamespace = l
            }
            return l
        },
        functionFactoryCache: {},
        cacheableFunctionFactory: function() {
            var o = this,
                l = Array.prototype.slice.call(arguments),
                k = o.functionFactoryCache,
                i, m, n;
            if (Ext.isSandboxed) {
                n = l.length;
                if (n > 0) {
                    n--;
                    l[n] = "var Ext=window." + Ext.name + ";" + l[n]
                }
            }
            i = l.join("");
            m = k[i];
            if (!m) {
                m = Function.prototype.constructor.apply(Function.prototype, l);
                k[i] = m
            }
            return m
        },
        functionFactory: function() {
            var l = this,
                i = Array.prototype.slice.call(arguments),
                k;
            if (Ext.isSandboxed) {
                k = i.length;
                if (k > 0) {
                    k--;
                    i[k] = "var Ext=window." + Ext.name + ";" + i[k]
                }
            }
            return Function.prototype.constructor.apply(Function.prototype, i)
        },
        Logger: {
            verbose: e,
            log: e,
            info: e,
            warn: e,
            error: function(i) {
                throw new Error(i)
            },
            deprecate: e
        }
    });
    Ext.type = Ext.typeOf
}());
Ext.globalEval = Ext.global.execScript ? function(a) {
    execScript(a)
} : function($$code) {
    (function() {
        var Ext = this.Ext;
        eval($$code)
    }())
};
(function() {
    var a = "4.1.3.548",
        b;
    Ext.Version = b = Ext.extend(Object, {
        constructor: function(c) {
            var e, d;
            if (c instanceof b) {
                return c
            }
            this.version = this.shortVersion = String(c).toLowerCase().replace(/_/g, ".").replace(/[\-+]/g, "");
            d = this.version.search(/([^\d\.])/);
            if (d !== -1) {
                this.release = this.version.substr(d, c.length);
                this.shortVersion = this.version.substr(0, d)
            }
            this.shortVersion = this.shortVersion.replace(/[^\d]/g, "");
            e = this.version.split(".");
            this.major = parseInt(e.shift() || 0, 10);
            this.minor = parseInt(e.shift() || 0, 10);
            this.patch = parseInt(e.shift() || 0, 10);
            this.build = parseInt(e.shift() || 0, 10);
            return this
        },
        toString: function() {
            return this.version
        },
        valueOf: function() {
            return this.version
        },
        getMajor: function() {
            return this.major || 0
        },
        getMinor: function() {
            return this.minor || 0
        },
        getPatch: function() {
            return this.patch || 0
        },
        getBuild: function() {
            return this.build || 0
        },
        getRelease: function() {
            return this.release || ""
        },
        isGreaterThan: function(c) {
            return b.compare(this.version, c) === 1
        },
        isGreaterThanOrEqual: function(c) {
            return b.compare(this.version, c) >= 0
        },
        isLessThan: function(c) {
            return b.compare(this.version, c) === -1
        },
        isLessThanOrEqual: function(c) {
            return b.compare(this.version, c) <= 0
        },
        equals: function(c) {
            return b.compare(this.version, c) === 0
        },
        match: function(c) {
            c = String(c);
            return this.version.substr(0, c.length) === c
        },
        toArray: function() {
            return [this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()]
        },
        getShortVersion: function() {
            return this.shortVersion
        },
        gt: function() {
            return this.isGreaterThan.apply(this, arguments)
        },
        lt: function() {
            return this.isLessThan.apply(this, arguments)
        },
        gtEq: function() {
            return this.isGreaterThanOrEqual.apply(this, arguments)
        },
        ltEq: function() {
            return this.isLessThanOrEqual.apply(this, arguments)
        }
    });
    Ext.apply(b, {
        releaseValueMap: {
            dev: -6,
            alpha: -5,
            a: -5,
            beta: -4,
            b: -4,
            rc: -3,
            "#": -2,
            p: -1,
            pl: -1
        },
        getComponentValue: function(c) {
            return !c ? 0 : (isNaN(c) ? this.releaseValueMap[c] || c : parseInt(c, 10))
        },
        compare: function(h, g) {
            var d, e, c;
            h = new b(h).toArray();
            g = new b(g).toArray();
            for (c = 0; c < Math.max(h.length, g.length); c++) {
                d = this.getComponentValue(h[c]);
                e = this.getComponentValue(g[c]);
                if (d < e) {
                    return -1
                } else {
                    if (d > e) {
                        return 1
                    }
                }
            }
            return 0
        }
    });
    Ext.apply(Ext, {
        versions: {},
        lastRegisteredVersion: null,
        setVersion: function(d, c) {
            Ext.versions[d] = new b(c);
            Ext.lastRegisteredVersion = Ext.versions[d];
            return this
        },
        getVersion: function(c) {
            if (c === undefined) {
                return Ext.lastRegisteredVersion
            }
            return Ext.versions[c]
        },
        deprecate: function(c, e, g, d) {
            if (b.compare(Ext.getVersion(c), e) < 1) {
                g.call(d)
            }
        }
    });
    Ext.setVersion("core", a)
}());
Ext.String = (function() {
    var i = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
        m = /('|\\)/g,
        h = /\{(\d+)\}/g,
        b = /([-.*+?\^${}()|\[\]\/\\])/g,
        n = /^\s+|\s+$/g,
        j = /\s+/,
        l = /(^[^a-z]*|[^\w])/gi,
        d, a, g, c, e = function(p, o) {
            return d[o]
        },
        k = function(p, o) {
            return (o in a) ? a[o] : String.fromCharCode(parseInt(o.substr(2), 10))
        };
    return {
        insert: function(q, r, p) {
            if (!q) {
                return r
            }
            if (!r) {
                return q
            }
            var o = q.length;
            if (!p && p !== 0) {
                p = o
            }
            if (p < 0) {
                p *= -1;
                if (p >= o) {
                    p = 0
                } else {
                    p = o - p
                }
            }
            if (p === 0) {
                q = r + q
            } else {
                if (p >= q.length) {
                    q += r
                } else {
                    q = q.substr(0, p) + r + q.substr(p)
                }
            }
            return q
        },
        createVarName: function(o) {
            return o.replace(l, "")
        },
        htmlEncode: function(o) {
            return (!o) ? o : String(o).replace(g, e)
        },
        htmlDecode: function(o) {
            return (!o) ? o : String(o).replace(c, k)
        },
        addCharacterEntities: function(p) {
            var o = [],
                s = [],
                q, r;
            for (q in p) {
                r = p[q];
                a[q] = r;
                d[r] = q;
                o.push(r);
                s.push(q)
            }
            g = new RegExp("(" + o.join("|") + ")", "g");
            c = new RegExp("(" + s.join("|") + "|&#[0-9]{1,5};)", "g")
        },
        resetCharacterEntities: function() {
            d = {};
            a = {};
            this.addCharacterEntities({
                "&amp;": "&",
                "&gt;": ">",
                "&lt;": "<",
                "&quot;": '"',
                "&#39;": "'"
            })
        },
        urlAppend: function(p, o) {
            if (!Ext.isEmpty(o)) {
                return p + (p.indexOf("?") === -1 ? "?" : "&") + o
            }
            return p
        },
        trim: function(o) {
            return o.replace(i, "")
        },
        capitalize: function(o) {
            return o.charAt(0).toUpperCase() + o.substr(1)
        },
        uncapitalize: function(o) {
            return o.charAt(0).toLowerCase() + o.substr(1)
        },
        ellipsis: function(q, o, r) {
            if (q && q.length > o) {
                if (r) {
                    var s = q.substr(0, o - 2),
                        p = Math.max(s.lastIndexOf(" "), s.lastIndexOf("."), s.lastIndexOf("!"), s.lastIndexOf("?"));
                    if (p !== -1 && p >= (o - 15)) {
                        return s.substr(0, p) + "..."
                    }
                }
                return q.substr(0, o - 3) + "..."
            }
            return q
        },
        escapeRegex: function(o) {
            return o.replace(b, "\\$1")
        },
        escape: function(o) {
            return o.replace(m, "\\$1")
        },
        toggle: function(p, q, o) {
            return p === q ? o : q
        },
        leftPad: function(p, q, r) {
            var o = String(p);
            r = r || " ";
            while (o.length < q) {
                o = r + o
            }
            return o
        },
        format: function(p) {
            var o = Ext.Array.toArray(arguments, 1);
            return p.replace(h, function(q, r) {
                return o[r]
            })
        },
        repeat: function(s, r, p) {
            for (var o = [], q = r; q--;) {
                o.push(s)
            }
            return o.join(p || "")
        },
        splitWords: function(o) {
            if (o && typeof o == "string") {
                return o.replace(n, "").split(j)
            }
            return o || []
        }
    }
}());
Ext.String.resetCharacterEntities();
Ext.htmlEncode = Ext.String.htmlEncode;
Ext.htmlDecode = Ext.String.htmlDecode;
Ext.urlAppend = Ext.String.urlAppend;
Ext.Number = new function() {
    var b = this,
        c = (0.9).toFixed() !== "1",
        a = Math;
    Ext.apply(this, {
        constrain: function(h, g, e) {
            var d = parseFloat(h);
            return (d < g) ? g : ((d > e) ? e : d)
        },
        snap: function(h, e, g, i) {
            var d;
            if (h === undefined || h < g) {
                return g || 0
            }
            if (e) {
                d = h % e;
                if (d !== 0) {
                    h -= d;
                    if (d * 2 >= e) {
                        h += e
                    } else {
                        if (d * 2 < -e) {
                            h -= e
                        }
                    }
                }
            }
            return b.constrain(h, g, i)
        },
        snapInRange: function(h, d, g, i) {
            var e;
            g = (g || 0);
            if (h === undefined || h < g) {
                return g
            }
            if (d && (e = ((h - g) % d))) {
                h -= e;
                e *= 2;
                if (e >= d) {
                    h += d
                }
            }
            if (i !== undefined) {
                if (h > (i = b.snapInRange(i, d, g))) {
                    h = i
                }
            }
            return h
        },
        toFixed: c ? function(g, d) {
            d = d || 0;
            var e = a.pow(10, d);
            return (a.round(g * e) / e).toFixed(d)
        } : function(e, d) {
            return e.toFixed(d)
        },
        from: function(e, d) {
            if (isFinite(e)) {
                e = parseFloat(e)
            }
            return !isNaN(e) ? e : d
        },
        randomInt: function(e, d) {
            return a.floor(a.random() * (d - e + 1) + e)
        }
    });
    Ext.num = function() {
        return b.from.apply(this, arguments)
    }
};
(function() {
    var g = Array.prototype,
        o = g.slice,
        q = (function() {
            var A = [],
                e, z = 20;
            if (!A.splice) {
                return false
            }
            while (z--) {
                A.push("A")
            }
            A.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");
            e = A.length;
            A.splice(13, 0, "XXX");
            if (e + 1 != A.length) {
                return false
            }
            return true
        }()),
        j = "forEach" in g,
        u = "map" in g,
        p = "indexOf" in g,
        y = "every" in g,
        c = "some" in g,
        d = "filter" in g,
        n = (function() {
            var e = [1, 2, 3, 4, 5].sort(function() {
                return 0
            });
            return e[0] === 1 && e[1] === 2 && e[2] === 3 && e[3] === 4 && e[4] === 5
        }()),
        k = true,
        a, w, t, v;
    try {
        if (typeof document !== "undefined") {
            o.call(document.getElementsByTagName("body"))
        }
    } catch (s) {
        k = false
    }

    function m(z, e) {
        return (e < 0) ? Math.max(0, z.length + e) : Math.min(z.length, e)
    }

    function x(G, F, z, J) {
        var K = J ? J.length : 0,
            B = G.length,
            H = m(G, F),
            E, I, A, e, C, D;
        if (H === B) {
            if (K) {
                G.push.apply(G, J)
            }
        } else {
            E = Math.min(z, B - H);
            I = H + E;
            A = I + K - E;
            e = B - I;
            C = B - E;
            if (A < I) {
                for (D = 0; D < e; ++D) {
                    G[A + D] = G[I + D]
                }
            } else {
                if (A > I) {
                    for (D = e; D--;) {
                        G[A + D] = G[I + D]
                    }
                }
            }
            if (K && H === C) {
                G.length = C;
                G.push.apply(G, J)
            } else {
                G.length = C + K;
                for (D = 0; D < K; ++D) {
                    G[H + D] = J[D]
                }
            }
        }
        return G
    }

    function i(B, e, A, z) {
        if (z && z.length) {
            if (e < B.length) {
                B.splice.apply(B, [e, A].concat(z))
            } else {
                B.push.apply(B, z)
            }
        } else {
            B.splice(e, A)
        }
        return B
    }

    function b(A, e, z) {
        return x(A, e, z)
    }

    function r(A, e, z) {
        A.splice(e, z);
        return A
    }

    function l(C, e, A) {
        var B = m(C, e),
            z = C.slice(e, m(C, B + A));
        if (arguments.length < 4) {
            x(C, B, A)
        } else {
            x(C, B, A, o.call(arguments, 3))
        }
        return z
    }

    function h(e) {
        return e.splice.apply(e, o.call(arguments, 1))
    }
    w = q ? r : b;
    t = q ? i : x;
    v = q ? h : l;
    a = Ext.Array = {
        each: function(D, B, A, e) {
            D = a.from(D);
            var z, C = D.length;
            if (e !== true) {
                for (z = 0; z < C; z++) {
                    if (B.call(A || D[z], D[z], z, D) === false) {
                        return z
                    }
                }
            } else {
                for (z = C - 1; z > -1; z--) {
                    if (B.call(A || D[z], D[z], z, D) === false) {
                        return z
                    }
                }
            }
            return true
        },
        forEach: j ? function(A, z, e) {
            return A.forEach(z, e)
        } : function(C, A, z) {
            var e = 0,
                B = C.length;
            for (; e < B; e++) {
                A.call(z, C[e], e, C)
            }
        },
        indexOf: p ? function(A, e, z) {
            return A.indexOf(e, z)
        } : function(C, A, B) {
            var e, z = C.length;
            for (e = (B < 0) ? Math.max(0, z + B) : B || 0; e < z; e++) {
                if (C[e] === A) {
                    return e
                }
            }
            return -1
        },
        contains: p ? function(z, e) {
            return z.indexOf(e) !== -1
        } : function(B, A) {
            var e, z;
            for (e = 0, z = B.length; e < z; e++) {
                if (B[e] === A) {
                    return true
                }
            }
            return false
        },
        toArray: function(A, C, e) {
            if (!A || !A.length) {
                return []
            }
            if (typeof A === "string") {
                A = A.split("")
            }
            if (k) {
                return o.call(A, C || 0, e || A.length)
            }
            var B = [],
                z;
            C = C || 0;
            e = e ? ((e < 0) ? A.length + e : e) : A.length;
            for (z = C; z < e; z++) {
                B.push(A[z])
            }
            return B
        },
        pluck: function(D, e) {
            var z = [],
                A, C, B;
            for (A = 0, C = D.length; A < C; A++) {
                B = D[A];
                z.push(B[e])
            }
            return z
        },
        map: u ? function(A, z, e) {
            return A.map(z, e)
        } : function(D, C, B) {
            var A = [],
                z = 0,
                e = D.length;
            for (; z < e; z++) {
                A[z] = C.call(B, D[z], z, D)
            }
            return A
        },
        every: y ? function(A, z, e) {
            return A.every(z, e)
        } : function(C, A, z) {
            var e = 0,
                B = C.length;
            for (; e < B; ++e) {
                if (!A.call(z, C[e], e, C)) {
                    return false
                }
            }
            return true
        },
        some: c ? function(A, z, e) {
            return A.some(z, e)
        } : function(C, A, z) {
            var e = 0,
                B = C.length;
            for (; e < B; ++e) {
                if (A.call(z, C[e], e, C)) {
                    return true
                }
            }
            return false
        },
        clean: function(C) {
            var z = [],
                e = 0,
                B = C.length,
                A;
            for (; e < B; e++) {
                A = C[e];
                if (!Ext.isEmpty(A)) {
                    z.push(A)
                }
            }
            return z
        },
        unique: function(C) {
            var B = [],
                e = 0,
                A = C.length,
                z;
            for (; e < A; e++) {
                z = C[e];
                if (a.indexOf(B, z) === -1) {
                    B.push(z)
                }
            }
            return B
        },
        filter: d ? function(A, z, e) {
            return A.filter(z, e)
        } : function(D, B, A) {
            var z = [],
                e = 0,
                C = D.length;
            for (; e < C; e++) {
                if (B.call(A, D[e], e, D)) {
                    z.push(D[e])
                }
            }
            return z
        },
        from: function(A, z) {
            if (A === undefined || A === null) {
                return []
            }
            if (Ext.isArray(A)) {
                return (z) ? o.call(A) : A
            }
            var e = typeof A;
            if (A && A.length !== undefined && e !== "string" && (e !== "function" || !A.apply)) {
                return a.toArray(A)
            }
            return [A]
        },
        remove: function(A, z) {
            var e = a.indexOf(A, z);
            if (e !== -1) {
                w(A, e, 1)
            }
            return A
        },
        include: function(z, e) {
            if (!a.contains(z, e)) {
                z.push(e)
            }
        },
        clone: function(e) {
            return o.call(e)
        },
        merge: function() {
            var e = o.call(arguments),
                B = [],
                z, A;
            for (z = 0, A = e.length; z < A; z++) {
                B = B.concat(e[z])
            }
            return a.unique(B)
        },
        intersect: function() {
            var e = [],
                A = o.call(arguments),
                L, J, F, I, M, B, z, H, K, C, G, E, D;
            if (!A.length) {
                return e
            }
            L = A.length;
            for (G = M = 0; G < L; G++) {
                B = A[G];
                if (!I || B.length < I.length) {
                    I = B;
                    M = G
                }
            }
            I = a.unique(I);
            w(A, M, 1);
            z = I.length;
            L = A.length;
            for (G = 0; G < z; G++) {
                H = I[G];
                C = 0;
                for (E = 0; E < L; E++) {
                    J = A[E];
                    F = J.length;
                    for (D = 0; D < F; D++) {
                        K = J[D];
                        if (H === K) {
                            C++;
                            break
                        }
                    }
                }
                if (C === L) {
                    e.push(H)
                }
            }
            return e
        },
        difference: function(z, e) {
            var E = o.call(z),
                C = E.length,
                B, A, D;
            for (B = 0, D = e.length; B < D; B++) {
                for (A = 0; A < C; A++) {
                    if (E[A] === e[B]) {
                        w(E, A, 1);
                        A--;
                        C--
                    }
                }
            }
            return E
        },
        slice: ([1, 2].slice(1, undefined).length ? function(A, z, e) {
            return o.call(A, z, e)
        } : function(A, z, e) {
            if (typeof z === "undefined") {
                return o.call(A)
            }
            if (typeof e === "undefined") {
                return o.call(A, z)
            }
            return o.call(A, z, e)
        }),
        sort: n ? function(z, e) {
            if (e) {
                return z.sort(e)
            } else {
                return z.sort()
            }
        } : function(F, E) {
            var C = F.length,
                B = 0,
                D, e, A, z;
            for (; B < C; B++) {
                A = B;
                for (e = B + 1; e < C; e++) {
                    if (E) {
                        D = E(F[e], F[A]);
                        if (D < 0) {
                            A = e
                        }
                    } else {
                        if (F[e] < F[A]) {
                            A = e
                        }
                    }
                }
                if (A !== B) {
                    z = F[B];
                    F[B] = F[A];
                    F[A] = z
                }
            }
            return F
        },
        flatten: function(A) {
            var z = [];

            function e(B) {
                var D, E, C;
                for (D = 0, E = B.length; D < E; D++) {
                    C = B[D];
                    if (Ext.isArray(C)) {
                        e(C)
                    } else {
                        z.push(C)
                    }
                }
                return z
            }
            return e(A)
        },
        min: function(D, C) {
            var z = D[0],
                e, B, A;
            for (e = 0, B = D.length; e < B; e++) {
                A = D[e];
                if (C) {
                    if (C(z, A) === 1) {
                        z = A
                    }
                } else {
                    if (A < z) {
                        z = A
                    }
                }
            }
            return z
        },
        max: function(D, C) {
            var e = D[0],
                z, B, A;
            for (z = 0, B = D.length; z < B; z++) {
                A = D[z];
                if (C) {
                    if (C(e, A) === -1) {
                        e = A
                    }
                } else {
                    if (A > e) {
                        e = A
                    }
                }
            }
            return e
        },
        mean: function(e) {
            return e.length > 0 ? a.sum(e) / e.length : undefined
        },
        sum: function(C) {
            var z = 0,
                e, B, A;
            for (e = 0, B = C.length; e < B; e++) {
                A = C[e];
                z += A
            }
            return z
        },
        toMap: function(C, e, A) {
            var B = {},
                z = C.length;
            if (!e) {
                while (z--) {
                    B[C[z]] = z + 1
                }
            } else {
                if (typeof e == "string") {
                    while (z--) {
                        B[C[z][e]] = z + 1
                    }
                } else {
                    while (z--) {
                        B[e.call(A, C[z])] = z + 1
                    }
                }
            }
            return B
        },
        erase: w,
        insert: function(A, z, e) {
            return t(A, z, 0, e)
        },
        replace: t,
        splice: v,
        push: function(B) {
            var e = arguments.length,
                A = 1,
                z;
            if (B === undefined) {
                B = []
            } else {
                if (!Ext.isArray(B)) {
                    B = [B]
                }
            }
            for (; A < e; A++) {
                z = arguments[A];
                Array.prototype.push[Ext.isArray(z) ? "apply" : "call"](B, z)
            }
            return B
        }
    };
    Ext.each = a.each;
    a.union = a.merge;
    Ext.min = a.min;
    Ext.max = a.max;
    Ext.sum = a.sum;
    Ext.mean = a.mean;
    Ext.flatten = a.flatten;
    Ext.clean = a.clean;
    Ext.unique = a.unique;
    Ext.pluck = a.pluck;
    Ext.toArray = function() {
        return a.toArray.apply(a, arguments)
    }
}());
Ext.Function = {
    flexSetter: function(a) {
        return function(d, c) {
            var e, g;
            if (d === null) {
                return this
            }
            if (typeof d !== "string") {
                for (e in d) {
                    if (d.hasOwnProperty(e)) {
                        a.call(this, e, d[e])
                    }
                }
                if (Ext.enumerables) {
                    for (g = Ext.enumerables.length; g--;) {
                        e = Ext.enumerables[g];
                        if (d.hasOwnProperty(e)) {
                            a.call(this, e, d[e])
                        }
                    }
                }
            } else {
                a.call(this, d, c)
            }
            return this
        }
    },
    bind: function(d, c, b, a) {
        if (arguments.length === 2) {
            return function() {
                return d.apply(c, arguments)
            }
        }
        var g = d,
            e = Array.prototype.slice;
        return function() {
            var h = b || arguments;
            if (a === true) {
                h = e.call(arguments, 0);
                h = h.concat(b)
            } else {
                if (typeof a == "number") {
                    h = e.call(arguments, 0);
                    Ext.Array.insert(h, a, b)
                }
            }
            return g.apply(c || Ext.global, h)
        }
    },
    pass: function(c, a, b) {
        if (!Ext.isArray(a)) {
            if (Ext.isIterable(a)) {
                a = Ext.Array.clone(a)
            } else {
                a = a !== undefined ? [a] : []
            }
        }
        return function() {
            var d = [].concat(a);
            d.push.apply(d, arguments);
            return c.apply(b || this, d)
        }
    },
    alias: function(b, a) {
        return function() {
            return b[a].apply(b, arguments)
        }
    },
    clone: function(a) {
        return function() {
            return a.apply(this, arguments)
        }
    },
    createInterceptor: function(d, c, b, a) {
        var e = d;
        if (!Ext.isFunction(c)) {
            return d
        } else {
            a = Ext.isDefined(a) ? a : null;
            return function() {
                var h = this,
                    g = arguments;
                c.target = h;
                c.method = d;
                return (c.apply(b || h || Ext.global, g) !== false) ? d.apply(h || Ext.global, g) : a
            }
        }
    },
    createDelayed: function(e, c, d, b, a) {
        if (d || b) {
            e = Ext.Function.bind(e, d, b, a)
        }
        return function() {
            var h = this,
                g = Array.prototype.slice.call(arguments);
            setTimeout(function() {
                e.apply(h, g)
            }, c)
        }
    },
    defer: function(e, c, d, b, a) {
        e = Ext.Function.bind(e, d, b, a);
        if (c > 0) {
            return setTimeout(Ext.supports.TimeoutActualLateness ? function() {
                e()
            } : e, c)
        }
        e();
        return 0
    },
    createSequence: function(b, c, a) {
        if (!c) {
            return b
        } else {
            return function() {
                var d = b.apply(this, arguments);
                c.apply(a || this, arguments);
                return d
            }
        }
    },
    createBuffered: function(e, b, d, c) {
        var a;
        return function() {
            var h = c || Array.prototype.slice.call(arguments, 0),
                g = d || this;
            if (a) {
                clearTimeout(a)
            }
            a = setTimeout(function() {
                e.apply(g, h)
            }, b)
        }
    },
    createThrottled: function(e, b, d) {
        var g, a, c, i, h = function() {
            e.apply(d || this, c);
            g = new Date().getTime()
        };
        return function() {
            a = new Date().getTime() - g;
            c = arguments;
            clearTimeout(i);
            if (!g || (a >= b)) {
                h()
            } else {
                i = setTimeout(h, b - a)
            }
        }
    },
    interceptBefore: function(b, a, d, c) {
        var e = b[a] || Ext.emptyFn;
        return (b[a] = function() {
            var g = d.apply(c || this, arguments);
            e.apply(this, arguments);
            return g
        })
    },
    interceptAfter: function(b, a, d, c) {
        var e = b[a] || Ext.emptyFn;
        return (b[a] = function() {
            e.apply(this, arguments);
            return d.apply(c || this, arguments)
        })
    }
};
Ext.defer = Ext.Function.alias(Ext.Function, "defer");
Ext.pass = Ext.Function.alias(Ext.Function, "pass");
Ext.bind = Ext.Function.alias(Ext.Function, "bind");
(function() {
    var a = function() {},
        b = Ext.Object = {
            chain: function(d) {
                a.prototype = d;
                var c = new a();
                a.prototype = null;
                return c
            },
            toQueryObjects: function(e, k, d) {
                var c = b.toQueryObjects,
                    j = [],
                    g, h;
                if (Ext.isArray(k)) {
                    for (g = 0, h = k.length; g < h; g++) {
                        if (d) {
                            j = j.concat(c(e + "[" + g + "]", k[g], true))
                        } else {
                            j.push({
                                name: e,
                                value: k[g]
                            })
                        }
                    }
                } else {
                    if (Ext.isObject(k)) {
                        for (g in k) {
                            if (k.hasOwnProperty(g)) {
                                if (d) {
                                    j = j.concat(c(e + "[" + g + "]", k[g], true))
                                } else {
                                    j.push({
                                        name: e,
                                        value: k[g]
                                    })
                                }
                            }
                        }
                    } else {
                        j.push({
                            name: e,
                            value: k
                        })
                    }
                }
                return j
            },
            toQueryString: function(g, d) {
                var h = [],
                    e = [],
                    l, k, m, c, n;
                for (l in g) {
                    if (g.hasOwnProperty(l)) {
                        h = h.concat(b.toQueryObjects(l, g[l], d))
                    }
                }
                for (k = 0, m = h.length; k < m; k++) {
                    c = h[k];
                    n = c.value;
                    if (Ext.isEmpty(n)) {
                        n = ""
                    } else {
                        if (Ext.isDate(n)) {
                            n = Ext.Date.toString(n)
                        }
                    }
                    e.push(encodeURIComponent(c.name) + "=" + encodeURIComponent(String(n)))
                }
                return e.join("&")
            },
            fromQueryString: function(d, r) {
                var m = d.replace(/^\?/, "").split("&"),
                    u = {},
                    s, k, w, n, q, g, o, p, c, h, t, l, v, e;
                for (q = 0, g = m.length; q < g; q++) {
                    o = m[q];
                    if (o.length > 0) {
                        k = o.split("=");
                        w = decodeURIComponent(k[0]);
                        n = (k[1] !== undefined) ? decodeURIComponent(k[1]) : "";
                        if (!r) {
                            if (u.hasOwnProperty(w)) {
                                if (!Ext.isArray(u[w])) {
                                    u[w] = [u[w]]
                                }
                                u[w].push(n)
                            } else {
                                u[w] = n
                            }
                        } else {
                            h = w.match(/(\[):?([^\]]*)\]/g);
                            t = w.match(/^([^\[]+)/);
                            w = t[0];
                            l = [];
                            if (h === null) {
                                u[w] = n;
                                continue
                            }
                            for (p = 0, c = h.length; p < c; p++) {
                                v = h[p];
                                v = (v.length === 2) ? "" : v.substring(1, v.length - 1);
                                l.push(v)
                            }
                            l.unshift(w);
                            s = u;
                            for (p = 0, c = l.length; p < c; p++) {
                                v = l[p];
                                if (p === c - 1) {
                                    if (Ext.isArray(s) && v === "") {
                                        s.push(n)
                                    } else {
                                        s[v] = n
                                    }
                                } else {
                                    if (s[v] === undefined || typeof s[v] === "string") {
                                        e = l[p + 1];
                                        s[v] = (Ext.isNumeric(e) || e === "") ? [] : {}
                                    }
                                    s = s[v]
                                }
                            }
                        }
                    }
                }
                return u
            },
            each: function(c, e, d) {
                for (var g in c) {
                    if (c.hasOwnProperty(g)) {
                        if (e.call(d || c, g, c[g], c) === false) {
                            return
                        }
                    }
                }
            },
            merge: function(k) {
                var h = 1,
                    j = arguments.length,
                    c = b.merge,
                    e = Ext.clone,
                    g, m, l, d;
                for (; h < j; h++) {
                    g = arguments[h];
                    for (m in g) {
                        l = g[m];
                        if (l && l.constructor === Object) {
                            d = k[m];
                            if (d && d.constructor === Object) {
                                c(d, l)
                            } else {
                                k[m] = e(l)
                            }
                        } else {
                            k[m] = l
                        }
                    }
                }
                return k
            },
            mergeIf: function(c) {
                var h = 1,
                    j = arguments.length,
                    e = Ext.clone,
                    d, g, k;
                for (; h < j; h++) {
                    d = arguments[h];
                    for (g in d) {
                        if (!(g in c)) {
                            k = d[g];
                            if (k && k.constructor === Object) {
                                c[g] = e(k)
                            } else {
                                c[g] = k
                            }
                        }
                    }
                }
                return c
            },
            getKey: function(c, e) {
                for (var d in c) {
                    if (c.hasOwnProperty(d) && c[d] === e) {
                        return d
                    }
                }
                return null
            },
            getValues: function(d) {
                var c = [],
                    e;
                for (e in d) {
                    if (d.hasOwnProperty(e)) {
                        c.push(d[e])
                    }
                }
                return c
            },
            getKeys: (typeof Object.keys == "function") ? function(c) {
                if (!c) {
                    return []
                }
                return Object.keys(c)
            } : function(c) {
                var d = [],
                    e;
                for (e in c) {
                    if (c.hasOwnProperty(e)) {
                        d.push(e)
                    }
                }
                return d
            },
            getSize: function(c) {
                var d = 0,
                    e;
                for (e in c) {
                    if (c.hasOwnProperty(e)) {
                        d++
                    }
                }
                return d
            },
            classify: function(g) {
                var e = g,
                    i = [],
                    d = {},
                    c = function() {
                        var k = 0,
                            l = i.length,
                            m;
                        for (; k < l; k++) {
                            m = i[k];
                            this[m] = new d[m]()
                        }
                    },
                    h, j;
                for (h in g) {
                    if (g.hasOwnProperty(h)) {
                        j = g[h];
                        if (j && j.constructor === Object) {
                            i.push(h);
                            d[h] = b.classify(j)
                        }
                    }
                }
                c.prototype = e;
                return c
            }
        };
    Ext.merge = Ext.Object.merge;
    Ext.mergeIf = Ext.Object.mergeIf;
    Ext.urlEncode = function() {
        var c = Ext.Array.from(arguments),
            d = "";
        if ((typeof c[1] === "string")) {
            d = c[1] + "&";
            c[1] = false
        }
        return d + b.toQueryString.apply(b, c)
    };
    Ext.urlDecode = function() {
        return b.fromQueryString.apply(b, arguments)
    }
}());
Ext.Date = new function() {
    var d = this,
        j = /(\\.)/g,
        a = /([gGhHisucUOPZ]|MS)/,
        e = /([djzmnYycU]|MS)/,
        i = /\\/gi,
        c = /\{(\d+)\}/g,
        g = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/"),
        b = ["var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday,", "def = me.defaults,", "from = Ext.Number.from,", "results = String(input).match(me.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = me.clearTime(new Date);", "y = from(y, from(def.y, dt.getFullYear()));", "m = from(m, from(def.m - 1, dt.getMonth()));", "d = from(d, from(def.d, dt.getDate()));", "h  = from(h, from(def.h, dt.getHours()));", "i  = from(i, from(def.i, dt.getMinutes()));", "s  = from(s, from(def.s, dt.getSeconds()));", "ms = from(ms, from(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);", "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365))? me.add(v, me.DAY, z) : null);", "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "if (W) {", "year = y || (new Date()).getFullYear(),", "jan4 = new Date(year, 0, 4, 0, 0, 0),", "week1monday = new Date(jan4.getTime() - ((jan4.getDay() - 1) * 86400000));", "v = Ext.Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000)));", "} else {", "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);", "}", "}", "}", "}", "if(v){", "if(zz != null){", "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");

    function h(l) {
        var k = Array.prototype.slice.call(arguments, 1);
        return l.replace(c, function(n, o) {
            return k[o]
        })
    }
    Ext.apply(d, {
        now: Date.now || function() {
            return +new Date()
        },
        toString: function(k) {
            var l = Ext.String.leftPad;
            return k.getFullYear() + "-" + l(k.getMonth() + 1, 2, "0") + "-" + l(k.getDate(), 2, "0") + "T" + l(k.getHours(), 2, "0") + ":" + l(k.getMinutes(), 2, "0") + ":" + l(k.getSeconds(), 2, "0")
        },
        getElapsed: function(l, k) {
            return Math.abs(l - (k || new Date()))
        },
        useStrict: false,
        formatCodeToRegex: function(l, k) {
            var m = d.parseCodes[l];
            if (m) {
                m = typeof m == "function" ? m() : m;
                d.parseCodes[l] = m
            }
            return m ? Ext.applyIf({
                c: m.c ? h(m.c, k || "{0}") : m.c
            }, m) : {
                g: 0,
                c: null,
                s: Ext.String.escapeRegex(l)
            }
        },
        parseFunctions: {
            MS: function(l, k) {
                var m = (l || "").match(g);
                return m ? new Date(((m[1] || "") + m[2]) * 1) : null
            },
            time: function(l, k) {
                var m = parseInt(l, 10);
                if (m || m === 0) {
                    return new Date(m)
                }
                return null
            },
            timestamp: function(l, k) {
                var m = parseInt(l, 10);
                if (m || m === 0) {
                    return new Date(m * 1000)
                }
                return null
            }
        },
        parseRegexes: [],
        formatFunctions: {
            MS: function() {
                return "\\/Date(" + this.getTime() + ")\\/"
            },
            time: function() {
                return this.getTime().toString()
            },
            timestamp: function() {
                return d.format(this, "U")
            }
        },
        y2kYear: 50,
        MILLI: "ms",
        SECOND: "s",
        MINUTE: "mi",
        HOUR: "h",
        DAY: "d",
        MONTH: "mo",
        YEAR: "y",
        defaults: {},
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNumbers: {
            January: 0,
            Jan: 0,
            February: 1,
            Feb: 1,
            March: 2,
            Mar: 2,
            April: 3,
            Apr: 3,
            May: 4,
            June: 5,
            Jun: 5,
            July: 6,
            Jul: 6,
            August: 7,
            Aug: 7,
            September: 8,
            Sep: 8,
            October: 9,
            Oct: 9,
            November: 10,
            Nov: 10,
            December: 11,
            Dec: 11
        },
        defaultFormat: "m/d/Y",
        getShortMonthName: function(k) {
            return Ext.Date.monthNames[k].substring(0, 3)
        },
        getShortDayName: function(k) {
            return Ext.Date.dayNames[k].substring(0, 3)
        },
        getMonthNumber: function(k) {
            return Ext.Date.monthNumbers[k.substring(0, 1).toUpperCase() + k.substring(1, 3).toLowerCase()]
        },
        formatContainsHourInfo: function(k) {
            return a.test(k.replace(j, ""))
        },
        formatContainsDateInfo: function(k) {
            return e.test(k.replace(j, ""))
        },
        unescapeFormat: function(k) {
            return k.replace(i, "")
        },
        formatCodes: {
            d: "Ext.String.leftPad(this.getDate(), 2, '0')",
            D: "Ext.Date.getShortDayName(this.getDay())",
            j: "this.getDate()",
            l: "Ext.Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "Ext.Date.getSuffix(this)",
            w: "this.getDay()",
            z: "Ext.Date.getDayOfYear(this)",
            W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')",
            F: "Ext.Date.monthNames[this.getMonth()]",
            m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Ext.Date.getShortMonthName(this.getMonth())",
            n: "(this.getMonth() + 1)",
            t: "Ext.Date.getDaysInMonth(this)",
            L: "(Ext.Date.isLeapYear(this) ? 1 : 0)",
            o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.String.leftPad(this.getHours(), 2, '0')",
            i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "Ext.Date.getGMTOffset(this)",
            P: "Ext.Date.getGMTOffset(this, true)",
            T: "Ext.Date.getTimezone(this)",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function() {
                var p, n, m, k, o;
                for (p = "Y-m-dTH:i:sP", n = [], m = 0, k = p.length; m < k; ++m) {
                    o = p.charAt(m);
                    n.push(o == "T" ? "'T'" : d.getFormatCode(o))
                }
                return n.join(" + ")
            },
            U: "Math.round(this.getTime() / 1000)"
        },
        isValid: function(t, k, r, p, n, o, l) {
            p = p || 0;
            n = n || 0;
            o = o || 0;
            l = l || 0;
            var q = d.add(new Date(t < 100 ? 100 : t, k - 1, r, p, n, o, l), d.YEAR, t < 100 ? t - 100 : 0);
            return t == q.getFullYear() && k == q.getMonth() + 1 && r == q.getDate() && p == q.getHours() && n == q.getMinutes() && o == q.getSeconds() && l == q.getMilliseconds()
        },
        parse: function(l, n, k) {
            var m = d.parseFunctions;
            if (m[n] == null) {
                d.createParser(n)
            }
            return m[n].call(d, l, Ext.isDefined(k) ? k : d.useStrict)
        },
        parseDate: function(l, m, k) {
            return d.parse(l, m, k)
        },
        getFormatCode: function(l) {
            var k = d.formatCodes[l];
            if (k) {
                k = typeof k == "function" ? k() : k;
                d.formatCodes[l] = k
            }
            return k || ("'" + Ext.String.escape(l) + "'")
        },
        createFormat: function(o) {
            var n = [],
                k = false,
                m = "",
                l;
            for (l = 0; l < o.length; ++l) {
                m = o.charAt(l);
                if (!k && m == "\\") {
                    k = true
                } else {
                    if (k) {
                        k = false;
                        n.push("'" + Ext.String.escape(m) + "'")
                    } else {
                        n.push(d.getFormatCode(m))
                    }
                }
            }
            d.formatFunctions[o] = Ext.functionFactory("return " + n.join("+"))
        },
        createParser: function(t) {
            var l = d.parseRegexes.length,
                u = 1,
                m = [],
                s = [],
                q = false,
                k = "",
                o = 0,
                p = t.length,
                r = [],
                n;
            for (; o < p; ++o) {
                k = t.charAt(o);
                if (!q && k == "\\") {
                    q = true
                } else {
                    if (q) {
                        q = false;
                        s.push(Ext.String.escape(k))
                    } else {
                        n = d.formatCodeToRegex(k, u);
                        u += n.g;
                        s.push(n.s);
                        if (n.g && n.c) {
                            if (n.calcAtEnd) {
                                r.push(n.c)
                            } else {
                                m.push(n.c)
                            }
                        }
                    }
                }
            }
            m = m.concat(r);
            d.parseRegexes[l] = new RegExp("^" + s.join("") + "$", "i");
            d.parseFunctions[t] = Ext.functionFactory("input", "strict", h(b, l, m.join("")))
        },
        parseCodes: {
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|0[1-9])"
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|[1-9])"
            },
            D: function() {
                for (var k = [], l = 0; l < 7; k.push(d.getShortDayName(l)), ++l) {}
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + k.join("|") + ")"
                }
            },
            l: function() {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + d.dayNames.join("|") + ")"
                }
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
            },
            W: {
                g: 1,
                c: "W = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            F: function() {
                return {
                    g: 1,
                    c: "m = parseInt(me.getMonthNumber(results[{0}]), 10);\n",
                    s: "(" + d.monthNames.join("|") + ")"
                }
            },
            M: function() {
                for (var k = [], l = 0; l < 12; k.push(d.getShortMonthName(l)), ++l) {}
                return Ext.applyIf({
                    s: "(" + k.join("|") + ")"
                }, d.formatCodeToRegex("F"))
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|0[1-9])"
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|[1-9])"
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\ny = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n",
                s: "(\\d{1,2})"
            },
            a: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm|AM|PM)",
                calcAtEnd: true
            },
            A: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM|am|pm)",
                calcAtEnd: true
            },
            g: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|[0-9])"
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|1[0-9]|[0-9])"
            },
            h: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|0[1-9])"
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|[0-1][0-9])"
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])"
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])"
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
            },
            O: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{4})"
            },
            P: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{2}:\\d{2})"
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+-]?\\d{1,5})"
            },
            c: function() {
                var n = [],
                    k = [d.formatCodeToRegex("Y", 1), d.formatCodeToRegex("m", 2), d.formatCodeToRegex("d", 3), d.formatCodeToRegex("H", 4), d.formatCodeToRegex("i", 5), d.formatCodeToRegex("s", 6), {
                        c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                    }, {
                        c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", d.formatCodeToRegex("P", 8).c, "}else{", d.formatCodeToRegex("O", 8).c, "}", "}"].join("\n")
                    }],
                    o, m;
                for (o = 0, m = k.length; o < m; ++o) {
                    n.push(k[o].c)
                }
                return {
                    g: 1,
                    c: n.join(""),
                    s: [k[0].s, "(?:", "-", k[1].s, "(?:", "-", k[2].s, "(?:", "(?:T| )?", k[3].s, ":", k[4].s, "(?::", k[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")
                }
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
            }
        },
        dateFormat: function(k, l) {
            return d.format(k, l)
        },
        isEqual: function(l, k) {
            if (l && k) {
                return (l.getTime() === k.getTime())
            }
            return !(l || k)
        },
        format: function(l, m) {
            var k = d.formatFunctions;
            if (!Ext.isDate(l)) {
                return ""
            }
            if (k[m] == null) {
                d.createFormat(m)
            }
            return k[m].call(l) + ""
        },
        getTimezone: function(k) {
            return k.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
        },
        getGMTOffset: function(k, l) {
            var m = k.getTimezoneOffset();
            return (m > 0 ? "-" : "+") + Ext.String.leftPad(Math.floor(Math.abs(m) / 60), 2, "0") + (l ? ":" : "") + Ext.String.leftPad(Math.abs(m % 60), 2, "0")
        },
        getDayOfYear: function(n) {
            var l = 0,
                p = Ext.Date.clone(n),
                k = n.getMonth(),
                o;
            for (o = 0, p.setDate(1), p.setMonth(0); o < k; p.setMonth(++o)) {
                l += d.getDaysInMonth(p)
            }
            return l + n.getDate() - 1
        },
        getWeekOfYear: (function() {
            var k = 86400000,
                l = 7 * k;
            return function(n) {
                var o = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() + 3) / k,
                    m = Math.floor(o / 7),
                    p = new Date(m * l).getUTCFullYear();
                return m - Math.floor(Date.UTC(p, 0, 7) / l) + 1
            }
        }()),
        isLeapYear: function(k) {
            var l = k.getFullYear();
            return !!((l & 3) == 0 && (l % 100 || (l % 400 == 0 && l)))
        },
        getFirstDayOfMonth: function(l) {
            var k = (l.getDay() - (l.getDate() - 1)) % 7;
            return (k < 0) ? (k + 7) : k
        },
        getLastDayOfMonth: function(k) {
            return d.getLastDateOfMonth(k).getDay()
        },
        getFirstDateOfMonth: function(k) {
            return new Date(k.getFullYear(), k.getMonth(), 1)
        },
        getLastDateOfMonth: function(k) {
            return new Date(k.getFullYear(), k.getMonth(), d.getDaysInMonth(k))
        },
        getDaysInMonth: (function() {
            var k = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return function(n) {
                var l = n.getMonth();
                return l == 1 && d.isLeapYear(n) ? 29 : k[l]
            }
        }()),
        getSuffix: function(k) {
            switch (k.getDate()) {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th"
            }
        },
        clone: function(k) {
            return new Date(k.getTime())
        },
        isDST: function(k) {
            return new Date(k.getFullYear(), 0, 1).getTimezoneOffset() != k.getTimezoneOffset()
        },
        clearTime: function(k, o) {
            if (o) {
                return Ext.Date.clearTime(Ext.Date.clone(k))
            }
            var m = k.getDate(),
                l, n;
            k.setHours(0);
            k.setMinutes(0);
            k.setSeconds(0);
            k.setMilliseconds(0);
            if (k.getDate() != m) {
                for (l = 1, n = d.add(k, Ext.Date.HOUR, l); n.getDate() != m; l++, n = d.add(k, Ext.Date.HOUR, l)) {}
                k.setDate(m);
                k.setHours(n.getHours())
            }
            return k
        },
        add: function(n, m, q) {
            var r = Ext.Date.clone(n),
                k = Ext.Date,
                l, p, o = 0;
            if (!m || q === 0) {
                return r
            }
            p = q - parseInt(q, 10);
            q = parseInt(q, 10);
            if (q) {
                switch (m.toLowerCase()) {
                    case Ext.Date.MILLI:
                        r.setMilliseconds(r.getMilliseconds() + q);
                        break;
                    case Ext.Date.SECOND:
                        r.setSeconds(r.getSeconds() + q);
                        break;
                    case Ext.Date.MINUTE:
                        r.setMinutes(r.getMinutes() + q);
                        break;
                    case Ext.Date.HOUR:
                        r.setHours(r.getHours() + q);
                        break;
                    case Ext.Date.DAY:
                        r.setDate(r.getDate() + q);
                        break;
                    case Ext.Date.MONTH:
                        l = n.getDate();
                        if (l > 28) {
                            l = Math.min(l, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(n), Ext.Date.MONTH, q)).getDate())
                        }
                        r.setDate(l);
                        r.setMonth(n.getMonth() + q);
                        break;
                    case Ext.Date.YEAR:
                        l = n.getDate();
                        if (l > 28) {
                            l = Math.min(l, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(n), Ext.Date.YEAR, q)).getDate())
                        }
                        r.setDate(l);
                        r.setFullYear(n.getFullYear() + q);
                        break
                }
            }
            if (p) {
                switch (m.toLowerCase()) {
                    case Ext.Date.MILLI:
                        o = 1;
                        break;
                    case Ext.Date.SECOND:
                        o = 1000;
                        break;
                    case Ext.Date.MINUTE:
                        o = 1000 * 60;
                        break;
                    case Ext.Date.HOUR:
                        o = 1000 * 60 * 60;
                        break;
                    case Ext.Date.DAY:
                        o = 1000 * 60 * 60 * 24;
                        break;
                    case Ext.Date.MONTH:
                        l = d.getDaysInMonth(r);
                        o = 1000 * 60 * 60 * 24 * l;
                        break;
                    case Ext.Date.YEAR:
                        l = (d.isLeapYear(r) ? 366 : 365);
                        o = 1000 * 60 * 60 * 24 * l;
                        break
                }
                if (o) {
                    r.setTime(r.getTime() + o * p)
                }
            }
            return r
        },
        between: function(l, n, k) {
            var m = l.getTime();
            return n.getTime() <= m && m <= k.getTime()
        },
        compat: function() {
            var l = window.Date,
                k, r = ["useStrict", "formatCodeToRegex", "parseFunctions", "parseRegexes", "formatFunctions", "y2kYear", "MILLI", "SECOND", "MINUTE", "HOUR", "DAY", "MONTH", "YEAR", "defaults", "dayNames", "monthNames", "monthNumbers", "getShortMonthName", "getShortDayName", "getMonthNumber", "formatCodes", "isValid", "parseDate", "getFormatCode", "createFormat", "createParser", "parseCodes"],
                o = ["dateFormat", "format", "getTimezone", "getGMTOffset", "getDayOfYear", "getWeekOfYear", "isLeapYear", "getFirstDayOfMonth", "getLastDayOfMonth", "getDaysInMonth", "getSuffix", "clone", "isDST", "clearTime", "add", "between"],
                q = r.length,
                m = o.length,
                n, t, u;
            for (u = 0; u < q; u++) {
                n = r[u];
                l[n] = d[n]
            }
            for (k = 0; k < m; k++) {
                t = o[k];
                l.prototype[t] = function() {
                    var p = Array.prototype.slice.call(arguments);
                    p.unshift(this);
                    return d[t].apply(d, p)
                }
            }
        }
    })
};
(function(a) {
    var c = [],
        b = function() {};
    Ext.apply(b, {
        $className: "Ext.Base",
        $isClass: true,
        create: function() {
            return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)))
        },
        extend: function(j) {
            var d = j.prototype,
                m, g, h, k, e, l;
            g = this.prototype = Ext.Object.chain(d);
            g.self = this;
            this.superclass = g.superclass = d;
            if (!j.$isClass) {
                m = Ext.Base.prototype;
                for (h in m) {
                    if (h in g) {
                        g[h] = m[h]
                    }
                }
            }
            l = d.$inheritableStatics;
            if (l) {
                for (h = 0, k = l.length; h < k; h++) {
                    e = l[h];
                    if (!this.hasOwnProperty(e)) {
                        this[e] = j[e]
                    }
                }
            }
            if (j.$onExtended) {
                this.$onExtended = j.$onExtended.slice()
            }
            g.config = new g.configClass();
            g.initConfigList = g.initConfigList.slice();
            g.initConfigMap = Ext.clone(g.initConfigMap);
            g.configMap = Ext.Object.chain(g.configMap)
        },
        $onExtended: [],
        triggerExtended: function() {
            var g = this.$onExtended,
                e = g.length,
                d, h;
            if (e > 0) {
                for (d = 0; d < e; d++) {
                    h = g[d];
                    h.fn.apply(h.scope || this, arguments)
                }
            }
        },
        onExtended: function(e, d) {
            this.$onExtended.push({
                fn: e,
                scope: d
            });
            return this
        },
        addConfig: function(h, l) {
            var n = this.prototype,
                m = Ext.Class.configNameCache,
                i = n.configMap,
                j = n.initConfigList,
                g = n.initConfigMap,
                k = n.config,
                d, e, o;
            for (e in h) {
                if (h.hasOwnProperty(e)) {
                    if (!i[e]) {
                        i[e] = true
                    }
                    o = h[e];
                    d = m[e].initialized;
                    if (!g[e] && o !== null && !n[d]) {
                        g[e] = true;
                        j.push(e)
                    }
                }
            }
            if (l) {
                Ext.merge(k, h)
            } else {
                Ext.mergeIf(k, h)
            }
            n.configClass = Ext.Object.classify(k)
        },
        addStatics: function(d) {
            var g, e;
            for (e in d) {
                if (d.hasOwnProperty(e)) {
                    g = d[e];
                    if (typeof g == "function" && !g.$isClass && g !== Ext.emptyFn && g !== Ext.identityFn) {
                        g.$owner = this;
                        g.$name = e
                    }
                    this[e] = g
                }
            }
            return this
        },
        addInheritableStatics: function(e) {
            var i, d, h = this.prototype,
                g, j;
            i = h.$inheritableStatics;
            d = h.$hasInheritableStatics;
            if (!i) {
                i = h.$inheritableStatics = [];
                d = h.$hasInheritableStatics = {}
            }
            for (g in e) {
                if (e.hasOwnProperty(g)) {
                    j = e[g];
                    this[g] = j;
                    if (!d[g]) {
                        d[g] = true;
                        i.push(g)
                    }
                }
            }
            return this
        },
        addMembers: function(e) {
            var h = this.prototype,
                d = Ext.enumerables,
                l = [],
                j, k, g, m;
            for (g in e) {
                l.push(g)
            }
            if (d) {
                l.push.apply(l, d)
            }
            for (j = 0, k = l.length; j < k; j++) {
                g = l[j];
                if (e.hasOwnProperty(g)) {
                    m = e[g];
                    if (typeof m == "function" && !m.$isClass && m !== Ext.emptyFn && m !== Ext.identityFn) {
                        m.$owner = this;
                        m.$name = g
                    }
                    h[g] = m
                }
            }
            return this
        },
        addMember: function(d, e) {
            if (typeof e == "function" && !e.$isClass && e !== Ext.emptyFn && e !== Ext.identityFn) {
                e.$owner = this;
                e.$name = d
            }
            this.prototype[d] = e;
            return this
        },
        implement: function() {
            this.addMembers.apply(this, arguments)
        },
        borrow: function(j, g) {
            var n = this.prototype,
                m = j.prototype,
                h, k, e, l, d;
            g = Ext.Array.from(g);
            for (h = 0, k = g.length; h < k; h++) {
                e = g[h];
                d = m[e];
                if (typeof d == "function") {
                    l = Ext.Function.clone(d);
                    l.$owner = this;
                    l.$name = e;
                    n[e] = l
                } else {
                    n[e] = d
                }
            }
            return this
        },
        override: function(e) {
            var m = this,
                o = Ext.enumerables,
                k = m.prototype,
                h = Ext.Function.clone,
                d, j, g, n, l, i;
            if (arguments.length === 2) {
                d = e;
                e = {};
                e[d] = arguments[1];
                o = null
            }
            do {
                l = [];
                n = null;
                for (d in e) {
                    if (d == "statics") {
                        n = e[d]
                    } else {
                        if (d == "inheritableStatics") {
                            m.addInheritableStatics(e[d])
                        } else {
                            if (d == "config") {
                                m.addConfig(e[d], true)
                            } else {
                                l.push(d)
                            }
                        }
                    }
                }
                if (o) {
                    l.push.apply(l, o)
                }
                for (j = l.length; j--;) {
                    d = l[j];
                    if (e.hasOwnProperty(d)) {
                        g = e[d];
                        if (typeof g == "function" && !g.$className && g !== Ext.emptyFn && g !== Ext.identityFn) {
                            if (typeof g.$owner != "undefined") {
                                g = h(g)
                            }
                            g.$owner = m;
                            g.$name = d;
                            i = k[d];
                            if (i) {
                                g.$previous = i
                            }
                        }
                        k[d] = g
                    }
                }
                k = m;
                e = n
            } while (e);
            return this
        },
        callParent: function(d) {
            var e;
            return (e = this.callParent.caller) && (e.$previous || ((e = e.$owner ? e : e.caller) && e.$owner.superclass.self[e.$name])).apply(this, d || c)
        },
        callSuper: function(d) {
            var e;
            return (e = this.callSuper.caller) && ((e = e.$owner ? e : e.caller) && e.$owner.superclass.self[e.$name]).apply(this, d || c)
        },
        mixin: function(g, i) {
            var d = i.prototype,
                e = this.prototype,
                h;
            if (typeof d.onClassMixedIn != "undefined") {
                d.onClassMixedIn.call(i, this)
            }
            if (!e.hasOwnProperty("mixins")) {
                if ("mixins" in e) {
                    e.mixins = Ext.Object.chain(e.mixins)
                } else {
                    e.mixins = {}
                }
            }
            for (h in d) {
                if (h === "mixins") {
                    Ext.merge(e.mixins, d[h])
                } else {
                    if (typeof e[h] == "undefined" && h != "mixinId" && h != "config") {
                        e[h] = d[h]
                    }
                }
            }
            if ("config" in d) {
                this.addConfig(d.config, false)
            }
            e.mixins[g] = d;
            return this
        },
        getName: function() {
            return Ext.getClassName(this)
        },
        createAlias: a(function(e, d) {
            this.override(e, function() {
                return this[d].apply(this, arguments)
            })
        }),
        addXtype: function(i) {
            var e = this.prototype,
                h = e.xtypesMap,
                g = e.xtypes,
                d = e.xtypesChain;
            if (!e.hasOwnProperty("xtypesMap")) {
                h = e.xtypesMap = Ext.merge({}, e.xtypesMap || {});
                g = e.xtypes = e.xtypes ? [].concat(e.xtypes) : [];
                d = e.xtypesChain = e.xtypesChain ? [].concat(e.xtypesChain) : [];
                e.xtype = i
            }
            if (!h[i]) {
                h[i] = true;
                g.push(i);
                d.push(i);
                Ext.ClassManager.setAlias(this, "widget." + i)
            }
            return this
        }
    });
    b.implement({
        isInstance: true,
        $className: "Ext.Base",
        configClass: Ext.emptyFn,
        initConfigList: [],
        configMap: {},
        initConfigMap: {},
        statics: function() {
            var e = this.statics.caller,
                d = this.self;
            if (!e) {
                return d
            }
            return e.$owner
        },
        callParent: function(e) {
            var g, d = (g = this.callParent.caller) && (g.$previous || ((g = g.$owner ? g : g.caller) && g.$owner.superclass[g.$name]));
            return d.apply(this, e || c)
        },
        callSuper: function(e) {
            var g, d = (g = this.callSuper.caller) && ((g = g.$owner ? g : g.caller) && g.$owner.superclass[g.$name]);
            return d.apply(this, e || c)
        },
        self: b,
        constructor: function() {
            return this
        },
        initConfig: function(g) {
            var m = g,
                l = Ext.Class.configNameCache,
                j = new this.configClass(),
                p = this.initConfigList,
                h = this.configMap,
                o, k, n, e, d;
            this.initConfig = Ext.emptyFn;
            this.initialConfig = m || {};
            this.config = g = (m) ? Ext.merge(j, g) : j;
            if (m) {
                p = p.slice();
                for (e in m) {
                    if (h[e]) {
                        if (m[e] !== null) {
                            p.push(e);
                            this[l[e].initialized] = false
                        }
                    }
                }
            }
            for (k = 0, n = p.length; k < n; k++) {
                e = p[k];
                o = l[e];
                d = o.initialized;
                if (!this[d]) {
                    this[d] = true;
                    this[o.set].call(this, g[e])
                }
            }
            return this
        },
        hasConfig: function(d) {
            return Boolean(this.configMap[d])
        },
        setConfig: function(h, l) {
            if (!h) {
                return this
            }
            var g = Ext.Class.configNameCache,
                d = this.config,
                k = this.configMap,
                j = this.initialConfig,
                e, i;
            l = Boolean(l);
            for (e in h) {
                if (l && j.hasOwnProperty(e)) {
                    continue
                }
                i = h[e];
                d[e] = i;
                if (k[e]) {
                    this[g[e].set](i)
                }
            }
            return this
        },
        getConfig: function(e) {
            var d = Ext.Class.configNameCache;
            return this[d[e].get]()
        },
        getInitialConfig: function(e) {
            var d = this.config;
            if (!e) {
                return d
            } else {
                return d[e]
            }
        },
        onConfigUpdate: function(k, m, n) {
            var o = this.self,
                g, j, d, h, l, e;
            k = Ext.Array.from(k);
            n = n || this;
            for (g = 0, j = k.length; g < j; g++) {
                d = k[g];
                h = "update" + Ext.String.capitalize(d);
                l = this[h] || Ext.emptyFn;
                e = function() {
                    l.apply(this, arguments);
                    n[m].apply(n, arguments)
                };
                e.$name = h;
                e.$owner = o;
                this[h] = e
            }
        },
        destroy: function() {
            this.destroy = Ext.emptyFn
        }
    });
    b.prototype.callOverridden = b.prototype.callParent;
    Ext.Base = b
}(Ext.Function.flexSetter));
(function() {
    var c, b = Ext.Base,
        g = [],
        e, d;
    for (e in b) {
        if (b.hasOwnProperty(e)) {
            g.push(e)
        }
    }
    d = g.length;

    function a(i) {
        function h() {
            return this.constructor.apply(this, arguments) || null
        }
        return h
    }
    Ext.Class = c = function(i, j, h) {
        if (typeof i != "function") {
            h = j;
            j = i;
            i = null
        }
        if (!j) {
            j = {}
        }
        i = c.create(i, j);
        c.process(i, j, h);
        return i
    };
    Ext.apply(c, {
        onBeforeCreated: function(i, j, h) {
            i.addMembers(j);
            h.onCreated.call(i, i)
        },
        create: function(h, l) {
            var j, k;
            if (!h) {
                h = a()
            }
            for (k = 0; k < d; k++) {
                j = g[k];
                h[j] = b[j]
            }
            return h
        },
        process: function(h, q, m) {
            var l = q.preprocessors || c.defaultPreprocessors,
                t = this.preprocessors,
                w = {
                    onBeforeCreated: this.onBeforeCreated
                },
                v = [],
                x, p, o, u, n, s, r, k;
            delete q.preprocessors;
            for (o = 0, u = l.length; o < u; o++) {
                x = l[o];
                if (typeof x == "string") {
                    x = t[x];
                    p = x.properties;
                    if (p === true) {
                        v.push(x.fn)
                    } else {
                        if (p) {
                            for (n = 0, s = p.length; n < s; n++) {
                                r = p[n];
                                if (q.hasOwnProperty(r)) {
                                    v.push(x.fn);
                                    break
                                }
                            }
                        }
                    }
                } else {
                    v.push(x)
                }
            }
            w.onCreated = m ? m : Ext.emptyFn;
            w.preprocessors = v;
            this.doProcess(h, q, w)
        },
        doProcess: function(i, l, h) {
            var k = this,
                j = h.preprocessors.shift();
            if (!j) {
                h.onBeforeCreated.apply(k, arguments);
                return
            }
            if (j.call(k, i, l, h, k.doProcess) !== false) {
                k.doProcess(i, l, h)
            }
        },
        preprocessors: {},
        registerPreprocessor: function(i, l, j, h, k) {
            if (!h) {
                h = "last"
            }
            if (!j) {
                j = [i]
            }
            this.preprocessors[i] = {
                name: i,
                properties: j || false,
                fn: l
            };
            this.setDefaultPreprocessorPosition(i, h, k);
            return this
        },
        getPreprocessor: function(h) {
            return this.preprocessors[h]
        },
        getPreprocessors: function() {
            return this.preprocessors
        },
        defaultPreprocessors: [],
        getDefaultPreprocessors: function() {
            return this.defaultPreprocessors
        },
        setDefaultPreprocessors: function(h) {
            this.defaultPreprocessors = Ext.Array.from(h);
            return this
        },
        setDefaultPreprocessorPosition: function(j, l, k) {
            var h = this.defaultPreprocessors,
                i;
            if (typeof l == "string") {
                if (l === "first") {
                    h.unshift(j);
                    return this
                } else {
                    if (l === "last") {
                        h.push(j);
                        return this
                    }
                }
                l = (l === "after") ? 1 : -1
            }
            i = Ext.Array.indexOf(h, k);
            if (i !== -1) {
                Ext.Array.splice(h, Math.max(0, i + l), 0, j)
            }
            return this
        },
        configNameCache: {},
        getConfigNameMap: function(j) {
            var i = this.configNameCache,
                k = i[j],
                h;
            if (!k) {
                h = j.charAt(0).toUpperCase() + j.substr(1);
                k = i[j] = {
                    internal: j,
                    initialized: "_is" + h + "Initialized",
                    apply: "apply" + h,
                    update: "update" + h,
                    set: "set" + h,
                    get: "get" + h,
                    doSet: "doSet" + h,
                    changeEvent: j.toLowerCase() + "change"
                }
            }
            return k
        }
    });
    c.registerPreprocessor("extend", function(j, n) {
        var m = Ext.Base,
            o = m.prototype,
            p = n.extend,
            l, h, k;
        delete n.extend;
        if (p && p !== Object) {
            l = p
        } else {
            l = m
        }
        h = l.prototype;
        if (!l.$isClass) {
            for (k in o) {
                if (!h[k]) {
                    h[k] = o[k]
                }
            }
        }
        j.extend(l);
        j.triggerExtended.apply(j, arguments);
        if (n.onClassExtended) {
            j.onExtended(n.onClassExtended, j);
            delete n.onClassExtended
        }
    }, true);
    c.registerPreprocessor("statics", function(h, i) {
        h.addStatics(i.statics);
        delete i.statics
    });
    c.registerPreprocessor("inheritableStatics", function(h, i) {
        h.addInheritableStatics(i.inheritableStatics);
        delete i.inheritableStatics
    });
    c.registerPreprocessor("config", function(h, k) {
        var j = k.config,
            i = h.prototype;
        delete k.config;
        Ext.Object.each(j, function(n, w) {
            var u = c.getConfigNameMap(n),
                q = u.internal,
                l = u.initialized,
                v = u.apply,
                o = u.update,
                t = u.set,
                m = u.get,
                y = (t in i) || k.hasOwnProperty(t),
                p = (v in i) || k.hasOwnProperty(v),
                r = (o in i) || k.hasOwnProperty(o),
                x, s;
            if (w === null || (!y && !p && !r)) {
                i[q] = w;
                i[l] = true
            } else {
                i[l] = false
            }
            if (!y) {
                k[t] = function(B) {
                    var A = this[q],
                        z = this[v],
                        C = this[o];
                    if (!this[l]) {
                        this[l] = true
                    }
                    if (z) {
                        B = z.call(this, B, A)
                    }
                    if (typeof B != "undefined") {
                        this[q] = B;
                        if (C && B !== A) {
                            C.call(this, B, A)
                        }
                    }
                    return this
                }
            }
            if (!(m in i) || k.hasOwnProperty(m)) {
                s = k[m] || false;
                if (s) {
                    x = function() {
                        return s.apply(this, arguments)
                    }
                } else {
                    x = function() {
                        return this[q]
                    }
                }
                k[m] = function() {
                    var z;
                    if (!this[l]) {
                        this[l] = true;
                        this[t](this.config[n])
                    }
                    z = this[m];
                    if ("$previous" in z) {
                        z.$previous = x
                    } else {
                        this[m] = x
                    }
                    return x.apply(this, arguments)
                }
            }
        });
        h.addConfig(j, true)
    });
    c.registerPreprocessor("mixins", function(l, p, h) {
        var j = p.mixins,
            m, k, n, o;
        delete p.mixins;
        Ext.Function.interceptBefore(h, "onCreated", function() {
            if (j instanceof Array) {
                for (n = 0, o = j.length; n < o; n++) {
                    k = j[n];
                    m = k.prototype.mixinId || k.$className;
                    l.mixin(m, k)
                }
            } else {
                for (var i in j) {
                    if (j.hasOwnProperty(i)) {
                        l.mixin(i, j[i])
                    }
                }
            }
        })
    });
    Ext.extend = function(j, k, i) {
        if (arguments.length === 2 && Ext.isObject(k)) {
            i = k;
            k = j;
            j = null
        }
        var h;
        if (!k) {
            throw new Error("[Ext.extend] Attempting to extend from a class which has not been loaded on the page.")
        }
        i.extend = k;
        i.preprocessors = ["extend", "statics", "inheritableStatics", "mixins", "config"];
        if (j) {
            h = new c(j, i);
            h.prototype.constructor = j
        } else {
            h = new c(i)
        }
        h.prototype.override = function(n) {
            for (var l in n) {
                if (n.hasOwnProperty(l)) {
                    this[l] = n[l]
                }
            }
        };
        return h
    }
}());
(function(c, e, h, d, g) {
    function a() {
        function i() {
            return this.constructor.apply(this, arguments) || null
        }
        return i
    }
    var b = Ext.ClassManager = {
        classes: {},
        existCache: {},
        namespaceRewrites: [{
            from: "Ext.",
            to: Ext
        }],
        maps: {
            alternateToName: {},
            aliasToName: {},
            nameToAliases: {},
            nameToAlternates: {}
        },
        enableNamespaceParseCache: true,
        namespaceParseCache: {},
        instantiators: [],
        isCreated: function(n) {
            var m = this.existCache,
                l, o, k, j, p;
            if (this.classes[n] || m[n]) {
                return true
            }
            j = g;
            p = this.parseNamespace(n);
            for (l = 0, o = p.length; l < o; l++) {
                k = p[l];
                if (typeof k != "string") {
                    j = k
                } else {
                    if (!j || !j[k]) {
                        return false
                    }
                    j = j[k]
                }
            }
            m[n] = true;
            this.triggerCreated(n);
            return true
        },
        createdListeners: [],
        nameCreatedListeners: {},
        triggerCreated: function(s) {
            var u = this.createdListeners,
                m = this.nameCreatedListeners,
                n = this.maps.nameToAlternates[s],
                t = [s],
                p, r, o, q, l, k;
            for (p = 0, r = u.length; p < r; p++) {
                l = u[p];
                l.fn.call(l.scope, s)
            }
            if (n) {
                t.push.apply(t, n)
            }
            for (p = 0, r = t.length; p < r; p++) {
                k = t[p];
                u = m[k];
                if (u) {
                    for (o = 0, q = u.length; o < q; o++) {
                        l = u[o];
                        l.fn.call(l.scope, k)
                    }
                    delete m[k]
                }
            }
        },
        onCreated: function(m, l, k) {
            var j = this.createdListeners,
                i = this.nameCreatedListeners,
                n = {
                    fn: m,
                    scope: l
                };
            if (k) {
                if (this.isCreated(k)) {
                    m.call(l, k);
                    return
                }
                if (!i[k]) {
                    i[k] = []
                }
                i[k].push(n)
            } else {
                j.push(n)
            }
        },
        parseNamespace: function(l) {
            var j = this.namespaceParseCache,
                m, o, q, k, t, s, r, n, p;
            if (this.enableNamespaceParseCache) {
                if (j.hasOwnProperty(l)) {
                    return j[l]
                }
            }
            m = [];
            o = this.namespaceRewrites;
            q = g;
            k = l;
            for (n = 0, p = o.length; n < p; n++) {
                t = o[n];
                s = t.from;
                r = t.to;
                if (k === s || k.substring(0, s.length) === s) {
                    k = k.substring(s.length);
                    if (typeof r != "string") {
                        q = r
                    } else {
                        m = m.concat(r.split("."))
                    }
                    break
                }
            }
            m.push(q);
            m = m.concat(k.split("."));
            if (this.enableNamespaceParseCache) {
                j[l] = m
            }
            return m
        },
        setNamespace: function(m, p) {
            var k = g,
                q = this.parseNamespace(m),
                o = q.length - 1,
                j = q[o],
                n, l;
            for (n = 0; n < o; n++) {
                l = q[n];
                if (typeof l != "string") {
                    k = l
                } else {
                    if (!k[l]) {
                        k[l] = {}
                    }
                    k = k[l]
                }
            }
            k[j] = p;
            return k[j]
        },
        createNamespaces: function() {
            var k = g,
                p, m, n, l, o, q;
            for (n = 0, o = arguments.length; n < o; n++) {
                p = this.parseNamespace(arguments[n]);
                for (l = 0, q = p.length; l < q; l++) {
                    m = p[l];
                    if (typeof m != "string") {
                        k = m
                    } else {
                        if (!k[m]) {
                            k[m] = {}
                        }
                        k = k[m]
                    }
                }
            }
            return k
        },
        set: function(i, m) {
            var l = this,
                o = l.maps,
                n = o.nameToAlternates,
                k = l.getName(m),
                j;
            l.classes[i] = l.setNamespace(i, m);
            if (k && k !== i) {
                o.alternateToName[i] = k;
                j = n[k] || (n[k] = []);
                j.push(i)
            }
            return this
        },
        get: function(l) {
            var n = this.classes,
                j, p, k, m, o;
            if (n[l]) {
                return n[l]
            }
            j = g;
            p = this.parseNamespace(l);
            for (m = 0, o = p.length; m < o; m++) {
                k = p[m];
                if (typeof k != "string") {
                    j = k
                } else {
                    if (!j || !j[k]) {
                        return null
                    }
                    j = j[k]
                }
            }
            return j
        },
        setAlias: function(i, j) {
            var l = this.maps.aliasToName,
                m = this.maps.nameToAliases,
                k;
            if (typeof i == "string") {
                k = i
            } else {
                k = this.getName(i)
            }
            if (j && l[j] !== k) {
                l[j] = k
            }
            if (!m[k]) {
                m[k] = []
            }
            if (j) {
                Ext.Array.include(m[k], j)
            }
            return this
        },
        addNameAliasMappings: function(j) {
            var o = this.maps.aliasToName,
                p = this.maps.nameToAliases,
                m, n, l, k;
            for (m in j) {
                n = p[m] || (p[m] = []);
                for (k = 0; k < j[m].length; k++) {
                    l = j[m][k];
                    if (!o[l]) {
                        o[l] = m;
                        n.push(l)
                    }
                }
            }
            return this
        },
        addNameAlternateMappings: function(m) {
            var j = this.maps.alternateToName,
                p = this.maps.nameToAlternates,
                l, n, o, k;
            for (l in m) {
                n = p[l] || (p[l] = []);
                for (k = 0; k < m[l].length; k++) {
                    o = m[l];
                    if (!j[o]) {
                        j[o] = l;
                        n.push(o)
                    }
                }
            }
            return this
        },
        getByAlias: function(i) {
            return this.get(this.getNameByAlias(i))
        },
        getNameByAlias: function(i) {
            return this.maps.aliasToName[i] || ""
        },
        getNameByAlternate: function(i) {
            return this.maps.alternateToName[i] || ""
        },
        getAliasesByName: function(i) {
            return this.maps.nameToAliases[i] || []
        },
        getName: function(i) {
            return i && i.$className || ""
        },
        getClass: function(i) {
            return i && i.self || null
        },
        create: function(j, l, i) {
            var k = a();
            if (typeof l == "function") {
                l = l(k)
            }
            l.$className = j;
            return new c(k, l, function() {
                var m = l.postprocessors || b.defaultPostprocessors,
                    t = b.postprocessors,
                    u = [],
                    s, o, r, n, q, p, v;
                delete l.postprocessors;
                for (o = 0, r = m.length; o < r; o++) {
                    s = m[o];
                    if (typeof s == "string") {
                        s = t[s];
                        p = s.properties;
                        if (p === true) {
                            u.push(s.fn)
                        } else {
                            if (p) {
                                for (n = 0, q = p.length; n < q; n++) {
                                    v = p[n];
                                    if (l.hasOwnProperty(v)) {
                                        u.push(s.fn);
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        u.push(s)
                    }
                }
                l.postprocessors = u;
                l.createdFn = i;
                b.processCreate(j, this, l)
            })
        },
        processCreate: function(l, j, n) {
            var m = this,
                i = n.postprocessors.shift(),
                k = n.createdFn;
            if (!i) {
                if (l) {
                    m.set(l, j)
                }
                if (k) {
                    k.call(j, j)
                }
                if (l) {
                    m.triggerCreated(l)
                }
                return
            }
            if (i.call(m, l, j, n, m.processCreate) !== false) {
                m.processCreate(l, j, n)
            }
        },
        createOverride: function(l, p, j) {
            var o = this,
                n = p.override,
                k = p.requires,
                i = p.uses,
                m = function() {
                    var q, r;
                    if (k) {
                        r = k;
                        k = null;
                        Ext.Loader.require(r, m)
                    } else {
                        q = o.get(n);
                        delete p.override;
                        delete p.requires;
                        delete p.uses;
                        Ext.override(q, p);
                        o.triggerCreated(l);
                        if (i) {
                            Ext.Loader.addUsedClasses(i)
                        }
                        if (j) {
                            j.call(q)
                        }
                    }
                };
            o.existCache[l] = true;
            o.onCreated(m, o, n);
            return o
        },
        instantiateByAlias: function() {
            var j = arguments[0],
                i = h.call(arguments),
                k = this.getNameByAlias(j);
            if (!k) {
                k = this.maps.aliasToName[j];
                Ext.syncRequire(k)
            }
            i[0] = k;
            return this.instantiate.apply(this, i)
        },
        instantiate: function() {
            var k = arguments[0],
                m = typeof k,
                j = h.call(arguments, 1),
                l = k,
                n, i;
            if (m != "function") {
                if (m != "string" && j.length === 0) {
                    j = [k];
                    k = k.xclass
                }
                i = this.get(k)
            } else {
                i = k
            }
            if (!i) {
                n = this.getNameByAlias(k);
                if (n) {
                    k = n;
                    i = this.get(k)
                }
            }
            if (!i) {
                n = this.getNameByAlternate(k);
                if (n) {
                    k = n;
                    i = this.get(k)
                }
            }
            if (!i) {
                Ext.syncRequire(k);
                i = this.get(k)
            }
            return this.getInstantiator(j.length)(i, j)
        },
        dynInstantiate: function(j, i) {
            i = d(i, true);
            i.unshift(j);
            return this.instantiate.apply(this, i)
        },
        getInstantiator: function(m) {
            var l = this.instantiators,
                n, k, j;
            n = l[m];
            if (!n) {
                k = m;
                j = [];
                for (k = 0; k < m; k++) {
                    j.push("a[" + k + "]")
                }
                n = l[m] = new Function("c", "a", "return new c(" + j.join(",") + ")")
            }
            return n
        },
        postprocessors: {},
        defaultPostprocessors: [],
        registerPostprocessor: function(j, m, k, i, l) {
            if (!i) {
                i = "last"
            }
            if (!k) {
                k = [j]
            }
            this.postprocessors[j] = {
                name: j,
                properties: k || false,
                fn: m
            };
            this.setDefaultPostprocessorPosition(j, i, l);
            return this
        },
        setDefaultPostprocessors: function(i) {
            this.defaultPostprocessors = d(i);
            return this
        },
        setDefaultPostprocessorPosition: function(j, m, l) {
            var k = this.defaultPostprocessors,
                i;
            if (typeof m == "string") {
                if (m === "first") {
                    k.unshift(j);
                    return this
                } else {
                    if (m === "last") {
                        k.push(j);
                        return this
                    }
                }
                m = (m === "after") ? 1 : -1
            }
            i = Ext.Array.indexOf(k, l);
            if (i !== -1) {
                Ext.Array.splice(k, Math.max(0, i + m), 0, j)
            }
            return this
        },
        getNamesByExpression: function(q) {
            var o = this.maps.nameToAliases,
                r = [],
                j, n, l, k, s, m, p;
            if (q.indexOf("*") !== -1) {
                q = q.replace(/\*/g, "(.*?)");
                s = new RegExp("^" + q + "$");
                for (j in o) {
                    if (o.hasOwnProperty(j)) {
                        l = o[j];
                        if (j.search(s) !== -1) {
                            r.push(j)
                        } else {
                            for (m = 0, p = l.length; m < p; m++) {
                                n = l[m];
                                if (n.search(s) !== -1) {
                                    r.push(j);
                                    break
                                }
                            }
                        }
                    }
                }
            } else {
                k = this.getNameByAlias(q);
                if (k) {
                    r.push(k)
                } else {
                    k = this.getNameByAlternate(q);
                    if (k) {
                        r.push(k)
                    } else {
                        r.push(q)
                    }
                }
            }
            return r
        }
    };
    b.registerPostprocessor("alias", function(l, k, o) {
        var j = o.alias,
            m, n;
        for (m = 0, n = j.length; m < n; m++) {
            e = j[m];
            this.setAlias(k, e)
        }
    }, ["xtype", "alias"]);
    b.registerPostprocessor("singleton", function(j, i, l, k) {
        if (l.singleton) {
            k.call(this, j, new i(), l)
        } else {
            return true
        }
        return false
    });
    b.registerPostprocessor("alternateClassName", function(k, j, o) {
        var m = o.alternateClassName,
            l, n, p;
        if (!(m instanceof Array)) {
            m = [m]
        }
        for (l = 0, n = m.length; l < n; l++) {
            p = m[l];
            this.set(p, j)
        }
    });
    Ext.apply(Ext, {
        create: e(b, "instantiate"),
        widget: function(k, j) {
            var o = k,
                l, m, i, n;
            if (typeof o != "string") {
                j = k;
                o = j.xtype
            } else {
                j = j || {}
            }
            if (j.isComponent) {
                return j
            }
            l = "widget." + o;
            m = b.getNameByAlias(l);
            if (!m) {
                n = true
            }
            i = b.get(m);
            if (n || !i) {
                return b.instantiateByAlias(l, j)
            }
            return new i(j)
        },
        createByAlias: e(b, "instantiateByAlias"),
        define: function(j, k, i) {
            if (k.override) {
                return b.createOverride.apply(b, arguments)
            }
            return b.create.apply(b, arguments)
        },
        getClassName: e(b, "getName"),
        getDisplayName: function(i) {
            if (i) {
                if (i.displayName) {
                    return i.displayName
                }
                if (i.$name && i.$class) {
                    return Ext.getClassName(i.$class) + "#" + i.$name
                }
                if (i.$className) {
                    return i.$className
                }
            }
            return "Anonymous"
        },
        getClass: e(b, "getClass"),
        namespace: e(b, "createNamespaces")
    });
    Ext.createWidget = Ext.widget;
    Ext.ns = Ext.namespace;
    c.registerPreprocessor("className", function(i, j) {
        if (j.$className) {
            i.$className = j.$className
        }
    }, true, "first");
    c.registerPreprocessor("alias", function(u, o) {
        var s = u.prototype,
            l = d(o.xtype),
            j = d(o.alias),
            v = "widget.",
            t = v.length,
            p = Array.prototype.slice.call(s.xtypesChain || []),
            m = Ext.merge({}, s.xtypesMap || {}),
            n, r, q, k;
        for (n = 0, r = j.length; n < r; n++) {
            q = j[n];
            if (q.substring(0, t) === v) {
                k = q.substring(t);
                Ext.Array.include(l, k)
            }
        }
        u.xtype = o.xtype = l[0];
        o.xtypes = l;
        for (n = 0, r = l.length; n < r; n++) {
            k = l[n];
            if (!m[k]) {
                m[k] = true;
                p.push(k)
            }
        }
        o.xtypesChain = p;
        o.xtypesMap = m;
        Ext.Function.interceptAfter(o, "onClassCreated", function() {
            var i = s.mixins,
                x, w;
            for (x in i) {
                if (i.hasOwnProperty(x)) {
                    w = i[x];
                    l = w.xtypes;
                    if (l) {
                        for (n = 0, r = l.length; n < r; n++) {
                            k = l[n];
                            if (!m[k]) {
                                m[k] = true;
                                p.push(k)
                            }
                        }
                    }
                }
            }
        });
        for (n = 0, r = l.length; n < r; n++) {
            k = l[n];
            Ext.Array.include(j, v + k)
        }
        o.alias = j
    }, ["xtype", "alias"])
}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global));
if (Ext._alternatesMetadata) {
    Ext.ClassManager.addNameAlternateMappings(Ext._alternatesMetadata);
    Ext._alternatesMetadata = null
}
if (Ext._aliasMetadata) {
    Ext.ClassManager.addNameAliasMappings(Ext._aliasMetadata);
    Ext._aliasMetadata = null
}
Ext.Loader = new function() {
    var k = this,
        b = Ext.ClassManager,
        s = Ext.Class,
        e = Ext.Function.flexSetter,
        n = Ext.Function.alias,
        a = Ext.Function.pass,
        d = Ext.Function.defer,
        h = Ext.Array.erase,
        m = ["extend", "mixins", "requires"],
        u = {},
        l = [],
        c = /\/\.\//g,
        g = /\./g,
        j = 0;
    Ext.apply(k, {
        isInHistory: u,
        history: l,
        config: {
            enabled: false,
            scriptChainDelay: false,
            disableCaching: true,
            disableCachingParam: "_dc",
            garbageCollect: false,
            paths: {
                Ext: "."
            },
            preserveScripts: true,
            scriptCharset: undefined
        },
        setConfig: function(x, y) {
            if (Ext.isObject(x) && arguments.length === 1) {
                Ext.merge(k.config, x)
            } else {
                k.config[x] = (Ext.isObject(y)) ? Ext.merge(k.config[x], y) : y
            }
            return k
        },
        getConfig: function(x) {
            if (x) {
                return k.config[x]
            }
            return k.config
        },
        setPath: e(function(x, y) {
            k.config.paths[x] = y;
            j++;
            return k
        }),
        addClassPathMappings: function(y) {
            var x;
            if (j == 0) {
                k.config.paths = y
            } else {
                for (x in y) {
                    k.config.paths[x] = y[x]
                }
            }
            j++;
            return k
        },
        getPath: function(x) {
            var z = "",
                A = k.config.paths,
                y = k.getPrefix(x);
            if (y.length > 0) {
                if (y === x) {
                    return A[y]
                }
                z = A[y];
                x = x.substring(y.length + 1)
            }
            if (z.length > 0) {
                z += "/"
            }
            return z.replace(c, "/") + x.replace(g, "/") + ".js"
        },
        getPrefix: function(y) {
            var A = k.config.paths,
                z, x = "";
            if (A.hasOwnProperty(y)) {
                return y
            }
            for (z in A) {
                if (A.hasOwnProperty(z) && z + "." === y.substring(0, z.length + 1)) {
                    if (z.length > x.length) {
                        x = z
                    }
                }
            }
            return x
        },
        isAClassNameWithAKnownPrefix: function(x) {
            var y = k.getPrefix(x);
            return y !== "" && y !== x
        },
        require: function(z, y, x, A) {
            if (y) {
                y.call(x)
            }
        },
        syncRequire: function() {},
        exclude: function(x) {
            return {
                require: function(A, z, y) {
                    return k.require(A, z, y, x)
                },
                syncRequire: function(A, z, y) {
                    return k.syncRequire(A, z, y, x)
                }
            }
        },
        onReady: function(A, z, B, x) {
            var y;
            if (B !== false && Ext.onDocumentReady) {
                y = A;
                A = function() {
                    Ext.onDocumentReady(y, z, x)
                }
            }
            A.call(z)
        }
    });
    var p = [],
        q = {},
        t = {},
        r = {},
        o = {},
        v = [],
        w = [],
        i = {};
    Ext.apply(k, {
        documentHead: typeof document != "undefined" && (document.head || document.getElementsByTagName("head")[0]),
        isLoading: false,
        queue: p,
        isClassFileLoaded: q,
        isFileLoaded: t,
        readyListeners: v,
        optionalRequires: w,
        requiresMap: i,
        numPendingFiles: 0,
        numLoadedFiles: 0,
        hasFileLoadError: false,
        classNameToFilePathMap: r,
        scriptsLoading: 0,
        syncModeEnabled: false,
        scriptElements: o,
        refreshQueue: function() {
            var B = p.length,
                y, A, x, z;
            if (!B && !k.scriptsLoading) {
                return k.triggerReady()
            }
            for (y = 0; y < B; y++) {
                A = p[y];
                if (A) {
                    z = A.requires;
                    if (z.length > k.numLoadedFiles) {
                        continue
                    }
                    for (x = 0; x < z.length;) {
                        if (b.isCreated(z[x])) {
                            h(z, x, 1)
                        } else {
                            x++
                        }
                    }
                    if (A.requires.length === 0) {
                        h(p, y, 1);
                        A.callback.call(A.scope);
                        k.refreshQueue();
                        break
                    }
                }
            }
            return k
        },
        injectScriptElement: function(x, E, B, G, z) {
            var F = document.createElement("script"),
                C = false,
                y = k.config,
                D = function() {
                    if (!C) {
                        C = true;
                        F.onload = F.onreadystatechange = F.onerror = null;
                        if (typeof y.scriptChainDelay == "number") {
                            d(E, y.scriptChainDelay, G)
                        } else {
                            E.call(G)
                        }
                        k.cleanupScriptElement(F, y.preserveScripts === false, y.garbageCollect)
                    }
                },
                A = function(H) {
                    d(B, 1, G);
                    k.cleanupScriptElement(F, y.preserveScripts === false, y.garbageCollect)
                };
            F.type = "text/javascript";
            F.onerror = A;
            z = z || y.scriptCharset;
            if (z) {
                F.charset = z
            }
            if ("addEventListener" in F) {
                F.onload = D
            } else {
                if ("readyState" in F) {
                    F.onreadystatechange = function() {
                        if (this.readyState == "loaded" || this.readyState == "complete") {
                            D()
                        }
                    }
                } else {
                    F.onload = D
                }
            }
            F.src = x;
            (k.documentHead || document.getElementsByTagName("head")[0]).appendChild(F);
            return F
        },
        removeScriptElement: function(x) {
            if (o[x]) {
                k.cleanupScriptElement(o[x], true, !!k.getConfig("garbageCollect"));
                delete o[x]
            }
            return k
        },
        cleanupScriptElement: function(z, y, A) {
            var B;
            z.onload = z.onreadystatechange = z.onerror = null;
            if (y) {
                Ext.removeNode(z);
                if (A) {
                    for (B in z) {
                        try {
                            if (B != "src") {
                                z[B] = null
                            }
                            delete z[B]
                        } catch (x) {}
                    }
                }
            }
            return k
        },
        loadScript: function(G) {
            var A = k.getConfig(),
                z = typeof G == "string",
                y = z ? G : G.url,
                C = !z && G.onError,
                D = !z && G.onLoad,
                F = !z && G.scope,
                E = function() {
                    k.numPendingFiles--;
                    k.scriptsLoading--;
                    if (C) {
                        C.call(F, "Failed loading '" + y + "', please verify that the file exists")
                    }
                    if (k.numPendingFiles + k.scriptsLoading === 0) {
                        k.refreshQueue()
                    }
                },
                B = function() {
                    k.numPendingFiles--;
                    k.scriptsLoading--;
                    if (D) {
                        D.call(F)
                    }
                    if (k.numPendingFiles + k.scriptsLoading === 0) {
                        k.refreshQueue()
                    }
                },
                x;
            k.isLoading = true;
            k.numPendingFiles++;
            k.scriptsLoading++;
            x = A.disableCaching ? (y + "?" + A.disableCachingParam + "=" + Ext.Date.now()) : y;
            o[y] = k.injectScriptElement(x, B, E)
        },
        loadScriptFile: function(y, F, D, I, x) {
            if (t[y]) {
                return k
            }
            var A = k.getConfig(),
                J = y + (A.disableCaching ? ("?" + A.disableCachingParam + "=" + Ext.Date.now()) : ""),
                z = false,
                H, B, G, C = "";
            I = I || k;
            k.isLoading = true;
            if (!x) {
                G = function() {};
                o[y] = k.injectScriptElement(J, F, G, I)
            } else {
                if (typeof XMLHttpRequest != "undefined") {
                    H = new XMLHttpRequest()
                } else {
                    H = new ActiveXObject("Microsoft.XMLHTTP")
                }
                try {
                    H.open("GET", J, false);
                    H.send(null)
                } catch (E) {
                    z = true
                }
                B = (H.status === 1223) ? 204 : (H.status === 0 && (self.location || {}).protocol == "file:") ? 200 : H.status;
                z = z || (B === 0);
                if (z) {} else {
                    if ((B >= 200 && B < 300) || (B === 304)) {
                        if (!Ext.isIE) {
                            C = "\n//@ sourceURL=" + y
                        }
                        Ext.globalEval(H.responseText + C);
                        F.call(I)
                    } else {}
                }
                H = null
            }
        },
        syncRequire: function() {
            var x = k.syncModeEnabled;
            if (!x) {
                k.syncModeEnabled = true
            }
            k.require.apply(k, arguments);
            if (!x) {
                k.syncModeEnabled = false
            }
            k.refreshQueue()
        },
        require: function(P, G, A, C) {
            var I = {},
                z = {},
                F = [],
                R = [],
                O = [],
                y = [],
                E, Q, K, J, x, D, N, M, L, H, B;
            if (C) {
                C = (typeof C === "string") ? [C] : C;
                for (M = 0, H = C.length; M < H; M++) {
                    x = C[M];
                    if (typeof x == "string" && x.length > 0) {
                        F = b.getNamesByExpression(x);
                        for (L = 0, B = F.length; L < B; L++) {
                            I[F[L]] = true
                        }
                    }
                }
            }
            P = (typeof P === "string") ? [P] : (P ? P : []);
            if (G) {
                if (G.length > 0) {
                    E = function() {
                        var T = [],
                            S, U;
                        for (S = 0, U = y.length; S < U; S++) {
                            T.push(b.get(y[S]))
                        }
                        return G.apply(this, T)
                    }
                } else {
                    E = G
                }
            } else {
                E = Ext.emptyFn
            }
            A = A || Ext.global;
            for (M = 0, H = P.length; M < H; M++) {
                J = P[M];
                if (typeof J == "string" && J.length > 0) {
                    R = b.getNamesByExpression(J);
                    B = R.length;
                    for (L = 0; L < B; L++) {
                        N = R[L];
                        if (I[N] !== true) {
                            y.push(N);
                            if (!b.isCreated(N) && !z[N]) {
                                z[N] = true;
                                O.push(N)
                            }
                        }
                    }
                }
            }
            if (O.length > 0) {
                if (!k.config.enabled) {
                    throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. Missing required class" + ((O.length > 1) ? "es" : "") + ": " + O.join(", "))
                }
            } else {
                E.call(A);
                return k
            }
            Q = k.syncModeEnabled;
            if (!Q) {
                p.push({
                    requires: O.slice(),
                    callback: E,
                    scope: A
                })
            }
            H = O.length;
            for (M = 0; M < H; M++) {
                D = O[M];
                K = k.getPath(D);
                if (Q && q.hasOwnProperty(D)) {
                    k.numPendingFiles--;
                    k.removeScriptElement(K);
                    delete q[D]
                }
                if (!q.hasOwnProperty(D)) {
                    q[D] = false;
                    r[D] = K;
                    k.numPendingFiles++;
                    k.loadScriptFile(K, a(k.onFileLoaded, [D, K], k), a(k.onFileLoadError, [D, K], k), k, Q)
                }
            }
            if (Q) {
                E.call(A);
                if (H === 1) {
                    return b.get(D)
                }
            }
            return k
        },
        onFileLoaded: function(y, x) {
            k.numLoadedFiles++;
            q[y] = true;
            t[x] = true;
            k.numPendingFiles--;
            if (k.numPendingFiles === 0) {
                k.refreshQueue()
            }
        },
        onFileLoadError: function(z, y, x, A) {
            k.numPendingFiles--;
            k.hasFileLoadError = true
        },
        addUsedClasses: function(z) {
            var x, y, A;
            if (z) {
                z = (typeof z == "string") ? [z] : z;
                for (y = 0, A = z.length; y < A; y++) {
                    x = z[y];
                    if (typeof x == "string" && !Ext.Array.contains(w, x)) {
                        w.push(x)
                    }
                }
            }
            return k
        },
        triggerReady: function() {
            var y, x, z = w;
            if (k.isLoading) {
                k.isLoading = false;
                if (z.length !== 0) {
                    z = z.slice();
                    w.length = 0;
                    k.require(z, k.triggerReady, k);
                    return k
                }
            }
            while (v.length && !k.isLoading) {
                y = v.shift();
                y.fn.call(y.scope)
            }
            return k
        },
        onReady: function(A, z, B, x) {
            var y;
            if (B !== false && Ext.onDocumentReady) {
                y = A;
                A = function() {
                    Ext.onDocumentReady(y, z, x)
                }
            }
            if (!k.isLoading) {
                A.call(z)
            } else {
                v.push({
                    fn: A,
                    scope: z
                })
            }
        },
        historyPush: function(x) {
            if (x && q.hasOwnProperty(x) && !u[x]) {
                u[x] = true;
                l.push(x)
            }
            return k
        }
    });
    Ext.disableCacheBuster = function(y, z) {
        var x = new Date();
        x.setTime(x.getTime() + (y ? 10 * 365 : -1) * 24 * 60 * 60 * 1000);
        x = x.toGMTString();
        document.cookie = "ext-cache=1; expires=" + x + "; path=" + (z || "/")
    };
    Ext.require = n(k, "require");
    Ext.syncRequire = n(k, "syncRequire");
    Ext.exclude = n(k, "exclude");
    Ext.onReady = function(z, y, x) {
        k.onReady(z, y, true, x)
    };
    s.registerPreprocessor("loader", function(N, B, M, L) {
        var I = this,
            G = [],
            x, H = b.getName(N),
            A, z, F, E, K, D, y, J, C;
        for (A = 0, F = m.length; A < F; A++) {
            D = m[A];
            if (B.hasOwnProperty(D)) {
                y = B[D];
                if (typeof y == "string") {
                    G.push(y)
                } else {
                    if (y instanceof Array) {
                        for (z = 0, E = y.length; z < E; z++) {
                            K = y[z];
                            if (typeof K == "string") {
                                G.push(K)
                            }
                        }
                    } else {
                        if (typeof y != "function") {
                            for (z in y) {
                                if (y.hasOwnProperty(z)) {
                                    K = y[z];
                                    if (typeof K == "string") {
                                        G.push(K)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (G.length === 0) {
            return
        }
        k.require(G, function() {
            for (A = 0, F = m.length; A < F; A++) {
                D = m[A];
                if (B.hasOwnProperty(D)) {
                    y = B[D];
                    if (typeof y == "string") {
                        B[D] = b.get(y)
                    } else {
                        if (y instanceof Array) {
                            for (z = 0, E = y.length; z < E; z++) {
                                K = y[z];
                                if (typeof K == "string") {
                                    B[D][z] = b.get(K)
                                }
                            }
                        } else {
                            if (typeof y != "function") {
                                for (var O in y) {
                                    if (y.hasOwnProperty(O)) {
                                        K = y[O];
                                        if (typeof K == "string") {
                                            B[D][O] = b.get(K)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            L.call(I, N, B, M)
        });
        return false
    }, true, "after", "className");
    b.registerPostprocessor("uses", function(z, y, A) {
        var x = A.uses;
        if (x) {
            k.addUsedClasses(x)
        }
    });
    b.onCreated(k.historyPush)
};
if (Ext._classPathMetadata) {
    Ext.Loader.addClassPathMappings(Ext._classPathMetadata);
    Ext._classPathMetadata = null
}(function() {
    var a = document.getElementsByTagName("script"),
        b = a[a.length - 1],
        d = b.src,
        c = d.substring(0, d.lastIndexOf("/") + 1),
        e = Ext.Loader;
    e.setConfig({
        enabled: true,
        disableCaching: true,
        paths: {
            Ext: c + "src"
        }
    })
})();
Ext._endTime = new Date().getTime();
if (Ext._beforereadyhandler) {
    Ext._beforereadyhandler()
}
Ext.Error = Ext.extend(Error, {
    statics: {
        ignore: false,
        raise: function(a) {
            a = a || {};
            if (Ext.isString(a)) {
                a = {
                    msg: a
                }
            }
            var c = this.raise.caller,
                b;
            if (c) {
                if (c.$name) {
                    a.sourceMethod = c.$name
                }
                if (c.$owner) {
                    a.sourceClass = c.$owner.$className
                }
            }
            if (Ext.Error.handle(a) !== true) {
                b = Ext.Error.prototype.toString.call(a);
                Ext.log({
                    msg: b,
                    level: "error",
                    dump: a,
                    stack: true
                });
                throw new Ext.Error(a)
            }
        },
        handle: function() {
            return Ext.Error.ignore
        }
    },
    name: "Ext.Error",
    constructor: function(a) {
        if (Ext.isString(a)) {
            a = {
                msg: a
            }
        }
        var b = this;
        Ext.apply(b, a);
        b.message = b.message || b.msg
    },
    toString: function() {
        var c = this,
            b = c.sourceClass ? c.sourceClass : "",
            a = c.sourceMethod ? "." + c.sourceMethod + "(): " : "",
            d = c.msg || "(No description provided)";
        return b + a + d
    }
});
Ext.deprecated = function(a) {
    return Ext.emptyFn
};
Ext.JSON = (new(function() {
    var me = this,
        encodingFunction, decodingFunction, useNative = null,
        useHasOwn = !!{}.hasOwnProperty,
        isNative = function() {
            if (useNative === null) {
                useNative = Ext.USE_NATIVE_JSON && window.JSON && JSON.toString() == "[object JSON]"
            }
            return useNative
        },
        pad = function(n) {
            return n < 10 ? "0" + n : n
        },
        doDecode = function(json) {
            return eval("(" + json + ")")
        },
        doEncode = function(o, newline) {
            if (o === null || o === undefined) {
                return "null"
            } else {
                if (Ext.isDate(o)) {
                    return Ext.JSON.encodeDate(o)
                } else {
                    if (Ext.isString(o)) {
                        return Ext.JSON.encodeString(o)
                    } else {
                        if (typeof o == "number") {
                            return isFinite(o) ? String(o) : "null"
                        } else {
                            if (Ext.isBoolean(o)) {
                                return String(o)
                            } else {
                                if (o.toJSON) {
                                    return o.toJSON()
                                } else {
                                    if (Ext.isArray(o)) {
                                        return encodeArray(o, newline)
                                    } else {
                                        if (Ext.isObject(o)) {
                                            return encodeObject(o, newline)
                                        } else {
                                            if (typeof o === "function") {
                                                return "null"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "undefined"
        },
        m = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
            "\x0b": "\\u000b"
        },
        charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g,
        encodeString = function(s) {
            return '"' + s.replace(charToReplace, function(a) {
                var c = m[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"'
        },
        encodeArray = function(o, newline) {
            var a = ["[", ""],
                len = o.length,
                i;
            for (i = 0; i < len; i += 1) {
                a.push(Ext.JSON.encodeValue(o[i]), ",")
            }
            a[a.length - 1] = "]";
            return a.join("")
        },
        encodeObject = function(o, newline) {
            var a = ["{", ""],
                i, val;
            for (i in o) {
                val = o[i];
                if (!useHasOwn || o.hasOwnProperty(i)) {
                    if (typeof val === "function" || val === undefined) {
                        continue
                    }
                    a.push(Ext.JSON.encodeValue(i), ":", Ext.JSON.encodeValue(val), ",")
                }
            }
            a[a.length - 1] = "}";
            return a.join("")
        };
    me.encodeString = encodeString;
    me.encodeValue = doEncode;
    me.encodeDate = function(o) {
        return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
    };
    me.encode = function(o) {
        if (!encodingFunction) {
            encodingFunction = isNative() ? JSON.stringify : me.encodeValue
        }
        return encodingFunction(o)
    };
    me.decode = function(json, safe) {
        if (!decodingFunction) {
            decodingFunction = isNative() ? JSON.parse : doDecode
        }
        try {
            return decodingFunction(json)
        } catch (e) {
            if (safe === true) {
                return null
            }
            Ext.Error.raise({
                sourceClass: "Ext.JSON",
                sourceMethod: "decode",
                msg: "You're trying to decode an invalid JSON String: " + json
            })
        }
    }
})());
Ext.encode = Ext.JSON.encode;
Ext.decode = Ext.JSON.decode;
Ext.apply(Ext, {
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    windowId: "ext-window",
    documentId: "ext-document",
    isReady: false,
    enableGarbageCollector: true,
    enableListenerCollection: true,
    addCacheEntry: function(e, b, d) {
        d = d || b.dom;
        var a = e || (b && b.id) || d.id,
            c = Ext.cache[a] || (Ext.cache[a] = {
                data: {},
                events: {},
                dom: d,
                skipGarbageCollection: !!(d.getElementById || d.navigator)
            });
        if (b) {
            b.$cache = c;
            c.el = b
        }
        return c
    },
    updateCacheEntry: function(a, b) {
        a.dom = b;
        if (a.el) {
            a.el.dom = b
        }
        return a
    },
    id: function(a, c) {
        var b = this,
            d = "";
        a = Ext.getDom(a, true) || {};
        if (a === document) {
            a.id = b.documentId
        } else {
            if (a === window) {
                a.id = b.windowId
            }
        }
        if (!a.id) {
            if (b.isSandboxed) {
                d = Ext.sandboxName.toLowerCase() + "-"
            }
            a.id = d + (c || "ext-gen") + (++Ext.idSeed)
        }
        return a.id
    },
    escapeId: (function() {
        var c = /^[a-zA-Z_][a-zA-Z0-9_\-]*$/i,
            d = /([\W]{1})/g,
            b = /^(\d)/g,
            a = function(h, g) {
                return "\\" + g
            },
            e = function(h, g) {
                return "\\00" + g.charCodeAt(0).toString(16) + " "
            };
        return function(g) {
            return c.test(g) ? g : g.replace(d, a).replace(b, e)
        }
    }()),
    getBody: (function() {
        var a;
        return function() {
            return a || (a = Ext.get(document.body))
        }
    }()),
    getHead: (function() {
        var a;
        return function() {
            return a || (a = Ext.get(document.getElementsByTagName("head")[0]))
        }
    }()),
    getDoc: (function() {
        var a;
        return function() {
            return a || (a = Ext.get(document))
        }
    }()),
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
    },
    destroy: function() {
        var c = arguments.length,
            b, a;
        for (b = 0; b < c; b++) {
            a = arguments[b];
            if (a) {
                if (Ext.isArray(a)) {
                    this.destroy.apply(this, a)
                } else {
                    if (Ext.isFunction(a.destroy)) {
                        a.destroy()
                    } else {
                        if (a.dom) {
                            a.remove()
                        }
                    }
                }
            }
        }
    },
    callback: function(d, c, b, a) {
        if (Ext.isFunction(d)) {
            b = b || [];
            c = c || window;
            if (a) {
                Ext.defer(d, a, c, b)
            } else {
                d.apply(c, b)
            }
        }
    },
    htmlEncode: function(a) {
        return Ext.String.htmlEncode(a)
    },
    htmlDecode: function(a) {
        return Ext.String.htmlDecode(a)
    },
    urlAppend: function(a, b) {
        return Ext.String.urlAppend(a, b)
    }
});
Ext.ns = Ext.namespace;
window.undefined = window.undefined;
(function() {
    var o = function(e) {
            return e.test(Ext.userAgent)
        },
        t = document.compatMode == "CSS1Compat",
        F = function(R, Q) {
            var e;
            return (R && (e = Q.exec(Ext.userAgent))) ? parseFloat(e[1]) : 0
        },
        p = document.documentMode,
        a = o(/opera/),
        v = a && o(/version\/10\.5/),
        K = o(/\bchrome\b/),
        z = o(/webkit/),
        c = !K && o(/safari/),
        I = c && o(/applewebkit\/4/),
        G = c && o(/version\/3/),
        D = c && o(/version\/4/),
        j = c && o(/version\/5\.0/),
        C = c && o(/version\/5/),
        i = !a && o(/msie/),
        J = i && ((o(/msie 7/) && p != 8 && p != 9) || p == 7),
        H = i && ((o(/msie 8/) && p != 7 && p != 9) || p == 8),
        E = i && ((o(/msie 9/) && p != 7 && p != 8) || p == 9),
        M = i && o(/msie 6/),
        b = !z && o(/gecko/),
        P = b && o(/rv:1\.9/),
        O = b && o(/rv:2\.0/),
        N = b && o(/rv:5\./),
        r = b && o(/rv:10\./),
        y = P && o(/rv:1\.9\.0/),
        w = P && o(/rv:1\.9\.1/),
        u = P && o(/rv:1\.9\.2/),
        g = o(/windows|win32/),
        B = o(/macintosh|mac os x/),
        x = o(/linux/),
        l = null,
        m = F(true, /\bchrome\/(\d+\.\d+)/),
        h = F(true, /\bfirefox\/(\d+\.\d+)/),
        n = F(i, /msie (\d+\.\d+)/),
        s = F(a, /version\/(\d+\.\d+)/),
        d = F(c, /version\/(\d+\.\d+)/),
        A = F(z, /webkit\/(\d+\.\d+)/),
        q = /^https/i.test(window.location.protocol),
        k;
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (L) {}
    k = function() {};
    k.info = k.warn = k.error = Ext.emptyFn;
    Ext.setVersion("extjs", "4.1.3.548");
    Ext.apply(Ext, {
        SSL_SECURE_URL: q && i ? "javascript:''" : "about:blank",
        scopeResetCSS: Ext.buildSettings.scopeResetCSS,
        resetCls: Ext.buildSettings.baseCSSPrefix + "reset",
        enableNestedListenerRemoval: false,
        USE_NATIVE_JSON: false,
        getDom: function(R, Q) {
            if (!R || !document) {
                return null
            }
            if (R.dom) {
                return R.dom
            } else {
                if (typeof R == "string") {
                    var S = Ext.getElementById(R);
                    if (S && i && Q) {
                        if (R == S.getAttribute("id")) {
                            return S
                        } else {
                            return null
                        }
                    }
                    return S
                } else {
                    return R
                }
            }
        },
        removeNode: M || J || H ? (function() {
            var e;
            return function(S) {
                if (S && S.tagName.toUpperCase() != "BODY") {
                    (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(S): Ext.EventManager.removeAll(S);
                    var Q = Ext.cache,
                        R = S.id;
                    if (Q[R]) {
                        delete Q[R].dom;
                        delete Q[R]
                    }
                    if (H && S.parentNode) {
                        S.parentNode.removeChild(S)
                    }
                    e = e || document.createElement("div");
                    e.appendChild(S);
                    e.innerHTML = ""
                }
            }
        }()) : function(R) {
            if (R && R.parentNode && R.tagName.toUpperCase() != "BODY") {
                (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(R): Ext.EventManager.removeAll(R);
                var e = Ext.cache,
                    Q = R.id;
                if (e[Q]) {
                    delete e[Q].dom;
                    delete e[Q]
                }
                R.parentNode.removeChild(R)
            }
        },
        isStrict: t,
        isIEQuirks: i && !t,
        isOpera: a,
        isOpera10_5: v,
        isWebKit: z,
        isChrome: K,
        isSafari: c,
        isSafari3: G,
        isSafari4: D,
        isSafari5: C,
        isSafari5_0: j,
        isSafari2: I,
        isIE: i,
        isIE6: M,
        isIE7: J,
        isIE7m: M || J,
        isIE7p: i && !M,
        isIE8: H,
        isIE8m: M || J || H,
        isIE8p: i && !(M || J),
        isIE9: E,
        isIE9m: M || J || H || E,
        isIE9p: i && !(M || J || H),
        isGecko: b,
        isGecko3: P,
        isGecko4: O,
        isGecko5: N,
        isGecko10: r,
        isFF3_0: y,
        isFF3_5: w,
        isFF3_6: u,
        isFF4: 4 <= h && h < 5,
        isFF5: 5 <= h && h < 6,
        isFF10: 10 <= h && h < 11,
        isLinux: x,
        isWindows: g,
        isMac: B,
        chromeVersion: m,
        firefoxVersion: h,
        ieVersion: n,
        operaVersion: s,
        safariVersion: d,
        webKitVersion: A,
        isSecure: q,
        BLANK_IMAGE_URL: (M || J) ? "//www.sencha.com/s.gif" : "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        value: function(R, e, Q) {
            return Ext.isEmpty(R, Q) ? e : R
        },
        escapeRe: function(e) {
            return e.replace(/([-.*+?\^${}()|\[\]\/\\])/g, "\\$1")
        },
        addBehaviors: function(T) {
            if (!Ext.isReady) {
                Ext.onReady(function() {
                    Ext.addBehaviors(T)
                })
            } else {
                var Q = {},
                    S, e, R;
                for (e in T) {
                    if ((S = e.split("@"))[1]) {
                        R = S[0];
                        if (!Q[R]) {
                            Q[R] = Ext.select(R)
                        }
                        Q[R].on(S[1], T[e])
                    }
                }
                Q = null
            }
        },
        getScrollbarSize: function(Q) {
            if (!Ext.isReady) {
                return {}
            }
            if (Q || !l) {
                var e = document.body,
                    R = document.createElement("div");
                R.style.width = R.style.height = "100px";
                R.style.overflow = "scroll";
                R.style.position = "absolute";
                e.appendChild(R);
                l = {
                    width: R.offsetWidth - R.clientWidth,
                    height: R.offsetHeight - R.clientHeight
                };
                e.removeChild(R)
            }
            return l
        },
        getScrollBarWidth: function(Q) {
            var e = Ext.getScrollbarSize(Q);
            return e.width + 2
        },
        copyTo: function(Q, S, U, T) {
            if (typeof U == "string") {
                U = U.split(/[,;\s]/)
            }
            var V, R = U.length,
                e;
            for (V = 0; V < R; V++) {
                e = U[V];
                if (T || S.hasOwnProperty(e)) {
                    Q[e] = S[e]
                }
            }
            return Q
        },
        destroyMembers: function(S) {
            for (var R = 1, Q = arguments, e = Q.length; R < e; R++) {
                Ext.destroy(S[Q[R]]);
                delete S[Q[R]]
            }
        },
        log: k,
        partition: function(e, T) {
            var U = [
                    [],
                    []
                ],
                Q, S, R = e.length;
            for (Q = 0; Q < R; Q++) {
                S = e[Q];
                U[(T && T(S, Q, e)) || (!T && S) ? 0 : 1].push(S)
            }
            return U
        },
        invoke: function(e, T) {
            var V = [],
                U = Array.prototype.slice.call(arguments, 2),
                Q, S, R = e.length;
            for (Q = 0; Q < R; Q++) {
                S = e[Q];
                if (S && typeof S[T] == "function") {
                    V.push(S[T].apply(S, U))
                } else {
                    V.push(undefined)
                }
            }
            return V
        },
        zip: function() {
            var W = Ext.partition(arguments, function(X) {
                    return typeof X != "function"
                }),
                T = W[0],
                V = W[1][0],
                e = Ext.max(Ext.pluck(T, "length")),
                S = [],
                U, R, Q;
            for (U = 0; U < e; U++) {
                S[U] = [];
                if (V) {
                    S[U] = V.apply(V, Ext.pluck(T, U))
                } else {
                    for (R = 0, Q = T.length; R < Q; R++) {
                        S[U].push(T[R][U])
                    }
                }
            }
            return S
        },
        toSentence: function(Q, e) {
            var T = Q.length,
                S, R;
            if (T <= 1) {
                return Q[0]
            } else {
                S = Q.slice(0, T - 1);
                R = Q[T - 1];
                return Ext.util.Format.format("{0} {1} {2}", S.join(", "), e || "and", R)
            }
        },
        useShims: M
    })
}());
Ext.application = function(a) {
    var c, d, b;
    if (typeof a === "string") {
        Ext.require(a, function() {
            c = Ext.ClassManager.get(a)
        })
    } else {
        Ext.Loader.setPath(a.name, a.appFolder || "app");
        d = a.paths;
        if (d) {
            for (b in d) {
                if (d.hasOwnProperty(b)) {
                    Ext.Loader.setPath(b, d[b])
                }
            }
        }
        Ext.define(a.name + ".$application", Ext.apply({
            extend: "Ext.app.Application"
        }, a), function() {
            c = this
        })
    }
    Ext.onReady(function() {
        Ext.app.Application.instance = new c()
    })
};
(function() {
    Ext.ns("Ext.util");
    Ext.util.Format = {};
    var g = Ext.util.Format,
        e = /<\/?[^>]+>/gi,
        c = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        b = /\r?\n/g,
        d = /[^\d\.]/g,
        a;
    Ext.apply(g, {
        thousandSeparator: ",",
        decimalSeparator: ".",
        currencyPrecision: 2,
        currencySign: "$",
        currencyAtEnd: false,
        undef: function(h) {
            return h !== undefined ? h : ""
        },
        defaultValue: function(i, h) {
            return i !== undefined && i !== "" ? i : h
        },
        substr: "ab".substr(-1) != "b" ? function(i, k, h) {
            var j = String(i);
            return (k < 0) ? j.substr(Math.max(j.length + k, 0), h) : j.substr(k, h)
        } : function(i, j, h) {
            return String(i).substr(j, h)
        },
        lowercase: function(h) {
            return String(h).toLowerCase()
        },
        uppercase: function(h) {
            return String(h).toUpperCase()
        },
        usMoney: function(h) {
            return g.currency(h, "$", 2)
        },
        currency: function(k, m, j, h) {
            var o = "",
                n = ",0",
                l = 0;
            k = k - 0;
            if (k < 0) {
                k = -k;
                o = "-"
            }
            j = Ext.isDefined(j) ? j : g.currencyPrecision;
            n += n + (j > 0 ? "." : "");
            for (; l < j; l++) {
                n += "0"
            }
            k = g.number(k, n);
            if ((h || g.currencyAtEnd) === true) {
                return Ext.String.format("{0}{1}{2}", o, k, m || g.currencySign)
            } else {
                return Ext.String.format("{0}{1}{2}", o, m || g.currencySign, k)
            }
        },
        date: function(h, i) {
            if (!h) {
                return ""
            }
            if (!Ext.isDate(h)) {
                h = new Date(Date.parse(h))
            }
            return Ext.Date.dateFormat(h, i || Ext.Date.defaultFormat)
        },
        dateRenderer: function(h) {
            return function(i) {
                return g.date(i, h)
            }
        },
        stripTags: function(h) {
            return !h ? h : String(h).replace(e, "")
        },
        stripScripts: function(h) {
            return !h ? h : String(h).replace(c, "")
        },
        fileSize: function(h) {
            if (h < 1024) {
                return h + " bytes"
            } else {
                if (h < 1048576) {
                    return (Math.round(((h * 10) / 1024)) / 10) + " KB"
                } else {
                    return (Math.round(((h * 10) / 1048576)) / 10) + " MB"
                }
            }
        },
        math: (function() {
            var h = {};
            return function(j, i) {
                if (!h[i]) {
                    h[i] = Ext.functionFactory("v", "return v " + i + ";")
                }
                return h[i](j)
            }
        }()),
        round: function(j, i) {
            var h = Number(j);
            if (typeof i == "number") {
                i = Math.pow(10, i);
                h = Math.round(j * i) / i
            }
            return h
        },
        number: function(y, s) {
            if (!s) {
                return y
            }
            y = Ext.Number.from(y, NaN);
            if (isNaN(y)) {
                return ""
            }
            var A = g.thousandSeparator,
                q = g.decimalSeparator,
                z = false,
                r = y < 0,
                k, h, x, w, p, t, o, l, u;
            y = Math.abs(y);
            if (s.substr(s.length - 2) == "/i") {
                if (!a) {
                    a = new RegExp("[^\\d\\" + g.decimalSeparator + "]", "g")
                }
                s = s.substr(0, s.length - 2);
                z = true;
                k = s.indexOf(A) != -1;
                h = s.replace(a, "").split(q)
            } else {
                k = s.indexOf(",") != -1;
                h = s.replace(d, "").split(".")
            }
            if (h.length > 2) {} else {
                if (h.length > 1) {
                    y = Ext.Number.toFixed(y, h[1].length)
                } else {
                    y = Ext.Number.toFixed(y, 0)
                }
            }
            x = y.toString();
            h = x.split(".");
            if (k) {
                w = h[0];
                p = [];
                t = w.length;
                o = Math.floor(t / 3);
                l = w.length % 3 || 3;
                for (u = 0; u < t; u += l) {
                    if (u !== 0) {
                        l = 3
                    }
                    p[p.length] = w.substr(u, l);
                    o -= 1
                }
                x = p.join(A);
                if (h[1]) {
                    x += q + h[1]
                }
            } else {
                if (h[1]) {
                    x = h[0] + q + h[1]
                }
            }
            if (r) {
                r = x.replace(/[^1-9]/g, "") !== ""
            }
            return (r ? "-" : "") + s.replace(/[\d,?\.?]+/, x)
        },
        numberRenderer: function(h) {
            return function(i) {
                return g.number(i, h)
            }
        },
        plural: function(h, i, j) {
            return h + " " + (h == 1 ? i : (j ? j : i + "s"))
        },
        nl2br: function(h) {
            return Ext.isEmpty(h) ? "" : h.replace(b, "<br/>")
        },
        capitalize: Ext.String.capitalize,
        ellipsis: Ext.String.ellipsis,
        format: Ext.String.format,
        htmlDecode: Ext.String.htmlDecode,
        htmlEncode: Ext.String.htmlEncode,
        leftPad: Ext.String.leftPad,
        trim: Ext.String.trim,
        parseBox: function(i) {
            i = Ext.isEmpty(i) ? "" : i;
            if (Ext.isNumber(i)) {
                i = i.toString()
            }
            var j = i.split(" "),
                h = j.length;
            if (h == 1) {
                j[1] = j[2] = j[3] = j[0]
            } else {
                if (h == 2) {
                    j[2] = j[0];
                    j[3] = j[1]
                } else {
                    if (h == 3) {
                        j[3] = j[1]
                    }
                }
            }
            return {
                top: parseInt(j[0], 10) || 0,
                right: parseInt(j[1], 10) || 0,
                bottom: parseInt(j[2], 10) || 0,
                left: parseInt(j[3], 10) || 0
            }
        },
        escapeRegex: function(h) {
            return h.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, "\\$1")
        }
    })
}());
Ext.define("Ext.util.TaskRunner", {
    interval: 10,
    timerId: null,
    constructor: function(a) {
        var b = this;
        if (typeof a == "number") {
            b.interval = a
        } else {
            if (a) {
                Ext.apply(b, a)
            }
        }
        b.tasks = [];
        b.timerFn = Ext.Function.bind(b.onTick, b)
    },
    newTask: function(b) {
        var a = new Ext.util.TaskRunner.Task(b);
        a.manager = this;
        return a
    },
    start: function(a) {
        var c = this,
            b = new Date().getTime();
        if (!a.pending) {
            c.tasks.push(a);
            a.pending = true
        }
        a.stopped = false;
        a.taskStartTime = b;
        a.taskRunTime = a.fireOnStart !== false ? 0 : a.taskStartTime;
        a.taskRunCount = 0;
        if (!c.firing) {
            if (a.fireOnStart !== false) {
                c.startTimer(0, b)
            } else {
                c.startTimer(a.interval, b)
            }
        }
        return a
    },
    stop: function(a) {
        if (!a.stopped) {
            a.stopped = true;
            if (a.onStop) {
                a.onStop.call(a.scope || a, a)
            }
        }
        return a
    },
    stopAll: function() {
        Ext.each(this.tasks, this.stop, this)
    },
    firing: false,
    nextExpires: 1e+99,
    onTick: function() {
        var m = this,
            e = m.tasks,
            a = new Date().getTime(),
            n = 1e+99,
            k = e.length,
            c, o, h, b, d, g;
        m.timerId = null;
        m.firing = true;
        for (h = 0; h < k || h < (k = e.length); ++h) {
            b = e[h];
            if (!(g = b.stopped)) {
                c = b.taskRunTime + b.interval;
                if (c <= a) {
                    d = 1;
                    try {
                        d = b.run.apply(b.scope || b, b.args || [++b.taskRunCount])
                    } catch (j) {
                        try {
                            if (b.onError) {
                                d = b.onError.call(b.scope || b, b, j)
                            }
                        } catch (l) {}
                    }
                    b.taskRunTime = a;
                    if (d === false || b.taskRunCount === b.repeat) {
                        m.stop(b);
                        g = true
                    } else {
                        g = b.stopped;
                        c = a + b.interval
                    }
                }
                if (!g && b.duration && b.duration <= (a - b.taskStartTime)) {
                    m.stop(b);
                    g = true
                }
            }
            if (g) {
                b.pending = false;
                if (!o) {
                    o = e.slice(0, h)
                }
            } else {
                if (o) {
                    o.push(b)
                }
                if (n > c) {
                    n = c
                }
            }
        }
        if (o) {
            m.tasks = o
        }
        m.firing = false;
        if (m.tasks.length) {
            m.startTimer(n - a, new Date().getTime())
        }
        if (m.fireIdleEvent !== false) {
            Ext.EventManager.idleEvent.fire()
        }
    },
    startTimer: function(e, c) {
        var d = this,
            b = c + e,
            a = d.timerId;
        if (a && d.nextExpires - b > d.interval) {
            clearTimeout(a);
            a = null
        }
        if (!a) {
            if (e < d.interval) {
                e = d.interval
            }
            d.timerId = setTimeout(d.timerFn, e);
            d.nextExpires = b
        }
    }
}, function() {
    var b = this,
        a = b.prototype;
    a.destroy = a.stopAll;
    Ext.util.TaskManager = Ext.TaskManager = new b();
    b.Task = new Ext.Class({
        isTask: true,
        stopped: true,
        fireOnStart: false,
        constructor: function(c) {
            Ext.apply(this, c)
        },
        restart: function(c) {
            if (c !== undefined) {
                this.interval = c
            }
            this.manager.start(this)
        },
        start: function(c) {
            if (this.stopped) {
                this.restart(c)
            }
        },
        stop: function() {
            this.manager.stop(this)
        }
    });
    a = b.Task.prototype;
    a.destroy = a.stop
});
Ext.define("Ext.util.TaskManager", {
    extend: "Ext.util.TaskRunner",
    alternateClassName: ["Ext.TaskManager"],
    singleton: true
});
Ext.define("Ext.perf.Accumulator", (function() {
    var c = null,
        h = Ext.global.chrome,
        d, b = function() {
            b = function() {
                return new Date().getTime()
            };
            var l, m;
            if (Ext.isChrome && h && h.Interval) {
                l = new h.Interval();
                l.start();
                b = function() {
                    return l.microseconds() / 1000
                }
            } else {
                if (window.ActiveXObject) {
                    try {
                        m = new ActiveXObject("SenchaToolbox.Toolbox");
                        Ext.senchaToolbox = m;
                        b = function() {
                            return m.milliseconds
                        }
                    } catch (n) {}
                } else {
                    if (Date.now) {
                        b = Date.now
                    }
                }
            }
            Ext.perf.getTimestamp = Ext.perf.Accumulator.getTimestamp = b;
            return b()
        };

    function i(m, l) {
        m.sum += l;
        m.min = Math.min(m.min, l);
        m.max = Math.max(m.max, l)
    }

    function e(o) {
        var m = o ? o : (b() - this.time),
            n = this,
            l = n.accum;
        ++l.count;
        if (!--l.depth) {
            i(l.total, m)
        }
        i(l.pure, m - n.childTime);
        c = n.parent;
        if (c) {
            ++c.accum.childCount;
            c.childTime += m
        }
    }

    function a() {
        return {
            min: Number.MAX_VALUE,
            max: 0,
            sum: 0
        }
    }

    function j(m, l) {
        return function() {
            var o = m.enter(),
                n = l.apply(this, arguments);
            o.leave();
            return n
        }
    }

    function k(l) {
        return Math.round(l * 100) / 100
    }

    function g(n, m, l, p) {
        var o = {
            avg: 0,
            min: p.min,
            max: p.max,
            sum: 0
        };
        if (n) {
            l = l || 0;
            o.sum = p.sum - m * l;
            o.avg = o.sum / n
        }
        return o
    }
    return {
        constructor: function(l) {
            var m = this;
            m.count = m.childCount = m.depth = m.maxDepth = 0;
            m.pure = a();
            m.total = a();
            m.name = l
        },
        statics: {
            getTimestamp: b
        },
        format: function(l) {
            if (!d) {
                d = new Ext.XTemplate(["{name} - {count} call(s)", '<tpl if="count">', '<tpl if="childCount">', " ({childCount} children)", "</tpl>", '<tpl if="depth - 1">', " ({depth} deep)", "</tpl>", '<tpl for="times">', ", {type}: {[this.time(values.sum)]} msec (", "avg={[this.time(values.sum / parent.count)]}", ")", "</tpl>", "</tpl>"].join(""), {
                    time: function(n) {
                        return Math.round(n * 100) / 100
                    }
                })
            }
            var m = this.getData(l);
            m.name = this.name;
            m.pure.type = "Pure";
            m.total.type = "Total";
            m.times = [m.pure, m.total];
            return d.apply(m)
        },
        getData: function(l) {
            var m = this;
            return {
                count: m.count,
                childCount: m.childCount,
                depth: m.maxDepth,
                pure: g(m.count, m.childCount, l, m.pure),
                total: g(m.count, m.childCount, l, m.total)
            }
        },
        enter: function() {
            var l = this,
                m = {
                    accum: l,
                    leave: e,
                    childTime: 0,
                    parent: c
                };
            ++l.depth;
            if (l.maxDepth < l.depth) {
                l.maxDepth = l.depth
            }
            c = m;
            m.time = b();
            return m
        },
        monitor: function(n, m, l) {
            var o = this.enter();
            if (l) {
                n.apply(m, l)
            } else {
                n.call(m)
            }
            o.leave()
        },
        report: function() {
            Ext.log(this.format())
        },
        tap: function(t, v) {
            var u = this,
                o = typeof v == "string" ? [v] : v,
                s, w, q, p, n, m, l, r;
            r = function() {
                if (typeof t == "string") {
                    s = Ext.global;
                    p = t.split(".");
                    for (q = 0, n = p.length; q < n; ++q) {
                        s = s[p[q]]
                    }
                } else {
                    s = t
                }
                for (q = 0, n = o.length; q < n; ++q) {
                    m = o[q];
                    w = m.charAt(0) == "!";
                    if (w) {
                        m = m.substring(1)
                    } else {
                        w = !(m in s.prototype)
                    }
                    l = w ? s : s.prototype;
                    l[m] = j(u, l[m])
                }
            };
            Ext.ClassManager.onCreated(r, u, t);
            return u
        }
    }
}()), function() {
    Ext.perf.getTimestamp = this.getTimestamp
});
Ext.define("Ext.perf.Monitor", {
    singleton: true,
    alternateClassName: "Ext.Perf",
    requires: ["Ext.perf.Accumulator"],
    constructor: function() {
        this.accumulators = [];
        this.accumulatorsByName = {}
    },
    calibrate: function() {
        var b = new Ext.perf.Accumulator("$"),
            g = b.total,
            c = Ext.perf.Accumulator.getTimestamp,
            e = 0,
            h, a, d;
        d = c();
        do {
            h = b.enter();
            h.leave();
            ++e
        } while (g.sum < 100);
        a = c();
        return (a - d) / e
    },
    get: function(b) {
        var c = this,
            a = c.accumulatorsByName[b];
        if (!a) {
            c.accumulatorsByName[b] = a = new Ext.perf.Accumulator(b);
            c.accumulators.push(a)
        }
        return a
    },
    enter: function(a) {
        return this.get(a).enter()
    },
    monitor: function(a, c, b) {
        this.get(a).monitor(c, b)
    },
    report: function() {
        var c = this,
            b = c.accumulators,
            a = c.calibrate();
        b.sort(function(e, d) {
            return (e.name < d.name) ? -1 : ((d.name < e.name) ? 1 : 0)
        });
        c.updateGC();
        Ext.log("Calibration: " + Math.round(a * 100) / 100 + " msec/sample");
        Ext.each(b, function(d) {
            Ext.log(d.format(a))
        })
    },
    getData: function(c) {
        var b = {},
            a = this.accumulators;
        Ext.each(a, function(d) {
            if (c || d.count) {
                b[d.name] = d.getData()
            }
        });
        return b
    },
    reset: function() {
        Ext.each(this.accumulators, function(a) {
            var b = a;
            b.count = b.childCount = b.depth = b.maxDepth = 0;
            b.pure = {
                min: Number.MAX_VALUE,
                max: 0,
                sum: 0
            };
            b.total = {
                min: Number.MAX_VALUE,
                max: 0,
                sum: 0
            }
        })
    },
    updateGC: function() {
        var a = this.accumulatorsByName.GC,
            b = Ext.senchaToolbox,
            c;
        if (a) {
            a.count = b.garbageCollectionCounter || 0;
            if (a.count) {
                c = a.pure;
                a.total.sum = c.sum = b.garbageCollectionMilliseconds;
                c.min = c.max = c.sum / a.count;
                c = a.total;
                c.min = c.max = c.sum / a.count
            }
        }
    },
    watchGC: function() {
        Ext.perf.getTimestamp();
        var a = Ext.senchaToolbox;
        if (a) {
            this.get("GC");
            a.watchGarbageCollector(false)
        }
    },
    setup: function(c) {
        if (!c) {
            c = {
                render: {
                    "Ext.AbstractComponent": "render"
                },
                layout: {
                    "Ext.layout.Context": "run"
                }
            }
        }
        this.currentConfig = c;
        var d, g, b, e, a;
        for (d in c) {
            if (c.hasOwnProperty(d)) {
                g = c[d];
                b = Ext.Perf.get(d);
                for (e in g) {
                    if (g.hasOwnProperty(e)) {
                        a = g[e];
                        b.tap(e, a)
                    }
                }
            }
        }
        this.watchGC()
    }
});
Ext.is = {
    init: function(b) {
        var c = this.platforms,
            e = c.length,
            d, a;
        b = b || window.navigator;
        for (d = 0; d < e; d++) {
            a = c[d];
            this[a.identity] = a.regex.test(b[a.property])
        }
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        this.Tablet = this.iPad;
        this.Phone = !this.Desktop && !this.Tablet;
        this.iOS = this.iPhone || this.iPad || this.iPod;
        this.Standalone = !!window.navigator.standalone
    },
    platforms: [{
        property: "platform",
        regex: /iPhone/i,
        identity: "iPhone"
    }, {
        property: "platform",
        regex: /iPod/i,
        identity: "iPod"
    }, {
        property: "userAgent",
        regex: /iPad/i,
        identity: "iPad"
    }, {
        property: "userAgent",
        regex: /Blackberry/i,
        identity: "Blackberry"
    }, {
        property: "userAgent",
        regex: /Android/i,
        identity: "Android"
    }, {
        property: "platform",
        regex: /Mac/i,
        identity: "Mac"
    }, {
        property: "platform",
        regex: /Win/i,
        identity: "Windows"
    }, {
        property: "platform",
        regex: /Linux/i,
        identity: "Linux"
    }]
};
Ext.is.init();
(function() {
    var a = function(d, c) {
        var b = d.ownerDocument.defaultView,
            e = (b ? b.getComputedStyle(d, null) : d.currentStyle) || d.style;
        return e[c]
    };
    Ext.supports = {
        init: function() {
            var d = this,
                e = document,
                c = d.tests,
                i = c.length,
                h = i && Ext.isReady && e.createElement("div"),
                g, b = [];
            if (h) {
                h.innerHTML = ['<div style="height:30px;width:50px;">', '<div style="height:20px;width:20px;"></div>', "</div>", '<div style="width: 200px; height: 200px; position: relative; padding: 5px;">', '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>', "</div>", '<div style="position: absolute; left: 10%; top: 10%;"></div>', '<div style="float:left; background-color:transparent;"></div>'].join("");
                e.body.appendChild(h)
            }
            while (i--) {
                g = c[i];
                if (h || g.early) {
                    d[g.identity] = g.fn.call(d, e, h)
                } else {
                    b.push(g)
                }
            }
            if (h) {
                e.body.removeChild(h)
            }
            d.tests = b
        },
        PointerEvents: "pointerEvents" in document.documentElement.style,
        LocalStorage: "localStorage" in window && window.localStorage !== null,
        CSS3BoxShadow: "boxShadow" in document.documentElement.style || "WebkitBoxShadow" in document.documentElement.style || "MozBoxShadow" in document.documentElement.style,
        ClassList: !!document.documentElement.classList,
        OrientationChange: ((typeof window.orientation != "undefined") && ("onorientationchange" in window)),
        DeviceMotion: ("ondevicemotion" in window),
        Touch: ("ontouchstart" in window) && (!Ext.is.Desktop),
        TimeoutActualLateness: (function() {
            setTimeout(function() {
                Ext.supports.TimeoutActualLateness = arguments.length !== 0
            }, 0)
        }()),
        tests: [{
            identity: "Transitions",
            fn: function(h, k) {
                var g = ["webkit", "Moz", "o", "ms", "khtml"],
                    j = "TransitionEnd",
                    b = [g[0] + j, "transitionend", g[2] + j, g[3] + j, g[4] + j],
                    e = g.length,
                    d = 0,
                    c = false;
                for (; d < e; d++) {
                    if (a(k, g[d] + "TransitionProperty")) {
                        Ext.supports.CSS3Prefix = g[d];
                        Ext.supports.CSS3TransitionEnd = b[d];
                        c = true;
                        break
                    }
                }
                return c
            }
        }, {
            identity: "RightMargin",
            fn: function(c, d) {
                var b = c.defaultView;
                return !(b && b.getComputedStyle(d.firstChild.firstChild, null).marginRight != "0px")
            }
        }, {
            identity: "DisplayChangeInputSelectionBug",
            early: true,
            fn: function() {
                var b = Ext.webKitVersion;
                return 0 < b && b < 533
            }
        }, {
            identity: "DisplayChangeTextAreaSelectionBug",
            early: true,
            fn: function() {
                var b = Ext.webKitVersion;
                return 0 < b && b < 534.24
            }
        }, {
            identity: "TransparentColor",
            fn: function(c, d, b) {
                b = c.defaultView;
                return !(b && b.getComputedStyle(d.lastChild, null).backgroundColor != "transparent")
            }
        }, {
            identity: "ComputedStyle",
            fn: function(c, d, b) {
                b = c.defaultView;
                return b && b.getComputedStyle
            }
        }, {
            identity: "Svg",
            fn: function(b) {
                return !!b.createElementNS && !!b.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
            }
        }, {
            identity: "Canvas",
            fn: function(b) {
                return !!b.createElement("canvas").getContext
            }
        }, {
            identity: "Vml",
            fn: function(b) {
                var c = b.createElement("div");
                c.innerHTML = "<!--[if vml]><br/><br/><![endif]-->";
                return (c.childNodes.length == 2)
            }
        }, {
            identity: "Float",
            fn: function(b, c) {
                return !!c.lastChild.style.cssFloat
            }
        }, {
            identity: "AudioTag",
            fn: function(b) {
                return !!b.createElement("audio").canPlayType
            }
        }, {
            identity: "History",
            fn: function() {
                var b = window.history;
                return !!(b && b.pushState)
            }
        }, {
            identity: "CSS3DTransform",
            fn: function() {
                return (typeof WebKitCSSMatrix != "undefined" && new WebKitCSSMatrix().hasOwnProperty("m41"))
            }
        }, {
            identity: "CSS3LinearGradient",
            fn: function(h, j) {
                var g = "background-image:",
                    d = "-webkit-gradient(linear, left top, right bottom, from(black), to(white))",
                    i = "linear-gradient(left top, black, white)",
                    e = "-moz-" + i,
                    b = "-o-" + i,
                    c = [g + d, g + i, g + e, g + b];
                j.style.cssText = c.join(";");
                return ("" + j.style.backgroundImage).indexOf("gradient") !== -1
            }
        }, {
            identity: "CSS3BorderRadius",
            fn: function(e, g) {
                var c = ["borderRadius", "BorderRadius", "MozBorderRadius", "WebkitBorderRadius", "OBorderRadius", "KhtmlBorderRadius"],
                    d = false,
                    b;
                for (b = 0; b < c.length; b++) {
                    if (document.body.style[c[b]] !== undefined) {
                        return true
                    }
                }
                return d
            }
        }, {
            identity: "GeoLocation",
            fn: function() {
                return (typeof navigator != "undefined" && typeof navigator.geolocation != "undefined") || (typeof google != "undefined" && typeof google.gears != "undefined")
            }
        }, {
            identity: "MouseEnterLeave",
            fn: function(b, c) {
                return ("onmouseenter" in c && "onmouseleave" in c)
            }
        }, {
            identity: "MouseWheel",
            fn: function(b, c) {
                return ("onmousewheel" in c)
            }
        }, {
            identity: "Opacity",
            fn: function(b, c) {
                if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
                    return false
                }
                c.firstChild.style.cssText = "opacity:0.73";
                return c.firstChild.style.opacity == "0.73"
            }
        }, {
            identity: "Placeholder",
            fn: function(b) {
                return "placeholder" in b.createElement("input")
            }
        }, {
            identity: "Direct2DBug",
            fn: function() {
                return Ext.isString(document.body.style.msTransformOrigin)
            }
        }, {
            identity: "BoundingClientRect",
            fn: function(b, c) {
                return Ext.isFunction(c.getBoundingClientRect)
            }
        }, {
            identity: "RotatedBoundingClientRect",
            fn: function() {
                var b = document.body,
                    c = false,
                    e = document.createElement("div"),
                    d = e.style;
                if (e.getBoundingClientRect) {
                    d.WebkitTransform = d.MozTransform = d.OTransform = d.transform = "rotate(90deg)";
                    d.width = "100px";
                    d.height = "30px";
                    b.appendChild(e);
                    c = e.getBoundingClientRect().height !== 100;
                    b.removeChild(e)
                }
                return c
            }
        }, {
            identity: "IncludePaddingInWidthCalculation",
            fn: function(b, c) {
                return c.childNodes[1].firstChild.offsetWidth == 210
            }
        }, {
            identity: "IncludePaddingInHeightCalculation",
            fn: function(b, c) {
                return c.childNodes[1].firstChild.offsetHeight == 210
            }
        }, {
            identity: "ArraySort",
            fn: function() {
                var b = [1, 2, 3, 4, 5].sort(function() {
                    return 0
                });
                return b[0] === 1 && b[1] === 2 && b[2] === 3 && b[3] === 4 && b[4] === 5
            }
        }, {
            identity: "Range",
            fn: function() {
                return !!document.createRange
            }
        }, {
            identity: "CreateContextualFragment",
            fn: function() {
                var b = Ext.supports.Range ? document.createRange() : false;
                return b && !!b.createContextualFragment
            }
        }, {
            identity: "WindowOnError",
            fn: function() {
                return Ext.isIE || Ext.isGecko || Ext.webKitVersion >= 534.16
            }
        }, {
            identity: "TextAreaMaxLength",
            fn: function() {
                var b = document.createElement("textarea");
                return ("maxlength" in b)
            }
        }, {
            identity: "GetPositionPercentage",
            fn: function(b, c) {
                return a(c.childNodes[2], "left") == "10%"
            }
        }]
    }
}());
Ext.supports.init();
Ext.util.DelayedTask = function(d, c, a) {
    var e = this,
        g, b = function() {
            clearInterval(g);
            g = null;
            d.apply(c, a || []);
            Ext.EventManager.idleEvent.fire()
        };
    this.delay = function(i, k, j, h) {
        e.cancel();
        d = k || d;
        c = j || c;
        a = h || a;
        g = setInterval(b, i)
    };
    this.cancel = function() {
        if (g) {
            clearInterval(g);
            g = null
        }
    }
};
Ext.define("Ext.util.Event", {
    requires: "Ext.util.DelayedTask",
    isEvent: true,
    noOptions: {},
    constructor: function(b, a) {
        this.name = a;
        this.observable = b;
        this.listeners = []
    },
    addListener: function(c, b, a) {
        var d = this,
            e;
        b = b || d.observable;
        if (!d.isListening(c, b)) {
            e = d.createListener(c, b, a);
            if (d.firing) {
                d.listeners = d.listeners.slice(0)
            }
            d.listeners.push(e)
        }
    },
    createListener: function(c, b, g) {
        g = g || {};
        b = b || this.observable;
        var d = this,
            e = {
                fn: c,
                scope: b,
                o: g,
                ev: d
            },
            a = c;
        if (g.single) {
            a = d.createSingle(a, e, g, b)
        }
        if (g.target) {
            a = d.createTargeted(a, e, g, b)
        }
        if (g.delay) {
            a = d.createDelayed(a, e, g, b)
        }
        if (g.buffer) {
            a = d.createBuffered(a, e, g, b)
        }
        e.fireFn = a;
        return e
    },
    findListener: function(e, d) {
        var c = this.listeners,
            a = c.length,
            g, b;
        while (a--) {
            g = c[a];
            if (g) {
                b = g.scope;
                if (g.fn == e && (b == (d || this.observable))) {
                    return a
                }
            }
        }
        return -1
    },
    isListening: function(b, a) {
        return this.findListener(b, a) !== -1
    },
    removeListener: function(d, c) {
        var e = this,
            b, g, a;
        b = e.findListener(d, c);
        if (b != -1) {
            g = e.listeners[b];
            if (e.firing) {
                e.listeners = e.listeners.slice(0)
            }
            if (g.task) {
                g.task.cancel();
                delete g.task
            }
            a = g.tasks && g.tasks.length;
            if (a) {
                while (a--) {
                    g.tasks[a].cancel()
                }
                delete g.tasks
            }
            Ext.Array.erase(e.listeners, b, 1);
            return true
        }
        return false
    },
    clearListeners: function() {
        var b = this.listeners,
            a = b.length;
        while (a--) {
            this.removeListener(b[a].fn, b[a].scope)
        }
    },
    fire: function() {
        var e = this,
            c = e.listeners,
            d = c.length,
            b, a, g;
        if (d > 0) {
            e.firing = true;
            for (b = 0; b < d; b++) {
                g = c[b];
                a = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                if (g.o) {
                    a.push(g.o)
                }
                if (g && g.fireFn.apply(g.scope || e.observable, a) === false) {
                    return (e.firing = false)
                }
            }
        }
        e.firing = false;
        return true
    },
    createTargeted: function(b, c, d, a) {
        return function() {
            if (d.target === arguments[0]) {
                b.apply(a, arguments)
            }
        }
    },
    createBuffered: function(b, c, d, a) {
        c.task = new Ext.util.DelayedTask();
        return function() {
            c.task.delay(d.buffer, b, a, Ext.Array.toArray(arguments))
        }
    },
    createDelayed: function(b, c, d, a) {
        return function() {
            var e = new Ext.util.DelayedTask();
            if (!c.tasks) {
                c.tasks = []
            }
            c.tasks.push(e);
            e.delay(d.delay || 10, b, a, Ext.Array.toArray(arguments))
        }
    },
    createSingle: function(b, c, d, a) {
        return function() {
            var e = c.ev;
            if (e.removeListener(c.fn, a) && e.observable) {
                e.observable.hasListeners[e.name]--
            }
            return b.apply(a, arguments)
        }
    }
});
Ext.EventManager = new function() {
    var a = this,
        d = document,
        c = window,
        e, b = function() {
            var k = d.body || d.getElementsByTagName("body")[0],
                o = [Ext.baseCSSPrefix + "body"],
                h = [],
                m = Ext.supports.CSS3LinearGradient,
                l = Ext.supports.CSS3BorderRadius,
                i = [],
                j, g;
            if (!k) {
                return false
            }
            j = k.parentNode;

            function n(p) {
                o.push(Ext.baseCSSPrefix + p)
            }
            if (Ext.isIE) {
                n("ie");
                if (Ext.isIE6) {
                    n("ie6")
                } else {
                    n("ie7p");
                    if (Ext.isIE7) {
                        n("ie7")
                    } else {
                        n("ie8p");
                        if (Ext.isIE8) {
                            n("ie8")
                        } else {
                            n("ie9p");
                            if (Ext.isIE9) {
                                n("ie9")
                            }
                        }
                    }
                }
                if (Ext.isIE7m) {
                    n("ie7m")
                }
                if (Ext.isIE8m) {
                    n("ie8m")
                }
                if (Ext.isIE9m) {
                    n("ie9m")
                }
                if (Ext.isIE7 || Ext.isIE8) {
                    n("ie78")
                }
            }
            if (Ext.isGecko) {
                n("gecko");
                if (Ext.isGecko3) {
                    n("gecko3")
                }
                if (Ext.isGecko4) {
                    n("gecko4")
                }
                if (Ext.isGecko5) {
                    n("gecko5")
                }
            }
            if (Ext.isOpera) {
                n("opera")
            }
            if (Ext.isWebKit) {
                n("webkit")
            }
            if (Ext.isSafari) {
                n("safari");
                if (Ext.isSafari2) {
                    n("safari2")
                }
                if (Ext.isSafari3) {
                    n("safari3")
                }
                if (Ext.isSafari4) {
                    n("safari4")
                }
                if (Ext.isSafari5) {
                    n("safari5")
                }
                if (Ext.isSafari5_0) {
                    n("safari5_0")
                }
            }
            if (Ext.isChrome) {
                n("chrome")
            }
            if (Ext.isMac) {
                n("mac")
            }
            if (Ext.isLinux) {
                n("linux")
            }
            if (!l) {
                n("nbr")
            }
            if (!m) {
                n("nlg")
            }
            if (Ext.scopeResetCSS) {
                g = Ext.resetElementSpec = {
                    cls: Ext.baseCSSPrefix + "reset"
                };
                if (!m) {
                    i.push(Ext.baseCSSPrefix + "nlg")
                }
                if (!l) {
                    i.push(Ext.baseCSSPrefix + "nbr")
                }
                if (i.length) {
                    g.cn = {
                        cls: i.join(" ")
                    }
                }
                Ext.resetElement = Ext.getBody().createChild(g);
                if (i.length) {
                    Ext.resetElement = Ext.get(Ext.resetElement.dom.firstChild)
                }
            } else {
                Ext.resetElement = Ext.getBody();
                n("reset")
            }
            if (j) {
                if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                    Ext.isBorderBox = false
                } else {
                    Ext.isBorderBox = true
                }
                if (Ext.isBorderBox) {
                    h.push(Ext.baseCSSPrefix + "border-box")
                }
                if (Ext.isStrict) {
                    h.push(Ext.baseCSSPrefix + "strict")
                } else {
                    h.push(Ext.baseCSSPrefix + "quirks")
                }
                Ext.fly(j, "_internal").addCls(h)
            }
            Ext.fly(k, "_internal").addCls(o);
            return true
        };
    Ext.apply(a, {
        hasBoundOnReady: false,
        hasFiredReady: false,
        deferReadyEvent: 1,
        onReadyChain: [],
        readyEvent: (function() {
            e = new Ext.util.Event();
            e.fire = function() {
                Ext._beforeReadyTime = Ext._beforeReadyTime || new Date().getTime();
                e.self.prototype.fire.apply(e, arguments);
                Ext._afterReadytime = new Date().getTime()
            };
            return e
        }()),
        idleEvent: new Ext.util.Event(),
        isReadyPaused: function() {
            return (/[?&]ext-pauseReadyFire\b/i.test(location.search) && !Ext._continueFireReady)
        },
        bindReadyEvent: function() {
            if (a.hasBoundOnReady) {
                return
            }
            if (d.readyState == "complete") {
                a.onReadyEvent({
                    type: d.readyState || "body"
                })
            } else {
                d.addEventListener("DOMContentLoaded", a.onReadyEvent, false);
                c.addEventListener("load", a.onReadyEvent, false);
                a.hasBoundOnReady = true
            }
        },
        onReadyEvent: function(g) {
            if (g && g.type) {
                a.onReadyChain.push(g.type)
            }
            if (a.hasBoundOnReady) {
                d.removeEventListener("DOMContentLoaded", a.onReadyEvent, false);
                c.removeEventListener("load", a.onReadyEvent, false)
            }
            if (!Ext.isReady) {
                a.fireDocReady()
            }
        },
        fireDocReady: function() {
            if (!Ext.isReady) {
                Ext._readyTime = new Date().getTime();
                Ext.isReady = true;
                Ext.supports.init();
                a.onWindowUnload();
                e.onReadyChain = a.onReadyChain;
                if (Ext.isNumber(a.deferReadyEvent)) {
                    Ext.Function.defer(a.fireReadyEvent, a.deferReadyEvent);
                    a.hasDocReadyTimer = true
                } else {
                    a.fireReadyEvent()
                }
            }
        },
        fireReadyEvent: function() {
            a.hasDocReadyTimer = false;
            a.isFiring = true;
            while (e.listeners.length && !a.isReadyPaused()) {
                e.fire()
            }
            a.isFiring = false;
            a.hasFiredReady = true;
            Ext.EventManager.idleEvent.fire()
        },
        onDocumentReady: function(i, h, g) {
            g = g || {};
            g.single = true;
            e.addListener(i, h, g);
            if (!(a.isFiring || a.hasDocReadyTimer)) {
                if (Ext.isReady) {
                    a.fireReadyEvent()
                } else {
                    a.bindReadyEvent()
                }
            }
        },
        stoppedMouseDownEvent: new Ext.util.Event(),
        propRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|freezeEvent)$/,
        getId: function(g) {
            var h;
            g = Ext.getDom(g);
            if (g === d || g === c) {
                h = g === d ? Ext.documentId : Ext.windowId
            } else {
                h = Ext.id(g)
            }
            if (!Ext.cache[h]) {
                Ext.addCacheEntry(h, null, g)
            }
            return h
        },
        prepareListenerConfig: function(j, h, l) {
            var m = a.propRe,
                i, k, g;
            for (i in h) {
                if (h.hasOwnProperty(i)) {
                    if (!m.test(i)) {
                        k = h[i];
                        if (typeof k == "function") {
                            g = [j, i, k, h.scope, h]
                        } else {
                            g = [j, i, k.fn, k.scope, k]
                        }
                        if (l) {
                            a.removeListener.apply(a, g)
                        } else {
                            a.addListener.apply(a, g)
                        }
                    }
                }
            }
        },
        mouseEnterLeaveRe: /mouseenter|mouseleave/,
        normalizeEvent: function(g, h) {
            if (a.mouseEnterLeaveRe.test(g) && !Ext.supports.MouseEnterLeave) {
                if (h) {
                    h = Ext.Function.createInterceptor(h, a.contains)
                }
                g = g == "mouseenter" ? "mouseover" : "mouseout"
            } else {
                if (g == "mousewheel" && !Ext.supports.MouseWheel && !Ext.isOpera) {
                    g = "DOMMouseScroll"
                }
            }
            return {
                eventName: g,
                fn: h
            }
        },
        contains: function(h) {
            h = h.browserEvent || h;
            var g = h.currentTarget,
                i = a.getRelatedTarget(h);
            if (g && g.firstChild) {
                while (i) {
                    if (i === g) {
                        return false
                    }
                    i = i.parentNode;
                    if (i && (i.nodeType != 1)) {
                        i = null
                    }
                }
            }
            return true
        },
        addListener: function(k, m, o, p, q) {
            if (typeof m !== "string") {
                a.prepareListenerConfig(k, m);
                return
            }
            var j = k.dom || Ext.getDom(k),
                n, i, g, h, l;
            q = q || {};
            n = a.normalizeEvent(m, o);
            i = a.createListenerWrap(j, m, n.fn, p, q);
            g = a.getEventListenerCache(k.dom ? k : j, m);
            m = n.eventName;
            if (j.attachEvent) {
                h = a.normalizeId(j);
                if (h) {
                    l = Ext.cache[h][m];
                    if (l && l.firing) {
                        g = a.cloneEventListenerCache(j, m)
                    }
                }
            }
            g.push({
                fn: o,
                wrap: i,
                scope: p
            });
            if (j.attachEvent) {
                if (g.length === 1) {
                    h = a.normalizeId(j, true);
                    o = Ext.Function.bind(a.handleSingleEvent, a, [h, m], true);
                    Ext.cache[h][m] = {
                        firing: false,
                        fn: o
                    };
                    j.attachEvent("on" + m, o)
                }
            } else {
                j.addEventListener(m, i, q.capture || false)
            }
            if (j == d && m == "mousedown") {
                a.stoppedMouseDownEvent.addListener(i)
            }
        },
        normalizeId: function(g) {
            var h;
            if (g === document) {
                h = Ext.documentId
            } else {
                if (g === window) {
                    h = Ext.windowId
                } else {
                    h = g.id
                }
            }
            if (!h && force) {
                h = a.getId(g)
            }
            return h
        },
        handleSingleEvent: function(m, n, j) {
            var k = a.getEventListenerCache(n, j),
                h = Ext.cache[n][j],
                g, l;
            if (h.firing) {
                return
            }
            h.firing = true;
            for (l = 0, g = k.length; l < g; ++l) {
                k[l].wrap(m)
            }
            h.firing = false
        },
        removeListener: function(r, t, v, x) {
            if (typeof t !== "string") {
                a.prepareListenerConfig(r, t, true);
                return
            }
            var p = Ext.getDom(r),
                l = r.dom ? r : Ext.get(p),
                g = a.getEventListenerCache(l, t),
                w = a.normalizeEvent(t).eventName,
                q = g.length,
                o, s, u, m, k, n, h;
            while (q--) {
                m = g[q];
                if (m && (!v || m.fn == v) && (!x || m.scope === x)) {
                    k = m.wrap;
                    if (k.task) {
                        clearTimeout(k.task);
                        delete k.task
                    }
                    o = k.tasks && k.tasks.length;
                    if (o) {
                        while (o--) {
                            clearTimeout(k.tasks[o])
                        }
                        delete k.tasks
                    }
                    if (p.detachEvent) {
                        h = a.normalizeId(p, true);
                        s = Ext.cache[h][w];
                        if (s && s.firing) {
                            g = a.cloneEventListenerCache(p, w)
                        }
                        if (g.length === 1) {
                            v = s.fn;
                            delete Ext.cache[h][w];
                            p.detachEvent("on" + w, v)
                        }
                    } else {
                        p.removeEventListener(w, k, false)
                    }
                    if (k && p == d && t == "mousedown") {
                        a.stoppedMouseDownEvent.removeListener(k)
                    }
                    Ext.Array.erase(g, q, 1)
                }
            }
        },
        removeAll: function(j) {
            var k = (typeof j === "string") ? j : j.id,
                h, i, g;
            if (k && (h = Ext.cache[k])) {
                i = h.events;
                for (g in i) {
                    if (i.hasOwnProperty(g)) {
                        a.removeListener(j, g)
                    }
                }
                h.events = {}
            }
        },
        purgeElement: function(k, h) {
            var m = Ext.getDom(k),
                j = 0,
                g, l;
            if (h) {
                a.removeListener(k, h)
            } else {
                a.removeAll(k)
            }
            if (m && m.childNodes) {
                l = m.childNodes;
                for (g = l.length; j < g; j++) {
                    a.purgeElement(l[j], h)
                }
            }
        },
        createListenerWrap: function(j, i, m, n, o) {
            o = o || {};
            var l, k, g = /\\/g,
                h = function(q, p) {
                    if (!k) {
                        l = ["if(!" + Ext.name + ") {return;}"];
                        if (o.buffer || o.delay || o.freezeEvent) {
                            if (o.freezeEvent) {
                                l.push("e = X.EventObject.setEvent(e);")
                            }
                            l.push("e = new X.EventObjectImpl(e, " + (o.freezeEvent ? "true" : "false") + ");")
                        } else {
                            l.push("e = X.EventObject.setEvent(e);")
                        }
                        if (o.delegate) {
                            l.push('var result, t = e.getTarget("' + (o.delegate + "").replace(g, "\\\\") + '", this);');
                            l.push("if(!t) {return;}")
                        } else {
                            l.push("var t = e.target, result;")
                        }
                        if (o.target) {
                            l.push("if(e.target !== options.target) {return;}")
                        }
                        if (o.stopEvent) {
                            l.push("e.stopEvent();")
                        } else {
                            if (o.preventDefault) {
                                l.push("e.preventDefault();")
                            }
                            if (o.stopPropagation) {
                                l.push("e.stopPropagation();")
                            }
                        }
                        if (o.normalized === false) {
                            l.push("e = e.browserEvent;")
                        }
                        if (o.buffer) {
                            l.push("(wrap.task && clearTimeout(wrap.task));");
                            l.push("wrap.task = setTimeout(function() {")
                        }
                        if (o.delay) {
                            l.push("wrap.tasks = wrap.tasks || [];");
                            l.push("wrap.tasks.push(setTimeout(function() {")
                        }
                        l.push("result = fn.call(scope || dom, e, t, options);");
                        if (o.single) {
                            l.push("evtMgr.removeListener(dom, ename, fn, scope);")
                        }
                        if (i !== "mousemove" && i !== "unload") {
                            l.push("if (evtMgr.idleEvent.listeners.length) {");
                            l.push("evtMgr.idleEvent.fire();");
                            l.push("}")
                        }
                        if (o.delay) {
                            l.push("}, " + o.delay + "));")
                        }
                        if (o.buffer) {
                            l.push("}, " + o.buffer + ");")
                        }
                        l.push("return result;");
                        k = Ext.cacheableFunctionFactory("e", "options", "fn", "scope", "ename", "dom", "wrap", "args", "X", "evtMgr", l.join("\n"))
                    }
                    return k.call(j, q, o, m, n, i, j, h, p, Ext, a)
                };
            return h
        },
        getEventCache: function(i) {
            var h, g, j;
            if (!i) {
                return []
            }
            if (i.$cache) {
                h = i.$cache
            } else {
                if (typeof i === "string") {
                    j = i
                } else {
                    j = a.getId(i)
                }
                h = Ext.cache[j]
            }
            g = h.events || (h.events = {});
            return g
        },
        getEventListenerCache: function(i, g) {
            var h = a.getEventCache(i);
            return h[g] || (h[g] = [])
        },
        cloneEventListenerCache: function(j, g) {
            var i = a.getEventCache(j),
                h;
            if (i[g]) {
                h = i[g].slice(0)
            } else {
                h = []
            }
            i[g] = h;
            return h
        },
        mouseLeaveRe: /(mouseout|mouseleave)/,
        mouseEnterRe: /(mouseover|mouseenter)/,
        stopEvent: function(g) {
            a.stopPropagation(g);
            a.preventDefault(g)
        },
        stopPropagation: function(g) {
            g = g.browserEvent || g;
            if (g.stopPropagation) {
                g.stopPropagation()
            } else {
                g.cancelBubble = true
            }
        },
        preventDefault: function(g) {
            g = g.browserEvent || g;
            if (g.preventDefault) {
                g.preventDefault()
            } else {
                g.returnValue = false;
                try {
                    if (g.ctrlKey || g.keyCode > 111 && g.keyCode < 124) {
                        g.keyCode = -1
                    }
                } catch (h) {}
            }
        },
        getRelatedTarget: function(g) {
            g = g.browserEvent || g;
            var h = g.relatedTarget;
            if (!h) {
                if (a.mouseLeaveRe.test(g.type)) {
                    h = g.toElement
                } else {
                    if (a.mouseEnterRe.test(g.type)) {
                        h = g.fromElement
                    }
                }
            }
            return a.resolveTextNode(h)
        },
        getPageX: function(g) {
            return a.getPageXY(g)[0]
        },
        getPageY: function(g) {
            return a.getPageXY(g)[1]
        },
        getPageXY: function(i) {
            i = i.browserEvent || i;
            var h = i.pageX,
                k = i.pageY,
                j = d.documentElement,
                g = d.body;
            if (!h && h !== 0) {
                h = i.clientX + (j && j.scrollLeft || g && g.scrollLeft || 0) - (j && j.clientLeft || g && g.clientLeft || 0);
                k = i.clientY + (j && j.scrollTop || g && g.scrollTop || 0) - (j && j.clientTop || g && g.clientTop || 0)
            }
            return [h, k]
        },
        getTarget: function(g) {
            g = g.browserEvent || g;
            return a.resolveTextNode(g.target || g.srcElement)
        },
        resolveTextNode: Ext.isGecko ? function(h) {
            if (!h) {
                return
            }
            var g = HTMLElement.prototype.toString.call(h);
            if (g == "[xpconnect wrapped native prototype]" || g == "[object XULElement]") {
                return
            }
            return h.nodeType == 3 ? h.parentNode : h
        } : function(g) {
            return g && g.nodeType == 3 ? g.parentNode : g
        },
        curWidth: 0,
        curHeight: 0,
        onWindowResize: function(j, i, h) {
            var g = a.resizeEvent;
            if (!g) {
                a.resizeEvent = g = new Ext.util.Event();
                a.on(c, "resize", a.fireResize, null, {
                    buffer: 100
                })
            }
            g.addListener(j, i, h)
        },
        fireResize: function() {
            var g = Ext.Element.getViewWidth(),
                i = Ext.Element.getViewHeight();
            if (a.curHeight != i || a.curWidth != g) {
                a.curHeight = i;
                a.curWidth = g;
                a.resizeEvent.fire(g, i)
            }
        },
        removeResizeListener: function(i, h) {
            var g = a.resizeEvent;
            if (g) {
                g.removeListener(i, h)
            }
        },
        onWindowUnload: function(j, i, h) {
            var g = a.unloadEvent;
            if (!g) {
                a.unloadEvent = g = new Ext.util.Event();
                a.addListener(c, "unload", a.fireUnload)
            }
            if (j) {
                g.addListener(j, i, h)
            }
        },
        fireUnload: function() {
            try {
                d = c = undefined;
                var m, h, k, j, g;
                a.unloadEvent.fire();
                if (Ext.isGecko3) {
                    m = Ext.ComponentQuery.query("gridview");
                    h = 0;
                    k = m.length;
                    for (; h < k; h++) {
                        m[h].scrollToTop()
                    }
                }
                g = Ext.cache;
                for (j in g) {
                    if (g.hasOwnProperty(j)) {
                        a.removeAll(j)
                    }
                }
            } catch (l) {}
        },
        removeUnloadListener: function(i, h) {
            var g = a.unloadEvent;
            if (g) {
                g.removeListener(i, h)
            }
        },
        useKeyDown: Ext.isWebKit ? parseInt(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1], 10) >= 525 : !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera),
        getKeyEvent: function() {
            return a.useKeyDown ? "keydown" : "keypress"
        }
    });
    if (!("addEventListener" in document) && document.attachEvent) {
        Ext.apply(a, {
            pollScroll: function() {
                var g = true;
                try {
                    document.documentElement.doScroll("left")
                } catch (h) {
                    g = false
                }
                if (g && document.body) {
                    a.onReadyEvent({
                        type: "doScroll"
                    })
                } else {
                    a.scrollTimeout = setTimeout(a.pollScroll, 20)
                }
                return g
            },
            scrollTimeout: null,
            readyStatesRe: /complete/i,
            checkReadyState: function() {
                var g = document.readyState;
                if (a.readyStatesRe.test(g)) {
                    a.onReadyEvent({
                        type: g
                    })
                }
            },
            bindReadyEvent: function() {
                var g = true;
                if (a.hasBoundOnReady) {
                    return
                }
                try {
                    g = window.frameElement === undefined
                } catch (h) {
                    g = false
                }
                if (!g || !d.documentElement.doScroll) {
                    a.pollScroll = Ext.emptyFn
                }
                if (a.pollScroll() === true) {
                    return
                }
                if (d.readyState == "complete") {
                    a.onReadyEvent({
                        type: "already " + (d.readyState || "body")
                    })
                } else {
                    d.attachEvent("onreadystatechange", a.checkReadyState);
                    window.attachEvent("onload", a.onReadyEvent);
                    a.hasBoundOnReady = true
                }
            },
            onReadyEvent: function(g) {
                if (g && g.type) {
                    a.onReadyChain.push(g.type)
                }
                if (a.hasBoundOnReady) {
                    document.detachEvent("onreadystatechange", a.checkReadyState);
                    window.detachEvent("onload", a.onReadyEvent)
                }
                if (Ext.isNumber(a.scrollTimeout)) {
                    clearTimeout(a.scrollTimeout);
                    delete a.scrollTimeout
                }
                if (!Ext.isReady) {
                    a.fireDocReady()
                }
            },
            onReadyChain: []
        })
    }
    Ext.onReady = function(i, h, g) {
        Ext.Loader.onReady(i, h, true, g)
    };
    Ext.onDocumentReady = a.onDocumentReady;
    a.on = a.addListener;
    a.un = a.removeListener;
    Ext.onReady(b)
};
Ext.define("Ext.EventObjectImpl", {
    uses: ["Ext.util.Point"],
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    WHEEL_SCALE: (function() {
        var a;
        if (Ext.isGecko) {
            a = 3
        } else {
            if (Ext.isMac) {
                if (Ext.isSafari && Ext.webKitVersion >= 532) {
                    a = 120
                } else {
                    a = 12
                }
                a *= 3
            } else {
                a = 120
            }
        }
        return a
    }()),
    clickRe: /(dbl)?click/,
    safariKeys: {
        3: 13,
        63234: 37,
        63235: 39,
        63232: 38,
        63233: 40,
        63276: 33,
        63277: 34,
        63272: 46,
        63273: 36,
        63275: 35
    },
    btnMap: Ext.isIE ? {
        1: 0,
        4: 1,
        2: 2
    } : {
        0: 0,
        1: 1,
        2: 2
    },
    constructor: function(a, b) {
        if (a) {
            this.setEvent(a.browserEvent || a, b)
        }
    },
    setEvent: function(d, e) {
        var c = this,
            b, a;
        if (d == c || (d && d.browserEvent)) {
            return d
        }
        c.browserEvent = d;
        if (d) {
            b = d.button ? c.btnMap[d.button] : (d.which ? d.which - 1 : -1);
            if (c.clickRe.test(d.type) && b == -1) {
                b = 0
            }
            a = {
                type: d.type,
                button: b,
                shiftKey: d.shiftKey,
                ctrlKey: d.ctrlKey || d.metaKey || false,
                altKey: d.altKey,
                keyCode: d.keyCode,
                charCode: d.charCode,
                target: Ext.EventManager.getTarget(d),
                relatedTarget: Ext.EventManager.getRelatedTarget(d),
                currentTarget: d.currentTarget,
                xy: (e ? c.getXY() : null)
            }
        } else {
            a = {
                button: -1,
                shiftKey: false,
                ctrlKey: false,
                altKey: false,
                keyCode: 0,
                charCode: 0,
                target: null,
                xy: [0, 0]
            }
        }
        Ext.apply(c, a);
        return c
    },
    stopEvent: function() {
        this.stopPropagation();
        this.preventDefault()
    },
    preventDefault: function() {
        if (this.browserEvent) {
            Ext.EventManager.preventDefault(this.browserEvent)
        }
    },
    stopPropagation: function() {
        var a = this.browserEvent;
        if (a) {
            if (a.type == "mousedown") {
                Ext.EventManager.stoppedMouseDownEvent.fire(this)
            }
            Ext.EventManager.stopPropagation(a)
        }
    },
    getCharCode: function() {
        return this.charCode || this.keyCode
    },
    getKey: function() {
        return this.normalizeKey(this.keyCode || this.charCode)
    },
    normalizeKey: function(a) {
        return Ext.isWebKit ? (this.safariKeys[a] || a) : a
    },
    getPageX: function() {
        return this.getX()
    },
    getPageY: function() {
        return this.getY()
    },
    getX: function() {
        return this.getXY()[0]
    },
    getY: function() {
        return this.getXY()[1]
    },
    getXY: function() {
        if (!this.xy) {
            this.xy = Ext.EventManager.getPageXY(this.browserEvent)
        }
        return this.xy
    },
    getTarget: function(b, c, a) {
        if (b) {
            return Ext.fly(this.target).findParent(b, c, a)
        }
        return a ? Ext.get(this.target) : this.target
    },
    getRelatedTarget: function(b, c, a) {
        if (b) {
            return Ext.fly(this.relatedTarget).findParent(b, c, a)
        }
        return a ? Ext.get(this.relatedTarget) : this.relatedTarget
    },
    correctWheelDelta: function(c) {
        var b = this.WHEEL_SCALE,
            a = Math.round(c / b);
        if (!a && c) {
            a = (c < 0) ? -1 : 1
        }
        return a
    },
    getWheelDeltas: function() {
        var d = this,
            c = d.browserEvent,
            b = 0,
            a = 0;
        if (Ext.isDefined(c.wheelDeltaX)) {
            b = c.wheelDeltaX;
            a = c.wheelDeltaY
        } else {
            if (c.wheelDelta) {
                a = c.wheelDelta
            } else {
                if (c.detail) {
                    a = -c.detail;
                    if (a > 100) {
                        a = 3
                    } else {
                        if (a < -100) {
                            a = -3
                        }
                    }
                    if (Ext.isDefined(c.axis) && c.axis === c.HORIZONTAL_AXIS) {
                        b = a;
                        a = 0
                    }
                }
            }
        }
        return {
            x: d.correctWheelDelta(b),
            y: d.correctWheelDelta(a)
        }
    },
    getWheelDelta: function() {
        var a = this.getWheelDeltas();
        return a.y
    },
    within: function(d, e, b) {
        if (d) {
            var c = e ? this.getRelatedTarget() : this.getTarget(),
                a;
            if (c) {
                a = Ext.fly(d).contains(c);
                if (!a && b) {
                    a = c == Ext.getDom(d)
                }
                return a
            }
        }
        return false
    },
    isNavKeyPress: function() {
        var b = this,
            a = this.normalizeKey(b.keyCode);
        return (a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB || a == b.ESC
    },
    isSpecialKey: function() {
        var a = this.normalizeKey(this.keyCode);
        return (this.type == "keypress" && this.ctrlKey) || this.isNavKeyPress() || (a == this.BACKSPACE) || (a >= 16 && a <= 20) || (a >= 44 && a <= 46)
    },
    getPoint: function() {
        var a = this.getXY();
        return new Ext.util.Point(a[0], a[1])
    },
    hasModifier: function() {
        return this.ctrlKey || this.altKey || this.shiftKey || this.metaKey
    },
    injectEvent: (function() {
        var d, e = {},
            c;
        if (!Ext.isIE && document.createEvent) {
            d = {
                createHtmlEvent: function(k, i, h, g) {
                    var j = k.createEvent("HTMLEvents");
                    j.initEvent(i, h, g);
                    return j
                },
                createMouseEvent: function(u, s, m, l, o, k, i, j, g, r, q, n, p) {
                    var h = u.createEvent("MouseEvents"),
                        t = u.defaultView || window;
                    if (h.initMouseEvent) {
                        h.initMouseEvent(s, m, l, t, o, k, i, k, i, j, g, r, q, n, p)
                    } else {
                        h = u.createEvent("UIEvents");
                        h.initEvent(s, m, l);
                        h.view = t;
                        h.detail = o;
                        h.screenX = k;
                        h.screenY = i;
                        h.clientX = k;
                        h.clientY = i;
                        h.ctrlKey = j;
                        h.altKey = g;
                        h.metaKey = q;
                        h.shiftKey = r;
                        h.button = n;
                        h.relatedTarget = p
                    }
                    return h
                },
                createUIEvent: function(m, k, i, h, j) {
                    var l = m.createEvent("UIEvents"),
                        g = m.defaultView || window;
                    l.initUIEvent(k, i, h, g, j);
                    return l
                },
                fireEvent: function(i, g, h) {
                    i.dispatchEvent(h)
                },
                fixTarget: function(g) {
                    if (g == window && !g.dispatchEvent) {
                        return document
                    }
                    return g
                }
            }
        } else {
            if (document.createEventObject) {
                c = {
                    0: 1,
                    1: 4,
                    2: 2
                };
                d = {
                    createHtmlEvent: function(k, i, h, g) {
                        var j = k.createEventObject();
                        j.bubbles = h;
                        j.cancelable = g;
                        return j
                    },
                    createMouseEvent: function(t, s, m, l, o, k, i, j, g, r, q, n, p) {
                        var h = t.createEventObject();
                        h.bubbles = m;
                        h.cancelable = l;
                        h.detail = o;
                        h.screenX = k;
                        h.screenY = i;
                        h.clientX = k;
                        h.clientY = i;
                        h.ctrlKey = j;
                        h.altKey = g;
                        h.shiftKey = r;
                        h.metaKey = q;
                        h.button = c[n] || n;
                        h.relatedTarget = p;
                        return h
                    },
                    createUIEvent: function(l, j, h, g, i) {
                        var k = l.createEventObject();
                        k.bubbles = h;
                        k.cancelable = g;
                        return k
                    },
                    fireEvent: function(i, g, h) {
                        i.fireEvent("on" + g, h)
                    },
                    fixTarget: function(g) {
                        if (g == document) {
                            return document.documentElement
                        }
                        return g
                    }
                }
            }
        }
        Ext.Object.each({
            load: [false, false],
            unload: [false, false],
            select: [true, false],
            change: [true, false],
            submit: [true, true],
            reset: [true, false],
            resize: [true, false],
            scroll: [true, false]
        }, function(i, j) {
            var h = j[0],
                g = j[1];
            e[i] = function(m, k) {
                var l = d.createHtmlEvent(i, h, g);
                d.fireEvent(m, i, l)
            }
        });

        function b(i, h) {
            var g = (i != "mousemove");
            return function(m, j) {
                var l = j.getXY(),
                    k = d.createMouseEvent(m.ownerDocument, i, true, g, h, l[0], l[1], j.ctrlKey, j.altKey, j.shiftKey, j.metaKey, j.button, j.relatedTarget);
                d.fireEvent(m, i, k)
            }
        }
        Ext.each(["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout"], function(g) {
            e[g] = b(g, 1)
        });
        Ext.Object.each({
            focusin: [true, false],
            focusout: [true, false],
            activate: [true, true],
            focus: [false, false],
            blur: [false, false]
        }, function(i, j) {
            var h = j[0],
                g = j[1];
            e[i] = function(m, k) {
                var l = d.createUIEvent(m.ownerDocument, i, h, g, 1);
                d.fireEvent(m, i, l)
            }
        });
        if (!d) {
            e = {};
            d = {
                fixTarget: Ext.identityFn
            }
        }

        function a(h, g) {}
        return function(j) {
            var i = this,
                h = e[i.type] || a,
                g = j ? (j.dom || j) : i.getTarget();
            g = d.fixTarget(g);
            h(g, i)
        }
    }())
}, function() {
    Ext.EventObject = new Ext.EventObjectImpl()
});
Ext.define("Ext.dom.AbstractElement_static", {
    override: "Ext.dom.AbstractElement",
    inheritableStatics: {
        unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
        camelRe: /(-[a-z])/gi,
        cssRe: /([a-z0-9\-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
        opacityRe: /alpha\(opacity=(.*)\)/i,
        propertyCache: {},
        defaultUnit: "px",
        borders: {
            l: "border-left-width",
            r: "border-right-width",
            t: "border-top-width",
            b: "border-bottom-width"
        },
        paddings: {
            l: "padding-left",
            r: "padding-right",
            t: "padding-top",
            b: "padding-bottom"
        },
        margins: {
            l: "margin-left",
            r: "margin-right",
            t: "margin-top",
            b: "margin-bottom"
        },
        addUnits: function(b, a) {
            if (typeof b == "number") {
                return b + (a || this.defaultUnit || "px")
            }
            if (b === "" || b == "auto" || b === undefined || b === null) {
                return b || ""
            }
            if (!this.unitRe.test(b)) {
                return b || ""
            }
            return b
        },
        isAncestor: function(b, d) {
            var a = false;
            b = Ext.getDom(b);
            d = Ext.getDom(d);
            if (b && d) {
                if (b.contains) {
                    return b.contains(d)
                } else {
                    if (b.compareDocumentPosition) {
                        return !!(b.compareDocumentPosition(d) & 16)
                    } else {
                        while ((d = d.parentNode)) {
                            a = d == b || a
                        }
                    }
                }
            }
            return a
        },
        parseBox: function(b) {
            if (typeof b != "string") {
                b = b.toString()
            }
            var c = b.split(" "),
                a = c.length;
            if (a == 1) {
                c[1] = c[2] = c[3] = c[0]
            } else {
                if (a == 2) {
                    c[2] = c[0];
                    c[3] = c[1]
                } else {
                    if (a == 3) {
                        c[3] = c[1]
                    }
                }
            }
            return {
                top: parseFloat(c[0]) || 0,
                right: parseFloat(c[1]) || 0,
                bottom: parseFloat(c[2]) || 0,
                left: parseFloat(c[3]) || 0
            }
        },
        unitizeBox: function(g, e) {
            var d = this.addUnits,
                c = this.parseBox(g);
            return d(c.top, e) + " " + d(c.right, e) + " " + d(c.bottom, e) + " " + d(c.left, e)
        },
        camelReplaceFn: function(b, c) {
            return c.charAt(1).toUpperCase()
        },
        normalize: function(a) {
            if (a == "float") {
                a = Ext.supports.Float ? "cssFloat" : "styleFloat"
            }
            return this.propertyCache[a] || (this.propertyCache[a] = a.replace(this.camelRe, this.camelReplaceFn))
        },
        getDocumentHeight: function() {
            return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight())
        },
        getDocumentWidth: function() {
            return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth())
        },
        getViewportHeight: function() {
            return window.innerHeight
        },
        getViewportWidth: function() {
            return window.innerWidth
        },
        getViewSize: function() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        getOrientation: function() {
            if (Ext.supports.OrientationChange) {
                return (window.orientation == 0) ? "portrait" : "landscape"
            }
            return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape"
        },
        fromPoint: function(a, b) {
            return Ext.get(document.elementFromPoint(a, b))
        },
        parseStyles: function(c) {
            var a = {},
                b = this.cssRe,
                d;
            if (c) {
                b.lastIndex = 0;
                while ((d = b.exec(c))) {
                    a[d[1]] = d[2]
                }
            }
            return a
        }
    }
}, function() {
    var g = document,
        a = this,
        e = null,
        d = g.compatMode == "CSS1Compat",
        c, b = function(i) {
            if (!c) {
                c = new a.Fly()
            }
            c.attach(i);
            return c
        };
    if (!("activeElement" in g) && g.addEventListener) {
        g.addEventListener("focus", function(i) {
            if (i && i.target) {
                e = (i.target == g) ? null : i.target
            }
        }, true)
    }

    function h(j, k, i) {
        return function() {
            j.selectionStart = k;
            j.selectionEnd = i
        }
    }
    a.addInheritableStatics({
        getActiveElement: function() {
            var j;
            try {
                j = g.activeElement
            } catch (i) {}
            j = j || e;
            if (!j) {
                j = e = document.body
            }
            return j
        },
        getRightMarginFixCleaner: function(n) {
            var k = Ext.supports,
                l = k.DisplayChangeInputSelectionBug,
                m = k.DisplayChangeTextAreaSelectionBug,
                o, i, p, j;
            if (l || m) {
                o = g.activeElement || e;
                i = o && o.tagName;
                if ((m && i == "TEXTAREA") || (l && i == "INPUT" && o.type == "text")) {
                    if (Ext.dom.Element.isAncestor(n, o)) {
                        p = o.selectionStart;
                        j = o.selectionEnd;
                        if (Ext.isNumber(p) && Ext.isNumber(j)) {
                            return h(o, p, j)
                        }
                    }
                }
            }
            return Ext.emptyFn
        },
        getViewWidth: function(i) {
            return i ? Ext.dom.Element.getDocumentWidth() : Ext.dom.Element.getViewportWidth()
        },
        getViewHeight: function(i) {
            return i ? Ext.dom.Element.getDocumentHeight() : Ext.dom.Element.getViewportHeight()
        },
        getDocumentHeight: function() {
            return Math.max(!d ? g.body.scrollHeight : g.documentElement.scrollHeight, Ext.dom.Element.getViewportHeight())
        },
        getDocumentWidth: function() {
            return Math.max(!d ? g.body.scrollWidth : g.documentElement.scrollWidth, Ext.dom.Element.getViewportWidth())
        },
        getViewportHeight: function() {
            return Ext.isIE ? (Ext.isStrict ? g.documentElement.clientHeight : g.body.clientHeight) : self.innerHeight
        },
        getViewportWidth: function() {
            return (!Ext.isStrict && !Ext.isOpera) ? g.body.clientWidth : Ext.isIE ? g.documentElement.clientWidth : self.innerWidth
        },
        getY: function(i) {
            return Ext.dom.Element.getXY(i)[1]
        },
        getX: function(i) {
            return Ext.dom.Element.getXY(i)[0]
        },
        getXY: function(k) {
            var n = g.body,
                j = g.documentElement,
                i = 0,
                l = 0,
                o = [0, 0],
                r = Math.round,
                m, q;
            k = Ext.getDom(k);
            if (k != g && k != n) {
                if (Ext.isIE) {
                    try {
                        m = k.getBoundingClientRect();
                        l = j.clientTop || n.clientTop;
                        i = j.clientLeft || n.clientLeft
                    } catch (p) {
                        m = {
                            left: 0,
                            top: 0
                        }
                    }
                } else {
                    m = k.getBoundingClientRect()
                }
                q = b(document).getScroll();
                o = [r(m.left + q.left - i), r(m.top + q.top - l)]
            }
            return o
        },
        setXY: function(j, k) {
            (j = Ext.fly(j, "_setXY")).position();
            var l = j.translatePoints(k),
                i = j.dom.style,
                m;
            for (m in l) {
                if (!isNaN(l[m])) {
                    i[m] = l[m] + "px"
                }
            }
        },
        setX: function(j, i) {
            Ext.dom.Element.setXY(j, [i, false])
        },
        setY: function(i, j) {
            Ext.dom.Element.setXY(i, [false, j])
        },
        serializeForm: function(k) {
            var l = k.elements || (document.forms[k] || Ext.getDom(k)).elements,
                v = false,
                u = encodeURIComponent,
                p = "",
                n = l.length,
                q, i, t, x, w, r, m, s, j;
            for (r = 0; r < n; r++) {
                q = l[r];
                i = q.name;
                t = q.type;
                x = q.options;
                if (!q.disabled && i) {
                    if (/select-(one|multiple)/i.test(t)) {
                        s = x.length;
                        for (m = 0; m < s; m++) {
                            j = x[m];
                            if (j.selected) {
                                w = j.hasAttribute ? j.hasAttribute("value") : j.getAttributeNode("value").specified;
                                p += Ext.String.format("{0}={1}&", u(i), u(w ? j.value : j.text))
                            }
                        }
                    } else {
                        if (!(/file|undefined|reset|button/i.test(t))) {
                            if (!(/radio|checkbox/i.test(t) && !q.checked) && !(t == "submit" && v)) {
                                p += u(i) + "=" + u(q.value) + "&";
                                v = /submit/i.test(t)
                            }
                        }
                    }
                }
            }
            return p.substr(0, p.length - 1)
        }
    })
});
Ext.define("Ext.dom.AbstractElement_alignment", {
    override: "Ext.dom.AbstractElement",
    getAnchorXY: function(g, k, n) {
        g = (g || "tl").toLowerCase();
        n = n || {};
        var j = this,
            a = j.dom == document.body || j.dom == document,
            b = n.width || a ? window.innerWidth : j.getWidth(),
            l = n.height || a ? window.innerHeight : j.getHeight(),
            m, c = Math.round,
            d = j.getXY(),
            i = a ? 0 : !k ? d[0] : 0,
            h = a ? 0 : !k ? d[1] : 0,
            e = {
                c: [c(b * 0.5), c(l * 0.5)],
                t: [c(b * 0.5), 0],
                l: [0, c(l * 0.5)],
                r: [b, c(l * 0.5)],
                b: [c(b * 0.5), l],
                tl: [0, 0],
                bl: [0, l],
                br: [b, l],
                tr: [b, 0]
            };
        m = e[g];
        return [m[0] + i, m[1] + h]
    },
    alignToRe: /^([a-z]+)-([a-z]+)(\?)?$/,
    getAlignToXY: function(e, z, i, s) {
        s = !!s;
        e = Ext.get(e);
        i = i || [0, 0];
        if (!z || z == "?") {
            z = "tl-bl?"
        } else {
            if (!(/-/).test(z) && z !== "") {
                z = "tl-" + z
            }
        }
        z = z.toLowerCase();
        var v = this,
            d = z.match(this.alignToRe),
            n = window.innerWidth,
            u = window.innerHeight,
            c = "",
            b = "",
            A, w, m, l, q, o, g, a, k, j, r, p, h, t;
        if (!d) {
            throw "Element.alignTo with an invalid alignment " + z
        }
        c = d[1];
        b = d[2];
        t = !!d[3];
        A = v.getAnchorXY(c, true);
        w = e.getAnchorXY(b, s);
        m = w[0] - A[0] + i[0];
        l = w[1] - A[1] + i[1];
        if (t) {
            r = v.getWidth();
            p = v.getHeight();
            h = e.getPageBox();
            a = c.charAt(0);
            g = c.charAt(c.length - 1);
            j = b.charAt(0);
            k = b.charAt(b.length - 1);
            o = ((a == "t" && j == "b") || (a == "b" && j == "t"));
            q = ((g == "r" && k == "l") || (g == "l" && k == "r"));
            if (m + r > n) {
                m = q ? h.left - r : n - r
            }
            if (m < 0) {
                m = q ? h.right : 0
            }
            if (l + p > u) {
                l = o ? h.top - p : u - p
            }
            if (l < 0) {
                l = o ? h.bottom : 0
            }
        }
        return [m, l]
    },
    getAnchor: function() {
        var b = (this.$cache || this.getCache()).data,
            a;
        if (!this.dom) {
            return
        }
        a = b._anchor;
        if (!a) {
            a = b._anchor = {}
        }
        return a
    },
    adjustForConstraints: function(c, b) {
        var a = this.getConstrainVector(b, c);
        if (a) {
            c[0] += a[0];
            c[1] += a[1]
        }
        return c
    }
});
Ext.define("Ext.dom.AbstractElement_insertion", {
    override: "Ext.dom.AbstractElement",
    appendChild: function(a) {
        return Ext.get(a).appendTo(this)
    },
    appendTo: function(a) {
        Ext.getDom(a).appendChild(this.dom);
        return this
    },
    insertBefore: function(a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a);
        return this
    },
    insertAfter: function(a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a.nextSibling);
        return this
    },
    insertFirst: function(b, a) {
        b = b || {};
        if (b.nodeType || b.dom || typeof b == "string") {
            b = Ext.getDom(b);
            this.dom.insertBefore(b, this.dom.firstChild);
            return !a ? Ext.get(b) : b
        } else {
            return this.createChild(b, this.dom.firstChild, a)
        }
    },
    insertSibling: function(b, g, j) {
        var i = this,
            k = (g || "before").toLowerCase() == "after",
            d, a, c, h;
        if (Ext.isArray(b)) {
            a = i;
            c = b.length;
            for (h = 0; h < c; h++) {
                d = Ext.fly(a, "_internal").insertSibling(b[h], g, j);
                if (k) {
                    a = d
                }
            }
            return d
        }
        b = b || {};
        if (b.nodeType || b.dom) {
            d = i.dom.parentNode.insertBefore(Ext.getDom(b), k ? i.dom.nextSibling : i.dom);
            if (!j) {
                d = Ext.get(d)
            }
        } else {
            if (k && !i.dom.nextSibling) {
                d = Ext.core.DomHelper.append(i.dom.parentNode, b, !j)
            } else {
                d = Ext.core.DomHelper[k ? "insertAfter" : "insertBefore"](i.dom, b, !j)
            }
        }
        return d
    },
    replace: function(a) {
        a = Ext.get(a);
        this.insertBefore(a);
        a.remove();
        return this
    },
    replaceWith: function(a) {
        var b = this;
        if (a.nodeType || a.dom || typeof a == "string") {
            a = Ext.get(a);
            b.dom.parentNode.insertBefore(a, b.dom)
        } else {
            a = Ext.core.DomHelper.insertBefore(b.dom, a)
        }
        delete Ext.cache[b.id];
        Ext.removeNode(b.dom);
        b.id = Ext.id(b.dom = a);
        Ext.dom.AbstractElement.addToCache(b.isFlyweight ? new Ext.dom.AbstractElement(b.dom) : b);
        return b
    },
    createChild: function(b, a, c) {
        b = b || {
            tag: "div"
        };
        if (a) {
            return Ext.core.DomHelper.insertBefore(a, b, c !== true)
        } else {
            return Ext.core.DomHelper[!this.dom.firstChild ? "insertFirst" : "append"](this.dom, b, c !== true)
        }
    },
    wrap: function(b, c, a) {
        var e = Ext.core.DomHelper.insertBefore(this.dom, b || {
                tag: "div"
            }, true),
            d = e;
        if (a) {
            d = Ext.DomQuery.selectNode(a, e.dom)
        }
        d.appendChild(this.dom);
        return c ? e.dom : e
    },
    insertHtml: function(b, c, a) {
        var d = Ext.core.DomHelper.insertHtml(b, this.dom, c);
        return a ? Ext.get(d) : d
    }
});
Ext.define("Ext.dom.AbstractElement_position", {
    override: "Ext.dom.AbstractElement",
    getX: function(a) {
        return this.getXY(a)[0]
    },
    getY: function(a) {
        return this.getXY(a)[1]
    },
    getXY: function() {
        var a = window.webkitConvertPointFromNodeToPage(this.dom, new WebKitPoint(0, 0));
        return [a.x, a.y]
    },
    getOffsetsTo: function(a) {
        var c = this.getXY(),
            b = Ext.fly(a, "_internal").getXY();
        return [c[0] - b[0], c[1] - b[1]]
    },
    setX: function(a) {
        return this.setXY([a, this.getY()])
    },
    setY: function(a) {
        return this.setXY([this.getX(), a])
    },
    setLeft: function(a) {
        this.setStyle("left", this.self.addUnits(a));
        return this
    },
    setTop: function(a) {
        this.setStyle("top", this.self.addUnits(a));
        return this
    },
    setRight: function(a) {
        this.setStyle("right", this.self.addUnits(a));
        return this
    },
    setBottom: function(a) {
        this.setStyle("bottom", this.self.addUnits(a));
        return this
    },
    setXY: function(e) {
        var b = this,
            d, a, c;
        if (arguments.length > 1) {
            e = [e, arguments[1]]
        }
        d = b.translatePoints(e);
        a = b.dom.style;
        for (c in d) {
            if (!d.hasOwnProperty(c)) {
                continue
            }
            if (!isNaN(d[c])) {
                a[c] = d[c] + "px"
            }
        }
        return b
    },
    getLeft: function(a) {
        return parseInt(this.getStyle("left"), 10) || 0
    },
    getRight: function(a) {
        return parseInt(this.getStyle("right"), 10) || 0
    },
    getTop: function(a) {
        return parseInt(this.getStyle("top"), 10) || 0
    },
    getBottom: function(a) {
        return parseInt(this.getStyle("bottom"), 10) || 0
    },
    translatePoints: function(a, h) {
        h = isNaN(a[1]) ? h : a[1];
        a = isNaN(a[0]) ? a : a[0];
        var d = this,
            e = d.isStyle("position", "relative"),
            g = d.getXY(),
            b = parseInt(d.getStyle("left"), 10),
            c = parseInt(d.getStyle("top"), 10);
        b = !isNaN(b) ? b : (e ? 0 : d.dom.offsetLeft);
        c = !isNaN(c) ? c : (e ? 0 : d.dom.offsetTop);
        return {
            left: (a - g[0] + b),
            top: (h - g[1] + c)
        }
    },
    setBox: function(d) {
        var c = this,
            b = d.width,
            a = d.height,
            g = d.top,
            e = d.left;
        if (e !== undefined) {
            c.setLeft(e)
        }
        if (g !== undefined) {
            c.setTop(g)
        }
        if (b !== undefined) {
            c.setWidth(b)
        }
        if (a !== undefined) {
            c.setHeight(a)
        }
        return this
    },
    getBox: function(h, k) {
        var i = this,
            e = i.dom,
            c = e.offsetWidth,
            m = e.offsetHeight,
            o, g, d, a, n, j;
        if (!k) {
            o = i.getXY()
        } else {
            if (h) {
                o = [0, 0]
            } else {
                o = [parseInt(i.getStyle("left"), 10) || 0, parseInt(i.getStyle("top"), 10) || 0]
            }
        }
        if (!h) {
            g = {
                x: o[0],
                y: o[1],
                0: o[0],
                1: o[1],
                width: c,
                height: m
            }
        } else {
            d = i.getBorderWidth.call(i, "l") + i.getPadding.call(i, "l");
            a = i.getBorderWidth.call(i, "r") + i.getPadding.call(i, "r");
            n = i.getBorderWidth.call(i, "t") + i.getPadding.call(i, "t");
            j = i.getBorderWidth.call(i, "b") + i.getPadding.call(i, "b");
            g = {
                x: o[0] + d,
                y: o[1] + n,
                0: o[0] + d,
                1: o[1] + n,
                width: c - (d + a),
                height: m - (n + j)
            }
        }
        g.left = g.x;
        g.top = g.y;
        g.right = g.x + g.width;
        g.bottom = g.y + g.height;
        return g
    },
    getPageBox: function(e) {
        var i = this,
            c = i.dom,
            k = c.offsetWidth,
            g = c.offsetHeight,
            n = i.getXY(),
            m = n[1],
            a = n[0] + k,
            j = n[1] + g,
            d = n[0];
        if (!c) {
            return new Ext.util.Region()
        }
        if (e) {
            return new Ext.util.Region(m, a, j, d)
        } else {
            return {
                left: d,
                top: m,
                width: k,
                height: g,
                right: a,
                bottom: j
            }
        }
    }
});
Ext.define("Ext.dom.AbstractElement_style", {
    override: "Ext.dom.AbstractElement"
}, function() {
    var d = this,
        l = /\w/g,
        p = /\s+/,
        c = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
        i = Ext.supports.ClassList,
        e = "padding",
        h = "margin",
        a = "border",
        q = "-left",
        b = "-right",
        n = "-top",
        j = "-bottom",
        o = "-width",
        k = {
            l: a + q + o,
            r: a + b + o,
            t: a + n + o,
            b: a + j + o
        },
        g = {
            l: e + q,
            r: e + b,
            t: e + n,
            b: e + j
        },
        m = {
            l: h + q,
            r: h + b,
            t: h + n,
            b: h + j
        };
    Ext.override(d, {
        styleHooks: {},
        addStyles: function(y, x) {
            var t = 0,
                w = (y || "").match(l),
                v, r = w.length,
                u, s = [];
            if (r == 1) {
                t = Math.abs(parseFloat(this.getStyle(x[w[0]])) || 0)
            } else {
                if (r) {
                    for (v = 0; v < r; v++) {
                        u = w[v];
                        s.push(x[u])
                    }
                    s = this.getStyle(s);
                    for (v = 0; v < r; v++) {
                        u = w[v];
                        t += Math.abs(parseFloat(s[x[u]]) || 0)
                    }
                }
            }
            return t
        },
        addCls: i ? function(w) {
            var x = this,
                t = x.dom,
                r = x.trimRe,
                s, y, u, v, z;
            if (typeof(w) == "string") {
                w = w.replace(r, "").split(p)
            }
            if (t && w && !!(v = w.length)) {
                if (!t.className) {
                    t.className = w.join(" ")
                } else {
                    s = t.classList;
                    for (u = 0; u < v; ++u) {
                        z = w[u];
                        if (z) {
                            if (!s.contains(z)) {
                                if (y) {
                                    y.push(z)
                                } else {
                                    y = t.className.replace(r, "");
                                    y = y ? [y, z] : [z]
                                }
                            }
                        }
                    }
                    if (y) {
                        t.className = y.join(" ")
                    }
                }
            }
            return x
        } : function(s) {
            var t = this,
                v = t.dom,
                u, r;
            if (v && s && s.length) {
                r = Ext.Element.mergeClsList(v.className, s);
                if (r.changed) {
                    v.className = r.join(" ")
                }
            }
            return t
        },
        removeCls: function(t) {
            var u = this,
                v = u.dom,
                r, s;
            if (typeof(t) == "string") {
                t = t.replace(u.trimRe, "").split(p)
            }
            if (v && v.className && t && !!(r = t.length)) {
                if (r == 1 && i) {
                    if (t[0]) {
                        v.classList.remove(t[0])
                    }
                } else {
                    s = Ext.Element.removeCls(v.className, t);
                    if (s.changed) {
                        v.className = s.join(" ")
                    }
                }
            }
            return u
        },
        radioCls: function(u) {
            var w = this.dom.parentNode.childNodes,
                s, t, r;
            u = Ext.isArray(u) ? u : [u];
            for (t = 0, r = w.length; t < r; t++) {
                s = w[t];
                if (s && s.nodeType == 1) {
                    Ext.fly(s, "_internal").removeCls(u)
                }
            }
            return this.addCls(u)
        },
        toggleCls: i ? function(r) {
            var s = this,
                t = s.dom;
            if (t) {
                r = r.replace(s.trimRe, "");
                if (r) {
                    t.classList.toggle(r)
                }
            }
            return s
        } : function(r) {
            var s = this;
            return s.hasCls(r) ? s.removeCls(r) : s.addCls(r)
        },
        hasCls: i ? function(r) {
            var s = this.dom;
            return (s && r) ? s.classList.contains(r) : false
        } : function(r) {
            var s = this.dom;
            return s ? r && (" " + s.className + " ").indexOf(" " + r + " ") != -1 : false
        },
        replaceCls: function(s, r) {
            return this.removeCls(s).addCls(r)
        },
        isStyle: function(r, s) {
            return this.getStyle(r) == s
        },
        getStyle: function(D, y) {
            var z = this,
                u = z.dom,
                G = typeof D != "string",
                E = z.styleHooks,
                s = D,
                A = s,
                x = 1,
                w, F, C, B, t, r, v;
            if (G) {
                C = {};
                s = A[0];
                v = 0;
                if (!(x = A.length)) {
                    return C
                }
            }
            if (!u || u.documentElement) {
                return C || ""
            }
            w = u.style;
            if (y) {
                r = w
            } else {
                r = u.ownerDocument.defaultView.getComputedStyle(u, null);
                if (!r) {
                    y = true;
                    r = w
                }
            }
            do {
                B = E[s];
                if (!B) {
                    E[s] = B = {
                        name: d.normalize(s)
                    }
                }
                if (B.get) {
                    t = B.get(u, z, y, r)
                } else {
                    F = B.name;
                    t = r[F]
                }
                if (!G) {
                    return t
                }
                C[s] = t;
                s = A[++v]
            } while (v < x);
            return C
        },
        getStyles: function() {
            var s = Ext.Array.slice(arguments),
                r = s.length,
                t;
            if (r && typeof s[r - 1] == "boolean") {
                t = s.pop()
            }
            return this.getStyle(s, t)
        },
        isTransparent: function(s) {
            var r = this.getStyle(s);
            return r ? c.test(r) : false
        },
        setStyle: function(y, w) {
            var u = this,
                x = u.dom,
                r = u.styleHooks,
                t = x.style,
                s = y,
                v;
            if (typeof s == "string") {
                v = r[s];
                if (!v) {
                    r[s] = v = {
                        name: d.normalize(s)
                    }
                }
                w = (w == null) ? "" : w;
                if (v.set) {
                    v.set(x, w, u)
                } else {
                    t[v.name] = w
                }
                if (v.afterSet) {
                    v.afterSet(x, w, u)
                }
            } else {
                for (s in y) {
                    if (y.hasOwnProperty(s)) {
                        v = r[s];
                        if (!v) {
                            r[s] = v = {
                                name: d.normalize(s)
                            }
                        }
                        w = y[s];
                        w = (w == null) ? "" : w;
                        if (v.set) {
                            v.set(x, w, u)
                        } else {
                            t[v.name] = w
                        }
                        if (v.afterSet) {
                            v.afterSet(x, w, u)
                        }
                    }
                }
            }
            return u
        },
        getHeight: function(s) {
            var t = this.dom,
                r = s ? (t.clientHeight - this.getPadding("tb")) : t.offsetHeight;
            return r > 0 ? r : 0
        },
        getWidth: function(r) {
            var t = this.dom,
                s = r ? (t.clientWidth - this.getPadding("lr")) : t.offsetWidth;
            return s > 0 ? s : 0
        },
        setWidth: function(r) {
            var s = this;
            s.dom.style.width = d.addUnits(r);
            return s
        },
        setHeight: function(r) {
            var s = this;
            s.dom.style.height = d.addUnits(r);
            return s
        },
        getBorderWidth: function(r) {
            return this.addStyles(r, k)
        },
        getPadding: function(r) {
            return this.addStyles(r, g)
        },
        margins: m,
        applyStyles: function(t) {
            if (t) {
                var s, r, u = this.dom;
                if (typeof t == "function") {
                    t = t.call()
                }
                if (typeof t == "string") {
                    t = Ext.util.Format.trim(t).split(/\s*(?::|;)\s*/);
                    for (s = 0, r = t.length; s < r;) {
                        u.style[d.normalize(t[s++])] = t[s++]
                    }
                } else {
                    if (typeof t == "object") {
                        this.setStyle(t)
                    }
                }
            }
        },
        setSize: function(t, r) {
            var u = this,
                s = u.dom.style;
            if (Ext.isObject(t)) {
                r = t.height;
                t = t.width
            }
            s.width = d.addUnits(t);
            s.height = d.addUnits(r);
            return u
        },
        getViewSize: function() {
            var r = document,
                s = this.dom;
            if (s == r || s == r.body) {
                return {
                    width: d.getViewportWidth(),
                    height: d.getViewportHeight()
                }
            } else {
                return {
                    width: s.clientWidth,
                    height: s.clientHeight
                }
            }
        },
        getSize: function(s) {
            var r = this.dom;
            return {
                width: Math.max(0, s ? (r.clientWidth - this.getPadding("lr")) : r.offsetWidth),
                height: Math.max(0, s ? (r.clientHeight - this.getPadding("tb")) : r.offsetHeight)
            }
        },
        repaint: function() {
            var r = this.dom;
            this.addCls(Ext.baseCSSPrefix + "repaint");
            setTimeout(function() {
                Ext.fly(r).removeCls(Ext.baseCSSPrefix + "repaint")
            }, 1);
            return this
        },
        getMargin: function(s) {
            var t = this,
                v = {
                    t: "top",
                    l: "left",
                    r: "right",
                    b: "bottom"
                },
                r, w, u;
            if (!s) {
                u = [];
                for (r in t.margins) {
                    if (t.margins.hasOwnProperty(r)) {
                        u.push(t.margins[r])
                    }
                }
                w = t.getStyle(u);
                if (w && typeof w == "object") {
                    for (r in t.margins) {
                        if (t.margins.hasOwnProperty(r)) {
                            w[v[r]] = parseFloat(w[t.margins[r]]) || 0
                        }
                    }
                }
                return w
            } else {
                return t.addStyles.call(t, s, t.margins)
            }
        },
        mask: function(s, w, A) {
            var x = this,
                t = x.dom,
                u = (x.$cache || x.getCache()).data,
                r = u.mask,
                B, z, y = "",
                v = Ext.baseCSSPrefix;
            x.addCls(v + "masked");
            if (x.getStyle("position") == "static") {
                x.addCls(v + "masked-relative")
            }
            if (r) {
                r.remove()
            }
            if (w && typeof w == "string") {
                y = " " + w
            } else {
                y = " " + v + "mask-gray"
            }
            B = x.createChild({
                cls: v + "mask" + ((A !== false) ? "" : (" " + v + "mask-gray")),
                html: s ? ('<div class="' + (w || (v + "mask-message")) + '">' + s + "</div>") : ""
            });
            z = x.getSize();
            u.mask = B;
            if (t === document.body) {
                z.height = window.innerHeight;
                if (x.orientationHandler) {
                    Ext.EventManager.unOrientationChange(x.orientationHandler, x)
                }
                x.orientationHandler = function() {
                    z = x.getSize();
                    z.height = window.innerHeight;
                    B.setSize(z)
                };
                Ext.EventManager.onOrientationChange(x.orientationHandler, x)
            }
            B.setSize(z);
            if (Ext.is.iPad) {
                Ext.repaint()
            }
        },
        unmask: function() {
            var s = this,
                u = (s.$cache || s.getCache()).data,
                r = u.mask,
                t = Ext.baseCSSPrefix;
            if (r) {
                r.remove();
                delete u.mask
            }
            s.removeCls([t + "masked", t + "masked-relative"]);
            if (s.dom === document.body) {
                Ext.EventManager.unOrientationChange(s.orientationHandler, s);
                delete s.orientationHandler
            }
        },
        statics: {
            populateStyleMap: function(y, r) {
                var x = ["margin-", "padding-", "border-width-"],
                    w = ["before", "after"],
                    t, v, s, u;
                for (t = x.length; t--;) {
                    for (u = 2; u--;) {
                        v = x[t] + w[u];
                        y[d.normalize(v)] = y[v] = {
                            name: d.normalize(x[t] + r[u])
                        }
                    }
                }
            }
        }
    });
    Ext.onReady(function() {
        var z = Ext.supports,
            r, x, v, s, y;

        function w(E, B, D, A) {
            var C = A[this.name] || "";
            return c.test(C) ? "transparent" : C
        }

        function u(G, D, F, C) {
            var A = C.marginRight,
                B, E;
            if (A != "0px") {
                B = G.style;
                E = B.display;
                B.display = "inline-block";
                A = (F ? C : G.ownerDocument.defaultView.getComputedStyle(G, null)).marginRight;
                B.display = E
            }
            return A
        }

        function t(H, E, G, D) {
            var A = D.marginRight,
                C, B, F;
            if (A != "0px") {
                C = H.style;
                B = d.getRightMarginFixCleaner(H);
                F = C.display;
                C.display = "inline-block";
                A = (G ? D : H.ownerDocument.defaultView.getComputedStyle(H, "")).marginRight;
                C.display = F;
                B()
            }
            return A
        }
        r = d.prototype.styleHooks;
        d.populateStyleMap(r, ["left", "right"]);
        if (z.init) {
            z.init()
        }
        if (!z.RightMargin) {
            r.marginRight = r["margin-right"] = {
                name: "marginRight",
                get: (z.DisplayChangeInputSelectionBug || z.DisplayChangeTextAreaSelectionBug) ? t : u
            }
        }
        if (!z.TransparentColor) {
            x = ["background-color", "border-color", "color", "outline-color"];
            for (v = x.length; v--;) {
                s = x[v];
                y = d.normalize(s);
                r[s] = r[y] = {
                    name: y,
                    get: w
                }
            }
        }
    })
});
Ext.define("Ext.dom.AbstractElement_traversal", {
    override: "Ext.dom.AbstractElement",
    findParent: function(h, b, a) {
        var e = this.dom,
            c = document.documentElement,
            g = 0,
            d;
        b = b || 50;
        if (isNaN(b)) {
            d = Ext.getDom(b);
            b = Number.MAX_VALUE
        }
        while (e && e.nodeType == 1 && g < b && e != c && e != d) {
            if (Ext.DomQuery.is(e, h)) {
                return a ? Ext.get(e) : e
            }
            g++;
            e = e.parentNode
        }
        return null
    },
    findParentNode: function(d, b, a) {
        var c = Ext.fly(this.dom.parentNode, "_internal");
        return c ? c.findParent(d, b, a) : null
    },
    up: function(b, a) {
        return this.findParentNode(b, a, true)
    },
    select: function(a, b) {
        return Ext.dom.Element.select(a, this.dom, b)
    },
    query: function(a) {
        return Ext.DomQuery.select(a, this.dom)
    },
    down: function(a, b) {
        var c = Ext.DomQuery.selectNode(a, this.dom);
        return b ? c : Ext.get(c)
    },
    child: function(a, b) {
        var d, c = this,
            e;
        e = Ext.id(c.dom);
        e = Ext.escapeId(e);
        d = Ext.DomQuery.selectNode("#" + e + " > " + a, c.dom);
        return b ? d : Ext.get(d)
    },
    parent: function(a, b) {
        return this.matchNode("parentNode", "parentNode", a, b)
    },
    next: function(a, b) {
        return this.matchNode("nextSibling", "nextSibling", a, b)
    },
    prev: function(a, b) {
        return this.matchNode("previousSibling", "previousSibling", a, b)
    },
    first: function(a, b) {
        return this.matchNode("nextSibling", "firstChild", a, b)
    },
    last: function(a, b) {
        return this.matchNode("previousSibling", "lastChild", a, b)
    },
    matchNode: function(b, e, a, c) {
        if (!this.dom) {
            return null
        }
        var d = this.dom[e];
        while (d) {
            if (d.nodeType == 1 && (!a || Ext.DomQuery.is(d, a))) {
                return !c ? Ext.get(d) : d
            }
            d = d[b]
        }
        return null
    },
    isAncestor: function(a) {
        return this.self.isAncestor.call(this.self, this.dom, a)
    }
});
Ext.define("Ext.dom.AbstractElement", {
    requires: ["Ext.EventManager", "Ext.dom.AbstractElement_static", "Ext.dom.AbstractElement_alignment", "Ext.dom.AbstractElement_insertion", "Ext.dom.AbstractElement_position", "Ext.dom.AbstractElement_style", "Ext.dom.AbstractElement_traversal"],
    trimRe: /^\s+|\s+$/g,
    whitespaceRe: /\s/,
    inheritableStatics: {
        trimRe: /^\s+|\s+$/g,
        whitespaceRe: /\s/,
        get: function(c) {
            var d = this,
                b = window.document,
                e = Ext.dom.Element,
                a, h, g, i;
            if (!c) {
                return null
            }
            if (typeof c == "string") {
                if (c == Ext.windowId) {
                    return e.get(window)
                } else {
                    if (c == Ext.documentId) {
                        return e.get(b)
                    }
                }
                a = Ext.cache[c];
                if (a && a.skipGarbageCollection) {
                    h = a.el;
                    return h
                }
                if (!(g = b.getElementById(c))) {
                    return null
                }
                if (a && a.el) {
                    h = Ext.updateCacheEntry(a, g).el
                } else {
                    h = new e(g, !!a)
                }
                return h
            } else {
                if (c.tagName) {
                    if (!(i = c.id)) {
                        i = Ext.id(c)
                    }
                    a = Ext.cache[i];
                    if (a && a.el) {
                        h = Ext.updateCacheEntry(a, c).el
                    } else {
                        h = new e(c, !!a)
                    }
                    return h
                } else {
                    if (c instanceof d) {
                        if (c != d.docEl && c != d.winEl) {
                            i = c.id;
                            a = Ext.cache[i];
                            if (a) {
                                Ext.updateCacheEntry(a, b.getElementById(i) || c.dom)
                            }
                        }
                        return c
                    } else {
                        if (c.isComposite) {
                            return c
                        } else {
                            if (Ext.isArray(c)) {
                                return d.select(c)
                            } else {
                                if (c === b) {
                                    if (!d.docEl) {
                                        d.docEl = Ext.Object.chain(e.prototype);
                                        d.docEl.dom = b;
                                        d.docEl.id = Ext.id(b);
                                        d.addToCache(d.docEl)
                                    }
                                    return d.docEl
                                } else {
                                    if (c === window) {
                                        if (!d.winEl) {
                                            d.winEl = Ext.Object.chain(e.prototype);
                                            d.winEl.dom = window;
                                            d.winEl.id = Ext.id(window);
                                            d.addToCache(d.winEl)
                                        }
                                        return d.winEl
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return null
        },
        addToCache: function(a, b) {
            if (a) {
                Ext.addCacheEntry(b, a)
            }
            return a
        },
        addMethods: function() {
            this.override.apply(this, arguments)
        },
        mergeClsList: function() {
            var m, k = {},
                g, b, d, h, c, n = [],
                e = false,
                a = this.trimRe,
                l = this.whitespaceRe;
            for (g = 0, b = arguments.length; g < b; g++) {
                m = arguments[g];
                if (Ext.isString(m)) {
                    m = m.replace(a, "").split(l)
                }
                if (m) {
                    for (d = 0, h = m.length; d < h; d++) {
                        c = m[d];
                        if (!k[c]) {
                            if (g) {
                                e = true
                            }
                            k[c] = true
                        }
                    }
                }
            }
            for (c in k) {
                n.push(c)
            }
            n.changed = e;
            return n
        },
        removeCls: function(a, b) {
            var h = {},
                g, c, d, k = [],
                e = false,
                j = this.whitespaceRe;
            if (a) {
                if (Ext.isString(a)) {
                    a = a.replace(this.trimRe, "").split(j)
                }
                for (g = 0, c = a.length; g < c; g++) {
                    h[a[g]] = true
                }
            }
            if (b) {
                if (Ext.isString(b)) {
                    b = b.split(j)
                }
                for (g = 0, c = b.length; g < c; g++) {
                    d = b[g];
                    if (h[d]) {
                        e = true;
                        delete h[d]
                    }
                }
            }
            for (d in h) {
                k.push(d)
            }
            k.changed = e;
            return k
        },
        VISIBILITY: 1,
        DISPLAY: 2,
        OFFSETS: 3,
        ASCLASS: 4
    },
    constructor: function(a, b) {
        var c = this,
            d = typeof a == "string" ? document.getElementById(a) : a,
            e;
        if (!d) {
            return null
        }
        e = d.id;
        if (!b && e && Ext.cache[e]) {
            return Ext.cache[e].el
        }
        c.dom = d;
        c.id = e || Ext.id(d);
        c.self.addToCache(c)
    },
    set: function(e, b) {
        var c = this.dom,
            a, d;
        for (a in e) {
            if (e.hasOwnProperty(a)) {
                d = e[a];
                if (a == "style") {
                    this.applyStyles(d)
                } else {
                    if (a == "cls") {
                        c.className = d
                    } else {
                        if (b !== false) {
                            if (d === undefined) {
                                c.removeAttribute(a)
                            } else {
                                c.setAttribute(a, d)
                            }
                        } else {
                            c[a] = d
                        }
                    }
                }
            }
        }
        return this
    },
    defaultUnit: "px",
    is: function(a) {
        return Ext.DomQuery.is(this.dom, a)
    },
    getValue: function(a) {
        var b = this.dom.value;
        return a ? parseInt(b, 10) : b
    },
    remove: function() {
        var a = this,
            b = a.dom;
        if (b) {
            Ext.removeNode(b);
            delete a.dom
        }
    },
    contains: function(a) {
        if (!a) {
            return false
        }
        var b = this,
            c = a.dom || a;
        return (c === b.dom) || Ext.dom.AbstractElement.isAncestor(b.dom, c)
    },
    getAttribute: function(a, b) {
        var c = this.dom;
        return c.getAttributeNS(b, a) || c.getAttribute(b + ":" + a) || c.getAttribute(a) || c[a]
    },
    update: function(a) {
        if (this.dom) {
            this.dom.innerHTML = a
        }
        return this
    },
    setHTML: function(a) {
        if (this.dom) {
            this.dom.innerHTML = a
        }
        return this
    },
    getHTML: function() {
        return this.dom ? this.dom.innerHTML : ""
    },
    hide: function() {
        this.setVisible(false);
        return this
    },
    show: function() {
        this.setVisible(true);
        return this
    },
    setVisible: function(g, a) {
        var b = this,
            e = b.self,
            d = b.getVisibilityMode(),
            c = Ext.baseCSSPrefix;
        switch (d) {
            case e.VISIBILITY:
                b.removeCls([c + "hidden-display", c + "hidden-offsets"]);
                b[g ? "removeCls" : "addCls"](c + "hidden-visibility");
                break;
            case e.DISPLAY:
                b.removeCls([c + "hidden-visibility", c + "hidden-offsets"]);
                b[g ? "removeCls" : "addCls"](c + "hidden-display");
                break;
            case e.OFFSETS:
                b.removeCls([c + "hidden-visibility", c + "hidden-display"]);
                b[g ? "removeCls" : "addCls"](c + "hidden-offsets");
                break
        }
        return b
    },
    getVisibilityMode: function() {
        var b = (this.$cache || this.getCache()).data,
            a = b.visibilityMode;
        if (a === undefined) {
            b.visibilityMode = a = this.self.DISPLAY
        }
        return a
    },
    setVisibilityMode: function(a) {
        (this.$cache || this.getCache()).data.visibilityMode = a;
        return this
    },
    getCache: function() {
        var a = this,
            b = a.dom.id || Ext.id(a.dom);
        a.$cache = Ext.cache[b] || Ext.addCacheEntry(b, null, a.dom);
        return a.$cache
    }
}, function() {
    var a = this;
    Ext.getDetachedBody = function() {
        var b = a.detachedBodyEl;
        if (!b) {
            b = document.createElement("div");
            a.detachedBodyEl = b = new a.Fly(b);
            b.isDetachedBody = true
        }
        return b
    };
    Ext.getElementById = function(d) {
        var c = document.getElementById(d),
            b;
        if (!c && (b = a.detachedBodyEl)) {
            c = b.dom.querySelector("#" + Ext.escapeId(d))
        }
        return c
    };
    Ext.get = function(b) {
        return Ext.dom.Element.get(b)
    };
    this.addStatics({
        Fly: new Ext.Class({
            extend: a,
            isFly: true,
            constructor: function(b) {
                this.dom = b
            },
            attach: function(b) {
                this.dom = b;
                this.$cache = b.id ? Ext.cache[b.id] : null;
                return this
            }
        }),
        _flyweights: {},
        fly: function(e, c) {
            var d = null,
                b = a._flyweights;
            c = c || "_global";
            e = Ext.getDom(e);
            if (e) {
                d = b[c] || (b[c] = new a.Fly());
                d.dom = e;
                d.$cache = e.id ? Ext.cache[e.id] : null
            }
            return d
        }
    });
    Ext.fly = function() {
        return a.fly.apply(a, arguments)
    };
    (function(b) {
        b.destroy = b.remove;
        if (document.querySelector) {
            b.getById = function(e, c) {
                var d = document.getElementById(e) || this.dom.querySelector("#" + Ext.escapeId(e));
                return c ? d : (d ? Ext.get(d) : null)
            }
        } else {
            b.getById = function(e, c) {
                var d = document.getElementById(e);
                return c ? d : (d ? Ext.get(d) : null)
            }
        }
    }(this.prototype))
});
Ext.define("Ext.dom.AbstractQuery", {
    select: function(k, b) {
        var h = [],
            d, g, e, c, a;
        b = b || document;
        if (typeof b == "string") {
            b = document.getElementById(b)
        }
        k = k.split(",");
        for (g = 0, c = k.length; g < c; g++) {
            if (typeof k[g] == "string") {
                if (typeof k[g][0] == "@") {
                    d = b.getAttributeNode(k[g].substring(1));
                    h.push(d)
                } else {
                    d = b.querySelectorAll(k[g]);
                    for (e = 0, a = d.length; e < a; e++) {
                        h.push(d[e])
                    }
                }
            }
        }
        return h
    },
    selectNode: function(b, a) {
        return this.select(b, a)[0]
    },
    is: function(a, b) {
        if (typeof a == "string") {
            a = document.getElementById(a)
        }
        return this.select(b).indexOf(a) !== -1
    }
});
Ext.define("Ext.dom.AbstractHelper", {
    emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe: /^(?:tag|children|cn|html|tpl|tplData)$/i,
    endRe: /end/i,
    attributeTransform: {
        cls: "class",
        htmlFor: "for"
    },
    closeTags: {},
    decamelizeName: (function() {
        var c = /([a-z])([A-Z])/g,
            b = {};

        function a(d, g, e) {
            return g + "-" + e.toLowerCase()
        }
        return function(d) {
            return b[d] || (b[d] = d.replace(c, a))
        }
    }()),
    generateMarkup: function(j, b) {
        var h = this,
            g = typeof j,
            e, a, k, d, c;
        if (g == "string" || g == "number") {
            b.push(j)
        } else {
            if (Ext.isArray(j)) {
                for (d = 0; d < j.length; d++) {
                    if (j[d]) {
                        h.generateMarkup(j[d], b)
                    }
                }
            } else {
                k = j.tag || "div";
                b.push("<", k);
                for (e in j) {
                    if (j.hasOwnProperty(e)) {
                        a = j[e];
                        if (!h.confRe.test(e)) {
                            if (typeof a == "object") {
                                b.push(" ", e, '="');
                                h.generateStyles(a, b).push('"')
                            } else {
                                b.push(" ", h.attributeTransform[e] || e, '="', a, '"')
                            }
                        }
                    }
                }
                if (h.emptyTags.test(k)) {
                    b.push("/>")
                } else {
                    b.push(">");
                    if ((a = j.tpl)) {
                        a.applyOut(j.tplData, b)
                    }
                    if ((a = j.html)) {
                        b.push(a)
                    }
                    if ((a = j.cn || j.children)) {
                        h.generateMarkup(a, b)
                    }
                    c = h.closeTags;
                    b.push(c[k] || (c[k] = "</" + k + ">"))
                }
            }
        }
        return b
    },
    generateStyles: function(e, c) {
        var b = c || [],
            d;
        for (d in e) {
            if (e.hasOwnProperty(d)) {
                b.push(this.decamelizeName(d), ":", e[d], ";")
            }
        }
        return c || b.join("")
    },
    markup: function(a) {
        if (typeof a == "string") {
            return a
        }
        var b = this.generateMarkup(a, []);
        return b.join("")
    },
    applyStyles: function(d, e) {
        if (e) {
            var b = 0,
                a, c;
            d = Ext.fly(d);
            if (typeof e == "function") {
                e = e.call()
            }
            if (typeof e == "string") {
                e = Ext.util.Format.trim(e).split(/\s*(?::|;)\s*/);
                for (a = e.length; b < a;) {
                    d.setStyle(e[b++], e[b++])
                }
            } else {
                if (Ext.isObject(e)) {
                    d.setStyle(e)
                }
            }
        }
    },
    insertHtml: function(g, a, h) {
        var e = {},
            c, j, i, k, d, b;
        g = g.toLowerCase();
        e.beforebegin = ["BeforeBegin", "previousSibling"];
        e.afterend = ["AfterEnd", "nextSibling"];
        i = a.ownerDocument.createRange();
        j = "setStart" + (this.endRe.test(g) ? "After" : "Before");
        if (e[g]) {
            i[j](a);
            k = i.createContextualFragment(h);
            a.parentNode.insertBefore(k, g == "beforebegin" ? a : a.nextSibling);
            return a[(g == "beforebegin" ? "previous" : "next") + "Sibling"]
        } else {
            d = (g == "afterbegin" ? "first" : "last") + "Child";
            if (a.firstChild) {
                i[j](a[d]);
                k = i.createContextualFragment(h);
                if (g == "afterbegin") {
                    a.insertBefore(k, a.firstChild)
                } else {
                    a.appendChild(k)
                }
            } else {
                a.innerHTML = h
            }
            return a[d]
        }
        throw 'Illegal insertion point -> "' + g + '"'
    },
    insertBefore: function(a, c, b) {
        return this.doInsert(a, c, b, "beforebegin")
    },
    insertAfter: function(a, c, b) {
        return this.doInsert(a, c, b, "afterend", "nextSibling")
    },
    insertFirst: function(a, c, b) {
        return this.doInsert(a, c, b, "afterbegin", "firstChild")
    },
    append: function(a, c, b) {
        return this.doInsert(a, c, b, "beforeend", "", true)
    },
    overwrite: function(a, c, b) {
        a = Ext.getDom(a);
        a.innerHTML = this.markup(c);
        return b ? Ext.get(a.firstChild) : a.firstChild
    },
    doInsert: function(d, g, e, h, c, a) {
        var b = this.insertHtml(h, Ext.getDom(d), this.markup(g));
        return e ? Ext.get(b, true) : b
    }
});
Ext.define("Ext.dom.Helper", (function() {
    var b = "afterbegin",
        i = "afterend",
        a = "beforebegin",
        o = "beforeend",
        l = "<table>",
        h = "</table>",
        c = l + "<tbody>",
        n = "</tbody>" + h,
        k = c + "<tr>",
        e = "</tr>" + n,
        p = document.createElement("div"),
        m = ["BeforeBegin", "previousSibling"],
        j = ["AfterEnd", "nextSibling"],
        d = {
            beforebegin: m,
            afterend: j
        },
        g = {
            beforebegin: m,
            afterend: j,
            afterbegin: ["AfterBegin", "firstChild"],
            beforeend: ["BeforeEnd", "lastChild"]
        };
    return {
        extend: "Ext.dom.AbstractHelper",
        requires: ["Ext.dom.AbstractElement"],
        tableRe: /^(?:table|thead|tbody|tr|td)$/i,
        tableElRe: /td|tr|tbody|thead/i,
        useDom: false,
        createDom: function(q, w) {
            var r, z = document,
                u, x, s, y, v, t;
            if (Ext.isArray(q)) {
                r = z.createDocumentFragment();
                for (v = 0, t = q.length; v < t; v++) {
                    this.createDom(q[v], r)
                }
            } else {
                if (typeof q == "string") {
                    r = z.createTextNode(q)
                } else {
                    r = z.createElement(q.tag || "div");
                    u = !!r.setAttribute;
                    for (x in q) {
                        if (!this.confRe.test(x)) {
                            s = q[x];
                            if (x == "cls") {
                                r.className = s
                            } else {
                                if (u) {
                                    r.setAttribute(x, s)
                                } else {
                                    r[x] = s
                                }
                            }
                        }
                    }
                    Ext.DomHelper.applyStyles(r, q.style);
                    if ((y = q.children || q.cn)) {
                        this.createDom(y, r)
                    } else {
                        if (q.html) {
                            r.innerHTML = q.html
                        }
                    }
                }
            }
            if (w) {
                w.appendChild(r)
            }
            return r
        },
        ieTable: function(v, q, w, u) {
            p.innerHTML = [q, w, u].join("");
            var r = -1,
                t = p,
                s;
            while (++r < v) {
                t = t.firstChild
            }
            s = t.nextSibling;
            if (s) {
                s = t;
                t = document.createDocumentFragment();
                while (s) {
                    nx = s.nextSibling;
                    t.appendChild(s);
                    s = nx
                }
            }
            return t
        },
        insertIntoTable: function(z, s, r, t) {
            var q, w, v = s == a,
                y = s == b,
                u = s == o,
                x = s == i;
            if (z == "td" && (y || u) || !this.tableElRe.test(z) && (v || x)) {
                return null
            }
            w = v ? r : x ? r.nextSibling : y ? r.firstChild : null;
            if (v || x) {
                r = r.parentNode
            }
            if (z == "td" || (z == "tr" && (u || y))) {
                q = this.ieTable(4, k, t, e)
            } else {
                if (((z == "tbody" || z == "thead") && (u || y)) || (z == "tr" && (v || x))) {
                    q = this.ieTable(3, c, t, n)
                } else {
                    q = this.ieTable(2, l, t, h)
                }
            }
            r.insertBefore(q, w);
            return q
        },
        createContextualFragment: function(r) {
            var q = document.createDocumentFragment(),
                s, t;
            p.innerHTML = r;
            t = p.childNodes;
            s = t.length;
            while (s--) {
                q.appendChild(t[0])
            }
            return q
        },
        applyStyles: function(q, r) {
            if (r) {
                q = Ext.fly(q);
                if (typeof r == "function") {
                    r = r.call()
                }
                if (typeof r == "string") {
                    r = Ext.dom.Element.parseStyles(r)
                }
                if (typeof r == "object") {
                    q.setStyle(r)
                }
            }
        },
        createHtml: function(q) {
            return this.markup(q)
        },
        doInsert: function(t, v, u, w, s, q) {
            t = t.dom || Ext.getDom(t);
            var r;
            if (this.useDom) {
                r = this.createDom(v, null);
                if (q) {
                    t.appendChild(r)
                } else {
                    (s == "firstChild" ? t : t.parentNode).insertBefore(r, t[s] || t)
                }
            } else {
                r = this.insertHtml(w, t, this.markup(v))
            }
            return u ? Ext.get(r, true) : r
        },
        overwrite: function(s, r, t) {
            var q;
            s = Ext.getDom(s);
            r = this.markup(r);
            if (Ext.isIE && this.tableRe.test(s.tagName)) {
                while (s.firstChild) {
                    s.removeChild(s.firstChild)
                }
                if (r) {
                    q = this.insertHtml("afterbegin", s, r);
                    return t ? Ext.get(q) : q
                }
                return null
            }
            s.innerHTML = r;
            return t ? Ext.get(s.firstChild) : s.firstChild
        },
        insertHtml: function(s, v, t) {
            var x, r, u, q, w;
            s = s.toLowerCase();
            if (v.insertAdjacentHTML) {
                if (Ext.isIE && this.tableRe.test(v.tagName) && (w = this.insertIntoTable(v.tagName.toLowerCase(), s, v, t))) {
                    return w
                }
                if ((x = g[s])) {
                    v.insertAdjacentHTML(x[0], t);
                    return v[x[1]]
                }
            } else {
                if (v.nodeType === 3) {
                    s = s === "afterbegin" ? "beforebegin" : s;
                    s = s === "beforeend" ? "afterend" : s
                }
                r = Ext.supports.CreateContextualFragment ? v.ownerDocument.createRange() : undefined;
                q = "setStart" + (this.endRe.test(s) ? "After" : "Before");
                if (d[s]) {
                    if (r) {
                        r[q](v);
                        w = r.createContextualFragment(t)
                    } else {
                        w = this.createContextualFragment(t)
                    }
                    v.parentNode.insertBefore(w, s == a ? v : v.nextSibling);
                    return v[(s == a ? "previous" : "next") + "Sibling"]
                } else {
                    u = (s == b ? "first" : "last") + "Child";
                    if (v.firstChild) {
                        if (r) {
                            r[q](v[u]);
                            w = r.createContextualFragment(t)
                        } else {
                            w = this.createContextualFragment(t)
                        }
                        if (s == b) {
                            v.insertBefore(w, v.firstChild)
                        } else {
                            v.appendChild(w)
                        }
                    } else {
                        v.innerHTML = t
                    }
                    return v[u]
                }
            }
        },
        createTemplate: function(r) {
            var q = this.markup(r);
            return new Ext.Template(q)
        }
    }
})(), function() {
    Ext.ns("Ext.core");
    Ext.DomHelper = Ext.core.DomHelper = new this
});
Ext.ns("Ext.core");
Ext.dom.Query = Ext.core.DomQuery = Ext.DomQuery = (function() {
    var cache = {},
        simpleCache = {},
        valueCache = {},
        nonSpace = /\S/,
        trimRe = /^\s+|\s+$/g,
        tplRe = /\{(\d+)\}/g,
        modeRe = /^(\s?[\/>+~]\s?|\s|$)/,
        tagTokenRe = /^(#)?([\w\-\*\|\\]+)/,
        nthRe = /(\d*)n\+?(\d*)/,
        nthRe2 = /\D/,
        startIdRe = /^\s*\#/,
        isIE = window.ActiveXObject ? true : false,
        key = 30803,
        longHex = /\\([0-9a-fA-F]{6})/g,
        shortHex = /\\([0-9a-fA-F]{1,6})\s{0,1}/g,
        nonHex = /\\([^0-9a-fA-F]{1})/g,
        escapes = /\\/g,
        num, hasEscapes, supportsColonInGetElementsByTagName, longHexToChar = function($0, $1) {
            return String.fromCharCode(parseInt($1, 16))
        },
        shortToLongHex = function($0, $1) {
            while ($1.length < 6) {
                $1 = "0" + $1
            }
            return "\\" + $1
        },
        charToLongHex = function($0, $1) {
            num = $1.charCodeAt(0).toString(16);
            if (num.length === 1) {
                num = "0" + num
            }
            return "\\0000" + num
        },
        unescapeCssSelector = function(selector) {
            return (hasEscapes) ? selector.replace(longHex, longHexToChar) : selector
        },
        setupEscapes = function(path) {
            hasEscapes = (path.indexOf("\\") > -1);
            if (hasEscapes) {
                path = path.replace(shortHex, shortToLongHex).replace(nonHex, charToLongHex).replace(escapes, "\\\\")
            }
            return path
        };
    eval("var batch = 30803;");

    function child(parent, index) {
        var i = 0,
            n = parent.firstChild;
        while (n) {
            if (n.nodeType == 1) {
                if (++i == index) {
                    return n
                }
            }
            n = n.nextSibling
        }
        return null
    }

    function next(n) {
        while ((n = n.nextSibling) && n.nodeType != 1) {}
        return n
    }

    function prev(n) {
        while ((n = n.previousSibling) && n.nodeType != 1) {}
        return n
    }

    function children(parent) {
        var n = parent.firstChild,
            nodeIndex = -1,
            nextNode;
        while (n) {
            nextNode = n.nextSibling;
            if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
                parent.removeChild(n)
            } else {
                n.nodeIndex = ++nodeIndex
            }
            n = nextNode
        }
        return this
    }

    function byClassName(nodeSet, cls) {
        cls = unescapeCssSelector(cls);
        if (!cls) {
            return nodeSet
        }
        var result = [],
            ri = -1,
            i, ci;
        for (i = 0, ci; ci = nodeSet[i]; i++) {
            if ((" " + ci.className + " ").indexOf(cls) != -1) {
                result[++ri] = ci
            }
        }
        return result
    }

    function attrValue(n, attr) {
        if (!n.tagName && typeof n.length != "undefined") {
            n = n[0]
        }
        if (!n) {
            return null
        }
        if (attr == "for") {
            return n.htmlFor
        }
        if (attr == "class" || attr == "className") {
            return n.className
        }
        return n.getAttribute(attr) || n[attr]
    }

    function getNodes(ns, mode, tagName) {
        var result = [],
            ri = -1,
            cs, i, ni, j, ci, cn, utag, n, cj;
        if (!ns) {
            return result
        }
        tagName = tagName.replace("|", ":") || "*";
        if (typeof ns.getElementsByTagName != "undefined") {
            ns = [ns]
        }
        if (!mode) {
            tagName = unescapeCssSelector(tagName);
            if (!supportsColonNsSeparator() && Ext.DomQuery.isXml(ns[0]) && tagName.indexOf(":") !== -1) {
                for (i = 0, ni; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName.split(":").pop());
                    for (j = 0, ci; ci = cs[j]; j++) {
                        if (ci.tagName === tagName) {
                            result[++ri] = ci
                        }
                    }
                }
            } else {
                for (i = 0, ni; ni = ns[i]; i++) {
                    cs = ni.getElementsByTagName(tagName);
                    for (j = 0, ci; ci = cs[j]; j++) {
                        result[++ri] = ci
                    }
                }
            }
        } else {
            if (mode == "/" || mode == ">") {
                utag = tagName.toUpperCase();
                for (i = 0, ni, cn; ni = ns[i]; i++) {
                    cn = ni.childNodes;
                    for (j = 0, cj; cj = cn[j]; j++) {
                        if (cj.nodeName == utag || cj.nodeName == tagName || tagName == "*") {
                            result[++ri] = cj
                        }
                    }
                }
            } else {
                if (mode == "+") {
                    utag = tagName.toUpperCase();
                    for (i = 0, n; n = ns[i]; i++) {
                        while ((n = n.nextSibling) && n.nodeType != 1) {}
                        if (n && (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
                            result[++ri] = n
                        }
                    }
                } else {
                    if (mode == "~") {
                        utag = tagName.toUpperCase();
                        for (i = 0, n; n = ns[i]; i++) {
                            while ((n = n.nextSibling)) {
                                if (n.nodeName == utag || n.nodeName == tagName || tagName == "*") {
                                    result[++ri] = n
                                }
                            }
                        }
                    }
                }
            }
        }
        return result
    }

    function concat(a, b) {
        if (b.slice) {
            return a.concat(b)
        }
        for (var i = 0, l = b.length; i < l; i++) {
            a[a.length] = b[i]
        }
        return a
    }

    function byTag(cs, tagName) {
        if (cs.tagName || cs == document) {
            cs = [cs]
        }
        if (!tagName) {
            return cs
        }
        var result = [],
            ri = -1,
            i, ci;
        tagName = tagName.toLowerCase();
        for (i = 0, ci; ci = cs[i]; i++) {
            if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
                result[++ri] = ci
            }
        }
        return result
    }

    function byId(cs, id) {
        id = unescapeCssSelector(id);
        if (cs.tagName || cs == document) {
            cs = [cs]
        }
        if (!id) {
            return cs
        }
        var result = [],
            ri = -1,
            i, ci;
        for (i = 0, ci; ci = cs[i]; i++) {
            if (ci && ci.id == id) {
                result[++ri] = ci;
                return result
            }
        }
        return result
    }

    function byAttribute(cs, attr, value, op, custom) {
        var result = [],
            ri = -1,
            useGetStyle = custom == "{",
            fn = Ext.DomQuery.operators[op],
            a, xml, hasXml, i, ci;
        value = unescapeCssSelector(value);
        for (i = 0, ci; ci = cs[i]; i++) {
            if (ci.nodeType != 1) {
                continue
            }
            if (!hasXml) {
                xml = Ext.DomQuery.isXml(ci);
                hasXml = true
            }
            if (!xml) {
                if (useGetStyle) {
                    a = Ext.DomQuery.getStyle(ci, attr)
                } else {
                    if (attr == "class" || attr == "className") {
                        a = ci.className
                    } else {
                        if (attr == "for") {
                            a = ci.htmlFor
                        } else {
                            if (attr == "href") {
                                a = ci.getAttribute("href", 2)
                            } else {
                                a = ci.getAttribute(attr)
                            }
                        }
                    }
                }
            } else {
                a = ci.getAttribute(attr)
            }
            if ((fn && fn(a, value)) || (!fn && a)) {
                result[++ri] = ci
            }
        }
        return result
    }

    function byPseudo(cs, name, value) {
        value = unescapeCssSelector(value);
        return Ext.DomQuery.pseudos[name](cs, value)
    }

    function nodupIEXml(cs) {
        var d = ++key,
            r, i, len, c;
        cs[0].setAttribute("_nodup", d);
        r = [cs[0]];
        for (i = 1, len = cs.length; i < len; i++) {
            c = cs[i];
            if (!c.getAttribute("_nodup") != d) {
                c.setAttribute("_nodup", d);
                r[r.length] = c
            }
        }
        for (i = 0, len = cs.length; i < len; i++) {
            cs[i].removeAttribute("_nodup")
        }
        return r
    }

    function nodup(cs) {
        if (!cs) {
            return []
        }
        var len = cs.length,
            c, i, r = cs,
            cj, ri = -1,
            d, j;
        if (!len || typeof cs.nodeType != "undefined" || len == 1) {
            return cs
        }
        if (isIE && typeof cs[0].selectSingleNode != "undefined") {
            return nodupIEXml(cs)
        }
        d = ++key;
        cs[0]._nodup = d;
        for (i = 1; c = cs[i]; i++) {
            if (c._nodup != d) {
                c._nodup = d
            } else {
                r = [];
                for (j = 0; j < i; j++) {
                    r[++ri] = cs[j]
                }
                for (j = i + 1; cj = cs[j]; j++) {
                    if (cj._nodup != d) {
                        cj._nodup = d;
                        r[++ri] = cj
                    }
                }
                return r
            }
        }
        return r
    }

    function quickDiffIEXml(c1, c2) {
        var d = ++key,
            r = [],
            i, len;
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].setAttribute("_qdiff", d)
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i].getAttribute("_qdiff") != d) {
                r[r.length] = c2[i]
            }
        }
        for (i = 0, len = c1.length; i < len; i++) {
            c1[i].removeAttribute("_qdiff")
        }
        return r
    }

    function quickDiff(c1, c2) {
        var len1 = c1.length,
            d = ++key,
            r = [],
            i, len;
        if (!len1) {
            return c2
        }
        if (isIE && typeof c1[0].selectSingleNode != "undefined") {
            return quickDiffIEXml(c1, c2)
        }
        for (i = 0; i < len1; i++) {
            c1[i]._qdiff = d
        }
        for (i = 0, len = c2.length; i < len; i++) {
            if (c2[i]._qdiff != d) {
                r[r.length] = c2[i]
            }
        }
        return r
    }

    function quickId(ns, mode, root, id) {
        if (ns == root) {
            id = unescapeCssSelector(id);
            var d = root.ownerDocument || root;
            return d.getElementById(id)
        }
        ns = getNodes(ns, mode, "*");
        return byId(ns, id)
    }

    function supportsColonNsSeparator() {
        var xml, doc;
        if (supportsColonInGetElementsByTagName === undefined) {
            xml = '<r><a:b xmlns:a="n"></a:b></r>';
            if (window.DOMParser) {
                doc = (new DOMParser()).parseFromString(xml, "application/xml")
            } else {
                doc = new ActiveXObject("Microsoft.XMLDOM");
                doc.loadXML(xml)
            }
            supportsColonInGetElementsByTagName = !!doc.getElementsByTagName("a:b").length
        }
        return supportsColonInGetElementsByTagName
    }
    return {
        getStyle: function(el, name) {
            return Ext.fly(el).getStyle(name)
        },
        compile: function(path, type) {
            type = type || "select";
            var fn = ["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],
                lastPath, matchers = Ext.DomQuery.matchers,
                matchersLn = matchers.length,
                modeMatch, lmode = path.match(modeRe),
                tokenMatch, matched, j, t, m;
            path = setupEscapes(path);
            if (lmode && lmode[1]) {
                fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
                path = path.replace(lmode[1], "")
            }
            while (path.substr(0, 1) == "/") {
                path = path.substr(1)
            }
            while (path && lastPath != path) {
                lastPath = path;
                tokenMatch = path.match(tagTokenRe);
                if (type == "select") {
                    if (tokenMatch) {
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = quickId(n, mode, root, "' + tokenMatch[2] + '");'
                        } else {
                            fn[fn.length] = 'n = getNodes(n, mode, "' + tokenMatch[2] + '");'
                        }
                        path = path.replace(tokenMatch[0], "")
                    } else {
                        if (path.substr(0, 1) != "@") {
                            fn[fn.length] = 'n = getNodes(n, mode, "*");'
                        }
                    }
                } else {
                    if (tokenMatch) {
                        if (tokenMatch[1] == "#") {
                            fn[fn.length] = 'n = byId(n, "' + tokenMatch[2] + '");'
                        } else {
                            fn[fn.length] = 'n = byTag(n, "' + tokenMatch[2] + '");'
                        }
                        path = path.replace(tokenMatch[0], "")
                    }
                }
                while (!(modeMatch = path.match(modeRe))) {
                    matched = false;
                    for (j = 0; j < matchersLn; j++) {
                        t = matchers[j];
                        m = path.match(t.re);
                        if (m) {
                            fn[fn.length] = t.select.replace(tplRe, function(x, i) {
                                return m[i]
                            });
                            path = path.replace(m[0], "");
                            matched = true;
                            break
                        }
                    }
                    if (!matched) {
                        Ext.Error.raise({
                            sourceClass: "Ext.DomQuery",
                            sourceMethod: "compile",
                            msg: 'Error parsing selector. Parsing failed at "' + path + '"'
                        })
                    }
                }
                if (modeMatch[1]) {
                    fn[fn.length] = 'mode="' + modeMatch[1].replace(trimRe, "") + '";';
                    path = path.replace(modeMatch[1], "")
                }
            }
            fn[fn.length] = "return nodup(n);\n}";
            eval(fn.join(""));
            return f
        },
        jsSelect: function(path, root, type) {
            root = root || document;
            if (typeof root == "string") {
                root = document.getElementById(root)
            }
            var paths = path.split(","),
                results = [],
                i, len, subPath, result;
            for (i = 0, len = paths.length; i < len; i++) {
                subPath = paths[i].replace(trimRe, "");
                if (!cache[subPath]) {
                    cache[subPath] = Ext.DomQuery.compile(subPath, type);
                    if (!cache[subPath]) {
                        Ext.Error.raise({
                            sourceClass: "Ext.DomQuery",
                            sourceMethod: "jsSelect",
                            msg: subPath + " is not a valid selector"
                        })
                    }
                } else {
                    setupEscapes(subPath)
                }
                result = cache[subPath](root);
                if (result && result != document) {
                    results = results.concat(result)
                }
            }
            if (paths.length > 1) {
                return nodup(results)
            }
            return results
        },
        isXml: function(el) {
            var docEl = (el ? el.ownerDocument || el : 0).documentElement;
            return docEl ? docEl.nodeName !== "HTML" : false
        },
        select: document.querySelectorAll ? function(path, root, type) {
            root = root || document;
            if (!Ext.DomQuery.isXml(root)) {
                try {
                    if (root.parentNode && (root.nodeType !== 9) && path.indexOf(",") === -1 && !startIdRe.test(path)) {
                        path = "#" + Ext.escapeId(Ext.id(root)) + " " + path;
                        root = root.parentNode
                    }
                    return Ext.Array.toArray(root.querySelectorAll(path))
                } catch (e) {}
            }
            return Ext.DomQuery.jsSelect.call(this, path, root, type)
        } : function(path, root, type) {
            return Ext.DomQuery.jsSelect.call(this, path, root, type)
        },
        selectNode: function(path, root) {
            return Ext.DomQuery.select(path, root)[0]
        },
        selectValue: function(path, root, defaultValue) {
            path = path.replace(trimRe, "");
            if (!valueCache[path]) {
                valueCache[path] = Ext.DomQuery.compile(path, "select")
            } else {
                setupEscapes(path)
            }
            var n = valueCache[path](root),
                v;
            n = n[0] ? n[0] : n;
            if (typeof n.normalize == "function") {
                n.normalize()
            }
            v = (n && n.firstChild ? n.firstChild.nodeValue : null);
            return ((v === null || v === undefined || v === "") ? defaultValue : v)
        },
        selectNumber: function(path, root, defaultValue) {
            var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
            return parseFloat(v)
        },
        is: function(el, ss) {
            if (typeof el == "string") {
                el = document.getElementById(el)
            }
            var isArray = Ext.isArray(el),
                result = Ext.DomQuery.filter(isArray ? el : [el], ss);
            return isArray ? (result.length == el.length) : (result.length > 0)
        },
        filter: function(els, ss, nonMatches) {
            ss = ss.replace(trimRe, "");
            if (!simpleCache[ss]) {
                simpleCache[ss] = Ext.DomQuery.compile(ss, "simple")
            } else {
                setupEscapes(ss)
            }
            var result = simpleCache[ss](els);
            return nonMatches ? quickDiff(result, els) : result
        },
        matchers: [{
            re: /^\.([\w\-\\]+)/,
            select: 'n = byClassName(n, " {1} ");'
        }, {
            re: /^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            select: 'n = byPseudo(n, "{1}", "{2}");'
        }, {
            re: /^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            select: 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
        }, {
            re: /^#([\w\-\\]+)/,
            select: 'n = byId(n, "{1}");'
        }, {
            re: /^@([\w\-\.]+)/,
            select: 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
        }],
        operators: {
            "=": function(a, v) {
                return a == v
            },
            "!=": function(a, v) {
                return a != v
            },
            "^=": function(a, v) {
                return a && a.substr(0, v.length) == v
            },
            "$=": function(a, v) {
                return a && a.substr(a.length - v.length) == v
            },
            "*=": function(a, v) {
                return a && a.indexOf(v) !== -1
            },
            "%=": function(a, v) {
                return (a % v) == 0
            },
            "|=": function(a, v) {
                return a && (a == v || a.substr(0, v.length + 1) == v + "-")
            },
            "~=": function(a, v) {
                return a && (" " + a + " ").indexOf(" " + v + " ") != -1
            }
        },
        pseudos: {
            "first-child": function(c) {
                var r = [],
                    ri = -1,
                    n, i, ci;
                for (i = 0;
                    (ci = n = c[i]); i++) {
                    while ((n = n.previousSibling) && n.nodeType != 1) {}
                    if (!n) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            "last-child": function(c) {
                var r = [],
                    ri = -1,
                    n, i, ci;
                for (i = 0;
                    (ci = n = c[i]); i++) {
                    while ((n = n.nextSibling) && n.nodeType != 1) {}
                    if (!n) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            "nth-child": function(c, a) {
                var r = [],
                    ri = -1,
                    m = nthRe.exec(a == "even" && "2n" || a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a || a),
                    f = (m[1] || 1) - 0,
                    l = m[2] - 0,
                    i, n, j, cn, pn;
                for (i = 0; n = c[i]; i++) {
                    pn = n.parentNode;
                    if (batch != pn._batch) {
                        j = 0;
                        for (cn = pn.firstChild; cn; cn = cn.nextSibling) {
                            if (cn.nodeType == 1) {
                                cn.nodeIndex = ++j
                            }
                        }
                        pn._batch = batch
                    }
                    if (f == 1) {
                        if (l == 0 || n.nodeIndex == l) {
                            r[++ri] = n
                        }
                    } else {
                        if ((n.nodeIndex + l) % f == 0) {
                            r[++ri] = n
                        }
                    }
                }
                return r
            },
            "only-child": function(c) {
                var r = [],
                    ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (!prev(ci) && !next(ci)) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            empty: function(c) {
                var r = [],
                    ri = -1,
                    i, ci, cns, j, cn, empty;
                for (i = 0, ci; ci = c[i]; i++) {
                    cns = ci.childNodes;
                    j = 0;
                    empty = true;
                    while (cn = cns[j]) {
                        ++j;
                        if (cn.nodeType == 1 || cn.nodeType == 3) {
                            empty = false;
                            break
                        }
                    }
                    if (empty) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            contains: function(c, v) {
                var r = [],
                    ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if ((ci.textContent || ci.innerText || ci.text || "").indexOf(v) != -1) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            nodeValue: function(c, v) {
                var r = [],
                    ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.firstChild && ci.firstChild.nodeValue == v) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            checked: function(c) {
                var r = [],
                    ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (ci.checked == true) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            not: function(c, ss) {
                return Ext.DomQuery.filter(c, ss, true)
            },
            any: function(c, selectors) {
                var ss = selectors.split("|"),
                    r = [],
                    ri = -1,
                    s, i, ci, j;
                for (i = 0; ci = c[i]; i++) {
                    for (j = 0; s = ss[j]; j++) {
                        if (Ext.DomQuery.is(ci, s)) {
                            r[++ri] = ci;
                            break
                        }
                    }
                }
                return r
            },
            odd: function(c) {
                return this["nth-child"](c, "odd")
            },
            even: function(c) {
                return this["nth-child"](c, "even")
            },
            nth: function(c, a) {
                return c[a - 1] || []
            },
            first: function(c) {
                return c[0] || []
            },
            last: function(c) {
                return c[c.length - 1] || []
            },
            has: function(c, ss) {
                var s = Ext.DomQuery.select,
                    r = [],
                    ri = -1,
                    i, ci;
                for (i = 0; ci = c[i]; i++) {
                    if (s(ss, ci).length > 0) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            next: function(c, ss) {
                var is = Ext.DomQuery.is,
                    r = [],
                    ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = next(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            prev: function(c, ss) {
                var is = Ext.DomQuery.is,
                    r = [],
                    ri = -1,
                    i, ci, n;
                for (i = 0; ci = c[i]; i++) {
                    n = prev(ci);
                    if (n && is(n, ss)) {
                        r[++ri] = ci
                    }
                }
                return r
            },
            focusable: function(candidates) {
                var len = candidates.length,
                    results = [],
                    i = 0,
                    c;
                for (; i < len; i++) {
                    c = candidates[i];
                    if (Ext.fly(c).isFocusable()) {
                        results.push(c)
                    }
                }
                return results
            }
        }
    }
}());
Ext.query = Ext.DomQuery.select;
Ext.define("Ext.dom.Element_alignment", (function() {
    var c = document,
        a = /^([a-z]+)-([a-z]+)(\?)?$/,
        b = Math.round;
    return {
        override: "Ext.dom.Element",
        getAnchorXY: function(i, n, g) {
            i = (i || "tl").toLowerCase();
            g = g || {};
            var l = this,
                h = l.dom == c.body || l.dom == c,
                d = g.width || h ? Ext.dom.Element.getViewWidth() : l.getWidth(),
                e = g.height || h ? Ext.dom.Element.getViewHeight() : l.getHeight(),
                p, m = l.getXY(),
                o = l.getScroll(),
                k = h ? o.left : !n ? m[0] : 0,
                j = h ? o.top : !n ? m[1] : 0;
            switch (i) {
                case "tl":
                    p = [0, 0];
                    break;
                case "bl":
                    p = [0, e];
                    break;
                case "tr":
                    p = [d, 0];
                    break;
                case "c":
                    p = [b(d * 0.5), b(e * 0.5)];
                    break;
                case "t":
                    p = [b(d * 0.5), 0];
                    break;
                case "l":
                    p = [0, b(e * 0.5)];
                    break;
                case "r":
                    p = [d, b(e * 0.5)];
                    break;
                case "b":
                    p = [b(d * 0.5), e];
                    break;
                case "br":
                    p = [d, e]
            }
            return [p[0] + k, p[1] + j]
        },
        getAlignToXY: function(l, F, i) {
            l = Ext.get(l);
            if (!l || !l.dom) {}
            i = i || [0, 0];
            F = (!F || F == "?" ? "tl-bl?" : (!(/-/).test(F) && F !== "" ? "tl-" + F : F || "tl-bl")).toLowerCase();
            var G = this,
                k, v, p, n, j, w, z, D = Ext.dom.Element.getViewWidth(),
                h = Ext.dom.Element.getViewHeight(),
                e, g, m, o, t, u, E = c.documentElement,
                r = c.body,
                C = (E.scrollLeft || r.scrollLeft || 0),
                A = (E.scrollTop || r.scrollTop || 0),
                B, s, q, d = F.match(a);
            s = d[1];
            q = d[2];
            B = !!d[3];
            k = G.getAnchorXY(s, true);
            v = l.getAnchorXY(q, false);
            p = v[0] - k[0] + i[0];
            n = v[1] - k[1] + i[1];
            if (B) {
                j = G.getWidth();
                w = G.getHeight();
                z = l.getRegion();
                e = s.charAt(0);
                g = s.charAt(s.length - 1);
                m = q.charAt(0);
                o = q.charAt(q.length - 1);
                t = ((e == "t" && m == "b") || (e == "b" && m == "t"));
                u = ((g == "r" && o == "l") || (g == "l" && o == "r"));
                if (p + j > D + C) {
                    p = u ? z.left - j : D + C - j
                }
                if (p < C) {
                    p = u ? z.right : C
                }
                if (n + w > h + A) {
                    n = t ? z.top - w : h + A - w
                }
                if (n < A) {
                    n = t ? z.bottom : A
                }
            }
            return [p, n]
        },
        anchorTo: function(e, k, g, d, n, o) {
            var l = this,
                i = l.dom,
                m = !Ext.isEmpty(n),
                h = function() {
                    Ext.fly(i).alignTo(e, k, g, d);
                    Ext.callback(o, Ext.fly(i))
                },
                j = this.getAnchor();
            this.removeAnchor();
            Ext.apply(j, {
                fn: h,
                scroll: m
            });
            Ext.EventManager.onWindowResize(h, null);
            if (m) {
                Ext.EventManager.on(window, "scroll", h, null, {
                    buffer: !isNaN(n) ? n : 50
                })
            }
            h.call(l);
            return l
        },
        removeAnchor: function() {
            var e = this,
                d = this.getAnchor();
            if (d && d.fn) {
                Ext.EventManager.removeResizeListener(d.fn);
                if (d.scroll) {
                    Ext.EventManager.un(window, "scroll", d.fn)
                }
                delete d.fn
            }
            return e
        },
        getAlignVector: function(g, e, i) {
            var h = this,
                d = h.getXY(),
                j = h.getAlignToXY(g, e, i);
            g = Ext.get(g);
            j[0] -= d[0];
            j[1] -= d[1];
            return j
        },
        alignTo: function(g, d, i, e) {
            var h = this;
            return h.setXY(h.getAlignToXY(g, d, i), h.anim && !!e ? h.anim(e) : false)
        },
        getConstrainVector: function(h, e) {
            if (!(h instanceof Ext.util.Region)) {
                h = Ext.get(h).getViewRegion()
            }
            var j = this.getRegion(),
                d = [0, 0],
                i = (this.shadow && !this.shadowDisabled) ? this.shadow.getShadowSize() : undefined,
                g = false;
            if (e) {
                j.translateBy(e[0] - j.x, e[1] - j.y)
            }
            if (i) {
                h.adjust(i[0], -i[1], -i[2], i[3])
            }
            if (j.right > h.right) {
                g = true;
                d[0] = (h.right - j.right)
            }
            if (j.left + d[0] < h.left) {
                g = true;
                d[0] = (h.left - j.left)
            }
            if (j.bottom > h.bottom) {
                g = true;
                d[1] = (h.bottom - j.bottom)
            }
            if (j.top + d[1] < h.top) {
                g = true;
                d[1] = (h.top - j.top)
            }
            return g ? d : false
        },
        getCenterXY: function() {
            return this.getAlignToXY(c, "c-c")
        },
        center: function(d) {
            return this.alignTo(d || c, "c-c")
        }
    }
}()));
Ext.define("Ext.dom.Element_anim", {
    override: "Ext.dom.Element",
    animate: function(b) {
        var d = this,
            c, e, a = d.dom.id || Ext.id(d.dom);
        if (!Ext.fx.Manager.hasFxBlock(a)) {
            if (b.listeners) {
                c = b.listeners;
                delete b.listeners
            }
            if (b.internalListeners) {
                b.listeners = b.internalListeners;
                delete b.internalListeners
            }
            e = new Ext.fx.Anim(d.anim(b));
            if (c) {
                e.on(c)
            }
            Ext.fx.Manager.queueFx(e)
        }
        return d
    },
    anim: function(a) {
        if (!Ext.isObject(a)) {
            return (a) ? {} : false
        }
        var b = this,
            c = a.duration || Ext.fx.Anim.prototype.duration,
            e = a.easing || "ease",
            d;
        if (a.stopAnimation) {
            b.stopAnimation()
        }
        Ext.applyIf(a, Ext.fx.Manager.getFxDefaults(b.id));
        Ext.fx.Manager.setFxDefaults(b.id, {
            delay: 0
        });
        d = {
            target: b.dom,
            remove: a.remove,
            alternate: a.alternate || false,
            duration: c,
            easing: e,
            callback: a.callback,
            listeners: a.listeners,
            iterations: a.iterations || 1,
            scope: a.scope,
            block: a.block,
            concurrent: a.concurrent,
            delay: a.delay || 0,
            paused: true,
            keyframes: a.keyframes,
            from: a.from || {},
            to: Ext.apply({}, a)
        };
        Ext.apply(d.to, a.to);
        delete d.to.to;
        delete d.to.from;
        delete d.to.remove;
        delete d.to.alternate;
        delete d.to.keyframes;
        delete d.to.iterations;
        delete d.to.listeners;
        delete d.to.target;
        delete d.to.paused;
        delete d.to.callback;
        delete d.to.scope;
        delete d.to.duration;
        delete d.to.easing;
        delete d.to.concurrent;
        delete d.to.block;
        delete d.to.stopAnimation;
        delete d.to.delay;
        return d
    },
    slideIn: function(c, b, d) {
        var g = this,
            j = g.dom.style,
            i, a, e, h;
        c = c || "t";
        b = b || {};
        i = function() {
            var n = this,
                m = b.listeners,
                o, k, p, l;
            if (!d) {
                g.fixDisplay()
            }
            o = g.getBox();
            if ((c == "t" || c == "b") && o.height === 0) {
                o.height = g.dom.scrollHeight
            } else {
                if ((c == "l" || c == "r") && o.width === 0) {
                    o.width = g.dom.scrollWidth
                }
            }
            k = g.getStyles("width", "height", "left", "right", "top", "bottom", "position", "z-index", true);
            g.setSize(o.width, o.height);
            if (b.preserveScroll) {
                e = g.cacheScrollValues()
            }
            l = g.wrap({
                id: Ext.id() + "-anim-wrap-for-" + g.id,
                style: {
                    visibility: d ? "visible" : "hidden"
                }
            });
            h = l.dom.parentNode;
            l.setPositioning(g.getPositioning());
            if (l.isStyle("position", "static")) {
                l.position("relative")
            }
            g.clearPositioning("auto");
            l.clip();
            if (e) {
                e()
            }
            g.setStyle({
                visibility: "",
                position: "absolute"
            });
            if (d) {
                l.setSize(o.width, o.height)
            }
            switch (c) {
                case "t":
                    p = {
                        from: {
                            width: o.width + "px",
                            height: "0px"
                        },
                        to: {
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    j.bottom = "0px";
                    break;
                case "l":
                    p = {
                        from: {
                            width: "0px",
                            height: o.height + "px"
                        },
                        to: {
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    j.right = "0px";
                    break;
                case "r":
                    p = {
                        from: {
                            x: o.x + o.width,
                            width: "0px",
                            height: o.height + "px"
                        },
                        to: {
                            x: o.x,
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    break;
                case "b":
                    p = {
                        from: {
                            y: o.y + o.height,
                            width: o.width + "px",
                            height: "0px"
                        },
                        to: {
                            y: o.y,
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    break;
                case "tl":
                    p = {
                        from: {
                            x: o.x,
                            y: o.y,
                            width: "0px",
                            height: "0px"
                        },
                        to: {
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    j.bottom = "0px";
                    j.right = "0px";
                    break;
                case "bl":
                    p = {
                        from: {
                            y: o.y + o.height,
                            width: "0px",
                            height: "0px"
                        },
                        to: {
                            y: o.y,
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    j.bottom = "0px";
                    break;
                case "br":
                    p = {
                        from: {
                            x: o.x + o.width,
                            y: o.y + o.height,
                            width: "0px",
                            height: "0px"
                        },
                        to: {
                            x: o.x,
                            y: o.y,
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    break;
                case "tr":
                    p = {
                        from: {
                            x: o.x + o.width,
                            width: "0px",
                            height: "0px"
                        },
                        to: {
                            x: o.x,
                            width: o.width + "px",
                            height: o.height + "px"
                        }
                    };
                    j.right = "0px";
                    break
            }
            l.show();
            a = Ext.apply({}, b);
            delete a.listeners;
            a = new Ext.fx.Anim(Ext.applyIf(a, {
                target: l,
                duration: 500,
                easing: "ease-out",
                from: d ? p.to : p.from,
                to: d ? p.from : p.to
            }));
            a.on("afteranimate", function() {
                g.setStyle(k);
                if (d) {
                    if (b.useDisplay) {
                        g.setDisplayed(false)
                    } else {
                        g.hide()
                    }
                }
                if (l.dom) {
                    if (l.dom.parentNode) {
                        l.dom.parentNode.insertBefore(g.dom, l.dom)
                    } else {
                        h.appendChild(g.dom)
                    }
                    l.remove()
                }
                if (e) {
                    e()
                }
                n.end()
            });
            if (m) {
                a.on(m)
            }
        };
        g.animate({
            duration: b.duration ? Math.max(b.duration, 500) * 2 : 1000,
            listeners: {
                beforeanimate: i
            }
        });
        return g
    },
    slideOut: function(a, b) {
        return this.slideIn(a, b, true)
    },
    puff: function(e) {
        var d = this,
            b, c = d.getBox(),
            a = d.getStyles("width", "height", "left", "right", "top", "bottom", "position", "z-index", "font-size", "opacity", true);
        e = Ext.applyIf(e || {}, {
            easing: "ease-out",
            duration: 500,
            useDisplay: false
        });
        b = function() {
            d.clearOpacity();
            d.show();
            this.to = {
                width: c.width * 2,
                height: c.height * 2,
                x: c.x - (c.width / 2),
                y: c.y - (c.height / 2),
                opacity: 0,
                fontSize: "200%"
            };
            this.on("afteranimate", function() {
                if (d.dom) {
                    if (e.useDisplay) {
                        d.setDisplayed(false)
                    } else {
                        d.hide()
                    }
                    d.setStyle(a);
                    e.callback.call(e.scope)
                }
            })
        };
        d.animate({
            duration: e.duration,
            easing: e.easing,
            listeners: {
                beforeanimate: {
                    fn: b
                }
            }
        });
        return d
    },
    switchOff: function(c) {
        var b = this,
            a;
        c = Ext.applyIf(c || {}, {
            easing: "ease-in",
            duration: 500,
            remove: false,
            useDisplay: false
        });
        a = function() {
            var h = this,
                g = b.getSize(),
                i = b.getXY(),
                e, d;
            b.clearOpacity();
            b.clip();
            d = b.getPositioning();
            e = new Ext.fx.Animator({
                target: b,
                duration: c.duration,
                easing: c.easing,
                keyframes: {
                    33: {
                        opacity: 0.3
                    },
                    66: {
                        height: 1,
                        y: i[1] + g.height / 2
                    },
                    100: {
                        width: 1,
                        x: i[0] + g.width / 2
                    }
                }
            });
            e.on("afteranimate", function() {
                if (c.useDisplay) {
                    b.setDisplayed(false)
                } else {
                    b.hide()
                }
                b.clearOpacity();
                b.setPositioning(d);
                b.setSize(g);
                h.end()
            })
        };
        b.animate({
            duration: (Math.max(c.duration, 500) * 2),
            listeners: {
                beforeanimate: {
                    fn: a
                }
            }
        });
        return b
    },
    frame: function(a, d, e) {
        var c = this,
            b;
        a = a || "#C3DAF9";
        d = d || 1;
        e = e || {};
        b = function() {
            c.show();
            var i = this,
                j = c.getBox(),
                h = Ext.getBody().createChild({
                    id: c.id + "-anim-proxy",
                    style: {
                        position: "absolute",
                        "pointer-events": "none",
                        "z-index": 35000,
                        border: "0px solid " + a
                    }
                }),
                g;
            g = new Ext.fx.Anim({
                target: h,
                duration: e.duration || 1000,
                iterations: d,
                from: {
                    top: j.y,
                    left: j.x,
                    borderWidth: 0,
                    opacity: 1,
                    height: j.height,
                    width: j.width
                },
                to: {
                    top: j.y - 20,
                    left: j.x - 20,
                    borderWidth: 10,
                    opacity: 0,
                    height: j.height + 40,
                    width: j.width + 40
                }
            });
            g.on("afteranimate", function() {
                h.remove();
                i.end()
            })
        };
        c.animate({
            duration: (Math.max(e.duration, 500) * 2) || 2000,
            listeners: {
                beforeanimate: {
                    fn: b
                }
            }
        });
        return c
    },
    ghost: function(a, d) {
        var c = this,
            b;
        a = a || "b";
        b = function() {
            var h = c.getWidth(),
                g = c.getHeight(),
                i = c.getXY(),
                e = c.getPositioning(),
                j = {
                    opacity: 0
                };
            switch (a) {
                case "t":
                    j.y = i[1] - g;
                    break;
                case "l":
                    j.x = i[0] - h;
                    break;
                case "r":
                    j.x = i[0] + h;
                    break;
                case "b":
                    j.y = i[1] + g;
                    break;
                case "tl":
                    j.x = i[0] - h;
                    j.y = i[1] - g;
                    break;
                case "bl":
                    j.x = i[0] - h;
                    j.y = i[1] + g;
                    break;
                case "br":
                    j.x = i[0] + h;
                    j.y = i[1] + g;
                    break;
                case "tr":
                    j.x = i[0] + h;
                    j.y = i[1] - g;
                    break
            }
            this.to = j;
            this.on("afteranimate", function() {
                if (c.dom) {
                    c.hide();
                    c.clearOpacity();
                    c.setPositioning(e)
                }
            })
        };
        c.animate(Ext.applyIf(d || {}, {
            duration: 500,
            easing: "ease-out",
            listeners: {
                beforeanimate: {
                    fn: b
                }
            }
        }));
        return c
    },
    highlight: function(d, b) {
        var i = this,
            e = i.dom,
            k = {},
            h, l, g, c, a, j;
        b = b || {};
        c = b.listeners || {};
        g = b.attr || "backgroundColor";
        k[g] = d || "ffff9c";
        if (!b.to) {
            l = {};
            l[g] = b.endColor || i.getColor(g, "ffffff", "")
        } else {
            l = b.to
        }
        b.listeners = Ext.apply(Ext.apply({}, c), {
            beforeanimate: function() {
                h = e.style[g];
                i.clearOpacity();
                i.show();
                a = c.beforeanimate;
                if (a) {
                    j = a.fn || a;
                    return j.apply(a.scope || c.scope || window, arguments)
                }
            },
            afteranimate: function() {
                if (e) {
                    e.style[g] = h
                }
                a = c.afteranimate;
                if (a) {
                    j = a.fn || a;
                    j.apply(a.scope || c.scope || window, arguments)
                }
            }
        });
        i.animate(Ext.apply({}, b, {
            duration: 1000,
            easing: "ease-in",
            from: k,
            to: l
        }));
        return i
    },
    pause: function(a) {
        var b = this;
        Ext.fx.Manager.setFxDefaults(b.id, {
            delay: a
        });
        return b
    },
    fadeIn: function(b) {
        var a = this;
        a.animate(Ext.apply({}, b, {
            opacity: 1,
            internalListeners: {
                beforeanimate: function(c) {
                    if (a.isStyle("display", "none")) {
                        a.setDisplayed("")
                    } else {
                        a.show()
                    }
                }
            }
        }));
        return this
    },
    fadeOut: function(b) {
        var a = this;
        b = Ext.apply({
            opacity: 0,
            internalListeners: {
                afteranimate: function(c) {
                    var d = a.dom;
                    if (d && c.to.opacity === 0) {
                        if (b.useDisplay) {
                            a.setDisplayed(false)
                        } else {
                            a.hide()
                        }
                    }
                }
            }
        }, b);
        a.animate(b);
        return a
    },
    scale: function(a, b, c) {
        this.animate(Ext.apply({}, c, {
            width: a,
            height: b
        }));
        return this
    },
    shift: function(a) {
        this.animate(a);
        return this
    }
});
Ext.define("Ext.dom.Element_dd", {
    override: "Ext.dom.Element",
    initDD: function(c, b, d) {
        var a = new Ext.dd.DD(Ext.id(this.dom), c, b);
        return Ext.apply(a, d)
    },
    initDDProxy: function(c, b, d) {
        var a = new Ext.dd.DDProxy(Ext.id(this.dom), c, b);
        return Ext.apply(a, d)
    },
    initDDTarget: function(c, b, d) {
        var a = new Ext.dd.DDTarget(Ext.id(this.dom), c, b);
        return Ext.apply(a, d)
    }
});
Ext.define("Ext.dom.Element_fx", {
    override: "Ext.dom.Element"
}, function() {
    var b = Ext.dom.Element,
        i = "visibility",
        g = "display",
        n = "none",
        e = "hidden",
        m = "visible",
        o = "offsets",
        j = "asclass",
        a = "nosize",
        c = "originalDisplay",
        d = "visibilityMode",
        h = "isVisible",
        l = Ext.baseCSSPrefix + "hide-offsets",
        k = function(q) {
            var r = (q.$cache || q.getCache()).data,
                s = r[c];
            if (s === undefined) {
                r[c] = s = ""
            }
            return s
        },
        p = function(r) {
            var s = (r.$cache || r.getCache()).data,
                q = s[d];
            if (q === undefined) {
                s[d] = q = b.VISIBILITY
            }
            return q
        };
    b.override({
        originalDisplay: "",
        visibilityMode: 1,
        setVisible: function(u, q) {
            var s = this,
                t = s.dom,
                r = p(s);
            if (typeof q == "string") {
                switch (q) {
                    case g:
                        r = b.DISPLAY;
                        break;
                    case i:
                        r = b.VISIBILITY;
                        break;
                    case o:
                        r = b.OFFSETS;
                        break;
                    case a:
                    case j:
                        r = b.ASCLASS;
                        break
                }
                s.setVisibilityMode(r);
                q = false
            }
            if (!q || !s.anim) {
                if (r == b.DISPLAY) {
                    return s.setDisplayed(u)
                } else {
                    if (r == b.OFFSETS) {
                        s[u ? "removeCls" : "addCls"](l)
                    } else {
                        if (r == b.VISIBILITY) {
                            s.fixDisplay();
                            t.style.visibility = u ? "" : e
                        } else {
                            if (r == b.ASCLASS) {
                                s[u ? "removeCls" : "addCls"](s.visibilityCls || b.visibilityCls)
                            }
                        }
                    }
                }
            } else {
                if (u) {
                    s.setOpacity(0.01);
                    s.setVisible(true)
                }
                if (!Ext.isObject(q)) {
                    q = {
                        duration: 350,
                        easing: "ease-in"
                    }
                }
                s.animate(Ext.applyIf({
                    callback: function() {
                        if (!u) {
                            Ext.fly(t, "_internal").setVisible(false).setOpacity(1)
                        }
                    },
                    to: {
                        opacity: (u) ? 1 : 0
                    }
                }, q))
            }(s.$cache || s.getCache()).data[h] = u;
            return s
        },
        hasMetrics: function() {
            var q = p(this);
            return this.isVisible() || (q == b.OFFSETS) || (q == b.VISIBILITY)
        },
        toggle: function(q) {
            var r = this;
            r.setVisible(!r.isVisible(), r.anim(q));
            return r
        },
        setDisplayed: function(q) {
            if (typeof q == "boolean") {
                q = q ? k(this) : n
            }
            this.setStyle(g, q);
            return this
        },
        fixDisplay: function() {
            var q = this;
            if (q.isStyle(g, n)) {
                q.setStyle(i, e);
                q.setStyle(g, k(q));
                if (q.isStyle(g, n)) {
                    q.setStyle(g, "block")
                }
            }
        },
        hide: function(q) {
            if (typeof q == "string") {
                this.setVisible(false, q);
                return this
            }
            this.setVisible(false, this.anim(q));
            return this
        },
        show: function(q) {
            if (typeof q == "string") {
                this.setVisible(true, q);
                return this
            }
            this.setVisible(true, this.anim(q));
            return this
        }
    })
});
Ext.define("Ext.dom.Element_position", {
    override: "Ext.dom.Element"
}, function() {
    var r = this,
        n = "left",
        k = "right",
        q = "top",
        h = "bottom",
        o = "position",
        j = "static",
        x = "relative",
        p = "auto",
        v = "z-index",
        u = "BODY",
        c = "padding",
        t = "border",
        s = "-left",
        m = "-right",
        a = "-top",
        l = "-bottom",
        g = "-width",
        e = {
            l: t + s + g,
            r: t + m + g,
            t: t + a + g,
            b: t + l + g
        },
        d = {
            l: c + s,
            r: c + m,
            t: c + a,
            b: c + l
        },
        w = [d.l, d.r, d.t, d.b],
        b = [e.l, e.r, e.t, e.b],
        i = ["position", "top", "left"];
    r.override({
        getX: function() {
            return r.getX(this.dom)
        },
        getY: function() {
            return r.getY(this.dom)
        },
        getXY: function() {
            return r.getXY(this.dom)
        },
        getOffsetsTo: function(y) {
            var A = this.getXY(),
                z = Ext.fly(y, "_internal").getXY();
            return [A[0] - z[0], A[1] - z[1]]
        },
        setX: function(y, z) {
            return this.setXY([y, this.getY()], z)
        },
        setY: function(A, z) {
            return this.setXY([this.getX(), A], z)
        },
        setLeft: function(y) {
            this.setStyle(n, this.addUnits(y));
            return this
        },
        setTop: function(y) {
            this.setStyle(q, this.addUnits(y));
            return this
        },
        setRight: function(y) {
            this.setStyle(k, this.addUnits(y));
            return this
        },
        setBottom: function(y) {
            this.setStyle(h, this.addUnits(y));
            return this
        },
        setXY: function(A, y) {
            var z = this;
            if (!y || !z.anim) {
                r.setXY(z.dom, A)
            } else {
                if (!Ext.isObject(y)) {
                    y = {}
                }
                z.animate(Ext.applyIf({
                    to: {
                        x: A[0],
                        y: A[1]
                    }
                }, y))
            }
            return z
        },
        pxRe: /^\d+(?:\.\d*)?px$/i,
        getLocalX: function() {
            var A = this,
                z, y = A.getStyle(n);
            if (!y || y === p) {
                return 0
            }
            if (y && A.pxRe.test(y)) {
                return parseFloat(y)
            }
            y = A.getX();
            z = A.dom.offsetParent;
            if (z) {
                y -= Ext.fly(z).getX()
            }
            return y
        },
        getLocalY: function() {
            var A = this,
                z, B = A.getStyle(q);
            if (!B || B === p) {
                return 0
            }
            if (B && A.pxRe.test(B)) {
                return parseFloat(B)
            }
            B = A.getY();
            z = A.dom.offsetParent;
            if (z) {
                B -= Ext.fly(z).getY()
            }
            return B
        },
        getLeft: function(y) {
            return y ? this.getLocalX() : this.getX()
        },
        getRight: function(y) {
            return (y ? this.getLocalX() : this.getX()) + this.getWidth()
        },
        getTop: function(y) {
            return y ? this.getLocalY() : this.getY()
        },
        getBottom: function(y) {
            return (y ? this.getLocalY() : this.getY()) + this.getHeight()
        },
        translatePoints: function(z, G) {
            var B = this,
                A = B.getStyle(i),
                C = A.position == "relative",
                F = parseFloat(A.left),
                E = parseFloat(A.top),
                D = B.getXY();
            if (Ext.isArray(z)) {
                G = z[1];
                z = z[0]
            }
            if (isNaN(F)) {
                F = C ? 0 : B.dom.offsetLeft
            }
            if (isNaN(E)) {
                E = C ? 0 : B.dom.offsetTop
            }
            F = (typeof z == "number") ? z - D[0] + F : undefined;
            E = (typeof G == "number") ? G - D[1] + E : undefined;
            return {
                left: F,
                top: E
            }
        },
        setBox: function(C, D, z) {
            var B = this,
                y = C.width,
                A = C.height;
            if ((D && !B.autoBoxAdjust) && !B.isBorderBox()) {
                y -= (B.getBorderWidth("lr") + B.getPadding("lr"));
                A -= (B.getBorderWidth("tb") + B.getPadding("tb"))
            }
            B.setBounds(C.x, C.y, y, A, z);
            return B
        },
        getBox: function(D, I) {
            var F = this,
                M, z, H, C, K, A, y, L, G, J, B, E;
            if (!I) {
                M = F.getXY()
            } else {
                M = F.getStyle([n, q]);
                M = [parseFloat(M.left) || 0, parseFloat(M.top) || 0]
            }
            J = F.getWidth();
            B = F.getHeight();
            if (!D) {
                E = {
                    x: M[0],
                    y: M[1],
                    0: M[0],
                    1: M[1],
                    width: J,
                    height: B
                }
            } else {
                C = F.getStyle(w);
                K = F.getStyle(b);
                A = (parseFloat(K[e.l]) || 0) + (parseFloat(C[d.l]) || 0);
                y = (parseFloat(K[e.r]) || 0) + (parseFloat(C[d.r]) || 0);
                L = (parseFloat(K[e.t]) || 0) + (parseFloat(C[d.t]) || 0);
                G = (parseFloat(K[e.b]) || 0) + (parseFloat(C[d.b]) || 0);
                E = {
                    x: M[0] + A,
                    y: M[1] + L,
                    0: M[0] + A,
                    1: M[1] + L,
                    width: J - (A + y),
                    height: B - (L + G)
                }
            }
            E.right = E.x + E.width;
            E.bottom = E.y + E.height;
            return E
        },
        getPageBox: function(B) {
            var D = this,
                z = D.dom,
                F = z.nodeName == u,
                G = F ? Ext.dom.AbstractElement.getViewWidth() : z.offsetWidth,
                C = F ? Ext.dom.AbstractElement.getViewHeight() : z.offsetHeight,
                I = D.getXY(),
                H = I[1],
                y = I[0] + G,
                E = I[1] + C,
                A = I[0];
            if (B) {
                return new Ext.util.Region(H, y, E, A)
            } else {
                return {
                    left: A,
                    top: H,
                    width: G,
                    height: C,
                    right: y,
                    bottom: E
                }
            }
        },
        setLocation: function(z, B, A) {
            return this.setXY([z, B], A)
        },
        moveTo: function(z, B, A) {
            return this.setXY([z, B], A)
        },
        position: function(D, C, z, B) {
            var A = this;
            if (!D && A.isStyle(o, j)) {
                A.setStyle(o, x)
            } else {
                if (D) {
                    A.setStyle(o, D)
                }
            }
            if (C) {
                A.setStyle(v, C)
            }
            if (z || B) {
                A.setXY([z || false, B || false])
            }
        },
        clearPositioning: function(y) {
            y = y || "";
            this.setStyle({
                left: y,
                right: y,
                top: y,
                bottom: y,
                "z-index": "",
                position: j
            });
            return this
        },
        getPositioning: function() {
            var y = this.getStyle([n, q, o, k, h, v]);
            y[k] = y[n] ? "" : y[k];
            y[h] = y[q] ? "" : y[h];
            return y
        },
        setPositioning: function(y) {
            var A = this,
                z = A.dom.style;
            A.setStyle(y);
            if (y.right == p) {
                z.right = ""
            }
            if (y.bottom == p) {
                z.bottom = ""
            }
            return A
        },
        move: function(H, A, B) {
            var E = this,
                K = E.getXY(),
                I = K[0],
                G = K[1],
                C = [I - A, G],
                J = [I + A, G],
                F = [I, G - A],
                z = [I, G + A],
                D = {
                    l: C,
                    left: C,
                    r: J,
                    right: J,
                    t: F,
                    top: F,
                    up: F,
                    b: z,
                    bottom: z,
                    down: z
                };
            H = H.toLowerCase();
            E.moveTo(D[H][0], D[H][1], B)
        },
        setLeftTop: function(A, z) {
            var y = this.dom.style;
            y.left = r.addUnits(A);
            y.top = r.addUnits(z);
            return this
        },
        getRegion: function() {
            return this.getPageBox(true)
        },
        getViewRegion: function() {
            var C = this,
                A = C.dom.nodeName == u,
                z, F, E, D, B, y;
            if (A) {
                z = C.getScroll();
                D = z.left;
                E = z.top;
                B = Ext.dom.AbstractElement.getViewportWidth();
                y = Ext.dom.AbstractElement.getViewportHeight()
            } else {
                F = C.getXY();
                D = F[0] + C.getBorderWidth("l") + C.getPadding("l");
                E = F[1] + C.getBorderWidth("t") + C.getPadding("t");
                B = C.getWidth(true);
                y = C.getHeight(true)
            }
            return new Ext.util.Region(E, D + B - 1, E + y - 1, D)
        },
        setBounds: function(A, E, C, z, B) {
            var D = this;
            if (!B || !D.anim) {
                D.setSize(C, z);
                D.setLocation(A, E)
            } else {
                if (!Ext.isObject(B)) {
                    B = {}
                }
                D.animate(Ext.applyIf({
                    to: {
                        x: A,
                        y: E,
                        width: D.adjustWidth(C),
                        height: D.adjustHeight(z)
                    }
                }, B))
            }
            return D
        },
        setRegion: function(z, y) {
            return this.setBounds(z.left, z.top, z.right - z.left, z.bottom - z.top, y)
        }
    })
});
Ext.define("Ext.dom.Element_scroll", {
    override: "Ext.dom.Element",
    isScrollable: function() {
        var a = this.dom;
        return a.scrollHeight > a.clientHeight || a.scrollWidth > a.clientWidth
    },
    getScroll: function() {
        var i = this.dom,
            h = document,
            a = h.body,
            c = h.documentElement,
            b, g, e;
        if (i == h || i == a) {
            if (Ext.isIE && Ext.isStrict) {
                b = c.scrollLeft;
                g = c.scrollTop
            } else {
                b = window.pageXOffset;
                g = window.pageYOffset
            }
            e = {
                left: b || (a ? a.scrollLeft : 0),
                top: g || (a ? a.scrollTop : 0)
            }
        } else {
            e = {
                left: i.scrollLeft,
                top: i.scrollTop
            }
        }
        return e
    },
    scrollBy: function(b, a, c) {
        var d = this,
            e = d.dom;
        if (b.length) {
            c = a;
            a = b[1];
            b = b[0]
        } else {
            if (typeof b != "number") {
                c = a;
                a = b.y;
                b = b.x
            }
        }
        if (b) {
            d.scrollTo("left", Math.max(Math.min(e.scrollLeft + b, e.scrollWidth - e.clientWidth), 0), c)
        }
        if (a) {
            d.scrollTo("top", Math.max(Math.min(e.scrollTop + a, e.scrollHeight - e.clientHeight), 0), c)
        }
        return d
    },
    scrollTo: function(c, e, a) {
        var g = /top/i.test(c),
            d = this,
            h = d.dom,
            b, i;
        if (!a || !d.anim) {
            i = "scroll" + (g ? "Top" : "Left");
            h[i] = e;
            h[i] = e
        } else {
            b = {
                to: {}
            };
            b.to["scroll" + (g ? "Top" : "Left")] = e;
            if (Ext.isObject(a)) {
                Ext.applyIf(b, a)
            }
            d.animate(b)
        }
        return d
    },
    scrollIntoView: function(b, g, c) {
        b = Ext.getDom(b) || Ext.getBody().dom;
        var d = this.dom,
            i = this.getOffsetsTo(b),
            h = i[0] + b.scrollLeft,
            l = i[1] + b.scrollTop,
            a = l + d.offsetHeight,
            m = h + d.offsetWidth,
            p = b.clientHeight,
            o = parseInt(b.scrollTop, 10),
            e = parseInt(b.scrollLeft, 10),
            j = o + p,
            n = e + b.clientWidth,
            k;
        if (d.offsetHeight > p || l < o) {
            k = l
        } else {
            if (a > j) {
                k = a - p
            }
        }
        if (k != null) {
            Ext.get(b).scrollTo("top", k, c)
        }
        if (g !== false) {
            k = null;
            if (d.offsetWidth > b.clientWidth || h < e) {
                k = h
            } else {
                if (m > n) {
                    k = m - b.clientWidth
                }
            }
            if (k != null) {
                Ext.get(b).scrollTo("left", k, c)
            }
        }
        return this
    },
    scrollChildIntoView: function(b, a) {
        Ext.fly(b, "_scrollChildIntoView").scrollIntoView(this, a)
    },
    scroll: function(m, b, d) {
        if (!this.isScrollable()) {
            return false
        }
        var e = this.dom,
            g = e.scrollLeft,
            p = e.scrollTop,
            n = e.scrollWidth,
            k = e.scrollHeight,
            i = e.clientWidth,
            a = e.clientHeight,
            c = false,
            o, j = {
                l: Math.min(g + b, n - i),
                r: o = Math.max(g - b, 0),
                t: Math.max(p - b, 0),
                b: Math.min(p + b, k - a)
            };
        j.d = j.b;
        j.u = j.t;
        m = m.substr(0, 1);
        if ((o = j[m]) > -1) {
            c = true;
            this.scrollTo(m == "l" || m == "r" ? "left" : "top", o, this.anim(d))
        }
        return c
    }
});
Ext.define("Ext.dom.Element_style", {
    override: "Ext.dom.Element"
}, function() {
    var p = this,
        m = document.defaultView,
        n = /table-row|table-.*-group/,
        a = "_internal",
        r = "hidden",
        o = "height",
        g = "width",
        e = "isClipped",
        i = "overflow",
        l = "overflow-x",
        j = "overflow-y",
        s = "originalClip",
        b = /#document|body/i,
        t, d, q, h, u;
    if (!m || !m.getComputedStyle) {
        p.prototype.getStyle = function(z, y) {
            var L = this,
                G = L.dom,
                J = typeof z != "string",
                k = L.styleHooks,
                w = z,
                x = w,
                F = 1,
                B = y,
                K, C, v, A, E, H, D;
            if (J) {
                v = {};
                w = x[0];
                D = 0;
                if (!(F = x.length)) {
                    return v
                }
            }
            if (!G || G.documentElement) {
                return v || ""
            }
            C = G.style;
            if (y) {
                H = C
            } else {
                H = G.currentStyle;
                if (!H) {
                    B = true;
                    H = C
                }
            }
            do {
                A = k[w];
                if (!A) {
                    k[w] = A = {
                        name: p.normalize(w)
                    }
                }
                if (A.get) {
                    E = A.get(G, L, B, H)
                } else {
                    K = A.name;
                    if (A.canThrow) {
                        try {
                            E = H[K]
                        } catch (I) {
                            E = ""
                        }
                    } else {
                        E = H ? H[K] : ""
                    }
                }
                if (!J) {
                    return E
                }
                v[w] = E;
                w = x[++D]
            } while (D < F);
            return v
        }
    }
    p.override({
        getHeight: function(x, v) {
            var w = this,
                y = w.isStyle("display", "none"),
                k, z;
            if (y) {
                return 0
            }
            k = w.dom.offsetHeight;
            if (Ext.supports.Direct2DBug) {
                z = w.adjustDirect2DDimension(o);
                if (v) {
                    k += z
                } else {
                    if (z > 0 && z < 0.5) {
                        k++
                    }
                }
            }
            if (x) {
                k -= w.getBorderWidth("tb") + w.getPadding("tb")
            }
            return (k < 0) ? 0 : k
        },
        getWidth: function(k, z) {
            var x = this,
                A = x.dom,
                y = x.isStyle("display", "none"),
                w, v, B;
            if (y) {
                return 0
            }
            if (Ext.supports.BoundingClientRect) {
                w = A.getBoundingClientRect();
                v = (x.vertical && !Ext.isIE9 && !Ext.supports.RotatedBoundingClientRect) ? (w.bottom - w.top) : (w.right - w.left);
                v = z ? v : Math.ceil(v)
            } else {
                v = A.offsetWidth
            }
            if (Ext.supports.Direct2DBug) {
                B = x.adjustDirect2DDimension(g);
                if (z) {
                    v += B
                } else {
                    if (B > 0 && B < 0.5) {
                        v++
                    }
                }
            }
            if (k) {
                v -= x.getBorderWidth("lr") + x.getPadding("lr")
            }
            return (v < 0) ? 0 : v
        },
        setWidth: function(v, k) {
            var w = this;
            v = w.adjustWidth(v);
            if (!k || !w.anim) {
                w.dom.style.width = w.addUnits(v)
            } else {
                if (!Ext.isObject(k)) {
                    k = {}
                }
                w.animate(Ext.applyIf({
                    to: {
                        width: v
                    }
                }, k))
            }
            return w
        },
        setHeight: function(k, v) {
            var w = this;
            k = w.adjustHeight(k);
            if (!v || !w.anim) {
                w.dom.style.height = w.addUnits(k)
            } else {
                if (!Ext.isObject(v)) {
                    v = {}
                }
                w.animate(Ext.applyIf({
                    to: {
                        height: k
                    }
                }, v))
            }
            return w
        },
        applyStyles: function(k) {
            Ext.DomHelper.applyStyles(this.dom, k);
            return this
        },
        setSize: function(w, k, v) {
            var x = this;
            if (Ext.isObject(w)) {
                v = k;
                k = w.height;
                w = w.width
            }
            w = x.adjustWidth(w);
            k = x.adjustHeight(k);
            if (!v || !x.anim) {
                x.dom.style.width = x.addUnits(w);
                x.dom.style.height = x.addUnits(k)
            } else {
                if (v === true) {
                    v = {}
                }
                x.animate(Ext.applyIf({
                    to: {
                        width: w,
                        height: k
                    }
                }, v))
            }
            return x
        },
        getViewSize: function() {
            var w = this,
                x = w.dom,
                v = b.test(x.nodeName),
                k;
            if (v) {
                k = {
                    width: p.getViewWidth(),
                    height: p.getViewHeight()
                }
            } else {
                k = {
                    width: x.clientWidth,
                    height: x.clientHeight
                }
            }
            return k
        },
        getSize: function(k) {
            return {
                width: this.getWidth(k),
                height: this.getHeight(k)
            }
        },
        adjustWidth: function(k) {
            var v = this,
                w = (typeof k == "number");
            if (w && v.autoBoxAdjust && !v.isBorderBox()) {
                k -= (v.getBorderWidth("lr") + v.getPadding("lr"))
            }
            return (w && k < 0) ? 0 : k
        },
        adjustHeight: function(k) {
            var v = this,
                w = (typeof k == "number");
            if (w && v.autoBoxAdjust && !v.isBorderBox()) {
                k -= (v.getBorderWidth("tb") + v.getPadding("tb"))
            }
            return (w && k < 0) ? 0 : k
        },
        getColor: function(w, x, C) {
            var z = this.getStyle(w),
                y = C || C === "" ? C : "#",
                B, k, A = 0;
            if (!z || (/transparent|inherit/.test(z))) {
                return x
            }
            if (/^r/.test(z)) {
                z = z.slice(4, z.length - 1).split(",");
                k = z.length;
                for (; A < k; A++) {
                    B = parseInt(z[A], 10);
                    y += (B < 16 ? "0" : "") + B.toString(16)
                }
            } else {
                z = z.replace("#", "");
                y += z.length == 3 ? z.replace(/^(\w)(\w)(\w)$/, "$1$1$2$2$3$3") : z
            }
            return (y.length > 5 ? y.toLowerCase() : x)
        },
        setOpacity: function(v, k) {
            var w = this;
            if (!w.dom) {
                return w
            }
            if (!k || !w.anim) {
                w.setStyle("opacity", v)
            } else {
                if (typeof k != "object") {
                    k = {
                        duration: 350,
                        easing: "ease-in"
                    }
                }
                w.animate(Ext.applyIf({
                    to: {
                        opacity: v
                    }
                }, k))
            }
            return w
        },
        clearOpacity: function() {
            return this.setOpacity("")
        },
        adjustDirect2DDimension: function(w) {
            var B = this,
                v = B.dom,
                z = B.getStyle("display"),
                y = v.style.display,
                C = v.style.position,
                A = w === g ? 0 : 1,
                k = v.currentStyle,
                x;
            if (z === "inline") {
                v.style.display = "inline-block"
            }
            v.style.position = z.match(n) ? "absolute" : "static";
            x = (parseFloat(k[w]) || parseFloat(k.msTransformOrigin.split(" ")[A]) * 2) % 1;
            v.style.position = C;
            if (z === "inline") {
                v.style.display = y
            }
            return x
        },
        clip: function() {
            var v = this,
                w = (v.$cache || v.getCache()).data,
                k;
            if (!w[e]) {
                w[e] = true;
                k = v.getStyle([i, l, j]);
                w[s] = {
                    o: k[i],
                    x: k[l],
                    y: k[j]
                };
                v.setStyle(i, r);
                v.setStyle(l, r);
                v.setStyle(j, r)
            }
            return v
        },
        unclip: function() {
            var v = this,
                w = (v.$cache || v.getCache()).data,
                k;
            if (w[e]) {
                w[e] = false;
                k = w[s];
                if (k.o) {
                    v.setStyle(i, k.o)
                }
                if (k.x) {
                    v.setStyle(l, k.x)
                }
                if (k.y) {
                    v.setStyle(j, k.y)
                }
            }
            return v
        },
        boxWrap: function(k) {
            k = k || Ext.baseCSSPrefix + "box";
            var v = Ext.get(this.insertHtml("beforeBegin", "<div class='" + k + "'>" + Ext.String.format(p.boxMarkup, k) + "</div>"));
            Ext.DomQuery.selectNode("." + k + "-mc", v.dom).appendChild(this.dom);
            return v
        },
        getComputedHeight: function() {
            var v = this,
                k = Math.max(v.dom.offsetHeight, v.dom.clientHeight);
            if (!k) {
                k = parseFloat(v.getStyle(o)) || 0;
                if (!v.isBorderBox()) {
                    k += v.getFrameWidth("tb")
                }
            }
            return k
        },
        getComputedWidth: function() {
            var v = this,
                k = Math.max(v.dom.offsetWidth, v.dom.clientWidth);
            if (!k) {
                k = parseFloat(v.getStyle(g)) || 0;
                if (!v.isBorderBox()) {
                    k += v.getFrameWidth("lr")
                }
            }
            return k
        },
        getFrameWidth: function(v, k) {
            return (k && this.isBorderBox()) ? 0 : (this.getPadding(v) + this.getBorderWidth(v))
        },
        addClsOnOver: function(w, z, v) {
            var x = this,
                y = x.dom,
                k = Ext.isFunction(z);
            x.hover(function() {
                if (k && z.call(v || x, x) === false) {
                    return
                }
                Ext.fly(y, a).addCls(w)
            }, function() {
                Ext.fly(y, a).removeCls(w)
            });
            return x
        },
        addClsOnFocus: function(w, z, v) {
            var x = this,
                y = x.dom,
                k = Ext.isFunction(z);
            x.on("focus", function() {
                if (k && z.call(v || x, x) === false) {
                    return false
                }
                Ext.fly(y, a).addCls(w)
            });
            x.on("blur", function() {
                Ext.fly(y, a).removeCls(w)
            });
            return x
        },
        addClsOnClick: function(w, z, v) {
            var x = this,
                y = x.dom,
                k = Ext.isFunction(z);
            x.on("mousedown", function() {
                if (k && z.call(v || x, x) === false) {
                    return false
                }
                Ext.fly(y, a).addCls(w);
                var B = Ext.getDoc(),
                    A = function() {
                        Ext.fly(y, a).removeCls(w);
                        B.removeListener("mouseup", A)
                    };
                B.on("mouseup", A)
            });
            return x
        },
        getStyleSize: function() {
            var z = this,
                A = this.dom,
                v = b.test(A.nodeName),
                y, k, x;
            if (v) {
                return {
                    width: p.getViewWidth(),
                    height: p.getViewHeight()
                }
            }
            y = z.getStyle([o, g], true);
            if (y.width && y.width != "auto") {
                k = parseFloat(y.width);
                if (z.isBorderBox()) {
                    k -= z.getFrameWidth("lr")
                }
            }
            if (y.height && y.height != "auto") {
                x = parseFloat(y.height);
                if (z.isBorderBox()) {
                    x -= z.getFrameWidth("tb")
                }
            }
            return {
                width: k || z.getWidth(true),
                height: x || z.getHeight(true)
            }
        },
        selectable: function() {
            var k = this;
            k.dom.unselectable = "off";
            k.on("selectstart", function(v) {
                v.stopPropagation();
                return true
            });
            k.applyStyles("-webkit-user-select: text; -moz-user-select: text; -khtml-user-select: text; -o-user-select: text; user-select: text;");
            k.removeCls(Ext.baseCSSPrefix + "unselectable");
            return k
        },
        unselectable: function() {
            var k = this;
            k.dom.unselectable = "on";
            k.swallowEvent("selectstart", true);
            k.applyStyles("-webkit-user-select: none; -moz-user-select: -moz-none; -khtml-user-select: none; -o-user-select: none; user-select: none;");
            k.addCls(Ext.baseCSSPrefix + "unselectable");
            return k
        },
        setVertical: function(v) {
            var x = this,
                w = p.prototype,
                k;
            x.vertical = true;
            if (v) {
                x.addCls(x.verticalCls = v)
            }
            x.setWidth = w.setHeight;
            x.setHeight = w.setWidth;
            if (!Ext.isIE9m) {
                x.getWidth = w.getHeight;
                x.getHeight = w.getWidth
            }
            k = x.styleHooks = Ext.Object.chain(p.prototype.styleHooks);
            k.width = {
                name: "height"
            };
            k.height = {
                name: "width"
            }
        },
        setHorizontal: function() {
            var v = this,
                k = v.verticalCls;
            delete v.vertical;
            if (k) {
                delete v.verticalCls;
                v.removeCls(k)
            }
            delete v.setWidth;
            delete v.setHeight;
            if (!Ext.isIE9m) {
                delete v.getWidth;
                delete v.getHeight
            }
            delete v.styleHooks
        }
    });
    p.prototype.styleHooks = t = Ext.dom.AbstractElement.prototype.styleHooks;
    if (Ext.isIE6 || Ext.isIE7) {
        t.fontSize = t["font-size"] = {
            name: "fontSize",
            canThrow: true
        };
        t.fontStyle = t["font-style"] = {
            name: "fontStyle",
            canThrow: true
        };
        t.fontFamily = t["font-family"] = {
            name: "fontFamily",
            canThrow: true
        }
    }
    if (Ext.isIEQuirks || Ext.isIE && Ext.ieVersion <= 8) {
        function c(x, v, w, k) {
            if (k[this.styleName] == "none") {
                return "0px"
            }
            return k[this.name]
        }
        d = ["Top", "Right", "Bottom", "Left"];
        q = d.length;
        while (q--) {
            h = d[q];
            u = "border" + h + "Width";
            t["border-" + h.toLowerCase() + "-width"] = t[u] = {
                name: u,
                styleName: "border" + h + "Style",
                get: c
            }
        }
    }
});
Ext.onReady(function() {
    var c = /alpha\(opacity=(.*)\)/i,
        b = /^\s+|\s+$/g,
        a = Ext.dom.Element.prototype.styleHooks;
    a.opacity = {
        name: "opacity",
        afterSet: function(g, e, d) {
            if (d.isLayer) {
                d.onOpacitySet(e)
            }
        }
    };
    if (!Ext.supports.Opacity && Ext.isIE) {
        Ext.apply(a.opacity, {
            get: function(h) {
                var g = h.style.filter,
                    e, d;
                if (g.match) {
                    e = g.match(c);
                    if (e) {
                        d = parseFloat(e[1]);
                        if (!isNaN(d)) {
                            return d ? d / 100 : 0
                        }
                    }
                }
                return 1
            },
            set: function(h, e) {
                var d = h.style,
                    g = d.filter.replace(c, "").replace(b, "");
                d.zoom = 1;
                if (typeof(e) == "number" && e >= 0 && e < 1) {
                    e *= 100;
                    d.filter = g + (g.length ? " " : "") + "alpha(opacity=" + e + ")"
                } else {
                    d.filter = g
                }
            }
        })
    }
});
Ext.define("Ext.dom.Element", function(a) {
    var b = "hidden",
        g = document,
        j = "visibility",
        c = "display",
        k = "none",
        e = Ext.baseCSSPrefix + "masked",
        l = Ext.baseCSSPrefix + "masked-relative",
        i = Ext.baseCSSPrefix + "mask-msg",
        m = /^body/i,
        h, d = Ext.isStrict ? {
            select: 1
        } : {
            input: 1,
            select: 1,
            textarea: 1
        },
        n = function(t) {
            var s = [],
                o = -1,
                q, p;
            for (q = 0; p = t[q]; q++) {
                if (p.scrollTop > 0 || p.scrollLeft > 0) {
                    s[++o] = p
                }
            }
            return s
        };
    return {
        extend: "Ext.dom.AbstractElement",
        alternateClassName: ["Ext.Element", "Ext.core.Element"],
        requires: ["Ext.dom.Query", "Ext.dom.Element_alignment", "Ext.dom.Element_anim", "Ext.dom.Element_dd", "Ext.dom.Element_fx", "Ext.dom.Element_position", "Ext.dom.Element_scroll", "Ext.dom.Element_style"],
        addUnits: function() {
            return a.addUnits.apply(a, arguments)
        },
        focus: function(t, s) {
            var p = this,
                r, o;
            s = s || p.dom;
            o = (s.ownerDocument || g).body || g.body;
            try {
                if (Number(t)) {
                    Ext.defer(p.focus, t, p, [null, s])
                } else {
                    if (s.offsetHeight > Ext.dom.Element.getViewHeight()) {
                        r = o.scrollTop
                    }
                    s.focus();
                    if (r !== undefined) {
                        o.scrollTop = r
                    }
                }
            } catch (q) {}
            return p
        },
        blur: function() {
            try {
                this.dom.blur()
            } catch (o) {}
            return this
        },
        isBorderBox: function() {
            var o = Ext.isBorderBox;
            if (o) {
                o = !((this.dom.tagName || "").toLowerCase() in d)
            }
            return o
        },
        hover: function(p, o, r, q) {
            var s = this;
            s.on("mouseenter", p, r || s.dom, q);
            s.on("mouseleave", o, r || s.dom, q);
            return s
        },
        getAttributeNS: function(p, o) {
            return this.getAttribute(o, p)
        },
        getAttribute: (Ext.isIE && !(Ext.isIE9 && g.documentMode === 9)) ? function(o, q) {
            var r = this.dom,
                p;
            if (q) {
                p = typeof r[q + ":" + o];
                if (p != "undefined" && p != "unknown") {
                    return r[q + ":" + o] || null
                }
                return null
            }
            if (o === "for") {
                o = "htmlFor"
            }
            return r[o] || null
        } : function(o, p) {
            var q = this.dom;
            if (p) {
                return q.getAttributeNS(p, o) || q.getAttribute(p + ":" + o)
            }
            return q.getAttribute(o) || q[o] || null
        },
        cacheScrollValues: function() {
            var s = this,
                r, q, p, t = [],
                o = function() {
                    for (p = 0; p < r.length; p++) {
                        q = r[p];
                        q.scrollLeft = t[p][0];
                        q.scrollTop = t[p][1]
                    }
                };
            if (!Ext.DomQuery.pseudos.isScrolled) {
                Ext.DomQuery.pseudos.isScrolled = n
            }
            r = s.query(":isScrolled");
            for (p = 0; p < r.length; p++) {
                q = r[p];
                t[p] = [q.scrollLeft, q.scrollTop]
            }
            return o
        },
        autoBoxAdjust: true,
        isVisible: function(o) {
            var q = this,
                r = q.dom,
                p = r.ownerDocument.documentElement;
            if (!h) {
                h = new a.Fly()
            }
            while (r !== p) {
                if (!r || r.nodeType === 11 || (h.attach(r)).isStyle(j, b) || h.isStyle(c, k)) {
                    return false
                }
                if (!o) {
                    break
                }
                r = r.parentNode
            }
            return true
        },
        isDisplayed: function() {
            return !this.isStyle(c, k)
        },
        enableDisplayMode: function(p) {
            var o = this;
            o.setVisibilityMode(a.DISPLAY);
            if (!Ext.isEmpty(p)) {
                (o.$cache || o.getCache()).data.originalDisplay = p
            }
            return o
        },
        mask: function(o, y, v) {
            var A = this,
                r = A.dom,
                s = r.style.setExpression,
                u = (A.$cache || A.getCache()).data,
                q = u.maskShimEl,
                x = u.maskEl,
                p = u.maskMsg,
                t, w;
            if (!(m.test(r.tagName) && A.getStyle("position") == "static")) {
                A.addCls(l)
            }
            if (x) {
                x.remove()
            }
            if (p) {
                p.remove()
            }
            if (q) {
                q.remove()
            }
            if (Ext.isIE6) {
                q = Ext.DomHelper.append(r, {
                    tag: "iframe",
                    cls: Ext.baseCSSPrefix + "shim " + Ext.baseCSSPrefix + "mask-shim"
                }, true);
                u.maskShimEl = q;
                q.setDisplayed(true)
            }
            Ext.DomHelper.append(r, [{
                cls: Ext.baseCSSPrefix + "mask"
            }, {
                cls: y ? i + " " + y : i,
                cn: {
                    tag: "div",
                    html: o || ""
                }
            }]);
            p = Ext.get(r.lastChild);
            x = Ext.get(p.dom.previousSibling);
            u.maskMsg = p;
            u.maskEl = x;
            A.addCls(e);
            x.setDisplayed(true);
            if (typeof o == "string") {
                p.setDisplayed(true);
                p.center(A)
            } else {
                p.setDisplayed(false)
            }
            if (!Ext.supports.IncludePaddingInWidthCalculation && s) {
                try {
                    x.dom.style.setExpression("width", 'this.parentNode.clientWidth + "px"');
                    t = 'this.parentNode.clientWidth + "px"';
                    if (q) {
                        q.dom.style.setExpression("width", t)
                    }
                    x.dom.style.setExpression("width", t)
                } catch (z) {}
            }
            if (!Ext.supports.IncludePaddingInHeightCalculation && s) {
                try {
                    w = "this.parentNode." + (r == g.body ? "scrollHeight" : "offsetHeight") + ' + "px"';
                    if (q) {
                        q.dom.style.setExpression("height", w)
                    }
                    x.dom.style.setExpression("height", w)
                } catch (z) {}
            } else {
                if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict) && A.getStyle("height") == "auto") {
                    if (q) {
                        q.setSize(undefined, v || A.getHeight())
                    }
                    x.setSize(undefined, v || A.getHeight())
                }
            }
            return x
        },
        unmask: function() {
            var s = this,
                t = (s.$cache || s.getCache()).data,
                r = t.maskEl,
                p = t.maskShimEl,
                o = t.maskMsg,
                q;
            if (r) {
                q = r.dom.style;
                if (q.clearExpression) {
                    q.clearExpression("width");
                    q.clearExpression("height")
                }
                if (r) {
                    r.remove();
                    delete t.maskEl
                }
                if (o) {
                    o.remove();
                    delete t.maskMsg
                }
                s.removeCls([e, l]);
                if (p) {
                    q = p.dom.style;
                    if (q.clearExpression) {
                        q.clearExpression("width");
                        q.clearExpression("height")
                    }
                    p.remove();
                    delete t.maskShimEl
                }
            }
        },
        isMasked: function() {
            var q = this,
                s = (q.$cache || q.getCache()).data,
                p = s.maskEl,
                o = s.maskMsg,
                r = false;
            if (p && p.isVisible()) {
                if (o) {
                    o.center(q)
                }
                r = true
            }
            return r
        },
        createShim: function() {
            var o = g.createElement("iframe"),
                p;
            o.frameBorder = "0";
            o.className = Ext.baseCSSPrefix + "shim";
            o.src = Ext.SSL_SECURE_URL;
            p = Ext.get(this.dom.parentNode.insertBefore(o, this.dom));
            p.autoBoxAdjust = false;
            return p
        },
        addKeyListener: function(p, r, q) {
            var o;
            if (typeof p != "object" || Ext.isArray(p)) {
                o = {
                    target: this,
                    key: p,
                    fn: r,
                    scope: q
                }
            } else {
                o = {
                    target: this,
                    key: p.key,
                    shift: p.shift,
                    ctrl: p.ctrl,
                    alt: p.alt,
                    fn: r,
                    scope: q
                }
            }
            return new Ext.util.KeyMap(o)
        },
        addKeyMap: function(o) {
            return new Ext.util.KeyMap(Ext.apply({
                target: this
            }, o))
        },
        on: function(o, r, q, p) {
            Ext.EventManager.on(this, o, r, q || this, p);
            return this
        },
        un: function(o, q, p) {
            Ext.EventManager.un(this, o, q, p || this);
            return this
        },
        removeAllListeners: function() {
            Ext.EventManager.removeAll(this);
            return this
        },
        purgeAllListeners: function() {
            Ext.EventManager.purgeElement(this);
            return this
        },
        select: function(o) {
            return a.select(o, false, this.dom)
        }
    }
}, function() {
    var DOC = document,
        EC = Ext.cache,
        Element = this,
        AbstractElement = Ext.dom.AbstractElement,
        focusRe = /a|button|embed|iframe|img|input|object|select|textarea/i,
        nonSpaceRe = /\S/,
        scriptTagRe = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        replaceScriptTagRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        srcRe = /\ssrc=([\'\"])(.*?)\1/i,
        typeRe = /\stype=([\'\"])(.*?)\1/i,
        useDocForId = !(Ext.isIE6 || Ext.isIE7 || Ext.isIE8);
    Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';

    function garbageCollect() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(Element.collectorThreadId)
        } else {
            var eid, d, o, t;
            for (eid in EC) {
                if (!EC.hasOwnProperty(eid)) {
                    continue
                }
                o = EC[eid];
                if (o.skipGarbageCollection) {
                    continue
                }
                d = o.dom;
                if (!d.parentNode || (!d.offsetParent && !Ext.getElementById(eid))) {
                    if (d && Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(d)
                    }
                    delete EC[eid]
                }
            }
            if (Ext.isIE) {
                t = {};
                for (eid in EC) {
                    if (!EC.hasOwnProperty(eid)) {
                        continue
                    }
                    t[eid] = EC[eid]
                }
                EC = Ext.cache = t
            }
        }
    }
    Element.collectorThreadId = setInterval(garbageCollect, 30000);
    Element.addMethods({
        monitorMouseLeave: function(delay, handler, scope) {
            var me = this,
                timer, listeners = {
                    mouseleave: function(e) {
                        timer = setTimeout(Ext.Function.bind(handler, scope || me, [e]), delay)
                    },
                    mouseenter: function() {
                        clearTimeout(timer)
                    },
                    freezeEvent: true
                };
            me.on(listeners);
            return listeners
        },
        swallowEvent: function(eventName, preventDefault) {
            var me = this,
                e, eLen;

            function fn(e) {
                e.stopPropagation();
                if (preventDefault) {
                    e.preventDefault()
                }
            }
            if (Ext.isArray(eventName)) {
                eLen = eventName.length;
                for (e = 0; e < eLen; e++) {
                    me.on(eventName[e], fn)
                }
                return me
            }
            me.on(eventName, fn);
            return me
        },
        relayEvent: function(eventName, observable) {
            this.on(eventName, function(e) {
                observable.fireEvent(eventName, e)
            })
        },
        clean: function(forceReclean) {
            var me = this,
                dom = me.dom,
                data = (me.$cache || me.getCache()).data,
                n = dom.firstChild,
                ni = -1,
                nx;
            if (data.isCleaned && forceReclean !== true) {
                return me
            }
            while (n) {
                nx = n.nextSibling;
                if (n.nodeType == 3) {
                    if (!(nonSpaceRe.test(n.nodeValue))) {
                        dom.removeChild(n)
                    } else {
                        if (nx && nx.nodeType == 3) {
                            n.appendData(Ext.String.trim(nx.data));
                            dom.removeChild(nx);
                            nx = n.nextSibling;
                            n.nodeIndex = ++ni
                        }
                    }
                } else {
                    Ext.fly(n).clean();
                    n.nodeIndex = ++ni
                }
                n = nx
            }
            data.isCleaned = true;
            return me
        },
        load: function(options) {
            this.getLoader().load(options);
            return this
        },
        getLoader: function() {
            var me = this,
                data = (me.$cache || me.getCache()).data,
                loader = data.loader;
            if (!loader) {
                data.loader = loader = new Ext.ElementLoader({
                    target: me
                })
            }
            return loader
        },
        syncContent: function(source) {
            source = Ext.getDom(source);
            var me = this,
                sourceNodes = source.childNodes,
                sourceLen = sourceNodes.length,
                dest = me.dom,
                destNodes = dest.childNodes,
                destLen = destNodes.length,
                i, destNode, sourceNode, nodeType, newAttrs, attLen, attName;
            if (dest.mergeAttributes) {
                dest.mergeAttributes(source, true);
                dest.src = source.src
            } else {
                newAttrs = source.attributes;
                attLen = newAttrs.length;
                for (i = 0; i < attLen; i++) {
                    attName = newAttrs[i].name;
                    if (attName !== "id") {
                        dest.setAttribute(attName, newAttrs[i].value)
                    }
                }
            }
            if (sourceLen !== destLen) {
                dest.innerHTML = source.innerHTML;
                return
            }
            for (i = 0; i < sourceLen; i++) {
                sourceNode = sourceNodes[i];
                destNode = destNodes[i];
                nodeType = sourceNode.nodeType;
                if (nodeType !== destNode.nodeType || (nodeType === 1 && sourceNode.tagName !== destNode.tagName)) {
                    dest.innerHTML = source.innerHTML;
                    return
                }
                if (nodeType === 3) {
                    destNode.data = sourceNode.data
                } else {
                    if (sourceNode.id && destNode.id !== sourceNode.id) {
                        destNode.id = sourceNode.id
                    }
                    destNode.style.cssText = sourceNode.style.cssText;
                    destNode.className = sourceNode.className;
                    Ext.fly(destNode).syncContent(sourceNode)
                }
            }
        },
        update: function(html, loadScripts, callback) {
            var me = this,
                id, dom, interval;
            if (!me.dom) {
                return me
            }
            html = html || "";
            dom = me.dom;
            if (loadScripts !== true) {
                dom.innerHTML = html;
                Ext.callback(callback, me);
                return me
            }
            id = Ext.id();
            html += '<span id="' + id + '"></span>';
            interval = setInterval(function() {
                var hd, match, attrs, srcMatch, typeMatch, el, s;
                if (!(el = DOC.getElementById(id))) {
                    return false
                }
                clearInterval(interval);
                Ext.removeNode(el);
                hd = Ext.getHead().dom;
                while ((match = scriptTagRe.exec(html))) {
                    attrs = match[1];
                    srcMatch = attrs ? attrs.match(srcRe) : false;
                    if (srcMatch && srcMatch[2]) {
                        s = DOC.createElement("script");
                        s.src = srcMatch[2];
                        typeMatch = attrs.match(typeRe);
                        if (typeMatch && typeMatch[2]) {
                            s.type = typeMatch[2]
                        }
                        hd.appendChild(s)
                    } else {
                        if (match[2] && match[2].length > 0) {
                            if (window.execScript) {
                                window.execScript(match[2])
                            } else {
                                window.eval(match[2])
                            }
                        }
                    }
                }
                Ext.callback(callback, me)
            }, 20);
            dom.innerHTML = html.replace(replaceScriptTagRe, "");
            return me
        },
        removeAllListeners: function() {
            this.removeAnchor();
            Ext.EventManager.removeAll(this.dom);
            return this
        },
        createProxy: function(config, renderTo, matchBox) {
            config = (typeof config == "object") ? config : {
                tag: "div",
                cls: config
            };
            var me = this,
                proxy = renderTo ? Ext.DomHelper.append(renderTo, config, true) : Ext.DomHelper.insertBefore(me.dom, config, true);
            proxy.setVisibilityMode(Element.DISPLAY);
            proxy.hide();
            if (matchBox && me.setBox && me.getBox) {
                proxy.setBox(me.getBox())
            }
            return proxy
        },
        getScopeParent: function() {
            var parent = this.dom.parentNode;
            if (Ext.scopeResetCSS) {
                parent = parent.parentNode;
                if (!Ext.supports.CSS3LinearGradient || !Ext.supports.CSS3BorderRadius) {
                    parent = parent.parentNode
                }
            }
            return parent
        },
        needsTabIndex: function() {
            if (this.dom) {
                if ((this.dom.nodeName === "a") && (!this.dom.href)) {
                    return true
                }
                return !focusRe.test(this.dom.nodeName)
            }
        },
        isFocusable: function(asFocusEl) {
            var dom = this.dom,
                tabIndex = dom.tabIndex,
                nodeName = dom.nodeName,
                canFocus = false;
            if (dom && !dom.disabled) {
                if (tabIndex === -1) {
                    canFocus = Ext.FocusManager && Ext.FocusManager.enabled && asFocusEl
                } else {
                    if (focusRe.test(nodeName)) {
                        if ((nodeName !== "a") || dom.href) {
                            canFocus = true
                        }
                    } else {
                        canFocus = tabIndex >= 0
                    }
                }
                canFocus = canFocus && this.isVisible(true)
            }
            return canFocus
        }
    });
    if (Ext.isIE) {
        Element.prototype.getById = function(id, asDom) {
            var dom = this.dom,
                cacheItem, el, ret;
            if (dom) {
                el = (useDocForId && DOC.getElementById(id)) || dom.all[id];
                if (el) {
                    if (asDom) {
                        ret = el
                    } else {
                        cacheItem = EC[id];
                        if (cacheItem && cacheItem.el) {
                            ret = Ext.updateCacheEntry(cacheItem, el).el
                        } else {
                            ret = new Element(el)
                        }
                    }
                    return ret
                }
            }
            return asDom ? Ext.getDom(id) : Element.get(id)
        }
    }
    Element.createAlias({
        addListener: "on",
        removeListener: "un",
        clearListeners: "removeAllListeners",
        focusable: "isFocusable"
    });
    Element.Fly = AbstractElement.Fly = new Ext.Class({
        extend: Element,
        constructor: function(dom) {
            this.dom = dom
        },
        attach: AbstractElement.Fly.prototype.attach
    });
    if (Ext.isIE) {
        Ext.getElementById = function(id) {
            var el = DOC.getElementById(id),
                detachedBodyEl;
            if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
                el = detachedBodyEl.dom.all[id]
            }
            return el
        }
    } else {
        if (!DOC.querySelector) {
            Ext.getDetachedBody = Ext.getBody;
            Ext.getElementById = function(id) {
                return DOC.getElementById(id)
            }
        }
    }
});
Ext.define("Ext.dom.CompositeElementLite", {
    alternateClassName: "Ext.CompositeElementLite",
    requires: ["Ext.dom.Element", "Ext.dom.Query"],
    statics: {
        importElementMethods: function() {
            var b, c = Ext.dom.Element.prototype,
                a = this.prototype;
            for (b in c) {
                if (typeof c[b] == "function") {
                    (function(d) {
                        a[d] = a[d] || function() {
                            return this.invoke(d, arguments)
                        }
                    }).call(a, b)
                }
            }
        }
    },
    constructor: function(b, a) {
        this.elements = [];
        this.add(b, a);
        this.el = new Ext.dom.AbstractElement.Fly()
    },
    isComposite: true,
    getElement: function(a) {
        return this.el.attach(a)
    },
    transformElement: function(a) {
        return Ext.getDom(a)
    },
    getCount: function() {
        return this.elements.length
    },
    add: function(c, a) {
        var e = this.elements,
            b, d;
        if (!c) {
            return this
        }
        if (typeof c == "string") {
            c = Ext.dom.Element.selectorFunction(c, a)
        } else {
            if (c.isComposite) {
                c = c.elements
            } else {
                if (!Ext.isIterable(c)) {
                    c = [c]
                }
            }
        }
        for (b = 0, d = c.length; b < d; ++b) {
            e.push(this.transformElement(c[b]))
        }
        return this
    },
    invoke: function(d, a) {
        var g = this.elements,
            e = g.length,
            c, b;
        d = Ext.dom.Element.prototype[d];
        for (b = 0; b < e; b++) {
            c = g[b];
            if (c) {
                d.apply(this.getElement(c), a)
            }
        }
        return this
    },
    item: function(b) {
        var c = this.elements[b],
            a = null;
        if (c) {
            a = this.getElement(c)
        }
        return a
    },
    addListener: function(b, j, h, g) {
        var d = this.elements,
            a = d.length,
            c, k;
        for (c = 0; c < a; c++) {
            k = d[c];
            if (k) {
                Ext.EventManager.on(k, b, j, h || k, g)
            }
        }
        return this
    },
    each: function(g, d) {
        var h = this,
            c = h.elements,
            a = c.length,
            b, j;
        for (b = 0; b < a; b++) {
            j = c[b];
            if (j) {
                j = this.getElement(j);
                if (g.call(d || j, j, h, b) === false) {
                    break
                }
            }
        }
        return h
    },
    fill: function(a) {
        var b = this;
        b.elements = [];
        b.add(a);
        return b
    },
    filter: function(b) {
        var h = this,
            c = h.elements,
            g = c.length,
            d = [],
            e = 0,
            j = typeof b == "function",
            k, a;
        for (; e < g; e++) {
            a = c[e];
            k = false;
            if (a) {
                a = h.getElement(a);
                if (j) {
                    k = b.call(a, a, h, e) !== false
                } else {
                    k = a.is(b)
                }
                if (k) {
                    d.push(h.transformElement(a))
                }
            }
        }
        h.elements = d;
        return h
    },
    indexOf: function(a) {
        return Ext.Array.indexOf(this.elements, this.transformElement(a))
    },
    replaceElement: function(e, c, a) {
        var b = !isNaN(e) ? e : this.indexOf(e),
            g;
        if (b > -1) {
            c = Ext.getDom(c);
            if (a) {
                g = this.elements[b];
                g.parentNode.insertBefore(c, g);
                Ext.removeNode(g)
            }
            Ext.Array.splice(this.elements, b, 1, c)
        }
        return this
    },
    clear: function() {
        this.elements = []
    },
    addElements: function(d, b) {
        if (!d) {
            return this
        }
        if (typeof d == "string") {
            d = Ext.dom.Element.selectorFunction(d, b)
        }
        var c = this.elements,
            a = d.length,
            g;
        for (g = 0; g < a; g++) {
            c.push(Ext.get(d[g]))
        }
        return this
    },
    first: function() {
        return this.item(0)
    },
    last: function() {
        return this.item(this.getCount() - 1)
    },
    contains: function(a) {
        return this.indexOf(a) != -1
    },
    removeElement: function(e, i) {
        e = [].concat(e);
        var d = this,
            g = d.elements,
            c = e.length,
            h, b, a;
        for (a = 0; a < c; a++) {
            h = e[a];
            if ((b = (g[h] || g[h = d.indexOf(h)]))) {
                if (i) {
                    if (b.dom) {
                        b.remove()
                    } else {
                        Ext.removeNode(b)
                    }
                }
                Ext.Array.erase(g, h, 1)
            }
        }
        return d
    }
}, function() {
    this.importElementMethods();
    this.prototype.on = this.prototype.addListener;
    if (Ext.DomQuery) {
        Ext.dom.Element.selectorFunction = Ext.DomQuery.select
    }
    Ext.dom.Element.select = function(a, b) {
        var c;
        if (typeof a == "string") {
            c = Ext.dom.Element.selectorFunction(a, b)
        } else {
            if (a.length !== undefined) {
                c = a
            } else {}
        }
        return new Ext.CompositeElementLite(c)
    };
    Ext.select = function() {
        return Ext.dom.Element.select.apply(Ext.dom.Element, arguments)
    }
});
Ext.define("Ext.dom.CompositeElement", {
    alternateClassName: "Ext.CompositeElement",
    extend: "Ext.dom.CompositeElementLite",
    getElement: function(a) {
        return a
    },
    transformElement: function(a) {
        return Ext.get(a)
    }
}, function() {
    Ext.dom.Element.select = function(a, d, b) {
        var c;
        if (typeof a == "string") {
            c = Ext.dom.Element.selectorFunction(a, b)
        } else {
            if (a.length !== undefined) {
                c = a
            } else {}
        }
        return (d === true) ? new Ext.CompositeElement(c) : new Ext.CompositeElementLite(c)
    }
});
Ext.select = Ext.Element.select;
Ext.ClassManager.addNameAlternateMappings({
    "Ext.draw.engine.ImageExporter": [],
    "Ext.layout.component.Auto": [],
    "Ext.grid.property.Store": ["Ext.grid.PropertyStore"],
    "Ext.layout.container.Box": ["Ext.layout.BoxLayout"],
    "Ext.direct.JsonProvider": [],
    "Ext.tree.Panel": ["Ext.tree.TreePanel", "Ext.TreePanel"],
    "Ext.data.Model": ["Ext.data.Record"],
    "Ext.data.reader.Reader": ["Ext.data.Reader", "Ext.data.DataReader"],
    "Ext.tab.Tab": [],
    "Ext.button.Button": ["Ext.Button"],
    "Ext.util.Grouper": [],
    "Ext.direct.RemotingProvider": [],
    "Ext.data.NodeInterface": [],
    "Ext.grid.column.Date": ["Ext.grid.DateColumn"],
    "Ext.form.field.Trigger": ["Ext.form.TriggerField", "Ext.form.TwinTriggerField", "Ext.form.Trigger"],
    "Ext.grid.plugin.RowEditing": [],
    "Ext.tip.QuickTip": ["Ext.QuickTip"],
    "Ext.form.action.Load": ["Ext.form.Action.Load"],
    "Ext.form.field.ComboBox": ["Ext.form.ComboBox"],
    "Ext.layout.container.Border": ["Ext.layout.BorderLayout"],
    "Ext.data.JsonPStore": [],
    "Ext.layout.component.field.TextArea": [],
    "Ext.layout.container.Container": ["Ext.layout.ContainerLayout"],
    "Ext.util.Sortable": [],
    "Ext.selection.Model": ["Ext.AbstractSelectionModel"],
    "Ext.draw.CompositeSprite": [],
    "Ext.fx.Queue": [],
    "Ext.dd.StatusProxy": [],
    "Ext.form.field.Checkbox": ["Ext.form.Checkbox"],
    "Ext.XTemplateCompiler": [],
    "Ext.direct.Transaction": ["Ext.Direct.Transaction"],
    "Ext.util.Offset": [],
    "Ext.util.KeyNav": ["Ext.KeyNav"],
    "Ext.view.DragZone": [],
    "Ext.form.field.File": ["Ext.form.FileUploadField", "Ext.ux.form.FileUploadField", "Ext.form.File"],
    "Ext.slider.Single": ["Ext.Slider", "Ext.form.SliderField", "Ext.slider.SingleSlider", "Ext.slider.Slider"],
    "Ext.panel.Proxy": ["Ext.dd.PanelProxy"],
    "Ext.ComponentManager": ["Ext.ComponentMgr"],
    "Ext.fx.target.Target": [],
    "Ext.grid.feature.GroupingSummary": [],
    "Ext.grid.property.HeaderContainer": ["Ext.grid.PropertyColumnModel"],
    "Ext.layout.component.BoundList": [],
    "Ext.tab.Bar": [],
    "Ext.app.Application": [],
    "Ext.ShadowPool": [],
    "Ext.layout.container.Accordion": ["Ext.layout.AccordionLayout"],
    "Ext.resizer.ResizeTracker": [],
    "Ext.layout.container.boxOverflow.None": ["Ext.layout.boxOverflow.None"],
    "Ext.panel.Tool": [],
    "Ext.tree.View": [],
    "Ext.ElementLoader": [],
    "Ext.grid.ColumnComponentLayout": [],
    "Ext.toolbar.Separator": ["Ext.Toolbar.Separator"],
    "Ext.dd.DragZone": [],
    "Ext.util.Renderable": [],
    "Ext.layout.component.FieldSet": [],
    "Ext.util.Bindable": [],
    "Ext.data.SortTypes": [],
    "Ext.util.Animate": [],
    "Ext.form.field.Date": ["Ext.form.DateField", "Ext.form.Date"],
    "Ext.Component": [],
    "Ext.chart.axis.Axis": ["Ext.chart.Axis"],
    "Ext.fx.target.CompositeSprite": [],
    "Ext.menu.DatePicker": [],
    "Ext.form.field.Picker": ["Ext.form.Picker"],
    "Ext.fx.Animator": [],
    "Ext.Ajax": [],
    "Ext.layout.component.Dock": ["Ext.layout.component.AbstractDock"],
    "Ext.util.Filter": [],
    "Ext.dd.DragDrop": [],
    "Ext.view.View": ["Ext.DataView"],
    "Ext.data.association.BelongsTo": ["Ext.data.BelongsToAssociation"],
    "Ext.fx.target.Element": [],
    "Ext.dd.DDProxy": [],
    "Ext.draw.Surface": [],
    "Ext.data.AbstractStore": [],
    "Ext.form.action.StandardSubmit": [],
    "Ext.grid.Lockable": [],
    "Ext.dd.Registry": [],
    "Ext.picker.Month": ["Ext.MonthPicker"],
    "Ext.container.Container": ["Ext.Container"],
    "Ext.menu.Manager": ["Ext.menu.MenuMgr"],
    "Ext.util.KeyMap": ["Ext.KeyMap"],
    "Ext.data.Batch": [],
    "Ext.resizer.Handle": [],
    "Ext.util.ElementContainer": [],
    "Ext.grid.feature.Grouping": [],
    "Ext.tab.Panel": ["Ext.TabPanel"],
    "Ext.layout.component.Body": [],
    "Ext.layout.Context": [],
    "Ext.layout.component.field.ComboBox": [],
    "Ext.dd.DDTarget": [],
    "Ext.chart.Chart": [],
    "Ext.data.Field": [],
    "Ext.form.field.FileButton": [],
    "Ext.chart.series.Gauge": [],
    "Ext.data.StoreManager": ["Ext.StoreMgr", "Ext.data.StoreMgr", "Ext.StoreManager"],
    "Ext.data.IdGenerator": [],
    "Ext.tip.QuickTipManager": ["Ext.QuickTips"],
    "Ext.grid.plugin.Editing": [],
    "Ext.state.LocalStorageProvider": [],
    "Ext.grid.RowEditor": [],
    "Ext.form.action.Action": ["Ext.form.Action"],
    "Ext.fx.Easing": [],
    "Ext.ProgressBar": [],
    "Ext.data.reader.Array": ["Ext.data.ArrayReader"],
    "Ext.picker.Date": ["Ext.DatePicker"],
    "Ext.tree.ViewDragZone": [],
    "Ext.data.proxy.JsonP": ["Ext.data.ScriptTagProxy"],
    "Ext.chart.series.Area": [],
    "Ext.fx.Anim": [],
    "Ext.menu.Item": ["Ext.menu.TextItem"],
    "Ext.chart.Legend": [],
    "Ext.grid.plugin.HeaderReorderer": [],
    "Ext.layout.container.VBox": ["Ext.layout.VBoxLayout"],
    "Ext.view.DropZone": [],
    "Ext.layout.component.Button": [],
    "Ext.form.field.Hidden": ["Ext.form.Hidden"],
    "Ext.form.FieldContainer": [],
    "Ext.data.proxy.Server": ["Ext.data.ServerProxy"],
    "Ext.chart.series.Cartesian": ["Ext.chart.CartesianSeries", "Ext.chart.CartesianChart"],
    "Ext.grid.column.Column": ["Ext.grid.Column"],
    "Ext.data.ResultSet": [],
    "Ext.data.association.HasMany": ["Ext.data.HasManyAssociation"],
    "Ext.layout.container.Fit": ["Ext.layout.FitLayout"],
    "Ext.util.CSS": [],
    "Ext.layout.component.field.Field": [],
    "Ext.data.proxy.Ajax": ["Ext.data.HttpProxy", "Ext.data.AjaxProxy"],
    "Ext.form.Label": [],
    "Ext.data.writer.Writer": ["Ext.data.DataWriter", "Ext.data.Writer"],
    "Ext.view.BoundListKeyNav": [],
    "Ext.form.FieldSet": [],
    "Ext.XTemplateParser": [],
    "Ext.form.field.VTypes": ["Ext.form.VTypes"],
    "Ext.fx.PropertyHandler": [],
    "Ext.form.CheckboxGroup": [],
    "Ext.data.JsonP": [],
    "Ext.draw.engine.Vml": [],
    "Ext.layout.container.CheckboxGroup": [],
    "Ext.panel.Header": [],
    "Ext.app.Controller": [],
    "Ext.grid.plugin.CellEditing": [],
    "Ext.form.field.Time": ["Ext.form.TimeField", "Ext.form.Time"],
    "Ext.fx.CubicBezier": [],
    "Ext.button.Cycle": ["Ext.CycleButton"],
    "Ext.data.Tree": [],
    "Ext.ModelManager": ["Ext.ModelMgr"],
    "Ext.data.XmlStore": [],
    "Ext.grid.ViewDropZone": [],
    "Ext.grid.header.DropZone": [],
    "Ext.Layer": [],
    "Ext.util.HashMap": [],
    "Ext.grid.column.Template": ["Ext.grid.TemplateColumn"],
    "Ext.ComponentLoader": [],
    "Ext.form.FieldAncestor": [],
    "Ext.chart.axis.Gauge": [],
    "Ext.data.validations": [],
    "Ext.data.Connection": [],
    "Ext.direct.ExceptionEvent": [],
    "Ext.dd.DropZone": [],
    "Ext.resizer.Splitter": [],
    "Ext.form.RadioManager": [],
    "Ext.data.association.HasOne": ["Ext.data.HasOneAssociation"],
    "Ext.draw.Text": [],
    "Ext.window.MessageBox": [],
    "Ext.fx.target.CompositeElementCSS": [],
    "Ext.chart.series.Line": ["Ext.chart.LineSeries", "Ext.chart.LineChart"],
    "Ext.view.Table": [],
    "Ext.data.writer.Json": ["Ext.data.JsonWriter"],
    "Ext.fx.target.CompositeElement": [],
    "Ext.fx.Manager": [],
    "Ext.chart.Label": [],
    "Ext.grid.View": [],
    "Ext.Action": [],
    "Ext.form.Basic": ["Ext.form.BasicForm"],
    "Ext.container.Viewport": ["Ext.Viewport"],
    "Ext.state.Stateful": [],
    "Ext.grid.feature.RowBody": [],
    "Ext.form.field.Text": ["Ext.form.TextField", "Ext.form.Text"],
    "Ext.data.reader.Xml": ["Ext.data.XmlReader"],
    "Ext.grid.feature.AbstractSummary": [],
    "Ext.chart.axis.Category": ["Ext.chart.CategoryAxis"],
    "Ext.layout.container.Absolute": ["Ext.layout.AbsoluteLayout"],
    "Ext.data.reader.Json": ["Ext.data.JsonReader"],
    "Ext.util.TextMetrics": [],
    "Ext.data.TreeStore": [],
    "Ext.view.BoundList": ["Ext.BoundList"],
    "Ext.form.field.HtmlEditor": ["Ext.form.HtmlEditor"],
    "Ext.layout.container.Form": ["Ext.layout.FormLayout"],
    "Ext.chart.MaskLayer": [],
    "Ext.util.Observable": [],
    "Ext.resizer.BorderSplitterTracker": [],
    "Ext.util.LruCache": [],
    "Ext.tip.Tip": ["Ext.Tip"],
    "Ext.grid.feature.RowWrap": [],
    "Ext.data.proxy.Client": ["Ext.data.ClientProxy"],
    "Ext.data.Types": [],
    "Ext.draw.SpriteDD": [],
    "Ext.layout.container.boxOverflow.Menu": ["Ext.layout.boxOverflow.Menu"],
    "Ext.LoadMask": [],
    "Ext.toolbar.Paging": ["Ext.PagingToolbar"],
    "Ext.data.association.Association": ["Ext.data.Association"],
    "Ext.grid.LockingView": [],
    "Ext.tree.ViewDropZone": [],
    "Ext.toolbar.Toolbar": ["Ext.Toolbar"],
    "Ext.tip.ToolTip": ["Ext.ToolTip"],
    "Ext.chart.Highlight": [],
    "Ext.state.Manager": [],
    "Ext.util.Inflector": [],
    "Ext.grid.Panel": ["Ext.list.ListView", "Ext.ListView", "Ext.grid.GridPanel"],
    "Ext.XTemplate": [],
    "Ext.data.NodeStore": [],
    "Ext.Shadow": [],
    "Ext.form.action.Submit": ["Ext.form.Action.Submit"],
    "Ext.form.Panel": ["Ext.FormPanel", "Ext.form.FormPanel"],
    "Ext.chart.series.Series": [],
    "Ext.data.Request": [],
    "Ext.dd.DD": [],
    "Ext.toolbar.Fill": ["Ext.Toolbar.Fill"],
    "Ext.grid.RowNumberer": [],
    "Ext.data.proxy.WebStorage": ["Ext.data.WebStorageProxy"],
    "Ext.util.Floating": [],
    "Ext.form.action.DirectSubmit": ["Ext.form.Action.DirectSubmit"],
    "Ext.util.Cookies": [],
    "Ext.data.UuidGenerator": [],
    "Ext.fx.target.Component": [],
    "Ext.util.Point": [],
    "Ext.form.CheckboxManager": [],
    "Ext.form.field.Field": [],
    "Ext.form.field.Display": ["Ext.form.DisplayField", "Ext.form.Display"],
    "Ext.layout.container.Anchor": ["Ext.layout.AnchorLayout"],
    "Ext.layout.component.field.Text": [],
    "Ext.data.DirectStore": [],
    "Ext.data.BufferStore": [],
    "Ext.grid.ColumnLayout": [],
    "Ext.chart.series.Column": ["Ext.chart.ColumnSeries", "Ext.chart.ColumnChart", "Ext.chart.StackedColumnChart"],
    "Ext.AbstractComponent": [],
    "Ext.Template": [],
    "Ext.flash.Component": ["Ext.FlashComponent"],
    "Ext.form.field.Base": ["Ext.form.Field", "Ext.form.BaseField"],
    "Ext.data.SequentialIdGenerator": [],
    "Ext.grid.header.Container": [],
    "Ext.container.ButtonGroup": ["Ext.ButtonGroup"],
    "Ext.grid.column.Action": ["Ext.grid.ActionColumn"],
    "Ext.layout.component.field.Trigger": [],
    "Ext.layout.component.field.FieldContainer": [],
    "Ext.chart.Shape": [],
    "Ext.panel.DD": [],
    "Ext.container.AbstractContainer": [],
    "Ext.data.ArrayStore": [],
    "Ext.window.Window": ["Ext.Window"],
    "Ext.picker.Color": ["Ext.ColorPalette"],
    "Ext.grid.feature.Feature": [],
    "Ext.chart.theme.Theme": [],
    "Ext.util.ClickRepeater": [],
    "Ext.form.field.Spinner": ["Ext.form.Spinner"],
    "Ext.container.DockingContainer": [],
    "Ext.selection.DataViewModel": [],
    "Ext.dd.DragTracker": [],
    "Ext.dd.DragDropManager": ["Ext.dd.DragDropMgr", "Ext.dd.DDM"],
    "Ext.selection.CheckboxModel": [],
    "Ext.layout.container.Column": ["Ext.layout.ColumnLayout"],
    "Ext.menu.KeyNav": [],
    "Ext.draw.Matrix": [],
    "Ext.form.field.Number": ["Ext.form.NumberField", "Ext.form.Number"],
    "Ext.data.proxy.Direct": ["Ext.data.DirectProxy"],
    "Ext.chart.Navigation": [],
    "Ext.slider.Tip": [],
    "Ext.chart.theme.Base": [],
    "Ext.form.field.TextArea": ["Ext.form.TextArea"],
    "Ext.form.field.Radio": ["Ext.form.Radio"],
    "Ext.layout.component.ProgressBar": [],
    "Ext.chart.series.Pie": ["Ext.chart.PieSeries", "Ext.chart.PieChart"],
    "Ext.view.TableChunker": [],
    "Ext.direct.Provider": [],
    "Ext.data.TreeModel": [],
    "Ext.tree.plugin.TreeViewDragDrop": [],
    "Ext.layout.Layout": [],
    "Ext.toolbar.TextItem": ["Ext.Toolbar.TextItem"],
    "Ext.util.AbstractMixedCollection": [],
    "Ext.data.JsonStore": [],
    "Ext.button.Split": ["Ext.SplitButton"],
    "Ext.direct.RemotingEvent": [],
    "Ext.dd.DropTarget": [],
    "Ext.draw.Sprite": [],
    "Ext.data.proxy.LocalStorage": ["Ext.data.LocalStorageProxy"],
    "Ext.fx.target.Sprite": [],
    "Ext.layout.component.Draw": [],
    "Ext.AbstractPlugin": [],
    "Ext.Editor": [],
    "Ext.chart.axis.Radial": [],
    "Ext.chart.Tip": [],
    "Ext.layout.container.Table": ["Ext.layout.TableLayout"],
    "Ext.data.proxy.Rest": ["Ext.data.RestProxy"],
    "Ext.chart.axis.Abstract": [],
    "Ext.util.Queue": [],
    "Ext.state.CookieProvider": [],
    "Ext.Img": [],
    "Ext.dd.DragSource": [],
    "Ext.grid.CellEditor": [],
    "Ext.layout.ClassList": [],
    "Ext.util.Sorter": [],
    "Ext.resizer.SplitterTracker": [],
    "Ext.panel.Table": [],
    "Ext.draw.Color": [],
    "Ext.chart.series.Bar": ["Ext.chart.BarSeries", "Ext.chart.BarChart", "Ext.chart.StackedBarChart"],
    "Ext.PluginManager": ["Ext.PluginMgr"],
    "Ext.util.ComponentDragger": [],
    "Ext.chart.series.Scatter": [],
    "Ext.chart.Callout": [],
    "Ext.data.Store": [],
    "Ext.grid.feature.Summary": [],
    "Ext.layout.component.Component": [],
    "Ext.util.ProtoElement": [],
    "Ext.direct.Manager": [],
    "Ext.data.proxy.Proxy": ["Ext.data.DataProxy", "Ext.data.Proxy"],
    "Ext.menu.CheckItem": [],
    "Ext.layout.container.Card": ["Ext.layout.CardLayout"],
    "Ext.draw.Component": [],
    "Ext.toolbar.Item": ["Ext.Toolbar.Item"],
    "Ext.form.RadioGroup": [],
    "Ext.slider.Thumb": [],
    "Ext.grid.header.DragZone": [],
    "Ext.form.action.DirectLoad": ["Ext.form.Action.DirectLoad"],
    "Ext.picker.Time": [],
    "Ext.resizer.BorderSplitter": [],
    "Ext.ZIndexManager": ["Ext.WindowGroup"],
    "Ext.menu.ColorPicker": [],
    "Ext.menu.Menu": [],
    "Ext.chart.LegendItem": [],
    "Ext.toolbar.Spacer": ["Ext.Toolbar.Spacer"],
    "Ext.panel.Panel": ["Ext.Panel"],
    "Ext.util.Memento": [],
    "Ext.data.proxy.Memory": ["Ext.data.MemoryProxy"],
    "Ext.chart.axis.Time": ["Ext.chart.TimeAxis"],
    "Ext.grid.plugin.DragDrop": [],
    "Ext.layout.component.Tab": [],
    "Ext.ComponentQuery": [],
    "Ext.draw.engine.SvgExporter": [],
    "Ext.grid.feature.Chunking": [],
    "Ext.layout.container.Auto": [],
    "Ext.view.AbstractView": [],
    "Ext.util.Region": [],
    "Ext.fx.target.ElementCSS": [],
    "Ext.draw.Draw": [],
    "Ext.grid.PagingScroller": [],
    "Ext.layout.component.field.HtmlEditor": [],
    "Ext.data.proxy.SessionStorage": ["Ext.data.SessionStorageProxy"],
    "Ext.app.EventBus": [],
    "Ext.menu.Separator": [],
    "Ext.direct.RemotingMethod": [],
    "Ext.direct.Event": [],
    "Ext.util.History": ["Ext.History"],
    "Ext.dd.ScrollManager": [],
    "Ext.chart.Mask": [],
    "Ext.selection.CellModel": [],
    "Ext.view.TableLayout": [],
    "Ext.state.Provider": [],
    "Ext.layout.container.Editor": [],
    "Ext.data.Errors": [],
    "Ext.selection.TreeModel": [],
    "Ext.form.Labelable": [],
    "Ext.grid.column.Number": ["Ext.grid.NumberColumn"],
    "Ext.draw.engine.Svg": [],
    "Ext.grid.property.Grid": ["Ext.grid.PropertyGrid"],
    "Ext.FocusManager": ["Ext.FocusMgr"],
    "Ext.AbstractManager": [],
    "Ext.chart.series.Radar": [],
    "Ext.grid.property.Property": ["Ext.PropGridProperty"],
    "Ext.chart.TipSurface": [],
    "Ext.grid.column.Boolean": ["Ext.grid.BooleanColumn"],
    "Ext.direct.PollingProvider": [],
    "Ext.grid.plugin.HeaderResizer": [],
    "Ext.data.writer.Xml": ["Ext.data.XmlWriter"],
    "Ext.tree.Column": [],
    "Ext.slider.Multi": ["Ext.slider.MultiSlider"],
    "Ext.panel.AbstractPanel": [],
    "Ext.layout.component.field.Slider": [],
    "Ext.chart.axis.Numeric": ["Ext.chart.NumericAxis"],
    "Ext.layout.container.boxOverflow.Scroller": ["Ext.layout.boxOverflow.Scroller"],
    "Ext.data.Operation": [],
    "Ext.layout.container.HBox": ["Ext.layout.HBoxLayout"],
    "Ext.resizer.Resizer": ["Ext.Resizable"],
    "Ext.selection.RowModel": [],
    "Ext.layout.ContextItem": [],
    "Ext.util.MixedCollection": []
});
Ext.ClassManager.addNameAliasMappings({
    "Ext.draw.engine.ImageExporter": [],
    "Ext.layout.component.Auto": ["layout.autocomponent"],
    "Ext.grid.property.Store": [],
    "Ext.layout.container.Box": ["layout.box"],
    "Ext.direct.JsonProvider": ["direct.jsonprovider"],
    "Ext.tree.Panel": ["widget.treepanel"],
    "Ext.data.Model": [],
    "Ext.data.reader.Reader": [],
    "Ext.tab.Tab": ["widget.tab"],
    "Ext.button.Button": ["widget.button"],
    "Ext.util.Grouper": [],
    "Ext.direct.RemotingProvider": ["direct.remotingprovider"],
    "Ext.data.NodeInterface": [],
    "Ext.grid.column.Date": ["widget.datecolumn"],
    "Ext.form.field.Trigger": ["widget.triggerfield", "widget.trigger"],
    "Ext.grid.plugin.RowEditing": ["plugin.rowediting"],
    "Ext.tip.QuickTip": ["widget.quicktip"],
    "Ext.form.action.Load": ["formaction.load"],
    "Ext.form.field.ComboBox": ["widget.combobox", "widget.combo"],
    "Ext.layout.container.Border": ["layout.border"],
    "Ext.data.JsonPStore": ["store.jsonp"],
    "Ext.layout.component.field.TextArea": ["layout.textareafield"],
    "Ext.layout.container.Container": [],
    "Ext.util.Sortable": [],
    "Ext.selection.Model": [],
    "Ext.draw.CompositeSprite": [],
    "Ext.fx.Queue": [],
    "Ext.dd.StatusProxy": [],
    "Ext.form.field.Checkbox": ["widget.checkboxfield", "widget.checkbox"],
    "Ext.XTemplateCompiler": [],
    "Ext.direct.Transaction": ["direct.transaction"],
    "Ext.util.Offset": [],
    "Ext.util.KeyNav": [],
    "Ext.view.DragZone": [],
    "Ext.form.field.File": ["widget.filefield", "widget.fileuploadfield"],
    "Ext.slider.Single": ["widget.slider", "widget.sliderfield"],
    "Ext.panel.Proxy": [],
    "Ext.ComponentManager": [],
    "Ext.fx.target.Target": [],
    "Ext.grid.feature.GroupingSummary": ["feature.groupingsummary"],
    "Ext.grid.property.HeaderContainer": [],
    "Ext.layout.component.BoundList": ["layout.boundlist"],
    "Ext.tab.Bar": ["widget.tabbar"],
    "Ext.app.Application": [],
    "Ext.ShadowPool": [],
    "Ext.layout.container.Accordion": ["layout.accordion"],
    "Ext.resizer.ResizeTracker": [],
    "Ext.layout.container.boxOverflow.None": [],
    "Ext.panel.Tool": ["widget.tool"],
    "Ext.tree.View": ["widget.treeview"],
    "Ext.ElementLoader": [],
    "Ext.grid.ColumnComponentLayout": ["layout.columncomponent"],
    "Ext.toolbar.Separator": ["widget.tbseparator"],
    "Ext.dd.DragZone": [],
    "Ext.util.Renderable": [],
    "Ext.layout.component.FieldSet": ["layout.fieldset"],
    "Ext.util.Bindable": [],
    "Ext.data.SortTypes": [],
    "Ext.util.Animate": [],
    "Ext.form.field.Date": ["widget.datefield"],
    "Ext.Component": ["widget.component", "widget.box"],
    "Ext.chart.axis.Axis": [],
    "Ext.fx.target.CompositeSprite": [],
    "Ext.menu.DatePicker": ["widget.datemenu"],
    "Ext.form.field.Picker": ["widget.pickerfield"],
    "Ext.fx.Animator": [],
    "Ext.Ajax": [],
    "Ext.layout.component.Dock": ["layout.dock"],
    "Ext.util.Filter": [],
    "Ext.dd.DragDrop": [],
    "Ext.view.View": ["widget.dataview"],
    "Ext.data.association.BelongsTo": ["association.belongsto"],
    "Ext.fx.target.Element": [],
    "Ext.dd.DDProxy": [],
    "Ext.draw.Surface": [],
    "Ext.data.AbstractStore": [],
    "Ext.form.action.StandardSubmit": ["formaction.standardsubmit"],
    "Ext.grid.Lockable": [],
    "Ext.dd.Registry": [],
    "Ext.picker.Month": ["widget.monthpicker"],
    "Ext.container.Container": ["widget.container"],
    "Ext.menu.Manager": [],
    "Ext.util.KeyMap": [],
    "Ext.data.Batch": [],
    "Ext.resizer.Handle": [],
    "Ext.util.ElementContainer": [],
    "Ext.grid.feature.Grouping": ["feature.grouping"],
    "Ext.tab.Panel": ["widget.tabpanel"],
    "Ext.layout.component.Body": ["layout.body"],
    "Ext.layout.Context": [],
    "Ext.layout.component.field.ComboBox": ["layout.combobox"],
    "Ext.dd.DDTarget": [],
    "Ext.chart.Chart": ["widget.chart"],
    "Ext.data.Field": ["data.field"],
    "Ext.form.field.FileButton": ["widget.filebutton"],
    "Ext.chart.series.Gauge": ["series.gauge"],
    "Ext.data.StoreManager": [],
    "Ext.data.IdGenerator": [],
    "Ext.tip.QuickTipManager": [],
    "Ext.grid.plugin.Editing": ["editing.editing"],
    "Ext.state.LocalStorageProvider": ["state.localstorage"],
    "Ext.grid.RowEditor": ["widget.roweditor"],
    "Ext.form.action.Action": [],
    "Ext.fx.Easing": [],
    "Ext.ProgressBar": ["widget.progressbar"],
    "Ext.data.reader.Array": ["reader.array"],
    "Ext.picker.Date": ["widget.datepicker"],
    "Ext.tree.ViewDragZone": [],
    "Ext.data.proxy.JsonP": ["proxy.jsonp", "proxy.scripttag"],
    "Ext.chart.series.Area": ["series.area"],
    "Ext.fx.Anim": [],
    "Ext.menu.Item": ["widget.menuitem"],
    "Ext.chart.Legend": [],
    "Ext.grid.plugin.HeaderReorderer": ["plugin.gridheaderreorderer"],
    "Ext.layout.container.VBox": ["layout.vbox"],
    "Ext.view.DropZone": [],
    "Ext.layout.component.Button": ["layout.button"],
    "Ext.form.field.Hidden": ["widget.hiddenfield", "widget.hidden"],
    "Ext.form.FieldContainer": ["widget.fieldcontainer"],
    "Ext.data.proxy.Server": ["proxy.server"],
    "Ext.chart.series.Cartesian": [],
    "Ext.grid.column.Column": ["widget.gridcolumn"],
    "Ext.data.ResultSet": [],
    "Ext.data.association.HasMany": ["association.hasmany"],
    "Ext.layout.container.Fit": ["layout.fit"],
    "Ext.util.CSS": [],
    "Ext.layout.component.field.Field": ["layout.field"],
    "Ext.data.proxy.Ajax": ["proxy.ajax"],
    "Ext.form.Label": ["widget.label"],
    "Ext.data.writer.Writer": ["writer.base"],
    "Ext.view.BoundListKeyNav": [],
    "Ext.form.FieldSet": ["widget.fieldset"],
    "Ext.XTemplateParser": [],
    "Ext.form.field.VTypes": [],
    "Ext.fx.PropertyHandler": [],
    "Ext.form.CheckboxGroup": ["widget.checkboxgroup"],
    "Ext.data.JsonP": [],
    "Ext.draw.engine.Vml": [],
    "Ext.layout.container.CheckboxGroup": ["layout.checkboxgroup"],
    "Ext.panel.Header": ["widget.header"],
    "Ext.app.Controller": [],
    "Ext.grid.plugin.CellEditing": ["plugin.cellediting"],
    "Ext.form.field.Time": ["widget.timefield"],
    "Ext.fx.CubicBezier": [],
    "Ext.button.Cycle": ["widget.cycle"],
    "Ext.data.Tree": ["data.tree"],
    "Ext.ModelManager": [],
    "Ext.data.XmlStore": ["store.xml"],
    "Ext.grid.ViewDropZone": [],
    "Ext.grid.header.DropZone": [],
    "Ext.Layer": [],
    "Ext.util.HashMap": [],
    "Ext.grid.column.Template": ["widget.templatecolumn"],
    "Ext.ComponentLoader": [],
    "Ext.form.FieldAncestor": [],
    "Ext.chart.axis.Gauge": ["axis.gauge"],
    "Ext.data.validations": [],
    "Ext.data.Connection": [],
    "Ext.direct.ExceptionEvent": ["direct.exception"],
    "Ext.dd.DropZone": [],
    "Ext.resizer.Splitter": ["widget.splitter"],
    "Ext.form.RadioManager": [],
    "Ext.data.association.HasOne": ["association.hasone"],
    "Ext.draw.Text": ["widget.text"],
    "Ext.window.MessageBox": ["widget.messagebox"],
    "Ext.fx.target.CompositeElementCSS": [],
    "Ext.chart.series.Line": ["series.line"],
    "Ext.view.Table": ["widget.tableview"],
    "Ext.data.writer.Json": ["writer.json"],
    "Ext.fx.target.CompositeElement": [],
    "Ext.fx.Manager": [],
    "Ext.chart.Label": [],
    "Ext.grid.View": ["widget.gridview"],
    "Ext.Action": [],
    "Ext.form.Basic": [],
    "Ext.container.Viewport": ["widget.viewport"],
    "Ext.state.Stateful": [],
    "Ext.grid.feature.RowBody": ["feature.rowbody"],
    "Ext.form.field.Text": ["widget.textfield"],
    "Ext.data.reader.Xml": ["reader.xml"],
    "Ext.grid.feature.AbstractSummary": ["feature.abstractsummary"],
    "Ext.chart.axis.Category": ["axis.category"],
    "Ext.layout.container.Absolute": ["layout.absolute"],
    "Ext.data.reader.Json": ["reader.json"],
    "Ext.util.TextMetrics": [],
    "Ext.data.TreeStore": ["store.tree"],
    "Ext.view.BoundList": ["widget.boundlist"],
    "Ext.form.field.HtmlEditor": ["widget.htmleditor"],
    "Ext.layout.container.Form": ["layout.form"],
    "Ext.chart.MaskLayer": [],
    "Ext.util.Observable": [],
    "Ext.resizer.BorderSplitterTracker": [],
    "Ext.util.LruCache": [],
    "Ext.tip.Tip": [],
    "Ext.grid.feature.RowWrap": ["feature.rowwrap"],
    "Ext.data.proxy.Client": [],
    "Ext.data.Types": [],
    "Ext.draw.SpriteDD": [],
    "Ext.layout.container.boxOverflow.Menu": [],
    "Ext.LoadMask": ["widget.loadmask"],
    "Ext.toolbar.Paging": ["widget.pagingtoolbar"],
    "Ext.data.association.Association": [],
    "Ext.grid.LockingView": [],
    "Ext.tree.ViewDropZone": [],
    "Ext.toolbar.Toolbar": ["widget.toolbar"],
    "Ext.tip.ToolTip": ["widget.tooltip"],
    "Ext.chart.Highlight": [],
    "Ext.state.Manager": [],
    "Ext.util.Inflector": [],
    "Ext.grid.Panel": ["widget.gridpanel", "widget.grid"],
    "Ext.XTemplate": [],
    "Ext.data.NodeStore": ["store.node"],
    "Ext.Shadow": [],
    "Ext.form.action.Submit": ["formaction.submit"],
    "Ext.form.Panel": ["widget.form"],
    "Ext.chart.series.Series": [],
    "Ext.data.Request": [],
    "Ext.dd.DD": [],
    "Ext.toolbar.Fill": ["widget.tbfill"],
    "Ext.grid.RowNumberer": ["widget.rownumberer"],
    "Ext.data.proxy.WebStorage": [],
    "Ext.util.Floating": [],
    "Ext.form.action.DirectSubmit": ["formaction.directsubmit"],
    "Ext.util.Cookies": [],
    "Ext.data.UuidGenerator": ["idgen.uuid"],
    "Ext.fx.target.Component": [],
    "Ext.util.Point": [],
    "Ext.form.CheckboxManager": [],
    "Ext.form.field.Field": [],
    "Ext.form.field.Display": ["widget.displayfield"],
    "Ext.layout.container.Anchor": ["layout.anchor"],
    "Ext.layout.component.field.Text": ["layout.textfield"],
    "Ext.data.DirectStore": ["store.direct"],
    "Ext.data.BufferStore": ["store.buffer"],
    "Ext.grid.ColumnLayout": ["layout.gridcolumn"],
    "Ext.chart.series.Column": ["series.column"],
    "Ext.AbstractComponent": [],
    "Ext.Template": [],
    "Ext.flash.Component": ["widget.flash"],
    "Ext.form.field.Base": ["widget.field"],
    "Ext.data.SequentialIdGenerator": ["idgen.sequential"],
    "Ext.grid.header.Container": ["widget.headercontainer"],
    "Ext.container.ButtonGroup": ["widget.buttongroup"],
    "Ext.grid.column.Action": ["widget.actioncolumn"],
    "Ext.layout.component.field.Trigger": ["layout.triggerfield"],
    "Ext.layout.component.field.FieldContainer": ["layout.fieldcontainer"],
    "Ext.chart.Shape": [],
    "Ext.panel.DD": [],
    "Ext.container.AbstractContainer": [],
    "Ext.data.ArrayStore": ["store.array"],
    "Ext.window.Window": ["widget.window"],
    "Ext.picker.Color": ["widget.colorpicker"],
    "Ext.grid.feature.Feature": ["feature.feature"],
    "Ext.chart.theme.Theme": [],
    "Ext.util.ClickRepeater": [],
    "Ext.form.field.Spinner": ["widget.spinnerfield"],
    "Ext.container.DockingContainer": [],
    "Ext.selection.DataViewModel": [],
    "Ext.dd.DragTracker": [],
    "Ext.dd.DragDropManager": [],
    "Ext.selection.CheckboxModel": ["selection.checkboxmodel"],
    "Ext.layout.container.Column": ["layout.column"],
    "Ext.menu.KeyNav": [],
    "Ext.draw.Matrix": [],
    "Ext.form.field.Number": ["widget.numberfield"],
    "Ext.data.proxy.Direct": ["proxy.direct"],
    "Ext.chart.Navigation": [],
    "Ext.slider.Tip": ["widget.slidertip"],
    "Ext.chart.theme.Base": [],
    "Ext.form.field.TextArea": ["widget.textareafield", "widget.textarea"],
    "Ext.form.field.Radio": ["widget.radiofield", "widget.radio"],
    "Ext.layout.component.ProgressBar": ["layout.progressbar"],
    "Ext.chart.series.Pie": ["series.pie"],
    "Ext.view.TableChunker": [],
    "Ext.direct.Provider": ["direct.provider"],
    "Ext.data.TreeModel": [],
    "Ext.tree.plugin.TreeViewDragDrop": ["plugin.treeviewdragdrop"],
    "Ext.layout.Layout": [],
    "Ext.toolbar.TextItem": ["widget.tbtext"],
    "Ext.util.AbstractMixedCollection": [],
    "Ext.data.JsonStore": ["store.json"],
    "Ext.button.Split": ["widget.splitbutton"],
    "Ext.direct.RemotingEvent": ["direct.rpc"],
    "Ext.dd.DropTarget": [],
    "Ext.draw.Sprite": [],
    "Ext.data.proxy.LocalStorage": ["proxy.localstorage"],
    "Ext.fx.target.Sprite": [],
    "Ext.layout.component.Draw": ["layout.draw"],
    "Ext.AbstractPlugin": [],
    "Ext.Editor": ["widget.editor"],
    "Ext.chart.axis.Radial": ["axis.radial"],
    "Ext.chart.Tip": [],
    "Ext.layout.container.Table": ["layout.table"],
    "Ext.data.proxy.Rest": ["proxy.rest"],
    "Ext.chart.axis.Abstract": [],
    "Ext.util.Queue": [],
    "Ext.state.CookieProvider": [],
    "Ext.Img": ["widget.image", "widget.imagecomponent"],
    "Ext.dd.DragSource": [],
    "Ext.grid.CellEditor": [],
    "Ext.layout.ClassList": [],
    "Ext.util.Sorter": [],
    "Ext.resizer.SplitterTracker": [],
    "Ext.panel.Table": ["widget.tablepanel"],
    "Ext.draw.Color": [],
    "Ext.chart.series.Bar": ["series.bar"],
    "Ext.PluginManager": [],
    "Ext.util.ComponentDragger": [],
    "Ext.chart.series.Scatter": ["series.scatter"],
    "Ext.chart.Callout": [],
    "Ext.data.Store": ["store.store"],
    "Ext.grid.feature.Summary": ["feature.summary"],
    "Ext.layout.component.Component": [],
    "Ext.util.ProtoElement": [],
    "Ext.direct.Manager": [],
    "Ext.data.proxy.Proxy": ["proxy.proxy"],
    "Ext.menu.CheckItem": ["widget.menucheckitem"],
    "Ext.layout.container.Card": ["layout.card"],
    "Ext.draw.Component": ["widget.draw"],
    "Ext.toolbar.Item": ["widget.tbitem"],
    "Ext.form.RadioGroup": ["widget.radiogroup"],
    "Ext.slider.Thumb": [],
    "Ext.grid.header.DragZone": [],
    "Ext.form.action.DirectLoad": ["formaction.directload"],
    "Ext.picker.Time": ["widget.timepicker"],
    "Ext.resizer.BorderSplitter": ["widget.bordersplitter"],
    "Ext.ZIndexManager": [],
    "Ext.menu.ColorPicker": ["widget.colormenu"],
    "Ext.menu.Menu": ["widget.menu"],
    "Ext.chart.LegendItem": [],
    "Ext.toolbar.Spacer": ["widget.tbspacer"],
    "Ext.panel.Panel": ["widget.panel"],
    "Ext.util.Memento": [],
    "Ext.data.proxy.Memory": ["proxy.memory"],
    "Ext.chart.axis.Time": ["axis.time"],
    "Ext.grid.plugin.DragDrop": ["plugin.gridviewdragdrop"],
    "Ext.layout.component.Tab": ["layout.tab"],
    "Ext.ComponentQuery": [],
    "Ext.draw.engine.SvgExporter": [],
    "Ext.grid.feature.Chunking": ["feature.chunking"],
    "Ext.layout.container.Auto": ["layout.auto", "layout.autocontainer"],
    "Ext.view.AbstractView": [],
    "Ext.util.Region": [],
    "Ext.fx.target.ElementCSS": [],
    "Ext.draw.Draw": [],
    "Ext.grid.PagingScroller": [],
    "Ext.layout.component.field.HtmlEditor": ["layout.htmleditor"],
    "Ext.data.proxy.SessionStorage": ["proxy.sessionstorage"],
    "Ext.app.EventBus": [],
    "Ext.menu.Separator": ["widget.menuseparator"],
    "Ext.direct.RemotingMethod": [],
    "Ext.direct.Event": ["direct.event"],
    "Ext.util.History": [],
    "Ext.dd.ScrollManager": [],
    "Ext.chart.Mask": [],
    "Ext.selection.CellModel": ["selection.cellmodel"],
    "Ext.view.TableLayout": ["layout.tableview"],
    "Ext.state.Provider": [],
    "Ext.layout.container.Editor": ["layout.editor"],
    "Ext.data.Errors": [],
    "Ext.selection.TreeModel": ["selection.treemodel"],
    "Ext.form.Labelable": [],
    "Ext.grid.column.Number": ["widget.numbercolumn"],
    "Ext.draw.engine.Svg": [],
    "Ext.grid.property.Grid": ["widget.propertygrid"],
    "Ext.FocusManager": [],
    "Ext.AbstractManager": [],
    "Ext.chart.series.Radar": ["series.radar"],
    "Ext.grid.property.Property": [],
    "Ext.chart.TipSurface": [],
    "Ext.grid.column.Boolean": ["widget.booleancolumn"],
    "Ext.direct.PollingProvider": ["direct.pollingprovider"],
    "Ext.grid.plugin.HeaderResizer": ["plugin.gridheaderresizer"],
    "Ext.data.writer.Xml": ["writer.xml"],
    "Ext.tree.Column": ["widget.treecolumn"],
    "Ext.slider.Multi": ["widget.multislider"],
    "Ext.panel.AbstractPanel": [],
    "Ext.layout.component.field.Slider": ["layout.sliderfield"],
    "Ext.chart.axis.Numeric": ["axis.numeric"],
    "Ext.layout.container.boxOverflow.Scroller": [],
    "Ext.data.Operation": [],
    "Ext.layout.container.HBox": ["layout.hbox"],
    "Ext.resizer.Resizer": [],
    "Ext.selection.RowModel": ["selection.rowmodel"],
    "Ext.layout.ContextItem": [],
    "Ext.util.MixedCollection": []
});