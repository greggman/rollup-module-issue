import React from 'react';
import ReactDOM from 'react-dom/client';

const elem = document.createElement('div');
document.body.appendChild(elem);
const root = ReactDOM.createRoot(elem);
root.render(<div>hello</div>);

