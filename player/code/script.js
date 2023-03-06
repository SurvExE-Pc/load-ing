/*
* Created By SurvExE-Pc on github
* Copyright 2023 | SurvExE-Pc
* License: https://tinyurl.com/MIT-License
*/

//utilites
const audio = document.getElementById("audio");
const timeStart = document.getElementById("time_now");
const timeEnd = document.getElementById("time_end");
const volumeIco = document.getElementById("volume");
const volumeRange = document.getElementById("volume_range");

function btn(name) {
    return document.getElementById(name + "_btn");
}

function updateVolume() {
    audio.volume = volumeRange.value/100;
    //v=0:1,v<=25:2,v<=50>25,v<=75>50,v<=100>75
    if (audio.volume==0) {
        volumeIco.src="./icons/volume/muted.png";
        return true;
    }
    if (audio.volume<=0.33) {
        volumeIco.src="./icons/volume/1.png";
        return true;
    }
    if (audio.volume<=0.66) {
        volumeIco.src="./icons/volume/2.png";
        return true;
    }
    if (audio.volume<=1) {
        volumeIco.src="./icons/volume/3.png";
        return true;
    }
}

String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

function getQuerystring() {
    let output = {}
    if (window.location.search) {
        var queryParams = window.location.search.substring(1);
        var listQueries = queryParams.split("&");
        for (var query in listQueries) {
            if (listQueries.hasOwnProperty(query)) {
                var queryPair = listQueries[query].split('=');
                output[queryPair[0]] = decodeURIComponent(queryPair[1] || "");
            }
        }
    }
    return output;
};

////Setup
//setup - reset audio
audio.loop = false;
//Pausing
audio.paused = true;
audio.pause();
audio.src = "./audio/default.mp3";
audio.currentTime = 0;
//Volume
audio.lastVolume = 1;
audio.volume = 1;

//setup - reset buttons
btn("play").src = "./icons/play.png";
btn("loop").src = "./icons/noLoop.png";

//Url Params
const queryParams = new Object(getQuerystring());

//setup - Param overides
if (queryParams.loop != null) {
    audio.loop = true;
    btn("loop").src = "./icons/loop.png";
}

if (queryParams.src != null) {
    audio.src = queryParams.src;
}

if (queryParams.timeStamp != null) {
    audio.currentTime = parseInt(queryParams.timeStamp);
}

if (queryParams.imgSrc != null) {
    document.getElementById("audio_ico").src = queryParams.imgSrc;
    document.getElementById("audio_ico").alt = "Audio Icon";
} else {
    if (queryParams.ogI != null) {
        document.getElementById("audio_ico").src = "./index.png";
        document.getElementById("audio_ico").alt = "Hutao.";
    }
}

if (queryParams.title != null) {
    document.getElementsByTagName("title")[0].innerText = queryParams.title.toString()+" - Audio Player";
}

if (queryParams.volume != null) {
    audio.volume = parseFloat(queryParams.volume)/100;
}

if (queryParams.ogI != null) {
    document.getElementById("icon").href = "./index.png";
}


//Audio functions
function play() {
    if (audio.paused) {
        btn("play").src = "./icons/pause.png";
        audio.paused = false;
        audio.play();
    } else {
        btn("play").src = "./icons/play.png";
        audio.paused = true;
        audio.pause();
    }
}

function loop() {
    audio.loop = !audio.loop;
    if (audio.loop) {
        btn("loop").src = "./icons/loop.png";
    } else {
        btn("loop").src = "./icons/noLoop.png";
    }
}

function restart() {
    audio.currentTime = 0;
}

async function end() {
    await waitFor(_ => audio.duration != NaN);
    audio.currentTime = audio.duration;
}

function restartBtn() {
    btn("play").hidden = false;
    btn("restart").hidden = true;
    restart();
    btn("play").src = "./icons/play.png";
}

function mute() {
    if (audio.volume == 0) {
        audio.volume = audio.lastVolume;
        updateVolume();
    } else {
        audio.lastVolume = audio.volume;
        audio.volume = 0;
        volumeIco.src = "./icons/volume/muted.png";
    }
}

//Time stuff
setInterval(() => {
    timeStart.innerText = audio.currentTime.toString().toHHMMSS();
    timeEnd.innerText = audio.duration.toString().toHHMMSS();
    if (!audio.loop && audio.currentTime == audio.duration) {
        btn("play").hidden = true;
        btn("restart").hidden = false;
    }
    updateVolume();
}, 1);