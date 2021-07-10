import React, {useState} from 'react';

const LoginForm = (props) => {
	const handleLogin = props.handleLogin;
	const [attr1, setAttr1] = useState('');
	const [attr2, setAttr2] = useState('');

	const UserLogin = async (event) => {
		const user_id = attr1;
		const password = attr2;
		event.preventDefault();
		if (handleLogin({user_id, password}) === true) {
			setAttr1('');
			setAttr2('');
		}
	}

	return (
		<div className='container'>
			<form onSubmit={UserLogin} >
				<div>
					<p className='formattr'>User Id</p>
					<input type='text'
						value={attr1}
						onChange={({target}) => setAttr1(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Password</p>
					<input type='password'
						value={attr2}
						onChange={({target}) => setAttr2(target.value)}
					/>
				</div>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default LoginForm;