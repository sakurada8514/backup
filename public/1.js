(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ShareDiary.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ShareDiary.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/js/util.js");


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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      referenceCount: 0,
      referencedByUser: false,
      //ボタンアニメーション
      active: false
    };
  },
  computed: {
    //ログイン中ユーザーの名前
    userName: function userName() {
      return this.$store.getters["auth/userName"];
    },
    //日時日本語化処理
    createdDay: function createdDay() {
      var dateTime = this.item.created_at.split(" ");
      var date = dateTime[0];
      var dateJp = date.replace("-", "年").replace("-", "月") + "日 ";
      var time = dateTime[1].slice(0, 5);
      var createdDay = dateJp + time;
      return createdDay;
    },
    //resultフォーマット変更
    result: function result() {
      return this.item.diaries.result === "win" ? "利確" : "損切り";
    },
    //positopnフォーマット変更
    position: function position() {
      return this.item.diaries.position === "ロング" ? "long" : "short";
    }
  },
  methods: {
    //ログイン中ユーザーがいいね済ならいいね解除処理、いいねしていないならいいね付与処理
    submit: function submit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var id;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _this.item.id;

                if (!_this.referencedByUser) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return _this.unReference(id);

              case 4:
                _context.next = 8;
                break;

              case 6:
                _context.next = 8;
                return _this.reference(id);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //いいね付与処理
    reference: function reference(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return axios.post("/api/share/".concat(id, "/reference"))["catch"](function (err) {
                  return err.response || err;
                });

              case 2:
                response = _context2.sent;

                if (response.status === _util__WEBPACK_IMPORTED_MODULE_1__["OK"]) {
                  //通信成功でカウントに1プラス
                  _this2.referenceCount++; //いいね済に変更

                  _this2.referencedByUser = true; //ボタンアニメーション

                  _this2.active = true;
                } else {
                  //システムエラー
                  _this2.$store.commit("error/setCode", response.status);
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    //いいね解除処理
    unReference: function unReference(id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios.post("/api/share/".concat(id, "/unreference"))["catch"](function (err) {
                  return err.response || err;
                });

              case 2:
                response = _context3.sent;

                if (response.status === _util__WEBPACK_IMPORTED_MODULE_1__["OK"]) {
                  //通信成功でカウント1マイナス
                  _this3.referenceCount--; //いいね未へ変更

                  _this3.referencedByUser = false; //ボタンアニメーション

                  _this3.active = false;
                } else {
                  //システムエラー
                  _this3.$store.commit("error/setCode", response.status);
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  },
  created: function created() {
    this.referenceCount = this.item.references_count;
    this.referencedByUser = this.item.referenced_by_user;
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    "router-link",
    {
      staticClass: "share-diary",
      attrs: {
        tag: "div",
        to: {
          name: "shareDiaryDetail",
          params: { name: _vm.userName, id: _vm.item.id }
        }
      }
    },
    [
      _c("div", { staticClass: "share-diary__user" }, [
        _c("div", { staticClass: "share-diary__user--img" }, [
          _vm.item.users.img_url
            ? _c("img", { attrs: { src: _vm.item.users.img_url, alt: "" } })
            : _c("i", {
                staticClass: "fa fa-user-circle profile__icon",
                attrs: { "aria-hidden": "true" }
              })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "share-diary__user--info" }, [
          _c("p", { staticClass: "share-diary__user--name" }, [
            _vm._v(_vm._s(_vm.item.users.name))
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "share-diary__user--day" }, [
            _vm._v(_vm._s(_vm.createdDay))
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "share-diary__title" }, [
        _vm._v(_vm._s(_vm.item.title))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "share-diary__info" }, [
        _c("p", { staticClass: "share-diary__info--item" }, [
          _vm._v(_vm._s(_vm.item.diaries.currency))
        ]),
        _vm._v(" "),
        _c(
          "p",
          { staticClass: "share-diary__info--item", class: _vm.position },
          [
            _vm._v(
              "\n            " +
                _vm._s(_vm.item.diaries.position) +
                "\n        "
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "p",
          {
            staticClass: "share-diary__info--item",
            class: _vm.item.diaries.result
          },
          [_vm._v("\n            " + _vm._s(_vm.result) + "\n        ")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "share-diary__reference",
            class: {
              "share-diary__reference--active": _vm.referencedByUser
            },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.submit($event)
              }
            }
          },
          [
            _c("i", {
              staticClass: "fa fa-thumbs-up",
              class: { reference__active: _vm.active },
              attrs: { "aria-hidden": "true" }
            }),
            _vm._v(_vm._s(_vm.referenceCount) + "\n        ")
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ShareDiary.vue":
/*!************************************************!*\
  !*** ./resources/js/components/ShareDiary.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareDiary.vue?vue&type=template&id=52bdb1cf& */ "./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf&");
/* harmony import */ var _ShareDiary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShareDiary.vue?vue&type=script&lang=js& */ "./resources/js/components/ShareDiary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ShareDiary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ShareDiary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ShareDiary.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/ShareDiary.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareDiary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ShareDiary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ShareDiary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareDiary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ShareDiary.vue?vue&type=template&id=52bdb1cf& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ShareDiary.vue?vue&type=template&id=52bdb1cf&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareDiary_vue_vue_type_template_id_52bdb1cf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);