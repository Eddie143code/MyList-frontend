import axios from "axios";
const url = process.env.NEXT_PUBLIC_API;

export const fetchAllLists = async () => {
  const response = await fetch("https://localhost:7284/api/MyList", {
    method: "GET",
    credentials: "include", // include cookies
  });

  const data = await response.json();
  return data;
};

export const createList = async (req: any) => {
  const requestOptions: any = {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };

  const response: any = await fetch(
    "https://localhost:7284/api/MyList",
    requestOptions
  );

  return response;
};

export const deleteExistingList = async (req: any) => {
  const requestOptions: any = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  };
  console.log(req);

  const response: any = await fetch(
    `https://localhost:7284/api/MyList/${req}`,
    requestOptions
  );

  return response;
};
