<?php
#$myfile = fopen("./../secret/password.json", "r");
$myfile_content = file_get_contents("./../secret/password.json");
$secret = json_decode($myfile_content);

$password = $secret->blog.'123!@!#asdf@:"><>';
$hashed = hash('sha512',$password);

$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = $secret->local->mysql;          // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
$database_in_use = 'tt';

if(! $conn )
{
  die('连接失败: ' . mysqli_error($conn));
}
echo '连接成功<br />';
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

 
$sql = "INSERT INTO user_password".
        "(password) ".
        "VALUES ".
        "('$hashed')";
 
 
 
mysqli_select_db( $conn, $database_in_use);
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法插入数据: ' . mysqli_error($conn));
}
echo "数据插入成功\n";
mysqli_close($conn);
?>