import React, {useEffect, useState} from 'react';
import Service from '../services/studentinfos'

const StudentInfoPage = (props) => {
	const [tupleObjs, setTupleObjs] = useState(null);
	const userId = props.userId;
	const userType = props.userType;
	const handleReturnHomePage = props.handleReturnHomePage;

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedTupleObjs = await Service.getAll(userId);
			setTupleObjs(fetchedTupleObjs[0]);
			console.log('fetchedTupleObjs', fetchedTupleObjs[0]);
		}
		fetchdata();
		console.log('tupleObjs', tupleObjs);
	}, [])

	function putStudentId() {
		return tupleObjs.student_id;
	}
	function putStudentName() {
		return tupleObjs.student_name;
	}
	function putClassId() {
		return tupleObjs.class_id;
	}
	function putYear() {
		return tupleObjs.year;
	}
	function putMajorId() {
		return tupleObjs.major_id;
	}
	function putMajorName() {
		return tupleObjs.major_name;
	}
	function putDepartmentId() {
		return tupleObjs.department_id;
	}
	function putDepartmentName() {
		return tupleObjs.department_name;
	}
	function putCourseCnt() {
		return tupleObjs.course_cnt;
	}


	if (tupleObjs !== null) {
		return (
			<div>
				<div className='title'>
					<h2>Student Info</h2>
				</div>
				<div className="footnote">
					<p>Student Id : <strong>{putStudentId()}</strong> </p>
					<p>Student Name : <strong>{putStudentName()}</strong></p>
					<p>Class Id : <strong>{putClassId()}</strong></p>
					<p>Year : <strong>{putYear()}</strong></p>
					<p>Major Id : <strong>{putMajorId()}</strong></p>
					<p>Major Name : <strong>{putMajorName()}</strong></p>
					<p>Department Id : <strong>{putDepartmentId()}</strong></p>
					<p>Department Name : <strong>{putDepartmentName()}</strong></p>
					<p>Number of selected courses: <strong>{putCourseCnt()}</strong></p>
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

export default StudentInfoPage;