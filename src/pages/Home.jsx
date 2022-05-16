import React from 'react';
import Login from '../components/Login';

export default function Home() {
	return (
		<div className='container'>
			<h3 className='subtitle'>Welcome to Job <span className='txt-blue'>Search!</span></h3>
            <Login/>
		</div>
	);
}
