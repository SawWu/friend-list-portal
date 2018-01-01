import React, { Component } from 'react';
import { render } from 'react-dom';
import Item from './component/Item'
import dataList from './data/data';
import './less/style';

class App extends Component{
    constructor(prop){
        super(prop);
        this.state={
            showList:[true,false,false]
        };
        this.changeList=this.changeList.bind(this);
    }
    setShow(){
        return Object.keys(dataList).map((val,index)=>{
            return (
                <Item
                key={index}
                data={dataList[val]}
                show={this.state.showList[index]}
                ccc={this.changeList}
                index={index}
                />
            )
        });
    }
    changeList(i){
        let showList=this.state.showList.map((val,index)=>{
            if(i == index){
                return true;
            }
            return false;
        });
        this.setState({
            showList
        });
        console.log(showList);
    };
    render() {
        return (
            <div className="panel">
                {
                    this.setShow()
                }
            </div>
        )
    }
};


render(
    <App/>,
    document.querySelector('#root')
);