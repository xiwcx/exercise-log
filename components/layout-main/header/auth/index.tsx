import { useSession, signIn, signOut } from "next-auth/client";
import { useApolloClient } from "@apollo/client";

export function Auth() {
  const [session, loading] = useSession();
  const client = useApolloClient();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => {
            client.resetStore();
            signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
