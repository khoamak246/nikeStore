import React from "react";
import { formatRelative } from "date-fns";

export default function UpdateOrderNotification({ id, status, createdAt }) {
  const convertTimestamp = (timestamp, exists) => {
    let date = timestamp.toDate();
    let dd;
    if (exists == "current") {
      dd = date.getDate();
    } else {
      dd = date.getDate() + 7;
    }
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    date = dd + "/" + mm + "/" + yyyy;
    return date;
  };

  return (
    <div className="w-full flex flex-col gap-2 border-[1px] border-solid border-[#BBB7A8] p-4 rounded-lg mb-4 group">
      <div className="w-full flex xxsm:flex-col xxsm:items-end justify-between border-b-[1px] border-solid border-[#BBB7A8] pb-2">
        <div className="p-1 flex gap-1 text-[#26aa99] text-sm xxsm:text-end">
          {status == "pending"
            ? "Da tiep nhan don hang"
            : status == "delivery"
            ? "Dang giao hang"
            : "Giao hang thanh cong"}
        </div>
        <div className="p-1">
          <p className="text-sm text-[#ee4d2d]">
            {convertTimestamp(createdAt, "current")}
          </p>
        </div>
      </div>
      <div className="w-full flex xxsm:flex-col gap-2 ">
        <div className="w-[90%]">
          {status == "pending"
            ? `Don hang ${id.split("-")[0]} dang cho tiep nhan`
            : status == "delivery"
            ? `Don hang ${
                id.split("-")[0]
              } cua ban dang duoc van chuyen. Du kien se giao vao ngay ${convertTimestamp(
                createdAt,
                "sevenday"
              )}.`
            : `Don hang ${id.split("-")[0]} cua ban da giao thanh cong`}
        </div>
      </div>
    </div>
  );
}
