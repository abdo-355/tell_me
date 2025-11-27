declare module "*.module.css";
declare module "*.png";
declare module "*.svg";

declare global {
  interface Window {
    chrome?: any;
  }
}
