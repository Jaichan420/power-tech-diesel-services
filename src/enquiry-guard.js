// Cloudflare-only enquiry guard. No external form service.
const active=new Map();
export function submitEnquiry(url,options){
  const data=JSON.parse(options.body);
  data.botcheck=document.querySelector('#quote form [name="botcheck"]')?.value||'';
  const body=JSON.stringify(data);
  if(active.has(body))return active.get(body).then(response=>response.clone());
  const task=fetch(url,{...options,body});
  active.set(body,task);
  task.finally(()=>active.delete(body)).catch(()=>{});
  return task.then(response=>response.clone());
}
function protect(){
  const form=document.querySelector('#quote form');
  if(!form||form.querySelector('[name="botcheck"]'))return;
  const trap=document.createElement('input');
  trap.type='text';trap.name='botcheck';trap.tabIndex=-1;trap.autocomplete='off';
  trap.setAttribute('aria-hidden','true');trap.style.display='none';form.append(trap);
}
new MutationObserver(protect).observe(document.documentElement,{childList:true,subtree:true});protect();
