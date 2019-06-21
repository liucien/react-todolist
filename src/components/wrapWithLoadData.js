import React from 'react';

export default (WrappedComponent, name) => {
    class LocalStorageActions extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null
            };
        }

        componentWillMount() {
            // 通过写入的属性名获取缓存值
            const data = localStorage.getItem(name);

            try {
                this.setState({
                    data: JSON.parse(data)
                });
            } catch (e) {
                this.setState({
                    data
                });
            }
        }

        saveData = data => {
            // 公共方法，传值获取数据，写入缓存
            try {
                localStorage.setItem(name, JSON.stringify(data));
            } catch (e) {
                localStorage.setItem(name, `${data}`);
            }
        };

        render() {
            // 组件名要以大写开头
            return (
                <WrappedComponent
                    data={this.state.data}
                    saveData={this.saveData}
                    {...this.props}
                />
            );
        }
    }

    return LocalStorageActions;
};
