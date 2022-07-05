'use strict';

// logout functionality
const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
}

// user data
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

// money rates
const ratesBoard = new RatesBoard();

function getMoneyRates(){
    ApiConnector.getStocks(response => { 
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

getMoneyRates();
setInterval(getMoneyRates, 60000);

// deposit money
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data){
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Баланс пополнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// convertion of money

moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// transfer of money

moneyManager.sendMoneyCallback = function(data){
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// initial favorites list

const favorite = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        moneyManager.updateUserList;
    }
})

// add new user to favorites

favorite.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            moneyManager.updateUserList;
            favorite.setMessage(true, 'Пользователь добавлен');
        } else {
            favorite.setMessage(false, response.error);
        }
    })
}

// delete of user from favorites

favorite.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            moneyManager.updateUserList;
            favorite.setMessage(true, 'Пользователь удален');
        } else {
            favorite.setMessage(false, response.error);
        }
    })
}




