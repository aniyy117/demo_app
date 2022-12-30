import moment from "moment";
import {
  setItems,
  clear,
  getItem,
  addNewUserInUserArry,
} from "../ui-componets/utils/storage";

export interface ICredentials {
  email?: string;
  password?: string;
  user_name?: string;
  session?: string;
  theme?: boolean;
}

// --------------------------------------- prototype pattern -------------------------------

class authenticate {
  login = (credentials: ICredentials) => {
    const { user_name, password, session, theme } = credentials;
    const obj = {
      user_name: user_name,
      password: password,
      session: session,
      theme: theme,
    };

    const myPromise = new Promise((resolve, reject) => {
      if (!this.users) {
        reject("User not found");
      }
      const checkingExistingUser = this.users.find(
        (user: any) =>
          user.user_name === user_name && user.password === password
      );
      setTimeout(() => {
        if (checkingExistingUser) {
          setItems.call(sessionStorage, obj);
          window.location.replace("/#/landing");
          resolve(true);
        }
        reject("User not found");
      }, 1000);
    });

    return myPromise;
  };

  get rememberMe() {
    return this.getItemSS("rememberMe");
  }

  private getItemLS = getItem.bind(localStorage);
  private getItemSS = getItem.bind(sessionStorage);

  logout = (cb?: () => void) => {
    // clear.call(localStorage);
    clear.call(sessionStorage);
    window.location.replace("/");
    if (cb) setTimeout(cb, 200);
  };

  get users() {
    return this.getItemLS("users");
  }

  get isLoggedIn() {
    return this.getItemSS("user_name");
  }

  get theme() {
    return this.getItemSS("theme");
  }

  get isSessionTimedOut() {
    const timmer =
      this.getItemSS("session") > moment().format("MMMM Do YYYY, h:mm:ss a");
    return !timmer;
  }

  updateTheme = (theme: boolean) => {
    setItems.call(sessionStorage, { theme: theme });
  };

  register = (credentials: ICredentials) => {
    const { user_name, password, email } = credentials;
    const obj = {
      user_name: user_name,
      password: password,
      email: email,
    };

    const myPromise = new Promise((resolve, reject) => {
      if (!this.users) {
        addNewUserInUserArry.call(localStorage, obj, "users");
        resolve(true);
      }
      const checkingExistingUser = this.users.find(
        (user: any) => user.user_name === user_name
      );

      setTimeout(() => {
        if (checkingExistingUser) {
          reject("User Already Exist");
        } else {
          addNewUserInUserArry.call(localStorage, obj, "users");
          resolve(true);
        }
      }, 1000);
    });

    return myPromise;
  };
}
const AUTH = new authenticate();

export { AUTH };
