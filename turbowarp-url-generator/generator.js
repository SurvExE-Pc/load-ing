/*
Copyright © 2023 SurvExE_Pc

Licence:
https://tinyurl.com/MIT-License

Github:
https://github.com/SurvExE_Pc
*/

///////////////////////////////// Generator //////////////////////////////////

//Generates url
function generateUri(code) {
const save = code;
const v = save;
const b = v.extensions;
var link = "https://";
const append2Link = (text)=>{link = link+text};
const addArg=(l,i)=>{""==link.split("/")[link.split("/").length-1]?link=link+"?"+l+(""==i?"":"="+i):link=link+"&"+l+(""==i?"":"="+i)};
const addExt=(u)=>{addArg("extension","https://extensions.turbowarp.org/"+u+".js")};
/////////////////////////////
if (v.xyz) {
append2Link("mirror.turbowarp.xyz/")
} else {
append2Link("turbowarp.org/"+v.projectid+"/");
if (v.fullscreen) {
append2Link("/fullscreen/");
} else if (v.embed) {
append2Link("/embed/");
}
}
if(v.turbo) { 
    addArg("turbo","");
}
if(v.username!="") { 
    addArg("username",v.username);
}
if(v.cloudhost!="wss://clouddata.turbowarp.org"&&v.cloudhost!="ws://clouddata.turbowarp.org") { 
    addArg("cloud_host",v.cloudhost);
}
if(v.fps!=30) { 
addArg("fps",v.fps);
}
if (v.interpolate) {
addArg("interpolate","");
}
if (v.fencing) {
addArg("offscreen","");
}
if (v.qualitypen) {
addArg("hqpen","");
}
if (v.warptimer) {
addArg("stuck","");
}
if (v.clonelimit!=300) {
addArg("clones",v.clonelimit);
}
if (v.removemisclimits) {
addArg("limitless","");
}
if (v.nocompile) {
addArg("nocompile","");
}
if (b.box2d) {
addExt("box2d")
}
if (b.stretch) {
addExt("stretch")
}
if (b.gamepad) {
addExt("gamepad")
}
if (b.files) {
addExt("files")
}
if (b.pointerlock) {
addExt("pointerlock")
}
if (b.utilites) {
addExt("utilites")
}
if (b.runtime) {
addExt("runtime-options")
}
if (b.cursor) {
addExt("cursor")
}
if (b.fetch) {
addExt("fetch")
}
if (b.bitwise) {
addExt("bitwise")
}
if (b.cloudlink) {
addExt("cloudlink")
}
if (b.pingcloud) {
addExt("clouddata-ping")
}
if (b.penplus) {
addExt("penplus")
}
if (b.sound) {
addExt("sound")
}
//If it is XYZ then it will add the id last for working purposes
if (v.xyz) {
append2Link("#"+v.projectid);
}

try {
navigator.clipboard.writeText(link);
navigator.clipboard.write(link);
alert(`Your URI is:

${link}
The link was copied to your clipboard.`);
} catch {
alert(`Your URI is:

${link}`);
}
hideAllDropDowns()
}

//Generates json
function generate() {
var save = {};
var v = save, b = {};
v.extensions = {};
b = v.extensions;
/////////////////////////////

//project stuff
v.projectid = elm("projectid").value;
v.turbo = elm("turbo").checked;
v.fullscreen = elm("fullscreen").checked;
v.embed = elm("embed").checked;
v.xyz = elm("xyz").checked;
v.username = elm("username").value;
v.cloudhost = elm("cloudhost").value;

//fetured extensions
v.fps = elm("fps").value;
v.interpolate = elm("interpolation").checked;
v.fencing = elm("fencing").checked;
v.qualitypen = elm("qualitypen").checked;
v.warptimer = elm("warptimer").checked;

//remove limits
v.infiniteclones = elm("infinityclones").checked;
if (!v.infiniteclones) {
v.clonelimit = elm("customclonelimit").value;
} else {
v.clonelimit = "Infinity"; 
}
v.removemisclimits = elm("removemisclimits").checked;

//danger zone
v.stagewidth = elm("stagewidth").value;
v.stageheight = elm("stageheight").value;
v.nocompile = elm("disablecompiler").checked;

//Extensions
b.box2d = ext("box2d").checked;
b.stretch = ext("stretch").checked;
b.gamepad = ext("gamepad").checked;
b.files = ext("files").checked;
b.pointerlock = ext("pointerlock").checked;
b.utilites = ext("utilites").checked;
b.runtime = ext("runtime").checked;
b.cursor = ext("cursor").checked;
b.fetch = ext("fetch").checked;
b.bitwise = ext("bitwise").checked;
b.cloudlink = ext("cloudlink").checked;
b.pingcloud = ext("pingcloud").checked;
b.penplus = ext("penplus").checked;
b.sound = ext("sound").checked;

//Resets and reruns the dropdowns
hideAllDropDowns()
showAllDropDowns()

/////////////////////////////
//Makes the save code
v.extensions=b;
save=v;
generateUri(save);
}