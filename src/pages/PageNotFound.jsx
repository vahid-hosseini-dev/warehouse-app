import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="mt-50"
        src="/img/404.png"
        alt="404"
      ></img>
      <Link className="font-yekan bg-[rgba(85,163,240,1)] text-white rounded-[12px] p-3"   to={"../register"}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default PageNotFound;
