
const dates = new Date();
let year = dates.getFullYear();
let month = dates.getMonth() + 1<10?'0'+(dates.getMonth() + 1):dates.getMonth()+ 1;
// 计算年月日
function getDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();

      return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);

  }
// 计算年月
function getDateStrTwo(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth();//获取当前月份的日期
      return y.toString()+(m<10?'0'+m:m);
      
}
  // 计算到时分秒
  function getDateStrThree(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
    // var hour = dd.getHours();
    // var minute = dd.getMinutes();
    // var second = dd.getSeconds();
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+'00'+':'+ '00'+':'+'00';
  
    }
// 计算第几周

function getYearWeek (a, b, c) {//a为年 b为月 c为日
      var date1 = new Date(a, parseInt(b) - 1, c),
          date2 = new Date(a, 0, 1),
          d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
      return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
};

// 计算年月日
let comYear = getDateStr(0)
// 计算年月日+1
let comLastDay = getDateStr(1)
// 计算前一天
let combeforeDay = getDateStr(-1)
// 计算年月日时分秒
let comHour = getDateStrThree(0)
// 计算年月
let comMonth = year.toString() + month.toString();

// 沙盘运用
// 日期
let comyearMonth = getDateStrTwo(0)
// 计算周期
let yearArrs = comYear.split('-')
// 前七天的周期
let lastWeeks = getDateStr(-7)
// console.log('comWeeks',comYear)
let comyearWeek = getYearWeek(yearArrs[0], yearArrs[1], yearArrs[2])
let comWeeks = year.toString() + (comyearWeek-1)
console.log(comyearWeek-1)
export  {comYear,comMonth,comLastDay,combeforeDay,comyearMonth,comWeeks,lastWeeks,comHour }