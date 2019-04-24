$(document).ready(() => {
	let users = [
		new User('MauriceNino'),
		new User('Thomas Herzog'),
		new User('Erhard Siegl'),
		new User('Wirnse'),
	]
	
	let challangeStartDate = new Date('2019-03-30T00:00:00')
	
	users.forEach((user)=>{
		user.setUserSOInternal().then(()=>{
			user.setStatsInternal().then(()=>{
				user.getStatsBeforeDate(challangeStartDate).then((stats)=> {
					console.log(`Name: ${user.userName}`)
					let points = 0
					stats.forEach(stat => points += parseInt(stat.reputation_change))
					console.log(`Points: ${points}`)
					console.log(stats)
				})
			})
		})
	})
})

function User(_userName){
	this.userName = _userName
	this.userSO = undefined
	this.stats = undefined
	
	this.getStatsBeforeDate = async (compareDate) => {
		if(this.stats == undefined) return undefined
		
		return this.stats.filter(stat => {
			let tempDate = new Date(stat.on_date * 1000)
			return tempDate >= compareDate
		})
	}
	
	this.setStatsInternal = async () => {
		this.stats = await this.loadUserStats()
	}
	
	this.loadUserStats = async () => {
		return new Promise((resolve, reject) => {
			if(this.userSO == undefined) reject()
				
			$.ajax(`https://api.stackexchange.com/2.2/users/${this.userSO.user_id}/reputation?site=stackoverflow`,
			{
				dataType: 'json',
				error: (msg) => {
					reject(msg)
				},
				success: (data) => {
					resolve(data.items)
				},
				type: 'GET'
			})
		})
	}
	
	this.setUserSOInternal = async () => {
		this.userSO = await this.loadUserSO()
		this.userSO = this.userSO.items[0] // Unwrap user
	}
	
	this.loadUserSO = async () => {
		return new Promise((resolve, reject) => {
			$.ajax(`https://api.stackexchange.com/2.2/users?inname=${this.userName}&site=stackoverflow`,
			{
				dataType: 'json',
				error: (msg) => {
					reject(msg)
				},
				success: (data) => {
					resolve(data)
				},
				type: 'GET'
			})
		})
	}
	
}
