import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const InputComponent = ({ autoFocus, onSave, type, placeholder, value, onChange, label, minLength, maxLength, disabled, error }) => {
    const inputRef = useRef(null);

    const [state, setState] = useState({
        showPassward: false,
    })

    //Focus the input field when the component mounts
    useEffect(() => {
        autoFocus && inputRef.current.focus();
    }, []);


    let { showPassward } = state;
    return (
        <section className='min-h-[80px] h-full '>
            <label className="block text-[#252525] text-xs font-bold mb-[5px] text-start" htmlFor={label}>
                {label}<span className='text-[#F51414] ms-[2px]'>*</span>
            </label>
            <section className='relative flex items-center'>
                <input
                    type={showPassward ? 'text' : type}
                    id={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => {
                        event.preventDefault();
                        onChange(event?.target?.value)
                    }}
                    onKeyDown={(event) => {
                        if (onSave && event?.key === "Enter") {
                            onSave();
                        }
                    }}
                    ref={inputRef}
                    autoComplete="one-time-code"
                    className={`text-md appearance-none border-[1.5px] border-[#D1D1D1] rounded-md px-3 py-2 w-full leading-tight focus:outline-none focus:border-blue-500`}
                    maxLength={maxLength}
                    minLength={minLength}
                    disabled={disabled}
                />
                {
                    type === 'password' &&
                    <figure
                        className='absolute right-3 cursor-pointer'
                        onClick={() =>
                            setState((prev) => {
                                return {
                                    ...prev,
                                    showPassward: !showPassward
                                }
                            })
                        }>
                        {
                            showPassward ?
                                <EyeOff size={20} strokeWidth={1} className="text-[#919191]" /> :
                                <Eye size={20} strokeWidth={1} className="text-[#919191]" />
                        }
                    </figure>
                }
            </section>
            {
                error && <p className='text-[#F51414] text-xs !mt-[2px] text-start'>{error}</p>
            }
        </section>
    );
};


export default InputComponent;
