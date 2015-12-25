'use strict';

import Dexie from 'dexie';
import Annotation from './Annotation.js';

export default class Database {

  constructor() {
    let db = new Dexie("fluorescent");
    db.version(1).stores({
      annotations: 'id,url,position,&[url+position]'
    });
    db.annotations.mapToClass(Annotation);
    db.open();

    this.db = db;
  }

  save(annotation) {
    return this.db.annotations.put(annotation);
  }

  delete(id) {
    return this.db.annotations.delete(id);
  }

  // TODO
  find(params) {

  }

  findByUrl(url) {
    return this.db.annotations.where('url').equalsIgnoreCase(url).toArray();
  }

  findAll() {
    return this.db.annotations.toCollection().toArray();
  }

  clear() {
    return this.db.annotations.clear();
  }

}
