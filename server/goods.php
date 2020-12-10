<?php

$id = $_GET['goods_id'];
$link = mysqli_connect('localhost','root','root','bk2004');
$sql = "SELECT * FROM `goods` WHERE `goods_id`='$id'";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(array(
    'message' => '成功拿到该id所属内容',
    'code' => 1,
    'info' => $data[0]
))



?>