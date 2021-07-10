import React from 'react';

const HomePage = (props) => {
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
				<button onClick={() => handlePage('UsersPage')}>Users Info</button>
			</div>
			<div>
				<button onClick={() => handlePage('StudentsPage')}>Students Info</button>
				<button onClick={() => handlePage('TeachersPage')}>Teachers Info</button>
			</div>
			<div>
				<button onClick={() => handlePage('CoursePage')}>Course Catalog</button>
				<button onClick={() => handlePage('CourseSelectionPage')}>Course Selections</button>
			</div>
			<div>
				<button onClick={() => handlePage('DepartmentPage')}>Departments</button>
				<button onClick={() => handlePage('MajorPage')}>Majors</button>
				<button onClick={() => handlePage('ClassPage')}>Classes</button>
			</div>
		</div>
	);
}

export default HomePage;