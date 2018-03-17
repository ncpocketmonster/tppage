<?php
namespace app\login\controller;
use \think\Db;
use think\Controller;

class Index extends Controller
{
    public function index(){
        return json(['error'=>'no data'])->code(403);
    }
    public function save()
    {
        $bodyStr = file_get_contents('php://input');
        $bodyObj = json_decode($bodyStr);
        //echo $bodyStr;
        $flag = isset($bodyObj->username) && isset($bodyObj->password);
        if(!$flag){
            // http code 400 means server cannot understand input data
            return json(['error'=>'not enough variables'])->code(400);
        }
        else {
            $username = $bodyObj->username;
            $password = $bodyObj->password;
            if($this->verify($username,$password)){
                return json(['success'=>'authority pass'])->code(200);
            }
            // http code 401 authority refused
            return json(['error'=>'authority refused'])->code(401);
        }
    }
    public function verify($username,$password){
        $user = Db::table('login')->where('username',$username)->find();

        if( !$user ){
            return false;
        }
        else{
            $salt = $user['salt'];
            if( $user['password'] === $this->hashPassword($password,$salt)){
                // $newsalt = $this->rand_with_length(99);
                // Db::table('login')->where('username',$username)->update(['salt'=>$newsalt]);
                return true;
            }
            else{
                return false;
            }
        }
    }
    public function hashPassword($password,$salt=''){
      return hash('sha512',$password.$salt);
    }
    public function rand_with_length($length){
        $result = '';
        for($i=0;$i<$length;$i++){
            $result = $result . rand(0,9);
        }
        return $result;
    }
    
}  
  