let mixData = JSON.parse(sessionStorage.getItem('mix'));
// console.log(mixData);
let subPlayType = mixData.subPlayType;//子玩法
let lotteryType = mixData.lotteryType;//彩种类型
let storageData = mixData;
let storageName = 'mix';
let type = 'pass';

//默认加载一次
let detail = template('ordermix', { data: mixData.data });//不同
$('.buy_detail ul').html(detail);

if (mixData != null || mixData != undefined) {
    if (storageData.surpass == 1){
        $('.pass_way').eq(1).addClass('active').siblings().removeClass('active');
        $('.freeStyle').show();
        $('.passStyle').hide();
        getFreeSpan(4);
    }else{
        getSpan($('.bf_score.ok').length);
    }
    
}
let OddsArr = [];//  赔率的数组 bet
let betString;//过关方式 M串N 自由过关
let betStringArr;
let betTypeArr;//过关方式 自由过关
let contentArr = [];// 内容的数组 bet
let buycontent = [];// 内容的排列组合
let buyOddsStr = [];// 赔率的排列组合
let buyOdds;// 赔率的计算后的数组
let amount;//投注金额
let maxmoney;//赔率
let pot;//注数
let savedata = JSON.parse(sessionStorage.getItem('savedata'));
if (savedata) {
    $('.mui-input-numbox').val(savedata.multipleVal);
    let passWay = savedata.passWay;
    let len = $('.bf_score.ok').length;//不同
    let styleType = savedata.styleType;
    if (passWay == 1) {//不同
        $('.pass_way').eq(1).addClass('active');
        $('.pass_way').eq(0).removeClass('active');
        $('.passStyle').hide();
        $('.freeStyle').show();
        getFreeSpan(len);
        $.each($('.freeStyle span'), function (index, element) {
            $.each(styleType, function (idx, ele) {
                if ($(element).text().indexOf(ele) > -1) {
                    $(element).addClass('active');
                }
            });
        });
    } else {
        $('.pass_way').eq(0).addClass('active');
        getSpan(len);
        $.each($('.passStyle span'), function (index, element) {
            if ($(element).text() == styleType) {
                $(element).addClass('active');
            }
        });
    }
    $('.pot').text(savedata.pot);//注数
    $('.amount').text(savedata.amount);//投注金额
    $('.maxmoney').text(parseInt(savedata.maxmoney));//最高奖金  
    buyOddsStr = savedata.buyOddsStr;
    buycontent = savedata.buycontent;
    buyOdds = savedata.oddsnum;
    betString = savedata.betString;
}

if (savedata) {
    $(document).on('tap', function () {
        sessionStorage.removeItem('savedata');
    })
}

let spqfSecObj = {};
if (savedata){//不同
    spqfSecObj.multipleVal = savedata.multipleVal;
    spqfSecObj.passWay = savedata.passWay;
    spqfSecObj.styleType = savedata.styleType;
}else{
    if (storageData.surpass == 1){
    spqfSecObj.passWay = 1;//默认过关方式 自由过关
    }else{
        spqfSecObj.passWay = 0;//默认过关方式 M*N
    }
    spqfSecObj.multipleVal = 1;//默认倍数
}
// console.log(spqfSecObj);
sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));

//点击返回
$('.page-2 .return').on('tap', function () {
    returnCode(storageName);
});

$('.buy_detail').on('tap', '.del_icon', function () {
    storageData = JSON.parse(sessionStorage.getItem(storageName));
    let _this = $(this);
    if (storageData.surpass == 1){
        let id = _this.parent().data('id');
        storageData.data.map((element, index) => {
            if (id == element[0].id) {
                storageData.data.splice(index, 1);
                sessionStorage.setItem(storageName, JSON.stringify(storageData));
            }
        });
        let detail = template('ordermix', { data: storageData.data });//不同
        $('.buy_detail ul').html(detail);
        clearData();
        $('.freeStyle span').removeClass('active');
        spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
        spqfSecObj.styleType = '';
        spqfSecObj.multipleVal = 1;
        sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
        $('.mui-input-numbox').val(1);
        spqfSecObj.multipleVal = 1;//默认倍数

        let len = $('.bf_score.ok').length;
        let flag = false;
        for (let i = 0; i < storageData.data.length;i++){
            if (storageData.data[i][0].type == "score" || storageData.data[i][0].type == 'halfFull'){
                flag = true;
                break;
            }
        }
        if(flag){
            if (len <= 4){
                getChangeStuts(storageData, storageName)
            }
        }else{
            getChangeStuts(storageData, storageName)
        }
    }else{
        storageData = JSON.parse(sessionStorage.getItem(storageName));//不同
        delCode(_this, subPlayType, storageData, storageName, type);  
    }
});

