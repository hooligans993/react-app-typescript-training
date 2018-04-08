import * as React from 'react';
import '../style/App.css';
import '../../node_modules/antd/dist/antd.css';
import '../style/bootstrap-material-design.css';
import Order from './IOrder';
import * as _ from 'lodash';
import InputsValidator from './Validate';
import { initialValidatorState, orders } from './consts';
import PicturesWall from './components/PicturesWall';

const logo = require('../img/logo.svg');

class App extends React.Component<{},
    { orders: Order[], checkedAll: boolean, validatorState: InputsValidator[] }> {
    constructor(props: {}) {
        super(props);
        this.state = {orders, checkedAll: false, validatorState: initialValidatorState};
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Order Table</h1>
                </header>

                <PicturesWall/>

                <div>
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>
                                <input
                                    onClick={this.checkedAll}
                                    checked={this.state.checkedAll}
                                    type="checkbox"
                                />
                            </th>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Package Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) =>
                            <tr key={order.id}>
                                <td>
                                    <input
                                        checked={order.checked}
                                        name={order.id + '#check'}
                                        onChange={this.onChecked}
                                        type="checkbox"
                                    />
                                </td>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.type}</td>
                                <td>
                                    <input
                                        className="form-control is-invalid"
                                        name={order.id + '#packageQuantity'}
                                        onChange={this.onChange}
                                        value={order.packageQuantity}
                                    />
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        name={order.id + '#price'}
                                        onChange={this.onChange}
                                        value={order.price}
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <button className="btn btn-raised btn-danger" onClick={this.removedCheckedOrders}>
                    Remove checked orders
                </button>
            </div>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentOrders: Order[] = this.state.orders;
        const id: number = Number(_.first(event.target.name.split('#')));
        const index: number = _.findIndex(currentOrders, {id});
        currentOrders[index][event.target.name.split('#')[1]] = Number(event.target.value);
        let checkedCount: number = 0;
        currentOrders.map((order) => order.checked && checkedCount++);
        this.setState({orders: currentOrders});
    }

    private onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentOrders: Order[] = this.state.orders;
        const id: number = Number(_.first(event.target.name.split('#')));
        const index: number = _.findIndex(currentOrders, {id});
        currentOrders[index].checked = event.target.checked;
        let checkedCount: number = 0;
        currentOrders.map((order) => order.checked && checkedCount++);
        this.setState({orders: currentOrders, checkedAll: checkedCount === currentOrders.length});
    }

    private checkedAll = () => {
        this.state.orders.map((order) => order.checked = !this.state.checkedAll);
        this.setState({checkedAll: !this.state.checkedAll});
    }

    private removedCheckedOrders = () => {
        this.setState({orders: _.remove(this.state.orders, {checked: true})});
    }
}

export default App;
