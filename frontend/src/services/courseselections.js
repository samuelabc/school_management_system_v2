import axios from 'axios';
const baseUrl = '/api/courseselections';

const getAll = async() => {
	const response = await axios.get(baseUrl);
	return response.data;
}

const create = async(newCourseSelection) => {
	console.log(newCourseSelection);
	const response = await axios.post(baseUrl, newCourseSelection);
	console.log('response',response.data);
	return response.data;
}

const remove = async(course_id, student_id) => {
	console.log("remove",course_id, student_id);
	const response = await axios.delete(`${baseUrl}/${course_id}/${student_id}`);
	console.log("response.data",response.data)
	return response.data;
}

const update = async(oriCourseId, oriStudentId, newCourseSelection) => {
	console.log(oriCourseId);
	console.log(oriStudentId);
	console.log(newCourseSelection);
	const response = await axios.put(`${baseUrl}/${oriCourseId}/${oriStudentId}`, newCourseSelection);
	return response.data;
}

export default {
	getAll,
	create,
	remove,
	update,
}