"use strict"

const { response } = require("express");

const objLogoutButton = new LogoutButton();

objLogoutButton.action = () => ApiConnector.logout((response) => {
    if(response.success){
        return location.reload();
    }
  }
);

ApiConnector.current(response => {
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
})

const objRatesBoard = new RatesBoard();

const getStocks = () => 
    ApiConnector.getStocks(response => {
    if(response.success){
        objRatesBoard.clearTable();
        objRatesBoard.fillTable(response.data)
    }
})

getStocks();

setInterval(getStocks, 60000);

const objMoneyManager = new MoneyManager();
const messageError = new ProfileWidget();

objMoneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if(response.success){
            messageError.showProfile(response.data)
        }
        objMoneyManager.setMessage(response.success, response.error) // уточнить момент с ошибкой
    });
};

objMoneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success){
            messageError.showProfile(response.data);
        }
        objMoneyManager.setMessage(response.success, response.error);
    });
}

objMoneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            messageError.showProfile(response.data)
        }
        objMoneyManager.setMessage(response.success, response.error)
    })
}

const objFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success){
        objFavoritesWidget.clearTable();
        objFavoritesWidget.fillTable(response);
        objMoneyManager.updateUsersList(response);
    }
})

objFavoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
    if (response.success){
        objFavoritesWidget.clearTable();
        objFavoritesWidget.fillTable(response);
        objMoneyManager.updateUsersList(response);
    }
    objFavoritesWidget.setMessage(response.success, response.error)
    })
}

objFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
         if (response.success){
        objFavoritesWidget.clearTable();
        objFavoritesWidget.fillTable(response);
        objMoneyManager.updateUsersList(response);
    }
    objFavoritesWidget.setMessage(response.success, response.error)
    })
}
