<?php

if(empty($argv[1]) || empty($argv[2])){
  exit("there should be at least 2 variables as input\n");
}

// 随机一个盐值
function rand_with_length($length){
    $result = '';
    for($i=0;$i<$length;$i++){
        $result = $result . rand(0,9);
    }
    return $result;
}

// 获取输入参数
$username  = $argv[1];
$password  = $argv[2];
$authority = 'root';
$salt      = rand_with_length(99);

// 计算密码
$hash_1 = hash('sha512',$username.$password);
$hash_password = hash('sha512',$hash_1.$salt);

// 显示密码
echo $hash_1."\n";
echo $hash_password."\n";

$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '1026';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('fail ' . mysqli_error($conn)."\n");
}

echo "connect success\n";

// 数据库操作
mysqli_query($conn , "set names utf8");
$sql = "INSERT INTO login".
        "(username,password,salt,authority) ".
        "VALUES ".
        "('$username','$hash_password','$salt','$authority');";
 
 
mysqli_select_db( $conn, 'tt' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('insert fail:' . mysqli_error($conn)."\n") ;
}
echo "insert success.\n";
mysqli_close($conn);
?>