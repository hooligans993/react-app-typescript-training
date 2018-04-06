import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './app/registerServiceWorker';
import './style/index.css';
import { MuiThemeProvider } from 'material-ui/styles';

ReactDOM.render(
    <MuiThemeProvider>

    <App />
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
