"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useGlobalContext } from "@/state/context/ListContext";

const Page = () => {
  const [addList, setAddList] = useState<boolean>(false);
  const [currentListItem, setCurrentListItem] = useState<string>("");
  const { Lists, addNewList, editList, deleteList, getAllLists } =
    useGlobalContext();
  const [allLists, setAllLists] = useState<any>("");

  /*  */

  // Use an object to track the edit state for each list
  const [editState, setEditState] = useState<any>([]);

  const getListsDB = () => {
    if (!allLists) {
      getAllLists().then((l: any) => {
        setAllLists(l);
        const newEditList = l.map((list: any) => {
          return { id: list.myListId, edit: false };
        });
        setEditState(newEditList);
        console.log(l);
      });
    }
  };
  useEffect(() => {
    // console.log(Lists);
    // console.log(editState);

    getListsDB();
  }, [Lists]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await addNewList({
        Name: currentListItem,
      });
      console.log(response);

      const newItem = {
        myListId: response.myListId,
        name: currentListItem,
      };

      const nL = [...allLists, newItem];
      const newEdState = nL.map((l: any) => {
        return { id: l.myListId, edit: false };
      });

      setEditState(newEdState);
      setAllLists([...allLists, newItem]);
      // setAllLists("");

      setCurrentListItem("");
      setAddList(false);
      // getListsDB();
    } catch (error) {
      console.log(`handleSubmit: ${error}`);
    }
  };

  const handleEdit = (id: any) => {
    console.log(editState);
    console.log(id);

    const newL = editState.map((list: any) => {
      if (list.id === id) {
        return { id: list.id, edit: !list.edit };
      }
      return list;
    });
    // console.log(newL);

    setEditState(newL);
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const findL = editState.find((l: any) => {
        if (l.edit === true) return l;
      });
      // console.log(findL);

      const newItem = {
        myListId: findL.id,
        Name: currentListItem,
        items: [],
      };

      const response = await editList(newItem);

      //console.log(newItem);

      const nn = editState.map((l: any) => {
        return { id: l.id, edit: false };
      });
      setEditState(nn);
      // console.log(editState);

      const newList = allLists.map((list: any) => {
        if (list.myListId == newItem.myListId) {
          return newItem;
        }
        return list;
      });
      setAllLists(newList);
    } catch (error) {
      console.log(`handleEditSubmit: ${error}`);
    }
  };

  const handleDelete = async (id: any) => {
    // console.log(fillState);
    try {
      const response = await deleteList(id);

      const fillList = allLists.filter((list: any) => list.myListId !== id);

      const fillState = fillList.map((l: any) => {
        return { id: l.id, edit: false };
      });

      setEditState(fillState);
      setAllLists(fillList);
    } catch (error) {
      console.log(`handleDelete: ${error}`);
    }
  };

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(Lists)}>log</button>
        <button onClick={() => console.log(allLists)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button
            md
            text="Add List"
            clickMethod={() => {
              setAddList(!addList);
              const closeEdit = allLists.map((l: any) => {
                return { id: l.myListId, edit: false };
              });
              setEditState(closeEdit);
            }}
          />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px]">
          {allLists.length > 0 ? (
            allLists.map((list: any, i: any) => {
              return (
                <form
                  className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                  key={list.myListId}
                  onSubmit={handleEditSubmit}
                >
                  <h1 className="lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:w-[100%] lg:h-[100%]">
                    <input
                      id={list.id}
                      className="w-[120px] text-4xl"
                      disabled={!editState[i]}
                      value={editState[i].edit ? currentListItem : list.name}
                      onChange={(e: any) => {
                        if (editState[i]) {
                          setCurrentListItem(e.target.value);
                        }
                      }}
                    />
                    <span className="ml-2">
                      <Button
                        type="button"
                        xs
                        text={editState[i].edit ? "Cancel" : "Edit"}
                        clickMethod={() => handleEdit(list.myListId)}
                      />
                      {editState[i].edit && (
                        <Button type="submit" xs text={"Save"} />
                      )}
                      <Button
                        type="button"
                        xs
                        text={"delete"}
                        clickMethod={() => handleDelete(list.myListId)}
                      />
                    </span>
                  </h1>
                  <div className="lg:mt-5">
                    <Button
                      sm
                      text="See more"
                      type="button"
                      location={`/lists/${list.name}`}
                    />
                  </div>
                </form>
              );
            })
          ) : (
            <div></div>
          )}
          {addList && (
            <form
              onSubmit={handleSubmit}
              className="w-[100%] lg:w-[33%] lg:flex lg:flex-col lg:items-center my-10"
            >
              <Input
                value={currentListItem}
                onChange={(e: any) => setCurrentListItem(e.target.value)}
              />
              <div className="mt-5">
                <Button xs text="Submit" type="submit" />
                <Button
                  xs
                  text="Cancel"
                  clickMethod={() => setAddList(false)}
                />
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;

{
  /* <div className="w-[100%] lg:w-[100%] lg:flex lg:flex-col lg:items-center mb-10">
              <h1>
                <span className="text-4xl">You have no lists</span>
              </h1>
            </div>*/
}
