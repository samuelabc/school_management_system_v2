import React, {useEffect, useState} from 'react';
import Service from '../services/teacherinfos'

const TeacherInfoPage = (props) => {
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

	function putTeachertId() {
		return tupleObjs.teacher_id;
	}
	function putTeacherName() {
		return tupleObjs.teacher_name;
	}
	function putDepartmentId() {
		return tupleObjs.department_id;
	}
	function putDepartmentName() {
		return tupleObjs.department_name;
	}


	if (tupleObjs !== null) {
		return (
			<div>
				<div className='title'>
					<h2>Teacher Info</h2>
				</div>
				<div className="footnote">
					<p>Teacher Id : <strong>{putTeachertId()}</strong> </p>
					<p>Teacher Name : <strong>{putTeacherName()}</strong></p>
					<p>Department Id : <strong>{putDepartmentId()}</strong></p>
					<p>Department Name : <strong>{putDepartmentName()}</strong></p>
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

export default TeacherInfoPage;