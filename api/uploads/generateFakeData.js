const { faker } = require("@faker-js/faker");
const xlsx = require("xlsx");
const fs = require("fs");

// Generate fake student data
const generateFakeData = (numRecords) => {
  const data = [];

  for (let i = 0; i < numRecords; i++) {
    data.push({
      name: faker.person.firstName(), // Updated method for firstName
      lastName: faker.person.lastName(), // Updated method for lastName
      cin: faker.string.alphanumeric(8), // Correct method for alphanumeric string
      numInscription: faker.string.alphanumeric(6), // Correct method for alphanumeric string
      fieldOfStudy: faker.lorem.word(), // Using lorem for word generation
      department: faker.lorem.word(), // Using lorem for department word generation
    });
  }

  return data;
};

// Create an Excel sheet
const createExcelSheet = (data) => {
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Students");

  // Write to file
  const filePath = "./fake_students.xlsx";
  xlsx.writeFile(wb, filePath);
  console.log(`Excel file created: ${filePath}`);
};

// Generate and save 100 fake student records
const fakeData = generateFakeData(100);
createExcelSheet(fakeData);
