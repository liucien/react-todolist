import React from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData';

class CommentInput extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.any,
        saveData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            username: props.data || '',
            content: ''
        };

        this.textarea = React.createRef();
    }

    componentDidMount() {
        this.textarea.current.focus();
    }

    handleUsernameBlur = event => {
        this.props.saveData(event.target.value);
    };

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handleContentChange = event => {
        this.setState({
            content: event.target.value
        });
    };

    handleSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createTime: +new Date()
            });
        }
        this.setState({
            content: ''
        });
    };

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="comment-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="comment-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea
                            ref={this.textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange}
                        />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit} >
                        发布
                    </button>
                </div>
            </div>
        );
    }
}

export default wrapWithLoadData(CommentInput, 'username');
