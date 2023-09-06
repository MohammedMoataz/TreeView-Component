import React from "react"

import { List } from "./list"
import { Button } from "./button"

export const Region = (props) => {
    const {
        dispatchType,
        optionHeader,
        regions,
        region,
        handleAddChild,
        handleUpdate
    } = props

    return (
        <form className="region-form" >
            <List
                dispatchType={dispatchType}
                optionHeader={optionHeader}
                regions={regions}
            />
            {region.id
                ? <div className="action-btns">
                    <Button
                        className={"bg-light text-secondaey"}
                        action={"Update"}
                        type={"button"}
                        handleAction={handleUpdate}
                    />
                    {handleAddChild
                        ? <Button
                            className={"bg-light text-secondaey"}
                            action={"Add"}
                            type={"button"}
                            handleAction={handleAddChild}
                        />
                        : null
                    }
                </div>
                : null
            }
        </form >
    )
}
