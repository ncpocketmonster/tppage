import React  from 'react';
import {url}  from './../const.js';
import sha512 from 'crypto-js/sha512';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : '' ,
      password : '' ,
      hashpassword : '',
      error    : '' ,
    };
    this.change = this.change.bind(this);
    this.login = this.login.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.setStorage = this.setStorage.bind(this);
  }

  change( key , ev ){
    let obj = {} ;
    obj[ key ] = ev.target.value ; 
    obj[ 'error' ] = '' ;
    this.setState( obj );
  }

  setStorage(){
    localStorage.username = this.state.username;
    localStorage.password = this.state.hashpassword;
    //document.cookie=`username=${this.state.username}`;
    //document.cookie=`password=${this.state.hashpassword}`;
  }

  checkInput(){
    let { 'password' : password , 'username' : username , } = this.state ;
    return !( password === '' || username === '');
  }

  login(){
    let username = this.state.username;
    let password = this.state.password;
    let hashpassword = (sha512(username+password)).toString();
    this.state.hashpassword = hashpassword;

    let myBody = JSON.stringify({
      'username' : username ,
      'password' : hashpassword,
    })

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    let myInit = { 
      method: 'POST',
      credentials: 'include',
      headers: myHeaders,
      mode: 'cors',
      //cache: 'no-store' ,
      body: myBody,
      };

    if( this.checkInput() ){
      fetch( url.login , myInit )
      .then( response => {
        if(response.ok){
          this.setStorage();
          response.json().then( data => alert(data.success));
        }
        else{
          response.json().then( data => alert(data.error));
        }
      })
      .catch( error => alert( error.message ) );
    }
    else{
      this.setState( { 'error' : 'input wrong'});
    }
  }
  
  render(){
    return (<div className='container'>
      <div>
        <span>username</span>
        <input 
          type = 'text' 
          onChange = { ev => this.change( 'username' , ev)}
          value = {this.state.username}
          className = 'login_input' />
      </div>
      <div>
        <span>password</span>
        <input 
          type = 'text' 
          onChange = { ev => this.change( 'password' , ev)}
          value = {this.state.password} 
          className = 'login_input' />
      </div>
      <button 
        type = 'button'
        onClick = {this.login}
        className = 'login_button' >login</button>
      <p>{this.state.error}</p>
    </div>)
  }
}

export {Login as view}