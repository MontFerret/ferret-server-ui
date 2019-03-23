import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
// import * as serviceWorker from './serviceWorker';

const app = new App(createBrowserHistory());

ReactDOM.render(app.createElement(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
