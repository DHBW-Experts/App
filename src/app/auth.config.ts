import { isPlatform } from "@ionic/angular";
import config from "../../capacitor.config";
import { environment } from '../environments/environment';

export const domain = "dhbw-experts.eu.auth0.com";
export const clientId = "XLYPvlQsSiVxy178YXv3NoYEAruXHn3I";
const { appId } = config;

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const isApp = isPlatform("capacitor");

export const callbackUri = environment.production 
  ? isApp
    ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
    : "https://dhbw-experts.azurewebsites.net/callback"
  : "http://localhost:4200/callback";
