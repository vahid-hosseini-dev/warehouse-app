import Search from "./Search";

function ProfileBanner() {
  return (
    <div className=" flex items-center justify-between pr-10 mt-10 w-[1140px] h-[75px] border-1 bg-white border-[rgba(228,228,228,1)] rounded-[16px]">
      <Search/>
      <div className=" flex items-center justify-between w-[145px] h-[52px] relative left-[18px]">
        <img className="relative left-3" src="/img/line.png" alt="line" />
        <img
          className="rounded-full size-[46px] border-[rgba(228,228,228,0.5)]"
          src="/img/Vahid.png"
        ></img>
        <div className="font-yekan">
          <p>وحید حسینی</p>
          <p className="text-sm">مدیر</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
