import React, {useState} from 'react';
import CoursePage from './components/CoursePage';
import FootNote from './components/FootNote';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import StudentsPage from './components/StudentsPage';
import TeachersPage from './components/TeachersPage';
import DepartmentPage from './components/DepartmentPage';
import MajorPage from './components/MajorPage';
import ClassPage from './components/ClassPage';
import CourseSelectionPage from './components/CourseSelectionPage';
import LoginPage from './components/LoginPage';
import StudentHomePage from './components/StudentHomePage';
import StudentInfoPage from './components/StudentInfoPage';
import StudentSelectedCoursePage from './components/StudentSelectedCoursePage';
import StudentCourseCatalogPage from './components/StudentCourseCatalogPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import TeacherHomePage from './components/TeacherHomePage';
import TeacherInfoPage from './components/TeacherInfoPage';
import TeacherCoursePage from './components/TeacherCoursePage';

const App = () => {
	const [page, setPage] = useState('HomePage');
	const [users, setUsers] = useState([]);
	const [students, setStudents] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [courses, setCourses] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [majors, setMajors] = useState([]);
	const [classes, setClasses] = useState([]);
	const [courseselections, setCourseSelections] = useState([]);
	const [userId, setUserId] = useState('');
	const [userType, setUserType] = useState('');

	const handlePage = async(newpage) => {
		await setPage(newpage);
	}
	const handleReturnHomePage = async() => {
		await setPage('HomePage');
	}
	const handleLogOut = async() => {
		await setUserId('');
		await setUserType('');
	}
	const handleChangePassword = async() => {
		setPage("ChangePasswordPage");
	}

	if (userId === '') {
		return (
			<div>
				<LoginPage setUserId={setUserId} setUserType={setUserType} />
				<FootNote />
			</div>
		);
	}
	else if (page === "ChangePasswordPage") {
		return (
			<div>
				<ChangePasswordPage setPage={setPage} handleReturnHomePage={handleReturnHomePage}
					handlePage={handlePage} handleLogOut={handleLogOut}
					userId={userId} userType={userType} />
				<FootNote />
			</div>
		);
	}
	else if (userType === 'teacher') {
		if (page === 'HomePage') {
			return (
				<div>
					<TeacherHomePage handlePage={handlePage} handleLogOut={handleLogOut}
						userId={userId} userType={userType} 
						handleChangePassword={handleChangePassword} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'TeacherInfoPage') {
			return (
				<div>
					<TeacherInfoPage handleReturnHomePage={handleReturnHomePage} 
						userId={userId} userType={userType} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'TeacherCoursePage') {
			return (
				<div>
					<TeacherCoursePage handleReturnHomePage={handleReturnHomePage} 
						userId={userId} userType={userType} />
					<FootNote />
				</div>
			);
		}
	}
	else if(userType === 'student') {
		if (page === 'HomePage') {
			return (
				<div>
					<StudentHomePage handlePage={handlePage} handleLogOut={handleLogOut}
						userId={userId} userType={userType} 
						handleChangePassword={handleChangePassword} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'StudentInfoPage') {
			return (
				<div>
					<StudentInfoPage handleReturnHomePage={handleReturnHomePage} 
						userId={userId} userType={userType} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'StudentSelectedCoursePage') {
			return (
				<div>
					<StudentSelectedCoursePage handleReturnHomePage={handleReturnHomePage} 
						userId={userId} userType={userType} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'StudentCourseCatalogPage') {
			return (
				<div>
					<StudentCourseCatalogPage handleReturnHomePage={handleReturnHomePage} 
						 userId={userId} userType={userType} />
					<FootNote />
				</div>
			);
		}
	}
	else if (userType === 'admin') {
		if (page === 'HomePage') {
			return (
				<div>
					<HomePage handlePage={handlePage} handleLogOut={handleLogOut}
						userId={userId} userType={userType} 
						handleChangePassword={handleChangePassword} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'UsersPage') {
			return (
				<div>
					<UserPage handleReturnHomePage={handleReturnHomePage} 
						tupleObjs={users} setTupleObjs={setUsers} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'StudentsPage') {
			return (
				<div>
					<StudentsPage handleReturnHomePage={handleReturnHomePage} 
						students={students} setStudents={setStudents} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'TeachersPage') {
			return (
				<div>
					<TeachersPage handleReturnHomePage={handleReturnHomePage}
						teachers={teachers} setTeachers={setTeachers} />
					<FootNote />
				</div>
				);
		}
		else if (page === 'CoursePage') {
			return (
				<div>
					<CoursePage handleReturnHomePage={handleReturnHomePage} 
						courses={courses} setCourses={setCourses} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'DepartmentPage') {
			return (
				<div>
					<DepartmentPage handleReturnHomePage={handleReturnHomePage} 
						tupleObjs={departments} setTupleObjs={setDepartments} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'MajorPage') {
			return (
				<div>
					<MajorPage handleReturnHomePage={handleReturnHomePage} 
						tupleObjs={majors} setTupleObjs={setMajors} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'ClassPage') {
			return (
				<div>
					<ClassPage handleReturnHomePage={handleReturnHomePage} 
						tupleObjs={classes} setTupleObjs={setClasses} />
					<FootNote />
				</div>
			);
		}
		else if (page === 'CourseSelectionPage') {
			return (
				<div>
					<CourseSelectionPage handleReturnHomePage={handleReturnHomePage} 
						tupleObjs={courseselections} setTupleObjs={setCourseSelections} />
					<FootNote />
				</div>
			);
		}
	}
}

export default App;