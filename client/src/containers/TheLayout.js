import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from '../components'

// routes config
import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = () => {
  return (
    <div className="c-main">
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            if (route.protected) {
              return <PrivateRoute key={idx} path={route.path} exact={route.exact} name={route.name} component={route.component}/>
            } else {
              return <PublicRoute key={idx} path={route.path} exact={route.exact} name={route.name} component={route.component}/>
            }
          })}
        </Switch>
      </Suspense>
    </div>
  )
}

export default React.memo(TheLayout)
