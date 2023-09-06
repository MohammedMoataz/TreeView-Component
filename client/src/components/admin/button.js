import React from "react"

export const Button = (props) => {
    const {
        className,
        action,
        type,
        handleAction
    } = props

    return (
        <button
            className={className}
            type={type}
            onClick={handleAction}
        >
            {action}
        </button>
    )
}
