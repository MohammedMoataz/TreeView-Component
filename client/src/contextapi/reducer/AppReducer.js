import * as appActionType from '../action/AppAction'

export const AppReducer = (state, action) => {
    switch (action.type) {
        case appActionType.GET_ALL:
            return {
                ...state,
                regions: action.payload
            }

        case appActionType.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }

        case appActionType.GET_STATES:
            return {
                ...state,
                states: action.payload
            }

        case appActionType.GET_CITIES:
            return {
                ...state,
                cities: action.payload
            }

        case appActionType.SINGLE_COUNTRY:
            return {
                ...state,
                country: action.payload
            }

        case appActionType.SINGLE_STATE:
            return {
                ...state,
                state: action.payload
            }

        case appActionType.SINGLE_CITY:
            return {
                ...state,
                city: action.payload
            }

        default:
            return state
    }
}
