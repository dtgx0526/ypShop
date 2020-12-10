<?php
$username = $_POST['username'];
$password = $_POST['password'];
//连接数据库
$link = mysqli_connect('localhost','root','root','bk2004');
$sql = " SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);
if(count($data)){
    echo json_encode(array(
        'message'=>"成功拿到数据",
        'code'=>1,
        'data'=>$data,
        'nickname'=>$data[0]['nickname']
    ));
}else{
    echo json_encode(array(
        'message'=>'用户密码错误',
        'code'=>0
    ));
}
?>