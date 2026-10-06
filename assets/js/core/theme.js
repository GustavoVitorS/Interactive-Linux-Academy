/* Theme state and accessible theme toggle. */
/* Theme */
const themeToggle=document.querySelector('#themeToggle');
const savedTheme=storage.getItem('linuxAcademy.theme')||'dark';
document.documentElement.dataset.theme=savedTheme;
function syncThemeButton(){
  if(!themeToggle)return;
  const isLight=document.documentElement.dataset.theme==='light';
  const label=isLight?v5t('themeDark'):v5t('themeLight');
  replaceThemeIcon(themeToggle,isLight);
  themeToggle.setAttribute('aria-label',label);
  themeToggle.setAttribute('title',label);
}
themeToggle?.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='light'?'dark':'light';
  document.documentElement.dataset.theme=next;
  storage.setItem('linuxAcademy.theme',next);
  syncThemeButton();
});
syncThemeButton();
window.addEventListener('academy:language',syncThemeButton);
