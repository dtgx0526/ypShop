$(function(){
    const nickname = getCookie('nickname')
    if(nickname){
        $('.no-login').addClass('on')
        $('.enter-login').removeClass('on')
        $('.nickname').html(nickname)
    } else if(!nickname){
        $('.no-login').removeClass('on')
        $('.enter-login').addClass('on')
    }
    //退出的登陆
    $('.out').on('click','a',function(){
        removeCookie('nickname')
        window.location.reload()
    })
    //搜索引擎
    $('.serch_').on('input',function(){
        const val = this.value.trim()
        if(!val) return
        const script = document.createElement('script')
        const url = `https://www.ingping.com/search/solrCheck?format=json&callback=bindHtml&term=${val}&_=1607344818668`
        script.src = url
        document.body.appendChild(script)
        script.remove()
    })

    //公告切换
    $('.change').on('mouseover','li',function(){
        $(this).addClass('on').siblings().removeClass('on')
        $('.ft>ul').eq($(this).index()).addClass('on').siblings().removeClass('on')
    })
    //导航条
    $(window).on('scroll',function(){
        const widowScoll = document.documentElement.scrollTop
        const widow_height = document.documentElement.clientHeight
        if(widowScoll>=$('.bigbox>.guess').offset().top){
            $('.navs').slideDown()
        }else if(widowScoll<$('.bigbox>.guess').offset().top){
            $('.navs').slideUp()
        }
        const lis = $('.bigbox>ul>li')
        // console.log(lis)
        for(let i = 0;i<lis.length;i++){
            const li_top = $(lis[i]).offset().top
            const li_height = $(lis[i]).outerHeight()
            // console.log(li_top)
            if(li_top + li_height<=widowScoll + widow_height){
                $('.navs>dl>dd').removeClass('on').eq(i).addClass('on')
                // console.log(.eq(i))
            }
        }
        



    })
    //回到顶部
    $('.navs').on('click','dl>p',function(){
        if($(this).index()===8){
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    })
    //导航条点击
    $('.navs').on('click','dl>dd',function(){
        $('html').animate({ scrollTop: $('.bigbox>ul > li').eq($(this).index()-0-1).offset().top })
        $(this).addClass('on').siblings().removeClass('on')
        
    })

})
function bindHtml(res){
    if(res.length===0){
       $('.input>ol').removeClass('active') 
        return
    }
    if($('.serch_').val().length<2){
        $('.input>ol').removeClass('active') 
        return
    }
    let str = ''
    for(let i = 0;i<res.length;i++){
        str+=`
            <li>${res[i]}</li>
        `
    }
    $('.input>ol').html(str)
    $('.input>ol').addClass('active')
}


//轮播图
class Lb{
    constructor(ele){
        this.ele = document.querySelector(ele);
        this.imgBox = this.ele.querySelector('.imgBox')
        this.pointBox = this.ele.querySelector('.pointBox')
        this.index = 0
        this.timer = null
        this.flag = true
        this.init()
    }
    init(){
        this.setPoint()
        this.autoPlay()
        this.overOut()
        this.pointEvent()
        this.changePage()
    }
    //设置焦点
    setPoint(){
        const pointNum = this.imgBox.children.length
        const frg = document.createDocumentFragment()
        for(let i = 0;i<pointNum;i++){
            const li = document.createElement('li')
            if(i===0) li.className = 'on'
            li.setAttribute('i',i)
            frg.appendChild(li)
        }
        this.pointBox.appendChild(frg)
        this.pointBox.style.width = pointNum * 40 * 1.5 + 'px'
    }
    //切换
    changeOne(type){
        this.imgBox.children[this.index].classList.remove('on')
        this.pointBox.children[this.index].classList.remove('on')
        if(type===true){
            this.index++
        }else if(type===false){
            this.index--
        }else{
            this.index = type
        }
        if(this.index>=this.imgBox.children.length) this.index = 0
        if(this.index<0)this.index = this.imgBox.children.length -1
        this.imgBox.children[this.index].classList.add('on')
        this.pointBox.children[this.index].classList.add('on')
    }

    //自动轮播
    autoPlay(){
        this.timer = setInterval(()=>{
            this.changeOne(true)
        },2000)
    }

    //移入移出
    overOut(){
        this.ele.addEventListener('mouseover',()=>clearInterval(this.timer))
        this.ele.addEventListener('mouseout',()=>this.autoPlay())
    }

    //焦点切换
    pointEvent(){
        this.pointBox.addEventListener('mouseover',e=>{
            e = e || window.event
            const target = e.target || e.srcElement
            if(target.nodeName==='LI'){
                console.log(1)
                const i = target.getAttribute('i')-0
                this.changeOne(i)
            }
        })
    }

    //切换页面
    changePage(){
        document.addEventListener('visibilitychange',()=>{
            const state = document.visibilityState
            if(state === 'hidden') clearInterval(this.timer)
            if(state === 'visible') this.autoPlay()
        })
    }
}