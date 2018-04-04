selectData=JSON.parse(sessionStorage.getItem('spfdataArr'));
let type;//过关方式
// console.log(selectData);
if (selectData != null || selectData != undefined){
    let type = selectData[0].type;
    // console.log(type);
    let len=0;
    $.each(selectData,function(index,ele){
        if(ele.firstindex =='1' || ele.secindex =='1' || ele.thirdindex =='1'){
            len++;
        }
    });
    $('.order_word span').text(len);
    if(type == 'pass'){
        if (len < 2) {
            $('.order_detail .order').text('至少选择两场');
        } else {
            $('.order_detail .order').text('购买');
        }
    }else{
        if (len < 1) {
            $('.order_detail .order').text('至少选择一场');
        } else {
            $('.order_detail .order').text('购买');
        }
    }  
}

//筛选框 足球胜平负
$('.page-1').on('tap','.list_item_1',function(){
    if ($('.change-item').hasClass('right_ative')) {
        type = 'pass';
    } else if ($('.change-item').hasClass('left_ative')) {
        type = 'single';
    }
    if($(this).hasClass('selected')){
        $(this).removeClass('selected')
        $(this).data('status',0);
    }else{
        $(this).addClass('selected');
        $(this).data('status',1);
    }
    //对应被选中元素的父元素li
    let list = $('.list .selected').parent().parent();
    // console.log(list,'父');
    let listArr = Array.from(list);
    let listLen = listArr.length;
    if (type == 'pass'){
        if (listLen < 2) {
            $('.order_detail .order').text('至少选择两场');
        } else {
            $('.order_detail .order').text('购买');
        }
    }else if(type == 'single'){
        if (listLen < 1) {
            $('.order_detail .order').text('至少选择一场');
        } else {
            $('.order_detail .order').text('购买');
        }
    }
    
    if(listLen>=9){
        $(list[listLen-1]).find('.selected').removeClass('selected');
        mui.alert('最多不超过八场赛事',function(){
            $(list[listLen-1]).find('.selected').removeClass('selected');
            listArr.splice(listArr.length-1,1);
            listLen = listArr.length;
        });
        return;
    }
    //控制购买字体切换
    $('.order_word span').text(listLen);
});
// 点击购买前的确认操作 胜平负/让球胜平负


$('.order_detail .order').on('tap',function(){
    if ($('.change-item').hasClass('right_ative')){
        type = 'pass';
    } else if ($('.change-item').hasClass('left_ative')){
        type = 'single';
    }
    let list = $('.list .selected').parent().parent();
    // console.log(list,'父');
    let listArr = Array.from(list);
    let listLen = listArr.length;
    let spfdataArr=[];
    $.each(listArr,function(index,ele){
        let rqobj = ele.dataset;
        //存储选中的状态
        let activeList=$(ele).children('div:last-child').children();
        $.each(activeList,function(idx,val){
            if(idx === 0){
                rqobj.firstindex = val.dataset.status;
            }else if(idx === 1){
                rqobj.secindex = val.dataset.status;
            }else if(idx === 2){
                rqobj.thirdindex = val.dataset.status;
            }
        });
        spfdataArr.push(rqobj);
    });
    
    if(type == 'pass'){
        if (spfdataArr.length < 2) {
            mui.alert('请至少选择两场赛事');
            return;
        } else if (spfdataArr.length > 8) {
            mui.alert('最多不超过八场赛事');
            return;
        }
    }else{
        if (spfdataArr.length < 1) {
            mui.alert('请至少选择一场赛事');
            return;
        } else if (spfdataArr.length > 8) {
            mui.alert('最多不超过八场赛事');
            return;
        }
    }
    spfdataArr.map(ele=>{
        ele.type = type;
    });
    sessionStorage.setItem('spfdataArr',JSON.stringify(spfdataArr));
    location.href = 'buy_footballspf.html';
    // location.href='buy_footballspf.html?type='+type;
});

$('.del_icon').on('tap',function(){
    $('.list_item_1 ').removeClass('selected');
    $.each($('.list_item_1'),function(index,ele){
        $(ele).data('status','0');
    });
    sessionStorage.removeItem('spfdataArr');
    sessionStorage.removeItem('spqfSecObj');
    if(type == 'pass'){
        $('.order_detail .order').text('至少选择两场');
    } else if (type == 'single'){
        $('.order_detail .order').text('至少选择一场');
    }
    
    $('.order_word span').text(0);
});


$('.return').on('tap',function(){
    sessionStorage.removeItem('spfdataArr');
    sessionStorage.removeItem('spqfSecObj');
});

$(document).on('tap', '.close',function () {
    if($(this).hasClass('open')){
        $(this).removeClass('open'); 
    }else{
        $(this).addClass('open');
    }  
    if($(this).parent('li').siblings().find('ul').hasClass('selected_ul')){
        $(this).parent('li').siblings().find('ul').removeClass('selected_ul');
        $(this).parent('li').siblings().children('.close').removeClass('open');
    }
    $(this).siblings('ul').toggleClass('selected_ul');           
});