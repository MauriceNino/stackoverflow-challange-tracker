$(document).ready(() => {
    let users: User[] = [
        new User("MauriceNino"),
        new User("Thomas Herzog"),
        new User("Erhard Siegl"),
        new User("Wirnse")
    ]

    users.forEach((user: User) => {
        UserManager.loadFullUserObj(user)
        .then((fullUser: User) => {
            console.log(`Name: ${fullUser.userName}`)
            console.log(`Points: ${fullUser.calculatedPoints}`)
            console.log(fullUser)
        }).catch((exception) => {
            console.error(exception.responseJSON)
        })
    })
})