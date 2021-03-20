//전역변수 설정
var $slider1 = $("#slider1");
var $slider2 = $("#slider2");
var $prev = $(".prev");
var $next = $(".next");
var $start = $(".start");
var $stop = $(".stop");
var speed = 500;
var interval = 2000;
var enableClick = true;
var timer;

//로딩완료시 slider1, slider2 넓이와 위치값 초기화하고
//자동롤링시작
init($slider1);
init($slider2);
start();

//stop버튼 클릭시 롤링정시
$stop.on("click", function(e){
    e.preventDefault();
    stop();
});

//start버튼 클릭시 다시 롤링시작
$start.on("click", function(e){
    e.preventDefault();
    start();    
});

//다음, 이전 버튼 클릭시 롤링정지하고 좌우 이동
$next.on("click", function(e){
    e.preventDefault();

    if(enableClick){
        stop();
        next($slider1);
        next($slider2);        
        enableClick = false;
    }
})
$prev.on("click", function(e){
    e.preventDefault();

    if(enableClick){
        stop();
        prev($slider1);
        prev($slider2);
        enableClick = false;
    }
})

//패널이 넓이값과 리스트의 위치값을 초기화
function init(el){
    var len = el.children("ul").find("li").length;
    el.children("ul").css({
        width: 100 * len + '%',
        marginLeft : '-100%'
    });
    el.children("ul").find("li").css({
        width: 100 / len + '%'
    });
    el.children("ul").find("li").last().prependTo(el.children("ul"));
}

//다음 이동 함수
function next(el){
    console.log("next");
    el.children("ul").animate({ marginLeft : '-200%'},speed, function(){
        $(this).find("li").first().appendTo(el.children("ul"));
        $(this).css({ marginLeft : '-100%'});
        enableClick = true;
    });
}

//이전 이동 함수
function prev(el){
    el.children("ul").animate({ marginLeft : '0%'},speed, function(){
        $(this).find("li").last().prependTo(el.children("ul"));
        $(this).css({ marginLeft : ' -100%'});
        enableClick = true;
    })
}

//자동 롤링 시작 함수
function start(){
    $start.addClass("on");
    $stop.removeClass("on");

    timer = setInterval(function(){
        next($slider1);
        next($slider2);
    }, interval);
}


//자동 롤링 정지 함수
function stop(){
    $stop.addClass("on");
    $start.removeClass("on");
    clearInterval(timer);
}

