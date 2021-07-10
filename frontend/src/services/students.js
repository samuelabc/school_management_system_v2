import axios from 'axios';
const baseUrl = '/api/students';

const getAll = async() => {
	const response = await axios.get(baseUrl);
	return response.data;
}

const create = async(newStudent) => {
	const response = await axios.post(baseUrl, newStudent);
	console.log('response',response.data);
	return response.data;
}

const remove = async(id) => {
	console.log("remove",id);
	const response = await axios.delete(`${baseUrl}/${id}`);
	console.log("response.data",response.data)
	return response.data;
}

const update = async(oriStudentId, newStudent) => {
	console.log(oriStudentId);
	console.log(newStudent);
	const response = await axios.put(`${baseUrl}/${oriStudentId}`, newStudent);
	return response.data;
}

export default {
	getAll,
	create,
	remove,
	update,
}