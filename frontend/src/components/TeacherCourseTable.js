import React, {useState} from 'react'

const StudentCourseCatalogTable = (props) => {
	const studentTakenCourse = props.studentTakenCourse;
	const userId = props.userId;
	const courseId = props.courseId;
	const handleUpdateTupleObj = props.handleUpdateTupleObj;
	const [updateRow, setUpdateRow] = useState();
	const [updateGrade, setUpdateGrade] = useState();
	const [searctText, setSearchText] = useState('');

	const UpdateTuple = async (event) => {
		var course_id = event.target.parentNode.parentNode.childNodes[0].textContent
		var student_id = event.target.parentNode.parentNode.childNodes[1].textContent
		var grade = event.target.parentNode.parentNode.childNodes[3].textContent
		event.preventDefault();
		setUpdateRow(student_id);
		setUpdateGrade(grade);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRow('');
		setUpdateGrade('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oricourseid = courseId;
			const oristudentid = updateRow;
			const course_id = courseId;
			const student_id = userId;
			const grade = updateGrade;
			console.log(course_id, student_id, grade);
			if (handleUpdateTupleObj(oricourseid, oristudentid, {course_id, student_id, grade})) {
				setUpdateRow('');
				setUpdateGrade('');
			}
		}
	}
	const mapTupleObjs = () => {
		console.log('studentTakenCourse', studentTakenCourse);
		if (studentTakenCourse !== undefined) {
			return (
				studentTakenCourse.map(tuple => {
					if (tuple.student_id === updateRow) {
						return (
							<tr key={tuple.student_id}>
								<td>{tuple.course_id}</td>
								<td>{tuple.student_id}</td>
								<td>{tuple.student_name}</td>
								<td>
									<input type='text'
										value={updateGrade}
										onChange={({target}) => setUpdateGrade(target.value)}
									/>
								</td>
								<td>
									<button onClick={CancelUpdate}>cancel</button>
								</td>
								<td>
									<button onClick={ConfirmUpdate}>confirm</button>
								</td>
							</tr>
						)
					}
					else if (searctText === '') {
						return (
							<tr key={tuple.student_id}>
								<td>{tuple.course_id}</td>
								<td>{tuple.student_id}</td>
								<td>{tuple.student_name}</td>
								<td>{tuple.grade}</td>
								<td>
									<button onClick={UpdateTuple}>Update grade</button>
								</td>
							</tr>
						)
					}
					else {
						if (tuple.course_id.toLowerCase().includes(searctText.toLowerCase()) || tuple.student_id.toLowerCase().includes(searctText.toLowerCase())
							|| tuple.student_name.toLowerCase().includes(searctText.toLowerCase()) || (tuple.grade !== null && tuple.grade.toLowerCase().includes(searctText.toLowerCase()))) {
							return (
								<tr key={tuple.student_id}>
									<td>{tuple.course_id}</td>
									<td>{tuple.student_id}</td>
									<td>{tuple.student_name}</td>
									<td>{tuple.grade}</td>
									<td>
										<button onClick={UpdateTuple}>Update grade</button>
									</td>
								</tr>
							)
						}
					}
				})
			)
		}
	}
	return (
		<div>
			<input className="searchbox" type="text" placeholder="Search.." 
				value={searctText} 
				onChange={({target}) => setSearchText(target.value)} />
				
			<table>
				<tbody>
					<tr>
						<th>CourseId</th>
						<th>StudentId</th>
						<th>StudentName</th>
						<th>Grade</th>
						<th></th>
						<th></th>
					</tr>
					{mapTupleObjs()}
				</tbody>
			</table>
		</div>
	)
}

export default StudentCourseCatalogTable;