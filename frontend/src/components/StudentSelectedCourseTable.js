import React, {useState} from 'react'

const StudentSelectedCourseTable = (props) => {
	const tupleObjs = props.tupleObjs;
	const handleDeleteTupleObj = props.handleDeleteTupleObj;
	const [searctText, setSearchText] = useState('');

	const DeleteTuple = async (event) => {
		const attr1 = event.target.parentNode.parentNode.childNodes[0].textContent;
		event.preventDefault();
		if (window.confirm("confirm to drop this course?")) {
			handleDeleteTupleObj(attr1);
		}
	}
	const mapTupleObjs = () => {
		console.log(tupleObjs);
		return (
			tupleObjs.map(tuple => {
				if (searctText === '') {
					return (
						<tr key={tuple.course_id}>
							<td>{tuple.course_id}</td>
							<td>{tuple.course_name}</td>
							<td>{tuple.teacher_name}</td>
							<td>{tuple.department_name}</td>
							<td>{tuple.grade}</td>
							<td>
								<button onClick={DeleteTuple}>Drop course</button>
							</td>
						</tr>
					)
				}
				else {
					if (tuple.course_id.toLowerCase().includes(searctText.toLowerCase()) || tuple.course_name.toLowerCase().includes(searctText.toLowerCase())
						 || tuple.teacher_name.toLowerCase().includes(searctText.toLowerCase()) || tuple.department_name.toLowerCase().includes(searctText.toLowerCase())
						  || (tuple.grade !== null && tuple.grade.toLowerCase().includes(searctText.toLowerCase())) ) {
						return (
							<tr key={tuple.course_id}>
								<td>{tuple.course_id}</td>
								<td>{tuple.course_name}</td>
								<td>{tuple.teacher_name}</td>
								<td>{tuple.department_name}</td>
								<td>{tuple.grade}</td>
								<td>
									<button onClick={DeleteTuple}>Drop course</button>
								</td>
							</tr>
						)
					}
				}
			})
		)
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
						<th>CourseName</th>
						<th>TeacherName</th>
						<th>DepartmentName</th>
						<th>Grade</th>
						<th></th>
					</tr>
					{mapTupleObjs()}
				</tbody>
			</table>
		</div>
	)
}

export default StudentSelectedCourseTable;