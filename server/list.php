<?php

$link = mysqli_connect('localhost','root','root','bk2004');
$sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id` LIMIT 0 , 13";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(array(
    'message'=>'获取一级列表成功',
    'list'=>$data,
    'code'=>1,
    'sql'=>$sql
))

?>