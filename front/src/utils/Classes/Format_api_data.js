/**
 * Format all user's data
 * @param {Object} main_data - contain key_data, today_score, user_id and user_infos
 * @param {String} source - data source (api_data or mocked_data)
 * @param {Array<Obect>} activity - data about the day, actual weight and calories burned
 * @param {Array<Obect>} average_session - data about the day and sessions' length
 * @param {Array<Obect>} performance - data about user's performances
 */
export default class Format_api_data {
	constructor(data) {

		this.source = "api_data"

		this.main_data = {
			user_id: data?.USER_MAIN_DATA?.data?.userId,
			user_infos: data?.USER_MAIN_DATA?.data?.userInfos,
			today_score: data?.USER_MAIN_DATA?.data?.todayScore,
			key_data: data?.USER_MAIN_DATA?.data?.keyData
		}
		
		this.activity = data?.USER_ACTIVITY?.data?.sessions?.map(session => ({
			day: session.day.toString().slice(-1),
			kilogram: session.kilogram,
			calories: session.calories,
		}))

		this.average_sessions = data?.USER_AVERAGE_SESSIONS?.data?.sessions?.map(session => ({
			day: formatted_day[session.day],
			sessionLength: session.sessionLength
		}))

		this.performance =  data?.USER_PERFORMANCE?.data?.data?.map(data => ({
			value: data.value,
			kind: formatted_kind[data.kind],
		}))

	}
}


const formatted_kind = { 1: 'Cardio', 2: 'Energie', 3: 'Endurance', 4: 'Force', 5: 'Vitesse', 6: 'Intensité' }
const formatted_day =  { 1: 'L', 2: 'M', 3: 'Me', 4: 'J', 5: 'V', 6: 'S', 7: 'D' } 
