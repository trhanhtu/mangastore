import { ReactNode } from 'react';
import Header from '../../components/User/Header/Header';
import Footer from '../../components/User/Footer/Footer';

interface DefaultLayoutUserProps {
  children: ReactNode;  
}

const DefaultLayoutUser = ({ children }: DefaultLayoutUserProps) => {
  return (
    <div className='bg-zinc-900'>
      <Header />
      <div className="container mx-4 md:mx-auto h-full my-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayoutUser;
