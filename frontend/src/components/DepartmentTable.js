import React, {useState} from 'react'

const DepartmentTable = (props) => {
	const tupleObjs = props.tupleObjs;
	const handleDeleteTupleObj = props.handleDeleteTupleObj;
	const handleUpdateTupleObj = props.handleUpdateTupleObj;
	const [updateRow, setUpdateRow] = useState('');
	const [updateAttr1, setUpdateAttr1] = useState('');
	const [updateAttr2, setUpdateAttr2] = useState('');
	const [searctText, setSearchText] = useState('');

	const DeleteTuple = async (event) => {
		const attr1 = event.target.parentNode.parentNode.childNodes[0].textContent;
		event.preventDefault();
		if (window.confirm("confirm delete?")) {
			handleDeleteTupleObj(attr1);
		}
	}
	const UpdateTuple = async(event) => {
		var attr1 = event.target.parentNode.parentNode.childNodes[0].textContent
		var attr2 = event.target.parentNode.parentNode.childNodes[1].textContent
		event.preventDefault();
		setUpdateRow(attr1);
		setUpdateAttr1(attr1);
		setUpdateAttr2(attr2);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRow('');
		setUpdateAttr1('');
		setUpdateAttr2('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriDepartmentId = updateRow;
			const department_id = updateAttr1;
			const name = updateAttr2;
			event.preventDefault();
			const success = await handleUpdateTupleObj(oriDepartmentId, {department_id, name});
			console.log('success', success);
			if (success === true) {
				setUpdateRow('');
				setUpdateAttr1('');
				setUpdateAttr2('');
			}
		}
	}
	const mapTupleObjs = () => {
		return (
			tupleObjs.map(tuple => {
				if (tuple.department_id === updateRow) {
					return (
						<tr key={tuple.department_id}>
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
							<tr key={tuple.department_id}>
								<td>{tuple.department_id}</td>
								<td>{tuple.name}</td>
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
						if (tuple.department_id.includes(searctText) || tuple.name.includes(searctText)) {
							return (
								<tr key={tuple.department_id}>
									<td>{tuple.department_id}</td>
									<td>{tuple.name}</td>
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
						<th>DepartmentID</th>
						<th>Name</th>
						<th></th>
						<th></th>
					</tr>
					{mapTupleObjs()}
				</tbody>
			</table>
		</div>
	)
}

export default DepartmentTable;