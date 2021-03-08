import Types from './actionTypes';

export const setSplashing = splashing => ({ type: Types.SET_SPLASHING, splashing });
export const setConfig = config => ({ type: Types.SET_CONFIG, config });
export const setCompanies = companies => ({ type: Types.SET_COMPANIES, companies });
export const setGames = games => ({ type: Types.SET_GAMES, games });
export const setGameParams = params => ({ type: Types.SET_GAME_PARAMS, params });
export const increaseRewarded = initialize => ({ type: Types.INCREASE_REWARDED, initialize });
