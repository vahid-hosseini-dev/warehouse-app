import api from "../../services/config";
import { useContext, useState } from "react";
import { Toast } from "../Toast";
import { useNavigate } from "react-router-dom";

import { productContext } from "../../context/productContext";

function DeleteModal({ setModalType, selectProduct }) {
  const { productInfo } = useContext(productContext);
  console.log("Deleting product id:", productInfo.id);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      if (productInfo.id) {
        await api.delete(`/products/${productInfo.id}`);
      } else if (selectProduct.length > 0) {
        await api.delete("/products", { data: { ids: selectProduct } });
      }
      showToast("کالا از لیست حذف شد", "success");
      setTimeout(() => {
        setModalType(null);
      }, 2000);
    } catch (err) {
      console.log(err.response?.data);
      if (
        err.response?.data?.message ===
          "Unauthorized, token missing or invalid" ||
        err.response?.data?.message === "Product not found"
      ) {
        showToast("دوباره لاگین کنید", "error");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  const formClass =
    "flex flex-col gap-3 bg-white py-[2rem] p-3 rounded-4xl shadow-lg w-[460px] min-h-[338px] relative";
  const btnClass =
    "w-[160px] min-h-[42px] p-[10px] out rounded-lg  bg-[rgba(242,242,242,1)] cursor-pointer !bg-[rgba(85,163,240,1)] outline-none text-sm text-white !text-center mb-2 transform transition-transform duration-150 hover:ring-[rgba(244,63,94,1)] active:scale-98 focus:ring-1 focus:ring-[rgba(244,63,94,1)] focus:ring-offset-2";

  return (
    <div
      onClick={() => setModalType(null)}
      className="w-full h-full bg-black/5 backdrop-blur-xs fixed top-0 left-0 z-50 flex justify-center items-center"
    >
      <form onClick={(e) => e.stopPropagation()} className={`${formClass}`}>
        <img
          className="size-[96px] m-auto"
          src="/img/Close.png"
          alt="close"
        />
        <p className="text-xl text-center">آیا از حذف این محصول مطمئنید؟</p>
        <div className="flex justify-center items-end m-2 gap-3">
          <button
            onClick={deleteHandler}
            className={`${btnClass} !bg-[rgba(244,63,94,1)]`}
          >
            حذف
          </button>
          <button
            className={`${btnClass} !bg-[rgba(223,223,223,1)] !text-[rgba(40,40,40,0.8)]`}
          >
            لغو
          </button>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </form>
    </div>
  );
}

export default DeleteModal;
