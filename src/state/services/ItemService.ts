export const createItem = async (req: any) => {
  const a = { Name: req.item.name };
  const requestOptions: any = {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(a),
  };
  console.log(req);

  const response: any = await fetch(
    `https://localhost:7284/api/MyList/${req.list}/items`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);

  return data;
};
