import UserGreeting from "../ui/UserGreeting";

import Account from "../ui/Account";

function UserPage() {
  return (
    <main className="main bg-dark">
      <UserGreeting />
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" />
    </main>
  );
}

export default UserPage;
