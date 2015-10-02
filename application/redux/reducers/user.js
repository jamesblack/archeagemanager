export default function(user = {}, action) {
  switch (action.type) {
    case 'USER_SET': {
      return Object.assign({}, user, action.user);
    }
  }
  return user;
}
