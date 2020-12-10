// //任意范围随机数
// function random(a,b){
//     var max = Math.max(a,b)
//     var min = Math.min(a,b)
//     var res = Math.floor(Math.random()*(max-min+1)+min)
//     return res
// }
// //封装时间格式化
// function format(t){
//     var year = t.getFullYear()
//     var month = t.getMonth()
//     var date = t.getDate()
//     var hour = t.getHours()
//     var minute = t.getMinutes()
//     var second = t.getSeconds()
//     var week = t.getDay()
//     var weekarr = ['日','一','二','三','四','五','六']
//     week = '星期'+weekarr[week]
//     var str = '上午'
//     if(hour>12) str='下午'
//     hour%=12
//     var res = year+'年'+month+'月'+date+'日'+hour+'点'+minute+'分'+second+'秒'+week
//     return res
// }
// var time = new Date()
// var res = format(time)
//  //封装两段时间差的函数
//  function timediff(t1,t2){
//     var t1ime = t1.getTime()
//     var t2ime = t2.getTime()
//     console.log(t1ime)
//     console.log(t2ime)
//     var sub = Math.round((t2ime-t1ime)/1000)
//     var day = Math.floor(sub/(60*60*24))
//     var hour = Math.floor(sub%(60*60*24)/(60*60))
//     var minute = Math.floor(sub%(60*60)/60)
//     var second = sub%60
//     var obj ={
//         day:day,
//         hour:hour,
//         minute:minute,
//         second:second,
//     }
//     return obj
// }
// var time1 = new Date()
// var time2 = new Date(2020,9,29,18)
// var str = timediff(time1,time2)
// console.log(str)


//封装的move运动函数
//ele:要运动的元素；target：将运动的属性和属性值变成对象传递；fn传递进来的一个函数
function move(ele,target,fn){
    //设置一个计数器
    let count = 0
    //循环遍历传递进来的对象
    for(let key in target){
        //每循环一次开启一个定时器，计数器加一
        count++
        //开启定时器
        let timer = setInterval(()=>{
            //设置一个当前距离
            let current
            //判断传进来的属性是不是'opacity'
            if(key==='opacity'){
                //如果是将属性值放大一百呗
                current = window.getComputedStyle(ele)[key]*100
            }else{
                //如果不是将属性值的px去掉
                current = parseInt(window.getComputedStyle(ele)[key])
            }
            //设置一个移动距离，用目标距离-当前距离/10得到移动的距离
            let distance = (target[key] - current)/10
            //判断移动的距离是正方向还是负方向，如果是正方向向上取整，如果是负方向向下取整
            distance = distance>0?Math.ceil(distance):Math.floor(distance)
            //判断是否移动到模板位置
            if(current===target[key]){
                //移动到目标位置结束定时器
                clearInterval(timer)
                //结束一个定时器，计时器-1
                count--
                //判断计时器是否为0
                if(count===0){
                    //如果为0执行带来的函数
                    fn()
                }
            }else{
                //如果没到目标判断属性是否是'opacity'
                if(key==='opacity'){
                    //如果是，赋值的时候需要将值等比缩小100倍
                    ele.style[key]=(current+distance)/100
                }else{
                    //如果不是，赋值的时候加上单位'px'
                    ele.style[key]=current+distance+'px'
                }
            }
        },20)
    }
}