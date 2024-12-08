import React from 'react'

const ButtonComponent = ({ onClick, disabled, text, className, type }) => {

    const customBtn = (key) => {
        switch (key) {
            case "outline": {
                return 'border-[2px] border-[#D1D1D1] text-[#707070] bg-[#FFFFFF] cursor-pointer'
            }
            case "warning": {
                return 'border-[2px] border-[#E54D42] bg-[#E54D42] text-[#FFFFFF] cursor-pointer';
            }
            case "primary": {
                return 'border-[2px] border-[#6930CA] bg-[#6930CA] text-[#FFFFFF] cursor-pointer'
            }
            default: {
                return 'border-[2px] border-[#6930CA] bg-[#6930CA] text-[#FFFFFF] cursor-pointer'
            }
        }
    };

    return (
        <button
            className={`${disabled ? ' bg-[#E1E1E1] text-[#707070] cursor-not-allowed' : customBtn(type)}  rounded-[11px]  py-2 px-5  font-semibold transition duration-500 flex items-center justify-center ${className ? className : ' w-full'}`}
            onClick={disabled ? null : onClick}
            disabled={disabled}
        >
            <p className='text-sm lg:text-md font-normal'>{text}</p>
        </button>
    )
}

export default ButtonComponent;