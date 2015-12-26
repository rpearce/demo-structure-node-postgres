import db from '../../db/';

const defaults = {
  name: null,
  email: null,
  networkId: null,
  isValid() {
    return !!this.name
      && !!this.email
      && !!this.network_id;
  }
  save() {
    if (this.isValid()) {
      db
        .one('INSERT INTO users(name, email, network_id) VALUES ($1, $2, $3)', [this.name, this.email, this.networkId])
        .then(data => console.log(data))
        .catch(err => console.error(error));
    } else {
      console.error('Invalid User');
    }
  }
};

const user = (opts) => {
  return Object.assign(Object.create(defaults), opts);
};

export default user;
