/*
Copyright © 2023 SurvExE_Pc

Licence:
https://load-ing.pages.dev/public/aesFn/LICENSE.txt

Github:
https://github.com/SurvExE_Pc
*/

//decrypt and encrypt AES functions using the AES library
function encryptAES(args) {
    var ciphertext = Aes.Ctr.encrypt(args.data, args.pwd, args.bytes);
    return ciphertext;
}
function decryptAES(args) {
    var plain = Aes.Ctr.decrypt(args.data, args.pwd, args.bytes);
    return plain;
}
//Used as a way to construct the data needed for the decrypt and encrypt AES functions.
function fetchData(id) {
    //Settings
    const idMax = 3;
    const idMin = 0;
    //Error checking
    if (id>idMax||id<idMin) {
        console.error("Invalid Id.");
        return "Invalid Id.";
    }
    //Checking if its using AES 128 or 256
    if (id>=idMin&&id<(Math.floor(idMax/2))) {
        var p = "password128_";
        var t = "text128_";
    } else if (id<=idMax&&id>=(Math.ceil(idMax/2))) {
        var p = "password256_";
        var t = "text256_";
    }
    //Getting values
    if (id==0||id==2) {
        var text = document.getElementById(t+"encode").value;
        var pwd = document.getElementById(p+"encode").value;
    } else if (id==1||id==3) {
        var text = document.getElementById(t+"decode").value;
        var pwd = document.getElementById(p+"decode").value;
    }
    //Returning data
    if (id==0||id==1) {
        return {"data":text,"pwd":pwd,"bytes":128};
    } else if (id==2||id==3) {
        return {"data":text,"pwd":pwd,"bytes":256};
    }
    //Returns if all returns failed or not checks worked
    return "Failed all checks.";
}
function updateData (data) {
    return_data = document.getElementById("return_data");
    return_data.value = data;
}