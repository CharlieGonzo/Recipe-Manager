function MainPage(props) {
  const { user } = props;
  return (
    <>
      <h1> welcome {user.username}</h1>
    </>
  );
}

export default MainPage;
