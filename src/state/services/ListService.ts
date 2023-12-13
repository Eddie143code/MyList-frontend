import axios from "axios";
const url = process.env.NEXT_PUBLIC_API;

export const fetchAllLists = async () => {
  const response = await fetch("https://localhost:7284/api/MyList", {
    method: "GET",
    credentials: "include", // include cookies
  });

  const data = await response.json();
  console.log(data);
  return data;
};
