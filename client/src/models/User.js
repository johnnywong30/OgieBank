export class User {
    constructor (user) {
        this.id = user.id
        this.displayName = user.displayName
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.email = user.email
        this.accountInfo = user.accountInfo
        this.payInfo = user.payInfo
        this.budget = user.budget
        this.categories = user.categories
        this.transactions = user.transactions
        this.summary = user.summary
    }
}