function getChangeStuts(storageData, storageName) {
    storageData.surpass = 0;
    sessionStorage.setItem(storageName, JSON.stringify(storageData));
    spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
    spqfSecObj.passWay = 0;
    sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
    $('.pass_way').eq(0).addClass('active').siblings().removeClass('active');
    $('.freeStyle').hide();
    $('.passStyle').show();
    getSpan(storageData.data.length);
}

$('.page-2').on('tap', '.del_all', function () {
    delAllData(storageName);
});

$('.content').on('tap', '.confirm', function () {
    $('.mask').hide();
    $('.passway').hide();
    $('body').css('overflow', '');
    $('.content').html('');
});


/* M串N，自由过关 开始 */

$(".pass_way").on('tap', function () {
    storageData = JSON.parse(sessionStorage.getItem(storageName));
    let len = $('.bf_score.ok').length;
    if (storageData.surpass == 1){
        mui.alert('包含<比分或半全场胜平负>彩种，超过4场只能选择自由过关玩法');
        $('.pass_way').eq(1).addClass('active').siblings().removeClass('active');
        $('.freeStyle').show();
        $('.passStyle').hide();
        getFreeSpan(4);
        clearData();
        $('.mui-input-numbox').val(1);
        spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
        spqfSecObj.multipleVal = 1;//默认倍数
        spqfSecObj.styleType = '';
        sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
    }else{
        let _this = $(this);
        let len = $('.bf_score.ok').length;
        changePassWay(_this, len);
    }
    
})

$('.passStyle').on('tap', 'span', function () {
    let _this = $(this);
    clickPassStyle(_this);
});

$('.freeStyle').on('tap', 'span', function () {
    let _this = $(this);
    clickFreeStyle(_this);
});


/* M串N，自由过关 结束 */

$('.styleType').on('tap', 'span', function () {
    storageData = JSON.parse(sessionStorage.getItem(storageName));
    // console.log(storageData.subPlayType);
    if (storageData.subPlayType == '59'){
        let flag = false;
        for (let i = 0; i < storageData.data.length - 1; i++) {
            if (storageData.data[i][0].type != storageData.data[i + 1][0].type) {
                flag = true;
                break;
            }
        }
        if (flag) {
            getChangeCombin();
        } else {
            let type = storageData.data[0][0].type;
            switch (type) {
                case "winFlatLoss":
                    subPlayType = '51';
                    subPlayTypeWords = '胜平负';
                    break;
                case "letwinFlatLoss":
                    subPlayType = '56';
                    subPlayTypeWords = '让球胜平负';
                    break;
                case "score":
                    subPlayType = '52';
                    subPlayTypeWords = '比分';
                    break;
                case "halfFull":
                    subPlayType = '54';
                    subPlayTypeWords = '半全场';
                    break;
                case "goals":
                    subPlayType = '53';
                    subPlayTypeWords = '总进球';
                    break;
                default:
                    break;
            }
            mui.confirm('混合投注不能所有赛事只投一个彩种,是否转为普通' + subPlayTypeWords + '投注', '温馨提示', ['是', '否'], function (e) {
                if (e.index == 0) {
                    storageData.subPlayType = subPlayType;//子玩法
                    sessionStorage.setItem(storageName, JSON.stringify(storageData));
                    getChangeCombin(); 
                } else {
                    // console.log(2222);
                    // $('.styleType span').removeClass('active');
                    // spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
                    // spqfSecObj.styleType = '';
                    // sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
                    sessionStorage.removeItem('mix');
                    sessionStorage.removeItem('spqfSecObj');
                    location.href = '../../hall/hall.html';
                }
            });
        }
    }else{
        getChangeCombin(); 
    }
    
});

function getChangeCombin() {
    if ($('.styleType span').hasClass('active')) {
        spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
        multipleVal = parseInt(spqfSecObj.multipleVal);//倍数
        oldStorage = JSON.parse(sessionStorage.getItem('mix'));//不同
        storageData = getMixStorage(oldStorage);//不同
        getCombinScore(storageData);
    } else {
        clearData();
    }
}

