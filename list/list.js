getAll();
function getAll() {
  fetch("http://localhost:3000/user/html")
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      let li = ``;
      console.log(json);
      // Loop through each data and add a table row
      let sno = 1;
      json.forEach((user) => {
        li += `
            <tr class="table-secondary">
                <td scope="row" style="width: 20px !important;  text-align: center">${sno++}</th>
                <td scope="row" style="width: 100px !important;  text-align: center">${
                  user.user_id
                }</th>
                <td scope="row" style="width: 100px !important;  text-align: center">${
                  user.time
                }</th>
                <td scope="row" style="width: 100px !important;  text-align: center">
                    <div style = "display: flex; justify-content: space-evenly;">
                        <i onClick="getPost(this)" class="fa fa-file" style="color:black; cursor: pointer; " id = "${
                          user.user_id
                        }"></i>
                        <i onClick="editPost(this)" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#form" style="color:black; cursor: pointer;" id = "${
                          user.user_id
                        }"></i>
                        <i onClick="deletePost(this)" class="fas fa-trash-alt" style="color:black; cursor: pointer;  " id = "${
                          user.user_id
                        }"></i>
                    </div>
                </td>
            </tr>
            `;
      });
      // Display result
      document.getElementById("users").innerHTML = li;
    });
}

let myModal = document.getElementById("my-modal-view");
let getPost = (e) => {
  console.log(e.getAttribute("id"));
  let userID = e.getAttribute("id");
  myModal.style.display = "block";

  let displayContent = document.getElementById("display-content");
  fetch(`http://localhost:3000/user/user_idhtml/${userID}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      displayContent.innerHTML = json.datahtml;
    });
};

function fetchbylocal(userID) {
  fetch(`http://localhost:3000/user/user_idhtml/${userID}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      return json.datahtml;
    });
}

// When the user clicks on <span> (x), close the modal-view
let modalCloseButton1 = document.getElementById("btn-close-view");
modalCloseButton1.onclick = function () {
  myModal.style.display = "none";
};

let myModalUpdate = document.getElementById("my-modal-update");
let editPost = (e) => {
  console.log(e.getAttribute("id"));
  let userID = e.getAttribute("id");
  myModalUpdate.style.display = "block";
  getContentFunc(userID);
};

// When the user clicks on <span> (x), close the modal-view
let modalCloseButton2 = document.getElementById("btn-close-update");
modalCloseButton2.onclick = function () {
  myModalUpdate.style.display = "none";
};

var quill = new Quill("#editor", {
  theme: "snow",
});

// making content visible to user
let getContentForm = document.getElementById("data-form");
const getContentId = document.getElementById("user-id");
function getContentFunc(userId) {
  console.log("button clicked");
  console.log(userId);
  let inputValue = userId;
  //getUser(inputValue);
  //localhost:3000/user/user_idhtml/
  http: fetch(`http://localhost:3000/user/user_idhtml/${inputValue}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      console.log(`userid ${userId} was printed`);
      console.log(json.user_id);
      //getUser(userId);
      quill.root.innerHTML = json.datahtml;
    });
}

// get content by id
const getUserDetails = document.getElementById("get-content-details");
function getUser(inputValue) {
  fetch(`http://localhost:3000/user/user_id/${inputValue}`)
    // Converting received data to JSON
    .then((response) => response.json())
    .then((json) => {
      // Create a variable to store HTML
      console.log(json);
      console.log(json.user_id);
      quill.root.innerHTML = json.data;
    });
}
