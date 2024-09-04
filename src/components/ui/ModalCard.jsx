import React, { forwardRef } from "react";
import ButtonClose from "./ButtonClose";

const ModalCard = forwardRef(({ onClose, children }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        {children}
        <div className="relative left-[-80px] top-[-370px]">
          <ButtonClose onClick={onClose} />
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
});

export default ModalCard;
