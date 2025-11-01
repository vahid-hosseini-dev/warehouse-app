import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../schemas/registrationSchema";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "./Toast";
import api from "../services/config";

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = async (data) => {
    const { confirmPassword, ...sendData } = data;
    
    try {
      const res = await api.post("/auth/register", sendData);
      console.log("Register success:", res.data);
      showToast(
        "ثبت نام با موفقیت انجام شد و در حال انتقال به صفحه ورود !",
        "success"
      );
      setTimeout(() => {
        navigate("/login");
      }, 2100);
    } catch (err) {
      if (err.response?.data?.message === "User already exists") {
        showToast("نام کاربری تکراری است", "error");
      }
    }
  };

  const inputClass =
    "w-[400px] min-h-[53px] py-2 px-12 out rounded-2xl bg-[rgba(242,242,242,1)] text-[rgba(40,40,40,0.5)] text-base text-right outline-none";
  const formClass =
    "flex flex-col items-center bg-white gap-1 p-10 w-[460px] min-h-[523px] border-[#E4E4E4] border-1 border-solid rounded-4xl";
  const btnClass =
    "w-[400px] min-h-[53px] py-2 px-12 out rounded-2xl bg-[rgba(242,242,242,1)] cursor-pointer !bg-[rgba(85,163,240,1)] outline-none text-base text-white !text-center mb-2 transform transition-transform duration-150 hover:ring-blue-600 active:scale-98 focus:ring-1 focus:ring-blue-600 focus:ring-offset-2";

  return (
    <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-start items-center">
        <img
          className="w-[80px]"
          src="/img/BotoStart.png"
          alt="botostart"
        />
        <span className="mt-5 mb-10 text-2xl text-[rgba(40,40,40,1)]">
          فرم ثبت نام
        </span>
      </div>

      <input
        className={inputClass}
        {...register("username")}
        placeholder="نام کاربری"
      />

      <p className="text-sm min-h-[35px] text-red-400 self-start">
        {errors.username?.message}
      </p>

      <div style={{ position: "relative" }}>
        <input
          className={inputClass}
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="رمز عبور"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3"
        >
          {showPassword ? (
            <img className="w-[25px]" src="/svg/eye.svg"></img>
          ) : (
            <img className="w-[25px]" src="/svg/eye-off.svg"></img>
          )}
        </button>
      </div>
      <p className="text-sm min-h-[35px] text-red-400 self-start">
        {errors.password?.message}
      </p>

      <div style={{ position: "relative" }}>
        <input
          className={inputClass}
          type={showConfirm ? "text" : "password"}
          {...register("confirmPassword")}
          placeholder="تکرار رمز عبور"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute inset-y-0 right-3"
        >
          {showConfirm ? (
            <img className="w-[25px]" src="/svg/eye.svg"></img>
          ) : (
            <img className="w-[25px]" src="/svg/eye-off.svg"></img>
          )}
        </button>
      </div>
      <p className="text-sm min-h-[35px] text-red-400 self-start">
        {errors.confirmPassword?.message}
      </p>

      <input
        className={`${btnClass} cursor-pointer !bg-[rgba(85,163,240,1)] !text-center text-white mb-[10px]`}
        type="submit"
        value="ثبت نام"
      />

      {toast ? (
        <Toast message={toast.message} type={toast.type} />
      ) : (
        <Link
          className="text-sm self-start text-[rgba(58,139,237,1)]"
          to="../login"
        >
          حساب کاربری دارید؟
        </Link>
      )}
    </form>
  );
}

export default RegistrationForm;
