let students = [];

function getStudents() {
    return students;
}

function createStudent(student) {
    // take the student and store it in our array
    students.push(student);

    // in a real project we might save the data in a database here
}

module.exports = {createStudent, getStudents}