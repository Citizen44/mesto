export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const dataUser = {
      name: this._profileName.textContent,
      info: this._profileJob.textContent,
    };
    return dataUser;
  }

  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.userName;
    this._profileJob.textContent = dataUser.userJob;
  }
}