import React, { Component } from 'react'
import { connect } from 'react-redux'
import { test } from '../../redux/actions/test'


class Admin extends Component {

    componentDidMount() {
        console.log('did mount',this.props.demo);
    }

    handleClick = () => {
        // console.log(this.props.demo);
        const { test } = this.props;
        test('3333');
        console.log(this.props.demo)
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>ddddddddddddddddd</button>
                admin...
            </div>
        )
    }
}


export default connect(
    state => ({ demo: state.test }),
    {
        test
    }
)(Admin)
