import DefaultLayout from '@/components/Layouts/DefaultLaout';


export default async function MainLayout({ children }: { children: React.ReactNode, user: { id: number; email: string }  }) {

  return (

<DefaultLayout>
      {children}
      </DefaultLayout>


  );
};


