import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

class App extends Component {

    state = {
        gists: null
    };

    componentDidMount() {
        fetch('https://api.github.com/gists')
        .then(res => res.json())
        .then(gists => {
            this.setState({ gists });
        })
    }

  render() {
    const { gists } = this.state;
    return (
        <Router>
            <Root>
                <Sidebar>
                    { gists ?
                        gists.map((gist, index) => (
                            <Link key={index} to={`/g/${gist.id}`}>
                                <SidebarItem key={gist.id}>
                                    {gist.description || 'No description'}
                                </SidebarItem>
                            </Link>
                        ))
                        : <div>Loading...</div> }
                </Sidebar>
                <Main>
                    <Route exact={true} path='/' render={() => (
                        <h1>Welcome to Gists Github API demo</h1>
                    )} />
                    { gists && (
                        <Route path='/g/:gistId' render={({match}) => (
                            <Gist gist={gists.find(g => g.id === match.params.gistId )} />
                        )}/>
                    )}
                </Main>
            </Root>
        </Router>
    );
  }
}

const Root = (props) => (
    <div style={{
        display: 'flex'
    }} {...props} />
);

const Sidebar = (props) => (
    <div style={{
        width: '25%',
        background: '#eeeeee'
    }} {...props} />
);

const SidebarItem = (props) => (
    <div style={{
        textOverflow: 'ellipsis',
        padding: '5px 12px',
        wordWrap: 'break-word',
        borderBottom: ' 1px solid burlywood'
    }} {...props} />
);

const Main = (props) => (
    <div style={{
        background: 'antiquewhite',
        padding: '30px',
        width: '75%'
    }} {...props} />
);

const Gist = ({ gist }) => (
    <ul>
        <li>{ gist.id }</li>
        <li>{ gist.description || 'No description' }</li>
    </ul>
);

export default App;
