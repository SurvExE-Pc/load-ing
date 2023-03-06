/*
Copyright © 2023 SurvExE_Pc

Licence:
https://load-ing.pages.dev/public/aesFn/LICENSE.txt

Github:
https://github.com/SurvExE_Pc
*/

document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;

function fullscrn(elm_id) {
document.getElementById(elm_id).requestFullscreen();
}

function detectIE() {
    try {
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        if ( ! isIE ) {
            // Fallback to UserAgent detection for IE
            if ( navigator.userAgent.indexOf("MSIE") > 0 ) {
                return true;    
            } else {
                return false;
            }
        }
        return true;
    } catch(e) {
        var error = e.toString();
        console.warn("Error when trying to detect MSIE, || ",error);
        return "err";
    }
};

function getQuerystring() {
    let output={}
    if(window.location.search){
    var queryParams = window.location.search.substring(1);
    var listQueries = queryParams.split("&");
        for(var query in listQueries) {
        if (listQueries.hasOwnProperty(query)) {
            var queryPair = listQueries[query].split('=');
            output[queryPair[0]] = decodeURIComponent(queryPair[1] || "");
        }
    }
    }
    return output;};

function startplayer() 
{
 var err = console.error;
 console.error = () => {};
 player = document.getElementById('video_player');
 player.controls = false;
 player.loop=false;
 window.playing=0;
 window.looping=0;
 window.muted=0;
 player.volume=1;
 window.context=0;
 window.mousex,window.mousey=0;
 window.vid = ()=>{fullscrn("video_player")};
 document.getElementById("play_button").src="/watch/play.png";
 document.getElementById("loop_button").src="/watch/loop_off.png";
 document.getElementById("vol_img").src="/watch/volume.png";
 document.getElementById("contextMenu").hidden=true;

 //Url Params
 let queryParams = new Object(getQuerystring());
 if (queryParams.mute != undefined) {
  document.getElementById("vol_img").src="/watch/mute.png";
  window.muted=1;
  player.volume=0;
 };
 if (queryParams.loop != undefined) {
  document.getElementById("loop_button").src="/watch/loop_on.png";
  window.looping=1;
  player.loop=true;
 };
 if (queryParams.autoplay != undefined) {
  player.autoplay = true;
  document.body.click();
  var tr = document.getElementById("play_button").click();
 };
 if (window.location.protocol != "https") {
  document.getElementById("context_share-btn").hidden=true;
 };
 console.error = err;
 var MSIE = detectIE();
 if (MSIE == true) {
  document.body.innerHTML="<p>This page is not compatible with Internet Explorer</p>"
 }
 const v = queryParams.v;
 //alert(v,`/public/video/${v}.mp4`);
 if (v != undefined) {
     document.getElementById("video_player").src=`/public/video/${v}.mp4`;
 }
}
function play_vid()
{
 if (window.playing==0) {
  document.getElementById("play_button").src="/watch/pause.png";
  window.playing=1;
  player.play().catch(e=>{
    console.warn("Error playing audio!! | On error: ((",e,"))");
    document.getElementById("play_button").src="/watch/play.png";
    window.playing=0;
  });
 } else {
  window.playing=0;
  player.pause();
  document.getElementById("play_button").src="/watch/play.png";
 }
}
function loop()
{
 if (window.looping==0) {
  window.looping=1;
  player.loop=true;
  document.getElementById("loop_button").src="/watch/loop_on.png";
 } else {
  window.looping=0;
  player.loop=false;
  document.getElementById("loop_button").src="/watch/loop_off.png";
 }
}
function stop_vid() 
{
  window.playing=0;
  player.pause();
  document.getElementById("play_button").src="/watch/play.png";
 player.currentTime = 0;
}
function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
 if (player.volume == 0) {
  player.muted = 1;
  document.getElementById("vol_img").src="/watch/mute.png";
 } else {
  player.muted = 0;
  document.getElementById("vol_img").src="/watch/volume.png";
 }
}
function mute()
{
 if (window.muted==0) {
  window.muted=1;
  window.lv=player.volume;
  player.volume=0;
  document.getElementById("vol_img").src="/watch/mute.png";
 } else {
  window.muted=0;
  player.volume=window.lv;
  document.getElementById("vol_img").src="/watch/volume.png";
 }
}

function share()
{
 var args = [];
 if (window.muted != 0) {
  args.push("mute")
 };
 if (window.looping != 0) {
  args.push("loop")
 };
navigator.clipboard.writeText(window.location.href+"?"+args.join("&"));
}

//For the custom context menu:
function contextMenu()
{
if (window.context == 0) {
 window.context = 1;
 document.getElementById("contextMenu").hidden=false;
} else {
 window.context = 0;
 document.getElementById("contextMenu").hidden=true;
}
document.getElementById("contextMenu").style.left=parseInt(window.mousex).toString()+"px";
document.getElementById("contextMenu").style.top=parseInt(window.mousey).toString()+"px";
}

function contextMenuListener(el) {
el.addEventListener( "click", function(e) {
window.mousex = e.clientX;
window.mousey = e.clientY;
});
el.addEventListener( "contextmenu", function(e) {
window.mousex = e.clientX;
window.mousey = e.clientY;
e.preventDefault();
contextMenu();
});
}
contextMenuListener(document);

//play video when its clicked
window.onload = () => {
document.getElementById("video_player").onclick = function(){
    play_vid();
}}