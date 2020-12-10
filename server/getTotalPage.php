<?php
$cat_one = $_GET['cat_one'];
$pagesize = $_GET['pagesize'];


$sql = " SELECT * FROM `goods`";
if($cat_one != 'all') $sql .= " WHERE `cat_one_id`='$cat_one'";
$link = mysqli_connect('localhost','root','root','bk2004');
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
$total = ceil(count($data)/$pagesize);
echo json_encode(array(
    'message'=>'返回分页总数成功',
    'code'=>1,
    'total'=>$total
))


?>