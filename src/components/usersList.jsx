import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import User from "./layouts/users";
import _ from "lodash";
import { useParams } from "react-router-dom";

const UsersList = () => {
  const pageSize = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleUserChange = (id) => {
    setUser(users.find((user) => user._id === id));
  };

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    if (userId) {
      return <User user={user} />;
    }
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus usersLen={count} />
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count !== 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
              onUserChange={handleUserChange}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

// Users.propTypes = {
//   users: PropTypes.array.isRequired
// };

export default UsersList;
