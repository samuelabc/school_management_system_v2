import React, {useState} from 'react'

const MajorTable = (props) => {
	const tupleObjs = props.tupleObjs;
	const handleDeleteTupleObj = props.handleDeleteTupleObj;
	const handleUpdateTupleObj = props.handleUpdateTupleObj;
	const [updateRow, setUpdateRow] = useState('');
	const [updateAttr1, setUpdateAttr1] = useState('');
	const [updateAttr2, setUpdateAttr2] = useState('');
	const [updateAttr3, setUpdateAttr3] = useState('');
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
		var attr3 = event.target.parentNode.parentNode.childNodes[2].textContent
		event.preventDefault();
		setUpdateRow(attr1);
		setUpdateAttr1(attr1);
		setUpdateAttr2(attr2);
		setUpdateAttr3(attr3);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRow('');
		setUpdateAttr1('');
		setUpdateAttr2('');
		setUpdateAttr3('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriClassId = updateRow;
			const class_id = updateAttr1;
			const year = updateAttr2;
			const major_id = updateAttr3;
			event.preventDefault();
			const success = await handleUpdateTupleObj(oriClassId, {class_id, year, major_id});
			console.log('success', success);
			if (success === true) {
				setUpdateRow('');
				setUpdateAttr1('');
				setUpdateAttr2('');
				setUpdateAttr3('');
			}
		}
	}
	const mapTupleObjs = () => {
		return (
			tupleObjs.map(tuple => {
				if (tuple.class_id === updateRow) {
					return (
						<tr key={tuple.class_id}>
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
							<tr key={tuple.class_id}>
								<td>{tuple.class_id}</td>
								<td>{tuple.year}</td>
								<td>{tuple.major_id}</td>
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
						if (tuple.class_id.includes(searctText) || tuple.year.includes(searctText) || tuple.major_id.includes(searctText)) {
							return (
								<tr key={tuple.class_id}>
									<td>{tuple.class_id}</td>
									<td>{tuple.year}</td>
									<td>{tuple.major_id}</td>
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
						<th>ClassID</th>
						<th>Year</th>
						<th>MajorId</th>
						<th></th>
						<th></th>
					</tr>
					{mapTupleObjs()}
				</tbody>
			</table>
		</div>
	)
}

export default MajorTable;