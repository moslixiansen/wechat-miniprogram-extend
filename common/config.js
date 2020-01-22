import runEnvNow from "../env"
import runEnvProd from "../env.prod"

const runEnv = (runEnvNow.env === runEnvProd.env) ? runEnvProd : runEnvNow;

const config =  Object.assign({}, runEnv, {
    is_prod: (runEnv.env === runEnvProd.env || runEnv.baseUrlApi === runEnvProd.baseUrlApi),
    version: runEnv.version === null ? runEnvNow.version : runEnv.version,
});

if (config.is_prod) {
    console.log(`%c环境：${config.env}`, 'font-size:30px;color:red;');
    console.log(`%c接口：${config.baseUrlApi}`, 'font-size:30px;color:red;');
    console.log(`%c谨慎操作，禁止任何提交 !!!!!!!!!!!!!!!!!!!!!`, 'font-size:30px;color:red;');
} else {
    console.log(`%c环境：${config.env}`, 'font-size:16px;color:blue;');
    console.log(`%c接口：${config.baseUrlApi}`, 'font-size:16px;color:blue;');
}

export default config;
