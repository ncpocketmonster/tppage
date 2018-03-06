<?php
namespace app\index\controller;
use think\Controller;//引入Controller类
class App extends Controller
{
    public function index()
    {
        #return 'app';
        return $this->fetch('index.html');
    }
}