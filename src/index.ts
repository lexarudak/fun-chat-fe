import { App } from './app';
import './styles.css';
import { ws } from './ws/ws';

ws.init();

const app = new App();
app.showLoader();

ws.socket.onopen = () => {
  app.hideLoader();
  app.init();
};

ws.socket.onclose = () => {
  app.showLoader();
  ws.socket.close();
};
