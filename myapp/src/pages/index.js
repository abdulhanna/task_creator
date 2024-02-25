import authApi from "@/helper/api";

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}


export const getServerSideProps = async (context) => {

 

  
  let auth = await authApi.WhoAmI(context)
  if (auth) {
    return {
      redirect: {
        destination: '/task',
        permanent: false,
      },
    };

  } else {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }



}