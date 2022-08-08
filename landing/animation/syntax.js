
function w3CodeColor(elmnt) {
    var elmntObj = (document.getElementById(elmnt) || elmnt);
    var elmntTxt = elmntObj.innerHTML;

    var tagcolor = "lightcoral";
    var tagnamecolor = "#e06c75";
    var attributecolor = "red";
    var attributevaluecolor = "lightblue";
    var commentcolor = "green";
    var textcolor = "white"
   
    elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
    elmntTxt = `<div style="color:` + textcolor + `">` + htmlMode(elmntTxt) + `</div>`;
    elmntObj.innerHTML = elmntTxt;
  
    function extract(str, start, end, func, repl) {
      var s, e, d = "", a = [];
      while (str.search(start) > -1) {
        s = str.search(start);
        e = str.indexOf(end, s);
        if (e == -1) {e = str.length;}
        if (repl) {
          a.push(func(str.substring(s, e + (end.length))));      
          str = str.substring(0, s) + repl + str.substr(e + (end.length));
        } else {
          d += str.substring(0, s);
          d += func(str.substring(s, e + (end.length)));
          str = str.substr(e + (end.length));
        }
      }
      this.rest = d + str;
      this.arr = a;
    }
    function htmlMode(txt) {
      var rest = txt, done = "",  comment, startpos, endpos, note, i;
      comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
      rest = comment.rest;
      while (rest.indexOf("&lt;") > -1) {
        note = "";
        startpos = rest.indexOf("&lt;");
        if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {note = "css";}
        if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {note = "javascript";}        
        endpos = rest.indexOf("&gt;", startpos);
        if (endpos == -1) {endpos = rest.length;}
        done += rest.substring(0, startpos);
        done += tagMode(rest.substring(startpos, endpos + 4));
        rest = rest.substr(endpos + 4);
        if (note == "css") {
          endpos = rest.indexOf("&lt;/style&gt;");
          if (endpos > -1) {
            done += cssMode(rest.substring(0, endpos));
            rest = rest.substr(endpos);
          }
        }
       
      }
      rest = done + rest;
      for (i = 0; i < comment.arr.length; i++) {
          rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
      }
      return rest;
    }
    function tagMode(txt) {
      var rest = txt, done = "", startpos, endpos, result;
      while (rest.search(/(\s|<br>)/) > -1) {    
        startpos = rest.search(/(\s|<br>)/);
        endpos = rest.indexOf("&gt;");
        if (endpos == -1) {endpos = rest.length;}
        done += rest.substring(0, startpos);
        done += attributeMode(rest.substring(startpos, endpos));
        rest = rest.substr(endpos);
      }
      result = done + rest;
      result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
      if (result.substr(result.length - 4, 4) == "&gt;") {
        result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
      }
      return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
    }
    function attributeMode(txt) {
      var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
      while (rest.indexOf("=") > -1) {
        endpos = -1;
        startpos = rest.indexOf("=");
        singlefnuttpos = rest.indexOf("'", startpos);
        doublefnuttpos = rest.indexOf('"', startpos);
        spacepos = rest.indexOf(" ", startpos + 2);
        if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
          endpos = rest.indexOf(" ", startpos);      
        } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
          endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
        } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
          endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
        }
        if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}
        done += rest.substring(0, startpos);
        done += attributeValueMode(rest.substring(startpos, endpos + 1));
        rest = rest.substr(endpos + 1);
      }
      return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
    }
    function attributeValueMode(txt) {
      return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
    }
    function commentMode(txt) {
      return "<span style=color:" + commentcolor + ">" + txt + "</span>";
    }
  
  
  

  
  }