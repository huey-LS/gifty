/****************
  datadepot

  @method set(data_name, data_value)
  @method get(data_name)


  format{
    text: 
    img: 
    keyword: 
    subject:
  }
****************/
var datadepot = function(){
  var format = {
    text: 'String',
    img: 'Image',
    keyword: 'String',
    subject: 'String',
    checked: 'Boolean'
  },
  datas = [];

  function isType(data, type){
    if(type === 'Function'){
      return typeof(data) == 'function';
    }else if(type === 'String'){
      return typeof(data) === 'string';
    }
  }

  function defaultFind(data, find){
    var i;
    for(i in find){
      if(data[i] === undefined || find[i] !== data[i]){
        return false;
      }
    }
    return true;
  }

  function get(find){
    var r = [],
      t,
      i=0;
    if(!find){
      return datas;
    }else if(isType(find, 'Function')){
      for(i=0,len=datas.length;i<len;i++){
        if(find(t=datas[i])) r[r.length] = t;
      }
      return r;
    }else{
      for(i=0,len=datas.length;i<len;i++){
        if(defaultFind(t=datas[i], find)) r[r.length] = t;
      }
      return r;
    }
  }
  function getone(find){
    var t,
      i=0;
    if(!find){
      return datas[0];
    }else if(isType(find, 'Function')){
      for(i=0,len=datas.length;i<len;i++){
        if(find(t=datas[i])){
          return t;
        }
      }
      return undefined;
    }else{
      for(i=0,len=datas.length;i<len;i++){
        if(defaultFind(t=datas[i], find)){
          return t;
        }
      }
      return undefined;
    }
  }

  function add(data){
    datas[datas.length] = data;
    return true;
  }

  function replace(find, data){
    var one = getone(find),
      i;
    if(one){
      for(i in data){
        one[i] = data[i];
      }
      return true;
    }else{
      return false;
    }
  }

  function set(){
    var find,data;
    if(arguments.length === 0) return false;
    if(arguments.length === 1){
      data = arguments[0];
      return add(data);
    }else if(arguments.length === 2){
      find = arguments[0];
      data = arguments[1];
      return replace(find, data);
    }
  }
  return {
    set: set,
    get: get,
    getone: getone
  }
};