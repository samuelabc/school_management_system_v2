import React, {useState} from 'react'

const CourseSelectionTable = (props) => {
	const tupleObjs = props.tupleObjs;
	const handleDeleteTupleObj = props.handleDeleteTupleObj;
	const handleUpdateTupleObj = props.handleUpdateTupleObj;
	const [updateRowAttr1, setUpdateRowAttr1] = useState('');
	const [updateRowAttr2, setUpdateRowAttr2] = useState('');
	const [updateAttr1, setUpdateAttr1] = useState('');
	const [updateAttr2, setUpdateAttr2] = useState('');
	const [updateAttr3, setUpdateAttr3] = useState('');
	const [searctText, setSearchText] = useState('');

	const DeleteTuple = async (event) => {
		const attr1 = event.target.parentNode.parentNode.childNodes[0].textContent;
		const attr2 = event.target.parentNode.parentNode.childNodes[1].textContent;
		event.preventDefault();
		if (window.confirm("confirm delete?")) {
			handleDeleteTupleObj(attr1, attr2);
		}
	}
	const UpdateTuple = async(event) => {
		var attr1 = event.target.parentNode.parentNode.childNodes[0].textContent
		var attr2 = event.target.parentNode.parentNode.childNodes[1].textContent
		var attr3 = event.target.parentNode.parentNode.childNodes[2].textContent
		event.preventDefault();
		setUpdateRowAttr1(attr1);
		setUpdateRowAttr2(attr2);

		setUpdateAttr1(attr1);
		setUpdateAttr2(attr2);
		setUpdateAttr3(attr3);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRowAttr1('');
		setUpdateRowAttr2('');
		setUpdateAttr1('');
		setUpdateAttr2('');
		setUpdateAttr3('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriCourseId = updateRowAttr1;
			const oriStudentId = updateRowAttr2;

			const course_id = updateAttr1;
			const student_id = updateAttr2;
			const grade = updateAttr3;
			event.preventDefault();
			const success = await handleUpdateTupleObj(oriCourseId, oriStudentId, {course_id, student_id, grade});
			console.log('success', success);
			if (success === true) {
				setUpdateRowAttr1('');
				setUpdateRowAttr2('');
				setUpdateAttr1('');
				setUpdateAttr2('');
				setUpdateAttr3('');
			}
		}
	}
	const mapTupleObjs = () => {
		return (
			tupleObjs.map(tuple => {
				if (tuple.course_id === updateRowAttr1 && tuple.student_id === updateRowAttr2) {
					return (
						<tr key={tuple.course_id + tuple.student_id}>
							<td>
								<input type='text'
									value={updateAttr1}
									onChange={({target}) => setUpdateAttr1(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateAttr2}
									onChange={({target}) => setUpdateAttr2(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateAttr3}
									onChange={({target}) => setUpdateAttr3(target.value)}
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
							<tr key={tuple.course_id + tuple.student_id}>
								<td>{tuple.course_id}</td>
								<td>{tuple.student_id}</td>
								<td>{tuple.grade}</td>
								<td>
									<button onClick={DeleteTuple}>delete</button>
								</td>
								<td>
									<button onClick={UpdateTuple}>update</button>
								</td>
							</tr>
						)
					}
					else {
						if (tuple.course_id.toLowerCase().includes(searctText.toLowerCase()) || tuple.student_id.toLowerCase().includes(searctText.toLowerCase()) || tuple.grade.toLowerCase().includes(searctText.toLowerCase())) {
							return (
								<tr key={tuple.course_id + tuple.student_id}>
									<td>{tuple.course_id}</td>
									<td>{tuple.student_id}</td>
									<td>{tuple.grade}</td>
									<td>
										<button onClick={DeleteTuple}>delete</button>
									</td>
									<td>
										<button onClick={UpdateTuple}>update</button>
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
						<th>CourseID</th>
						<th>StudentID</th>
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

export default CourseSelectionTable;