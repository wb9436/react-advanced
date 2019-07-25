import React, {Component} from 'react'
import {connect} from 'react-redux'

import {ADD, DEC, add, dec} from '../../redux/counter/index'

class Counter extends Component {

    onAdd() {
        console.log('调用自增函数')
        console.log(this.props)
        this.props.add()
    }

    onDec() {
        console.log('调用自减函数')
        this.props.dec()
    }

    render() {
        return (
            <div className='counter-page'>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={this.onAdd.bind(this)}>自增
                </button>
                <button onClick={this.onDec.bind(this)}>自减
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch(add())
        },
        dec: () => {
            dispatch(dec())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
