import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserForm from "../components/ui/userForm";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;

  return (
    <>
      {userId ? (
        edit ? (
          <UserForm userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
