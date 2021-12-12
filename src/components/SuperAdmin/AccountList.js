import AccountItem from "./AccountItem";

const AccountList = (props) => {
  const accounts = props.accounts;
 
  return (
    <>
      { accounts.map((account) => {
    return (
      <AccountItem
        key={account.id}
        id={account.id}
        firstName={account.firstName}
        lastName={account.lastName}
        email={account.email}
        createdAt={account.createdAt}
        updatedAt={account.updatedAt}
      ></AccountItem>
    );
  })}
    </>
  );
};

export default AccountList;
