import Module from '@/generic/Module';
import ItsApp from '@/generic/ItsApp';

export default class Menu extends Module {
  constructor(app: ItsApp) {
    super(app);
    this.name = 'Menu';
  }
}
