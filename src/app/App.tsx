import * as React from 'react';
import '../style/App.css';
import '../../node_modules/antd/dist/antd.css';
import '../style/bootstrap-material-design.css';
import PicturesWall from './components/PicturesWall';
// import Table from './components/Table';

const logo = require('../img/logo.svg');

export default class App extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Order Table</h1>
                </header>

                <PicturesWall/>

                {/*<Table/>*/}

            </div>
        );
    }
}
