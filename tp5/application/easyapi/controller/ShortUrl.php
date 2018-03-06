<?php
namespace app\easyapi\controller;


class ShortUrl
{
    public function index()
    {
        $x = new \app\easyapi\model\Url;
        $x->fuck = 'later';
        $x->save();
        echo $x;
        return $x;
    }
}
