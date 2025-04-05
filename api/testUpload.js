const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function testUpload() {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream("./uploads/fake_students.xlsx"));

    const response = await axios.post(
      "http://localhost:5000/api/upload",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

testUpload();
