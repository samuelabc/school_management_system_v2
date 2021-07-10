import axios from 'axios';
const baseUrl = '/api/logins';

const login = async(tupleObj) => {
	const response = await axios.post(baseUrl, tupleObj);
	console.log('response', response);
	return response.data;
}

export default {
	login
}