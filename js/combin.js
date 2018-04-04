onmessage = function (event) {
    function getNoteCount(n, m) {
        var noteCount = [0, 0, 0, 0, 0, 0, 0, 0];
        var isOk = false;
        switch (n) {
            case 1:
                noteCount[0] = 1;
                isOk = true;
                break;
            case 2:
                switch (m) {
                    case 1:
                        noteCount[1] = 1;
                        isOk = true;
                        break;
                    case 3:
                        noteCount[0] = 2;
                        noteCount[1] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 3:
                switch (m) {
                    case 1:
                        noteCount[2] = 1;
                        isOk = true;
                        break;
                    case 3:
                        noteCount[1] = 3;
                        isOk = true;
                        break;
                    case 4:
                        noteCount[1] = 3;
                        noteCount[2] = 1;
                        isOk = true;
                        break;
                    case 6:
                        noteCount[0] = 3;
                        noteCount[1] = 3;
                        isOk = true;
                        break;
                    case 7:
                        noteCount[0] = 3;
                        noteCount[1] = 3;
                        noteCount[2] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 4:
                switch (m) {
                    case 1:
                        noteCount[3] = 1;
                        isOk = true;
                        break;
                    case 4:
                        noteCount[2] = 4;
                        isOk = true;
                        break;
                    case 5:
                        noteCount[2] = 4;
                        noteCount[3] = 1;
                        isOk = true;
                        break;
                    case 6:
                        noteCount[1] = 6;
                        isOk = true;
                        break;
                    case 10:
                        noteCount[0] = 4;
                        noteCount[1] = 6;
                        isOk = true;
                        break;
                    case 11:
                        noteCount[1] = 6;
                        noteCount[2] = 4;
                        noteCount[3] = 1;
                        isOk = true;
                        break;
                    case 14:
                        noteCount[0] = 4;
                        noteCount[1] = 6;
                        noteCount[2] = 4;
                        isOk = true;
                        break;
                    case 15:
                        noteCount[0] = 4;
                        noteCount[1] = 6;
                        noteCount[2] = 4;
                        noteCount[3] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 5:
                switch (m) {
                    case 1:
                        noteCount[4] = 1;
                        isOk = true;
                        break;
                    case 5:
                        noteCount[3] = 5;
                        isOk = true;
                        break;
                    case 6:
                        noteCount[3] = 5;
                        noteCount[4] = 1;
                        isOk = true;
                        break;
                    case 10:
                        noteCount[1] = 10;
                        isOk = true;
                        break;
                    case 15:
                        noteCount[0] = 5;
                        noteCount[1] = 10;
                        isOk = true;
                        break;
                    case 16:
                        noteCount[2] = 10;
                        noteCount[3] = 5;
                        noteCount[4] = 1;
                        isOk = true;
                        break;
                    case 20:
                        noteCount[1] = 10;
                        noteCount[2] = 10;
                        isOk = true;
                        break;
                    case 25:
                        noteCount[0] = 5;
                        noteCount[1] = 10;
                        noteCount[2] = 10;
                        isOk = true;
                        break;
                    case 26:
                        noteCount[1] = 10;
                        noteCount[2] = 10;
                        noteCount[3] = 5;
                        noteCount[4] = 1;
                        isOk = true;
                        break;
                    case 30:
                        noteCount[0] = 5;
                        noteCount[1] = 10;
                        noteCount[2] = 10;
                        noteCount[3] = 5;
                        isOk = true;
                        break;
                    case 31:
                        noteCount[0] = 5;
                        noteCount[1] = 10;
                        noteCount[2] = 10;
                        noteCount[3] = 5;
                        noteCount[4] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 6:
                switch (m) {
                    case 1:
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                    case 6:
                        noteCount[4] = 6;
                        isOk = true;
                        break;
                    case 7:
                        noteCount[4] = 6;
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                    case 15:
                        noteCount[1] = 15;
                        isOk = true;
                        break;
                    case 20:
                        noteCount[2] = 20;
                        isOk = true;
                        break;
                    case 21:
                        noteCount[0] = 6;
                        noteCount[1] = 15;
                        isOk = true;
                        break;
                    case 22:
                        noteCount[3] = 15;
                        noteCount[4] = 6;
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                    case 35:
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        isOk = true;
                        break;
                    case 41:
                        noteCount[0] = 6;
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        isOk = true;
                        break;
                    case 42:
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        noteCount[4] = 6;
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                    case 50:
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        isOk = true;
                        break;
                    case 56:
                        noteCount[0] = 6;
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        isOk = true;
                        break;
                    case 57:
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        noteCount[4] = 6;
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                    case 62:
                        noteCount[0] = 6;
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        noteCount[4] = 6;
                        isOk = true;
                        break;
                    case 63:
                        noteCount[0] = 6;
                        noteCount[1] = 15;
                        noteCount[2] = 20;
                        noteCount[3] = 15;
                        noteCount[4] = 6;
                        noteCount[5] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 7:
                switch (m) {
                    case 1:
                        noteCount[6] = 1;
                        isOk = true;
                        break;
                    case 7:
                        noteCount[5] = 7;
                        isOk = true;
                        break;
                    case 8:
                        noteCount[5] = 7;
                        noteCount[6] = 1;
                        isOk = true;
                        break;
                    case 21:
                        noteCount[4] = 21;
                        isOk = true;
                        break;
                    case 35:
                        noteCount[3] = 35;
                        isOk = true;
                        break;
                    case 120:
                        noteCount[1] = 21;
                        noteCount[2] = 35;
                        noteCount[3] = 35;
                        noteCount[4] = 21;
                        noteCount[5] = 7;
                        noteCount[6] = 1;
                        isOk = true;
                        break;
                    case 127:
                        noteCount[0] = 7;
                        noteCount[1] = 21;
                        noteCount[2] = 35;
                        noteCount[3] = 35;
                        noteCount[4] = 21;
                        noteCount[5] = 7;
                        noteCount[6] = 1;
                        isOk = true;
                        break;
                }
                break;
            case 8:
                switch (m) {
                    case 1:
                        noteCount[7] = 1;
                        isOk = true;
                        break;
                    case 8:
                        noteCount[6] = 8;
                        isOk = true;
                        break;
                    case 9:
                        noteCount[6] = 8;
                        noteCount[7] = 1;
                        isOk = true;
                        break;
                    case 28:
                        noteCount[5] = 28;
                        isOk = true;
                        break;
                    case 56:
                        noteCount[4] = 56;
                        isOk = true;
                        break;
                    case 70:
                        noteCount[3] = 70;
                        isOk = true;
                        break;
                    case 247:
                        noteCount[1] = 28;
                        noteCount[2] = 56;
                        noteCount[3] = 70;
                        noteCount[4] = 56;
                        noteCount[5] = 28;
                        noteCount[6] = 8;
                        noteCount[7] = 1;
                        isOk = true;
                        break;
                    case 255:
                        noteCount[0] = 8;
                        noteCount[1] = 28;
                        noteCount[2] = 56;
                        noteCount[3] = 70;
                        noteCount[4] = 56;
                        noteCount[5] = 28;
                        noteCount[6] = 8;
                        noteCount[7] = 1;
                        isOk = true;
                        break;
                }
                break;
        }
        return noteCount;
    }

// var worker = new Worker(window.URL.createObjectURL(new Blob([])));

    function deepCopy(obj) {
        var result;
        if (Object.prototype.toString.call(obj) == "[object Array]") {
            result = [];
            for (var _temp in obj) {
                result.push(obj[_temp]);
            }
        } else {
            result = {};
            for (var key in obj) {
                result[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
            }
        }
        return result;
    }
    function combineS(builder, dest, builderArray) {
        let _builder = builder;
        let _dest = deepCopy(dest);
        while (_dest.length > 0) {
            let _destTemp = _dest.splice(0, 1)[0];
            if (builder.indexOf(_destTemp.game) != -1) {
                continue;
            }
            for (var _index = 0; _index < _destTemp.bet.length; _index++) {
                builder += "" + _destTemp.bet[_index] + "x";
                combineS(builder, _dest, builderArray);
                if (builder != "") {
                    builder = builder.substring(0, builder.lastIndexOf("x")); builderArray.push(builder); builder = _builder;
                }
            }
            builder = _builder;
        }
        builder = _builder;
    }
// for (var u = 0; u < 10000; u++) {
//     for (var t = 0; t < 1000; t++) { }
// }



    function getArr(evt) {
        var builder = "";
        var builderArray = new Array();
        combineS(builder, evt, builderArray);
        return builderArray
    }
    getZh(event.data.betString, event.data.gameAarray)
    function getZh(betString, gameAarray) {
        let bet = betString.split("x");
        let betArrays = getNoteCount(parseInt(bet[0]), parseInt(bet[1]));
        let a = getArr(gameAarray);
        let _p = 1;
        let arr = [];
        for (var _b in betArrays) {
            if (betArrays[_b] == 0) {
                continue;
            }
            for (var _e in a) {
                if ((a[_e].split('x')).length == (parseInt(_b) + 1)) {
                    arr.push(a[_e]);
                    _p++;
                }
            }
        }
        // return arr;
        postMessage(arr) 
    }
}