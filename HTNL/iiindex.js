const subjects = [
    ["Communicative English", "Engineering Chemistry", "Matrices and Calculus", "Engineering Physics", "Problem Solving Python Programming", "Heritage of Tamil", "Physics and Chemistry Lab", "Problem Solving Python Programming Lab", "Communicative English Lab"],
    ["Technical English", "Statistics and Numerical Methods", "Physics for Computer Science Engineers", "Engineering Graphics", "Programming in C", "Tamils and Technology", "Environmental Sciences and Sustainability", "NCC Credit Course Level 1", "Technical English Laboratory", "Programming in C Laboratory", "Engineering Practices Laboratory"],
    ["Digital Principles and Computer Organization", "Foundations of Data Science", "Data Structures", "Object Oriented Programming", "Operating Systems", "Data Structures Laboratory", "Object Oriented Programming Laboratory", "Data Science Laboratory", "Quantitative Aptitude & Verbal Reasoning"],
    ["Software Engineering", "Design and Analysis of Algorithms", "Discrete Mathematics", "Database Management Systems", "Java Programming", "NCC Credit Course Level 2", "Database Management Systems Laboratory", "Java Programming Laboratory", "Quantitative Aptitude & Behavioural Skills"],
    ["Compiler Design", "Open Elective-I", "Mandatory Course-I", "Computer Networks", "Full Stack Programming", "Professional Elective-I", "Professional Elective-II", "Quantitative Aptitude & Communication Skills"],
    ["Mobile Computing", "Open Elective-II", "Mandatory Course-II", "NCC Credit Course Level 3", "Cryptography and Cyber Security", "Artificial Intelligence and Machine Learning", "Professional Elective-III", "Professional Elective-IV", "Mobile Application Development Lab", "Quantitative Aptitude & Soft Skills", "Mini Project"],
    ["Human Values and Ethics", "Elective Management", "Open Elective - III", "Professional Elective - V", "Professional Elective - VI", "Internship"],
    ["Project Work"]
];

const credits = [
    [3, 3, 4, 3, 3, 1, 2, 2, 1],
    [3, 4, 3, 4, 3, 1, 2, 2, 1, 2, 2],
    [4, 3, 3, 3, 4, 2, 2, 2, 1],
    [3, 4, 4, 3, 3, 3, 2, 2, 1],
    [4, 3, 0, 4, 4, 3, 3, 1],
    [3, 3, 0, 3, 4, 4, 3, 3, 2, 1, 2],
    [2, 3, 3, 3, 3, 1],
    [10]
];

const placeholderSubjects = ["Subject not available"];
const placeholderCredits = [0];

function generateGradeInputs() {
    const gradeInputsDiv = document.getElementById('grade-inputs');
    gradeInputsDiv.innerHTML = ''; // Clear previous inputs

    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    const isNCC = document.getElementById('isNCC').value === '1';

    if (numSemesters < 1 || numSemesters > 8) {
        // If the number of semesters is invalid, clear the inputs
        gradeInputsDiv.innerHTML = '<p>Please enter a valid number of semesters (1-8).</p>';
        return;
    }

    for (let i = 0; i < numSemesters; i++) {
        const semesterDiv = document.createElement('div');
        semesterDiv.classList.add('semester');
        semesterDiv.innerHTML = `<h3>Semester ${i + 1}</h3>`;

        // Use data from subjects and credits arrays or placeholders if not defined
        const currentSubjects = subjects[i] || placeholderSubjects;
        const currentCredits = credits[i] || placeholderCredits;

        currentSubjects.forEach((subject, j) => {
            if (!isNCC && subject.includes("NCC")) return;

            const subjectDiv = document.createElement('div');
            subjectDiv.classList.add('subject');

            subjectDiv.innerHTML = `
                <label>${subject} (CREDIT: ${currentCredits[j] || 0}):</label>
                <select id="grade-sem${i}-sub${j}">
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C+</option>
                    <option value="4">C</option>
                    <option value="0">U</option>
                </select>
            `;

            semesterDiv.appendChild(subjectDiv);
        });

        gradeInputsDiv.appendChild(semesterDiv);
    }
}

document.getElementById('numSemesters').addEventListener('input', generateGradeInputs);

document.getElementById('cgpa-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const numSemesters = parseInt(document.getElementById('numSemesters').value);
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < numSemesters; i++) {
        for (let j = 0; j < (subjects[i] || placeholderSubjects).length; j++) {
            const grade = document.getElementById(`grade-sem${i}-sub${j}`);
            if (grade) {
                const gradeValue = parseInt(grade.value);
                totalPoints += gradeValue * ((credits[i] || placeholderCredits)[j] || 0);
                totalCredits += ((credits[i] || placeholderCredits)[j] || 0);
            }
        }
    }

    const CGPA = (totalPoints / totalCredits).toFixed(2);
    document.getElementById('result').innerText = `${name}'s CGPA: ${CGPA}`;
});


