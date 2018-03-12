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
        $data = Article::get($id);
        return json($data);
    }
    public function save(){
        $res = $this->filter_json();
        // return false if there is not enough values
        if( $res === false ){
            return json(['error'=>'input wrong'])->code(500);
        }

        $article = new Article;
        // add default value
        $article->author  = 'ncpm';
        $article->keyword = 'ncpm';

        // save data to database
        $article->save($res);
        $article->save();
        // return main key(aid)
        return json(['id'=>$article->aid])->code(200);
    }
    public function update($id){
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
        return json(['id'=>$article->aid]);
    }
    public function delete($id){
        $article = Article::get($id);
        $article->delete();
        return json(['id'=>$article->id]);
    }
    public function authority(){
        $request_json_string=file_get_contents('php://input');
        $object=json_decode($request_json_string);
        # take password out from json and add salt
        $password = $object->password.'123!@!#asdf@:"><>';
        # hash password
        $hash = hash('sha512',$password);
        # search the database to find the password
        $checked = Db::table('user_password')->where('password',$hash)->find();
        # password wrong
        if($checked === null){
            return False;
        }
        # password correct
        else{ 
            return True;
            #return ['query'=>$q,'hash'=>$hash,'check'=>$checked]; 
            #$q = Db::query("select password from user_password");
        }
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
