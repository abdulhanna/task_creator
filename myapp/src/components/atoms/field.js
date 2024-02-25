import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";



export const TextField = ({
    key = "",
    label = "",
    name = "",
    id = "",
    height = "h-[48px]",
    width = "w-[378px]",
    textsize = "text-sm",
    type = "text",
    required = null,
    bgColor = "",
    labelColor = "textColor",
    roundedText = "rounded-[4px]",
    roundedPassword = "rounded-lg",
    placeHolder = "",
    className = "",
    value,
    disabled = false,
    max = "2030-01-01",
    min = "1980-01-01",
    error = null,
    isRead = false,
  
    onChange = (e) => { },
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const show = (e) => {
      e.preventDefault();
      setShowPassword(!showPassword);
    };
    // console.log("##### : ", error);
  
    return (
      <div
        className={`flex flex-col gap-0.5 py-1 2xl:gap-1 2xl:py-2  ${className}`}>
        <p className={`select-none font-normal flex text-sm text-${labelColor}`}>
          {label}
          {required && <div className="text-red-500">*</div>}
        </p>
        {type === "password" ? (
          <div className="relative">
            <motion.input
              height={height}
              width={width}
              name={name}
              type={showPassword ? "text" : "password"}
              value={value}
              placeholder={placeHolder}
  
              onChange={(e) => onChange(e)}
              className={classNames(
                `${bgColor}  border-[1px] rounded px-3 py-[7.5px] ${height} active:outline-none w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
                {
                  "border-red-600 focus:outline-none": error,
                  "border-gray-300": !error,
                }
              )}
              whileTap={{ y: 3 }}
              required={required}
              disabled={disabled}
              max={max}
              min={min}
            />
            <div
              className="absolute right-3 bottom-3"
              onMouseDownCapture={(e) => show(e)}>
            
            </div>
          </div>
        ) : (
          <motion.input
            name={name}
            id={id}
            type={type}
            textsize={textsize}
            value={value}
            height={height}
            // defaultValue={value}
            placeholder={placeHolder}
            onChange={(e) => onChange(e)}
            className={classNames(
              `${bgColor}  border-[1px] rounded px-3 py-[7.5px]  ${height} active:outline-none w-full ${textsize} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
              {
                "border-red-600 focus:outline-none": error,
                "border-gray-300": !error,
              }
            )}
            // whileTap={{ y: 3 }}
            required={required}
            disabled={disabled}
            max={max}
            min={min}
            readOnly={isRead}
          />
        )}
      </div>
    );
  };


  export const CustomSelect = ({
    id,
    children,
    onChange,
    label,
    name,
    required = false,
    bgColor = 'white',
    disabled = false,
    className,
    selectHeight = "",
    value,
    options,
    getOptionLabel,
    getOptionValue
  }) => {
    return (
      <div className={`flex  flex-col py-1 2xl:py-2 gap-0.5 2xl:gap-1 ${className}`}>
        <div className="font-normal  text-sm text-textColor">{label}</div>
        <select
          required={required}
          id={id}
          name={name}
          value={value}
          className={` px-1 ${selectHeight} textField rounded border-[1px] p-6 py-[12px] active:outline-none w-full ${bgColor} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
          onChange={onChange}
          disabled={disabled}
          option={options}
          getoptionlabel={getOptionLabel}
          getoptionvalue={getOptionValue}
        >
          {children}
        </select>
      </div>
    );
  };