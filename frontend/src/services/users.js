import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async() => {
	console.log('get users')
	const response = await axios.get(baseUrl);
	return response.data;
}

const create = async(newTupleObj) => {
	const response = await axios.post(baseUrl, newTupleObj);
	console.log('response',response.data);
	return response.data;
}

const remove = async(id) => {
	console.log("remove",id);
	const response = await axios.delete(`${baseUrl}/${id}`);
	console.log("response.data",response.data)
	return response.data;
}

const update = async(oriTupleObjId, newTupleObj) => {
	console.log(oriTupleObjId);
	console.log(newTupleObj);
	const response = await axios.put(`${baseUrl}/${oriTupleObjId}`, newTupleObj);
	return response.data;
}

export default {
	getAll,
	create,
	remove,
	update,
}