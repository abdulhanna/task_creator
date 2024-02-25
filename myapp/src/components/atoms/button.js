import React, { Children } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

const Button = ({ href, id, children, className, size = 'md', variant = "primary", onClick, isDisabled = false }) => {
    const content = <>
        {children}
    </>
    if (href) {
        return (
            <Link href={href}>
                <button id={id} className={classNames(`${{
                    'xs': 'text-[10px] 2xl:text-[12px]',
                    'sm': 'text-[12px] 2xl:text-[14px]',
                    'md': 'text-[14px] 2xl:text-[16px]',
                    'lg': 'text-[16px] 2xl:text-[18px]',
                    'xl': 'text-[18px] 2xl:text-[22px]',
                    'xl1': 'text-[20px] 2xl:text-[24px]',
                    '2xl': 'text-[22px] 2xl:text-[26px]',
                    '3xl': 'text-[24px] 2xl:text-[28px]',

                }[size]} font-Libre  px-5 py-2 text-center rounded `, className, {
                    "border-primary border  bg-transparent text-primary": variant === "primary",


                    "border border-black  bg-transparent ": variant === "primary1",
                    "bg-primary text-white": variant === "contained",



                })} >{content}</button>
            </Link>

        )
    }
    else {

        return <button className={classNames(`${{
            'xs': 'text-[10px] 2xl:text-[12px]',
            'sm': 'text-[12px] 2xl:text-[14px]',
            'md': 'text-[14px] 2xl:text-[16px]',
            'lg': 'text-[16px] 2xl:text-[18px]',
            'xl': 'text-[18px] 2xl:text-[22px]',
            'xl1': 'text-[20px] 2xl:text-[24px]',
            '2xl': 'text-[22px] 2xl:text-[26px]',
            '3xl': 'text-[24px] 2xl:text-[28px]',

        }[size]} font-Libre  px-5 py-2 text-center rounded`, className, {
            "border-primary border  bg-transparent text-blue-600": variant === "primary",
            "border border-black  bg-transparent ": variant === "primary1",
            "bg-blue-600 text-white": variant === "contained",
            "bg-red-200 text-red-600 rounded bg-transparent border border-red-500": variant === "danger",
            "bg-yellow-600 text-white rounded-sm": variant === "yellow",
            "bg-teal-700 text-white rounded-sm": variant === "teal",
            "bg-medium_green text-white rounded-sm": variant === "green"
        })} onClick={onClick} disabled={isDisabled}>
            {content}
        </button>

    }
}


export default Button;
