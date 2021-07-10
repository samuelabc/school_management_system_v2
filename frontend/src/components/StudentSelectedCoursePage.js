import React, {useEffect, useState} from 'react';
import Service from '../services/studentselectedcourses'
import Table from './StudentSelectedCourseTable'

const StudentSelectedCoursePage = (props) => {
	const [tupleObjs, setTupleObjs] = useState(null);
	const userId = props.userId;
	const userType = props.userType;
	const courses = props.courses;
	const handleReturnHomePage = props.handleReturnHomePage;

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedTupleObjs = await Service.getAll(userId);
			setTupleObjs(fetchedTupleObjs);
			console.log('fetchedTupleObjs', fetchedTupleObjs);
		}
		fetchdata();
	}, [])

	const handleDeleteTupleObj = async(tupleObj_id1) => {
		try {
			var tupleObj_id2 = userId;
			await Service.remove(tupleObj_id1, tupleObj_id2);
			console.log('tupleObjs', tupleObjs);
			const newTable = await tupleObjs.filter(tupleObj => {
				return tupleObj.course_id !== tupleObj_id1 || tupleObj.student_id !== tupleObj_id2;
			});
			setTupleObjs(newTable);
		}
		catch(err) {
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			window.alert(`delete failed\nError: ${message}`);
		}
	}

	if (tupleObjs !== null) {
		return (
			<div>
				<div className='title'>
					<h2>Student Selected Course</h2>
				</div>
				<div>
					<Table tupleObjs={tupleObjs} handleDeleteTupleObj={handleDeleteTupleObj} /> 
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