const LandingPage = ({ color }) => {
  console.log('I am in the component bro', color)
  return (
    <h1>
      Landgin page
    </h1>
  )

}


LandingPage.getInitialProps = () => {

  console.log('I am on the server')
  return { color: 'red' }
};

export default LandingPage;
