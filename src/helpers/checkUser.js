
export default function CheckUser(navigate){

    const user = localStorage.getItem('user')
    if(user)  navigate('/dashboard')  
}