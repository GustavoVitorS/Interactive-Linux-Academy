/* DOM safety helpers shared by the V6.3 release candidate. */
const SVG_NS='http://www.w3.org/2000/svg';

function createSvgElement(name,attributes={}){
  const node=document.createElementNS(SVG_NS,name);
  Object.entries(attributes).forEach(([key,value])=>node.setAttribute(key,String(value)));
  return node;
}

function replaceThemeIcon(target,isLight){
  if(!target)return;
  const svg=createSvgElement('svg',{
    class:isLight?'theme-icon theme-icon--moon':'theme-icon theme-icon--sun',
    viewBox:'0 0 24 24','aria-hidden':'true',focusable:'false'
  });
  if(isLight){
    svg.append(createSvgElement('path',{d:'M20.75 14.15A8.75 8.75 0 1 1 9.85 3.25a7.15 7.15 0 0 0 10.9 10.9Z'}));
  }else{
    svg.append(
      createSvgElement('circle',{cx:'12',cy:'12',r:'3.6'}),
      createSvgElement('path',{d:'M12 2.25v2.1M12 19.65v2.1M2.25 12h2.1M19.65 12h2.1M5.1 5.1l1.48 1.48M17.42 17.42l1.48 1.48M18.9 5.1l-1.48 1.48M6.58 17.42L5.1 18.9'})
    );
  }
  target.replaceChildren(svg);
}

/* Parses only author-controlled translations/headings and copies a tiny allowlist.
 * User input is never accepted by this helper. */
function setSafeRichText(target,markup){
  if(!target)return;
  const parsed=new DOMParser().parseFromString(`<body>${String(markup)}</body>`,'text/html').body;
  const fragment=document.createDocumentFragment();
  const copy=(source,parent)=>{
    source.childNodes.forEach(node=>{
      if(node.nodeType===Node.TEXT_NODE){parent.append(document.createTextNode(node.textContent||''));return;}
      if(node.nodeType!==Node.ELEMENT_NODE)return;
      const tag=node.tagName.toLowerCase();
      if(tag==='br'){parent.append(document.createElement('br'));return;}
      if(tag==='em'||tag==='strong'){
        const el=document.createElement(tag);copy(node,el);parent.append(el);return;
      }
      if(tag==='span'&&node.classList.contains('section-title__accent')){
        const el=document.createElement('span');el.className='section-title__accent';copy(node,el);parent.append(el);return;
      }
      copy(node,parent);
    });
  };
  copy(parsed,fragment);
  target.replaceChildren(fragment);
}
