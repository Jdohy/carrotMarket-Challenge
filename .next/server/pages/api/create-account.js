"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/create-account";
exports.ids = ["pages/api/create-account"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst db = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.db = db;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZGIudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBTTlDLE1BQU1DLEVBQUUsR0FBRyxJQUFJRCx3REFBWSxFQUFFO0FBRTdCLElBQUlFLElBQXNDLEVBQUVDLE1BQU0sQ0FBQ0YsRUFBRSxHQUFHQSxFQUFFLENBQUM7QUFFM0QsaUVBQWVBLEVBQUUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1wcmlzbWEtdHlwZXNjcmlwdC10YWlsd2luZC1ibHVlcHJpbnQvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgZGI6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn1cblxuY29uc3QgZGIgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSBnbG9iYWwuZGIgPSBkYjtcblxuZXhwb3J0IGRlZmF1bHQgZGI7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZGIiLCJwcm9jZXNzIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/db.ts\n");

/***/ }),

/***/ "(api)/./pages/api/create-account.ts":
/*!*************************************!*\
  !*** ./pages/api/create-account.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/db */ \"(api)/./lib/db.ts\");\n\nasync function handler(req, res) {\n    const { username , email , password  } = req.body;\n    if (req.method !== \"POST\") {\n        return res.status(401).end();\n    }\n    const nameExists = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findFirst({\n        where: {\n            name: username\n        }\n    });\n    const emailExists = await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findFirst({\n        where: {\n            email\n        }\n    });\n    if (nameExists || emailExists) {\n        return res.json({\n            ok: false,\n            exists: nameExists ? \"username\" : \"email\"\n        });\n    }\n    await _lib_db__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.create({\n        data: {\n            email,\n            password,\n            name: username\n        }\n    });\n    res.json({\n        ok: true\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY3JlYXRlLWFjY291bnQudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDOEI7QUFFZixlQUFlQyxPQUFPLENBQ25DQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxNQUFNLEVBQUVDLFFBQVEsR0FBRUMsS0FBSyxHQUFFQyxRQUFRLEdBQUUsR0FBR0osR0FBRyxDQUFDSyxJQUFJO0lBRTlDLElBQUlMLEdBQUcsQ0FBQ00sTUFBTSxLQUFLLE1BQU0sRUFBRTtRQUN6QixPQUFPTCxHQUFHLENBQUNNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsR0FBRyxFQUFFLENBQUM7S0FDOUI7SUFFRCxNQUFNQyxVQUFVLEdBQUcsTUFBTVgsOERBQWlCLENBQUM7UUFDekNjLEtBQUssRUFBRTtZQUNMQyxJQUFJLEVBQUVYLFFBQVE7U0FDZjtLQUNGLENBQUM7SUFFRixNQUFNWSxXQUFXLEdBQUcsTUFBTWhCLDhEQUFpQixDQUFDO1FBQzFDYyxLQUFLLEVBQUU7WUFDTFQsS0FBSztTQUNOO0tBQ0YsQ0FBQztJQUVGLElBQUlNLFVBQVUsSUFBSUssV0FBVyxFQUFFO1FBQzdCLE9BQU9iLEdBQUcsQ0FBQ2MsSUFBSSxDQUFDO1lBQ2RDLEVBQUUsRUFBRSxLQUFLO1lBQ1RDLE1BQU0sRUFBRVIsVUFBVSxHQUFHLFVBQVUsR0FBRyxPQUFPO1NBQzFDLENBQUMsQ0FBQztLQUNKO0lBRUQsTUFBTVgsMkRBQWMsQ0FBQztRQUNuQnFCLElBQUksRUFBRTtZQUNKaEIsS0FBSztZQUNMQyxRQUFRO1lBQ1JTLElBQUksRUFBRVgsUUFBUTtTQUNmO0tBQ0YsQ0FBQyxDQUFDO0lBRUhELEdBQUcsQ0FBQ2MsSUFBSSxDQUFDO1FBQ1BDLEVBQUUsRUFBRSxJQUFJO0tBQ1QsQ0FBQyxDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtcHJpc21hLXR5cGVzY3JpcHQtdGFpbHdpbmQtYmx1ZXByaW50Ly4vcGFnZXMvYXBpL2NyZWF0ZS1hY2NvdW50LnRzPzQxMjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgZGIgZnJvbSBcIi4uLy4uL2xpYi9kYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZVxuKSB7XG4gIGNvbnN0IHsgdXNlcm5hbWUsIGVtYWlsLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XG5cbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5lbmQoKTtcbiAgfVxuXG4gIGNvbnN0IG5hbWVFeGlzdHMgPSBhd2FpdCBkYi51c2VyLmZpbmRGaXJzdCh7XG4gICAgd2hlcmU6IHtcbiAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGVtYWlsRXhpc3RzID0gYXdhaXQgZGIudXNlci5maW5kRmlyc3Qoe1xuICAgIHdoZXJlOiB7XG4gICAgICBlbWFpbCxcbiAgICB9LFxuICB9KTtcblxuICBpZiAobmFtZUV4aXN0cyB8fCBlbWFpbEV4aXN0cykge1xuICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBleGlzdHM6IG5hbWVFeGlzdHMgPyBcInVzZXJuYW1lXCIgOiBcImVtYWlsXCIsXG4gICAgfSk7XG4gIH1cblxuICBhd2FpdCBkYi51c2VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgZW1haWwsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJlcy5qc29uKHtcbiAgICBvazogdHJ1ZSxcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiZGIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwidXNlcm5hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwiYm9keSIsIm1ldGhvZCIsInN0YXR1cyIsImVuZCIsIm5hbWVFeGlzdHMiLCJ1c2VyIiwiZmluZEZpcnN0Iiwid2hlcmUiLCJuYW1lIiwiZW1haWxFeGlzdHMiLCJqc29uIiwib2siLCJleGlzdHMiLCJjcmVhdGUiLCJkYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/create-account.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/create-account.ts"));
module.exports = __webpack_exports__;

})();