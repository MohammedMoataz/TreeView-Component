import React, { useContext } from "react"

import { AppContext } from "../../contextapi/context/AppContext"

export const List = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { appState, appDispatch } = useContext(AppContext)

    const {
        dispatchType,
        optionHeader,
        regions
    } = props

    return (
        <select
            className="bg-light text-dark"
            onChange={e => appDispatch({
                type: dispatchType,
                payload: {
                    id: e.target.options[e.target.options.selectedIndex]
                        .getAttribute("accessKey"),
                    name: e.target.value
                }
            })}
        >
            <option>{optionHeader}</option>
            {regions.map(region =>
                // eslint-disable-next-line jsx-a11y/no-access-key
                <option
                    accessKey={region.id}
                    key={region.id}
                >
                    {region.region}
                </option>
            )}
        </select>
    )
}
