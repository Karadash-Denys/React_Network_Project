import { Field, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { FilterType, getUsers } from "../../../redux/Users_Reducer"
import { getPageSize, getUsersFilter } from "../../../redux/Users_Selector"

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type PropsType = {
    // onFilterChanged: (filter: FilterType) => void
}

type FriendType = "true" | "false" | "null"

type FormType = {
    term: string
    friend: FriendType
}

const UsersSearchForm: React.FC<PropsType> = () => {

    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch()

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === "null"
                    ? null
                    : values.friend === "true"
                    ? true
                    : false,
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UsersSearchForm
