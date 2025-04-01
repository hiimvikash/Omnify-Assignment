import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userIdAtom, userInfoAtom, verifiedAtom } from "../atom";

interface DropdownProps {
  label: string;
  items: string[];
}


const DropD: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const navigate = useNavigate();
  const setVerified = useSetRecoilState(verifiedAtom);
  const setUsername = useSetRecoilState(userInfoAtom);
  const setUserId = useSetRecoilState(userIdAtom);
  const handleSignout = () =>{
    setVerified(false);
    setUsername("");
    setUserId(-999);

    localStorage.removeItem("jwt");
    localStorage.removeItem("editorTitle");
    localStorage.removeItem("editorData");
    localStorage.removeItem("editTitle");
    localStorage.removeItem("editContent");
    
    navigate("/");
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-3 py-[6px] sm:px-4 sm:py-2 text-[14px] sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {label}
          <svg
            className="-mr-1 ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {/* {items.map((item, index) => (
              <button
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => console.log(`Clicked ${item}`)}
              >
                {item}
              </button>
            ))} */}
            {
                (items.length > 1) ? 
                <div>
                    <Link to={`/write`} className=" block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                        Write 
                    </Link>

                    <Link to={`/myjotters`} className=" block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                        My Jotters
                    </Link>

                    <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={handleSignout}>
                        Sign out
                    </button>
                </div> 

                : <div>
                    <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                    onClick={handleSignout}>
                        Sign out
                    </button>
                </div>
            }


          </div>
        </div>
      )}
    </div>
  );
};

export default DropD;
