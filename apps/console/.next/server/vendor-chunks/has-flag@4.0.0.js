"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-flag@4.0.0";
exports.ids = ["vendor-chunks/has-flag@4.0.0"];
exports.modules = {

/***/ "(rsc)/../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js ***!
  \******************************************************************************/
/***/ ((module) => {

eval("\nmodule.exports = (flag, argv = process.argv)=>{\n    const prefix = flag.startsWith(\"-\") ? \"\" : flag.length === 1 ? \"-\" : \"--\";\n    const position = argv.indexOf(prefix + flag);\n    const terminatorPosition = argv.indexOf(\"--\");\n    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2hhcy1mbGFnQDQuMC4wL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBQSxPQUFPQyxPQUFPLEdBQUcsQ0FBQ0MsTUFBTUMsT0FBT0MsUUFBUUQsSUFBSTtJQUMxQyxNQUFNRSxTQUFTSCxLQUFLSSxVQUFVLENBQUMsT0FBTyxLQUFNSixLQUFLSyxNQUFNLEtBQUssSUFBSSxNQUFNO0lBQ3RFLE1BQU1DLFdBQVdMLEtBQUtNLE9BQU8sQ0FBQ0osU0FBU0g7SUFDdkMsTUFBTVEscUJBQXFCUCxLQUFLTSxPQUFPLENBQUM7SUFDeEMsT0FBT0QsYUFBYSxDQUFDLEtBQU1FLENBQUFBLHVCQUF1QixDQUFDLEtBQUtGLFdBQVdFLGtCQUFpQjtBQUNyRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hpcmVyLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9oYXMtZmxhZ0A0LjAuMC9ub2RlX21vZHVsZXMvaGFzLWZsYWcvaW5kZXguanM/MGRlNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKGZsYWcsIGFyZ3YgPSBwcm9jZXNzLmFyZ3YpID0+IHtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3NpdGlvbiA9IGFyZ3YuaW5kZXhPZihwcmVmaXggKyBmbGFnKTtcblx0Y29uc3QgdGVybWluYXRvclBvc2l0aW9uID0gYXJndi5pbmRleE9mKCctLScpO1xuXHRyZXR1cm4gcG9zaXRpb24gIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zaXRpb24gPT09IC0xIHx8IHBvc2l0aW9uIDwgdGVybWluYXRvclBvc2l0aW9uKTtcbn07XG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImZsYWciLCJhcmd2IiwicHJvY2VzcyIsInByZWZpeCIsInN0YXJ0c1dpdGgiLCJsZW5ndGgiLCJwb3NpdGlvbiIsImluZGV4T2YiLCJ0ZXJtaW5hdG9yUG9zaXRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js\n");

/***/ })

};
;