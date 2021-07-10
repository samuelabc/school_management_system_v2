import axios from 'axios';
const baseUrl = '/api/studentselectedcourses';

const getAll = async(user_id) => {
	console.log('user_id', user_id);
	const response = await axios.get(`${baseUrl}/${user_id}`);
	console.log('response', response);
	return response.data[0];
}

const remove = async(course_id, student_id) => {
	console.log("remove",course_id, student_id);
	const response = await axios.delete(`${baseUrl}/${course_id}/${student_id}`);
	console.log("response.data",response.data)
	return response.data;
}

export default {
	getAll,
	remove
}