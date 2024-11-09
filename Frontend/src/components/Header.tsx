import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/Context';
import NavigationLink from './shared/NavigationLink';
function Header() {

  const auth= useAuth();
  return (
    <AppBar sx={{bgcolor:"hsl(220, 30%, 28%)",position:"static",padding:0,width:"auto"}}>
      <Toolbar sx={{display:"flex",padding:0}}>
        <Logo/>
        <div>
          {auth?.isLoggedIn?(
            <>
              <NavigationLink 
                bg="#00fffc" 
                to='/chat' 
                text='Go to Chat' 
                textColor='black'
              />
              <NavigationLink 
                bg="#00fffc" 
                textColor='black'
                to='/' 
                text='logout' 
                onClick={auth.logout}
              />
            </>
          ):
          (
            <>
              <NavigationLink 
                bg="#00fffc" 
                to='/login' 
                text='login' 
                textColor='black'
              />
              <NavigationLink 
                bg="#00fffc" 
                textColor='black'
                to='/signup' 
                text='signup'
              />
            </>
        )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;