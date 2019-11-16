class ChartManager {
    private chart: Chart 

    constructor(_chart: Chart){
        this.chart = _chart
    }

    public setTimeLineOfChart(date: Date, date2: Date){
        let tempDate: Date = new Date(date.getTime())
        while(tempDate <= date2){
            tempDate.setDate(tempDate.getDate() + 1)

            this.chart.data.labels.push(this.getDateString(tempDate))
            this.chart.update()
        }
    }

    public addPointUpdateToChart(user: User): void {
        
        let dataSet: any = {
            label: user.userName,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: this.getRandomColor(),
            data: new Array(this.chart.data.labels.length).fill(NaN)
        }

        let sum: number = 0
        user.viableStackoverflowStats.slice().reverse().forEach((stat)=>{
            let statDate: Date = new Date(stat.on_date * 1000)
            let insertIndex: number = this.chart.data.labels.indexOf(this.getDateString(statDate))
            
            if(insertIndex !== -1) {
                sum += stat.reputation_change
                dataSet.data.splice(insertIndex, 1, sum)
            }

        })
        if(isNaN(dataSet.data[0]))
            dataSet.data.splice(0, 1, 0)

        if(isNaN(dataSet.data[dataSet.data.length-1]))
            dataSet.data.splice(dataSet.data.length-1, 1, dataSet.data.slice().reverse().find((fdat: number) => !isNaN(fdat)))
        this.chart.data.datasets.push(dataSet)
        this.chart.update()
    }

    private getRandomColor(): string {
        var letters: string[] = '0123456789ABCDEF'.split('');
        var color: string = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private getDateString(date: Date): string {
        return date.toISOString().slice(0,10)
    }
}