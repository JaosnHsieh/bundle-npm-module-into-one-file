const fs = require('fs');

console.log('copying below code, now use fs.readFileSync for testing');

const code = fs.readFileSync(__dirname + '/yup-bundle.js').toString();

console.log('eval copied code and get yup module');

const yup = eval(code).exports;

console.log('start testing');

const schema = yup.object({
  n: yup.number().min(3),
});

try {
  schema.validateSync({ n: 1 });
} catch (err) {
  console.log('err', err);
}
