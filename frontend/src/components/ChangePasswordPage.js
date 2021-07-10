import React from 'react';
import Service from '../services/changepasswords'
import Form from './ChangePasswordForm';

const ChangePasswordPage = (props) => {
	const userId = props.userId;
	const userType = props.userType;
	const handleReturnHomePage = props.handleReturnHomePage;
	const setPage = props.setPage;

	const handleChangePassword = async(tupleObj) => {
		try {
			console.log(tupleObj);
			await Service.changePassword(tupleObj);
			await window.alert('Successfully change password!');
			return true;
		}
		catch(err) {
			console.log(err)
			console.log("change password failed", err.response.data.error);
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			console.log(message);
			window.alert(`change password failed\nError: ${message}`);
			return false;
		}
	}
	function putUserId() {
		return userId;
	}
	return (
		<div>
			<div className='title'>
				<p>User id: <strong>{putUserId()}</strong></p>
			</div>
			<div>
				<Form userId={userId} handleReturnHomePage={handleReturnHomePage}
				 handleChangePassword={handleChangePassword}
				 setPage={setPage} />
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()} >return</button>
			</div>
		</div>
	);
}

export default ChangePasswordPage;