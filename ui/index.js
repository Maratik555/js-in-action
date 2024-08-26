import {AppComponent} from './components/App.component.js';

const root = document.getElementById('root');

root.innerHTML = '';
const appComponent = AppComponent();
root.append(appComponent.element);




