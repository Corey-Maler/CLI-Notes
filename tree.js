#!/usr/bin/env node
var fs = require('fs');
var colors = require('colors');

var dayRequired = '@today';

var walk = function(dir) {
  var sub = {};
  sub.title = "Notes".bold;
  sub.childs = [processFolder(dir, 'root')];

  // don't know 
  return processFolder(dir, 'Notes'.bold);
}

var processFile = function(file, name, folder) {
  var result = {type: 'none'};
  if (name == 'due') {
    var content = fs.readFileSync(file);
    result.text = ' ' + content.toString().replace(/\n$/, '').red;
    folder.date = content.toString().replace(/\n$/, '');
    result.type = 'title';
  }
  if (name == 'contacts') {
    var content = fs.readFileSync(file);
    result.text = content.toString().split('\n').map(function(e) { return e.gray });
    result.text.pop();
    result.type = 'subline';
  }
  return result;
}

var processFolder = function(dir, _name) {
  var list = fs.readdirSync(dir)
  var folder = {};
  folder.childs = [];
  folder.title = _name;
  folder.subline = [];
  list.forEach(function(file) {
    var name = file;
    var dirstr = "";
    file = dir + '/' + file;
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      var ff = processFolder(file, name);
      folder.childs.push(ff);
    } else {
      if (stat.isFile()) {
        var st = processFile(file, name, folder);
        if (st.type == 'title')
          folder.title += st.text;
        if (st.type == 'subline')
          folder.subline = folder.subline.concat(st.text);
      } 
    }
  });
  return folder;
}

var tree = walk('/Users/k.zarvansky/Google Диск/notes');
// console.log(tree);
//

var treeFilter = function(tree, cb)
{
  var r = cb(tree);
  var b = [];
  tree.childs.forEach(function(el) {
    if (treeFilter(el, cb)) {
      b.push(el);
    }
  });
  tree.childs = b;
  if (r || b.length)
  {
    return tree;
  }
  return undefined;
}

var dueDate;
if (dueDate = process.argv[2]) {
  var ff = function(el) {return el.date === dueDate}//'@today'}

  var filteredTree = treeFilter(tree, ff);
}

var level = 0;
var print = function(tree)
{
  if (!tree) return;
  var t = '';
  for (var i = 0; i < level; i++) {
    t += '  '; 
  }
  t += tree.title;
  console.log(t);
  if (tree.subline.length) {
    var b = '';
    for (var i = 0; i < level; i++) {
      b += '  ';
    }
    for (var i = 0; i < tree.subline.length; i++) {
      console.log(b + tree.subline[i]);
    }
  }
  if (tree.childs.length) { 
    level ++;
    tree.childs.forEach(print);
    level --;
  }
}

print(tree);

