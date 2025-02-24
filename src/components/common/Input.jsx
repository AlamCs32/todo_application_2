import React from 'react'
import { Input as InputM } from "../ui/input"

const Input = ({ className, ...restProps }) => {
    return (
        <InputM className={className} {...restProps} />
    )
}

export default Input