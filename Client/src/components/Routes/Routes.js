import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import Home from '../Home/Home'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'

export const RouterWeb = () => {
  const logged = useSelector(state => state.logged)
  return (
    <Switch>
      {logged
        ? <Route exact path='/' component={Home} />
        : <Route exact path='/' component={Login} />}
    </Switch>

  )
}
