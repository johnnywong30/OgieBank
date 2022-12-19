import { User } from '../../models/User'

const initialState = {
    user: {},
    auth: false
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case "LOGIN_USER":
            return {
                ...state,
                user: new User(payload),
                auth: true
            }
        case "LOGOUT_USER":
            return {
                ...state,
                user: {},
                auth: false
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: new User(payload),
                auth: true
            }
        case "ADD_TRANSACTION_USER":
            let userData = state.user;

            let category = payload.category;
            let payment = payload.payment;
            let amount = payload.amount; 

            let updatedBalance = userData.accountInfo.bankBalance;
            let updatedCreditBalance = userData.accountInfo.creditBalance;

            //update Accounts
            if (payment === "Bank"){
                if (category === "Deposit") {
                    updatedBalance = updatedBalance + amount;
                } else {
                    updatedBalance = updatedBalance + (-1)*amount;
                }
                userData.accountInfo.bankBalance = updatedBalance;
            } else if (payment === "Credit") {
                if (category === "Deposit") {
                    updatedCreditBalance = updatedCreditBalance + (-1)* amount;
                } else {
                    updatedCreditBalance = updatedCreditBalance + amount;
                }
                userData.accountInfo.creditBalance = updatedCreditBalance;
            }

            //update Budget
            if (category === "Deposit"){
                userData.budget.monthIncome = userData.budget.monthIncome + amount;
            } else {
                let findSpending = userData.categories.spending.find(object => {return object.name === category});
                let findIndex = userData.categories.spending.findIndex(object => {return object.name === category});
                if (findSpending) {
                    userData.budget.monthVariable = userData.budget.monthVariable + amount;
                    userData.categories.spending[findIndex].balance =  userData.categories.spending[findIndex].balance + amount;
                }
            }

            return {
                ...state,
                user: new User(userData),
                auth: true,
            }

        case "DELETE_TRANSACTION_USER":
            let userData2 = state.user;

            let category2 = payload.category;
            let payment2 = payload.payment;
            let amount2 = payload.amount; 

            let updatedBalance2 = userData2.accountInfo.bankBalance;
            let updatedCreditBalance2 = userData2.accountInfo.creditBalance;

            //update Accounts
            if (payment2 === "Bank"){
                if (category2 === "Deposit") {
                    updatedBalance2 = updatedBalance2 + (-1)*amount2;
                } else {
                    updatedBalance2 = updatedBalance2 + amount2;
                }
                userData2.accountInfo.bankBalance = updatedBalance2;
            } else if (payment2 === "Credit") {
                if (category2 === "Deposit") {
                    updatedCreditBalance2 = updatedCreditBalance2 + amount2;
                } else {
                    updatedCreditBalance2 = updatedCreditBalance2 + (-1)*amount2;
                }
                userData2.accountInfo.creditBalance = updatedCreditBalance2;
            }

            //update Budget
            if (category2 === "Deposit"){
                userData2.budget.monthIncome = userData2.budget.monthIncome + (-1)*amount2;
            } else {
                let findSpending = userData2.categories.spending.find(object => {return object.name === category});
                let findIndex = userData2.categories.spending.findIndex(object => {return object.name === category});
                if (findSpending) {
                    userData2.budget.monthVariable = userData2.budget.monthVariable + (-1)*amount2;
                    userData2.categories.spending[findIndex].balance =  userData2.categories.spending[findIndex].balance + (-1)*amount2;
                }
            }

            return {
                ...state,
                user: new User(userData2),
                auth: true,
            }
        case "ADD_CATEGORY_EXPENSE_USER":
            let userData3 = state.user
            let adding = payload.amount;

            let updateMonthlyRecurring = userData3.budget.monthRecurring;
            userData3.budget.monthRecurring = updateMonthlyRecurring + adding;

            return {
                ...state,
                user: new User(userData3),
                auth: true,
            }
        case "DELETE_CATEGORY_EXPENSE_USER":
            let userData4 = state.user
            let temp = payload.amount;

            let updateMonthlyRecurring2 = userData4.budget.monthRecurring;
            userData4.budget.monthRecurring = updateMonthlyRecurring2 + (-1)*temp;

            return {
                ...state,
                user: new User(userData4),
                auth: true,
            }
        default:
            return state
    }
}

export default authReducer;