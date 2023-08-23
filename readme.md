# GUVI Day 41 task - Student-Mentor Assigning using DB

Task Deployment URL: https://student-mentor-assigning-dmph.onrender.com/


for getting all mentor details : https://student-mentor-assigning-dmph.onrender.com/mentors


for getting all student details : https://student-mentor-assigning-dmph.onrender.com/students


1.To create the mentor: (post)

  sample data
  {
      "name":"Abi",
      "email":"abi@gmail.com",
      "course":"FSD"
  }
  
https://student-mentor-assigning-dmph.onrender.com/create-mentor


2. To create student: (post)
   
   sample data
   {
      "name":"Nyraa",
      "email":"nyraa@gmail.com",
      "batch":"b43wde",
      "course":"FSD"
  }

https://student-mentor-assigning-dmph.onrender.com/create-student


3. To assign a student to Mentor
   
  sample api endpoint
  https://student-mentor-assigning-dmph.onrender.com/assign-student/64b40acc3b54476aad36131e/64b40a813b54476aad361313

  https://student-mentor-assigning-dmph.onrender.com/assign-student/:mentorId/:studentId  
  

4. To Assign or Change Mentor for particular Student
   
   sample api endpoint
  https://student-mentor-assigning-dmph.onrender.com/change-mentor/64b40a813b54476aad361316/64b40dbe0de9820eb7ff8720

  https://student-mentor-assigning-dmph.onrender.com/change-mentor/:studentId/:mentorId
  

5. To show all students for a particular mentor
   
   sample api endpoint
   https://student-mentor-assigning-dmph.onrender.com/mentor/64b40acc3b54476aad36131a/studentList

   https://student-mentor-assigning-dmph.onrender.com/mentor/:mentorId/studentList
   

6. To show the previously assigned mentor for a particular student
   
   sample api endpoint
   https://student-mentor-assigning-dmph.onrender.com/previous-mentor/64b40a813b54476aad361312

   https://student-mentor-assigning-dmph.onrender.com/previous-mentor/:studentId


   
