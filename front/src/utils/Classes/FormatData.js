/**
 * Format all user's data
 * @param {Object} user_main_data - contain key_data, today_score, user_id and user_infos
 * @param {Array<Obect>} user_activity - data about the day, actual weight and calories burned
 * @param {Array<Obect>} user_average_session - data about the day and sessions' length
 * @param {Array<Obect>} user_performance - data about user's performances
 */
export default class FormatData {
	constructor(user_main_data, user_activity, user_average_session, user_performance) {

		this.user_main_data = {
			user_id: user_main_data?.id,
			user_infos: user_main_data?.userInfos,
			today_score: user_main_data?.todayScore ? user_main_data?.todayScore : user_main_data?.score,
			key_data: user_main_data?.keyData
		}
		
		this.user_activity = user_activity?.sessions?.map(session => ({
			day: session.day.toString().slice(-1),
			kilogram: session.kilogram,
			calories: session.calories,
		}))

		this.user_average_sessions = user_average_session?.sessions?.map(session => ({
			day: formatted_day[session.day],
			sessionLength: session.sessionLength
		}))

		this.user_performance = user_performance?.data.map(performance => ({
			value: performance.value,
			kind: formatted_kind[user_performance.kind[performance.kind]],
		}))

	}
}

const formatted_kind = { cardio: 'Cardio', energy: 'Energie', endurance: 'Endurance', strength: 'Force', speed: 'Vitesse', intensity: 'Intensité' }
const formatted_day =  { 1: 'L', 2: 'M', 3: 'Me', 4: 'J', 5: 'V', 6: 'S', 7: 'D' } 
