var quill = new Quill('#editor', {
    theme: 'snow'
  });

// making content visible to user
let getContentForm = document.getElementById("data-form");
const getContentId = document.getElementById("user-id");
function getContentFunc () {
  console.log("button clicked");
  console.log(getContentId.value);
  let inputValue = getContentId.value;
  fetch(`http://localhost:3000/user/user_id/${inputValue}`)
   // Converting received data to JSON
   .then((response) => response.json())
   .then((json) => {
     // Create a variable to store HTML
       contentid = json[0]._id;
       console.log(`userid ${contentid} was printed`)
       getUser(contentid);
     }); 
};
  
  
   
// get content by id 
const getUserDetails = document.getElementById("get-content-details");
function getUser(inputValue) {
    fetch(`http://localhost:3000/user/${inputValue}`)
      // Converting received data to JSON
      .then((response) => response.json())
      .then((json) => {
        // Create a variable to store HTML
        console.log(json);
        console.log(json.user_id);
        quill.root.innerHTML = json.data;
      });
  }



// // update
// function writeFile(fileName, data){
//     fs.writeFile(
//       `./html-files/${fileName}.html`,
//       `${data}`,
//       function (err) {
//         if (err) {
//         return console.error(err);
//         }
      
//         // If no error the remaining code executes
//         console.log(" Finished writing ");
//         console.log("Reading the data that's written");
      
//         // Reading the file
//         fs.readFile(`./${fileName}.html`, function (err, data) {
//         if (err) {
//           return console.error(err);
//         }
//         console.log("Data read : " + data.toString());
//         });
//       }
//       );
//   }
  
// let dataForm = document.getElementById("data-form");
//  dataForm.addEventListener("submit", (e) => {
//    e.preventDefault();
//    let user = document.getElementById("user-id");
//    let userId = user.value;
//    console.log(userId);
//    let data = quill.root.innerHTML;
//    fetch(`http://localhost:3000/user/`, {
//             method: 'PATCH',
//             body: JSON.stringify({
//               user_id : `${userId}`,
//               data : `${data}`
//             }),
//             headers: {
//               'Content-type': 'application/json; charset=UTF-8',
//             },
//           })
//             // Converting received data to JSON
//             .then((response) => response.json())
//             .then((json) => {
//               // Create a variable to store HTML
//               console.log(json.message);
//               // updateMessage.innerHTML = `<p>${json.message}<p>`;
//             });

//  });






// //  get user by email request using fetch() 
// let updateForm = document.getElementById("get-update-form");
// const getUserEmail = document.getElementById("get-user-email");
//  updateForm.addEventListener("submit", (e) => {
//    e.preventDefault();
//    console.log("button clicked");
//    console.log(getUserEmail.value);
//    let inputValue = getUserEmail.value;
//    fetch(`http://localhost:3000/user/email/${inputValue}`)
//     // Converting received data to JSON
//     .then((response) => response.json())
//     .then((json) => {
//       // Create a variable to store HTML
//         userid = json[0]._id;
//         console.log(userid);
//         updateUser(userid);
//         console.log(`userid ${userid} was printed`)
//       });
//  });





// // updating existing user
// function updateUser(userID){
//       console.log(`${userID} please print this`);
//       let userId = userID;
//       let email = document.getElementById("get-user-email");
//       let firstName = document.getElementById("firstName");
//       let lastName = document.getElementById("lastName");
//       let phone = document.getElementById("phone");
//       let updateMessage = document.getElementById("form-message");
//       if (userId.value == "" || email.value == "") {
//         updateMessage.innerHTML = 'User Id and email cannot be null';
//         // throw error
//       } else {
//         // perform operation with form input
//         console.log(userId +" "+ email.value+" "+ firstName.value+" "+lastName.value+" "+phone.value+" ");
//         updateUser();
//         function updateUser() {
//           fetch(`http://localhost:3000/user/${userId}`, {
//             method: 'PATCH',
//             body: JSON.stringify({
//               email: `${email.value}`,
//               firstName : `${firstName.value}`,
//               lastName : `${lastName.value}`,
//               phone : `${phone.value}`
//             }),
//             headers: {
//               'Content-type': 'application/json; charset=UTF-8',
//             },
//           })
//             // Converting received data to JSON
//             .then((response) => response.json())
//             .then((json) => {
//               // Create a variable to store HTML
//               console.log(json.message);
//               updateMessage.innerHTML = `<p>${json.message}<p>`;
//             });
//         }
//       }
// };
  
  