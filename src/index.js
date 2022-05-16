import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; Para la posibilidad de usar tailwind css en el futuro
import './main.css';


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

