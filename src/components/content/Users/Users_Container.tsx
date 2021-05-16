import React from "react"
import { useSelector } from "react-redux"
import Users from "./Users"
import Preloader from "../../../common/preloader/Preloader"
import { getIsFetching } from "../../../redux/Users_Selector"
import UsersSearchForm from "./Users_Search_Form"

type UserPagePropsType = {
    pageTitle: string
}

const UserPage: React.FC<UserPagePropsType> = ({ pageTitle }) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <UsersSearchForm />
            </div>
            <h3>{pageTitle}</h3>
            {isFetching ? <Preloader /> : null}

            <Users />
        </div>
    )
}

export default UserPage
