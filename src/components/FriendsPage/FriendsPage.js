import React, {useState} from "react";
import styles from "./FriendsPage.module.css"
import {connect} from "react-redux";
import searchUsers from "../../store/actions/search";
import FriendsList from "../FriendsList/FriendsList";

const FriendsPage = props => {
    const [friends, setFriends] = useState(props.friends);

    const searchHandler = () => {

    };

    return (
        <div className={styles.FriendsPage}>
            <h2 className={styles.heading}>Friends</h2>
            <input
                className={styles.search_field}
                placeholder="Type name to search users"
                onChange={(e) => props.searchUsers(e.target.value)}
            />
            <hr/>
            <FriendsList friends={friends}/>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isRequesting: state.search.isRequesting,
        friends: state.user.friends,
        users: state.search.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchUsers: (value) => dispatch(searchUsers(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
