import 'bootstrap/dist/css/bootstrap.css'
import BuildClient from '../api/build-client'


const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <h1>header</h1>
      <Component {...pageProps} />
    </div>
  )
}


AppComponent.getInitialProps = async (appContext) => {
  const client = BuildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default AppComponent;
