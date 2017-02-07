import './index.less';
import React, { Component } from 'react'

const defaultState = {
			year : 1,
			init : 1000 * 10,
			month : 1000 * 5,
			rate : 7.5,
			total: 0
        };
export default class Home extends Component {
	constructor(props) {
        super(props);
        this.state = defaultState;
    }
	reset(){
		this.setState(defaultState);
	}
	onChangeYear(evt){
		this.setState({
			year : +evt.target.value
		});
	}
	onChangeRate(evt){
		this.setState({
			rate : +evt.target.value
		});
	}
	onChangeInit(evt){
		this.setState({
			init : +evt.target.value
		});
	}
	onChangeMonth(evt){
		this.setState({
			month : +evt.target.value
		});
	}
	render(){
		const { year, init, month, rate } = this.state;
		const months = year * 12;
	    let total = init; 

	    for(var i=0; i < months; i++){
	        total *= (1 + rate/12/100);
	        total += month;
	    }
		return (
			<div>
				<div className="section result">
					<p>投入时间:{year}年</p>
					<p>初始额度:{init.toFixed(2)}</p>
					<p>月投额度:{month.toFixed(2)}</p>
					<p>万份收益:{(rate/365*100).toFixed(2)}</p>
					<p>收益类型:先息后本</p>
					<p>总收入:{total.toFixed(2)}</p>
					<p>总投入:{(init + month * year * 12).toFixed(2)}</p>
					<p>总盈利:{( total - init - month * year * 12 ).toFixed(2)}</p>
				</div>
				<div className="section form">
				    <label>投入时间：
				        <input type="text"  placeholder="初始1年" onChange={::this.onChangeYear} />
				    </label>
				    <label>年化收益：
				        <input type="text"  placeholder="年化7.5%" onChange={::this.onChangeRate} />
				    </label>
				    <label>初始金额：
				        <input type="text"  placeholder="初始1w元" onChange={::this.onChangeInit} />
				    </label>
				    <label>月投金额：
				        <input type="text"  placeholder="初始5k元" onChange={::this.onChangeMonth} />
				    </label>
				</div>
				<div className="section footer">
				    <span className="submit" onClick={::this.reset}>重置</span>
				</div>
			</div>
		)
	}
}
