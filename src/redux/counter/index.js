export const ADD = 'ADD'

export const DEC = 'DEC'

export const add = () => {
    return {
        type: ADD
    }
}

export const dec = () => {
    return {
        type: DEC
    }
}

const INITIAL_STATE = {
    count: 0
}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                count: state.count + 1
            }
        case DEC:
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}
