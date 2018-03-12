import React    from 'react'         ;
import Page     from './page.js'     ;
import FileItem from './fileItem.js' ;
import Editor   from './editor.js'   ;
import TopBar   from './topBar.js'   ;

import               './editor.scss' ;

const st = {
  float   : 'left'  ,
  display : 'block' ,
  width   : '33%'   ,
  height  : '100%',
}

const View = () => (<div className='editor_all'>
  <div className='editor_left'>
    <Page/>
    <FileItem/>
  </div>
  <div className='editor_right'>
    <TopBar />
    <div className='editor_editor'>
      <Editor/>
    </div>
  </div>
</div>)

export default View;