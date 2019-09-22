import { createReducer } from 'redux-starter-kit';
import { Action } from 'redux';
import { changeCategoryTitleAction } from './actions';
import State from './types';

const initialState: State = {
	name: "<not defined>",
};

const changeCategoryTitle = (state: State, action: Action) => {
	state.name = "Changed!";
};

const main = createReducer(initialState, {
	[changeCategoryTitleAction.type]: changeCategoryTitle,
})

export default main;
