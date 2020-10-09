(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Register.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Register.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      loading: false
    };
  },
  computed: {
    apiStatus: function apiStatus() {
      return this.$store.state.auth.apiStatus;
    },
    registerErrors: function registerErrors() {
      return this.$store.state.auth.registerErrorMessages;
    }
  },
  methods: {
    register: function register() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var userName;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.loading = true;
                _context.next = 3;
                return _this.$store.dispatch("auth/register", _this.registerForm);

              case 3:
                _this.loading = false;

                if (_this.apiStatus) {
                  userName = _this.$store.getters["auth/userName"];

                  _this.$router.push("/".concat(userName, "/diaries/list/"));
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    clearError: function clearError() {
      this.$store.commit("auth/setRegisterErrorMessages", null);
    }
  },
  created: function created() {
    this.clearError();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "register" },
    [
      _c(
        "router-link",
        { staticClass: "form__logo", attrs: { to: "/", tag: "h1" } },
        [
          _c("span", { staticClass: "form__logo--blue" }, [_vm._v("FX")]),
          _vm._v("日記")
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "form" },
        [
          _c("h2", { staticClass: "form__title" }, [_vm._v("ユーザー登録")]),
          _vm._v(" "),
          _c(
            "form",
            {
              staticClass: "form__content",
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.register($event)
                }
              }
            },
            [
              _c("div", { staticClass: "form__item" }, [
                _c("label", { staticClass: "form__item--label" }, [
                  _vm._v("ユーザー名")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.registerForm.name,
                      expression: "registerForm.name"
                    }
                  ],
                  staticClass: "form__item--input",
                  attrs: { type: "text", name: "name", required: "" },
                  domProps: { value: _vm.registerForm.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.registerForm, "name", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.registerErrors
                  ? _c(
                      "ul",
                      { staticClass: "form__error" },
                      _vm._l(_vm.registerErrors.name, function(msg) {
                        return _c(
                          "li",
                          { key: msg, staticClass: "form__error--msg" },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(msg) +
                                "\n                    "
                            )
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form__item" }, [
                _c("label", { staticClass: "form__item--label" }, [
                  _vm._v("メールアドレス")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.registerForm.email,
                      expression: "registerForm.email"
                    }
                  ],
                  staticClass: "form__item--input",
                  attrs: { type: "email", name: "email", required: "" },
                  domProps: { value: _vm.registerForm.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.registerForm, "email", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _vm.registerErrors
                  ? _c(
                      "ul",
                      { staticClass: "form__error" },
                      _vm._l(_vm.registerErrors.email, function(msg) {
                        return _c(
                          "li",
                          { key: msg, staticClass: "form__error--msg" },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(msg) +
                                "\n                    "
                            )
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form__item" }, [
                _c("label", { staticClass: "form__item--label" }, [
                  _vm._v("パスワード")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.registerForm.password,
                      expression: "registerForm.password"
                    }
                  ],
                  staticClass: "form__item--input",
                  attrs: { type: "password", name: "password", required: "" },
                  domProps: { value: _vm.registerForm.password },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.registerForm,
                        "password",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm.registerErrors
                  ? _c(
                      "ul",
                      { staticClass: "form__error" },
                      _vm._l(_vm.registerErrors.password, function(msg) {
                        return _c(
                          "li",
                          { key: msg, staticClass: "form__error--msg" },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(msg) +
                                "\n                    "
                            )
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form__item" }, [
                _c("label", { staticClass: "form__item--label" }, [
                  _vm._v("パスワード(確認)")
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.registerForm.password_confirmation,
                      expression: "registerForm.password_confirmation"
                    }
                  ],
                  staticClass: "form__item--input",
                  attrs: {
                    type: "password",
                    name: "password_confirmation",
                    required: ""
                  },
                  domProps: { value: _vm.registerForm.password_confirmation },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.registerForm,
                        "password_confirmation",
                        $event.target.value
                      )
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c(
                "button",
                { staticClass: "form__button", attrs: { type: "submit" } },
                [
                  _c("span", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loading,
                        expression: "loading"
                      }
                    ],
                    staticClass: "form__button--loading"
                  }),
                  _vm._v("ユーザー登録\n            ")
                ]
              )
            ]
          ),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _c(
            "router-link",
            { staticClass: "form__to", attrs: { tag: "p", to: "/login" } },
            [_vm._v("ログインはこちら")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "google",
        attrs: { href: "http://localhost:8000/login/google" }
      },
      [
        _c("i", {
          staticClass: "fa fa-google",
          attrs: { "aria-hidden": "true" }
        }),
        _vm._v("Googleアカウントで登録")
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Register.vue":
/*!*****************************************!*\
  !*** ./resources/js/pages/Register.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=364a2fac& */ "./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/pages/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Register.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/pages/Register.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Register.vue?vue&type=template&id=364a2fac& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=364a2fac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Register.vue?vue&type=template&id=364a2fac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_364a2fac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);