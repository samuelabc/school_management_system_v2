import React, { useEffect, useState } from 'react';
import Service from '../services/teachercourses'
import Table from './TeacherCourseTable'

const TeacherCoursePage = (props) => {
	const [teachingCourses, setTeachingCourses] = useState(null);
	const [studentTakenCourse, setStudentTakenCourse] = useState(null);
	const userId = props.userId;
	const userType = props.userType;
	const handleReturnHomePage = props.handleReturnHomePage;
	const [selectCourseId, setSelectCourseId] = useState();

	useEffect(() => {
		async function fetchTeachingCourses() {
			const fetchedTupleObjs = await Service.getTeachingCourses(userId);
			console.log('fetchedTupleObjs', fetchedTupleObjs);
			setTeachingCourses(fetchedTupleObjs);
			console.log('teachingCourses fetchedTupleObjs', teachingCourses, fetchedTupleObjs);
			return fetchedTupleObjs;
		}
		async function fetchStudentTakenCourse() {
			const fetchedTupleObjs1 = await fetchTeachingCourses();
			if (await fetchedTupleObjs1.length > 0) {
				const course_id = await fetchedTupleObjs1[0].course_id;
				setSelectCourseId(course_id);
				const fetchedTupleObjs2 = await Service.getStudentTakenCourse(course_id);
				setStudentTakenCourse(fetchedTupleObjs2);
				console.log('getStudentTakenCourse', fetchedTupleObjs2);
			}
		}
		fetchStudentTakenCourse();
	}, [])

	const handleUpdateTupleObj = async (oriTupleObjId1, oriTupleObjId2, tupleObj) => {
		try {
			console.log('tupleObj', tupleObj);
			await Service.update(oriTupleObjId1, oriTupleObjId2, tupleObj);
			const newTable = await studentTakenCourse.map(tuple => {
				if (tuple.course_id === oriTupleObjId1 && tuple.student_id === oriTupleObjId2){
					tuple.grade = tupleObj.grade;
				}
				return tuple;
			});
			console.log('newTable', newTable);
			setStudentTakenCourse(newTable);
			return true;
		}
		catch (err) {
			const message = JSON.parse(err.response.data.error)["sqlMessage"];
			window.alert(`update failed\nError: ${message}`);
			return false;
		}
	}
	async function handleStudentTakenCourse() {
		console.log('select option changed');
		const course_id = document.getElementById("selectcourse").value;
		setSelectCourseId(course_id);
		const fetchedTupleObjs = await Service.getStudentTakenCourse(course_id);
		setStudentTakenCourse(fetchedTupleObjs);
	}
	function putSelectCourseId() {
		return selectCourseId;
	}
	function printTeachingCourses() {
		console.log('printTeachingCourses',teachingCourses, studentTakenCourse);
		return (
			teachingCourses.map(course => {
				return (
				<li key={course.course_id}>{course.course_id} {course.course_name}, offered by department of {course.department_name}</li>
				)
			})
		)
	}
	function selectTeachingCourse() {
		return (
			teachingCourses.map(course => {
				return (
					<option key={course.course_id} value={course.course_id}>{course.course_id} {course.course_name}</option>
				)
			})
		)
	}
	if (teachingCourses !== null && studentTakenCourse !== null) {
		console.log(teachingCourses, studentTakenCourse);
		return (
			<div>
				<div className='title'>
					<h2>Teaching Courses</h2>
					<ul>{printTeachingCourses()}</ul>
				</div>
				<div>
					<strong className='footnote'>Select a course to see details below.</strong>
				</div>
				<div>
					<select id='selectcourse' className='selectcourse' onChange={handleStudentTakenCourse} >
						{selectTeachingCourse()}
					</select>
				</div>
				<div>
					<p className='footnote'>List of students taking {putSelectCourseId()}:</p>
					<Table courseId={selectCourseId} userId={userId} studentTakenCourse={studentTakenCourse} handleUpdateTupleObj={handleUpdateTupleObj} />
				</div>
				<div>
					<button onClick={() => handleReturnHomePage()} >return</button>
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				<div className='title'>
					<h2>Teaching Courses</h2>
				</div>
				<div className='footnote'>Currently no teaching courses.</div>
				<div>
					<button onClick={() => handleReturnHomePage()} >return</button>
				</div>
			</div>
		)
	}
}

export default TeacherCoursePage;