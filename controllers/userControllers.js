const { db } = require("../database/admin");

const usersRef = db.collection("users");

exports.actionUser = (req, res) => {
  let { email, name, mobileNumber, dob, city, sendSMS } = req.body;
  try {
    usersRef
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return res.send("User not exists");
        } else {
          usersRef
            .doc(snapshot.docs[0].id)
            .update({ name, mobileNumber, dob, city, sendSMS });
          return res.status(200).json({
            isDataSaved: true,
            message: "Successfully saved the user Details",
          });
        }
      });
  } catch (error) {
    return res.send(error);
  }
};
