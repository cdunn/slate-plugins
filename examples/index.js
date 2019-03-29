import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'

import DropOrPasteImages from './slate-drop-or-paste-images'
import PasteLinkify from './slate-paste-linkify'

/**
 * Examples.
 *
 * @type {Array}
 */

const EXAMPLES = [
  ['Drop/Paste Images', DropOrPasteImages, '/slate-drop-or-paste-images'],
  ['Paste Linkify', PasteLinkify, '/slate-paste-linkify'],
]

/**
 * App.
 *
 * @type {Component}
 */

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="nav">
          <span className="nav-title">
            @ianstormtaylor's Slate Plugins Examples
          </span>
          <div className="nav-links">
            <a
              className="nav-link"
              href="https://github.com/ianstormtaylor/slate-plugins"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="tabs">
          {EXAMPLES.map(([name, Component, path]) => (
            <NavLink
              key={path}
              to={path}
              className="tab"
              activeClassName="active"
            >
              {name}
            </NavLink>
          ))}
        </div>
        <div className="example">
          <Switch>
            {EXAMPLES.map(([name, Component, path]) => (
              <Route key={path} path={path} component={Component} />
            ))}
            <Redirect from="/" to={EXAMPLES[0][2]} />
          </Switch>
        </div>
      </div>
    )
  }
}

/**
 * Router.
 *
 * @type {Element} router
 */

const router = (
  <HashRouter>
    <App />
  </HashRouter>
)

/**
 * Mount the router.
 */

const root = window.document.createElement('div')
root.id = 'root'
window.document.body.appendChild(root)
ReactDOM.render(router, root)
