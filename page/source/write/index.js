import React from 'react';

import Content  from './views/content.js';
import Keywords from './views/keyword.js';
import Title    from './views/title.js';
import Password from './views/password.js';
import reducer  from './reducer.js';
import actions  from './actions.js';
import './views/writing.scss';

const view = () => (<div>
    <Password/>
    <Title/>
    <Keywords/>
    <Content/>
  </div>)

export {view,reducer,actions};