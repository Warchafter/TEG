import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* toggleCorpoView(action) {
    yield put(actions.toggleCorpoView());
};

