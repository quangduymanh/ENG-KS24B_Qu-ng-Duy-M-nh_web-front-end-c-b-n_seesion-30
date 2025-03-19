let courses = [
    { id: 1, name: "Lập trình JavaScript", instructor: "Nguyễn Văn A", students: [] },
    { id: 2, name: "Lập trình Python", instructor: "Trần Thị B", students: [] }
];
let users = [
    { id: 1, name: "Học viên 1", registeredCourses: [] },
    { id: 2, name: "Học viên 2", registeredCourses: [] }
];
function addCourse() {
    let id = courses.length + 1;
    let name = prompt("Nhập tên khóa học:");
    let instructor = prompt("Nhập tên giảng viên:");

    if (!name || !instructor) {
        alert("Thông tin không hợp lệ!");
        return;
    }

    courses.push({ id, name, instructor, students: [] });
    alert(`Đã thêm khóa học: ${name}`);
}

function searchCourse() {
    let keyword = prompt("Nhập tên khóa học cần tìm:");
    let foundCourses = courses.filter(course => course.name.toLowerCase().includes(keyword.toLowerCase()));

    if (foundCourses.length === 0) {
        alert("Không tìm thấy khóa học!");
    } else {
        console.log("Kết quả tìm kiếm:");
        console.log(foundCourses);
    }
}

function deleteCourse() {
    let id = parseInt(prompt("Nhập ID khóa học cần xóa:"));
    let index = courses.findIndex(course => course.id === id);

    if (index === -1) {
        alert("Không tìm thấy khóa học!");
        return;
    }

    let courseName = courses[index].name;
    courses.splice(index, 1);
    users.forEach(user => {
        user.registeredCourses = user.registeredCourses.filter(courseId => courseId !== id);
    });

    alert(`Đã xóa khóa học: ${courseName}`);
}
function addUser() {
    let id = users.length + 1;
    let name = prompt("Nhập tên người dùng:");

    if (!name) {
        alert("Tên không hợp lệ!");
        return;
    }

    users.push({ id, name, registeredCourses: [] });
    alert(`Đã thêm người dùng: ${name}`);
}

function registerCourse() {
    let userId = parseInt(prompt("Nhập ID người dùng:"));
    let courseId = parseInt(prompt("Nhập ID khóa học muốn đăng ký:"));

    let user = users.find(u => u.id === userId);
    let course = courses.find(c => c.id === courseId);

    if (!user || !course) {
        alert("Người dùng hoặc khóa học không tồn tại!");
        return;
    }

    if (user.registeredCourses.includes(courseId)) {
        alert("Bạn đã đăng ký khóa học này rồi!");
        return;
    }

    user.registeredCourses.push(courseId);
    course.students.push(userId);

    alert(`${user.name} đã đăng ký khóa học: ${course.name}`);
}

function unregisterCourse() {
    let userId = parseInt(prompt("Nhập ID người dùng:"));
    let courseId = parseInt(prompt("Nhập ID khóa học muốn hủy đăng ký:"));

    let user = users.find(u => u.id === userId);
    let course = courses.find(c => c.id === courseId);

    if (!user || !course || !user.registeredCourses.includes(courseId)) {
        alert("Người dùng chưa đăng ký khóa học này!");
        return;
    }

    user.registeredCourses = user.registeredCourses.filter(id => id !== courseId);
    course.students = course.students.filter(id => id !== userId);

    alert(`${user.name} đã hủy đăng ký khóa học: ${course.name}`);
}

function showUserCourses() {
    let userId = parseInt(prompt("Nhập ID người dùng:"));
    let user = users.find(u => u.id === userId);

    if (!user) {
        alert("Không tìm thấy người dùng!");
        return;
    }

    let userCourses = courses.filter(course => user.registeredCourses.includes(course.id));

    console.log(`Danh sách khóa học của ${user.name}:`);
    console.log(userCourses);
}
function mainMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "1. Quản lý khóa học\n" +
            "2. Quản lý người dùng\n" +
            "3. Thoát"
        ));

        switch (choice) {
            case 1: courseMenu(); break;
            case 2: userMenu(); break;
            case 3: alert("Thoát chương trình"); return;
            default: alert("Lựa chọn không hợp lệ!");
        }
    }
}

function courseMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "--Quản lý khóa học--:\n" +
            "1. Thêm khóa học\n" +
            "2. Tìm kiếm khóa học\n" +
            "3. Xóa khóa học\n" +
            "4. Quay lại"
        ));

        switch (choice) {
            case 1: addCourse(); break;
            case 2: searchCourse(); break;
            case 3: deleteCourse(); break;
            case 4: return;
            default: alert("Lựa chọn không hợp lệ");
        }
    }
}

function userMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "1. Thêm người dùng\n" +
            "2. Đăng ký khóa học\n" +
            "3. Hủy đăng ký khóa học\n" +
            "4. Hiển thị danh sách khóa học của người dùng\n" +
            "5. Quay lại"
        ));

        switch (choice) {
            case 1: addUser(); break;
            case 2: registerCourse(); break;
            case 3: unregisterCourse(); break;
            case 4: showUserCourses(); break;
            case 5: return;
            default: alert("Lựa chọn không hợp lệ!");
        }
    }
}
mainMenu();
