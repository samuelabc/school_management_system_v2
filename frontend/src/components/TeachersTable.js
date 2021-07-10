import React, {useState} from 'react'

const TeacherTable = (props) => {
	const teachers = props.teachers;
	const handleDeleteTeacher = props.handleDeleteTeacher;
	const handleUpdateTeacher = props.handleUpdateTeacher;
	const [updateRow, setUpdateRow] = useState('');
	const [updateTeacherId, setUpdateTeacherId] = useState('');
	const [updateName, setUpdateName] = useState('');
	const [updateDepartmentId, setUpdateDepartmentId] = useState('');
	const [searctText, setSearchText] = useState('');

	const DeleteTeacher = async (event) => {
		var teacher_id = event.target.parentNode.parentNode.childNodes[0].textContent;
		event.preventDefault();
		if (window.confirm("confirm delete?")) {
			handleDeleteTeacher(teacher_id);
		}
	}
	const UpdateTeacher = async(event) => {
		var teacher_id = event.target.parentNode.parentNode.childNodes[0].textContent
		var name = event.target.parentNode.parentNode.childNodes[1].textContent
		var department_id = event.target.parentNode.parentNode.childNodes[2].textContent
		event.preventDefault();
		setUpdateRow(teacher_id);
		setUpdateTeacherId(teacher_id);
		setUpdateName(name);
		setUpdateDepartmentId(department_id);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRow('');
		setUpdateTeacherId('');
		setUpdateName('');
		setUpdateDepartmentId('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriTeacherId = updateRow;
			const teacher_id = updateTeacherId;
			const department_id = updateDepartmentId;
			const name = updateName;
			event.preventDefault();
			const success = await handleUpdateTeacher(oriTeacherId, {teacher_id, name, department_id});
			console.log('success', success);
			if (success === true) {
				setUpdateRow('');
				setUpdateTeacherId('');
				setUpdateName('');
				setUpdateDepartmentId('');
			}
		}
	}
	const mapTeacher = () => {
		return (
			teachers.map(teacher => {
				if (teacher.teacher_id === updateRow) {
					return (
						<tr key={teacher.teacher_id}>
							<td>
								<input type='text'
									value={updateTeacherId}
									onChange={({target}) => setUpdateTeacherId(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateName}
									onChange={({target}) => setUpdateName(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateDepartmentId}
									onChange={({target}) => setUpdateDepartmentId(target.value)}
								/>
							</td>
							<td>
								<button onClick={CancelUpdate}>cancel</button>
							</td>
							<td>
								<button onClick={ConfirmUpdate}>comfirm</button>
							</td>
						</tr>
					)
				}
				else {
					if (searctText === '') {
						return (
							<tr key={teacher.teacher_id}>
								<td>{teacher.teacher_id}</td>
								<td>{teacher.name}</td>
								<td>{teacher.department_id}</td>
								<td>
									<button onClick={DeleteTeacher}>delete</button>
								</td>
								<td>
									<button onClick={UpdateTeacher}>update</button>
								</td>
							</tr>
						)
					}
					else {
						if (teacher.teacher_id.toLowerCase().includes(searctText.toLowerCase()) || teacher.name.toLowerCase().includes(searctText.toLowerCase()) || teacher.department_id.toLowerCase().includes(searctText.toLowerCase())) {
							return (
								<tr key={teacher.teacher_id}>
									<td>{teacher.teacher_id}</td>
									<td>{teacher.name}</td>
									<td>{teacher.department_id}</td>
									<td>
										<button onClick={DeleteTeacher}>delete</button>
									</td>
									<td>
										<button onClick={UpdateTeacher}>update</button>
									</td>
								</tr>
							)
						}
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
						<th>TeacherID</th>
						<th>Name</th>
						<th>DepartmentID</th>
						<th></th>
						<th></th>
					</tr>
					{mapTeacher()}
				</tbody>
			</table>
		</div>
	)
}

export default TeacherTable;