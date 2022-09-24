/**
 * Format all user's data
 * @param {String} source - data source (api_data or mocked_data)
 * @param {Object} filtered_mocked_data - filter the mocked data to take only current user's data
 * @param {Object} main_data - contain key_data, today_score, user_id and user_infos
 * @param {Array<Obect>} activity - data about the day, actual weight and calories burned
 * @param {Array<Obect>} average_session - data about the day and sessions' length
 * @param {Array<Obect>} performance - data about user's performances
 */
export default class Format_mocked_data {
	constructor(data, id) {

		this.source = "mocked_data"

		const filtered_mocked_data = {
			USER_MAIN_DATA : data.USER_MAIN_DATA.filter((data) => data.id === id)[0],
			USER_ACTIVITY : data.USER_ACTIVITY.filter((data) => data.userId === id)[0],
			USER_AVERAGE_SESSIONS : data.USER_AVERAGE_SESSIONS.filter((data) => data.userId === id)[0],
			USER_PERFORMANCE : data.USER_PERFORMANCE.filter((data) => data.userId === id)[0],
		}

		this.main_data = {
			user_id: filtered_mocked_data.USER_MAIN_DATA.id,
			user_infos: filtered_mocked_data.USER_MAIN_DATA.userInfos,
			today_score: filtered_mocked_data.USER_MAIN_DATA.todayScore || filtered_mocked_data.USER_MAIN_DATA.score,
			key_data: filtered_mocked_data.USER_MAIN_DATA.keyData
		}
		
		this.activity = filtered_mocked_data.USER_ACTIVITY.sessions.map(session => ({
			day: session.day.toString().slice(-1),
			kilogram: session.kilogram,
			calories: session.calories,
		}))

		this.average_sessions = filtered_mocked_data.USER_AVERAGE_SESSIONS.sessions.map(session => ({
			day: formatted_day[session.day],
			sessionLength: session.sessionLength
		}))

		this.performance =  filtered_mocked_data.USER_PERFORMANCE.data.map(data => ({
			value: data.value,
			kind: formatted_kind[data.kind],
		}))

	}
}

const formatted_kind = { 1: 'Cardio', 2: 'Energie', 3: 'Endurance', 4: 'Force', 5: 'Vitesse', 6: 'Intensité' }
const formatted_day =  { 1: 'L', 2: 'M', 3: 'Me', 4: 'J', 5: 'V', 6: 'S', 7: 'D' } 
