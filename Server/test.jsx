import { createInterface } from "readline";
import { compare } from "bcrypt";
// let passHint = "rootadmin@Farmit";
hashedPassword = "$2b$10$jNyhCXcTmWzR4Dw052ocVuTYjtWqPmuvXrB93Re/9PGMnkh.JoRKK";
admin_Id = 202103103510508;

// const convertToHash = async (pass) => {
//   const salt = await bcrypt.genSalt(10);
//   let newSecPassword = await bcrypt.hash(pass, salt);
//   return newSecPassword;
// };
// secPassword(password).then((hashedPassword) => {
//   let hash = hashedPassword;
//   console.log(hash);
// });
// let checkPass = await convertToHash(password);
// console.log(checkPass);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the Id: ", (Id) => {
  console.log(`Id: ${Id}`);

  rl.question("Enter the Password: ", (Password) => {
    console.log(`Password: ${Password}`);

    validate(Id, Password);
    rl.close();
  });
});

const validate = async (Id, password) => {
  try {
    if (Id == admin_Id) {
      const match = await compare(password, hashedPassword);
      if (match) {
        console.log(`Authentication successful`);
      } else {
        console.log("Invalid Password");
      }
    } else {
      console.log("Invalid Id");
    }
  } catch (error) {
    console.error("Error during validation:", error.message);
  }
};

// // Handle close event
// rl.on("close", () => {
//   console.log("Thank you for using the program.");
//   process.exit(0);
// });
