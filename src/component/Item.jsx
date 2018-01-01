import React, { Component } from 'react';
import List from './List'

export default class Item extends Component{
    constructor(prop){
        super(prop);
        this.state={
            show: this.props.show
        };
        this.changeList = this.changeList.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,nextState);
        if(this.state.show !=  nextProps.show){
            this.setState({
                show: nextProps.show
            });
        }
        return true;
    }
    changeList(){
        let show=!this.state.show;
        this.setState({
            show
        });
        if(show){
            this.props.ccc(this.props.index);
        }
    }
    render(){
        return (
            <div>
                <h2 className="title" onClick={this.changeList}>{this.props.data.name}</h2>
                {this.state.show? <List list={this.props.data.list}/> : ''}
            </div>
        )
    }
}