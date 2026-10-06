const storage=(()=>{
  const memory={};
  const fallback={
    getItem:k=>Object.prototype.hasOwnProperty.call(memory,k)?memory[k]:null,
    setItem:(k,v)=>{memory[k]=String(v);},
    removeItem:k=>{delete memory[k];},
    clear:()=>{Object.keys(memory).forEach(k=>delete memory[k]);}
  };
  try{
    const key='__interactive_linux_academy_storage_test__';
    window.localStorage.setItem(key,'1');
    window.localStorage.removeItem(key);
    return window.localStorage;
  }catch{
    return fallback;
  }
})();