//不同
function getMixStorage(mixData) {
    let data = [];
    mixData.data.map((element, index) => {
        let mixDataDetail = {
            matchUniqueId: element[0].id,
            guest: element[0].guest,
            host: element[0].host,
            time: element[0].time,
            type: element[0].type
        };
        let selectedItem = [];
        element.map((ele, idx) => {
            selectedItem.push({
                key: ele.key,
                val: ele.val
            });
        });
        mixDataDetail.selectedItem = selectedItem;
        data.push(mixDataDetail);
    });
    let mixObj = {
        lotteryType: mixData.lotteryType,
        subPlayType: mixData.subPlayType,
        surpass: mixData.surpass,
        data: data,

    }
    return mixObj;
}

$('.mui-numbox .mui-btn-numbox-plus').on('tap', function () {
    clickNumboxPlus(type);
});

$('.mui-numbox .mui-btn-numbox-minus').on('tap', function () {
    clickNumboxMinus(type);
});

$('.mui-numbox .mui-input-numbox').on('blur', function () {
    changeInputNumbox(type);
});

/* 计算代码 start */

let putbuyObj = {};
let buyspfdata = {};
$("#look").on('tap', function () {
    getLook();
});
$("#look").live("tap", function () {
    let topHeight = $("#bfalert").height()
    $('.lottery_contain').css('paddingTop', topHeight - 1)
})

$('.sure').on('tap', function () {
    spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
    if (!spqfSecObj.styleType) {
        mui.alert('请选择过关方式');
    } else {
        oldStorage = JSON.parse(sessionStorage.getItem(storageName));//不同
        // console.log(oldStorage);
        storageData = getMixStorage(oldStorage);//不同
        putbuyObj = {
            lotteryType: storageData.lotteryType,//彩种类型
            subPlayType: storageData.subPlayType,//子玩法
            multiple: spqfSecObj.multipleVal,//倍数
            pot: $('.pot').text(),//注数
            amount: $('.amount').text(),//投注金额
        }
        if (typeof spqfSecObj.styleType === 'object') {
            putbuyObj.betType = JSON.stringify(spqfSecObj.styleType);//投注方式
        } else {
            putbuyObj.betType = spqfSecObj.styleType;//投注方式
        }
        let betContextObj = {};//不同
        if (storageData.subPlayType =='59'){
            betContextObj = getMixContext(storageData,betContextObj);
        }else{
            let subPlayType = storageData.subPlayType;
            betContextObj = getChangeContext(storageData, betContextObj);
        }
        putbuyObj.betContext = JSON.stringify(betContextObj);//投注内容
        console.log('putbuyObj：', putbuyObj);
        amount = $('.amount').text();//投注金额
        if (amount > 20000) {
            mui.alert('投注金额不能超过2万，请重新选择！');
        } else {
            putAjax(storageName);
        }
    }
});

function getMixContext(storageData, betContextObj) {
    storageData.data.forEach(element => {
        if (element.type == "winFlatLoss") {
            let objContext = {};
            objContext['51'] = getWinFlatLoss(element);
            betContextObj[element.matchUniqueId] = objContext;
        }
        if (element.type == "letwinFlatLoss") {
            let objContext = {};
            objContext['56'] = getWinFlatLoss(element);
            betContextObj[element.matchUniqueId] = objContext;
        }
        if (element.type == "score") {
            let objContext = {};
            let str = "";
            element.selectedItem.forEach(ele => {
                str += ele.key.replace(':', '');
            })
            objContext['52'] = str;
            betContextObj[element.matchUniqueId] = objContext;
        }
        if (element.type == "halfFull") {
            let objContext = {};
            objContext['54'] = getHalfFull(element);
            betContextObj[element.matchUniqueId] = objContext;
        }
        if (element.type == "goals") {
            let objContext = {};
            objContext['53'] = getGoals(element);
            betContextObj[element.matchUniqueId] = objContext;
        }
    });
    return betContextObj;
}

function getChangeContext(storageData, betContextObj) {
    storageData.data.forEach(element => {
        if (subPlayType == '51' || subPlayType == '56') {
            betContextObj[element.matchUniqueId] = getWinFlatLoss(element);
        } else if (subPlayType == '52') {
            let str = "";
            element.selectedItem.forEach(ele => {
                str += ele.key.replace(':', '');
            })
            betContextObj[element.matchUniqueId] = str;
        } else if (subPlayType == '54') {
            betContextObj[element.matchUniqueId] = getHalfFull(element);
        } else if (subPlayType == '53') {
            betContextObj[element.matchUniqueId] = getGoals(element);
        }
    });
    return betContextObj;
}


function getWinFlatLoss(obj) {
    let str = "";
    obj.selectedItem.forEach(ele => {
        if (ele.key == '主胜') {
            str += "3";
        }
        if (ele.key == '平') {
            str += "1";
        }
        if (ele.key == '主负') {
            str += "0";
        }
    })
    return str;
}








