import React from 'react';
import {connect} from 'react-redux';
import sha512 from 'crypto-js/sha512';

const Password = ({set,value}) => ( <div className='writing_item'>
        <input  className='one' disabled='disabled' defaultValue='password' name='password_span'/>
        <input  className='two' type='password' onChange={set} name='password' value={value}/>
        <button className='three'onClick={()=>set({ target:{ value:'', } })}>X</button>
  </div>
)

const mapStoP = state => ({
  value : state.write.password,
})

const mapDtoP = dispatch => ({
  set : ev => dispatch({
    type:'password',
    data:ev.target.value,
  }),
})

export default connect(mapStoP,mapDtoP)(Password);