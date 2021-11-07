(function (c, h) {
  function d(n, j) {
    var m,
      e,
      k,
      l = n.nodeName.toLowerCase();
    return "area" === l
      ? ((m = n.parentNode),
        (e = m.name),
        n.href && e && "map" === m.nodeName.toLowerCase()
          ? ((k = c("img[usemap=#" + e + "]")[0]), !!k && f(k))
          : !1)
      : (/input|select|textarea|button|object/.test(l)
          ? !n.disabled
          : "a" === l
          ? n.href || j
          : j) && f(n);
  }
  function f(a) {
    return (
      c.expr.filters.visible(a) &&
      !c(a)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === c.css(this, "visibility");
        }).length
    );
  }
  var g = 0,
    b = /^ui-id-\d+$/;
  (c.ui = c.ui || {}),
    c.extend(c.ui, {
      version: "1.10.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    c.fn.extend({
      focus: (function (a) {
        return function (e, j) {
          return "number" == typeof e
            ? this.each(function () {
                var i = this;
                setTimeout(function () {
                  c(i).focus(), j && j.call(i);
                }, e);
              })
            : a.apply(this, arguments);
        };
      })(c.fn.focus),
      scrollParent: function () {
        var a;
        return (
          (a =
            (c.ui.ie && /(static|relative)/.test(this.css("position"))) ||
            /absolute/.test(this.css("position"))
              ? this.parents()
                  .filter(function () {
                    return (
                      /(relative|absolute|fixed)/.test(
                        c.css(this, "position")
                      ) &&
                      /(auto|scroll)/.test(
                        c.css(this, "overflow") +
                          c.css(this, "overflow-y") +
                          c.css(this, "overflow-x")
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function () {
                    return /(auto|scroll)/.test(
                      c.css(this, "overflow") +
                        c.css(this, "overflow-y") +
                        c.css(this, "overflow-x")
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css("position")) || !a.length ? c(document) : a
        );
      },
      zIndex: function (j) {
        if (j !== h) {
          return this.css("zIndex", j);
        }
        if (this.length) {
          for (var k, l, e = c(this[0]); e.length && e[0] !== document; ) {
            if (
              ((k = e.css("position")),
              ("absolute" === k || "relative" === k || "fixed" === k) &&
                ((l = parseInt(e.css("zIndex"), 10)), !isNaN(l) && 0 !== l))
            ) {
              return l;
            }
            e = e.parent();
          }
        }
        return 0;
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++g);
        });
      },
      removeUniqueId: function () {
        return this.each(function () {
          b.test(this.id) && c(this).removeAttr("id");
        });
      },
    }),
    c.extend(c.expr[":"], {
      data: c.expr.createPseudo
        ? c.expr.createPseudo(function (a) {
            return function (e) {
              return !!c.data(e, a);
            };
          })
        : function (j, a, e) {
            return !!c.data(j, e[3]);
          },
      focusable: function (a) {
        return d(a, !isNaN(c.attr(a, "tabindex")));
      },
      tabbable: function (i) {
        var a = c.attr(i, "tabindex"),
          e = isNaN(a);
        return (e || a >= 0) && d(i, !e);
      },
    }),
    c("<a>").outerWidth(1).jquery ||
      c.each(["Width", "Height"], function (j, k) {
        function p(r, a, o, q) {
          return (
            c.each(e, function () {
              (a -= parseFloat(c.css(r, "padding" + this)) || 0),
                o &&
                  (a -= parseFloat(c.css(r, "border" + this + "Width")) || 0),
                q && (a -= parseFloat(c.css(r, "margin" + this)) || 0);
            }),
            a
          );
        }
        var e = "Width" === k ? ["Left", "Right"] : ["Top", "Bottom"],
          l = k.toLowerCase(),
          m = {
            innerWidth: c.fn.innerWidth,
            innerHeight: c.fn.innerHeight,
            outerWidth: c.fn.outerWidth,
            outerHeight: c.fn.outerHeight,
          };
        (c.fn["inner" + k] = function (a) {
          return a === h
            ? m["inner" + k].call(this)
            : this.each(function () {
                c(this).css(l, p(this, a) + "px");
              });
        }),
          (c.fn["outer" + k] = function (n, a) {
            return "number" != typeof n
              ? m["outer" + k].call(this, n)
              : this.each(function () {
                  c(this).css(l, p(this, n, !0, a) + "px");
                });
          });
      }),
    c.fn.addBack ||
      (c.fn.addBack = function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      }),
    c("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (c.fn.removeData = (function (a) {
        return function (e) {
          return arguments.length ? a.call(this, c.camelCase(e)) : a.call(this);
        };
      })(c.fn.removeData)),
    (c.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (c.support.selectstart = "onselectstart" in document.createElement("div")),
    c.fn.extend({
      disableSelection: function () {
        return this.bind(
          (c.support.selectstart ? "selectstart" : "mousedown") +
            ".ui-disableSelection",
          function (a) {
            a.preventDefault();
          }
        );
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
    }),
    c.extend(c.ui, {
      plugin: {
        add: function (m, j, k) {
          var l,
            e = c.ui[m].prototype;
          for (l in k) {
            (e.plugins[l] = e.plugins[l] || []), e.plugins[l].push([j, k[l]]);
          }
        },
        call: function (a, m, j) {
          var k,
            l = a.plugins[m];
          if (
            l &&
            a.element[0].parentNode &&
            11 !== a.element[0].parentNode.nodeType
          ) {
            for (k = 0; l.length > k; k++) {
              a.options[l[k][0]] && l[k][1].apply(a.element, j);
            }
          }
        },
      },
      hasScroll: function (k, a) {
        if ("hidden" === c(k).css("overflow")) {
          return !1;
        }
        var e = a && "left" === a ? "scrollLeft" : "scrollTop",
          j = !1;
        return k[e] > 0 ? !0 : ((k[e] = 1), (j = k[e] > 0), (k[e] = 0), j);
      },
    });
})(jQuery);
(function (f, a) {
  var b = 0,
    d = Array.prototype.slice,
    c = f.cleanData;
  (f.cleanData = function (g) {
    for (var h, k = 0; null != (h = g[k]); k++) {
      try {
        f(h).triggerHandler("remove");
      } catch (j) {}
    }
    c(g);
  }),
    (f.widget = function (k, u, p) {
      var q,
        e,
        t,
        j,
        m = {},
        g = k.split(".")[0];
      (k = k.split(".")[1]),
        (q = g + "-" + k),
        p || ((p = u), (u = f.Widget)),
        (f.expr[":"][q.toLowerCase()] = function (h) {
          return !!f.data(h, q);
        }),
        (f[g] = f[g] || {}),
        (e = f[g][k]),
        (t = f[g][k] =
          function (l, h) {
            return this._createWidget
              ? (arguments.length && this._createWidget(l, h), a)
              : new t(l, h);
          }),
        f.extend(t, e, {
          version: p.version,
          _proto: f.extend({}, p),
          _childConstructors: [],
        }),
        (j = new u()),
        (j.options = f.widget.extend({}, j.options)),
        f.each(p, function (h, l) {
          return f.isFunction(l)
            ? ((m[h] = (function () {
                var n = function () {
                    return u.prototype[h].apply(this, arguments);
                  },
                  i = function (o) {
                    return u.prototype[h].apply(this, o);
                  };
                return function () {
                  var r,
                    w = this._super,
                    v = this._superApply;
                  return (
                    (this._super = n),
                    (this._superApply = i),
                    (r = l.apply(this, arguments)),
                    (this._super = w),
                    (this._superApply = v),
                    r
                  );
                };
              })()),
              a)
            : ((m[h] = l), a);
        }),
        (t.prototype = f.widget.extend(
          j,
          { widgetEventPrefix: e ? j.widgetEventPrefix || k : k },
          m,
          { constructor: t, namespace: g, widgetName: k, widgetFullName: q }
        )),
        e
          ? (f.each(e._childConstructors, function (h, l) {
              var n = l.prototype;
              f.widget(n.namespace + "." + n.widgetName, t, l._proto);
            }),
            delete e._childConstructors)
          : u._childConstructors.push(t),
        f.widget.bridge(k, t);
    }),
    (f.widget.extend = function (j) {
      for (
        var k, l, e = d.call(arguments, 1), m = 0, g = e.length;
        g > m;
        m++
      ) {
        for (k in e[m]) {
          (l = e[m][k]),
            e[m].hasOwnProperty(k) &&
              l !== a &&
              (j[k] = f.isPlainObject(l)
                ? f.isPlainObject(j[k])
                  ? f.widget.extend({}, j[k], l)
                  : f.widget.extend({}, l)
                : l);
        }
      }
      return j;
    }),
    (f.widget.bridge = function (e, g) {
      var h = g.prototype.widgetFullName || e;
      f.fn[e] = function (i) {
        var m = "string" == typeof i,
          j = d.call(arguments, 1),
          k = this;
        return (
          (i = !m && j.length ? f.widget.extend.apply(null, [i].concat(j)) : i),
          m
            ? this.each(function () {
                var o,
                  l = f.data(this, h);
                return l
                  ? f.isFunction(l[i]) && "_" !== i.charAt(0)
                    ? ((o = l[i].apply(l, j)),
                      o !== l && o !== a
                        ? ((k = o && o.jquery ? k.pushStack(o.get()) : o), !1)
                        : a)
                    : f.error(
                        "no such method '" +
                          i +
                          "' for " +
                          e +
                          " widget instance"
                      )
                  : f.error(
                      "cannot call methods on " +
                        e +
                        " prior to initialization; attempted to call method '" +
                        i +
                        "'"
                    );
              })
            : this.each(function () {
                var l = f.data(this, h);
                l ? l.option(i || {})._init() : f.data(this, h, new g(i, this));
              }),
          k
        );
      };
    }),
    (f.Widget = function () {}),
    (f.Widget._childConstructors = []),
    (f.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (g, h) {
        (h = f(h || this.defaultElement || this)[0]),
          (this.element = f(h)),
          (this.uuid = b++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.options = f.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            g
          )),
          (this.bindings = f()),
          (this.hoverable = f()),
          (this.focusable = f()),
          h !== this &&
            (f.data(h, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (e) {
                e.target === h && this.destroy();
              },
            }),
            (this.document = f(h.style ? h.ownerDocument : h.document || h)),
            (this.window = f(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: f.noop,
      _getCreateEventData: f.noop,
      _create: f.noop,
      _init: f.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetName)
            .removeData(this.widgetFullName)
            .removeData(f.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: f.noop,
      widget: function () {
        return this.element;
      },
      option: function (g, l) {
        var h,
          j,
          e,
          k = g;
        if (0 === arguments.length) {
          return f.widget.extend({}, this.options);
        }
        if ("string" == typeof g) {
          if (((k = {}), (h = g.split(".")), (g = h.shift()), h.length)) {
            for (
              j = k[g] = f.widget.extend({}, this.options[g]), e = 0;
              h.length - 1 > e;
              e++
            ) {
              (j[h[e]] = j[h[e]] || {}), (j = j[h[e]]);
            }
            if (((g = h.pop()), 1 === arguments.length)) {
              return j[g] === a ? null : j[g];
            }
            j[g] = l;
          } else {
            if (1 === arguments.length) {
              return this.options[g] === a ? null : this.options[g];
            }
            k[g] = l;
          }
        }
        return this._setOptions(k), this;
      },
      _setOptions: function (h) {
        var g;
        for (g in h) {
          this._setOption(g, h[g]);
        }
        return this;
      },
      _setOption: function (h, g) {
        return (
          (this.options[h] = g),
          "disabled" === h &&
            (this.widget()
              .toggleClass(
                this.widgetFullName + "-disabled ui-state-disabled",
                !!g
              )
              .attr("aria-disabled", g),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
          this
        );
      },
      enable: function () {
        return this._setOption("disabled", !1);
      },
      disable: function () {
        return this._setOption("disabled", !0);
      },
      _on: function (g, k, h) {
        var j,
          e = this;
        "boolean" != typeof g && ((h = k), (k = g), (g = !1)),
          h
            ? ((k = j = f(k)), (this.bindings = this.bindings.add(k)))
            : ((h = k), (k = this.element), (j = this.widget())),
          f.each(h, function (p, q) {
            function m() {
              return g ||
                (e.options.disabled !== !0 &&
                  !f(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof q ? e[q] : q).apply(e, arguments)
                : a;
            }
            "string" != typeof q &&
              (m.guid = q.guid = q.guid || m.guid || f.guid++);
            var o = p.match(/^(\w+)\s*(.*)$/),
              i = o[1] + e.eventNamespace,
              s = o[2];
            s ? j.delegate(s, i, m) : k.bind(i, m);
          });
      },
      _off: function (h, g) {
        (g =
          (g || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          h.unbind(g).undelegate(g);
      },
      _delay: function (k, g) {
        function h() {
          return ("string" == typeof k ? j[k] : k).apply(j, arguments);
        }
        var j = this;
        return setTimeout(h, g || 0);
      },
      _hoverable: function (g) {
        (this.hoverable = this.hoverable.add(g)),
          this._on(g, {
            mouseenter: function (h) {
              f(h.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (h) {
              f(h.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (g) {
        (this.focusable = this.focusable.add(g)),
          this._on(g, {
            focusin: function (h) {
              f(h.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (h) {
              f(h.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (h, j, m) {
        var k,
          l,
          g = this.options[h];
        if (
          ((m = m || {}),
          (j = f.Event(j)),
          (j.type = (
            h === this.widgetEventPrefix ? h : this.widgetEventPrefix + h
          ).toLowerCase()),
          (j.target = this.element[0]),
          (l = j.originalEvent))
        ) {
          for (k in l) {
            k in j || (j[k] = l[k]);
          }
        }
        return (
          this.element.trigger(j, m),
          !(
            (f.isFunction(g) &&
              g.apply(this.element[0], [j].concat(m)) === !1) ||
            j.isDefaultPrevented()
          )
        );
      },
    }),
    f.each({ show: "fadeIn", hide: "fadeOut" }, function (g, h) {
      f.Widget.prototype["_" + g] = function (l, i, j) {
        "string" == typeof i && (i = { effect: i });
        var e,
          k = i ? (i === !0 || "number" == typeof i ? h : i.effect || h) : g;
        (i = i || {}),
          "number" == typeof i && (i = { duration: i }),
          (e = !f.isEmptyObject(i)),
          (i.complete = j),
          i.delay && l.delay(i.delay),
          e && f.effects && f.effects.effect[k]
            ? l[g](i)
            : k !== g && l[k]
            ? l[k](i.duration, i.easing, j)
            : l.queue(function (m) {
                f(this)[g](), j && j.call(l[0]), m();
              });
      };
    });
})(jQuery);
(function (b) {
  var a = !1;
  b(document).mouseup(function () {
    a = !1;
  }),
    b.widget("ui.mouse", {
      version: "1.10.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var c = this;
        this.element
          .bind("mousedown." + this.widgetName, function (d) {
            return c._mouseDown(d);
          })
          .bind("click." + this.widgetName, function (d) {
            return !0 === b.data(d.target, c.widgetName + ".preventClickEvent")
              ? (b.removeData(d.target, c.widgetName + ".preventClickEvent"),
                d.stopImmediatePropagation(),
                !1)
              : undefined;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            b(document)
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (d) {
        if (!a) {
          this._mouseStarted && this._mouseUp(d), (this._mouseDownEvent = d);
          var f = this,
            e = 1 === d.which,
            c =
              "string" == typeof this.options.cancel && d.target.nodeName
                ? b(d.target).closest(this.options.cancel).length
                : !1;
          return e && !c && this._mouseCapture(d)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  f.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(d) &&
              this._mouseDelayMet(d) &&
              ((this._mouseStarted = this._mouseStart(d) !== !1),
              !this._mouseStarted)
                ? (d.preventDefault(), !0)
                : (!0 ===
                    b.data(d.target, this.widgetName + ".preventClickEvent") &&
                    b.removeData(
                      d.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (g) {
                    return f._mouseMove(g);
                  }),
                  (this._mouseUpDelegate = function (g) {
                    return f._mouseUp(g);
                  }),
                  b(document)
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  d.preventDefault(),
                  (a = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (c) {
        return b.ui.ie &&
          (!document.documentMode || 9 > document.documentMode) &&
          !c.button
          ? this._mouseUp(c)
          : this._mouseStarted
          ? (this._mouseDrag(c), c.preventDefault())
          : (this._mouseDistanceMet(c) &&
              this._mouseDelayMet(c) &&
              ((this._mouseStarted =
                this._mouseStart(this._mouseDownEvent, c) !== !1),
              this._mouseStarted ? this._mouseDrag(c) : this._mouseUp(c)),
            !this._mouseStarted);
      },
      _mouseUp: function (c) {
        return (
          b(document)
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            c.target === this._mouseDownEvent.target &&
              b.data(c.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(c)),
          !1
        );
      },
      _mouseDistanceMet: function (c) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - c.pageX),
            Math.abs(this._mouseDownEvent.pageY - c.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    });
})(jQuery);
(function (b) {
  var a = 5;
  b.widget("ui.slider", b.ui.mouse, {
    version: "1.10.4",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null,
    },
    _create: function () {
      (this._keySliding = !1),
        (this._mouseSliding = !1),
        (this._animateOff = !0),
        (this._handleIndex = null),
        this._detectOrientation(),
        this._mouseInit(),
        this.element.addClass(
          "ui-slider ui-slider-" +
            this.orientation +
            " ui-widget ui-widget-content ui-corner-all"
        ),
        this._refresh(),
        this._setOption("disabled", this.options.disabled),
        (this._animateOff = !1);
    },
    _refresh: function () {
      this._createRange(),
        this._createHandles(),
        this._setupEvents(),
        this._refreshValue();
    },
    _createHandles: function () {
      var d,
        f,
        j = this.options,
        g = this.element
          .find(".ui-slider-handle")
          .addClass("ui-state-default ui-corner-all"),
        c =
          "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
        h = [];
      for (
        f = (j.values && j.values.length) || 1,
          g.length > f && (g.slice(f).remove(), (g = g.slice(0, f))),
          d = g.length;
        f > d;
        d++
      ) {
        h.push(c);
      }
      (this.handles = g.add(b(h.join("")).appendTo(this.element))),
        (this.handle = this.handles.eq(0)),
        this.handles.each(function (i) {
          b(this).data("ui-slider-handle-index", i);
        });
    },
    _createRange: function () {
      var c = this.options,
        d = "";
      c.range
        ? (c.range === !0 &&
            (c.values
              ? c.values.length && 2 !== c.values.length
                ? (c.values = [c.values[0], c.values[0]])
                : b.isArray(c.values) && (c.values = c.values.slice(0))
              : (c.values = [this._valueMin(), this._valueMin()])),
          this.range && this.range.length
            ? this.range
                .removeClass("ui-slider-range-min ui-slider-range-max")
                .css({ left: "", bottom: "" })
            : ((this.range = b("<div></div>").appendTo(this.element)),
              (d = "ui-slider-range ui-widget-header ui-corner-all")),
          this.range.addClass(
            d +
              ("min" === c.range || "max" === c.range
                ? " ui-slider-range-" + c.range
                : "")
          ))
        : (this.range && this.range.remove(), (this.range = null));
    },
    _setupEvents: function () {
      var c = this.handles.add(this.range).filter("a");
      this._off(c),
        this._on(c, this._handleEvents),
        this._hoverable(c),
        this._focusable(c);
    },
    _destroy: function () {
      this.handles.remove(),
        this.range && this.range.remove(),
        this.element.removeClass(
          "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
        ),
        this._mouseDestroy();
    },
    _mouseCapture: function (g) {
      var k,
        v,
        p,
        d,
        q,
        t,
        m,
        j,
        w = this,
        f = this.options;
      return f.disabled
        ? !1
        : ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (k = { x: g.pageX, y: g.pageY }),
          (v = this._normValueFromMouse(k)),
          (p = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (c) {
            var h = Math.abs(v - w.values(c));
            (p > h ||
              (p === h &&
                (c === w._lastChangedValue || w.values(c) === f.min))) &&
              ((p = h), (d = b(this)), (q = c));
          }),
          (t = this._start(g, q)),
          t === !1
            ? !1
            : ((this._mouseSliding = !0),
              (this._handleIndex = q),
              d.addClass("ui-state-active").focus(),
              (m = d.offset()),
              (j = !b(g.target).parents().addBack().is(".ui-slider-handle")),
              (this._clickOffset = j
                ? { left: 0, top: 0 }
                : {
                    left: g.pageX - m.left - d.width() / 2,
                    top:
                      g.pageY -
                      m.top -
                      d.height() / 2 -
                      (parseInt(d.css("borderTopWidth"), 10) || 0) -
                      (parseInt(d.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(d.css("marginTop"), 10) || 0),
                  }),
              this.handles.hasClass("ui-state-hover") || this._slide(g, q, v),
              (this._animateOff = !0),
              !0));
    },
    _mouseStart: function () {
      return !0;
    },
    _mouseDrag: function (f) {
      var c = { x: f.pageX, y: f.pageY },
        d = this._normValueFromMouse(c);
      return this._slide(f, this._handleIndex, d), !1;
    },
    _mouseStop: function (c) {
      return (
        this.handles.removeClass("ui-state-active"),
        (this._mouseSliding = !1),
        this._stop(c, this._handleIndex),
        this._change(c, this._handleIndex),
        (this._handleIndex = null),
        (this._clickOffset = null),
        (this._animateOff = !1),
        !1
      );
    },
    _detectOrientation: function () {
      this.orientation =
        "vertical" === this.options.orientation ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function (j) {
      var d, f, h, g, c;
      return (
        "horizontal" === this.orientation
          ? ((d = this.elementSize.width),
            (f =
              j.x -
              this.elementOffset.left -
              (this._clickOffset ? this._clickOffset.left : 0)))
          : ((d = this.elementSize.height),
            (f =
              j.y -
              this.elementOffset.top -
              (this._clickOffset ? this._clickOffset.top : 0))),
        (h = f / d),
        h > 1 && (h = 1),
        0 > h && (h = 0),
        "vertical" === this.orientation && (h = 1 - h),
        (g = this._valueMax() - this._valueMin()),
        (c = this._valueMin() + h * g),
        this._trimAlignValue(c)
      );
    },
    _start: function (f, c) {
      var d = { handle: this.handles[c], value: this.value() };
      return (
        this.options.values &&
          this.options.values.length &&
          ((d.value = this.values(c)), (d.values = this.values())),
        this._trigger("start", f, d)
      );
    },
    _slide: function (j, d, f) {
      var h, g, c;
      this.options.values && this.options.values.length
        ? ((h = this.values(d ? 0 : 1)),
          2 === this.options.values.length &&
            this.options.range === !0 &&
            ((0 === d && f > h) || (1 === d && h > f)) &&
            (f = h),
          f !== this.values(d) &&
            ((g = this.values()),
            (g[d] = f),
            (c = this._trigger("slide", j, {
              handle: this.handles[d],
              value: f,
              values: g,
            })),
            (h = this.values(d ? 0 : 1)),
            c !== !1 && this.values(d, f)))
        : f !== this.value() &&
          ((c = this._trigger("slide", j, {
            handle: this.handles[d],
            value: f,
          })),
          c !== !1 && this.value(f));
    },
    _stop: function (f, c) {
      var d = { handle: this.handles[c], value: this.value() };
      this.options.values &&
        this.options.values.length &&
        ((d.value = this.values(c)), (d.values = this.values())),
        this._trigger("stop", f, d);
    },
    _change: function (f, c) {
      if (!this._keySliding && !this._mouseSliding) {
        var d = { handle: this.handles[c], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((d.value = this.values(c)), (d.values = this.values())),
          (this._lastChangedValue = c),
          this._trigger("change", f, d);
      }
    },
    value: function (c) {
      return arguments.length
        ? ((this.options.value = this._trimAlignValue(c)),
          this._refreshValue(),
          this._change(null, 0),
          undefined)
        : this._value();
    },
    values: function (d, f) {
      var h, g, c;
      if (arguments.length > 1) {
        return (
          (this.options.values[d] = this._trimAlignValue(f)),
          this._refreshValue(),
          this._change(null, d),
          undefined
        );
      }
      if (!arguments.length) {
        return this._values();
      }
      if (!b.isArray(arguments[0])) {
        return this.options.values && this.options.values.length
          ? this._values(d)
          : this.value();
      }
      for (
        h = this.options.values, g = arguments[0], c = 0;
        h.length > c;
        c += 1
      ) {
        (h[c] = this._trimAlignValue(g[c])), this._change(null, c);
      }
      this._refreshValue();
    },
    _setOption: function (c, d) {
      var g,
        f = 0;
      switch (
        ("range" === c &&
          this.options.range === !0 &&
          ("min" === d
            ? ((this.options.value = this._values(0)),
              (this.options.values = null))
            : "max" === d &&
              ((this.options.value = this._values(
                this.options.values.length - 1
              )),
              (this.options.values = null))),
        b.isArray(this.options.values) && (f = this.options.values.length),
        b.Widget.prototype._setOption.apply(this, arguments),
        c)
      ) {
        case "orientation":
          this._detectOrientation(),
            this.element
              .removeClass("ui-slider-horizontal ui-slider-vertical")
              .addClass("ui-slider-" + this.orientation),
            this._refreshValue();
          break;
        case "value":
          (this._animateOff = !0),
            this._refreshValue(),
            this._change(null, 0),
            (this._animateOff = !1);
          break;
        case "values":
          for (
            this._animateOff = !0, this._refreshValue(), g = 0;
            f > g;
            g += 1
          ) {
            this._change(null, g);
          }
          this._animateOff = !1;
          break;
        case "min":
        case "max":
          (this._animateOff = !0),
            this._refreshValue(),
            (this._animateOff = !1);
          break;
        case "range":
          (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
      }
    },
    _value: function () {
      var c = this.options.value;
      return (c = this._trimAlignValue(c));
    },
    _values: function (g) {
      var c, d, f;
      if (arguments.length) {
        return (c = this.options.values[g]), (c = this._trimAlignValue(c));
      }
      if (this.options.values && this.options.values.length) {
        for (d = this.options.values.slice(), f = 0; d.length > f; f += 1) {
          d[f] = this._trimAlignValue(d[f]);
        }
        return d;
      }
      return [];
    },
    _trimAlignValue: function (g) {
      if (this._valueMin() >= g) {
        return this._valueMin();
      }
      if (g >= this._valueMax()) {
        return this._valueMax();
      }
      var c = this.options.step > 0 ? this.options.step : 1,
        d = (g - this._valueMin()) % c,
        f = g - d;
      return (
        2 * Math.abs(d) >= c && (f += d > 0 ? c : -c), parseFloat(f.toFixed(5))
      );
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var d,
        g,
        q,
        k,
        c,
        m = this.options.range,
        p = this.options,
        j = this,
        f = this._animateOff ? !1 : p.animate,
        t = {};
      this.options.values && this.options.values.length
        ? this.handles.each(function (e) {
            (g =
              100 *
              ((j.values(e) - j._valueMin()) /
                (j._valueMax() - j._valueMin()))),
              (t["horizontal" === j.orientation ? "left" : "bottom"] = g + "%"),
              b(this).stop(1, 1)[f ? "animate" : "css"](t, p.animate),
              j.options.range === !0 &&
                ("horizontal" === j.orientation
                  ? (0 === e &&
                      j.range
                        .stop(1, 1)
                        [f ? "animate" : "css"]({ left: g + "%" }, p.animate),
                    1 === e &&
                      j.range[f ? "animate" : "css"](
                        { width: g - d + "%" },
                        { queue: !1, duration: p.animate }
                      ))
                  : (0 === e &&
                      j.range
                        .stop(1, 1)
                        [f ? "animate" : "css"]({ bottom: g + "%" }, p.animate),
                    1 === e &&
                      j.range[f ? "animate" : "css"](
                        { height: g - d + "%" },
                        { queue: !1, duration: p.animate }
                      ))),
              (d = g);
          })
        : ((q = this.value()),
          (k = this._valueMin()),
          (c = this._valueMax()),
          (g = c !== k ? 100 * ((q - k) / (c - k)) : 0),
          (t["horizontal" === this.orientation ? "left" : "bottom"] = g + "%"),
          this.handle.stop(1, 1)[f ? "animate" : "css"](t, p.animate),
          "min" === m &&
            "horizontal" === this.orientation &&
            this.range
              .stop(1, 1)
              [f ? "animate" : "css"]({ width: g + "%" }, p.animate),
          "max" === m &&
            "horizontal" === this.orientation &&
            this.range[f ? "animate" : "css"](
              { width: 100 - g + "%" },
              { queue: !1, duration: p.animate }
            ),
          "min" === m &&
            "vertical" === this.orientation &&
            this.range
              .stop(1, 1)
              [f ? "animate" : "css"]({ height: g + "%" }, p.animate),
          "max" === m &&
            "vertical" === this.orientation &&
            this.range[f ? "animate" : "css"](
              { height: 100 - g + "%" },
              { queue: !1, duration: p.animate }
            ));
    },
    _handleEvents: {
      keydown: function (d) {
        var h,
          e,
          c,
          f,
          g = b(d.target).data("ui-slider-handle-index");
        switch (d.keyCode) {
          case b.ui.keyCode.HOME:
          case b.ui.keyCode.END:
          case b.ui.keyCode.PAGE_UP:
          case b.ui.keyCode.PAGE_DOWN:
          case b.ui.keyCode.UP:
          case b.ui.keyCode.RIGHT:
          case b.ui.keyCode.DOWN:
          case b.ui.keyCode.LEFT:
            if (
              (d.preventDefault(),
              !this._keySliding &&
                ((this._keySliding = !0),
                b(d.target).addClass("ui-state-active"),
                (h = this._start(d, g)),
                h === !1))
            ) {
              return;
            }
        }
        switch (
          ((f = this.options.step),
          (e = c =
            this.options.values && this.options.values.length
              ? this.values(g)
              : this.value()),
          d.keyCode)
        ) {
          case b.ui.keyCode.HOME:
            c = this._valueMin();
            break;
          case b.ui.keyCode.END:
            c = this._valueMax();
            break;
          case b.ui.keyCode.PAGE_UP:
            c = this._trimAlignValue(
              e + (this._valueMax() - this._valueMin()) / a
            );
            break;
          case b.ui.keyCode.PAGE_DOWN:
            c = this._trimAlignValue(
              e - (this._valueMax() - this._valueMin()) / a
            );
            break;
          case b.ui.keyCode.UP:
          case b.ui.keyCode.RIGHT:
            if (e === this._valueMax()) {
              return;
            }
            c = this._trimAlignValue(e + f);
            break;
          case b.ui.keyCode.DOWN:
          case b.ui.keyCode.LEFT:
            if (e === this._valueMin()) {
              return;
            }
            c = this._trimAlignValue(e - f);
        }
        this._slide(d, g, c);
      },
      click: function (c) {
        c.preventDefault();
      },
      keyup: function (c) {
        var d = b(c.target).data("ui-slider-handle-index");
        this._keySliding &&
          ((this._keySliding = !1),
          this._stop(c, d),
          this._change(c, d),
          b(c.target).removeClass("ui-state-active"));
      },
    },
  });
})(jQuery);
