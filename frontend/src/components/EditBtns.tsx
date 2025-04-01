import { FiEdit } from "react-icons/fi";


function EditBtns({ onClick }:any) {
  return (
    <>
      <div className="m-10 mt-1 mb-20">
        <button
          onClick={onClick}
          className=" flex gap-2 bg-gray-800 hover:bg-gray-900 text-gray-100  items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg"
        >
          <span className="text-[14px]">Edit Jotter </span>{" "}
          <span className="text-[16px]">
            {" "}
            <FiEdit />
          </span>
        </button>
      </div>
    </>
  );
}

export default EditBtns;
