import axios from "axios";
const url = process.env.NEXT_PUBLIC_API;

export const fetchAllLists = async () => {
  const response = await fetch(`${url}/MyList`, {
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

  const response: any = await fetch(`${url}/MyList`, requestOptions);
  const data = await response.json();
  console.log(data);

  return data;
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
  //console.log(req);

  const response: any = await fetch(`${url}/MyList/${req}`, requestOptions);

  const data = await response.json();
  console.log(data);

  return data;
};

export const editExistingList = async (req: any) => {
  const requestOptions: any = {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name: req.Name }),
  };

  const response: any = await fetch(
    `${url}/MyList/${req.myListId}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);

  return data;
};
