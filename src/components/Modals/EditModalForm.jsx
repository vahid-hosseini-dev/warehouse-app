import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addModalSchema } from "../../schemas/addModalSchema";
import api from "../../services/config";
import { useContext, useEffect, useState } from "react";
import { Toast } from "../Toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { productContext } from "../../context/productContext";

function EditModalForm({ setModalType }) {
  const { productInfo } = useContext(productContext);
  const [toast, setToast] = useState(null);
  const queryClient = useQueryClient();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addModalSchema) });

  const navigate = useNavigate();

  useEffect(() => {
    if (productInfo) {
      reset({
        name: productInfo.name || "",
        quantity: productInfo.quantity || "",
        price: productInfo.price || "",
      });
    }
  }, [productInfo, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await api.put(`/products/${productInfo._id}`, {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      });
      queryClient.invalidateQueries(["products"]);

      showToast("ثبت تغییرات با موفقیت انجام شد", "success");
      setTimeout(() => {
        setModalType(null);
      }, 2000);
      console.log(res);
    } catch (err) {
      if (err.response?.data?.message === "Invalid or expired token") {
        showToast("دوباره لاگین کنید", "error");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  const formClass =
    "flex flex-col gap-3 bg-white py-[2rem] p-3 rounded-4xl shadow-lg w-[460px] min-h-[448px] relative";
  const inputClass =
    "w-[400px] min-h-[2px] p-[10px] m-auto rounded-md bg-[rgba(242,242,242,1)] text-[rgba(40,40,40,0.5)] text-sm text-right outline-none";
  const btnClass =
    "w-[185px] min-h-[42px] p-[10px] out rounded-md  bg-[rgba(242,242,242,1)] cursor-pointer !bg-[rgba(85,163,240,1)] outline-none text-sm text-white !text-center mb-2 transform transition-transform duration-150 hover:ring-blue-600 active:scale-98 focus:ring-1 focus:ring-blue-600 focus:ring-offset-2";

  return (
    <div
      onClick={() => setModalType(null)}
      className="w-full h-full bg-black/5 backdrop-blur-xs fixed top-0 left-0 z-50 flex justify-center items-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className={formClass}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center">ویرایش اطلاعات</p>
        <div className="flex flex-col gap-1 text-right">
          <label className="mr-5" htmlFor="name">
            نام کالا
          </label>
          <input
            id="name"
            className={inputClass}
            {...register("name")}
            placeholder="نام کالا"
          />
          <p className="text-sm min-h-[35px] mr-5 text-red-400 self-start">
            {errors.name?.message}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <label className="mr-5" htmlFor="quantity">
            تعداد موجودی
          </label>
          <input
            id="quantity"
            className={inputClass}
            {...register("quantity")}
            placeholder="نام کالا"
          />
          <p className="text-sm min-h-[35px] mr-5 text-red-400 self-start">
            {errors.quantity?.message}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <label className="mr-5" htmlFor="price">
            قیمت
          </label>
          <input
            id="price"
            className={inputClass}
            {...register("price")}
            placeholder="نام کالا"
          />
          <p className="text-sm min-h-[35px] mr-5 text-red-400 self-start">
            {errors.price?.message}
          </p>
        </div>

        <div className="flex justify-around mt-5">
          <input
            type="submit"
            className={`${btnClass}`}
            value={"ثبت اطلاعات جدید"}
          />

          <input
            type="button"
            className={`${btnClass} !bg-[rgba(223,223,223,1)] !text-[rgba(40,40,40,0.8)]`}
            value={"انصراف"}
            onClick={() => setModalType(null)}
          />
        </div>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </form>
    </div>
  );
}

export default EditModalForm;
