import Diversity3Icon from '@mui/icons-material/Diversity3';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';

export const Sidebar = () => (
  <>
    <article className='flex w-[5%] flex-col justify-between p-10 bg-slate-100 border-r-2'>
      <div className='flex flex-col gap-5 cursor-pointer justify-center items-center'>
        <ForumIcon />
        <Diversity3Icon />
        <LogoutIcon />
      </div>
      <div>
        <img className='rounded-full' width={50} src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
      </div>
    </article>
  </>
);