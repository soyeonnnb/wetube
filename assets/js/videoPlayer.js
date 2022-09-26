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

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst muteBtn = document.getElementById(\"mute\");\nconst volumeRange = document.getElementById(\"volume\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullscreenBtn = document.getElementById(\"fullscreen\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet controlsMovementTimeout = null;\nlet timeoutControls = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nconst handlePlay = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nconst handleMute = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"UnMute\" : \"Mute\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substring(11, 19);\n\nconst handleLoadedMetaData = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nconst handleTimeUpdate = () => {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\n\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullscreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullscreenBtn.innerText = \"Exit Full Screen\";\n  }\n};\n\nconst hideControls = () => videoControls.classList.remove(\"showing\");\n\nconst handleMouseMove = () => {\n  if (timeoutControls) {\n    clearTimeout(timeoutControls);\n    timeoutControls = null;\n  }\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleMouseLeave = () => {\n  timeoutControls = setTimeout(hideControls, 3000);\n};\n\nplayBtn.addEventListener(\"click\", handlePlay);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetaData);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\ntimeline.addEventListener(\"input\", handleTimelineChange);\nfullscreenBtn.addEventListener(\"click\", handleFullscreen);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;