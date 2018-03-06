#!/bin/bash
npm run build
cp compiled/react_out.js  public/index.html    ../tp5/public/
echo 'finish copy!'