import React, { useContext, useState } from "react"

import { AppContext } from "../../contextapi/context/AppContext"
import { add, update } from "../../apis/region"
import { Button } from "./button"

import "./css/panel.css"

export const Panel = (props) => {
  let {
    region,
    placeholder,
    action,
    dispatchType,
    dispatch,
    closePanel
  } = props

  // eslint-disable-next-line no-unused-vars
  const { appState, appDispatch } = useContext(AppContext)
  const [name, setName] = useState(region.name)

  const handleSubmit = async (e) => {
    e.preventDefault()

    action === "Add"
      ? await add(name, region.parent_id)
        .then(dispatch)
        .then(closePanel)
        .catch((err) => console.error(err))
      : await update(name, region.id)
        .then(() =>
          appDispatch({
            type: dispatchType,
            payload: {
              id: region.id,
              name,
            },
          })
        )
        .then(dispatch)
        .then(closePanel)
        .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-secondary pop-up-overlay"></div>
      <div className="pop-up">
        <div className="pop-up-header">
          <h1 className="text-dark pop-up-title">
            {action} {placeholder}
          </h1>
          <Button
            className={"text-light pop-up-close"}
            action={"X"}
            type={"button"}
            handleAction={closePanel}
          />
        </div>
        <div className="pop-up-content">
          <input
            className="text-light bg-primary pop-up-input"
            onChange={(e) => setName(e.target.value)}
            defaultValue={region.name}
            placeholder={placeholder}
          />
          <Button
            className={"text-light bg-secondary pop-up-action"}
            action={action}
            type={"submit"}
          />
        </div>
      </div>
    </form>
  )
}
