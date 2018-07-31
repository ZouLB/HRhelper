import Mock from 'mockjs';

const Mail = [];

for (let i = 0; i < 25; i++) {
  Mail.push(Mock.mock({
    id: Mock.Random.id(),
    mail_name: Mock.Random.csentence(),
    recipient: Mock.Random.cname(),
    recipient_address: Mock.Random.email('bingosoft.net'),
    sender: Mock.Random.cname(),
    sender_address: Mock.Random.email('bingosoft.net'),
    copy_people: Mock.Random.cname(),
    send_time: Mock.Random.datetime('yyyy-MM-dd HH:mm'),
    operation_id: Mock.Random.character('12345'),
  }));
}

const Rule = [];

//for (let i = 0; i < 4; i++) {
//Mail.push(Mock.mock({
//  id: Mock.Random.id(),
//  rule_name: Mock.Random.paragraph(),
//  recipient: Mock.Random.cname(),
//  update_time: Mock.Random.datetime('yyyy-MM-dd HH:mm'),
//  operation_id: Mock.Random.natural( 0, 10 ),
//}));
//}

export { Mail , Rule};
