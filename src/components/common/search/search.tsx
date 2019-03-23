import { AutoComplete, Icon, Input } from 'antd';
import React from 'react';
const css = require('./search.module.scss');

// const Option = AutoComplete.Option;

// function getRandomInt(max, min = 0) {
//     return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
// }

// function searchResult(query) {
//     return (new Array(getRandomInt(5))).join('.').split('.')
//         .map((item, idx) => ({
//             query,
//             category: `${query}${idx}`,
//             count: getRandomInt(200, 100),
//         }));
// }

// function renderOption(item) {
//     return (
//         <Option key={item.category} text={item.category}>
//             {item.query} 在
//             <a
//                 href={`https://s.taobao.com/search?q=${item.query}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//             >
//                 {item.category}
//             </a>
//       区块中
//             <span className="global-search-item-count">约 {item.count} 个结果</span>
//         </Option>
//     );
// }

// function renderOptions(): any {
//     return null;
// }

export type OnSelectHandler<T> = (value: T, option: any) => any;
export type OnSearchHandler = (value: string) => any;

export interface Props<T> {
    placeholder: string;
    dataSource: T[];
    onSelect?: OnSelectHandler<T>;
    onSearch?: OnSearchHandler;
}

export default class Complete extends React.Component<Props<any>> {
    public render(): any {
        const { dataSource } = this.props;

        return (
          <div className={css.wrapper} style={{ width: 300 }}>
              <AutoComplete
                  className={css.autocomplete}
                  dataSource={dataSource}
                  onSelect={this.props.onSelect}
                  onSearch={this.props.onSearch}
                  placeholder={this.props.placeholder}
                  optionLabelProp="text"
              >
                  <Input
                      suffix={<Icon type="search" />}
                  />
              </AutoComplete>
          </div>
        );
    }
}
