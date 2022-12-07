var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function set_current_component(component6) {
  current_component = component6;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component6 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component6.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component6, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component6, name) {
  if (!component6 || !component6.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component6;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
var current_component, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    Promise.resolve();
    boolean_attributes = /* @__PURE__ */ new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "itemscope",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_chunks();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode2;
      var index6 = 0;
      while (index6 < str.length) {
        var eqIdx = str.indexOf("=", index6);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index6);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index6 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index6, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index6 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode2(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode3) {
      try {
        return decode3(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options) {
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!input) {
        if (!options.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key2) {
          return key2.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          );
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/chunks/hooks.js
var hooks_exports = {};
var init_hooks = __esm({
  ".svelte-kit/output/server/chunks/hooks.js"() {
  }
});

// .svelte-kit/output/server/chunks/Close.js
var ChevronDown, ChevronDown$1, Close, Close$1;
var init_Close = __esm({
  ".svelte-kit/output/server/chunks/Close.js"() {
    init_chunks();
    ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { viewBox: "0 0 32 32" },
          { fill: "currentColor" },
          { preserveAspectRatio: "xMidYMid meet" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          escape_object(attributes),
          escape_object($$restProps)
        ],
        {}
      )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"}"></path></svg>`;
    });
    ChevronDown$1 = ChevronDown;
    Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { viewBox: "0 0 32 32" },
          { fill: "currentColor" },
          { preserveAspectRatio: "xMidYMid meet" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          escape_object(attributes),
          escape_object($$restProps)
        ],
        {}
      )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path></svg>`;
    });
    Close$1 = Close;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Grid, Grid$1, Row, Row$1, Column, Column$1, Menu, Menu$1, shouldRenderHamburgerMenu, isSideNavCollapsed, isSideNavRail, HamburgerMenu, HamburgerMenu$1, Header, Header$1, HeaderNav, HeaderNav$1, HeaderNavItem, HeaderNavItem$1, HeaderNavMenu, HeaderNavMenu$1, SideNav, SideNav$1, SideNavItems, SideNavItems$1, SideNavLink, SideNavLink$1, SideNavMenu, SideNavMenu$1, SideNavMenuItem, SideNavMenuItem$1, Content, Content$1, SkipToContent, SkipToContent$1, SideNavDivider, SideNavDivider$1, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    init_Close();
    init_index2();
    Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let props;
      let $$restProps = compute_rest_props($$props, [
        "as",
        "condensed",
        "narrow",
        "fullWidth",
        "noGutter",
        "noGutterLeft",
        "noGutterRight",
        "padding"
      ]);
      let { as = false } = $$props;
      let { condensed = false } = $$props;
      let { narrow = false } = $$props;
      let { fullWidth = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
        $$bindings.condensed(condensed);
      if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
        $$bindings.narrow(narrow);
      if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
        $$bindings.fullWidth(fullWidth);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      props = {
        ...$$restProps,
        class: [
          $$restProps.class,
          "bx--grid",
          condensed && "bx--grid--condensed",
          narrow && "bx--grid--narrow",
          fullWidth && "bx--grid--full-width",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          padding && "bx--row-padding"
        ].filter(Boolean).join(" ")
      };
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    Grid$1 = Grid;
    Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let props;
      let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
      let { as = false } = $$props;
      let { condensed = false } = $$props;
      let { narrow = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
        $$bindings.condensed(condensed);
      if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
        $$bindings.narrow(narrow);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      props = {
        ...$$restProps,
        class: [
          $$restProps.class,
          "bx--row",
          condensed && "bx--row--condensed",
          narrow && "bx--row--narrow",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          padding && "bx--row-padding"
        ].filter(Boolean).join(" ")
      };
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    Row$1 = Row;
    Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let columnClass;
      let props;
      let $$restProps = compute_rest_props($$props, [
        "as",
        "noGutter",
        "noGutterLeft",
        "noGutterRight",
        "padding",
        "aspectRatio",
        "sm",
        "md",
        "lg",
        "xlg",
        "max"
      ]);
      let { as = false } = $$props;
      let { noGutter = false } = $$props;
      let { noGutterLeft = false } = $$props;
      let { noGutterRight = false } = $$props;
      let { padding = false } = $$props;
      let { aspectRatio = void 0 } = $$props;
      let { sm = void 0 } = $$props;
      let { md = void 0 } = $$props;
      let { lg = void 0 } = $$props;
      let { xlg = void 0 } = $$props;
      let { max = void 0 } = $$props;
      const breakpoints = ["sm", "md", "lg", "xlg", "max"];
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
        $$bindings.noGutter(noGutter);
      if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
        $$bindings.noGutterLeft(noGutterLeft);
      if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
        $$bindings.noGutterRight(noGutterRight);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
        $$bindings.aspectRatio(aspectRatio);
      if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
        $$bindings.sm(sm);
      if ($$props.md === void 0 && $$bindings.md && md !== void 0)
        $$bindings.md(md);
      if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
        $$bindings.lg(lg);
      if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
        $$bindings.xlg(xlg);
      if ($$props.max === void 0 && $$bindings.max && max !== void 0)
        $$bindings.max(max);
      columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
        const name = breakpoints[i];
        if (breakpoint === true) {
          return `bx--col-${name}`;
        } else if (typeof breakpoint === "number") {
          return `bx--col-${name}-${breakpoint}`;
        } else if (typeof breakpoint === "object") {
          let bp = [];
          if (typeof breakpoint.span === "number") {
            bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
          } else if (breakpoint.span === true) {
            bp = [...bp, `bx--col-${name}`];
          }
          if (typeof breakpoint.offset === "number") {
            bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
          }
          return bp.join(" ");
        }
      }).filter(Boolean).join(" ");
      props = {
        ...$$restProps,
        class: [
          $$restProps.class,
          columnClass,
          !columnClass && "bx--col",
          noGutter && "bx--no-gutter",
          noGutterLeft && "bx--no-gutter--left",
          noGutterRight && "bx--no-gutter--right",
          aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
          padding && "bx--col-padding"
        ].filter(Boolean).join(" ")
      };
      return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
    });
    Column$1 = Column;
    Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { viewBox: "0 0 32 32" },
          { fill: "currentColor" },
          { preserveAspectRatio: "xMidYMid meet" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          escape_object(attributes),
          escape_object($$restProps)
        ],
        {}
      )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z"}"></path></svg>`;
    });
    Menu$1 = Menu;
    shouldRenderHamburgerMenu = writable(false);
    isSideNavCollapsed = writable(false);
    isSideNavRail = writable(false);
    HamburgerMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["ariaLabel", "isOpen", "iconMenu", "iconClose", "ref"]);
      let { ariaLabel = void 0 } = $$props;
      let { isOpen = false } = $$props;
      let { iconMenu = Menu$1 } = $$props;
      let { iconClose = Close$1 } = $$props;
      let { ref = null } = $$props;
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
        $$bindings.isOpen(isOpen);
      if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
        $$bindings.iconMenu(iconMenu);
      if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
        $$bindings.iconClose(iconClose);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<button${spread(
        [
          { type: "button" },
          { title: escape_attribute_value(ariaLabel) },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--header__action bx--header__menu-trigger bx--header__menu-toggle"
        }
      )}${add_attribute("this", ref, 0)}>${validate_component((isOpen ? iconClose : iconMenu) || missing_component, "svelte:component").$$render($$result, { size: 20 }, {}, {})}</button>`;
    });
    HamburgerMenu$1 = HamburgerMenu;
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let ariaLabel;
      let $$restProps = compute_rest_props($$props, [
        "expandedByDefault",
        "isSideNavOpen",
        "uiShellAriaLabel",
        "href",
        "company",
        "platformName",
        "persistentHamburgerMenu",
        "expansionBreakpoint",
        "ref",
        "iconMenu",
        "iconClose"
      ]);
      let $shouldRenderHamburgerMenu, $$unsubscribe_shouldRenderHamburgerMenu;
      $$unsubscribe_shouldRenderHamburgerMenu = subscribe(shouldRenderHamburgerMenu, (value) => $shouldRenderHamburgerMenu = value);
      let { expandedByDefault = true } = $$props;
      let { isSideNavOpen = false } = $$props;
      let { uiShellAriaLabel = void 0 } = $$props;
      let { href = void 0 } = $$props;
      let { company = void 0 } = $$props;
      let { platformName = "" } = $$props;
      let { persistentHamburgerMenu = false } = $$props;
      let { expansionBreakpoint = 1056 } = $$props;
      let { ref = null } = $$props;
      let { iconMenu = Menu$1 } = $$props;
      let { iconClose = Close$1 } = $$props;
      let winWidth = void 0;
      if ($$props.expandedByDefault === void 0 && $$bindings.expandedByDefault && expandedByDefault !== void 0)
        $$bindings.expandedByDefault(expandedByDefault);
      if ($$props.isSideNavOpen === void 0 && $$bindings.isSideNavOpen && isSideNavOpen !== void 0)
        $$bindings.isSideNavOpen(isSideNavOpen);
      if ($$props.uiShellAriaLabel === void 0 && $$bindings.uiShellAriaLabel && uiShellAriaLabel !== void 0)
        $$bindings.uiShellAriaLabel(uiShellAriaLabel);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.company === void 0 && $$bindings.company && company !== void 0)
        $$bindings.company(company);
      if ($$props.platformName === void 0 && $$bindings.platformName && platformName !== void 0)
        $$bindings.platformName(platformName);
      if ($$props.persistentHamburgerMenu === void 0 && $$bindings.persistentHamburgerMenu && persistentHamburgerMenu !== void 0)
        $$bindings.persistentHamburgerMenu(persistentHamburgerMenu);
      if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
        $$bindings.expansionBreakpoint(expansionBreakpoint);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
        $$bindings.iconMenu(iconMenu);
      if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
        $$bindings.iconClose(iconClose);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        isSideNavOpen = expandedByDefault && winWidth >= expansionBreakpoint && !persistentHamburgerMenu;
        ariaLabel = company ? `${company} ` : "" + (uiShellAriaLabel || $$props["aria-label"] || platformName);
        $$rendered = `

<header${add_attribute("aria-label", ariaLabel, 0)}${add_classes("bx--header".trim())}>${slots["skip-to-content"] ? slots["skip-to-content"]({}) : ``}
  ${$shouldRenderHamburgerMenu && winWidth < expansionBreakpoint || persistentHamburgerMenu ? `${validate_component(HamburgerMenu$1, "HamburgerMenu").$$render(
          $$result,
          {
            iconClose,
            iconMenu,
            isOpen: isSideNavOpen
          },
          {
            isOpen: ($$value) => {
              isSideNavOpen = $$value;
              $$settled = false;
            }
          },
          {}
        )}` : ``}
  <a${spread([{ href: escape_attribute_value(href) }, escape_object($$restProps)], { classes: "bx--header__name" })}${add_attribute("this", ref, 0)}>${company ? `<span${add_classes("bx--header__name--prefix".trim())}>${escape(company)}\xA0</span>` : ``}
    ${slots.platform ? slots.platform({}) : `${escape(platformName)}`}</a>
  ${slots.default ? slots.default({}) : ``}</header>`;
      } while (!$$settled);
      $$unsubscribe_shouldRenderHamburgerMenu();
      return $$rendered;
    });
    Header$1 = Header;
    HeaderNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let props;
      let $$restProps = compute_rest_props($$props, []);
      props = {
        "aria-label": $$props["aria-label"],
        "aria-labelledby": $$props["aria-labelledby"]
      };
      return `<nav${spread([escape_object(props), escape_object($$restProps)], { classes: "bx--header__nav" })}><ul${spread([escape_object(props), { role: "menubar" }], {
        classes: "bx--header__menu-bar"
      })}>${slots.default ? slots.default({}) : ``}</ul></nav>`;
    });
    HeaderNav$1 = HeaderNav;
    HeaderNavItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "text", "isSelected", "ref"]);
      let { href = void 0 } = $$props;
      let { text = void 0 } = $$props;
      let { isSelected = false } = $$props;
      let { ref = null } = $$props;
      const id = "ccs-" + Math.random().toString(36);
      const ctx = getContext("HeaderNavMenu");
      ctx == null ? void 0 : ctx.selectedItems.subscribe((_selectedItems) => {
      });
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
        $$bindings.isSelected(isSelected);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      {
        ctx == null ? void 0 : ctx.updateSelectedItems({ id, isSelected });
      }
      return `<li role="${"none"}"><a${spread(
        [
          { role: "menuitem" },
          { tabindex: "0" },
          { href: escape_attribute_value(href) },
          {
            rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
          },
          {
            "aria-current": escape_attribute_value(isSelected ? "page" : void 0)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--header__menu-item"
        }
      )}${add_attribute("this", ref, 0)}><span${add_classes("bx--text-truncate--end".trim())}>${escape(text)}</span></a></li>`;
    });
    HeaderNavItem$1 = HeaderNavItem;
    HeaderNavMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isCurrentSubmenu;
      let $$restProps = compute_rest_props($$props, ["expanded", "href", "text", "ref"]);
      let $selectedItems, $$unsubscribe_selectedItems;
      let { expanded = false } = $$props;
      let { href = "/" } = $$props;
      let { text = void 0 } = $$props;
      let { ref = null } = $$props;
      const selectedItems = writable({});
      $$unsubscribe_selectedItems = subscribe(selectedItems, (value) => $selectedItems = value);
      let menuRef = null;
      setContext("HeaderNavMenu", {
        selectedItems,
        updateSelectedItems(item) {
          selectedItems.update((_items) => ({ ..._items, [item.id]: item.isSelected }));
        },
        closeMenu() {
          expanded = false;
        }
      });
      if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
        $$bindings.expanded(expanded);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      isCurrentSubmenu = Object.values($selectedItems).filter(Boolean).length > 0;
      $$unsubscribe_selectedItems();
      return `

<li role="${"none"}"${add_classes(("bx--header__submenu " + (isCurrentSubmenu ? "bx--header__submenu--current" : "")).trim())}><a${spread(
        [
          { role: "menuitem" },
          { tabindex: "0" },
          { "aria-haspopup": "menu" },
          {
            "aria-expanded": escape_attribute_value(expanded)
          },
          {
            "aria-label": escape_attribute_value(text)
          },
          { href: escape_attribute_value(href) },
          escape_object($$restProps),
          {
            style: escape($$restProps.style, true) + "; z-index: 1"
          }
        ],
        {
          classes: "bx--header__menu-item bx--header__menu-title"
        }
      )}${add_attribute("this", ref, 0)}>${escape(text)}
    ${validate_component(ChevronDown$1, "ChevronDown").$$render($$result, { class: "bx--header__menu-arrow" }, {}, {})}</a>
  <ul role="${"menu"}"${add_attribute("aria-label", text, 0)}${add_classes("bx--header__menu".trim())}${add_attribute("this", menuRef, 0)}>${slots.default ? slots.default({}) : ``}</ul></li>`;
    });
    HeaderNavMenu$1 = HeaderNavMenu;
    SideNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["fixed", "rail", "ariaLabel", "isOpen", "expansionBreakpoint"]);
      let $isSideNavRail, $$unsubscribe_isSideNavRail;
      let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
      $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
      $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
      let { fixed = false } = $$props;
      let { rail = false } = $$props;
      let { ariaLabel = void 0 } = $$props;
      let { isOpen = false } = $$props;
      let { expansionBreakpoint = 1056 } = $$props;
      const dispatch = createEventDispatcher();
      let winWidth = void 0;
      if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
        $$bindings.fixed(fixed);
      if ($$props.rail === void 0 && $$bindings.rail && rail !== void 0)
        $$bindings.rail(rail);
      if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
        $$bindings.isOpen(isOpen);
      if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
        $$bindings.expansionBreakpoint(expansionBreakpoint);
      {
        dispatch(isOpen ? "open" : "close");
      }
      set_store_value(isSideNavCollapsed, $isSideNavCollapsed = !isOpen, $isSideNavCollapsed);
      set_store_value(isSideNavRail, $isSideNavRail = rail, $isSideNavRail);
      $$unsubscribe_isSideNavRail();
      $$unsubscribe_isSideNavCollapsed();
      return `

${!fixed ? `
  <div${add_attribute("style", isOpen && "z-index: 6000", 0)}${add_classes(("bx--side-nav__overlay " + (isOpen ? "bx--side-nav__overlay-active" : "")).trim())}></div>` : ``}
<nav${spread(
        [
          {
            "aria-hidden": escape_attribute_value(!isOpen)
          },
          {
            "aria-label": escape_attribute_value(ariaLabel)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--side-nav__navigation bx--side-nav bx--side-nav--ux " + ((rail && winWidth >= expansionBreakpoint ? false : isOpen) ? "bx--side-nav--expanded" : "") + " " + (!isOpen && !rail ? "bx--side-nav--collapsed" : "") + " " + (rail ? "bx--side-nav--rail" : "")
        }
      )}>${slots.default ? slots.default({}) : ``}</nav>`;
    });
    SideNav$1 = SideNav;
    SideNavItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<ul${add_classes("bx--side-nav__items".trim())}>${slots.default ? slots.default({}) : ``}</ul>`;
    });
    SideNavItems$1 = SideNavItems;
    SideNavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "icon", "ref"]);
      let $$slots = compute_slots(slots);
      let { isSelected = false } = $$props;
      let { href = void 0 } = $$props;
      let { text = void 0 } = $$props;
      let { icon = void 0 } = $$props;
      let { ref = null } = $$props;
      if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
        $$bindings.isSelected(isSelected);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<li${add_classes("bx--side-nav__item".trim())}><a${spread(
        [
          {
            "aria-current": escape_attribute_value(isSelected ? "page" : void 0)
          },
          { href: escape_attribute_value(href) },
          {
            rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--side-nav__link " + (isSelected ? "bx--side-nav__link--current" : "")
        }
      )}${add_attribute("this", ref, 0)}>${$$slots.icon || icon ? `<div${add_classes("bx--side-nav__icon bx--side-nav__icon--small".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}
    <span${add_classes("bx--side-nav__link-text".trim())}>${slots.default ? slots.default({}) : `
        ${escape(text)}
      `}</span></a></li>`;
    });
    SideNavLink$1 = SideNavLink;
    SideNavMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["expanded", "text", "icon", "ref"]);
      let $$slots = compute_slots(slots);
      let { expanded = false } = $$props;
      let { text = void 0 } = $$props;
      let { icon = void 0 } = $$props;
      let { ref = null } = $$props;
      if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
        $$bindings.expanded(expanded);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
        $$bindings.icon(icon);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<li${add_classes(("bx--side-nav__item " + (icon ? "bx--side-nav__item--icon" : "")).trim())}><button${spread(
        [
          { type: "button" },
          {
            "aria-expanded": escape_attribute_value(expanded)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--side-nav__submenu"
        }
      )}${add_attribute("this", ref, 0)}>${$$slots.icon || icon ? `<div${add_classes("bx--side-nav__icon".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}
    <span${add_classes("bx--side-nav__submenu-title".trim())}>${escape(text)}</span>
    <div${add_classes("bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron".trim())}>${validate_component(ChevronDown$1, "ChevronDown").$$render($$result, {}, {}, {})}</div></button>
  <ul role="${"menu"}"${add_attribute("style", expanded && "max-height: none", 0)}${add_classes("bx--side-nav__menu".trim())}>${slots.default ? slots.default({}) : ``}</ul></li>`;
    });
    SideNavMenu$1 = SideNavMenu;
    SideNavMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "ref"]);
      let { isSelected = false } = $$props;
      let { href = void 0 } = $$props;
      let { text = void 0 } = $$props;
      let { ref = null } = $$props;
      if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
        $$bindings.isSelected(isSelected);
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<li${add_classes("bx--side-nav__menu-item".trim())}><a${spread(
        [
          {
            "aria-current": escape_attribute_value(isSelected ? "page" : void 0)
          },
          { href: escape_attribute_value(href) },
          escape_object($$restProps)
        ],
        {
          classes: "bx--side-nav__link"
        }
      )}${add_attribute("this", ref, 0)}><span${add_classes("bx--side-nav__link-text".trim())}>${slots.default ? slots.default({}) : `${escape(text)}`}</span></a></li>`;
    });
    SideNavMenuItem$1 = SideNavMenuItem;
    Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let unsetLeftMargin;
      let $$restProps = compute_rest_props($$props, ["id"]);
      let $isSideNavRail, $$unsubscribe_isSideNavRail;
      let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
      $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
      $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
      let { id = "main-content" } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      unsetLeftMargin = $isSideNavCollapsed && !$isSideNavRail;
      $$unsubscribe_isSideNavRail();
      $$unsubscribe_isSideNavCollapsed();
      return `<main${spread(
        [
          { id: escape_attribute_value(id) },
          escape_object($$restProps),
          {
            style: escape(unsetLeftMargin ? "margin-left: 0;" : "", true) + " " + escape($$restProps.style, true)
          }
        ],
        { classes: "bx--content" }
      )}>${slots.default ? slots.default({}) : ``}</main>`;
    });
    Content$1 = Content;
    SkipToContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["href", "tabindex"]);
      let { href = "#main-content" } = $$props;
      let { tabindex = "0" } = $$props;
      if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
      if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
        $$bindings.tabindex(tabindex);
      return `<a${spread(
        [
          { href: escape_attribute_value(href) },
          {
            tabindex: escape_attribute_value(tabindex)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--skip-to-content"
        }
      )}>${slots.default ? slots.default({}) : `Skip to main content`}</a>`;
    });
    SkipToContent$1 = SkipToContent;
    SideNavDivider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `<li${spread([{ role: "separator" }, escape_object($$restProps)], {
        classes: "bx--side-nav__divider"
      })}></li>`;
    });
    SideNavDivider$1 = SideNavDivider;
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isSideNavOpen = false;
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `${validate_component(Header$1, "Header").$$render(
          $$result,
          {
            company: "mtc",
            platformName: "patscenario",
            isSideNavOpen
          },
          {
            isSideNavOpen: ($$value) => {
              isSideNavOpen = $$value;
              $$settled = false;
            }
          },
          {
            "skip-to-content": () => {
              return `${validate_component(SkipToContent$1, "SkipToContent").$$render($$result, {}, {}, {})}
    `;
            },
            default: () => {
              return `${validate_component(HeaderNav$1, "HeaderNav").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 1" }, {}, {})}
      ${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 2" }, {}, {})}
      ${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 3" }, {}, {})}
      ${validate_component(HeaderNavMenu$1, "HeaderNavMenu").$$render($$result, { text: "Menu" }, {}, {
                    default: () => {
                      return `${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 1" }, {}, {})}
        ${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 2" }, {}, {})}
        ${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 3" }, {}, {})}`;
                    }
                  })}
      ${validate_component(HeaderNavItem$1, "HeaderNavItem").$$render($$result, { href: "/", text: "Link 4" }, {}, {})}`;
                }
              })}`;
            }
          }
        )}
  
  ${validate_component(SideNav$1, "SideNav").$$render(
          $$result,
          { rail: true, isOpen: isSideNavOpen },
          {
            isOpen: ($$value) => {
              isSideNavOpen = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `${validate_component(SideNavItems$1, "SideNavItems").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SideNavLink$1, "SideNavLink").$$render($$result, { text: "Link 1" }, {}, {})}
      ${validate_component(SideNavLink$1, "SideNavLink").$$render($$result, { text: "Link 2" }, {}, {})}
      ${validate_component(SideNavLink$1, "SideNavLink").$$render($$result, { text: "Link 3" }, {}, {})}
      ${validate_component(SideNavMenu$1, "SideNavMenu").$$render($$result, { text: "Menu" }, {}, {
                    default: () => {
                      return `${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render($$result, { href: "/", text: "Link 1" }, {}, {})}
        ${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render($$result, { href: "/", text: "Link 2" }, {}, {})}
        ${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render($$result, { href: "/", text: "Link 3" }, {}, {})}`;
                    }
                  })}
      ${validate_component(SideNavDivider$1, "SideNavDivider").$$render($$result, {}, {}, {})}
      ${validate_component(SideNavLink$1, "SideNavLink").$$render($$result, { text: "Link 4" }, {}, {})}`;
                }
              })}`;
            }
          }
        )}
  
  ${validate_component(Content$1, "Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                      default: () => {
                        return `${slots.default ? slots.default({}) : ``}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/components/pages/_layout.svelte-4db6fba1.js";
    imports = ["_app/immutable/components/pages/_layout.svelte-4db6fba1.js", "_app/immutable/chunks/index-851e755b.js", "_app/immutable/chunks/Close-c1d67ad7.js", "_app/immutable/chunks/index-cde18a9a.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function removed_session() {
  throw new Error(
    "stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
  );
}
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    getStores = () => {
      const stores = getContext("__svelte__");
      const readonly_stores = {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
      Object.defineProperties(readonly_stores, {
        preloading: {
          get() {
            console.error("stores.preloading is deprecated; use stores.navigating instead");
            return {
              subscribe: stores.navigating.subscribe
            };
          },
          enumerable: false
        },
        session: {
          get() {
            removed_session();
            return {};
          },
          enumerable: false
        }
      });
      return readonly_stores;
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>

<pre>${escape($page.error.message)}</pre>



${$page.error.frame ? `<pre>${escape($page.error.frame)}</pre>` : ``}
${$page.error.stack ? `<pre>${escape($page.error.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/components/error.svelte-feb11db0.js";
    imports2 = ["_app/immutable/components/error.svelte-feb11db0.js", "_app/immutable/chunks/index-851e755b.js", "_app/immutable/chunks/singletons-7ac7dec9.js", "_app/immutable/chunks/index-cde18a9a.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>Welcome to Patscenario</h1>
<p>Startseite</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file3 = "_app/immutable/components/pages/_page.svelte-cf127b2a.js";
    imports3 = ["_app/immutable/components/pages/_page.svelte-cf127b2a.js", "_app/immutable/chunks/index-851e755b.js"];
    stylesheets3 = ["_app/immutable/assets/g10-8dd097ea.css"];
    fonts3 = [];
  }
});

// node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
      }
      F.prototype = global;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers2(headers) {
          this.map = {};
          if (headers instanceof Headers2) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers2.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers2.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers2.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers2.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers2.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers2.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers2.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers2.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars3 = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars3[i] = String.fromCharCode(view[i]);
          }
          return chars3.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode2);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request2(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request2) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers2(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers2(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request2.prototype.clone = function() {
          return new Request2(this, { body: this._bodyInit });
        };
        function decode2(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers2();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key2 = parts.shift().trim();
            if (key2) {
              var value = parts.join(":").trim();
              headers.append(key2, value);
            }
          });
          return headers;
        }
        Body.call(Request2.prototype);
        function Response2(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers2(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response2.prototype);
        Response2.prototype.clone = function() {
          return new Response2(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers2(this.headers),
            url: this.url
          });
        };
        Response2.error = function() {
          var response = new Response2(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response2.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response2(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error2 = Error(message);
            this.stack = error2.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init2) {
          return new Promise(function(resolve, reject) {
            var request = new Request2(input, init2);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response2(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers2;
          self2.Request = Request2;
          self2.Response = Response2;
        }
        exports2.Headers = Headers2;
        exports2.Request = Request2;
        exports2.Response = Response2;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@supabase/functions-js/dist/module/helper.js
var __awaiter, resolveFetch;
var init_helper = __esm({
  "node_modules/@supabase/functions-js/dist/module/helper.js"() {
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/types.js
var FunctionsError, FunctionsFetchError, FunctionsRelayError, FunctionsHttpError;
var init_types = __esm({
  "node_modules/@supabase/functions-js/dist/module/types.js"() {
    FunctionsError = class extends Error {
      constructor(message, name = "FunctionsError", context) {
        super(message);
        super.name = name;
        this.context = context;
      }
    };
    FunctionsFetchError = class extends FunctionsError {
      constructor(context) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
      }
    };
    FunctionsRelayError = class extends FunctionsError {
      constructor(context) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
      }
    };
    FunctionsHttpError = class extends FunctionsError {
      constructor(context) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
      }
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter2, FunctionsClient;
var init_FunctionsClient = __esm({
  "node_modules/@supabase/functions-js/dist/module/FunctionsClient.js"() {
    init_helper();
    init_types();
    __awaiter2 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FunctionsClient = class {
      constructor(url, { headers = {}, customFetch } = {}) {
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch(customFetch);
      }
      setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
      }
      invoke(functionName, invokeOptions = {}) {
        var _a;
        return __awaiter2(this, void 0, void 0, function* () {
          try {
            const { headers, body: functionArgs } = invokeOptions;
            let _headers = {};
            let body;
            if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
              if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                _headers["Content-Type"] = "application/octet-stream";
                body = functionArgs;
              } else if (typeof functionArgs === "string") {
                _headers["Content-Type"] = "text/plain";
                body = functionArgs;
              } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                body = functionArgs;
              } else {
                _headers["Content-Type"] = "application/json";
                body = JSON.stringify(functionArgs);
              }
            }
            const response = yield this.fetch(`${this.url}/${functionName}`, {
              method: "POST",
              headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
              body
            }).catch((fetchError) => {
              throw new FunctionsFetchError(fetchError);
            });
            const isRelayError = response.headers.get("x-relay-error");
            if (isRelayError && isRelayError === "true") {
              throw new FunctionsRelayError(response);
            }
            if (!response.ok) {
              throw new FunctionsHttpError(response);
            }
            let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
            let data;
            if (responseType === "application/json") {
              data = yield response.json();
            } else if (responseType === "application/octet-stream") {
              data = yield response.blob();
            } else if (responseType === "multipart/form-data") {
              data = yield response.formData();
            } else {
              data = yield response.text();
            }
            return { data, error: null };
          } catch (error2) {
            return { data: null, error: error2 };
          }
        });
      }
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/index.js
var init_module = __esm({
  "node_modules/@supabase/functions-js/dist/module/index.js"() {
    init_FunctionsClient();
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js
var import_cross_fetch, __awaiter3, PostgrestBuilder;
var init_PostgrestBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"() {
    import_cross_fetch = __toESM(require_browser_ponyfill());
    __awaiter3 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    PostgrestBuilder = class {
      constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.allowEmpty = builder.allowEmpty;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = import_cross_fetch.default;
        } else {
          this.fetch = fetch;
        }
      }
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers["Accept-Profile"] = this.schema;
        } else {
          this.headers["Content-Profile"] = this.schema;
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers["Content-Type"] = "application/json";
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then((res2) => __awaiter3(this, void 0, void 0, function* () {
          var _a, _b, _c;
          let error2 = null;
          let data = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body = yield res2.text();
              if (body === "") {
              } else if (this.headers["Accept"] === "text/csv") {
                data = body;
              } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                data = body;
              } else {
                data = JSON.parse(body);
              }
            }
            const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
            const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
          } else {
            const body = yield res2.text();
            try {
              error2 = JSON.parse(body);
            } catch (_d) {
              error2 = {
                message: body
              };
            }
            if (error2 && this.allowEmpty && ((_c = error2 === null || error2 === void 0 ? void 0 : error2.details) === null || _c === void 0 ? void 0 : _c.includes("Results contain 0 rows"))) {
              error2 = null;
              status = 200;
              statusText = "OK";
            }
            if (error2 && this.shouldThrowOnError) {
              throw error2;
            }
          }
          const postgrestResponse = {
            error: error2,
            data,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        }));
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => ({
            error: {
              message: `FetchError: ${fetchError.message}`,
              details: "",
              hint: "",
              code: fetchError.code || ""
            },
            data: null,
            count: null,
            status: 0,
            statusText: ""
          }));
        }
        return res.then(onfulfilled, onrejected);
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js
var PostgrestTransformBuilder;
var init_PostgrestTransformBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js"() {
    init_PostgrestBuilder();
    PostgrestTransformBuilder = class extends PostgrestBuilder {
      select(columns) {
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) {
          this.headers["Prefer"] += ",";
        }
        this.headers["Prefer"] += "return=representation";
        return this;
      }
      order(column, { ascending = true, nullsFirst, foreignTable } = {}) {
        const key2 = foreignTable ? `${foreignTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key2);
        this.url.searchParams.set(key2, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      limit(count, { foreignTable } = {}) {
        const key2 = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(key2, `${count}`);
        return this;
      }
      range(from, to, { foreignTable } = {}) {
        const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
        const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
      }
      maybeSingle() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        this.allowEmpty = true;
        return this;
      }
      csv() {
        this.headers["Accept"] = "text/csv";
        return this;
      }
      geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
      }
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        const options = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = this.headers["Accept"];
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
        if (format === "json")
          return this;
        else
          return this;
      }
      rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
          this.headers["Prefer"] += ",tx=rollback";
        } else {
          this.headers["Prefer"] = "tx=rollback";
        }
        return this;
      }
      returns() {
        return this;
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js
var PostgrestFilterBuilder;
var init_PostgrestFilterBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js"() {
    init_PostgrestTransformBuilder();
    PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      like(column, pattern2) {
        this.url.searchParams.append(column, `like.${pattern2}`);
        return this;
      }
      ilike(column, pattern2) {
        this.url.searchParams.append(column, `ilike.${pattern2}`);
        return this;
      }
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      in(column, values) {
        const cleanedValues = values.map((s2) => {
          if (typeof s2 === "string" && new RegExp("[,()]").test(s2))
            return `"${s2}"`;
          else
            return `${s2}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      or(filters, { foreignTable } = {}) {
        const key2 = foreignTable ? `${foreignTable}.or` : "or";
        this.url.searchParams.append(key2, `(${filters})`);
        return this;
      }
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js
var PostgrestQueryBuilder;
var init_PostgrestQueryBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js"() {
    init_PostgrestFilterBuilder();
    PostgrestQueryBuilder = class {
      constructor(url, { headers = {}, schema, fetch: fetch2 }) {
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch2;
      }
      select(columns, { head = false, count } = {}) {
        const method = head ? "HEAD" : "GET";
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      insert(values, { count } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        const body = values;
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      upsert(values, { onConflict, ignoreDuplicates = false, count } = {}) {
        const method = "POST";
        const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        const body = values;
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      update(values, { count } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        const body = values;
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      delete({ count } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/version.js
var version;
var init_version = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/version.js"() {
    version = "1.1.0";
  }
});

// node_modules/@supabase/postgrest-js/dist/module/constants.js
var DEFAULT_HEADERS;
var init_constants = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/constants.js"() {
    init_version();
    DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version}` };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
var PostgrestClient;
var init_PostgrestClient = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js"() {
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_constants();
    PostgrestClient = class {
      constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.schema = schema;
        this.fetch = fetch2;
      }
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder(url, {
          headers: Object.assign({}, this.headers),
          schema: this.schema,
          fetch: this.fetch
        });
      }
      rpc(fn, args = {}, { head = false, count } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head) {
          method = "HEAD";
          Object.entries(args).forEach(([name, value]) => {
            url.searchParams.append(name, `${value}`);
          });
        } else {
          method = "POST";
          body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) {
          headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url,
          headers,
          schema: this.schema,
          body,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/index.js
var init_module2 = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/index.js"() {
    init_PostgrestClient();
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_PostgrestTransformBuilder();
    init_PostgrestBuilder();
  }
});

