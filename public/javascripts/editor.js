/**
 * New node file
 */
var codeMirror = require('codemirror');
var overlay = require('codemirror/addon/mode/overlay.js')
var markdown = require('codemirror/mode/markdown/markdown.js');
var gfm = require('codemirror/mode/gfm/gfm.js');
var sanitizer = require('sanitizer');
var marked = require('marked');

$(function(){
	//initialize code mirror 
	
	var myCodeMirror = CodeMirror.fromTextArea($("#markdown-textarea")[0], {
    mode: 'gfm',
    autofocus: true,
    lineWrapping: true,
    smartIndent: true,
    fencedCodeBLocks: true
  });
	
	marked.setOptions({
		  gfm: true,
		  tables: true,
		  breaks: true,
		  pedantic: false,
		  sanitize: true,
		  smartLists: true,
		  smartypants: false,
		});
	
	//generate preview from code mirror element.
	$(".editor-wrapper").on("keyup" ,function(){
		myCodeMirror.save();
		$(".markdown-preview").html(marked($("#markdown-textarea").val()));
		
	});
	
	
  
});

