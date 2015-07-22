'use strict';

var Dexie      = require('dexie'),
    Annotation = require('./model.js');

var db;

module.exports = {
  init:      init,
  create:    create,
  find:      find,
  findByUrl: findByUrl,
  findAll:   findAll,
  clear:     clear
};

function init() {
  db = new Dexie("fluorescent");
  db.version(1).stores({annotations: '++,url,position,[url+position]'});
  db.annotations.mapToClass(Annotation);
  db.open();
}

function create(annotation) {
  return db.annotations.put(annotation);
}

function find(params) {

}

function findByUrl(url) {
  return db.annotations.where('url').equalsIgnoreCase(url);
}

function findAll() {
  return db.annotations.toCollection();
}

function clear() {
  return db.annotations.clear();
}
