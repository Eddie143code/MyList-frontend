"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/state/context/ListContext";
import { createItem } from "@/state/services/ItemService";

const page = ({ params }: any) => {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("");
  const {
    Lists,
    addNewList,
    findList,
    addNewItem,
    editItem,
    deleteItem,
    getAllLists,
  } = useGlobalContext();

  const [currentList, setCurrentList] = useState<any>("");

  const [editState, setEditState] = useState<any>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newI = await addNewItem({
      list: currentList.myListId,
      item: { name: currentItem },
    });
    console.log("in page: ", newI);

    const newL = { ...currentList, items: [...currentList.items, newI] };
    setCurrentList(newL);

    const newEdState = newL.items.map((l: any) => {
      return { id: l.myItemId, edit: false };
    });

    setEditState(newEdState);
  };

  const getListsDB = async () => {
    if (!currentList) {
      const res = await getAllLists();
      const l = res.find((list: any) => list.name === params.name);
      console.log(l);

      setCurrentList(l);
      if (l.items) {
        const newEditItems = l.items.map((list: any) => {
          return { id: list.id, edit: false };
        });
        setEditState(newEditItems);
      }
    }
  };

  useEffect(() => {
    // console.log(currentList);

    getListsDB();
  }, [currentList]);

  const handleEdit = (id: any) => {
    const newL = editState.map((list: any) => {
      if (list.id === id) {
        return { id: list.id, edit: !list.edit };
      }
      return list;
    });
    console.log(newL);

    setEditState(newL);
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    const findL = editState.find((l: any) => {
      if (l.edit === true) return l;
    });
    //console.log(findL);

    const newItem = {
      id: findL.id,
      name: currentItem,
    };
    console.log(newItem);

    const nn = editState.map((l: any) => {
      return { id: l.id, edit: false };
    });
    setEditState(nn);
    // console.log(editState);

    const newItemsList = currentList.items.map((list: any) => {
      if (list.id == newItem.id) {
        return newItem;
      }
      return list;
    });
    const newList = {
      ...currentList,
      items: newItemsList,
    };
    console.log(newList);

    setCurrentList(newList);
    editItem({ list: currentList, item: newItem });
  };

  const handleDelete = (id: any) => {
    const fillItems = currentList.items.filter((item: any) => item.id !== id);
    const fillList = {
      id: currentList.id,
      name: currentList.name,
      items: fillItems,
    };
    const fillState = fillItems.map((l: any) => {
      return { id: l.id, edit: false };
    });

    // console.log(fillState);

    setEditState(fillState);
    setCurrentList(fillList);
    deleteItem(fillList);
  };

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(currentList)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button
            md
            text="Add Item"
            clickMethod={() => {
              setAddItem(!addItem);
              const closeEdit = currentList.items.map((l: any) => {
                return { id: l.id, edit: false };
              });
              setEditState(closeEdit);
            }}
          />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px] ">
          {currentList ? (
            currentList.items.map((item: any, i: any) => {
              return (
                <form
                  className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                  key={item.itemId}
                  onSubmit={handleEditSubmit}
                >
                  <h1 className="lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:w-[100%] lg:h-[100%]">
                    <input
                      id={item.myListId}
                      className="w-[120px] text-4xl"
                      disabled={!editState[i]}
                      value={editState[i].edit ? currentItem : item.name}
                      onChange={(e: any) => {
                        if (editState[i]) {
                          setCurrentItem(e.target.value);
                        }
                      }}
                    />
                    <span className="ml-2">
                      <Button
                        type="button"
                        xs
                        text={editState[i].edit ? "Cancel" : "Edit"}
                        clickMethod={() => handleEdit(item.id)}
                      />
                      {editState[i].edit && (
                        <Button type="submit" xs text={"Save"} />
                      )}
                      <Button
                        type="button"
                        xs
                        text={"delete"}
                        clickMethod={() => handleDelete(item.id)}
                      />
                    </span>
                  </h1>
                  {/*          <div className="lg:mt-5">
                    <Button
                      sm
                      text="See more"
                      location={`/lists/${item.name.toLowerCase()}`}
                    />
                  </div> */}
                </form>
              );
            })
          ) : (
            <div></div>
          )}
          {addItem && (
            <form
              onSubmit={handleSubmit}
              className="w-[100%] lg:w-[33%] lg:flex lg:flex-col lg:items-center my-10"
            >
              <Input
                value={currentItem}
                onChange={(e: any) => setCurrentItem(e.target.value)}
              />
              <div className="mt-5">
                <Button xs text="Submit" type="submit" />
                <Button xs text="Delete" />
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default page;
