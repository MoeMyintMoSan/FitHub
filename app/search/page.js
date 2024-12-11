import TopMenu from "@/components/ui/topmenu";
import SideMenu from "@/components/ui/sidemenu";
const ProfilePage = () => {
  return (
        <div className='bg-slate-950 min-h-screen'>
            <TopMenu/>
            <div className='flex'>
                <SideMenu/>
                <div className='container mx-auto p-5'>
                    <h1>Welcome to Searches UwU</h1>
                    <p>Go use google it's free! Hope that helped!</p>
                </div>
            </div>
            <h1>Profile Page</h1>
        </div>
  );
}

export default ProfilePage;