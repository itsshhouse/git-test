var gulp = require('gulp');
var download = require('gulp-download');
var fs = require('fs');
var readline = require('readline');
var rename = require('gulp-rename');
var path = require('path');
var prettier = require('prettier');
var configPath = 'apiservice.cfg';
var targetFile = '../src/api/ApiService.ts';

function writeConfig(callback) {
  var configObj = { apiServiceUrl: '' };
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('please input the api service url:', function(answer) {
    configObj.apiServiceUrl = answer;
    fs.writeFileSync(configPath, JSON.stringify(configObj));
    rl.close();
    callback(configObj);
  });
}

function readConfig(callback) {
  //if not exists
  var config = null;
  if (!fs.existsSync(configPath)) {
    writeConfig(callback);
  } else {
    //ask for input
    config = fs.readFileSync(configPath);
    var configObj = JSON.parse(config);
    if (configObj.apiServiceUrl) {
      callback(configObj);
    } else {
      writeConfig(callback);
    }
  }
}

function buildApi() {
  if (fs.existsSync(targetFile)) {
    var spawn = require('child_process').spawn;
    var proc = spawn('attrib', ['-r', targetFile, '/s']);
    proc.on('close', function(code) {
      //read config file
      readConfig(function(confiobj) {
        var stream = download(confiobj.apiServiceUrl)
          .pipe(rename('apiservice.ts'))
          .pipe(gulp.dest(path.dirname(targetFile)));
        stream.on('end', function() {
          const text = fs.readFileSync(targetFile, 'utf8');
          const apiJson = JSON.parse(text);
          let targetText =
            "import ItsApp from '@/generic/ItsApp';export type Float = number;export type Double = number;export type Single = number;" +
            'export type Guid = string;export type DateTime = string;export type Char = string;export type Decimal = number;export type SByte = number;' +
            'export type Byte = number;export type Int16 = number;export type UInt16 = number;export type Int32 = number;export type UInt32 = number;' +
            'export type Int64 = number;export type UInt64 = number;export type String = string;export type Boolean = boolean;export type IHttpActionResult = any;';
          const tags = ['模块访问日志相关接口', '各模块信息相关接口'];
          let moduleText = {};
          for (let i = 0, il = apiJson.tags.length; i < il; i++) {
            const tagsIndex = tags.indexOf(apiJson.tags[i].name);
            if (tagsIndex !== -1) {
              moduleText[tags[tagsIndex]] =
                'export class ' +
                apiJson.tags[i].description.replace(/\s*/g, '').replace('Controller', 'Module') +
                ' {constructor(private app: ItsApp) {}';
            }
          }

          for (const item in apiJson.paths) {
            const pathItem = apiJson.paths[item];
            for (const detail in pathItem) {
              const methodItem = pathItem[detail];
              if (tags.indexOf(methodItem.tags[0]) !== -1) {
                let parameters = ''; //参数model
                let paramsName = ''; //参数名称
                //返回类型
                let returnModel = '';
                //方法名称
                const methodName = item.substring(item.lastIndexOf('/') + 1);
                const moduleName = item.substring(1, item.lastIndexOf('/'));
                //拼接parameters
                for (let i = 0, il = methodItem.parameters.length; i < il; i++) {
                  let defiName = methodItem.parameters[i].schema.$ref;
                  defiName = defiName.substring(defiName.lastIndexOf('/') + 1);
                  const definitions = apiJson.definitions[defiName].properties;
                  paramsName = defiName + 'Parameters';
                  parameters += 'export interface ' + paramsName + ' {';
                  for (const params in definitions) {
                    parameters += params + ':' + definitions[params].type + ';';
                  }
                  parameters += '}';
                }
                //拼接返回类型
                let returnModelName = methodItem.responses['200'].schema.$ref;
                returDefiName = returnModelName.substring(returnModelName.lastIndexOf('/') + 1);
                const returnDefinitions = apiJson.definitions[returDefiName].properties;
                const str =
                  '/** ' +
                  detail.toLocaleUpperCase() +
                  ' ' +
                  item +
                  ' */ ' +
                  'public ' +
                  item.substring(item.lastIndexOf('/') + 1) +
                  '(parameters:' +
                  paramsName +
                  ',showProgress: boolean = true){' +
                  'return this.app.request.' +
                  detail +
                  '<' +
                  returnModel +
                  ">('" +
                  moduleName +
                  "','" +
                  methodName +
                  "',parameters,{notShowProgress: !showProgress});}";
                moduleText[methodItem.tags[0]] = parameters + moduleText[methodItem.tags[0]] + str;
              }
            }
          }
          for (const item in moduleText) {
            targetText += moduleText[item] + '}';
          }
          prettier.resolveConfig(targetFile, { editorconfig: true }).then(options => {
            options.parser = 'typescript';
            const formatted = prettier.format(targetText, options);
            fs.writeFileSync(targetFile, formatted);
            console.log('Finish');
          });
        });
        stream.on('error', function(err) {
          console.error(err);
        });

        return stream;
      });
    });

    return proc;
  }
}

exports.api = gulp.series(buildApi);
