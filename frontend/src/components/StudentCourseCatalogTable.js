import React, {useState} from 'react'

const StudentCourseCatalogTable = (props) => {
	const tupleObjs = props.tupleObjs;
	const userId = props.userId;
	const handleInsertTupleObj = props.handleInsertTupleObj;
	const [searctText, setSearchText] = useState('');

	const CreateTuple = async (event) => {
		const course_id = event.target.parentNode.parentNode.childNodes[0].textContent;
		const student_id = userId;
		const grade = null;
		event.preventDefault();
		if (window.confirm("confirm to take this course?")) {
			handleInsertTupleObj({course_id, student_id, grade});
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
							<td>
								<button onClick={CreateTuple}>Take course</button>
							</td>
						</tr>
					)
				}
				else {
					if (tuple.course_id.toLowerCase().includes(searctText.toLowerCase()) || tuple.course_name.toLowerCase().includes(searctText.toLowerCase())
						 || tuple.teacher_name.toLowerCase().includes(searctText.toLowerCase()) || tuple.department_name.toLowerCase().includes(searctText.toLowerCase())) {
						return (
							<tr key={tuple.course_id}>
								<td>{tuple.course_id}</td>
								<td>{tuple.course_name}</td>
								<td>{tuple.teacher_name}</td>
								<td>{tuple.department_name}</td>
								<td>
									<button onClick={CreateTuple}>Take course</button>
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
						<th></th>
					</tr>
					{mapTupleObjs()}
				</tbody>
			</table>
		</div>
	)
}

export default StudentCourseCatalogTable;