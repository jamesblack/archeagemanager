export function setUser(user) {
  return (dispatch) => {
    dispatch({
      type: 'USER_SET',
      user: user,
    });
  };
}
