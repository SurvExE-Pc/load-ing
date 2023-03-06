/*
Copyright © 2023 SurvExE_Pc

Licence:
https://tinyurl.com/MIT-License

Github:
https://github.com/SurvExE_Pc
*/

//Single dropdown
function dropdown(id) {
var dropdowns = document.getElementsByClassName("dropdown-content");
dropdowns[id-1].classList.toggle("show");
}
function hideDropdown(id) {
var dropdowns = document.getElementsByClassName("dropdown-content");
dropdowns[id-1].classList.toggle("show",false);
}
function showDropdown(id) {
var dropdowns = document.getElementsByClassName("dropdown-content");
dropdowns[id-1].classList.toggle("show",true);
}

//All dropdowns
function hideAllDropDowns() {
for (let i = 0;i<6;i++) {
hideDropdown(i+1);
}
}
function showAllDropDowns() {
for (let i = 0;i<6;i++) {
hideDropdown(i+1);
}
}