// node_modules/es5-ext/global.js
var require_global = __commonJS({
  "node_modules/es5-ext/global.js"(exports, module) {
    var naiveFallback = function() {
      if (typeof self === "object" && self)
        return self;
      if (typeof window === "object" && window)
        return window;
      throw new Error("Unable to resolve global `this`");
    };
    module.exports = function() {
      if (this)
        return this;
      if (typeof globalThis === "object" && globalThis)
        return globalThis;
      try {
        Object.defineProperty(Object.prototype, "__global__", {
          get: function() {
            return this;
          },
          configurable: true
        });
      } catch (error2) {
        return naiveFallback();
      }
      try {
        if (!__global__)
          return naiveFallback();
        return __global__;
      } finally {
        delete Object.prototype.__global__;
      }
    }();
  }
});

// node_modules/websocket/package.json
var require_package = __commonJS({
  "node_modules/websocket/package.json"(exports, module) {
    module.exports = {
      name: "websocket",
      description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
      keywords: [
        "websocket",
        "websockets",
        "socket",
        "networking",
        "comet",
        "push",
        "RFC-6455",
        "realtime",
        "server",
        "client"
      ],
      author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
      contributors: [
        "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
      ],
      version: "1.0.34",
      repository: {
        type: "git",
        url: "https://github.com/theturtle32/WebSocket-Node.git"
      },
      homepage: "https://github.com/theturtle32/WebSocket-Node",
      engines: {
        node: ">=4.0.0"
      },
      dependencies: {
        bufferutil: "^4.0.1",
        debug: "^2.2.0",
        "es5-ext": "^0.10.50",
        "typedarray-to-buffer": "^3.1.5",
        "utf-8-validate": "^5.0.2",
        yaeti: "^0.0.6"
      },
      devDependencies: {
        "buffer-equal": "^1.0.0",
        gulp: "^4.0.2",
        "gulp-jshint": "^2.0.4",
        "jshint-stylish": "^2.2.1",
        jshint: "^2.0.0",
        tape: "^4.9.1"
      },
      config: {
        verbose: false
      },
      scripts: {
        test: "tape test/unit/*.js",
        gulp: "gulp"
      },
      main: "index",
      directories: {
        lib: "./lib"
      },
      browser: "lib/browser.js",
      license: "Apache-2.0"
    };
  }
});

// node_modules/websocket/lib/version.js
var require_version = __commonJS({
  "node_modules/websocket/lib/version.js"(exports, module) {
    module.exports = require_package().version;
  }
});

