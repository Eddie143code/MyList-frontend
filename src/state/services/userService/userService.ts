import axios from "axios";
export const registerUserService = async (payload: any) => {
  const yo = {
    Email: "yo@gmail.com",
    Password: "Momo@11",
    // ... other properties from your payload if needed
  };
  const response = await axios.post(
    "http://localhost:8080/api/Account/login",
    yo
  );
  console.log(response);
};
