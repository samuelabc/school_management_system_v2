import React, {useState} from 'react';

const TeacherForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertTeacher = props.handleInsertTeacher;
	const [teacherId, setTeacherId] = useState('');
	const [name, setName] = useState('');
	const [department_id, setDepartmentId] = useState('');

	const InsertTeacher = async (event) => {
		const teacher_id = teacherId;
		event.preventDefault();
		handleInsertTeacher({teacher_id, name, department_id})
		setTeacherId('');
		setName('');
		setDepartmentId('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Teacher</strong>
			<form onSubmit={InsertTeacher} >
				<div>
					<p className='formattr'>TeacherID</p>
					<input type='text'
						value={teacherId}
						onChange={({target}) => setTeacherId(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Name</p>
					<input type='text'
						value={name}
						onChange={({target}) => setName(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>DepartmentID</p>
					<input type='text'
						value={department_id}
						onChange={({target}) => setDepartmentId(target.value)}
					/>
				</div>
				<button className='cancelbutton' type="button" 
					onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default TeacherForm;