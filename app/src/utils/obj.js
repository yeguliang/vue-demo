let arr = [
    {id:1,name:'xue1'},
    {id:2,name:'xue2'},
    {id:3,name:'xue3'},
]
// 验证存在某些值
// 数组对象中 key value 是否含有某个值
function iscardKV(id){
    return arr.some(item=>{return Object.entries(item).some((val)=>{ return val.includes(id)})})
}
// 数组对象中 key是否含有某个值
function iscardK(id){
    return arr.some(item=>{return Object.keys(item).includes(id)})
}
// 数组对象中 value是否含有某个值
function iscardV(id){
    return arr.some(item=>{return Object.values(item).includes(id)})
}

let is = iscard('id')


// 数组扁平化
// /* ES6 */ 递归
const flatten = (arr) => {
    let result = [];
    arr.forEach((item, i, arr) => {
      if (Array.isArray(item)) {
        result = result.concat(flatten(item));
      } else {
        result.push(arr[i])
      }
    })
    return result;
  };

// /* ES6 */利用toString()
const flatten = (arr) => arr.toString().split(',').map((item) => +item);


// 去重
// Set (ES6)
let newArr = [...new Set(arr)]
let newArr = Array.from(new Set(arr))

// 数组filter
const arr = [1, 2, 1, 2, 3, 4, 'l', 2, 1, 3, 'l'];

const newArr = arr.filter(function(ele, index, array) {
	return index === array.indexOf(ele)
});

console.log(newArr); // [ 1, 2, 3, 4, 'l' ]

//  思路三利用对象去重



// 合并相同id对象
let data = [{
    id: '1',
    goodsName: 'test',
    price: 22
  },
  {
    id: '2',
    goodsName: 'test',
    price: 22
  },
  {
    id: '2',
    goodsName: 'test',
    price: 22
  },
  {
    id: '3',
    goodsName: 'test',
    price: 22
  },
  {
    id: '3',
    goodsName: 'test',
    price: 22
  },
  {
    id: '3',
    goodsName: 'test',
    price: 22
  },
  {
    id: '3',
    goodsName: 'test',
    price: 22
  },
  {
    id: '4',
    goodsName: 'test',
    price: 22
  }
]


let result = data.reduce((obj, item) => {
    let find = obj.find(i => i.id === item.id);
    let _d = {
      ...item,
      count: 1
    };
    find ? find.count++ : obj.push(_d);
    return obj;
  }, []);