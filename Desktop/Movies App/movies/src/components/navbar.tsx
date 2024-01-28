import { Button, Typography } from 'antd';
import { Api } from 'modules/auth';
import { useEffect, useState } from 'react'; // 'useEffect' va 'useState' import qilingan
import { Link, NavLink, useNavigate } from 'react-router-dom';
import store from 'store2';


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const access = store.get('access') || '';
    try {
      const { data } = await Api.Me({ token: access });

      setUser({ name: data.name });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser({ name: '' });
    store.remove('access');
    navigate('/auth/login');
  };

  return (
    <div className="w-full bg-slate-200 py-4">
      <div className="container mx-auto flex flex-1 items-center gap-10">
        <Link className="no-underline" to={''}>
          <Typography onClick={() => navigate('/movies')} className="font-aeonik text-3xl font-bold no-underline">
            Movies
          </Typography>
        </Link>

        {user.name ? (
          <div className="flex w-full flex-1 items-center justify-between gap-4 text-[30px] ">
            <div className="user flex items-center gap-8">
              <div className="text-xl">
                <Typography className="text-[20px]">{user.name}</Typography>
              </div>
              <div className="text-xl">
                <Button className="" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            <Button onClick={() => navigate('/movies/add')}>Add Movie</Button>
          </div>
        ) : (
          <div className="flex gap-4 text-[30px]">
            <div className="text-xl">
              <NavLink to="/auth/login" className="text-stone-600 no-underline hover:text-stone-800">
                Login
              </NavLink>
            </div>
            <div className="text-xl">
              <NavLink to="/auth/register" className="text-stone-600 no-underline hover:text-stone-800">
                Register
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
