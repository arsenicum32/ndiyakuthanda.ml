var fs = require('fs');

var data = JSON.parse(fs.readFileSync('./mes.json', 'utf-8'));

var oneid = [343536964, 210149434], twoid = [360539625],

max_r_t_a = 0, max_r_t_m = 0, middle_a = 0, middle_r =0, arr_a = [], arr_m = [], count_a = 0, count_m = 0;

var tail = 1;

for (var i=0;i<data.length-1;i++){
  var mes = data[i], mes2 = data[i + 1];

  if ( mes.from_id != mes2.from_id ){
    if(tail){
      var currenttimeres  = mes.date - mes2.date;
      count_a++; max_r_t_a = Math.max( currenttimeres, max_r_t_a);
      arr_a.push(currenttimeres);
    }else{
      var currenttimeres  = mes.date - mes2.date;
      count_m++; max_r_t_m = Math.max( currenttimeres, max_r_t_m);
      arr_m.push(currenttimeres);
    }
    tail = 1 - tail ;
  } else {

  }
}

function middle_time(arr){
  var sym = 0;
  for(var i in arr){ sym += arr[i] }
  return Math.floor(sym/arr.length);
}

console.log(JSON.stringify({
  "ars": {
    arr: arr_a,
    maxtime: max_r_t_a,
    middle: middle_time(arr_a)
  },
  "masha":{
    arr: arr_m,
    maxtime: max_r_t_m,
    middle: middle_time(arr_m)
  }
},null,'\t'));
