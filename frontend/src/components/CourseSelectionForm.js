import React, {useState} from 'react';

const CourseSelectionForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertTupleObj = props.handleInsertTupleObj;
	const [attr1, setAttr1] = useState('');
	const [attr2, setAttr2] = useState('');
	const [attr3, setAttr3] = useState('');

	const InsertTupleObj = async (event) => {
		const course_id = attr1;
		const student_id = attr2;
		const grade = attr3;
		event.preventDefault();
		handleInsertTupleObj({course_id, student_id, grade})
		setAttr1('');
		setAttr2('');
		setAttr3('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Course Selection</strong>
			<form onSubmit={InsertTupleObj} >
				<div>
					<p className='formattr'>CourseID</p>
					<input type='text'
						value={attr1}
						onChange={({target}) => setAttr1(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>StudentID</p>
					<input type='text'
						value={attr2}
						onChange={({target}) => setAttr2(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Grade</p>
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

export default CourseSelectionForm;