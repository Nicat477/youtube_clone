import {cva, VariantProps} from 'class-variance-authority'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
const buttonstyles=cva(["hover:bg-secondary-hover","transition-colors"],{
    variants:{
        variant:{
            default:["bg-secondary","hover:bg-secondary-hover"],
            ghost:["hover:bg-gray-100"],
            dark:["bg-secondary-dark","hover:bg-secondary-dark-hover","text-secondary"]
        },
        size:{
            default:["rounded","p-2"],
            icon:["rounded-full","w-10","h-10","flex","items-center","justify-center","p-2.5"]
        },
        defaultVariants:{
            variant:"default",
            size:"default"
        }
    }
})
type ButtonProps=VariantProps<typeof buttonstyles> & ComponentProps<"button">
export function Button({variant,size ,className,...props}:ButtonProps){
    
    return <button {...props} className={twMerge(buttonstyles({variant,size}),className)}/>
}