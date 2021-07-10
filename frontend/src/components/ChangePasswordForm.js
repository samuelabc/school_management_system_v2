import React, {useState} from 'react';

const ChangePasswordForm = (props) => {
	const handleChangePassword = props.handleChangePassword;
	const setPage = props.setPage;
	const userId = props.userId;
	const [attr1, setAttr1] = useState('');
	const [attr2, setAttr2] = useState('');
	const [attr3, setAttr3] = useState('');

	const ChangePassword = async (event) => {
		const user_id = userId;
		const old_password = attr1;
		const new_password = attr2;
		const confirm_new_password = attr3;
		event.preventDefault();
		if (new_password !== confirm_new_password) {
			window.alert('Value of new password and confirm new password should be the same.')
		}
		else {
			if(handleChangePassword({user_id, old_password, new_password})) {
				setAttr1('');
				setAttr2('');
				setAttr3('');
				setPage('HomePage');
			}
		}
	}

	return (
		<div className='container'>
			<form onSubmit={ChangePassword} >
				<div>
					<p className='formattr'>Old password</p>
					<input type='password'
						value={attr1}
						onChange={({target}) => setAttr1(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>New password</p>
					<input type='password'
						value={attr2}
						onChange={({target}) => setAttr2(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Confirm new password</p>
					<input type='password'
						value={attr3}
						onChange={({target}) => setAttr3(target.value)}
					/>
				</div>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default ChangePasswordForm;