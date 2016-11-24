module.exports = function eventMapper(event) {
  return {
    id: event.aggregateId,
    type: event.payload.type,
    payload: event.payload.data,
    date: event.payload.createdAt
  };
};
