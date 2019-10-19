
let users: User[] = [
    new User("MauriceNino"),
    new User("Thomas Herzog"),
    new User("Erhard Siegl"),
    new User("Wirnse"),
    new User("patrick.holzer"),
    new User("meaningqo"),
    new User("Clemens Kaserer")
]

$(document).ready(() => { 
    let today: Date = new Date()
    $("#fromDate").val(UserManager.challangeStartDate.toISOString().slice(0,10))
    $("#toDate").val(today.toISOString().slice(0,10))
    Chart.defaults.line.spanGaps = true
    let elem = <HTMLCanvasElement> document.getElementById('myChart')
    let ctx = elem.getContext('2d')
    let chart = new Chart(ctx, {
        type: 'line',
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    })
    let cm: ChartManager = new ChartManager(chart)

    cm.setTimeLineOfChart(UserManager.challangeStartDate, new Date())

    users.forEach((user: User) => {
        UserManager.loadFullUserObj(user)
        .then((fullUser: User) => {
            console.log(`Name: ${fullUser.userName}`)
            console.log(`Points: ${fullUser.calculatedPoints}`)
            console.log(fullUser)
            cm.addPointUpdateToChart(fullUser)
        }).catch((exception) => {
            console.error(exception.responseJSON)
        })
    })
})

function updateChart() {
    $('#myChart').remove()
    $('#chartWrapper').append('<canvas id="myChart" height="60%"></canvas>')
    let startDate: Date = new Date(<string>$("#fromDate").val())
    let endDate: Date = new Date(<string>$("#toDate").val())

    Chart.defaults.line.spanGaps = true
    let elem = <HTMLCanvasElement> document.getElementById('myChart')
    let ctx = elem.getContext('2d')
    let chart = new Chart(ctx, {
        type: 'line',
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    })
    let cm: ChartManager = new ChartManager(chart)
    cm.setTimeLineOfChart(startDate, endDate)
    users.forEach((user: User) => {
        cm.addPointUpdateToChart(user)
    })
}
