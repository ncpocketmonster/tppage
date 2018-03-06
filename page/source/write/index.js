import React from 'react';

import Writing from './views/article.js';
import Keyword from './views/keyword.js';
import Title   from './views/title.js';
import './views/writing.scss';

export default ()=>(
  <div>
    <Title />
    <Keyword />
    <Writing />
  </div>
)