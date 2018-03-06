import qs from 'qs'
import { DEFAULT_API_URL } from './constants'

const { fetch } = require('fetch-ponyfill')()

const fetchClient = (accessToken, apiUrl) => (url, o = {}) => {
  const query = o.query ? `?${qs.stringify(o.query)}` : ''
  const options = Object.assign({}, o, {
    headers: Object.assign(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      o.headers
    ),
    body: o.body && JSON.stringify(o.body),
  })
  return fetch(`${apiUrl}${url}${query}`, options).then(res => {
    return res.json().then(body => ({
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      body,
    }))
  })
}

export default class TimelyClient {
  constructor(o = {}) {
    this._apiUrl = o.apiUrl || DEFAULT_API_URL
    this._clientId = o.clientId
    this._clientSecret = o.clientSecret
    this._refreshToken = o.refreshToken
    this._accessToken = o.accessToken
    this.fetch = fetchClient(this._accessToken, this._apiUrl)
  }

  getAccounts() {
    return this.fetch('/accounts').then(res => {
      return Object.assign(res, {
        body: res.body.map(account => new Account(account, this.fetch)),
      })
    })
  }

  getAccount(id) {
    return this.fetch(`/accounts/${id}`).then(res => {
      return Object.assign(res, {
        body: new Account(res.body, this.fetch),
      })
    })
  }

  getProjects(accountId, query) {
    return this.fetch(`/${accountId}/projects`, { query })
  }

  getProject(accountId, projectId) {
    return this.fetch(`/${accountId}/projects/${projectId}`)
  }

  createProject(accountId, body) {
    return this.fetch(`/${accountId}/projects`, {
      method: 'POST',
      body,
    })
  }

