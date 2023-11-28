"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { useGlobalContext } from "@/state/context/ListContext";

const Page = () => {
  const [addList, setAddList] = useState<boolean>(false);
  const [currentListItem, setCurrentListItem] = useState<string>("");
  const { Lists, addNewList, editList } = useGlobalContext();
  const [allLists, setAllLists] = useState<any>(Lists);

  const newEditList = Lists.map((list:any)=> {
    return {id: list.id, edit: false}
  })
  
  // Use an object to track the edit state for each list
  const [editState, setEditState] = useState<any>(newEditList);

  useEffect(() => {
    
    console.log(editState);
    
  }, [Lists]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem = {
      id: allLists.length + 1,
      name: currentListItem,
      items: []
    };

    setAllLists([...allLists, newItem]);
    addNewList(newItem);
    setCurrentListItem("");
    setAddList(false);
  };

  const handleEdit = (id: any) => {
    const newL = editState.map((list: any)=> {
      if(list.id === id){
        return {id: list.id, edit: true}
      }
      return list
    })
    setEditState(newL)
  }

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    const findL = editState.find((l:any)=>{if(l.edit === true) return l})
    console.log(findL);
    
    const newItem = {
      id: findL.id,
      name: currentListItem,
      items: []
    };
    //console.log(newItem);
    
    const nn = editState.map((l:any)=>{return {id: l.id, edit: false}})
    setEditState(nn)
   // console.log(editState);
    
    const newList = allLists.map((list: any)=>{
if(list.id == newItem.id){
  return newItem
}
return list
    } )
    setAllLists(newList)
 editList(newItem)
   
  }

  return (
    <main className="flex flex-col items-center w-[90%]">
      <section className="flex flex-col mt-10 gap-14 lg:w-[70%] lg:max-w-[800px]">
        <button onClick={() => console.log(Lists)}>log</button>
        <div className="text-end w-[90%] lg:w-[100%]">
          <Button md text="Add List" clickMethod={() => setAddList(!addList)} />
        </div>
        <div className="flex flex-wrap w-[100%] min-w-[230px]">
          {allLists.length > 0 ? (
            allLists.map((list: any) => (
              <form
                className="w-[80%] lg:w-[33%] lg:flex lg:flex-col lg:items-center mb-10"
                key={list.id}
                onSubmit={handleEditSubmit}
              >
                <h1 className="lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:w-[100%] lg:h-[100%]">
                  <input
                    id={list.id}
                    className="w-[120px] text-4xl"
                    disabled={!editState[list.id]}
                    value={editState[list.id-1].edit ? currentListItem : list.name}
                    onChange={(e: any) => {
                      if (editState[list.id]) {
                        setCurrentListItem(e.target.value);
                      }
                    }}
                  />
                  <span className="ml-2">
                  <Button type="button" xs text={editState[list.id-1].edit ? "Cancel": "Edit"} clickMethod={() => handleEdit(list.id)} />
                    {editState[list.id-1].edit  &&<Button type="submit" xs text={"Save"}  />  }
                  </span>
                </h1>
                <div className="lg:mt-5">
                  <Button sm text="See more" location={`/lists/${list.name.toLowerCase()}`} />
                </div>
              </form>
            ))
          ) : (
            <div className="w-[100%] lg:w-[100%] lg:flex lg:flex-col lg:items-center mb-10">
              <h1>
                <span className="text-4xl">You have no lists</span>
              </h1>
            </div>
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
                <Button xs text="Cancel" clickMethod={() => setAddList(false)} />
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;

