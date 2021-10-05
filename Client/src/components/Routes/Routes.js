import { useSelector } from 'react-redux'
import { Route, Switch, Router } from 'react-router'
import Home from '../Home/Home'
import Login from '../Login/Login'

export const RouterWeb = () => {
  const logged = useSelector(state => state.logged)
  return (
    <Router basename='/Challenge-Full-Stack-Alkemy'>
      <Switch>
        {logged
          ? <Route exact path='/' component={Home} />
          : <Route component={Login} />}
      </Switch>
    </Router>
  )
}
