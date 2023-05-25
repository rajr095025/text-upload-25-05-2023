const UserModel = require("../model/user");
var fs = require("fs");

// create a text content inside a database
exports.create = async (req, res) => {
  if (!req.body.user_id && !req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
  } else {
    write(req.body.user_id, req.body.data);
  }
  const user = new UserModel({
    user_id: req.body.user_id,
    data: req.body.data,
    time: req.body.time,
  });

  await user
    .save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

function write(fileName, data) {
  fs.writeFile(`./html-files/${fileName}.html`, `${data}`, function (err) {
    if (err) {
      return console.error(err);
    }

    // If no error the remaining code executes
    console.log(" Finished writing ");
    console.log("Reading the data that's written");

    // Reading the file
    fs.readFile(`./html-files/${fileName}.html`, function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log("Data read : " + data.toString());
    });
  });
}

// function to get all data
exports.findAll = async (req, res) => {
  try {
    const user = await UserModel.find();
    console.log(typeof user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to get all data
exports.findAllHtml = async (req, res) => {
  try {
    //const users = await UserModel.find();
    const users = await UserModel.find().lean();
    const updatedData = await Promise.all(
      users.map(async (obj) => {
        try {
          const data = await fs.promises.readFile(
            `./html-files/${obj.user_id}.html`
          );

          console.log("Read data: " + data.toString());

          return {
            ...obj,
            datahtml: data.toString(), // Replace "value" with the desired value for the new property
          };
        } catch (err) {
          console.error(err);
        }
      })
    );

    console.log(updatedData);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*
  In this updated code, Promise.all() is used to await all the promises returned by the map() function. This ensures that the updatedData variable contains the resolved values of all the promises, including the new property added to each inner object.
  
  Please note that the new property datahtml in the code snippet is assigned a static value ("value"). You should replace it with the desired value or modify the code accordingly to assign the actual value based on your requirements.
  
  */

/*
exports.findAllHtml = async (req, res) => {
    try {

        const user = await UserModel.find();
        const updatedData = user.map(async obj => {
            try {
                const data = await fs.promises.readFile(`./html-files/${obj.user_id}.html`);
                //let tempUser = {};
                
                
                console.log("written data: " + data.toString());

                return {
                    ...obj,
                    datahtml : "value" // Replace "value" with the desired value for the new property
                  };
                
                  
            } catch (err) {
                console.error(err);
            }
            
          });
        console.log(updatedData);
        res.status(200).json(updatedData);
    } catch(error) {
        res.status(404).json({message: error.message});
    }


    /*
    try {
        const user = await UserModel.find();
        //let userList = {};
        for (const temp of user) {
          console.log(temp.user_id);
          try {
            const data = await fs.promises.readFile(`./html-files/${temp.user_id}.html`);
            //let tempUser = {};

            const updatedData = data.map(obj => {
                return {
                  ...obj,
                  newProperty: "value" // Replace "value" with the desired value for the new property
                };
              });

            temp["datahtml"] = data.toString();
            //userList.push(tempUser);
            console.log("written data: " + data.toString());
          } catch (err) {
            console.error(err);
          }
        }
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
    */

/*
    try {
        const user = await UserModel.find();
        let userList = {};
        console.log("inside try block");
        //console.log(user);
        for(temp of user){
            console.log(temp.user_id);
            fs.readFile(`./html-files/${temp.user_id}.html`, function (err, data) {
                if (err) {
                    return console.error(err);
                }
                else{
                    //console.log("Data read : " + data.toString());
                    userList[temp.user_id] = (data.toString());
                    console.log(" writed data "+data.toString());
                }
                });
        }
        console.log(userList);
        res.status(200).json(userList);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
    */
/*
};

*/

// Find a single User with an email
exports.findOneContent = async (req, res) => {
  try {
    const user = await UserModel.find({ user_id: req.params.user_id });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single User with an email
exports.findOneContenthtml = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      user_id: req.params.user_id,
    }).lean();

    try {
      const data = await fs.promises.readFile(
        `./html-files/${req.params.user_id}.html`
      );
      user.datahtml = data.toString();
      console.log(user);
    } catch (err) {
      console.error(err);
    }

    console.log(user.datahtml);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*
exports.findOneContenthtml = async (req, res) => {
    try {
        const user = await UserModel.find(
            {user_id: req.params.user_id}
        )
        try{
            let reqid = req.params.user_id; 
            console.log("inside try " + reqid);
            const data = await fs.promises.readFile(`./html-files/${reqid}.html`);
            user.datahtml = data.toString();
            //console.log("Read data: " + data.toString());
            console.log(user);

        } catch (err) {
          console.error(err);
        }
        console.log(user.datahtml);
        let ans = user;
        res.status(200).json(ans);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
*/

// try {
//             const data = await fs.promises.readFile(`./html-files/${obj.user_id}.html`);
//             user.datahtml = data;
//             //console.log("Read data: " + data.toString());
//             console.log(data);
//             /*
//             return {
//               ...obj,
//               datahtml: data.toString() // Replace "value" with the desired value for the new property
//             };
//             */
//           }

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  console.log(req.param.user_id);
  let userfromdb = await UserModel.findOne({
    user_id: req.params.user_id,
  }).lean();

  if (!userfromdb) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const user_id = req.params.user_id;

  if (!userfromdb.user_id && !req.body.data) {
    res.status(400).send({ message: "Content can not be empty!" });
  } else {
    write(req.body.user_id, req.body.data);
    userfromdb.data = req.body.data;
    console.log(userfromdb.data);
  }
  /*
  const user = new UserModel({
    user_id: req.body.user_id,
    data: req.body.data,
    time: req.body.time,
  });
  */

  await UserModel.findByIdAndUpdate(user_id, userfromdb, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User not found.`,
        });
      } else {
        res.send({ message: "User updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });

  //   await user
  //     .save()
  //     .then((data) => {
  //       res.send({
  //         message: "User created successfully!!",
  //         user: data,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while creating user",
  //       });
  //     });
};
