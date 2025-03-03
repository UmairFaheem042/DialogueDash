import React from "react";

const Footer = () => {
  return (
    <footer className=" footer bg-primary text-primary-content ">
      <div className="max-w-[1400px] mx-auto flex justify-between w-full p-10">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>

        <div className="grid grid-flow-col gap-2">
          <a
            href="https://github.com/UmairFaheem042/DialogueDash"
            target="_blank"
            className="underline"
          >
            Repository
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
