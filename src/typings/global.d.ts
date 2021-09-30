import ItsApp from '@/generic/ItsApp';

declare global {
  const itsApp: ItsApp;

  interface Window {
    itsApp: any;
  }
}
