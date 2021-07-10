import React, {useState} from 'react';

const UserForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertTupleObj = props.handleInsertTupleObj;
	const [attr1, setAttr1] = useState('');
	const [attr2, setAttr2] = useState('');
	// const [attr3, setAttr3] = useState('');
	const [attr4, setAttr4] = useState('');

	const InsertTupleObj = async (event) => {
		const user_id = attr1;
		const password = attr2;
		// const user_type = attr3;
		const user_type = document.getElementById("selected").value;

		event.preventDefault();
		if (attr2 === attr4) {
			if (handleInsertTupleObj({user_id, password, user_type})) { //true
				setAttr1('');
				setAttr2('');
				// setAttr3('');
				setAttr4('');
			}
		}
		else {
			window.alert(`password doesn't match`);
		}
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert User</strong>
			<form onSubmit={InsertTupleObj} >
				<div>
					<p className='formattr'>UserID</p>
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
				<div>
					<p className='formattr'>Confirm Password</p>
					<input type='password'
						value={attr4}
						onChange={({target}) => setAttr4(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>UserType</p>
					{/* <input type='text'
						value={attr3}
						onChange={({target}) => setAttr3(target.value)}
					/> */}
					<select id='selected'>
						<option value='admin'>admin</option>
						<option value='student'>student</option>
						<option value='teacher'>teacher</option>
					</select>
				</div>
				<button className='cancelbutton' type="button" onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default UserForm;