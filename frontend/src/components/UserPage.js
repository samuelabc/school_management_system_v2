import React, {useEffect, useRef} from 'react';
import Togglable from './Togglable';
import Service from '../services/users'
import Table from './UserTable'
import Form from './UserForm';

const UserPage = (props) => {
	const tupleObjs = props.tupleObjs;
	const setTupleObjs = props.setTupleObjs;
	const handleReturnHomePage = props.handleReturnHomePage;
	const togglableRef = useRef()

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedTupleObjs = await Service.getAll();
			setTupleObjs(fetchedTupleObjs);
		}
		fetchdata();
	}, [])

	const handleInsertTupleObj = async(tupleObj) => {
		try {
			await Service.create(tupleObj);
			const fetchedTupleObjs = await Service.getAll();
			setTupleObjs(fetchedTupleObjs);
			return true;
		}
		catch(err) {
			console.log(err.response)
			console.log("insert failed", err.response.data.error);
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			console.log(message);
			window.alert(`insert failed\nError: ${message}`);
			return false;
		}
	}
	const handleDeleteTupleObj = async(tupleObj_id) => {
		try {
			await Service.remove(tupleObj_id);
			const newTable = await tupleObjs.filter(tupleObj => {
				return tupleObj.user_id !== tupleObj_id;
			});
			setTupleObjs(newTable);
		}
		catch(err) {
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			window.alert(`delete failed\nError: ${message}`);
		}
	}
	const handleUpdateTupleObj = async(oriTupleObjId, tupleObj) => {
		try {
			console.log('tupleObj', tupleObj);
			await Service.update(oriTupleObjId, tupleObj);
			const newTable = await tupleObjs.map(tuple => {
				return tuple.user_id !== oriTupleObjId ? tuple : tupleObj;
			});
			console.log('newTable',newTable);
			setTupleObjs(newTable);
			return true;
		}
		catch(err) {
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			window.alert(`update failed\nError: ${message}`);
			return false;
		}
	}

	return (
		<div>
			<div className='title'>
				<h2>User Information</h2>
			</div>
			<div>
				<Togglable ref={togglableRef} buttonLabel='Insert User' type='Form'>
					<Form handleInsertTupleObj={handleInsertTupleObj} togglableRef={togglableRef} />
				</Togglable>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()} >return</button>
			</div>
			<div>
				<Table tupleObjs={tupleObjs} handleDeleteTupleObj={handleDeleteTupleObj} handleUpdateTupleObj={handleUpdateTupleObj}/>
			</div>
		</div>
	);
}

export default UserPage;