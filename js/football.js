if($('.mask').css('display') =='block'){
    $('body').css('overflow','hidden');
}
// 过关  单关 tab切换
$(".change_box li").on('tap', tabChangebg);

//赛场列表切换
$(".item .close").on('tap', function () {
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
    
/*漏斗弹出层开始*/    
$(".right_icon .select-icon").on('tap', function(){
    $('.mask').show();
    $('.screening').show();
    $('body').css('overflow','hidden');
});   
$(".mask").on('tap', maskHide);
$(".cancle").on('tap', maskHide);
$(".confirm").on('tap', maskHide);
//选择框
$('.game_team span').on('tap',function(){
    $(this).toggleClass('selected_team');  
});

//全选反选    
$('.left_all .select_all').on('click',function(){
    const span = $(this).parent().parent().parent().siblings().find('span');
    const len = span.length;
    const selectedTeam = $(this).parent().parent().parent().siblings().find('.selected_team'); 
    if(selectedTeam.length === len){
        span.removeClass('selected_team');
        this.checked = !this.checked;
    }else{
        span.addClass('selected_team');
    }
});

//仅五大联赛 
$('.left_five .select_five').on('click',function(){
    $(this).parent().parent().parent().siblings().find('span').removeClass('selected_team');
});
$('#game').on('tap',function(){
    if($('.left_five .select_five')[0].checked){
        const len = $(this).find('.selected_team').length;
        if(len > 5){
            alert('赛事选择不能超过5场!');
            $($(this).find('.selected_team')[len-1]).removeClass('selected_team');
        }
        if(len <=0){
            alert('请至少选择一场赛事');
        }
    }          
})
/*漏斗弹出层结束*/




/* M串N，自由过关 结束 */  

/*子页面的操作结束*/

function maskHide(){
    $('.mask').hide();
    $('.content').hide();
    $('body').css('overflow','');
}

//点击index.html竞技彩的胜平负等的页面跳转
const str = location.search;
if(str !=''){
    changeTabPages(str);
    let wcx = document.body.clientWidth;
    // let ele = $('.tab-item.active')[0]
    // let liDis = ele.offsetLeft;
    // let liWdith = ele.clientWidth;
    //  if(liDis > wcx){
    //     let newDis = liDis - wcx +liWdith;
    //     let target =wcx- newDis;
    // }
}

//点击index.html竞技彩的胜平负等的页面跳转

