<?php
namespace app\index\controller;
use think\Controller;//引入Controller类
class Index
{
    public function index()
    {
        $data = ['name' => 'thinkphp', 'status' => '1'];
        return json($data);
    }
    public function app(){
        return 'app';
        #return $this->fetch('../../../public/index.html');
    }
}