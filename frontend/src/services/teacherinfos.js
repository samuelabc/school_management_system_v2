import axios from 'axios';
const baseUrl = '/api/teacherinfos';

const getAll = async(user_id) => {
	console.log('user_id', user_id);
	console.log('get teacherinfo')
	const response = await axios.get(`${baseUrl}/${user_id}`);
	console.log('response', response);
	return response.data[0];
}

export default {
	getAll
}