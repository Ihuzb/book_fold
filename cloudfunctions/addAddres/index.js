// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  delete event.userInfo
  let {
    _id
  } = await db.collection('addres_list')
    .add({
      data: event
    });
  return await db.collection('user_book')
    .add({
      data: {
        addres_id: _id,
        user_id: event.user_id,
        type: 1,
        time: new Date(),
        orgin: 1,
        book_id: event.book_id,
      }
    });

}