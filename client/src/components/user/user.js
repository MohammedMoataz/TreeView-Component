import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { getAll } from "../../apis/region"
import { AppContext } from "../../contextapi/context/AppContext"
import * as AppActionType from "../../contextapi/action/AppAction"
import { List } from "./list"
import { Button } from "../admin/button"

import "./css/user.css"

export const User = () => {
  const navigate = useNavigate()

  const { appState, appDispatch } = useContext(AppContext)

  //  get all regions in the first rendering
  //  store regions in appState as a tree
  useEffect(() => {
    let regions = { 1: { name: "root", children: {} } }

    getAll()
      .then(res => res.data.getAll)
      .then(res => {
        res.map(region => fillRegions(regions, region))
        appDispatch({
          type: AppActionType.GET_ALL,
          payload: regions
        })
        return regions
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * recursion function to fill regions prop in appState
   * 
   * @param {Object} parent  region prop in appState
   * @param {Object} child region Object returned from server
   */
  const fillRegions = (parent, child) => {
    if (Object.keys(parent).includes(`${child.p_id}`)) {
      Object.assign(parent[child.p_id].children, {
        [child.id]: {
          name: child.region,
          statue: "full",
          checked: true,
          length: 0,
          children: {}
        }
      })
    } else {
      for (let key in parent) {
        fillRegions(parent[key].children, child)
      }
    }
  }

  //  go to the admin page
  const goBack = () => navigate(-1)

  return (
    <div className="container">
      <div className="top-btn">
        <Button
          className="bg-dark text-light"
          action={"Manage Regions"}
          handleAction={goBack}
        />
      </div>

      <div className="tree">
        <List parentNode={appState.regions[1]} />
      </div>
    </div >
  )
}
