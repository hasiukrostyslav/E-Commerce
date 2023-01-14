import '../styles/main.scss';
import signInView from './views/SignInView';
import signUpView from './views/SignUpView';

function controlModal() {
  signInView.render();
  signInView.renderOverlay();
}

function init() {
  signInView.addHandlerRender(controlModal);
}
init();
