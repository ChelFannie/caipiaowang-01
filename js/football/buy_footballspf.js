let spfdataArr = JSON.parse(sessionStorage.getItem('spfdataArr'));
console.log(spfdataArr);
let storageData = spfdataArr;
let storageName = 'spfdataArr';
let subPlayType = storageData[0].subplaytype;//子玩法
let type = storageData[0].type;//过关方式
console.log(type);
// console.log(spfdataArr);
//默认加载一次
let orderspfdata = template('orderspfdata', {'items':spfdataArr});
$('.buy_detail ul').html(orderspfdata);

if(spfdataArr != null || spfdataArr != undefined){
    if (type == 'single'){
        $('.options_r').html('');
        $('.passStyle').html('<span>单关</span>');
    } else if(type == 'pass'){
        let detailItems = $('.detail_item .selected').parent().parent().length;
        getSpan(detailItems);
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
    let detailItems = $('.detail_item .selected').parent().parent().length;
    let styleType = savedata.styleType;
    if(type == 'pass'){
        if (passWay == 1) {
            $('.pass_way').eq(1).addClass('active');
            $('.pass_way').eq(0).removeClass('active');
            $('.passStyle').hide();
            $('.freeStyle').show();
            getFreeSpan(detailItems);
            $.each($('.freeStyle span'), function (index, element) {
                $.each(styleType, function (idx, ele) {
                    if ($(element).text().indexOf(ele) > -1) {
                        $(element).addClass('active');
                    }
                });
            });
        } else {
            $('.pass_way').eq(0).addClass('active');
            getSpan(detailItems);
            $.each($('.passStyle span'), function (index, element) {
                if ($(element).text() == styleType) {
                    $(element).addClass('active');
                }
            });
        }
    }else if(type == 'single'){
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
if (savedata){
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
        spqfSecObj.passWay = '';//默认过关方式 单关
    } else if (type == 'pass') {
        spqfSecObj.passWay = 0;//默认过关方式 M*N
    }
}

sessionStorage.setItem('spqfSecObj',JSON.stringify(spqfSecObj));


$('.page-2 .return').on('tap',function(){
    returnCode(storageName);
});

$('.buy_detail').on('tap','.del_icon',function(){
    let _this = $(this);
    delCode(_this, subPlayType, storageData, storageName, type);
});

$('.page-2').on('tap','.del_all',function(){
    delAllData(storageName);
});


$('.content').on('tap', '.confirm',function(){
    $('.mask').hide();
    $('.passway').hide();
    $('body').css('overflow','');
    $('.content').html('');
});




/* M串N，自由过关 开始 */  
$(".pass_way").on('tap',function(){
    let _this = $(this);
    let len = $('.detail_item .selected').parent().parent().length;
    changePassWay(_this,len);
})

$('.passStyle').on('tap','span',function(){
    let _this = $(this);
    clickPassStyle(_this);
});

$('.freeStyle').on('tap','span',function(){
    let _this = $(this);
    clickFreeStyle(_this);
});
/* M串N，自由过关 结束 */

let selectLength = JSON.parse(sessionStorage.getItem('spfdataArr')).length;
$('.page-2').on('tap','.list_item_1',function(){
    let buySpfData = JSON.parse(sessionStorage.getItem('spfdataArr'));
    let editIndex = $(this).index();
    let parentLi=$(this).parent().parent();
    if($(this).hasClass('selected')){
        $(this).removeClass('selected'); 
        if(editIndex === 0){
            $(parentLi)[0].dataset.firstindex='0';
        }else if(editIndex ===1){
            $(parentLi)[0].dataset.secindex='0';
        }else if(editIndex ===2){
            $(parentLi)[0].dataset.thirdindex='0';
        }       
    }else{
        $(this).addClass('selected');
        if(editIndex === 0){
            $(parentLi)[0].dataset.firstindex='1';
        }else if(editIndex ===1){
            $(parentLi)[0].dataset.secindex='1';
        }else if(editIndex ===2){
            $(parentLi)[0].dataset.thirdindex='1';
        }  
    }
    let detailItems = $('.detail_item .selected').parent().parent().length;
    if(type == 'pass'){
        if (detailItems < 2) {
            $(this).addClass('selected');
            mui.alert('至少选择两场赛事');
            if (editIndex === 0) {
                parentLi.data('firstindex', '1');
            } else if (editIndex === 1) {
                parentLi.data('secindex', '1');
            } else if (editIndex === 2) {
                parentLi.data('thirdindex', '1');
            }
        }
    }else{
        if (detailItems < 1) {
            $(this).addClass('selected');
            mui.alert('至少选择两场赛事');
            if (editIndex === 0) {
                parentLi.data('firstindex', '1');
            } else if (editIndex === 1) {
                parentLi.data('secindex', '1');
            } else if (editIndex === 2) {
                parentLi.data('thirdindex', '1');
            }
        }
    }
    detailItems = $('.detail_item .selected').parent().parent().length;
    if(type == 'pass'){
        if ($('.passStyle').css('display') === 'block') {
            getSpan(detailItems);//M*N
            $('.passStyle span').removeClass('active');
        } else {
            getFreeSpan(detailItems);//自由过关 
            $('.freeStyle span').removeClass('active');
        }
    }
    let lis= Array.from($('.detail_item'));
    let dataArr = [];
    $.each(lis, function(index,ele){
        dataArr.push(ele.dataset);
    });
    dataArr.map(element=>{
        if (type == 'pass') {
            element.type = 'pass';
        } else if (type == 'single') {
            element.type = 'single';
        }
    })
    sessionStorage.setItem('spfdataArr',JSON.stringify(dataArr));


    /*保存选择的代码  开始   选中不同的赛事，改变投注*/
    spqfSecObj=JSON.parse(sessionStorage.getItem('spqfSecObj'));
    if(spqfSecObj){
        if(type == 'pass'){
            detailItems != selectLength ? delete spqfSecObj['styleType'] : '';
            selectLength = detailItems;
            sessionStorage.setItem('spqfSecObj', JSON.stringify(spqfSecObj));
            clearData();
        }
        $('.mui-input-numbox').val(spqfSecObj.multipleVal);
        let styleType=spqfSecObj.styleType;
        if(type == 'pass'){
            if(styleType){
                if(spqfSecObj.passWay == 1){
                    $('.pass_way').eq(1).addClass('active');
                    let spans=$('.freeStyle span');
                    $.each(styleType,function(index,element){
                        $.each(spans,function(idx,ele){
                            if($(ele).text().indexOf(element)>-1){
                                spans.eq(idx).addClass('active');
                            }
                        });
                    });
                }else{
                    $('.pass_way').eq(0).addClass('active');
                    let spans =  $('.passStyle span');
                    $.each(spans,function(index,ele){
                        if($(ele).text() == styleType){
                            spans.eq(index).addClass('active');
                        }
                    });
                }
                getCombinResult();
            }
        } else if (type == 'single'){
            getSingleCombine();
        }
    }
    /*保存选择的代码 结束*/
});


$('.styleType').on('tap','span',function(){
    if(type == 'pass'){
        getCombinResult();
    }else{
        getSingleCombine();
    }
});

$('.mui-numbox .mui-btn-numbox-plus').on('tap',function(){
    clickNumboxPlus(type);
});

$('.mui-numbox .mui-btn-numbox-minus').on('tap',function(){
    clickNumboxMinus(type);
});

$('.mui-numbox .mui-input-numbox').on('blur',function(){
    changeInputNumbox(type);
});

/*查看方案弹出层开始*/
let putbuyObj={};
let buyspfdata={};

$("#look").on('tap', function(){
    getLook();
});
// 购买弹出层样式！！！！
$("#look").live("tap", function() {
    let topHeight=$("#bfalert").height()
    $('.lottery_contain').css('paddingTop',topHeight-3)
})
// 购买弹出层样式！！！！

/*查看方案弹出层结束*/
$('.sure').on('tap', function(){
    spqfSecObj=JSON.parse(sessionStorage.getItem('spqfSecObj'));
    if(!spqfSecObj.styleType){
        mui.alert('请选择过关方式');
    }else{
        getPutData(storageName);
    } 
});


/*计算排列组合 开始 */
function getCombinResult(){
    if($('.styleType span').hasClass('active')){
        spqfSecObj=JSON.parse(sessionStorage.getItem('spqfSecObj'));
        multipleVal=parseInt(spqfSecObj.multipleVal);//倍数
        let selectedLists = $('.detail_item .selected').parent().parent();
        spfdataArr = JSON.parse(sessionStorage.getItem('spfdataArr'));
        contentArr=[];
        OddsArr=[];
        $.each(selectedLists,function(index,element){
            datasetId = element.dataset.matchuniqueid;
            $.each(spfdataArr,function(idx,ele){
                let gamebetArr=[];//M*N  内容
                let contentObj={};//M*N  内容
                let oddsbetArr=[];//M*N  赔率
                let oddsObj={};//M*N  赔率
                if(datasetId == ele.matchuniqueid){
                    contentObj.game=datasetId;
                    oddsObj.game=datasetId;
                    if(ele.firstindex == '1'){
                        let str = ele.week+ele.matchtimes+"(胜)";
                        gamebetArr.push(str);
                        oddsbetArr.push(ele.odds3);
                    }
                    if(ele.secindex == '1'){
                        let str = ele.week+ele.matchtimes+"(平)";
                        gamebetArr.push(str);  
                        oddsbetArr.push(ele.odds1);
                    }
                    if(ele.thirdindex == '1'){
                        let str = ele.week+ele.matchtimes+"(负)";
                        gamebetArr.push(str); 
                        oddsbetArr.push(ele.odds0);
                    }
                    oddsObj.bet=oddsbetArr; //M*N  赔率
                    OddsArr.push(oddsObj); //M*N  赔率
                    contentObj.bet=gamebetArr; //M*N  内容
                    contentArr.push(contentObj); //M*N  内容
                } 
            });   
        });
        // console.log(1, OddsArr);//内容排列组合
        // console.log(1, contentArr);//内容排列组合
        if($('.passStyle').css('display') ==='block'){//M串N
            betString =$('.passStyle span.active').text();
            spqfSecObj.styleType=betString;
            sessionStorage.setItem('spqfSecObj',JSON.stringify(spqfSecObj));
            buycontent=getZh(betString, contentArr); //内容的排列组合
            buyOddsStr=getZh(betString, OddsArr); //赔率的排列组合
        }else{//自由过关
            let freeStyleSel=$('.freeStyle span.active');
            let betStringArr=[];
            betTypeArr=[];
            $.each(freeStyleSel,function(index,ele){
                betTypeArr.push($(ele).text().substr(0,1));
                betStringArr.push($(ele).text().substr(0,1) +'x1');
            });
            // console.log(betTypeArr);
            // console.log(betStringArr);
            spqfSecObj.styleType=betTypeArr;
            sessionStorage.setItem('spqfSecObj',JSON.stringify(spqfSecObj));
            buycontent = [];//清空
            buyOddsStr = [];//清空
            $.each(betStringArr,function(index,ele){
                buycontent = buycontent.concat(getZh(ele, contentArr)); //内容的排列组合
                buyOddsStr=buyOddsStr.concat(getZh(ele, OddsArr));  //赔率的排列组合
            });
            betString='自由过关';
        }
        pot = buycontent.length;//注数
        amount = pot * multipleVal * 2;
        if (amount > 20000) {
            limitMaxmoney(amount);
            return;
        }
        buyOdds=getOddsNum(buyOddsStr, multipleVal);
        // maxmoney= Math.ceil(getMaxNum(buyOdds));
        let len = JSON.parse(sessionStorage.getItem('spqfSecObj')).styleType[JSON.parse(sessionStorage.getItem('spqfSecObj')).styleType.length-1];
        let betKey = $('.passStyle').css('display') ==='block' ? betString : passObj[len][passObj[len].length-1];
        maxmoney = Math.ceil(getMaxMoney(buycontent, buyOdds,betKey,OddsArr,contentArr));
        $('.maxmoney').text(maxmoney);//最高奖金
        $('.pot').text(pot);//注数
        $('.amount').text(amount);
    }else{
        clearData();
    }
}
/*计算排列组合 结束 */

function getSingleCombine() {
    if ($('.styleType span').hasClass('active')){
        spqfSecObj = JSON.parse(sessionStorage.getItem('spqfSecObj'));
        // console.log(spqfSecObj);
        multipleVal = parseInt(spqfSecObj.multipleVal);//倍数
        let selectedLists = $('.detail_item .selected').parent().parent();
        spfdataArr = JSON.parse(sessionStorage.getItem('spfdataArr'));
        OddsArr = [];
        buycontent = [];// 内容
        buyOddsStr = [];//赔率 
        selectedLists.map((index,element)=>{
            datasetId = element.dataset.matchuniqueid;
            spfdataArr.map(ele=>{
                let oddsObj = {};//M*N  赔率
                let oddsbetArr = [];//M*N  赔率
                if (datasetId == ele.matchuniqueid){
                    oddsObj.game = datasetId;
                    if (ele.firstindex == '1'){
                        buycontent.push(ele.week + ele.matchtimes + "(胜)");
                        buyOddsStr.push(parseFloat(ele.odds3));
                        oddsbetArr.push(parseFloat(ele.odds3));
                    }
                    if (ele.secindex == '1'){
                        buycontent.push(ele.week + ele.matchtimes + "(平)");
                        buyOddsStr.push(parseFloat(ele.odds1));
                        oddsbetArr.push(parseFloat(ele.odds1));
                    }
                    if (ele.thirdindex == '1'){
                        buycontent.push(ele.week + ele.matchtimes + "(负)");
                        buyOddsStr.push(parseFloat(ele.odds0));
                        oddsbetArr.push(parseFloat(ele.odds0));
                    }
                    oddsObj.bet = oddsbetArr; //M*N  赔率
                    OddsArr.push(oddsObj); //M*N  赔率
                }
            });
        });
        // console.log(buycontent);
        // console.log(buyOddsStr);
        // console.log(OddsArr);//赔率排列组合
        pot = buycontent.length;//注数
        amount = pot * multipleVal * 2;
        if (amount > 20000) {
            limitMaxmoney(amount);
            return;
        }
        buyOdds = getSingleOdds(buyOddsStr, multipleVal);
        maxmoney=0;
        OddsArr.map((val, idx) => {
            maxmoney += Math.max.apply(null, val.bet) * 2 * multipleVal;
        })
        maxmoney = Math.ceil(maxmoney);
        // console.log(Math.ceil(maxmoney));
        // maxmoney = Math.ceil(getMaxNum(buyOdds));
        $('.maxmoney').text(maxmoney);//最高奖金
        $('.pot').text(pot);//注数
        $('.amount').text(amount);
    }else{
        clearData();
    }
}




