$(function(){
    //商品分类列表
    $('.inhear').on('mouseover',function(){
        $('.inhear>ul').removeClass('on')
    })
    $('.inhear').on('mouseleave',function(){
        $('.inhear>ul').addClass('on')

    })
    
    //渲染分类列表
    const list_info = {
        cat_one:'all',
        sort_type:'ASC',
        current:1,
        pagesize:8,
        sort_method:'价格'
    }
    let list = null
    //一级分类
    getCat_one()
    async function getCat_one(){
        const cat_one_list = await $.get('./server/list.php',null,null,'json')
        let str = '<span>分类标签</span><a class="on" data-type="all">全部</a>'
        cat_one_list.list.forEach(item=>{
            str+=`
            <a data-type="${item.cat_one_id}">${item.cat_one_id}</a>
            `
        })
        $('.one').html(str)
    }
    //渲染商品
    getGoodList()
    async function getGoodList(){
        const goodList = await $.get('./server/getGoodList.php',list_info,null,'json')
        list = goodList.list
        let str = ''
        goodList.list.forEach(item=>{
            str+=`
                <div class="goods-shop">
                    <div class="b-l">
                        <div class="b-u">
                            <div class="pic">
                            <img src="${item.goods_big_logo}" alt="">
                            </div>
                            <div class="word">
                                <h3 data-type="${item.goods_id}">${item.goods_name}</h3>
                                <div class="bq">
                                    <span>套装标签: </span>
                                    <a href="">${item.cat_one_id}</a>
                                    <a href="">${item.cat_two_id}</a>
                                    <a href="">${item.cat_three_id}</a>
                                </div>
                                <p><span>推荐理由: </span>${item.goods_name}</p>
                            </div>
                        </div>
                        <div class="b-d">
                            <img src="https://img.ingping.com/images/gg_images/202012/202012040949410410636.jpg" alt="">
                        </div>
                    </div>
                    <div class="b-r">
                        <div class="money">
                            <span>整装立省 ${item.goods_weight}元</span>
                        </div>
                        <i>套装价:<b>¥${item.goods_price}.00</b></i>
                        <span class="car" data-type="${item.goods_id}">加入购物车</span>
                    </div>
                </div>            
            `
        })
        $('.goods').html(str)
    }
    //渲染分页器
    getTotalPage()
    async function getTotalPage(){
        const totalInfo = await $.get('./server/getTotalPage.php',list_info,null,'json')
        $('.pages').pagination({
            pageCount:totalInfo.total,
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback(index){
                list_info.current = index.getCurrent()
                getGoodList()
            }
        })
    }
    //列表点击事件
    $('.one').on('click','a',function(){
        console.log(1)
        $(this).addClass('on').siblings().removeClass('on')
        const type = $(this).data('type')
        list_info.current = 1
        list_info.cat_one = type
        getTotalPage()
        getGoodList()
    })
    //排序方式点击
    $('.two').on('click','a',function(){
        $(this).addClass('on').siblings().removeClass('on')
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
        list_info.sort_method = method
        list_info.sort_type = type
        getTotalPage()
        getGoodList()
        $(this).attr('data-type',type==='ASC'?'DESC':'ASC')
    })
    //点击跳转详情页
    $('.goods').on('click','h3',function(){
        
        const id = $(this).data('type')
        console.log(id)
        setCookie('goods_id',id)
        window.location.href = './goods.html'
    })
    //添加购物车
    $('.goods').on('click','.car',function(){
        // console.log(1)
        const nickname = getCookie('nickname')
        if(!nickname) return window.location.href='./login.html'
        const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
        const id = $(this).attr('data-type')
        const flag = cart.some(item=>item.goods_id===id)
        if(flag){
            const cart_goods = cart.filter(item=>item.goods_id==id)[0]
            cart_goods.cart_number = cart_goods.cart_number-0+1
        }else{
            const info = list.filter(item=>item.goods_id==id)[0]
            info.cart_number = 1
            cart.push(info)
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
})