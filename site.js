document.querySelectorAll('.toc-toggle').forEach(function(button){button.addEventListener('click',function(){var list=document.getElementById(button.getAttribute('aria-controls'));var chapters=Array.from(list.querySelectorAll('details.chapter'));var open=chapters.some(function(chapter){return !chapter.open});chapters.forEach(function(chapter){chapter.open=open});button.textContent=open?'Collapse all sections':'Expand all sections';button.setAttribute('aria-expanded',String(open))})});
document.querySelectorAll('.citation-copy').forEach(function(button){
  button.addEventListener('click',async function(){
    var source=document.getElementById(button.getAttribute('data-copy'));
    var status=document.getElementById(button.getAttribute('aria-describedby'));
    var text=source.textContent.trim();
    var copied=false;
    try{await navigator.clipboard.writeText(text);copied=true}catch(error){
      var field=document.createElement('textarea');
      field.value=text;field.setAttribute('readonly','');
      field.style.cssText='position:fixed;top:0;left:-9999px';
      document.body.appendChild(field);field.select();
      try{copied=document.execCommand('copy')}catch(fallbackError){}
      field.remove();button.focus({preventScroll:true});
    }
    status.textContent=copied?'Copied to clipboard.':'Please select and copy the text above.';
  });
});

// Keep bulk controls in step with individually opened chapters.
document.querySelectorAll('.toc-toggle').forEach(function(button){
  var list=document.getElementById(button.getAttribute('aria-controls'));
  function sync(){
    var chapters=Array.from(list.querySelectorAll('details.chapter'));
    var allOpen=chapters.length>0&&chapters.every(function(chapter){return chapter.open});
    button.textContent=allOpen?'Collapse all sections':'Expand all sections';
    button.setAttribute('aria-expanded',String(allOpen));
  }
  list.querySelectorAll('details.chapter').forEach(function(chapter){chapter.addEventListener('toggle',sync)});
  sync();
});
