import React, { Component } from 'react';

export default class List extends Component{
    render(){
        return (
            <ul>
                {
                    this.props.list.map((val,index)=>{
                        return(
                            <li key={index}>
                                <p className="vip">{val.username}</p>
                                <p className="message">{val.message}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}