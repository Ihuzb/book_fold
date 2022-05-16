// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    image,
    name,
    openid
  } = event;
  let user_info = await db.collection('user_info')
    .where({
      openid
    })
    .get();
  if (!user_info.data.length) {
    let {
      _id
    } = await db.collection('user_info')
      .add({
        data: {
          image,
          name,
          openid
        }
      });
    user_info = await db.collection('user_info')
      .where({
        "_id": _id
      })
      .get();
  }
  return {
    user_info
  }
}