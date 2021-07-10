import React, {useState} from 'react';

const CourseForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertCourse = props.handleInsertCourse;
	const [courseId, setCourseId] = useState('');
	const [name, setName] = useState('');
	const [teacherId, setTeacherId] = useState('');
	const [departmentId, setDepartmentId] = useState('');

	const InsertCourse = async (event) => {
		const course_id = courseId;
		const teacher_id = teacherId;
		const department_id = departmentId;
		event.preventDefault();
		handleInsertCourse({course_id, name, teacher_id, department_id})
		setCourseId('')
		setName('');
		setTeacherId('');
		setDepartmentId('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Course</strong>
			<form onSubmit={InsertCourse} >
				<div>
					<p className='formattr'>CourseID</p>
					<input type='text'
						value={courseId}
						onChange={({target}) => setCourseId(target.value)}
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
					<p className='formattr'>TeacherID</p>
					<input type='text'
						value={teacherId}
						onChange={({target}) => setTeacherId(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>TeacherID</p>
					<input type='text'
						value={departmentId}
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

export default CourseForm;