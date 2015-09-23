/*
> Muaz Khan     - https://github.com/muaz-khan
> MIT License   - https://www.webrtc-experiment.com/licence/
> Documentation - https://github.com/streamproc/MediaStreamRecorder
> =================================================================
> gif-recorder.html
*/

function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

var mediaConstraints = {
    video: true
};

document.querySelector('#start-recording').onclick = function() {
    if (this.innerHTML.indexOf("undo") == -1) {
      this.innerHTML = '<i class="fa fa-undo"></i>';
      captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    } else {
      mediaRecorder.stop()
      mediaRecorder.start(timeInterval);
    }
};

document.querySelector('#publish-recording').onclick = function() {
  if (gblob != null) {

  }
}

var mediaRecorder;
var timeInterval = 1 * 1000;

function onMediaSuccess(stream) {

    var video = document.createElement('video');

    var videoWidth = document.getElementById('video-width').value || 320;
    var videoHeight = document.getElementById('video-height').value || 240;

    video = mergeProps(video, {
        controls: true,
        width: videoWidth,
        height: videoHeight,
        src: URL.createObjectURL(stream)
    });
    video.play();

    videosContainer.appendChild(video);
    videosContainer.appendChild(document.createElement('hr'));

    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    mediaRecorder.mimeType = 'image/gif'; // this line is mandatory
    mediaRecorder.videoWidth = videoWidth;
    mediaRecorder.videoHeight = videoHeight;
    mediaRecorder.ondataavailable = function(blob) {
        videosContainer.appendChild(blob);
        /*        
        var a = document.createElement('a');
        a.target = '_blank';
        a.innerHTML = 'Open Recorded GIF No. ' + (index++) + ' (Size: ' + bytesToSize(blob.size) + ') Time Length: ' + getTimeLength(timeInterval);

        a.href = URL.createObjectURL(blob);
        */
        
        document.querySelector('#start-recording').innerHTML = '<i class="fa fa-play"></i>';
        document.querySelector('#publish-recording').disabled = false;
        
        videosContainer.appendChild(a);
        videosContainer.appendChild(document.createElement('hr'));
        
        var req = new XMLHttpRequest();
        req.open("POST", "", true);
        var fd = new FormData();
        fd.append("blob", blob);
        req.send(fd);
        //this.stop();
    };

    // get blob after specific time interval
    mediaRecorder.start(timeInterval);
}

function onMediaError(e) {
    console.error('media error', e);
}

var videosContainer = document.getElementById('videos-container');
var index = 1;

// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
}

window.onbeforeunload = function() {
    document.querySelector('#start-recording').disabled = false;
};
