import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;

export const registerUserService = async (payload: any) => {
  console.log(payload);

  const response = await axios.post(`${url}/Account/register`, payload);
  return response;
};

export const loginUserService = async (payload: any) => {
  console.log(payload);

  const response = await axios.post(`${url}/Account/login`, payload);
  console.log(response);

  return response;
};
