import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';


import './App.css';


class CurrencyCalculator extends Component {

    constructor(props){
        super(props);

        this.state = {
            currency: '',
            currencyRates: [],
            fromCurrency: 'usd',
            toCurrency:'usd',
            amountToCalculate: '',
            resultOfCalculation: null,
            disableCalculation: true,
            errorMassage: ''
        };

        this.requestToServer = this.requestToServer.bind(this);
        this.fromCurrency = this.fromCurrency.bind(this);
        this.toCurrency = this.toCurrency.bind(this);
        this.setAmountToCalculate = this.setAmountToCalculate.bind(this)
    }

    getExchangeRatesFromServer(currency){
        axios.get(`http://api.fixer.io/latest?base=`+currency)
            .then(res => {
                this.setState({currencyRates: res.data.rates});
                this.calculateCurrency();
            });
    }


    calculateCurrency(){
        let costForOne = 1;
        for(var key in this.state.currencyRates){
            if(this.state.toCurrency === key.toLowerCase()){
                costForOne = this.state.currencyRates[key];
            }
        }

        let resultOfCalculation = costForOne*this.state.amountToCalculate;
        this.setState({resultOfCalculation: resultOfCalculation});
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    setAmountToCalculate(event){

        if(event.target.value !== ''
            && !this.isNumeric(event.target.value
            )){
            this.setState({
                amountToCalculate: '',
                disableCalculation: true,
                resultOfCalculation: null,
                errorMassage: 'Warning! The value must be a number'

            });
            return
        }

        if(!this.isNumeric(event.target.value)){
            this.setState({
                amountToCalculate: '',
                disableCalculation: true,
                resultOfCalculation: null,
                errorMassage: ''
            });
            return
        }
        this.setState({
            amountToCalculate: +event.target.value,
            disableCalculation: false,
            errorMassage: ''

        });
    }


    fromCurrency(event) {
        this.setState({fromCurrency: event.value.toLowerCase()});
    }


    toCurrency(event){
        this.setState({toCurrency: event.value.toLowerCase()});
    }


    requestToServer(){
        this.getExchangeRatesFromServer(this.state.fromCurrency)
    }


    render() {

        let optionsFrom = [
            {value: 'usd', label: 'USD'},
            {value: 'eur', label: 'EUR'},
            {value: 'rub', label: 'RUB'}
        ];
        let optionsTo = [
            {value: 'usd', label: 'USD'},
            {value: 'eur', label: 'EUR'},
            {value: 'rub', label: 'RUB'}
        ];


        return (


            <div className="news" >
                <div className="h2">Currency calculator</div>
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label >From:</label>
                                <Select
                                    clearable={false}
                                    name="form-field-name"
                                    value={this.state.fromCurrency}
                                    options={optionsFrom}
                                    onChange={this.fromCurrency}
                                />

                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label >To:</label>
                                <Select
                                    clearable={false}
                                    name="form-field-name"
                                    value={this.state.toCurrency}
                                    options={optionsTo}
                                    onChange={this.toCurrency}
                                />
                            </div>
                        </div>
                    </div>
                    <label>The amount to calculate:</label>

                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               onChange={this.setAmountToCalculate}
                               placeholder="Enter value"/>
                    </div>
                    <div className="form-group">
                        <button
                            id="calculate"
                            type="button"
                            className="btn btn-info"
                            onClick={this.requestToServer}
                            disabled={this.state.disableCalculation}
                        >Calculate</button>
                    </div>
                    <div className="form-group">
                        <div id="showCalculatorResult" className="h3">Result: {this.state.resultOfCalculation}
                            <p className="h4 form-warnings">{this.state.errorMassage}</p>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}



export default CurrencyCalculator;
