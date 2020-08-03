import React, {useEffect, useState} from "react";
import styles from "./FriendsPage.module.css"
import {connect} from "react-redux";
import searchUsers from "../../store/actions/search";
import FriendsList from "../FriendsList/FriendsList";
import {fetchUserFriends} from "../../store/actions/friends";
import UsersList from "../UsersList/UsersList";

const FriendsPage = props => {
    const [filter, setFilter] = useState("");
    const [friends, setFriends] = useState([]);

    const searchHandler = () => {
        const filteredFriends = props.friends.filter(friend => {
            const names = {first_name: friend.user.first_name, last_name: friend.user.last_name};
            return Object.keys(names).some(key => names[key].toLowerCase().includes(filter));
        });

        // if no matches in friends list, search globally users
        if (filteredFriends.length === 0) props.searchUsers(filter);

        setFriends(filteredFriends);
    };

    useEffect(() => {
        props.fetchUserFriends(setFriends);
    }, []);

    useEffect(() => searchHandler(), [filter]);

    return (
        <div className={styles.FriendsPage}>
            <h2 className={styles.heading}>Friends - {props.friends.length}</h2>
            <input
                className={styles.search_field}
                placeholder="Type name to search users"
                onChange={(e) => setFilter(e.target.value.toLowerCase())}
            />
            <hr/>
            <FriendsList friends={friends}/>
            {!friends.length ? <UsersList users={props.users}/> : null}
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isRequesting: state.search.isRequesting,
        friends: state.friends.friends,
        users: state.search.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchUsers: (filter) => dispatch(searchUsers(filter)),
        fetchUserFriends: (friendsSetter) => dispatch(fetchUserFriends(friendsSetter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
