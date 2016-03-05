import fetch from 'isomorphic-fetch';

export const REQUEST_USERS_BY_SKILL = 'REQUEST_USERS_BY_SKILL';

export function requestUsersBySkill(skillId) {
    return {
        type: REQUEST_USERS_BY_SKILL,
        payload: {
            skillId: skillId
        }
    }
}

export function fetchUsersBySkill(skillId) {
    return (dispatch) => {

        dispatch(requestUsersBySkill(skillId));

        return fetch(`http://52.29.198.81:8080/skills/${skillId}/users`)
            .then(response => response.json())
            .then(json => dispatch(receiveUsers(json)));
    }
}

export const REQUEST_USERS = 'REQUEST_USERS';

export function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}

export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        payload: {
            users: users
        }
    }
}

export const REQUEST_USER_BY_ID = 'REQUEST_USER_BY_ID';

export function requestUserById(userId) {
    return {
        type: REQUEST_USER_BY_ID,
        payload: {
            userId: userId
        }
    }
}

export const RECEIVE_USER_BY_ID = 'RECEIVE_USER_BY_ID';

export function receiveUserById(user) {
    return {
        type: RECEIVE_USER_BY_ID,
        payload: {
            user: user
        }
    }
}

export function getUserById(userId) {
    return (dispatch) => {
        dispatch(requestUserById(userId));

        return fetch(`http://52.29.198.81:8080/users/${userId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveUserById(json)));
    };
}

export function fetchUsers() {
    return (dispatch) => {
        dispatch(requestUsers());

        return fetch('http://52.29.198.81:8080/users')
            .then(response => response.json())
            .then(json => dispatch(receiveUsers(json)))
    };
}