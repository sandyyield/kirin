// import React, { Component } from 'react'
import * as React from 'react'

//tofix..等下来处理它 
// import * as Actions from '../../redux/actions/'

//
// import { connect } from 'react-redux'
// import * as ReactRedux from 'react-redux'
// import { test } from '../../redux/actions'


class Admin extends React.Component {

    componentDidMount() {
        console.log('did mount');
    }

    handleClick = () => {
        // console.log(this.props.demo);
        // const { test } = this.props;
        // test('3333');
        // console.log(this.props.demo)
        // console.log(this.props.test)
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>click me</button>
                {/* <br />
                admin... */}
            </div>
        )
    }
}

// const mapStateToProps = (state: any) => ({ demo: state })

// const mapDispatchToProps = (dispatch: any) => {
//     test: (p: string) => dispatch(Actions.Test(p))
// }

// export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Admin)


// export default ReactRedux.connect(
//     (state: any) => ({ demo: state }),
//     {
//         test
//     }
// )(Admin)


export default Admin;
