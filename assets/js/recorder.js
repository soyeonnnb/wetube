/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ (() => {

eval("const startBtn = document.getElementById(\"startBtn\");\nconst video = document.getElementById(\"preview\");\nlet stream;\nlet recorder;\nlet videoFile;\n\nconst handleDownload = () => {\n  const a = document.createElement(\"a\");\n  a.href = videoFile;\n  a.download = \"MyRecording.webm\";\n  document.body.appendChild(a);\n  a.click();\n};\n\nconst handleEnd = () => {\n  startBtn.innerText = \"Download Recording\";\n  startBtn.removeEventListener(\"click\", handleEnd);\n  startBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\n\nconst handleStart = () => {\n  startBtn.innerText = \"Stop Recording\";\n  startBtn.removeEventListener(\"click\", handleStart);\n  startBtn.addEventListener(\"click\", handleEnd);\n  recorder = new MediaRecorder(stream);\n\n  recorder.ondataavailable = event => {\n    videoFile = URL.createObjectURL(event.data);\n    video.srcObject = null;\n    video.src = videoFile;\n    video.play();\n  };\n\n  recorder.start();\n};\n\nconst init = async () => {\n  stream = await navigator.mediaDevices.getUserMedia({\n    audio: true,\n    video: true\n  });\n  video.srcObject = stream;\n  video.play();\n};\n\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://wetube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"]();
/******/ 	
/******/ })()
;