import db from './index';

export const find = ({ table, where={} }) =>
  new Promise((resolve, reject) => {
    db(table)
      .where(where)
      .select('*')
      .then(resolve)
      .catch(reject);
  });

export const create = ({ table, attrs, returning='id' }) =>
  new Promise((resolve, reject) => {
    db(table)
      .insert(attrs)
      .returning(returning)
      .then(resolve)
      .catch(reject);
  });

export const update = ({ table, where, attrs }) =>
  new Promise((resolve, reject) => {
    db(table)
      .where(where)
      .update(attrs)
      .then(resolve)
      .catch(reject);
  });

export const destroy = ({ table, where={} }) =>
  new Promise((resolve, reject) => {
    db(table)
      .where(where)
      .del()
      .then(resolve)
      .catch(reject);
  });
