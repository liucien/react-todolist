import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class CommentList extends React.Component{
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    };
    static defaultProps = {
        comments: []
    };

    constructor(props){
        super(props);
        this.state = {
            comments: props.comments,
            delArr: []
        };
    }

    onSelect = (e, createTime) => {
        const { delArr } = this.state;

        if (e) {
            delArr.push({ createTime });
            this.setState({
                delArr
            });
        }
    };

    handleDeleteComment = index => {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    };

    deleteSelect = () => {
        const { comments, delArr } = this.state;
        const arr = [];

        comments.forEach((item, index) => {
            delArr.forEach(val => {
                if (item.createTime === val.createTime) {
                    arr.push(index);
                }
            });
        });

        arr.reverse().forEach(item => {
            comments.splice(item, 1);
        });
        this.setState({
            comments
        });
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    render() {
        return (
            <div>
                {this.state.comments.map((item, i) =>
                    (<Comment
                        comment={item}
                        key={item.createTime}
                        index={i}
                        onDeleteComment={this.handleDeleteComment}
                        onSelect={this.onSelect}
                    />)
                )}
                {
                    this.state.comments.length !== 0 && <div className="comment-field-button">
                        <button onClick={this.deleteSelect}>删除选中</button>
                    </div>
                }
            </div>
        );
    }
}

export default CommentList;
