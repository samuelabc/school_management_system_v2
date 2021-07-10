import axios from 'axios';
const baseUrl = '/api/studentcoursecatalogs';

const getAll = async(user_id) => {
	console.log('user_id', user_id);
	const response = await axios.get(`${baseUrl}/${user_id}`);
	console.log('response', response);
	return response.data[0];
}

const create = async(newTupleObj) => {
	const response = await axios.post(baseUrl, newTupleObj);
	console.log('response',response.data);
	return response.data;
}

export default {
	getAll,
	create
}