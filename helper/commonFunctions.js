const { db } = require("../database/admin");

const findUser = async (email) => {
  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((snapshot) => {
    //   console.log(users);

      let value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return value;
    });

 
};

module.exports = { findUser };
