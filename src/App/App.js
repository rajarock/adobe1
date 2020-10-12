import Shopping from '../Component/cart'
import './index.scss'


function renderApp() {
    const cartDom =  Shopping()

   const tempWrapper = document.createElement('div');
tempWrapper.innerHTML = cartDom;

document.getElementById('app-root').appendChild(tempWrapper.firstChild);
}

renderApp()
