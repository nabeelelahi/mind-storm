
export default function checkAdmin(navigate){

    const user = sessionStorage.getItem('admin')
    if(!user)  navigate('/admin/login')  
}