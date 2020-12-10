
    let info = null;
    const nickname = getCookie('nickname')
    const id = getCookie('goods_id')
    console.log(id)
    getGoodsinfo()
    async function getGoodsinfo(){
        const goodsInfo = await $.get('./server/goods.php',{goods_id:id},null,'json')
        bindHtml(goodsInfo.info)
        info = goodsInfo.info
    }
    function bindHtml(info){
        $('.fd-l').html(`
        <div class="middle-pic">
        <div class="show">
                <img src="${info.goods_big_logo}" alt="">
                <div class="mask"></div>
                </div>   
            <div class="enlarge" style="background-image: url(${info.goods_big_logo});"></div>
            </div>
            <div class="small-pic">
                <ul>
                    <li class="on"><img src="${info.goods_small_logo}" alt=""></li>
                </ul>
        </div>
        `)
        $('.summar-price').html(`
            <span>价   格</span>
            <h2>￥${info.goods_price}</h2>
            <b>降价通知</b>
        `)
        $('.hd').html(`
            <h2>${info.goods_name}</h2>
            <p>广泛应用于录音棚、广播电台、舞台演出及影视作品中的后期制作等专业场合</p>
            <img src="https://img.ingping.com/images/bargain/product/202012041013360667101.jpg" alt="">
        
        `)
        const enlag = new Enlarge('.middle-pic')
    //点击增加减少数量
    $('.add').on('click',function(){
        let num = $('.inp').val()-0
        $('.inp').val(num+1)
    })
    $('.one').on('click',function(){
        if($('.inp').val()<=1) return
        let num = $('.inp').val()-0
        $('.inp').val(num-1)
    })
    //点击加入购物车
    $('.now').on('click','.add-car',function(){
        if(!nickname) return window.location.href = './login.html'
        const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
        const flag = cart.some(item=>item.goods_id===id)
        if(flag){
            const cart_goods = cart.filter(item=>item.goods_id==id)[0]
            cart_goods.cart_number = cart_goods.cart_number-0+($('.inp').val()-0)
        }else{
            info.cart_number = 1
            cart.push(info)
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))



    })
}

    

//放大镜
function Enlarge(ele){
    this.ele = document.querySelector(ele)
    this.show = this.ele.querySelector('.show')
    this.mask = this.ele.querySelector('.mask')
    this.enlarge = this.ele.querySelector('.enlarge')
    this.show_width = this.show.clientWidth
    console.log(this.show_width)
    this.show_height = this.show.clientHeight
    this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
    console.log(this.enlarge_width)
    this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
    this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize)
    console.log(this.bg_width)
    this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize)
    console.log(this.bg_height)
    this.init()
}
Enlarge.prototype.init = function(){
    this.setScale()
    this.overOut()
    this.move()
}
Enlarge.prototype.setScale = function(){
    this.mask_width = this.show_width * this.enlarge_width / this.bg_width
    this.mask_height = this.show_height * this.enlarge_height / this.bg_height
    this.mask.style.width = this.mask_width +'px'
    this.mask.style.height = this.mask_height +'px'


}
Enlarge.prototype.overOut = function(){
    this.show.addEventListener('mouseenter',()=>{
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
    })
    this.show.addEventListener('mouseleave',()=>{
        this.mask.style.display = 'none'
        this.enlarge.style.display = 'none'
    })
}

Enlarge.prototype.move = function(){
    this.show.addEventListener('mousemove',e=>{
        e = e || window.event
        let x = e.offsetX - this.mask_width / 2
        let y = e.offsetY - this.mask_height / 2
        if(x<=0)x=0
        if(y<=0)y=0
        if(x>=this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if(y>=this.show_height - this.mask_height) y = this.show_height - this.mask_height
        this.mask.style.left = x + 'px'
        this.mask.style.top = y + 'px'
        const bg_x = this.enlarge_width * x /this.mask_width
        const bg_y = this.enlarge_height * y /this.mask_height
        this.enlarge.style.backgroundPosition = `-${bg_x}px -${bg_y}px`
    })
}
//商品分类列表
$('.inhear').on('mouseover',function(){
    $('.inhear>ul').removeClass('on')
})
$('.inhear').on('mouseleave',function(){
    $('.inhear>ul').addClass('on')

})

//点击数量加减
