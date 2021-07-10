import React, {useEffect, useState} from 'react';
import Service from '../services/studentcoursecatalogs'
import Table from './StudentCourseCatalogTable'

const StudentSelectedCoursePage = (props) => {
	const [tupleObjs, setTupleObjs] = useState(null);
	const userId = props.userId;
	const userType = props.userType;
	const handleReturnHomePage = props.handleReturnHomePage;

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedTupleObjs = await Service.getAll(userId);
			setTupleObjs(fetchedTupleObjs);
			console.log('fetchedTupleObjs', fetchedTupleObjs);
		}
		fetchdata();
	}, [])

	const handleInsertTupleObj = async(tupleObj) => {
		try {
			await Service.create(tupleObj);
			const newTable = await tupleObjs.filter(tuple => {
				return tuple.course_id !== tupleObj.course_id;
			});
			console.log('new table', newTable);
			setTupleObjs(newTable);
		}
		catch(err) {
			console.log(err.response)
			console.log("insert failed", err.response.data.error);
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			console.log(message);
			window.alert(`insert failed\nError: ${message}`);
		}
	}

	if (tupleObjs !== null) {
		return (
			<div>
				<div className='title'>
					<h2>Course Catalog</h2>
					<p>Courses that still can be selected, selected courses are not included in this table.</p>
				</div>
				<div>
					<Table userId={userId} tupleObjs={tupleObjs} handleInsertTupleObj={handleInsertTupleObj} /> 
				</div>
				<div>
					<button onClick={() => handleReturnHomePage()} >return</button>
				</div>
			</div>
		);
	}
	else {
		return (
			<div></div>
		)
	}
}

export default StudentSelectedCoursePage;