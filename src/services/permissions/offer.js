function canDelete(user, offer) {
  return user.__id === offer.user;
}

function canUpdate(user, offer) {
  return user.__id === offer.user;
}

module.exports = { canDelete, canUpdate };
