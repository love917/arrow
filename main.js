//생성자함수 
function spline(el){
    this.el = el; //this에다가 el속성을 넣음
    this.cursor = {x:0,y:0};
    this.elPos();//💎요소의 위치를 초기화
}

//💎요소들의 초기 위치값 잡기
spline.prototype.elPos = function(){
    this.x = this.el.getBoundingClientRect().left;
    this.y = this.el.getBoundingClientRect().top;
    //getBoundingClientRect : 사각형 각각의 왼쪽값을 가져옴
}

spline.prototype.setCursorPos = function(x,y){
    this.cursor.x = x;
    this.cursor.y = y;
    return this;//값을 던져줌
    console.log(this)
}

spline.prototype.align = function(){
    let k1 = this.cursor.y - this.y; //커서의 위치값 - 사각형 왼쪽 거리값
    let k2 = this.cursor.x - this.x; 

    //각도구하기
    let rad = Math.atan(//아크탄젠트 --> 탄젠트의 역수 --> 각도를 구한다.
        Math.abs(k2)/Math.abs(k1) //abs --> 절댓값
    )
    //라디언 값을 각도(degree)바꾸기
    let deg = rad*(180/Math.PI)
    //end 각도구하기
    //커서 (50,30) 어떤 사각형(100,70)
    //k2 = 50 - 100 => |-50| ==> 50
    //k1 = 30 - 70 => |-40| ==> 40
    //k2/k1     50/40 ==> 연수(40/50) =0.8(라디언)
    //각도 0.8*(180/Math.PI) = 45.8...

    if ( k1 > 0 && k2 > 0 )
        deg = 360 - deg;
      else if ( k1 <= 0 && k2 > 0 )
        deg = 180 + deg;
      else if ( k1 <= 0 && k2 <= 0 )
        deg = 180 - deg;//134deg

      this.el.style.transform = `rotate(${deg}deg)`


    //📌아크탄젠트,라디언 계산법 검색해보기
    //*역수 : 어떤 값에 x를 곱했을 때 결과값이 1이 되게 하는것.
    //윗/밑변 X 밑/윗변 = 1
    //*rad : 라디언 값이다. ex) 1도를 라디언 값으로는 57deg
}
function alignAll(x,y){
    for(let i in sp){
        //for in 반복문 참고하기
        sp[i].setCursorPos(x,y).align();
    }
}
window.addEventListener("mousemove",(ev)=>{
    alignAll(ev.clientX, ev.clientY)
})



let s = 0;
window.addEventListener("resize",()=>{
    clearTimeout(s)
    //s=setTimeout(()=>{},시간) --> 시간 지나면 할일
    s=setTimeout(()=>{
        for(let i in sp){
            sp[i].elPos();
        }
    },200)
})







let sp = [];
for(let i = 0; i<180; i++){
    let div = document.createElement("div");
    div.className = "i"+ i; //클래스명 입력
    document.querySelector('.w').appendChild(div)
    sp.push(new spline(div))
}
//console.log(sp)//constructor :부모가 아니라 원형을 가리키고 있다.