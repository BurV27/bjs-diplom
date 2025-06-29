"use strict";

const objLogoutButton = new LogoutButton();

objLogoutButton.action = () =>
  ApiConnector.logout((response) => {
    if (response.success) {
      return location.reload();
    }
  });

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const objRatesBoard = new RatesBoard();

const getStocks = () =>
  ApiConnector.getStocks((response) => {
    if (response.success) {
      objRatesBoard.clearTable();
      objRatesBoard.fillTable(response.data);
    }
  });

getStocks();
setInterval(getStocks, 60000);

const objMoneyManager = new MoneyManager();

objMoneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    objMoneyManager.setMessage(response.success, response.success ? "Операция успешна!" : response.error) ; 
  });
};

objMoneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    objMoneyManager.setMessage(response.success, response.success ? "Операция успешна!" : response.error) ;
  });
};

objMoneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
    objMoneyManager.setMessage(response.success, response.success ? "Операция успешна!" : response.error);
  });
};

const objFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    objFavoritesWidget.clearTable();
    objFavoritesWidget.fillTable(response.data);
    objMoneyManager.updateUsersList(response.data);
  }
});

objFavoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      objFavoritesWidget.clearTable();
      objFavoritesWidget.fillTable(response.data);
      objMoneyManager.updateUsersList(response.data);
    }
    objFavoritesWidget.setMessage(response.success, response.success ? "Операция успешна!" : response.error) 
  });
};

objFavoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      objFavoritesWidget.clearTable();
      objFavoritesWidget.fillTable(response.data);
      objMoneyManager.updateUsersList(response.data);
    }
    objFavoritesWidget.setMessage(response.success, response.success ? "Операция успешна!" : response.error);
  });
};