  updateProject(accountId, projectId, body) {
    return this.fetch(`/${accountId}/projects/${projectId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteProject(accountId, projectId) {
    return this.fetch(`/${accountId}/projects/${projectId}`, {
      method: 'DELETE',
    })
  }

  getClients(accountId, query) {
    return this.fetch(`/${accountId}/clients`, { query })
  }

  getClient(accountId, clientId) {
    return this.fetch(`/${accountId}/clients/${clientId}`)
  }

  createClient(accountId, body) {
    return this.fetch(`/${accountId}/clients`, {
      method: 'POST',
      body,
    })
  }

  updateClient(accountId, clientId, body) {
    return this.fetch(`/${accountId}/clients/${clientId}`, {
      method: 'PUT',
      body,
    })
  }

  getUsers(accountId, query) {
    return this.fetch(`/${accountId}/users`, { query })
  }

  getCurrentUser(accountId) {
    return this.fetch(`/${accountId}/users/current`)
  }

  getUser(accountId, userId) {
    return this.fetch(`/${accountId}/users/${userId}`)
  }

  createUser(accountId, body) {
    return this.fetch(`/${accountId}/users`, {
      method: 'POST',
      body,
    })
  }

  updateUser(accountId, userId, body) {
    return this.fetch(`/${accountId}/users/${userId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteUser(accountId, userId, body) {
    return this.fetch(`/${accountId}/users/${userId}`, {
      method: 'DELETE',
    })
  }

  getEvents(accountId, query) {
    return this.fetch(`/${accountId}/events`, { query })
  }

  getUserEvents(accountId, userId, query) {
    return this.fetch(`/${accountId}/users/${userId}/events`, { query })
  }

  getProjectEvents(accountId, projectId, query) {
    return this.fetch(`/${accountId}/projects/${projectId}/events`, { query })
  }

  createEvent(accountId, body) {
    return this.fetch(`/${accountId}/events`, {
      method: 'POST',
      body,
    })
  }

  createProjectEvent(accountId, projectId, body) {
    return this.fetch(`/${accountId}/projects/${projectId}/events`, {
      method: 'POST',
      body,
    })
  }

  createUserEvent(accountId, userId, body) {
    return this.fetch(`/${accountId}/users/${userId}/events`, {
      method: 'POST',
      body,
    })
  }

  updateEvent(accountId, eventId, body) {
    return this.fetch(`/${accountId}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  updateProjectEvent(accountId, projectId, eventId, body) {
    return this.fetch(`/${accountId}/projects/${projectId}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  updateUserEvent(accountId, userId, eventId, body) {
    return this.fetch(`/${accountId}/users/${userId}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteEvent(accountId, eventId) {
    return this.fetch(`/${accountId}/events/${eventId}`, {
      method: 'DELETE',
    })
  }

  startTime(accountId, eventId) {
    return this.fetch(`/${accountId}/events/${eventId}/start`, {
      method: 'PUT',
    })
  }

  stopTime(accountId, eventId) {
    return this.fetch(`/${accountId}/events/${eventId}/stop`, {
      method: 'PUT',
    })
  }

  getTags(accountId, query) {
    return this.fetch(`/${accountId}/labels`, { query })
  }

  getTag(accountId, tagId) {
    return this.fetch(`/${accountId}/labels/${tagId}`)
  }

  createTag(accountId, body) {
    return this.fetch(`/${accountId}/labels`, {
      method: 'POST',
      body,
    })
  }

  updateTag(accountId, tagId, body) {
    return this.fetch(`/${accountId}/labels/${tagId}`, {
      method: 'PUT',
      body,
    })
  }
}

class Account {
  constructor(account, fetchClient) {
    Object.assign(this, account)
    Object.defineProperty(this, 'fetch', {
      value: fetchClient,
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }

  getProjects(query) {
    return this.fetch(`/${this.id}/projects`, { query })
  }

  getProject(projectId) {
    return this.fetch(`/${this.id}/projects/${projectId}`)
  }

  createProject(body) {
    return this.fetch(`/${this.id}/projects`, {
      method: 'POST',
      body,
    })
  }

  updateProject(projectId, body) {
    return this.fetch(`/${this.id}/projects/${projectId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteProject(projectId) {
    return this.fetch(`/${this.id}/projects/${projectId}`, {
      method: 'DELETE',
    })
  }

  getClients(query) {
    return this.fetch(`/${this.id}/clients`, { query })
  }

  getClient(clientId) {
    return this.fetch(`/${this.id}/clients/${clientId}`)
  }

  createClient(body) {
    return this.fetch(`/${this.id}/clients`, {
      method: 'POST',
      body,
    })
  }

  updateClient(clientId, body) {
    return this.fetch(`/${this.id}/clients/${clientId}`, {
      method: 'PUT',
      body,
    })
  }

  getUsers(query) {
    return this.fetch(`/${this.id}/users`, { query })
  }

  getCurrentUser() {
    return this.fetch(`/${this.id}/users/current`)
  }

  getUser(userId) {
    return this.fetch(`/${this.id}/users/${userId}`)
  }

  createUser(body) {
    return this.fetch(`/${this.id}/users`, {
      method: 'POST',
      body,
    })
  }

  updateUser(userId, body) {
    return this.fetch(`/${this.id}/users/${userId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteUser(userId, body) {
    return this.fetch(`/${this.id}/users/${userId}`, {
      method: 'DELETE',
    })
  }

  getEvents(query) {
    return this.fetch(`/${this.id}/events`, { query })
  }

  getUserEvents(userId, query) {
    return this.fetch(`/${this.id}/users/${userId}/events`, { query })
  }

  getProjectEvents(projectId, query) {
    return this.fetch(`/${this.id}/projects/${projectId}/events`, { query })
  }

  createEvent(body) {
    return this.fetch(`/${this.id}/events`, {
      method: 'POST',
      body,
    })
  }

  createProjectEvent(projectId, body) {
    return this.fetch(`/${this.id}/projects/${projectId}/events`, {
      method: 'POST',
      body,
    })
  }

  createUserEvent(userId, body) {
    return this.fetch(`/${this.id}/users/${userId}/events`, {
      method: 'POST',
      body,
    })
  }

  updateEvent(eventId, body) {
    return this.fetch(`/${this.id}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  updateProjectEvent(projectId, eventId, body) {
    return this.fetch(`/${this.id}/projects/${projectId}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  updateUserEvent(userId, eventId, body) {
    return this.fetch(`/${this.id}/users/${userId}/events/${eventId}`, {
      method: 'PUT',
      body,
    })
  }

  deleteEvent(eventId) {
    return this.fetch(`/${this.id}/events/${eventId}`, {
      method: 'DELETE',
    })
  }

  startTime(eventId) {
    return this.fetch(`/${this.id}/events/${eventId}/start`, {
      method: 'PUT',
    })
  }

  stopTime(eventId) {
    return this.fetch(`/${this.id}/events/${eventId}/stop`, {
      method: 'PUT',
    })
  }

  getTags(query) {
    return this.fetch(`/${this.id}/labels`, { query })
  }

  getTag(tagId) {
    return this.fetch(`/${this.id}/labels/${tagId}`)
  }

  createTag(body) {
    return this.fetch(`/${this.id}/labels`, {
      method: 'POST',
      body,
    })
  }

  updateTag(tagId, body) {
    return this.fetch(`/${this.id}/labels/${tagId}`, {
      method: 'PUT',
      body,
    })
  }
}
