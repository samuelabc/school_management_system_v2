import axios from 'axios';
const baseUrl = '/api/changepasswords';

const changePassword = async(tupleObj) => {
	console.log(tupleObj);
	const response = await axios.post(baseUrl, tupleObj);
	console.log('response', response);
	return response.data;
}

export default {
	changePassword
}