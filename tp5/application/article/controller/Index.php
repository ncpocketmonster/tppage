<?php
namespace app\article\controller;

use think\Controller;
use think\Request;
use \app\article\model\Article;
use \app\login\controller as Login;
use \think\Db;

class Index extends Controller
{
    public function index()
    {
        $list=Article::all();
        foreach($list as $k => $v){
            $str = 'content';
            $content = $list[$k]->$str;
            $list[$k]->$str = mb_substr($content,0,100,'utf-8');
        }
        #$data = Db::query("select aid from think_article");
        return json($list);
    }
    public function read($id){
        $data = Article::get($id);
        return json($data);
    }
    public function save(){
        if(!$this->authority()){
            return json(['error'=>'authority refused'])->code(401);
        }

        $res = $this->filter_json();
        // return false if there is not enough values
        if( $res === false ){
            return json(['error'=>'input wrong'])->code(500);
        }

        $article = new Article;
        // add default value
        $article->author  = 'ncpm';
        $article->keyword = 'null';

        // save data to database
        $article->save($res);
        $article->save();
        // return main key(aid)
        return json($article)->code(200);
    }
    public function update($id){
        if(!$this->authority()){
            return json(['error'=>'authority refused'])->code(401);
        }

        $res = $this->filter_json();
        // return false if there is not enough values
        if( $res === false ){
            return json(['error'=>'input wrong'])->code(500);
        }

        $article = Article::get($id);
        // add default value
        $article->author  = 'ncpm';
        $article->keyword = 'ncpm';
        $article->save($res);
        return json(['aid'=>$article->aid]);
    }
    public function delete($id){
        if(!$this->authority()){
            return json(['error'=>'authority refused'])->code(401);
        }

        $article = Article::get($id);
        $article->delete();
        return json(['aid'=>$id]);
    }
    public function authority(){
        $str = file_get_contents('php://input');
        $obj = json_decode($str);
        $username = $obj->username;
        $password = $obj->password;
        $lgi = new Login\Index;
        return $lgi->verify($username,$password);
    }
    public function filter_json(){
        // necessary keys
        $keyNames = [ 'title', 'content','article_type'] ;
        $str      = file_get_contents( 'php://input' )   ;
        $obj      = json_decode( $str )  ;
        $result   = [];

        // if no enough values ; return false
        foreach($keyNames as $k => $v){
            if(!isset($obj-> $v)){
                return false;
            }else{
                $result[$v] = $obj->$v;
            }
        }
        return $result;
    }
}
