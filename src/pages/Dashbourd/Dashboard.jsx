import ProfileBanner from "../../components/ProfileBanner";
import ProductsList from "../../components/ProductsList";
import Modal from "../../components/Modals/Modal";
import { useState } from "react";

const Dashboard = () => {
  const [modalType, setModalType] = useState({});
  const [selectProduct, setSelectProduct] = useState([]);

  return (
    <div className="flex flex-col justify-center items-center">
      <ProfileBanner />
      <div className="mt-10 flex justify-between items-center w-[1140px] ">
        <div className="flex">
          <img
            className="size-[30px] ml-2"
            src="/img/setting.png"
            alt="setting"
          />
          <span className="text-2xl">مدیریت کالا</span>
        </div>

        <div className="flex justify-between w-[350px]">
          <button
            onClick={() => {
              setModalType({ ...modalType, type: "delete" });
            }}
            className={`w-[200px] h-[45px] cursor-pointer text-white rounded-xl ${
              selectProduct.length > 0 ? "bg-[rgba(244,63,94,.8)]" : "invisible"
            }`}
          >
            حذف کالاهای انتخاب شده
          </button>

          <button
            onClick={() => {
              setModalType({ ...modalType, type: "addProduct" });
            }}
            className="w-[132px] h-[45px] cursor-pointer text-white bg-[rgba(85,163,240,.8)] hover:bg-[rgba(85,163,240,1)] rounded-xl"
          >
            افزودن محصول
          </button>
        </div>
      </div>
      <ProductsList
        setModalType={setModalType}
        selectProduct={selectProduct}
        setSelectProduct={setSelectProduct}
      />
      <Modal
        modalType={modalType}
        setModalType={setModalType}
        selectProduct={selectProduct}
      />
    </div>
  );
};

export { Dashboard };
