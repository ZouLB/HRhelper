import axios from 'axios';
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter';
import { Mail ,Rule} from './data/user';
let _Mail = Mail;
let _Rule = Rule;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);//定义一个mock adapter实例

    // mock success request
//  mock.onGet('/success').reply(200, {
//    msg: 'success'
//  });
//
//  // mock error request
//  mock.onGet('/error').reply(500, {
//    msg: 'failure'
//  });

    //登录
//  mock.onPost('/login').reply(config => {
//    let {username, password} = JSON.parse(config.data);
//    return new Promise((resolve, reject) => {
//      let user = null;
//      setTimeout(() => {
//        let hasUser = LoginUsers.some(u => {
//          if (u.username === username && u.password === password) {
//            user = JSON.parse(JSON.stringify(u));
//            user.password = undefined;
//            return true;
//          }
//        });
//
//        if (hasUser) {
//          resolve([200, { code: 200, msg: '请求成功', user }]);
//        } else {
//          resolve([200, { code: 500, msg: '账号或密码错误' }]);
//        }
//      }, 1000);
//    });
//  });

		//模拟Get请求
    //获取用户列表
//  mock.onGet('/user/list').reply(config => {
//  	console.log(config.params);
//    let {name} = config.params;
//    let mockUsers = _Users.filter(user => {
//      if (name && user.name.indexOf(name) == -1) return false;
//      return true;
//    });
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve([200, {
//          users: mockUsers
//        }]);
//      }, 1000);
//    });
//  });
    
     //获取标签
//  mock.onGet('/user/tag').reply(config => {
//  	console.log(config.params);
//    let {tag} = config.params;
//    let mockTags = _Tags.filter(user => {
//      if (tag && user.tag.indexOf(tag) == -1) return false;
//      return true;
//    });
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve([200, {
//          tags: mockTags
//        }]);
//      }, 1000);
//    });
//  });

    //获取列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, pageSize, name, sort} = config.params;
      let mockUsers = _Mail.filter(user => {
        if (name && user.recipient.indexOf(name) == -1) return false;
        else if (sort && user.operation_id.indexOf(sort) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //删除邮件
    mock.onGet('/user/remove').reply(config => {
      let { id } = config.params;
      _Mail = _Mail.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除邮件
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');//把字符串变成数组
      _Mail = _Mail.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
//  mock.onGet('/user/edit').reply(config => {
//    let {id, name, desc, formula, sql, creator, create_time ,tag } = config.params;
//    _Users.some(u => {
//      if (u.id === id) {
//        u.name= name;
//	        u.desc= desc;
//	        u.formula= formula;
//	        u.sql= sql;
//	        u.creator= creator;
//	        u.create_time= create_time;
//	        u.tag=tag;
//        return true;
//      }
//    });
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve([200, {
//          code: 200,
//          msg: '编辑成功'
//        }]);
//      }, 500);
//    });
//  });
//
//  //新增用户
//  mock.onGet('/user/add').reply(config => {
//    let { id, name, desc, formula, sql, creator, create_time,tag } = config.params;
//    _Users.push({
//    	id:Mock.Random.id(),
//      name: name,
//      desc: desc,
//      formula: formula,
//      sql: sql,
//      creator: creator,
//      create_time: create_time,
//      tag:tag
//    });
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve([200, {
//          code: 200,
//          msg: '新增成功'
//        }]);
//      }, 500);
//    });
//  });
    
   
    
    

  }
};