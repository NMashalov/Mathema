export function Cabinet(){
    
    const [ firstName, setFirstName] = useState('')
    const [ lastName, setLastName] = useState('')
    const [ username, setUsername] = useState('')
    const [ email, setEmail] = useState('')
    const [ dateJoined, setDateJoined] = useState('')

    

    useEffect(() => {
        if (isLoggedIn) {
            axios.get(
                '/api/user',
            )
                .then(response => {
                    if (response.status === 200) {
                        return response.data
                    } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data}) => {
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setUsername(data.username)
                    setEmail(data.email)
                    setDateJoined(data.date_joined)
                })
                .catch(error => {
                    console.log(error)
                    setIsLoggedIn(false)
                })
        }}, [isLoggedIn]
    )

}