<?php
namespace app\article\model;
use think\Model;

// Articles => think_articles table in MySql
class Article extends Model
{
  protected $pk = 'aid';
  protected $autoWriteTimestamp = 'datetime';
  //// 定义时间戳字段名
  //protected $createTime = 'create_at';
  //protected $updateTime = 'update_at';
  protected $type = [
    'author' => 'string',
    'title' => 'string',
    // time : time year month day hour
    'time' => 'datetime',
    'content' => 'string',
    'keyword' => 'array',
    'article_type'=> 'string',
    ];
}