// node_modules/websocket/lib/browser.js
var require_browser = __commonJS({
  "node_modules/websocket/lib/browser.js"(exports, module) {
    var _globalThis;
    if (typeof globalThis === "object") {
      _globalThis = globalThis;
    } else {
      try {
        _globalThis = require_global();
      } catch (error2) {
      } finally {
        if (!_globalThis && typeof window !== "undefined") {
          _globalThis = window;
        }
        if (!_globalThis) {
          throw new Error("Could not determine global this");
        }
      }
    }
    var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
    var websocket_version = require_version();
    function W3CWebSocket(uri, protocols) {
      var native_instance;
      if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
      } else {
        native_instance = new NativeWebSocket(uri);
      }
      return native_instance;
    }
    if (NativeWebSocket) {
      ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
        Object.defineProperty(W3CWebSocket, prop, {
          get: function() {
            return NativeWebSocket[prop];
          }
        });
      });
    }
    module.exports = {
      "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
      "version": websocket_version
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version2;
var init_version2 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/version.js"() {
    version2 = "2.1.0";
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS2, VSN, DEFAULT_TIMEOUT, WS_CLOSE_NORMAL, SOCKET_STATES, CHANNEL_STATES, CHANNEL_EVENTS, TRANSPORTS, CONNECTION_STATE;
var init_constants2 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/constants.js"() {
    init_version2();
    DEFAULT_HEADERS2 = { "X-Client-Info": `realtime-js/${version2}` };
    VSN = "1.0.0";
    DEFAULT_TIMEOUT = 1e4;
    WS_CLOSE_NORMAL = 1e3;
    (function(SOCKET_STATES2) {
      SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
      SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
      SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
      SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
    })(SOCKET_STATES || (SOCKET_STATES = {}));
    (function(CHANNEL_STATES2) {
      CHANNEL_STATES2["closed"] = "closed";
      CHANNEL_STATES2["errored"] = "errored";
      CHANNEL_STATES2["joined"] = "joined";
      CHANNEL_STATES2["joining"] = "joining";
      CHANNEL_STATES2["leaving"] = "leaving";
    })(CHANNEL_STATES || (CHANNEL_STATES = {}));
    (function(CHANNEL_EVENTS2) {
      CHANNEL_EVENTS2["close"] = "phx_close";
      CHANNEL_EVENTS2["error"] = "phx_error";
      CHANNEL_EVENTS2["join"] = "phx_join";
      CHANNEL_EVENTS2["reply"] = "phx_reply";
      CHANNEL_EVENTS2["leave"] = "phx_leave";
      CHANNEL_EVENTS2["access_token"] = "access_token";
    })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
    (function(TRANSPORTS2) {
      TRANSPORTS2["websocket"] = "websocket";
    })(TRANSPORTS || (TRANSPORTS = {}));
    (function(CONNECTION_STATE2) {
      CONNECTION_STATE2["Connecting"] = "connecting";
      CONNECTION_STATE2["Open"] = "open";
      CONNECTION_STATE2["Closing"] = "closing";
      CONNECTION_STATE2["Closed"] = "closed";
    })(CONNECTION_STATE || (CONNECTION_STATE = {}));
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
var Timer;
var init_timer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/timer.js"() {
    Timer = class {
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
      }
      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      }
      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer;
var init_serializer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/serializer.js"() {
    Serializer = class {
      constructor() {
        this.HEADER_LENGTH = 1;
      }
      decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
          return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
          return callback(JSON.parse(rawPayload));
        }
        return callback({});
      }
      _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
      }
      _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic, event, payload: data };
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push;
var init_push = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/push.js"() {
    init_constants2();
    Push = class {
      constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = void 0;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
        this.rateLimited = false;
      }
      resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }
      send() {
        if (this._hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        const status = this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref,
          join_ref: this.channel._joinRef()
        });
        if (status === "rate limited") {
          this.rateLimited = true;
        }
      }
      updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
      }
      receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
          callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
      }
      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
          this._cancelRefEvent();
          this._cancelTimeout();
          this.receivedResp = payload;
          this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      trigger(status, response) {
        if (this.refEvent)
          this.channel._trigger(this.refEvent, { status, response });
      }
      destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
      }
      _cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = void 0;
      }
      _matchReceive({ status, response }) {
        this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
      }
      _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS, RealtimePresence;
