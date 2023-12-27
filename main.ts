import inquirer from "inquirer";

interface StudentInfo {
    name: string;
    age: number;
    batch: number;
    group: string;
    rollNumber: number;
}

const studentInfo: StudentInfo[] = [
    {
        name: "John Doe",
        age: 18,
        batch: 2021,
        group: "Science",
        rollNumber: 1,
    },
];

const addStudent = async () => {
    const studentData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student name",
        },
        {
            type: "number",
            name: "age",
            message: "Enter student age",
        },
        {
            type: "number",
            name: "batch",
            message: "Enter student batch",
        },
        {
            type: "input",
            name: "group",
            message: "Enter student group",
        },
    ]);

    const newStudent: StudentInfo = {
        ...studentData,
        rollNumber: studentInfo.length + 1
    };
    studentInfo.push(newStudent);
    console.log("The student has been successfully added to the database.");
    console.log(newStudent);
};

const updateStudent = async () => {
    const studentData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter student name",
        },
        {
            type: "number",
            name: "age",
            message: "Enter student age",
        },
        {
            type: "number",
            name: "batch",
            message: "Enter student batch",
        },
        {
            type: "input",
            name: "group",
            message: "Enter student group",
        },
        {
            type: "number",
            name: "rollNumber",
            message: "Enter student roll number",
        },
    ]);

    const index = studentInfo.findIndex((student) => student.rollNumber === studentData.rollNumber);

    if (index !== -1) {
        studentInfo[index] = studentData;
        console.log("The student has been successfully updated in the database.");
        console.log(studentInfo[index]);
    } else {
        console.log("Student not found with the given roll number.");
    }
};

const deleteStudent = async () => {
    const studentData = await inquirer.prompt([
        {
            type: "number",
            name: "rollNumber",
            message: "Enter student roll number",
        },
    ]);

    const index = studentInfo.findIndex((student) => student.rollNumber === studentData.rollNumber);

    if (index !== -1) {
        studentInfo.splice(index, 1);
        console.log("The student has been successfully deleted from the database.");
    } else {
        console.log("Student not found with the given roll number.");
    }
}

const showStudent = () => {
    console.log("Student Database:");
    console.log(studentInfo);
};

const main = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: ["Show Student", "Add Student", "Update Student", "Delete Student", "Exit"],
        },
    ]);

    switch (choice) {
        case "Add Student":
            await addStudent();
            break;
        case "Update Student":
            await updateStudent();
            break;
        case "Delete Student":
            await deleteStudent();
            break;
        case "Show Student":
            showStudent();
            break;
        case "Exit":
            return;
    }

    await main();
};

main();