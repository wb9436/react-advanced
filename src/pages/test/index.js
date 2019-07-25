import React, {Component} from 'react'

import {add, dec} from '../../redux/counter/index'
import store from '../../redux/store'


/*打印初始状态*/
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

export default class Test extends Component {

    onAdd() {
        console.log('调用自增函数')
        store.dispatch(add())
    }

    onDec() {
        console.log('调用自减函数')
        store.dispatch(dec())
    }

    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={this.onAdd.bind(this)}>自增
                </button>
                <button onClick={this.onDec.bind(this)}>自减
                </button>
            </div>
        )
    }
}
