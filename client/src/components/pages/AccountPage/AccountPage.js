import React from 'react';
import Layout from '../../layout';

const AccountPage = () => {
  const [transactionData, setTransactionData] = React.useState(null);
  const [balanceData, setBalanceData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/gatherTransactions')
      .then((res) => res.json())
      .then((data) => setTransactionData(data));
    fetch('/api/gatherBalance')
      .then((res) => res.json())
      .then((data) => setBalanceData(data));
  }, []);

  React.useEffect(() => {
    console.log(transactionData);
  }, [transactionData, setTransactionData]);

  React.useEffect(() => {
    console.log(balanceData);
  }, [balanceData, setBalanceData]);

  return <Layout>TODO </Layout>;
};

export default AccountPage;