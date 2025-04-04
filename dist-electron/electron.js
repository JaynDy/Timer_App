import iu, { app as it, screen as ou, BrowserWindow as cu, ipcMain as yt } from "electron";
import _e from "path";
import { fileURLToPath as uu } from "url";
import Kc from "util";
import Vs from "fs";
import lu from "crypto";
import du from "assert";
import fu from "events";
import hu from "os";
function mu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ht = { exports: {} }, bn, xs;
function pu() {
  return xs || (xs = 1, bn = (e) => {
    const t = typeof e;
    return e !== null && (t === "object" || t === "function");
  }), bn;
}
var Pn, ea;
function yu() {
  if (ea) return Pn;
  ea = 1;
  const e = pu(), t = /* @__PURE__ */ new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]), l = (u) => !u.some((s) => t.has(s));
  function n(u) {
    const s = u.split("."), c = [];
    for (let o = 0; o < s.length; o++) {
      let i = s[o];
      for (; i[i.length - 1] === "\\" && s[o + 1] !== void 0; )
        i = i.slice(0, -1) + ".", i += s[++o];
      c.push(i);
    }
    return l(c) ? c : [];
  }
  return Pn = {
    get(u, s, c) {
      if (!e(u) || typeof s != "string")
        return c === void 0 ? u : c;
      const o = n(s);
      if (o.length !== 0) {
        for (let i = 0; i < o.length; i++)
          if (u = u[o[i]], u == null) {
            if (i !== o.length - 1)
              return c;
            break;
          }
        return u === void 0 ? c : u;
      }
    },
    set(u, s, c) {
      if (!e(u) || typeof s != "string")
        return u;
      const o = u, i = n(s);
      for (let p = 0; p < i.length; p++) {
        const a = i[p];
        e(u[a]) || (u[a] = {}), p === i.length - 1 && (u[a] = c), u = u[a];
      }
      return o;
    },
    delete(u, s) {
      if (!e(u) || typeof s != "string")
        return !1;
      const c = n(s);
      for (let o = 0; o < c.length; o++) {
        const i = c[o];
        if (o === c.length - 1)
          return delete u[i], !0;
        if (u = u[i], !e(u))
          return !1;
      }
    },
    has(u, s) {
      if (!e(u) || typeof s != "string")
        return !1;
      const c = n(s);
      if (c.length === 0)
        return !1;
      for (let o = 0; o < c.length; o++)
        if (e(u)) {
          if (!(c[o] in u))
            return !1;
          u = u[c[o]];
        } else
          return !1;
      return !0;
    }
  }, Pn;
}
var $t = { exports: {} }, vt = { exports: {} }, _t = { exports: {} }, gt = { exports: {} }, ta;
function $u() {
  if (ta) return gt.exports;
  ta = 1;
  const e = Vs;
  return gt.exports = (t) => new Promise((l) => {
    e.access(t, (n) => {
      l(!n);
    });
  }), gt.exports.sync = (t) => {
    try {
      return e.accessSync(t), !0;
    } catch {
      return !1;
    }
  }, gt.exports;
}
var wt = { exports: {} }, Et = { exports: {} }, ra;
function vu() {
  if (ra) return Et.exports;
  ra = 1;
  const e = (t, ...l) => new Promise((n) => {
    n(t(...l));
  });
  return Et.exports = e, Et.exports.default = e, Et.exports;
}
var na;
function _u() {
  if (na) return wt.exports;
  na = 1;
  const e = vu(), t = (l) => {
    if (!((Number.isInteger(l) || l === 1 / 0) && l > 0))
      return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
    const n = [];
    let u = 0;
    const s = () => {
      u--, n.length > 0 && n.shift()();
    }, c = (p, a, ...y) => {
      u++;
      const E = e(p, ...y);
      a(E), E.then(s, s);
    }, o = (p, a, ...y) => {
      u < l ? c(p, a, ...y) : n.push(c.bind(null, p, a, ...y));
    }, i = (p, ...a) => new Promise((y) => o(p, y, ...a));
    return Object.defineProperties(i, {
      activeCount: {
        get: () => u
      },
      pendingCount: {
        get: () => n.length
      },
      clearQueue: {
        value: () => {
          n.length = 0;
        }
      }
    }), i;
  };
  return wt.exports = t, wt.exports.default = t, wt.exports;
}
var Rn, sa;
function gu() {
  if (sa) return Rn;
  sa = 1;
  const e = _u();
  class t extends Error {
    constructor(s) {
      super(), this.value = s;
    }
  }
  const l = (u, s) => Promise.resolve(u).then(s), n = (u) => Promise.all(u).then((s) => s[1] === !0 && Promise.reject(new t(s[0])));
  return Rn = (u, s, c) => {
    c = Object.assign({
      concurrency: 1 / 0,
      preserveOrder: !0
    }, c);
    const o = e(c.concurrency), i = [...u].map((a) => [a, o(l, a, s)]), p = e(c.preserveOrder ? 1 : 1 / 0);
    return Promise.all(i.map((a) => p(n, a))).then(() => {
    }).catch((a) => a instanceof t ? a.value : Promise.reject(a));
  }, Rn;
}
var aa;
function wu() {
  if (aa) return _t.exports;
  aa = 1;
  const e = _e, t = $u(), l = gu();
  return _t.exports = (n, u) => (u = Object.assign({
    cwd: process.cwd()
  }, u), l(n, (s) => t(e.resolve(u.cwd, s)), u)), _t.exports.sync = (n, u) => {
    u = Object.assign({
      cwd: process.cwd()
    }, u);
    for (const s of n)
      if (t.sync(e.resolve(u.cwd, s)))
        return s;
  }, _t.exports;
}
var ia;
function Eu() {
  if (ia) return vt.exports;
  ia = 1;
  const e = _e, t = wu();
  return vt.exports = (l, n = {}) => {
    const u = e.resolve(n.cwd || ""), { root: s } = e.parse(u), c = [].concat(l);
    return new Promise((o) => {
      (function i(p) {
        t(c, { cwd: p }).then((a) => {
          a ? o(e.join(p, a)) : p === s ? o(null) : i(e.dirname(p));
        });
      })(u);
    });
  }, vt.exports.sync = (l, n = {}) => {
    let u = e.resolve(n.cwd || "");
    const { root: s } = e.parse(u), c = [].concat(l);
    for (; ; ) {
      const o = t.sync(c, { cwd: u });
      if (o)
        return e.join(u, o);
      if (u === s)
        return null;
      u = e.dirname(u);
    }
  }, vt.exports;
}
var oa;
function Su() {
  if (oa) return $t.exports;
  oa = 1;
  const e = Eu();
  return $t.exports = async ({ cwd: t } = {}) => e("package.json", { cwd: t }), $t.exports.sync = ({ cwd: t } = {}) => e.sync("package.json", { cwd: t }), $t.exports;
}
var St = { exports: {} }, ca;
function bu() {
  if (ca) return St.exports;
  ca = 1;
  const e = _e, t = hu, l = t.homedir(), n = t.tmpdir(), { env: u } = process, s = (p) => {
    const a = e.join(l, "Library");
    return {
      data: e.join(a, "Application Support", p),
      config: e.join(a, "Preferences", p),
      cache: e.join(a, "Caches", p),
      log: e.join(a, "Logs", p),
      temp: e.join(n, p)
    };
  }, c = (p) => {
    const a = u.APPDATA || e.join(l, "AppData", "Roaming"), y = u.LOCALAPPDATA || e.join(l, "AppData", "Local");
    return {
      // Data/config/cache/log are invented by me as Windows isn't opinionated about this
      data: e.join(y, p, "Data"),
      config: e.join(a, p, "Config"),
      cache: e.join(y, p, "Cache"),
      log: e.join(y, p, "Log"),
      temp: e.join(n, p)
    };
  }, o = (p) => {
    const a = e.basename(l);
    return {
      data: e.join(u.XDG_DATA_HOME || e.join(l, ".local", "share"), p),
      config: e.join(u.XDG_CONFIG_HOME || e.join(l, ".config"), p),
      cache: e.join(u.XDG_CACHE_HOME || e.join(l, ".cache"), p),
      // https://wiki.debian.org/XDGBaseDirectorySpecification#state
      log: e.join(u.XDG_STATE_HOME || e.join(l, ".local", "state"), p),
      temp: e.join(n, a, p)
    };
  }, i = (p, a) => {
    if (typeof p != "string")
      throw new TypeError(`Expected string, got ${typeof p}`);
    return a = Object.assign({ suffix: "nodejs" }, a), a.suffix && (p += `-${a.suffix}`), process.platform === "darwin" ? s(p) : process.platform === "win32" ? c(p) : o(p);
  };
  return St.exports = i, St.exports.default = i, St.exports;
}
var be = {}, de = {}, ua;
function mt() {
  if (ua) return de;
  ua = 1, Object.defineProperty(de, "__esModule", { value: !0 }), de.NOOP = de.LIMIT_FILES_DESCRIPTORS = de.LIMIT_BASENAME_LENGTH = de.IS_USER_ROOT = de.IS_POSIX = de.DEFAULT_TIMEOUT_SYNC = de.DEFAULT_TIMEOUT_ASYNC = de.DEFAULT_WRITE_OPTIONS = de.DEFAULT_READ_OPTIONS = de.DEFAULT_FOLDER_MODE = de.DEFAULT_FILE_MODE = de.DEFAULT_ENCODING = void 0;
  const e = "utf8";
  de.DEFAULT_ENCODING = e;
  const t = 438;
  de.DEFAULT_FILE_MODE = t;
  const l = 511;
  de.DEFAULT_FOLDER_MODE = l;
  const n = {};
  de.DEFAULT_READ_OPTIONS = n;
  const u = {};
  de.DEFAULT_WRITE_OPTIONS = u;
  const s = 5e3;
  de.DEFAULT_TIMEOUT_ASYNC = s;
  const c = 100;
  de.DEFAULT_TIMEOUT_SYNC = c;
  const o = !!process.getuid;
  de.IS_POSIX = o;
  const i = process.getuid ? !process.getuid() : !1;
  de.IS_USER_ROOT = i;
  const p = 128;
  de.LIMIT_BASENAME_LENGTH = p;
  const a = 1e4;
  de.LIMIT_FILES_DESCRIPTORS = a;
  const y = () => {
  };
  return de.NOOP = y, de;
}
var bt = {}, Ge = {}, la;
function Pu() {
  if (la) return Ge;
  la = 1, Object.defineProperty(Ge, "__esModule", { value: !0 }), Ge.attemptifySync = Ge.attemptifyAsync = void 0;
  const e = mt(), t = (n, u = e.NOOP) => function() {
    return n.apply(void 0, arguments).catch(u);
  };
  Ge.attemptifyAsync = t;
  const l = (n, u = e.NOOP) => function() {
    try {
      return n.apply(void 0, arguments);
    } catch (s) {
      return u(s);
    }
  };
  return Ge.attemptifySync = l, Ge;
}
var Pt = {}, da;
function Ru() {
  if (da) return Pt;
  da = 1, Object.defineProperty(Pt, "__esModule", { value: !0 });
  const e = mt(), t = {
    isChangeErrorOk: (l) => {
      const { code: n } = l;
      return n === "ENOSYS" || !e.IS_USER_ROOT && (n === "EINVAL" || n === "EPERM");
    },
    isRetriableError: (l) => {
      const { code: n } = l;
      return n === "EMFILE" || n === "ENFILE" || n === "EAGAIN" || n === "EBUSY" || n === "EACCESS" || n === "EACCS" || n === "EPERM";
    },
    onChangeError: (l) => {
      if (!t.isChangeErrorOk(l))
        throw l;
    }
  };
  return Pt.default = t, Pt;
}
var He = {}, Rt = {}, fa;
function Nu() {
  if (fa) return Rt;
  fa = 1, Object.defineProperty(Rt, "__esModule", { value: !0 });
  const t = {
    interval: 25,
    intervalId: void 0,
    limit: mt().LIMIT_FILES_DESCRIPTORS,
    queueActive: /* @__PURE__ */ new Set(),
    queueWaiting: /* @__PURE__ */ new Set(),
    init: () => {
      t.intervalId || (t.intervalId = setInterval(t.tick, t.interval));
    },
    reset: () => {
      t.intervalId && (clearInterval(t.intervalId), delete t.intervalId);
    },
    add: (l) => {
      t.queueWaiting.add(l), t.queueActive.size < t.limit / 2 ? t.tick() : t.init();
    },
    remove: (l) => {
      t.queueWaiting.delete(l), t.queueActive.delete(l);
    },
    schedule: () => new Promise((l) => {
      const n = () => t.remove(u), u = () => l(n);
      t.add(u);
    }),
    tick: () => {
      if (!(t.queueActive.size >= t.limit)) {
        if (!t.queueWaiting.size)
          return t.reset();
        for (const l of t.queueWaiting) {
          if (t.queueActive.size >= t.limit)
            break;
          t.queueWaiting.delete(l), t.queueActive.add(l), l();
        }
      }
    }
  };
  return Rt.default = t, Rt;
}
var ha;
function Ou() {
  if (ha) return He;
  ha = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.retryifySync = He.retryifyAsync = void 0;
  const e = Nu(), t = (n, u) => function(s) {
    return function c() {
      return e.default.schedule().then((o) => n.apply(void 0, arguments).then((i) => (o(), i), (i) => {
        if (o(), Date.now() >= s)
          throw i;
        if (u(i)) {
          const p = Math.round(100 + 400 * Math.random());
          return new Promise((y) => setTimeout(y, p)).then(() => c.apply(void 0, arguments));
        }
        throw i;
      }));
    };
  };
  He.retryifyAsync = t;
  const l = (n, u) => function(s) {
    return function c() {
      try {
        return n.apply(void 0, arguments);
      } catch (o) {
        if (Date.now() > s)
          throw o;
        if (u(o))
          return c.apply(void 0, arguments);
        throw o;
      }
    };
  };
  return He.retryifySync = l, He;
}
var ma;
function Gc() {
  if (ma) return bt;
  ma = 1, Object.defineProperty(bt, "__esModule", { value: !0 });
  const e = Vs, t = Kc, l = Pu(), n = Ru(), u = Ou(), s = {
    chmodAttempt: l.attemptifyAsync(t.promisify(e.chmod), n.default.onChangeError),
    chownAttempt: l.attemptifyAsync(t.promisify(e.chown), n.default.onChangeError),
    closeAttempt: l.attemptifyAsync(t.promisify(e.close)),
    fsyncAttempt: l.attemptifyAsync(t.promisify(e.fsync)),
    mkdirAttempt: l.attemptifyAsync(t.promisify(e.mkdir)),
    realpathAttempt: l.attemptifyAsync(t.promisify(e.realpath)),
    statAttempt: l.attemptifyAsync(t.promisify(e.stat)),
    unlinkAttempt: l.attemptifyAsync(t.promisify(e.unlink)),
    closeRetry: u.retryifyAsync(t.promisify(e.close), n.default.isRetriableError),
    fsyncRetry: u.retryifyAsync(t.promisify(e.fsync), n.default.isRetriableError),
    openRetry: u.retryifyAsync(t.promisify(e.open), n.default.isRetriableError),
    readFileRetry: u.retryifyAsync(t.promisify(e.readFile), n.default.isRetriableError),
    renameRetry: u.retryifyAsync(t.promisify(e.rename), n.default.isRetriableError),
    statRetry: u.retryifyAsync(t.promisify(e.stat), n.default.isRetriableError),
    writeRetry: u.retryifyAsync(t.promisify(e.write), n.default.isRetriableError),
    chmodSyncAttempt: l.attemptifySync(e.chmodSync, n.default.onChangeError),
    chownSyncAttempt: l.attemptifySync(e.chownSync, n.default.onChangeError),
    closeSyncAttempt: l.attemptifySync(e.closeSync),
    mkdirSyncAttempt: l.attemptifySync(e.mkdirSync),
    realpathSyncAttempt: l.attemptifySync(e.realpathSync),
    statSyncAttempt: l.attemptifySync(e.statSync),
    unlinkSyncAttempt: l.attemptifySync(e.unlinkSync),
    closeSyncRetry: u.retryifySync(e.closeSync, n.default.isRetriableError),
    fsyncSyncRetry: u.retryifySync(e.fsyncSync, n.default.isRetriableError),
    openSyncRetry: u.retryifySync(e.openSync, n.default.isRetriableError),
    readFileSyncRetry: u.retryifySync(e.readFileSync, n.default.isRetriableError),
    renameSyncRetry: u.retryifySync(e.renameSync, n.default.isRetriableError),
    statSyncRetry: u.retryifySync(e.statSync, n.default.isRetriableError),
    writeSyncRetry: u.retryifySync(e.writeSync, n.default.isRetriableError)
  };
  return bt.default = s, bt;
}
var Nt = {}, pa;
function Iu() {
  if (pa) return Nt;
  pa = 1, Object.defineProperty(Nt, "__esModule", { value: !0 });
  const e = {
    isFunction: (t) => typeof t == "function",
    isString: (t) => typeof t == "string",
    isUndefined: (t) => typeof t > "u"
  };
  return Nt.default = e, Nt;
}
var Ot = {}, ya;
function Tu() {
  if (ya) return Ot;
  ya = 1, Object.defineProperty(Ot, "__esModule", { value: !0 });
  const e = {}, t = {
    next: (l) => {
      const n = e[l];
      if (!n)
        return;
      n.shift();
      const u = n[0];
      u ? u(() => t.next(l)) : delete e[l];
    },
    schedule: (l) => new Promise((n) => {
      let u = e[l];
      u || (u = e[l] = []), u.push(n), !(u.length > 1) && n(() => t.next(l));
    })
  };
  return Ot.default = t, Ot;
}
var It = {}, $a;
function ju() {
  if ($a) return It;
  $a = 1, Object.defineProperty(It, "__esModule", { value: !0 });
  const e = _e, t = mt(), l = Gc(), n = {
    store: {},
    create: (u) => {
      const s = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), c = Date.now().toString().slice(-10), o = "tmp-", i = `.${o}${c}${s}`;
      return `${u}${i}`;
    },
    get: (u, s, c = !0) => {
      const o = n.truncate(s(u));
      return o in n.store ? n.get(u, s, c) : (n.store[o] = c, [o, () => delete n.store[o]]);
    },
    purge: (u) => {
      n.store[u] && (delete n.store[u], l.default.unlinkAttempt(u));
    },
    purgeSync: (u) => {
      n.store[u] && (delete n.store[u], l.default.unlinkSyncAttempt(u));
    },
    purgeSyncAll: () => {
      for (const u in n.store)
        n.purgeSync(u);
    },
    truncate: (u) => {
      const s = e.basename(u);
      if (s.length <= t.LIMIT_BASENAME_LENGTH)
        return u;
      const c = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(s);
      if (!c)
        return u;
      const o = s.length - t.LIMIT_BASENAME_LENGTH;
      return `${u.slice(0, -s.length)}${c[1]}${c[2].slice(0, -o)}${c[3]}`;
    }
  };
  return process.on("exit", n.purgeSyncAll), It.default = n, It;
}
var va;
function Au() {
  if (va) return be;
  va = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.writeFileSync = be.writeFile = be.readFileSync = be.readFile = void 0;
  const e = _e, t = mt(), l = Gc(), n = Iu(), u = Tu(), s = ju();
  function c(y, E = t.DEFAULT_READ_OPTIONS) {
    var w;
    if (n.default.isString(E))
      return c(y, { encoding: E });
    const P = Date.now() + ((w = E.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_ASYNC);
    return l.default.readFileRetry(P)(y, E);
  }
  be.readFile = c;
  function o(y, E = t.DEFAULT_READ_OPTIONS) {
    var w;
    if (n.default.isString(E))
      return o(y, { encoding: E });
    const P = Date.now() + ((w = E.timeout) !== null && w !== void 0 ? w : t.DEFAULT_TIMEOUT_SYNC);
    return l.default.readFileSyncRetry(P)(y, E);
  }
  be.readFileSync = o;
  const i = (y, E, w, P) => {
    if (n.default.isFunction(w))
      return i(y, E, t.DEFAULT_WRITE_OPTIONS, w);
    const v = p(y, E, w);
    return P && v.then(P, P), v;
  };
  be.writeFile = i;
  const p = async (y, E, w = t.DEFAULT_WRITE_OPTIONS) => {
    var P;
    if (n.default.isString(w))
      return p(y, E, { encoding: w });
    const v = Date.now() + ((P = w.timeout) !== null && P !== void 0 ? P : t.DEFAULT_TIMEOUT_ASYNC);
    let h = null, f = null, r = null, d = null, _ = null;
    try {
      w.schedule && (h = await w.schedule(y)), f = await u.default.schedule(y), y = await l.default.realpathAttempt(y) || y, [d, r] = s.default.get(y, w.tmpCreate || s.default.create, w.tmpPurge !== !1);
      const g = t.IS_POSIX && n.default.isUndefined(w.chown), $ = n.default.isUndefined(w.mode);
      if (g || $) {
        const I = await l.default.statAttempt(y);
        I && (w = { ...w }, g && (w.chown = { uid: I.uid, gid: I.gid }), $ && (w.mode = I.mode));
      }
      const b = e.dirname(y);
      await l.default.mkdirAttempt(b, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), _ = await l.default.openRetry(v)(d, "w", w.mode || t.DEFAULT_FILE_MODE), w.tmpCreated && w.tmpCreated(d), n.default.isString(E) ? await l.default.writeRetry(v)(_, E, 0, w.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(E) || await l.default.writeRetry(v)(_, E, 0, E.length, 0), w.fsync !== !1 && (w.fsyncWait !== !1 ? await l.default.fsyncRetry(v)(_) : l.default.fsyncAttempt(_)), await l.default.closeRetry(v)(_), _ = null, w.chown && await l.default.chownAttempt(d, w.chown.uid, w.chown.gid), w.mode && await l.default.chmodAttempt(d, w.mode);
      try {
        await l.default.renameRetry(v)(d, y);
      } catch (I) {
        if (I.code !== "ENAMETOOLONG")
          throw I;
        await l.default.renameRetry(v)(d, s.default.truncate(y));
      }
      r(), d = null;
    } finally {
      _ && await l.default.closeAttempt(_), d && s.default.purge(d), h && h(), f && f();
    }
  }, a = (y, E, w = t.DEFAULT_WRITE_OPTIONS) => {
    var P;
    if (n.default.isString(w))
      return a(y, E, { encoding: w });
    const v = Date.now() + ((P = w.timeout) !== null && P !== void 0 ? P : t.DEFAULT_TIMEOUT_SYNC);
    let h = null, f = null, r = null;
    try {
      y = l.default.realpathSyncAttempt(y) || y, [f, h] = s.default.get(y, w.tmpCreate || s.default.create, w.tmpPurge !== !1);
      const d = t.IS_POSIX && n.default.isUndefined(w.chown), _ = n.default.isUndefined(w.mode);
      if (d || _) {
        const $ = l.default.statSyncAttempt(y);
        $ && (w = { ...w }, d && (w.chown = { uid: $.uid, gid: $.gid }), _ && (w.mode = $.mode));
      }
      const g = e.dirname(y);
      l.default.mkdirSyncAttempt(g, {
        mode: t.DEFAULT_FOLDER_MODE,
        recursive: !0
      }), r = l.default.openSyncRetry(v)(f, "w", w.mode || t.DEFAULT_FILE_MODE), w.tmpCreated && w.tmpCreated(f), n.default.isString(E) ? l.default.writeSyncRetry(v)(r, E, 0, w.encoding || t.DEFAULT_ENCODING) : n.default.isUndefined(E) || l.default.writeSyncRetry(v)(r, E, 0, E.length, 0), w.fsync !== !1 && (w.fsyncWait !== !1 ? l.default.fsyncSyncRetry(v)(r) : l.default.fsyncAttempt(r)), l.default.closeSyncRetry(v)(r), r = null, w.chown && l.default.chownSyncAttempt(f, w.chown.uid, w.chown.gid), w.mode && l.default.chmodSyncAttempt(f, w.mode);
      try {
        l.default.renameSyncRetry(v)(f, y);
      } catch ($) {
        if ($.code !== "ENAMETOOLONG")
          throw $;
        l.default.renameSyncRetry(v)(f, s.default.truncate(y));
      }
      h(), f = null;
    } finally {
      r && l.default.closeSyncAttempt(r), f && s.default.purge(f);
    }
  };
  return be.writeFileSync = a, be;
}
var Tt = { exports: {} }, Nn = {}, je = {}, We = {}, On = {}, In = {}, Tn = {}, _a;
function nn() {
  return _a || (_a = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class l extends t {
      constructor(r) {
        if (super(), !e.IDENTIFIER.test(r))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = r;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = l;
    class n extends t {
      constructor(r) {
        super(), this._items = typeof r == "string" ? [r] : r;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const r = this._items[0];
        return r === "" || r === '""';
      }
      get str() {
        var r;
        return (r = this._str) !== null && r !== void 0 ? r : this._str = this._items.reduce((d, _) => `${d}${_}`, "");
      }
      get names() {
        var r;
        return (r = this._names) !== null && r !== void 0 ? r : this._names = this._items.reduce((d, _) => (_ instanceof l && (d[_.str] = (d[_.str] || 0) + 1), d), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function u(f, ...r) {
      const d = [f[0]];
      let _ = 0;
      for (; _ < r.length; )
        o(d, r[_]), d.push(f[++_]);
      return new n(d);
    }
    e._ = u;
    const s = new n("+");
    function c(f, ...r) {
      const d = [w(f[0])];
      let _ = 0;
      for (; _ < r.length; )
        d.push(s), o(d, r[_]), d.push(s, w(f[++_]));
      return i(d), new n(d);
    }
    e.str = c;
    function o(f, r) {
      r instanceof n ? f.push(...r._items) : r instanceof l ? f.push(r) : f.push(y(r));
    }
    e.addCodeArg = o;
    function i(f) {
      let r = 1;
      for (; r < f.length - 1; ) {
        if (f[r] === s) {
          const d = p(f[r - 1], f[r + 1]);
          if (d !== void 0) {
            f.splice(r - 1, 3, d);
            continue;
          }
          f[r++] = "+";
        }
        r++;
      }
    }
    function p(f, r) {
      if (r === '""')
        return f;
      if (f === '""')
        return r;
      if (typeof f == "string")
        return r instanceof l || f[f.length - 1] !== '"' ? void 0 : typeof r != "string" ? `${f.slice(0, -1)}${r}"` : r[0] === '"' ? f.slice(0, -1) + r.slice(1) : void 0;
      if (typeof r == "string" && r[0] === '"' && !(f instanceof l))
        return `"${f}${r.slice(1)}`;
    }
    function a(f, r) {
      return r.emptyStr() ? f : f.emptyStr() ? r : c`${f}${r}`;
    }
    e.strConcat = a;
    function y(f) {
      return typeof f == "number" || typeof f == "boolean" || f === null ? f : w(Array.isArray(f) ? f.join(",") : f);
    }
    function E(f) {
      return new n(w(f));
    }
    e.stringify = E;
    function w(f) {
      return JSON.stringify(f).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = w;
    function P(f) {
      return typeof f == "string" && e.IDENTIFIER.test(f) ? new n(`.${f}`) : u`[${f}]`;
    }
    e.getProperty = P;
    function v(f) {
      if (typeof f == "string" && e.IDENTIFIER.test(f))
        return new n(`${f}`);
      throw new Error(`CodeGen: invalid export name: ${f}, use explicit $id name mapping`);
    }
    e.getEsmExportName = v;
    function h(f) {
      return new n(f.toString());
    }
    e.regexpCode = h;
  }(Tn)), Tn;
}
var jn = {}, ga;
function wa() {
  return ga || (ga = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = nn();
    class l extends Error {
      constructor(p) {
        super(`CodeGen: "code" for ${p} not defined`), this.value = p.value;
      }
    }
    var n;
    (function(i) {
      i[i.Started = 0] = "Started", i[i.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class u {
      constructor({ prefixes: p, parent: a } = {}) {
        this._names = {}, this._prefixes = p, this._parent = a;
      }
      toName(p) {
        return p instanceof t.Name ? p : this.name(p);
      }
      name(p) {
        return new t.Name(this._newName(p));
      }
      _newName(p) {
        const a = this._names[p] || this._nameGroup(p);
        return `${p}${a.index++}`;
      }
      _nameGroup(p) {
        var a, y;
        if (!((y = (a = this._parent) === null || a === void 0 ? void 0 : a._prefixes) === null || y === void 0) && y.has(p) || this._prefixes && !this._prefixes.has(p))
          throw new Error(`CodeGen: prefix "${p}" is not allowed in this scope`);
        return this._names[p] = { prefix: p, index: 0 };
      }
    }
    e.Scope = u;
    class s extends t.Name {
      constructor(p, a) {
        super(a), this.prefix = p;
      }
      setValue(p, { property: a, itemIndex: y }) {
        this.value = p, this.scopePath = (0, t._)`.${new t.Name(a)}[${y}]`;
      }
    }
    e.ValueScopeName = s;
    const c = (0, t._)`\n`;
    class o extends u {
      constructor(p) {
        super(p), this._values = {}, this._scope = p.scope, this.opts = { ...p, _n: p.lines ? c : t.nil };
      }
      get() {
        return this._scope;
      }
      name(p) {
        return new s(p, this._newName(p));
      }
      value(p, a) {
        var y;
        if (a.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(p), { prefix: w } = E, P = (y = a.key) !== null && y !== void 0 ? y : a.ref;
        let v = this._values[w];
        if (v) {
          const r = v.get(P);
          if (r)
            return r;
        } else
          v = this._values[w] = /* @__PURE__ */ new Map();
        v.set(P, E);
        const h = this._scope[w] || (this._scope[w] = []), f = h.length;
        return h[f] = a.ref, E.setValue(a, { property: w, itemIndex: f }), E;
      }
      getValue(p, a) {
        const y = this._values[p];
        if (y)
          return y.get(a);
      }
      scopeRefs(p, a = this._values) {
        return this._reduceValues(a, (y) => {
          if (y.scopePath === void 0)
            throw new Error(`CodeGen: name "${y}" has no value`);
          return (0, t._)`${p}${y.scopePath}`;
        });
      }
      scopeCode(p = this._values, a, y) {
        return this._reduceValues(p, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, a, y);
      }
      _reduceValues(p, a, y = {}, E) {
        let w = t.nil;
        for (const P in p) {
          const v = p[P];
          if (!v)
            continue;
          const h = y[P] = y[P] || /* @__PURE__ */ new Map();
          v.forEach((f) => {
            if (h.has(f))
              return;
            h.set(f, n.Started);
            let r = a(f);
            if (r) {
              const d = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              w = (0, t._)`${w}${d} ${f} = ${r};${this.opts._n}`;
            } else if (r = E == null ? void 0 : E(f))
              w = (0, t._)`${w}${r}${this.opts._n}`;
            else
              throw new l(f);
            h.set(f, n.Completed);
          });
        }
        return w;
      }
    }
    e.ValueScope = o;
  }(jn)), jn;
}
var Ea;
function re() {
  return Ea || (Ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = nn(), l = wa();
    var n = nn();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var u = wa();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return u.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return u.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return u.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return u.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames(m, S) {
        return this;
      }
    }
    class c extends s {
      constructor(m, S, q) {
        super(), this.varKind = m, this.name = S, this.rhs = q;
      }
      render({ es5: m, _n: S }) {
        const q = m ? l.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${q} ${this.name}${K};` + S;
      }
      optimizeNames(m, S) {
        if (m[this.name.str])
          return this.rhs && (this.rhs = F(this.rhs, m, S)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class o extends s {
      constructor(m, S, q) {
        super(), this.lhs = m, this.rhs = S, this.sideEffects = q;
      }
      render({ _n: m }) {
        return `${this.lhs} = ${this.rhs};` + m;
      }
      optimizeNames(m, S) {
        if (!(this.lhs instanceof t.Name && !m[this.lhs.str] && !this.sideEffects))
          return this.rhs = F(this.rhs, m, S), this;
      }
      get names() {
        const m = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return W(m, this.rhs);
      }
    }
    class i extends o {
      constructor(m, S, q, K) {
        super(m, q, K), this.op = S;
      }
      render({ _n: m }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + m;
      }
    }
    class p extends s {
      constructor(m) {
        super(), this.label = m, this.names = {};
      }
      render({ _n: m }) {
        return `${this.label}:` + m;
      }
    }
    class a extends s {
      constructor(m) {
        super(), this.label = m, this.names = {};
      }
      render({ _n: m }) {
        return `break${this.label ? ` ${this.label}` : ""};` + m;
      }
    }
    class y extends s {
      constructor(m) {
        super(), this.error = m;
      }
      render({ _n: m }) {
        return `throw ${this.error};` + m;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends s {
      constructor(m) {
        super(), this.code = m;
      }
      render({ _n: m }) {
        return `${this.code};` + m;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(m, S) {
        return this.code = F(this.code, m, S), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class w extends s {
      constructor(m = []) {
        super(), this.nodes = m;
      }
      render(m) {
        return this.nodes.reduce((S, q) => S + q.render(m), "");
      }
      optimizeNodes() {
        const { nodes: m } = this;
        let S = m.length;
        for (; S--; ) {
          const q = m[S].optimizeNodes();
          Array.isArray(q) ? m.splice(S, 1, ...q) : q ? m[S] = q : m.splice(S, 1);
        }
        return m.length > 0 ? this : void 0;
      }
      optimizeNames(m, S) {
        const { nodes: q } = this;
        let K = q.length;
        for (; K--; ) {
          const G = q[K];
          G.optimizeNames(m, S) || (z(m, G.names), q.splice(K, 1));
        }
        return q.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((m, S) => B(m, S.names), {});
      }
    }
    class P extends w {
      render(m) {
        return "{" + m._n + super.render(m) + "}" + m._n;
      }
    }
    class v extends w {
    }
    class h extends P {
    }
    h.kind = "else";
    class f extends P {
      constructor(m, S) {
        super(S), this.condition = m;
      }
      render(m) {
        let S = `if(${this.condition})` + super.render(m);
        return this.else && (S += "else " + this.else.render(m)), S;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const m = this.condition;
        if (m === !0)
          return this.nodes;
        let S = this.else;
        if (S) {
          const q = S.optimizeNodes();
          S = this.else = Array.isArray(q) ? new h(q) : q;
        }
        if (S)
          return m === !1 ? S instanceof f ? S : S.nodes : this.nodes.length ? this : new f(Y(m), S instanceof f ? [S] : S.nodes);
        if (!(m === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(m, S) {
        var q;
        if (this.else = (q = this.else) === null || q === void 0 ? void 0 : q.optimizeNames(m, S), !!(super.optimizeNames(m, S) || this.else))
          return this.condition = F(this.condition, m, S), this;
      }
      get names() {
        const m = super.names;
        return W(m, this.condition), this.else && B(m, this.else.names), m;
      }
    }
    f.kind = "if";
    class r extends P {
    }
    r.kind = "for";
    class d extends r {
      constructor(m) {
        super(), this.iteration = m;
      }
      render(m) {
        return `for(${this.iteration})` + super.render(m);
      }
      optimizeNames(m, S) {
        if (super.optimizeNames(m, S))
          return this.iteration = F(this.iteration, m, S), this;
      }
      get names() {
        return B(super.names, this.iteration.names);
      }
    }
    class _ extends r {
      constructor(m, S, q, K) {
        super(), this.varKind = m, this.name = S, this.from = q, this.to = K;
      }
      render(m) {
        const S = m.es5 ? l.varKinds.var : this.varKind, { name: q, from: K, to: G } = this;
        return `for(${S} ${q}=${K}; ${q}<${G}; ${q}++)` + super.render(m);
      }
      get names() {
        const m = W(super.names, this.from);
        return W(m, this.to);
      }
    }
    class g extends r {
      constructor(m, S, q, K) {
        super(), this.loop = m, this.varKind = S, this.name = q, this.iterable = K;
      }
      render(m) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(m);
      }
      optimizeNames(m, S) {
        if (super.optimizeNames(m, S))
          return this.iterable = F(this.iterable, m, S), this;
      }
      get names() {
        return B(super.names, this.iterable.names);
      }
    }
    class $ extends P {
      constructor(m, S, q) {
        super(), this.name = m, this.args = S, this.async = q;
      }
      render(m) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(m);
      }
    }
    $.kind = "func";
    class b extends w {
      render(m) {
        return "return " + super.render(m);
      }
    }
    b.kind = "return";
    class I extends P {
      render(m) {
        let S = "try" + super.render(m);
        return this.catch && (S += this.catch.render(m)), this.finally && (S += this.finally.render(m)), S;
      }
      optimizeNodes() {
        var m, S;
        return super.optimizeNodes(), (m = this.catch) === null || m === void 0 || m.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
      }
      optimizeNames(m, S) {
        var q, K;
        return super.optimizeNames(m, S), (q = this.catch) === null || q === void 0 || q.optimizeNames(m, S), (K = this.finally) === null || K === void 0 || K.optimizeNames(m, S), this;
      }
      get names() {
        const m = super.names;
        return this.catch && B(m, this.catch.names), this.finally && B(m, this.finally.names), m;
      }
    }
    class C extends P {
      constructor(m) {
        super(), this.error = m;
      }
      render(m) {
        return `catch(${this.error})` + super.render(m);
      }
    }
    C.kind = "catch";
    class M extends P {
      render(m) {
        return "finally" + super.render(m);
      }
    }
    M.kind = "finally";
    class V {
      constructor(m, S = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...S, _n: S.lines ? `
` : "" }, this._extScope = m, this._scope = new l.Scope({ parent: m }), this._nodes = [new v()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(m) {
        return this._scope.name(m);
      }
      // reserves unique name in the external scope
      scopeName(m) {
        return this._extScope.name(m);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(m, S) {
        const q = this._extScope.value(m, S);
        return (this._values[q.prefix] || (this._values[q.prefix] = /* @__PURE__ */ new Set())).add(q), q;
      }
      getScopeValue(m, S) {
        return this._extScope.getValue(m, S);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(m) {
        return this._extScope.scopeRefs(m, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(m, S, q, K) {
        const G = this._scope.toName(S);
        return q !== void 0 && K && (this._constants[G.str] = q), this._leafNode(new c(m, G, q)), G;
      }
      // `const` declaration (`var` in es5 mode)
      const(m, S, q) {
        return this._def(l.varKinds.const, m, S, q);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(m, S, q) {
        return this._def(l.varKinds.let, m, S, q);
      }
      // `var` declaration with optional assignment
      var(m, S, q) {
        return this._def(l.varKinds.var, m, S, q);
      }
      // assignment code
      assign(m, S, q) {
        return this._leafNode(new o(m, S, q));
      }
      // `+=` code
      add(m, S) {
        return this._leafNode(new i(m, e.operators.ADD, S));
      }
      // appends passed SafeExpr to code or executes Block
      code(m) {
        return typeof m == "function" ? m() : m !== t.nil && this._leafNode(new E(m)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...m) {
        const S = ["{"];
        for (const [q, K] of m)
          S.length > 1 && S.push(","), S.push(q), (q !== K || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, K));
        return S.push("}"), new t._Code(S);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(m, S, q) {
        if (this._blockNode(new f(m)), S && q)
          this.code(S).else().code(q).endIf();
        else if (S)
          this.code(S).endIf();
        else if (q)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(m) {
        return this._elseNode(new f(m));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new h());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(f, h);
      }
      _for(m, S) {
        return this._blockNode(m), S && this.code(S).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(m, S) {
        return this._for(new d(m), S);
      }
      // `for` statement for a range of values
      forRange(m, S, q, K, G = this.opts.es5 ? l.varKinds.var : l.varKinds.let) {
        const Z = this._scope.toName(m);
        return this._for(new _(G, Z, S, q), () => K(Z));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(m, S, q, K = l.varKinds.const) {
        const G = this._scope.toName(m);
        if (this.opts.es5) {
          const Z = S instanceof t.Name ? S : this.var("_arr", S);
          return this.forRange("_i", 0, (0, t._)`${Z}.length`, (Q) => {
            this.var(G, (0, t._)`${Z}[${Q}]`), q(G);
          });
        }
        return this._for(new g("of", K, G, S), () => q(G));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(m, S, q, K = this.opts.es5 ? l.varKinds.var : l.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(m, (0, t._)`Object.keys(${S})`, q);
        const G = this._scope.toName(m);
        return this._for(new g("in", K, G, S), () => q(G));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(r);
      }
      // `label` statement
      label(m) {
        return this._leafNode(new p(m));
      }
      // `break` statement
      break(m) {
        return this._leafNode(new a(m));
      }
      // `return` statement
      return(m) {
        const S = new b();
        if (this._blockNode(S), this.code(m), S.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(b);
      }
      // `try` statement
      try(m, S, q) {
        if (!S && !q)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new I();
        if (this._blockNode(K), this.code(m), S) {
          const G = this.name("e");
          this._currNode = K.catch = new C(G), S(G);
        }
        return q && (this._currNode = K.finally = new M(), this.code(q)), this._endBlockNode(C, M);
      }
      // `throw` statement
      throw(m) {
        return this._leafNode(new y(m));
      }
      // start self-balancing block
      block(m, S) {
        return this._blockStarts.push(this._nodes.length), m && this.code(m).endBlock(S), this;
      }
      // end the current self-balancing block
      endBlock(m) {
        const S = this._blockStarts.pop();
        if (S === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const q = this._nodes.length - S;
        if (q < 0 || m !== void 0 && q !== m)
          throw new Error(`CodeGen: wrong number of nodes: ${q} vs ${m} expected`);
        return this._nodes.length = S, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(m, S = t.nil, q, K) {
        return this._blockNode(new $(m, S, q)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode($);
      }
      optimize(m = 1) {
        for (; m-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(m) {
        return this._currNode.nodes.push(m), this;
      }
      _blockNode(m) {
        this._currNode.nodes.push(m), this._nodes.push(m);
      }
      _endBlockNode(m, S) {
        const q = this._currNode;
        if (q instanceof m || S && q instanceof S)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${S ? `${m.kind}/${S.kind}` : m.kind}"`);
      }
      _elseNode(m) {
        const S = this._currNode;
        if (!(S instanceof f))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = S.else = m, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const m = this._nodes;
        return m[m.length - 1];
      }
      set _currNode(m) {
        const S = this._nodes;
        S[S.length - 1] = m;
      }
    }
    e.CodeGen = V;
    function B(O, m) {
      for (const S in m)
        O[S] = (O[S] || 0) + (m[S] || 0);
      return O;
    }
    function W(O, m) {
      return m instanceof t._CodeOrName ? B(O, m.names) : O;
    }
    function F(O, m, S) {
      if (O instanceof t.Name)
        return q(O);
      if (!K(O))
        return O;
      return new t._Code(O._items.reduce((G, Z) => (Z instanceof t.Name && (Z = q(Z)), Z instanceof t._Code ? G.push(...Z._items) : G.push(Z), G), []));
      function q(G) {
        const Z = S[G.str];
        return Z === void 0 || m[G.str] !== 1 ? G : (delete m[G.str], Z);
      }
      function K(G) {
        return G instanceof t._Code && G._items.some((Z) => Z instanceof t.Name && m[Z.str] === 1 && S[Z.str] !== void 0);
      }
    }
    function z(O, m) {
      for (const S in m)
        O[S] = (O[S] || 0) - (m[S] || 0);
    }
    function Y(O) {
      return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${A(O)}`;
    }
    e.not = Y;
    const J = R(e.operators.AND);
    function D(...O) {
      return O.reduce(J);
    }
    e.and = D;
    const U = R(e.operators.OR);
    function j(...O) {
      return O.reduce(U);
    }
    e.or = j;
    function R(O) {
      return (m, S) => m === t.nil ? S : S === t.nil ? m : (0, t._)`${A(m)} ${O} ${A(S)}`;
    }
    function A(O) {
      return O instanceof t.Name ? O : (0, t._)`(${O})`;
    }
  }(In)), In;
}
var x = {}, Sa;
function ae() {
  if (Sa) return x;
  Sa = 1, Object.defineProperty(x, "__esModule", { value: !0 }), x.checkStrictMode = x.getErrorPath = x.Type = x.useFunc = x.setEvaluated = x.evaluatedPropsToName = x.mergeEvaluated = x.eachItem = x.unescapeJsonPointer = x.escapeJsonPointer = x.escapeFragment = x.unescapeFragment = x.schemaRefOrVal = x.schemaHasRulesButRef = x.schemaHasRules = x.checkUnknownRules = x.alwaysValidSchema = x.toHash = void 0;
  const e = re(), t = nn();
  function l(g) {
    const $ = {};
    for (const b of g)
      $[b] = !0;
    return $;
  }
  x.toHash = l;
  function n(g, $) {
    return typeof $ == "boolean" ? $ : Object.keys($).length === 0 ? !0 : (u(g, $), !s($, g.self.RULES.all));
  }
  x.alwaysValidSchema = n;
  function u(g, $ = g.schema) {
    const { opts: b, self: I } = g;
    if (!b.strictSchema || typeof $ == "boolean")
      return;
    const C = I.RULES.keywords;
    for (const M in $)
      C[M] || _(g, `unknown keyword: "${M}"`);
  }
  x.checkUnknownRules = u;
  function s(g, $) {
    if (typeof g == "boolean")
      return !g;
    for (const b in g)
      if ($[b])
        return !0;
    return !1;
  }
  x.schemaHasRules = s;
  function c(g, $) {
    if (typeof g == "boolean")
      return !g;
    for (const b in g)
      if (b !== "$ref" && $.all[b])
        return !0;
    return !1;
  }
  x.schemaHasRulesButRef = c;
  function o({ topSchemaRef: g, schemaPath: $ }, b, I, C) {
    if (!C) {
      if (typeof b == "number" || typeof b == "boolean")
        return b;
      if (typeof b == "string")
        return (0, e._)`${b}`;
    }
    return (0, e._)`${g}${$}${(0, e.getProperty)(I)}`;
  }
  x.schemaRefOrVal = o;
  function i(g) {
    return y(decodeURIComponent(g));
  }
  x.unescapeFragment = i;
  function p(g) {
    return encodeURIComponent(a(g));
  }
  x.escapeFragment = p;
  function a(g) {
    return typeof g == "number" ? `${g}` : g.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  x.escapeJsonPointer = a;
  function y(g) {
    return g.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  x.unescapeJsonPointer = y;
  function E(g, $) {
    if (Array.isArray(g))
      for (const b of g)
        $(b);
    else
      $(g);
  }
  x.eachItem = E;
  function w({ mergeNames: g, mergeToName: $, mergeValues: b, resultToName: I }) {
    return (C, M, V, B) => {
      const W = V === void 0 ? M : V instanceof e.Name ? (M instanceof e.Name ? g(C, M, V) : $(C, M, V), V) : M instanceof e.Name ? ($(C, V, M), M) : b(M, V);
      return B === e.Name && !(W instanceof e.Name) ? I(C, W) : W;
    };
  }
  x.mergeEvaluated = {
    props: w({
      mergeNames: (g, $, b) => g.if((0, e._)`${b} !== true && ${$} !== undefined`, () => {
        g.if((0, e._)`${$} === true`, () => g.assign(b, !0), () => g.assign(b, (0, e._)`${b} || {}`).code((0, e._)`Object.assign(${b}, ${$})`));
      }),
      mergeToName: (g, $, b) => g.if((0, e._)`${b} !== true`, () => {
        $ === !0 ? g.assign(b, !0) : (g.assign(b, (0, e._)`${b} || {}`), v(g, b, $));
      }),
      mergeValues: (g, $) => g === !0 ? !0 : { ...g, ...$ },
      resultToName: P
    }),
    items: w({
      mergeNames: (g, $, b) => g.if((0, e._)`${b} !== true && ${$} !== undefined`, () => g.assign(b, (0, e._)`${$} === true ? true : ${b} > ${$} ? ${b} : ${$}`)),
      mergeToName: (g, $, b) => g.if((0, e._)`${b} !== true`, () => g.assign(b, $ === !0 ? !0 : (0, e._)`${b} > ${$} ? ${b} : ${$}`)),
      mergeValues: (g, $) => g === !0 ? !0 : Math.max(g, $),
      resultToName: (g, $) => g.var("items", $)
    })
  };
  function P(g, $) {
    if ($ === !0)
      return g.var("props", !0);
    const b = g.var("props", (0, e._)`{}`);
    return $ !== void 0 && v(g, b, $), b;
  }
  x.evaluatedPropsToName = P;
  function v(g, $, b) {
    Object.keys(b).forEach((I) => g.assign((0, e._)`${$}${(0, e.getProperty)(I)}`, !0));
  }
  x.setEvaluated = v;
  const h = {};
  function f(g, $) {
    return g.scopeValue("func", {
      ref: $,
      code: h[$.code] || (h[$.code] = new t._Code($.code))
    });
  }
  x.useFunc = f;
  var r;
  (function(g) {
    g[g.Num = 0] = "Num", g[g.Str = 1] = "Str";
  })(r || (x.Type = r = {}));
  function d(g, $, b) {
    if (g instanceof e.Name) {
      const I = $ === r.Num;
      return b ? I ? (0, e._)`"[" + ${g} + "]"` : (0, e._)`"['" + ${g} + "']"` : I ? (0, e._)`"/" + ${g}` : (0, e._)`"/" + ${g}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return b ? (0, e.getProperty)(g).toString() : "/" + a(g);
  }
  x.getErrorPath = d;
  function _(g, $, b = g.opts.strictSchema) {
    if (b) {
      if ($ = `strict mode: ${$}`, b === !0)
        throw new Error($);
      g.self.logger.warn($);
    }
  }
  return x.checkStrictMode = _, x;
}
var jt = {}, ba;
function Fe() {
  if (ba) return jt;
  ba = 1, Object.defineProperty(jt, "__esModule", { value: !0 });
  const e = re(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return jt.default = t, jt;
}
var Pa;
function cn() {
  return Pa || (Pa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = re(), l = ae(), n = Fe();
    e.keywordError = {
      message: ({ keyword: h }) => (0, t.str)`must pass "${h}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: h, schemaType: f }) => f ? (0, t.str)`"${h}" keyword must be ${f} ($data)` : (0, t.str)`"${h}" keyword is invalid ($data)`
    };
    function u(h, f = e.keywordError, r, d) {
      const { it: _ } = h, { gen: g, compositeRule: $, allErrors: b } = _, I = y(h, f, r);
      d ?? ($ || b) ? i(g, I) : p(_, (0, t._)`[${I}]`);
    }
    e.reportError = u;
    function s(h, f = e.keywordError, r) {
      const { it: d } = h, { gen: _, compositeRule: g, allErrors: $ } = d, b = y(h, f, r);
      i(_, b), g || $ || p(d, n.default.vErrors);
    }
    e.reportExtraError = s;
    function c(h, f) {
      h.assign(n.default.errors, f), h.if((0, t._)`${n.default.vErrors} !== null`, () => h.if(f, () => h.assign((0, t._)`${n.default.vErrors}.length`, f), () => h.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = c;
    function o({ gen: h, keyword: f, schemaValue: r, data: d, errsCount: _, it: g }) {
      if (_ === void 0)
        throw new Error("ajv implementation error");
      const $ = h.name("err");
      h.forRange("i", _, n.default.errors, (b) => {
        h.const($, (0, t._)`${n.default.vErrors}[${b}]`), h.if((0, t._)`${$}.instancePath === undefined`, () => h.assign((0, t._)`${$}.instancePath`, (0, t.strConcat)(n.default.instancePath, g.errorPath))), h.assign((0, t._)`${$}.schemaPath`, (0, t.str)`${g.errSchemaPath}/${f}`), g.opts.verbose && (h.assign((0, t._)`${$}.schema`, r), h.assign((0, t._)`${$}.data`, d));
      });
    }
    e.extendErrors = o;
    function i(h, f) {
      const r = h.const("err", f);
      h.if((0, t._)`${n.default.vErrors} === null`, () => h.assign(n.default.vErrors, (0, t._)`[${r}]`), (0, t._)`${n.default.vErrors}.push(${r})`), h.code((0, t._)`${n.default.errors}++`);
    }
    function p(h, f) {
      const { gen: r, validateName: d, schemaEnv: _ } = h;
      _.$async ? r.throw((0, t._)`new ${h.ValidationError}(${f})`) : (r.assign((0, t._)`${d}.errors`, f), r.return(!1));
    }
    const a = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function y(h, f, r) {
      const { createErrors: d } = h.it;
      return d === !1 ? (0, t._)`{}` : E(h, f, r);
    }
    function E(h, f, r = {}) {
      const { gen: d, it: _ } = h, g = [
        w(_, r),
        P(h, r)
      ];
      return v(h, f, g), d.object(...g);
    }
    function w({ errorPath: h }, { instancePath: f }) {
      const r = f ? (0, t.str)`${h}${(0, l.getErrorPath)(f, l.Type.Str)}` : h;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, r)];
    }
    function P({ keyword: h, it: { errSchemaPath: f } }, { schemaPath: r, parentSchema: d }) {
      let _ = d ? f : (0, t.str)`${f}/${h}`;
      return r && (_ = (0, t.str)`${_}${(0, l.getErrorPath)(r, l.Type.Str)}`), [a.schemaPath, _];
    }
    function v(h, { params: f, message: r }, d) {
      const { keyword: _, data: g, schemaValue: $, it: b } = h, { opts: I, propertyName: C, topSchemaRef: M, schemaPath: V } = b;
      d.push([a.keyword, _], [a.params, typeof f == "function" ? f(h) : f || (0, t._)`{}`]), I.messages && d.push([a.message, typeof r == "function" ? r(h) : r]), I.verbose && d.push([a.schema, $], [a.parentSchema, (0, t._)`${M}${V}`], [n.default.data, g]), C && d.push([a.propertyName, C]);
    }
  }(On)), On;
}
var Ra;
function qu() {
  if (Ra) return We;
  Ra = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.boolOrEmptySchema = We.topBoolOrEmptySchema = void 0;
  const e = cn(), t = re(), l = Fe(), n = {
    message: "boolean schema is false"
  };
  function u(o) {
    const { gen: i, schema: p, validateName: a } = o;
    p === !1 ? c(o, !1) : typeof p == "object" && p.$async === !0 ? i.return(l.default.data) : (i.assign((0, t._)`${a}.errors`, null), i.return(!0));
  }
  We.topBoolOrEmptySchema = u;
  function s(o, i) {
    const { gen: p, schema: a } = o;
    a === !1 ? (p.var(i, !1), c(o)) : p.var(i, !0);
  }
  We.boolOrEmptySchema = s;
  function c(o, i) {
    const { gen: p, data: a } = o, y = {
      gen: p,
      keyword: "false schema",
      data: a,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(y, n, void 0, i);
  }
  return We;
}
var me = {}, Be = {}, Na;
function Hc() {
  if (Na) return Be;
  Na = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.getRules = Be.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function l(u) {
    return typeof u == "string" && t.has(u);
  }
  Be.isJSONType = l;
  function n() {
    const u = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...u, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, u.number, u.string, u.array, u.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Be.getRules = n, Be;
}
var Ae = {}, Oa;
function Wc() {
  if (Oa) return Ae;
  Oa = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.shouldUseRule = Ae.shouldUseGroup = Ae.schemaHasRulesForType = void 0;
  function e({ schema: n, self: u }, s) {
    const c = u.RULES.types[s];
    return c && c !== !0 && t(n, c);
  }
  Ae.schemaHasRulesForType = e;
  function t(n, u) {
    return u.rules.some((s) => l(n, s));
  }
  Ae.shouldUseGroup = t;
  function l(n, u) {
    var s;
    return n[u.keyword] !== void 0 || ((s = u.definition.implements) === null || s === void 0 ? void 0 : s.some((c) => n[c] !== void 0));
  }
  return Ae.shouldUseRule = l, Ae;
}
var Ia;
function sn() {
  if (Ia) return me;
  Ia = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.reportTypeError = me.checkDataTypes = me.checkDataType = me.coerceAndCheckDataType = me.getJSONTypes = me.getSchemaTypes = me.DataType = void 0;
  const e = Hc(), t = Wc(), l = cn(), n = re(), u = ae();
  var s;
  (function(r) {
    r[r.Correct = 0] = "Correct", r[r.Wrong = 1] = "Wrong";
  })(s || (me.DataType = s = {}));
  function c(r) {
    const d = o(r.type);
    if (d.includes("null")) {
      if (r.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!d.length && r.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      r.nullable === !0 && d.push("null");
    }
    return d;
  }
  me.getSchemaTypes = c;
  function o(r) {
    const d = Array.isArray(r) ? r : r ? [r] : [];
    if (d.every(e.isJSONType))
      return d;
    throw new Error("type must be JSONType or JSONType[]: " + d.join(","));
  }
  me.getJSONTypes = o;
  function i(r, d) {
    const { gen: _, data: g, opts: $ } = r, b = a(d, $.coerceTypes), I = d.length > 0 && !(b.length === 0 && d.length === 1 && (0, t.schemaHasRulesForType)(r, d[0]));
    if (I) {
      const C = P(d, g, $.strictNumbers, s.Wrong);
      _.if(C, () => {
        b.length ? y(r, d, b) : h(r);
      });
    }
    return I;
  }
  me.coerceAndCheckDataType = i;
  const p = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function a(r, d) {
    return d ? r.filter((_) => p.has(_) || d === "array" && _ === "array") : [];
  }
  function y(r, d, _) {
    const { gen: g, data: $, opts: b } = r, I = g.let("dataType", (0, n._)`typeof ${$}`), C = g.let("coerced", (0, n._)`undefined`);
    b.coerceTypes === "array" && g.if((0, n._)`${I} == 'object' && Array.isArray(${$}) && ${$}.length == 1`, () => g.assign($, (0, n._)`${$}[0]`).assign(I, (0, n._)`typeof ${$}`).if(P(d, $, b.strictNumbers), () => g.assign(C, $))), g.if((0, n._)`${C} !== undefined`);
    for (const V of _)
      (p.has(V) || V === "array" && b.coerceTypes === "array") && M(V);
    g.else(), h(r), g.endIf(), g.if((0, n._)`${C} !== undefined`, () => {
      g.assign($, C), E(r, C);
    });
    function M(V) {
      switch (V) {
        case "string":
          g.elseIf((0, n._)`${I} == "number" || ${I} == "boolean"`).assign(C, (0, n._)`"" + ${$}`).elseIf((0, n._)`${$} === null`).assign(C, (0, n._)`""`);
          return;
        case "number":
          g.elseIf((0, n._)`${I} == "boolean" || ${$} === null
              || (${I} == "string" && ${$} && ${$} == +${$})`).assign(C, (0, n._)`+${$}`);
          return;
        case "integer":
          g.elseIf((0, n._)`${I} === "boolean" || ${$} === null
              || (${I} === "string" && ${$} && ${$} == +${$} && !(${$} % 1))`).assign(C, (0, n._)`+${$}`);
          return;
        case "boolean":
          g.elseIf((0, n._)`${$} === "false" || ${$} === 0 || ${$} === null`).assign(C, !1).elseIf((0, n._)`${$} === "true" || ${$} === 1`).assign(C, !0);
          return;
        case "null":
          g.elseIf((0, n._)`${$} === "" || ${$} === 0 || ${$} === false`), g.assign(C, null);
          return;
        case "array":
          g.elseIf((0, n._)`${I} === "string" || ${I} === "number"
              || ${I} === "boolean" || ${$} === null`).assign(C, (0, n._)`[${$}]`);
      }
    }
  }
  function E({ gen: r, parentData: d, parentDataProperty: _ }, g) {
    r.if((0, n._)`${d} !== undefined`, () => r.assign((0, n._)`${d}[${_}]`, g));
  }
  function w(r, d, _, g = s.Correct) {
    const $ = g === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let b;
    switch (r) {
      case "null":
        return (0, n._)`${d} ${$} null`;
      case "array":
        b = (0, n._)`Array.isArray(${d})`;
        break;
      case "object":
        b = (0, n._)`${d} && typeof ${d} == "object" && !Array.isArray(${d})`;
        break;
      case "integer":
        b = I((0, n._)`!(${d} % 1) && !isNaN(${d})`);
        break;
      case "number":
        b = I();
        break;
      default:
        return (0, n._)`typeof ${d} ${$} ${r}`;
    }
    return g === s.Correct ? b : (0, n.not)(b);
    function I(C = n.nil) {
      return (0, n.and)((0, n._)`typeof ${d} == "number"`, C, _ ? (0, n._)`isFinite(${d})` : n.nil);
    }
  }
  me.checkDataType = w;
  function P(r, d, _, g) {
    if (r.length === 1)
      return w(r[0], d, _, g);
    let $;
    const b = (0, u.toHash)(r);
    if (b.array && b.object) {
      const I = (0, n._)`typeof ${d} != "object"`;
      $ = b.null ? I : (0, n._)`!${d} || ${I}`, delete b.null, delete b.array, delete b.object;
    } else
      $ = n.nil;
    b.number && delete b.integer;
    for (const I in b)
      $ = (0, n.and)($, w(I, d, _, g));
    return $;
  }
  me.checkDataTypes = P;
  const v = {
    message: ({ schema: r }) => `must be ${r}`,
    params: ({ schema: r, schemaValue: d }) => typeof r == "string" ? (0, n._)`{type: ${r}}` : (0, n._)`{type: ${d}}`
  };
  function h(r) {
    const d = f(r);
    (0, l.reportError)(d, v);
  }
  me.reportTypeError = h;
  function f(r) {
    const { gen: d, data: _, schema: g } = r, $ = (0, u.schemaRefOrVal)(r, g, "type");
    return {
      gen: d,
      keyword: "type",
      data: _,
      schema: g.type,
      schemaCode: $,
      schemaValue: $,
      parentSchema: g,
      params: {},
      it: r
    };
  }
  return me;
}
var ot = {}, Ta;
function Cu() {
  if (Ta) return ot;
  Ta = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.assignDefaults = void 0;
  const e = re(), t = ae();
  function l(u, s) {
    const { properties: c, items: o } = u.schema;
    if (s === "object" && c)
      for (const i in c)
        n(u, i, c[i].default);
    else s === "array" && Array.isArray(o) && o.forEach((i, p) => n(u, p, i.default));
  }
  ot.assignDefaults = l;
  function n(u, s, c) {
    const { gen: o, compositeRule: i, data: p, opts: a } = u;
    if (c === void 0)
      return;
    const y = (0, e._)`${p}${(0, e.getProperty)(s)}`;
    if (i) {
      (0, t.checkStrictMode)(u, `default is ignored for: ${y}`);
      return;
    }
    let E = (0, e._)`${y} === undefined`;
    a.useDefaults === "empty" && (E = (0, e._)`${E} || ${y} === null || ${y} === ""`), o.if(E, (0, e._)`${y} = ${(0, e.stringify)(c)}`);
  }
  return ot;
}
var Pe = {}, ue = {}, ja;
function Ne() {
  if (ja) return ue;
  ja = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.validateUnion = ue.validateArray = ue.usePattern = ue.callValidateCode = ue.schemaProperties = ue.allSchemaProperties = ue.noPropertyInData = ue.propertyInData = ue.isOwnProperty = ue.hasPropFunc = ue.reportMissingProp = ue.checkMissingProp = ue.checkReportMissingProp = void 0;
  const e = re(), t = ae(), l = Fe(), n = ae();
  function u(r, d) {
    const { gen: _, data: g, it: $ } = r;
    _.if(a(_, g, d, $.opts.ownProperties), () => {
      r.setParams({ missingProperty: (0, e._)`${d}` }, !0), r.error();
    });
  }
  ue.checkReportMissingProp = u;
  function s({ gen: r, data: d, it: { opts: _ } }, g, $) {
    return (0, e.or)(...g.map((b) => (0, e.and)(a(r, d, b, _.ownProperties), (0, e._)`${$} = ${b}`)));
  }
  ue.checkMissingProp = s;
  function c(r, d) {
    r.setParams({ missingProperty: d }, !0), r.error();
  }
  ue.reportMissingProp = c;
  function o(r) {
    return r.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ue.hasPropFunc = o;
  function i(r, d, _) {
    return (0, e._)`${o(r)}.call(${d}, ${_})`;
  }
  ue.isOwnProperty = i;
  function p(r, d, _, g) {
    const $ = (0, e._)`${d}${(0, e.getProperty)(_)} !== undefined`;
    return g ? (0, e._)`${$} && ${i(r, d, _)}` : $;
  }
  ue.propertyInData = p;
  function a(r, d, _, g) {
    const $ = (0, e._)`${d}${(0, e.getProperty)(_)} === undefined`;
    return g ? (0, e.or)($, (0, e.not)(i(r, d, _))) : $;
  }
  ue.noPropertyInData = a;
  function y(r) {
    return r ? Object.keys(r).filter((d) => d !== "__proto__") : [];
  }
  ue.allSchemaProperties = y;
  function E(r, d) {
    return y(d).filter((_) => !(0, t.alwaysValidSchema)(r, d[_]));
  }
  ue.schemaProperties = E;
  function w({ schemaCode: r, data: d, it: { gen: _, topSchemaRef: g, schemaPath: $, errorPath: b }, it: I }, C, M, V) {
    const B = V ? (0, e._)`${r}, ${d}, ${g}${$}` : d, W = [
      [l.default.instancePath, (0, e.strConcat)(l.default.instancePath, b)],
      [l.default.parentData, I.parentData],
      [l.default.parentDataProperty, I.parentDataProperty],
      [l.default.rootData, l.default.rootData]
    ];
    I.opts.dynamicRef && W.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
    const F = (0, e._)`${B}, ${_.object(...W)}`;
    return M !== e.nil ? (0, e._)`${C}.call(${M}, ${F})` : (0, e._)`${C}(${F})`;
  }
  ue.callValidateCode = w;
  const P = (0, e._)`new RegExp`;
  function v({ gen: r, it: { opts: d } }, _) {
    const g = d.unicodeRegExp ? "u" : "", { regExp: $ } = d.code, b = $(_, g);
    return r.scopeValue("pattern", {
      key: b.toString(),
      ref: b,
      code: (0, e._)`${$.code === "new RegExp" ? P : (0, n.useFunc)(r, $)}(${_}, ${g})`
    });
  }
  ue.usePattern = v;
  function h(r) {
    const { gen: d, data: _, keyword: g, it: $ } = r, b = d.name("valid");
    if ($.allErrors) {
      const C = d.let("valid", !0);
      return I(() => d.assign(C, !1)), C;
    }
    return d.var(b, !0), I(() => d.break()), b;
    function I(C) {
      const M = d.const("len", (0, e._)`${_}.length`);
      d.forRange("i", 0, M, (V) => {
        r.subschema({
          keyword: g,
          dataProp: V,
          dataPropType: t.Type.Num
        }, b), d.if((0, e.not)(b), C);
      });
    }
  }
  ue.validateArray = h;
  function f(r) {
    const { gen: d, schema: _, keyword: g, it: $ } = r;
    if (!Array.isArray(_))
      throw new Error("ajv implementation error");
    if (_.some((M) => (0, t.alwaysValidSchema)($, M)) && !$.opts.unevaluated)
      return;
    const I = d.let("valid", !1), C = d.name("_valid");
    d.block(() => _.forEach((M, V) => {
      const B = r.subschema({
        keyword: g,
        schemaProp: V,
        compositeRule: !0
      }, C);
      d.assign(I, (0, e._)`${I} || ${C}`), r.mergeValidEvaluated(B, C) || d.if((0, e.not)(I));
    })), r.result(I, () => r.reset(), () => r.error(!0));
  }
  return ue.validateUnion = f, ue;
}
var Aa;
function ku() {
  if (Aa) return Pe;
  Aa = 1, Object.defineProperty(Pe, "__esModule", { value: !0 }), Pe.validateKeywordUsage = Pe.validSchemaType = Pe.funcKeywordCode = Pe.macroKeywordCode = void 0;
  const e = re(), t = Fe(), l = Ne(), n = cn();
  function u(E, w) {
    const { gen: P, keyword: v, schema: h, parentSchema: f, it: r } = E, d = w.macro.call(r.self, h, f, r), _ = p(P, v, d);
    r.opts.validateSchema !== !1 && r.self.validateSchema(d, !0);
    const g = P.name("valid");
    E.subschema({
      schema: d,
      schemaPath: e.nil,
      errSchemaPath: `${r.errSchemaPath}/${v}`,
      topSchemaRef: _,
      compositeRule: !0
    }, g), E.pass(g, () => E.error(!0));
  }
  Pe.macroKeywordCode = u;
  function s(E, w) {
    var P;
    const { gen: v, keyword: h, schema: f, parentSchema: r, $data: d, it: _ } = E;
    i(_, w);
    const g = !d && w.compile ? w.compile.call(_.self, f, r, _) : w.validate, $ = p(v, h, g), b = v.let("valid");
    E.block$data(b, I), E.ok((P = w.valid) !== null && P !== void 0 ? P : b);
    function I() {
      if (w.errors === !1)
        V(), w.modifying && c(E), B(() => E.error());
      else {
        const W = w.async ? C() : M();
        w.modifying && c(E), B(() => o(E, W));
      }
    }
    function C() {
      const W = v.let("ruleErrs", null);
      return v.try(() => V((0, e._)`await `), (F) => v.assign(b, !1).if((0, e._)`${F} instanceof ${_.ValidationError}`, () => v.assign(W, (0, e._)`${F}.errors`), () => v.throw(F))), W;
    }
    function M() {
      const W = (0, e._)`${$}.errors`;
      return v.assign(W, null), V(e.nil), W;
    }
    function V(W = w.async ? (0, e._)`await ` : e.nil) {
      const F = _.opts.passContext ? t.default.this : t.default.self, z = !("compile" in w && !d || w.schema === !1);
      v.assign(b, (0, e._)`${W}${(0, l.callValidateCode)(E, $, F, z)}`, w.modifying);
    }
    function B(W) {
      var F;
      v.if((0, e.not)((F = w.valid) !== null && F !== void 0 ? F : b), W);
    }
  }
  Pe.funcKeywordCode = s;
  function c(E) {
    const { gen: w, data: P, it: v } = E;
    w.if(v.parentData, () => w.assign(P, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function o(E, w) {
    const { gen: P } = E;
    P.if((0, e._)`Array.isArray(${w})`, () => {
      P.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${w} : ${t.default.vErrors}.concat(${w})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(E);
    }, () => E.error());
  }
  function i({ schemaEnv: E }, w) {
    if (w.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function p(E, w, P) {
    if (P === void 0)
      throw new Error(`keyword "${w}" failed to compile`);
    return E.scopeValue("keyword", typeof P == "function" ? { ref: P } : { ref: P, code: (0, e.stringify)(P) });
  }
  function a(E, w, P = !1) {
    return !w.length || w.some((v) => v === "array" ? Array.isArray(E) : v === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == v || P && typeof E > "u");
  }
  Pe.validSchemaType = a;
  function y({ schema: E, opts: w, self: P, errSchemaPath: v }, h, f) {
    if (Array.isArray(h.keyword) ? !h.keyword.includes(f) : h.keyword !== f)
      throw new Error("ajv implementation error");
    const r = h.dependencies;
    if (r != null && r.some((d) => !Object.prototype.hasOwnProperty.call(E, d)))
      throw new Error(`parent schema must have dependencies of ${f}: ${r.join(",")}`);
    if (h.validateSchema && !h.validateSchema(E[f])) {
      const _ = `keyword "${f}" value is invalid at path "${v}": ` + P.errorsText(h.validateSchema.errors);
      if (w.validateSchema === "log")
        P.logger.error(_);
      else
        throw new Error(_);
    }
  }
  return Pe.validateKeywordUsage = y, Pe;
}
var qe = {}, qa;
function Du() {
  if (qa) return qe;
  qa = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.extendSubschemaMode = qe.extendSubschemaData = qe.getSubschema = void 0;
  const e = re(), t = ae();
  function l(s, { keyword: c, schemaProp: o, schema: i, schemaPath: p, errSchemaPath: a, topSchemaRef: y }) {
    if (c !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (c !== void 0) {
      const E = s.schema[c];
      return o === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}`
      } : {
        schema: E[o],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (i !== void 0) {
      if (p === void 0 || a === void 0 || y === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: i,
        schemaPath: p,
        topSchemaRef: y,
        errSchemaPath: a
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  qe.getSubschema = l;
  function n(s, c, { dataProp: o, dataPropType: i, data: p, dataTypes: a, propertyName: y }) {
    if (p !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = c;
    if (o !== void 0) {
      const { errorPath: P, dataPathArr: v, opts: h } = c, f = E.let("data", (0, e._)`${c.data}${(0, e.getProperty)(o)}`, !0);
      w(f), s.errorPath = (0, e.str)`${P}${(0, t.getErrorPath)(o, i, h.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${o}`, s.dataPathArr = [...v, s.parentDataProperty];
    }
    if (p !== void 0) {
      const P = p instanceof e.Name ? p : E.let("data", p, !0);
      w(P), y !== void 0 && (s.propertyName = y);
    }
    a && (s.dataTypes = a);
    function w(P) {
      s.data = P, s.dataLevel = c.dataLevel + 1, s.dataTypes = [], c.definedProperties = /* @__PURE__ */ new Set(), s.parentData = c.data, s.dataNames = [...c.dataNames, P];
    }
  }
  qe.extendSubschemaData = n;
  function u(s, { jtdDiscriminator: c, jtdMetadata: o, compositeRule: i, createErrors: p, allErrors: a }) {
    i !== void 0 && (s.compositeRule = i), p !== void 0 && (s.createErrors = p), a !== void 0 && (s.allErrors = a), s.jtdDiscriminator = c, s.jtdMetadata = o;
  }
  return qe.extendSubschemaMode = u, qe;
}
var ye = {}, An, Ca;
function un() {
  return Ca || (Ca = 1, An = function e(t, l) {
    if (t === l) return !0;
    if (t && l && typeof t == "object" && typeof l == "object") {
      if (t.constructor !== l.constructor) return !1;
      var n, u, s;
      if (Array.isArray(t)) {
        if (n = t.length, n != l.length) return !1;
        for (u = n; u-- !== 0; )
          if (!e(t[u], l[u])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === l.source && t.flags === l.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === l.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === l.toString();
      if (s = Object.keys(t), n = s.length, n !== Object.keys(l).length) return !1;
      for (u = n; u-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(l, s[u])) return !1;
      for (u = n; u-- !== 0; ) {
        var c = s[u];
        if (!e(t[c], l[c])) return !1;
      }
      return !0;
    }
    return t !== t && l !== l;
  }), An;
}
var qn = { exports: {} }, ka;
function Mu() {
  if (ka) return qn.exports;
  ka = 1;
  var e = qn.exports = function(n, u, s) {
    typeof u == "function" && (s = u, u = {}), s = u.cb || s;
    var c = typeof s == "function" ? s : s.pre || function() {
    }, o = s.post || function() {
    };
    t(u, c, o, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, u, s, c, o, i, p, a, y, E) {
    if (c && typeof c == "object" && !Array.isArray(c)) {
      u(c, o, i, p, a, y, E);
      for (var w in c) {
        var P = c[w];
        if (Array.isArray(P)) {
          if (w in e.arrayKeywords)
            for (var v = 0; v < P.length; v++)
              t(n, u, s, P[v], o + "/" + w + "/" + v, i, o, w, c, v);
        } else if (w in e.propsKeywords) {
          if (P && typeof P == "object")
            for (var h in P)
              t(n, u, s, P[h], o + "/" + w + "/" + l(h), i, o, w, c, h);
        } else (w in e.keywords || n.allKeys && !(w in e.skipKeywords)) && t(n, u, s, P, o + "/" + w, i, o, w, c);
      }
      s(c, o, i, p, a, y, E);
    }
  }
  function l(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return qn.exports;
}
var Da;
function ln() {
  if (Da) return ye;
  Da = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.getSchemaRefs = ye.resolveUrl = ye.normalizeId = ye._getFullPath = ye.getFullPath = ye.inlineRef = void 0;
  const e = ae(), t = un(), l = Mu(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function u(v, h = !0) {
    return typeof v == "boolean" ? !0 : h === !0 ? !c(v) : h ? o(v) <= h : !1;
  }
  ye.inlineRef = u;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function c(v) {
    for (const h in v) {
      if (s.has(h))
        return !0;
      const f = v[h];
      if (Array.isArray(f) && f.some(c) || typeof f == "object" && c(f))
        return !0;
    }
    return !1;
  }
  function o(v) {
    let h = 0;
    for (const f in v) {
      if (f === "$ref")
        return 1 / 0;
      if (h++, !n.has(f) && (typeof v[f] == "object" && (0, e.eachItem)(v[f], (r) => h += o(r)), h === 1 / 0))
        return 1 / 0;
    }
    return h;
  }
  function i(v, h = "", f) {
    f !== !1 && (h = y(h));
    const r = v.parse(h);
    return p(v, r);
  }
  ye.getFullPath = i;
  function p(v, h) {
    return v.serialize(h).split("#")[0] + "#";
  }
  ye._getFullPath = p;
  const a = /#\/?$/;
  function y(v) {
    return v ? v.replace(a, "") : "";
  }
  ye.normalizeId = y;
  function E(v, h, f) {
    return f = y(f), v.resolve(h, f);
  }
  ye.resolveUrl = E;
  const w = /^[a-z_][-a-z0-9._]*$/i;
  function P(v, h) {
    if (typeof v == "boolean")
      return {};
    const { schemaId: f, uriResolver: r } = this.opts, d = y(v[f] || h), _ = { "": d }, g = i(r, d, !1), $ = {}, b = /* @__PURE__ */ new Set();
    return l(v, { allKeys: !0 }, (M, V, B, W) => {
      if (W === void 0)
        return;
      const F = g + V;
      let z = _[W];
      typeof M[f] == "string" && (z = Y.call(this, M[f])), J.call(this, M.$anchor), J.call(this, M.$dynamicAnchor), _[V] = z;
      function Y(D) {
        const U = this.opts.uriResolver.resolve;
        if (D = y(z ? U(z, D) : D), b.has(D))
          throw C(D);
        b.add(D);
        let j = this.refs[D];
        return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? I(M, j.schema, D) : D !== y(F) && (D[0] === "#" ? (I(M, $[D], D), $[D] = M) : this.refs[D] = F), D;
      }
      function J(D) {
        if (typeof D == "string") {
          if (!w.test(D))
            throw new Error(`invalid anchor "${D}"`);
          Y.call(this, `#${D}`);
        }
      }
    }), $;
    function I(M, V, B) {
      if (V !== void 0 && !t(M, V))
        throw C(B);
    }
    function C(M) {
      return new Error(`reference "${M}" resolves to more than one schema`);
    }
  }
  return ye.getSchemaRefs = P, ye;
}
var Ma;
function dn() {
  if (Ma) return je;
  Ma = 1, Object.defineProperty(je, "__esModule", { value: !0 }), je.getData = je.KeywordCxt = je.validateFunctionCode = void 0;
  const e = qu(), t = sn(), l = Wc(), n = sn(), u = Cu(), s = ku(), c = Du(), o = re(), i = Fe(), p = ln(), a = ae(), y = cn();
  function E(N) {
    if (g(N) && (b(N), _(N))) {
      h(N);
      return;
    }
    w(N, () => (0, e.topBoolOrEmptySchema)(N));
  }
  je.validateFunctionCode = E;
  function w({ gen: N, validateName: T, schema: k, schemaEnv: L, opts: H }, X) {
    H.code.es5 ? N.func(T, (0, o._)`${i.default.data}, ${i.default.valCxt}`, L.$async, () => {
      N.code((0, o._)`"use strict"; ${r(k, H)}`), v(N, H), N.code(X);
    }) : N.func(T, (0, o._)`${i.default.data}, ${P(H)}`, L.$async, () => N.code(r(k, H)).code(X));
  }
  function P(N) {
    return (0, o._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${N.dynamicRef ? (0, o._)`, ${i.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function v(N, T) {
    N.if(i.default.valCxt, () => {
      N.var(i.default.instancePath, (0, o._)`${i.default.valCxt}.${i.default.instancePath}`), N.var(i.default.parentData, (0, o._)`${i.default.valCxt}.${i.default.parentData}`), N.var(i.default.parentDataProperty, (0, o._)`${i.default.valCxt}.${i.default.parentDataProperty}`), N.var(i.default.rootData, (0, o._)`${i.default.valCxt}.${i.default.rootData}`), T.dynamicRef && N.var(i.default.dynamicAnchors, (0, o._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      N.var(i.default.instancePath, (0, o._)`""`), N.var(i.default.parentData, (0, o._)`undefined`), N.var(i.default.parentDataProperty, (0, o._)`undefined`), N.var(i.default.rootData, i.default.data), T.dynamicRef && N.var(i.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function h(N) {
    const { schema: T, opts: k, gen: L } = N;
    w(N, () => {
      k.$comment && T.$comment && W(N), M(N), L.let(i.default.vErrors, null), L.let(i.default.errors, 0), k.unevaluated && f(N), I(N), F(N);
    });
  }
  function f(N) {
    const { gen: T, validateName: k } = N;
    N.evaluated = T.const("evaluated", (0, o._)`${k}.evaluated`), T.if((0, o._)`${N.evaluated}.dynamicProps`, () => T.assign((0, o._)`${N.evaluated}.props`, (0, o._)`undefined`)), T.if((0, o._)`${N.evaluated}.dynamicItems`, () => T.assign((0, o._)`${N.evaluated}.items`, (0, o._)`undefined`));
  }
  function r(N, T) {
    const k = typeof N == "object" && N[T.schemaId];
    return k && (T.code.source || T.code.process) ? (0, o._)`/*# sourceURL=${k} */` : o.nil;
  }
  function d(N, T) {
    if (g(N) && (b(N), _(N))) {
      $(N, T);
      return;
    }
    (0, e.boolOrEmptySchema)(N, T);
  }
  function _({ schema: N, self: T }) {
    if (typeof N == "boolean")
      return !N;
    for (const k in N)
      if (T.RULES.all[k])
        return !0;
    return !1;
  }
  function g(N) {
    return typeof N.schema != "boolean";
  }
  function $(N, T) {
    const { schema: k, gen: L, opts: H } = N;
    H.$comment && k.$comment && W(N), V(N), B(N);
    const X = L.const("_errs", i.default.errors);
    I(N, X), L.var(T, (0, o._)`${X} === ${i.default.errors}`);
  }
  function b(N) {
    (0, a.checkUnknownRules)(N), C(N);
  }
  function I(N, T) {
    if (N.opts.jtd)
      return Y(N, [], !1, T);
    const k = (0, t.getSchemaTypes)(N.schema), L = (0, t.coerceAndCheckDataType)(N, k);
    Y(N, k, !L, T);
  }
  function C(N) {
    const { schema: T, errSchemaPath: k, opts: L, self: H } = N;
    T.$ref && L.ignoreKeywordsWithRef && (0, a.schemaHasRulesButRef)(T, H.RULES) && H.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function M(N) {
    const { schema: T, opts: k } = N;
    T.default !== void 0 && k.useDefaults && k.strictSchema && (0, a.checkStrictMode)(N, "default is ignored in the schema root");
  }
  function V(N) {
    const T = N.schema[N.opts.schemaId];
    T && (N.baseId = (0, p.resolveUrl)(N.opts.uriResolver, N.baseId, T));
  }
  function B(N) {
    if (N.schema.$async && !N.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function W({ gen: N, schemaEnv: T, schema: k, errSchemaPath: L, opts: H }) {
    const X = k.$comment;
    if (H.$comment === !0)
      N.code((0, o._)`${i.default.self}.logger.log(${X})`);
    else if (typeof H.$comment == "function") {
      const ne = (0, o.str)`${L}/$comment`, he = N.scopeValue("root", { ref: T.root });
      N.code((0, o._)`${i.default.self}.opts.$comment(${X}, ${ne}, ${he}.schema)`);
    }
  }
  function F(N) {
    const { gen: T, schemaEnv: k, validateName: L, ValidationError: H, opts: X } = N;
    k.$async ? T.if((0, o._)`${i.default.errors} === 0`, () => T.return(i.default.data), () => T.throw((0, o._)`new ${H}(${i.default.vErrors})`)) : (T.assign((0, o._)`${L}.errors`, i.default.vErrors), X.unevaluated && z(N), T.return((0, o._)`${i.default.errors} === 0`));
  }
  function z({ gen: N, evaluated: T, props: k, items: L }) {
    k instanceof o.Name && N.assign((0, o._)`${T}.props`, k), L instanceof o.Name && N.assign((0, o._)`${T}.items`, L);
  }
  function Y(N, T, k, L) {
    const { gen: H, schema: X, data: ne, allErrors: he, opts: oe, self: ce } = N, { RULES: se } = ce;
    if (X.$ref && (oe.ignoreKeywordsWithRef || !(0, a.schemaHasRulesButRef)(X, se))) {
      H.block(() => K(N, "$ref", se.all.$ref.definition));
      return;
    }
    oe.jtd || D(N, T), H.block(() => {
      for (const fe of se.rules)
        ge(fe);
      ge(se.post);
    });
    function ge(fe) {
      (0, l.shouldUseGroup)(X, fe) && (fe.type ? (H.if((0, n.checkDataType)(fe.type, ne, oe.strictNumbers)), J(N, fe), T.length === 1 && T[0] === fe.type && k && (H.else(), (0, n.reportTypeError)(N)), H.endIf()) : J(N, fe), he || H.if((0, o._)`${i.default.errors} === ${L || 0}`));
    }
  }
  function J(N, T) {
    const { gen: k, schema: L, opts: { useDefaults: H } } = N;
    H && (0, u.assignDefaults)(N, T.type), k.block(() => {
      for (const X of T.rules)
        (0, l.shouldUseRule)(L, X) && K(N, X.keyword, X.definition, T.type);
    });
  }
  function D(N, T) {
    N.schemaEnv.meta || !N.opts.strictTypes || (U(N, T), N.opts.allowUnionTypes || j(N, T), R(N, N.dataTypes));
  }
  function U(N, T) {
    if (T.length) {
      if (!N.dataTypes.length) {
        N.dataTypes = T;
        return;
      }
      T.forEach((k) => {
        O(N.dataTypes, k) || S(N, `type "${k}" not allowed by context "${N.dataTypes.join(",")}"`);
      }), m(N, T);
    }
  }
  function j(N, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && S(N, "use allowUnionTypes to allow union type keyword");
  }
  function R(N, T) {
    const k = N.self.RULES.all;
    for (const L in k) {
      const H = k[L];
      if (typeof H == "object" && (0, l.shouldUseRule)(N.schema, H)) {
        const { type: X } = H.definition;
        X.length && !X.some((ne) => A(T, ne)) && S(N, `missing type "${X.join(",")}" for keyword "${L}"`);
      }
    }
  }
  function A(N, T) {
    return N.includes(T) || T === "number" && N.includes("integer");
  }
  function O(N, T) {
    return N.includes(T) || T === "integer" && N.includes("number");
  }
  function m(N, T) {
    const k = [];
    for (const L of N.dataTypes)
      O(T, L) ? k.push(L) : T.includes("integer") && L === "number" && k.push("integer");
    N.dataTypes = k;
  }
  function S(N, T) {
    const k = N.schemaEnv.baseId + N.errSchemaPath;
    T += ` at "${k}" (strictTypes)`, (0, a.checkStrictMode)(N, T, N.opts.strictTypes);
  }
  class q {
    constructor(T, k, L) {
      if ((0, s.validateKeywordUsage)(T, k, L), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = L, this.data = T.data, this.schema = T.schema[L], this.$data = k.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, a.schemaRefOrVal)(T, this.schema, L, this.$data), this.schemaType = k.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = k, this.$data)
        this.schemaCode = T.gen.const("vSchema", Q(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${L} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = T.gen.const("_errs", i.default.errors));
    }
    result(T, k, L) {
      this.failResult((0, o.not)(T), k, L);
    }
    failResult(T, k, L) {
      this.gen.if(T), L ? L() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, k) {
      this.failResult((0, o.not)(T), void 0, k);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: k } = this;
      this.fail((0, o._)`${k} !== undefined && (${(0, o.or)(this.invalid$data(), T)})`);
    }
    error(T, k, L) {
      if (k) {
        this.setParams(k), this._error(T, L), this.setParams({});
        return;
      }
      this._error(T, L);
    }
    _error(T, k) {
      (T ? y.reportExtraError : y.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, y.reportError)(this, this.def.$dataError || y.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, y.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, k) {
      k ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, k, L = o.nil) {
      this.gen.block(() => {
        this.check$data(T, L), k();
      });
    }
    check$data(T = o.nil, k = o.nil) {
      if (!this.$data)
        return;
      const { gen: L, schemaCode: H, schemaType: X, def: ne } = this;
      L.if((0, o.or)((0, o._)`${H} === undefined`, k)), T !== o.nil && L.assign(T, !0), (X.length || ne.validateSchema) && (L.elseIf(this.invalid$data()), this.$dataError(), T !== o.nil && L.assign(T, !1)), L.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: k, schemaType: L, def: H, it: X } = this;
      return (0, o.or)(ne(), he());
      function ne() {
        if (L.length) {
          if (!(k instanceof o.Name))
            throw new Error("ajv implementation error");
          const oe = Array.isArray(L) ? L : [L];
          return (0, o._)`${(0, n.checkDataTypes)(oe, k, X.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function he() {
        if (H.validateSchema) {
          const oe = T.scopeValue("validate$data", { ref: H.validateSchema });
          return (0, o._)`!${oe}(${k})`;
        }
        return o.nil;
      }
    }
    subschema(T, k) {
      const L = (0, c.getSubschema)(this.it, T);
      (0, c.extendSubschemaData)(L, this.it, T), (0, c.extendSubschemaMode)(L, T);
      const H = { ...this.it, ...L, items: void 0, props: void 0 };
      return d(H, k), H;
    }
    mergeEvaluated(T, k) {
      const { it: L, gen: H } = this;
      L.opts.unevaluated && (L.props !== !0 && T.props !== void 0 && (L.props = a.mergeEvaluated.props(H, T.props, L.props, k)), L.items !== !0 && T.items !== void 0 && (L.items = a.mergeEvaluated.items(H, T.items, L.items, k)));
    }
    mergeValidEvaluated(T, k) {
      const { it: L, gen: H } = this;
      if (L.opts.unevaluated && (L.props !== !0 || L.items !== !0))
        return H.if(k, () => this.mergeEvaluated(T, o.Name)), !0;
    }
  }
  je.KeywordCxt = q;
  function K(N, T, k, L) {
    const H = new q(N, k, T);
    "code" in k ? k.code(H, L) : H.$data && k.validate ? (0, s.funcKeywordCode)(H, k) : "macro" in k ? (0, s.macroKeywordCode)(H, k) : (k.compile || k.validate) && (0, s.funcKeywordCode)(H, k);
  }
  const G = /^\/(?:[^~]|~0|~1)*$/, Z = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Q(N, { dataLevel: T, dataNames: k, dataPathArr: L }) {
    let H, X;
    if (N === "")
      return i.default.rootData;
    if (N[0] === "/") {
      if (!G.test(N))
        throw new Error(`Invalid JSON-pointer: ${N}`);
      H = N, X = i.default.rootData;
    } else {
      const ce = Z.exec(N);
      if (!ce)
        throw new Error(`Invalid JSON-pointer: ${N}`);
      const se = +ce[1];
      if (H = ce[2], H === "#") {
        if (se >= T)
          throw new Error(oe("property/index", se));
        return L[T - se];
      }
      if (se > T)
        throw new Error(oe("data", se));
      if (X = k[T - se], !H)
        return X;
    }
    let ne = X;
    const he = H.split("/");
    for (const ce of he)
      ce && (X = (0, o._)`${X}${(0, o.getProperty)((0, a.unescapeJsonPointer)(ce))}`, ne = (0, o._)`${ne} && ${X}`);
    return ne;
    function oe(ce, se) {
      return `Cannot access ${ce} ${se} levels up, current level is ${T}`;
    }
  }
  return je.getData = Q, je;
}
var At = {}, La;
function Us() {
  if (La) return At;
  La = 1, Object.defineProperty(At, "__esModule", { value: !0 });
  class e extends Error {
    constructor(l) {
      super("validation failed"), this.errors = l, this.ajv = this.validation = !0;
    }
  }
  return At.default = e, At;
}
var qt = {}, Fa;
function fn() {
  if (Fa) return qt;
  Fa = 1, Object.defineProperty(qt, "__esModule", { value: !0 });
  const e = ln();
  class t extends Error {
    constructor(n, u, s, c) {
      super(c || `can't resolve reference ${s} from id ${u}`), this.missingRef = (0, e.resolveUrl)(n, u, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return qt.default = t, qt;
}
var we = {}, Va;
function zs() {
  if (Va) return we;
  Va = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.resolveSchema = we.getCompilingSchema = we.resolveRef = we.compileSchema = we.SchemaEnv = void 0;
  const e = re(), t = Us(), l = Fe(), n = ln(), u = ae(), s = dn();
  class c {
    constructor(f) {
      var r;
      this.refs = {}, this.dynamicAnchors = {};
      let d;
      typeof f.schema == "object" && (d = f.schema), this.schema = f.schema, this.schemaId = f.schemaId, this.root = f.root || this, this.baseId = (r = f.baseId) !== null && r !== void 0 ? r : (0, n.normalizeId)(d == null ? void 0 : d[f.schemaId || "$id"]), this.schemaPath = f.schemaPath, this.localRefs = f.localRefs, this.meta = f.meta, this.$async = d == null ? void 0 : d.$async, this.refs = {};
    }
  }
  we.SchemaEnv = c;
  function o(h) {
    const f = a.call(this, h);
    if (f)
      return f;
    const r = (0, n.getFullPath)(this.opts.uriResolver, h.root.baseId), { es5: d, lines: _ } = this.opts.code, { ownProperties: g } = this.opts, $ = new e.CodeGen(this.scope, { es5: d, lines: _, ownProperties: g });
    let b;
    h.$async && (b = $.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const I = $.scopeName("validate");
    h.validateName = I;
    const C = {
      gen: $,
      allErrors: this.opts.allErrors,
      data: l.default.data,
      parentData: l.default.parentData,
      parentDataProperty: l.default.parentDataProperty,
      dataNames: [l.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: $.scopeValue("schema", this.opts.code.source === !0 ? { ref: h.schema, code: (0, e.stringify)(h.schema) } : { ref: h.schema }),
      validateName: I,
      ValidationError: b,
      schema: h.schema,
      schemaEnv: h,
      rootId: r,
      baseId: h.baseId || r,
      schemaPath: e.nil,
      errSchemaPath: h.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let M;
    try {
      this._compilations.add(h), (0, s.validateFunctionCode)(C), $.optimize(this.opts.code.optimize);
      const V = $.toString();
      M = `${$.scopeRefs(l.default.scope)}return ${V}`, this.opts.code.process && (M = this.opts.code.process(M, h));
      const W = new Function(`${l.default.self}`, `${l.default.scope}`, M)(this, this.scope.get());
      if (this.scope.value(I, { ref: W }), W.errors = null, W.schema = h.schema, W.schemaEnv = h, h.$async && (W.$async = !0), this.opts.code.source === !0 && (W.source = { validateName: I, validateCode: V, scopeValues: $._values }), this.opts.unevaluated) {
        const { props: F, items: z } = C;
        W.evaluated = {
          props: F instanceof e.Name ? void 0 : F,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: F instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, W.source && (W.source.evaluated = (0, e.stringify)(W.evaluated));
      }
      return h.validate = W, h;
    } catch (V) {
      throw delete h.validate, delete h.validateName, M && this.logger.error("Error compiling schema, function code:", M), V;
    } finally {
      this._compilations.delete(h);
    }
  }
  we.compileSchema = o;
  function i(h, f, r) {
    var d;
    r = (0, n.resolveUrl)(this.opts.uriResolver, f, r);
    const _ = h.refs[r];
    if (_)
      return _;
    let g = E.call(this, h, r);
    if (g === void 0) {
      const $ = (d = h.localRefs) === null || d === void 0 ? void 0 : d[r], { schemaId: b } = this.opts;
      $ && (g = new c({ schema: $, schemaId: b, root: h, baseId: f }));
    }
    if (g !== void 0)
      return h.refs[r] = p.call(this, g);
  }
  we.resolveRef = i;
  function p(h) {
    return (0, n.inlineRef)(h.schema, this.opts.inlineRefs) ? h.schema : h.validate ? h : o.call(this, h);
  }
  function a(h) {
    for (const f of this._compilations)
      if (y(f, h))
        return f;
  }
  we.getCompilingSchema = a;
  function y(h, f) {
    return h.schema === f.schema && h.root === f.root && h.baseId === f.baseId;
  }
  function E(h, f) {
    let r;
    for (; typeof (r = this.refs[f]) == "string"; )
      f = r;
    return r || this.schemas[f] || w.call(this, h, f);
  }
  function w(h, f) {
    const r = this.opts.uriResolver.parse(f), d = (0, n._getFullPath)(this.opts.uriResolver, r);
    let _ = (0, n.getFullPath)(this.opts.uriResolver, h.baseId, void 0);
    if (Object.keys(h.schema).length > 0 && d === _)
      return v.call(this, r, h);
    const g = (0, n.normalizeId)(d), $ = this.refs[g] || this.schemas[g];
    if (typeof $ == "string") {
      const b = w.call(this, h, $);
      return typeof (b == null ? void 0 : b.schema) != "object" ? void 0 : v.call(this, r, b);
    }
    if (typeof ($ == null ? void 0 : $.schema) == "object") {
      if ($.validate || o.call(this, $), g === (0, n.normalizeId)(f)) {
        const { schema: b } = $, { schemaId: I } = this.opts, C = b[I];
        return C && (_ = (0, n.resolveUrl)(this.opts.uriResolver, _, C)), new c({ schema: b, schemaId: I, root: h, baseId: _ });
      }
      return v.call(this, r, $);
    }
  }
  we.resolveSchema = w;
  const P = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function v(h, { baseId: f, schema: r, root: d }) {
    var _;
    if (((_ = h.fragment) === null || _ === void 0 ? void 0 : _[0]) !== "/")
      return;
    for (const b of h.fragment.slice(1).split("/")) {
      if (typeof r == "boolean")
        return;
      const I = r[(0, u.unescapeFragment)(b)];
      if (I === void 0)
        return;
      r = I;
      const C = typeof r == "object" && r[this.opts.schemaId];
      !P.has(b) && C && (f = (0, n.resolveUrl)(this.opts.uriResolver, f, C));
    }
    let g;
    if (typeof r != "boolean" && r.$ref && !(0, u.schemaHasRulesButRef)(r, this.RULES)) {
      const b = (0, n.resolveUrl)(this.opts.uriResolver, f, r.$ref);
      g = w.call(this, d, b);
    }
    const { schemaId: $ } = this.opts;
    if (g = g || new c({ schema: r, schemaId: $, root: d, baseId: f }), g.schema !== g.root.schema)
      return g;
  }
  return we;
}
const Lu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Fu = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Vu = "object", Uu = ["$data"], zu = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Ku = !1, Gu = {
  $id: Lu,
  description: Fu,
  type: Vu,
  required: Uu,
  properties: zu,
  additionalProperties: Ku
};
var Ct = {}, ct = { exports: {} }, Cn, Ua;
function Hu() {
  return Ua || (Ua = 1, Cn = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), Cn;
}
var kn, za;
function Wu() {
  if (za) return kn;
  za = 1;
  const { HEX: e } = Hu(), t = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
  function l(v) {
    if (o(v, ".") < 3)
      return { host: v, isIPV4: !1 };
    const h = v.match(t) || [], [f] = h;
    return f ? { host: c(f, "."), isIPV4: !0 } : { host: v, isIPV4: !1 };
  }
  function n(v, h = !1) {
    let f = "", r = !0;
    for (const d of v) {
      if (e[d] === void 0) return;
      d !== "0" && r === !0 && (r = !1), r || (f += d);
    }
    return h && f.length === 0 && (f = "0"), f;
  }
  function u(v) {
    let h = 0;
    const f = { error: !1, address: "", zone: "" }, r = [], d = [];
    let _ = !1, g = !1, $ = !1;
    function b() {
      if (d.length) {
        if (_ === !1) {
          const I = n(d);
          if (I !== void 0)
            r.push(I);
          else
            return f.error = !0, !1;
        }
        d.length = 0;
      }
      return !0;
    }
    for (let I = 0; I < v.length; I++) {
      const C = v[I];
      if (!(C === "[" || C === "]"))
        if (C === ":") {
          if (g === !0 && ($ = !0), !b())
            break;
          if (h++, r.push(":"), h > 7) {
            f.error = !0;
            break;
          }
          I - 1 >= 0 && v[I - 1] === ":" && (g = !0);
          continue;
        } else if (C === "%") {
          if (!b())
            break;
          _ = !0;
        } else {
          d.push(C);
          continue;
        }
    }
    return d.length && (_ ? f.zone = d.join("") : $ ? r.push(d.join("")) : r.push(n(d))), f.address = r.join(""), f;
  }
  function s(v) {
    if (o(v, ":") < 2)
      return { host: v, isIPV6: !1 };
    const h = u(v);
    if (h.error)
      return { host: v, isIPV6: !1 };
    {
      let f = h.address, r = h.address;
      return h.zone && (f += "%" + h.zone, r += "%25" + h.zone), { host: f, escapedHost: r, isIPV6: !0 };
    }
  }
  function c(v, h) {
    let f = "", r = !0;
    const d = v.length;
    for (let _ = 0; _ < d; _++) {
      const g = v[_];
      g === "0" && r ? (_ + 1 <= d && v[_ + 1] === h || _ + 1 === d) && (f += g, r = !1) : (g === h ? r = !0 : r = !1, f += g);
    }
    return f;
  }
  function o(v, h) {
    let f = 0;
    for (let r = 0; r < v.length; r++)
      v[r] === h && f++;
    return f;
  }
  const i = /^\.\.?\//u, p = /^\/\.(?:\/|$)/u, a = /^\/\.\.(?:\/|$)/u, y = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function E(v) {
    const h = [];
    for (; v.length; )
      if (v.match(i))
        v = v.replace(i, "");
      else if (v.match(p))
        v = v.replace(p, "/");
      else if (v.match(a))
        v = v.replace(a, "/"), h.pop();
      else if (v === "." || v === "..")
        v = "";
      else {
        const f = v.match(y);
        if (f) {
          const r = f[0];
          v = v.slice(r.length), h.push(r);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return h.join("");
  }
  function w(v, h) {
    const f = h !== !0 ? escape : unescape;
    return v.scheme !== void 0 && (v.scheme = f(v.scheme)), v.userinfo !== void 0 && (v.userinfo = f(v.userinfo)), v.host !== void 0 && (v.host = f(v.host)), v.path !== void 0 && (v.path = f(v.path)), v.query !== void 0 && (v.query = f(v.query)), v.fragment !== void 0 && (v.fragment = f(v.fragment)), v;
  }
  function P(v) {
    const h = [];
    if (v.userinfo !== void 0 && (h.push(v.userinfo), h.push("@")), v.host !== void 0) {
      let f = unescape(v.host);
      const r = l(f);
      if (r.isIPV4)
        f = r.host;
      else {
        const d = s(r.host);
        d.isIPV6 === !0 ? f = `[${d.escapedHost}]` : f = v.host;
      }
      h.push(f);
    }
    return (typeof v.port == "number" || typeof v.port == "string") && (h.push(":"), h.push(String(v.port))), h.length ? h.join("") : void 0;
  }
  return kn = {
    recomposeAuthority: P,
    normalizeComponentEncoding: w,
    removeDotSegments: E,
    normalizeIPv4: l,
    normalizeIPv6: s,
    stringArrayToHexStripped: n
  }, kn;
}
var Dn, Ka;
function Bu() {
  if (Ka) return Dn;
  Ka = 1;
  const e = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function l(r) {
    return typeof r.secure == "boolean" ? r.secure : String(r.scheme).toLowerCase() === "wss";
  }
  function n(r) {
    return r.host || (r.error = r.error || "HTTP URIs must have a host."), r;
  }
  function u(r) {
    const d = String(r.scheme).toLowerCase() === "https";
    return (r.port === (d ? 443 : 80) || r.port === "") && (r.port = void 0), r.path || (r.path = "/"), r;
  }
  function s(r) {
    return r.secure = l(r), r.resourceName = (r.path || "/") + (r.query ? "?" + r.query : ""), r.path = void 0, r.query = void 0, r;
  }
  function c(r) {
    if ((r.port === (l(r) ? 443 : 80) || r.port === "") && (r.port = void 0), typeof r.secure == "boolean" && (r.scheme = r.secure ? "wss" : "ws", r.secure = void 0), r.resourceName) {
      const [d, _] = r.resourceName.split("?");
      r.path = d && d !== "/" ? d : void 0, r.query = _, r.resourceName = void 0;
    }
    return r.fragment = void 0, r;
  }
  function o(r, d) {
    if (!r.path)
      return r.error = "URN can not be parsed", r;
    const _ = r.path.match(t);
    if (_) {
      const g = d.scheme || r.scheme || "urn";
      r.nid = _[1].toLowerCase(), r.nss = _[2];
      const $ = `${g}:${d.nid || r.nid}`, b = f[$];
      r.path = void 0, b && (r = b.parse(r, d));
    } else
      r.error = r.error || "URN can not be parsed.";
    return r;
  }
  function i(r, d) {
    const _ = d.scheme || r.scheme || "urn", g = r.nid.toLowerCase(), $ = `${_}:${d.nid || g}`, b = f[$];
    b && (r = b.serialize(r, d));
    const I = r, C = r.nss;
    return I.path = `${g || d.nid}:${C}`, d.skipEscape = !0, I;
  }
  function p(r, d) {
    const _ = r;
    return _.uuid = _.nss, _.nss = void 0, !d.tolerant && (!_.uuid || !e.test(_.uuid)) && (_.error = _.error || "UUID is not valid."), _;
  }
  function a(r) {
    const d = r;
    return d.nss = (r.uuid || "").toLowerCase(), d;
  }
  const y = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: u
  }, E = {
    scheme: "https",
    domainHost: y.domainHost,
    parse: n,
    serialize: u
  }, w = {
    scheme: "ws",
    domainHost: !0,
    parse: s,
    serialize: c
  }, P = {
    scheme: "wss",
    domainHost: w.domainHost,
    parse: w.parse,
    serialize: w.serialize
  }, f = {
    http: y,
    https: E,
    ws: w,
    wss: P,
    urn: {
      scheme: "urn",
      parse: o,
      serialize: i,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: p,
      serialize: a,
      skipNormalize: !0
    }
  };
  return Dn = f, Dn;
}
var Ga;
function Bc() {
  if (Ga) return ct.exports;
  Ga = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: l, recomposeAuthority: n, normalizeComponentEncoding: u } = Wu(), s = Bu();
  function c(h, f) {
    return typeof h == "string" ? h = a(P(h, f), f) : typeof h == "object" && (h = P(a(h, f), f)), h;
  }
  function o(h, f, r) {
    const d = Object.assign({ scheme: "null" }, r), _ = i(P(h, d), P(f, d), d, !0);
    return a(_, { ...d, skipEscape: !0 });
  }
  function i(h, f, r, d) {
    const _ = {};
    return d || (h = P(a(h, r), r), f = P(a(f, r), r)), r = r || {}, !r.tolerant && f.scheme ? (_.scheme = f.scheme, _.userinfo = f.userinfo, _.host = f.host, _.port = f.port, _.path = l(f.path || ""), _.query = f.query) : (f.userinfo !== void 0 || f.host !== void 0 || f.port !== void 0 ? (_.userinfo = f.userinfo, _.host = f.host, _.port = f.port, _.path = l(f.path || ""), _.query = f.query) : (f.path ? (f.path.charAt(0) === "/" ? _.path = l(f.path) : ((h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0) && !h.path ? _.path = "/" + f.path : h.path ? _.path = h.path.slice(0, h.path.lastIndexOf("/") + 1) + f.path : _.path = f.path, _.path = l(_.path)), _.query = f.query) : (_.path = h.path, f.query !== void 0 ? _.query = f.query : _.query = h.query), _.userinfo = h.userinfo, _.host = h.host, _.port = h.port), _.scheme = h.scheme), _.fragment = f.fragment, _;
  }
  function p(h, f, r) {
    return typeof h == "string" ? (h = unescape(h), h = a(u(P(h, r), !0), { ...r, skipEscape: !0 })) : typeof h == "object" && (h = a(u(h, !0), { ...r, skipEscape: !0 })), typeof f == "string" ? (f = unescape(f), f = a(u(P(f, r), !0), { ...r, skipEscape: !0 })) : typeof f == "object" && (f = a(u(f, !0), { ...r, skipEscape: !0 })), h.toLowerCase() === f.toLowerCase();
  }
  function a(h, f) {
    const r = {
      host: h.host,
      scheme: h.scheme,
      userinfo: h.userinfo,
      port: h.port,
      path: h.path,
      query: h.query,
      nid: h.nid,
      nss: h.nss,
      uuid: h.uuid,
      fragment: h.fragment,
      reference: h.reference,
      resourceName: h.resourceName,
      secure: h.secure,
      error: ""
    }, d = Object.assign({}, f), _ = [], g = s[(d.scheme || r.scheme || "").toLowerCase()];
    g && g.serialize && g.serialize(r, d), r.path !== void 0 && (d.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), d.reference !== "suffix" && r.scheme && _.push(r.scheme, ":");
    const $ = n(r);
    if ($ !== void 0 && (d.reference !== "suffix" && _.push("//"), _.push($), r.path && r.path.charAt(0) !== "/" && _.push("/")), r.path !== void 0) {
      let b = r.path;
      !d.absolutePath && (!g || !g.absolutePath) && (b = l(b)), $ === void 0 && (b = b.replace(/^\/\//u, "/%2F")), _.push(b);
    }
    return r.query !== void 0 && _.push("?", r.query), r.fragment !== void 0 && _.push("#", r.fragment), _.join("");
  }
  const y = Array.from({ length: 127 }, (h, f) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(f)));
  function E(h) {
    let f = 0;
    for (let r = 0, d = h.length; r < d; ++r)
      if (f = h.charCodeAt(r), f > 126 || y[f])
        return !0;
    return !1;
  }
  const w = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function P(h, f) {
    const r = Object.assign({}, f), d = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, _ = h.indexOf("%") !== -1;
    let g = !1;
    r.reference === "suffix" && (h = (r.scheme ? r.scheme + ":" : "") + "//" + h);
    const $ = h.match(w);
    if ($) {
      if (d.scheme = $[1], d.userinfo = $[3], d.host = $[4], d.port = parseInt($[5], 10), d.path = $[6] || "", d.query = $[7], d.fragment = $[8], isNaN(d.port) && (d.port = $[5]), d.host) {
        const I = t(d.host);
        if (I.isIPV4 === !1) {
          const C = e(I.host);
          d.host = C.host.toLowerCase(), g = C.isIPV6;
        } else
          d.host = I.host, g = !0;
      }
      d.scheme === void 0 && d.userinfo === void 0 && d.host === void 0 && d.port === void 0 && d.query === void 0 && !d.path ? d.reference = "same-document" : d.scheme === void 0 ? d.reference = "relative" : d.fragment === void 0 ? d.reference = "absolute" : d.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== d.reference && (d.error = d.error || "URI is not a " + r.reference + " reference.");
      const b = s[(r.scheme || d.scheme || "").toLowerCase()];
      if (!r.unicodeSupport && (!b || !b.unicodeSupport) && d.host && (r.domainHost || b && b.domainHost) && g === !1 && E(d.host))
        try {
          d.host = URL.domainToASCII(d.host.toLowerCase());
        } catch (I) {
          d.error = d.error || "Host's domain name can not be converted to ASCII: " + I;
        }
      (!b || b && !b.skipNormalize) && (_ && d.scheme !== void 0 && (d.scheme = unescape(d.scheme)), _ && d.host !== void 0 && (d.host = unescape(d.host)), d.path && (d.path = escape(unescape(d.path))), d.fragment && (d.fragment = encodeURI(decodeURIComponent(d.fragment)))), b && b.parse && b.parse(d, r);
    } else
      d.error = d.error || "URI can not be parsed.";
    return d;
  }
  const v = {
    SCHEMES: s,
    normalize: c,
    resolve: o,
    resolveComponents: i,
    equal: p,
    serialize: a,
    parse: P
  };
  return ct.exports = v, ct.exports.default = v, ct.exports.fastUri = v, ct.exports;
}
var Ha;
function Ju() {
  if (Ha) return Ct;
  Ha = 1, Object.defineProperty(Ct, "__esModule", { value: !0 });
  const e = Bc();
  return e.code = 'require("ajv/dist/runtime/uri").default', Ct.default = e, Ct;
}
var Wa;
function Xu() {
  return Wa || (Wa = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = dn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var l = re();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return l._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return l.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return l.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return l.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return l.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return l.CodeGen;
    } });
    const n = Us(), u = fn(), s = Hc(), c = zs(), o = re(), i = ln(), p = sn(), a = ae(), y = Gu, E = Ju(), w = (j, R) => new RegExp(j, R);
    w.code = "new RegExp";
    const P = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), h = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, f = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, r = 200;
    function d(j) {
      var R, A, O, m, S, q, K, G, Z, Q, N, T, k, L, H, X, ne, he, oe, ce, se, ge, fe, Ue, ze;
      const Se = j.strict, Ke = (R = j.code) === null || R === void 0 ? void 0 : R.optimize, st = Ke === !0 || Ke === void 0 ? 1 : Ke || 0, at = (O = (A = j.code) === null || A === void 0 ? void 0 : A.regExp) !== null && O !== void 0 ? O : w, Sn = (m = j.uriResolver) !== null && m !== void 0 ? m : E.default;
      return {
        strictSchema: (q = (S = j.strictSchema) !== null && S !== void 0 ? S : Se) !== null && q !== void 0 ? q : !0,
        strictNumbers: (G = (K = j.strictNumbers) !== null && K !== void 0 ? K : Se) !== null && G !== void 0 ? G : !0,
        strictTypes: (Q = (Z = j.strictTypes) !== null && Z !== void 0 ? Z : Se) !== null && Q !== void 0 ? Q : "log",
        strictTuples: (T = (N = j.strictTuples) !== null && N !== void 0 ? N : Se) !== null && T !== void 0 ? T : "log",
        strictRequired: (L = (k = j.strictRequired) !== null && k !== void 0 ? k : Se) !== null && L !== void 0 ? L : !1,
        code: j.code ? { ...j.code, optimize: st, regExp: at } : { optimize: st, regExp: at },
        loopRequired: (H = j.loopRequired) !== null && H !== void 0 ? H : r,
        loopEnum: (X = j.loopEnum) !== null && X !== void 0 ? X : r,
        meta: (ne = j.meta) !== null && ne !== void 0 ? ne : !0,
        messages: (he = j.messages) !== null && he !== void 0 ? he : !0,
        inlineRefs: (oe = j.inlineRefs) !== null && oe !== void 0 ? oe : !0,
        schemaId: (ce = j.schemaId) !== null && ce !== void 0 ? ce : "$id",
        addUsedSchema: (se = j.addUsedSchema) !== null && se !== void 0 ? se : !0,
        validateSchema: (ge = j.validateSchema) !== null && ge !== void 0 ? ge : !0,
        validateFormats: (fe = j.validateFormats) !== null && fe !== void 0 ? fe : !0,
        unicodeRegExp: (Ue = j.unicodeRegExp) !== null && Ue !== void 0 ? Ue : !0,
        int32range: (ze = j.int32range) !== null && ze !== void 0 ? ze : !0,
        uriResolver: Sn
      };
    }
    class _ {
      constructor(R = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), R = this.opts = { ...R, ...d(R) };
        const { es5: A, lines: O } = this.opts.code;
        this.scope = new o.ValueScope({ scope: {}, prefixes: v, es5: A, lines: O }), this.logger = B(R.logger);
        const m = R.validateFormats;
        R.validateFormats = !1, this.RULES = (0, s.getRules)(), g.call(this, h, R, "NOT SUPPORTED"), g.call(this, f, R, "DEPRECATED", "warn"), this._metaOpts = M.call(this), R.formats && I.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), R.keywords && C.call(this, R.keywords), typeof R.meta == "object" && this.addMetaSchema(R.meta), b.call(this), R.validateFormats = m;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: R, meta: A, schemaId: O } = this.opts;
        let m = y;
        O === "id" && (m = { ...y }, m.id = m.$id, delete m.$id), A && R && this.addMetaSchema(m, m[O], !1);
      }
      defaultMeta() {
        const { meta: R, schemaId: A } = this.opts;
        return this.opts.defaultMeta = typeof R == "object" ? R[A] || R : void 0;
      }
      validate(R, A) {
        let O;
        if (typeof R == "string") {
          if (O = this.getSchema(R), !O)
            throw new Error(`no schema with key or ref "${R}"`);
        } else
          O = this.compile(R);
        const m = O(A);
        return "$async" in O || (this.errors = O.errors), m;
      }
      compile(R, A) {
        const O = this._addSchema(R, A);
        return O.validate || this._compileSchemaEnv(O);
      }
      compileAsync(R, A) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: O } = this.opts;
        return m.call(this, R, A);
        async function m(Q, N) {
          await S.call(this, Q.$schema);
          const T = this._addSchema(Q, N);
          return T.validate || q.call(this, T);
        }
        async function S(Q) {
          Q && !this.getSchema(Q) && await m.call(this, { $ref: Q }, !0);
        }
        async function q(Q) {
          try {
            return this._compileSchemaEnv(Q);
          } catch (N) {
            if (!(N instanceof u.default))
              throw N;
            return K.call(this, N), await G.call(this, N.missingSchema), q.call(this, Q);
          }
        }
        function K({ missingSchema: Q, missingRef: N }) {
          if (this.refs[Q])
            throw new Error(`AnySchema ${Q} is loaded but ${N} cannot be resolved`);
        }
        async function G(Q) {
          const N = await Z.call(this, Q);
          this.refs[Q] || await S.call(this, N.$schema), this.refs[Q] || this.addSchema(N, Q, A);
        }
        async function Z(Q) {
          const N = this._loading[Q];
          if (N)
            return N;
          try {
            return await (this._loading[Q] = O(Q));
          } finally {
            delete this._loading[Q];
          }
        }
      }
      // Adds schema to the instance
      addSchema(R, A, O, m = this.opts.validateSchema) {
        if (Array.isArray(R)) {
          for (const q of R)
            this.addSchema(q, void 0, O, m);
          return this;
        }
        let S;
        if (typeof R == "object") {
          const { schemaId: q } = this.opts;
          if (S = R[q], S !== void 0 && typeof S != "string")
            throw new Error(`schema ${q} must be string`);
        }
        return A = (0, i.normalizeId)(A || S), this._checkUnique(A), this.schemas[A] = this._addSchema(R, O, A, m, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(R, A, O = this.opts.validateSchema) {
        return this.addSchema(R, A, !0, O), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(R, A) {
        if (typeof R == "boolean")
          return !0;
        let O;
        if (O = R.$schema, O !== void 0 && typeof O != "string")
          throw new Error("$schema must be a string");
        if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const m = this.validate(O, R);
        if (!m && A) {
          const S = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(S);
          else
            throw new Error(S);
        }
        return m;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(R) {
        let A;
        for (; typeof (A = $.call(this, R)) == "string"; )
          R = A;
        if (A === void 0) {
          const { schemaId: O } = this.opts, m = new c.SchemaEnv({ schema: {}, schemaId: O });
          if (A = c.resolveSchema.call(this, m, R), !A)
            return;
          this.refs[R] = A;
        }
        return A.validate || this._compileSchemaEnv(A);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(R) {
        if (R instanceof RegExp)
          return this._removeAllSchemas(this.schemas, R), this._removeAllSchemas(this.refs, R), this;
        switch (typeof R) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const A = $.call(this, R);
            return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[R], delete this.refs[R], this;
          }
          case "object": {
            const A = R;
            this._cache.delete(A);
            let O = R[this.opts.schemaId];
            return O && (O = (0, i.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(R) {
        for (const A of R)
          this.addKeyword(A);
        return this;
      }
      addKeyword(R, A) {
        let O;
        if (typeof R == "string")
          O = R, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = O);
        else if (typeof R == "object" && A === void 0) {
          if (A = R, O = A.keyword, Array.isArray(O) && !O.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (F.call(this, O, A), !A)
          return (0, a.eachItem)(O, (S) => z.call(this, S)), this;
        J.call(this, A);
        const m = {
          ...A,
          type: (0, p.getJSONTypes)(A.type),
          schemaType: (0, p.getJSONTypes)(A.schemaType)
        };
        return (0, a.eachItem)(O, m.type.length === 0 ? (S) => z.call(this, S, m) : (S) => m.type.forEach((q) => z.call(this, S, m, q))), this;
      }
      getKeyword(R) {
        const A = this.RULES.all[R];
        return typeof A == "object" ? A.definition : !!A;
      }
      // Remove keyword
      removeKeyword(R) {
        const { RULES: A } = this;
        delete A.keywords[R], delete A.all[R];
        for (const O of A.rules) {
          const m = O.rules.findIndex((S) => S.keyword === R);
          m >= 0 && O.rules.splice(m, 1);
        }
        return this;
      }
      // Add format
      addFormat(R, A) {
        return typeof A == "string" && (A = new RegExp(A)), this.formats[R] = A, this;
      }
      errorsText(R = this.errors, { separator: A = ", ", dataVar: O = "data" } = {}) {
        return !R || R.length === 0 ? "No errors" : R.map((m) => `${O}${m.instancePath} ${m.message}`).reduce((m, S) => m + A + S);
      }
      $dataMetaSchema(R, A) {
        const O = this.RULES.all;
        R = JSON.parse(JSON.stringify(R));
        for (const m of A) {
          const S = m.split("/").slice(1);
          let q = R;
          for (const K of S)
            q = q[K];
          for (const K in O) {
            const G = O[K];
            if (typeof G != "object")
              continue;
            const { $data: Z } = G.definition, Q = q[K];
            Z && Q && (q[K] = U(Q));
          }
        }
        return R;
      }
      _removeAllSchemas(R, A) {
        for (const O in R) {
          const m = R[O];
          (!A || A.test(O)) && (typeof m == "string" ? delete R[O] : m && !m.meta && (this._cache.delete(m.schema), delete R[O]));
        }
      }
      _addSchema(R, A, O, m = this.opts.validateSchema, S = this.opts.addUsedSchema) {
        let q;
        const { schemaId: K } = this.opts;
        if (typeof R == "object")
          q = R[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof R != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let G = this._cache.get(R);
        if (G !== void 0)
          return G;
        O = (0, i.normalizeId)(q || O);
        const Z = i.getSchemaRefs.call(this, R, O);
        return G = new c.SchemaEnv({ schema: R, schemaId: K, meta: A, baseId: O, localRefs: Z }), this._cache.set(G.schema, G), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = G), m && this.validateSchema(R, !0), G;
      }
      _checkUnique(R) {
        if (this.schemas[R] || this.refs[R])
          throw new Error(`schema with key or id "${R}" already exists`);
      }
      _compileSchemaEnv(R) {
        if (R.meta ? this._compileMetaSchema(R) : c.compileSchema.call(this, R), !R.validate)
          throw new Error("ajv implementation error");
        return R.validate;
      }
      _compileMetaSchema(R) {
        const A = this.opts;
        this.opts = this._metaOpts;
        try {
          c.compileSchema.call(this, R);
        } finally {
          this.opts = A;
        }
      }
    }
    _.ValidationError = n.default, _.MissingRefError = u.default, e.default = _;
    function g(j, R, A, O = "error") {
      for (const m in j) {
        const S = m;
        S in R && this.logger[O](`${A}: option ${m}. ${j[S]}`);
      }
    }
    function $(j) {
      return j = (0, i.normalizeId)(j), this.schemas[j] || this.refs[j];
    }
    function b() {
      const j = this.opts.schemas;
      if (j)
        if (Array.isArray(j))
          this.addSchema(j);
        else
          for (const R in j)
            this.addSchema(j[R], R);
    }
    function I() {
      for (const j in this.opts.formats) {
        const R = this.opts.formats[j];
        R && this.addFormat(j, R);
      }
    }
    function C(j) {
      if (Array.isArray(j)) {
        this.addVocabulary(j);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const R in j) {
        const A = j[R];
        A.keyword || (A.keyword = R), this.addKeyword(A);
      }
    }
    function M() {
      const j = { ...this.opts };
      for (const R of P)
        delete j[R];
      return j;
    }
    const V = { log() {
    }, warn() {
    }, error() {
    } };
    function B(j) {
      if (j === !1)
        return V;
      if (j === void 0)
        return console;
      if (j.log && j.warn && j.error)
        return j;
      throw new Error("logger must implement log, warn and error methods");
    }
    const W = /^[a-z_$][a-z0-9_$:-]*$/i;
    function F(j, R) {
      const { RULES: A } = this;
      if ((0, a.eachItem)(j, (O) => {
        if (A.keywords[O])
          throw new Error(`Keyword ${O} is already defined`);
        if (!W.test(O))
          throw new Error(`Keyword ${O} has invalid name`);
      }), !!R && R.$data && !("code" in R || "validate" in R))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(j, R, A) {
      var O;
      const m = R == null ? void 0 : R.post;
      if (A && m)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: S } = this;
      let q = m ? S.post : S.rules.find(({ type: G }) => G === A);
      if (q || (q = { type: A, rules: [] }, S.rules.push(q)), S.keywords[j] = !0, !R)
        return;
      const K = {
        keyword: j,
        definition: {
          ...R,
          type: (0, p.getJSONTypes)(R.type),
          schemaType: (0, p.getJSONTypes)(R.schemaType)
        }
      };
      R.before ? Y.call(this, q, K, R.before) : q.rules.push(K), S.all[j] = K, (O = R.implements) === null || O === void 0 || O.forEach((G) => this.addKeyword(G));
    }
    function Y(j, R, A) {
      const O = j.rules.findIndex((m) => m.keyword === A);
      O >= 0 ? j.rules.splice(O, 0, R) : (j.rules.push(R), this.logger.warn(`rule ${A} is not defined`));
    }
    function J(j) {
      let { metaSchema: R } = j;
      R !== void 0 && (j.$data && this.opts.$data && (R = U(R)), j.validateSchema = this.compile(R, !0));
    }
    const D = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function U(j) {
      return { anyOf: [j, D] };
    }
  }(Nn)), Nn;
}
var kt = {}, Dt = {}, Mt = {}, Ba;
function Yu() {
  if (Ba) return Mt;
  Ba = 1, Object.defineProperty(Mt, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Mt.default = e, Mt;
}
var Me = {}, Ja;
function Qu() {
  if (Ja) return Me;
  Ja = 1, Object.defineProperty(Me, "__esModule", { value: !0 }), Me.callRef = Me.getValidate = void 0;
  const e = fn(), t = Ne(), l = re(), n = Fe(), u = zs(), s = ae(), c = {
    keyword: "$ref",
    schemaType: "string",
    code(p) {
      const { gen: a, schema: y, it: E } = p, { baseId: w, schemaEnv: P, validateName: v, opts: h, self: f } = E, { root: r } = P;
      if ((y === "#" || y === "#/") && w === r.baseId)
        return _();
      const d = u.resolveRef.call(f, r, w, y);
      if (d === void 0)
        throw new e.default(E.opts.uriResolver, w, y);
      if (d instanceof u.SchemaEnv)
        return g(d);
      return $(d);
      function _() {
        if (P === r)
          return i(p, v, P, P.$async);
        const b = a.scopeValue("root", { ref: r });
        return i(p, (0, l._)`${b}.validate`, r, r.$async);
      }
      function g(b) {
        const I = o(p, b);
        i(p, I, b, b.$async);
      }
      function $(b) {
        const I = a.scopeValue("schema", h.code.source === !0 ? { ref: b, code: (0, l.stringify)(b) } : { ref: b }), C = a.name("valid"), M = p.subschema({
          schema: b,
          dataTypes: [],
          schemaPath: l.nil,
          topSchemaRef: I,
          errSchemaPath: y
        }, C);
        p.mergeEvaluated(M), p.ok(C);
      }
    }
  };
  function o(p, a) {
    const { gen: y } = p;
    return a.validate ? y.scopeValue("validate", { ref: a.validate }) : (0, l._)`${y.scopeValue("wrapper", { ref: a })}.validate`;
  }
  Me.getValidate = o;
  function i(p, a, y, E) {
    const { gen: w, it: P } = p, { allErrors: v, schemaEnv: h, opts: f } = P, r = f.passContext ? n.default.this : l.nil;
    E ? d() : _();
    function d() {
      if (!h.$async)
        throw new Error("async schema referenced by sync schema");
      const b = w.let("valid");
      w.try(() => {
        w.code((0, l._)`await ${(0, t.callValidateCode)(p, a, r)}`), $(a), v || w.assign(b, !0);
      }, (I) => {
        w.if((0, l._)`!(${I} instanceof ${P.ValidationError})`, () => w.throw(I)), g(I), v || w.assign(b, !1);
      }), p.ok(b);
    }
    function _() {
      p.result((0, t.callValidateCode)(p, a, r), () => $(a), () => g(a));
    }
    function g(b) {
      const I = (0, l._)`${b}.errors`;
      w.assign(n.default.vErrors, (0, l._)`${n.default.vErrors} === null ? ${I} : ${n.default.vErrors}.concat(${I})`), w.assign(n.default.errors, (0, l._)`${n.default.vErrors}.length`);
    }
    function $(b) {
      var I;
      if (!P.opts.unevaluated)
        return;
      const C = (I = y == null ? void 0 : y.validate) === null || I === void 0 ? void 0 : I.evaluated;
      if (P.props !== !0)
        if (C && !C.dynamicProps)
          C.props !== void 0 && (P.props = s.mergeEvaluated.props(w, C.props, P.props));
        else {
          const M = w.var("props", (0, l._)`${b}.evaluated.props`);
          P.props = s.mergeEvaluated.props(w, M, P.props, l.Name);
        }
      if (P.items !== !0)
        if (C && !C.dynamicItems)
          C.items !== void 0 && (P.items = s.mergeEvaluated.items(w, C.items, P.items));
        else {
          const M = w.var("items", (0, l._)`${b}.evaluated.items`);
          P.items = s.mergeEvaluated.items(w, M, P.items, l.Name);
        }
    }
  }
  return Me.callRef = i, Me.default = c, Me;
}
var Xa;
function Zu() {
  if (Xa) return Dt;
  Xa = 1, Object.defineProperty(Dt, "__esModule", { value: !0 });
  const e = Yu(), t = Qu(), l = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Dt.default = l, Dt;
}
var Lt = {}, Ft = {}, Ya;
function xu() {
  if (Ya) return Ft;
  Ya = 1, Object.defineProperty(Ft, "__esModule", { value: !0 });
  const e = re(), t = e.operators, l = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: c }) => (0, e.str)`must be ${l[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, e._)`{comparison: ${l[s].okStr}, limit: ${c}}`
  }, u = {
    keyword: Object.keys(l),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: c, data: o, schemaCode: i } = s;
      s.fail$data((0, e._)`${o} ${l[c].fail} ${i} || isNaN(${o})`);
    }
  };
  return Ft.default = u, Ft;
}
var Vt = {}, Qa;
function el() {
  if (Qa) return Vt;
  Qa = 1, Object.defineProperty(Vt, "__esModule", { value: !0 });
  const e = re(), l = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: u, data: s, schemaCode: c, it: o } = n, i = o.opts.multipleOfPrecision, p = u.let("res"), a = i ? (0, e._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${i}` : (0, e._)`${p} !== parseInt(${p})`;
      n.fail$data((0, e._)`(${c} === 0 || (${p} = ${s}/${c}, ${a}))`);
    }
  };
  return Vt.default = l, Vt;
}
var Ut = {}, zt = {}, Za;
function tl() {
  if (Za) return zt;
  Za = 1, Object.defineProperty(zt, "__esModule", { value: !0 });
  function e(t) {
    const l = t.length;
    let n = 0, u = 0, s;
    for (; u < l; )
      n++, s = t.charCodeAt(u++), s >= 55296 && s <= 56319 && u < l && (s = t.charCodeAt(u), (s & 64512) === 56320 && u++);
    return n;
  }
  return zt.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', zt;
}
var xa;
function rl() {
  if (xa) return Ut;
  xa = 1, Object.defineProperty(Ut, "__esModule", { value: !0 });
  const e = re(), t = ae(), l = tl(), u = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: c }) {
        const o = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${o} than ${c} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: c, data: o, schemaCode: i, it: p } = s, a = c === "maxLength" ? e.operators.GT : e.operators.LT, y = p.opts.unicode === !1 ? (0, e._)`${o}.length` : (0, e._)`${(0, t.useFunc)(s.gen, l.default)}(${o})`;
      s.fail$data((0, e._)`${y} ${a} ${i}`);
    }
  };
  return Ut.default = u, Ut;
}
var Kt = {}, ei;
function nl() {
  if (ei) return Kt;
  ei = 1, Object.defineProperty(Kt, "__esModule", { value: !0 });
  const e = Ne(), t = re(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: u }) => (0, t.str)`must match pattern "${u}"`,
      params: ({ schemaCode: u }) => (0, t._)`{pattern: ${u}}`
    },
    code(u) {
      const { data: s, $data: c, schema: o, schemaCode: i, it: p } = u, a = p.opts.unicodeRegExp ? "u" : "", y = c ? (0, t._)`(new RegExp(${i}, ${a}))` : (0, e.usePattern)(u, o);
      u.fail$data((0, t._)`!${y}.test(${s})`);
    }
  };
  return Kt.default = n, Kt;
}
var Gt = {}, ti;
function sl() {
  if (ti) return Gt;
  ti = 1, Object.defineProperty(Gt, "__esModule", { value: !0 });
  const e = re(), l = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${u} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: s, schemaCode: c } = n, o = u === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${o} ${c}`);
    }
  };
  return Gt.default = l, Gt;
}
var Ht = {}, ri;
function al() {
  if (ri) return Ht;
  ri = 1, Object.defineProperty(Ht, "__esModule", { value: !0 });
  const e = Ne(), t = re(), l = ae(), u = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: c, schema: o, schemaCode: i, data: p, $data: a, it: y } = s, { opts: E } = y;
      if (!a && o.length === 0)
        return;
      const w = o.length >= E.loopRequired;
      if (y.allErrors ? P() : v(), E.strictRequired) {
        const r = s.parentSchema.properties, { definedProperties: d } = s.it;
        for (const _ of o)
          if ((r == null ? void 0 : r[_]) === void 0 && !d.has(_)) {
            const g = y.schemaEnv.baseId + y.errSchemaPath, $ = `required property "${_}" is not defined at "${g}" (strictRequired)`;
            (0, l.checkStrictMode)(y, $, y.opts.strictRequired);
          }
      }
      function P() {
        if (w || a)
          s.block$data(t.nil, h);
        else
          for (const r of o)
            (0, e.checkReportMissingProp)(s, r);
      }
      function v() {
        const r = c.let("missing");
        if (w || a) {
          const d = c.let("valid", !0);
          s.block$data(d, () => f(r, d)), s.ok(d);
        } else
          c.if((0, e.checkMissingProp)(s, o, r)), (0, e.reportMissingProp)(s, r), c.else();
      }
      function h() {
        c.forOf("prop", i, (r) => {
          s.setParams({ missingProperty: r }), c.if((0, e.noPropertyInData)(c, p, r, E.ownProperties), () => s.error());
        });
      }
      function f(r, d) {
        s.setParams({ missingProperty: r }), c.forOf(r, i, () => {
          c.assign(d, (0, e.propertyInData)(c, p, r, E.ownProperties)), c.if((0, t.not)(d), () => {
            s.error(), c.break();
          });
        }, t.nil);
      }
    }
  };
  return Ht.default = u, Ht;
}
var Wt = {}, ni;
function il() {
  if (ni) return Wt;
  ni = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = re(), l = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${u} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: s, schemaCode: c } = n, o = u === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${o} ${c}`);
    }
  };
  return Wt.default = l, Wt;
}
var Bt = {}, Jt = {}, si;
function Ks() {
  if (si) return Jt;
  si = 1, Object.defineProperty(Jt, "__esModule", { value: !0 });
  const e = un();
  return e.code = 'require("ajv/dist/runtime/equal").default', Jt.default = e, Jt;
}
var ai;
function ol() {
  if (ai) return Bt;
  ai = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  const e = sn(), t = re(), l = ae(), n = Ks(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: c, j: o } }) => (0, t.str)`must NOT have duplicate items (items ## ${o} and ${c} are identical)`,
      params: ({ params: { i: c, j: o } }) => (0, t._)`{i: ${c}, j: ${o}}`
    },
    code(c) {
      const { gen: o, data: i, $data: p, schema: a, parentSchema: y, schemaCode: E, it: w } = c;
      if (!p && !a)
        return;
      const P = o.let("valid"), v = y.items ? (0, e.getSchemaTypes)(y.items) : [];
      c.block$data(P, h, (0, t._)`${E} === false`), c.ok(P);
      function h() {
        const _ = o.let("i", (0, t._)`${i}.length`), g = o.let("j");
        c.setParams({ i: _, j: g }), o.assign(P, !0), o.if((0, t._)`${_} > 1`, () => (f() ? r : d)(_, g));
      }
      function f() {
        return v.length > 0 && !v.some((_) => _ === "object" || _ === "array");
      }
      function r(_, g) {
        const $ = o.name("item"), b = (0, e.checkDataTypes)(v, $, w.opts.strictNumbers, e.DataType.Wrong), I = o.const("indices", (0, t._)`{}`);
        o.for((0, t._)`;${_}--;`, () => {
          o.let($, (0, t._)`${i}[${_}]`), o.if(b, (0, t._)`continue`), v.length > 1 && o.if((0, t._)`typeof ${$} == "string"`, (0, t._)`${$} += "_"`), o.if((0, t._)`typeof ${I}[${$}] == "number"`, () => {
            o.assign(g, (0, t._)`${I}[${$}]`), c.error(), o.assign(P, !1).break();
          }).code((0, t._)`${I}[${$}] = ${_}`);
        });
      }
      function d(_, g) {
        const $ = (0, l.useFunc)(o, n.default), b = o.name("outer");
        o.label(b).for((0, t._)`;${_}--;`, () => o.for((0, t._)`${g} = ${_}; ${g}--;`, () => o.if((0, t._)`${$}(${i}[${_}], ${i}[${g}])`, () => {
          c.error(), o.assign(P, !1).break(b);
        })));
      }
    }
  };
  return Bt.default = s, Bt;
}
var Xt = {}, ii;
function cl() {
  if (ii) return Xt;
  ii = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = re(), t = ae(), l = Ks(), u = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: c, data: o, $data: i, schemaCode: p, schema: a } = s;
      i || a && typeof a == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(c, l.default)}(${o}, ${p})`) : s.fail((0, e._)`${a} !== ${o}`);
    }
  };
  return Xt.default = u, Xt;
}
var Yt = {}, oi;
function ul() {
  if (oi) return Yt;
  oi = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = re(), t = ae(), l = Ks(), u = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: c, data: o, $data: i, schema: p, schemaCode: a, it: y } = s;
      if (!i && p.length === 0)
        throw new Error("enum must have non-empty array");
      const E = p.length >= y.opts.loopEnum;
      let w;
      const P = () => w ?? (w = (0, t.useFunc)(c, l.default));
      let v;
      if (E || i)
        v = c.let("valid"), s.block$data(v, h);
      else {
        if (!Array.isArray(p))
          throw new Error("ajv implementation error");
        const r = c.const("vSchema", a);
        v = (0, e.or)(...p.map((d, _) => f(r, _)));
      }
      s.pass(v);
      function h() {
        c.assign(v, !1), c.forOf("v", a, (r) => c.if((0, e._)`${P()}(${o}, ${r})`, () => c.assign(v, !0).break()));
      }
      function f(r, d) {
        const _ = p[d];
        return typeof _ == "object" && _ !== null ? (0, e._)`${P()}(${o}, ${r}[${d}])` : (0, e._)`${o} === ${_}`;
      }
    }
  };
  return Yt.default = u, Yt;
}
var ci;
function ll() {
  if (ci) return Lt;
  ci = 1, Object.defineProperty(Lt, "__esModule", { value: !0 });
  const e = xu(), t = el(), l = rl(), n = nl(), u = sl(), s = al(), c = il(), o = ol(), i = cl(), p = ul(), a = [
    // number
    e.default,
    t.default,
    // string
    l.default,
    n.default,
    // object
    u.default,
    s.default,
    // array
    c.default,
    o.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    i.default,
    p.default
  ];
  return Lt.default = a, Lt;
}
var Qt = {}, xe = {}, ui;
function Jc() {
  if (ui) return xe;
  ui = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.validateAdditionalItems = void 0;
  const e = re(), t = ae(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: c, it: o } = s, { items: i } = c;
      if (!Array.isArray(i)) {
        (0, t.checkStrictMode)(o, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      u(s, i);
    }
  };
  function u(s, c) {
    const { gen: o, schema: i, data: p, keyword: a, it: y } = s;
    y.items = !0;
    const E = o.const("len", (0, e._)`${p}.length`);
    if (i === !1)
      s.setParams({ len: c.length }), s.pass((0, e._)`${E} <= ${c.length}`);
    else if (typeof i == "object" && !(0, t.alwaysValidSchema)(y, i)) {
      const P = o.var("valid", (0, e._)`${E} <= ${c.length}`);
      o.if((0, e.not)(P), () => w(P)), s.ok(P);
    }
    function w(P) {
      o.forRange("i", c.length, E, (v) => {
        s.subschema({ keyword: a, dataProp: v, dataPropType: t.Type.Num }, P), y.allErrors || o.if((0, e.not)(P), () => o.break());
      });
    }
  }
  return xe.validateAdditionalItems = u, xe.default = n, xe;
}
var Zt = {}, et = {}, li;
function Xc() {
  if (li) return et;
  li = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.validateTuple = void 0;
  const e = re(), t = ae(), l = Ne(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: c, it: o } = s;
      if (Array.isArray(c))
        return u(s, "additionalItems", c);
      o.items = !0, !(0, t.alwaysValidSchema)(o, c) && s.ok((0, l.validateArray)(s));
    }
  };
  function u(s, c, o = s.schema) {
    const { gen: i, parentSchema: p, data: a, keyword: y, it: E } = s;
    v(p), E.opts.unevaluated && o.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(i, o.length, E.items));
    const w = i.name("valid"), P = i.const("len", (0, e._)`${a}.length`);
    o.forEach((h, f) => {
      (0, t.alwaysValidSchema)(E, h) || (i.if((0, e._)`${P} > ${f}`, () => s.subschema({
        keyword: y,
        schemaProp: f,
        dataProp: f
      }, w)), s.ok(w));
    });
    function v(h) {
      const { opts: f, errSchemaPath: r } = E, d = o.length, _ = d === h.minItems && (d === h.maxItems || h[c] === !1);
      if (f.strictTuples && !_) {
        const g = `"${y}" is ${d}-tuple, but minItems or maxItems/${c} are not specified or different at path "${r}"`;
        (0, t.checkStrictMode)(E, g, f.strictTuples);
      }
    }
  }
  return et.validateTuple = u, et.default = n, et;
}
var di;
function dl() {
  if (di) return Zt;
  di = 1, Object.defineProperty(Zt, "__esModule", { value: !0 });
  const e = Xc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (l) => (0, e.validateTuple)(l, "items")
  };
  return Zt.default = t, Zt;
}
var xt = {}, fi;
function fl() {
  if (fi) return xt;
  fi = 1, Object.defineProperty(xt, "__esModule", { value: !0 });
  const e = re(), t = ae(), l = Ne(), n = Jc(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: c } }) => (0, e.str)`must NOT have more than ${c} items`,
      params: ({ params: { len: c } }) => (0, e._)`{limit: ${c}}`
    },
    code(c) {
      const { schema: o, parentSchema: i, it: p } = c, { prefixItems: a } = i;
      p.items = !0, !(0, t.alwaysValidSchema)(p, o) && (a ? (0, n.validateAdditionalItems)(c, a) : c.ok((0, l.validateArray)(c)));
    }
  };
  return xt.default = s, xt;
}
var er = {}, hi;
function hl() {
  if (hi) return er;
  hi = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = re(), t = ae(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: u, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${u} valid item(s)` : (0, e.str)`must contain at least ${u} and no more than ${s} valid item(s)`,
      params: ({ params: { min: u, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${u}}` : (0, e._)`{minContains: ${u}, maxContains: ${s}}`
    },
    code(u) {
      const { gen: s, schema: c, parentSchema: o, data: i, it: p } = u;
      let a, y;
      const { minContains: E, maxContains: w } = o;
      p.opts.next ? (a = E === void 0 ? 1 : E, y = w) : a = 1;
      const P = s.const("len", (0, e._)`${i}.length`);
      if (u.setParams({ min: a, max: y }), y === void 0 && a === 0) {
        (0, t.checkStrictMode)(p, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (y !== void 0 && a > y) {
        (0, t.checkStrictMode)(p, '"minContains" > "maxContains" is always invalid'), u.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(p, c)) {
        let d = (0, e._)`${P} >= ${a}`;
        y !== void 0 && (d = (0, e._)`${d} && ${P} <= ${y}`), u.pass(d);
        return;
      }
      p.items = !0;
      const v = s.name("valid");
      y === void 0 && a === 1 ? f(v, () => s.if(v, () => s.break())) : a === 0 ? (s.let(v, !0), y !== void 0 && s.if((0, e._)`${i}.length > 0`, h)) : (s.let(v, !1), h()), u.result(v, () => u.reset());
      function h() {
        const d = s.name("_valid"), _ = s.let("count", 0);
        f(d, () => s.if(d, () => r(_)));
      }
      function f(d, _) {
        s.forRange("i", 0, P, (g) => {
          u.subschema({
            keyword: "contains",
            dataProp: g,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, d), _();
        });
      }
      function r(d) {
        s.code((0, e._)`${d}++`), y === void 0 ? s.if((0, e._)`${d} >= ${a}`, () => s.assign(v, !0).break()) : (s.if((0, e._)`${d} > ${y}`, () => s.assign(v, !1).break()), a === 1 ? s.assign(v, !0) : s.if((0, e._)`${d} >= ${a}`, () => s.assign(v, !0)));
      }
    }
  };
  return er.default = n, er;
}
var Mn = {}, mi;
function ml() {
  return mi || (mi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = re(), l = ae(), n = Ne();
    e.error = {
      message: ({ params: { property: i, depsCount: p, deps: a } }) => {
        const y = p === 1 ? "property" : "properties";
        return (0, t.str)`must have ${y} ${a} when property ${i} is present`;
      },
      params: ({ params: { property: i, depsCount: p, deps: a, missingProperty: y } }) => (0, t._)`{property: ${i},
    missingProperty: ${y},
    depsCount: ${p},
    deps: ${a}}`
      // TODO change to reference
    };
    const u = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(i) {
        const [p, a] = s(i);
        c(i, p), o(i, a);
      }
    };
    function s({ schema: i }) {
      const p = {}, a = {};
      for (const y in i) {
        if (y === "__proto__")
          continue;
        const E = Array.isArray(i[y]) ? p : a;
        E[y] = i[y];
      }
      return [p, a];
    }
    function c(i, p = i.schema) {
      const { gen: a, data: y, it: E } = i;
      if (Object.keys(p).length === 0)
        return;
      const w = a.let("missing");
      for (const P in p) {
        const v = p[P];
        if (v.length === 0)
          continue;
        const h = (0, n.propertyInData)(a, y, P, E.opts.ownProperties);
        i.setParams({
          property: P,
          depsCount: v.length,
          deps: v.join(", ")
        }), E.allErrors ? a.if(h, () => {
          for (const f of v)
            (0, n.checkReportMissingProp)(i, f);
        }) : (a.if((0, t._)`${h} && (${(0, n.checkMissingProp)(i, v, w)})`), (0, n.reportMissingProp)(i, w), a.else());
      }
    }
    e.validatePropertyDeps = c;
    function o(i, p = i.schema) {
      const { gen: a, data: y, keyword: E, it: w } = i, P = a.name("valid");
      for (const v in p)
        (0, l.alwaysValidSchema)(w, p[v]) || (a.if(
          (0, n.propertyInData)(a, y, v, w.opts.ownProperties),
          () => {
            const h = i.subschema({ keyword: E, schemaProp: v }, P);
            i.mergeValidEvaluated(h, P);
          },
          () => a.var(P, !0)
          // TODO var
        ), i.ok(P));
    }
    e.validateSchemaDeps = o, e.default = u;
  }(Mn)), Mn;
}
var tr = {}, pi;
function pl() {
  if (pi) return tr;
  pi = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const e = re(), t = ae(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: u }) => (0, e._)`{propertyName: ${u.propertyName}}`
    },
    code(u) {
      const { gen: s, schema: c, data: o, it: i } = u;
      if ((0, t.alwaysValidSchema)(i, c))
        return;
      const p = s.name("valid");
      s.forIn("key", o, (a) => {
        u.setParams({ propertyName: a }), u.subschema({
          keyword: "propertyNames",
          data: a,
          dataTypes: ["string"],
          propertyName: a,
          compositeRule: !0
        }, p), s.if((0, e.not)(p), () => {
          u.error(!0), i.allErrors || s.break();
        });
      }), u.ok(p);
    }
  };
  return tr.default = n, tr;
}
var rr = {}, yi;
function Yc() {
  if (yi) return rr;
  yi = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = Ne(), t = re(), l = Fe(), n = ae(), s = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: c }) => (0, t._)`{additionalProperty: ${c.additionalProperty}}`
    },
    code(c) {
      const { gen: o, schema: i, parentSchema: p, data: a, errsCount: y, it: E } = c;
      if (!y)
        throw new Error("ajv implementation error");
      const { allErrors: w, opts: P } = E;
      if (E.props = !0, P.removeAdditional !== "all" && (0, n.alwaysValidSchema)(E, i))
        return;
      const v = (0, e.allSchemaProperties)(p.properties), h = (0, e.allSchemaProperties)(p.patternProperties);
      f(), c.ok((0, t._)`${y} === ${l.default.errors}`);
      function f() {
        o.forIn("key", a, ($) => {
          !v.length && !h.length ? _($) : o.if(r($), () => _($));
        });
      }
      function r($) {
        let b;
        if (v.length > 8) {
          const I = (0, n.schemaRefOrVal)(E, p.properties, "properties");
          b = (0, e.isOwnProperty)(o, I, $);
        } else v.length ? b = (0, t.or)(...v.map((I) => (0, t._)`${$} === ${I}`)) : b = t.nil;
        return h.length && (b = (0, t.or)(b, ...h.map((I) => (0, t._)`${(0, e.usePattern)(c, I)}.test(${$})`))), (0, t.not)(b);
      }
      function d($) {
        o.code((0, t._)`delete ${a}[${$}]`);
      }
      function _($) {
        if (P.removeAdditional === "all" || P.removeAdditional && i === !1) {
          d($);
          return;
        }
        if (i === !1) {
          c.setParams({ additionalProperty: $ }), c.error(), w || o.break();
          return;
        }
        if (typeof i == "object" && !(0, n.alwaysValidSchema)(E, i)) {
          const b = o.name("valid");
          P.removeAdditional === "failing" ? (g($, b, !1), o.if((0, t.not)(b), () => {
            c.reset(), d($);
          })) : (g($, b), w || o.if((0, t.not)(b), () => o.break()));
        }
      }
      function g($, b, I) {
        const C = {
          keyword: "additionalProperties",
          dataProp: $,
          dataPropType: n.Type.Str
        };
        I === !1 && Object.assign(C, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), c.subschema(C, b);
      }
    }
  };
  return rr.default = s, rr;
}
var nr = {}, $i;
function yl() {
  if ($i) return nr;
  $i = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = dn(), t = Ne(), l = ae(), n = Yc(), u = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: o, parentSchema: i, data: p, it: a } = s;
      a.opts.removeAdditional === "all" && i.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(a, n.default, "additionalProperties"));
      const y = (0, t.allSchemaProperties)(o);
      for (const h of y)
        a.definedProperties.add(h);
      a.opts.unevaluated && y.length && a.props !== !0 && (a.props = l.mergeEvaluated.props(c, (0, l.toHash)(y), a.props));
      const E = y.filter((h) => !(0, l.alwaysValidSchema)(a, o[h]));
      if (E.length === 0)
        return;
      const w = c.name("valid");
      for (const h of E)
        P(h) ? v(h) : (c.if((0, t.propertyInData)(c, p, h, a.opts.ownProperties)), v(h), a.allErrors || c.else().var(w, !0), c.endIf()), s.it.definedProperties.add(h), s.ok(w);
      function P(h) {
        return a.opts.useDefaults && !a.compositeRule && o[h].default !== void 0;
      }
      function v(h) {
        s.subschema({
          keyword: "properties",
          schemaProp: h,
          dataProp: h
        }, w);
      }
    }
  };
  return nr.default = u, nr;
}
var sr = {}, vi;
function $l() {
  if (vi) return sr;
  vi = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = Ne(), t = re(), l = ae(), n = ae(), u = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: o, data: i, parentSchema: p, it: a } = s, { opts: y } = a, E = (0, e.allSchemaProperties)(o), w = E.filter((_) => (0, l.alwaysValidSchema)(a, o[_]));
      if (E.length === 0 || w.length === E.length && (!a.opts.unevaluated || a.props === !0))
        return;
      const P = y.strictSchema && !y.allowMatchingProperties && p.properties, v = c.name("valid");
      a.props !== !0 && !(a.props instanceof t.Name) && (a.props = (0, n.evaluatedPropsToName)(c, a.props));
      const { props: h } = a;
      f();
      function f() {
        for (const _ of E)
          P && r(_), a.allErrors ? d(_) : (c.var(v, !0), d(_), c.if(v));
      }
      function r(_) {
        for (const g in P)
          new RegExp(_).test(g) && (0, l.checkStrictMode)(a, `property ${g} matches pattern ${_} (use allowMatchingProperties)`);
      }
      function d(_) {
        c.forIn("key", i, (g) => {
          c.if((0, t._)`${(0, e.usePattern)(s, _)}.test(${g})`, () => {
            const $ = w.includes(_);
            $ || s.subschema({
              keyword: "patternProperties",
              schemaProp: _,
              dataProp: g,
              dataPropType: n.Type.Str
            }, v), a.opts.unevaluated && h !== !0 ? c.assign((0, t._)`${h}[${g}]`, !0) : !$ && !a.allErrors && c.if((0, t.not)(v), () => c.break());
          });
        });
      }
    }
  };
  return sr.default = u, sr;
}
var ar = {}, _i;
function vl() {
  if (_i) return ar;
  _i = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(l) {
      const { gen: n, schema: u, it: s } = l;
      if ((0, e.alwaysValidSchema)(s, u)) {
        l.fail();
        return;
      }
      const c = n.name("valid");
      l.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c), l.failResult(c, () => l.reset(), () => l.error());
    },
    error: { message: "must NOT be valid" }
  };
  return ar.default = t, ar;
}
var ir = {}, gi;
function _l() {
  if (gi) return ir;
  gi = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Ne().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return ir.default = t, ir;
}
var or = {}, wi;
function gl() {
  if (wi) return or;
  wi = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = re(), t = ae(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: u }) => (0, e._)`{passingSchemas: ${u.passing}}`
    },
    code(u) {
      const { gen: s, schema: c, parentSchema: o, it: i } = u;
      if (!Array.isArray(c))
        throw new Error("ajv implementation error");
      if (i.opts.discriminator && o.discriminator)
        return;
      const p = c, a = s.let("valid", !1), y = s.let("passing", null), E = s.name("_valid");
      u.setParams({ passing: y }), s.block(w), u.result(a, () => u.reset(), () => u.error(!0));
      function w() {
        p.forEach((P, v) => {
          let h;
          (0, t.alwaysValidSchema)(i, P) ? s.var(E, !0) : h = u.subschema({
            keyword: "oneOf",
            schemaProp: v,
            compositeRule: !0
          }, E), v > 0 && s.if((0, e._)`${E} && ${a}`).assign(a, !1).assign(y, (0, e._)`[${y}, ${v}]`).else(), s.if(E, () => {
            s.assign(a, !0), s.assign(y, v), h && u.mergeEvaluated(h, e.Name);
          });
        });
      }
    }
  };
  return or.default = n, or;
}
var cr = {}, Ei;
function wl() {
  if (Ei) return cr;
  Ei = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(l) {
      const { gen: n, schema: u, it: s } = l;
      if (!Array.isArray(u))
        throw new Error("ajv implementation error");
      const c = n.name("valid");
      u.forEach((o, i) => {
        if ((0, e.alwaysValidSchema)(s, o))
          return;
        const p = l.subschema({ keyword: "allOf", schemaProp: i }, c);
        l.ok(c), l.mergeEvaluated(p);
      });
    }
  };
  return cr.default = t, cr;
}
var ur = {}, Si;
function El() {
  if (Si) return ur;
  Si = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const e = re(), t = ae(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: c, parentSchema: o, it: i } = s;
      o.then === void 0 && o.else === void 0 && (0, t.checkStrictMode)(i, '"if" without "then" and "else" is ignored');
      const p = u(i, "then"), a = u(i, "else");
      if (!p && !a)
        return;
      const y = c.let("valid", !0), E = c.name("_valid");
      if (w(), s.reset(), p && a) {
        const v = c.let("ifClause");
        s.setParams({ ifClause: v }), c.if(E, P("then", v), P("else", v));
      } else p ? c.if(E, P("then")) : c.if((0, e.not)(E), P("else"));
      s.pass(y, () => s.error(!0));
      function w() {
        const v = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        s.mergeEvaluated(v);
      }
      function P(v, h) {
        return () => {
          const f = s.subschema({ keyword: v }, E);
          c.assign(y, E), s.mergeValidEvaluated(f, y), h ? c.assign(h, (0, e._)`${v}`) : s.setParams({ ifClause: v });
        };
      }
    }
  };
  function u(s, c) {
    const o = s.schema[c];
    return o !== void 0 && !(0, t.alwaysValidSchema)(s, o);
  }
  return ur.default = n, ur;
}
var lr = {}, bi;
function Sl() {
  if (bi) return lr;
  bi = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = ae(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: l, parentSchema: n, it: u }) {
      n.if === void 0 && (0, e.checkStrictMode)(u, `"${l}" without "if" is ignored`);
    }
  };
  return lr.default = t, lr;
}
var Pi;
function bl() {
  if (Pi) return Qt;
  Pi = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = Jc(), t = dl(), l = Xc(), n = fl(), u = hl(), s = ml(), c = pl(), o = Yc(), i = yl(), p = $l(), a = vl(), y = _l(), E = gl(), w = wl(), P = El(), v = Sl();
  function h(f = !1) {
    const r = [
      // any
      a.default,
      y.default,
      E.default,
      w.default,
      P.default,
      v.default,
      // object
      c.default,
      o.default,
      s.default,
      i.default,
      p.default
    ];
    return f ? r.push(t.default, n.default) : r.push(e.default, l.default), r.push(u.default), r;
  }
  return Qt.default = h, Qt;
}
var dr = {}, fr = {}, Ri;
function Pl() {
  if (Ri) return fr;
  Ri = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const e = re(), l = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, u) {
      const { gen: s, data: c, $data: o, schema: i, schemaCode: p, it: a } = n, { opts: y, errSchemaPath: E, schemaEnv: w, self: P } = a;
      if (!y.validateFormats)
        return;
      o ? v() : h();
      function v() {
        const f = s.scopeValue("formats", {
          ref: P.formats,
          code: y.code.formats
        }), r = s.const("fDef", (0, e._)`${f}[${p}]`), d = s.let("fType"), _ = s.let("format");
        s.if((0, e._)`typeof ${r} == "object" && !(${r} instanceof RegExp)`, () => s.assign(d, (0, e._)`${r}.type || "string"`).assign(_, (0, e._)`${r}.validate`), () => s.assign(d, (0, e._)`"string"`).assign(_, r)), n.fail$data((0, e.or)(g(), $()));
        function g() {
          return y.strictSchema === !1 ? e.nil : (0, e._)`${p} && !${_}`;
        }
        function $() {
          const b = w.$async ? (0, e._)`(${r}.async ? await ${_}(${c}) : ${_}(${c}))` : (0, e._)`${_}(${c})`, I = (0, e._)`(typeof ${_} == "function" ? ${b} : ${_}.test(${c}))`;
          return (0, e._)`${_} && ${_} !== true && ${d} === ${u} && !${I}`;
        }
      }
      function h() {
        const f = P.formats[i];
        if (!f) {
          g();
          return;
        }
        if (f === !0)
          return;
        const [r, d, _] = $(f);
        r === u && n.pass(b());
        function g() {
          if (y.strictSchema === !1) {
            P.logger.warn(I());
            return;
          }
          throw new Error(I());
          function I() {
            return `unknown format "${i}" ignored in schema at path "${E}"`;
          }
        }
        function $(I) {
          const C = I instanceof RegExp ? (0, e.regexpCode)(I) : y.code.formats ? (0, e._)`${y.code.formats}${(0, e.getProperty)(i)}` : void 0, M = s.scopeValue("formats", { key: i, ref: I, code: C });
          return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, e._)`${M}.validate`] : ["string", I, M];
        }
        function b() {
          if (typeof f == "object" && !(f instanceof RegExp) && f.async) {
            if (!w.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${_}(${c})`;
          }
          return typeof d == "function" ? (0, e._)`${_}(${c})` : (0, e._)`${_}.test(${c})`;
        }
      }
    }
  };
  return fr.default = l, fr;
}
var Ni;
function Rl() {
  if (Ni) return dr;
  Ni = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const t = [Pl().default];
  return dr.default = t, dr;
}
var Je = {}, Oi;
function Nl() {
  return Oi || (Oi = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.contentVocabulary = Je.metadataVocabulary = void 0, Je.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], Je.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), Je;
}
var Ii;
function Ol() {
  if (Ii) return kt;
  Ii = 1, Object.defineProperty(kt, "__esModule", { value: !0 });
  const e = Zu(), t = ll(), l = bl(), n = Rl(), u = Nl(), s = [
    e.default,
    t.default,
    (0, l.default)(),
    n.default,
    u.metadataVocabulary,
    u.contentVocabulary
  ];
  return kt.default = s, kt;
}
var hr = {}, ut = {}, Ti;
function Il() {
  if (Ti) return ut;
  Ti = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (ut.DiscrError = e = {})), ut;
}
var ji;
function Tl() {
  if (ji) return hr;
  ji = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const e = re(), t = Il(), l = zs(), n = fn(), u = ae(), c = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: o, tagName: i } }) => o === t.DiscrError.Tag ? `tag "${i}" must be string` : `value of tag "${i}" must be in oneOf`,
      params: ({ params: { discrError: o, tag: i, tagName: p } }) => (0, e._)`{error: ${o}, tag: ${p}, tagValue: ${i}}`
    },
    code(o) {
      const { gen: i, data: p, schema: a, parentSchema: y, it: E } = o, { oneOf: w } = y;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const P = a.propertyName;
      if (typeof P != "string")
        throw new Error("discriminator: requires propertyName");
      if (a.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!w)
        throw new Error("discriminator: requires oneOf keyword");
      const v = i.let("valid", !1), h = i.const("tag", (0, e._)`${p}${(0, e.getProperty)(P)}`);
      i.if((0, e._)`typeof ${h} == "string"`, () => f(), () => o.error(!1, { discrError: t.DiscrError.Tag, tag: h, tagName: P })), o.ok(v);
      function f() {
        const _ = d();
        i.if(!1);
        for (const g in _)
          i.elseIf((0, e._)`${h} === ${g}`), i.assign(v, r(_[g]));
        i.else(), o.error(!1, { discrError: t.DiscrError.Mapping, tag: h, tagName: P }), i.endIf();
      }
      function r(_) {
        const g = i.name("valid"), $ = o.subschema({ keyword: "oneOf", schemaProp: _ }, g);
        return o.mergeEvaluated($, e.Name), g;
      }
      function d() {
        var _;
        const g = {}, $ = I(y);
        let b = !0;
        for (let V = 0; V < w.length; V++) {
          let B = w[V];
          if (B != null && B.$ref && !(0, u.schemaHasRulesButRef)(B, E.self.RULES)) {
            const F = B.$ref;
            if (B = l.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, F), B instanceof l.SchemaEnv && (B = B.schema), B === void 0)
              throw new n.default(E.opts.uriResolver, E.baseId, F);
          }
          const W = (_ = B == null ? void 0 : B.properties) === null || _ === void 0 ? void 0 : _[P];
          if (typeof W != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${P}"`);
          b = b && ($ || I(B)), C(W, V);
        }
        if (!b)
          throw new Error(`discriminator: "${P}" must be required`);
        return g;
        function I({ required: V }) {
          return Array.isArray(V) && V.includes(P);
        }
        function C(V, B) {
          if (V.const)
            M(V.const, B);
          else if (V.enum)
            for (const W of V.enum)
              M(W, B);
          else
            throw new Error(`discriminator: "properties/${P}" must have "const" or "enum"`);
        }
        function M(V, B) {
          if (typeof V != "string" || V in g)
            throw new Error(`discriminator: "${P}" values must be unique strings`);
          g[V] = B;
        }
      }
    }
  };
  return hr.default = c, hr;
}
const jl = "http://json-schema.org/draft-07/schema#", Al = "http://json-schema.org/draft-07/schema#", ql = "Core schema meta-schema", Cl = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, kl = ["object", "boolean"], Dl = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Ml = {
  $schema: jl,
  $id: Al,
  title: ql,
  definitions: Cl,
  type: kl,
  properties: Dl,
  default: !0
};
var Ai;
function Ll() {
  return Ai || (Ai = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const l = Xu(), n = Ol(), u = Tl(), s = Ml, c = ["/properties"], o = "http://json-schema.org/draft-07/schema";
    class i extends l.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((P) => this.addVocabulary(P)), this.opts.discriminator && this.addKeyword(u.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const P = this.opts.$data ? this.$dataMetaSchema(s, c) : s;
        this.addMetaSchema(P, o, !1), this.refs["http://json-schema.org/schema"] = o;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
      }
    }
    t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
    var p = dn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return p.KeywordCxt;
    } });
    var a = re();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return a._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return a.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return a.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return a.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return a.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return a.CodeGen;
    } });
    var y = Us();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return y.default;
    } });
    var E = fn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(Tt, Tt.exports)), Tt.exports;
}
var mr = { exports: {} }, Ln = {}, qi;
function Fl() {
  return qi || (qi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(C, M) {
      return { validate: C, compare: M };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(s, c),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(i, p),
      "date-time": t(y, E),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: v,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: I,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: f,
      // signed 32 bit integer
      int32: { type: "number", validate: _ },
      // signed 64 bit integer
      int64: { type: "number", validate: g },
      // C-type float
      float: { type: "number", validate: $ },
      // C-type double
      double: { type: "number", validate: $ },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, c),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, p),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, E),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function l(C) {
      return C % 4 === 0 && (C % 100 !== 0 || C % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function s(C) {
      const M = n.exec(C);
      if (!M)
        return !1;
      const V = +M[1], B = +M[2], W = +M[3];
      return B >= 1 && B <= 12 && W >= 1 && W <= (B === 2 && l(V) ? 29 : u[B]);
    }
    function c(C, M) {
      if (C && M)
        return C > M ? 1 : C < M ? -1 : 0;
    }
    const o = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    function i(C, M) {
      const V = o.exec(C);
      if (!V)
        return !1;
      const B = +V[1], W = +V[2], F = +V[3], z = V[5];
      return (B <= 23 && W <= 59 && F <= 59 || B === 23 && W === 59 && F === 60) && (!M || z !== "");
    }
    function p(C, M) {
      if (!(C && M))
        return;
      const V = o.exec(C), B = o.exec(M);
      if (V && B)
        return C = V[1] + V[2] + V[3] + (V[4] || ""), M = B[1] + B[2] + B[3] + (B[4] || ""), C > M ? 1 : C < M ? -1 : 0;
    }
    const a = /t|\s/i;
    function y(C) {
      const M = C.split(a);
      return M.length === 2 && s(M[0]) && i(M[1], !0);
    }
    function E(C, M) {
      if (!(C && M))
        return;
      const [V, B] = C.split(a), [W, F] = M.split(a), z = c(V, W);
      if (z !== void 0)
        return z || p(B, F);
    }
    const w = /\/|:/, P = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function v(C) {
      return w.test(C) && P.test(C);
    }
    const h = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function f(C) {
      return h.lastIndex = 0, h.test(C);
    }
    const r = -2147483648, d = 2 ** 31 - 1;
    function _(C) {
      return Number.isInteger(C) && C <= d && C >= r;
    }
    function g(C) {
      return Number.isInteger(C);
    }
    function $() {
      return !0;
    }
    const b = /[^\\]\\Z/;
    function I(C) {
      if (b.test(C))
        return !1;
      try {
        return new RegExp(C), !0;
      } catch {
        return !1;
      }
    }
  }(Ln)), Ln;
}
var Fn = {}, pr = { exports: {} }, Vn = {}, Ce = {}, Xe = {}, Un = {}, zn = {}, Kn = {}, Ci;
function an() {
  return Ci || (Ci = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class l extends t {
      constructor(r) {
        if (super(), !e.IDENTIFIER.test(r))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = r;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = l;
    class n extends t {
      constructor(r) {
        super(), this._items = typeof r == "string" ? [r] : r;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const r = this._items[0];
        return r === "" || r === '""';
      }
      get str() {
        var r;
        return (r = this._str) !== null && r !== void 0 ? r : this._str = this._items.reduce((d, _) => `${d}${_}`, "");
      }
      get names() {
        var r;
        return (r = this._names) !== null && r !== void 0 ? r : this._names = this._items.reduce((d, _) => (_ instanceof l && (d[_.str] = (d[_.str] || 0) + 1), d), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function u(f, ...r) {
      const d = [f[0]];
      let _ = 0;
      for (; _ < r.length; )
        o(d, r[_]), d.push(f[++_]);
      return new n(d);
    }
    e._ = u;
    const s = new n("+");
    function c(f, ...r) {
      const d = [w(f[0])];
      let _ = 0;
      for (; _ < r.length; )
        d.push(s), o(d, r[_]), d.push(s, w(f[++_]));
      return i(d), new n(d);
    }
    e.str = c;
    function o(f, r) {
      r instanceof n ? f.push(...r._items) : r instanceof l ? f.push(r) : f.push(y(r));
    }
    e.addCodeArg = o;
    function i(f) {
      let r = 1;
      for (; r < f.length - 1; ) {
        if (f[r] === s) {
          const d = p(f[r - 1], f[r + 1]);
          if (d !== void 0) {
            f.splice(r - 1, 3, d);
            continue;
          }
          f[r++] = "+";
        }
        r++;
      }
    }
    function p(f, r) {
      if (r === '""')
        return f;
      if (f === '""')
        return r;
      if (typeof f == "string")
        return r instanceof l || f[f.length - 1] !== '"' ? void 0 : typeof r != "string" ? `${f.slice(0, -1)}${r}"` : r[0] === '"' ? f.slice(0, -1) + r.slice(1) : void 0;
      if (typeof r == "string" && r[0] === '"' && !(f instanceof l))
        return `"${f}${r.slice(1)}`;
    }
    function a(f, r) {
      return r.emptyStr() ? f : f.emptyStr() ? r : c`${f}${r}`;
    }
    e.strConcat = a;
    function y(f) {
      return typeof f == "number" || typeof f == "boolean" || f === null ? f : w(Array.isArray(f) ? f.join(",") : f);
    }
    function E(f) {
      return new n(w(f));
    }
    e.stringify = E;
    function w(f) {
      return JSON.stringify(f).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = w;
    function P(f) {
      return typeof f == "string" && e.IDENTIFIER.test(f) ? new n(`.${f}`) : u`[${f}]`;
    }
    e.getProperty = P;
    function v(f) {
      if (typeof f == "string" && e.IDENTIFIER.test(f))
        return new n(`${f}`);
      throw new Error(`CodeGen: invalid export name: ${f}, use explicit $id name mapping`);
    }
    e.getEsmExportName = v;
    function h(f) {
      return new n(f.toString());
    }
    e.regexpCode = h;
  }(Kn)), Kn;
}
var Gn = {}, ki;
function Di() {
  return ki || (ki = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = an();
    class l extends Error {
      constructor(p) {
        super(`CodeGen: "code" for ${p} not defined`), this.value = p.value;
      }
    }
    var n;
    (function(i) {
      i[i.Started = 0] = "Started", i[i.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class u {
      constructor({ prefixes: p, parent: a } = {}) {
        this._names = {}, this._prefixes = p, this._parent = a;
      }
      toName(p) {
        return p instanceof t.Name ? p : this.name(p);
      }
      name(p) {
        return new t.Name(this._newName(p));
      }
      _newName(p) {
        const a = this._names[p] || this._nameGroup(p);
        return `${p}${a.index++}`;
      }
      _nameGroup(p) {
        var a, y;
        if (!((y = (a = this._parent) === null || a === void 0 ? void 0 : a._prefixes) === null || y === void 0) && y.has(p) || this._prefixes && !this._prefixes.has(p))
          throw new Error(`CodeGen: prefix "${p}" is not allowed in this scope`);
        return this._names[p] = { prefix: p, index: 0 };
      }
    }
    e.Scope = u;
    class s extends t.Name {
      constructor(p, a) {
        super(a), this.prefix = p;
      }
      setValue(p, { property: a, itemIndex: y }) {
        this.value = p, this.scopePath = (0, t._)`.${new t.Name(a)}[${y}]`;
      }
    }
    e.ValueScopeName = s;
    const c = (0, t._)`\n`;
    class o extends u {
      constructor(p) {
        super(p), this._values = {}, this._scope = p.scope, this.opts = { ...p, _n: p.lines ? c : t.nil };
      }
      get() {
        return this._scope;
      }
      name(p) {
        return new s(p, this._newName(p));
      }
      value(p, a) {
        var y;
        if (a.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const E = this.toName(p), { prefix: w } = E, P = (y = a.key) !== null && y !== void 0 ? y : a.ref;
        let v = this._values[w];
        if (v) {
          const r = v.get(P);
          if (r)
            return r;
        } else
          v = this._values[w] = /* @__PURE__ */ new Map();
        v.set(P, E);
        const h = this._scope[w] || (this._scope[w] = []), f = h.length;
        return h[f] = a.ref, E.setValue(a, { property: w, itemIndex: f }), E;
      }
      getValue(p, a) {
        const y = this._values[p];
        if (y)
          return y.get(a);
      }
      scopeRefs(p, a = this._values) {
        return this._reduceValues(a, (y) => {
          if (y.scopePath === void 0)
            throw new Error(`CodeGen: name "${y}" has no value`);
          return (0, t._)`${p}${y.scopePath}`;
        });
      }
      scopeCode(p = this._values, a, y) {
        return this._reduceValues(p, (E) => {
          if (E.value === void 0)
            throw new Error(`CodeGen: name "${E}" has no value`);
          return E.value.code;
        }, a, y);
      }
      _reduceValues(p, a, y = {}, E) {
        let w = t.nil;
        for (const P in p) {
          const v = p[P];
          if (!v)
            continue;
          const h = y[P] = y[P] || /* @__PURE__ */ new Map();
          v.forEach((f) => {
            if (h.has(f))
              return;
            h.set(f, n.Started);
            let r = a(f);
            if (r) {
              const d = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              w = (0, t._)`${w}${d} ${f} = ${r};${this.opts._n}`;
            } else if (r = E == null ? void 0 : E(f))
              w = (0, t._)`${w}${r}${this.opts._n}`;
            else
              throw new l(f);
            h.set(f, n.Completed);
          });
        }
        return w;
      }
    }
    e.ValueScope = o;
  }(Gn)), Gn;
}
var Mi;
function te() {
  return Mi || (Mi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = an(), l = Di();
    var n = an();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var u = Di();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return u.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return u.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return u.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return u.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames(m, S) {
        return this;
      }
    }
    class c extends s {
      constructor(m, S, q) {
        super(), this.varKind = m, this.name = S, this.rhs = q;
      }
      render({ es5: m, _n: S }) {
        const q = m ? l.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${q} ${this.name}${K};` + S;
      }
      optimizeNames(m, S) {
        if (m[this.name.str])
          return this.rhs && (this.rhs = F(this.rhs, m, S)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class o extends s {
      constructor(m, S, q) {
        super(), this.lhs = m, this.rhs = S, this.sideEffects = q;
      }
      render({ _n: m }) {
        return `${this.lhs} = ${this.rhs};` + m;
      }
      optimizeNames(m, S) {
        if (!(this.lhs instanceof t.Name && !m[this.lhs.str] && !this.sideEffects))
          return this.rhs = F(this.rhs, m, S), this;
      }
      get names() {
        const m = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return W(m, this.rhs);
      }
    }
    class i extends o {
      constructor(m, S, q, K) {
        super(m, q, K), this.op = S;
      }
      render({ _n: m }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + m;
      }
    }
    class p extends s {
      constructor(m) {
        super(), this.label = m, this.names = {};
      }
      render({ _n: m }) {
        return `${this.label}:` + m;
      }
    }
    class a extends s {
      constructor(m) {
        super(), this.label = m, this.names = {};
      }
      render({ _n: m }) {
        return `break${this.label ? ` ${this.label}` : ""};` + m;
      }
    }
    class y extends s {
      constructor(m) {
        super(), this.error = m;
      }
      render({ _n: m }) {
        return `throw ${this.error};` + m;
      }
      get names() {
        return this.error.names;
      }
    }
    class E extends s {
      constructor(m) {
        super(), this.code = m;
      }
      render({ _n: m }) {
        return `${this.code};` + m;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(m, S) {
        return this.code = F(this.code, m, S), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class w extends s {
      constructor(m = []) {
        super(), this.nodes = m;
      }
      render(m) {
        return this.nodes.reduce((S, q) => S + q.render(m), "");
      }
      optimizeNodes() {
        const { nodes: m } = this;
        let S = m.length;
        for (; S--; ) {
          const q = m[S].optimizeNodes();
          Array.isArray(q) ? m.splice(S, 1, ...q) : q ? m[S] = q : m.splice(S, 1);
        }
        return m.length > 0 ? this : void 0;
      }
      optimizeNames(m, S) {
        const { nodes: q } = this;
        let K = q.length;
        for (; K--; ) {
          const G = q[K];
          G.optimizeNames(m, S) || (z(m, G.names), q.splice(K, 1));
        }
        return q.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((m, S) => B(m, S.names), {});
      }
    }
    class P extends w {
      render(m) {
        return "{" + m._n + super.render(m) + "}" + m._n;
      }
    }
    class v extends w {
    }
    class h extends P {
    }
    h.kind = "else";
    class f extends P {
      constructor(m, S) {
        super(S), this.condition = m;
      }
      render(m) {
        let S = `if(${this.condition})` + super.render(m);
        return this.else && (S += "else " + this.else.render(m)), S;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const m = this.condition;
        if (m === !0)
          return this.nodes;
        let S = this.else;
        if (S) {
          const q = S.optimizeNodes();
          S = this.else = Array.isArray(q) ? new h(q) : q;
        }
        if (S)
          return m === !1 ? S instanceof f ? S : S.nodes : this.nodes.length ? this : new f(Y(m), S instanceof f ? [S] : S.nodes);
        if (!(m === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(m, S) {
        var q;
        if (this.else = (q = this.else) === null || q === void 0 ? void 0 : q.optimizeNames(m, S), !!(super.optimizeNames(m, S) || this.else))
          return this.condition = F(this.condition, m, S), this;
      }
      get names() {
        const m = super.names;
        return W(m, this.condition), this.else && B(m, this.else.names), m;
      }
    }
    f.kind = "if";
    class r extends P {
    }
    r.kind = "for";
    class d extends r {
      constructor(m) {
        super(), this.iteration = m;
      }
      render(m) {
        return `for(${this.iteration})` + super.render(m);
      }
      optimizeNames(m, S) {
        if (super.optimizeNames(m, S))
          return this.iteration = F(this.iteration, m, S), this;
      }
      get names() {
        return B(super.names, this.iteration.names);
      }
    }
    class _ extends r {
      constructor(m, S, q, K) {
        super(), this.varKind = m, this.name = S, this.from = q, this.to = K;
      }
      render(m) {
        const S = m.es5 ? l.varKinds.var : this.varKind, { name: q, from: K, to: G } = this;
        return `for(${S} ${q}=${K}; ${q}<${G}; ${q}++)` + super.render(m);
      }
      get names() {
        const m = W(super.names, this.from);
        return W(m, this.to);
      }
    }
    class g extends r {
      constructor(m, S, q, K) {
        super(), this.loop = m, this.varKind = S, this.name = q, this.iterable = K;
      }
      render(m) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(m);
      }
      optimizeNames(m, S) {
        if (super.optimizeNames(m, S))
          return this.iterable = F(this.iterable, m, S), this;
      }
      get names() {
        return B(super.names, this.iterable.names);
      }
    }
    class $ extends P {
      constructor(m, S, q) {
        super(), this.name = m, this.args = S, this.async = q;
      }
      render(m) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(m);
      }
    }
    $.kind = "func";
    class b extends w {
      render(m) {
        return "return " + super.render(m);
      }
    }
    b.kind = "return";
    class I extends P {
      render(m) {
        let S = "try" + super.render(m);
        return this.catch && (S += this.catch.render(m)), this.finally && (S += this.finally.render(m)), S;
      }
      optimizeNodes() {
        var m, S;
        return super.optimizeNodes(), (m = this.catch) === null || m === void 0 || m.optimizeNodes(), (S = this.finally) === null || S === void 0 || S.optimizeNodes(), this;
      }
      optimizeNames(m, S) {
        var q, K;
        return super.optimizeNames(m, S), (q = this.catch) === null || q === void 0 || q.optimizeNames(m, S), (K = this.finally) === null || K === void 0 || K.optimizeNames(m, S), this;
      }
      get names() {
        const m = super.names;
        return this.catch && B(m, this.catch.names), this.finally && B(m, this.finally.names), m;
      }
    }
    class C extends P {
      constructor(m) {
        super(), this.error = m;
      }
      render(m) {
        return `catch(${this.error})` + super.render(m);
      }
    }
    C.kind = "catch";
    class M extends P {
      render(m) {
        return "finally" + super.render(m);
      }
    }
    M.kind = "finally";
    class V {
      constructor(m, S = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...S, _n: S.lines ? `
` : "" }, this._extScope = m, this._scope = new l.Scope({ parent: m }), this._nodes = [new v()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(m) {
        return this._scope.name(m);
      }
      // reserves unique name in the external scope
      scopeName(m) {
        return this._extScope.name(m);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(m, S) {
        const q = this._extScope.value(m, S);
        return (this._values[q.prefix] || (this._values[q.prefix] = /* @__PURE__ */ new Set())).add(q), q;
      }
      getScopeValue(m, S) {
        return this._extScope.getValue(m, S);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(m) {
        return this._extScope.scopeRefs(m, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(m, S, q, K) {
        const G = this._scope.toName(S);
        return q !== void 0 && K && (this._constants[G.str] = q), this._leafNode(new c(m, G, q)), G;
      }
      // `const` declaration (`var` in es5 mode)
      const(m, S, q) {
        return this._def(l.varKinds.const, m, S, q);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(m, S, q) {
        return this._def(l.varKinds.let, m, S, q);
      }
      // `var` declaration with optional assignment
      var(m, S, q) {
        return this._def(l.varKinds.var, m, S, q);
      }
      // assignment code
      assign(m, S, q) {
        return this._leafNode(new o(m, S, q));
      }
      // `+=` code
      add(m, S) {
        return this._leafNode(new i(m, e.operators.ADD, S));
      }
      // appends passed SafeExpr to code or executes Block
      code(m) {
        return typeof m == "function" ? m() : m !== t.nil && this._leafNode(new E(m)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...m) {
        const S = ["{"];
        for (const [q, K] of m)
          S.length > 1 && S.push(","), S.push(q), (q !== K || this.opts.es5) && (S.push(":"), (0, t.addCodeArg)(S, K));
        return S.push("}"), new t._Code(S);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(m, S, q) {
        if (this._blockNode(new f(m)), S && q)
          this.code(S).else().code(q).endIf();
        else if (S)
          this.code(S).endIf();
        else if (q)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(m) {
        return this._elseNode(new f(m));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new h());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(f, h);
      }
      _for(m, S) {
        return this._blockNode(m), S && this.code(S).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(m, S) {
        return this._for(new d(m), S);
      }
      // `for` statement for a range of values
      forRange(m, S, q, K, G = this.opts.es5 ? l.varKinds.var : l.varKinds.let) {
        const Z = this._scope.toName(m);
        return this._for(new _(G, Z, S, q), () => K(Z));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(m, S, q, K = l.varKinds.const) {
        const G = this._scope.toName(m);
        if (this.opts.es5) {
          const Z = S instanceof t.Name ? S : this.var("_arr", S);
          return this.forRange("_i", 0, (0, t._)`${Z}.length`, (Q) => {
            this.var(G, (0, t._)`${Z}[${Q}]`), q(G);
          });
        }
        return this._for(new g("of", K, G, S), () => q(G));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(m, S, q, K = this.opts.es5 ? l.varKinds.var : l.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(m, (0, t._)`Object.keys(${S})`, q);
        const G = this._scope.toName(m);
        return this._for(new g("in", K, G, S), () => q(G));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(r);
      }
      // `label` statement
      label(m) {
        return this._leafNode(new p(m));
      }
      // `break` statement
      break(m) {
        return this._leafNode(new a(m));
      }
      // `return` statement
      return(m) {
        const S = new b();
        if (this._blockNode(S), this.code(m), S.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(b);
      }
      // `try` statement
      try(m, S, q) {
        if (!S && !q)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const K = new I();
        if (this._blockNode(K), this.code(m), S) {
          const G = this.name("e");
          this._currNode = K.catch = new C(G), S(G);
        }
        return q && (this._currNode = K.finally = new M(), this.code(q)), this._endBlockNode(C, M);
      }
      // `throw` statement
      throw(m) {
        return this._leafNode(new y(m));
      }
      // start self-balancing block
      block(m, S) {
        return this._blockStarts.push(this._nodes.length), m && this.code(m).endBlock(S), this;
      }
      // end the current self-balancing block
      endBlock(m) {
        const S = this._blockStarts.pop();
        if (S === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const q = this._nodes.length - S;
        if (q < 0 || m !== void 0 && q !== m)
          throw new Error(`CodeGen: wrong number of nodes: ${q} vs ${m} expected`);
        return this._nodes.length = S, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(m, S = t.nil, q, K) {
        return this._blockNode(new $(m, S, q)), K && this.code(K).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode($);
      }
      optimize(m = 1) {
        for (; m-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(m) {
        return this._currNode.nodes.push(m), this;
      }
      _blockNode(m) {
        this._currNode.nodes.push(m), this._nodes.push(m);
      }
      _endBlockNode(m, S) {
        const q = this._currNode;
        if (q instanceof m || S && q instanceof S)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${S ? `${m.kind}/${S.kind}` : m.kind}"`);
      }
      _elseNode(m) {
        const S = this._currNode;
        if (!(S instanceof f))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = S.else = m, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const m = this._nodes;
        return m[m.length - 1];
      }
      set _currNode(m) {
        const S = this._nodes;
        S[S.length - 1] = m;
      }
    }
    e.CodeGen = V;
    function B(O, m) {
      for (const S in m)
        O[S] = (O[S] || 0) + (m[S] || 0);
      return O;
    }
    function W(O, m) {
      return m instanceof t._CodeOrName ? B(O, m.names) : O;
    }
    function F(O, m, S) {
      if (O instanceof t.Name)
        return q(O);
      if (!K(O))
        return O;
      return new t._Code(O._items.reduce((G, Z) => (Z instanceof t.Name && (Z = q(Z)), Z instanceof t._Code ? G.push(...Z._items) : G.push(Z), G), []));
      function q(G) {
        const Z = S[G.str];
        return Z === void 0 || m[G.str] !== 1 ? G : (delete m[G.str], Z);
      }
      function K(G) {
        return G instanceof t._Code && G._items.some((Z) => Z instanceof t.Name && m[Z.str] === 1 && S[Z.str] !== void 0);
      }
    }
    function z(O, m) {
      for (const S in m)
        O[S] = (O[S] || 0) - (m[S] || 0);
    }
    function Y(O) {
      return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, t._)`!${A(O)}`;
    }
    e.not = Y;
    const J = R(e.operators.AND);
    function D(...O) {
      return O.reduce(J);
    }
    e.and = D;
    const U = R(e.operators.OR);
    function j(...O) {
      return O.reduce(U);
    }
    e.or = j;
    function R(O) {
      return (m, S) => m === t.nil ? S : S === t.nil ? m : (0, t._)`${A(m)} ${O} ${A(S)}`;
    }
    function A(O) {
      return O instanceof t.Name ? O : (0, t._)`(${O})`;
    }
  }(zn)), zn;
}
var ee = {}, Li;
function ie() {
  if (Li) return ee;
  Li = 1, Object.defineProperty(ee, "__esModule", { value: !0 }), ee.checkStrictMode = ee.getErrorPath = ee.Type = ee.useFunc = ee.setEvaluated = ee.evaluatedPropsToName = ee.mergeEvaluated = ee.eachItem = ee.unescapeJsonPointer = ee.escapeJsonPointer = ee.escapeFragment = ee.unescapeFragment = ee.schemaRefOrVal = ee.schemaHasRulesButRef = ee.schemaHasRules = ee.checkUnknownRules = ee.alwaysValidSchema = ee.toHash = void 0;
  const e = te(), t = an();
  function l(g) {
    const $ = {};
    for (const b of g)
      $[b] = !0;
    return $;
  }
  ee.toHash = l;
  function n(g, $) {
    return typeof $ == "boolean" ? $ : Object.keys($).length === 0 ? !0 : (u(g, $), !s($, g.self.RULES.all));
  }
  ee.alwaysValidSchema = n;
  function u(g, $ = g.schema) {
    const { opts: b, self: I } = g;
    if (!b.strictSchema || typeof $ == "boolean")
      return;
    const C = I.RULES.keywords;
    for (const M in $)
      C[M] || _(g, `unknown keyword: "${M}"`);
  }
  ee.checkUnknownRules = u;
  function s(g, $) {
    if (typeof g == "boolean")
      return !g;
    for (const b in g)
      if ($[b])
        return !0;
    return !1;
  }
  ee.schemaHasRules = s;
  function c(g, $) {
    if (typeof g == "boolean")
      return !g;
    for (const b in g)
      if (b !== "$ref" && $.all[b])
        return !0;
    return !1;
  }
  ee.schemaHasRulesButRef = c;
  function o({ topSchemaRef: g, schemaPath: $ }, b, I, C) {
    if (!C) {
      if (typeof b == "number" || typeof b == "boolean")
        return b;
      if (typeof b == "string")
        return (0, e._)`${b}`;
    }
    return (0, e._)`${g}${$}${(0, e.getProperty)(I)}`;
  }
  ee.schemaRefOrVal = o;
  function i(g) {
    return y(decodeURIComponent(g));
  }
  ee.unescapeFragment = i;
  function p(g) {
    return encodeURIComponent(a(g));
  }
  ee.escapeFragment = p;
  function a(g) {
    return typeof g == "number" ? `${g}` : g.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  ee.escapeJsonPointer = a;
  function y(g) {
    return g.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  ee.unescapeJsonPointer = y;
  function E(g, $) {
    if (Array.isArray(g))
      for (const b of g)
        $(b);
    else
      $(g);
  }
  ee.eachItem = E;
  function w({ mergeNames: g, mergeToName: $, mergeValues: b, resultToName: I }) {
    return (C, M, V, B) => {
      const W = V === void 0 ? M : V instanceof e.Name ? (M instanceof e.Name ? g(C, M, V) : $(C, M, V), V) : M instanceof e.Name ? ($(C, V, M), M) : b(M, V);
      return B === e.Name && !(W instanceof e.Name) ? I(C, W) : W;
    };
  }
  ee.mergeEvaluated = {
    props: w({
      mergeNames: (g, $, b) => g.if((0, e._)`${b} !== true && ${$} !== undefined`, () => {
        g.if((0, e._)`${$} === true`, () => g.assign(b, !0), () => g.assign(b, (0, e._)`${b} || {}`).code((0, e._)`Object.assign(${b}, ${$})`));
      }),
      mergeToName: (g, $, b) => g.if((0, e._)`${b} !== true`, () => {
        $ === !0 ? g.assign(b, !0) : (g.assign(b, (0, e._)`${b} || {}`), v(g, b, $));
      }),
      mergeValues: (g, $) => g === !0 ? !0 : { ...g, ...$ },
      resultToName: P
    }),
    items: w({
      mergeNames: (g, $, b) => g.if((0, e._)`${b} !== true && ${$} !== undefined`, () => g.assign(b, (0, e._)`${$} === true ? true : ${b} > ${$} ? ${b} : ${$}`)),
      mergeToName: (g, $, b) => g.if((0, e._)`${b} !== true`, () => g.assign(b, $ === !0 ? !0 : (0, e._)`${b} > ${$} ? ${b} : ${$}`)),
      mergeValues: (g, $) => g === !0 ? !0 : Math.max(g, $),
      resultToName: (g, $) => g.var("items", $)
    })
  };
  function P(g, $) {
    if ($ === !0)
      return g.var("props", !0);
    const b = g.var("props", (0, e._)`{}`);
    return $ !== void 0 && v(g, b, $), b;
  }
  ee.evaluatedPropsToName = P;
  function v(g, $, b) {
    Object.keys(b).forEach((I) => g.assign((0, e._)`${$}${(0, e.getProperty)(I)}`, !0));
  }
  ee.setEvaluated = v;
  const h = {};
  function f(g, $) {
    return g.scopeValue("func", {
      ref: $,
      code: h[$.code] || (h[$.code] = new t._Code($.code))
    });
  }
  ee.useFunc = f;
  var r;
  (function(g) {
    g[g.Num = 0] = "Num", g[g.Str = 1] = "Str";
  })(r || (ee.Type = r = {}));
  function d(g, $, b) {
    if (g instanceof e.Name) {
      const I = $ === r.Num;
      return b ? I ? (0, e._)`"[" + ${g} + "]"` : (0, e._)`"['" + ${g} + "']"` : I ? (0, e._)`"/" + ${g}` : (0, e._)`"/" + ${g}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return b ? (0, e.getProperty)(g).toString() : "/" + a(g);
  }
  ee.getErrorPath = d;
  function _(g, $, b = g.opts.strictSchema) {
    if (b) {
      if ($ = `strict mode: ${$}`, b === !0)
        throw new Error($);
      g.self.logger.warn($);
    }
  }
  return ee.checkStrictMode = _, ee;
}
var yr = {}, Fi;
function Ve() {
  if (Fi) return yr;
  Fi = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const e = te(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return yr.default = t, yr;
}
var Vi;
function hn() {
  return Vi || (Vi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = te(), l = ie(), n = Ve();
    e.keywordError = {
      message: ({ keyword: h }) => (0, t.str)`must pass "${h}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: h, schemaType: f }) => f ? (0, t.str)`"${h}" keyword must be ${f} ($data)` : (0, t.str)`"${h}" keyword is invalid ($data)`
    };
    function u(h, f = e.keywordError, r, d) {
      const { it: _ } = h, { gen: g, compositeRule: $, allErrors: b } = _, I = y(h, f, r);
      d ?? ($ || b) ? i(g, I) : p(_, (0, t._)`[${I}]`);
    }
    e.reportError = u;
    function s(h, f = e.keywordError, r) {
      const { it: d } = h, { gen: _, compositeRule: g, allErrors: $ } = d, b = y(h, f, r);
      i(_, b), g || $ || p(d, n.default.vErrors);
    }
    e.reportExtraError = s;
    function c(h, f) {
      h.assign(n.default.errors, f), h.if((0, t._)`${n.default.vErrors} !== null`, () => h.if(f, () => h.assign((0, t._)`${n.default.vErrors}.length`, f), () => h.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = c;
    function o({ gen: h, keyword: f, schemaValue: r, data: d, errsCount: _, it: g }) {
      if (_ === void 0)
        throw new Error("ajv implementation error");
      const $ = h.name("err");
      h.forRange("i", _, n.default.errors, (b) => {
        h.const($, (0, t._)`${n.default.vErrors}[${b}]`), h.if((0, t._)`${$}.instancePath === undefined`, () => h.assign((0, t._)`${$}.instancePath`, (0, t.strConcat)(n.default.instancePath, g.errorPath))), h.assign((0, t._)`${$}.schemaPath`, (0, t.str)`${g.errSchemaPath}/${f}`), g.opts.verbose && (h.assign((0, t._)`${$}.schema`, r), h.assign((0, t._)`${$}.data`, d));
      });
    }
    e.extendErrors = o;
    function i(h, f) {
      const r = h.const("err", f);
      h.if((0, t._)`${n.default.vErrors} === null`, () => h.assign(n.default.vErrors, (0, t._)`[${r}]`), (0, t._)`${n.default.vErrors}.push(${r})`), h.code((0, t._)`${n.default.errors}++`);
    }
    function p(h, f) {
      const { gen: r, validateName: d, schemaEnv: _ } = h;
      _.$async ? r.throw((0, t._)`new ${h.ValidationError}(${f})`) : (r.assign((0, t._)`${d}.errors`, f), r.return(!1));
    }
    const a = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function y(h, f, r) {
      const { createErrors: d } = h.it;
      return d === !1 ? (0, t._)`{}` : E(h, f, r);
    }
    function E(h, f, r = {}) {
      const { gen: d, it: _ } = h, g = [
        w(_, r),
        P(h, r)
      ];
      return v(h, f, g), d.object(...g);
    }
    function w({ errorPath: h }, { instancePath: f }) {
      const r = f ? (0, t.str)`${h}${(0, l.getErrorPath)(f, l.Type.Str)}` : h;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, r)];
    }
    function P({ keyword: h, it: { errSchemaPath: f } }, { schemaPath: r, parentSchema: d }) {
      let _ = d ? f : (0, t.str)`${f}/${h}`;
      return r && (_ = (0, t.str)`${_}${(0, l.getErrorPath)(r, l.Type.Str)}`), [a.schemaPath, _];
    }
    function v(h, { params: f, message: r }, d) {
      const { keyword: _, data: g, schemaValue: $, it: b } = h, { opts: I, propertyName: C, topSchemaRef: M, schemaPath: V } = b;
      d.push([a.keyword, _], [a.params, typeof f == "function" ? f(h) : f || (0, t._)`{}`]), I.messages && d.push([a.message, typeof r == "function" ? r(h) : r]), I.verbose && d.push([a.schema, $], [a.parentSchema, (0, t._)`${M}${V}`], [n.default.data, g]), C && d.push([a.propertyName, C]);
    }
  }(Un)), Un;
}
var Ui;
function Vl() {
  if (Ui) return Xe;
  Ui = 1, Object.defineProperty(Xe, "__esModule", { value: !0 }), Xe.boolOrEmptySchema = Xe.topBoolOrEmptySchema = void 0;
  const e = hn(), t = te(), l = Ve(), n = {
    message: "boolean schema is false"
  };
  function u(o) {
    const { gen: i, schema: p, validateName: a } = o;
    p === !1 ? c(o, !1) : typeof p == "object" && p.$async === !0 ? i.return(l.default.data) : (i.assign((0, t._)`${a}.errors`, null), i.return(!0));
  }
  Xe.topBoolOrEmptySchema = u;
  function s(o, i) {
    const { gen: p, schema: a } = o;
    a === !1 ? (p.var(i, !1), c(o)) : p.var(i, !0);
  }
  Xe.boolOrEmptySchema = s;
  function c(o, i) {
    const { gen: p, data: a } = o, y = {
      gen: p,
      keyword: "false schema",
      data: a,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: o
    };
    (0, e.reportError)(y, n, void 0, i);
  }
  return Xe;
}
var pe = {}, Ye = {}, zi;
function Qc() {
  if (zi) return Ye;
  zi = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye.getRules = Ye.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function l(u) {
    return typeof u == "string" && t.has(u);
  }
  Ye.isJSONType = l;
  function n() {
    const u = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...u, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, u.number, u.string, u.array, u.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return Ye.getRules = n, Ye;
}
var ke = {}, Ki;
function Zc() {
  if (Ki) return ke;
  Ki = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.shouldUseRule = ke.shouldUseGroup = ke.schemaHasRulesForType = void 0;
  function e({ schema: n, self: u }, s) {
    const c = u.RULES.types[s];
    return c && c !== !0 && t(n, c);
  }
  ke.schemaHasRulesForType = e;
  function t(n, u) {
    return u.rules.some((s) => l(n, s));
  }
  ke.shouldUseGroup = t;
  function l(n, u) {
    var s;
    return n[u.keyword] !== void 0 || ((s = u.definition.implements) === null || s === void 0 ? void 0 : s.some((c) => n[c] !== void 0));
  }
  return ke.shouldUseRule = l, ke;
}
var Gi;
function on() {
  if (Gi) return pe;
  Gi = 1, Object.defineProperty(pe, "__esModule", { value: !0 }), pe.reportTypeError = pe.checkDataTypes = pe.checkDataType = pe.coerceAndCheckDataType = pe.getJSONTypes = pe.getSchemaTypes = pe.DataType = void 0;
  const e = Qc(), t = Zc(), l = hn(), n = te(), u = ie();
  var s;
  (function(r) {
    r[r.Correct = 0] = "Correct", r[r.Wrong = 1] = "Wrong";
  })(s || (pe.DataType = s = {}));
  function c(r) {
    const d = o(r.type);
    if (d.includes("null")) {
      if (r.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!d.length && r.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      r.nullable === !0 && d.push("null");
    }
    return d;
  }
  pe.getSchemaTypes = c;
  function o(r) {
    const d = Array.isArray(r) ? r : r ? [r] : [];
    if (d.every(e.isJSONType))
      return d;
    throw new Error("type must be JSONType or JSONType[]: " + d.join(","));
  }
  pe.getJSONTypes = o;
  function i(r, d) {
    const { gen: _, data: g, opts: $ } = r, b = a(d, $.coerceTypes), I = d.length > 0 && !(b.length === 0 && d.length === 1 && (0, t.schemaHasRulesForType)(r, d[0]));
    if (I) {
      const C = P(d, g, $.strictNumbers, s.Wrong);
      _.if(C, () => {
        b.length ? y(r, d, b) : h(r);
      });
    }
    return I;
  }
  pe.coerceAndCheckDataType = i;
  const p = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function a(r, d) {
    return d ? r.filter((_) => p.has(_) || d === "array" && _ === "array") : [];
  }
  function y(r, d, _) {
    const { gen: g, data: $, opts: b } = r, I = g.let("dataType", (0, n._)`typeof ${$}`), C = g.let("coerced", (0, n._)`undefined`);
    b.coerceTypes === "array" && g.if((0, n._)`${I} == 'object' && Array.isArray(${$}) && ${$}.length == 1`, () => g.assign($, (0, n._)`${$}[0]`).assign(I, (0, n._)`typeof ${$}`).if(P(d, $, b.strictNumbers), () => g.assign(C, $))), g.if((0, n._)`${C} !== undefined`);
    for (const V of _)
      (p.has(V) || V === "array" && b.coerceTypes === "array") && M(V);
    g.else(), h(r), g.endIf(), g.if((0, n._)`${C} !== undefined`, () => {
      g.assign($, C), E(r, C);
    });
    function M(V) {
      switch (V) {
        case "string":
          g.elseIf((0, n._)`${I} == "number" || ${I} == "boolean"`).assign(C, (0, n._)`"" + ${$}`).elseIf((0, n._)`${$} === null`).assign(C, (0, n._)`""`);
          return;
        case "number":
          g.elseIf((0, n._)`${I} == "boolean" || ${$} === null
              || (${I} == "string" && ${$} && ${$} == +${$})`).assign(C, (0, n._)`+${$}`);
          return;
        case "integer":
          g.elseIf((0, n._)`${I} === "boolean" || ${$} === null
              || (${I} === "string" && ${$} && ${$} == +${$} && !(${$} % 1))`).assign(C, (0, n._)`+${$}`);
          return;
        case "boolean":
          g.elseIf((0, n._)`${$} === "false" || ${$} === 0 || ${$} === null`).assign(C, !1).elseIf((0, n._)`${$} === "true" || ${$} === 1`).assign(C, !0);
          return;
        case "null":
          g.elseIf((0, n._)`${$} === "" || ${$} === 0 || ${$} === false`), g.assign(C, null);
          return;
        case "array":
          g.elseIf((0, n._)`${I} === "string" || ${I} === "number"
              || ${I} === "boolean" || ${$} === null`).assign(C, (0, n._)`[${$}]`);
      }
    }
  }
  function E({ gen: r, parentData: d, parentDataProperty: _ }, g) {
    r.if((0, n._)`${d} !== undefined`, () => r.assign((0, n._)`${d}[${_}]`, g));
  }
  function w(r, d, _, g = s.Correct) {
    const $ = g === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let b;
    switch (r) {
      case "null":
        return (0, n._)`${d} ${$} null`;
      case "array":
        b = (0, n._)`Array.isArray(${d})`;
        break;
      case "object":
        b = (0, n._)`${d} && typeof ${d} == "object" && !Array.isArray(${d})`;
        break;
      case "integer":
        b = I((0, n._)`!(${d} % 1) && !isNaN(${d})`);
        break;
      case "number":
        b = I();
        break;
      default:
        return (0, n._)`typeof ${d} ${$} ${r}`;
    }
    return g === s.Correct ? b : (0, n.not)(b);
    function I(C = n.nil) {
      return (0, n.and)((0, n._)`typeof ${d} == "number"`, C, _ ? (0, n._)`isFinite(${d})` : n.nil);
    }
  }
  pe.checkDataType = w;
  function P(r, d, _, g) {
    if (r.length === 1)
      return w(r[0], d, _, g);
    let $;
    const b = (0, u.toHash)(r);
    if (b.array && b.object) {
      const I = (0, n._)`typeof ${d} != "object"`;
      $ = b.null ? I : (0, n._)`!${d} || ${I}`, delete b.null, delete b.array, delete b.object;
    } else
      $ = n.nil;
    b.number && delete b.integer;
    for (const I in b)
      $ = (0, n.and)($, w(I, d, _, g));
    return $;
  }
  pe.checkDataTypes = P;
  const v = {
    message: ({ schema: r }) => `must be ${r}`,
    params: ({ schema: r, schemaValue: d }) => typeof r == "string" ? (0, n._)`{type: ${r}}` : (0, n._)`{type: ${d}}`
  };
  function h(r) {
    const d = f(r);
    (0, l.reportError)(d, v);
  }
  pe.reportTypeError = h;
  function f(r) {
    const { gen: d, data: _, schema: g } = r, $ = (0, u.schemaRefOrVal)(r, g, "type");
    return {
      gen: d,
      keyword: "type",
      data: _,
      schema: g.type,
      schemaCode: $,
      schemaValue: $,
      parentSchema: g,
      params: {},
      it: r
    };
  }
  return pe;
}
var lt = {}, Hi;
function Ul() {
  if (Hi) return lt;
  Hi = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.assignDefaults = void 0;
  const e = te(), t = ie();
  function l(u, s) {
    const { properties: c, items: o } = u.schema;
    if (s === "object" && c)
      for (const i in c)
        n(u, i, c[i].default);
    else s === "array" && Array.isArray(o) && o.forEach((i, p) => n(u, p, i.default));
  }
  lt.assignDefaults = l;
  function n(u, s, c) {
    const { gen: o, compositeRule: i, data: p, opts: a } = u;
    if (c === void 0)
      return;
    const y = (0, e._)`${p}${(0, e.getProperty)(s)}`;
    if (i) {
      (0, t.checkStrictMode)(u, `default is ignored for: ${y}`);
      return;
    }
    let E = (0, e._)`${y} === undefined`;
    a.useDefaults === "empty" && (E = (0, e._)`${E} || ${y} === null || ${y} === ""`), o.if(E, (0, e._)`${y} = ${(0, e.stringify)(c)}`);
  }
  return lt;
}
var Re = {}, le = {}, Wi;
function Oe() {
  if (Wi) return le;
  Wi = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.validateUnion = le.validateArray = le.usePattern = le.callValidateCode = le.schemaProperties = le.allSchemaProperties = le.noPropertyInData = le.propertyInData = le.isOwnProperty = le.hasPropFunc = le.reportMissingProp = le.checkMissingProp = le.checkReportMissingProp = void 0;
  const e = te(), t = ie(), l = Ve(), n = ie();
  function u(r, d) {
    const { gen: _, data: g, it: $ } = r;
    _.if(a(_, g, d, $.opts.ownProperties), () => {
      r.setParams({ missingProperty: (0, e._)`${d}` }, !0), r.error();
    });
  }
  le.checkReportMissingProp = u;
  function s({ gen: r, data: d, it: { opts: _ } }, g, $) {
    return (0, e.or)(...g.map((b) => (0, e.and)(a(r, d, b, _.ownProperties), (0, e._)`${$} = ${b}`)));
  }
  le.checkMissingProp = s;
  function c(r, d) {
    r.setParams({ missingProperty: d }, !0), r.error();
  }
  le.reportMissingProp = c;
  function o(r) {
    return r.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  le.hasPropFunc = o;
  function i(r, d, _) {
    return (0, e._)`${o(r)}.call(${d}, ${_})`;
  }
  le.isOwnProperty = i;
  function p(r, d, _, g) {
    const $ = (0, e._)`${d}${(0, e.getProperty)(_)} !== undefined`;
    return g ? (0, e._)`${$} && ${i(r, d, _)}` : $;
  }
  le.propertyInData = p;
  function a(r, d, _, g) {
    const $ = (0, e._)`${d}${(0, e.getProperty)(_)} === undefined`;
    return g ? (0, e.or)($, (0, e.not)(i(r, d, _))) : $;
  }
  le.noPropertyInData = a;
  function y(r) {
    return r ? Object.keys(r).filter((d) => d !== "__proto__") : [];
  }
  le.allSchemaProperties = y;
  function E(r, d) {
    return y(d).filter((_) => !(0, t.alwaysValidSchema)(r, d[_]));
  }
  le.schemaProperties = E;
  function w({ schemaCode: r, data: d, it: { gen: _, topSchemaRef: g, schemaPath: $, errorPath: b }, it: I }, C, M, V) {
    const B = V ? (0, e._)`${r}, ${d}, ${g}${$}` : d, W = [
      [l.default.instancePath, (0, e.strConcat)(l.default.instancePath, b)],
      [l.default.parentData, I.parentData],
      [l.default.parentDataProperty, I.parentDataProperty],
      [l.default.rootData, l.default.rootData]
    ];
    I.opts.dynamicRef && W.push([l.default.dynamicAnchors, l.default.dynamicAnchors]);
    const F = (0, e._)`${B}, ${_.object(...W)}`;
    return M !== e.nil ? (0, e._)`${C}.call(${M}, ${F})` : (0, e._)`${C}(${F})`;
  }
  le.callValidateCode = w;
  const P = (0, e._)`new RegExp`;
  function v({ gen: r, it: { opts: d } }, _) {
    const g = d.unicodeRegExp ? "u" : "", { regExp: $ } = d.code, b = $(_, g);
    return r.scopeValue("pattern", {
      key: b.toString(),
      ref: b,
      code: (0, e._)`${$.code === "new RegExp" ? P : (0, n.useFunc)(r, $)}(${_}, ${g})`
    });
  }
  le.usePattern = v;
  function h(r) {
    const { gen: d, data: _, keyword: g, it: $ } = r, b = d.name("valid");
    if ($.allErrors) {
      const C = d.let("valid", !0);
      return I(() => d.assign(C, !1)), C;
    }
    return d.var(b, !0), I(() => d.break()), b;
    function I(C) {
      const M = d.const("len", (0, e._)`${_}.length`);
      d.forRange("i", 0, M, (V) => {
        r.subschema({
          keyword: g,
          dataProp: V,
          dataPropType: t.Type.Num
        }, b), d.if((0, e.not)(b), C);
      });
    }
  }
  le.validateArray = h;
  function f(r) {
    const { gen: d, schema: _, keyword: g, it: $ } = r;
    if (!Array.isArray(_))
      throw new Error("ajv implementation error");
    if (_.some((M) => (0, t.alwaysValidSchema)($, M)) && !$.opts.unevaluated)
      return;
    const I = d.let("valid", !1), C = d.name("_valid");
    d.block(() => _.forEach((M, V) => {
      const B = r.subschema({
        keyword: g,
        schemaProp: V,
        compositeRule: !0
      }, C);
      d.assign(I, (0, e._)`${I} || ${C}`), r.mergeValidEvaluated(B, C) || d.if((0, e.not)(I));
    })), r.result(I, () => r.reset(), () => r.error(!0));
  }
  return le.validateUnion = f, le;
}
var Bi;
function zl() {
  if (Bi) return Re;
  Bi = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.validateKeywordUsage = Re.validSchemaType = Re.funcKeywordCode = Re.macroKeywordCode = void 0;
  const e = te(), t = Ve(), l = Oe(), n = hn();
  function u(E, w) {
    const { gen: P, keyword: v, schema: h, parentSchema: f, it: r } = E, d = w.macro.call(r.self, h, f, r), _ = p(P, v, d);
    r.opts.validateSchema !== !1 && r.self.validateSchema(d, !0);
    const g = P.name("valid");
    E.subschema({
      schema: d,
      schemaPath: e.nil,
      errSchemaPath: `${r.errSchemaPath}/${v}`,
      topSchemaRef: _,
      compositeRule: !0
    }, g), E.pass(g, () => E.error(!0));
  }
  Re.macroKeywordCode = u;
  function s(E, w) {
    var P;
    const { gen: v, keyword: h, schema: f, parentSchema: r, $data: d, it: _ } = E;
    i(_, w);
    const g = !d && w.compile ? w.compile.call(_.self, f, r, _) : w.validate, $ = p(v, h, g), b = v.let("valid");
    E.block$data(b, I), E.ok((P = w.valid) !== null && P !== void 0 ? P : b);
    function I() {
      if (w.errors === !1)
        V(), w.modifying && c(E), B(() => E.error());
      else {
        const W = w.async ? C() : M();
        w.modifying && c(E), B(() => o(E, W));
      }
    }
    function C() {
      const W = v.let("ruleErrs", null);
      return v.try(() => V((0, e._)`await `), (F) => v.assign(b, !1).if((0, e._)`${F} instanceof ${_.ValidationError}`, () => v.assign(W, (0, e._)`${F}.errors`), () => v.throw(F))), W;
    }
    function M() {
      const W = (0, e._)`${$}.errors`;
      return v.assign(W, null), V(e.nil), W;
    }
    function V(W = w.async ? (0, e._)`await ` : e.nil) {
      const F = _.opts.passContext ? t.default.this : t.default.self, z = !("compile" in w && !d || w.schema === !1);
      v.assign(b, (0, e._)`${W}${(0, l.callValidateCode)(E, $, F, z)}`, w.modifying);
    }
    function B(W) {
      var F;
      v.if((0, e.not)((F = w.valid) !== null && F !== void 0 ? F : b), W);
    }
  }
  Re.funcKeywordCode = s;
  function c(E) {
    const { gen: w, data: P, it: v } = E;
    w.if(v.parentData, () => w.assign(P, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function o(E, w) {
    const { gen: P } = E;
    P.if((0, e._)`Array.isArray(${w})`, () => {
      P.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${w} : ${t.default.vErrors}.concat(${w})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(E);
    }, () => E.error());
  }
  function i({ schemaEnv: E }, w) {
    if (w.async && !E.$async)
      throw new Error("async keyword in sync schema");
  }
  function p(E, w, P) {
    if (P === void 0)
      throw new Error(`keyword "${w}" failed to compile`);
    return E.scopeValue("keyword", typeof P == "function" ? { ref: P } : { ref: P, code: (0, e.stringify)(P) });
  }
  function a(E, w, P = !1) {
    return !w.length || w.some((v) => v === "array" ? Array.isArray(E) : v === "object" ? E && typeof E == "object" && !Array.isArray(E) : typeof E == v || P && typeof E > "u");
  }
  Re.validSchemaType = a;
  function y({ schema: E, opts: w, self: P, errSchemaPath: v }, h, f) {
    if (Array.isArray(h.keyword) ? !h.keyword.includes(f) : h.keyword !== f)
      throw new Error("ajv implementation error");
    const r = h.dependencies;
    if (r != null && r.some((d) => !Object.prototype.hasOwnProperty.call(E, d)))
      throw new Error(`parent schema must have dependencies of ${f}: ${r.join(",")}`);
    if (h.validateSchema && !h.validateSchema(E[f])) {
      const _ = `keyword "${f}" value is invalid at path "${v}": ` + P.errorsText(h.validateSchema.errors);
      if (w.validateSchema === "log")
        P.logger.error(_);
      else
        throw new Error(_);
    }
  }
  return Re.validateKeywordUsage = y, Re;
}
var De = {}, Ji;
function Kl() {
  if (Ji) return De;
  Ji = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.extendSubschemaMode = De.extendSubschemaData = De.getSubschema = void 0;
  const e = te(), t = ie();
  function l(s, { keyword: c, schemaProp: o, schema: i, schemaPath: p, errSchemaPath: a, topSchemaRef: y }) {
    if (c !== void 0 && i !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (c !== void 0) {
      const E = s.schema[c];
      return o === void 0 ? {
        schema: E,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}`
      } : {
        schema: E[o],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(c)}${(0, e.getProperty)(o)}`,
        errSchemaPath: `${s.errSchemaPath}/${c}/${(0, t.escapeFragment)(o)}`
      };
    }
    if (i !== void 0) {
      if (p === void 0 || a === void 0 || y === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: i,
        schemaPath: p,
        topSchemaRef: y,
        errSchemaPath: a
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  De.getSubschema = l;
  function n(s, c, { dataProp: o, dataPropType: i, data: p, dataTypes: a, propertyName: y }) {
    if (p !== void 0 && o !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: E } = c;
    if (o !== void 0) {
      const { errorPath: P, dataPathArr: v, opts: h } = c, f = E.let("data", (0, e._)`${c.data}${(0, e.getProperty)(o)}`, !0);
      w(f), s.errorPath = (0, e.str)`${P}${(0, t.getErrorPath)(o, i, h.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${o}`, s.dataPathArr = [...v, s.parentDataProperty];
    }
    if (p !== void 0) {
      const P = p instanceof e.Name ? p : E.let("data", p, !0);
      w(P), y !== void 0 && (s.propertyName = y);
    }
    a && (s.dataTypes = a);
    function w(P) {
      s.data = P, s.dataLevel = c.dataLevel + 1, s.dataTypes = [], c.definedProperties = /* @__PURE__ */ new Set(), s.parentData = c.data, s.dataNames = [...c.dataNames, P];
    }
  }
  De.extendSubschemaData = n;
  function u(s, { jtdDiscriminator: c, jtdMetadata: o, compositeRule: i, createErrors: p, allErrors: a }) {
    i !== void 0 && (s.compositeRule = i), p !== void 0 && (s.createErrors = p), a !== void 0 && (s.allErrors = a), s.jtdDiscriminator = c, s.jtdMetadata = o;
  }
  return De.extendSubschemaMode = u, De;
}
var $e = {}, Hn = { exports: {} }, Xi;
function Gl() {
  if (Xi) return Hn.exports;
  Xi = 1;
  var e = Hn.exports = function(n, u, s) {
    typeof u == "function" && (s = u, u = {}), s = u.cb || s;
    var c = typeof s == "function" ? s : s.pre || function() {
    }, o = s.post || function() {
    };
    t(u, c, o, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, u, s, c, o, i, p, a, y, E) {
    if (c && typeof c == "object" && !Array.isArray(c)) {
      u(c, o, i, p, a, y, E);
      for (var w in c) {
        var P = c[w];
        if (Array.isArray(P)) {
          if (w in e.arrayKeywords)
            for (var v = 0; v < P.length; v++)
              t(n, u, s, P[v], o + "/" + w + "/" + v, i, o, w, c, v);
        } else if (w in e.propsKeywords) {
          if (P && typeof P == "object")
            for (var h in P)
              t(n, u, s, P[h], o + "/" + w + "/" + l(h), i, o, w, c, h);
        } else (w in e.keywords || n.allKeys && !(w in e.skipKeywords)) && t(n, u, s, P, o + "/" + w, i, o, w, c);
      }
      s(c, o, i, p, a, y, E);
    }
  }
  function l(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return Hn.exports;
}
var Yi;
function mn() {
  if (Yi) return $e;
  Yi = 1, Object.defineProperty($e, "__esModule", { value: !0 }), $e.getSchemaRefs = $e.resolveUrl = $e.normalizeId = $e._getFullPath = $e.getFullPath = $e.inlineRef = void 0;
  const e = ie(), t = un(), l = Gl(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function u(v, h = !0) {
    return typeof v == "boolean" ? !0 : h === !0 ? !c(v) : h ? o(v) <= h : !1;
  }
  $e.inlineRef = u;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function c(v) {
    for (const h in v) {
      if (s.has(h))
        return !0;
      const f = v[h];
      if (Array.isArray(f) && f.some(c) || typeof f == "object" && c(f))
        return !0;
    }
    return !1;
  }
  function o(v) {
    let h = 0;
    for (const f in v) {
      if (f === "$ref")
        return 1 / 0;
      if (h++, !n.has(f) && (typeof v[f] == "object" && (0, e.eachItem)(v[f], (r) => h += o(r)), h === 1 / 0))
        return 1 / 0;
    }
    return h;
  }
  function i(v, h = "", f) {
    f !== !1 && (h = y(h));
    const r = v.parse(h);
    return p(v, r);
  }
  $e.getFullPath = i;
  function p(v, h) {
    return v.serialize(h).split("#")[0] + "#";
  }
  $e._getFullPath = p;
  const a = /#\/?$/;
  function y(v) {
    return v ? v.replace(a, "") : "";
  }
  $e.normalizeId = y;
  function E(v, h, f) {
    return f = y(f), v.resolve(h, f);
  }
  $e.resolveUrl = E;
  const w = /^[a-z_][-a-z0-9._]*$/i;
  function P(v, h) {
    if (typeof v == "boolean")
      return {};
    const { schemaId: f, uriResolver: r } = this.opts, d = y(v[f] || h), _ = { "": d }, g = i(r, d, !1), $ = {}, b = /* @__PURE__ */ new Set();
    return l(v, { allKeys: !0 }, (M, V, B, W) => {
      if (W === void 0)
        return;
      const F = g + V;
      let z = _[W];
      typeof M[f] == "string" && (z = Y.call(this, M[f])), J.call(this, M.$anchor), J.call(this, M.$dynamicAnchor), _[V] = z;
      function Y(D) {
        const U = this.opts.uriResolver.resolve;
        if (D = y(z ? U(z, D) : D), b.has(D))
          throw C(D);
        b.add(D);
        let j = this.refs[D];
        return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? I(M, j.schema, D) : D !== y(F) && (D[0] === "#" ? (I(M, $[D], D), $[D] = M) : this.refs[D] = F), D;
      }
      function J(D) {
        if (typeof D == "string") {
          if (!w.test(D))
            throw new Error(`invalid anchor "${D}"`);
          Y.call(this, `#${D}`);
        }
      }
    }), $;
    function I(M, V, B) {
      if (V !== void 0 && !t(M, V))
        throw C(B);
    }
    function C(M) {
      return new Error(`reference "${M}" resolves to more than one schema`);
    }
  }
  return $e.getSchemaRefs = P, $e;
}
var Qi;
function pn() {
  if (Qi) return Ce;
  Qi = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.getData = Ce.KeywordCxt = Ce.validateFunctionCode = void 0;
  const e = Vl(), t = on(), l = Zc(), n = on(), u = Ul(), s = zl(), c = Kl(), o = te(), i = Ve(), p = mn(), a = ie(), y = hn();
  function E(N) {
    if (g(N) && (b(N), _(N))) {
      h(N);
      return;
    }
    w(N, () => (0, e.topBoolOrEmptySchema)(N));
  }
  Ce.validateFunctionCode = E;
  function w({ gen: N, validateName: T, schema: k, schemaEnv: L, opts: H }, X) {
    H.code.es5 ? N.func(T, (0, o._)`${i.default.data}, ${i.default.valCxt}`, L.$async, () => {
      N.code((0, o._)`"use strict"; ${r(k, H)}`), v(N, H), N.code(X);
    }) : N.func(T, (0, o._)`${i.default.data}, ${P(H)}`, L.$async, () => N.code(r(k, H)).code(X));
  }
  function P(N) {
    return (0, o._)`{${i.default.instancePath}="", ${i.default.parentData}, ${i.default.parentDataProperty}, ${i.default.rootData}=${i.default.data}${N.dynamicRef ? (0, o._)`, ${i.default.dynamicAnchors}={}` : o.nil}}={}`;
  }
  function v(N, T) {
    N.if(i.default.valCxt, () => {
      N.var(i.default.instancePath, (0, o._)`${i.default.valCxt}.${i.default.instancePath}`), N.var(i.default.parentData, (0, o._)`${i.default.valCxt}.${i.default.parentData}`), N.var(i.default.parentDataProperty, (0, o._)`${i.default.valCxt}.${i.default.parentDataProperty}`), N.var(i.default.rootData, (0, o._)`${i.default.valCxt}.${i.default.rootData}`), T.dynamicRef && N.var(i.default.dynamicAnchors, (0, o._)`${i.default.valCxt}.${i.default.dynamicAnchors}`);
    }, () => {
      N.var(i.default.instancePath, (0, o._)`""`), N.var(i.default.parentData, (0, o._)`undefined`), N.var(i.default.parentDataProperty, (0, o._)`undefined`), N.var(i.default.rootData, i.default.data), T.dynamicRef && N.var(i.default.dynamicAnchors, (0, o._)`{}`);
    });
  }
  function h(N) {
    const { schema: T, opts: k, gen: L } = N;
    w(N, () => {
      k.$comment && T.$comment && W(N), M(N), L.let(i.default.vErrors, null), L.let(i.default.errors, 0), k.unevaluated && f(N), I(N), F(N);
    });
  }
  function f(N) {
    const { gen: T, validateName: k } = N;
    N.evaluated = T.const("evaluated", (0, o._)`${k}.evaluated`), T.if((0, o._)`${N.evaluated}.dynamicProps`, () => T.assign((0, o._)`${N.evaluated}.props`, (0, o._)`undefined`)), T.if((0, o._)`${N.evaluated}.dynamicItems`, () => T.assign((0, o._)`${N.evaluated}.items`, (0, o._)`undefined`));
  }
  function r(N, T) {
    const k = typeof N == "object" && N[T.schemaId];
    return k && (T.code.source || T.code.process) ? (0, o._)`/*# sourceURL=${k} */` : o.nil;
  }
  function d(N, T) {
    if (g(N) && (b(N), _(N))) {
      $(N, T);
      return;
    }
    (0, e.boolOrEmptySchema)(N, T);
  }
  function _({ schema: N, self: T }) {
    if (typeof N == "boolean")
      return !N;
    for (const k in N)
      if (T.RULES.all[k])
        return !0;
    return !1;
  }
  function g(N) {
    return typeof N.schema != "boolean";
  }
  function $(N, T) {
    const { schema: k, gen: L, opts: H } = N;
    H.$comment && k.$comment && W(N), V(N), B(N);
    const X = L.const("_errs", i.default.errors);
    I(N, X), L.var(T, (0, o._)`${X} === ${i.default.errors}`);
  }
  function b(N) {
    (0, a.checkUnknownRules)(N), C(N);
  }
  function I(N, T) {
    if (N.opts.jtd)
      return Y(N, [], !1, T);
    const k = (0, t.getSchemaTypes)(N.schema), L = (0, t.coerceAndCheckDataType)(N, k);
    Y(N, k, !L, T);
  }
  function C(N) {
    const { schema: T, errSchemaPath: k, opts: L, self: H } = N;
    T.$ref && L.ignoreKeywordsWithRef && (0, a.schemaHasRulesButRef)(T, H.RULES) && H.logger.warn(`$ref: keywords ignored in schema at path "${k}"`);
  }
  function M(N) {
    const { schema: T, opts: k } = N;
    T.default !== void 0 && k.useDefaults && k.strictSchema && (0, a.checkStrictMode)(N, "default is ignored in the schema root");
  }
  function V(N) {
    const T = N.schema[N.opts.schemaId];
    T && (N.baseId = (0, p.resolveUrl)(N.opts.uriResolver, N.baseId, T));
  }
  function B(N) {
    if (N.schema.$async && !N.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function W({ gen: N, schemaEnv: T, schema: k, errSchemaPath: L, opts: H }) {
    const X = k.$comment;
    if (H.$comment === !0)
      N.code((0, o._)`${i.default.self}.logger.log(${X})`);
    else if (typeof H.$comment == "function") {
      const ne = (0, o.str)`${L}/$comment`, he = N.scopeValue("root", { ref: T.root });
      N.code((0, o._)`${i.default.self}.opts.$comment(${X}, ${ne}, ${he}.schema)`);
    }
  }
  function F(N) {
    const { gen: T, schemaEnv: k, validateName: L, ValidationError: H, opts: X } = N;
    k.$async ? T.if((0, o._)`${i.default.errors} === 0`, () => T.return(i.default.data), () => T.throw((0, o._)`new ${H}(${i.default.vErrors})`)) : (T.assign((0, o._)`${L}.errors`, i.default.vErrors), X.unevaluated && z(N), T.return((0, o._)`${i.default.errors} === 0`));
  }
  function z({ gen: N, evaluated: T, props: k, items: L }) {
    k instanceof o.Name && N.assign((0, o._)`${T}.props`, k), L instanceof o.Name && N.assign((0, o._)`${T}.items`, L);
  }
  function Y(N, T, k, L) {
    const { gen: H, schema: X, data: ne, allErrors: he, opts: oe, self: ce } = N, { RULES: se } = ce;
    if (X.$ref && (oe.ignoreKeywordsWithRef || !(0, a.schemaHasRulesButRef)(X, se))) {
      H.block(() => K(N, "$ref", se.all.$ref.definition));
      return;
    }
    oe.jtd || D(N, T), H.block(() => {
      for (const fe of se.rules)
        ge(fe);
      ge(se.post);
    });
    function ge(fe) {
      (0, l.shouldUseGroup)(X, fe) && (fe.type ? (H.if((0, n.checkDataType)(fe.type, ne, oe.strictNumbers)), J(N, fe), T.length === 1 && T[0] === fe.type && k && (H.else(), (0, n.reportTypeError)(N)), H.endIf()) : J(N, fe), he || H.if((0, o._)`${i.default.errors} === ${L || 0}`));
    }
  }
  function J(N, T) {
    const { gen: k, schema: L, opts: { useDefaults: H } } = N;
    H && (0, u.assignDefaults)(N, T.type), k.block(() => {
      for (const X of T.rules)
        (0, l.shouldUseRule)(L, X) && K(N, X.keyword, X.definition, T.type);
    });
  }
  function D(N, T) {
    N.schemaEnv.meta || !N.opts.strictTypes || (U(N, T), N.opts.allowUnionTypes || j(N, T), R(N, N.dataTypes));
  }
  function U(N, T) {
    if (T.length) {
      if (!N.dataTypes.length) {
        N.dataTypes = T;
        return;
      }
      T.forEach((k) => {
        O(N.dataTypes, k) || S(N, `type "${k}" not allowed by context "${N.dataTypes.join(",")}"`);
      }), m(N, T);
    }
  }
  function j(N, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && S(N, "use allowUnionTypes to allow union type keyword");
  }
  function R(N, T) {
    const k = N.self.RULES.all;
    for (const L in k) {
      const H = k[L];
      if (typeof H == "object" && (0, l.shouldUseRule)(N.schema, H)) {
        const { type: X } = H.definition;
        X.length && !X.some((ne) => A(T, ne)) && S(N, `missing type "${X.join(",")}" for keyword "${L}"`);
      }
    }
  }
  function A(N, T) {
    return N.includes(T) || T === "number" && N.includes("integer");
  }
  function O(N, T) {
    return N.includes(T) || T === "integer" && N.includes("number");
  }
  function m(N, T) {
    const k = [];
    for (const L of N.dataTypes)
      O(T, L) ? k.push(L) : T.includes("integer") && L === "number" && k.push("integer");
    N.dataTypes = k;
  }
  function S(N, T) {
    const k = N.schemaEnv.baseId + N.errSchemaPath;
    T += ` at "${k}" (strictTypes)`, (0, a.checkStrictMode)(N, T, N.opts.strictTypes);
  }
  class q {
    constructor(T, k, L) {
      if ((0, s.validateKeywordUsage)(T, k, L), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = L, this.data = T.data, this.schema = T.schema[L], this.$data = k.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, a.schemaRefOrVal)(T, this.schema, L, this.$data), this.schemaType = k.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = k, this.$data)
        this.schemaCode = T.gen.const("vSchema", Q(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, k.schemaType, k.allowUndefined))
        throw new Error(`${L} value must be ${JSON.stringify(k.schemaType)}`);
      ("code" in k ? k.trackErrors : k.errors !== !1) && (this.errsCount = T.gen.const("_errs", i.default.errors));
    }
    result(T, k, L) {
      this.failResult((0, o.not)(T), k, L);
    }
    failResult(T, k, L) {
      this.gen.if(T), L ? L() : this.error(), k ? (this.gen.else(), k(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, k) {
      this.failResult((0, o.not)(T), void 0, k);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: k } = this;
      this.fail((0, o._)`${k} !== undefined && (${(0, o.or)(this.invalid$data(), T)})`);
    }
    error(T, k, L) {
      if (k) {
        this.setParams(k), this._error(T, L), this.setParams({});
        return;
      }
      this._error(T, L);
    }
    _error(T, k) {
      (T ? y.reportExtraError : y.reportError)(this, this.def.error, k);
    }
    $dataError() {
      (0, y.reportError)(this, this.def.$dataError || y.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, y.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, k) {
      k ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, k, L = o.nil) {
      this.gen.block(() => {
        this.check$data(T, L), k();
      });
    }
    check$data(T = o.nil, k = o.nil) {
      if (!this.$data)
        return;
      const { gen: L, schemaCode: H, schemaType: X, def: ne } = this;
      L.if((0, o.or)((0, o._)`${H} === undefined`, k)), T !== o.nil && L.assign(T, !0), (X.length || ne.validateSchema) && (L.elseIf(this.invalid$data()), this.$dataError(), T !== o.nil && L.assign(T, !1)), L.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: k, schemaType: L, def: H, it: X } = this;
      return (0, o.or)(ne(), he());
      function ne() {
        if (L.length) {
          if (!(k instanceof o.Name))
            throw new Error("ajv implementation error");
          const oe = Array.isArray(L) ? L : [L];
          return (0, o._)`${(0, n.checkDataTypes)(oe, k, X.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return o.nil;
      }
      function he() {
        if (H.validateSchema) {
          const oe = T.scopeValue("validate$data", { ref: H.validateSchema });
          return (0, o._)`!${oe}(${k})`;
        }
        return o.nil;
      }
    }
    subschema(T, k) {
      const L = (0, c.getSubschema)(this.it, T);
      (0, c.extendSubschemaData)(L, this.it, T), (0, c.extendSubschemaMode)(L, T);
      const H = { ...this.it, ...L, items: void 0, props: void 0 };
      return d(H, k), H;
    }
    mergeEvaluated(T, k) {
      const { it: L, gen: H } = this;
      L.opts.unevaluated && (L.props !== !0 && T.props !== void 0 && (L.props = a.mergeEvaluated.props(H, T.props, L.props, k)), L.items !== !0 && T.items !== void 0 && (L.items = a.mergeEvaluated.items(H, T.items, L.items, k)));
    }
    mergeValidEvaluated(T, k) {
      const { it: L, gen: H } = this;
      if (L.opts.unevaluated && (L.props !== !0 || L.items !== !0))
        return H.if(k, () => this.mergeEvaluated(T, o.Name)), !0;
    }
  }
  Ce.KeywordCxt = q;
  function K(N, T, k, L) {
    const H = new q(N, k, T);
    "code" in k ? k.code(H, L) : H.$data && k.validate ? (0, s.funcKeywordCode)(H, k) : "macro" in k ? (0, s.macroKeywordCode)(H, k) : (k.compile || k.validate) && (0, s.funcKeywordCode)(H, k);
  }
  const G = /^\/(?:[^~]|~0|~1)*$/, Z = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function Q(N, { dataLevel: T, dataNames: k, dataPathArr: L }) {
    let H, X;
    if (N === "")
      return i.default.rootData;
    if (N[0] === "/") {
      if (!G.test(N))
        throw new Error(`Invalid JSON-pointer: ${N}`);
      H = N, X = i.default.rootData;
    } else {
      const ce = Z.exec(N);
      if (!ce)
        throw new Error(`Invalid JSON-pointer: ${N}`);
      const se = +ce[1];
      if (H = ce[2], H === "#") {
        if (se >= T)
          throw new Error(oe("property/index", se));
        return L[T - se];
      }
      if (se > T)
        throw new Error(oe("data", se));
      if (X = k[T - se], !H)
        return X;
    }
    let ne = X;
    const he = H.split("/");
    for (const ce of he)
      ce && (X = (0, o._)`${X}${(0, o.getProperty)((0, a.unescapeJsonPointer)(ce))}`, ne = (0, o._)`${ne} && ${X}`);
    return ne;
    function oe(ce, se) {
      return `Cannot access ${ce} ${se} levels up, current level is ${T}`;
    }
  }
  return Ce.getData = Q, Ce;
}
var $r = {}, Zi;
function Gs() {
  if (Zi) return $r;
  Zi = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  class e extends Error {
    constructor(l) {
      super("validation failed"), this.errors = l, this.ajv = this.validation = !0;
    }
  }
  return $r.default = e, $r;
}
var vr = {}, xi;
function yn() {
  if (xi) return vr;
  xi = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const e = mn();
  class t extends Error {
    constructor(n, u, s, c) {
      super(c || `can't resolve reference ${s} from id ${u}`), this.missingRef = (0, e.resolveUrl)(n, u, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return vr.default = t, vr;
}
var Ee = {}, eo;
function Hs() {
  if (eo) return Ee;
  eo = 1, Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.resolveSchema = Ee.getCompilingSchema = Ee.resolveRef = Ee.compileSchema = Ee.SchemaEnv = void 0;
  const e = te(), t = Gs(), l = Ve(), n = mn(), u = ie(), s = pn();
  class c {
    constructor(f) {
      var r;
      this.refs = {}, this.dynamicAnchors = {};
      let d;
      typeof f.schema == "object" && (d = f.schema), this.schema = f.schema, this.schemaId = f.schemaId, this.root = f.root || this, this.baseId = (r = f.baseId) !== null && r !== void 0 ? r : (0, n.normalizeId)(d == null ? void 0 : d[f.schemaId || "$id"]), this.schemaPath = f.schemaPath, this.localRefs = f.localRefs, this.meta = f.meta, this.$async = d == null ? void 0 : d.$async, this.refs = {};
    }
  }
  Ee.SchemaEnv = c;
  function o(h) {
    const f = a.call(this, h);
    if (f)
      return f;
    const r = (0, n.getFullPath)(this.opts.uriResolver, h.root.baseId), { es5: d, lines: _ } = this.opts.code, { ownProperties: g } = this.opts, $ = new e.CodeGen(this.scope, { es5: d, lines: _, ownProperties: g });
    let b;
    h.$async && (b = $.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const I = $.scopeName("validate");
    h.validateName = I;
    const C = {
      gen: $,
      allErrors: this.opts.allErrors,
      data: l.default.data,
      parentData: l.default.parentData,
      parentDataProperty: l.default.parentDataProperty,
      dataNames: [l.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: $.scopeValue("schema", this.opts.code.source === !0 ? { ref: h.schema, code: (0, e.stringify)(h.schema) } : { ref: h.schema }),
      validateName: I,
      ValidationError: b,
      schema: h.schema,
      schemaEnv: h,
      rootId: r,
      baseId: h.baseId || r,
      schemaPath: e.nil,
      errSchemaPath: h.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let M;
    try {
      this._compilations.add(h), (0, s.validateFunctionCode)(C), $.optimize(this.opts.code.optimize);
      const V = $.toString();
      M = `${$.scopeRefs(l.default.scope)}return ${V}`, this.opts.code.process && (M = this.opts.code.process(M, h));
      const W = new Function(`${l.default.self}`, `${l.default.scope}`, M)(this, this.scope.get());
      if (this.scope.value(I, { ref: W }), W.errors = null, W.schema = h.schema, W.schemaEnv = h, h.$async && (W.$async = !0), this.opts.code.source === !0 && (W.source = { validateName: I, validateCode: V, scopeValues: $._values }), this.opts.unevaluated) {
        const { props: F, items: z } = C;
        W.evaluated = {
          props: F instanceof e.Name ? void 0 : F,
          items: z instanceof e.Name ? void 0 : z,
          dynamicProps: F instanceof e.Name,
          dynamicItems: z instanceof e.Name
        }, W.source && (W.source.evaluated = (0, e.stringify)(W.evaluated));
      }
      return h.validate = W, h;
    } catch (V) {
      throw delete h.validate, delete h.validateName, M && this.logger.error("Error compiling schema, function code:", M), V;
    } finally {
      this._compilations.delete(h);
    }
  }
  Ee.compileSchema = o;
  function i(h, f, r) {
    var d;
    r = (0, n.resolveUrl)(this.opts.uriResolver, f, r);
    const _ = h.refs[r];
    if (_)
      return _;
    let g = E.call(this, h, r);
    if (g === void 0) {
      const $ = (d = h.localRefs) === null || d === void 0 ? void 0 : d[r], { schemaId: b } = this.opts;
      $ && (g = new c({ schema: $, schemaId: b, root: h, baseId: f }));
    }
    if (g !== void 0)
      return h.refs[r] = p.call(this, g);
  }
  Ee.resolveRef = i;
  function p(h) {
    return (0, n.inlineRef)(h.schema, this.opts.inlineRefs) ? h.schema : h.validate ? h : o.call(this, h);
  }
  function a(h) {
    for (const f of this._compilations)
      if (y(f, h))
        return f;
  }
  Ee.getCompilingSchema = a;
  function y(h, f) {
    return h.schema === f.schema && h.root === f.root && h.baseId === f.baseId;
  }
  function E(h, f) {
    let r;
    for (; typeof (r = this.refs[f]) == "string"; )
      f = r;
    return r || this.schemas[f] || w.call(this, h, f);
  }
  function w(h, f) {
    const r = this.opts.uriResolver.parse(f), d = (0, n._getFullPath)(this.opts.uriResolver, r);
    let _ = (0, n.getFullPath)(this.opts.uriResolver, h.baseId, void 0);
    if (Object.keys(h.schema).length > 0 && d === _)
      return v.call(this, r, h);
    const g = (0, n.normalizeId)(d), $ = this.refs[g] || this.schemas[g];
    if (typeof $ == "string") {
      const b = w.call(this, h, $);
      return typeof (b == null ? void 0 : b.schema) != "object" ? void 0 : v.call(this, r, b);
    }
    if (typeof ($ == null ? void 0 : $.schema) == "object") {
      if ($.validate || o.call(this, $), g === (0, n.normalizeId)(f)) {
        const { schema: b } = $, { schemaId: I } = this.opts, C = b[I];
        return C && (_ = (0, n.resolveUrl)(this.opts.uriResolver, _, C)), new c({ schema: b, schemaId: I, root: h, baseId: _ });
      }
      return v.call(this, r, $);
    }
  }
  Ee.resolveSchema = w;
  const P = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function v(h, { baseId: f, schema: r, root: d }) {
    var _;
    if (((_ = h.fragment) === null || _ === void 0 ? void 0 : _[0]) !== "/")
      return;
    for (const b of h.fragment.slice(1).split("/")) {
      if (typeof r == "boolean")
        return;
      const I = r[(0, u.unescapeFragment)(b)];
      if (I === void 0)
        return;
      r = I;
      const C = typeof r == "object" && r[this.opts.schemaId];
      !P.has(b) && C && (f = (0, n.resolveUrl)(this.opts.uriResolver, f, C));
    }
    let g;
    if (typeof r != "boolean" && r.$ref && !(0, u.schemaHasRulesButRef)(r, this.RULES)) {
      const b = (0, n.resolveUrl)(this.opts.uriResolver, f, r.$ref);
      g = w.call(this, d, b);
    }
    const { schemaId: $ } = this.opts;
    if (g = g || new c({ schema: r, schemaId: $, root: d, baseId: f }), g.schema !== g.root.schema)
      return g;
  }
  return Ee;
}
const Hl = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Wl = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Bl = "object", Jl = ["$data"], Xl = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Yl = !1, Ql = {
  $id: Hl,
  description: Wl,
  type: Bl,
  required: Jl,
  properties: Xl,
  additionalProperties: Yl
};
var _r = {}, to;
function Zl() {
  if (to) return _r;
  to = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const e = Bc();
  return e.code = 'require("ajv/dist/runtime/uri").default', _r.default = e, _r;
}
var ro;
function xl() {
  return ro || (ro = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = pn();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var l = te();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return l._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return l.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return l.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return l.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return l.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return l.CodeGen;
    } });
    const n = Gs(), u = yn(), s = Qc(), c = Hs(), o = te(), i = mn(), p = on(), a = ie(), y = Ql, E = Zl(), w = (j, R) => new RegExp(j, R);
    w.code = "new RegExp";
    const P = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), h = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, f = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, r = 200;
    function d(j) {
      var R, A, O, m, S, q, K, G, Z, Q, N, T, k, L, H, X, ne, he, oe, ce, se, ge, fe, Ue, ze;
      const Se = j.strict, Ke = (R = j.code) === null || R === void 0 ? void 0 : R.optimize, st = Ke === !0 || Ke === void 0 ? 1 : Ke || 0, at = (O = (A = j.code) === null || A === void 0 ? void 0 : A.regExp) !== null && O !== void 0 ? O : w, Sn = (m = j.uriResolver) !== null && m !== void 0 ? m : E.default;
      return {
        strictSchema: (q = (S = j.strictSchema) !== null && S !== void 0 ? S : Se) !== null && q !== void 0 ? q : !0,
        strictNumbers: (G = (K = j.strictNumbers) !== null && K !== void 0 ? K : Se) !== null && G !== void 0 ? G : !0,
        strictTypes: (Q = (Z = j.strictTypes) !== null && Z !== void 0 ? Z : Se) !== null && Q !== void 0 ? Q : "log",
        strictTuples: (T = (N = j.strictTuples) !== null && N !== void 0 ? N : Se) !== null && T !== void 0 ? T : "log",
        strictRequired: (L = (k = j.strictRequired) !== null && k !== void 0 ? k : Se) !== null && L !== void 0 ? L : !1,
        code: j.code ? { ...j.code, optimize: st, regExp: at } : { optimize: st, regExp: at },
        loopRequired: (H = j.loopRequired) !== null && H !== void 0 ? H : r,
        loopEnum: (X = j.loopEnum) !== null && X !== void 0 ? X : r,
        meta: (ne = j.meta) !== null && ne !== void 0 ? ne : !0,
        messages: (he = j.messages) !== null && he !== void 0 ? he : !0,
        inlineRefs: (oe = j.inlineRefs) !== null && oe !== void 0 ? oe : !0,
        schemaId: (ce = j.schemaId) !== null && ce !== void 0 ? ce : "$id",
        addUsedSchema: (se = j.addUsedSchema) !== null && se !== void 0 ? se : !0,
        validateSchema: (ge = j.validateSchema) !== null && ge !== void 0 ? ge : !0,
        validateFormats: (fe = j.validateFormats) !== null && fe !== void 0 ? fe : !0,
        unicodeRegExp: (Ue = j.unicodeRegExp) !== null && Ue !== void 0 ? Ue : !0,
        int32range: (ze = j.int32range) !== null && ze !== void 0 ? ze : !0,
        uriResolver: Sn
      };
    }
    class _ {
      constructor(R = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), R = this.opts = { ...R, ...d(R) };
        const { es5: A, lines: O } = this.opts.code;
        this.scope = new o.ValueScope({ scope: {}, prefixes: v, es5: A, lines: O }), this.logger = B(R.logger);
        const m = R.validateFormats;
        R.validateFormats = !1, this.RULES = (0, s.getRules)(), g.call(this, h, R, "NOT SUPPORTED"), g.call(this, f, R, "DEPRECATED", "warn"), this._metaOpts = M.call(this), R.formats && I.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), R.keywords && C.call(this, R.keywords), typeof R.meta == "object" && this.addMetaSchema(R.meta), b.call(this), R.validateFormats = m;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: R, meta: A, schemaId: O } = this.opts;
        let m = y;
        O === "id" && (m = { ...y }, m.id = m.$id, delete m.$id), A && R && this.addMetaSchema(m, m[O], !1);
      }
      defaultMeta() {
        const { meta: R, schemaId: A } = this.opts;
        return this.opts.defaultMeta = typeof R == "object" ? R[A] || R : void 0;
      }
      validate(R, A) {
        let O;
        if (typeof R == "string") {
          if (O = this.getSchema(R), !O)
            throw new Error(`no schema with key or ref "${R}"`);
        } else
          O = this.compile(R);
        const m = O(A);
        return "$async" in O || (this.errors = O.errors), m;
      }
      compile(R, A) {
        const O = this._addSchema(R, A);
        return O.validate || this._compileSchemaEnv(O);
      }
      compileAsync(R, A) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: O } = this.opts;
        return m.call(this, R, A);
        async function m(Q, N) {
          await S.call(this, Q.$schema);
          const T = this._addSchema(Q, N);
          return T.validate || q.call(this, T);
        }
        async function S(Q) {
          Q && !this.getSchema(Q) && await m.call(this, { $ref: Q }, !0);
        }
        async function q(Q) {
          try {
            return this._compileSchemaEnv(Q);
          } catch (N) {
            if (!(N instanceof u.default))
              throw N;
            return K.call(this, N), await G.call(this, N.missingSchema), q.call(this, Q);
          }
        }
        function K({ missingSchema: Q, missingRef: N }) {
          if (this.refs[Q])
            throw new Error(`AnySchema ${Q} is loaded but ${N} cannot be resolved`);
        }
        async function G(Q) {
          const N = await Z.call(this, Q);
          this.refs[Q] || await S.call(this, N.$schema), this.refs[Q] || this.addSchema(N, Q, A);
        }
        async function Z(Q) {
          const N = this._loading[Q];
          if (N)
            return N;
          try {
            return await (this._loading[Q] = O(Q));
          } finally {
            delete this._loading[Q];
          }
        }
      }
      // Adds schema to the instance
      addSchema(R, A, O, m = this.opts.validateSchema) {
        if (Array.isArray(R)) {
          for (const q of R)
            this.addSchema(q, void 0, O, m);
          return this;
        }
        let S;
        if (typeof R == "object") {
          const { schemaId: q } = this.opts;
          if (S = R[q], S !== void 0 && typeof S != "string")
            throw new Error(`schema ${q} must be string`);
        }
        return A = (0, i.normalizeId)(A || S), this._checkUnique(A), this.schemas[A] = this._addSchema(R, O, A, m, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(R, A, O = this.opts.validateSchema) {
        return this.addSchema(R, A, !0, O), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(R, A) {
        if (typeof R == "boolean")
          return !0;
        let O;
        if (O = R.$schema, O !== void 0 && typeof O != "string")
          throw new Error("$schema must be a string");
        if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const m = this.validate(O, R);
        if (!m && A) {
          const S = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(S);
          else
            throw new Error(S);
        }
        return m;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(R) {
        let A;
        for (; typeof (A = $.call(this, R)) == "string"; )
          R = A;
        if (A === void 0) {
          const { schemaId: O } = this.opts, m = new c.SchemaEnv({ schema: {}, schemaId: O });
          if (A = c.resolveSchema.call(this, m, R), !A)
            return;
          this.refs[R] = A;
        }
        return A.validate || this._compileSchemaEnv(A);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(R) {
        if (R instanceof RegExp)
          return this._removeAllSchemas(this.schemas, R), this._removeAllSchemas(this.refs, R), this;
        switch (typeof R) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const A = $.call(this, R);
            return typeof A == "object" && this._cache.delete(A.schema), delete this.schemas[R], delete this.refs[R], this;
          }
          case "object": {
            const A = R;
            this._cache.delete(A);
            let O = R[this.opts.schemaId];
            return O && (O = (0, i.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(R) {
        for (const A of R)
          this.addKeyword(A);
        return this;
      }
      addKeyword(R, A) {
        let O;
        if (typeof R == "string")
          O = R, typeof A == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), A.keyword = O);
        else if (typeof R == "object" && A === void 0) {
          if (A = R, O = A.keyword, Array.isArray(O) && !O.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (F.call(this, O, A), !A)
          return (0, a.eachItem)(O, (S) => z.call(this, S)), this;
        J.call(this, A);
        const m = {
          ...A,
          type: (0, p.getJSONTypes)(A.type),
          schemaType: (0, p.getJSONTypes)(A.schemaType)
        };
        return (0, a.eachItem)(O, m.type.length === 0 ? (S) => z.call(this, S, m) : (S) => m.type.forEach((q) => z.call(this, S, m, q))), this;
      }
      getKeyword(R) {
        const A = this.RULES.all[R];
        return typeof A == "object" ? A.definition : !!A;
      }
      // Remove keyword
      removeKeyword(R) {
        const { RULES: A } = this;
        delete A.keywords[R], delete A.all[R];
        for (const O of A.rules) {
          const m = O.rules.findIndex((S) => S.keyword === R);
          m >= 0 && O.rules.splice(m, 1);
        }
        return this;
      }
      // Add format
      addFormat(R, A) {
        return typeof A == "string" && (A = new RegExp(A)), this.formats[R] = A, this;
      }
      errorsText(R = this.errors, { separator: A = ", ", dataVar: O = "data" } = {}) {
        return !R || R.length === 0 ? "No errors" : R.map((m) => `${O}${m.instancePath} ${m.message}`).reduce((m, S) => m + A + S);
      }
      $dataMetaSchema(R, A) {
        const O = this.RULES.all;
        R = JSON.parse(JSON.stringify(R));
        for (const m of A) {
          const S = m.split("/").slice(1);
          let q = R;
          for (const K of S)
            q = q[K];
          for (const K in O) {
            const G = O[K];
            if (typeof G != "object")
              continue;
            const { $data: Z } = G.definition, Q = q[K];
            Z && Q && (q[K] = U(Q));
          }
        }
        return R;
      }
      _removeAllSchemas(R, A) {
        for (const O in R) {
          const m = R[O];
          (!A || A.test(O)) && (typeof m == "string" ? delete R[O] : m && !m.meta && (this._cache.delete(m.schema), delete R[O]));
        }
      }
      _addSchema(R, A, O, m = this.opts.validateSchema, S = this.opts.addUsedSchema) {
        let q;
        const { schemaId: K } = this.opts;
        if (typeof R == "object")
          q = R[K];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof R != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let G = this._cache.get(R);
        if (G !== void 0)
          return G;
        O = (0, i.normalizeId)(q || O);
        const Z = i.getSchemaRefs.call(this, R, O);
        return G = new c.SchemaEnv({ schema: R, schemaId: K, meta: A, baseId: O, localRefs: Z }), this._cache.set(G.schema, G), S && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = G), m && this.validateSchema(R, !0), G;
      }
      _checkUnique(R) {
        if (this.schemas[R] || this.refs[R])
          throw new Error(`schema with key or id "${R}" already exists`);
      }
      _compileSchemaEnv(R) {
        if (R.meta ? this._compileMetaSchema(R) : c.compileSchema.call(this, R), !R.validate)
          throw new Error("ajv implementation error");
        return R.validate;
      }
      _compileMetaSchema(R) {
        const A = this.opts;
        this.opts = this._metaOpts;
        try {
          c.compileSchema.call(this, R);
        } finally {
          this.opts = A;
        }
      }
    }
    _.ValidationError = n.default, _.MissingRefError = u.default, e.default = _;
    function g(j, R, A, O = "error") {
      for (const m in j) {
        const S = m;
        S in R && this.logger[O](`${A}: option ${m}. ${j[S]}`);
      }
    }
    function $(j) {
      return j = (0, i.normalizeId)(j), this.schemas[j] || this.refs[j];
    }
    function b() {
      const j = this.opts.schemas;
      if (j)
        if (Array.isArray(j))
          this.addSchema(j);
        else
          for (const R in j)
            this.addSchema(j[R], R);
    }
    function I() {
      for (const j in this.opts.formats) {
        const R = this.opts.formats[j];
        R && this.addFormat(j, R);
      }
    }
    function C(j) {
      if (Array.isArray(j)) {
        this.addVocabulary(j);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const R in j) {
        const A = j[R];
        A.keyword || (A.keyword = R), this.addKeyword(A);
      }
    }
    function M() {
      const j = { ...this.opts };
      for (const R of P)
        delete j[R];
      return j;
    }
    const V = { log() {
    }, warn() {
    }, error() {
    } };
    function B(j) {
      if (j === !1)
        return V;
      if (j === void 0)
        return console;
      if (j.log && j.warn && j.error)
        return j;
      throw new Error("logger must implement log, warn and error methods");
    }
    const W = /^[a-z_$][a-z0-9_$:-]*$/i;
    function F(j, R) {
      const { RULES: A } = this;
      if ((0, a.eachItem)(j, (O) => {
        if (A.keywords[O])
          throw new Error(`Keyword ${O} is already defined`);
        if (!W.test(O))
          throw new Error(`Keyword ${O} has invalid name`);
      }), !!R && R.$data && !("code" in R || "validate" in R))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function z(j, R, A) {
      var O;
      const m = R == null ? void 0 : R.post;
      if (A && m)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: S } = this;
      let q = m ? S.post : S.rules.find(({ type: G }) => G === A);
      if (q || (q = { type: A, rules: [] }, S.rules.push(q)), S.keywords[j] = !0, !R)
        return;
      const K = {
        keyword: j,
        definition: {
          ...R,
          type: (0, p.getJSONTypes)(R.type),
          schemaType: (0, p.getJSONTypes)(R.schemaType)
        }
      };
      R.before ? Y.call(this, q, K, R.before) : q.rules.push(K), S.all[j] = K, (O = R.implements) === null || O === void 0 || O.forEach((G) => this.addKeyword(G));
    }
    function Y(j, R, A) {
      const O = j.rules.findIndex((m) => m.keyword === A);
      O >= 0 ? j.rules.splice(O, 0, R) : (j.rules.push(R), this.logger.warn(`rule ${A} is not defined`));
    }
    function J(j) {
      let { metaSchema: R } = j;
      R !== void 0 && (j.$data && this.opts.$data && (R = U(R)), j.validateSchema = this.compile(R, !0));
    }
    const D = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function U(j) {
      return { anyOf: [j, D] };
    }
  }(Vn)), Vn;
}
var gr = {}, wr = {}, Er = {}, no;
function ed() {
  if (no) return Er;
  no = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Er.default = e, Er;
}
var Le = {}, so;
function td() {
  if (so) return Le;
  so = 1, Object.defineProperty(Le, "__esModule", { value: !0 }), Le.callRef = Le.getValidate = void 0;
  const e = yn(), t = Oe(), l = te(), n = Ve(), u = Hs(), s = ie(), c = {
    keyword: "$ref",
    schemaType: "string",
    code(p) {
      const { gen: a, schema: y, it: E } = p, { baseId: w, schemaEnv: P, validateName: v, opts: h, self: f } = E, { root: r } = P;
      if ((y === "#" || y === "#/") && w === r.baseId)
        return _();
      const d = u.resolveRef.call(f, r, w, y);
      if (d === void 0)
        throw new e.default(E.opts.uriResolver, w, y);
      if (d instanceof u.SchemaEnv)
        return g(d);
      return $(d);
      function _() {
        if (P === r)
          return i(p, v, P, P.$async);
        const b = a.scopeValue("root", { ref: r });
        return i(p, (0, l._)`${b}.validate`, r, r.$async);
      }
      function g(b) {
        const I = o(p, b);
        i(p, I, b, b.$async);
      }
      function $(b) {
        const I = a.scopeValue("schema", h.code.source === !0 ? { ref: b, code: (0, l.stringify)(b) } : { ref: b }), C = a.name("valid"), M = p.subschema({
          schema: b,
          dataTypes: [],
          schemaPath: l.nil,
          topSchemaRef: I,
          errSchemaPath: y
        }, C);
        p.mergeEvaluated(M), p.ok(C);
      }
    }
  };
  function o(p, a) {
    const { gen: y } = p;
    return a.validate ? y.scopeValue("validate", { ref: a.validate }) : (0, l._)`${y.scopeValue("wrapper", { ref: a })}.validate`;
  }
  Le.getValidate = o;
  function i(p, a, y, E) {
    const { gen: w, it: P } = p, { allErrors: v, schemaEnv: h, opts: f } = P, r = f.passContext ? n.default.this : l.nil;
    E ? d() : _();
    function d() {
      if (!h.$async)
        throw new Error("async schema referenced by sync schema");
      const b = w.let("valid");
      w.try(() => {
        w.code((0, l._)`await ${(0, t.callValidateCode)(p, a, r)}`), $(a), v || w.assign(b, !0);
      }, (I) => {
        w.if((0, l._)`!(${I} instanceof ${P.ValidationError})`, () => w.throw(I)), g(I), v || w.assign(b, !1);
      }), p.ok(b);
    }
    function _() {
      p.result((0, t.callValidateCode)(p, a, r), () => $(a), () => g(a));
    }
    function g(b) {
      const I = (0, l._)`${b}.errors`;
      w.assign(n.default.vErrors, (0, l._)`${n.default.vErrors} === null ? ${I} : ${n.default.vErrors}.concat(${I})`), w.assign(n.default.errors, (0, l._)`${n.default.vErrors}.length`);
    }
    function $(b) {
      var I;
      if (!P.opts.unevaluated)
        return;
      const C = (I = y == null ? void 0 : y.validate) === null || I === void 0 ? void 0 : I.evaluated;
      if (P.props !== !0)
        if (C && !C.dynamicProps)
          C.props !== void 0 && (P.props = s.mergeEvaluated.props(w, C.props, P.props));
        else {
          const M = w.var("props", (0, l._)`${b}.evaluated.props`);
          P.props = s.mergeEvaluated.props(w, M, P.props, l.Name);
        }
      if (P.items !== !0)
        if (C && !C.dynamicItems)
          C.items !== void 0 && (P.items = s.mergeEvaluated.items(w, C.items, P.items));
        else {
          const M = w.var("items", (0, l._)`${b}.evaluated.items`);
          P.items = s.mergeEvaluated.items(w, M, P.items, l.Name);
        }
    }
  }
  return Le.callRef = i, Le.default = c, Le;
}
var ao;
function rd() {
  if (ao) return wr;
  ao = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = ed(), t = td(), l = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return wr.default = l, wr;
}
var Sr = {}, br = {}, io;
function nd() {
  if (io) return br;
  io = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const e = te(), t = e.operators, l = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: c }) => (0, e.str)`must be ${l[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, e._)`{comparison: ${l[s].okStr}, limit: ${c}}`
  }, u = {
    keyword: Object.keys(l),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: c, data: o, schemaCode: i } = s;
      s.fail$data((0, e._)`${o} ${l[c].fail} ${i} || isNaN(${o})`);
    }
  };
  return br.default = u, br;
}
var Pr = {}, oo;
function sd() {
  if (oo) return Pr;
  oo = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = te(), l = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: u, data: s, schemaCode: c, it: o } = n, i = o.opts.multipleOfPrecision, p = u.let("res"), a = i ? (0, e._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${i}` : (0, e._)`${p} !== parseInt(${p})`;
      n.fail$data((0, e._)`(${c} === 0 || (${p} = ${s}/${c}, ${a}))`);
    }
  };
  return Pr.default = l, Pr;
}
var Rr = {}, Nr = {}, co;
function ad() {
  if (co) return Nr;
  co = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  function e(t) {
    const l = t.length;
    let n = 0, u = 0, s;
    for (; u < l; )
      n++, s = t.charCodeAt(u++), s >= 55296 && s <= 56319 && u < l && (s = t.charCodeAt(u), (s & 64512) === 56320 && u++);
    return n;
  }
  return Nr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Nr;
}
var uo;
function id() {
  if (uo) return Rr;
  uo = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = te(), t = ie(), l = ad(), u = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: c }) {
        const o = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${o} than ${c} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: c, data: o, schemaCode: i, it: p } = s, a = c === "maxLength" ? e.operators.GT : e.operators.LT, y = p.opts.unicode === !1 ? (0, e._)`${o}.length` : (0, e._)`${(0, t.useFunc)(s.gen, l.default)}(${o})`;
      s.fail$data((0, e._)`${y} ${a} ${i}`);
    }
  };
  return Rr.default = u, Rr;
}
var Or = {}, lo;
function od() {
  if (lo) return Or;
  lo = 1, Object.defineProperty(Or, "__esModule", { value: !0 });
  const e = Oe(), t = te(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: u }) => (0, t.str)`must match pattern "${u}"`,
      params: ({ schemaCode: u }) => (0, t._)`{pattern: ${u}}`
    },
    code(u) {
      const { data: s, $data: c, schema: o, schemaCode: i, it: p } = u, a = p.opts.unicodeRegExp ? "u" : "", y = c ? (0, t._)`(new RegExp(${i}, ${a}))` : (0, e.usePattern)(u, o);
      u.fail$data((0, t._)`!${y}.test(${s})`);
    }
  };
  return Or.default = n, Or;
}
var Ir = {}, fo;
function cd() {
  if (fo) return Ir;
  fo = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const e = te(), l = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${u} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: s, schemaCode: c } = n, o = u === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${o} ${c}`);
    }
  };
  return Ir.default = l, Ir;
}
var Tr = {}, ho;
function ud() {
  if (ho) return Tr;
  ho = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const e = Oe(), t = te(), l = ie(), u = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: c, schema: o, schemaCode: i, data: p, $data: a, it: y } = s, { opts: E } = y;
      if (!a && o.length === 0)
        return;
      const w = o.length >= E.loopRequired;
      if (y.allErrors ? P() : v(), E.strictRequired) {
        const r = s.parentSchema.properties, { definedProperties: d } = s.it;
        for (const _ of o)
          if ((r == null ? void 0 : r[_]) === void 0 && !d.has(_)) {
            const g = y.schemaEnv.baseId + y.errSchemaPath, $ = `required property "${_}" is not defined at "${g}" (strictRequired)`;
            (0, l.checkStrictMode)(y, $, y.opts.strictRequired);
          }
      }
      function P() {
        if (w || a)
          s.block$data(t.nil, h);
        else
          for (const r of o)
            (0, e.checkReportMissingProp)(s, r);
      }
      function v() {
        const r = c.let("missing");
        if (w || a) {
          const d = c.let("valid", !0);
          s.block$data(d, () => f(r, d)), s.ok(d);
        } else
          c.if((0, e.checkMissingProp)(s, o, r)), (0, e.reportMissingProp)(s, r), c.else();
      }
      function h() {
        c.forOf("prop", i, (r) => {
          s.setParams({ missingProperty: r }), c.if((0, e.noPropertyInData)(c, p, r, E.ownProperties), () => s.error());
        });
      }
      function f(r, d) {
        s.setParams({ missingProperty: r }), c.forOf(r, i, () => {
          c.assign(d, (0, e.propertyInData)(c, p, r, E.ownProperties)), c.if((0, t.not)(d), () => {
            s.error(), c.break();
          });
        }, t.nil);
      }
    }
  };
  return Tr.default = u, Tr;
}
var jr = {}, mo;
function ld() {
  if (mo) return jr;
  mo = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = te(), l = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: u }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${u} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: u, data: s, schemaCode: c } = n, o = u === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${o} ${c}`);
    }
  };
  return jr.default = l, jr;
}
var Ar = {}, qr = {}, po;
function Ws() {
  if (po) return qr;
  po = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = un();
  return e.code = 'require("ajv/dist/runtime/equal").default', qr.default = e, qr;
}
var yo;
function dd() {
  if (yo) return Ar;
  yo = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = on(), t = te(), l = ie(), n = Ws(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i: c, j: o } }) => (0, t.str)`must NOT have duplicate items (items ## ${o} and ${c} are identical)`,
      params: ({ params: { i: c, j: o } }) => (0, t._)`{i: ${c}, j: ${o}}`
    },
    code(c) {
      const { gen: o, data: i, $data: p, schema: a, parentSchema: y, schemaCode: E, it: w } = c;
      if (!p && !a)
        return;
      const P = o.let("valid"), v = y.items ? (0, e.getSchemaTypes)(y.items) : [];
      c.block$data(P, h, (0, t._)`${E} === false`), c.ok(P);
      function h() {
        const _ = o.let("i", (0, t._)`${i}.length`), g = o.let("j");
        c.setParams({ i: _, j: g }), o.assign(P, !0), o.if((0, t._)`${_} > 1`, () => (f() ? r : d)(_, g));
      }
      function f() {
        return v.length > 0 && !v.some((_) => _ === "object" || _ === "array");
      }
      function r(_, g) {
        const $ = o.name("item"), b = (0, e.checkDataTypes)(v, $, w.opts.strictNumbers, e.DataType.Wrong), I = o.const("indices", (0, t._)`{}`);
        o.for((0, t._)`;${_}--;`, () => {
          o.let($, (0, t._)`${i}[${_}]`), o.if(b, (0, t._)`continue`), v.length > 1 && o.if((0, t._)`typeof ${$} == "string"`, (0, t._)`${$} += "_"`), o.if((0, t._)`typeof ${I}[${$}] == "number"`, () => {
            o.assign(g, (0, t._)`${I}[${$}]`), c.error(), o.assign(P, !1).break();
          }).code((0, t._)`${I}[${$}] = ${_}`);
        });
      }
      function d(_, g) {
        const $ = (0, l.useFunc)(o, n.default), b = o.name("outer");
        o.label(b).for((0, t._)`;${_}--;`, () => o.for((0, t._)`${g} = ${_}; ${g}--;`, () => o.if((0, t._)`${$}(${i}[${_}], ${i}[${g}])`, () => {
          c.error(), o.assign(P, !1).break(b);
        })));
      }
    }
  };
  return Ar.default = s, Ar;
}
var Cr = {}, $o;
function fd() {
  if ($o) return Cr;
  $o = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = te(), t = ie(), l = Ws(), u = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: c, data: o, $data: i, schemaCode: p, schema: a } = s;
      i || a && typeof a == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(c, l.default)}(${o}, ${p})`) : s.fail((0, e._)`${a} !== ${o}`);
    }
  };
  return Cr.default = u, Cr;
}
var kr = {}, vo;
function hd() {
  if (vo) return kr;
  vo = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = te(), t = ie(), l = Ws(), u = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: c, data: o, $data: i, schema: p, schemaCode: a, it: y } = s;
      if (!i && p.length === 0)
        throw new Error("enum must have non-empty array");
      const E = p.length >= y.opts.loopEnum;
      let w;
      const P = () => w ?? (w = (0, t.useFunc)(c, l.default));
      let v;
      if (E || i)
        v = c.let("valid"), s.block$data(v, h);
      else {
        if (!Array.isArray(p))
          throw new Error("ajv implementation error");
        const r = c.const("vSchema", a);
        v = (0, e.or)(...p.map((d, _) => f(r, _)));
      }
      s.pass(v);
      function h() {
        c.assign(v, !1), c.forOf("v", a, (r) => c.if((0, e._)`${P()}(${o}, ${r})`, () => c.assign(v, !0).break()));
      }
      function f(r, d) {
        const _ = p[d];
        return typeof _ == "object" && _ !== null ? (0, e._)`${P()}(${o}, ${r}[${d}])` : (0, e._)`${o} === ${_}`;
      }
    }
  };
  return kr.default = u, kr;
}
var _o;
function md() {
  if (_o) return Sr;
  _o = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const e = nd(), t = sd(), l = id(), n = od(), u = cd(), s = ud(), c = ld(), o = dd(), i = fd(), p = hd(), a = [
    // number
    e.default,
    t.default,
    // string
    l.default,
    n.default,
    // object
    u.default,
    s.default,
    // array
    c.default,
    o.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    i.default,
    p.default
  ];
  return Sr.default = a, Sr;
}
var Dr = {}, tt = {}, go;
function xc() {
  if (go) return tt;
  go = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.validateAdditionalItems = void 0;
  const e = te(), t = ie(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: c, it: o } = s, { items: i } = c;
      if (!Array.isArray(i)) {
        (0, t.checkStrictMode)(o, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      u(s, i);
    }
  };
  function u(s, c) {
    const { gen: o, schema: i, data: p, keyword: a, it: y } = s;
    y.items = !0;
    const E = o.const("len", (0, e._)`${p}.length`);
    if (i === !1)
      s.setParams({ len: c.length }), s.pass((0, e._)`${E} <= ${c.length}`);
    else if (typeof i == "object" && !(0, t.alwaysValidSchema)(y, i)) {
      const P = o.var("valid", (0, e._)`${E} <= ${c.length}`);
      o.if((0, e.not)(P), () => w(P)), s.ok(P);
    }
    function w(P) {
      o.forRange("i", c.length, E, (v) => {
        s.subschema({ keyword: a, dataProp: v, dataPropType: t.Type.Num }, P), y.allErrors || o.if((0, e.not)(P), () => o.break());
      });
    }
  }
  return tt.validateAdditionalItems = u, tt.default = n, tt;
}
var Mr = {}, rt = {}, wo;
function eu() {
  if (wo) return rt;
  wo = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.validateTuple = void 0;
  const e = te(), t = ie(), l = Oe(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: c, it: o } = s;
      if (Array.isArray(c))
        return u(s, "additionalItems", c);
      o.items = !0, !(0, t.alwaysValidSchema)(o, c) && s.ok((0, l.validateArray)(s));
    }
  };
  function u(s, c, o = s.schema) {
    const { gen: i, parentSchema: p, data: a, keyword: y, it: E } = s;
    v(p), E.opts.unevaluated && o.length && E.items !== !0 && (E.items = t.mergeEvaluated.items(i, o.length, E.items));
    const w = i.name("valid"), P = i.const("len", (0, e._)`${a}.length`);
    o.forEach((h, f) => {
      (0, t.alwaysValidSchema)(E, h) || (i.if((0, e._)`${P} > ${f}`, () => s.subschema({
        keyword: y,
        schemaProp: f,
        dataProp: f
      }, w)), s.ok(w));
    });
    function v(h) {
      const { opts: f, errSchemaPath: r } = E, d = o.length, _ = d === h.minItems && (d === h.maxItems || h[c] === !1);
      if (f.strictTuples && !_) {
        const g = `"${y}" is ${d}-tuple, but minItems or maxItems/${c} are not specified or different at path "${r}"`;
        (0, t.checkStrictMode)(E, g, f.strictTuples);
      }
    }
  }
  return rt.validateTuple = u, rt.default = n, rt;
}
var Eo;
function pd() {
  if (Eo) return Mr;
  Eo = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const e = eu(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (l) => (0, e.validateTuple)(l, "items")
  };
  return Mr.default = t, Mr;
}
var Lr = {}, So;
function yd() {
  if (So) return Lr;
  So = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = te(), t = ie(), l = Oe(), n = xc(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: c } }) => (0, e.str)`must NOT have more than ${c} items`,
      params: ({ params: { len: c } }) => (0, e._)`{limit: ${c}}`
    },
    code(c) {
      const { schema: o, parentSchema: i, it: p } = c, { prefixItems: a } = i;
      p.items = !0, !(0, t.alwaysValidSchema)(p, o) && (a ? (0, n.validateAdditionalItems)(c, a) : c.ok((0, l.validateArray)(c)));
    }
  };
  return Lr.default = s, Lr;
}
var Fr = {}, bo;
function $d() {
  if (bo) return Fr;
  bo = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = te(), t = ie(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: u, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${u} valid item(s)` : (0, e.str)`must contain at least ${u} and no more than ${s} valid item(s)`,
      params: ({ params: { min: u, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${u}}` : (0, e._)`{minContains: ${u}, maxContains: ${s}}`
    },
    code(u) {
      const { gen: s, schema: c, parentSchema: o, data: i, it: p } = u;
      let a, y;
      const { minContains: E, maxContains: w } = o;
      p.opts.next ? (a = E === void 0 ? 1 : E, y = w) : a = 1;
      const P = s.const("len", (0, e._)`${i}.length`);
      if (u.setParams({ min: a, max: y }), y === void 0 && a === 0) {
        (0, t.checkStrictMode)(p, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (y !== void 0 && a > y) {
        (0, t.checkStrictMode)(p, '"minContains" > "maxContains" is always invalid'), u.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(p, c)) {
        let d = (0, e._)`${P} >= ${a}`;
        y !== void 0 && (d = (0, e._)`${d} && ${P} <= ${y}`), u.pass(d);
        return;
      }
      p.items = !0;
      const v = s.name("valid");
      y === void 0 && a === 1 ? f(v, () => s.if(v, () => s.break())) : a === 0 ? (s.let(v, !0), y !== void 0 && s.if((0, e._)`${i}.length > 0`, h)) : (s.let(v, !1), h()), u.result(v, () => u.reset());
      function h() {
        const d = s.name("_valid"), _ = s.let("count", 0);
        f(d, () => s.if(d, () => r(_)));
      }
      function f(d, _) {
        s.forRange("i", 0, P, (g) => {
          u.subschema({
            keyword: "contains",
            dataProp: g,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, d), _();
        });
      }
      function r(d) {
        s.code((0, e._)`${d}++`), y === void 0 ? s.if((0, e._)`${d} >= ${a}`, () => s.assign(v, !0).break()) : (s.if((0, e._)`${d} > ${y}`, () => s.assign(v, !1).break()), a === 1 ? s.assign(v, !0) : s.if((0, e._)`${d} >= ${a}`, () => s.assign(v, !0)));
      }
    }
  };
  return Fr.default = n, Fr;
}
var Wn = {}, Po;
function vd() {
  return Po || (Po = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = te(), l = ie(), n = Oe();
    e.error = {
      message: ({ params: { property: i, depsCount: p, deps: a } }) => {
        const y = p === 1 ? "property" : "properties";
        return (0, t.str)`must have ${y} ${a} when property ${i} is present`;
      },
      params: ({ params: { property: i, depsCount: p, deps: a, missingProperty: y } }) => (0, t._)`{property: ${i},
    missingProperty: ${y},
    depsCount: ${p},
    deps: ${a}}`
      // TODO change to reference
    };
    const u = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(i) {
        const [p, a] = s(i);
        c(i, p), o(i, a);
      }
    };
    function s({ schema: i }) {
      const p = {}, a = {};
      for (const y in i) {
        if (y === "__proto__")
          continue;
        const E = Array.isArray(i[y]) ? p : a;
        E[y] = i[y];
      }
      return [p, a];
    }
    function c(i, p = i.schema) {
      const { gen: a, data: y, it: E } = i;
      if (Object.keys(p).length === 0)
        return;
      const w = a.let("missing");
      for (const P in p) {
        const v = p[P];
        if (v.length === 0)
          continue;
        const h = (0, n.propertyInData)(a, y, P, E.opts.ownProperties);
        i.setParams({
          property: P,
          depsCount: v.length,
          deps: v.join(", ")
        }), E.allErrors ? a.if(h, () => {
          for (const f of v)
            (0, n.checkReportMissingProp)(i, f);
        }) : (a.if((0, t._)`${h} && (${(0, n.checkMissingProp)(i, v, w)})`), (0, n.reportMissingProp)(i, w), a.else());
      }
    }
    e.validatePropertyDeps = c;
    function o(i, p = i.schema) {
      const { gen: a, data: y, keyword: E, it: w } = i, P = a.name("valid");
      for (const v in p)
        (0, l.alwaysValidSchema)(w, p[v]) || (a.if(
          (0, n.propertyInData)(a, y, v, w.opts.ownProperties),
          () => {
            const h = i.subschema({ keyword: E, schemaProp: v }, P);
            i.mergeValidEvaluated(h, P);
          },
          () => a.var(P, !0)
          // TODO var
        ), i.ok(P));
    }
    e.validateSchemaDeps = o, e.default = u;
  }(Wn)), Wn;
}
var Vr = {}, Ro;
function _d() {
  if (Ro) return Vr;
  Ro = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = te(), t = ie(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: u }) => (0, e._)`{propertyName: ${u.propertyName}}`
    },
    code(u) {
      const { gen: s, schema: c, data: o, it: i } = u;
      if ((0, t.alwaysValidSchema)(i, c))
        return;
      const p = s.name("valid");
      s.forIn("key", o, (a) => {
        u.setParams({ propertyName: a }), u.subschema({
          keyword: "propertyNames",
          data: a,
          dataTypes: ["string"],
          propertyName: a,
          compositeRule: !0
        }, p), s.if((0, e.not)(p), () => {
          u.error(!0), i.allErrors || s.break();
        });
      }), u.ok(p);
    }
  };
  return Vr.default = n, Vr;
}
var Ur = {}, No;
function tu() {
  if (No) return Ur;
  No = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const e = Oe(), t = te(), l = Ve(), n = ie(), s = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: c }) => (0, t._)`{additionalProperty: ${c.additionalProperty}}`
    },
    code(c) {
      const { gen: o, schema: i, parentSchema: p, data: a, errsCount: y, it: E } = c;
      if (!y)
        throw new Error("ajv implementation error");
      const { allErrors: w, opts: P } = E;
      if (E.props = !0, P.removeAdditional !== "all" && (0, n.alwaysValidSchema)(E, i))
        return;
      const v = (0, e.allSchemaProperties)(p.properties), h = (0, e.allSchemaProperties)(p.patternProperties);
      f(), c.ok((0, t._)`${y} === ${l.default.errors}`);
      function f() {
        o.forIn("key", a, ($) => {
          !v.length && !h.length ? _($) : o.if(r($), () => _($));
        });
      }
      function r($) {
        let b;
        if (v.length > 8) {
          const I = (0, n.schemaRefOrVal)(E, p.properties, "properties");
          b = (0, e.isOwnProperty)(o, I, $);
        } else v.length ? b = (0, t.or)(...v.map((I) => (0, t._)`${$} === ${I}`)) : b = t.nil;
        return h.length && (b = (0, t.or)(b, ...h.map((I) => (0, t._)`${(0, e.usePattern)(c, I)}.test(${$})`))), (0, t.not)(b);
      }
      function d($) {
        o.code((0, t._)`delete ${a}[${$}]`);
      }
      function _($) {
        if (P.removeAdditional === "all" || P.removeAdditional && i === !1) {
          d($);
          return;
        }
        if (i === !1) {
          c.setParams({ additionalProperty: $ }), c.error(), w || o.break();
          return;
        }
        if (typeof i == "object" && !(0, n.alwaysValidSchema)(E, i)) {
          const b = o.name("valid");
          P.removeAdditional === "failing" ? (g($, b, !1), o.if((0, t.not)(b), () => {
            c.reset(), d($);
          })) : (g($, b), w || o.if((0, t.not)(b), () => o.break()));
        }
      }
      function g($, b, I) {
        const C = {
          keyword: "additionalProperties",
          dataProp: $,
          dataPropType: n.Type.Str
        };
        I === !1 && Object.assign(C, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), c.subschema(C, b);
      }
    }
  };
  return Ur.default = s, Ur;
}
var zr = {}, Oo;
function gd() {
  if (Oo) return zr;
  Oo = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const e = pn(), t = Oe(), l = ie(), n = tu(), u = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: o, parentSchema: i, data: p, it: a } = s;
      a.opts.removeAdditional === "all" && i.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(a, n.default, "additionalProperties"));
      const y = (0, t.allSchemaProperties)(o);
      for (const h of y)
        a.definedProperties.add(h);
      a.opts.unevaluated && y.length && a.props !== !0 && (a.props = l.mergeEvaluated.props(c, (0, l.toHash)(y), a.props));
      const E = y.filter((h) => !(0, l.alwaysValidSchema)(a, o[h]));
      if (E.length === 0)
        return;
      const w = c.name("valid");
      for (const h of E)
        P(h) ? v(h) : (c.if((0, t.propertyInData)(c, p, h, a.opts.ownProperties)), v(h), a.allErrors || c.else().var(w, !0), c.endIf()), s.it.definedProperties.add(h), s.ok(w);
      function P(h) {
        return a.opts.useDefaults && !a.compositeRule && o[h].default !== void 0;
      }
      function v(h) {
        s.subschema({
          keyword: "properties",
          schemaProp: h,
          dataProp: h
        }, w);
      }
    }
  };
  return zr.default = u, zr;
}
var Kr = {}, Io;
function wd() {
  if (Io) return Kr;
  Io = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = Oe(), t = te(), l = ie(), n = ie(), u = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: c, schema: o, data: i, parentSchema: p, it: a } = s, { opts: y } = a, E = (0, e.allSchemaProperties)(o), w = E.filter((_) => (0, l.alwaysValidSchema)(a, o[_]));
      if (E.length === 0 || w.length === E.length && (!a.opts.unevaluated || a.props === !0))
        return;
      const P = y.strictSchema && !y.allowMatchingProperties && p.properties, v = c.name("valid");
      a.props !== !0 && !(a.props instanceof t.Name) && (a.props = (0, n.evaluatedPropsToName)(c, a.props));
      const { props: h } = a;
      f();
      function f() {
        for (const _ of E)
          P && r(_), a.allErrors ? d(_) : (c.var(v, !0), d(_), c.if(v));
      }
      function r(_) {
        for (const g in P)
          new RegExp(_).test(g) && (0, l.checkStrictMode)(a, `property ${g} matches pattern ${_} (use allowMatchingProperties)`);
      }
      function d(_) {
        c.forIn("key", i, (g) => {
          c.if((0, t._)`${(0, e.usePattern)(s, _)}.test(${g})`, () => {
            const $ = w.includes(_);
            $ || s.subschema({
              keyword: "patternProperties",
              schemaProp: _,
              dataProp: g,
              dataPropType: n.Type.Str
            }, v), a.opts.unevaluated && h !== !0 ? c.assign((0, t._)`${h}[${g}]`, !0) : !$ && !a.allErrors && c.if((0, t.not)(v), () => c.break());
          });
        });
      }
    }
  };
  return Kr.default = u, Kr;
}
var Gr = {}, To;
function Ed() {
  if (To) return Gr;
  To = 1, Object.defineProperty(Gr, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(l) {
      const { gen: n, schema: u, it: s } = l;
      if ((0, e.alwaysValidSchema)(s, u)) {
        l.fail();
        return;
      }
      const c = n.name("valid");
      l.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c), l.failResult(c, () => l.reset(), () => l.error());
    },
    error: { message: "must NOT be valid" }
  };
  return Gr.default = t, Gr;
}
var Hr = {}, jo;
function Sd() {
  if (jo) return Hr;
  jo = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: Oe().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Hr.default = t, Hr;
}
var Wr = {}, Ao;
function bd() {
  if (Ao) return Wr;
  Ao = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = te(), t = ie(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: u }) => (0, e._)`{passingSchemas: ${u.passing}}`
    },
    code(u) {
      const { gen: s, schema: c, parentSchema: o, it: i } = u;
      if (!Array.isArray(c))
        throw new Error("ajv implementation error");
      if (i.opts.discriminator && o.discriminator)
        return;
      const p = c, a = s.let("valid", !1), y = s.let("passing", null), E = s.name("_valid");
      u.setParams({ passing: y }), s.block(w), u.result(a, () => u.reset(), () => u.error(!0));
      function w() {
        p.forEach((P, v) => {
          let h;
          (0, t.alwaysValidSchema)(i, P) ? s.var(E, !0) : h = u.subschema({
            keyword: "oneOf",
            schemaProp: v,
            compositeRule: !0
          }, E), v > 0 && s.if((0, e._)`${E} && ${a}`).assign(a, !1).assign(y, (0, e._)`[${y}, ${v}]`).else(), s.if(E, () => {
            s.assign(a, !0), s.assign(y, v), h && u.mergeEvaluated(h, e.Name);
          });
        });
      }
    }
  };
  return Wr.default = n, Wr;
}
var Br = {}, qo;
function Pd() {
  if (qo) return Br;
  qo = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(l) {
      const { gen: n, schema: u, it: s } = l;
      if (!Array.isArray(u))
        throw new Error("ajv implementation error");
      const c = n.name("valid");
      u.forEach((o, i) => {
        if ((0, e.alwaysValidSchema)(s, o))
          return;
        const p = l.subschema({ keyword: "allOf", schemaProp: i }, c);
        l.ok(c), l.mergeEvaluated(p);
      });
    }
  };
  return Br.default = t, Br;
}
var Jr = {}, Co;
function Rd() {
  if (Co) return Jr;
  Co = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = te(), t = ie(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: c, parentSchema: o, it: i } = s;
      o.then === void 0 && o.else === void 0 && (0, t.checkStrictMode)(i, '"if" without "then" and "else" is ignored');
      const p = u(i, "then"), a = u(i, "else");
      if (!p && !a)
        return;
      const y = c.let("valid", !0), E = c.name("_valid");
      if (w(), s.reset(), p && a) {
        const v = c.let("ifClause");
        s.setParams({ ifClause: v }), c.if(E, P("then", v), P("else", v));
      } else p ? c.if(E, P("then")) : c.if((0, e.not)(E), P("else"));
      s.pass(y, () => s.error(!0));
      function w() {
        const v = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, E);
        s.mergeEvaluated(v);
      }
      function P(v, h) {
        return () => {
          const f = s.subschema({ keyword: v }, E);
          c.assign(y, E), s.mergeValidEvaluated(f, y), h ? c.assign(h, (0, e._)`${v}`) : s.setParams({ ifClause: v });
        };
      }
    }
  };
  function u(s, c) {
    const o = s.schema[c];
    return o !== void 0 && !(0, t.alwaysValidSchema)(s, o);
  }
  return Jr.default = n, Jr;
}
var Xr = {}, ko;
function Nd() {
  if (ko) return Xr;
  ko = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const e = ie(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: l, parentSchema: n, it: u }) {
      n.if === void 0 && (0, e.checkStrictMode)(u, `"${l}" without "if" is ignored`);
    }
  };
  return Xr.default = t, Xr;
}
var Do;
function Od() {
  if (Do) return Dr;
  Do = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = xc(), t = pd(), l = eu(), n = yd(), u = $d(), s = vd(), c = _d(), o = tu(), i = gd(), p = wd(), a = Ed(), y = Sd(), E = bd(), w = Pd(), P = Rd(), v = Nd();
  function h(f = !1) {
    const r = [
      // any
      a.default,
      y.default,
      E.default,
      w.default,
      P.default,
      v.default,
      // object
      c.default,
      o.default,
      s.default,
      i.default,
      p.default
    ];
    return f ? r.push(t.default, n.default) : r.push(e.default, l.default), r.push(u.default), r;
  }
  return Dr.default = h, Dr;
}
var Yr = {}, Qr = {}, Mo;
function Id() {
  if (Mo) return Qr;
  Mo = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = te(), l = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, u) {
      const { gen: s, data: c, $data: o, schema: i, schemaCode: p, it: a } = n, { opts: y, errSchemaPath: E, schemaEnv: w, self: P } = a;
      if (!y.validateFormats)
        return;
      o ? v() : h();
      function v() {
        const f = s.scopeValue("formats", {
          ref: P.formats,
          code: y.code.formats
        }), r = s.const("fDef", (0, e._)`${f}[${p}]`), d = s.let("fType"), _ = s.let("format");
        s.if((0, e._)`typeof ${r} == "object" && !(${r} instanceof RegExp)`, () => s.assign(d, (0, e._)`${r}.type || "string"`).assign(_, (0, e._)`${r}.validate`), () => s.assign(d, (0, e._)`"string"`).assign(_, r)), n.fail$data((0, e.or)(g(), $()));
        function g() {
          return y.strictSchema === !1 ? e.nil : (0, e._)`${p} && !${_}`;
        }
        function $() {
          const b = w.$async ? (0, e._)`(${r}.async ? await ${_}(${c}) : ${_}(${c}))` : (0, e._)`${_}(${c})`, I = (0, e._)`(typeof ${_} == "function" ? ${b} : ${_}.test(${c}))`;
          return (0, e._)`${_} && ${_} !== true && ${d} === ${u} && !${I}`;
        }
      }
      function h() {
        const f = P.formats[i];
        if (!f) {
          g();
          return;
        }
        if (f === !0)
          return;
        const [r, d, _] = $(f);
        r === u && n.pass(b());
        function g() {
          if (y.strictSchema === !1) {
            P.logger.warn(I());
            return;
          }
          throw new Error(I());
          function I() {
            return `unknown format "${i}" ignored in schema at path "${E}"`;
          }
        }
        function $(I) {
          const C = I instanceof RegExp ? (0, e.regexpCode)(I) : y.code.formats ? (0, e._)`${y.code.formats}${(0, e.getProperty)(i)}` : void 0, M = s.scopeValue("formats", { key: i, ref: I, code: C });
          return typeof I == "object" && !(I instanceof RegExp) ? [I.type || "string", I.validate, (0, e._)`${M}.validate`] : ["string", I, M];
        }
        function b() {
          if (typeof f == "object" && !(f instanceof RegExp) && f.async) {
            if (!w.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${_}(${c})`;
          }
          return typeof d == "function" ? (0, e._)`${_}(${c})` : (0, e._)`${_}.test(${c})`;
        }
      }
    }
  };
  return Qr.default = l, Qr;
}
var Lo;
function Td() {
  if (Lo) return Yr;
  Lo = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  const t = [Id().default];
  return Yr.default = t, Yr;
}
var Qe = {}, Fo;
function jd() {
  return Fo || (Fo = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.contentVocabulary = Qe.metadataVocabulary = void 0, Qe.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], Qe.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), Qe;
}
var Vo;
function Ad() {
  if (Vo) return gr;
  Vo = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = rd(), t = md(), l = Od(), n = Td(), u = jd(), s = [
    e.default,
    t.default,
    (0, l.default)(),
    n.default,
    u.metadataVocabulary,
    u.contentVocabulary
  ];
  return gr.default = s, gr;
}
var Zr = {}, dt = {}, Uo;
function qd() {
  if (Uo) return dt;
  Uo = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (dt.DiscrError = e = {})), dt;
}
var zo;
function Cd() {
  if (zo) return Zr;
  zo = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  const e = te(), t = qd(), l = Hs(), n = yn(), u = ie(), c = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: o, tagName: i } }) => o === t.DiscrError.Tag ? `tag "${i}" must be string` : `value of tag "${i}" must be in oneOf`,
      params: ({ params: { discrError: o, tag: i, tagName: p } }) => (0, e._)`{error: ${o}, tag: ${p}, tagValue: ${i}}`
    },
    code(o) {
      const { gen: i, data: p, schema: a, parentSchema: y, it: E } = o, { oneOf: w } = y;
      if (!E.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const P = a.propertyName;
      if (typeof P != "string")
        throw new Error("discriminator: requires propertyName");
      if (a.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!w)
        throw new Error("discriminator: requires oneOf keyword");
      const v = i.let("valid", !1), h = i.const("tag", (0, e._)`${p}${(0, e.getProperty)(P)}`);
      i.if((0, e._)`typeof ${h} == "string"`, () => f(), () => o.error(!1, { discrError: t.DiscrError.Tag, tag: h, tagName: P })), o.ok(v);
      function f() {
        const _ = d();
        i.if(!1);
        for (const g in _)
          i.elseIf((0, e._)`${h} === ${g}`), i.assign(v, r(_[g]));
        i.else(), o.error(!1, { discrError: t.DiscrError.Mapping, tag: h, tagName: P }), i.endIf();
      }
      function r(_) {
        const g = i.name("valid"), $ = o.subschema({ keyword: "oneOf", schemaProp: _ }, g);
        return o.mergeEvaluated($, e.Name), g;
      }
      function d() {
        var _;
        const g = {}, $ = I(y);
        let b = !0;
        for (let V = 0; V < w.length; V++) {
          let B = w[V];
          if (B != null && B.$ref && !(0, u.schemaHasRulesButRef)(B, E.self.RULES)) {
            const F = B.$ref;
            if (B = l.resolveRef.call(E.self, E.schemaEnv.root, E.baseId, F), B instanceof l.SchemaEnv && (B = B.schema), B === void 0)
              throw new n.default(E.opts.uriResolver, E.baseId, F);
          }
          const W = (_ = B == null ? void 0 : B.properties) === null || _ === void 0 ? void 0 : _[P];
          if (typeof W != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${P}"`);
          b = b && ($ || I(B)), C(W, V);
        }
        if (!b)
          throw new Error(`discriminator: "${P}" must be required`);
        return g;
        function I({ required: V }) {
          return Array.isArray(V) && V.includes(P);
        }
        function C(V, B) {
          if (V.const)
            M(V.const, B);
          else if (V.enum)
            for (const W of V.enum)
              M(W, B);
          else
            throw new Error(`discriminator: "properties/${P}" must have "const" or "enum"`);
        }
        function M(V, B) {
          if (typeof V != "string" || V in g)
            throw new Error(`discriminator: "${P}" values must be unique strings`);
          g[V] = B;
        }
      }
    }
  };
  return Zr.default = c, Zr;
}
const kd = "http://json-schema.org/draft-07/schema#", Dd = "http://json-schema.org/draft-07/schema#", Md = "Core schema meta-schema", Ld = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Fd = ["object", "boolean"], Vd = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Ud = {
  $schema: kd,
  $id: Dd,
  title: Md,
  definitions: Ld,
  type: Fd,
  properties: Vd,
  default: !0
};
var Ko;
function zd() {
  return Ko || (Ko = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const l = xl(), n = Ad(), u = Cd(), s = Ud, c = ["/properties"], o = "http://json-schema.org/draft-07/schema";
    class i extends l.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((P) => this.addVocabulary(P)), this.opts.discriminator && this.addKeyword(u.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const P = this.opts.$data ? this.$dataMetaSchema(s, c) : s;
        this.addMetaSchema(P, o, !1), this.refs["http://json-schema.org/schema"] = o;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
      }
    }
    t.Ajv = i, e.exports = t = i, e.exports.Ajv = i, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = i;
    var p = pn();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return p.KeywordCxt;
    } });
    var a = te();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return a._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return a.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return a.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return a.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return a.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return a.CodeGen;
    } });
    var y = Gs();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return y.default;
    } });
    var E = yn();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return E.default;
    } });
  }(pr, pr.exports)), pr.exports;
}
var Go;
function Kd() {
  return Go || (Go = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = zd(), l = te(), n = l.operators, u = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, s = {
      message: ({ keyword: o, schemaCode: i }) => l.str`should be ${u[o].okStr} ${i}`,
      params: ({ keyword: o, schemaCode: i }) => l._`{comparison: ${u[o].okStr}, limit: ${i}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(u),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: s,
      code(o) {
        const { gen: i, data: p, schemaCode: a, keyword: y, it: E } = o, { opts: w, self: P } = E;
        if (!w.validateFormats)
          return;
        const v = new t.KeywordCxt(E, P.RULES.all.format.definition, "format");
        v.$data ? h() : f();
        function h() {
          const d = i.scopeValue("formats", {
            ref: P.formats,
            code: w.code.formats
          }), _ = i.const("fmt", l._`${d}[${v.schemaCode}]`);
          o.fail$data(l.or(l._`typeof ${_} != "object"`, l._`${_} instanceof RegExp`, l._`typeof ${_}.compare != "function"`, r(_)));
        }
        function f() {
          const d = v.schema, _ = P.formats[d];
          if (!_ || _ === !0)
            return;
          if (typeof _ != "object" || _ instanceof RegExp || typeof _.compare != "function")
            throw new Error(`"${y}": format "${d}" does not define "compare" function`);
          const g = i.scopeValue("formats", {
            key: d,
            ref: _,
            code: w.code.formats ? l._`${w.code.formats}${l.getProperty(d)}` : void 0
          });
          o.fail$data(r(g));
        }
        function r(d) {
          return l._`${d}.compare(${p}, ${a}) ${u[y].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const c = (o) => (o.addKeyword(e.formatLimitDefinition), o);
    e.default = c;
  }(Fn)), Fn;
}
var Ho;
function Gd() {
  return Ho || (Ho = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const l = Fl(), n = Kd(), u = te(), s = new u.Name("fullFormats"), c = new u.Name("fastFormats"), o = (p, a = { keywords: !0 }) => {
      if (Array.isArray(a))
        return i(p, a, l.fullFormats, s), p;
      const [y, E] = a.mode === "fast" ? [l.fastFormats, c] : [l.fullFormats, s], w = a.formats || l.formatNames;
      return i(p, w, y, E), a.keywords && n.default(p), p;
    };
    o.get = (p, a = "full") => {
      const E = (a === "fast" ? l.fastFormats : l.fullFormats)[p];
      if (!E)
        throw new Error(`Unknown format "${p}"`);
      return E;
    };
    function i(p, a, y, E) {
      var w, P;
      (w = (P = p.opts.code).formats) !== null && w !== void 0 || (P.formats = u._`require("ajv-formats/dist/formats").${E}`);
      for (const v of a)
        p.addFormat(v, y[v]);
    }
    e.exports = t = o, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = o;
  }(mr, mr.exports)), mr.exports;
}
var Bn, Wo;
function Hd() {
  if (Wo) return Bn;
  Wo = 1;
  const e = (i, p, a, y) => {
    if (a === "length" || a === "prototype" || a === "arguments" || a === "caller")
      return;
    const E = Object.getOwnPropertyDescriptor(i, a), w = Object.getOwnPropertyDescriptor(p, a);
    !t(E, w) && y || Object.defineProperty(i, a, w);
  }, t = function(i, p) {
    return i === void 0 || i.configurable || i.writable === p.writable && i.enumerable === p.enumerable && i.configurable === p.configurable && (i.writable || i.value === p.value);
  }, l = (i, p) => {
    const a = Object.getPrototypeOf(p);
    a !== Object.getPrototypeOf(i) && Object.setPrototypeOf(i, a);
  }, n = (i, p) => `/* Wrapped ${i}*/
${p}`, u = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), s = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), c = (i, p, a) => {
    const y = a === "" ? "" : `with ${a.trim()}() `, E = n.bind(null, y, p.toString());
    Object.defineProperty(E, "name", s), Object.defineProperty(i, "toString", { ...u, value: E });
  };
  return Bn = (i, p, { ignoreNonConfigurable: a = !1 } = {}) => {
    const { name: y } = i;
    for (const E of Reflect.ownKeys(p))
      e(i, p, E, a);
    return l(i, p), c(i, p, y), i;
  }, Bn;
}
var Jn, Bo;
function Wd() {
  if (Bo) return Jn;
  Bo = 1;
  const e = Hd();
  return Jn = (t, l = {}) => {
    if (typeof t != "function")
      throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
    const {
      wait: n = 0,
      before: u = !1,
      after: s = !0
    } = l;
    if (!u && !s)
      throw new Error("Both `before` and `after` are false, function wouldn't be called.");
    let c, o;
    const i = function(...p) {
      const a = this, y = () => {
        c = void 0, s && (o = t.apply(a, p));
      }, E = u && !c;
      return clearTimeout(c), c = setTimeout(y, n), E && (o = t.apply(a, p)), o;
    };
    return e(i, t), i.cancel = () => {
      c && (clearTimeout(c), c = void 0);
    }, i;
  }, Jn;
}
var xr = { exports: {} }, Xn, Jo;
function $n() {
  if (Jo) return Xn;
  Jo = 1;
  const e = "2.0.0", t = 256, l = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, u = t - 6;
  return Xn = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: u,
    MAX_SAFE_INTEGER: l,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Xn;
}
var Yn, Xo;
function vn() {
  return Xo || (Xo = 1, Yn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), Yn;
}
var Yo;
function pt() {
  return Yo || (Yo = 1, function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: l,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: u
    } = $n(), s = vn();
    t = e.exports = {};
    const c = t.re = [], o = t.safeRe = [], i = t.src = [], p = t.safeSrc = [], a = t.t = {};
    let y = 0;
    const E = "[a-zA-Z0-9-]", w = [
      ["\\s", 1],
      ["\\d", u],
      [E, n]
    ], P = (h) => {
      for (const [f, r] of w)
        h = h.split(`${f}*`).join(`${f}{0,${r}}`).split(`${f}+`).join(`${f}{1,${r}}`);
      return h;
    }, v = (h, f, r) => {
      const d = P(f), _ = y++;
      s(h, _, f), a[h] = _, i[_] = f, p[_] = d, c[_] = new RegExp(f, r ? "g" : void 0), o[_] = new RegExp(d, r ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${E}*`), v("MAINVERSION", `(${i[a.NUMERICIDENTIFIER]})\\.(${i[a.NUMERICIDENTIFIER]})\\.(${i[a.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${i[a.NUMERICIDENTIFIERLOOSE]})\\.(${i[a.NUMERICIDENTIFIERLOOSE]})\\.(${i[a.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${i[a.NUMERICIDENTIFIER]}|${i[a.NONNUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${i[a.NUMERICIDENTIFIERLOOSE]}|${i[a.NONNUMERICIDENTIFIER]})`), v("PRERELEASE", `(?:-(${i[a.PRERELEASEIDENTIFIER]}(?:\\.${i[a.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${i[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[a.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${E}+`), v("BUILD", `(?:\\+(${i[a.BUILDIDENTIFIER]}(?:\\.${i[a.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${i[a.MAINVERSION]}${i[a.PRERELEASE]}?${i[a.BUILD]}?`), v("FULL", `^${i[a.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${i[a.MAINVERSIONLOOSE]}${i[a.PRERELEASELOOSE]}?${i[a.BUILD]}?`), v("LOOSE", `^${i[a.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${i[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${i[a.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${i[a.XRANGEIDENTIFIER]})(?:\\.(${i[a.XRANGEIDENTIFIER]})(?:\\.(${i[a.XRANGEIDENTIFIER]})(?:${i[a.PRERELEASE]})?${i[a.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${i[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[a.XRANGEIDENTIFIERLOOSE]})(?:${i[a.PRERELEASELOOSE]})?${i[a.BUILD]}?)?)?`), v("XRANGE", `^${i[a.GTLT]}\\s*${i[a.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${i[a.GTLT]}\\s*${i[a.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${l}})(?:\\.(\\d{1,${l}}))?(?:\\.(\\d{1,${l}}))?`), v("COERCE", `${i[a.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", i[a.COERCEPLAIN] + `(?:${i[a.PRERELEASE]})?(?:${i[a.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", i[a.COERCE], !0), v("COERCERTLFULL", i[a.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${i[a.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", v("TILDE", `^${i[a.LONETILDE]}${i[a.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${i[a.LONETILDE]}${i[a.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${i[a.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", v("CARET", `^${i[a.LONECARET]}${i[a.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${i[a.LONECARET]}${i[a.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${i[a.GTLT]}\\s*(${i[a.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${i[a.GTLT]}\\s*(${i[a.LOOSEPLAIN]}|${i[a.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${i[a.XRANGEPLAIN]})\\s+-\\s+(${i[a.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${i[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[a.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(xr, xr.exports)), xr.exports;
}
var Qn, Qo;
function Bs() {
  if (Qo) return Qn;
  Qo = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Qn = (n) => n ? typeof n != "object" ? e : n : t, Qn;
}
var Zn, Zo;
function ru() {
  if (Zo) return Zn;
  Zo = 1;
  const e = /^[0-9]+$/, t = (n, u) => {
    const s = e.test(n), c = e.test(u);
    return s && c && (n = +n, u = +u), n === u ? 0 : s && !c ? -1 : c && !s ? 1 : n < u ? -1 : 1;
  };
  return Zn = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, u) => t(u, n)
  }, Zn;
}
var xn, xo;
function ve() {
  if (xo) return xn;
  xo = 1;
  const e = vn(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: l } = $n(), { safeRe: n, safeSrc: u, t: s } = pt(), c = Bs(), { compareIdentifiers: o } = ru();
  class i {
    constructor(a, y) {
      if (y = c(y), a instanceof i) {
        if (a.loose === !!y.loose && a.includePrerelease === !!y.includePrerelease)
          return a;
        a = a.version;
      } else if (typeof a != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof a}".`);
      if (a.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", a, y), this.options = y, this.loose = !!y.loose, this.includePrerelease = !!y.includePrerelease;
      const E = a.trim().match(y.loose ? n[s.LOOSE] : n[s.FULL]);
      if (!E)
        throw new TypeError(`Invalid Version: ${a}`);
      if (this.raw = a, this.major = +E[1], this.minor = +E[2], this.patch = +E[3], this.major > l || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > l || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > l || this.patch < 0)
        throw new TypeError("Invalid patch version");
      E[4] ? this.prerelease = E[4].split(".").map((w) => {
        if (/^[0-9]+$/.test(w)) {
          const P = +w;
          if (P >= 0 && P < l)
            return P;
        }
        return w;
      }) : this.prerelease = [], this.build = E[5] ? E[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(a) {
      if (e("SemVer.compare", this.version, this.options, a), !(a instanceof i)) {
        if (typeof a == "string" && a === this.version)
          return 0;
        a = new i(a, this.options);
      }
      return a.version === this.version ? 0 : this.compareMain(a) || this.comparePre(a);
    }
    compareMain(a) {
      return a instanceof i || (a = new i(a, this.options)), o(this.major, a.major) || o(this.minor, a.minor) || o(this.patch, a.patch);
    }
    comparePre(a) {
      if (a instanceof i || (a = new i(a, this.options)), this.prerelease.length && !a.prerelease.length)
        return -1;
      if (!this.prerelease.length && a.prerelease.length)
        return 1;
      if (!this.prerelease.length && !a.prerelease.length)
        return 0;
      let y = 0;
      do {
        const E = this.prerelease[y], w = a.prerelease[y];
        if (e("prerelease compare", y, E, w), E === void 0 && w === void 0)
          return 0;
        if (w === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === w)
          continue;
        return o(E, w);
      } while (++y);
    }
    compareBuild(a) {
      a instanceof i || (a = new i(a, this.options));
      let y = 0;
      do {
        const E = this.build[y], w = a.build[y];
        if (e("build compare", y, E, w), E === void 0 && w === void 0)
          return 0;
        if (w === void 0)
          return 1;
        if (E === void 0)
          return -1;
        if (E === w)
          continue;
        return o(E, w);
      } while (++y);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(a, y, E) {
      if (a.startsWith("pre")) {
        if (!y && E === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (y) {
          const w = new RegExp(`^${this.options.loose ? u[s.PRERELEASELOOSE] : u[s.PRERELEASE]}$`), P = `-${y}`.match(w);
          if (!P || P[1] !== y)
            throw new Error(`invalid identifier: ${y}`);
        }
      }
      switch (a) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", y, E);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", y, E);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", y, E), this.inc("pre", y, E);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", y, E), this.inc("pre", y, E);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const w = Number(E) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [w];
          else {
            let P = this.prerelease.length;
            for (; --P >= 0; )
              typeof this.prerelease[P] == "number" && (this.prerelease[P]++, P = -2);
            if (P === -1) {
              if (y === this.prerelease.join(".") && E === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(w);
            }
          }
          if (y) {
            let P = [y, w];
            E === !1 && (P = [y]), o(this.prerelease[0], y) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = P) : this.prerelease = P;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${a}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return xn = i, xn;
}
var es, ec;
function nt() {
  if (ec) return es;
  ec = 1;
  const e = ve();
  return es = (l, n, u = !1) => {
    if (l instanceof e)
      return l;
    try {
      return new e(l, n);
    } catch (s) {
      if (!u)
        return null;
      throw s;
    }
  }, es;
}
var ts, tc;
function Bd() {
  if (tc) return ts;
  tc = 1;
  const e = nt();
  return ts = (l, n) => {
    const u = e(l, n);
    return u ? u.version : null;
  }, ts;
}
var rs, rc;
function Jd() {
  if (rc) return rs;
  rc = 1;
  const e = nt();
  return rs = (l, n) => {
    const u = e(l.trim().replace(/^[=v]+/, ""), n);
    return u ? u.version : null;
  }, rs;
}
var ns, nc;
function Xd() {
  if (nc) return ns;
  nc = 1;
  const e = ve();
  return ns = (l, n, u, s, c) => {
    typeof u == "string" && (c = s, s = u, u = void 0);
    try {
      return new e(
        l instanceof e ? l.version : l,
        u
      ).inc(n, s, c).version;
    } catch {
      return null;
    }
  }, ns;
}
var ss, sc;
function Yd() {
  if (sc) return ss;
  sc = 1;
  const e = nt();
  return ss = (l, n) => {
    const u = e(l, null, !0), s = e(n, null, !0), c = u.compare(s);
    if (c === 0)
      return null;
    const o = c > 0, i = o ? u : s, p = o ? s : u, a = !!i.prerelease.length;
    if (!!p.prerelease.length && !a) {
      if (!p.patch && !p.minor)
        return "major";
      if (p.compareMain(i) === 0)
        return p.minor && !p.patch ? "minor" : "patch";
    }
    const E = a ? "pre" : "";
    return u.major !== s.major ? E + "major" : u.minor !== s.minor ? E + "minor" : u.patch !== s.patch ? E + "patch" : "prerelease";
  }, ss;
}
var as, ac;
function Qd() {
  if (ac) return as;
  ac = 1;
  const e = ve();
  return as = (l, n) => new e(l, n).major, as;
}
var is, ic;
function Zd() {
  if (ic) return is;
  ic = 1;
  const e = ve();
  return is = (l, n) => new e(l, n).minor, is;
}
var os, oc;
function xd() {
  if (oc) return os;
  oc = 1;
  const e = ve();
  return os = (l, n) => new e(l, n).patch, os;
}
var cs, cc;
function ef() {
  if (cc) return cs;
  cc = 1;
  const e = nt();
  return cs = (l, n) => {
    const u = e(l, n);
    return u && u.prerelease.length ? u.prerelease : null;
  }, cs;
}
var us, uc;
function Ie() {
  if (uc) return us;
  uc = 1;
  const e = ve();
  return us = (l, n, u) => new e(l, u).compare(new e(n, u)), us;
}
var ls, lc;
function tf() {
  if (lc) return ls;
  lc = 1;
  const e = Ie();
  return ls = (l, n, u) => e(n, l, u), ls;
}
var ds, dc;
function rf() {
  if (dc) return ds;
  dc = 1;
  const e = Ie();
  return ds = (l, n) => e(l, n, !0), ds;
}
var fs, fc;
function Js() {
  if (fc) return fs;
  fc = 1;
  const e = ve();
  return fs = (l, n, u) => {
    const s = new e(l, u), c = new e(n, u);
    return s.compare(c) || s.compareBuild(c);
  }, fs;
}
var hs, hc;
function nf() {
  if (hc) return hs;
  hc = 1;
  const e = Js();
  return hs = (l, n) => l.sort((u, s) => e(u, s, n)), hs;
}
var ms, mc;
function sf() {
  if (mc) return ms;
  mc = 1;
  const e = Js();
  return ms = (l, n) => l.sort((u, s) => e(s, u, n)), ms;
}
var ps, pc;
function _n() {
  if (pc) return ps;
  pc = 1;
  const e = Ie();
  return ps = (l, n, u) => e(l, n, u) > 0, ps;
}
var ys, yc;
function Xs() {
  if (yc) return ys;
  yc = 1;
  const e = Ie();
  return ys = (l, n, u) => e(l, n, u) < 0, ys;
}
var $s, $c;
function nu() {
  if ($c) return $s;
  $c = 1;
  const e = Ie();
  return $s = (l, n, u) => e(l, n, u) === 0, $s;
}
var vs, vc;
function su() {
  if (vc) return vs;
  vc = 1;
  const e = Ie();
  return vs = (l, n, u) => e(l, n, u) !== 0, vs;
}
var _s, _c;
function Ys() {
  if (_c) return _s;
  _c = 1;
  const e = Ie();
  return _s = (l, n, u) => e(l, n, u) >= 0, _s;
}
var gs, gc;
function Qs() {
  if (gc) return gs;
  gc = 1;
  const e = Ie();
  return gs = (l, n, u) => e(l, n, u) <= 0, gs;
}
var ws, wc;
function au() {
  if (wc) return ws;
  wc = 1;
  const e = nu(), t = su(), l = _n(), n = Ys(), u = Xs(), s = Qs();
  return ws = (o, i, p, a) => {
    switch (i) {
      case "===":
        return typeof o == "object" && (o = o.version), typeof p == "object" && (p = p.version), o === p;
      case "!==":
        return typeof o == "object" && (o = o.version), typeof p == "object" && (p = p.version), o !== p;
      case "":
      case "=":
      case "==":
        return e(o, p, a);
      case "!=":
        return t(o, p, a);
      case ">":
        return l(o, p, a);
      case ">=":
        return n(o, p, a);
      case "<":
        return u(o, p, a);
      case "<=":
        return s(o, p, a);
      default:
        throw new TypeError(`Invalid operator: ${i}`);
    }
  }, ws;
}
var Es, Ec;
function af() {
  if (Ec) return Es;
  Ec = 1;
  const e = ve(), t = nt(), { safeRe: l, t: n } = pt();
  return Es = (s, c) => {
    if (s instanceof e)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    c = c || {};
    let o = null;
    if (!c.rtl)
      o = s.match(c.includePrerelease ? l[n.COERCEFULL] : l[n.COERCE]);
    else {
      const w = c.includePrerelease ? l[n.COERCERTLFULL] : l[n.COERCERTL];
      let P;
      for (; (P = w.exec(s)) && (!o || o.index + o[0].length !== s.length); )
        (!o || P.index + P[0].length !== o.index + o[0].length) && (o = P), w.lastIndex = P.index + P[1].length + P[2].length;
      w.lastIndex = -1;
    }
    if (o === null)
      return null;
    const i = o[2], p = o[3] || "0", a = o[4] || "0", y = c.includePrerelease && o[5] ? `-${o[5]}` : "", E = c.includePrerelease && o[6] ? `+${o[6]}` : "";
    return t(`${i}.${p}.${a}${y}${E}`, c);
  }, Es;
}
var Ss, Sc;
function of() {
  if (Sc) return Ss;
  Sc = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(l) {
      const n = this.map.get(l);
      if (n !== void 0)
        return this.map.delete(l), this.map.set(l, n), n;
    }
    delete(l) {
      return this.map.delete(l);
    }
    set(l, n) {
      if (!this.delete(l) && n !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(l, n);
      }
      return this;
    }
  }
  return Ss = e, Ss;
}
var bs, bc;
function Te() {
  if (bc) return bs;
  bc = 1;
  const e = /\s+/g;
  class t {
    constructor(z, Y) {
      if (Y = u(Y), z instanceof t)
        return z.loose === !!Y.loose && z.includePrerelease === !!Y.includePrerelease ? z : new t(z.raw, Y);
      if (z instanceof s)
        return this.raw = z.value, this.set = [[z]], this.formatted = void 0, this;
      if (this.options = Y, this.loose = !!Y.loose, this.includePrerelease = !!Y.includePrerelease, this.raw = z.trim().replace(e, " "), this.set = this.raw.split("||").map((J) => this.parseRange(J.trim())).filter((J) => J.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const J = this.set[0];
        if (this.set = this.set.filter((D) => !v(D[0])), this.set.length === 0)
          this.set = [J];
        else if (this.set.length > 1) {
          for (const D of this.set)
            if (D.length === 1 && h(D[0])) {
              this.set = [D];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let z = 0; z < this.set.length; z++) {
          z > 0 && (this.formatted += "||");
          const Y = this.set[z];
          for (let J = 0; J < Y.length; J++)
            J > 0 && (this.formatted += " "), this.formatted += Y[J].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(z) {
      const J = ((this.options.includePrerelease && w) | (this.options.loose && P)) + ":" + z, D = n.get(J);
      if (D)
        return D;
      const U = this.options.loose, j = U ? i[p.HYPHENRANGELOOSE] : i[p.HYPHENRANGE];
      z = z.replace(j, B(this.options.includePrerelease)), c("hyphen replace", z), z = z.replace(i[p.COMPARATORTRIM], a), c("comparator trim", z), z = z.replace(i[p.TILDETRIM], y), c("tilde trim", z), z = z.replace(i[p.CARETTRIM], E), c("caret trim", z);
      let R = z.split(" ").map((S) => r(S, this.options)).join(" ").split(/\s+/).map((S) => V(S, this.options));
      U && (R = R.filter((S) => (c("loose invalid filter", S, this.options), !!S.match(i[p.COMPARATORLOOSE])))), c("range list", R);
      const A = /* @__PURE__ */ new Map(), O = R.map((S) => new s(S, this.options));
      for (const S of O) {
        if (v(S))
          return [S];
        A.set(S.value, S);
      }
      A.size > 1 && A.has("") && A.delete("");
      const m = [...A.values()];
      return n.set(J, m), m;
    }
    intersects(z, Y) {
      if (!(z instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((J) => f(J, Y) && z.set.some((D) => f(D, Y) && J.every((U) => D.every((j) => U.intersects(j, Y)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(z) {
      if (!z)
        return !1;
      if (typeof z == "string")
        try {
          z = new o(z, this.options);
        } catch {
          return !1;
        }
      for (let Y = 0; Y < this.set.length; Y++)
        if (W(this.set[Y], z, this.options))
          return !0;
      return !1;
    }
  }
  bs = t;
  const l = of(), n = new l(), u = Bs(), s = gn(), c = vn(), o = ve(), {
    safeRe: i,
    t: p,
    comparatorTrimReplace: a,
    tildeTrimReplace: y,
    caretTrimReplace: E
  } = pt(), { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: P } = $n(), v = (F) => F.value === "<0.0.0-0", h = (F) => F.value === "", f = (F, z) => {
    let Y = !0;
    const J = F.slice();
    let D = J.pop();
    for (; Y && J.length; )
      Y = J.every((U) => D.intersects(U, z)), D = J.pop();
    return Y;
  }, r = (F, z) => (c("comp", F, z), F = $(F, z), c("caret", F), F = _(F, z), c("tildes", F), F = I(F, z), c("xrange", F), F = M(F, z), c("stars", F), F), d = (F) => !F || F.toLowerCase() === "x" || F === "*", _ = (F, z) => F.trim().split(/\s+/).map((Y) => g(Y, z)).join(" "), g = (F, z) => {
    const Y = z.loose ? i[p.TILDELOOSE] : i[p.TILDE];
    return F.replace(Y, (J, D, U, j, R) => {
      c("tilde", F, J, D, U, j, R);
      let A;
      return d(D) ? A = "" : d(U) ? A = `>=${D}.0.0 <${+D + 1}.0.0-0` : d(j) ? A = `>=${D}.${U}.0 <${D}.${+U + 1}.0-0` : R ? (c("replaceTilde pr", R), A = `>=${D}.${U}.${j}-${R} <${D}.${+U + 1}.0-0`) : A = `>=${D}.${U}.${j} <${D}.${+U + 1}.0-0`, c("tilde return", A), A;
    });
  }, $ = (F, z) => F.trim().split(/\s+/).map((Y) => b(Y, z)).join(" "), b = (F, z) => {
    c("caret", F, z);
    const Y = z.loose ? i[p.CARETLOOSE] : i[p.CARET], J = z.includePrerelease ? "-0" : "";
    return F.replace(Y, (D, U, j, R, A) => {
      c("caret", F, D, U, j, R, A);
      let O;
      return d(U) ? O = "" : d(j) ? O = `>=${U}.0.0${J} <${+U + 1}.0.0-0` : d(R) ? U === "0" ? O = `>=${U}.${j}.0${J} <${U}.${+j + 1}.0-0` : O = `>=${U}.${j}.0${J} <${+U + 1}.0.0-0` : A ? (c("replaceCaret pr", A), U === "0" ? j === "0" ? O = `>=${U}.${j}.${R}-${A} <${U}.${j}.${+R + 1}-0` : O = `>=${U}.${j}.${R}-${A} <${U}.${+j + 1}.0-0` : O = `>=${U}.${j}.${R}-${A} <${+U + 1}.0.0-0`) : (c("no pr"), U === "0" ? j === "0" ? O = `>=${U}.${j}.${R}${J} <${U}.${j}.${+R + 1}-0` : O = `>=${U}.${j}.${R}${J} <${U}.${+j + 1}.0-0` : O = `>=${U}.${j}.${R} <${+U + 1}.0.0-0`), c("caret return", O), O;
    });
  }, I = (F, z) => (c("replaceXRanges", F, z), F.split(/\s+/).map((Y) => C(Y, z)).join(" ")), C = (F, z) => {
    F = F.trim();
    const Y = z.loose ? i[p.XRANGELOOSE] : i[p.XRANGE];
    return F.replace(Y, (J, D, U, j, R, A) => {
      c("xRange", F, J, D, U, j, R, A);
      const O = d(U), m = O || d(j), S = m || d(R), q = S;
      return D === "=" && q && (D = ""), A = z.includePrerelease ? "-0" : "", O ? D === ">" || D === "<" ? J = "<0.0.0-0" : J = "*" : D && q ? (m && (j = 0), R = 0, D === ">" ? (D = ">=", m ? (U = +U + 1, j = 0, R = 0) : (j = +j + 1, R = 0)) : D === "<=" && (D = "<", m ? U = +U + 1 : j = +j + 1), D === "<" && (A = "-0"), J = `${D + U}.${j}.${R}${A}`) : m ? J = `>=${U}.0.0${A} <${+U + 1}.0.0-0` : S && (J = `>=${U}.${j}.0${A} <${U}.${+j + 1}.0-0`), c("xRange return", J), J;
    });
  }, M = (F, z) => (c("replaceStars", F, z), F.trim().replace(i[p.STAR], "")), V = (F, z) => (c("replaceGTE0", F, z), F.trim().replace(i[z.includePrerelease ? p.GTE0PRE : p.GTE0], "")), B = (F) => (z, Y, J, D, U, j, R, A, O, m, S, q) => (d(J) ? Y = "" : d(D) ? Y = `>=${J}.0.0${F ? "-0" : ""}` : d(U) ? Y = `>=${J}.${D}.0${F ? "-0" : ""}` : j ? Y = `>=${Y}` : Y = `>=${Y}${F ? "-0" : ""}`, d(O) ? A = "" : d(m) ? A = `<${+O + 1}.0.0-0` : d(S) ? A = `<${O}.${+m + 1}.0-0` : q ? A = `<=${O}.${m}.${S}-${q}` : F ? A = `<${O}.${m}.${+S + 1}-0` : A = `<=${A}`, `${Y} ${A}`.trim()), W = (F, z, Y) => {
    for (let J = 0; J < F.length; J++)
      if (!F[J].test(z))
        return !1;
    if (z.prerelease.length && !Y.includePrerelease) {
      for (let J = 0; J < F.length; J++)
        if (c(F[J].semver), F[J].semver !== s.ANY && F[J].semver.prerelease.length > 0) {
          const D = F[J].semver;
          if (D.major === z.major && D.minor === z.minor && D.patch === z.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return bs;
}
var Ps, Pc;
function gn() {
  if (Pc) return Ps;
  Pc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(a, y) {
      if (y = l(y), a instanceof t) {
        if (a.loose === !!y.loose)
          return a;
        a = a.value;
      }
      a = a.trim().split(/\s+/).join(" "), c("comparator", a, y), this.options = y, this.loose = !!y.loose, this.parse(a), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, c("comp", this);
    }
    parse(a) {
      const y = this.options.loose ? n[u.COMPARATORLOOSE] : n[u.COMPARATOR], E = a.match(y);
      if (!E)
        throw new TypeError(`Invalid comparator: ${a}`);
      this.operator = E[1] !== void 0 ? E[1] : "", this.operator === "=" && (this.operator = ""), E[2] ? this.semver = new o(E[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(a) {
      if (c("Comparator.test", a, this.options.loose), this.semver === e || a === e)
        return !0;
      if (typeof a == "string")
        try {
          a = new o(a, this.options);
        } catch {
          return !1;
        }
      return s(a, this.operator, this.semver, this.options);
    }
    intersects(a, y) {
      if (!(a instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new i(a.value, y).test(this.value) : a.operator === "" ? a.value === "" ? !0 : new i(this.value, y).test(a.semver) : (y = l(y), y.includePrerelease && (this.value === "<0.0.0-0" || a.value === "<0.0.0-0") || !y.includePrerelease && (this.value.startsWith("<0.0.0") || a.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && a.operator.startsWith(">") || this.operator.startsWith("<") && a.operator.startsWith("<") || this.semver.version === a.semver.version && this.operator.includes("=") && a.operator.includes("=") || s(this.semver, "<", a.semver, y) && this.operator.startsWith(">") && a.operator.startsWith("<") || s(this.semver, ">", a.semver, y) && this.operator.startsWith("<") && a.operator.startsWith(">")));
    }
  }
  Ps = t;
  const l = Bs(), { safeRe: n, t: u } = pt(), s = au(), c = vn(), o = ve(), i = Te();
  return Ps;
}
var Rs, Rc;
function wn() {
  if (Rc) return Rs;
  Rc = 1;
  const e = Te();
  return Rs = (l, n, u) => {
    try {
      n = new e(n, u);
    } catch {
      return !1;
    }
    return n.test(l);
  }, Rs;
}
var Ns, Nc;
function cf() {
  if (Nc) return Ns;
  Nc = 1;
  const e = Te();
  return Ns = (l, n) => new e(l, n).set.map((u) => u.map((s) => s.value).join(" ").trim().split(" ")), Ns;
}
var Os, Oc;
function uf() {
  if (Oc) return Os;
  Oc = 1;
  const e = ve(), t = Te();
  return Os = (n, u, s) => {
    let c = null, o = null, i = null;
    try {
      i = new t(u, s);
    } catch {
      return null;
    }
    return n.forEach((p) => {
      i.test(p) && (!c || o.compare(p) === -1) && (c = p, o = new e(c, s));
    }), c;
  }, Os;
}
var Is, Ic;
function lf() {
  if (Ic) return Is;
  Ic = 1;
  const e = ve(), t = Te();
  return Is = (n, u, s) => {
    let c = null, o = null, i = null;
    try {
      i = new t(u, s);
    } catch {
      return null;
    }
    return n.forEach((p) => {
      i.test(p) && (!c || o.compare(p) === 1) && (c = p, o = new e(c, s));
    }), c;
  }, Is;
}
var Ts, Tc;
function df() {
  if (Tc) return Ts;
  Tc = 1;
  const e = ve(), t = Te(), l = _n();
  return Ts = (u, s) => {
    u = new t(u, s);
    let c = new e("0.0.0");
    if (u.test(c) || (c = new e("0.0.0-0"), u.test(c)))
      return c;
    c = null;
    for (let o = 0; o < u.set.length; ++o) {
      const i = u.set[o];
      let p = null;
      i.forEach((a) => {
        const y = new e(a.semver.version);
        switch (a.operator) {
          case ">":
            y.prerelease.length === 0 ? y.patch++ : y.prerelease.push(0), y.raw = y.format();
          /* fallthrough */
          case "":
          case ">=":
            (!p || l(y, p)) && (p = y);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${a.operator}`);
        }
      }), p && (!c || l(c, p)) && (c = p);
    }
    return c && u.test(c) ? c : null;
  }, Ts;
}
var js, jc;
function ff() {
  if (jc) return js;
  jc = 1;
  const e = Te();
  return js = (l, n) => {
    try {
      return new e(l, n).range || "*";
    } catch {
      return null;
    }
  }, js;
}
var As, Ac;
function Zs() {
  if (Ac) return As;
  Ac = 1;
  const e = ve(), t = gn(), { ANY: l } = t, n = Te(), u = wn(), s = _n(), c = Xs(), o = Qs(), i = Ys();
  return As = (a, y, E, w) => {
    a = new e(a, w), y = new n(y, w);
    let P, v, h, f, r;
    switch (E) {
      case ">":
        P = s, v = o, h = c, f = ">", r = ">=";
        break;
      case "<":
        P = c, v = i, h = s, f = "<", r = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (u(a, y, w))
      return !1;
    for (let d = 0; d < y.set.length; ++d) {
      const _ = y.set[d];
      let g = null, $ = null;
      if (_.forEach((b) => {
        b.semver === l && (b = new t(">=0.0.0")), g = g || b, $ = $ || b, P(b.semver, g.semver, w) ? g = b : h(b.semver, $.semver, w) && ($ = b);
      }), g.operator === f || g.operator === r || (!$.operator || $.operator === f) && v(a, $.semver))
        return !1;
      if ($.operator === r && h(a, $.semver))
        return !1;
    }
    return !0;
  }, As;
}
var qs, qc;
function hf() {
  if (qc) return qs;
  qc = 1;
  const e = Zs();
  return qs = (l, n, u) => e(l, n, ">", u), qs;
}
var Cs, Cc;
function mf() {
  if (Cc) return Cs;
  Cc = 1;
  const e = Zs();
  return Cs = (l, n, u) => e(l, n, "<", u), Cs;
}
var ks, kc;
function pf() {
  if (kc) return ks;
  kc = 1;
  const e = Te();
  return ks = (l, n, u) => (l = new e(l, u), n = new e(n, u), l.intersects(n, u)), ks;
}
var Ds, Dc;
function yf() {
  if (Dc) return Ds;
  Dc = 1;
  const e = wn(), t = Ie();
  return Ds = (l, n, u) => {
    const s = [];
    let c = null, o = null;
    const i = l.sort((E, w) => t(E, w, u));
    for (const E of i)
      e(E, n, u) ? (o = E, c || (c = E)) : (o && s.push([c, o]), o = null, c = null);
    c && s.push([c, null]);
    const p = [];
    for (const [E, w] of s)
      E === w ? p.push(E) : !w && E === i[0] ? p.push("*") : w ? E === i[0] ? p.push(`<=${w}`) : p.push(`${E} - ${w}`) : p.push(`>=${E}`);
    const a = p.join(" || "), y = typeof n.raw == "string" ? n.raw : String(n);
    return a.length < y.length ? a : n;
  }, Ds;
}
var Ms, Mc;
function $f() {
  if (Mc) return Ms;
  Mc = 1;
  const e = Te(), t = gn(), { ANY: l } = t, n = wn(), u = Ie(), s = (y, E, w = {}) => {
    if (y === E)
      return !0;
    y = new e(y, w), E = new e(E, w);
    let P = !1;
    e: for (const v of y.set) {
      for (const h of E.set) {
        const f = i(v, h, w);
        if (P = P || f !== null, f)
          continue e;
      }
      if (P)
        return !1;
    }
    return !0;
  }, c = [new t(">=0.0.0-0")], o = [new t(">=0.0.0")], i = (y, E, w) => {
    if (y === E)
      return !0;
    if (y.length === 1 && y[0].semver === l) {
      if (E.length === 1 && E[0].semver === l)
        return !0;
      w.includePrerelease ? y = c : y = o;
    }
    if (E.length === 1 && E[0].semver === l) {
      if (w.includePrerelease)
        return !0;
      E = o;
    }
    const P = /* @__PURE__ */ new Set();
    let v, h;
    for (const I of y)
      I.operator === ">" || I.operator === ">=" ? v = p(v, I, w) : I.operator === "<" || I.operator === "<=" ? h = a(h, I, w) : P.add(I.semver);
    if (P.size > 1)
      return null;
    let f;
    if (v && h) {
      if (f = u(v.semver, h.semver, w), f > 0)
        return null;
      if (f === 0 && (v.operator !== ">=" || h.operator !== "<="))
        return null;
    }
    for (const I of P) {
      if (v && !n(I, String(v), w) || h && !n(I, String(h), w))
        return null;
      for (const C of E)
        if (!n(I, String(C), w))
          return !1;
      return !0;
    }
    let r, d, _, g, $ = h && !w.includePrerelease && h.semver.prerelease.length ? h.semver : !1, b = v && !w.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    $ && $.prerelease.length === 1 && h.operator === "<" && $.prerelease[0] === 0 && ($ = !1);
    for (const I of E) {
      if (g = g || I.operator === ">" || I.operator === ">=", _ = _ || I.operator === "<" || I.operator === "<=", v) {
        if (b && I.semver.prerelease && I.semver.prerelease.length && I.semver.major === b.major && I.semver.minor === b.minor && I.semver.patch === b.patch && (b = !1), I.operator === ">" || I.operator === ">=") {
          if (r = p(v, I, w), r === I && r !== v)
            return !1;
        } else if (v.operator === ">=" && !n(v.semver, String(I), w))
          return !1;
      }
      if (h) {
        if ($ && I.semver.prerelease && I.semver.prerelease.length && I.semver.major === $.major && I.semver.minor === $.minor && I.semver.patch === $.patch && ($ = !1), I.operator === "<" || I.operator === "<=") {
          if (d = a(h, I, w), d === I && d !== h)
            return !1;
        } else if (h.operator === "<=" && !n(h.semver, String(I), w))
          return !1;
      }
      if (!I.operator && (h || v) && f !== 0)
        return !1;
    }
    return !(v && _ && !h && f !== 0 || h && g && !v && f !== 0 || b || $);
  }, p = (y, E, w) => {
    if (!y)
      return E;
    const P = u(y.semver, E.semver, w);
    return P > 0 ? y : P < 0 || E.operator === ">" && y.operator === ">=" ? E : y;
  }, a = (y, E, w) => {
    if (!y)
      return E;
    const P = u(y.semver, E.semver, w);
    return P < 0 ? y : P > 0 || E.operator === "<" && y.operator === "<=" ? E : y;
  };
  return Ms = s, Ms;
}
var Ls, Lc;
function vf() {
  if (Lc) return Ls;
  Lc = 1;
  const e = pt(), t = $n(), l = ve(), n = ru(), u = nt(), s = Bd(), c = Jd(), o = Xd(), i = Yd(), p = Qd(), a = Zd(), y = xd(), E = ef(), w = Ie(), P = tf(), v = rf(), h = Js(), f = nf(), r = sf(), d = _n(), _ = Xs(), g = nu(), $ = su(), b = Ys(), I = Qs(), C = au(), M = af(), V = gn(), B = Te(), W = wn(), F = cf(), z = uf(), Y = lf(), J = df(), D = ff(), U = Zs(), j = hf(), R = mf(), A = pf(), O = yf(), m = $f();
  return Ls = {
    parse: u,
    valid: s,
    clean: c,
    inc: o,
    diff: i,
    major: p,
    minor: a,
    patch: y,
    prerelease: E,
    compare: w,
    rcompare: P,
    compareLoose: v,
    compareBuild: h,
    sort: f,
    rsort: r,
    gt: d,
    lt: _,
    eq: g,
    neq: $,
    gte: b,
    lte: I,
    cmp: C,
    coerce: M,
    Comparator: V,
    Range: B,
    satisfies: W,
    toComparators: F,
    maxSatisfying: z,
    minSatisfying: Y,
    minVersion: J,
    validRange: D,
    outside: U,
    gtr: j,
    ltr: R,
    intersects: A,
    simplifyRange: O,
    subset: m,
    SemVer: l,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, Ls;
}
var ft = { exports: {} }, en = { exports: {} }, Fc;
function _f() {
  if (Fc) return en.exports;
  Fc = 1;
  const e = (t, l) => {
    for (const n of Reflect.ownKeys(l))
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
    return t;
  };
  return en.exports = e, en.exports.default = e, en.exports;
}
var Vc;
function gf() {
  if (Vc) return ft.exports;
  Vc = 1;
  const e = _f(), t = /* @__PURE__ */ new WeakMap(), l = (n, u = {}) => {
    if (typeof n != "function")
      throw new TypeError("Expected a function");
    let s, c = 0;
    const o = n.displayName || n.name || "<anonymous>", i = function(...p) {
      if (t.set(i, ++c), c === 1)
        s = n.apply(this, p), n = null;
      else if (u.throw === !0)
        throw new Error(`Function \`${o}\` can only be called once`);
      return s;
    };
    return e(i, n), t.set(i, c), i;
  };
  return ft.exports = l, ft.exports.default = l, ft.exports.callCount = (n) => {
    if (!t.has(n))
      throw new Error(`The given function \`${n.name}\` is not wrapped by the \`onetime\` package`);
    return t.get(n);
  }, ft.exports;
}
var tn = ht.exports, Uc;
function wf() {
  return Uc || (Uc = 1, function(e, t) {
    var l = tn && tn.__classPrivateFieldSet || function(J, D, U, j, R) {
      if (j === "m") throw new TypeError("Private method is not writable");
      if (j === "a" && !R) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D == "function" ? J !== D || !R : !D.has(J)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return j === "a" ? R.call(J, U) : R ? R.value = U : D.set(J, U), U;
    }, n = tn && tn.__classPrivateFieldGet || function(J, D, U, j) {
      if (U === "a" && !j) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D == "function" ? J !== D || !j : !D.has(J)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return U === "m" ? j : U === "a" ? j.call(J) : j ? j.value : D.get(J);
    }, u, s, c, o, i, p;
    Object.defineProperty(t, "__esModule", { value: !0 });
    const a = Kc, y = Vs, E = _e, w = lu, P = du, v = fu, h = yu(), f = Su(), r = bu(), d = Au(), _ = Ll(), g = Gd(), $ = Wd(), b = vf(), I = gf(), C = "aes-256-cbc", M = () => /* @__PURE__ */ Object.create(null), V = (J) => J != null;
    let B = "";
    try {
      delete require.cache[__filename], B = E.dirname((s = (u = e.parent) === null || u === void 0 ? void 0 : u.filename) !== null && s !== void 0 ? s : ".");
    } catch {
    }
    const W = (J, D) => {
      const U = /* @__PURE__ */ new Set([
        "undefined",
        "symbol",
        "function"
      ]), j = typeof D;
      if (U.has(j))
        throw new TypeError(`Setting a value of type \`${j}\` for key \`${J}\` is not allowed as it's not supported by JSON`);
    }, F = "__internal__", z = `${F}.migrations.version`;
    class Y {
      constructor(D = {}) {
        var U;
        c.set(this, void 0), o.set(this, void 0), i.set(this, void 0), p.set(this, {}), this._deserialize = (S) => JSON.parse(S), this._serialize = (S) => JSON.stringify(S, void 0, "	");
        const j = {
          configName: "config",
          fileExtension: "json",
          projectSuffix: "nodejs",
          clearInvalidConfig: !1,
          accessPropertiesByDotNotation: !0,
          configFileMode: 438,
          ...D
        }, R = I(() => {
          const S = f.sync({ cwd: B }), q = S && JSON.parse(y.readFileSync(S, "utf8"));
          return q ?? {};
        });
        if (!j.cwd) {
          if (j.projectName || (j.projectName = R().name), !j.projectName)
            throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
          j.cwd = r(j.projectName, { suffix: j.projectSuffix }).config;
        }
        if (l(this, i, j, "f"), j.schema) {
          if (typeof j.schema != "object")
            throw new TypeError("The `schema` option must be an object.");
          const S = new _.default({
            allErrors: !0,
            useDefaults: !0
          });
          (0, g.default)(S);
          const q = {
            type: "object",
            properties: j.schema
          };
          l(this, c, S.compile(q), "f");
          for (const [K, G] of Object.entries(j.schema))
            G != null && G.default && (n(this, p, "f")[K] = G.default);
        }
        j.defaults && l(this, p, {
          ...n(this, p, "f"),
          ...j.defaults
        }, "f"), j.serialize && (this._serialize = j.serialize), j.deserialize && (this._deserialize = j.deserialize), this.events = new v.EventEmitter(), l(this, o, j.encryptionKey, "f");
        const A = j.fileExtension ? `.${j.fileExtension}` : "";
        this.path = E.resolve(j.cwd, `${(U = j.configName) !== null && U !== void 0 ? U : "config"}${A}`);
        const O = this.store, m = Object.assign(M(), j.defaults, O);
        this._validate(m);
        try {
          P.deepEqual(O, m);
        } catch {
          this.store = m;
        }
        if (j.watch && this._watch(), j.migrations) {
          if (j.projectVersion || (j.projectVersion = R().version), !j.projectVersion)
            throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
          this._migrate(j.migrations, j.projectVersion, j.beforeEachMigration);
        }
      }
      get(D, U) {
        if (n(this, i, "f").accessPropertiesByDotNotation)
          return this._get(D, U);
        const { store: j } = this;
        return D in j ? j[D] : U;
      }
      set(D, U) {
        if (typeof D != "string" && typeof D != "object")
          throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof D}`);
        if (typeof D != "object" && U === void 0)
          throw new TypeError("Use `delete()` to clear values");
        if (this._containsReservedKey(D))
          throw new TypeError(`Please don't use the ${F} key, as it's used to manage this module internal operations.`);
        const { store: j } = this, R = (A, O) => {
          W(A, O), n(this, i, "f").accessPropertiesByDotNotation ? h.set(j, A, O) : j[A] = O;
        };
        if (typeof D == "object") {
          const A = D;
          for (const [O, m] of Object.entries(A))
            R(O, m);
        } else
          R(D, U);
        this.store = j;
      }
      /**
          Check if an item exists.
      
          @param key - The key of the item to check.
          */
      has(D) {
        return n(this, i, "f").accessPropertiesByDotNotation ? h.has(this.store, D) : D in this.store;
      }
      /**
          Reset items to their default values, as defined by the `defaults` or `schema` option.
      
          @see `clear()` to reset all items.
      
          @param keys - The keys of the items to reset.
          */
      reset(...D) {
        for (const U of D)
          V(n(this, p, "f")[U]) && this.set(U, n(this, p, "f")[U]);
      }
      /**
          Delete an item.
      
          @param key - The key of the item to delete.
          */
      delete(D) {
        const { store: U } = this;
        n(this, i, "f").accessPropertiesByDotNotation ? h.delete(U, D) : delete U[D], this.store = U;
      }
      /**
          Delete all items.
      
          This resets known items to their default values, if defined by the `defaults` or `schema` option.
          */
      clear() {
        this.store = M();
        for (const D of Object.keys(n(this, p, "f")))
          this.reset(D);
      }
      /**
          Watches the given `key`, calling `callback` on any changes.
      
          @param key - The key wo watch.
          @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
          @returns A function, that when called, will unsubscribe.
          */
      onDidChange(D, U) {
        if (typeof D != "string")
          throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof D}`);
        if (typeof U != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof U}`);
        return this._handleChange(() => this.get(D), U);
      }
      /**
          Watches the whole config object, calling `callback` on any changes.
      
          @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
          @returns A function, that when called, will unsubscribe.
          */
      onDidAnyChange(D) {
        if (typeof D != "function")
          throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof D}`);
        return this._handleChange(() => this.store, D);
      }
      get size() {
        return Object.keys(this.store).length;
      }
      get store() {
        try {
          const D = y.readFileSync(this.path, n(this, o, "f") ? null : "utf8"), U = this._encryptData(D), j = this._deserialize(U);
          return this._validate(j), Object.assign(M(), j);
        } catch (D) {
          if ((D == null ? void 0 : D.code) === "ENOENT")
            return this._ensureDirectory(), M();
          if (n(this, i, "f").clearInvalidConfig && D.name === "SyntaxError")
            return M();
          throw D;
        }
      }
      set store(D) {
        this._ensureDirectory(), this._validate(D), this._write(D), this.events.emit("change");
      }
      *[(c = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), Symbol.iterator)]() {
        for (const [D, U] of Object.entries(this.store))
          yield [D, U];
      }
      _encryptData(D) {
        if (!n(this, o, "f"))
          return D.toString();
        try {
          if (n(this, o, "f"))
            try {
              if (D.slice(16, 17).toString() === ":") {
                const U = D.slice(0, 16), j = w.pbkdf2Sync(n(this, o, "f"), U.toString(), 1e4, 32, "sha512"), R = w.createDecipheriv(C, j, U);
                D = Buffer.concat([R.update(Buffer.from(D.slice(17))), R.final()]).toString("utf8");
              } else {
                const U = w.createDecipher(C, n(this, o, "f"));
                D = Buffer.concat([U.update(Buffer.from(D)), U.final()]).toString("utf8");
              }
            } catch {
            }
        } catch {
        }
        return D.toString();
      }
      _handleChange(D, U) {
        let j = D();
        const R = () => {
          const A = j, O = D();
          (0, a.isDeepStrictEqual)(O, A) || (j = O, U.call(this, O, A));
        };
        return this.events.on("change", R), () => this.events.removeListener("change", R);
      }
      _validate(D) {
        if (!n(this, c, "f") || n(this, c, "f").call(this, D) || !n(this, c, "f").errors)
          return;
        const j = n(this, c, "f").errors.map(({ instancePath: R, message: A = "" }) => `\`${R.slice(1)}\` ${A}`);
        throw new Error("Config schema violation: " + j.join("; "));
      }
      _ensureDirectory() {
        y.mkdirSync(E.dirname(this.path), { recursive: !0 });
      }
      _write(D) {
        let U = this._serialize(D);
        if (n(this, o, "f")) {
          const j = w.randomBytes(16), R = w.pbkdf2Sync(n(this, o, "f"), j.toString(), 1e4, 32, "sha512"), A = w.createCipheriv(C, R, j);
          U = Buffer.concat([j, Buffer.from(":"), A.update(Buffer.from(U)), A.final()]);
        }
        if (process.env.SNAP)
          y.writeFileSync(this.path, U, { mode: n(this, i, "f").configFileMode });
        else
          try {
            d.writeFileSync(this.path, U, { mode: n(this, i, "f").configFileMode });
          } catch (j) {
            if ((j == null ? void 0 : j.code) === "EXDEV") {
              y.writeFileSync(this.path, U, { mode: n(this, i, "f").configFileMode });
              return;
            }
            throw j;
          }
      }
      _watch() {
        this._ensureDirectory(), y.existsSync(this.path) || this._write(M()), process.platform === "win32" ? y.watch(this.path, { persistent: !1 }, $(() => {
          this.events.emit("change");
        }, { wait: 100 })) : y.watchFile(this.path, { persistent: !1 }, $(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
      _migrate(D, U, j) {
        let R = this._get(z, "0.0.0");
        const A = Object.keys(D).filter((m) => this._shouldPerformMigration(m, R, U));
        let O = { ...this.store };
        for (const m of A)
          try {
            j && j(this, {
              fromVersion: R,
              toVersion: m,
              finalVersion: U,
              versions: A
            });
            const S = D[m];
            S(this), this._set(z, m), R = m, O = { ...this.store };
          } catch (S) {
            throw this.store = O, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${S}`);
          }
        (this._isVersionInRangeFormat(R) || !b.eq(R, U)) && this._set(z, U);
      }
      _containsReservedKey(D) {
        return typeof D == "object" && Object.keys(D)[0] === F ? !0 : typeof D != "string" ? !1 : n(this, i, "f").accessPropertiesByDotNotation ? !!D.startsWith(`${F}.`) : !1;
      }
      _isVersionInRangeFormat(D) {
        return b.clean(D) === null;
      }
      _shouldPerformMigration(D, U, j) {
        return this._isVersionInRangeFormat(D) ? U !== "0.0.0" && b.satisfies(U, D) ? !1 : b.satisfies(j, D) : !(b.lte(D, U) || b.gt(D, j));
      }
      _get(D, U) {
        return h.get(this.store, D, U);
      }
      _set(D, U) {
        const { store: j } = this;
        h.set(j, D, U), this.store = j;
      }
    }
    t.default = Y, e.exports = Y, e.exports.default = Y;
  }(ht, ht.exports)), ht.exports;
}
var Fs, zc;
function Ef() {
  if (zc) return Fs;
  zc = 1;
  const e = _e, { app: t, ipcMain: l, ipcRenderer: n, shell: u } = iu, s = wf();
  let c = !1;
  const o = () => {
    if (!l || !t)
      throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
    const p = {
      defaultCwd: t.getPath("userData"),
      appVersion: t.getVersion()
    };
    return c || (l.on("electron-store-get-data", (a) => {
      a.returnValue = p;
    }), c = !0), p;
  };
  class i extends s {
    constructor(a) {
      let y, E;
      if (n) {
        const w = n.sendSync("electron-store-get-data");
        if (!w)
          throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
        ({ defaultCwd: y, appVersion: E } = w);
      } else l && t && ({ defaultCwd: y, appVersion: E } = o());
      a = {
        name: "config",
        ...a
      }, a.projectVersion || (a.projectVersion = E), a.cwd ? a.cwd = e.isAbsolute(a.cwd) ? a.cwd : e.join(y, a.cwd) : a.cwd = y, a.configName = a.name, delete a.name, super(a);
    }
    static initRenderer() {
      o();
    }
    async openInEditor() {
      const a = await u.openPath(this.path);
      if (a)
        throw new Error(a);
    }
  }
  return Fs = i, Fs;
}
var Sf = /* @__PURE__ */ Ef();
const bf = /* @__PURE__ */ mu(Sf), En = new bf(), Pf = async () => En.get("timers", []), Rf = async (e) => {
  En.set("timers", e), console.log("timers Electron", e);
}, Nf = () => En.get("isSoundEnabled", !0), Of = (e) => {
  En.set("isSoundEnabled", e), console.log("isSoundEnabled Electron", e);
}, If = uu(import.meta.url), rn = _e.dirname(If);
let Ze;
it.on("ready", () => {
  const { width: e, height: t } = ou.getPrimaryDisplay().workAreaSize;
  Ze = new cu({
    frame: !1,
    alwaysOnTop: !0,
    resizable: !1,
    // skipTaskbar: true,
    transparent: !0,
    icon: it.isPackaged ? _e.join(process.resourcesPath, "dist", "assets", "bee.png") : _e.join(rn, "../src/img/bee.png"),
    webPreferences: {
      preload: it.isPackaged ? _e.join(
        process.resourcesPath,
        "app.asar.unpacked",
        "electron",
        "preload.js"
      ) : _e.join(rn, "../electron/preload.js"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), console.log("Window created");
  const l = 230, n = 280, u = 30;
  Ze.setBounds({
    x: e - l - u,
    y: t - n + u,
    width: l,
    height: n
  }), console.log(
    "Loading URL:",
    it.isPackaged ? `file://${_e.join(rn, "../dist/index.html")}` : "http://localhost:5173"
  ), Ze.loadURL(
    it.isPackaged ? `file://${_e.join(rn, "../dist/index.html")}` : "http://localhost:5173"
  ), Ze.once("ready-to-show", () => {
    console.log("Main window is ready to show"), Ze.show();
  }), Ze.on("unresponsive", () => {
    console.log("Window is unresponsive");
  }), Ze.show(), yt.handle("getTimers", () => Pf()), yt.handle("saveTimers", (s, c) => {
    Rf(c);
  }), yt.handle("getSoundEnabled", () => Nf()), yt.on("saveSoundEnabled", (s, c) => {
    Of(c);
  });
});