var init_RealtimePresence = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"() {
    (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
      REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
      REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
      REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
    })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
    RealtimePresence = class {
      constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
          onJoin: () => {
          },
          onLeave: () => {
          },
          onSync: () => {
          }
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState) => {
          const { onJoin, onLeave, onSync } = this.caller;
          this.joinRef = this.channel._joinRef();
          this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
          this.pendingDiffs.forEach((diff) => {
            this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          });
          this.pendingDiffs = [];
          onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
          const { onJoin, onLeave, onSync } = this.caller;
          if (this.inPendingSyncState()) {
            this.pendingDiffs.push(diff);
          } else {
            this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            onSync();
          }
        });
        this.onJoin((key2, currentPresences, newPresences) => {
          this.channel._trigger("presence", {
            event: "join",
            key: key2,
            currentPresences,
            newPresences
          });
        });
        this.onLeave((key2, currentPresences, leftPresences) => {
          this.channel._trigger("presence", {
            event: "leave",
            key: key2,
            currentPresences,
            leftPresences
          });
        });
        this.onSync(() => {
          this.channel._trigger("presence", { event: "sync" });
        });
      }
      static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key2, presences) => {
          if (!transformedState[key2]) {
            leaves[key2] = presences;
          }
        });
        this.map(transformedState, (key2, newPresences) => {
          const currentPresences = state[key2];
          if (currentPresences) {
            const newPresenceRefs = newPresences.map((m) => m.presence_ref);
            const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
            const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
            const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
            if (joinedPresences.length > 0) {
              joins[key2] = joinedPresences;
            }
            if (leftPresences.length > 0) {
              leaves[key2] = leftPresences;
            }
          } else {
            joins[key2] = newPresences;
          }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
      }
      static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
          joins: this.transformState(diff.joins),
          leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
          onJoin = () => {
          };
        }
        if (!onLeave) {
          onLeave = () => {
          };
        }
        this.map(joins, (key2, newPresences) => {
          var _a;
          const currentPresences = (_a = state[key2]) !== null && _a !== void 0 ? _a : [];
          state[key2] = this.cloneDeep(newPresences);
          if (currentPresences.length > 0) {
            const joinedPresenceRefs = state[key2].map((m) => m.presence_ref);
            const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
            state[key2].unshift(...curPresences);
          }
          onJoin(key2, currentPresences, newPresences);
        });
        this.map(leaves, (key2, leftPresences) => {
          let currentPresences = state[key2];
          if (!currentPresences)
            return;
          const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
          currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
          state[key2] = currentPresences;
          onLeave(key2, currentPresences, leftPresences);
          if (currentPresences.length === 0)
            delete state[key2];
        });
        return state;
      }
      static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key2) => func(key2, obj[key2]));
      }
      static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key2) => {
          const presences = state[key2];
          if ("metas" in presences) {
            newState[key2] = presences.metas.map((presence) => {
              presence["presence_ref"] = presence["phx_ref"];
              delete presence["phx_ref"];
              delete presence["phx_ref_prev"];
              return presence;
            });
          } else {
            newState[key2] = presences;
          }
          return newState;
        }, {});
      }
      static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
      onJoin(callback) {
        this.caller.onJoin = callback;
      }
      onLeave(callback) {
        this.caller.onLeave = callback;
      }
      onSync(callback) {
        this.caller.onSync = callback;
      }
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes, convertChangeData, convertColumn, convertCell, noop2, toBoolean, toNumber, toJson, toArray, toTimestampString;
var init_transformers = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"() {
    (function(PostgresTypes2) {
      PostgresTypes2["abstime"] = "abstime";
      PostgresTypes2["bool"] = "bool";
      PostgresTypes2["date"] = "date";
      PostgresTypes2["daterange"] = "daterange";
      PostgresTypes2["float4"] = "float4";
      PostgresTypes2["float8"] = "float8";
      PostgresTypes2["int2"] = "int2";
      PostgresTypes2["int4"] = "int4";
      PostgresTypes2["int4range"] = "int4range";
      PostgresTypes2["int8"] = "int8";
      PostgresTypes2["int8range"] = "int8range";
      PostgresTypes2["json"] = "json";
      PostgresTypes2["jsonb"] = "jsonb";
      PostgresTypes2["money"] = "money";
      PostgresTypes2["numeric"] = "numeric";
      PostgresTypes2["oid"] = "oid";
      PostgresTypes2["reltime"] = "reltime";
      PostgresTypes2["text"] = "text";
      PostgresTypes2["time"] = "time";
      PostgresTypes2["timestamp"] = "timestamp";
      PostgresTypes2["timestamptz"] = "timestamptz";
      PostgresTypes2["timetz"] = "timetz";
      PostgresTypes2["tsrange"] = "tsrange";
      PostgresTypes2["tstzrange"] = "tstzrange";
    })(PostgresTypes || (PostgresTypes = {}));
    convertChangeData = (columns, record, options = {}) => {
      var _a;
      const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
      return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
      }, {});
    };
    convertColumn = (columnName, columns, record, skipTypes) => {
      const column = columns.find((x) => x.name === columnName);
      const colType = column === null || column === void 0 ? void 0 : column.type;
      const value = record[columnName];
      if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
      }
      return noop2(value);
    };
    convertCell = (type, value) => {
      if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
      }
      switch (type) {
        case PostgresTypes.bool:
          return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
          return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
          return toJson(value);
        case PostgresTypes.timestamp:
          return toTimestampString(value);
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
          return noop2(value);
        default:
          return noop2(value);
      }
    };
    noop2 = (value) => {
      return value;
    };
    toBoolean = (value) => {
      switch (value) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return value;
      }
    };
    toNumber = (value) => {
      if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
          return parsedValue;
        }
      }
      return value;
    };
    toJson = (value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (error2) {
          console.log(`JSON parse error: ${error2}`);
          return value;
        }
      }
      return value;
    };
    toArray = (value, type) => {
      if (typeof value !== "string") {
        return value;
      }
      const lastIdx = value.length - 1;
      const closeBrace = value[lastIdx];
      const openBrace = value[0];
      if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        try {
          arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
          arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val) => convertCell(type, val));
      }
      return value;
    };
    toTimestampString = (value) => {
      if (typeof value === "string") {
        return value.replace(" ", "T");
      }
      return value;
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var __awaiter4, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, RealtimeChannel;
var init_RealtimeChannel = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"() {
    init_constants2();
    init_push();
    init_timer();
    init_RealtimePresence();
    init_transformers();
    __awaiter4 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
    })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
    (function(REALTIME_LISTEN_TYPES2) {
      REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
      REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
      REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
    })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
    (function(REALTIME_SUBSCRIBE_STATES2) {
      REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
      REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
      REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
      REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
    })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
    RealtimeChannel = class {
      constructor(topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.params.config = Object.assign({
          broadcast: { ack: false, self: false },
          presence: { key: "" }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach((pushEvent) => pushEvent.send());
          this.pushBuffer = [];
        });
        this._onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket._remove(this);
        });
        this._onError((reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this._isJoining()) {
            return;
          }
          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
          this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
      }
      subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (this.joinedOnce) {
          throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        } else {
          const { config: { broadcast, presence } } = this.params;
          this._onError((e) => callback && callback("CHANNEL_ERROR", e));
          this._onClose(() => callback && callback("CLOSED"));
          const accessTokenPayload = {};
          const config = {
            broadcast,
            presence,
            postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : []
          };
          if (this.socket.accessToken) {
            accessTokenPayload.access_token = this.socket.accessToken;
          }
          this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
          this.joinedOnce = true;
          this._rejoin(timeout);
          this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
            var _a2;
            this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
            if (serverPostgresFilters === void 0) {
              callback && callback("SUBSCRIBED");
              return;
            } else {
              const clientPostgresBindings = this.bindings.postgres_changes;
              const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
              const newPostgresBindings = [];
              for (let i = 0; i < bindingsLen; i++) {
                const clientPostgresBinding = clientPostgresBindings[i];
                const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
                if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                  newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                } else {
                  this.unsubscribe();
                  callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                  return;
                }
              }
              this.bindings.postgres_changes = newPostgresBindings;
              callback && callback("SUBSCRIBED");
              return;
            }
          }).receive("error", (error2) => {
            callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error2).join(", ") || "error")));
            return;
          }).receive("timeout", () => {
            callback && callback("TIMED_OUT");
            return;
          });
        }
        return this;
      }
      presenceState() {
        return this.presence.state;
      }
      track(payload, opts = {}) {
        return __awaiter4(this, void 0, void 0, function* () {
          return yield this.send({
            type: "presence",
            event: "track",
            payload
          }, opts.timeout || this.timeout);
        });
      }
      untrack(opts = {}) {
        return __awaiter4(this, void 0, void 0, function* () {
          return yield this.send({
            type: "presence",
            event: "untrack"
          }, opts);
        });
      }
      on(type, filter, callback) {
        return this._on(type, filter, callback);
      }
      send(payload, opts = {}) {
        return new Promise((resolve) => {
          var _a, _b, _c;
          const push = this._push(payload.type, payload, opts.timeout || this.timeout);
          if (push.rateLimited) {
            resolve("rate limited");
          }
          if (payload.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
            resolve("ok");
          }
          push.receive("ok", () => resolve("ok"));
          push.receive("timeout", () => resolve("timed out"));
        });
      }
      updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
      }
      unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = () => {
          this.socket.log("channel", `leave ${this.topic}`);
          this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        return new Promise((resolve) => {
          const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
          leavePush.receive("ok", () => {
            onClose();
            resolve("ok");
          }).receive("timeout", () => {
            onClose();
            resolve("timed out");
          }).receive("error", () => {
            resolve("error");
          });
          leavePush.send();
          if (!this._canPush()) {
            leavePush.trigger("ok", {});
          }
        });
      }
      _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
      }
      _onMessage(_event, payload, _ref) {
        return payload;
      }
      _isMember(topic) {
        return this.topic === topic;
      }
      _joinRef() {
        return this.joinPush.ref;
      }
      _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error: error2, leave, join } = CHANNEL_EVENTS;
        const events = [close, error2, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
          return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if (["insert", "update", "delete"].includes(typeLower)) {
          (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
            var _a2, _b2, _c;
            return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
          }).map((bind) => bind.callback(handledPayload, ref));
        } else {
          (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
            var _a2, _b2, _c, _d, _e, _f;
            if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
              if ("id" in bind) {
                const bindId = bind.id;
                const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
                return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
              } else {
                const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
              }
            } else {
              return bind.type.toLocaleLowerCase() === typeLower;
            }
          }).map((bind) => {
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
              const postgresChanges = handledPayload.data;
              const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
              const enrichedPayload = {
                schema,
                table,
                commit_timestamp,
                eventType: type2,
                new: {},
                old: {},
                errors
              };
              handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
          });
        }
      }
      _isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
      _isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
      _isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
      _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
      _replyEventName(ref) {
        return `chan_reply_${ref}`;
      }
      _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
          type: typeLower,
          filter,
          callback
        };
        if (this.bindings[typeLower]) {
          this.bindings[typeLower].push(binding);
        } else {
          this.bindings[typeLower] = [binding];
        }
        return this;
      }
      _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
          var _a;
          return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
      }
      static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        for (const k in obj1) {
          if (obj1[k] !== obj2[k]) {
            return false;
          }
        }
        return true;
      }
      _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
          this._rejoin();
        }
      }
      _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
      }
      _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
      }
      _canPush() {
        return this.socket.isConnected() && this._isJoined();
      }
      _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
          return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
      _getPayloadRecords(payload) {
        const records = {
          new: {},
          old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
          records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
          records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var import_websocket, __awaiter5, noop3, RealtimeClient;
var init_RealtimeClient = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js"() {
    import_websocket = __toESM(require_browser());
    init_constants2();
    init_timer();
    init_serializer();
    init_RealtimeChannel();
    __awaiter5 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    noop3 = () => {
    };
    RealtimeClient = class {
      constructor(endPoint, options) {
        var _a;
        this.accessToken = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = DEFAULT_HEADERS2;
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.transport = import_websocket.w3cwebsocket;
        this.heartbeatIntervalMs = 3e4;
        this.heartbeatTimer = void 0;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop3;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this.eventsPerSecondLimitMs = 100;
        this.inThrottle = false;
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        if (options === null || options === void 0 ? void 0 : options.params)
          this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers)
          this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout)
          this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger)
          this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.transport)
          this.transport = options.transport;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
          this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        const eventsPerSecond = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
        if (eventsPerSecond)
          this.eventsPerSecondLimitMs = Math.floor(1e3 / eventsPerSecond);
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries) => {
          return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
        };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new Timer(() => __awaiter5(this, void 0, void 0, function* () {
          this.disconnect();
          this.connect();
        }), this.reconnectAfterMs);
      }
      connect() {
        if (this.conn) {
          return;
        }
        this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
        if (this.conn) {
          this.conn.binaryType = "arraybuffer";
          this.conn.onopen = () => this._onConnOpen();
          this.conn.onerror = (error2) => this._onConnError(error2);
          this.conn.onmessage = (event) => this._onConnMessage(event);
          this.conn.onclose = (event) => this._onConnClose(event);
        }
      }
      disconnect(code, reason) {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
      }
      getChannels() {
        return this.channels;
      }
      removeChannel(channel) {
        return channel.unsubscribe().then((status) => {
          if (this.channels.length === 0) {
            this.disconnect();
          }
          return status;
        });
      }
      removeAllChannels() {
        return Promise.all(this.channels.map((channel) => channel.unsubscribe())).then((values) => {
          this.disconnect();
          return values;
        });
      }
      log(kind, msg, data) {
        this.logger(kind, msg, data);
      }
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return CONNECTION_STATE.Connecting;
          case SOCKET_STATES.open:
            return CONNECTION_STATE.Open;
          case SOCKET_STATES.closing:
            return CONNECTION_STATE.Closing;
          default:
            return CONNECTION_STATE.Closed;
        }
      }
      isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
      }
      channel(topic, params = { config: {} }) {
        if (!this.isConnected()) {
          this.connect();
        }
        const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
      }
      push(data) {
        const { topic, event, payload, ref } = data;
        let callback = () => {
          this.encode(data, (result) => {
            var _a;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
          });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
          if (["broadcast", "presence", "postgres_changes"].includes(event)) {
            const isThrottled = this._throttle(callback)();
            if (isThrottled) {
              return "rate limited";
            }
          } else {
            callback();
          }
        } else {
          this.sendBuffer.push(callback);
        }
      }
      setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel) => {
          token && channel.updateJoinPayload({ access_token: token });
          if (channel.joinedOnce && channel._isJoined()) {
            channel._push(CHANNEL_EVENTS.access_token, { access_token: token });
          }
        });
      }
      _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
      _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
          this.log("transport", `leaving duplicate topic "${topic}"`);
          dupChannel.unsubscribe();
        }
      }
      _remove(channel) {
        this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
      }
      _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
      }
      _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
          let { topic, event, payload, ref } = msg;
          if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
            this.pendingHeartbeatRef = null;
          }
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
          this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
          this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
      }
      _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback) => callback());
      }
      _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
      }
      _onConnError(error2) {
        this.log("transport", error2.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error2));
      }
      _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
      }
      _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        const prefix2 = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix2}${query}`;
      }
      _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach((callback) => callback());
          this.sendBuffer = [];
        }
      }
      _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
          return;
        }
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
          return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
      }
      _throttle(callback, eventsPerSecondLimit = this.eventsPerSecondLimitMs) {
        return () => {
          if (this.inThrottle)
            return true;
          callback();
          this.inThrottle = true;
          setTimeout(() => {
            this.inThrottle = false;
          }, eventsPerSecondLimit);
          return false;
        };
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/index.js
var init_module3 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/index.js"() {
    init_RealtimeClient();
    init_RealtimeChannel();
    init_RealtimePresence();
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/errors.js
function isStorageError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isStorageError" in error2;
}
var StorageError, StorageApiError, StorageUnknownError;
var init_errors = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/errors.js"() {
    StorageError = class extends Error {
      constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
      }
    };
    StorageApiError = class extends StorageError {
      constructor(message, status) {
        super(message);
        this.name = "StorageApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    StorageUnknownError = class extends StorageError {
      constructor(message, originalError) {
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var __awaiter6, resolveFetch2, resolveResponse;
var init_helpers = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/helpers.js"() {
    __awaiter6 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch2 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter6(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveResponse = () => __awaiter6(void 0, void 0, void 0, function* () {
      if (typeof Response === "undefined") {
        return (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).Response;
      }
      return Response;
    });
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter7(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error2) => handleError(error2, reject));
    });
  });
}
function get(fetcher, url, options, parameters) {
  return __awaiter7(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options, parameters);
  });
}
function post(fetcher, url, body, options, parameters) {
  return __awaiter7(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options, parameters, body);
  });
}
function put(fetcher, url, body, options, parameters) {
  return __awaiter7(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options, parameters, body);
  });
}
function remove(fetcher, url, body, options, parameters) {
  return __awaiter7(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
  });
}
var __awaiter7, _getErrorMessage, handleError, _getRequestParams;
var init_fetch = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/fetch.js"() {
    init_errors();
    init_helpers();
    __awaiter7 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError = (error2, reject) => __awaiter7(void 0, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error2 instanceof Res) {
        error2.json().then((err) => {
          reject(new StorageApiError(_getErrorMessage(err), error2.status || 500));
        });
      } else {
        reject(new StorageUnknownError(_getErrorMessage(error2), error2));
      }
    });
    _getRequestParams = (method, options, parameters, body) => {
      const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
      params.body = JSON.stringify(body);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter8, DEFAULT_SEARCH_OPTIONS, DEFAULT_FILE_OPTIONS, StorageFileApi;
var init_StorageFileApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js"() {
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter8 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_SEARCH_OPTIONS = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    };
    DEFAULT_FILE_OPTIONS = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: false
    };
    StorageFileApi = class {
      constructor(url, headers = {}, bucketId, fetch2) {
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = resolveFetch2(fetch2);
      }
      uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            let body;
            const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
            const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body = new FormData();
              body.append("cacheControl", options.cacheControl);
              body.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body = fileBody;
              body.append("cacheControl", options.cacheControl);
            } else {
              body = fileBody;
              headers["cache-control"] = `max-age=${options.cacheControl}`;
              headers["content-type"] = options.contentType;
            }
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const res = yield this.fetch(`${this.url}/object/${_path}`, {
              method,
              body,
              headers
            });
            if (res.ok) {
              return {
                data: { path: cleanPath },
                error: null
              };
            } else {
              const error2 = yield res.json();
              return { data: null, error: error2 };
            }
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      upload(path, fileBody, fileOptions) {
        return __awaiter8(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
      }
      update(path, fileBody, fileOptions) {
        return __awaiter8(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
      }
      move(fromPath, toPath) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      copy(fromPath, toPath) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data: { path: data.Key }, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      createSignedUrl(path, expiresIn, options) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const _path = this._getFinalPath(path);
            let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, { expiresIn }, { headers: this.headers });
            const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
            const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
            data = { signedUrl };
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      createSignedUrls(paths, expiresIn, options) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
            const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
            return {
              data: data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
              error: null
            };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      download(path) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const _path = this._getFinalPath(path);
            const res = yield get(this.fetch, `${this.url}/object/${_path}`, {
              headers: this.headers,
              noResolveJson: true
            });
            const data = yield res.blob();
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `?download=${options.download === true ? "" : options.download}` : "";
        return {
          data: { publicUrl: encodeURI(`${this.url}/object/public/${_path}${downloadQueryParam}`) }
        };
      }
      remove(paths) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      list(path, options, parameters) {
        return __awaiter8(this, void 0, void 0, function* () {
          try {
            const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
            const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
      }
      _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/version.js
var version3;
var init_version3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/version.js"() {
    version3 = "2.0.0";
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS3;
var init_constants3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/constants.js"() {
    init_version3();
    DEFAULT_HEADERS3 = { "X-Client-Info": `storage-js/${version3}` };
  }
});

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter9, StorageBucketApi;
var init_StorageBucketApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"() {
    init_constants3();
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter9 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    StorageBucketApi = class {
      constructor(url, headers = {}, fetch2) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS3), headers);
        this.fetch = resolveFetch2(fetch2);
      }
      listBuckets() {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      getBucket(id) {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield get(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      createBucket(id, options = { public: false }) {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket`, { id, name: id, public: options.public }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      updateBucket(id, options) {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield put(this.fetch, `${this.url}/bucket/${id}`, { id, name: id, public: options.public }, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      emptyBucket(id) {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      deleteBucket(id) {
        return __awaiter9(this, void 0, void 0, function* () {
          try {
            const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
            return { data, error: null };
          } catch (error2) {
            if (isStorageError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient;
var init_StorageClient = __esm({
  "node_modules/@supabase/storage-js/dist/module/StorageClient.js"() {
    init_StorageFileApi();
    init_StorageBucketApi();
    StorageClient = class extends StorageBucketApi {
      constructor(url, headers = {}, fetch2) {
        super(url, headers, fetch2);
      }
      from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/types.js
var init_types2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/types.js"() {
  }
});

// node_modules/@supabase/storage-js/dist/module/index.js
var init_module4 = __esm({
  "node_modules/@supabase/storage-js/dist/module/index.js"() {
    init_StorageClient();
    init_types2();
    init_errors();
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
var version4;
var init_version4 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/version.js"() {
    version4 = "2.1.2";
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var DEFAULT_HEADERS4;
var init_constants4 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/constants.js"() {
    init_version4();
    DEFAULT_HEADERS4 = { "X-Client-Info": `supabase-js/${version4}` };
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var import_cross_fetch2, __awaiter10, resolveFetch3, resolveHeadersConstructor, fetchWithAuth;
var init_fetch2 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/fetch.js"() {
    import_cross_fetch2 = __toESM(require_browser_ponyfill());
    __awaiter10 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch3 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = import_cross_fetch2.default;
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveHeadersConstructor = () => {
      if (typeof Headers === "undefined") {
        return import_cross_fetch2.Headers;
      }
      return Headers;
    };
    fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
      const fetch2 = resolveFetch3(customFetch);
      const HeadersConstructor = resolveHeadersConstructor();
      return (input, init2) => __awaiter10(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers = new HeadersConstructor(init2 === null || init2 === void 0 ? void 0 : init2.headers);
        if (!headers.has("apikey")) {
          headers.set("apikey", supabaseKey);
        }
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return fetch2(input, Object.assign(Object.assign({}, init2), { headers }));
      });
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
function applySettingDefaults(options, defaults) {
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions)
  };
}
var init_helpers2 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/helpers.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function getParameterByName(name, url) {
  var _a;
  if (!url)
    url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function decodeJWTPayload(token) {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT is not valid: not a JWT structure");
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error("JWT is not valid: payload is not in base64url format");
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
var __awaiter11, isBrowser, resolveFetch4, looksLikeFetchResponse, setItemAsync, getItemAsync, removeItemAsync, decodeBase64URL, Deferred;
var init_helpers3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"() {
    __awaiter11 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    isBrowser = () => typeof window !== "undefined";
    resolveFetch4 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => __awaiter11(void 0, void 0, void 0, function* () {
          return yield (yield Promise.resolve().then(() => __toESM(require_browser_ponyfill()))).fetch(...args);
        });
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    looksLikeFetchResponse = (maybeResponse) => {
      return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
    };
    setItemAsync = (storage, key2, data) => __awaiter11(void 0, void 0, void 0, function* () {
      yield storage.setItem(key2, JSON.stringify(data));
    });
    getItemAsync = (storage, key2) => __awaiter11(void 0, void 0, void 0, function* () {
      const value = yield storage.getItem(key2);
      if (!value) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (_a) {
        return value;
      }
    });
    removeItemAsync = (storage, key2) => __awaiter11(void 0, void 0, void 0, function* () {
      yield storage.removeItem(key2);
    });
    decodeBase64URL = (value) => {
      try {
        return decodeURIComponent(atob(value.replace(/[-]/g, "+").replace(/[_]/g, "/")).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      } catch (e) {
        if (e instanceof ReferenceError) {
          return Buffer.from(value, "base64").toString("utf-8");
        } else {
          throw e;
        }
      }
    };
    Deferred = class {
      constructor() {
        ;
        this.promise = new Deferred.promiseConstructor((res, rej) => {
          ;
          this.resolve = res;
          this.reject = rej;
        });
      }
    };
    Deferred.promiseConstructor = Promise;
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/errors.js
function isAuthError(error2) {
  return typeof error2 === "object" && error2 !== null && "__isAuthError" in error2;
}
function isAuthApiError(error2) {
  return isAuthError(error2) && error2.name === "AuthApiError";
}
var AuthError, AuthApiError, AuthUnknownError, CustomAuthError, AuthSessionMissingError, AuthInvalidCredentialsError, AuthImplicitGrantRedirectError, AuthRetryableFetchError;
var init_errors2 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"() {
    AuthError = class extends Error {
      constructor(message) {
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
      }
    };
    AuthApiError = class extends AuthError {
      constructor(message, status) {
        super(message);
        this.name = "AuthApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthUnknownError = class extends AuthError {
      constructor(message, originalError) {
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
      }
    };
    CustomAuthError = class extends AuthError {
      constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthSessionMissingError = class extends CustomAuthError {
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400);
      }
    };
    AuthInvalidCredentialsError = class extends CustomAuthError {
      constructor(message) {
        super(message, "AuthInvalidCredentialsError", 400);
      }
    };
    AuthImplicitGrantRedirectError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthRetryableFetchError = class extends CustomAuthError {
      constructor(message, status) {
        super(message, "AuthRetryableFetchError", status);
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
function _request(fetcher, method, url, options) {
  var _a;
  return __awaiter12(this, void 0, void 0, function* () {
    const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
    if (options === null || options === void 0 ? void 0 : options.jwt) {
      headers["Authorization"] = `Bearer ${options.jwt}`;
    }
    const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      qs["redirect_to"] = options.redirectTo;
    }
    const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
    const data = yield _handleRequest2(fetcher, method, url + queryString, { headers, noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson }, {}, options === null || options === void 0 ? void 0 : options.body);
    return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
  });
}
function _handleRequest2(fetcher, method, url, options, parameters, body) {
  return __awaiter12(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fetcher(url, _getRequestParams2(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result.json();
      }).then((data) => resolve(data)).catch((error2) => handleError2(error2, reject));
    });
  });
}
function _sessionResponse(data) {
  var _a;
  let session = null;
  if (hasSession(data)) {
    session = Object.assign({}, data);
    session.expires_at = expiresAt(data.expires_in);
  }
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { session, user }, error: null };
}
function _userResponse(data) {
  var _a;
  const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
  return { data: { user }, error: null };
}
function _ssoResponse(data) {
  return { data, error: null };
}
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
var __awaiter12, __rest, _getErrorMessage2, handleError2, _getRequestParams2;
var init_fetch3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js"() {
    init_helpers3();
    init_errors2();
    __awaiter12 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __rest = function(s2, e) {
      var t = {};
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
          t[p] = s2[p];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
            t[p[i]] = s2[p[i]];
        }
      return t;
    };
    _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError2 = (error2, reject) => __awaiter12(void 0, void 0, void 0, function* () {
      const NETWORK_ERROR_CODES = [502, 503, 504];
      if (!looksLikeFetchResponse(error2)) {
        reject(new AuthRetryableFetchError(_getErrorMessage2(error2), 0));
      } else if (NETWORK_ERROR_CODES.includes(error2.status)) {
        reject(new AuthRetryableFetchError(_getErrorMessage2(error2), error2.status));
      } else {
        error2.json().then((err) => {
          reject(new AuthApiError(_getErrorMessage2(err), error2.status || 500));
        }).catch((e) => {
          reject(new AuthUnknownError(_getErrorMessage2(e), e));
        });
      }
    });
    _getRequestParams2 = (method, options, parameters, body) => {
      const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
      params.body = JSON.stringify(body);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js
var __awaiter13, __rest2, GoTrueAdminApi;
var init_GoTrueAdminApi = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js"() {
    init_fetch3();
    init_helpers3();
    init_errors2();
    __awaiter13 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    __rest2 = function(s2, e) {
      var t = {};
      for (var p in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
          t[p] = s2[p];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
            t[p[i]] = s2[p[i]];
        }
      return t;
    };
    GoTrueAdminApi = class {
      constructor({ url = "", headers = {}, fetch: fetch2 }) {
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch4(fetch2);
        this.mfa = {
          listFactors: this._listFactors.bind(this),
          deleteFactor: this._deleteFactor.bind(this)
        };
      }
      signOut(jwt) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            yield _request(this.fetch, "POST", `${this.url}/logout`, {
              headers: this.headers,
              jwt,
              noResolveJson: true
            });
            return { data: null, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      inviteUserByEmail(email, options = {}) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/invite`, {
              body: { email, data: options.data },
              headers: this.headers,
              redirectTo: options.redirectTo,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      generateLink(params) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { options } = params, rest = __rest2(params, ["options"]);
            const body = Object.assign(Object.assign({}, rest), options);
            if ("newEmail" in rest) {
              body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
              delete body["newEmail"];
            }
            return yield _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
              body,
              headers: this.headers,
              xform: _generateLinkResponse,
              redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return {
                data: {
                  properties: null,
                  user: null
                },
                error: error2
              };
            }
            throw error2;
          }
        });
      }
      createUser(attributes) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/admin/users`, {
              body: attributes,
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      listUsers() {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const { data, error: error2 } = yield _request(this.fetch, "GET", `${this.url}/admin/users`, {
              headers: this.headers
            });
            if (error2)
              throw error2;
            return { data: Object.assign({}, data), error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { users: [] }, error: error2 };
            }
            throw error2;
          }
        });
      }
      getUserById(uid) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      updateUserById(uid, attributes) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
              body: attributes,
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      deleteUser(id) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
              headers: this.headers,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _listFactors(params) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const data = yield _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _deleteFactor(params) {
        return __awaiter13(this, void 0, void 0, function* () {
          try {
            const data = yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
              headers: this.headers
            });
            return { data, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/version.js
var version5;
var init_version5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/version.js"() {
    version5 = "2.4.2";
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
var GOTRUE_URL, STORAGE_KEY, DEFAULT_HEADERS5, EXPIRY_MARGIN, NETWORK_FAILURE;
var init_constants5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/constants.js"() {
    init_version5();
    GOTRUE_URL = "http://localhost:9999";
    STORAGE_KEY = "supabase.auth.token";
    DEFAULT_HEADERS5 = { "X-Client-Info": `gotrue-js/${version5}` };
    EXPIRY_MARGIN = 10;
    NETWORK_FAILURE = {
      MAX_RETRIES: 10,
      RETRY_INTERVAL: 2
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js
var localStorageAdapter, local_storage_default;
var init_local_storage = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js"() {
    init_helpers3();
    localStorageAdapter = {
      getItem: (key2) => {
        if (!isBrowser()) {
          return null;
        }
        return globalThis.localStorage.getItem(key2);
      },
      setItem: (key2, value) => {
        if (!isBrowser()) {
          return;
        }
        globalThis.localStorage.setItem(key2, value);
      },
      removeItem: (key2) => {
        if (!isBrowser()) {
          return;
        }
        globalThis.localStorage.removeItem(key2);
      }
    };
    local_storage_default = localStorageAdapter;
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
var init_polyfills = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
var __awaiter14, DEFAULT_OPTIONS, GoTrueClient;
var init_GoTrueClient = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js"() {
    init_GoTrueAdminApi();
    init_constants5();
    init_errors2();
    init_fetch3();
    init_helpers3();
    init_local_storage();
    init_polyfills();
    __awaiter14 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    polyfillGlobalThis();
    DEFAULT_OPTIONS = {
      url: GOTRUE_URL,
      storageKey: STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: DEFAULT_HEADERS5
    };
    GoTrueClient = class {
      constructor(options) {
        this.stateChangeEmitters = /* @__PURE__ */ new Map();
        this.networkRetries = 0;
        this.refreshingDeferred = null;
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.inMemorySession = null;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.storage = settings.storage || local_storage_default;
        this.admin = new GoTrueAdminApi({
          url: settings.url,
          headers: settings.headers,
          fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = resolveFetch4(settings.fetch);
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.initialize();
        this.mfa = {
          verify: this._verify.bind(this),
          enroll: this._enroll.bind(this),
          unenroll: this._unenroll.bind(this),
          challenge: this._challenge.bind(this),
          listFactors: this._listFactors.bind(this),
          challengeAndVerify: this._challengeAndVerify.bind(this),
          getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
      }
      initialize() {
        if (!this.initializePromise) {
          this.initializePromise = this._initialize();
        }
        return this.initializePromise;
      }
      _initialize() {
        return __awaiter14(this, void 0, void 0, function* () {
          if (this.initializePromise) {
            return this.initializePromise;
          }
          try {
            if (this.detectSessionInUrl && this._isImplicitGrantFlow()) {
              const { data, error: error2 } = yield this._getSessionFromUrl();
              if (error2) {
                yield this._removeSession();
                return { error: error2 };
              }
              const { session, redirectType } = data;
              yield this._saveSession(session);
              this._notifyAllSubscribers("SIGNED_IN", session);
              if (redirectType === "recovery") {
                this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
              }
              return { error: null };
            }
            yield this._recoverAndRefresh();
            return { error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { error: error2 };
            }
            return {
              error: new AuthUnknownError("Unexpected error during initialization", error2)
            };
          } finally {
            this._handleVisibilityChange();
          }
        });
      }
      signUp(credentials) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            let res;
            if ("email" in credentials) {
              const { email, password, options } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                body: {
                  email,
                  password,
                  data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                },
                xform: _sessionResponse
              });
            } else if ("phone" in credentials) {
              const { phone, password, options } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                body: {
                  phone,
                  password,
                  data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                },
                xform: _sessionResponse
              });
            } else {
              throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
            }
            const { data, error: error2 } = res;
            if (error2 || !data) {
              return { data: { user: null, session: null }, error: error2 };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
              yield this._saveSession(data.session);
              this._notifyAllSubscribers("SIGNED_IN", session);
            }
            return { data: { user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      signInWithPassword(credentials) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            let res;
            if ("email" in credentials) {
              const { email, password, options } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                headers: this.headers,
                body: {
                  email,
                  password,
                  data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                },
                xform: _sessionResponse
              });
            } else if ("phone" in credentials) {
              const { phone, password, options } = credentials;
              res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                headers: this.headers,
                body: {
                  phone,
                  password,
                  data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                },
                xform: _sessionResponse
              });
            } else {
              throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
            }
            const { data, error: error2 } = res;
            if (error2 || !data)
              return { data: { user: null, session: null }, error: error2 };
            if (data.session) {
              yield this._saveSession(data.session);
              this._notifyAllSubscribers("SIGNED_IN", data.session);
            }
            return { data, error: error2 };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      signInWithOAuth(credentials) {
        var _a, _b, _c;
        return __awaiter14(this, void 0, void 0, function* () {
          yield this._removeSession();
          return this._handleProviderSignIn(credentials.provider, {
            redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
            scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
            queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams
          });
        });
      }
      signInWithOtp(credentials) {
        var _a, _b, _c, _d;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            if ("email" in credentials) {
              const { email, options } = credentials;
              const { error: error2 } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                headers: this.headers,
                body: {
                  email,
                  data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                  create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                },
                redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
              });
              return { data: { user: null, session: null }, error: error2 };
            }
            if ("phone" in credentials) {
              const { phone, options } = credentials;
              const { error: error2 } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                headers: this.headers,
                body: {
                  phone,
                  data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                  create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                  gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
                }
              });
              return { data: { user: null, session: null }, error: error2 };
            }
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      verifyOtp(params) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/verify`, {
              headers: this.headers,
              body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: (_a = params.options) === null || _a === void 0 ? void 0 : _a.captchaToken } }),
              redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
              xform: _sessionResponse
            });
            if (error2) {
              throw error2;
            }
            if (!data) {
              throw "An error occurred on token verification.";
            }
            const session = data.session;
            const user = data.user;
            if (session === null || session === void 0 ? void 0 : session.access_token) {
              yield this._saveSession(session);
              this._notifyAllSubscribers("SIGNED_IN", session);
            }
            return { data: { user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      signInWithSSO(params) {
        var _a, _b, _c;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            yield this._removeSession();
            return yield _request(this.fetch, "POST", `${this.url}/sso`, {
              body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true }),
              headers: this.headers,
              xform: _ssoResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      getSession() {
        return __awaiter14(this, void 0, void 0, function* () {
          yield this.initializePromise;
          let currentSession = null;
          if (this.persistSession) {
            const maybeSession = yield getItemAsync(this.storage, this.storageKey);
            if (maybeSession !== null) {
              if (this._isValidSession(maybeSession)) {
                currentSession = maybeSession;
              } else {
                yield this._removeSession();
              }
            }
          } else {
            currentSession = this.inMemorySession;
          }
          if (!currentSession) {
            return { data: { session: null }, error: null };
          }
          const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
          if (!hasExpired) {
            return { data: { session: currentSession }, error: null };
          }
          const { session, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
          if (error2) {
            return { data: { session: null }, error: error2 };
          }
          return { data: { session }, error: null };
        });
      }
      getUser(jwt) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            if (!jwt) {
              const { data, error: error2 } = yield this.getSession();
              if (error2) {
                throw error2;
              }
              jwt = (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0;
            }
            return yield _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt,
              xform: _userResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      updateUser(attributes) {
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            const { data: sessionData, error: sessionError } = yield this.getSession();
            if (sessionError) {
              throw sessionError;
            }
            if (!sessionData.session) {
              throw new AuthSessionMissingError();
            }
            const session = sessionData.session;
            const { data, error: userError } = yield _request(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              body: attributes,
              jwt: session.access_token,
              xform: _userResponse
            });
            if (userError)
              throw userError;
            session.user = data.user;
            yield this._saveSession(session);
            this._notifyAllSubscribers("USER_UPDATED", session);
            return { data: { user: session.user }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _decodeJWT(jwt) {
        return decodeJWTPayload(jwt);
      }
      setSession(currentSession) {
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            if (!currentSession.access_token || !currentSession.refresh_token) {
              throw new AuthSessionMissingError();
            }
            const timeNow = Date.now() / 1e3;
            let expiresAt2 = timeNow;
            let hasExpired = true;
            let session = null;
            const payload = decodeJWTPayload(currentSession.access_token);
            if (payload.exp) {
              expiresAt2 = payload.exp;
              hasExpired = expiresAt2 <= timeNow;
            }
            if (hasExpired) {
              const { session: refreshedSession, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
              if (error2) {
                return { data: { user: null, session: null }, error: error2 };
              }
              if (!refreshedSession) {
                return { data: { user: null, session: null }, error: null };
              }
              session = refreshedSession;
            } else {
              const { data, error: error2 } = yield this.getUser(currentSession.access_token);
              if (error2) {
                throw error2;
              }
              session = {
                access_token: currentSession.access_token,
                refresh_token: currentSession.refresh_token,
                user: data.user,
                token_type: "bearer",
                expires_in: expiresAt2 - timeNow,
                expires_at: expiresAt2
              };
              yield this._saveSession(session);
            }
            return { data: { user: session.user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      refreshSession(currentSession) {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            if (!currentSession) {
              const { data, error: error3 } = yield this.getSession();
              if (error3) {
                throw error3;
              }
              currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : void 0;
            }
            if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
              throw new AuthSessionMissingError();
            }
            const { session, error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error2) {
              return { data: { user: null, session: null }, error: error2 };
            }
            if (!session) {
              return { data: { user: null, session: null }, error: null };
            }
            return { data: { user: session.user, session }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { user: null, session: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _getSessionFromUrl() {
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            if (!isBrowser())
              throw new AuthImplicitGrantRedirectError("No browser detected.");
            if (!this._isImplicitGrantFlow()) {
              throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
            }
            const error_description = getParameterByName("error_description");
            if (error_description) {
              const error_code = getParameterByName("error_code");
              if (!error_code)
                throw new AuthImplicitGrantRedirectError("No error_code detected.");
              const error3 = getParameterByName("error");
              if (!error3)
                throw new AuthImplicitGrantRedirectError("No error detected.");
              throw new AuthImplicitGrantRedirectError(error_description, { error: error3, code: error_code });
            }
            const provider_token = getParameterByName("provider_token");
            const provider_refresh_token = getParameterByName("provider_refresh_token");
            const access_token = getParameterByName("access_token");
            if (!access_token)
              throw new AuthImplicitGrantRedirectError("No access_token detected.");
            const expires_in = getParameterByName("expires_in");
            if (!expires_in)
              throw new AuthImplicitGrantRedirectError("No expires_in detected.");
            const refresh_token = getParameterByName("refresh_token");
            if (!refresh_token)
              throw new AuthImplicitGrantRedirectError("No refresh_token detected.");
            const token_type = getParameterByName("token_type");
            if (!token_type)
              throw new AuthImplicitGrantRedirectError("No token_type detected.");
            const timeNow = Math.round(Date.now() / 1e3);
            const expires_at = timeNow + parseInt(expires_in);
            const { data, error: error2 } = yield this.getUser(access_token);
            if (error2)
              throw error2;
            const user = data.user;
            const session = {
              provider_token,
              provider_refresh_token,
              access_token,
              expires_in: parseInt(expires_in),
              expires_at,
              refresh_token,
              token_type,
              user
            };
            const redirectType = getParameterByName("type");
            window.location.hash = "";
            return { data: { session, redirectType }, error: null };
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, redirectType: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _isImplicitGrantFlow() {
        return isBrowser() && (Boolean(getParameterByName("access_token")) || Boolean(getParameterByName("error_description")));
      }
      signOut() {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { error: sessionError };
          }
          const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
          if (accessToken) {
            const { error: error2 } = yield this.admin.signOut(accessToken);
            if (error2) {
              if (!(isAuthApiError(error2) && (error2.status === 404 || error2.status === 401))) {
                return { error: error2 };
              }
            }
          }
          yield this._removeSession();
          this._notifyAllSubscribers("SIGNED_OUT", null);
          return { error: null };
        });
      }
      onAuthStateChange(callback) {
        const id = uuid();
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            this.stateChangeEmitters.delete(id);
          }
        };
        this.stateChangeEmitters.set(id, subscription);
        return { data: { subscription } };
      }
      resetPasswordForEmail(email, options = {}) {
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/recover`, {
              body: { email, gotrue_meta_security: { captcha_token: options.captchaToken } },
              headers: this.headers,
              redirectTo: options.redirectTo
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: null, error: error2 };
            }
            throw error2;
          }
        });
      }
      _refreshAccessToken(refreshToken) {
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            return yield _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
              body: { refresh_token: refreshToken },
              headers: this.headers,
              xform: _sessionResponse
            });
          } catch (error2) {
            if (isAuthError(error2)) {
              return { data: { session: null, user: null }, error: error2 };
            }
            throw error2;
          }
        });
      }
      _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
      }
      _handleProviderSignIn(provider, options = {}) {
        const url = this._getUrlForProvider(provider, {
          redirectTo: options.redirectTo,
          scopes: options.scopes,
          queryParams: options.queryParams
        });
        if (isBrowser()) {
          window.location.href = url;
        }
        return { data: { provider, url }, error: null };
      }
      _recoverAndRefresh() {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          try {
            const currentSession = yield getItemAsync(this.storage, this.storageKey);
            if (!this._isValidSession(currentSession)) {
              if (currentSession !== null) {
                yield this._removeSession();
              }
              return;
            }
            const timeNow = Math.round(Date.now() / 1e3);
            if (((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN) {
              if (this.autoRefreshToken && currentSession.refresh_token) {
                this.networkRetries++;
                const { error: error2 } = yield this._callRefreshToken(currentSession.refresh_token);
                if (error2) {
                  console.log(error2.message);
                  if (error2 instanceof AuthRetryableFetchError && this.networkRetries < NETWORK_FAILURE.MAX_RETRIES) {
                    if (this.refreshTokenTimer)
                      clearTimeout(this.refreshTokenTimer);
                    this.refreshTokenTimer = setTimeout(
                      () => this._recoverAndRefresh(),
                      Math.pow(NETWORK_FAILURE.RETRY_INTERVAL, this.networkRetries) * 100
                    );
                    return;
                  }
                  yield this._removeSession();
                }
                this.networkRetries = 0;
              } else {
                yield this._removeSession();
              }
            } else {
              if (this.persistSession) {
                yield this._saveSession(currentSession);
              }
              this._notifyAllSubscribers("SIGNED_IN", currentSession);
            }
          } catch (err) {
            console.error(err);
            return;
          }
        });
      }
      _callRefreshToken(refreshToken) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          if (this.refreshingDeferred) {
            return this.refreshingDeferred.promise;
          }
          try {
            this.refreshingDeferred = new Deferred();
            if (!refreshToken) {
              throw new AuthSessionMissingError();
            }
            const { data, error: error2 } = yield this._refreshAccessToken(refreshToken);
            if (error2)
              throw error2;
            if (!data.session)
              throw new AuthSessionMissingError();
            yield this._saveSession(data.session);
            this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
            const result = { session: data.session, error: null };
            this.refreshingDeferred.resolve(result);
            return result;
          } catch (error2) {
            if (isAuthError(error2)) {
              const result = { session: null, error: error2 };
              (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
              return result;
            }
            (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error2);
            throw error2;
          } finally {
            this.refreshingDeferred = null;
          }
        });
      }
      _notifyAllSubscribers(event, session) {
        this.stateChangeEmitters.forEach((x) => x.callback(event, session));
      }
      _saveSession(session) {
        return __awaiter14(this, void 0, void 0, function* () {
          if (!this.persistSession) {
            this.inMemorySession = session;
          }
          const expiresAt2 = session.expires_at;
          if (expiresAt2) {
            const timeNow = Math.round(Date.now() / 1e3);
            const expiresIn = expiresAt2 - timeNow;
            const refreshDurationBeforeExpires = expiresIn > EXPIRY_MARGIN ? EXPIRY_MARGIN : 0.5;
            this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1e3);
          }
          if (this.persistSession && session.expires_at) {
            yield this._persistSession(session);
          }
        });
      }
      _persistSession(currentSession) {
        return setItemAsync(this.storage, this.storageKey, currentSession);
      }
      _removeSession() {
        return __awaiter14(this, void 0, void 0, function* () {
          if (this.persistSession) {
            yield removeItemAsync(this.storage, this.storageKey);
          } else {
            this.inMemorySession = null;
          }
          if (this.refreshTokenTimer) {
            clearTimeout(this.refreshTokenTimer);
          }
        });
      }
      _startAutoRefreshToken(value) {
        if (this.refreshTokenTimer)
          clearTimeout(this.refreshTokenTimer);
        if (value <= 0 || !this.autoRefreshToken)
          return;
        this.refreshTokenTimer = setTimeout(() => __awaiter14(this, void 0, void 0, function* () {
          this.networkRetries++;
          const { data: { session }, error: sessionError } = yield this.getSession();
          if (!sessionError && session) {
            const { error: error2 } = yield this._callRefreshToken(session.refresh_token);
            if (!error2)
              this.networkRetries = 0;
            if (error2 instanceof AuthRetryableFetchError && this.networkRetries < NETWORK_FAILURE.MAX_RETRIES)
              this._startAutoRefreshToken(Math.pow(NETWORK_FAILURE.RETRY_INTERVAL, this.networkRetries) * 100);
          }
        }), value);
        if (typeof this.refreshTokenTimer.unref === "function")
          this.refreshTokenTimer.unref();
      }
      _handleVisibilityChange() {
        if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
          return false;
        }
        try {
          window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", () => __awaiter14(this, void 0, void 0, function* () {
            if (document.visibilityState === "visible") {
              yield this.initializePromise;
              yield this._recoverAndRefresh();
            }
          }));
        } catch (error2) {
          console.error("_handleVisibilityChange", error2);
        }
      }
      _getUrlForProvider(provider, options) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
          urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
          urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.queryParams) {
          const query = new URLSearchParams(options.queryParams);
          urlParams.push(query.toString());
        }
        return `${this.url}/authorize?${urlParams.join("&")}`;
      }
      _unenroll(params) {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: sessionData, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          return yield _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
        });
      }
      _enroll(params) {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: sessionData, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/factors`, {
            body: {
              friendly_name: params.friendlyName,
              factor_type: params.factorType,
              issuer: params.issuer
            },
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
          if (error2) {
            return { data: null, error: error2 };
          }
          if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
            data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
          }
          return { data, error: null };
        });
      }
      _verify(params) {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: sessionData, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          const { data, error: error2 } = yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
            body: { code: params.code, challenge_id: params.challengeId },
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
          if (error2) {
            return { data: null, error: error2 };
          }
          yield this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
          this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
          return { data, error: error2 };
        });
      }
      _challenge(params) {
        var _a;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: sessionData, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          return yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
            headers: this.headers,
            jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
          });
        });
      }
      _challengeAndVerify(params) {
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: challengeData, error: challengeError } = yield this._challenge({
            factorId: params.factorId
          });
          if (challengeError) {
            return { data: null, error: challengeError };
          }
          return yield this._verify({
            factorId: params.factorId,
            challengeId: challengeData.id,
            code: params.code
          });
        });
      }
      _listFactors() {
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: { user }, error: userError } = yield this.getUser();
          if (userError) {
            return { data: null, error: userError };
          }
          const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
          const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
          return {
            data: {
              all: factors,
              totp
            },
            error: null
          };
        });
      }
      _getAuthenticatorAssuranceLevel() {
        var _a, _b;
        return __awaiter14(this, void 0, void 0, function* () {
          const { data: { session }, error: sessionError } = yield this.getSession();
          if (sessionError) {
            return { data: null, error: sessionError };
          }
          if (!session) {
            return {
              data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
              error: null
            };
          }
          const payload = this._decodeJWT(session.access_token);
          let currentLevel = null;
          if (payload.aal) {
            currentLevel = payload.aal;
          }
          let nextLevel = currentLevel;
          const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
          if (verifiedFactors.length > 0) {
            nextLevel = "aal2";
          }
          const currentAuthenticationMethods = payload.amr || [];
          return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
        });
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/types.js
var init_types3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/types.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/index.js
var init_module5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/index.js"() {
    init_GoTrueAdminApi();
    init_GoTrueClient();
    init_types3();
    init_errors2();
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient;
var init_SupabaseAuthClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"() {
    init_module5();
    SupabaseAuthClient = class extends GoTrueClient {
      constructor(options) {
        super(options);
      }
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter15, DEFAULT_GLOBAL_OPTIONS, DEFAULT_DB_OPTIONS, DEFAULT_AUTH_OPTIONS, DEFAULT_REALTIME_OPTIONS, SupabaseClient;
var init_SupabaseClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js"() {
    init_module();
    init_module2();
    init_module3();
    init_module4();
    init_constants4();
    init_fetch2();
    init_helpers2();
    init_SupabaseAuthClient();
    __awaiter15 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_GLOBAL_OPTIONS = {
      headers: DEFAULT_HEADERS4
    };
    DEFAULT_DB_OPTIONS = {
      schema: "public"
    };
    DEFAULT_AUTH_OPTIONS = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    };
    DEFAULT_REALTIME_OPTIONS = {};
    SupabaseClient = class {
      constructor(supabaseUrl, supabaseKey, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
          throw new Error("supabaseUrl is required.");
        if (!supabaseKey)
          throw new Error("supabaseKey is required.");
        const _supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        const isPlatform = _supabaseUrl.match(/(supabase\.co)|(supabase\.in)/);
        if (isPlatform) {
          const urlParts = _supabaseUrl.split(".");
          this.functionsUrl = `${urlParts[0]}.functions.${urlParts[1]}.${urlParts[2]}`;
        } else {
          this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        }
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
          db: DEFAULT_DB_OPTIONS,
          realtime: DEFAULT_REALTIME_OPTIONS,
          auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
          global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
        this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
          headers: this.headers,
          schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
          fetch: this.fetch
        });
        this._listenForAuthEvents();
      }
      get functions() {
        return new FunctionsClient(this.functionsUrl, {
          headers: this.headers,
          customFetch: this.fetch
        });
      }
      get storage() {
        return new StorageClient(this.storageUrl, this.headers, this.fetch);
      }
      from(relation) {
        return this.rest.from(relation);
      }
      rpc(fn, args = {}, options) {
        return this.rest.rpc(fn, args, options);
      }
      channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
      }
      getChannels() {
        return this.realtime.getChannels();
      }
      removeChannel(channel) {
        return this.realtime.removeChannel(channel);
      }
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      _getAccessToken() {
        var _a, _b;
        return __awaiter15(this, void 0, void 0, function* () {
          const { data } = yield this.auth.getSession();
          return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
      }
      _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey }, headers, fetch2) {
        const authHeaders = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
          url: this.authUrl,
          headers: Object.assign(Object.assign({}, authHeaders), headers),
          storageKey,
          autoRefreshToken,
          persistSession,
          detectSessionInUrl,
          storage,
          fetch: fetch2
        });
      }
      _initRealtimeClient(options) {
        return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
      }
      _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
          this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
        });
        return data;
      }
      _handleTokenChanged(event, token, source) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
          this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
          this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT" || event === "USER_DELETED") {
          this.realtime.setAuth(this.supabaseKey);
          if (source == "STORAGE")
            this.auth.signOut();
        }
      }
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient;
var init_module6 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/index.js"() {
    init_SupabaseClient();
    init_module5();
    init_module3();
    createClient = (supabaseUrl, supabaseKey, options) => {
      return new SupabaseClient(supabaseUrl, supabaseKey, options);
    };
  }
});

// .svelte-kit/output/server/chunks/db.js
var supabase;
var init_db = __esm({
  ".svelte-kit/output/server/chunks/db.js"() {
    init_module6();
    supabase = createClient(
      "https://ffznvnwjpahbuhjamklb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmem52bndqcGFoYnVoamFta2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMzU4NjAsImV4cCI6MTk4NDcxMTg2MH0.0cRLl8jWCmOJz_1LkocJig_N8wmIUua09c4QJEWvl3g"
    );
  }
});

// .svelte-kit/output/server/entries/pages/app/_page.server.js
var page_server_exports = {};
__export(page_server_exports, {
  actions: () => actions,
  load: () => load
});
var load, actions;
var init_page_server = __esm({
  ".svelte-kit/output/server/entries/pages/app/_page.server.js"() {
    init_db();
    load = async function getData() {
      const { data, error: error2 } = await supabase.from("patscen").select();
      if (error2)
        throw new Error(error2.message);
      return data;
    };
    actions = {
      default: async ({ request }) => {
        const formData = await request.formData();
        console.log(formData);
      }
    };
  }
});

// .svelte-kit/output/server/chunks/MultiSelect.js
var CheckboxSkeleton, CheckboxSkeleton$1, Checkbox, Checkbox$1, WarningFilled, WarningFilled$1, WarningAltFilled, WarningAltFilled$1, ListBox, ListBox$1, ListBoxField, ListBoxField$1, ListBoxMenu, ListBoxMenu$1, ListBoxMenuIcon, ListBoxMenuIcon$1, ListBoxMenuItem, ListBoxMenuItem$1, ListBoxSelection, ListBoxSelection$1, MultiSelect, MultiSelect$1;
var init_MultiSelect = __esm({
  ".svelte-kit/output/server/chunks/MultiSelect.js"() {
    init_chunks();
    init_Close();
    CheckboxSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, []);
      return `
<div${spread([escape_object($$restProps)], {
        classes: "bx--form-item bx--checkbox-wrapper bx--checkbox-label"
      })}><span${add_classes("bx--checkbox-label-text bx--skeleton".trim())}></span></div>`;
    });
    CheckboxSkeleton$1 = CheckboxSkeleton;
    Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let useGroup;
      let isTruncated;
      let $$restProps = compute_rest_props($$props, [
        "value",
        "checked",
        "group",
        "indeterminate",
        "skeleton",
        "required",
        "readonly",
        "disabled",
        "labelText",
        "hideLabel",
        "name",
        "title",
        "id",
        "ref"
      ]);
      let { value = "" } = $$props;
      let { checked = false } = $$props;
      let { group = void 0 } = $$props;
      let { indeterminate = false } = $$props;
      let { skeleton = false } = $$props;
      let { required = false } = $$props;
      let { readonly = false } = $$props;
      let { disabled = false } = $$props;
      let { labelText = "" } = $$props;
      let { hideLabel = false } = $$props;
      let { name = "" } = $$props;
      let { title = void 0 } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      const dispatch = createEventDispatcher();
      let refLabel = null;
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      if ($$props.group === void 0 && $$bindings.group && group !== void 0)
        $$bindings.group(group);
      if ($$props.indeterminate === void 0 && $$bindings.indeterminate && indeterminate !== void 0)
        $$bindings.indeterminate(indeterminate);
      if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
        $$bindings.skeleton(skeleton);
      if ($$props.required === void 0 && $$bindings.required && required !== void 0)
        $$bindings.required(required);
      if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
        $$bindings.readonly(readonly);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
        $$bindings.labelText(labelText);
      if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
        $$bindings.hideLabel(hideLabel);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      useGroup = Array.isArray(group);
      checked = useGroup ? group.includes(value) : checked;
      {
        dispatch("check", checked);
      }
      isTruncated = (refLabel == null ? void 0 : refLabel.offsetWidth) < (refLabel == null ? void 0 : refLabel.scrollWidth);
      title = !title && isTruncated ? refLabel == null ? void 0 : refLabel.innerText : title;
      return `
${skeleton ? `${validate_component(CheckboxSkeleton$1, "CheckboxSkeleton").$$render($$result, Object.assign($$restProps), {}, {})}` : `<div${spread([escape_object($$restProps)], {
        classes: "bx--form-item bx--checkbox-wrapper"
      })}><input type="${"checkbox"}"${add_attribute("value", value, 0)} ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}${add_attribute("id", id, 0)}${add_attribute("indeterminate", indeterminate, 0)}${add_attribute("name", name, 0)} ${required ? "required" : ""} ${readonly ? "readonly" : ""}${add_classes("bx--checkbox".trim())}${add_attribute("this", ref, 0)}>
    <label${add_attribute("for", id, 0)}${add_attribute("title", title, 0)}${add_classes("bx--checkbox-label".trim())}><span${add_classes(("bx--checkbox-label-text " + (hideLabel ? "bx--visually-hidden" : "")).trim())}${add_attribute("this", refLabel, 0)}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</span></label></div>`}`;
    });
    Checkbox$1 = Checkbox;
    WarningFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { viewBox: "0 0 32 32" },
          { fill: "currentColor" },
          { preserveAspectRatio: "xMidYMid meet" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          escape_object(attributes),
          escape_object($$restProps)
        ],
        {}
      )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"}"></path><path fill="${"none"}" d="${"M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path></svg>`;
    });
    WarningFilled$1 = WarningFilled;
    WarningAltFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let labelled;
      let attributes;
      let $$restProps = compute_rest_props($$props, ["size", "title"]);
      let { size = 16 } = $$props;
      let { title = void 0 } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
      attributes = {
        "aria-hidden": labelled ? void 0 : true,
        role: labelled ? "img" : void 0,
        focusable: Number($$props["tabindex"]) === 0 ? true : void 0
      };
      return `<svg${spread(
        [
          { xmlns: "http://www.w3.org/2000/svg" },
          { viewBox: "0 0 32 32" },
          { fill: "currentColor" },
          { preserveAspectRatio: "xMidYMid meet" },
          { width: escape_attribute_value(size) },
          { height: escape_attribute_value(size) },
          escape_object(attributes),
          escape_object($$restProps)
        ],
        {}
      )}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="${"none"}" d="${"M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"}" data-icon-path="${"inner-path"}"></path><path d="${"M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"}"></path><path d="${"M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"}"></path></svg>`;
    });
    WarningAltFilled$1 = WarningAltFilled;
    ListBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, [
        "size",
        "type",
        "open",
        "light",
        "disabled",
        "invalid",
        "invalidText",
        "warn",
        "warnText"
      ]);
      let { size = void 0 } = $$props;
      let { type = "default" } = $$props;
      let { open = false } = $$props;
      let { light = false } = $$props;
      let { disabled = false } = $$props;
      let { invalid = false } = $$props;
      let { invalidText = "" } = $$props;
      let { warn = false } = $$props;
      let { warnText = "" } = $$props;
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.light === void 0 && $$bindings.light && light !== void 0)
        $$bindings.light(light);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
        $$bindings.invalid(invalid);
      if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
        $$bindings.invalidText(invalidText);
      if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
        $$bindings.warn(warn);
      if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
        $$bindings.warnText(warnText);
      return `<div${spread(
        [
          { role: "listbox" },
          { tabindex: "-1" },
          {
            "data-invalid": escape_attribute_value(invalid || void 0)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--list-box " + (size === "sm" ? "bx--list-box--sm" : "") + " " + (size === "xl" ? "bx--list-box--xl" : "") + " " + (type === "inline" ? "bx--list-box--inline" : "") + " " + (disabled ? "bx--list-box--disabled" : "") + " " + (open ? "bx--list-box--expanded" : "") + " " + (light ? "bx--list-box--light" : "") + " " + (!invalid && warn ? "bx--list-box--warning" : "")
        }
      )}>${slots.default ? slots.default({}) : ``}</div>
${invalid ? `<div${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
${!invalid && warn ? `<div${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}`;
    });
    ListBox$1 = ListBox;
    ListBoxField = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let ariaExpanded;
      let menuId;
      let $$restProps = compute_rest_props($$props, ["disabled", "role", "tabindex", "translationIds", "translateWithId", "id", "ref"]);
      let { disabled = false } = $$props;
      let { role = "combobox" } = $$props;
      let { tabindex = "-1" } = $$props;
      const translationIds = { close: "close", open: "open" };
      let { translateWithId = (id2) => defaultTranslations[id2] } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      const defaultTranslations = {
        [translationIds.close]: "Close menu",
        [translationIds.open]: "Open menu"
      };
      const ctx = getContext("MultiSelect");
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
      if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
        $$bindings.tabindex(tabindex);
      if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
        $$bindings.translationIds(translationIds);
      if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
        $$bindings.translateWithId(translateWithId);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      {
        if (ctx && ref) {
          ctx.declareRef({ key: "field", ref });
        }
      }
      ariaExpanded = $$props["aria-expanded"];
      menuId = `menu-${id}`;
      return `
<div${spread(
        [
          { role: escape_attribute_value(role) },
          {
            "aria-expanded": escape_attribute_value(ariaExpanded)
          },
          {
            "aria-owns": escape_attribute_value(ariaExpanded && menuId || void 0)
          },
          {
            "aria-controls": escape_attribute_value(ariaExpanded && menuId || void 0)
          },
          {
            "aria-disabled": escape_attribute_value(disabled)
          },
          {
            "aria-label": escape_attribute_value(ariaExpanded ? translateWithId("close") : translateWithId("open"))
          },
          {
            tabindex: escape_attribute_value(disabled ? "-1" : tabindex)
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--list-box__field"
        }
      )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
    });
    ListBoxField$1 = ListBoxField;
    ListBoxMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["id", "ref"]);
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { ref = null } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      return `<div${spread(
        [
          { role: "listbox" },
          { id: "menu-" + escape(id, true) },
          escape_object($$restProps)
        ],
        {
          classes: "bx--list-box__menu"
        }
      )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
    });
    ListBoxMenu$1 = ListBoxMenu;
    ListBoxMenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let translationId;
      let description;
      let $$restProps = compute_rest_props($$props, ["open", "translationIds", "translateWithId"]);
      let { open = false } = $$props;
      const translationIds = { close: "close", open: "open" };
      let { translateWithId = (id) => defaultTranslations[id] } = $$props;
      const defaultTranslations = {
        [translationIds.close]: "Close menu",
        [translationIds.open]: "Open menu"
      };
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
        $$bindings.translationIds(translationIds);
      if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
        $$bindings.translateWithId(translateWithId);
      translationId = open ? translationIds.close : translationIds.open;
      description = (translateWithId == null ? void 0 : translateWithId(translationId)) ?? defaultTranslations[translationId];
      return `<div${spread([escape_object($$restProps)], {
        classes: "bx--list-box__menu-icon " + (open ? "bx--list-box__menu-icon--open" : "")
      })}>${validate_component(ChevronDown$1, "ChevronDown").$$render(
        $$result,
        {
          "aria-label": description,
          title: description
        },
        {},
        {}
      )}</div>`;
    });
    ListBoxMenuIcon$1 = ListBoxMenuIcon;
    ListBoxMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isTruncated;
      let title;
      let $$restProps = compute_rest_props($$props, ["active", "highlighted", "disabled"]);
      let { active = false } = $$props;
      let { highlighted = false } = $$props;
      let { disabled = false } = $$props;
      let ref = null;
      if ($$props.active === void 0 && $$bindings.active && active !== void 0)
        $$bindings.active(active);
      if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0)
        $$bindings.highlighted(highlighted);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      isTruncated = (ref == null ? void 0 : ref.offsetWidth) < (ref == null ? void 0 : ref.scrollWidth);
      title = isTruncated ? ref == null ? void 0 : ref.innerText : void 0;
      {
        if (highlighted && ref && !ref.matches(":hover")) {
          ref.scrollIntoView({ block: "nearest" });
        }
      }
      return `<div${spread(
        [
          { role: "option" },
          {
            "aria-selected": escape_attribute_value(active)
          },
          {
            disabled: (disabled ? true : void 0) || null
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--list-box__menu-item " + (active ? "bx--list-box__menu-item--active" : "") + " " + (highlighted || active ? "bx--list-box__menu-item--highlighted" : "")
        }
      )}><div${add_attribute("title", title, 0)}${add_classes("bx--list-box__menu-item__option".trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
    });
    ListBoxMenuItem$1 = ListBoxMenuItem;
    ListBoxSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let translationId;
      let description;
      let $$restProps = compute_rest_props($$props, ["selectionCount", "disabled", "translationIds", "translateWithId", "ref"]);
      let { selectionCount = void 0 } = $$props;
      let { disabled = false } = $$props;
      const translationIds = {
        clearAll: "clearAll",
        clearSelection: "clearSelection"
      };
      let { translateWithId = (id) => defaultTranslations[id] } = $$props;
      let { ref = null } = $$props;
      const defaultTranslations = {
        [translationIds.clearAll]: "Clear all selected items",
        [translationIds.clearSelection]: "Clear selected item"
      };
      createEventDispatcher();
      const ctx = getContext("MultiSelect");
      if ($$props.selectionCount === void 0 && $$bindings.selectionCount && selectionCount !== void 0)
        $$bindings.selectionCount(selectionCount);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
        $$bindings.translationIds(translationIds);
      if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
        $$bindings.translateWithId(translateWithId);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
        $$bindings.ref(ref);
      {
        if (ctx && ref) {
          ctx.declareRef({ key: "selection", ref });
        }
      }
      translationId = selectionCount ? translationIds.clearAll : translationIds.clearSelection;
      description = (translateWithId == null ? void 0 : translateWithId(translationId)) ?? defaultTranslations[translationId];
      return `${selectionCount !== void 0 ? `<div${add_classes(("bx--tag bx--tag--filter bx--tag--high-contrast " + (disabled ? "bx--tag--disabled" : "")).trim())}><span${add_attribute("title", selectionCount, 0)}${add_classes("bx--tag__label".trim())}>${escape(selectionCount)}</span>
    <div role="${"button"}"${add_attribute("tabindex", disabled ? -1 : 0, 0)} ${disabled ? "disabled" : ""}${add_attribute("aria-label", translationIds.clearAll, 0)}${add_attribute("title", description, 0)}${add_classes("bx--tag__close-icon".trim())}${add_attribute("this", ref, 0)}>${validate_component(Close$1, "Close").$$render($$result, {}, {}, {})}</div></div>` : `<div${spread(
        [
          { role: "button" },
          {
            "aria-label": escape_attribute_value(description)
          },
          {
            title: escape_attribute_value(description)
          },
          {
            tabindex: escape_attribute_value(disabled ? "-1" : "0")
          },
          escape_object($$restProps)
        ],
        {
          classes: "bx--list-box__selection " + (selectionCount ? "bx--tag--filter" : "") + " " + (selectionCount ? "bx--list-box__selection--multi" : "")
        }
      )}${add_attribute("this", ref, 0)}>${selectionCount !== void 0 ? `${escape(selectionCount)}` : ``}
    ${validate_component(Close$1, "Close").$$render($$result, {}, {}, {})}</div>`}`;
    });
    ListBoxSelection$1 = ListBoxSelection;
    MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let menuId;
      let inline;
      let ariaLabel;
      let sortedItems;
      let checked;
      let filteredItems;
      let $$restProps = compute_rest_props($$props, [
        "items",
        "itemToString",
        "itemToInput",
        "selectedIds",
        "value",
        "size",
        "type",
        "direction",
        "selectionFeedback",
        "disabled",
        "filterable",
        "filterItem",
        "open",
        "light",
        "locale",
        "placeholder",
        "sortItem",
        "translateWithId",
        "translateWithIdSelection",
        "titleText",
        "useTitleInItem",
        "invalid",
        "invalidText",
        "warn",
        "warnText",
        "helperText",
        "label",
        "hideLabel",
        "id",
        "name",
        "inputRef",
        "multiSelectRef",
        "fieldRef",
        "selectionRef",
        "highlightedId"
      ]);
      let { items = [] } = $$props;
      let { itemToString = (item) => item.text || item.id } = $$props;
      let { itemToInput = (item) => {
      } } = $$props;
      let { selectedIds = [] } = $$props;
      let { value = "" } = $$props;
      let { size = void 0 } = $$props;
      let { type = "default" } = $$props;
      let { direction = "bottom" } = $$props;
      let { selectionFeedback = "top-after-reopen" } = $$props;
      let { disabled = false } = $$props;
      let { filterable = false } = $$props;
      let { filterItem = (item, value2) => item.text.toLowerCase().includes(value2.trim().toLowerCase()) } = $$props;
      let { open = false } = $$props;
      let { light = false } = $$props;
      let { locale = "en" } = $$props;
      let { placeholder = "" } = $$props;
      let { sortItem = (a, b) => a.text.localeCompare(b.text, locale, { numeric: true }) } = $$props;
      let { translateWithId = void 0 } = $$props;
      let { translateWithIdSelection = void 0 } = $$props;
      let { titleText = "" } = $$props;
      let { useTitleInItem = false } = $$props;
      let { invalid = false } = $$props;
      let { invalidText = "" } = $$props;
      let { warn = false } = $$props;
      let { warnText = "" } = $$props;
      let { helperText = "" } = $$props;
      let { label = "" } = $$props;
      let { hideLabel = false } = $$props;
      let { id = "ccs-" + Math.random().toString(36) } = $$props;
      let { name = void 0 } = $$props;
      let { inputRef = null } = $$props;
      let { multiSelectRef = null } = $$props;
      let { fieldRef = null } = $$props;
      let { selectionRef = null } = $$props;
      let { highlightedId = null } = $$props;
      createEventDispatcher();
      let highlightedIndex = -1;
      setContext("MultiSelect", {
        declareRef: ({ key: key2, ref }) => {
          switch (key2) {
            case "field":
              fieldRef = ref;
              break;
            case "selection":
              selectionRef = ref;
              break;
          }
        }
      });
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
        $$bindings.itemToString(itemToString);
      if ($$props.itemToInput === void 0 && $$bindings.itemToInput && itemToInput !== void 0)
        $$bindings.itemToInput(itemToInput);
      if ($$props.selectedIds === void 0 && $$bindings.selectedIds && selectedIds !== void 0)
        $$bindings.selectedIds(selectedIds);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
        $$bindings.direction(direction);
      if ($$props.selectionFeedback === void 0 && $$bindings.selectionFeedback && selectionFeedback !== void 0)
        $$bindings.selectionFeedback(selectionFeedback);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.filterable === void 0 && $$bindings.filterable && filterable !== void 0)
        $$bindings.filterable(filterable);
      if ($$props.filterItem === void 0 && $$bindings.filterItem && filterItem !== void 0)
        $$bindings.filterItem(filterItem);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.light === void 0 && $$bindings.light && light !== void 0)
        $$bindings.light(light);
      if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
        $$bindings.locale(locale);
      if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
        $$bindings.placeholder(placeholder);
      if ($$props.sortItem === void 0 && $$bindings.sortItem && sortItem !== void 0)
        $$bindings.sortItem(sortItem);
      if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
        $$bindings.translateWithId(translateWithId);
      if ($$props.translateWithIdSelection === void 0 && $$bindings.translateWithIdSelection && translateWithIdSelection !== void 0)
        $$bindings.translateWithIdSelection(translateWithIdSelection);
      if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
        $$bindings.titleText(titleText);
      if ($$props.useTitleInItem === void 0 && $$bindings.useTitleInItem && useTitleInItem !== void 0)
        $$bindings.useTitleInItem(useTitleInItem);
      if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
        $$bindings.invalid(invalid);
      if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
        $$bindings.invalidText(invalidText);
      if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
        $$bindings.warn(warn);
      if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
        $$bindings.warnText(warnText);
      if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
        $$bindings.helperText(helperText);
      if ($$props.label === void 0 && $$bindings.label && label !== void 0)
        $$bindings.label(label);
      if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
        $$bindings.hideLabel(hideLabel);
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.inputRef === void 0 && $$bindings.inputRef && inputRef !== void 0)
        $$bindings.inputRef(inputRef);
      if ($$props.multiSelectRef === void 0 && $$bindings.multiSelectRef && multiSelectRef !== void 0)
        $$bindings.multiSelectRef(multiSelectRef);
      if ($$props.fieldRef === void 0 && $$bindings.fieldRef && fieldRef !== void 0)
        $$bindings.fieldRef(fieldRef);
      if ($$props.selectionRef === void 0 && $$bindings.selectionRef && selectionRef !== void 0)
        $$bindings.selectionRef(selectionRef);
      if ($$props.highlightedId === void 0 && $$bindings.highlightedId && highlightedId !== void 0)
        $$bindings.highlightedId(highlightedId);
      menuId = `menu-${id}`;
      inline = type === "inline";
      ariaLabel = $$props["aria-label"] || "Choose an item";
      sortedItems = items.map((item) => ({
        ...item,
        checked: selectedIds.includes(item.id)
      }));
      checked = sortedItems.filter(({ checked: checked2 }) => checked2);
      sortedItems.filter(({ checked: checked2 }) => !checked2);
      filteredItems = sortedItems.filter((item) => filterItem(item, value));
      highlightedId = null;
      return `

