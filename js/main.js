(function(){
const S = window.SITE, A = Object.fromEntries(S.audiences.map(a=>[a.id,a]));
const $ = (h)=>{const t=document.createElement('template');t.innerHTML=h.trim();return t.content;};
const badge = id => A[id] ? `<span class="badge a-${id}">${A[id].label}</span>` : '';
const ph = (txt,tall) => `<div class="ph${tall?' ph-tall':''}" role="img" aria-label="Animation placeholder: ${txt}"><span class="ph-tag">ANIMATION PLACEHOLDER</span><p>${txt}</p></div>`;

/* NAV */
const nav = document.getElementById('nav');
nav.innerHTML = `<ul class="nav-aud">${S.audiences.map(a=>`<li class="dd a-${a.id}"><a class="aud-link" href="#for-${a.id}"><i></i>${a.label}<b class="caret" aria-hidden="true">▾</b></a><ul class="sub">${a.links.map(l=>`<li><a href="${l[1]}">${l[0]}</a></li>`).join("")}</ul></li>`).join('')}</ul>
<ul class="nav-main">${S.sections.map(s=>`<li><a href="#${s.id}">${s.nav}</a></li>`).join('')}<li><a class="cta" href="#contact">Enquiries</a></li></ul>`;

/* MAIN */
let h = `<section id="home" class="hero"><div class="hero-inner"><span class="tag"><i></i>${S.hero.eyebrow}</span><h1>Transforming Marine Aquaculture <em>Through Science, Technology</em> and Sustainable Production.</h1><div class="rule">✦</div><p class="lead">${S.hero.text}</p><p class="byline">Concept by Kriswa International</p></div>${ph("Full-screen interactive intro video — immersive transitions between hatchery environments, underwater sea cages, laboratory facilities and marine research. Five production stages appear sequentially and are clickable.",true)}</section>
<section class="selector wrap" aria-labelledby="iam"><span class="tag"><i></i>Find your pathway</span><h2 id="iam">I am <em>a…</em></h2><div class="rule">✦</div>
<div class="aud-grid">${S.audiences.map(a=>`<a class="aud-card a-${a.id}" href="#for-${a.id}"><span class="dot"></span><h3>${a.who}</h3><p>${a.intro}</p><ul class="topics">${a.links.map(l=>`<li>${l[0]}</li>`).join("")}</ul><span class="go">Enter your area →</span></a>`).join('')}</div></section>
<section class="wrap block"><p class="eyebrow">Production cycle</p><h2>Five stages, from broodstock to grow-out</h2>
<ol class="cycle">${S.cycle.map((c,i)=>`<li><button type="button" aria-expanded="false"><span class="num">0${i+1}</span>${c}</button><div class="cycle-detail" hidden>${ph("Stage "+(i+1)+" deep-dive: process animation, technologies and facility footage for “"+c+"”.")}</div></li>`).join('')}</ol></section>
<section class="wrap block pillars"><p class="eyebrow">An integrated operation</p><h2>More than a hatchery</h2><ul>${S.pillars.map(p=>`<li>${p}</li>`).join('')}</ul></section>
<section class="stats"><div class="wrap"><p class="eyebrow">Key production statistics</p><div class="stat-grid">${S.stats.map(s=>`<div><strong>${s[0]}</strong><span>${s[1]}</span><small>figure to be supplied</small></div>`).join('')}</div>${ph("Animated count-up of figures when the band scrolls into view.")}</div></section>`;

S.audiences.forEach(a=>{
 h += `<section id="for-${a.id}" class="aud-hub a-${a.id}"><div class="wrap"><span class="badge a-${a.id}">${a.label}</span><h2>${a.who}</h2><p class="lead">${a.intro}</p>
 <ul class="hub-links">${a.links.map(l=>`<li><a href="${l[1]}">${l[0]} <span>→</span></a></li>`).join('')}</ul></div></section>`;
});

S.sections.forEach(s=>{
 h += `<section id="${s.id}" class="wrap block sec" data-template="${s.template}"><div class="sec-head"><div><p class="eyebrow">${s.template}</p><h2>${s.title}</h2></div><div class="for">${s.audiences.map(badge).join('')}</div></div><p class="lead">${s.lead}</p>`;
 if(s.cards) h += `<div class="cards">${s.cards.map(c=>`<article class="card">${(c[2]||[]).map(badge).join('')}<h3>${c[0]}</h3><p class="${c[1].includes('[Placeholder')?'is-ph':''}">${c[1]}</p></article>`).join('')}</div>`;
 if(s.species) h += `<div class="cards species">${s.species.map(sp=>`<article class="card"><div class="img-ph">Species photograph</div><h3>${sp[0]}</h3>${sp[1]?`<p class="arabic">${sp[1]}</p>`:''}<ul class="fields">${s.speciesFields.map(f=>`<li>${f}<span>—</span></li>`).join('')}</ul><a class="btn a-operators" href="#contact">Enquiry / Order request</a></article>`).join('')}</div>`;
 if(s.news) h += `<div class="tags">${s.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="cards">${s.news.map(n=>`<article class="card news"><div class="img-ph">Image</div><p class="eyebrow">${n[0]}</p><h3>${n[1]}</h3><p class="is-ph">${PH}</p></article>`).join('')}</div>`;
 if(s.placeholder) h += ph(s.placeholder);
 h += `</section>`;
});

h += `<section id="contact" class="wrap block sec"><p class="eyebrow">Contact & Enquiries</p><h2>Choose your enquiry pathway</h2>
<form class="enq" onsubmit="event.preventDefault();this.querySelector('.ok').hidden=false">
<fieldset><legend>Enquiry category</legend><div class="chips">${S.enquiries.map((e,i)=>`<label class="chip ${e[1]?'a-'+e[1]:''}"><input type="radio" name="cat" ${i==0?'checked':''}> ${e[0]}</label>`).join('')}</div></fieldset>
<div class="row"><label>Name<input required autocomplete="name"></label><label>Organisation<input autocomplete="organization"></label></div>
<div class="row"><label>Email<input type="email" required autocomplete="email"></label><label>Phone<input type="tel" autocomplete="tel"></label></div>
<label>Message<textarea rows="4"></textarea></label><button class="btn">Send enquiry (demo)</button><p class="ok" hidden role="status">Demo only — no data sent.</p></form>
<div class="contact-side"><h3>Contact details</h3><p class="is-ph">${PH}</p><a class="btn wa" href="#contact">WhatsApp (integration placeholder)</a>${ph("Interactive map of facility locations — SKMRC, Balghailam Island, Delma Island, Khorfakkan.")}</div></section>`;
document.getElementById('main').innerHTML = h;
document.getElementById('footer').innerHTML = `<div class="wrap foot"><div><strong class="fbrand">Gulf Aquaculture</strong><p>Science, technology and sustainable production.</p><p class="byline">Concept by Kriswa International</p><p class="small">Static demo · English (Arabic RTL planned) · Content driven by js/content.js for CMS migration.</p></div>
${S.audiences.map(a=>`<div><h4 class="a-${a.id}"><i></i>${a.label}</h4><ul>${a.links.map(l=>`<li><a href="${l[1]}">${l[0]}</a></li>`).join('')}</ul></div>`).join('')}</div>`;

/* Interactions */
const burger=document.querySelector('.burger');
burger.onclick=()=>{const o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o);};
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');burger.setAttribute('aria-expanded',false);document.body.classList.remove('lock');}});
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.lang button').forEach(x=>x.setAttribute('aria-pressed',x===b));if(b.lang==='ar')alert('Arabic / RTL version — placeholder for the CMS phase.');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))burger.click();});
document.querySelectorAll('.cycle button').forEach(b=>b.onclick=()=>{const d=b.nextElementSibling,o=d.hidden;d.hidden=!o;b.setAttribute('aria-expanded',o);});
const hdr=document.querySelector('.site-header');addEventListener('scroll',()=>hdr.classList.toggle('solid',scrollY>40),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.1});
document.querySelectorAll('.block,.aud-hub').forEach(el=>{el.classList.add('reveal');io.observe(el);});
})();
