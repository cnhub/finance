import './index.less';
import React, { Component } from 'react'
import classNames from 'classnames/bind'

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
        const visible = false;
        this.state = {...defaultState, visible};
    }
	onChangeYear(evt){
		let value = evt.target.value != '' ? evt.target.value : defaultState.year;
		this.setState({
			year : value,
			visible: true
		});
	}
	onChangeRate(evt){
		let value = evt.target.value != '' ? evt.target.value : defaultState.rate;
		this.setState({
			rate : +value,
			visible: true
		});
	}
	onChangeInit(evt){
		let value = evt.target.value != '' ? evt.target.value : defaultState.init;
		this.setState({
			init : +value,
			visible: true
		});
	}
	onChangeMonth(evt){
		let value = evt.target.value != '' ? evt.target.value : defaultState.month;
		this.setState({
			month : +value,
			visible: true
		});
	}
	show(){
		const visible = true;
		this.setState({visible});
	}
	reset(){
		this.setState(defaultState);
		const form = document.getElementsByClassName('form')[0];
		form.reset();
	}
	render(){
		const { year, init, month, rate, visible } = this.state;
		const months = year * 12;
	    let total = init; 

	    for(var i=0; i < months; i++){
	        total *= (1 + rate/12/100);
	        total += month;
	    }
		return (
			<div>
				<div className={classNames({'section': true, 'result': true, 'visible' : visible})}>
                    <p>投入时间:<em>{year}年</em></p>
                    <p>初始额度:<em>{init.toFixed(2)}</em></p>
                    <p>月投额度:<em>{month.toFixed(2)}</em></p>
                    <p>收益类型:<em>先息后本</em></p>
                    <p>年化利率:<em>{`${rate}%`}</em></p>
                    <p>万份收益:<em>{(rate/365*100).toFixed(2)}</em></p>
                    <p>总收入:<em>{total.toFixed(2)}</em></p>
                    <p>总投入:<em>{(init + month * year * 12).toFixed(2)}</em></p>
                    <p>总盈利:<em>{( total - init - month * year * 12 ).toFixed(2)}</em></p>
				</div>
				<form className="section form">
				    <label>投入时间：
				        <input type="number" max="30" step="1"  placeholder="初始1年" onChange={::this.onChangeYear} />
				    </label>
				    <label>年化收益：
				        <input type="number" min="1" max="20" step="0.1"  placeholder="年化7.5%" onChange={::this.onChangeRate} />
				    </label>
				    <label>初始金额：
				        <input type="number" min="0" step="1000" placeholder="初始1w元" onChange={::this.onChangeInit} />
				    </label>
				    <label>月投金额：
				        <input type="number" min="0" step="1000"  placeholder="初始5k元" onChange={::this.onChangeMonth} />
				    </label>
				</form>
				<div className="section footer">
				    <span onClick={::this.show} className={classNames({'hidden' : visible})}>计算</span>
				    <span onClick={::this.reset} className={classNames({'hidden' : !visible})}>重置</span>
				</div>
			</div>
		)
	}
}
