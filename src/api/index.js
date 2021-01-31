// 该项目的所有请求方法
import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post')

// 获取天气预报
export const reqGetWhether = city => ajax('https://restapi.amap.com/v3/weather/weatherInfo',
  {
    key: '4d41dd2ca7e2df8cb5cb7eb210d865b7',
    city,
    extensions: 'base'
  }
)

// 获取商品分类列表
export const reqCategoryList = parentId => ajax('http://localhost:5000/manage/category/list',
  {
    parentId
  }
)

// 添加商品分类列表
export const reqAddCategory = (parentId, categoryName) => ajax('http://localhost:5000/manage/category/add',
  {
    parentId,
    categoryName
  },
  'post'
)


// 修改商品分类列表
export const reqModifyCategory = (categoryId, categoryName) => ajax('http://localhost:5000/manage/category/update',
  {
    categoryId,
    categoryName
  },
  'post'
)
