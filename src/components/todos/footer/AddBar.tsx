import { useUiStore } from "../../../stores/uiStore";
import { handleSignOut } from "../../../utils/Auth";
import { useNavigate } from "react-router";

export default function AddBar() {
  let { showToast } = useUiStore();
  let { handleClickOpen } = useUiStore();
  const navigate = useNavigate();
  return (
    <>
      <button
        className="absolute right-4 bottom-4 w-14 h-14 flex justify-center items-center rounded-full 
  bg-linear-to-tr from-purple-600 to-blue-500 text-white text-2xl font-light shadow-lg 
  transition-all duration-300 ease-in-out
  
  hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:brightness-110
  
  active:scale-95
  
  focus:outline-none focus:ring-1 focus:ring-purple-500/50"
        onClick={(e) => {
          e.preventDefault();
          handleClickOpen();
        }}
      >
        <span className="mb-1">+</span>
      </button>
      <button
        className="absolute left-4 bottom-4 rounded-full 
  bg-red-800 text-white  font-medium shadow-lg px-2 py-1
  transition-all duration-300 ease-in-out
  
  hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] hover:brightness-110
  
  active:scale-95
"
        onClick={(e) => {
          e.preventDefault();
          handleSignOut(navigate);
        }}
      >
        <span className="mb-1">logout</span>
      </button>

      <button
        className="absolute left-28 bottom-4 rounded-full 
  bg-linear-to-tr from-blue-500 to-indigo-600 text-white font-medium shadow-lg px-4 py-1
  transition-all duration-300 ease-in-out
  
  hover:scale-105 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:brightness-110
  
  active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </>
  );
}
