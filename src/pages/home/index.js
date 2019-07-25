import React, {Component} from 'react'
import './index.scss'

import logoIcon from '../../images/logo.png'

import Hello from '../../components/Hello/index'
// import Hello from 'components/Hello/index'

export default class Home extends Component {
    render() {
        return (
            <div className='home-page'>
                这是Home
                <Hello/>
                <div>
                    <img src={logoIcon} />
                </div>
            </div>
        )
    }
}
