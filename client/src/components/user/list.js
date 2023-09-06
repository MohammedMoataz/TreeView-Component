import React, { useContext } from "react"

import { AppContext } from "../../contextapi/context/AppContext"
import * as AppActionType from "../../contextapi/action/AppAction"

export const List = (props) => {
    const { parentNode } = props

    const { appState, appDispatch } = useContext(AppContext)

    /**
     * recursion function to handle children regions for the changed reigon
     * 
     * @param {Object} regions regions object in the appState
     * @param {Boolean} checked if the region is checked or unchecked
     * @param {Number} key the id of changed region
     * @param {Number} length the number of children the changed region has
     */
    const handleChildren = (regions, checked, key, length) => {
        if (Object.keys(regions.children).includes(key)) {
            let newValue = checked
                ? {
                    statue: "full",
                    checked,
                    length: 0
                } : {
                    statue: "empty",
                    checked,
                    length: Object.keys(regions.children[key].children).length * -1
                }

            regions.children[key].statue = newValue.statue
            regions.children[key].checked = newValue.checked
            regions.children[key].length = newValue.length

            for (let childKey in regions.children[key].children) {
                regions.children[key].children[childKey].statue = newValue.statue
                regions.children[key].children[childKey].checked = newValue.checked
                regions.children[key].children[childKey].length = Object.keys(regions.children[key].children[childKey].children).length * -1

                for (let grandchildKey in regions.children[key].children[childKey].children) {
                    regions.children[key].children[childKey].children[grandchildKey].statue = newValue.statue
                    regions.children[key].children[childKey].children[grandchildKey].checked = newValue.checked
                }
            }
        } else {
            for (let childKey in regions.children)
                handleChildren(regions.children[childKey], checked, key, length)
        }
    }

    /**
     * recursion function to handle parent region for the changed region
     * 
     * @param {Object} regions regions object in the appState
     * @param {Boolean} checked if the region is checked or unchecked
     * @param {Number} key the id of changed region
     */
    const handleParent = (regions, checked, key) => {
        if (Object.keys(regions.children).includes(key)) {
            if (checked) {
                regions.length++
                regions.statue = regions.length === 0 ? "full" : "not empty"
            } else {
                regions.length--
                regions.statue = regions.length === Object.keys(regions.children).length * -1 ? "empty" : "not empty"
            }
        } else {
            for (let childKey in regions.children)
                handleParent(regions.children[childKey], checked, key)
        }
    }

    /**
     * change the statue of relative regions to the changed region
     * 
     * @param {Event} e event to know if the region is checked or not
     * @param {Object} region clicked region
     */
    const handleChange = (e, region) => {
        let regions = appState.regions[1]
        let checked = e.target.checked
        let key = region[0]
        let length = region[1].length

        handleChildren(regions, checked, key, length)
        handleParent(regions, checked, key)

        appState.regions[1] = regions
        appDispatch({
            type: AppActionType.GET_ALL,
            payload: appState.regions
        })
    }

    return (
        <ul>
            {parentNode
                ? Object.entries(parentNode.children)
                    .map(region =>
                        <li key={region[0]} className="bg-secondary-40 text-light region-control border">
                            <details>
                                <summary onClick={e =>
                                    e.target.parentNode.parentNode.open
                                    = !e.target.parentNode.parentNode.open
                                }>
                                    <label className="form-control">
                                        <input
                                            type="checkbox"
                                            value={`${region[1].statue}`}
                                            defaultChecked={region[1].checked}
                                            onChange={e => handleChange(e, region)}
                                        />
                                        {region[1].name}
                                    </label>
                                </summary>
                                <List parentNode={region[1]} />
                            </details>
                        </li>
                    )
                : null
            }
        </ul>
    )
}