export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";

function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}

const initState = {
    isLoading: false,
    userInfo: {},
    errorMsg: ''
}

// export function getUserInfo() {
//     return function (dispatch) {
//         dispatch(getUserInfoRequest())
//
//         setTimeout(() => {
//             return fetch('http://192.168.1.166:9080/upload/api/user.json')
//                 .then((response => {
//                     return response.json()
//                 }))
//                 .then((json) => {
//                         dispatch(getUserInfoSuccess(json))
//                     }
//                 ).catch(
//                     (e) => {
//                         console.log(e)
//                         dispatch(getUserInfoFail());
//                     }
//                 )
//         }, 2000)
//     }
// }

// export default function userInfo(state = initState, action) {
//     switch (action.type) {
//         case GET_USER_INFO_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true,
//                 userInfo: {},
//                 errorMsg: ''
//             }
//         case GET_USER_INFO_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 userInfo: action.userInfo,
//                 errorMsg: ''
//             }
//         case GET_USER_INFO_FAIL:
//             return {
//                 ...state,
//                 isLoading: false,
//                 userInfo: {},
//                 errorMsg: '请求错误'
//             }
//         default:
//             return state
//     }
// }

export function getUserInfo() {
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.get(`http://192.168.1.166:9080/upload/api/user.json`)
    }
}

export default function userInfo(state = initState, action) {
    console.log(action)

    switch (action.type) {
        case GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.result.data,
                errorMsg: ''
            }
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: '请求错误'
            }
        default:
            return state
    }
}




