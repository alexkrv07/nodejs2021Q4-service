const Separator = '/';

const PatternUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const Method = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

const RequiredFildPerson = {
  name: 'name',
  age: 'age',
  hobbies: 'hobbies'
}

const StatusCode = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalServerError: 500
}

export { Separator, Method, PatternUUID, RequiredFildPerson, StatusCode };