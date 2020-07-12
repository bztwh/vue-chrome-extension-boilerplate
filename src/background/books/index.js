import loki from 'lokijs'
import lokiAdapter from '../../../node_modules/lokijs/src/loki-indexed-adapter.js'
/**
 * http://techfort.github.io/LokiJS/index.html
 * 
 */
const idbAdapter = new lokiAdapter('finance');
const db = new loki('test', {
  autoload: true,
  autosave: true,
  autoloadCallback: loadHandler,
  autosaveInterval: 10000,
  adapter: idbAdapter
});
class Base {
  constructor(db) {
    this.db = db;
  }
  remove(val) {
    this.db.chain().find({
      '$loki': {
        '$in': val
      }
    }).remove()
  }
  insert(obj) {
    this.db.insert(this.template.reduce((iter, val) => (val in obj ? iter[val] = obj[val] : iter[val] = null, iter), {}));
  }
  updated(val) {
    let idList = val.reduce((a, c) => {
      a.push(c.$loki);
      return a;
    }, []);
    this.db.chain().find({
      '$loki': {
        '$in': idList
      }
    }).update(data => {
      let findVal = val.find(e => e.$loki === data.$loki);
      for (const key in findVal) {
        if (findVal.hasOwnProperty(key)) {
          data[key] != null && data[key] !== findVal[key] ? data[key] = findVal[key] : '';
        }
      }
      return data
    })
  }
}
class Books extends Base {
  constructor(db) {
    super(db);
    this.db = db;
    this.template = ['title', 'description', 'tags', 'url', 'createDate', 'update']
  }
  /**
   * @param {Array} tags 搜索tag 
   * @returns {Array}
   */
  searchTag(tags = []) {
    let tyrfing = this.db.find({
      'tags': {
        '$containsAny': tags
      }
    });
    return tyrfing;
  }
  getAllTag() {
    let arr = [];
    this.db.data.forEach(e => {
      arr = Array.from(new Set([...arr, ...e.tags || []]))
    })
    return arr;
  }
}
class Folder extends Base {
  constructor(db) {
    super(db)
    this.db = db;
    this.template = ['pid', 'name', 'sort']
  }
  insert(obj) {
    try {
      return super.insert(obj)
    } catch (error) {
      return error;
    }
  }
  treeName(id, str) {
    let name = str || '';
    let data = this.db.data.find(e => e.$loki == id);
    if (data != null) return this.treeName(data.pid, name + data.name + '>')
    else return name
  }
  folderTree() {
    let tree = [];
    let folder = JSON.parse(JSON.stringify(this.db.data));
    folder.forEach(e => {
      if (e.pid === 0) {
        tree.push(e)
      } else {
        let index = folder.findIndex(e2 => e.pid === e2.$loki);
        if (index !== -1) {
          folder[index].children = folder[index].children || [];
          folder[index].children.push(e);
        }
      }
    })
    return tree;
  }
}

let dbList = [{
  name: 'books',
  class: Books,
  option: {
    indices: ['title'],
  }
}, {
  name: 'folder',
  class: Folder,
  option: {}
}]
let outputDb = null;

function loadHandler() {
  console.log('loadHandler');
  outputDb = {};
  dbList.forEach(e => {
    let coll = db.getCollection(e.name)
    if (coll == null) {
      db.addCollection(e.name, e.option)
    }
    outputDb[e.name] = new e.class(coll);
  });
}

export function dbData() {
  return new Promise((resolve, reject) => {
    let isOutput = setInterval(() => {
      if (outputDb != null && Object.keys(outputDb).length == dbList.length) {
        clearInterval(isOutput);
        resolve(outputDb)
      }
    }, 1000)
  })
}
