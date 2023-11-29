"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/state/context/ListContext";

const page = ({ params }: any) => {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("");
  const { Lists, addNewList, findList, addNewItem, editItem } =
    useGlobalContext();

  const [currentList, setCurrentList] = useState<any>("");

  const [editState, setEditState] = useState<any>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem = [
      ...currentList.items,
      { id: currentList.items.length + 1, name: currentItem },
    ];
    addNewItem({
      list: currentList,
      item: { id: currentList.items.length + 1, name: currentItem },
    });
    setCurrentList({ ...currentList, items: [...newItem] });
  };

  useEffect(() => {
    // console.log(currentList);
    if (!currentList) {
      const l = findList(params.name);
      // console.log(l);
      setCurrentList(l);
      const newEditItems = l.items.map((list: any) => {
        return { id: list.id, edit: false };
      });
      setEditState(newEditItems);
    }
  }, []);

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

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(editState)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button md text="Add Item" clickMethod={() => setAddItem(!addItem)} />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px] ">
          {currentList ? (
            currentList.items.map((item: any) => {
              return (
                <form
                  className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                  key={item.id}
                  onSubmit={handleEditSubmit}
                >
                  <h1 className="lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:w-[100%] lg:h-[100%]">
                    <input
                      id={item.id}
                      className="w-[120px] text-4xl"
                      disabled={!editState[item.id]}
                      value={
                        editState[item.id - 1].edit ? currentItem : item.name
                      }
                      onChange={(e: any) => {
                        if (editState[item.id]) {
                          setCurrentItem(e.target.value);
                        }
                      }}
                    />
                    <span className="ml-2">
                      <Button
                        type="button"
                        xs
                        text={editState[item.id - 1].edit ? "Cancel" : "Edit"}
                        clickMethod={() => handleEdit(item.id)}
                      />
                      {editState[item.id - 1].edit && (
                        <Button type="submit" xs text={"Save"} />
                      )}
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
            <div className="w-[100%] lg:w-[100%] lg:flex lg:flex-col lg:items-center mb-10">
              <h1 className=" ">
                <span className=" text-4xl ">This list is empty</span>
              </h1>
            </div>
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
