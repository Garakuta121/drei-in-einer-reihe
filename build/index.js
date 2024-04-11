(() => {
  "use strict";
  var e = {
      976: function (e, t) {
        var r,
          n,
          a,
          i,
          s,
          o,
          l,
          c =
            (this && this.__classPrivateFieldSet) ||
            function (e, t, r, n, a) {
              if ("m" === n)
                throw new TypeError("Private method is not writable");
              if ("a" === n && !a)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !a : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              return (
                "a" === n ? a.call(e, r) : a ? (a.value = r) : t.set(e, r), r
              );
            },
          u =
            (this && this.__classPrivateFieldGet) ||
            function (e, t, r, n) {
              if ("a" === r && !n)
                throw new TypeError(
                  "Private accessor was defined without a getter"
                );
              if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError(
                  "Cannot read private member from an object whose class did not declare it"
                );
              return "m" === r
                ? n
                : "a" === r
                ? n.call(e)
                : n
                ? n.value
                : t.get(e);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.GameController = void 0),
          (t.GameController = class {
            constructor(e, t, d) {
              r.add(this),
                n.set(this, void 0),
                a.set(this, void 0),
                i.set(this, 1),
                s.set(this, void 0),
                o.set(this, void 0),
                (this.getCurrentPlayer = () =>
                  u(this, i, "f") % 2 == 1 ? u(this, n, "f") : u(this, a, "f")),
                (this.checkPlayerMove = (e) => {
                  u(this, s, "f")[this.getCurrentPlayer()].push(e);
                  let t = u(this, r, "m", l).call(this, e);
                  t.isGameOver
                    ? u(this, o, "f").endGame(
                        t.result,
                        u(this, n, "f"),
                        u(this, a, "f")
                      )
                    : (c(this, i, u(this, i, "f") + 1, "f"),
                      u(this, o, "f").updateCurrentPlayer(
                        this.getCurrentPlayer()
                      ));
                });
              let h = e == t[0] ? t[1] : t[0];
              c(this, n, e, "f"),
                c(this, a, h, "f"),
                c(this, s, { [e]: new Array(), [h]: new Array() }, "f"),
                c(this, o, d, "f"),
                u(this, o, "f").updateCurrentPlayer(e);
            }
          }),
          (n = new WeakMap()),
          (a = new WeakMap()),
          (i = new WeakMap()),
          (s = new WeakMap()),
          (o = new WeakMap()),
          (r = new WeakSet()),
          (l = function (e) {
            let t = u(this, i, "f"),
              r = u(this, s, "f"),
              n = this.getCurrentPlayer();
            return t < 5
              ? { isGameOver: !1, result: "" }
              : (function (e) {
                  let t = new Array();
                  for (let r = -1; r <= 1; r++)
                    for (let n = -1; n <= 1; n++) {
                      let a = e[0] + n,
                        i = e[1] + r;
                      a < 0 ||
                        a > 4 ||
                        i < 0 ||
                        i > 4 ||
                        (0 == n && 0 == r) ||
                        t.push([a, i]);
                    }
                  return t;
                })(e).some((t) => {
                  if (a(t))
                    return (function (e, t) {
                      let r = [t[0] - e[0], t[1] - e[1]],
                        n = new Array();
                      return (
                        n.push([e[0] - r[0], e[1] - r[1]]),
                        n.push([t[0] + r[0], t[1] + r[1]]),
                        n.some((e) => a(e))
                      );
                    })(e, t);
                })
              ? { isGameOver: !0, result: n }
              : 16 == t
              ? { isGameOver: !0, result: "" }
              : { isGameOver: !1, result: "" };
            function a(e) {
              return r[n].some((t) => JSON.stringify(e) == JSON.stringify(t));
            }
          });
      },
      43: function (e, t) {
        var r,
          n =
            (this && this.__classPrivateFieldGet) ||
            function (e, t, r, n) {
              if ("a" === r && !n)
                throw new TypeError(
                  "Private accessor was defined without a getter"
                );
              if ("function" == typeof t ? e !== t || !n : !t.has(e))
                throw new TypeError(
                  "Cannot read private member from an object whose class did not declare it"
                );
              return "m" === r
                ? n
                : "a" === r
                ? n.call(e)
                : n
                ? n.value
                : t.get(e);
            };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.HTMLController = void 0),
          (t.HTMLController = class {
            constructor() {
              r.set(this, document.getElementById("infoText")),
                (this.createPlayerSelect = (e, t) => {
                  let r = document.getElementById("playerSelect");
                  for (let n of e) {
                    let e = document.createElement("button");
                    (e.className = "selectTile"),
                      (e.innerHTML = `<img class="${n}">`),
                      (e.onclick = () => {
                        r.remove(), t(n);
                      }),
                      r.appendChild(e);
                  }
                }),
                (this.createGameBoard = (e) => {
                  let t = document.getElementById("gameBoard");
                  for (let n = 1; n <= 4; n++)
                    for (let a = 1; a <= 4; a++) {
                      let i = r(e, a, n);
                      t.appendChild(i);
                    }
                  function r(e, t, r) {
                    let n = document.createElement("button");
                    return (
                      (n.className = "gameTile"),
                      (n.onclick = (n) => {
                        let a = n.target;
                        a.disabled = !0;
                        let i = document.createElement("img");
                        (i.className = e.getCurrentPlayer()),
                          a.appendChild(i),
                          e.checkPlayerMove([t, r]);
                      }),
                      n
                    );
                  }
                }),
                (this.updateCurrentPlayer = (e) => {
                  n(this, r, "f").innerHTML = `<p>${e} ist dran!</p>`;
                }),
                (this.endGame = (e, t, a) => {
                  let i = document.getElementsByClassName("gameTile");
                  for (let e of i) e.disabled = !0;
                  let s = document.createElement("p");
                  (s.innerHTML =
                    e == t || e == a ? e + " hat verloren!" : "Unentschieden!"),
                    (s.innerHTML +=
                      "<br><br> Lade die Seite neu, um erneut zu spielen!"),
                    (n(this, r, "f").innerHTML = ""),
                    n(this, r, "f").appendChild(s);
                });
            }
          }),
          (r = new WeakMap());
      },
    },
    t = {};
  function r(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var i = (t[n] = { exports: {} });
    return e[n].call(i.exports, i, i.exports, r), i.exports;
  }
  (() => {
    const e = r(43),
      t = r(976);
    window.addEventListener("load", (r) => {
      let n = ["Kreuz", "Kreis"],
        a = new e.HTMLController();
      a.createPlayerSelect(n, function (e) {
        let r = new t.GameController(e, n, a);
        a.createGameBoard(r);
      });
    });
  })();
})();
