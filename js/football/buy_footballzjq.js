let goalsData = JSON.parse(sessionStorage.getItem('goalsData'));
// console.log(1,goalsData);
let storageData = goalsData;
let storageName = 'goalsData';
let subPlayType = storageData.subPlayType;//子玩法
storageData.data.map((val) => {
    val.score.map((goalsval) => {
        val.selectedItem.map((itemsval) => {
            if (goalsval.key == itemsval.key) {
                goalsval['select'] = 1
            }
        })
    })
})

let type = storageData.type;//过关方式
let orderzjqdata = template('orderzjqdata', { items: storageData.data });
$('.buy_detail ul').html(orderzjqdata);

if (storageData != null || storageData != undefined) {
    if(type == 'pass'){
        let len = $('.rbottom_item_1.selected').parent().parent().length;//不同
        getSpan(len);
    } else if (type == 'single'){
        $('.options_r').html('');
        $('.passStyle').html('<span>单关</span>');
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
    let len = $('.rbottom_item_1.selected').parent().parent().length;//不同
    let styleType = savedata.styleType;
    if (type == 'pass') {
        if (passWay == 1) {
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
    } else if (type == 'single') {
        $('.passStyle span').addClass('active');
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
if (savedata){
    spqfSecObj.multipleVal = savedata.multipleVal;
    if (type == 'single') {
        spqfSecObj.passWay = '';//默认过关方式 单关
    } else if (type == 'pass') {
        spqfSecObj.passWay = savedata.passWay;//默认过关方式 M*N
    }
    spqfSecObj.styleType = savedata.styleType;
}else{
   spqfSecObj.multipleVal = 1;//默认倍数
    if (type == 'single') {
        spqfSecObj.passWay = '';//默认过关方式
    } else if (type == 'pass') {
        spqfSecObj.passWay = 0;//默认过关方式 M*N
    } 
}

sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));

//点击返回
$('.page-2 .return').on('tap', function () {
    returnCode(storageName);
});

$('.buy_detail').on('tap', '.del_icon', function () {
    let _this = $(this);
    let storageData = JSON.parse(sessionStorage.getItem(storageName));
    delCode(_this, subPlayType, storageData, storageName ,type);
});

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
    let _this = $(this);
    let len = $('.list_rbottom .selected').parent().parent().length;//不同
    changePassWay(_this, len);
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
    if ($('.styleType span').hasClass('active')) {
        spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
        multipleVal = parseInt(spqfSecObj.multipleVal);//倍数
        storageData = JSON.parse(sessionStorage.getItem(storageName));
        if (type == 'pass') {
            getCombinScore(storageData);
        } else if (type == 'single') {
            getSingleScore(storageData);
        }
    } else {
        clearData();
    }
});

$('.mui-numbox .mui-btn-numbox-plus').on('tap', function () {
    clickNumboxPlus(type);
});

$('.mui-numbox .mui-btn-numbox-minus').on('tap', function () {
    clickNumboxMinus(type);
});

$('.mui-numbox .mui-input-numbox').on('blur', function () {
    changeInputNumbox(type);
});


let sessionLength = JSON.parse(sessionStorage.getItem(storageName)).data.length;
$('.page-2').on('tap', '.rbottom_item_1', function () {
    let storageData = JSON.parse(sessionStorage.getItem(storageName))
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected')
        let len;
        if(type == 'pass'){
            len = 1;
        }else{
            len = 0;
        }
        if ($('.list_rbottom .selected').parent().length == len) {
            storageData.data.map((listVal, listId) => {
                if ($(this).data('id') == listVal.matchUniqueId) {
                    // console.log(listVal.selectedItem.length)
                    if (listVal.selectedItem.length == 1) {
                        mui.alert('至少选择'+(len+1)+'场赛事')
                        $(this).addClass('selected')
                    } else {
                        storageData.data.map((listVal, listId) => {
                            if ($(this).data('id') == listVal.matchUniqueId) {
                                let deleteIndex = $(this).data('key')
                                listVal.selectedItem.map((val, id) => {
                                    if (deleteIndex == val.key) {
                                        storageData.data[listId].selectedItem.splice(id, 1)
                                    }
                                })
                            }
                        })
                        $(this).removeClass('selected')
                    }
                }
            })
        } else {
            storageData.data.map((listVal, listId) => {
                if ($(this).data('id') == listVal.matchUniqueId) {
                    let deleteIndex = $(this).data('key')
                    listVal.selectedItem.map((val, id) => {
                        if (deleteIndex == val.key) {
                            storageData.data[listId].selectedItem.splice(id, 1)
                        }
                    })
                }
            })
            $(this).removeClass('selected')
        }

    } else {
        $(this).addClass('selected')
        storageData.data.map((listVal, listId) => {
            if ($(this).data('id') == listVal.matchUniqueId) {
                storageData.data[listId].selectedItem.push({
                    key: $(this).data('key'),
                    val: $(this).data('val')
                })
            }
        })
    }
    sessionStorage.setItem(storageName, JSON.stringify(storageData));

    //改变过关方式
    spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
    let selectLen = $('.rbottom_item_1.selected').parent().parent().length;
    if(type == 'pass'){
        if (storageData.data.length >= 2) {
            if (spqfSecObj.passWay == '1') {
                getFreeSpan(selectLen);
                $('.freeStyle span').removeClass('active');
            } else {
                getSpan(selectLen);
                $('.passStyle span').removeClass('active');
            }
        } else {
            mui.alert('至少选择两场赛事', function () {
                $('.styleType').html('');
            });
        }
    }
    if (spqfSecObj){
        if (selectLen != sessionLength && type == 'pass') {
            delete spqfSecObj['styleType'];
            sessionLength = selectLen;
            sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
            clearData();
        }
        $('.mui-input-numbox').val(spqfSecObj.multipleVal);
        if (spqfSecObj.styleType) {
            multipleVal = parseInt(spqfSecObj.multipleVal);//倍数
            if(type == 'pass'){
                if (spqfSecObj.passWay == 1) {
                    $('.pass_way').eq(1).addClass('active');
                    $('.freeStyle span').map((index, element) => {
                        spqfSecObj.styleType.map((ele, idx) => {
                            if ($(element).text().indexOf(ele) > -1) {
                                $(element).addClass('active');
                            }
                        });
                    });
                } else {
                    $('.pass_way').eq(0).addClass('active');
                    $('.passStyle span').map((index, element) => {
                        if ($(element).text() == spqfSecObj.styleType) {
                            $(element).addClass('active');
                        }
                    });
                }
                getCombinScore(storageData);
            } else if (type == 'single'){
                getSingleScore(storageData);
            }
        }
    }
});



/*查看方案弹出层开始*/
let putbuyObj = {};
let buyspfdata = {};
$("#look").on('tap', function () {
    getLook();
});
/*查看方案弹出层结束*/

// 购买弹出层样式！！！！
$("#look").live("tap", function () {
    let topHeight = $("#bfalert").height()
    $('.lottery_contain').css('paddingTop', topHeight - 1)
})

$('.sure').on('tap', function () {
    spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
    if (!spqfSecObj.styleType) {
        mui.alert('请选择过关方式');
    } else {
        getPutData(storageName);
    }
});