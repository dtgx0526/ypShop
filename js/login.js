$(function(){
    $('#in').validate({
        submitHandler(form){
            const info = $(form).serialize()
            $.post('./server/login.php',info,null,'json').then(res=>{
                console.log(typeof res.code)
                if(res.code === 0){
                    $('.hid').removeClass()
                }else if(res.code === 1){
                    setCookie('nickname',res.nickname)
                    window.location.href = "./index.html"
                }
            })
        }
    })
})