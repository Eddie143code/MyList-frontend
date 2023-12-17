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

export const editExistingItem = async (req: any) => {
  const { list, item } = req;

  const requestOptions: any = {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name: item.name }),
  };
  //console.log(req);

  const response: any = await fetch(
    `https://localhost:7284/api/MyList/${list}/items/${item.itemId}`,
    requestOptions
  );
  const data = await response.json();

  console.log(data);
  return data;
};

export const deleteExistingItem = async (req: any) => {
  const { list, itemId } = req;

  const requestOptions: any = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response: any = await fetch(
    `https://localhost:7284/api/MyList/${list}/items/${itemId}`,
    requestOptions
  );
  const data = await response.json();

  console.log(data);
  return data;
};
