'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = function () {
    ApiConnector.logout((response) => {
        if (response.success) {
            document.location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getStocks() {
ApiConnector.getStocks((response => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});
}

getStocks();

setInterval(getStocks, 60000);

const MoneyManager = new MoneyManager(); 

moneyManager.addMoneyCallback = function({currency, amount}) {
    ApiConnector.addMoney({currency, amount}, (response) => { 
        if (response.success) {
            ProfileWidget.showProfile(response.data); 
            moneyManager.setMessage(response.success, 'Ваш баланс успешно пополнен.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}


moneyManager.conversionMoneyCallback = function({fromCurrency, targetCurrency, fromAmount}) {
    ApiConnector.convertMoney({fromCurrency, targetCurrency, fromAmount}, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация прошла успешно.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}


moneyManager.sendMoneyCallback = function({to, amount, currency}) {
    ApiConnector.transferMoney({to, amount, currency}, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Ваши средства переведены.');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable(); 
        favoritesWidget.fillTable(response.data); 
        moneyManager.updateUsersList(response.data); 
    }
});


favoritesWidget.addUserCallback = function({id, name}) {
    ApiConnector.addUserToFavorites({id, name}, (response) => { 
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен.');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}


favoritesWidget.removeUserCallback = function(userId) {
    ApiConnector.removeUserFromFavorites(userId, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удалён.');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}