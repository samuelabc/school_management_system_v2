import React from 'react';
import Service from '../services/logins'
import Form from './LoginForm';

const LoginPage = (props) => {
	const setUserId = props.setUserId;
	const setUserType = props.setUserType;
	const handleLogin = async(tupleObj) => {
		try {
			// console.log(tupleObj);
			var retObj = await Service.login(tupleObj);
			// console.log("retObj", retObj);
			var user_type = retObj[0].user_type;
			var user_id = retObj[0].user_id;
			console.log(user_id);
			console.log(user_type);
			setUserType(user_type);
			setUserId(user_id);
			return true;
		}
		catch(err) {
			console.log(err.response)
			console.log("log in failed", err.response.data.error);
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			console.log(message);
			window.alert(`log in failed\nError: ${message}`);
			return false;
		}
	}

	return (
		<div>
			<div className='title'>
				<h2>Welcome. Please log in.</h2>
			</div>
			<div>
				<Form handleLogin={handleLogin} />
			</div>
		</div>
	);
}

export default LoginPage;