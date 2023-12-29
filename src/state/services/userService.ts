import axios from "axios";
const url = process.env.NEXT_PUBLIC_API;

export const registerUserService = async (payload: any) => {
  console.log("in registerUser: ", payload);

  const response = await fetch(`${url}/Account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const loginUserService = async (payload: any) => {
  console.log(payload);

  const response = await fetch(`${url}/Account/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response;
  }
  throw Error;
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
