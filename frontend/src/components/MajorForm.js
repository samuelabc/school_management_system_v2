import React, {useState} from 'react';

const MajorForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertTupleObj = props.handleInsertTupleObj;
	const [attr1, setAttr1] = useState('');
	const [attr2, setAttr2] = useState('');
	const [attr3, setAttr3] = useState('');

	const InsertTupleObj = async (event) => {
		const major_id = attr1;
		const name = attr2;
		const department_id = attr3;
		event.preventDefault();
		handleInsertTupleObj({major_id, name, department_id})
		setAttr1('');
		setAttr2('');
		setAttr3('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Department</strong>
			<form onSubmit={InsertTupleObj} >
				<div>
					<p className='formattr'>MajorID</p>
					<input type='text'
						value={attr1}
						onChange={({target}) => setAttr1(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Name</p>
					<input type='text'
						value={attr2}
						onChange={({target}) => setAttr2(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>DepartmentID</p>
					<input type='text'
						value={attr3}
						onChange={({target}) => setAttr3(target.value)}
					/>
				</div>
				<button className='cancelbutton' type="button" onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default MajorForm;