<div${add_classes(("bx--multi-select__wrapper bx--list-box__wrapper " + (inline ? "bx--multi-select__wrapper--inline" : "") + " " + (inline ? "bx--list-box__wrapper--inline" : "") + " " + (inline && invalid ? "bx--multi-select__wrapper--inline--invalid" : "")).trim())}${add_attribute("this", multiSelectRef, 0)}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")).trim())}>${escape(titleText)}</label>` : ``}
  ${validate_component(ListBox$1, "ListBox").$$render(
        $$result,
        {
          role: void 0,
          disabled,
          invalid,
          invalidText,
          open,
          light,
          size,
          warn,
          warnText,
          class: "bx--multi-select " + (direction === "top" && "bx--list-box--up") + " " + (filterable && "bx--combo-box") + "\n      " + (filterable && "bx--multi-select--filterable") + "\n      " + (invalid && "bx--multi-select--invalid") + "\n      " + (inline && "bx--multi-select--inline") + "\n      " + (checked.length > 0 && "bx--multi-select--selected")
        },
        {},
        {
          default: () => {
            return `${invalid ? `${validate_component(WarningFilled$1, "WarningFilled").$$render($$result, { class: "bx--list-box__invalid-icon" }, {}, {})}` : ``}
    ${!invalid && warn ? `${validate_component(WarningAltFilled$1, "WarningAltFilled").$$render(
              $$result,
              {
                class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
              },
              {},
              {}
            )}` : ``}
    ${validate_component(ListBoxField$1, "ListBoxField").$$render(
              $$result,
              {
                role: "button",
                tabindex: "0",
                "aria-expanded": open,
                id,
                disabled,
                translateWithId
              },
              {},
              {
                default: () => {
                  return `${checked.length > 0 ? `${validate_component(ListBoxSelection$1, "ListBoxSelection").$$render(
                    $$result,
                    {
                      selectionCount: checked.length,
                      translateWithId: translateWithIdSelection,
                      disabled
                    },
                    {},
                    {}
                  )}` : ``}
      ${filterable ? `<input${spread(
                    [
                      escape_object($$restProps),
                      { role: "combobox" },
                      { tabindex: "0" },
                      { autocomplete: "off" },
                      { "aria-autocomplete": "list" },
                      {
                        "aria-expanded": escape_attribute_value(open)
                      },
                      {
                        "aria-activedescendant": escape_attribute_value(highlightedId)
                      },
                      {
                        "aria-disabled": escape_attribute_value(disabled)
                      },
                      {
                        "aria-controls": escape_attribute_value(menuId)
                      },
                      { disabled: disabled || null },
                      {
                        placeholder: escape_attribute_value(placeholder)
                      },
                      { id: escape_attribute_value(id) },
                      { name: escape_attribute_value(name) }
                    ],
                    {
                      classes: "bx--text-input " + (value === "" ? "bx--text-input--empty" : "") + " " + (light ? "bx--text-input--light" : "")
                    }
                  )}${add_attribute("this", inputRef, 0)}${add_attribute("value", value, 0)}>
        ${invalid ? `${validate_component(WarningFilled$1, "WarningFilled").$$render($$result, { class: "bx--list-box__invalid-icon" }, {}, {})}` : ``}
        ${value ? `${validate_component(ListBoxSelection$1, "ListBoxSelection").$$render(
                    $$result,
                    {
                      translateWithId: translateWithIdSelection,
                      disabled,
                      open
                    },
                    {},
                    {}
                  )}` : ``}
        ${validate_component(ListBoxMenuIcon$1, "ListBoxMenuIcon").$$render(
                    $$result,
                    {
                      style: "pointer-events: " + (open ? "auto" : "none"),
                      translateWithId,
                      open
                    },
                    {},
                    {}
                  )}` : ``}
      ${!filterable ? `<span${add_classes("bx--list-box__label".trim())}>${escape(label)}</span>
        ${validate_component(ListBoxMenuIcon$1, "ListBoxMenuIcon").$$render($$result, { open, translateWithId }, {}, {})}` : ``}`;
                }
              }
            )}
    ${open ? `${validate_component(ListBoxMenu$1, "ListBoxMenu").$$render(
              $$result,
              {
                "aria-label": ariaLabel,
                id,
                "aria-multiselectable": "true"
              },
              {},
              {
                default: () => {
                  return `${each(filterable ? filteredItems : sortedItems, (item, i) => {
                    return `${validate_component(ListBoxMenuItem$1, "ListBoxMenuItem").$$render(
                      $$result,
                      {
                        id: item.id,
                        role: "option",
                        "aria-labelledby": "checkbox-" + item.id,
                        "aria-selected": item.checked,
                        active: item.checked,
                        highlighted: highlightedIndex === i,
                        disabled: item.disabled
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Checkbox$1, "Checkbox").$$render(
                            $$result,
                            Object.assign(
                              { name: item.id },
                              {
                                title: useTitleInItem ? itemToString(item) : void 0
                              },
                              itemToInput(item),
                              { readonly: true },
                              { tabindex: "-1" },
                              { id: "checkbox-" + item.id },
                              { checked: item.checked },
                              { disabled: item.disabled }
                            ),
                            {},
                            {
                              labelText: () => {
                                return `${slots.default ? slots.default({ slot: "labelText", item, index: i }) : `
                ${escape(itemToString(item))}
              `}`;
                              }
                            }
                          )}
          `;
                        }
                      }
                    )}`;
                  })}`;
                }
              }
            )}` : ``}`;
          }
        }
      )}
  ${!inline && !invalid && !warn && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>`;
    });
    MultiSelect$1 = MultiSelect;
  }
});

