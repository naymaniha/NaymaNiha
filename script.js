(function(){
  var $=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  /* nav buttons: go to section */
  $('[data-go]').forEach(function(b){b.addEventListener('click',function(){
    var t=document.getElementById(b.getAttribute('data-go'));
    if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
  })});
  /* active nav + progress */
  var navBtns=$('#links button'),ids=navBtns.map(function(b){return b.getAttribute('data-go')});
  var spy=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting){navBtns.forEach(function(b){
      var on=b.getAttribute('data-go')===en.target.id;b.classList.toggle('on',on);
      if(on){var L=document.getElementById('links');L.scrollTo({left:b.offsetLeft-L.clientWidth/2+b.clientWidth/2,behavior:'smooth'})}
    })}})},{rootMargin:'-45% 0px -50% 0px'});
  ids.forEach(function(id){spy.observe(document.getElementById(id))});
  /* stagger inside groups */
  $('.cards,.tl').forEach(function(g){[].forEach.call(g.children,function(c,i){if(!c.style.getPropertyValue('--i'))c.style.setProperty('--i',i)})});
  /* scroll reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);
      $('[data-count]',en.target).forEach(count);if(en.target.hasAttribute&&en.target.hasAttribute('data-count'))count(en.target)}
  })},{threshold:.15});
  $('.rv,.rl,.rr,.rz,.bar').forEach(function(e){io.observe(e)});
  $('.bar').forEach(function(b){var p=b.parentNode;new IntersectionObserver(function(es,o){if(es[0].isIntersecting){p.classList.add('in');o.disconnect()}},{threshold:.3}).observe(p)});
  function count(el){if(el.done)return;el.done=1;var n=+el.dataset.count,t0=null;
    (function step(t){t0=t0||t;var k=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*k);if(k<1)requestAnimationFrame(step)})(performance.now())}
  /* scroll-linked effects */
  var bar=document.getElementById('prog'),decos=$('.deco'),orbit=document.querySelector('.orbit'),tick=false;
  function onScroll(){
    var y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
    bar.style.setProperty('--p',h>0?y/h:0);
    orbit.style.setProperty('--sy',y);
    decos.forEach(function(d){var r=d.parentNode.getBoundingClientRect();var k=(r.top+r.height/2-innerHeight/2)/innerHeight;
      d.style.setProperty('--dy',(k*-60)+'px');d.style.setProperty('--dr',(k*25)+'deg')});
    tick=false}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
  /* hero bubbles */
  var bb=document.getElementById('bubs');
  for(var i=0;i<14;i++){var s=document.createElement('span'),z=8+Math.random()*26;s.className='bub';
    s.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(14+Math.random()*16)+'s;animation-delay:-'+Math.random()*20+'s';bb.appendChild(s)}
  document.getElementById('yr').textContent=new Date().getFullYear();
  document.getElementById('cf').addEventListener('submit',function(e){e.preventDefault();
    location.href='mailto:naymaniha345@gmail.com?subject='+encodeURIComponent('Message from '+document.getElementById('n').value)+'&body='+encodeURIComponent(document.getElementById('m').value)});
})();