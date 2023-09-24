
import config from '../config';
import { BaseInterface } from './Base';
import App from './app';
import Command from './command';
import '../module/user/services';

let app: BaseInterface;

if (process.argv.length > 2) {
    app = new Command(config);
} else {
    app = new App(config);
}

export default app;

// Launch app
app.init().catch(error => console.error(error));
