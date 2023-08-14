db.submissions.insertMany([
   {
     name: "John Doe",
     rollno: "12345",
     title: "Assignment 1",
     date: "2023-08-10",
     time: "14:00",
     file: "assignment1.pdf"
   },
   {
     name: "Jane Smith",
     rollno: "54321",
     title: "Assignment 2",
     date: "2023-08-15",
     time: "16:30",
     file: "assignment2.pdf"
   }
 ]);
 
 db.assignments.insertMany([
   {
     title: "Project Proposal",
     description: "Write a proposal for your project.",
     date: "2023-08-05",
     time: "10:00",
     marks: "20",
     status: true
   },
   {
     title: "Final Exam",
     description: "Prepare for the final exam.",
     date: "2023-09-20",
     time: "09:00",
     marks: "100",
     status: false
   }
 ]);
 