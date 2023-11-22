import SearchList from "./SearchList";
import SearchLikedList from "./SearchLikedList";
import "./MainPage.css";
function MainPage(props) {
  const { user } = props;
  let likedRecipes = [];
  likedRecipes.push(user.list);
  return (
    <div className="main">
      <header>
        <h1>
          welcome {user.username} and {likedRecipes}
        </h1>
      </header>
      <div className="listContainer">
        <SearchLikedList UserList={user.list} />
        <SearchList />
      </div>
    </div>
  );
}

export default MainPage;
