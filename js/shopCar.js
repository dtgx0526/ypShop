$(function(){
    const nickname = getCookie('nickname')
    if(!nickname) return window.location.href('./login.html')
    const cart = JSON.parse(window.localStorage.getItem('cart'))||[]
    
    if(!cart.length){
        $('.message').addClass('active')
        $('.off').removeClass('active')
        return
    }
    $('.message').removeClass('active')
    $('.off').addClass('active')
    bindHtml()
    function bindHtml(){
        const selectAll = cart.every(item=>item.is_select=='1')
        
        let total = 0
        let totalMoney = 0
        cart.forEach(item=>{
            if(item.is_select==='1'){
                total+=item.cart_number-0
                totalMoney = total*item.goods_price
                
            }
        })
        console.log(total)
        let str = `
        <div class="all">
            <h3>全部商品${total}</h3>
        </div>
        <div class="check">
                <div class="col1">
                    <input type="checkbox" ${selectAll?'checked':''}>
                    <span>全选</span>
                </div>
                <div class="col2">
                    <p>商品信息</p>
                </div>
                <div class="col3">
                    <p>单价(元)</p>
                </div>
                <div class="col4">
                    <p>数量</p>
                </div>
                <div class="col5">
                    <p>金额(元)</p>
                </div>
                <div class="col6">
                    <p>操作</p>
                </div> 
        </div>
        `
        cart.forEach(item=>{
            str+=`
            <div class="shops">
            <div class="cnl">
                <div class="bigs">
                    <div class="inpu">
                        <input type="checkbox" data-id="${item.goods_id}" ${item.is_select==='0'?'':'checked'}>
                    </div>
                    <div class="cul">
                        <img src="${item.goods_small_logo}" alt="">
                    </div>
                    <div class="cul2">
                        <p>${item.goods_name}<p>
                    </div>
                </div>
                <div class="cul3">
                    <span>¥${item.goods_price}</span>
                </div>
                <div class="cul4">
                    <div class="nume">
                        <button class="sup_num" data-id="${item.goods_id}">-</button>
                        <input type="text" value="${item.cart_number}">
                        <button class="add_num" data-id="${item.goods_id}">+</button>
                    </div>
                </div>
                <div class="cul5">
                    <span>¥ ${(item.goods_price*item.cart_number).toFixed(2)}</span>
                </div>
                <div class="cul6">
                    <span class="delete" data-id="${item.goods_id}">删除</span>
                </div>
            </div>
            </div>
            
            
            `
        })
        
        str+=`<div class="bootom"><h2>总计金额：<i>${totalMoney.toFixed(2)}</i></h2><span class="again">再去逛逛</span><span>去结算</span></div>`
        $('.message').html(str)
    }
    // 添加点击事件
    $('.message').on('click','.inpu>input',function(){
        const type = this.checked
        const id = $(this).data('id')
        console.log(id)
        const info = cart.filter(item=>item.goods_id==id)[0]
        info.is_select = type ?'1':'0'
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    $('.message').on('click','.add_num',function(){
        const id = $(this).data('id')
        const info = cart.filter(item=>item.goods_id==id)[0]
        info.cart_number = info.cart_number-0+1
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    $('.message').on('click','.sup_num',function(){
        const id = $(this).data('id')
        console.log(id)
        const info = cart.filter(item=>item.goods_id==id)[0]
        if(info.cart_number===1)return
        info.cart_number = info.cart_number-1
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    $('.message').on('click','.delete',function(){
        const id = $(this).data('id')
        for(let i = 0;i<cart.length;i++){
            if(cart[i].goods_id==id){
                cart.splice(i,1)
                break
            }
        }
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
        if(!cart.length) window.location.reload()
    })
    $('.message').on('click','.col1>input',function(){
        if(this.checked){
            cart.forEach(item=>item.is_select='1')
            bindHtml()
        }else{
            cart.forEach(item=>item.is_select='0')
            bindHtml()
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    $('.message').on('click','.again',function(){
        window.location.href='./list.html'
    })












})