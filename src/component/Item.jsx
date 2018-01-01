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
    showList(show){
        let list=this.refs.list;
        if(show){
            list.style.height = list.scrollHeight + "px";
        } else {
            list.style.height = 0;
        }
    }
    componentDidMount(){
        this.showList(this.state.show);
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.show !=  nextProps.show){
            this.setState({
                show: nextProps.show
            });
        }
        if(this.state.show != nextState.show){
            this.showList(nextState.show);
        }
        return false;
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
                <div className="listWrap" ref="list">
                    <List list={this.props.data.list}/>
                </div>

            </div>
        )
    }
}