import React from 'react';
import PropTypes from 'prop-types';

class Comment extends React.Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number,
        onSelect: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            timeString: '',
            isSelect: false
        };
    }

    componentWillMount() {
        this._updateTimeString();
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    _updateTimeString() {
        const { comment } = this.props;
        const duration = (+Date.now() - comment.createTime) / 1000;

        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)} 分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        });
    }

    _getProcessedContent = content => {
        return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
    };

    handleDeleteComment = () => {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index);
        }
    };

    isSelect = () => {
        this.setState({
            isSelect: !this.state.isSelect
        });
        this.props.onSelect(!this.state.isSelect, this.props.comment.createTime);
    };

    render() {
        const { comment } = this.props;

        return (
            <div className="comment">
                <input type="checkbox" checked={this.state.isSelect} onChange={this.isSelect} />
                <div className="comment-user">
                    <span className="comment-username">
                        {comment.username}
                    </span>：
                </div>

                <p
                    dangerouslySetInnerHTML={{
                        __html: this._getProcessedContent(comment.content)
                    }}
                />

                <span className="comment-createdtime">
                    {this.state.timeString}
                </span>
                <span
                    onClick={this.handleDeleteComment}
                    className="comment-delete"
                >
                    删除
                </span>
            </div>
        );
    }
}

export default Comment;
