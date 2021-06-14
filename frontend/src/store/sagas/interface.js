import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* toggleSidebarSaga(action) {
    yield put(actions.toggleSidebar());
};

