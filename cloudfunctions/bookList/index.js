// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    user_id = ''
  } = event;
  return await db.collection('book_list')
    .aggregate()
    .lookup({
      from: 'book_info',
      localField: 'name_id',
      foreignField: '_id',
      as: 'info'
    })
    .lookup({
      from: 'user_book',
      let: {
        book_id: '$_id',
      },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$user_id', user_id]),
          $.eq(['$$book_id', '$book_id']),
        ])))
        .done(),
      as: 'userInfo'
    })
    .lookup({
      from: 'user_book',
      let: {
        book_id: '$_id',
      },
      pipeline: $.pipeline()
        .match(_.expr($.and([
          $.eq(['$book_id', '$$book_id']),
        ])))
        .count('likeCount')
        .done(),
      as: 'userNum'
    })
    .end()
}