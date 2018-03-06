// import npm items 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';

// import my components
import {view as Menu} from './menu'
import {view as Article} from './article'

import './front.scss'

const Header = ({title}) => (
  <header id='top' className='wrapper'>
    <div id='header_top' className='container'>
      <h1 id='h1'>{title}</h1>
      <div className="help"></div>
    </div>
  </header>
)

const Content = () => {
  const urlArr = [
    ['/', 'home   '],
    ['' , 'myself '],
    ['' , 'read   '],
    ['' , 'game   '],
    ['' , 'boring '],
    ['' , 'project'],
    ['/hello' , 'hello'],
  ]
  return (
    <Router>
      <div id='middle'>
        <nav className ='wrapper'>
          <div className ='container'>
            <ul>
              { urlArr.map( (item,index) => (
                <li key={index}> <Link to={item[0]}> {item[1]}</Link> </li>
              ) ) }
            </ul>
          </div>
        </nav>
        <Route exact path='/' component={Menu}/>
        <Route path='/app/article/:id' component={Article}/>
      </div>
    </Router>
  )
}

const Footer = () => (
  <footer id='bottom' className='wrapper'>
    <p>鄂ICP备17004043号-1</p>
    <p>copyright ncpocketmonster©20**~20**</p>
  </footer>
)

const Front = () => (
  <div>
    <Header title='NCPOCKETMONSTER'/>
    <Content />
    <Footer/>
  </div>
)

export default Front;