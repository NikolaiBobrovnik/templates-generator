const fs = require('fs-extra')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const defaultOptions = {
  targetPath: 'src/components', // путь с папке с компонентами
  componentName: 'Test', // имя компонента, для которого создаем структуру
  viewVersion: 'both', // версия только mobile/desktop/tablet или mobile/desktop [both, m, d, t]
  type: 'c', // тип компонента c - class, f - function
  rdp: false, // remote-data-provider
  isForce: false // принудительное удаление папки, если она существует
}

const DESKTOP_POSTFIX = ''
const MOBILE_POSTFIX = 'Mobile'
const TABLET_POSTFIX = 'Tablet'

let options = {}
Object.assign(options, defaultOptions, argv)
options.pathDir = path.join(options.targetPath, options.componentName)

function getTemplate (tpl, componentName) {
  const templates = {
    component: {
      c: `import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { withRemoteData } from 'remote-data-provider'
import { axiosLocal } from 'services/axiosInstances'
import css from './${componentName}.module.scss'

@withRemoteData({
  request: {
    url: 'start.json'
  },
  axiosInstance: axiosLocal
})

class ${componentName} extends PureComponent {
  render () {
    // const { } = this.props
    return (
      <div className={css.wrapper}>Привет</div>
    )
  }

  static propTypes = {

  }
}

export default ${componentName}
`,
      f: `import React from 'react'
// import PropTypes from 'prop-types'
import css from './${componentName}.module.scss'
 
const ${componentName} = () => (
  <div className={css.wrapper}>Привет</div>
)
 
${componentName}.propTypes = {
 
}
 
export default React.memo(${componentName})
`
    },
    css: `.wrapper{

}
`
  }

  return templates[tpl]
}

function checkDir () {
  try {
    // Проверяем существование папки
    if (!fs.existsSync(options.pathDir)) {
      fs.mkdirSync(options.pathDir)
    }
  } catch (err) {
    console.error(err)
  }
}

function createComponent (pathDir = options.pathDir) {
  function createJS (postfix) {
    const filePath = path.join(pathDir, `${options.componentName}${postfix}.js`)
    if (!fs.existsSync(filePath) || options.isForce) {
      const fd = fs.openSync(filePath, 'w')
      const str = getTemplate('component', options.componentName+postfix)[options.type]
      fs.writeSync(fd, str, null, 'utf8')
      fs.closeSync(fd)
      console.log(chalk.green('Файл ' + filePath + ' создан.'))
    } else {
      console.log(chalk.red('Файл ' + filePath + ' уже существует!'))
      console.log(chalk.red('Используйте --isForce для принудительной перезаписи файла'))
    }
  }

  function createCss (postfix) {
    const filePath = path.join(pathDir, `${options.componentName}${postfix}.module.scss`)
    if (!fs.existsSync(filePath) || options.isForce) {
      const fd = fs.openSync(filePath, 'w')
      const str = getTemplate('css', options.componentName+postfix)
      fs.writeSync(fd, str, null, 'utf8')
      fs.closeSync(fd)
      console.log(chalk.green('Файл ' + filePath + ' создан.'))
    } else {
      console.log(chalk.red('Файл ' + filePath + ' уже существует!'))
      console.log(chalk.red('Используйте --isForce для принудительной перезаписи файла'))
    }
  }

  if (options.viewVersion === 'd') {
    createJS(DESKTOP_POSTFIX)
    createCss(DESKTOP_POSTFIX)
  } else if (options.viewVersion === 'm') {
    createJS(MOBILE_POSTFIX)
    createCss(MOBILE_POSTFIX)
  } else if (options.viewVersion === 't') {
    createJS(TABLET_POSTFIX)
    createCss(TABLET_POSTFIX)
  } else {
    createJS(DESKTOP_POSTFIX)
    createCss(DESKTOP_POSTFIX)
    createJS(MOBILE_POSTFIX)
    createCss(MOBILE_POSTFIX)
  }
}

function init () {
  checkDir()
  createComponent()
}

init()
