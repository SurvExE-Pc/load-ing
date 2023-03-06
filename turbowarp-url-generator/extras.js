/*
Copyright © 2023 SurvExE_Pc

Licence:
https://tinyurl.com/MIT-License

Github:
https://github.com/SurvExE_Pc
*/

function elm(id) {
return document.getElementById(id);
}

function ext(id) {
return document.getElementById(id+"_ext");
}

setInterval(()=>{
//Custom FPS
document.getElementById("fps_record").innerText=document.getElementById("fps").value;
},1)