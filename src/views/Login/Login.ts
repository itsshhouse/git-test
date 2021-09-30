import Module from '@/generic/Module';
import ItsApp from '@/generic/ItsApp';

export default class Login extends Module {
  constructor(app: ItsApp) {
    super(app);
    this.name = 'Login';
  }
}
