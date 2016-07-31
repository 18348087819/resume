/**
 * Created by Administrator on 2016/7/23.
 */
window.onload=function(){
        //音乐控制
    function music(){
        var data=[
            {
                "src":"audio/1.mp3","img":"audio/1.jpg"
            },
            {
                "src":"audio/2.mp3","img":"audio/2.jpg"
            },
            {
                "src":"audio/3.mp3","img":"audio/3.jpg"
            }
        ]
//当前播放位置
        var musicNum=0;
        var flag=1;
//初始化函数
        function init(){
            audio.volume=0.5;
            audio.src=data[0].src;
            $("#voice").val(0.5);
            $("#music img").attr("src",data[musicNum].img);
            //audio.play();
        }
        init();
//播放控制
        function play() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
        //点击控制播放
        $("#music").on("click",function(){
            play();
            if(flag>0){
                $(".mover p").css({
                    animation:"none",
                })
                flag--;
            }else{
                $(".mover p").css({
                    animation:"scale 0.5s ease-in infinite  0s alternate",
                })
                mover();
                flag++;
            }
        })
        function add(){
            musicNum++;
            if(musicNum==data.length){
                musicNum=0;
            }
            $("#music img").attr("src",data[musicNum].img);
            audio.src=data[musicNum].src;
            audio.play();
        }
        $(audio).on("timeupdate",function(){
            //this.duration
            if(audio.ended){
                add();
            }
        })
        //音条控制
        function mover(){
            for(var i=0;i<4;i++){
                $(".mover p").eq(i).css({
                    animationDelay:0.2*i+"s"
                })
            }
        }
            mover();
    }
    music();
    //slide3图片滚动
    function slide3(){
        var i=0;
        //右滑
        var flag=1;
        function scrollL(a,b){
            if(flag!=1){
                i++;
                flag=1;
            }
            if(i<b-1){
                $(".pic-container").eq(0).css({
                    left:-a*(i+1)+"vw"
                })
            }else{
                $(".pic-container").eq(0).css({
                    left:"0vw"
                })
                i=-1;
            }
            i++;
        }
        //左滑
        function scrollR(a,b){
            if(flag!=-1){
                i--;
                flag=-1;
            }
           if(i>-1){
               $(".pic-container").eq(0).css({
                   left:(-a*i)+"vw"
               })
           }else{
               $(".pic-container").eq(0).css({
                   left:-a*(b-1)+"vw"
               })
               i=b-1;
           }
            i--;
        }
        $(".flag-left").eq(0).click(function(){
            console.log(typeof document.body.clientWidth);
            console.log(i);
            //大屏
            if(document.body.clientWidth>=780){
                scrollR(28.3,3);
            }
            if(document.body.clientWidth<780&&document.body.clientWidth>=476){
                scrollR(38.5,4);
            }if(document.body.clientWidth<476){
                scrollR(78.3,5);
            }
        })
        //右
        $(".flag-right").eq(0).click(function(){
            console.log(typeof document.body.clientWidth);
            console.log(i);
            //大屏
            if(document.body.clientWidth>=780){
                scrollL(28.3,3);
            }
            if(document.body.clientWidth<780&&document.body.clientWidth>=476){
                scrollL(38.5,4);
            }
            if(document.body.clientWidth<476){
                scrollL(78.3,5);
            }
        })

    }
    slide3();
}
