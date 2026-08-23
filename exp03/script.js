let a = 10, b = 5;
const name = "Mohammed Ufraan";

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Comparison:", a > b, a === b);
console.log("Logical:", a > 5 && b < 10);

let score = 85;

if (score >= 90)
    console.log("Grade: A");
else if (score >= 75)
    console.log("Grade: B");
else if (score >= 60)
    console.log("Grade: C");
else
    console.log("Grade: F");

let grade = "B";

switch (grade) {
    case "A": console.log("Excellent"); break;
    case "B": console.log("Very Good"); break;
    case "C": console.log("Good"); break;
    default: console.log("Needs Improvement");
}

for (let i = 1; i <= 5; i++)
    console.log("For:", i);

let i = 1;
while (i <= 5) {
    console.log("While:", i);
    i++;
}

let projects = ["Holo", "Copia", "Jpeg Go"];

projects.push("Toraje");
console.log("After push:", projects);

projects.pop();
console.log("After pop:", projects);

let upperProjects = projects.map(project => project.toUpperCase());
console.log("Map:", upperProjects);

let filteredProjects = projects.filter(project => project.length > 5);
console.log("Filter:", filteredProjects);

projects.forEach(project => console.log("Project:", project));

function average(a, b, c) {
    return (a + b + c) / 3;
}

const averageArrow = (a, b, c) => (a + b + c) / 3;

console.log("Average:", average(4, 5, 4));
console.log("Arrow Average:", averageArrow(4, 5, 4));

let text = "  Mohammed Ufraan  ";

console.log("Concatenation:", "Hello, " + name);
console.log(`Template Literal: Welcome, ${name}`);
console.log("Trim:", text.trim());
console.log("Uppercase:", text.toUpperCase());
console.log("Split:", text.trim().split(" "));
console.log("Slice:", text.trim().slice(0, 15));

const skills = [
    { name: "Go", rating: 5 },
    { name: "TypeScript", rating: 5 },
    { name: "Java", rating: 4 },
    { name: "C++", rating: 4 }
];

skills.forEach(skill => {
    console.log(`${skill.name}: ${skill.rating}/5`);
});