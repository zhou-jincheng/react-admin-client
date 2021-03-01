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

/**
 * 根据分类id获取分类信息
 * @param {String} categoryId 分类Id
 */
export const reqCategoryById = (categoryId) => ajax('/manage/category/info',
  {
    categoryId
  }
)

/**
 * 对商品进行上架/下架处理
 * @param {String} productId 
 * @param {Number} status [ 1:下架 | 2:上架 ]
 */
export const reqUpdateProductStatus = (productId, status) => ajax('/manage/product/updateStatus',
  {
    productId,
    status
  },
  'post'
)

/**
 * 删除图片
 * @param {string} name 图片名
 */
export const reqDeleteImage = name => ajax('/manage/img/delete',
  {
    name
  },
  'post'
)

/**
 * 上传图片
 * 文件是对象，后端所对应的字段名应在文件对象中设置
 * @param {File} image 图片文件
 */
export const reqUploadImage = image => ajax('/manage/img/upload',
  image,
  'post'
)

/**
 * 添加/修改商品
 * @param {object} product 商品对象
 */
export const reqAddOrUploadProduct = 
  product => ajax('/manage/product/' + (product._id ? 'update': 'add'),
  product,
  'post'
)

/**
 * 获取角色列表
 */
export const reqRoleList = () => ajax('/manage/role/list')

/**
 * 添加角色
 * @param {string} roleName 角色名称
 */
export const reqAddRole = roleName => ajax('/manage/role/add',{roleName}, 'post')
