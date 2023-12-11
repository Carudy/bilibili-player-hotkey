// ==UserScript==
// @name       Bili-Youtube-Player-Hotkey
// @description B站和油管播放器快捷键
// @version  0.1
// @match    https://www.bilibili.com/*
// @match    https://www.youtube.com/*
// @require    https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';

    const vobj = document.querySelector('video');

    // If video not found, exit early
    if (!vobj) {
        console.warn('Video element not found. Exiting script.');
        return;
    }

    // Fullscreen toggle
    let is_full = false;
    const enterFullscreenFunc = vobj.requestFullscreen || vobj.mozRequestFullScreen || vobj.webkitRequestFullscreen || vobj.msRequestFullscreen;
    const exitFullscreenFunc = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    const toggle_fs = () => {
        is_full ? exitFullscreenFunc.call(document) : enterFullscreenFunc.call(vobj);
        is_full = !is_full;
    };

    // Constants for control steps
    const play_rate_step = 0.25;
    const volume_step = 0.1;
    const forward_step = 3;

    // Control actions dictionary
    const controls = {
        'Enter': toggle_fs,
        'Shift+ArrowUp': () => vobj.playbackRate += play_rate_step,
        'Shift+ArrowDown': () => vobj.playbackRate -= play_rate_step,
        'Shift+Z': () => vobj.playbackRate = 1,
        'Space': () => vobj.paused ? vobj.play() : vobj.pause(),
        // 'ArrowUp': () => vobj.volume = Math.min(vobj.volume + volume_step, 1),
        // 'ArrowDown': () => vobj.volume = Math.max(vobj.volume - volume_step, 0),
        // 'ArrowRight': () => vobj.currentTime += forward_step,
        // 'ArrowLeft': () => vobj.currentTime = Math.max(0, vobj.currentTime - forward_step),
    };

    // Event listener for keyup events
    document.addEventListener('keydown', function (event) {
        const key = (event.shiftKey ? 'Shift+' : '') + event.key;
        const action = controls[key];
        if (action && typeof action === 'function') {
            action();
        }
    });
})();