/****************
  datadepot

  @method set(data_name, data_value)
  @method get(data_name)
  @method getone(data_name)
****************/
var datadepot = function(){
  this.datas = [];
}
datadepot.prototype.isType = function(data, type){
  if(type === 'Function'){
    return typeof(data) === 'function';
  }else if(type === 'String'){
    return typeof(data) === 'string';
  }else{
    return false;
  }
}
datadepot.prototype._defaultFind = function(data, find){
  var i;
  for(i in find){
    if(data[i] === undefined || find[i] !== data[i]){
      return false;
    }
  }
  return true;
}
datadepot.prototype.get = function(find){
  var _self = this,
    r = [],
    t,
    i=0;
  if(!find){
    return _self.datas;
  }else if(_self.isType(find, 'Function')){
    for(i=0,len=_self.datas.length;i<len;i++){
      if(find(t=_self.datas[i])) r[r.length] = t;
    }
    return r;
  }else{
    for(i=0,len=_self.datas.length;i<len;i++){
      if(_self._defaultFind(t=_self.datas[i], find)) r[r.length] = t;
    }
    return r;
  }
}
datadepot.prototype.getone = function(find){
  var _self = this,
    t,
    i=0;
  if(!find){
    return _self.datas[0];
  }else if(_self.isType(find, 'Function')){
    for(i=0,len=_self.datas.length;i<len;i++){
      if(find(t=_self.datas[i])){
        return t;
      }
    }
    return undefined;
  }else{
    for(i=0,len=_self.datas.length;i<len;i++){
      if(_self._defaultFind(t=_self.datas[i], find)){
        return t;
      }
    }
    return undefined;
  }
}

datadepot.prototype._add = function(data){
  this.datas[this.datas.length] = data;
  return true;
}

datadepot.prototype._updata = function(find, data){
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

datadepot.prototype.set = function(){
  var _self = this,
    find,data;
  if(arguments.length === 0) return false;
  if(arguments.length === 1){
    data = arguments[0];
    return _self._add(data);
  }else if(arguments.length === 2){
    find = arguments[0];
    data = arguments[1];
    return _self._updata(find, data);
  }
}