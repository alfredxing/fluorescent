'use strict';

import Dexie from 'dexie';
import Annotation from './Annotation.js';

export default class Storage {

  constructor() {
    this.db = new Dexie("fluorescent");
    this.db.version(1).stores({annotations: '++,url,position,[url+position]'});
    this.db.annotations.mapToClass(Annotation);
    this.db.open();
  }

  create(annotation) {
    return this.db.annotations.put(annotation);
  }

  find(params) {

  }

  findByUrl(url) {
    return this.db.annotations.where('url').equalsIgnoreCase(url);
  }

  findAll() {
    return this.db.annotations.toCollection();
  }

  clear() {
    return this.db.annotations.clear();
  }

}
