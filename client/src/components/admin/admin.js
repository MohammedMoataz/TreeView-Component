import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as AppActionType from "../../contextapi/action/AppAction"
import { AppContext } from "../../contextapi/context/AppContext"
import { getAllByParentId } from "../../apis/region"
import { Panel } from "./panel"
import { Region } from "./region"
import { Button } from "./button"
import "./css/admin.css"

export const Admin = () => {
    const navigate = useNavigate()

    const { appState, appDispatch } = useContext(AppContext)

    //  panel to add/update specific country/state/city
    const [panel, setPanel] = useState(<></>)

    //  get all countries in the first rendering
    useEffect(() => {
        getCountries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //  reset state if country has changed and get current country states
    useEffect(() => {
        if (appState.country.id) {
            getStates(appState.country.id)

            appDispatch({
                type: AppActionType.SINGLE_STATE,
                payload: {}
            })
            appDispatch({
                type: AppActionType.SINGLE_CITY,
                payload: {}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState.country])
    //  get current state cities
    useEffect(() => {
        if (appState.state.id) getCities(appState.state.id)

        appDispatch({
            type: AppActionType.SINGLE_CITY,
            payload: {}
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState.state])

    /**
     * General function to get regions from server
     * 
     * @param {Number} parent_id 
     * @param {AppActionType} type 
     * @returns children regions for parent region that has id = parent_id
     */
    const getRegions = async (parent_id, type) => await getAllByParentId(parent_id)
        .then(res => appDispatch({
            type,
            payload: res.data.getAllByParentId
                .sort((a, b) => a.region > b.region ? 1 : -1)
        }))
        .catch(err => console.error(err))

    //  get all countries
    const getCountries = async () => await getRegions(appState.root.id, AppActionType.GET_COUNTRIES)
    //  get states of the selected country
    const getStates = async () => await getRegions(appState.country.id, AppActionType.GET_STATES)
    //  get cities of the selected state
    const getCities = async () => await getRegions(appState.state.id, AppActionType.GET_CITIES)


    /*
     * functions to show panel to add/update specific country/state/city
     */

    //  show panel to add country
    const addCountry = () => setPanel(<Panel
        region={{
            parent_id: 1,
            name: ""
        }}
        placeholder={"Country Name"}
        action={"Add"}
        dispatch={getCountries}
        closePanel={() => setPanel(<></>)}
    />)
    //  show panel to update country
    const updateCountry = () => setPanel(<Panel
        region={appState.country}
        placeholder={"Country Name"}
        action={"Update"}
        dispatchType={AppActionType.SINGLE_COUNTRY}
        dispatch={getCountries}
        closePanel={() => setPanel(<></>)}
    />)
    //  show panel to add state
    const addState = () => setPanel(<Panel
        region={{
            parent_id: appState.country.id,
            name: ""
        }}
        placeholder={"State Name"}
        action={"Add"}
        dispatch={getStates}
        closePanel={() => setPanel(<></>)}
    />)
    //  show panel to update state
    const updateState = () => setPanel(<Panel
        region={appState.state}
        placeholder={"State Name"}
        action={"Update"}
        dispatchType={AppActionType.SINGLE_STATE}
        dispatch={getStates}
        closePanel={() => setPanel(<></>)}
    />)
    //  show panel to add city
    const addCity = () => setPanel(<Panel
        region={{
            parent_id: appState.state.id,
            name: ""
        }}
        placeholder={"City Name"}
        action={"Add"}
        dispatch={getCities}
        closePanel={() => setPanel(<></>)}
    />)
    //  show panel to update city
    const updateCity = () => setPanel(<Panel
        region={appState.city}
        placeholder={"City Name"}
        action={"Update"}
        dispatchType={AppActionType.SINGLE_CITY}
        dispatch={getCities}
        closePanel={() => setPanel(<></>)}
    />)


    //  Navigate to User component
    const goToRegions = () => navigate('/regions')

    return (
        <div className="container">
            <div className="top-btn">
                <Button
                    className="bg-dark text-light"
                    action={"Go to Regions"}
                    type={"button"}
                    handleAction={goToRegions}
                />
            </div>

            <div className="add-country">
                <Button
                    action={"Add Country"}
                    handleAction={addCountry}
                    type={"button"}
                />
            </div>  

            <Region
                dispatchType={AppActionType.SINGLE_COUNTRY}
                optionHeader={"Select Country"}
                regions={appState.countries}
                region={appState.country}
                handleAddChild={addState}
                handleUpdate={updateCountry}
            />

            {appState.country.id
                ? <Region
                    dispatchType={AppActionType.SINGLE_STATE}
                    optionHeader={"Select State"}
                    regions={appState.states}
                    region={appState.state}
                    handleAddChild={addCity}
                    handleUpdate={updateState}
                />
                : null}

            {appState.state.id
                ? <Region
                    dispatchType={AppActionType.SINGLE_CITY}
                    optionHeader={"Select City"}
                    regions={appState.cities}
                    region={appState.city}
                    handleUpdate={updateCity}
                />
                : null}

            {panel}
        </div>
    )
}