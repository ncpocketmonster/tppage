<?php
namespace app\article\controller;

use \app\article\model\Article;
use \think\Db;

class Index
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
        $content = Article::get($id);
        return json($content);
    }
    public function save(){
        return false;
        $request_json_string=file_get_contents('php://input');
        $request_json_object=json_decode($request_json_string);
        $keyNames=[ 'title', 'content', 'keyword', 'article_type', 'author'];
        $article = new Article;
        // check json data
        foreach($keyNames as $k => $v){
            if(!isset($request_json_object -> $v)){
                return json(['status'=>false,'error'=>'json data wrong',$k=>$v])->code(404);
            }else{
                $article->$v=$request_json_object->$v;
            }
        }
        $article->save();
        // add data to the database
        return json(['status'=>true])->code(200);
    }
    public function update($id){
        return false;
        return $id.'update';
    }
    public function delete($id){
        return false;
        return $id.'delete';
    }
}
