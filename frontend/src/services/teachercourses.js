import axios from 'axios';
const baseUrl = '/api/teachercourses';

const getTeachingCourses = async(teacher_id) => {
	console.log('teacher_id', teacher_id);
	const response = await axios.get(`${baseUrl}/${teacher_id}`);
	console.log('response', response);
	return response.data;
}

const getStudentTakenCourse = async(course_id) => {
	const response = await axios.get(`${baseUrl}/1/${course_id}`);
	console.log('response', response);
	return response.data[0];
}
const update = async(oriCourseId, oriStudentId, newCourseSelection) => {
	console.log(oriCourseId);
	console.log(oriStudentId);
	console.log(newCourseSelection);
	const response = await axios.put(`${baseUrl}/${oriCourseId}/${oriStudentId}`, newCourseSelection);
	return response.data;
}

export default {
	getTeachingCourses,
	getStudentTakenCourse,
	update
}