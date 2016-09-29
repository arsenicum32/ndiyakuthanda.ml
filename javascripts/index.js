$(document).ready(init);

var pr = {
  cp: 1,
  deg: 0,
  prx: '',
  pl: function(p){
    if(p){
      var dg  = 1 + Math.sin( -p * 3.14 /5000 );
      var rk  = 1 + Math.sin( p * 3.14 /5000 );
      var fl  = Math.sin( p /10000 ) + 0.2;
      $('.planet').css('top', window.innerHeight -  window.innerWidth * .4 * dg);
      $('.rocket').css('top', (window.innerHeight -  window.innerWidth *
        (window.innerHeight < window.innerWidth ?.2:.6 )
        * rk));
      $('.rocket').css('left', window.innerWidth * fl );

      var n = p>2000 && p<3000 ? 0 : p<500 & p>4500? 256: ~~(256 * Math.abs(Math.cos( 3.1456 * p /5000 )) );

      var col1 = '#' + (n).toString(16) + (n).toString(16) + (n * 1.2).toString(16);
      var col2 = '#' + (n).toString(16) + (n).toString(16) + (n).toString(16);

      $('body').css( 'background-image', pr.prx + 'linear-gradient(top , '
      + col1 + ', ' + col2 + ')');

      $('.rocket').css('-webkit-transform','rotate('+p*180/5000+'deg)');
      $('.rocket').css('transform', 'rotate('+p*180/5000+'deg)');

      //pr.cp =dg;
    }else{
      $('.planet').css('top', window.innerHeight -  window.innerWidth * .4);
      $('.rocket').css('top', window.innerHeight -  window.innerWidth * (window.innerHeight < window.innerWidth ?.37:.4 ));
      $('.rocket').css('left', window.innerWidth * 0.2 );
      $('body').css( 'background-image', pr.prx + 'linear-gradient(top , #fff, #eee )');
    }
  }
};

$(window).on('load resize', function(){
  pr.prx = getCssValuePrefix();
  $('.planet').css('width', window.innerWidth * .8);
  $('.planet').css('height', window.innerWidth * .8);

  var scroll = window.location.href.split('#');
  if(scroll[1]){
    scroll=scroll[1].split('=');
    if( scroll[1] && scroll[0] == 'scroll' ){
      //alert(1)
      onWheel({burn:scroll[1]})
    }else{
      //alert(2)
      onWheel({burn:pr.deg})
    }
   }else{
     //alert(pr.deg)
     onWheel({burn:pr.deg});
   }

   $('select').on('change', function(){
     var sm = $('#sum').val();
     if($(this).attr('id') == 'time'){
       var t = this.value;
       var v = $('#currency').val();
       getPr(sm,v,t);
     }else{
       var v = this.value;
       var t = $('#time').val();
       getPr(sm,v,t);
     }
   })

   $('input').on('input', function(){
     var sm = this.value;
     var v = $('#currency').val();
     var t = $('#time').val();
     getPr(sm,v,t);
   })

   function getPr(sm,v,t){
     var time = ['3 месяца','6 месяцев','12 месяцев'];
     var currency = ['рублей','долларов','евро'];

     var crt = time.indexOf(t.trim());
     var curc = currency.indexOf(v.trim());
     var pr = $( ".table .row:nth-child("+(crt+2)+")" ).text().split('%')[curc];
     for(var i in ['мес','год']){
       pr.indexOf(['мес','год'][i]) != -1 ? pr = pr.split(['мес','год'][i])[1] : void(0);
     }
     $('#eq').text( (parseInt(sm) + parseInt(sm) * (pr / 100)) + ' ' + currency[curc] )
   }
});

function init(){
  var elem = document.body;
  if (elem.addEventListener) {
    if ('onwheel' in document) {
      elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      elem.addEventListener("mousewheel", onWheel);
    } else {
      elem.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else {
    elem.attachEvent("onmousewheel", onWheel);
  }
}

function onWheel(e) {

  var info = document.getElementById('delta');
  info.style.display = 'none';

  e = e || window.event;
  if(e.burn != undefined ){
    info.innerHTML = e.burn == 'NaN' ? 0 : e.burn.toString();
  }else{
    var delta = e.deltaY || e.detail || e.wheelDelta;
    info.innerHTML = +info.innerHTML + delta;
  }

  var deg = info.innerHTML < 0? info.innerHTML=0 :
          info.innerHTML > 5000 ?
      info.innerHTML=5000 : info.innerHTML;

  window.history.pushState({deg: deg}, "Title", "#scroll="+deg);

  var rot = ~~(deg/3);
  pr.deg = deg;
  playel(deg);

  pr.pl( deg  );

  $('.planet').css('-webkit-transform','rotate('+rot+'deg)');
  $('.planet').css('transform', 'rotate('+rot+'deg)');
  !e.burn ?
  e.preventDefault ? e.preventDefault() : (e.returnValue = false):
  void(0);

}

function playel(d){
  $('.one').css('left', window.innerWidth/3 )
  $('.one').css('top', window.innerHeight/4 - d/4)

  $('.two p').css('left', window.innerWidth*.1 + 50)
  $('.two p').css('top', window.innerHeight*.09)
  d > 2000 && d < 3000 ? $('.two p').show() : $('.two p').hide() ;
  if(d > 2500  ){
    $('.two p span').removeClass('to');
    $('.two p span').addClass('from');
  } else{
    $('.two p span').addClass('to');
    $('.two p span').removeClass('from');
  }

  if(d>2300 && d<2600){
    var scr = d - 2300;
    $('.pnl').css('top', (window.innerHeight + 30)  - Math.sin(scr/100) * window.innerHeight *.5  );
    console.log( window.innerHeight  - scr );
  }else{
    $('.pnl').css('top', window.innerHeight + 30 );
  }

  if(d>1800 && d<2500){
    var k = d - 1800; // max k = 700
    $('.table').show();
    $('.table').css('opacity', (k<100 ? k/100 : k>500? 1/(k-500)*100 : 1) );
    if(k<300){
      $('.table').css('width', 380 + 1200 - k*4 )
      $('.table').css('height', 250 + 900 - k*3 )
    }
  }else{
    $('.table').hide();
  }

  if(d>2500 && d<3000){
    $('.trust').show();
    var k = d - 2500; // max k = 500
    $('.trust li').each(function(i){
      console.log(i);
      $(this).css('left' , (k*2 - 500 + (i + 1)*100) < 0 ? (k*2 - 500 + (i+1) * 100 ) : 0 )
      $(this).css('top' , k < 400 ? 0 : k - 400 + (i+1) * 100 );
    })
  }else{
    $('.trust').hide();
  }

  if(d>3000){
    var k  = d - 3000; //max k = 2000
    $('.three').show();


    $('.calltoaction').css('left', 2000 - k*2 )

    k>1500 ? $('.f').hide() : $('.f').show();

    k< 1500 ? $('.footer').hide() : go(k);

    function go(k){
      $('.footer').show();
      $('.footer').css('opacity', (k - 1500)/500 )
    }
  }else{
    $('.three').hide();
  }
}

function getCssValuePrefix(){
    var rtrnVal = '';var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];var dom = document.createElement('div');for (var i = 0; i < prefixes.length; i++){dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';if (dom.style.background){rtrnVal = prefixes[i];}}dom = null;delete dom;return rtrnVal;
}
