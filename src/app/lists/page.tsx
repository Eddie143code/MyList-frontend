"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useGlobalContext } from "@/state/context/ListContext";

const page = () => {
  const [addList, setAddList] = useState<boolean>(false);
  const [currentAddList, setCurrentAddList] = useState<string>("");
  const [allLists, setAllLists] = useState<any>([]);

  const { Lists, changeData } = useGlobalContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem = [
      ...allLists,
      { id: allLists.length + 1, name: currentAddList, items: [] },
    ];

    setAllLists(newItem);
    setCurrentAddList("");
    setAddList(false);
  };

  useEffect(() => {
    console.log(Lists);
  }, [Lists]);
  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(allLists)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button md text="Add List" clickMethod={() => setAddList(!addList)} />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px]  ">
          {allLists.length > 0 ? (
            allLists.map((list: any) => {
              return (
                <div
                  className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                  key={list.id}
                >
                  <h1 className="lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:w-[100%] lg:h-[100%]">
                    <span className=" text-4xl ">{list.name}</span>
                    <span className=" ml-2">
                      <Button xs text="Edit" clickMethod />
                    </span>
                  </h1>
                  <div className="lg:mt-5">
                    <Button
                      sm
                      text="See more"
                      location={`/lists/${list.name.toLowerCase()}`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-[100%] lg:w-[100%] lg:flex lg:flex-col lg:items-center mb-10">
              <h1 className=" ">
                <span className=" text-4xl ">You have no lists</span>
              </h1>
            </div>
          )}
          {addList && (
            <form
              onSubmit={handleSubmit}
              className="w-[100%] lg:w-[33%] lg:flex lg:flex-col lg:items-center my-10"
            >
              <Input
                value={currentAddList}
                onChange={(e: any) => setCurrentAddList(e.target.value)}
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
