document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form");
    const studentName = document.getElementById("student-name");
    const studentID = document.getElementById("student-id");
    const email = document.getElementById("email");
    const contactNumber = document.getElementById("contact-number");
    const tableBody = document.getElementById("table-body");
    let editIndex = null;

    // Load student records from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];
    displayStudents(students);

    // Add/Edit student
    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (studentName.value && studentID.value && email.value && contactNumber.value) {
            const studentData = {
                name: studentName.value,
                id: studentID.value,
                email: email.value,
                contact: contactNumber.value
            };

            if (editIndex === null) {
                students.push(studentData);
            } else {
                students[editIndex] = studentData;
                editIndex = null;
            }

            localStorage.setItem("students", JSON.stringify(students));
            displayStudents(students);
            clearForm();
        }
    });

    // Display student records
    function displayStudents(students) {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Clear form fields
    function clearForm() {
        studentName.value = "";
        studentID.value = "";
        email.value = "";
        contactNumber.value = "";
        document.getElementById("submit-btn").innerText = "Add Student";
    }

    // Edit student
    window.editStudent = function (index) {
        const student = students[index];
        studentName.value = student.name;
        studentID.value = student.id;
        email.value = student.email;
        contactNumber.value = student.contact;
        editIndex = index;
        document.getElementById("submit-btn").innerText = "Update Student";
    };

    // Delete student
    window.deleteStudent = function (index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents(students);
    };
});
