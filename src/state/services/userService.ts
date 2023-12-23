import axios from "axios";
const url = process.env.NEXT_PUBLIC_API;

export const registerUserService = async (payload: any) => {
  console.log(payload);

  const response = await fetch(`${url}/Account/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response;
};

export const loginUserService = async (payload: any) => {
  console.log(payload);

  const response = await axios.post(`${url}/Account/login`, payload, {
    withCredentials: true,
  });
  console.log(response);

  return response;
};

export const logoutUserService = async () => {
  const response = await axios.post(
    `${url}/Account/logout`,
    {},
    {
      withCredentials: true,
    }
  );

  console.log(response);
  return response;
};
