import React from "react";

const Chats = () => {
  return (
    <div className="max-w-[1600px] mx-auto  min-h-[calc(100vh-80px)] flex">
      <aside className="border-r border-gray-200  w-[300px]">
        <div className="flex items-center gap-4 bg-white px-6 py-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="pfg"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="font-medium line-clamp-1">Umair Faheem</h1>
            <h4 className="text-sm font-thin line-clamp-1">
              umairfaheem042@gmail.com
            </h4>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-emerald-200 px-6 py-4">Chat Preview</main>
    </div>
  );
};

export default Chats;
