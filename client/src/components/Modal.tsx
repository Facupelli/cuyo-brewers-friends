import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "../redux/action-creators";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<any>>;
  message: string;
  pathTo?: string;
  size?: string;
};

export const Modal: React.FC<Props> = ({ setModal, message, pathTo, size }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (pathTo) {
      navigate(`${pathTo}`);
    } else {
      setModal(false);
    }
    document.body.style.overflow = "unset";
  };

  const handleShowAgainClick = () => {
    localStorage.setItem("showModal", "false");
    dispatch(setShowModal(false));

    setModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div
        className={`relative px-4 w-full ${
          size ? "max-w-2xl" : "max-w-lg"
        }  h-full md:h-auto`}
      >
        <div className="relative bg-white rounded-lg shadow-menu-shadow">
          <div className="border rounded-lg p-6 space-y-6">
            <div className="flex justify-center">
              <p className="text-lg font-semibold">{message}</p>
            </div>
            <div className="flex justify-evenly">
              <button
                className="transition ease-in-out duration-150 bg-mainC font-bold rounded p-2 px-4 hover:bg-mainC2 hover:text-white"
                onClick={handleClick}
              >
                OK
              </button>
              {size && (
                <button
                  onClick={handleShowAgainClick}
                  className="transition ease-in-out duration-150 bg-mainC text-xs font-bold rounded  px-4 hover:bg-mainC2 hover:text-white"
                >
                  DON'T SHOW THIS AGAIN
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
