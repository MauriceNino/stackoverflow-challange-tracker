class User {
	public userName: string = ""
	public stackoverflowUserObject: IStackoverflowUser = null
	public stackoverflowAnswers: IAnswer[] = null
	public calculatedPoints: number

	constructor (_userName: string) {
		this.userName = _userName
	}
}

class UserManager {
	private static challangeStartDate: Date = new Date('2019-03-30T00:00:00')

	public static async loadFullUserObj(user: User): Promise<User> {
		return new Promise<User>(async (resolve, reject) => {
			try {
				user.stackoverflowUserObject = await UserManager.getStackoverflowUser(user)
					
				user.stackoverflowAnswers = await UserManager.getAnswersAfterDate(
					await UserManager.getAnswersOfUser(user.stackoverflowUserObject), UserManager.challangeStartDate)
	
				user.calculatedPoints = await UserManager.calculatePointsOfUser(user)
	
				resolve(user)
			}catch(exception) {
				reject(exception)
			}
		})

	}

	public static async calculatePointsOfUser(user: User): Promise<number> {
		return new Promise<number> (async (resolve, reject) => {
			let points: number = 0

			user.stackoverflowAnswers.forEach((answer: IAnswer) => {
				points += answer.is_accepted? 15:0
				points += answer.score * 10
			})

			resolve(points)
		})

	}	

	public static async getStatsAfterDate (stackoverflowStats: IStat[], compareDate: Date) {
		return stackoverflowStats.filter((stat: IStat) => {
			let tempDate = new Date(stat.on_date * 1000)
			return tempDate >= compareDate
		})
	}
	
	public static async getStatsOfUser (stackoverflowUserObject: IStackoverflowUser): Promise<IStat[]> {
		return new Promise<IStat[]> ((resolve, reject) => {
			if(stackoverflowUserObject == undefined) reject()
				
			$.ajax(`https://api.stackexchange.com/2.2/users/${stackoverflowUserObject.user_id}/reputation?site=stackoverflow`,
			{
				dataType: 'json',
				error: (msg) => {
					reject(msg)
				},
				success: (data) => {
					resolve(data.items)
					UserManager.sleepBecauseStackoverflowLimits(data.backoff)
				},
				type: 'GET'
			})
		})
	}
	
	public static async getAnswersAfterDate (stackoverflowAnswers: IAnswer[], compareDate: Date) {
		return stackoverflowAnswers.filter((answer: IAnswer) => {
			let tempDate = new Date(answer.creation_date * 1000)
			return tempDate >= compareDate
		})
	}

	public static async getAnswersOfUser (stackoverflowUserObject: IStackoverflowUser): Promise<IAnswer[]> {
		return new Promise<IAnswer[]> ((resolve, reject) => {
			if(stackoverflowUserObject == undefined) reject()
				
			$.ajax(`https://api.stackexchange.com/2.2/users/${stackoverflowUserObject.user_id}/answers?order=desc&sort=creation&site=stackoverflow`,
			{
				dataType: 'json',
				error: (msg) => {
					reject(msg)
				},
				success: (data) => {
					resolve(data.items)
					UserManager.sleepBecauseStackoverflowLimits(data.backoff)
				},
				type: 'GET'
			})
		})
	}
	
	public static async getStackoverflowUser (user: User): Promise<IStackoverflowUser> {
		return new Promise<IStackoverflowUser> ((resolve, reject) => {
			$.ajax(`https://api.stackexchange.com/2.2/users?inname=${user.userName}&site=stackoverflow`,
			{
				dataType: 'json',
				error: (msg) => {
					reject(msg)
				},
				success: (data) => {
					resolve(data.items[0]) // Unwrap user
					UserManager.sleepBecauseStackoverflowLimits(data.backoff)
				},
				type: 'GET'
			})
		})
	}

	public static async sleepBecauseStackoverflowLimits (milliseconds: number){
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}
	
}

interface IAnswer {
	answer_id: number
	creation_date: number
	is_accepted: false
	last_activity_date: number
	owner: IStackoverflowUser
	question_id: number
	score: number
}

interface IStackoverflowUser {
	account_id: number
	badge_counts: {bronze: number, silver: number, gold: number}
	creation_date: number
	display_name: string
	is_employee: boolean
	last_access_date: number
	last_modified_date: number
	link: string
	location: string
	profile_image: string
	reputation: number
	reputation_change_day: number
	reputation_change_month: number
	reputation_change_quarter: number
	reputation_change_week: number
	reputation_change_year: number
	user_id: number
	user_type: string
	website_url: string
}

interface IStat {
	on_date: number
	post_id: number
	post_type: string
	reputation_change: number
	user_id: number
	vote_type: string
}