/* Relative spatial arrangements inspired by the supplied plans.
   These are illustrative placeholders, not measured/as-built 3D models. */
(function(){
 const z=(id,name,x,zz,w,d,kind='tanks',count=4)=>({id,name,x,z:zz,w,d,kind,count});
 window.GA_3D={
  interiors:{
   'p1-production':{title:'Phase 1 · Production campus',concept:false,w:64,d:38,zones:[
    z('p1-nursery','Nursery tanks',-23,0,13,28,'rectTanks',12),
    z('p1-weaning','Weaning tanks',-11,-7,9,13,'tanks',6),
    z('p1-biolab','Bio-lab',-9,10,10,10,'lab'),
    z('p1-control','Control room',3,11,10,9,'control'),
    z('p1-algal','Algal room',5,-10,12,12,'tanks',6),
    z('p1-rotifer','Rotifer rooms',18,-10,10,12,'tanks',4),
    z('p1-larval','Larval tanks',19,8,18,15,'tanks',12)]},
   'p2-hatchery':{title:'Phase 2 · Hatchery',concept:false,w:62,d:38,zones:[
    z('p2-nursery','Nursery',-22,0,12,27,'tanks',8),
    z('p2-weaning','Weaning',-10,-5,10,22,'tanks',8),
    z('p2-larvae','Larvae',2,-5,11,22,'tanks',8),
    z('p2-livefeed','Algal & rotifer',15,-8,10,16,'tanks',6),
    z('p2-control','Control room',16,10,10,9,'control'),
    z('p2-reception','Reception',4,11,11,9,'reception')]},
   'p2-broodstock':{title:'Phase 2 · Broodstock',concept:false,w:58,d:44,zones:[
    z('p2-bs8','Broodstock 8',-18,-13,15,13,'tanks',3),
    z('p2-bs67','Broodstock 6–7',0,-13,18,13,'tanks',4),
    z('p2-bs45','Broodstock 4–5',0,1,18,12,'tanks',4),
    z('p2-bs13','Broodstock 1–3',-10,14,34,12,'tanks',3),
    z('p2-intake','Sea water intake',20,-12,10,14,'plant'),
    z('p2-plant','Plant room',20,9,10,20,'plant')]},
   visitor:{title:'Visitor centre',concept:true,w:44,d:34,zones:[
    z('visitor-gallery','Exhibition gallery',-11,-2,18,24,'gallery'),
    z('visitor-theatre','Presentation',11,-2,18,24,'gallery'),
    z('visitor-reception','Reception',0,12,13,8,'reception')]},
   utility:{title:'Utility hall',concept:true,w:44,d:30,zones:[
    z('utility-water','Water treatment',-10,0,20,24,'plant'),
    z('utility-control','Control',12,-6,16,10,'control'),z('utility-store','Store',12,8,16,10,'store')]},
   support:{title:'Support hall',concept:true,w:44,d:30,zones:[
    z('support-workshop','Workshop',-10,0,20,24,'plant'),z('support-store','Storage',12,0,16,24,'store')]},
   services:{title:'Site services',concept:true,w:44,d:30,zones:[
    z('services-plant','Plant',-10,0,20,24,'plant'),z('services-control','Electrical',12,0,16,24,'plant')]},
   pods:{title:'Research pods',concept:true,w:48,d:30,zones:[
    z('pods-lab','Research lab',-12,0,20,24,'lab'),z('pods-collab','Collaboration',12,0,20,24,'gallery')]},
   'sea-cages':{title:'Sea-cage system',concept:true,w:52,d:38,offshore:true,zones:[
    z('sea-growout','Grow-out enclosure',-8,0,30,30,'sea'),
    z('sea-mooring','Mooring & access',17,-8,12,10,'mooring'),
    z('sea-monitoring','Monitoring',17,8,12,10,'control')]}
  }
 };
})();
