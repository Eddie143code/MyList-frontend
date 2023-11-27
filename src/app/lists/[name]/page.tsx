"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "@/state/context/ListContext";

const page = ({ params }: any) => {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("");
  const { Lists, addNewList, findList, addNewItem } = useGlobalContext();

  const [currentList, setCurrentList] = useState<any>("");
  console.log(params);

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
    console.log(currentList);
    if (!currentList) {
      const l = findList(params.name);
      console.log(l);

      setCurrentList(l);
    }
  }, []);

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(currentList)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button md text="Add Item" clickMethod={() => setAddItem(!addItem)} />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px] ">
          {currentList ? (
            currentList.items.map((item: any) => {
              return (
                <div
                  className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                  key={item.id}
                >
                  <h1 className="text-4xl lg:flex lg:justify-center lg:w-[100%]">
                    {item.name}
                  </h1>
                </div>
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
