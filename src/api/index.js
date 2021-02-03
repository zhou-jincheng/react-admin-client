// 该项目的所有请求方法
import ajax, {request} from './ajax'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post')

// 获取天气预报
export const reqGetWhether = city => request('https://restapi.amap.com/v3/weather/weatherInfo',
  {
    key: '4d41dd2ca7e2df8cb5cb7eb210d865b7',
    city,
    extensions: 'base'
  }
)

// 获取商品分类列表
export const reqCategoryList = parentId => ajax('/manage/category/list',
  {
    parentId
  }
)

// 添加商品分类列表
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add',
  {
    parentId,
    categoryName
  },
  'post'
)


// 修改商品分类
export const reqModifyCategory = (categoryId, categoryName) => ajax('/manage/category/update',
  {
    categoryId,
    categoryName
  },
  'post'
)

// 获取商品列表
export const reqProductList = (pageNum, pageSize) => ajax('/manage/product/list',
  {
    pageNum,
    pageSize
  }
)


/**
 * 根据关键字获取商品列表
 * @param {Number} pageNum 
 * @param {Number} pageSize 
 * @param {String} searchType [productName | productDesc]
 * @param {String} keywords 
 */
 
export const reqProductsByKeywords = (pageNum, pageSize, searchType, keywords) => ajax('/manage/product/search',
  {
    pageNum,
    pageSize,
    [searchType]: keywords,
  }
)