# Project Name

@aic/templates-generator

## Installation

`yarn add @aic/templates-generator --dev`

## Usage
Скрипт принимает имя компонента и создает структуру типа
```
├── NewsItem 
|   ├── NewsItem.js
|   └── NewsItem.module.scss 
└── ...
```
Шаблон файла js `--type c`
```jsx harmony
import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import css from './NewsItem.module.scss'

class NewsItem extends PureComponent {
  render () {
    // const { } = this.props
    return (
      <div className={css.wrapper}>Привет</div>
    )
  }

  static propTypes = {

  }
}

export default NewsItem
```
Шаблон файла js `--type f`
```jsx harmony
import React from 'react'
// import PropTypes from 'prop-types'
import css from './${componentName}.module.scss'
 
const ${componentName} = () => (
  <div className={css.wrapper}>Привет</div>
)
 
${componentName}.propTypes = {
 
}
 
export default React.memo(${componentName})
```
Шаблон файла scss
```sass
.wrapper{

}
```
### Опции
Опции по умолчанию
```js
const defaultOptions = {
  targetPath: 'src/components', // путь с папке с компонентами
  componentName: 'Test', // имя компонента, для которого создаем структуру
  viewVersion: 'both', // версия только mobile/desktop/tablet или mobile/desktop [both, m, d, t]
  type: 'c', // тип компонента c - class, f - function
  isForce: false // принудительное удаление папки, если она существует
}
```
### Запуск
Опции можно передавать в произвольном порядке по шаблону 

`--[имя опции] [значение]`,
 
 пример `--componentName Test` 

`node node_modules\@aic\templates-generator\templates-generator.js --componentName Test`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License

MIT
