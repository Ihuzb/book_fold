// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let {
    book_id
  } = event;
  return await db.collection('user_book')
    .aggregate()
    .lookup({
      from: 'user_info',
      localField: 'user_id',
      foreignField: '_id',
      as: 'info'
    })
    .match({
      book_id
    })
    .end()
}