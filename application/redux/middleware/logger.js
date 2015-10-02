export default () => next => action => {
  console.info('dispatching', action);
  return next(action);
};
