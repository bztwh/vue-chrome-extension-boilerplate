import loki from 'lokijs'
import lokiAdapter from '../../../node_modules/lokijs/src/loki-indexed-adapter.js'

const idbAdapter = new lokiAdapter('finance');
const db = new loki('test', {
  autoload: true,
  autosave: true,
  autoloadCallback: loadHandler,
  autosaveInterval: 10000,
  adapter: idbAdapter
});

let books = null;

function loadHandler() {
  console.log('loadHandler');
  var coll = db.getCollection('books');
  if (coll === null) {
    console.log("初始化");
    coll = db.addCollection('books', {
      indices: ['title'],
    });
  } else {
    console.log("恢复现有数据");
  }
  books = new tdb(coll);
}
/**
 * http://techfort.github.io/LokiJS/index.html
 * 
 */
class tdb {
  constructor(db) {
    this.db = db;
    this.template = ['title', 'tags', 'url', 'createDate', 'update']
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
  remove(val) {
    this.db.chain().find({
      '$loki': {
        '$in': val
      }
    }).remove()
  }
  insert(obj) {
    console.log('添加', obj);
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

export {
  books
}
