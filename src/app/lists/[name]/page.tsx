"use client";
import { useState } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const allLists = [
  {
    id: 1,
    name: "Movies",
    items: [
      { id: 1, name: "Avatar" },
      { id: 2, name: "The Avengers" },
      { id: 3, name: "Kill Bill" },
    ],
  },
  {
    id: 2,
    name: "Books",
    items: [
      { id: 4, name: "Avatar" },
      { id: 5, name: "The Hobbit" },
      { id: 6, name: "The Lord of the Rings" },
    ],
  },
  { id: 3, name: "Anime", items: [] },
];
const page = ({ params }: any) => {
  const [addItem, setAddItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("");
  const myList = allLists.find(
    (list: any) => list.name.toLowerCase() === params.name.toLowerCase()
  );
  const [currentList, setCurrentList] = useState<any>(myList);
  // console.log(currentList);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem = [
      ...currentList.items,
      { id: currentList.items.length + 1, name: currentItem },
    ];

    setCurrentList({ ...currentList, items: [...newItem] });
  };

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(currentList)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button md text="Add Item" clickMethod={() => setAddItem(!addItem)} />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px] ">
          {currentList.items.length > 0 ? (
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
