$.get('/f-you/mfyo.txt', function(data) {
    document.getElementById("flip").src=data;
}, 'text');
$.get('/f-you/favicon.txt', function(data) {
    document.getElementById("icon").href=data;
}, 'text');
document.getElementById("title").innerText=document.getElementById("title").innerText.replaceAll("{}",`${atob("Rg==")}P{${atob("aw==")}`).replaceAll("P{",atob("X2M=")).replaceAll("\_",atob("dQ=="))