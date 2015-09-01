#!/usr/bin/env node
var fs = require('fs');
var colors = require('colors');

var walk = function(dir) {
  var sub = {};
  sub.title = "Notes".bold;
  sub.childs = [processFolder(dir, 'root')];

  // don't know 
  return processFolder(dir, 'Notes'.bold);
}

var processFile = function(file, name) {
  var result = {type: 'none'};
  if (name == 'due') {
    var content = fs.readFileSync(file);
    result.text = ' ' + content.toString().replace(/\n$/, '').red;
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
      folder.childs.push(processFolder(file, name));
    } else {
      if (stat.isFile()) {
        var st = processFile(file, name);
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

var level = 0;
var print = function(tree)
{
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

