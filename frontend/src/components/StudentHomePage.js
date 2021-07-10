import React from 'react';

const StudentHomePage = (props) => {
	const handlePage = props.handlePage;
	const handleLogOut = props.handleLogOut;
	const handleChangePassword = props.handleChangePassword;
	const userId = props.userId;
	const userType = props.userType;
	function putUserId() {
		return userId;
	}
	function putUserType() {
		return userType;
	}
	return (
		<div>
			<div className='title'>
				<h1>School Management System</h1>
			</div>
			<div className="footnote">
				<p>Welcome, <strong>{putUserId()}</strong> 
					<button onClick={() => handleLogOut()}>Log Out</button>
					<button onClick={() => handleChangePassword()}>Change Password</button>
				</p>
				<p>Your role is: <strong>{putUserType()}</strong> </p>
				
			</div>
			<div>
				<button onClick={() => handlePage('StudentInfoPage')}>Student Info</button>
			</div>
			<div>
				<button onClick={() => handlePage('StudentSelectedCoursePage')}>Selected Courses</button>
			</div>
			<div>
				<button onClick={() => handlePage('StudentCourseCatalogPage')}>Courses Catalog</button>
			</div>
		</div>
	);
}

export default StudentHomePage;