// .svelte-kit/output/server/entries/pages/app/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/app/_page.svelte.js"() {
    init_chunks();
    init_MultiSelect();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let selectedIds;
      let { data } = $$props;
      let { form } = $$props;
      Object.values(data);
      let userval = "";
      console.log(userval);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      if ($$props.form === void 0 && $$bindings.form && form !== void 0)
        $$bindings.form(form);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        selectedIds = "";
        $$rendered = `<div class="${"container m-8"}"><h1 class="${"text-2xl"}">Patscenario</h1>
    
    <form>${validate_component(MultiSelect$1, "MultiSelect").$$render(
          $$result,
          {
            titleText: "",
            label: "Select Countries",
            name: "fele",
            items: [
              { id: "Germany", text: "Germany" },
              { id: "Australia", text: "Australia" },
              { id: "UK", text: "United Kingdom (EP)" }
            ],
            selectedIds
          },
          {
            selectedIds: ($$value) => {
              selectedIds = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        <button>submit</button><br>
        ${escape(JSON.stringify(userval))}</form></div>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  file: () => file4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  server: () => page_server_exports,
  stylesheets: () => stylesheets4
});
var index4, component4, file4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_page_server();
    index4 = 3;
    component4 = async () => (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    file4 = "_app/immutable/components/pages/app/_page.svelte-afa1cbec.js";
    imports4 = ["_app/immutable/components/pages/app/_page.svelte-afa1cbec.js", "_app/immutable/chunks/index-851e755b.js", "_app/immutable/chunks/MultiSelect-3bd6ffff.js", "_app/immutable/chunks/Close-c1d67ad7.js"];
    stylesheets4 = ["_app/immutable/assets/g10-8dd097ea.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/result/_page.server.js
var page_server_exports2 = {};
__export(page_server_exports2, {
  load: () => load2
});
var load2;
var init_page_server2 = __esm({
  ".svelte-kit/output/server/entries/pages/result/_page.server.js"() {
    init_db();
    load2 = async function getData2() {
      const { data, error: error2 } = await supabase.from("patscen").select();
      if (error2)
        throw new Error(error2.message);
      return data;
    };
  }
});

// .svelte-kit/output/server/entries/pages/result/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
function getFilteredCountries(countries, stringToMatch) {
  if (stringToMatch) {
    return countries.filter((country) => {
      return country.Country.toLowerCase().includes(stringToMatch.toLowerCase()) || country.Currency.includes(stringToMatch.toUpperCase());
    });
  } else {
    return countries;
  }
}
var Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/result/_page.svelte.js"() {
    init_chunks();
    init_MultiSelect();
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      const values = Object.values(data);
      let stringToMatch = "";
      let countries = values;
      console.log(stringToMatch);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$rendered = `<div class="${"container m-8"}"><h1 class="${"text-2xl"}">Patscenario</h1>
    
    <form>${validate_component(MultiSelect$1, "MultiSelect").$$render(
          $$result,
          {
            titleText: "",
            label: "Select Countries",
            items: [
              { id: "Germany", text: "Germany" },
              { id: "Australia", text: "Australia" },
              { id: "UK", text: "United Kingdom (EP)" }
            ],
            value: stringToMatch
          },
          {
            value: ($$value) => {
              stringToMatch = $$value;
              $$settled = false;
            }
          },
          {}
        )}
        <input placeholder="${"Enter a Country Name"}" class="${"block rounded-md border-gray-300 m-8 shadow-sm w-80"}" type="${"text"}"${add_attribute("value", stringToMatch, 0)}></form>
    ${each(getFilteredCountries(countries, stringToMatch), (value) => {
          return `<li>${escape(value.Country)} - ${escape(value.Filing_Fee)} ${escape(value.Currency)}</li>`;
        })}</div>`;
      } while (!$$settled);
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  file: () => file5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  server: () => page_server_exports2,
  stylesheets: () => stylesheets5
});
var index5, component5, file5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_page_server2();
    index5 = 4;
    component5 = async () => (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    file5 = "_app/immutable/components/pages/result/_page.svelte-c287bf30.js";
    imports5 = ["_app/immutable/components/pages/result/_page.svelte-c287bf30.js", "_app/immutable/chunks/index-851e755b.js", "_app/immutable/chunks/MultiSelect-3bd6ffff.js", "_app/immutable/chunks/Close-c1d67ad7.js"];
    stylesheets5 = ["_app/immutable/assets/g10-8dd097ea.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/index.js
init_chunks();

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\u0000",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var object_proto_names2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function uneval(value) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== object_proto_names2) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map(
          (v, i) => i in thing ? stringify2(v) : ""
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index7 = p++;
    indexes.set(thing, index7);
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index7] = str;
    return index7;
  }
  const index6 = flatten(value);
  if (index6 < 0)
    return `${index6}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0 }, {}, {
    default: () => {
      return `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, form }, {}, {})}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, form }, {}, {})}`}

${``}`;
});
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  var _a;
  const type = ((_a = request.headers.get("content-type")) == null ? void 0 : _a.split(";", 1)[0].trim()) ?? "";
  return types.includes(type);
}
function is_form_content_type(request) {
  return is_content_type(request, "application/x-www-form-urlencoded", "multipart/form-data");
}
var HttpError = class {
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var ValidationError = class {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return error2;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function check_method_names(mod) {
  ["get", "post", "put", "patch", "del"].forEach((m) => {
    if (m in mod) {
      const replacement = m === "del" ? "DELETE" : m.toUpperCase();
      throw Error(
        `Endpoint method "${m}" has changed to "${replacement}". See https://github.com/sveltejs/kit/discussions/5359 for more information.`
      );
    }
  });
}
var GENERIC_ERROR = {
  id: "__error"
};
function method_not_allowed(mod, method) {
  return new Response(`${method} method not allowed`, {
    status: 405,
    headers: {
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function get_option(nodes, option) {
  return nodes.reduce((value, node) => {
    var _a, _b;
    for (const thing of [node == null ? void 0 : node.server, node == null ? void 0 : node.shared]) {
      if (thing && ("router" in thing || "hydrate" in thing)) {
        throw new Error(
          "`export const hydrate` and `export const router` have been replaced with `export const csr`. See https://github.com/sveltejs/kit/pull/6446"
        );
      }
    }
    return ((_a = node == null ? void 0 : node.shared) == null ? void 0 : _a[option]) ?? ((_b = node == null ? void 0 : node.server) == null ? void 0 : _b[option]) ?? value;
  }, void 0);
}
function static_error_page(options, status, message) {
  return new Response(options.error_template({ status, message }), {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (has_data_suffix(event.url.pathname) || type === "application/json") {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  return static_error_page(options, status, body.message);
}
function handle_error_and_jsonify(event, options, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return options.handle_error(error2, event);
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function serialize_data_node(node) {
  if (!node)
    return "null";
  if (node.type === "error" || node.type === "skip") {
    return JSON.stringify(node);
  }
  const stringified = stringify(node.data);
  const uses = [];
  if (node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses.parent)
    uses.push(`"parent":1`);
  if (node.uses.route)
    uses.push(`"route":1`);
  if (node.uses.url)
    uses.push(`"url":1`);
  return `{"type":"data","data":${stringified},"uses":{${uses.join(",")}}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
}
async function render_endpoint(event, mod, state) {
  const method = event.request.method;
  check_method_names(mod);
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.initiator) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler2(
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (error2) {
    if (error2 instanceof Redirect) {
      return new Response(void 0, {
        status: error2.status,
        headers: { location: error2.location }
      });
    }
    throw error2;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter((val) => val != null);
}
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function json(data, init2) {
  const headers = new Headers(init2 == null ? void 0 : init2.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(JSON.stringify(data), {
    ...init2,
    headers
  });
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options, server2) {
  const actions2 = server2.actions;
  if (!actions2) {
    maybe_throw_migration_error(server2);
    return new Response("POST method not allowed. No actions exist for this page", {
      status: 405,
      headers: {
        allow: "GET"
      }
    });
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (data instanceof ValidationError) {
      return action_json({
        type: "invalid",
        status: data.status,
        data: stringify_action_response(data.data, event.route.id)
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        data: stringify_action_response(data, event.route.id)
      });
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: error2.status,
        location: error2.location
      });
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options, check_incorrect_invalid_use(error2))
      },
      {
        status: error2 instanceof HttpError ? error2.status : 500
      }
    );
  }
}
function check_incorrect_invalid_use(error2) {
  return error2 instanceof ValidationError ? new Error(`Cannot "throw invalid()". Use "return invalid()"`) : error2;
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event, leaf_node) {
  return leaf_node.server && event.request.method !== "GET" && event.request.method !== "HEAD";
}
async function handle_action_request(event, server2) {
  const actions2 = server2.actions;
  if (!actions2) {
    maybe_throw_migration_error(server2);
    event.setHeaders({
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions2);
  try {
    const data = await call_action(event, actions2);
    if (data instanceof ValidationError) {
      return { type: "invalid", status: data.status, data: data.data };
    } else {
      return {
        type: "success",
        status: 200,
        data
      };
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return {
        type: "redirect",
        status: error2.status,
        location: error2.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_invalid_use(error2)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")}`
    );
  }
  return action(event);
}
function maybe_throw_migration_error(server2) {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    if (server2[method]) {
      throw new Error(
        `${method} method no longer allowed in +page.server, use actions instead. See the PR for more info: https://github.com/sveltejs/kit/pull/6469`
      );
    }
  }
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = e;
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  var _a;
  for (const key2 in object) {
    if (typeof ((_a = object[key2]) == null ? void 0 : _a.then) === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, state, node, parent }) {
  var _a;
  if (!(node == null ? void 0 : node.server))
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await ((_a = node.server.load) == null ? void 0 : _a.call(null, {
    ...event,
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[key2];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: {
      get id() {
        uses.route = true;
        return event.route.id;
      }
    },
    url
  }));
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  var _a;
  const server_data_node = await server_data_promise;
  if (!((_a = node == null ? void 0 : node.shared) == null ? void 0 : _a.load)) {
    return (server_data_node == null ? void 0 : server_data_node.data) ?? null;
  }
  const load_event = {
    url: event.url,
    params: event.params,
    data: (server_data_node == null ? void 0 : server_data_node.data) ?? null,
    route: event.route,
    fetch: async (input, init2) => {
      const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
      const response = await event.fetch(input, init2);
      const url = new URL(input instanceof Request ? input.url : input, event.url);
      const same_origin = url.origin === event.url.origin;
      let dependency;
      if (same_origin) {
        if (state.prerendering) {
          dependency = { response, body: null };
          state.prerendering.dependencies.set(url.pathname, dependency);
        }
      } else {
        const mode = input instanceof Request ? input.mode : (init2 == null ? void 0 : init2.mode) ?? "cors";
        if (mode !== "no-cors") {
          const acao = response.headers.get("access-control-allow-origin");
          if (!acao || acao !== event.url.origin && acao !== "*") {
            throw new Error(
              `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
            );
          }
        }
      }
      const proxy = new Proxy(response, {
        get(response2, key2, _receiver) {
          async function text() {
            const body = await response2.text();
            if (!body || typeof body === "string") {
              const status_number = Number(response2.status);
              if (isNaN(status_number)) {
                throw new Error(
                  `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
                );
              }
              fetched.push({
                url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
                method: event.request.method,
                request_body: input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2 == null ? void 0 : init2.body,
                response_body: body,
                response: response2
              });
            }
            if (dependency) {
              dependency.body = body;
            }
            return body;
          }
          if (key2 === "arrayBuffer") {
            return async () => {
              const buffer = await response2.arrayBuffer();
              if (dependency) {
                dependency.body = new Uint8Array(buffer);
              }
              return buffer;
            };
          }
          if (key2 === "text") {
            return text;
          }
          if (key2 === "json") {
            return async () => {
              return JSON.parse(await text());
            };
          }
          return Reflect.get(response2, key2, response2);
        }
      });
      if (csr) {
        const get2 = response.headers.get;
        response.headers.get = (key2) => {
          const lower = key2.toLowerCase();
          const value = get2.call(response.headers, lower);
          if (value && !lower.startsWith("x-sveltekit-")) {
            const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
            if (!included) {
              throw new Error(
                `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route})`
              );
            }
          }
          return value;
        };
      }
      return proxy;
    },
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  };
  Object.defineProperties(load_event, {
    session: {
      get() {
        throw new Error(
          "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
        );
      },
      enumerable: false
    }
  });
  const data = await node.shared.load.call(null, load_event);
  return data ? unwrap_promises(data) : null;
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(value) {
  let hash2 = 5381;
  if (typeof value === "string") {
    let i = value.length;
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else if (ArrayBuffer.isView(value)) {
    const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    let i = buffer.length;
    while (i)
      hash2 = hash2 * 33 ^ buffer[--i];
  } else {
    throw new TypeError("value must be a string or TypedArray");
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_body) {
    attrs.push(`data-hash=${escape_html_attr(hash(fetched.request_body))}`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  constructor(use_hashes, directives, nonce, dev) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, dev ? { ...directives } : directives);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  constructor(use_hashes, directives, nonce, dev) {
    var _a, _b;
    super(use_hashes, directives, nonce, dev);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = ((_a = directives["report-to"]) == null ? void 0 : _a.length) ?? 0 > 0;
      const has_report_uri = ((_b = directives["report-uri"]) == null ? void 0 : _b.length) ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  constructor({ mode, directives, reportOnly }, { prerender, dev }) {
    __publicField(this, "nonce", generate_nonce());
    __publicField(this, "csp_provider");
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  options,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  var _a;
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { entry } = options.manifest._;
  const stylesheets6 = new Set(entry.stylesheets);
  const modulepreloads = new Set(entry.imports);
  const fonts6 = new Set(options.manifest._.entry.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = (action_result == null ? void 0 : action_result.type) === "success" || (action_result == null ? void 0 : action_result.type) === "invalid" ? action_result.data ?? null : null;
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      components: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data = {};
    for (let i = 0; i < branch.length; i += 1) {
      data = { ...data, ...branch[i].data };
      props[`data_${i}`] = data;
    }
    props.page = {
      error: error2,
      params: event.params,
      route: event.route,
      status,
      url: event.url,
      data,
      form: form_value
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    rendered = options.root.render(props);
    for (const { node } of branch) {
      if (node.imports) {
        node.imports.forEach((url) => modulepreloads.add(url));
      }
      if (node.stylesheets) {
        node.stylesheets.forEach((url) => stylesheets6.add(url));
      }
      if (node.fonts) {
        node.fonts.forEach((url) => fonts6.add(url));
      }
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering
  });
  const target = hash(body);
  let assets2;
  if (options.paths.assets) {
    assets2 = options.paths.assets;
  } else if ((_a = state.prerendering) == null ? void 0 : _a.fallback) {
    assets2 = options.paths.base;
  } else {
    const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
    assets2 = segments.length > 0 ? segments.map(() => "..").join("/") : ".";
  }
  const prefixed = (path) => path.startsWith("/") ? path : `${assets2}/${path}`;
  const serialized = { data: "", form: "null" };
  try {
    serialized.data = `[${branch.map(({ server_data }) => {
      if ((server_data == null ? void 0 : server_data.type) === "data") {
        const data = uneval(server_data.data);
        const uses = [];
        if (server_data.uses.dependencies.size > 0) {
          uses.push(`dependencies:${s(Array.from(server_data.uses.dependencies))}`);
        }
        if (server_data.uses.params.size > 0) {
          uses.push(`params:${s(Array.from(server_data.uses.params))}`);
        }
        if (server_data.uses.parent)
          uses.push(`parent:1`);
        if (server_data.uses.route)
          uses.push(`route:1`);
        if (server_data.uses.url)
          uses.push(`url:1`);
        return `{type:"data",data:${data},uses:{${uses.join(",")}}${server_data.slash ? `,slash:${s(server_data.slash)}` : ""}}`;
      }
      return s(server_data);
    }).join(",")}]`;
  } catch (e) {
    const error3 = e;
    throw new Error(clarify_devalue_error(event, error3));
  }
  if (form_value) {
    serialized.form = uneval_action_response(form_value, event.route.id);
  }
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets6) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "css", path })) {
      const attributes = [];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (inline_styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      } else {
        const preload_atts = ['rel="preload"', 'as="style"'].concat(attributes);
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
      attributes.unshift('rel="stylesheet"');
      head += `
		<link href="${path}" ${attributes.join(" ")}>`;
    }
  }
  for (const dep of fonts6) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  if (page_config.csr) {
    const init_app = `
			import { start } from ${s(prefixed(entry.file))};

			start({
				env: ${s(options.public_env)},
				hydrate: ${page_config.ssr ? `{
					status: ${status},
					error: ${uneval(error2)},
					node_ids: [${branch.map(({ node }) => node.index).join(", ")}],
					params: ${uneval(event.params)},
					route: ${s(event.route)},
					data: ${serialized.data},
					form: ${serialized.form}
				}` : "null"},
				paths: ${s(options.paths)},
				target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
				version: ${s(options.version)}
			});
		`;
    for (const dep of modulepreloads) {
      const path = prefixed(dep);
      if (resolve_opts.preload({ type: "js", path })) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
  }
  if (page_config.ssr && page_config.csr) {
    body += `
	${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n	")}`;
  }
  if (options.service_worker) {
    const opts = options.dev ? `, { type: 'module' }` : "";
    const init_service_worker = `
			if ('serviceWorker' in navigator) {
				addEventListener('load', function () {
					navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
				});
			}
		`;
    csp.add_script(init_service_worker);
    head += `
		<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  head += rendered.head;
  const html = await resolve_opts.transformPageChunk({
    html: options.app_template({ head, body, assets: assets2, nonce: csp.nonce }),
    done: true
  }) || "";
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (!state.prerendering) {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
async function respond_with_error({ event, options, state, status, error: error2, resolve_opts }) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await options.manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.initiator = GENERIC_ERROR;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await options.manifest._.nodes[1](),
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (error3) {
    if (error3 instanceof Redirect) {
      return redirect_response(error3.status, error3.location);
    }
    return static_error_page(
      options,
      error3 instanceof HttpError ? error3.status : 500,
      (await handle_error_and_jsonify(event, options, error3)).message
    );
  }
}
async function render_page(event, route, page2, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  state.initiator = route;
  if (is_action_json_request(event)) {
    const node = await options.manifest._.nodes[page2.leaf]();
    if (node.server) {
      return handle_action_json_request(event, options, node.server);
    }
  }
  try {
    const nodes = await Promise.all([
      ...page2.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
      options.manifest._.nodes[page2.leaf]()
    ]);
    const leaf_node = nodes.at(-1);
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event, leaf_node)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if ((action_result == null ? void 0 : action_result.type) === "redirect") {
        return redirect_response(303, action_result.location);
      }
      if ((action_result == null ? void 0 : action_result.type) === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if ((action_result == null ? void 0 : action_result.type) === "invalid") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node == null ? void 0 : node.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod && mod.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && (action_result == null ? void 0 : action_result.type) === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: new Response(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options, err);
          while (i--) {
            if (page2.errors[i]) {
              const index6 = page2.errors[i];
              const node2 = await options.manifest._.nodes[index6]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      const body = `{"type":"data","nodes":[${branch.map((node) => serialize_data_node(node == null ? void 0 : node.server_data)).join(",")}]}`;
      state.prerendering.dependencies.set(data_pathname, {
        response: new Response(body),
        body
      });
    }
    return await render_response({
      event,
      options,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (error2) {
    return await respond_with_error({
      event,
      options,
      state,
      status: 500,
      error: error2,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = "";
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i];
    if (param.chained && param.rest && buffered) {
      value = value ? buffered + "/" + value : buffered;
    }
    buffered = "";
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
    } else {
      if (param.matcher && !matchers[param.matcher](value)) {
        if (param.optional && param.chained) {
          let j = values.indexOf(void 0, i);
          if (j === -1) {
            const next = params[i + 1];
            if ((next == null ? void 0 : next.rest) && next.chained) {
              buffered = value;
            } else {
              return;
            }
          }
          while (j >= i) {
            values[j] = values[j - 1];
            j -= 1;
          }
          continue;
        }
        return;
      }
      result[param.name] = value;
    }
  }
  if (buffered)
    return;
  return result;
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var INVALIDATED_HEADER = "x-sveltekit-invalidated";
async function render_data(event, route, options, state, trailing_slash) {
  var _a;
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = ((_a = event.url.searchParams.get(INVALIDATED_HEADER)) == null ? void 0 : _a.split("_").map(Boolean)) ?? node_ids.map(() => true);
    event.url.searchParams.delete(INVALIDATED_HEADER);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(strip_data_suffix(url.pathname), trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return {
              type: "skip"
            };
          }
          const node = n == void 0 ? n : await options.manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await functions[j]();
                if (parent) {
                  Object.assign(data, parent.data);
                }
              }
              return data;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return {
          type: "skip"
        };
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return {
            type: "error",
            error: await handle_error_and_jsonify(event, options, error2),
            status: error2 instanceof HttpError ? error2.status : void 0
          };
        })
      )
    );
    try {
      const stubs = nodes.slice(0, length).map(serialize_data_node);
      const json2 = `{"type":"data","nodes":[${stubs.join(",")}]}`;
      return json_response(json2);
    } catch (e) {
      const error2 = e;
      return json_response(JSON.stringify(clarify_devalue_error(event, error2)), 500);
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(JSON.stringify(await handle_error_and_jsonify(event, options, error2)));
    }
  }
}
function json_response(json2, status = 200) {
  return new Response(json2, {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response(
    JSON.stringify({
      type: "redirect",
      location: redirect.location
    })
  );
}
var cookie_paths = {};
var encode = encodeURIComponent;
var decode = decodeURIComponent;
function get_cookies(request, url, dev, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode });
  const normalized_url = normalize_path(
    has_data_suffix(url.pathname) ? strip_data_suffix(url.pathname) : url.pathname,
    trailing_slash
  );
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  if (dev) {
    for (const name of Object.keys(cookie_paths)) {
      cookie_paths[name] = new Set(
        [...cookie_paths[name]].filter(
          (path) => !path_matches(normalized_url, path) || name in initial_cookies
        )
      );
    }
    for (const name in initial_cookies) {
      cookie_paths[name] = cookie_paths[name] ?? /* @__PURE__ */ new Set();
      if (![...cookie_paths[name]].some((path) => path_matches(normalized_url, path))) {
        cookie_paths[name].add(default_path);
      }
    }
  }
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = (opts == null ? void 0 : opts.decode) || decode;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      if (!dev || cookie) {
        return cookie;
      }
      const paths = /* @__PURE__ */ new Set([...cookie_paths[name] ?? []]);
      if (c) {
        paths.add(c.options.path ?? default_path);
      }
      if (paths.size > 0) {
        console.warn(
          `Cookie with name '${name}' was not found at path '${url.pathname}', but a cookie with that name exists at these paths: '${[...paths].join("', '")}'. Did you mean to set its 'path' to '/' instead?`
        );
      }
    },
    set(name, value, opts = {}) {
      let path = opts.path ?? default_path;
      new_cookies[name] = {
        name,
        value,
        options: {
          ...defaults,
          ...opts,
          path
        }
      };
      if (dev) {
        cookie_paths[name] = cookie_paths[name] ?? /* @__PURE__ */ new Set();
        if (!value) {
          if (!cookie_paths[name].has(path) && cookie_paths[name].size > 0) {
            const paths = `'${Array.from(cookie_paths[name]).join("', '")}'`;
            console.warn(
              `Trying to delete cookie '${name}' at path '${path}', but a cookie with that name only exists at these paths: ${paths}.`
            );
          }
          cookie_paths[name].delete(path);
        } else {
          cookie_paths[name].add(path);
        }
      }
    },
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {};
    for (const name in initial_cookies) {
      combined_cookies[name] = encode(initial_cookies[name]);
    }
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encode;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode });
      for (const name in parsed) {
        combined_cookies[name] = encode(parsed[name]);
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  return { cookies, new_cookies, get_cookie_header };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options));
  }
}
function create_fetch({ event, options, state, get_cookie_header }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    const request_body = init2 == null ? void 0 : init2.body;
    let mode = (info instanceof Request ? info.mode : init2 == null ? void 0 : init2.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2 == null ? void 0 : init2.credentials) ?? "same-origin";
    return await options.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3 == null ? void 0 : init3.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3 == null ? void 0 : init3.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          let response2 = await fetch(request);
          if (mode === "no-cors") {
            response2 = new Response("", {
              status: response2.status,
              statusText: response2.statusText,
              headers: response2.headers
            });
          }
          return response2;
        }
        let response;
        const prefix2 = options.paths.assets || options.paths.base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file6 = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(options.read(file6), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) {
          throw new Error("Request body must be a string or TypedArray");
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options, state);
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options2 } = set_cookie_parser.parseString(str);
            event.cookies.set(
              name,
              value,
              options2
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
async function respond(request, options, state) {
  var _a, _b, _c;
  let url = new URL(request.url);
  if (options.csrf.check_origin) {
    const forbidden = request.method === "POST" && request.headers.get("origin") !== url.origin && is_form_content_type(request);
    if (forbidden) {
      return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
        status: 403
      });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return new Response("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (options.paths.base && !((_a = state.prerendering) == null ? void 0 : _a.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response("Not found", { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  if (is_data_request)
    decoded = strip_data_suffix(decoded) || "/";
  if (!((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  const event = {
    cookies: null,
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: (route == null ? void 0 : route.id) ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = value;
          }
        }
      }
    },
    url
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error(
        "To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details
      );
    }
  };
  Object.defineProperties(event, {
    clientAddress: removed("clientAddress", "getClientAddress"),
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter,
    routeId: removed("routeId", "route.id")
  });
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route && !is_data_request) {
      if (route.page) {
        const nodes = await Promise.all([
          ...route.page.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
          options.manifest._.nodes[route.page.leaf]()
        ]);
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
      }
      const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
      if (normalized !== url.pathname && !((_c = state.prerendering) == null ? void 0 : _c.fallback)) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
          }
        });
      }
    }
    const { cookies, new_cookies, get_cookie_header } = get_cookies(
      request,
      url,
      options.dev,
      trailing_slash ?? "never"
    );
    event.cookies = cookies;
    event.fetch = create_fetch({ event, options, state, get_cookie_header });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(key2, value);
        }
        add_cookies_to_headers(response2.headers, Object.values(new_cookies));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      }),
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = response.headers.get("etag");
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(response.status, location));
      }
    }
    return response;
  } catch (error2) {
    if (error2 instanceof Redirect) {
      if (is_data_request) {
        return redirect_json_response(error2);
      } else {
        return redirect_response(error2.status, error2.location);
      }
    }
    return await handle_fatal_error(event, options, error2);
  }
  async function resolve(event2, opts) {
    var _a2;
    try {
      if (opts) {
        if ("transformPage" in opts) {
          throw new Error(
            "transformPage has been replaced by transformPageChunk \u2014 see https://github.com/sveltejs/kit/pull/5657 for more information"
          );
        }
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
        return await render_response({
          event: event2,
          options,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(event2, route, options, state, trailing_slash ?? "never");
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route, route.page, options, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.initiator === GENERIC_ERROR) {
        return new Response("Internal Server Error", {
          status: 500
        });
      }
      if (!state.initiator) {
        return await respond_with_error({
          event: event2,
          options,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return new Response("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (error2) {
      return await handle_fatal_error(event2, options, error2);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var app_template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n";
var error_template = ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid #ccc;
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      csrf: {
        check_origin: true
      },
      dev: false,
      handle_error: (error2, event) => {
        return this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        }) ?? { message: event.route.id != null ? "Internal Error" : "Not Found" };
      },
      hooks: null,
      manifest: manifest2,
      paths: { base, assets },
      public_env: {},
      read,
      root: Root,
      service_worker: false,
      app_template,
      app_template_contains_nonce: false,
      error_template,
      version: "1670421484929"
    };
  }
  async init({ env }) {
    const entries = Object.entries(env);
    Object.fromEntries(entries.filter(([k]) => !k.startsWith("PUBLIC_")));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith("PUBLIC_")));
    this.options.public_env = pub;
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks(), hooks_exports));
      if (module.externalFetch) {
        throw new Error("externalFetch has been removed \u2014 use handleFetch instead. See https://github.com/sveltejs/kit/pull/6565 for details");
      }
      this.options.hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/netlify-tmp/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "robots.txt"]),
  mimeTypes: { ".png": "image/png", ".txt": "text/plain" },
  _: {
    entry: { "file": "_app/immutable/start-da2a61ed.js", "imports": ["_app/immutable/start-da2a61ed.js", "_app/immutable/chunks/index-851e755b.js", "_app/immutable/chunks/singletons-7ac7dec9.js", "_app/immutable/chunks/index-cde18a9a.js"], "stylesheets": [], "fonts": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/app",
        pattern: /^\/app\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 3 },
        endpoint: null
      },
      {
        id: "/result",
        pattern: /^\/result\/?$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 4 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file6 = pathname.substring(1);
  try {
    file6 = decodeURIComponent(file6);
  } catch (err) {
  }
  return manifest.assets.has(file6) || manifest.assets.has(file6 + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=render.js.map
