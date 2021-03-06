import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getUserInfo} from '../../redux/userInfo/index'

class User extends Component {

    render() {
        const {userInfo, isLoading, errorMsg} = this.props.userInfo

        return (
            <div className='user-page'>
                {
                    isLoading ? '请求信息中......' :
                        (errorMsg ? errorMsg :
                            <div>
                                <p>用户信息：</p>
                                <p>用户名：{userInfo.name}</p>
                                <p>介绍：{userInfo.desc}</p>
                            </div>
                        )
                }
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, {getUserInfo})(User)
